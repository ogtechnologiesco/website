import React from 'react';
import ToolShell from '../../components/ToolShell';
import WeiConverter from './WeiConverter';

const TABS = [
  { id: 'wei', label: 'Wei Converter', path: '/tools/wei-converter/' },
  { id: 'keccak', label: 'Keccak256', path: '/tools/keccak256-hash/' },
  { id: 'selector', label: 'Function Selector', path: '/tools/function-selector/' },
  { id: 'abi', label: 'ABI Encoder', path: '/tools/abi-encoder/' },
  { id: 'address', label: 'Address Checksum', path: '/tools/address-checksum/' },
];

function WeiConverterPage() {
  return (
    <ToolShell
      title="Free Wei to Ether Converter - Wei/Gwei/ETH Unit Calculator | OG Technologies EU"
      description="Convert between Wei, Gwei, Finney, and Ether with full BigInt precision — no floating point errors. Free browser-based Ethereum unit converter. 100% client-side, no data sent to any server."
      canonical="/tools/wei-converter"
      keywords="wei converter, wei to ether, gwei to ether, ETH unit converter, ethereum unit calculator, wei to gwei, ether to wei"
      heading="Wei / Ether Converter"
      subheading="Convert between Wei, Gwei, Finney, and Ether with full BigInt precision. No floating point errors."
      tabs={TABS}
      activeTab="wei"
      about={[
        {
          heading: 'What are Ether denominations?',
          paragraphs: [
            'Ether is divisible into smaller units, similar to how a euro divides into cents. The smallest unit is Wei: 1 Ether equals 10^18 Wei. Gwei (10^9 Wei) is the unit most commonly used for gas prices, while Finney (10^15 Wei) and Szabo (10^12 Wei) appear less often in modern tooling.',
            'Because these conversions span 18 orders of magnitude, floating-point arithmetic can silently lose precision. This converter uses BigInt throughout, so every result is exact — no rounding errors even for very large values.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Convert between Wei, Gwei, Szabo, Finney, and Ether',
            'Exact BigInt arithmetic — no floating-point drift',
            'Accepts arbitrarily large values',
            'Instant, bidirectional conversion as you type',
            '100% client-side — nothing is sent to a server',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it when reading gas prices reported in Gwei, checking a transaction value shown in Wei on a block explorer, writing amounts into Solidity contracts, or reconciling token balances that use different decimal places.',
          ],
        },
      ]}
      
    >
      <WeiConverter />
    </ToolShell>
  );
}

export default WeiConverterPage;
