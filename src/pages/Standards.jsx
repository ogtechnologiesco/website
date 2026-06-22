import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';

function Standards() {
  return (
    <>
      <Helmet>
        <title>ISO Standards & Certification Services - OG Technologies EU</title>
        <meta name="description" content="Expert ISO standards and certification services from Austrian delegates for ISO/TC 307 and CEN CENELEC JTC 19. Blockchain, finance, sustainability, and security standards consulting." />
        <meta name="keywords" content="ISO standards, ISO/TC 307, CEN CENELEC JTC 19, ISO 20022, ISO 27001, ISO 9001, blockchain standards, certification services, Austrian delegates" />
        <link rel="canonical" href="https://ogtechnologies.co/standards" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ogtechnologies.co/standards" />
        <meta property="og:title" content="ISO Standards & Certification Services - OG Technologies EU" />
        <meta property="og:description" content="Expert ISO standards and certification services from Austrian delegates. Blockchain, finance, sustainability, and security standards consulting." />
        <meta property="og:image" content="https://ogtechnologies.co/og-og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ogtechnologies.co/standards" />
        <meta name="twitter:title" content="ISO Standards & Certification Services - OG Technologies EU" />
        <meta name="twitter:description" content="Expert ISO standards and certification services from Austrian delegates. Blockchain, finance, sustainability, and security standards consulting." />
        <meta name="twitter:image" content="https://ogtechnologies.co/og-og-image.png" />
      </Helmet>
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      
      <main className="grow">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-20 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              
              {/* Page Header */}
              <div className="text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">ISO Standards & Certification Services</h1>
                <p className="text-xl text-gray-400 mb-8">
                  Expert guidance on blockchain, finance, and sustainability standards
                </p>
                <div className="max-w-3xl mx-auto">
                  <p className="text-lg text-gray-300">
                    As Austrian delegates for ISO/TC 307 and CEN CENELEC JTC 19, we provide unparalleled expertise in blockchain and digital ledger technology standardization, complemented by comprehensive financial services and sustainability standards consulting.
                  </p>
                </div>
              </div>

              {/* Blockchain & Digital Standards */}
              <div className="mb-20">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      ⛓
                    </div>
                    <h2 className="text-2xl font-bold text-white">Blockchain & Digital Standards</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* ISO/TC 307 */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">ISO/TC 307</h3>
                      <p className="text-gray-300 mb-4">Blockchain and Distributed Ledger Technologies</p>
                      <div className="bg-purple-900 bg-opacity-50 rounded p-3 mb-4">
                        <p className="text-purple-300 text-sm font-semibold">🇦🇹 Austrian Delegate Expertise</p>
                      </div>
                      <ul className="space-y-2 text-gray-300 mb-4">
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          Technical specifications and governance frameworks
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          Implementation guidance for enterprises
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          Security and privacy standards
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          Interoperability and conformance testing
                        </li>
                      </ul>
                      <Link 
                        to="/quote"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                      >
                        Get ISO/TC 307 Consulting
                      </Link>
                    </div>

                    {/* CEN CENELEC JTC 19 */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">CEN CENELEC JTC 19</h3>
                      <p className="text-gray-300 mb-4">European Blockchain and DLT Standards</p>
                      <div className="bg-blue-900 bg-opacity-50 rounded p-3 mb-4">
                        <p className="text-blue-300 text-sm font-semibold">🇪🇺 European Standardization</p>
                      </div>
                      <ul className="space-y-2 text-gray-300 mb-4">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          European standardization perspective
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          Alignment with ISO/TC 307 initiatives
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          Regulatory compliance frameworks
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          Industry-specific applications
                        </li>
                      </ul>
                      <Link 
                        to="/quote"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                      >
                        Get JTC 19 Consulting
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Services Standards */}
              <div className="mb-20">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      💰
                    </div>
                    <h2 className="text-2xl font-bold text-white">Financial Services Standards</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* ISO 20022 */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">ISO 20022</h3>
                      <p className="text-gray-300 mb-4">Financial Services - Universal Financial Industry Message Scheme</p>
                      <ul className="space-y-2 text-gray-300 mb-4">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Payment systems integration and modernization
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Cross-border payments standardization
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          API and messaging implementation
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Real-time gross settlement (RTGS) systems
                        </li>
                      </ul>
                      <Link 
                        to="/quote"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                      >
                        Get ISO 20022 Implementation
                      </Link>
                    </div>

                    {/* ISO 32210 */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">ISO 32210</h3>
                      <p className="text-gray-300 mb-4">Sustainable Finance - Framework for Incorporating ESG</p>
                      <ul className="space-y-2 text-gray-300 mb-4">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Environmental, Social, Governance (ESG) criteria
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Sustainable investment frameworks
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          ESG reporting and compliance
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Climate-related financial disclosures
                        </li>
                      </ul>
                      <Link 
                        to="/quote"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                      >
                        Get ESG Framework Consulting
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Management Standards */}
              <div className="mb-20">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      🔒
                    </div>
                    <h2 className="text-2xl font-bold text-white">Security & Management Standards</h2>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* ISO 27001 */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">ISO 27001</h3>
                      <p className="text-gray-300 mb-3">Information Security Management</p>
                      <ul className="space-y-1 text-gray-400 text-sm mb-4">
                        <li>• Risk assessment</li>
                        <li>• Security controls</li>
                        <li>• Compliance management</li>
                      </ul>
                    </div>

                    {/* ISO IMS */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">ISO Integrated Management System</h3>
                      <p className="text-gray-300 mb-3">ISO 9001, 14001, 45001</p>
                      <ul className="space-y-1 text-gray-400 text-sm mb-4">
                        <li>• Quality management</li>
                        <li>• Environmental management</li>
                        <li>• Health & safety</li>
                      </ul>
                    </div>

                    {/* AIMS */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">AIMS (ISO/IEC 42001)</h3>
                      <p className="text-gray-300 mb-3">AI Management System</p>
                      <ul className="space-y-1 text-gray-400 text-sm mb-4">
                        <li>• AI governance</li>
                        <li>• Risk management</li>
                        <li>• Ethical AI practices</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regulatory Compliance - DORA */}
              <div className="mb-20">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      🛡️
                    </div>
                    <h2 className="text-2xl font-bold text-white">DORA Compliance</h2>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Digital Operational Resilience Act (DORA) - Essential compliance for financial entities operating in the EU
                  </p>
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded p-4 mb-6">
                    <p className="text-purple-300 text-sm font-semibold">⚠️ Deadline: January 2025</p>
                    <p className="text-gray-400 text-sm mt-1">DORA becomes fully applicable - ensure your organization is prepared</p>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>ICT risk management framework implementation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Third-party risk management and oversight</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Digital operational resilience testing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>ICT incident reporting capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Specialized expertise for blockchain & Web3 companies</span>
                    </li>
                  </ul>
                  <Link 
                    to="/dora"
                    className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                  >
                    Take DORA Assessment
                  </Link>
                </div>
              </div>

              {/* Certification Support Services */}
              <div className="mb-20">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      🏆
                    </div>
                    <h2 className="text-2xl font-bold text-white">Certification Support Services</h2>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-yellow-400 text-2xl">📋</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">ISO Certifications</h3>
                      <p className="text-gray-400 text-sm">Preparation, audit support, and maintenance</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-400 text-2xl">🔐</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">SOC2 Compliance</h3>
                      <p className="text-gray-400 text-sm">Security, availability, processing, confidentiality</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-green-400 text-2xl">🇪🇺</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">NIS2 Directive</h3>
                      <p className="text-gray-400 text-sm">Network and information security compliance</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-purple-400 text-2xl">🌐</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">Cross-Standard Integration</h3>
                      <p className="text-gray-400 text-sm">Unified compliance strategies</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Process */}
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">Our Implementation Process</h2>
                  <p className="text-gray-400">From assessment to certification and beyond</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                      1
                    </div>
                    <h3 className="text-white font-semibold mb-2">Assessment</h3>
                    <p className="text-gray-400 text-sm">Gap analysis and requirements evaluation</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                      2
                    </div>
                    <h3 className="text-white font-semibold mb-2">Planning</h3>
                    <p className="text-gray-400 text-sm">Custom implementation roadmap</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                      3
                    </div>
                    <h3 className="text-white font-semibold mb-2">Implementation</h3>
                    <p className="text-gray-400 text-sm">Hands-on support and guidance</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                      4
                    </div>
                    <h3 className="text-white font-semibold mb-2">Certification</h3>
                    <p className="text-gray-400 text-sm">Audit preparation and ongoing support</p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Ready to Achieve Compliance Excellence?</h2>
                  <p className="text-gray-200 mb-6">
                    Leverage our unique expertise as Austrian delegates and industry leaders to navigate the complex world of international standards.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      to="/quote"
                      className="bg-white text-purple-600 hover:bg-gray-100 py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out"
                    >
                      Get Started Today
                    </Link>
                    <a 
                      href="mailto:hi@ogtechnologies.co?subject=Standards%20Consultation&body=I%20would%20like%20to%20schedule%20a%20consultation%20regarding%20ISO%20Standards%20%26%20Certification%20Services."
                      className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out"
                    >
                      Schedule Consultation
                    </a>
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

export default Standards;
