import React, { useState, useMemo } from 'react';
import { keccak256 } from 'js-sha3';

function toChecksumAddress(address) {
  const addr = address.trim().toLowerCase().replace(/^0x/, '');
  if (!/^[0-9a-f]{40}$/.test(addr)) return null;
  const hash = keccak256(addr);
  let result = '0x';
  for (let i = 0; i < addr.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      result += addr[i].toUpperCase();
    } else {
      result += addr[i];
    }
  }
  return result;
}

function AddressChecksum() {
  const [input, setInput] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');

  const { checksum, isValid, isAlreadyChecksummed, error } = useMemo(() => {
    const addr = input.trim();
    if (!addr) return { checksum: '', isValid: false, isAlreadyChecksummed: false, error: '' };
    if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) {
      return { checksum: '', isValid: false, isAlreadyChecksummed: false, error: 'Invalid format. Address must be 0x followed by 40 hex characters.' };
    }
    const result = toChecksumAddress(addr);
    if (!result) {
      return { checksum: '', isValid: false, isAlreadyChecksummed: false, error: 'Invalid address characters.' };
    }
    return {
      checksum: result,
      isValid: true,
      isAlreadyChecksummed: addr === result,
      error: '',
    };
  }, [input]);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">EIP-55 Address Checksum Validator</h2>
      <p className="text-sm text-gray-400 mb-6">
        Validate an Ethereum address and convert it to its EIP-55 checksummed format. The checksum uses Keccak-256
        to determine which letters should be capitalized, catching typos before funds are lost.
      </p>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-medium mb-1">Ethereum Address</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
          placeholder="0x..."
        />
      </div>

      {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

      {isValid && checksum && (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Checksummed Address (EIP-55)</label>
            <div className="flex items-center gap-3 bg-gray-700 rounded-md px-4 py-3">
              <code className="text-purple-300 font-mono text-sm break-all flex-1">{checksum}</code>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(checksum)}
                className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              isAlreadyChecksummed ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
            }`}>
              {isAlreadyChecksummed ? '✓ Already checksummed' : '⚠ Input was not checksummed'}
            </span>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500">
        <p><strong>EIP-55</strong> introduces a checksum into Ethereum addresses by capitalizing certain letters based on the Keccak-256 hash of the lowercase address.</p>
        <p className="mt-1">If the hash digit at position <em>i</em> is ≥ 8, the corresponding address character is capitalized.</p>
      </div>
    </div>
  );
}

export default AddressChecksum;
