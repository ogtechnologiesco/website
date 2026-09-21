import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageIllustration from '../partials/PageIllustration';

const TOOL_CATEGORIES = [
  {
    name: 'Image & PDF',
    tools: [
      { name: 'HTML to Image', path: '/tools/html-to-image/', description: 'Convert HTML content to images.' },
      { name: 'Screenshot to Image', path: '/tools/screenshot-to-image/', description: 'Capture screenshots of web pages.' },
      { name: 'PDF Tools', path: '/tools/pdf-tools/', description: 'PDF manipulation and conversion utilities.' },
      { name: 'Merge PDF', path: '/tools/merge-pdf/', description: 'Combine multiple PDF files into one.' },
      { name: 'Split PDF', path: '/tools/split-pdf/', description: 'Extract pages or ranges from a PDF.' },
      { name: 'Image to PDF', path: '/tools/image-to-pdf/', description: 'Convert PNG/JPG images to PDF.' },
      { name: 'Document to PDF', path: '/tools/document-to-pdf/', description: 'Convert DOCX/ODT/TXT documents to PDF.' },
      { name: 'PDF to Word', path: '/tools/pdf-to-word/', description: 'Convert PDF to DOCX, TXT, or HTML.' },
    ],
  },
  {
    name: 'XML Tools',
    tools: [
      { name: 'XML Tools', path: '/tools/xml-tools/', description: 'Format, validate, convert, and query XML.' },
      { name: 'XML Formatter', path: '/tools/xml-formatter/', description: 'Beautify XML with custom indentation.' },
      { name: 'XML Validator', path: '/tools/xml-validator/', description: 'Check XML well-formedness with error details.' },
      { name: 'XML to JSON', path: '/tools/xml-to-json/', description: 'Convert XML to JSON (@-prefix convention).' },
      { name: 'XML Minifier', path: '/tools/xml-minifier/', description: 'Compress XML by removing whitespace.' },
      { name: 'XPath Tester', path: '/tools/xpath-tester/', description: 'Evaluate XPath 1.0 expressions live.' },
      { name: 'XML to CSV', path: '/tools/xml-to-csv/', description: 'Convert XML to CSV with record detection.' },
    ],
  },
  {
    name: 'Security',
    tools: [
      { name: 'Security Scanner', path: '/tools/security-tools/', description: 'Scan websites for security vulnerabilities.' },
      { name: 'Blockchain Compliance Checker', path: '/tools/blockchain-compliance-checker/', description: 'Check smart contracts for regulatory compliance.' },
    ],
  },
  {
    name: 'ISO Standards',
    tools: [
      { name: 'ISO 27001 Gap Analysis', path: '/tools/iso-27001-gap-analysis/', description: 'Assess your ISMS against ISO/IEC 27001:2022.' },
      { name: 'ISO 9001 Readiness Checker', path: '/tools/iso-9001-readiness-checker/', description: 'Assess your QMS against ISO 9001:2015.' },
      { name: 'ISO 42001 AI Readiness', path: '/tools/iso-42001-ai-readiness/', description: 'Evaluate your AIMS against ISO/IEC 42001:2023.' },
      { name: 'ISO 8601 Date Validator', path: '/tools/iso-8601-validator/', description: 'Validate ISO 8601 / RFC 3339 date-time strings.' },
    ],
  },
  {
    name: 'Developer Tools',
    tools: [
      { name: 'Ethereum Toolkit', path: '/tools/ethereum-toolkit/', description: 'Wei converter, Keccak256, ABI encoder, and more.' },
      { name: 'Wei Converter', path: '/tools/wei-converter/', description: 'Convert Wei, Gwei, Finney, and Ether.' },
      { name: 'Keccak256 Hash', path: '/tools/keccak256-hash/', description: 'Compute Ethereum Keccak-256 hashes.' },
      { name: 'Function Selector', path: '/tools/function-selector/', description: 'Calculate 4-byte Solidity function selectors.' },
      { name: 'ABI Encoder', path: '/tools/abi-encoder/', description: 'Encode and decode Ethereum ABI calldata.' },
      { name: 'Address Checksum', path: '/tools/address-checksum/', description: 'Validate EIP-55 checksummed addresses.' },
      { name: 'AWS ARN Parser', path: '/tools/aws-arn-parser/', description: 'Parse and build AWS ARN strings.' },
      { name: 'IAM Policy Validator', path: '/tools/iam-policy-validator/', description: 'Flag wildcards and privilege escalation in IAM policies.' },
      { name: 'SAP OData URL Builder', path: '/tools/sap-odata-url-builder/', description: 'Build SAP OData query URLs interactively.' },
      { name: 'Hash Generator', path: '/tools/hash-generator/', description: 'MD5, SHA-1, SHA-256, SHA-512, Keccak hashes.' },
    ],
  },
];

function Tools() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free Online Tools - Developer, PDF, XML & Security Utilities | OG Technologies EU</title>
        <meta name="description" content="Free browser-based tools by OG Technologies EU: PDF converters, XML formatter and validator, Ethereum developer toolkit, hash generator, ISO readiness checkers, and security scanners. No uploads — everything runs locally." />
        <meta name="keywords" content="free online tools, developer tools, PDF tools, XML tools, Ethereum toolkit, hash generator, ISO 27001, security scanner, browser-based utilities" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/" />
        <meta property="og:title" content="Free Online Tools - Developer, PDF, XML & Security Utilities | OG Technologies EU" />
        <meta property="og:description" content="Free browser-based tools: PDF converters, XML utilities, Ethereum toolkit, hash generator, ISO readiness checkers, and security scanners." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/" />
        <meta name="twitter:title" content="Free Online Tools - Developer, PDF, XML & Security Utilities | OG Technologies EU" />
        <meta name="twitter:description" content="Free browser-based tools: PDF converters, XML utilities, Ethereum toolkit, hash generator, ISO readiness checkers, and security scanners." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Free Online Tools',
            url: 'https://www.ogtechnologies.co/tools/',
            description: 'Free browser-based tools by OG Technologies EU: PDF converters, XML utilities, Ethereum toolkit, hash generator, ISO readiness checkers, and security scanners.',
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
                <h1 className="h1">Free Online Tools</h1>
                <p className="text-xl text-gray-400 mt-4">
                  A collection of free utilities for developers, security teams, and compliance
                  professionals. Everything runs in your browser — no data is sent to any server.
                </p>
              </div>

              {TOOL_CATEGORIES.map((category, categoryIndex) => (
                <div key={category.name} className="mb-12" data-aos="fade-up" data-aos-delay={categoryIndex * 100}>
                  <h2 className="h3 mb-6">{category.name}</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.tools.map((tool) => (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        className="block p-5 rounded-lg border border-gray-700 bg-gray-800/50 hover:border-purple-600 hover:bg-gray-800 transition duration-150 ease-in-out"
                      >
                        <h3 className="font-semibold text-gray-200 mb-1">{tool.name}</h3>
                        <p className="text-sm text-gray-400">{tool.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Tools;
