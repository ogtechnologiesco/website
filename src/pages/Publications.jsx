import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';

const publications = [
  {
    title: 'Framework for Blockchain Interoperability in Cross-Border Payments',
    version: 'v1.2',
    description:
      'A framework for making blockchain-based cross-border payment systems interoperable — architectural patterns, shared interfaces, and how DLT rails connect with existing payment infrastructure.',
    url: 'https://blockstand.eu/blockstand/uploads/2025/05/Framework_for_Blockchain_Interoperability_in_Cross_Border_Payments_version-v1.2.pdf',
  },
  {
    title: 'Regulatory Compliance and Governance Model for Cross-Border Payments using Blockchain Technology',
    version: 'v1.0',
    description:
      'A governance and compliance model for blockchain-based cross-border payments — mapping regulatory obligations such as AML/KYC and data protection onto decentralized payment flows.',
    url: 'https://blockstand.eu/blockstand/uploads/2025/05/Regulatory_compliance_and_Governance_Model_1.0.pdf',
  },
  {
    title: 'Integrating Verifiable Credentials and Decentralized Identifiers in Cross-Border Payments',
    version: 'v1.0',
    description:
      'Use cases, benefits, and interoperability opportunities from integrating W3C Verifiable Credentials and Decentralized Identifiers (DIDs) into cross-border payment processes.',
    url: 'https://blockstand.eu/blockstand/uploads/2025/05/Use_cases__benefits__opportunities_and_interoperability_benefits_of_integrating_VCs_and_DIDs_in_cross_border_payment.pdf',
  },
  {
    title: 'Secure Transaction Protocol Blueprint',
    version: 'v1.0',
    description:
      'A protocol blueprint for secure blockchain payment transactions — message flows, trust assumptions, and the security controls needed for cross-border settlement.',
    url: 'https://blockstand.eu/blockstand/uploads/2025/05/Secure_Transaction_Protocol_Blueprint_1_0.pdf',
  },
];

function Publications() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Publications - Blockchain Standardization Reports | OG Technologies EU</title>
        <meta name="description" content="Published standardization reports on blockchain interoperability, regulatory compliance, verifiable credentials, and secure protocols for cross-border payments — produced as a BlockStand expert." />
        <meta name="keywords" content="blockchain publications, cross-border payments, BlockStand, blockchain interoperability, verifiable credentials, decentralized identifiers, DIDs, secure transaction protocol, ISO TC 307" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/publications/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/publications/" />
        <meta property="og:title" content="Publications - Blockchain Standardization Reports | OG Technologies EU" />
        <meta property="og:description" content="Standardization reports on blockchain interoperability, compliance, verifiable credentials, and secure protocols for cross-border payments — produced as a BlockStand expert." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/publications/" />
        <meta name="twitter:title" content="Publications - Blockchain Standardization Reports | OG Technologies EU" />
        <meta name="twitter:description" content="Standardization reports on blockchain interoperability, compliance, verifiable credentials, and secure protocols for cross-border payments — produced as a BlockStand expert." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
      </Helmet>

      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">

        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h1 className="h1 mb-4">Publications — Blockchain Standardization Reports</h1>
                <p className="text-xl text-gray-400 mb-8">
                  Standardization reports and technical deliverables authored by OG Technologies EU.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BlockStand reports */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">BlockStand Expert Deliverables</h2>
                <p className="text-xl text-gray-400">
                  <a href="https://blockstand.eu/" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">BlockStand</a> is an EU-funded project supporting the participation of European experts in blockchain and DLT standardization. As an appointed expert on cross-border payments, our founder authored the following reports.
                </p>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                {publications.map((pub) => (
                  <a
                    key={pub.title}
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition duration-150 ease-in-out"
                    data-aos="fade-up"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="h4 mb-2">{pub.title}</h3>
                        <p className="text-gray-400 mb-3">{pub.description}</p>
                        <p className="text-sm text-gray-500">BlockStand deliverable · {pub.version} · PDF</p>
                      </div>
                      <svg className="w-5 h-5 text-purple-400 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
              <div className="max-w-3xl mx-auto text-center mt-10">
                <p className="text-gray-400">
                  View the full expert profile on the{' '}
                  <a href="https://blockstand.eu/meet-our-experts/" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">
                    BlockStand experts page
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-xl text-gray-400 mb-6">
                  These reports reflect the same standards expertise we bring to consulting engagements — read more on our{' '}
                  <Link to="/standards/" className="text-purple-400 hover:text-purple-300">standards services</Link> or{' '}
                  <Link to="/insights/" className="text-purple-400 hover:text-purple-300">insights articles</Link>.
                </p>
                <Link to="/quote/" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}

export default Publications;
