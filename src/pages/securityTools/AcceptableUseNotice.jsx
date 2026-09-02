import React, { useState } from 'react';

const AUDIT_KEY = 'og_security_scan_audit';
const AFFIRMATION_TEXT =
  'I confirm that I own or have explicit permission to scan the target URL.';

function saveAuditRecord(record) {
  try {
    const existing = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
    existing.push(record);
    localStorage.setItem(AUDIT_KEY, JSON.stringify(existing));
  } catch {
    // localStorage may be full or unavailable — non-blocking
  }
}

function AcceptableUseNotice({ onAccept }) {
  const [checked, setChecked] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState('');

  const handleAccept = async () => {
    if (!checked) return;
    setAccepting(true);
    setError('');

    let ip = 'unknown';
    try {
      const resp = await fetch('https://api.ipify.org?format=json', {
        signal: AbortSignal.timeout(8000),
      });
      if (resp.ok) {
        const data = await resp.json();
        ip = data.ip || 'unknown';
      }
    } catch {
      // IP fetch failed — proceed with 'unknown'
    }

    const timestamp = new Date().toISOString();
    const auditRecord = {
      timestamp,
      ip,
      affirmed: true,
      affirmationText: AFFIRMATION_TEXT,
    };

    saveAuditRecord(auditRecord);
    onAccept(auditRecord);
    setAccepting(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 mb-8">
      <div className="rounded-xl border border-yellow-600/40 bg-yellow-900/20 px-6 py-6">
        <div className="flex items-start gap-3 mb-4">
          <svg
            className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-yellow-200">
              Acceptable Use Policy
            </p>
            <p className="text-xs text-yellow-200/80 mt-1">
              This tool performs <strong>passive, non-intrusive checks</strong>{' '}
              only — it inspects publicly accessible HTTP headers, cookies, and
              page content. It does <strong>not</strong> attempt exploitation,
              injection, or brute-force attacks. Results are educational and
              not a substitute for professional penetration testing.
            </p>
            <p className="text-xs text-yellow-200/80 mt-2">
              You must only scan websites that you <strong>own</strong> or have{' '}
              <strong>explicit written permission</strong> to test. Unauthorized
              scanning may violate laws in your jurisdiction.
            </p>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer mt-4">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-500 bg-gray-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
          />
          <span className="text-sm text-gray-200">
            {AFFIRMATION_TEXT}
          </span>
        </label>

        <button
          onClick={handleAccept}
          disabled={!checked || accepting}
          className="mt-4 w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {accepting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Verifying...
            </>
          ) : (
            'Accept & Continue'
          )}
        </button>

        {error && (
          <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default AcceptableUseNotice;
