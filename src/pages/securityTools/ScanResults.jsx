import React, { useState } from 'react';
import { generatePdfReport, downloadPdfReport } from './reportGenerator.jsx';

const SEVERITY_COLORS = {
  critical: { bg: 'bg-red-900/30', border: 'border-red-600/50', text: 'text-red-400', badge: 'bg-red-600' },
  high: { bg: 'bg-red-900/20', border: 'border-red-500/40', text: 'text-red-300', badge: 'bg-red-500' },
  medium: { bg: 'bg-amber-900/20', border: 'border-amber-500/40', text: 'text-amber-300', badge: 'bg-amber-500' },
  low: { bg: 'bg-blue-900/20', border: 'border-blue-500/40', text: 'text-blue-300', badge: 'bg-blue-500' },
  info: { bg: 'bg-green-900/20', border: 'border-green-500/40', text: 'text-green-300', badge: 'bg-green-500' },
};

const STATUS_ICONS = {
  pass: (
    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  fail: (
    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warn: (
    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

const GRADE_COLORS = {
  A: 'text-green-400 border-green-500',
  B: 'text-green-300 border-green-400',
  C: 'text-amber-300 border-amber-500',
  D: 'text-orange-400 border-orange-500',
  F: 'text-red-400 border-red-500',
};

function FindingCard({ finding }) {
  const [expanded, setExpanded] = useState(false);
  const colors = SEVERITY_COLORS[finding.severity] || SEVERITY_COLORS.info;

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} p-4 transition-all`}>
      <div
        className="flex items-start gap-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="shrink-0 mt-0.5">
          {STATUS_ICONS[finding.status]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`text-sm font-medium ${colors.text}`}>{finding.title}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${colors.badge}`}>
              {finding.severity}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{finding.owaspCategory}</p>
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
        <div className="mt-3 pl-8 space-y-2">
          <p className="text-sm text-gray-300">{finding.description}</p>
          <div className="rounded-md bg-gray-800/60 px-3 py-2">
            <p className="text-xs font-semibold text-purple-300 mb-1">Remediation</p>
            <p className="text-sm text-gray-300">{finding.remediation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ScanResults({ scanData, auditInfo, onReset }) {
  const { results, summary, scannedUrl } = scanData;
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const grouped = results.reduce((acc, r) => {
    const category = r.owaspCategory;
    if (!acc[category]) acc[category] = [];
    acc[category].push(r);
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort();

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
            <p className="text-xs text-gray-400 mt-2">Security Grade</p>
          </div>

          {/* Stats */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-green-900/20 border border-green-500/30 py-3">
                <p className="text-2xl font-bold text-green-400">{summary.statusCounts.pass}</p>
                <p className="text-xs text-gray-400">Passed</p>
              </div>
              <div className="rounded-lg bg-amber-900/20 border border-amber-500/30 py-3">
                <p className="text-2xl font-bold text-amber-400">{summary.statusCounts.warn}</p>
                <p className="text-xs text-gray-400">Warnings</p>
              </div>
              <div className="rounded-lg bg-red-900/20 border border-red-500/30 py-3">
                <p className="text-2xl font-bold text-red-400">{summary.statusCounts.fail}</p>
                <p className="text-xs text-gray-400">Failed</p>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-400">
                Scanned: <a href={scannedUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">{scannedUrl}</a>
              </p>
              <p className="text-xs text-gray-500 mt-1">{summary.total} checks performed · Score: {summary.score}/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Findings by category */}
      <div className="space-y-6">
        {sortedCategories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-gray-800 border border-gray-600 text-xs text-purple-300">
                {category}
              </span>
            </h3>
            <div className="space-y-3">
              {grouped[category].map((finding) => (
                <FindingCard key={finding.id} finding={finding} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="text-center mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={async () => {
            setDownloadingPdf(true);
            try {
              const pdfBytes = await generatePdfReport(scanData, auditInfo);
              const safeUrl = scannedUrl.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9.-]/g, '_');
              const dateStr = new Date().toISOString().slice(0, 10);
              downloadPdfReport(pdfBytes, `security-report-${safeUrl}-${dateStr}.pdf`);
            } catch (err) {
              console.error('PDF generation failed:', err);
            } finally {
              setDownloadingPdf(false);
            }
          }}
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
          Scan Another URL
        </button>
      </div>
    </div>
  );
}

export default ScanResults;
