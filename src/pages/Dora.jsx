import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';
import DoraForm from '../partials/DoraForm';

function Dora() {
  return (
    <>
      <Helmet>
        <title>DORA Compliance Assessment - OG Technologies EU</title>
        <meta name="description" content="Assess your Digital Operational Resilience Act (DORA) compliance status. Specialized assessment for fintech startups and enterprises using blockchain, DLT, and Web3 technologies." />
        <meta name="keywords" content="DORA compliance, Digital Operational Resilience Act, fintech compliance, blockchain regulation, DLT compliance, Web3 regulation, financial sector resilience" />
        <link rel="canonical" href="https://ogtechnologies.co/dora" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ogtechnologies.co/dora" />
        <meta property="og:title" content="DORA Compliance Assessment - OG Technologies EU" />
        <meta property="og:description" content="Specialized DORA compliance assessment for fintech and blockchain enterprises. Evaluate your digital operational resilience today." />
        <meta property="og:image" content="https://ogtechnologies.co/og-og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ogtechnologies.co/dora" />
        <meta name="twitter:title" content="DORA Compliance Assessment - OG Technologies EU" />
        <meta name="twitter:description" content="Specialized DORA compliance assessment for fintech and blockchain enterprises. Evaluate your digital operational resilience today." />
        <meta name="twitter:image" content="https://ogtechnologies.co/og-og-image.png" />
      </Helmet>
      <div className="flex flex-col min-h-screen overflow-hidden">

        {/* Site header */}
        <Header />

        {/* Page content */}
        <main className="grow">

          {/* Page illustration */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-20 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>

          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1 mb-4">DORA Compliance Assessment</h1>
                  <p className="text-xl text-gray-400 mb-8">
                    Specialized assessment for fintech startups and enterprises using blockchain, DLT, and Web3 technologies
                  </p>
                </div>

                {/* Content and Form */}
                <div className="max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    
                    {/* Left Column - Educational Content */}
                    <div>
                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                            🛡️
                          </div>
                          <h2 className="text-2xl font-bold text-white">What is DORA?</h2>
                        </div>
                        <p className="text-gray-300 mb-4">
                          The Digital Operational Resilience Act (DORA) is a European regulation that establishes uniform requirements for the operational resilience of ICT systems in the financial sector. It applies to financial entities and their critical ICT third-party service providers.
                        </p>
                        <p className="text-gray-300 mb-4">
                          DORA becomes fully applicable in January 2025 and covers key areas including ICT risk management, third-party risk, resilience testing, incident reporting, and information sharing.
                        </p>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">Why DORA Matters for Blockchain & Web3</h3>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>DeFi Protocols:</strong> Smart contract vulnerabilities and operational risks must be managed under DORA frameworks</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Crypto Exchanges:</strong> Operational resilience requirements for trading platforms and custody services</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>DLT Infrastructure:</strong> Network resilience, consensus mechanisms, and node operational requirements</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Web3 Services:</strong> Identity providers, oracle services, and bridge protocols as critical third parties</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Tokenized Assets:</strong> Operational requirements for security token offerings and asset management</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">Our Expertise</h3>
                        <p className="text-gray-300 mb-4">
                          As Austrian delegates for ISO/TC 307 and CEN CENELEC JTC 19, we bring unparalleled expertise in blockchain and DLT standardization. Our team specializes in:
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>DORA gap analysis and compliance roadmaps</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>ICT risk management framework implementation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>Third-party risk assessment for blockchain services</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>Digital operational resilience testing strategies</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>Incident response and reporting procedures</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Form */}
                    <div>
                      <DoraForm />
                    </div>

                  </div>
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

export default Dora;
