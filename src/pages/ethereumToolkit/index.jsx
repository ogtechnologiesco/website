import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import WeiConverter from './WeiConverter';
import Keccak256 from './Keccak256';
import FunctionSelector from './FunctionSelector';
import AbiEncoder from './AbiEncoder';
import AddressChecksum from './AddressChecksum';

const TABS = [
  { id: 'wei', label: 'Wei Converter', path: '/tools/wei-converter', component: WeiConverter },
  { id: 'keccak', label: 'Keccak256', path: '/tools/keccak256-hash', component: Keccak256 },
  { id: 'selector', label: 'Function Selector', path: '/tools/function-selector', component: FunctionSelector },
  { id: 'abi', label: 'ABI Encoder', path: '/tools/abi-encoder', component: AbiEncoder },
  { id: 'address', label: 'Address Checksum', path: '/tools/address-checksum', component: AddressChecksum },
];

function EthereumToolkit() {
  const ActiveComponent = TABS[0].component;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free Ethereum Developer Toolkit - Wei Converter, Keccak256, ABI Encoder | OG Technologies EU</title>
        <meta name="description" content="Free browser-based Ethereum developer tools: Wei/Gwei/ETH unit converter, Keccak256 hash generator, Solidity function selector calculator, ABI encoder/decoder, and EIP-55 address checksum validator. 100% client-side, no data sent to any server." />
        <meta name="keywords" content="ethereum tools, wei converter, keccak256 hash, function selector, ABI encoder, ABI decoder, EIP-55 checksum, ethereum address validator, solidity developer tools, web3 utilities" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/ethereum-toolkit" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/ethereum-toolkit" />
        <meta property="og:title" content="Free Ethereum Developer Toolkit - Wei Converter, Keccak256, ABI Encoder | OG Technologies EU" />
        <meta property="og:description" content="Free browser-based Ethereum developer tools: Wei/Gwei/ETH converter, Keccak256 hash, function selector, ABI encoder/decoder, EIP-55 address checksum. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/ethereum-toolkit" />
        <meta name="twitter:title" content="Free Ethereum Developer Toolkit - Wei Converter, Keccak256, ABI Encoder | OG Technologies EU" />
        <meta name="twitter:description" content="Free browser-based Ethereum developer tools: Wei/Gwei/ETH converter, Keccak256 hash, function selector, ABI encoder/decoder, EIP-55 address checksum. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Ethereum Developer Toolkit',
            url: 'https://www.ogtechnologies.co/tools/ethereum-toolkit',
            description: 'Free browser-based Ethereum developer tools: Wei/Gwei/ETH unit converter, Keccak256 hash generator, Solidity function selector calculator, ABI encoder/decoder, and EIP-55 address checksum validator. 100% client-side.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            featureList: [
              'Wei / Gwei / Finney / Ether unit converter with BigInt precision',
              'Keccak256 hash generator for text and hex input',
              'Solidity function selector calculator (4-byte selectors)',
              'ABI encoder and decoder for smart contract calldata',
              'EIP-55 Ethereum address checksum validator',
            ],
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            creator: {
              '@type': 'Organization',
              name: 'OG Technologies EU',
              url: 'https://www.ogtechnologies.co/',
            },
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
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1">Ethereum Developer Toolkit</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Free browser-based utilities for Ethereum and Solidity developers. Convert units, hash with Keccak256,
                  compute function selectors, encode ABI calldata, and validate addresses. Everything runs in your browser — no data is sent to any server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap rounded-lg overflow-hidden border border-gray-600 mb-8">
                  {TABS.map((tab) => (
                    <Link
                      key={tab.id}
                      to={tab.path}
                      className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-medium transition-colors text-center ${
                        tab.id === 'wei'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>

                <ActiveComponent />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default EthereumToolkit;
