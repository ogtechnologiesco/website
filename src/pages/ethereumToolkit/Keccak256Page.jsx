import React from 'react';
import ToolShell from '../../components/ToolShell';
import Keccak256 from './Keccak256';

const TABS = [
  { id: 'wei', label: 'Wei Converter', path: '/tools/wei-converter/' },
  { id: 'keccak', label: 'Keccak256', path: '/tools/keccak256-hash/' },
  { id: 'selector', label: 'Function Selector', path: '/tools/function-selector/' },
  { id: 'abi', label: 'ABI Encoder', path: '/tools/abi-encoder/' },
  { id: 'address', label: 'Address Checksum', path: '/tools/address-checksum/' },
];

function Keccak256Page() {
  return (
    <ToolShell
      title="Free Keccak256 Hash Generator Online - Ethereum Hash | OG Technologies EU"
      description="Compute the Keccak-256 hash of any text or hex data. This is the hash function used throughout Ethereum for addresses, storage, signatures, and function selectors. 100% client-side, no data sent to any server."
      canonical="/tools/keccak256-hash"
      keywords="keccak256, keccak256 hash generator, ethereum hash, keccak 256 online, sha3 hash, web3 hash tool"
      heading="Keccak256 Hash Generator"
      subheading="Compute the Keccak-256 hash of any text or hex data. The hash function used throughout Ethereum."
      tabs={TABS}
      activeTab="keccak"
      about={[
        {
          heading: 'What is Keccak-256?',
          paragraphs: [
            'Keccak-256 is the cryptographic hash function used throughout Ethereum. It produces a fixed 256-bit (64 hex character) digest from any input. Ethereum uses it to derive contract addresses, compute function selectors, index storage slots, sign messages, and hash transaction data.',
            'Note that Ethereum uses the original Keccak padding scheme, which differs slightly from the finalized NIST SHA-3 standard — hashing the same input with SHA3-256 and Keccak-256 produces different digests. This tool computes the Ethereum-compatible Keccak-256 variant.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Hashes plain text or raw hex input',
            'Produces the same digest as Solidity\'s keccak256() for bytes input',
            'Instant output — useful for verifying function selectors and event topics',
            'Handles large inputs entirely in the browser',
            'No data sent to any server — safe for sensitive payloads',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it when computing the 4-byte function selector for a Solidity signature (the first bytes of the Keccak-256 of "transfer(address,uint256)"), verifying event topic hashes, deriving addresses from public keys, debugging ABI-encoded calldata, or cross-checking hashes produced by web3 libraries.',
          ],
        },
      ]}
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Keccak256 Hash Generator',
        url: 'https://www.ogtechnologies.co/tools/keccak256-hash/',
        description: 'Compute the Keccak-256 hash of any text or hex data. The hash function used throughout Ethereum for addresses, storage, signatures, and function selectors. 100% client-side.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Compute Keccak-256 hash of text or hex input',
          'Same hash function used in Ethereum (addresses, storage, signatures)',
          'Supports both text and hex input modes',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <Keccak256 />
    </ToolShell>
  );
}

export default Keccak256Page;
