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
        <title>ISO 27001 Gap Analysis Tool - Free Assessment & PDF Report | OG Technologies EU</title>
        <meta name="description" content="Free ISO/IEC 27001:2022 gap analysis and readiness assessment. Check your ISMS against all clauses and Annex A controls — readiness score, prioritized gap list, and a downloadable PDF report. No signup." />
        <meta name="keywords" content="ISO 27001 gap analysis, ISO 27001 gap assessment, ISO 27001 readiness assessment, ISO 27001 gap analysis template, ISMS compliance checker, ISO 27001 self-assessment, information security gap analysis, Annex A controls, ISO 27001:2022 checker" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/iso-27001-gap-analysis/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/iso-27001-gap-analysis/" />
        <meta property="og:title" content="ISO 27001 Gap Analysis Tool - Free Readiness Assessment | OG Technologies EU" />
        <meta property="og:description" content="Free ISO/IEC 27001:2022 gap analysis tool. Assess your ISMS, get a readiness score, prioritized gaps, and downloadable PDF report." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/iso-27001-gap-analysis/" />
        <meta name="twitter:title" content="ISO 27001 Gap Analysis Tool - Free Readiness Assessment | OG Technologies EU" />
        <meta name="twitter:description" content="Free ISO/IEC 27001:2022 gap analysis tool. Assess your ISMS, get a readiness score, prioritized gaps, and downloadable PDF report." />
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
                <h1 className="h1 mb-4">ISO 27001 Gap Analysis Tool</h1>
                <p className="text-xl text-gray-400 mb-4">
                  Run a free gap assessment against ISO/IEC 27001:2022. Get an instant readiness score,
                  a prioritized gap list with remediation advice, and a downloadable PDF report. No signup.
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

              <div className="max-w-4xl mx-auto mt-12">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">What is an ISO 27001 gap analysis?</h3>
                      <p className="text-sm">
                        A gap analysis compares your current information security practices against the
                        requirements of ISO/IEC 27001:2022 — the management system clauses (4–10) and the
                        Annex A controls. It produces a list of gaps to remediate before a certification
                        audit, so you can budget effort and sequence work.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">What is the difference between a gap analysis and a risk assessment?</h3>
                      <p className="text-sm">
                        A gap analysis measures your practices against the standard's requirements. A risk
                        assessment (required by Clause 6.1.2) identifies and evaluates threats to your specific
                        information assets. You need both: the risk assessment decides which controls matter;
                        the gap analysis shows which of those controls are missing or incomplete.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">How long does an ISO 27001 gap analysis take?</h3>
                      <p className="text-sm">
                        This self-assessment takes about 10 minutes. A consultant-led gap analysis typically
                        takes 2–6 weeks depending on organization size, documentation maturity, and how many
                        sites and systems are in scope.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">What does the PDF report include?</h3>
                      <p className="text-sm">
                        The downloadable report contains your overall readiness score and grade, a
                        clause-by-clause and Annex A breakdown, a prioritized gap list with remediation
                        recommendations, and an estimated timeline to certification readiness — formatted for
                        sharing with management or auditors.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Is this a substitute for a certification audit?</h3>
                      <p className="text-sm">
                        No. This is a self-assessment that gives you a baseline and a remediation roadmap.
                        Certification requires a two-stage audit by an accredited certification body — but
                        arriving at Stage 1 with a completed gap analysis significantly improves your chances
                        of passing without major nonconformities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Iso27001GapAnalysis;
