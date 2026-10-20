import React from 'react';
import ToolShell from '../../components/ToolShell';
import FunctionSelector from './FunctionSelector';

const TABS = [
  { id: 'wei', label: 'Wei Converter', path: '/tools/wei-converter/' },
  { id: 'keccak', label: 'Keccak256', path: '/tools/keccak256-hash/' },
  { id: 'selector', label: 'Function Selector', path: '/tools/function-selector/' },
  { id: 'abi', label: 'ABI Encoder', path: '/tools/abi-encoder/' },
  { id: 'address', label: 'Address Checksum', path: '/tools/address-checksum/' },
];

function FunctionSelectorPage() {
  return (
    <ToolShell
      title="Solidity Function Selector Calculator & 4-Byte Decoder | OG Technologies EU"
      description="Calculate the 4-byte function selector for any Solidity signature, or decode a selector back to a signature — built-in database of common ERC-20, DeFi, and OpenZeppelin signatures. 100% client-side."
      canonical="/tools/function-selector"
      keywords="solidity function selector, 4-byte selector, 4byte decoder, function signature hash, ethereum selector calculator, keccak256 function selector, decode calldata selector, selector lookup"
      heading="Solidity Function Selector"
      subheading="Calculate the 4-byte selector for any Solidity function signature, or decode a selector from calldata back to a known signature — all client-side using keccak256."
      tabs={TABS}
      activeTab="selector"
      about={[
        {
          heading: 'What is a function selector?',
          paragraphs: [
            'When you call a Solidity smart contract, the first 4 bytes of the transaction calldata identify which function to run. This function selector is the first 4 bytes of the Keccak-256 hash of the function\'s canonical signature — its name followed by its parameter types in parentheses, such as transfer(address,uint256).',
            'The signature must be in canonical form: no spaces, no parameter names, and shorthand types fully expanded (uint becomes uint256, int becomes int256). A signature written differently produces a completely different selector.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Compute the 4-byte selector for any Solidity signature',
            'Reverse lookup: decode a selector back to a matching signature',
            'Built-in database of common ERC-20, ERC-721, ERC-1155, ERC-4626, proxy, Uniswap, Safe, and OpenZeppelin error signatures',
            'Filterable selector reference table',
            'Matches the selectors produced by solc and web3 libraries',
            'Runs fully client-side — no server round-trips',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it when decoding raw calldata from a block explorer, crafting a low-level contract call, checking for selector collisions between overloaded functions, or verifying that a signature like transfer(address,uint256) really does map to 0xa9059cbb.',
            'The reverse lookup covers common signatures from ERC standards, DeFi routers, proxies, and OpenZeppelin custom errors. If a selector is not in the database it is likely contract-specific — public signature registries like 4byte.directory aggregate millions of community-submitted signatures for that case.',
          ],
        },
      ]}
      faq={[
        { q: 'What is a 4-byte function selector?', a: 'The first 4 bytes of the Keccak-256 hash of a function\'s canonical signature — its name and parameter types, like transfer(address,uint256). It prefixes transaction calldata so the EVM knows which function to dispatch to.' },
        { q: 'How do I decode a 4-byte selector back to a function name?', a: 'Selectors are hashes, so they cannot be reversed mathematically — you look them up in a database of known signatures. Paste the selector (or full calldata) into the reverse lookup above to match it against common ERC, DeFi, proxy, and OpenZeppelin error signatures.' },
        { q: 'Why doesn\'t my selector appear in the database?', a: 'Most contract functions are unique to that contract. The local database covers widely deployed signatures; for contract-specific ones, public registries like 4byte.directory aggregate millions of community-submitted signatures.' },
        { q: 'Can two functions share the same selector?', a: 'Yes — the selector space is only 4 bytes, so collisions exist and are even mined deliberately for proxy attacks. solc rejects collisions inside a single contract, but an attacker can craft a function whose selector collides with a target\'s. Always verify the full signature, not just the selector.' },
        { q: 'Do error selectors work the same way?', a: 'Yes. Custom errors like ERC20InsufficientBalance(address,uint256,uint256) use the same keccak256-first-4-bytes scheme, and the built-in database includes the common OpenZeppelin errors you see in revert data.' },
      ]}
      
    >
      <FunctionSelector />
    </ToolShell>
  );
}

export default FunctionSelectorPage;
