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
      about={[
        {
          heading: 'What is ABI encoding?',
          paragraphs: [
            'The Ethereum Application Binary Interface (ABI) defines how function calls and their arguments are encoded into calldata — the raw bytes sent with a transaction to a smart contract. Every call starts with a 4-byte function selector (derived from the function signature\'s Keccak-256 hash), followed by each argument padded to 32 bytes.',
            'Decoding reverses the process: given raw calldata and the expected parameter types, it recovers the typed values. This is essential for debugging failed transactions, verifying what a contract call will do, or building raw transactions without a full SDK.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Encode function calls into ABI calldata',
            'Decode raw calldata back into typed arguments',
            'Supports uint, int, address, bool, bytes, string, and array types',
            'Shows the 4-byte selector separately from encoded arguments',
            'Runs entirely in the browser — calldata never leaves your machine',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it when inspecting calldata on a block explorer, hand-crafting a contract interaction for a multisig or governance proposal, testing edge-case inputs against a contract, or double-checking what a dApp frontend is actually about to submit.',
          ],
        },
      ]}
      
    >
      <AbiEncoder />
    </ToolShell>
  );
}

export default AbiEncoderPage;
