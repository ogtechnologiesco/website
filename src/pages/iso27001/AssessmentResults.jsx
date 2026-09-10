import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateGapPdf, downloadPdfReport } from './reportGenerator.jsx';

const GRADE_COLORS = {
  A: 'text-green-400 border-green-500',
  B: 'text-green-400 border-green-500',
  C: 'text-amber-400 border-amber-500',
  D: 'text-amber-400 border-amber-500',
  E: 'text-red-400 border-red-500',
};

const STATUS_COLORS = {
  critical: { border: 'border-red-500/40', bg: 'bg-red-900/20', text: 'text-red-400', badge: 'bg-red-600' },
  warning: { border: 'border-amber-500/40', bg: 'bg-amber-900/20', text: 'text-amber-400', badge: 'bg-amber-600' },
};

function GapCard({ gap }) {
  const [expanded, setExpanded] = useState(false);
  const colors = STATUS_COLORS[gap.status] || STATUS_COLORS.warning;

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} p-4 transition-all`}>
      <div
        className="flex items-start gap-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`text-sm font-medium ${colors.text}`}>{gap.clause}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${colors.badge}`}>
              {gap.status === 'critical' ? 'Gap' : 'Partial'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{gap.question}</p>
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
        <div className="mt-3 pl-1">
          <div className="rounded-md bg-gray-800/60 px-3 py-2">
            <p className="text-xs font-semibold text-purple-300 mb-1">Recommended Action</p>
            <p className="text-sm text-gray-300">{gap.remediation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AssessmentResults({ results, formData, onReset }) {
  const { sections, gaps, summary } = results;
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      const pdfBytes = await generateGapPdf(results, formData);
      const safeName = (formData.companyName || 'organization').replace(/[^a-zA-Z0-9.-]/g, '_');
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadPdfReport(pdfBytes, `iso-27001-gap-analysis-${safeName}-${dateStr}.pdf`);
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
          <div className="flex flex-col items-center shrink-0">
            <div className={`text-5xl font-bold border-4 rounded-xl px-6 py-2 ${GRADE_COLORS[summary.grade]}`}>
              {summary.grade}
            </div>
            <p className="text-xs text-gray-400 mt-2">Readiness Grade</p>
          </div>

          <div className="flex-1 w-full">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-green-900/20 border border-green-500/30 py-3">
                <p className="text-2xl font-bold text-green-400">{summary.implemented}</p>
                <p className="text-xs text-gray-400">Implemented</p>
              </div>
              <div className="rounded-lg bg-amber-900/20 border border-amber-500/30 py-3">
                <p className="text-2xl font-bold text-amber-400">{summary.partialGaps}</p>
                <p className="text-xs text-gray-400">Partial</p>
              </div>
              <div className="rounded-lg bg-red-900/20 border border-red-500/30 py-3">
                <p className="text-2xl font-bold text-red-400">{summary.criticalGaps}</p>
                <p className="text-xs text-gray-400">Gaps</p>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-400">
                Readiness Score: <span className="text-purple-400 font-semibold">{summary.readinessScore}/100</span>
                <span className="text-gray-500 mx-2">|</span>
                Est. weeks to ready: <span className="text-purple-400 font-semibold">{summary.weeksToReady}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section breakdown */}
      <div className="rounded-xl border border-gray-600 bg-gray-800/30 p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Section Breakdown</h3>
        <div className="space-y-4">
          {sections.map((sec) => (
            <div key={sec.name}>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{sec.name}</span>
                <span>{sec.percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    sec.percentage >= 70 ? 'bg-green-500' : sec.percentage >= 40 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${sec.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gaps */}
      {gaps.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Identified Gaps ({gaps.length})
          </h3>
          <div className="space-y-3">
            {gaps.map((gap) => (
              <GapCard key={gap.id} gap={gap} />
            ))}
          </div>
        </div>
      )}

      {gaps.length === 0 && (
        <div className="rounded-xl border border-green-600/40 bg-green-900/20 px-6 py-6 text-center mb-6">
          <h3 className="text-lg font-semibold text-green-400 mb-2">No Gaps Identified</h3>
          <p className="text-sm text-gray-400">
            Your organization appears to have implemented all assessed ISO 27001 controls. Consider a formal certification audit to validate.
          </p>
        </div>
      )}

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
              Download PDF Report
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
        <h3 className="text-lg font-semibold text-gray-100 mb-2">Need help closing your gaps?</h3>
        <p className="text-sm text-gray-400 mb-4">
          Our ISO/IEC 27001 experts can help you build a tailored implementation roadmap and prepare for certification.
        </p>
        <Link
          to="/quote"
          className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
        >
          Request a Consultation
        </Link>
      </div>
    </div>
  );
}

export default AssessmentResults;
