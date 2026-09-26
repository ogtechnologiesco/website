import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import AssessmentForm from './AssessmentForm';
import AssessmentResults from './AssessmentResults';
import { evaluateAssessment } from './assessmentEngine.jsx';
import toast from 'react-hot-toast';

function Iso42001AiReadiness() {
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
        service: `ISO 42001 AI Readiness Assessment | Company Size: ${data.companySize} | AI Role: ${data.aiRole || 'N/A'} | Industry: ${data.industry || 'N/A'}`,
        description: `Readiness Score: ${assessmentResults.summary.readinessScore}/100, Grade: ${assessmentResults.summary.grade}, Maturity: ${assessmentResults.summary.maturityLevel}, Critical Gaps: ${assessmentResults.summary.criticalGaps}, Partial Gaps: ${assessmentResults.summary.partialGaps}, Est. Weeks to Ready: ${assessmentResults.summary.weeksToReady}`,
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
      toast.success('AI readiness report generated!');
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
        <title>ISO 42001 AI Readiness Assessment - Free AIMS Checker | OG Technologies EU</title>
        <meta name="description" content="Free ISO/IEC 42001:2023 AI readiness assessment tool. Evaluate your AI Management System against all clauses and Annex A controls. Get a maturity score, prioritized gap list, and downloadable PDF report." />
        <meta name="keywords" content="ISO 42001 gap analysis, ISO 42001 readiness assessment, AI management system checker, AIMS compliance, ISO 42001:2023 self-assessment, AI governance assessment, AI risk management tool" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/iso-42001-ai-readiness/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/iso-42001-ai-readiness/" />
        <meta property="og:title" content="ISO 42001 AI Readiness Assessment - Free AIMS Checker | OG Technologies EU" />
        <meta property="og:description" content="Free ISO/IEC 42001:2023 AI readiness assessment. Evaluate your AIMS, get a maturity score, prioritized gaps, and downloadable PDF report." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/iso-42001-ai-readiness/" />
        <meta name="twitter:title" content="ISO 42001 AI Readiness Assessment - Free AIMS Checker | OG Technologies EU" />
        <meta name="twitter:description" content="Free ISO/IEC 42001:2023 AI readiness assessment. Evaluate your AIMS, get a maturity score, prioritized gaps, and downloadable PDF report." />
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
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1 mb-4">ISO 42001 AI Readiness Assessment</h1>
                <p className="text-xl text-gray-400 mb-4">
                  Assess your organization against ISO/IEC 42001:2023, the international standard for
                  AI Management Systems. Get a maturity score, prioritized gap list, and downloadable
                  PDF report. Free, no signup.
                </p>
              </div>

              {results && formData ? (
                <AssessmentResults results={results} formData={formData} onReset={handleReset} />
              ) : (
                <div className="max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h2 className="text-2xl font-bold text-white">What Is ISO 42001?</h2>
                        </div>
                        <p className="text-gray-300 mb-4">
                          ISO/IEC 42001:2023 is the first international standard for AI Management Systems (AIMS).
                          It provides a framework for responsible AI development, deployment, and use —
                          helping organizations manage AI-related risks while building trust with stakeholders.
                        </p>
                        <p className="text-gray-300">
                          Certification demonstrates that your organization has a systematic approach to
                          AI governance, covering ethics, risk management, impact assessments, data
                          governance, and human oversight. This tool helps you identify where you stand.
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
                            <span><strong>AI Policy & Governance:</strong> Ethics, acceptable use, governance structures</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>AI Risk Register:</strong> Risk identification, rating, and mitigation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>AI Impact Assessments:</strong> Evaluating impacts on individuals and society</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Data Governance:</strong> Training data quality, provenance, bias testing</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Model Lifecycle:</strong> Design, development, deployment, monitoring, decommissioning</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Transparency & Oversight:</strong> System cards, human oversight, drift monitoring</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">Maturity Scale</h3>
                        <p className="text-sm text-gray-300 mb-3">Each control is rated on a 4-point maturity scale:</p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-red-400 mr-2 mt-1">0</span>
                            <span><strong>Not in place</strong> — no process or activity implemented</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-amber-400 mr-2 mt-1">1</span>
                            <span><strong>Partially in place</strong> — informal or inconsistent</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-400 mr-2 mt-1">2</span>
                            <span><strong>Mostly in place</strong> — implemented but not fully evidenced</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-2 mt-1">3</span>
                            <span><strong>Fully in place</strong> — implemented, documented, evidenced, and improved</span>
                          </li>
                        </ul>
                      </div>
                    </div>

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

export default Iso42001AiReadiness;
