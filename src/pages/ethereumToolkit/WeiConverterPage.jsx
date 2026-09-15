import React from 'react';
import ToolShell from '../../components/ToolShell';
import WeiConverter from './WeiConverter';

const TABS = [
  { id: 'wei', label: 'Wei Converter', path: '/tools/wei-converter' },
  { id: 'keccak', label: 'Keccak256', path: '/tools/keccak256-hash' },
  { id: 'selector', label: 'Function Selector', path: '/tools/function-selector' },
  { id: 'abi', label: 'ABI Encoder', path: '/tools/abi-encoder' },
  { id: 'address', label: 'Address Checksum', path: '/tools/address-checksum' },
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
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Wei to Ether Converter',
        url: 'https://www.ogtechnologies.co/tools/wei-converter',
        description: 'Convert between Wei, Gwei, Finney, and Ether with full BigInt precision. Free browser-based Ethereum unit converter. 100% client-side.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Convert between Wei, Gwei, Finney, and Ether',
          'Full BigInt precision — no floating point errors',
          'Supports arbitrary precision input values',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <WeiConverter />
    </ToolShell>
  );
}

export default WeiConverterPage;
