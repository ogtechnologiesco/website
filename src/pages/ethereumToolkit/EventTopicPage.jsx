import React from 'react';
import ToolShell from '../../components/ToolShell';
import EventTopic from './EventTopic';

const TABS = [
  { id: 'wei', label: 'Wei Converter', path: '/tools/wei-converter/' },
  { id: 'keccak', label: 'Keccak256', path: '/tools/keccak256-hash/' },
  { id: 'selector', label: 'Function Selector', path: '/tools/function-selector/' },
  { id: 'topic', label: 'Event Topic', path: '/tools/event-topic-hash/' },
  { id: 'abi', label: 'ABI Encoder', path: '/tools/abi-encoder/' },
  { id: 'address', label: 'Address Checksum', path: '/tools/address-checksum/' },
];

function EventTopicPage() {
  return (
    <ToolShell
      title="Free Ethereum Event Topic Calculator - topic0 Signature Hash | OG Technologies EU"
      description="Compute the Ethereum event topic (topics[0]) for any event signature — the Keccak-256 hash used for log filtering. Handles full Solidity declarations (event, indexed, parameter names) and bulk lists. Includes a reference table of common ERC-20/721/1155/4626, OpenZeppelin, proxy, and Uniswap event topics. 100% client-side."
      canonical="/tools/event-topic-hash"
      keywords="event topic, topic0, event signature hash, ethereum event hash, keccak256 event topic, solidity event, logs filter topics, eth_getlogs, event signature calculator"
      heading="Ethereum Event Topic Calculator"
      subheading="Compute topics[0] — the Keccak-256 hash of the canonical event signature — for any Solidity event. Paste a declaration or a bare signature, or batch-convert a list."
      tabs={TABS}
      activeTab="topic"
      about={[
        {
          heading: 'What is an event topic?',
          paragraphs: [
            'Every non-anonymous Solidity event emits a log whose topics[0] is the Keccak-256 hash of the event\'s canonical signature — e.g. Transfer(address,address,uint256) hashes to 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef, the signature every ERC-20 transfer carries.',
            'This tool normalizes real declarations before hashing: the event keyword, indexed markers, and parameter names are stripped automatically, so pasting an event line straight from a contract produces the correct topic.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Accepts canonical signatures and full event declarations (event, indexed, parameter names, tuple types)',
            'Bulk mode — paste one signature per line, get every topic0 at once',
            'Reference table of common event topics: ERC-20/721/1155/4626, OpenZeppelin, proxy standards, Uniswap V2/V3, WETH',
            'Instant output — matches Solidity, ethers.js, web3.js, and Foundry results',
            'No data sent to any server — safe for unpublished ABIs',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it when filtering logs with eth_getLogs or ethers.js topic filters, decoding indexed event parameters, matching log topics in a block explorer, computing the event signature for a custom event, or verifying the topic hash a web3 library produces. Note that anonymous events carry no signature topic, and indexed arguments occupy topics 1–3 as ABI-encoded values — only topics[0] is a signature hash.',
          ],
        },
      ]}
      faq={[
        { q: 'What is topic0 in an Ethereum event log?', a: 'topics[0] is the Keccak-256 hash of the event\'s canonical signature — e.g. Transfer(address,address,uint256) → 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef. Every non-anonymous event includes it so indexers can identify the event type before decoding any data.' },
        { q: 'How do I filter logs by event in eth_getLogs?', a: 'Put the computed topic into the topics array: { topics: ["0xddf252ad…"] } filters for Transfer events. topics[1] and topics[2] filter indexed arguments — pad addresses to 32 bytes (0x + 24 zeros + address).' },
        { q: 'Does the event keyword or "indexed" affect the hash?', a: 'No — only the canonical signature (name + comma-separated types) is hashed. indexed markers, parameter names, the event keyword, and the trailing semicolon are stripped before hashing; this tool normalizes them automatically.' },
        { q: 'What about anonymous events?', a: 'Anonymous events emit no signature topic — their logs contain only the indexed argument topics (1–4 of them). If you cannot find an event in the topics table, the contract may have declared it anonymous.' },
        { q: 'How are tuples hashed in event signatures?', a: 'A tuple parameter is hashed as its member types in parentheses — Foo((uint256,address),uint256) → keccak256("Foo((uint256,address),uint256)"). Dynamic arrays of tuples follow the same rule with [] appended.' },
        { q: 'Is my input sent anywhere?', a: 'No — every hash is computed locally in your browser via Keccak-256. Nothing is uploaded, logged, or stored.' },
      ]}
    >
      <EventTopic />
    </ToolShell>
  );
}

export default EventTopicPage;
