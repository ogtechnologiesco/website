import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-ethereum-units.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function EthereumWeiGweiUnits() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>Wei, Gwei, and Ether: Ethereum Units Explained with Conversion Table | OG Technologies EU</title>
          <meta name="description" content="Wei, Gwei, and Ether explained: the full Ethereum denomination table, why gas is priced in Gwei, and worked wei-to-ETH conversion examples. Free online Wei converter included." />
          <meta name="keywords" content="wei to eth, gwei to eth, wei converter, eth to wei, gwei converter, ethereum units, wei gwei ether, wei eth converter, gas price gwei" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/ethereum-wei-gwei-units/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/ethereum-wei-gwei-units/" />
          <meta property="og:title" content="Wei, Gwei, and Ether: Ethereum Units Explained" />
          <meta property="og:description" content="The full Ethereum denomination table, why gas is priced in Gwei, and worked wei-to-ETH conversion examples." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/ethereum-wei-gwei-units/" />
          <meta name="twitter:title" content="Wei, Gwei, and Ether: Ethereum Units Explained" />
          <meta name="twitter:description" content="The full Ethereum denomination table, why gas is priced in Gwei, and worked wei-to-ETH conversion examples." />
          <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
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
                  <h1 className="h1">Wei, Gwei, and Ether: Ethereum Units Explained</h1>
                  <div className="text-gray-400 text-center mt-4">26/09/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-2 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="Ethereum logo — wei, gwei and ether denominations"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-xs text-gray-500 mb-8">
                    Image: "Ethereum Background" by cryptocoin, <a href="https://www.flickr.com/photos/usecryptos/47688630522" className="underline hover:text-gray-400" target="_blank" rel="noopener noreferrer">CC BY 2.0</a>
                  </p>

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      Ethereum balances and gas fees are quoted in three different units — <strong>wei</strong>, <strong>gwei</strong>, and <strong>ether</strong> — and confusing them is a classic source of off-by-18-zeros bugs. This guide covers the full denomination table, when each unit is used, and how to convert between them without making mistakes.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The Ethereum Denomination Table</h2>
                    <p className="mb-8">
                      Ether denominations follow powers of 10, each named after a figure in computing or cryptography history:
                    </p>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-left text-base">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="py-2 pr-4 text-gray-100">Unit</th>
                            <th className="py-2 pr-4 text-gray-100">Alternative name</th>
                            <th className="py-2 pr-4 text-gray-100">Wei value</th>
                            <th className="py-2 text-gray-100">Common use</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">Wei</td><td className="py-2 pr-4">—</td><td className="py-2 pr-4">10⁰ = 1</td><td className="py-2">Solidity / smart contracts</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">Kwei</td><td className="py-2 pr-4">Babbage</td><td className="py-2 pr-4">10³</td><td className="py-2">Rarely used</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">Mwei</td><td className="py-2 pr-4">Lovelace</td><td className="py-2 pr-4">10⁶</td><td className="py-2">Rarely used</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4 font-semibold text-white">Gwei</td><td className="py-2 pr-4">Shannon, nanoether</td><td className="py-2 pr-4 font-semibold text-white">10⁹</td><td className="py-2">Gas prices</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">Microether</td><td className="py-2 pr-4">Szabo</td><td className="py-2 pr-4">10¹²</td><td className="py-2">Rarely used</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">Milliether</td><td className="py-2 pr-4">Finney</td><td className="py-2 pr-4">10¹⁵</td><td className="py-2">Occasional</td></tr>
                          <tr><td className="py-2 pr-4 font-semibold text-white">Ether</td><td className="py-2 pr-4">ETH</td><td className="py-2 pr-4 font-semibold text-white">10¹⁸</td><td className="py-2">Balances, transfers</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">Why Gas Is Priced in Gwei</h2>
                    <p className="mb-8">
                      A typical gas price is something like 20 gwei per unit of gas. In wei that would be 20,000,000,000 — unreadable — and in ether it would be 0.00000002, which is equally awkward to type. Gwei sits at a human-friendly magnitude for gas costs, which is why wallets, explorers, and RPC methods like <code className="text-purple-300">eth_gasPrice</code> (returned in wei, displayed in gwei) all converge on it.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Worked Conversion Examples</h2>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Wei to ETH:</strong> divide by 10¹⁸. 1,500,000,000,000,000,000 wei = 1.5 ETH.</li>
                      <li><strong>Gwei to ETH:</strong> divide by 10⁹. 25 gwei = 0.000000025 ETH.</li>
                      <li><strong>Gwei to wei:</strong> multiply by 10⁹. 30 gwei = 30,000,000,000 wei.</li>
                      <li><strong>Transaction fee:</strong> gas used × gas price. 21,000 gas × 20 gwei = 420,000 gwei = 0.00042 ETH.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">EIP-1559: Base Fee and Priority Fee</h2>
                    <p className="mb-8">
                      Since the London upgrade, every transaction specifies a <code className="text-purple-300">maxFeePerGas</code> and a <code className="text-purple-300">maxPriorityFeePerGas</code>, both denominated in wei but almost always discussed in gwei. The base fee is burned; the priority fee (tip) goes to the validator. When you read "gas is 15 gwei" on a tracker, that figure is the base fee — your effective cost is base + tip, capped by your max fee.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Avoiding Conversion Mistakes</h2>
                    <p className="mb-8">
                      The most expensive unit error in Ethereum development is mixing up wei and gwei — a factor of a billion. Rules of thumb: smart contracts and RPC responses are always in wei; UI and wallets display gwei or ETH; and whenever you do manual math, verify with a converter. Our <Link to="/tools/wei-converter/" className="text-purple-400 hover:text-purple-300 underline">Wei Converter</Link> converts between wei, gwei, and ETH instantly in both directions — and the <Link to="/tools/ethereum-toolkit/" className="text-purple-400 hover:text-purple-300 underline">Ethereum Toolkit</Link> bundles it with address checksumming, calldata decoding, and hash utilities. For how calldata values are encoded in wei, see our <Link to="/insights/ethereum-calldata-abi-guide/" className="text-purple-400 hover:text-purple-300 underline">calldata and ABI encoding deep dive</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">How many wei are in 1 ETH?</h3>
                    <p className="mb-8">
                      Exactly 1,000,000,000,000,000,000 wei (10¹⁸). Ether has 18 decimal places, the same as most ERC-20 tokens.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is gwei the same as wei?</h3>
                    <p className="mb-8">
                      No — 1 gwei = 1,000,000,000 wei (10⁹). Gwei is a denomination of wei, in the same way that a cent is a denomination of a dollar.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is a good gas price in gwei?</h3>
                    <p className="mb-8">
                      It varies with network demand — single digits in quiet periods, 50+ gwei during congestion. Check a live gas tracker or your wallet's suggested fee rather than hardcoding a number.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Why does Solidity return values in wei?</h3>
                    <p className="mb-8">
                      Solidity has no floating-point type, so all Ether arithmetic is done in the smallest indivisible unit — wei — to preserve precision. Division happens only at the display layer.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/ethereum-wei-gwei-units/"
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

export default EthereumWeiGweiUnits;
