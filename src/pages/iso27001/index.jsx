import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import AssessmentForm from './AssessmentForm';
import AssessmentResults from './AssessmentResults';
import { evaluateAssessment } from './assessmentEngine.jsx';
import toast from 'react-hot-toast';

function Iso27001GapAnalysis() {
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const assessmentResults = evaluateAssessment(data.answers);

      const quoteData = {
        name: data.contactName,
        email: data.email,
        phone: data.phone,
        company: data.companyName,
        service: `ISO 27001 Gap Analysis | Company Size: ${data.companySize} | Industry: ${data.industry || 'N/A'}`,
        description: `Readiness Score: ${assessmentResults.summary.readinessScore}/100, Grade: ${assessmentResults.summary.grade}, Critical Gaps: ${assessmentResults.summary.criticalGaps}, Partial Gaps: ${assessmentResults.summary.partialGaps}, Est. Weeks to Ready: ${assessmentResults.summary.weeksToReady}`,
        companySize: data.companySize,
      };

      try {
        await fetch('https://og-technologies.herokuapp.com/api/quote/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quoteData),
        });
      } catch (submitErr) {
        console.error('Failed to submit quote:', submitErr);
      }

      setFormData(data);
      setResults(assessmentResults);
      toast.success('Gap analysis report generated!');
    } catch (error) {
      console.error('Error generating assessment:', error);
      toast.error('Failed to generate report. Please try again.');
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
        <title>ISO 27001 Gap Analysis Tool - Free Readiness Assessment | OG Technologies EU</title>
        <meta name="description" content="Free ISO/IEC 27001:2022 gap analysis tool. Assess your information security management system against all clauses and Annex A controls. Get a readiness score, prioritized gap list, and downloadable PDF report." />
        <meta name="keywords" content="ISO 27001 gap analysis, ISO 27001 readiness assessment, ISMS compliance checker, ISO 27001 self-assessment, information security gap analysis, Annex A controls, ISO 27001:2022 checker" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/iso-27001-gap-analysis" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/iso-27001-gap-analysis" />
        <meta property="og:title" content="ISO 27001 Gap Analysis Tool - Free Readiness Assessment | OG Technologies EU" />
        <meta property="og:description" content="Free ISO/IEC 27001:2022 gap analysis tool. Assess your ISMS, get a readiness score, prioritized gaps, and downloadable PDF report." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/iso-27001-gap-analysis" />
        <meta name="twitter:title" content="ISO 27001 Gap Analysis Tool - Free Readiness Assessment | OG Technologies EU" />
        <meta name="twitter:description" content="Free ISO/IEC 27001:2022 gap analysis tool. Assess your ISMS, get a readiness score, prioritized gaps, and downloadable PDF report." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'ISO 27001 Gap Analysis Tool',
            url: 'https://www.ogtechnologies.co/tools/iso-27001-gap-analysis',
            description: 'Free ISO/IEC 27001:2022 gap analysis tool. Assess your information security management system against all clauses and Annex A controls. Get a readiness score, prioritized gap list, and downloadable PDF report.',
            applicationCategory: 'SecurityApplication',
            operatingSystem: 'Any',
            featureList: [
              'Clause-by-clause assessment (Clauses 4–10)',
              'Annex A control assessment (Organizational, People, Physical, Technological)',
              'Readiness score with letter grade',
              'Prioritized gap list with remediation recommendations',
              'Downloadable PDF report',
              'Estimated weeks to certification readiness',
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
                <h1 className="h1 mb-4">ISO 27001 Gap Analysis Tool</h1>
                <p className="text-xl text-gray-400 mb-4">
                  Assess your organization against ISO/IEC 27001:2022. Get an instant readiness score,
                  a prioritized gap list with remediation advice, and a downloadable PDF report. Free, no signup.
                </p>
              </div>

              {results && formData ? (
                <AssessmentResults results={results} formData={formData} onReset={handleReset} />
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
                          <h2 className="text-2xl font-bold text-white">What Is ISO 27001?</h2>
                        </div>
                        <p className="text-gray-300 mb-4">
                          ISO/IEC 27001:2022 is the international standard for Information Security Management
                          Systems (ISMS). It provides a systematic approach to managing sensitive information,
                          covering people, processes, and technology.
                        </p>
                        <p className="text-gray-300">
                          Certification demonstrates to customers and regulators that your organization
                          follows best practices for information security. This tool helps you identify
                          where you stand and what to fix first.
                        </p>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">What This Tool Covers</h3>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Clauses 4–10:</strong> Context, Leadership, Planning, Support, Operation, Performance Evaluation, Improvement</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Annex A — Organizational:</strong> Policies, roles, asset management, supplier security, incident management</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Annex A — People:</strong> Screening, awareness training, employment terms</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Annex A — Physical:</strong> Access control, clear desk, equipment protection, secure disposal</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Annex A — Technological:</strong> Access control, cryptography, network security, logging, vulnerability management, backups</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">1.</span>
                            <span>Answer ~30 questions about your current security practices</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">2.</span>
                            <span>Get an instant readiness score with a letter grade (A–E)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">3.</span>
                            <span>Review your prioritized gap list with remediation recommendations</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">4.</span>
                            <span>Download a professional PDF report for your management team</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Column — Form */}
                    <div>
                      <AssessmentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
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

export default Iso27001GapAnalysis;
