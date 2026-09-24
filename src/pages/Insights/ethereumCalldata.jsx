import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-ethereum-calldata.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function EthereumCalldata() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums | OG Technologies EU</title>
          <meta name="description" content="A developer reference for how Ethereum transactions encode function calls: 4-byte selectors, ABI argument encoding, and EIP-55 address checksums — with free tools to verify each step." />
          <meta name="keywords" content="Ethereum calldata, ABI encoding, function selector, keccak256, EIP-55, address checksum, Solidity, smart contract, wei converter, ABI encoder" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/ethereum-calldata-abi-guide/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/ethereum-calldata-abi-guide/" />
          <meta property="og:title" content="Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums" />
          <meta property="og:description" content="How Ethereum transactions encode function calls: 4-byte selectors, ABI argument encoding, and EIP-55 address checksums — with free tools to verify each step." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/ethereum-calldata-abi-guide/" />
          <meta name="twitter:title" content="Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums" />
          <meta name="twitter:description" content="How Ethereum transactions encode function calls: selectors, ABI encoding, and EIP-55 checksums." />
          <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums",
              "description": "A developer reference for how Ethereum transactions encode function calls: 4-byte selectors, ABI argument encoding, and EIP-55 address checksums.",
              "datePublished": "2026-09-21",
              "dateModified": "2026-09-21",
              "author": { "@type": "Organization", "name": "OG Technologies EU" },
              "publisher": { "@type": "Organization", "name": "OG Technologies EU", "logo": { "@type": "ImageObject", "url": "https://www.ogtechnologies.co/og-og-image.png" } },
              "url": "https://www.ogtechnologies.co/insights/ethereum-calldata-abi-guide/",
              "image": "https://www.ogtechnologies.co/og-og-image.png",
              "mainEntityOfPage": "https://www.ogtechnologies.co/insights/ethereum-calldata-abi-guide/"
            })}
          </script>
        </Helmet>
        <Header />

        <main className="grow">
          <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>

          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Article header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <div className="text-purple-400 text-sm font-medium mb-2">Blockchain · Developer</div>
                  <h1 className="h1">Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums</h1>
                  <div className="text-gray-400 text-center mt-4">21/09/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="Ethereum calldata and ABI encoding"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      Every smart contract interaction on Ethereum reduces to one thing: the <code className="text-purple-300">data</code> field of a transaction. That hex blob — calldata — tells the EVM which function to run and with what arguments. Understanding how it is built is essential for debugging failed transactions, verifying what a wallet is actually signing, and building contract tooling.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The 4-Byte Function Selector</h2>
                    <p className="mb-8">
                      The first 4 bytes of calldata are the <strong>function selector</strong>: the first 4 bytes of the Keccak-256 hash of the canonical function signature — the function name plus comma-separated parameter types, with no spaces. For example, <code className="text-purple-300">transfer(address,uint256)</code> hashes to <code className="text-purple-300">0xa9059cbb</code> — a selector you will see in every ERC-20 transfer.
                    </p>
                    <p className="mb-8">
                      Two details matter: parameter types must be canonical (<code className="text-purple-300">uint</code> expands to <code className="text-purple-300">uint256</code>), and overloads produce different selectors — <code className="text-purple-300">transfer(address,uint256)</code> and <code className="text-purple-300">transfer(address,uint96)</code> are different functions. You can compute any selector with our{' '}
                      <Link to="/tools/function-selector/" className="text-purple-400 hover:text-purple-300 underline">Function Selector Calculator</Link>, which runs Keccak-256 locally via the{' '}
                      <Link to="/tools/keccak256-hash/" className="text-purple-400 hover:text-purple-300 underline">Keccak256 Hash tool</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">ABI Argument Encoding</h2>
                    <p className="mb-8">
                      Everything after the selector is the ABI-encoded arguments. Static types — <code className="text-purple-300">uint256</code>, <code className="text-purple-300">address</code>, <code className="text-purple-300">bytes32</code>, bool — are padded to 32-byte words in place. Dynamic types — <code className="text-purple-300">string</code>, <code className="text-purple-300">bytes</code>, arrays — are encoded as an offset pointer to a tail region containing a length prefix followed by the data.
                    </p>
                    <p className="mb-8">
                      A call to <code className="text-purple-300">transfer(0xAbC..., 1000000)</code> therefore encodes as: the 4-byte selector, one 32-byte word for the left-padded address, and one 32-byte word for the amount. Tuples and nested arrays add offset indirection — the reason hand-decoding complex calldata is error-prone. Our{' '}
                      <Link to="/tools/abi-encoder/" className="text-purple-400 hover:text-purple-300 underline">ABI Encoder &amp; Decoder</Link>{' '}
                      handles uint, address, bytes, string, and array types entirely client-side.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">EIP-55 Address Checksums</h2>
                    <p className="mb-8">
                      Ethereum addresses are 20-byte hex strings with no built-in error detection — a single wrong character sends funds to a different address. <strong>EIP-55</strong> solves this by mixing case: each hex letter is uppercased or lowercased based on the Keccak-256 hash of the lowercase address. Wallets and explorers display the checksummed form (<code className="text-purple-300">0x52908400098527886E0F7030069857D2E4169EE7</code>), so a typo produces an invalid checksum rather than a silent loss. Verify any address with the{' '}
                      <Link to="/tools/address-checksum/" className="text-purple-400 hover:text-purple-300 underline">EIP-55 Address Checksum Validator</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Units: Wei, Gwei, and Ether</h2>
                    <p className="mb-8">
                      Calldata amounts and gas prices are denominated in <strong>Wei</strong>, the smallest unit: 1 ETH = 10<sup>18</sup> Wei, and gas prices are conventionally quoted in Gwei (10<sup>9</sup> Wei). Because these values exceed JavaScript's safe integer range, always convert with BigInt precision — our{' '}
                      <Link to="/tools/wei-converter/" className="text-purple-400 hover:text-purple-300 underline">Wei/Gwei/ETH Converter</Link>{' '}
                      does exactly that, with no floating-point errors.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Why This Matters for Security</h2>
                    <p className="mb-8">
                      Phishing attacks increasingly rely on users signing opaque calldata. If you can decode the selector and arguments, you can see that a "claim airdrop" transaction is actually <code className="text-purple-300">setApprovalForAll(attacker, true)</code>. Every tool referenced above — the full{' '}
                      <Link to="/tools/ethereum-toolkit/" className="text-purple-400 hover:text-purple-300 underline">Ethereum Developer Toolkit</Link> — runs 100% in your browser, so you can inspect suspicious calldata without pasting it into a third-party server.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">How do I decode calldata without the contract ABI?</h3>
                    <p className="mb-8">
                      Start with the 4-byte selector — look it up in a public selector database or compute candidates with a selector calculator. If the selector matches a known signature, the argument types tell you how to decode the rest: 32-byte words for static types, offset pointers for dynamic ones.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Why is Keccak-256 used instead of SHA-256?</h3>
                    <p className="mb-8">
                      Ethereum adopted Keccak-256 — the original submission to the SHA-3 competition — before NIST finalized the SHA-3 standard with different padding. They are related but not identical: Keccak-256 and SHA3-256 produce different hashes for the same input.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Do all transactions have calldata?</h3>
                    <p className="mb-8">
                      No. A plain ETH transfer has empty calldata — the value field carries the amount. Calldata only appears when calling contract code, and a contract's <code className="text-purple-300">receive()</code> or <code className="text-purple-300">fallback()</code> function handles calls with empty or unmatched calldata.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/ethereum-calldata-abi-guide/"
                    categories={['Blockchain', 'Developer']}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default EthereumCalldata;
