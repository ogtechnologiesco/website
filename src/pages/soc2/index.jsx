import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import AssessmentForm from './AssessmentForm';
import AssessmentResults from './AssessmentResults';
import { evaluateAssessment } from './assessmentEngine.jsx';
import toast from 'react-hot-toast';

function Soc2ReadinessChecker() {
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
        service: `SOC 2 Readiness Assessment | Company Size: ${data.companySize} | Industry: ${data.industry || 'N/A'}`,
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
      toast.success('Readiness report generated!');
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
        <title>SOC 2 Readiness Checker - Free Trust Services Criteria Assessment | OG Technologies EU</title>
        <meta name="description" content="Free SOC 2 readiness assessment based on the AICPA Trust Services Criteria. Check your controls across Security (Common Criteria), Availability, Processing Integrity, Confidentiality, and Privacy — instant score, prioritized gaps, downloadable PDF report. No signup." />
        <meta name="keywords" content="SOC 2 readiness checker, SOC 2 readiness assessment, SOC 2 compliance checklist, Trust Services Criteria, SOC 2 self-assessment, SOC 2 Type 2 preparation, SOC 2 gap analysis, SOC 2 audit readiness, SOC 2 questionnaire" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/soc-2-readiness-checker/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/soc-2-readiness-checker/" />
        <meta property="og:title" content="SOC 2 Readiness Checker - Free Trust Services Criteria Assessment | OG Technologies EU" />
        <meta property="og:description" content="Free SOC 2 readiness assessment against the AICPA Trust Services Criteria — readiness score, prioritized gaps, and a downloadable PDF report." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/soc-2-readiness-checker/" />
        <meta name="twitter:title" content="SOC 2 Readiness Checker - Free Trust Services Criteria Assessment | OG Technologies EU" />
        <meta name="twitter:description" content="Free SOC 2 readiness assessment against the AICPA Trust Services Criteria — readiness score, prioritized gaps, and a downloadable PDF report." />
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
                <h1 className="h1 mb-4">SOC 2 Readiness Checker</h1>
                <p className="text-xl text-gray-400 mb-4">
                  Run a free readiness assessment against the AICPA Trust Services Criteria. Get an instant
                  readiness score, a prioritized gap list with remediation advice, and a downloadable PDF report. No signup.
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <h2 className="text-2xl font-bold text-white">What Is SOC 2?</h2>
                        </div>
                        <p className="text-gray-300 mb-4">
                          SOC 2 is an independent audit report from the AICPA that attests how a service
                          organization protects customer data. Unlike a certification, it is an auditor&apos;s
                          opinion on whether your controls are designed (Type I) and operating effectively
                          over time (Type II) against the Trust Services Criteria.
                        </p>
                        <p className="text-gray-300">
                          Enterprise buyers increasingly require a SOC 2 report before signing. This tool
                          measures how far your current controls are from audit-ready.
                        </p>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">What This Tool Covers</h3>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Security (Common Criteria):</strong> the CC1–CC9 series — always in scope for every SOC 2 report</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Availability:</strong> capacity, redundancy, recovery testing (A1 series)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Processing Integrity:</strong> input validation and output accuracy (PI1 series)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Confidentiality:</strong> classification, retention, secure disposal (C1 series)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Privacy:</strong> notice, consent, data subject rights, PII disposal (P series)</span>
                          </li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-4">
                          Only Security is mandatory — mark questions N/A for categories outside your scope
                          and they won&apos;t count against your score.
                        </p>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">1.</span>
                            <span>Answer ~30 questions about your current controls and practices</span>
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

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mt-8">
                        <h3 className="text-xl font-bold text-white mb-4">Further Reading</h3>
                        <ul className="space-y-3 text-gray-300 text-sm">
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">→</span>
                            <a href="/insights/soc-2-trust-services-criteria/" className="text-purple-400 hover:text-purple-300 underline">The complete Trust Services Criteria list, explained</a>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">→</span>
                            <a href="/insights/soc-2-vs-iso-27001/" className="text-purple-400 hover:text-purple-300 underline">SOC 2 vs ISO 27001: which framework do you need?</a>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">→</span>
                            <a href="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">Already certified or targeting ISO 27001? Run the gap analysis</a>
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
                      <h3 className="text-lg font-semibold text-white mb-1">What is a SOC 2 readiness assessment?</h3>
                      <p className="text-sm">
                        A readiness assessment (also called a gap assessment) compares your current controls
                        against the Trust Services Criteria before you hire an auditor. It surfaces the gaps
                        that would cause exceptions in a real examination, so you can fix them first — auditors
                        charge by scope and a failed Type II means restarting the observation period.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">What is the difference between SOC 2 Type I and Type II?</h3>
                      <p className="text-sm">
                        Type I audits whether your controls are suitably <em>designed</em> at a point in time.
                        Type II verifies they <em>operated effectively</em> over an observation period, typically
                        3–12 months. Most buyers ask for Type II; Type I is the usual first step to prove design
                        before the clock starts.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Which Trust Services Categories do I need?</h3>
                      <p className="text-sm">
                        Security (the Common Criteria) is always required. Add Availability if you make uptime
                        commitments, Processing Integrity if you process transactions, Confidentiality if you
                        handle sensitive business data, and Privacy if you handle personal information. Mark
                        out-of-scope questions N/A — they are excluded from your score.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">How long does SOC 2 take?</h3>
                      <p className="text-sm">
                        Readiness work typically takes 2–6 months depending on your starting point. After that,
                        a Type I audit takes a few weeks, while Type II requires a 3–12 month observation period.
                        Companies with strong existing controls (e.g., ISO 27001 certified) often move much faster.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Is this a substitute for a SOC 2 audit?</h3>
                      <p className="text-sm">
                        No. This is a self-assessment that gives you a baseline and a remediation roadmap. A SOC 2
                        report can only be issued by a licensed CPA firm after a formal examination — but arriving
                        with a completed readiness assessment significantly reduces audit findings.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Is my assessment data uploaded or stored?</h3>
                      <p className="text-sm">
                        No — the scoring and PDF generation run entirely in your browser. Your answers are never
                        sent to our servers. Only your contact details are submitted, to send you a copy of the report.
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

export default Soc2ReadinessChecker;
