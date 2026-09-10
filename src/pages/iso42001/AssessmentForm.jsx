import React, { useState } from 'react';
import { QUESTIONS } from './assessmentEngine.jsx';

const SECTIONS = [
  { key: 'org', label: 'Organization & AI Context' },
  { key: 'clauses', label: 'Clauses 4–10' },
  { key: 'annex', label: 'Annex A Controls' },
];

const ORG_INITIAL = {
  contactName: '',
  email: '',
  phone: '',
  companyName: '',
  companySize: '',
  aiRole: '',
  industry: '',
};

function AssessmentForm({ onSubmit, isSubmitting }) {
  const [orgData, setOrgData] = useState(ORG_INITIAL);
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);

  const handleOrgChange = (e) => {
    const { name, value } = e.target;
    setOrgData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const sectionQuestions = QUESTIONS.filter((q) => {
    if (currentSection === 1) return q.section === 'Clauses 4–10';
    if (currentSection === 2) return q.section === 'Annex A — AI Controls';
    return false;
  });

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = QUESTIONS.length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const handleNext = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...orgData, answers });
  };

  const orgComplete = orgData.contactName.trim() && orgData.email.trim() && orgData.companyName.trim() && orgData.companySize;
  const canSubmit = currentSection === 2 && answeredCount >= totalQuestions * 0.8 && orgComplete;

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">ISO 42001 AI Readiness Assessment</h2>
      <p className="text-sm text-gray-400 mb-6">
        Assess your organization against ISO/IEC 42001:2023. Rate each control on a maturity scale — your answers stay in your browser.
      </p>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress: {answeredCount}/{totalQuestions} answered</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap rounded-lg overflow-hidden border border-gray-600 mb-6">
        {SECTIONS.map((sec, i) => (
          <button
            key={sec.key}
            type="button"
            className={`flex-1 min-w-[120px] px-4 py-2 text-sm font-medium transition-colors ${
              currentSection === i ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setCurrentSection(i)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {currentSection === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Contact Person Name *</label>
              <input
                type="text"
                name="contactName"
                required
                value={orgData.contactName}
                onChange={handleOrgChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={orgData.email}
                onChange={handleOrgChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={orgData.phone}
                onChange={handleOrgChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Company Name *</label>
              <input
                type="text"
                name="companyName"
                required
                value={orgData.companyName}
                onChange={handleOrgChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Company Size *</label>
              <select
                name="companySize"
                required
                value={orgData.companySize}
                onChange={handleOrgChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">AI Role</label>
              <select
                name="aiRole"
                value={orgData.aiRole}
                onChange={handleOrgChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select your AI role</option>
                <option value="developer">We develop AI systems</option>
                <option value="provider">We provide/deploy AI systems</option>
                <option value="user">We use AI systems (internal)</option>
                <option value="multiple">Multiple roles</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Industry</label>
              <input
                type="text"
                name="industry"
                value={orgData.industry}
                onChange={handleOrgChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="e.g. FinTech, Healthcare, SaaS (optional)"
              />
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Your contact information is used to send you a copy of your assessment results. Assessment answers are processed in your browser and not sent to any server.
            </p>
          </div>
        )}

        {(currentSection === 1 || currentSection === 2) && (
          <div className="space-y-6">
            {sectionQuestions.map((q) => (
              <div key={q.id} className="border-b border-gray-700 pb-4">
                <div className="mb-3">
                  <p className="text-xs text-purple-400 font-medium mb-1">{q.clause}</p>
                  <p className="text-sm text-gray-200">{q.question}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'full', label: 'Fully in place', color: 'green' },
                    { value: 'mostly', label: 'Mostly', color: 'teal' },
                    { value: 'partial', label: 'Partial', color: 'amber' },
                    { value: 'none', label: 'Not in place', color: 'red' },
                    { value: 'na', label: 'N/A', color: 'gray' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleAnswer(q.id, opt.value)}
                      className={`px-3 py-2 rounded-md text-xs font-medium transition-colors border ${
                        answers[q.id] === opt.value
                          ? opt.color === 'green' ? 'bg-green-600 text-white border-green-500'
                            : opt.color === 'teal' ? 'bg-teal-600 text-white border-teal-500'
                            : opt.color === 'amber' ? 'bg-amber-600 text-white border-amber-500'
                            : opt.color === 'red' ? 'bg-red-600 text-white border-red-500'
                            : 'bg-gray-600 text-white border-gray-500'
                          : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentSection === 0}
            className="px-6 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 font-medium hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {currentSection < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating Report...
                </>
              ) : (
                'Generate AI Readiness Report'
              )}
            </button>
          )}
        </div>

        {currentSection === 2 && !canSubmit && (
          <p className="text-xs text-amber-400 mt-3 text-center">
            {answeredCount < totalQuestions * 0.8
              ? `Please answer at least 80% of the questions to generate a meaningful report.`
              : `Please complete the required contact and company fields in the Organization & AI Context section.`
            }
          </p>
        )}
      </form>
    </div>
  );
}

export default AssessmentForm;
