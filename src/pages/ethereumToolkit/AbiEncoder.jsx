import React, { useState, useMemo } from 'react';
import { keccak256 } from 'js-sha3';

const SOLIDITY_TYPES = ['uint256', 'address', 'string', 'bool', 'bytes', 'bytes32', 'uint128', 'uint64', 'uint32', 'uint8', 'int256', 'int128', 'int64', 'int32', 'int8'];

function parseSignature(sig) {
  const match = sig.trim().match(/^(\w+)\((.*)\)$/);
  if (!match) return null;
  const [, name, paramsStr] = match;
  if (paramsStr.trim() === '') return { name, params: [] };
  const params = paramsStr.split(',').map((p) => p.trim());
  return { name, params };
}

function encodeUint(value, bits = 256) {
  const v = BigInt(value);
  const max = (BigInt(1) << BigInt(bits)) - BigInt(1);
  if (v > max) throw new Error(`Value ${value} exceeds uint${bits} max`);
  if (v < 0n) throw new Error(`Value ${value} is negative for uint${bits}`);
  return v.toString(16).padStart(64, '0');
}

function encodeInt(value, bits = 256) {
  const v = BigInt(value);
  const min = -(BigInt(1) << BigInt(bits - 1));
  const max = (BigInt(1) << BigInt(bits - 1)) - BigInt(1);
  if (v > max || v < min) throw new Error(`Value ${value} out of range for int${bits}`);
  if (v < 0n) {
    const complement = (BigInt(1) << BigInt(bits)) + v;
    return complement.toString(16).padStart(64, '0');
  }
  return v.toString(16).padStart(64, '0');
}

function encodeAddress(value) {
  let addr = value.trim();
  if (addr.startsWith('0x')) addr = addr.slice(2);
  if (!/^[0-9a-fA-F]{40}$/.test(addr)) throw new Error(`Invalid address: ${value}`);
  return addr.toLowerCase().padStart(64, '0');
}

function encodeBool(value) {
  return value === true || value === 'true' || value === '1' || value === 1 ? '1'.padStart(64, '0') : '0'.padStart(64, '0');
}

function encodeBytes(value) {
  let hex = value.trim();
  if (hex.startsWith('0x')) hex = hex.slice(2);
  if (!/^[0-9a-fA-F]*$/.test(hex) || hex.length % 2 !== 0) throw new Error(`Invalid bytes: ${value}`);
  const lengthHex = (hex.length / 2).toString(16).padStart(64, '0');
  const paddedHex = hex + '0'.repeat((32 - (hex.length / 2) % 32) % 32 * 2);
  return lengthHex + paddedHex;
}

function encodeBytes32(value) {
  let hex = value.trim();
  if (hex.startsWith('0x')) hex = hex.slice(2);
  if (!/^[0-9a-fA-F]*$/.test(hex)) throw new Error(`Invalid bytes32: ${value}`);
  if (hex.length > 64) throw new Error('bytes32 value too long');
  return hex.padEnd(64, '0');
}

function encodeString(value) {
  const utf8Bytes = new TextEncoder().encode(value);
  let hex = '';
  for (const b of utf8Bytes) hex += b.toString(16).padStart(2, '0');
  const lengthHex = (utf8Bytes.length).toString(16).padStart(64, '0');
  const paddedHex = hex + '0'.repeat((32 - utf8Bytes.length % 32) % 32 * 2);
  return lengthHex + paddedHex;
}

function encodeParam(type, value) {
  if (type.startsWith('uint')) {
    const bits = parseInt(type.slice(4)) || 256;
    return encodeUint(value, bits);
  }
  if (type.startsWith('int')) {
    const bits = parseInt(type.slice(3)) || 256;
    return encodeInt(value, bits);
  }
  if (type === 'address') return encodeAddress(value);
  if (type === 'bool') return encodeBool(value);
  if (type === 'string') return encodeString(value);
  if (type === 'bytes') return encodeBytes(value);
  if (type === 'bytes32') return encodeBytes32(value);
  throw new Error(`Unsupported type: ${type}`);
}

function isDynamicType(type) {
  return type === 'string' || type === 'bytes';
}

function AbiEncoder() {
  const [signature, setSignature] = useState('transfer(address,uint256)');
  const [paramValues, setParamValues] = useState(['0x742d35Cc6634C0532925a3b844Bc454e4438f44e', '1000000000000000000']);
  const [mode, setMode] = useState('encode');

  const parsed = useMemo(() => parseSignature(signature), [signature]);

  const encoded = useMemo(() => {
    if (!parsed) return { error: 'Invalid function signature' };
    if (parsed.params.length !== paramValues.length) {
      return { error: `Expected ${parsed.params.length} parameters, got ${paramValues.length}` };
    }
    try {
      const selector = '0x' + keccak256(signature.trim()).slice(0, 8);
      const headParts = [];
      const tailParts = [];
      let headSize = parsed.params.length * 32;
      let tailOffset = headSize;

      for (let i = 0; i < parsed.params.length; i++) {
        const type = parsed.params[i];
        const value = paramValues[i] || '';
        if (isDynamicType(type)) {
          const encoded = encodeParam(type, value);
          headParts.push(tailOffset.toString(16).padStart(64, '0'));
          tailParts.push(encoded);
          tailOffset += encoded.length / 2;
        } else {
          headParts.push(encodeParam(type, value));
        }
      }

      const calldata = selector + headParts.join('') + tailParts.join('');
      return { calldata, selector };
    } catch (e) {
      return { error: e.message };
    }
  }, [parsed, paramValues, signature]);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">ABI Encoder / Decoder</h2>
      <p className="text-sm text-gray-400 mb-6">
        Encode Solidity function parameters into ABI calldata for contract interactions, or decode calldata back.
      </p>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-medium mb-1">Function Signature</label>
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
          placeholder="transfer(address,uint256)"
        />
      </div>

      {parsed && parsed.params.length > 0 && (
        <div className="space-y-3 mb-4">
          {parsed.params.map((type, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center">
                <span className="text-purple-400 font-mono text-sm">{type}</span>
              </div>
              <input
                type="text"
                value={paramValues[i] || ''}
                onChange={(e) => {
                  const next = [...paramValues];
                  next[i] = e.target.value;
                  setParamValues(next);
                }}
                className="md:col-span-2 bg-gray-700 text-white px-3 py-1.5 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                placeholder={`Parameter ${i + 1} value`}
              />
            </div>
          ))}
        </div>
      )}

      {encoded.error && <p className="text-xs text-red-400 mb-4">{encoded.error}</p>}

      {encoded.calldata && (
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Encoded Calldata</label>
          <div className="flex items-start gap-3 bg-gray-700 rounded-md px-4 py-3">
            <code className="text-purple-300 font-mono text-sm break-all flex-1">{encoded.calldata}</code>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(encoded.calldata)}
              className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Selector: <code className="text-gray-400">{encoded.selector}</code></p>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500">
        <p><strong>Supported types:</strong> uint256, uint128, uint64, uint32, uint8, int256, int128, int64, int32, int8, address, bool, string, bytes, bytes32</p>
        <p className="mt-1">Dynamic types (string, bytes) use head/tail ABI encoding with offsets.</p>
      </div>
    </div>
  );
}

export default AbiEncoder;
