import React from 'react';
import ToolShell from '../../components/ToolShell';
import AddressChecksum from './AddressChecksum';

const TABS = [
  { id: 'wei', label: 'Wei Converter', path: '/tools/wei-converter/' },
  { id: 'keccak', label: 'Keccak256', path: '/tools/keccak256-hash/' },
  { id: 'selector', label: 'Function Selector', path: '/tools/function-selector/' },
  { id: 'abi', label: 'ABI Encoder', path: '/tools/abi-encoder/' },
  { id: 'address', label: 'Address Checksum', path: '/tools/address-checksum/' },
];

function AddressChecksumPage() {
  return (
    <ToolShell
      title="Free EIP-55 Address Checksum Validator - Ethereum | OG Technologies EU"
      description="Validate and generate EIP-55 checksummed Ethereum addresses. Check if an address has a valid mixed-case checksum. 100% client-side, no data sent to any server."
      canonical="/tools/address-checksum"
      keywords="EIP-55, ethereum address checksum, address validator, checksum address, mixed case address, ethereum address validation"
      heading="EIP-55 Address Checksum"
      subheading="Validate and generate EIP-55 checksummed Ethereum addresses."
      tabs={TABS}
      activeTab="address"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'EIP-55 Address Checksum Validator',
        url: 'https://www.ogtechnologies.co/tools/address-checksum/',
        description: 'Validate and generate EIP-55 checksummed Ethereum addresses. Check if an address has a valid mixed-case checksum. 100% client-side.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Validate EIP-55 mixed-case checksum on Ethereum addresses',
          'Generate checksummed addresses from raw hex',
          'Detect invalid or non-checksummed addresses',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <AddressChecksum />
    </ToolShell>
  );
}

export default AddressChecksumPage;
