import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import AssessmentForm from './AssessmentForm';
import AssessmentResults from './AssessmentResults';
import { evaluateAssessment } from './assessmentEngine.jsx';
import toast from 'react-hot-toast';

function Iso9001ReadinessChecker() {
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
        service: `ISO 9001 Readiness Checker | Company Size: ${data.companySize} | Industry: ${data.industry || 'N/A'}`,
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
        <title>ISO 9001 Readiness Checker - Free QMS Self-Assessment | OG Technologies EU</title>
        <meta name="description" content="Free ISO 9001:2015 readiness checker. Assess your Quality Management System against all clauses and quality management principles. Get a readiness score, prioritized gap list, and downloadable PDF report." />
        <meta name="keywords" content="ISO 9001 readiness checker, ISO 9001 self-assessment, QMS compliance checker, ISO 9001:2015 gap analysis, quality management system assessment, ISO 9001 certification readiness" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/iso-9001-readiness-checker/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/iso-9001-readiness-checker/" />
        <meta property="og:title" content="ISO 9001 Readiness Checker - Free QMS Self-Assessment | OG Technologies EU" />
        <meta property="og:description" content="Free ISO 9001:2015 readiness checker. Assess your QMS, get a readiness score, prioritized gaps, and downloadable PDF report." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/iso-9001-readiness-checker/" />
        <meta name="twitter:title" content="ISO 9001 Readiness Checker - Free QMS Self-Assessment | OG Technologies EU" />
        <meta name="twitter:description" content="Free ISO 9001:2015 readiness checker. Assess your QMS, get a readiness score, prioritized gaps, and downloadable PDF report." />
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
                <h1 className="h1 mb-4">ISO 9001 Readiness Checker</h1>
                <p className="text-xl text-gray-400 mb-4">
                  Assess your organization against ISO 9001:2015. Get an instant readiness score,
                  a prioritized gap list with remediation advice, and a downloadable PDF report. Free, no signup.
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
                          <h2 className="text-2xl font-bold text-white">What Is ISO 9001?</h2>
                        </div>
                        <p className="text-gray-300 mb-4">
                          ISO 9001:2015 is the international standard for Quality Management Systems (QMS).
                          It provides a framework for organizations to consistently deliver products and
                          services that meet customer and regulatory requirements.
                        </p>
                        <p className="text-gray-300">
                          Certification demonstrates to customers and partners that your organization
                          is committed to quality and continuous improvement. This tool helps you
                          identify where you stand and what to prioritize.
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
                            <span><strong>Customer Focus:</strong> Feedback collection and satisfaction management</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Process Approach:</strong> Process definition, documentation, and system integration</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Evidence-Based Decision Making:</strong> KPIs, data analysis, and measurement systems</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            <span><strong>Risk-Based Thinking:</strong> Risk identification and mitigation throughout the QMS</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">1.</span>
                            <span>Answer ~12 questions about your current quality practices</span>
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

export default Iso9001ReadinessChecker;
