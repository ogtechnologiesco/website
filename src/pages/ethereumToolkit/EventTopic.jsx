import React, { useState, useMemo } from 'react';
import { keccak256 } from 'js-sha3';

const EXAMPLES = [
  'Transfer(address,address,uint256)',
  'Approval(address,address,uint256)',
  'ApprovalForAll(address,address,bool)',
  'OwnershipTransferred(address,address)',
  'Upgraded(address)',
  'RoleGranted(bytes32,address,address)',
];

// Well-known event signatures across ERC-20/721/1155/4626, OpenZeppelin,
// proxy standards, Uniswap, and WETH.
const COMMON_EVENTS = [
  ['Transfer(address,address,uint256)', 'ERC-20 & ERC-721'],
  ['Approval(address,address,uint256)', 'ERC-20 & ERC-721'],
  ['ApprovalForAll(address,address,bool)', 'ERC-721 & ERC-1155'],
  ['TransferSingle(address,address,address,uint256,uint256)', 'ERC-1155'],
  ['TransferBatch(address,address,address,uint256[],uint256[])', 'ERC-1155'],
  ['URI(string,uint256)', 'ERC-1155'],
  ['Deposit(address,address,uint256,uint256)', 'ERC-4626 vault'],
  ['Withdraw(address,address,address,uint256,uint256)', 'ERC-4626 vault'],
  ['Deposit(address,uint256)', 'WETH'],
  ['Withdrawal(address,uint256)', 'WETH'],
  ['OwnershipTransferred(address,address)', 'Ownable'],
  ['Paused(address)', 'Pausable'],
  ['Unpaused(address)', 'Pausable'],
  ['Upgraded(address)', 'UUPS proxy'],
  ['AdminChanged(address,address)', 'Transparent proxy'],
  ['BeaconUpgraded(address)', 'Beacon proxy'],
  ['Initialized(uint64)', 'Initializable'],
  ['Initialized(uint8)', 'Initializable (legacy)'],
  ['RoleGranted(bytes32,address,address)', 'AccessControl'],
  ['RoleRevoked(bytes32,address,address)', 'AccessControl'],
  ['RoleAdminChanged(bytes32,bytes32,bytes32)', 'AccessControl'],
  ['Swap(address,uint256,uint256,uint256,uint256,address)', 'Uniswap V2 pair'],
  ['Mint(address,uint256,uint256)', 'Uniswap V2 pair'],
  ['Burn(address,uint256,uint256,address)', 'Uniswap V2 pair'],
  ['Sync(uint112,uint112)', 'Uniswap V2 pair'],
  ['Swap(address,address,int256,int256,uint160,uint128,int24)', 'Uniswap V3 pool'],
  ['Mint(address,address,int24,int24,uint128,uint256,uint256)', 'Uniswap V3 pool'],
  ['Burn(address,int24,int24,uint128,uint256,uint256)', 'Uniswap V3 pool'],
];

// Splits an argument list on top-level commas (tuple parens and array
// brackets don't count) — needed because tuple types contain commas.
function splitTopLevel(s) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; continue; }
    if ('(['.includes(ch)) depth += 1;
    if (')]'.includes(ch)) depth -= 1;
    cur += ch;
  }
  if (cur.trim() !== '') parts.push(cur);
  return parts;
}

// Canonicalizes a Solidity event declaration into the string that gets hashed:
//   event Transfer(address indexed from, address indexed to, uint256 value);
//   → Transfer(address,address,uint256)
// Strips the `event` keyword, `indexed`/`memory`/`calldata`/etc. qualifiers,
// parameter names, and the `tuple` keyword (canonical form uses parens only).
export function canonicalSignature(input) {
  const sig = input.trim().replace(/;+\s*$/, '').replace(/^event\s+/, '');
  const open = sig.indexOf('(');
  const close = sig.lastIndexOf(')');
  const name = open === -1 ? sig.trim() : sig.slice(0, open).trim();
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) || open === -1 || close <= open) {
    return { error: 'Expected an event signature like Transfer(address,address,uint256)' };
  }
  const argStr = sig.slice(open + 1, close).trim();
  if (!argStr) return { canonical: `${name}()` };
  const types = splitTopLevel(argStr).map((arg) => {
    let a = arg.trim().replace(/\s+/g, ' ');
    a = a.replace(/\b(indexed|memory|calldata|storage|payable|immutable)\b/g, '').trim();
    a = a.replace(/\btuple\s*\(/g, '(');
    a = a.replace(/\s+[A-Za-z_][A-Za-z0-9_]*$/, '');
    return a.replace(/\s/g, '');
  });
  if (types.some((t) => !t)) return { error: 'Could not parse an argument type — check parentheses and commas' };
  return { canonical: `${name}(${types.join(',')})` };
}

function EventTopic() {
  const [signature, setSignature] = useState('Transfer(address,address,uint256)');
  const [bulk, setBulk] = useState('');
  const [filter, setFilter] = useState('');

  const { topic, canonical, error } = useMemo(() => {
    const sig = signature.trim();
    if (!sig) return { topic: '', canonical: '', error: '' };
    const r = canonicalSignature(sig);
    if (r.error) return { topic: '', canonical: '', error: r.error };
    return { topic: '0x' + keccak256(r.canonical), canonical: r.canonical, error: '' };
  }, [signature]);

  const bulkRows = useMemo(() => {
    return bulk
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((sig) => {
        const r = canonicalSignature(sig);
        return { sig, canonical: r.canonical, topic: r.error ? null : '0x' + keccak256(r.canonical), error: r.error };
      });
  }, [bulk]);

  const tableRows = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const rows = COMMON_EVENTS.map(([sig, family]) => ({ sig, family, topic: '0x' + keccak256(sig) }));
    if (!q) return rows;
    return rows.filter((r) => r.sig.toLowerCase().includes(q) || r.family.toLowerCase().includes(q) || r.topic.includes(q));
  }, [filter]);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">Event Topic (topic0) Calculator</h2>
      <p className="text-sm text-gray-400 mb-6">
        Compute the 32-byte event topic — the Keccak-256 hash of the canonical event signature — used as
        <code className="text-purple-300"> topics[0]</code> in every non-anonymous Solidity event log.
      </p>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-medium mb-1">Event signature</label>
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
          placeholder="Transfer(address,address,uint256)"
          spellCheck="false"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setSignature(ex)}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors font-mono"
          >
            {ex}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-md px-4 py-3 mb-4 text-sm font-medium bg-red-900/40 text-red-300 border border-red-700">
          {error}
        </div>
      )}

      {topic && !error && (
        <div className="bg-gray-700 rounded-md px-4 py-3 mb-6 flex items-center justify-between gap-3">
          <div className="min-w-0">
            {canonical !== signature.trim() && (
              <p className="text-xs text-gray-500 mb-1">canonical: <code className="text-gray-300">{canonical}</code></p>
            )}
            <p className="text-xs text-gray-400 mb-1">topics[0] — event signature hash</p>
            <code className="text-purple-300 font-mono text-sm break-all">{topic}</code>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(topic)}
            className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors shrink-0"
          >
            Copy
          </button>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-700" id="bulk">
        <h3 className="text-lg font-semibold text-gray-200 mb-3">Bulk mode — one signature per line</h3>
        <textarea
          value={bulk}
          onChange={(e) => setBulk(e.target.value)}
          rows={5}
          className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
          placeholder={'Transfer(address,address,uint256)\nApproval(address,address,uint256)\nSwap(address,address,int256,int256,uint160,uint128,int24)'}
          spellCheck="false"
        />
        {bulkRows.length > 0 && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm border border-gray-700">
              <thead>
                <tr className="bg-gray-700/60">
                  <th className="px-4 py-2 font-semibold text-gray-300">Signature</th>
                  <th className="px-4 py-2 font-semibold text-gray-300">topic0</th>
                </tr>
              </thead>
              <tbody>
                {bulkRows.map((row, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="px-4 py-2 font-mono text-xs text-gray-200 break-all">{row.sig}</td>
                    <td className="px-4 py-2 font-mono text-xs">
                      {row.topic
                        ? <span className="text-purple-300 break-all">{row.topic}</span>
                        : <span className="text-red-400">{row.error}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700" id="common-topics">
        <h3 className="text-lg font-semibold text-gray-200 mb-3">Common event topics</h3>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm mb-3"
          placeholder="Filter by name, standard, or hash…"
          spellCheck="false"
        />
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-left text-sm border border-gray-700">
            <thead className="sticky top-0 bg-gray-800">
              <tr className="bg-gray-700/60">
                <th className="px-4 py-2 font-semibold text-gray-300">Signature</th>
                <th className="px-4 py-2 font-semibold text-gray-300 w-36">Standard</th>
                <th className="px-4 py-2 font-semibold text-gray-300">topic0</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.sig} className="border-t border-gray-700">
                  <td className="px-4 py-2 font-mono text-xs text-gray-200 break-all">{row.sig}</td>
                  <td className="px-4 py-2 text-xs text-gray-400">{row.family}</td>
                  <td className="px-4 py-2 font-mono text-xs text-purple-300 break-all">{row.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EventTopic;
