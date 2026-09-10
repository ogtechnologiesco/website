import React, { useState, useMemo } from 'react';
import { keccak256 } from 'js-sha3';

const EXAMPLES = [
  'transfer(address,uint256)',
  'approve(address,uint256)',
  'balanceOf(address)',
  'totalSupply()',
  'mint(address,uint256)',
  'burn(uint256)',
  'name()',
  'symbol()',
  'decimals()',
  'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)',
];

function FunctionSelector() {
  const [signature, setSignature] = useState('transfer(address,uint256)');

  const { selector, fullHash, error } = useMemo(() => {
    const sig = signature.trim();
    if (!sig) return { selector: '', fullHash: '', error: '' };
    if (!sig.includes('(') || !sig.endsWith(')')) {
      return { selector: '', fullHash: '', error: 'Signature must contain parentheses, e.g. transfer(address,uint256)' };
    }
    const hash = keccak256(sig);
    return {
      selector: '0x' + hash.slice(0, 8),
      fullHash: '0x' + hash,
      error: '',
    };
  }, [signature]);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">Function Selector Calculator</h2>
      <p className="text-sm text-gray-400 mb-6">
        Compute the 4-byte function selector from a Solidity function signature. The selector is the first 4 bytes
        of the Keccak-256 hash of the canonical signature.
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

      {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

      {selector && (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">4-Byte Selector</label>
            <div className="flex items-center gap-3 bg-gray-700 rounded-md px-4 py-3">
              <code className="text-purple-300 font-mono text-lg flex-1">{selector}</code>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(selector)}
                className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Full Keccak-256 Hash</label>
            <div className="flex items-center gap-3 bg-gray-700 rounded-md px-4 py-3">
              <code className="text-gray-300 font-mono text-sm break-all flex-1">{fullHash}</code>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(fullHash)}
                className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="text-gray-300 text-sm font-medium mb-2">Common Examples</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setSignature(ex)}
              className="text-xs px-3 py-1.5 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors font-mono"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        <p>The selector is used in the first 4 bytes of transaction calldata to identify which function to call.</p>
      </div>
    </div>
  );
}

export default FunctionSelector;
