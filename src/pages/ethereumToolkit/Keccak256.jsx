import React, { useState, useMemo } from 'react';
import { keccak256 } from 'js-sha3';

function Keccak256() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('text');

  const hash = useMemo(() => {
    if (!input) return '';
    try {
      if (mode === 'hex') {
        const cleanHex = input.startsWith('0x') ? input.slice(2) : input;
        if (!/^[0-9a-fA-F]*$/.test(cleanHex)) return '';
        const bytes = new Uint8Array(cleanHex.length / 2);
        for (let i = 0; i < cleanHex.length; i += 2) {
          bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
        }
        return keccak256(bytes);
      }
      return keccak256(input);
    } catch {
      return '';
    }
  }, [input, mode]);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">Keccak256 Hash Generator</h2>
      <p className="text-sm text-gray-400 mb-6">
        Compute the Keccak-256 hash of any text or hex data. This is the hash function used throughout Ethereum
        (addresses, storage, signatures, function selectors).
      </p>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            mode === 'text' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setMode('text')}
        >
          Text Input
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            mode === 'hex' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setMode('hex')}
        >
          Hex Input
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-medium mb-1">
          {mode === 'text' ? 'Text to hash' : 'Hex data to hash (with or without 0x prefix)'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
          placeholder={mode === 'text' ? 'Enter text to hash...' : '48656c6c6f20776f726c64'}
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-1">Keccak-256 Hash</label>
        <div className="flex items-center gap-3 bg-gray-700 rounded-md px-4 py-3">
          <code className="text-purple-300 font-mono text-sm break-all flex-1">
            {hash || <span className="text-gray-500">Enter input to generate hash...</span>}
          </code>
          {hash && (
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(hash)}
              className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
            >
              Copy
            </button>
          )}
        </div>
      </div>

      {mode === 'hex' && input && !hash && (
        <p className="text-xs text-red-400 mt-3">Invalid hex input. Use only 0-9, a-f, A-F characters (even length).</p>
      )}

      <div className="mt-6 text-xs text-gray-500">
        <p><strong>Keccak-256</strong> is not the same as SHA3-256. Ethereum uses the original Keccak (pre-NIST padding).</p>
        <p className="mt-1">Empty string hash: <code className="text-gray-400">c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470</code></p>
      </div>
    </div>
  );
}

export default Keccak256;
