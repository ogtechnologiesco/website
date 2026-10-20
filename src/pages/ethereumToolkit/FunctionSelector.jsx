import React, { useState, useMemo } from 'react';
import { keccak256 } from 'js-sha3';
import { SELECTOR_DB, lookupSelector } from './selectorDb';

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
  const [lookupInput, setLookupInput] = useState('');
  const [filter, setFilter] = useState('');

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

  const lookup = useMemo(() => {
    if (!lookupInput.trim()) return null;
    return lookupSelector(lookupInput);
  }, [lookupInput]);

  const tableRows = useMemo(() => {
    const rows = [];
    SELECTOR_DB.forEach((sigs, sel) => {
      sigs.forEach((sig) => rows.push({ selector: sel, signature: sig }));
    });
    rows.sort((a, b) => a.signature.localeCompare(b.signature));
    const q = filter.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.signature.toLowerCase().includes(q) || r.selector.includes(q));
  }, [filter]);

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

      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Decode a Selector — Reverse Lookup</h3>
        <p className="text-sm text-gray-400 mb-4">
          Paste a 4-byte selector (or full calldata — the first 4 bytes are used) to find matching function
          signatures in the built-in database of common ERC-20, ERC-721, ERC-1155, proxy, DeFi, and
          OpenZeppelin error signatures.
        </p>
        <input
          type="text"
          value={lookupInput}
          onChange={(e) => setLookupInput(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
          placeholder="0xa9059cbb or raw calldata"
          spellCheck="false"
        />

        {lookup && lookup.error && <p className="text-xs text-red-400 mt-3">{lookup.error}</p>}

        {lookup && !lookup.error && lookup.matches.length > 0 && (
          <div className="mt-3 bg-gray-700 rounded-md px-4 py-3">
            <p className="text-xs text-gray-400 mb-2">{lookup.selector} resolves to:</p>
            <ul className="space-y-1">
              {lookup.matches.map((sig) => (
                <li key={sig} className="flex items-center gap-3">
                  <code className="text-purple-300 font-mono text-sm flex-1">{sig}</code>
                  <button
                    type="button"
                    onClick={() => setSignature(sig)}
                    className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
                  >
                    Verify
                  </button>
                </li>
              ))}
            </ul>
            {lookup.matches.length > 1 && (
              <p className="text-xs text-gray-500 mt-2">Selector collision — multiple signatures produce the same 4 bytes.</p>
            )}
          </div>
        )}

        {lookup && !lookup.error && lookup.matches.length === 0 && (
          <div className="mt-3 bg-gray-700 rounded-md px-4 py-3">
            <p className="text-sm text-gray-300">
              <code className="text-purple-300 font-mono">{lookup.selector}</code> is not in the local database.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Contract-specific functions won't appear here — check a public signature database like{' '}
              <a
                href={`https://www.4byte.directory/signatures/?bytes4_signature=${lookup.selector}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                4byte.directory
              </a>
              , or compute candidates with the calculator above.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">4-Byte Selector Reference Table</h3>
        <p className="text-sm text-gray-400 mb-4">
          Common selectors computed from their canonical signatures — filter by name or hex.
        </p>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm mb-3"
          placeholder="Filter, e.g. transfer or 0xa905"
          spellCheck="false"
        />
        <div className="max-h-80 overflow-y-auto rounded-md border border-gray-700">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-gray-800">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-300 w-28">Selector</th>
                <th className="px-4 py-2 font-semibold text-gray-300">Signature</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.signature} className="border-t border-gray-700">
                  <td className="px-4 py-1.5 font-mono text-purple-300 text-xs">{row.selector}</td>
                  <td className="px-4 py-1.5 font-mono text-gray-300 text-xs break-all">{row.signature}</td>
                </tr>
              ))}
              {tableRows.length === 0 && (
                <tr className="border-t border-gray-700">
                  <td colSpan={2} className="px-4 py-3 text-gray-500 text-xs">No signatures match the filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FunctionSelector;
