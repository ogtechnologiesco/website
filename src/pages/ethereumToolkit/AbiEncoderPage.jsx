import React from 'react';
import ToolShell from '../../components/ToolShell';
import AbiEncoder from './AbiEncoder';

const TABS = [
  { id: 'wei', label: 'Wei Converter', path: '/tools/wei-converter/' },
  { id: 'keccak', label: 'Keccak256', path: '/tools/keccak256-hash/' },
  { id: 'selector', label: 'Function Selector', path: '/tools/function-selector/' },
  { id: 'abi', label: 'ABI Encoder', path: '/tools/abi-encoder/' },
  { id: 'address', label: 'Address Checksum', path: '/tools/address-checksum/' },
];

function AbiEncoderPage() {
  return (
    <ToolShell
      title="Free Ethereum ABI Encoder & Decoder Online | OG Technologies EU"
      description="Encode and decode Ethereum ABI calldata for smart contract interactions. Supports uint, address, bytes, string, and array types. 100% client-side, no data sent to any server."
      canonical="/tools/abi-encoder"
      keywords="ABI encoder, ABI decoder, ethereum ABI, solidity ABI encoding, calldata encoder, web3 ABI, smart contract encoding"
      heading="ABI Encoder & Decoder"
      subheading="Encode and decode Ethereum ABI calldata for smart contract interactions."
      tabs={TABS}
      activeTab="abi"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Ethereum ABI Encoder & Decoder',
        url: 'https://www.ogtechnologies.co/tools/abi-encoder/',
        description: 'Encode and decode Ethereum ABI calldata for smart contract interactions. Supports uint, address, bytes, string, and array types. 100% client-side.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Encode Solidity function calls into ABI calldata',
          'Decode raw ABI calldata back into typed values',
          'Supports uint, int, address, bool, bytes, string, and array types',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <AbiEncoder />
    </ToolShell>
  );
}

export default AbiEncoderPage;
