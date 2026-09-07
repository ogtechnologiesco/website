import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import ComplianceForm from './ComplianceForm';
import ComplianceResults from './ComplianceResults';
import { evaluateCompliance } from './standardsEngine.jsx';
import toast from 'react-hot-toast';

function BlockchainCompliance() {
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const mappedService = [
        data.blockchainNetwork?.length > 0 ? `Blockchain: ${data.blockchainNetwork.join(', ')}` : null,
        data.useCase ? `Use Case: ${data.useCase}` : null,
        data.identity ? `Identity: ${data.identity}` : null,
        data.payments ? `Payments: ${data.payments}` : null,
        data.jurisdiction?.length > 0 ? `Jurisdiction: ${data.jurisdiction.join(', ')}` : null,
        data.dataHandled?.length > 0 ? `Data: ${data.dataHandled.join(', ')}` : null,
        data.targetMarket?.length > 0 ? `Target Market: ${data.targetMarket.join(', ')}` : null,
      ].filter(Boolean).join(' | ');

      const mappedDescription = [
        data.additionalComments ? `Additional Comments: ${data.additionalComments}` : null,
      ].filter(Boolean).join('\n');

      const quoteData = {
        name: data.contactName,
        email: data.email,
        phone: data.phone,
        company: data.companyName,
        service: `Blockchain Compliance Assessment | ${mappedService}`,
        description: mappedDescription || 'Blockchain Standards Compliance Checker submission',
        companySize: data.companySize,
      };

      const response = await fetch('https://og-technologies.herokuapp.com/api/quote/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      const complianceResults = evaluateCompliance(data);
      setFormData(data);
      setResults(complianceResults);
      toast.success('Compliance roadmap generated successfully!');
    } catch (error) {
      console.error('Error submitting compliance assessment:', error);
      toast.error('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setFormData(null);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Blockchain Compliance Checker - Web3 Standards & Regulatory Compliance | OG Technologies EU</title>
        <meta name="description" content="Free Web3 & blockchain standards compliance checker. Enter your project details and get a personalized compliance roadmap covering eIDAS, W3C VCs, DID Core, ISO 27001, GDPR, ISO 20022, MiCA, DORA and more." />
        <meta name="keywords" content="blockchain compliance checker, blockchain regulatory compliance, EBSI compliance, verifiable credentials compliance, blockchain standards, Web3 compliance Europe, eIDAS blockchain, W3C VC compliance, DID compliance, MiCA compliance, DORA blockchain, ISO 20022 crypto" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/blockchain-compliance-checker" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/blockchain-compliance-checker" />
        <meta property="og:title" content="Blockchain Compliance Checker - Web3 Standards & Regulatory Compliance | OG Technologies EU" />
        <meta property="og:description" content="Free Web3 & blockchain standards compliance checker. Get a personalized compliance roadmap covering eIDAS, W3C VCs, DID Core, ISO 27001, GDPR, ISO 20022, and more." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/blockchain-compliance-checker" />
        <meta name="twitter:title" content="Blockchain Compliance Checker - Web3 Standards & Regulatory Compliance | OG Technologies EU" />
        <meta name="twitter:description" content="Free Web3 & blockchain standards compliance checker. Get a personalized compliance roadmap covering eIDAS, W3C VCs, DID Core, ISO 27001, GDPR, ISO 20022, and more." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Blockchain Compliance Checker',
            url: 'https://www.ogtechnologies.co/tools/blockchain-compliance-checker',
            description: 'Free Web3 & blockchain standards compliance checker. Enter your project details and get a personalized compliance roadmap covering eIDAS, W3C Verifiable Credentials, DID Core, ISO 27001, GDPR, ISO 20022, MiCA, DORA and more.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            featureList: [
              'Personalized standards mapping based on blockchain network, use case, and jurisdiction',
              'Covers eIDAS, W3C VCs, DID Core, ISO 27001, ISO 29115, GDPR, ISO 20022, MiCA, DORA',
              'FATF Travel Rule, CCPA/CPRA, UK GDPR, EBSI compliance, CEN/CENELEC JTC 19',
              'Compliance readiness scoring with grade assessment',
              'Downloadable PDF Standards & Compliance Roadmap',
              'Expert consultation lead capture for implementation support',
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

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Blockchain Compliance &amp; Standards Checker</h1>
                <p className="text-xl text-gray-400 mb-8">
                  Enter your project details to get a personalized compliance roadmap covering
                  eIDAS, W3C Verifiable Credentials, DID Core, ISO standards, GDPR, MiCA, DORA,
                  and more. Free, instant, and downloadable.
                </p>
              </div>

              {results && formData ? (
                <ComplianceResults results={results} formData={formData} onReset={handleReset} />
              ) : (
                <div className="max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column — Educational Content */}
                    <div>
                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h2 className="text-2xl font-bold text-white">Why Compliance Matters</h2>
                        </div>
                        <p className="text-gray-300 mb-4">
                          The blockchain and Web3 landscape is rapidly evolving with new regulations
                          and standards emerging globally. From the EU's eIDAS 2.0 and MiCA to W3C
                          Verifiable Credentials and ISO standards, staying compliant is essential
                          for enterprise adoption and market access.
                        </p>
                        <p className="text-gray-300">
                          Our checker maps your project to the most relevant standards and regulations
                          based on your blockchain network, use case, jurisdiction, and data handling practices.
                        </p>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">Standards We Cover</h3>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>eIDAS / European Digital Identity</strong> — EU digital identity and trust services regulation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>W3C Verifiable Credentials</strong> — standard for cryptographically secure digital credentials</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>DID Core (W3C)</strong> — decentralized identifiers specification</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>ISO/IEC 27001 &amp; 27005</strong> — information security management and risk assessment</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>GDPR &amp; CCPA/CPRA</strong> — data protection regulations for EU and US</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>ISO 20022</strong> — financial messaging standard for payment systems</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>MiCA &amp; DORA</strong> — EU crypto-asset and operational resilience regulations</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>FATF Travel Rule</strong> — AML/CFT requirements for virtual asset transfers</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>EBSI, CEN/CENELEC JTC 19</strong> — European blockchain infrastructure and standards</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">Our Expertise</h3>
                        <p className="text-gray-300 mb-4">
                          As Austrian delegates for ISO/TC 307 and CEN/CENELEC JTC 19, we bring
                          unparalleled expertise in blockchain and DLT standardization. Our team
                          specializes in:
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>Blockchain compliance gap analysis and roadmaps</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>Digital identity implementations (eIDAS, W3C VCs, DIDs)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>Regulatory compliance for crypto-assets (MiCA, DORA, FATF)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>ISO 27001/27005 security framework implementation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">✓</span>
                            <span>EBSI integration and European blockchain standards</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Column — Form */}
                    <div>
                      <ComplianceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default BlockchainCompliance;
