import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateCompliancePdf, downloadPdfReport } from './reportGenerator.jsx';

const PRIORITY_COLORS = {
  critical: { border: 'border-red-500/40', bg: 'bg-red-900/20', text: 'text-red-400', badge: 'bg-red-600' },
  high: { border: 'border-amber-500/40', bg: 'bg-amber-900/20', text: 'text-amber-400', badge: 'bg-amber-600' },
  medium: { border: 'border-blue-500/40', bg: 'bg-blue-900/20', text: 'text-blue-400', badge: 'bg-blue-600' },
  info: { border: 'border-green-500/40', bg: 'bg-green-900/20', text: 'text-green-400', badge: 'bg-green-600' },
};

const GRADE_COLORS = {
  A: 'text-green-400 border-green-500',
  B: 'text-green-400 border-green-500',
  C: 'text-amber-400 border-amber-500',
  D: 'text-amber-400 border-amber-500',
  E: 'text-red-400 border-red-500',
};

function StandardCard({ standard }) {
  const [expanded, setExpanded] = useState(false);
  const colors = PRIORITY_COLORS[standard.priority] || PRIORITY_COLORS.info;

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} p-4 transition-all`}>
      <div
        className="flex items-start gap-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`text-sm font-medium ${colors.text}`}>{standard.name}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${colors.badge}`}>
              {standard.priority}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{standard.category}</p>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 shrink-0 mt-1 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {expanded && (
        <div className="mt-3 pl-1 space-y-2">
          <p className="text-sm text-gray-300">{standard.description}</p>
          <div className="rounded-md bg-gray-800/60 px-3 py-2">
            <p className="text-xs font-semibold text-purple-300 mb-1">Recommendation</p>
            <p className="text-sm text-gray-300">{standard.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ComplianceResults({ results, formData, onReset }) {
  const { matchedStandards, grouped, sortedCategories, summary } = results;
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      const pdfBytes = await generateCompliancePdf(results, formData);
      const safeName = (formData.companyName || 'project').replace(/[^a-zA-Z0-9.-]/g, '_');
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadPdfReport(pdfBytes, `compliance-roadmap-${safeName}-${dateStr}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Summary */}
      <div className="rounded-xl border border-gray-600 bg-gray-800/50 p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Grade */}
          <div className="flex flex-col items-center shrink-0">
            <div className={`text-5xl font-bold border-4 rounded-xl px-6 py-2 ${GRADE_COLORS[summary.grade]}`}>
              {summary.grade}
            </div>
            <p className="text-xs text-gray-400 mt-2">Compliance Readiness</p>
          </div>

          {/* Stats */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-purple-900/20 border border-purple-500/30 py-3">
                <p className="text-2xl font-bold text-purple-400">{summary.total}</p>
                <p className="text-xs text-gray-400">Standards Matched</p>
              </div>
              <div className="rounded-lg bg-red-900/20 border border-red-500/30 py-3">
                <p className="text-2xl font-bold text-red-400">{summary.critical}</p>
                <p className="text-xs text-gray-400">Critical</p>
              </div>
              <div className="rounded-lg bg-amber-900/20 border border-amber-500/30 py-3">
                <p className="text-2xl font-bold text-amber-400">{summary.high}</p>
                <p className="text-xs text-gray-400">High Priority</p>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-400">
                Readiness Score: <span className="text-purple-400 font-semibold">{summary.readinessScore}/100</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Summary */}
      <div className="rounded-xl border border-gray-600 bg-gray-800/30 p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Your Project Profile</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-400">
          <div><span className="text-gray-500">Blockchain:</span> {formData.blockchainNetwork?.join(', ') || 'N/A'}</div>
          <div><span className="text-gray-500">Use Case:</span> {formData.useCase || 'N/A'}</div>
          <div><span className="text-gray-500">Identity:</span> {formData.identity || 'N/A'}</div>
          <div><span className="text-gray-500">Payments:</span> {formData.payments || 'N/A'}</div>
          <div><span className="text-gray-500">Jurisdiction:</span> {formData.jurisdiction?.join(', ') || 'N/A'}</div>
          <div><span className="text-gray-500">Target Market:</span> {formData.targetMarket?.join(', ') || 'N/A'}</div>
        </div>
      </div>

      {/* Standards by category */}
      <div className="space-y-6">
        {sortedCategories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-gray-800 border border-gray-600 text-xs text-purple-300">
                {category}
              </span>
            </h3>
            <div className="space-y-3">
              {grouped[category].map((standard) => (
                <StandardCard key={standard.id} standard={standard} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="text-center mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleDownloadPdf}
          disabled={downloadingPdf}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {downloadingPdf ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Roadmap
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 font-medium hover:bg-gray-700 transition-colors"
        >
          Start New Assessment
        </button>
      </div>

      {/* Consultation CTA */}
      <div className="mt-8 rounded-xl border border-purple-600/40 bg-purple-900/20 px-6 py-6 text-center">
        <h3 className="text-lg font-semibold text-gray-100 mb-2">Need help implementing these standards?</h3>
        <p className="text-sm text-gray-400 mb-4">
          Our team of ISO/TC 307 delegates and blockchain compliance experts can help you build a tailored compliance roadmap.
        </p>
        <Link
          to="/quote/"
          className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
        >
          Request a Consultation
        </Link>
      </div>
    </div>
  );
}

export default ComplianceResults;
