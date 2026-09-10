import React, { useState, useMemo } from 'react';

const UNITS = [
  { name: 'wei', decimals: 0 },
  { name: 'kwei', decimals: 3 },
  { name: 'mwei', decimals: 6 },
  { name: 'gwei', decimals: 9 },
  { name: 'microether', decimals: 12 },
  { name: 'milliether', decimals: 15 },
  { name: 'ether', decimals: 18 },
];

function parseToWei(value, fromUnit) {
  const unit = UNITS.find((u) => u.name === fromUnit);
  if (!unit) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!/^\d*\.?\d*$/.test(trimmed)) return null;
  const [whole, frac = ''] = trimmed.split('.');
  const fracPadded = (frac + '0'.repeat(unit.decimals)).slice(0, unit.decimals);
  const wholeWei = BigInt(whole || '0') * BigInt(10) ** BigInt(unit.decimals);
  const fracWei = BigInt(fracPadded || '0');
  return wholeWei + fracWei;
}

function formatFromWei(weiValue, toUnit) {
  const unit = UNITS.find((u) => u.name === toUnit);
  if (!unit || weiValue === null) return '';
  const divisor = BigInt(10) ** BigInt(unit.decimals);
  const whole = weiValue / divisor;
  const frac = weiValue % divisor;
  if (frac === 0n) return whole.toString();
  const fracStr = frac.toString().padStart(unit.decimals, '0').replace(/0+$/, '');
  return `${whole.toString()}.${fracStr}`;
}

function WeiConverter() {
  const [input, setInput] = useState('1');
  const [fromUnit, setFromUnit] = useState('ether');

  const weiValue = useMemo(() => parseToWei(input, fromUnit), [input, fromUnit]);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">ETH Unit Converter</h2>
      <p className="text-sm text-gray-400 mb-6">
        Convert between Wei, Gwei, Finney, and Ether with full BigInt precision — no floating point errors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm font-medium mb-1">Amount</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">From Unit</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
          >
            {UNITS.map((u) => (
              <option key={u.name} value={u.name}>{u.name} (10^{u.decimals})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {UNITS.map((u) => (
          <div key={u.name} className="flex items-center justify-between bg-gray-700 rounded-md px-4 py-3">
            <span className="text-gray-300 text-sm font-medium">{u.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-white font-mono text-sm break-all text-right">
                {weiValue !== null ? formatFromWei(weiValue, u.name) : '—'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const val = weiValue !== null ? formatFromWei(weiValue, u.name) : '';
                  if (val) navigator.clipboard.writeText(val);
                }}
                className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {weiValue === null && input.trim() && (
        <p className="text-xs text-red-400 mt-4">Invalid number format. Please enter a valid decimal number.</p>
      )}

      <div className="mt-6 text-xs text-gray-500">
        <p><strong>1 Ether</strong> = 10<sup>18</sup> Wei = 10<sup>9</sup> Gwei</p>
        <p className="mt-1"><strong>1 Gwei</strong> = 10<sup>9</sup> Wei</p>
        <p className="mt-1"><strong>1 Finney</strong> = 10<sup>15</sup> Wei (milliether)</p>
      </div>
    </div>
  );
}

export default WeiConverter;
