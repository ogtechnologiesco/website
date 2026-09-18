import React from 'react';
import ToolShell from '../../components/ToolShell';
import FunctionSelector from './FunctionSelector';

const TABS = [
  { id: 'wei', label: 'Wei Converter', path: '/tools/wei-converter' },
  { id: 'keccak', label: 'Keccak256', path: '/tools/keccak256-hash' },
  { id: 'selector', label: 'Function Selector', path: '/tools/function-selector' },
  { id: 'abi', label: 'ABI Encoder', path: '/tools/abi-encoder' },
  { id: 'address', label: 'Address Checksum', path: '/tools/address-checksum' },
];

function FunctionSelectorPage() {
  return (
    <ToolShell
      title="Free Solidity Function Selector Calculator - 4-Byte Selector | OG Technologies EU"
      description="Calculate the 4-byte function selector for any Solidity function signature. Uses keccak256 of the canonical function signature. 100% client-side, no data sent to any server."
      canonical="/tools/function-selector"
      keywords="solidity function selector, 4-byte selector, function signature hash, ethereum selector calculator, keccak256 function selector"
      heading="Solidity Function Selector"
      subheading="Calculate the 4-byte function selector for any Solidity function signature using keccak256."
      tabs={TABS}
      activeTab="selector"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Solidity Function Selector Calculator',
        url: 'https://www.ogtechnologies.co/tools/function-selector/',
        description: 'Calculate the 4-byte function selector for any Solidity function signature. Uses keccak256 of the canonical function signature. 100% client-side.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Calculate 4-byte function selectors from Solidity signatures',
          'Uses keccak256 of the canonical function signature',
          'Supports multiple function signatures at once',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <FunctionSelector />
    </ToolShell>
  );
}

export default FunctionSelectorPage;
