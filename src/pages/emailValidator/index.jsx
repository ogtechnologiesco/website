import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateEmail, toCsv } from '../../utils/contactUtils';

function EmailValidator() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const validate = () => {
    const lines = input.split(/[\r\n,;]+/).map((l) => l.trim()).filter(Boolean);
    if (!lines.length) { setResults(null); return; }
    const seen = new Set();
    setResults(lines.map((email) => {
      const r = validateEmail(email);
      const key = email.toLowerCase();
      if (seen.has(key)) { r.issues.push('Duplicate'); r.valid = false; }
      seen.add(key);
      return r;
    }));
  };

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setInput(String(reader.result || ''));
    reader.readAsText(file);
  };

  const downloadClean = () => {
    if (!results) return;
    const rows = [['email'], ...results.filter((r) => r.valid).map((r) => [r.email])];
    const blob = new Blob(['﻿' + toCsv(rows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clean-emails.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = results ? {
    total: results.length,
    valid: results.filter((r) => r.valid).length,
    invalid: results.filter((r) => !r.valid).length,
  } : null;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free Email List Validator - Bulk Email Checker & Cleaner | OG Technologies EU</title>
        <meta name="description" content="Validate email lists online: RFC 5322 syntax check, duplicate detection, disposable-domain flagging, and typo suggestions. Export a clean CSV for your CRM or mailing tool. 100% client-side — your list never leaves your browser." />
        <meta name="keywords" content="email validator, email list cleaner, bulk email checker, email verification, disposable email detector, crm email cleanup, email dedupe" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/email-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/email-validator/" />
        <meta property="og:title" content="Free Email List Validator - Bulk Email Checker & Cleaner | OG Technologies EU" />
        <meta property="og:description" content="Validate email lists: syntax, duplicates, disposable domains, typo suggestions. Export clean CSV. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/email-validator/" />
        <meta name="twitter:title" content="Free Email List Validator - Bulk Email Checker & Cleaner | OG Technologies EU" />
        <meta name="twitter:description" content="Validate email lists: syntax, duplicates, disposable domains, typo suggestions. Export clean CSV. 100% client-side." />
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
                <h1 className="h1">Email List Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste or upload an email list to check syntax, flag duplicates and disposable domains, and catch
                  common domain typos — then export a clean CSV.{' '}
                  <strong className="text-gray-300">Your list never leaves your browser.</strong>
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">Email addresses (one per line, or comma/semicolon separated)</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={8}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder={'john@example.com\njane@gmial.com\ninfo@mailinator.com\njohn@example.com'}
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <button
                      type="button"
                      onClick={validate}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Validate List
                    </button>
                    <label className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors cursor-pointer">
                      Load .csv / .txt file
                      <input type="file" accept=".csv,.txt" className="hidden" onChange={onFile} />
                    </label>
                    {results && stats && stats.valid > 0 && (
                      <button
                        type="button"
                        onClick={downloadClean}
                        className="px-4 py-2 rounded-md bg-green-700 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        Download clean CSV ({stats.valid})
                      </button>
                    )}
                  </div>

                  {stats && (
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div className="bg-gray-700/60 rounded-md p-3">
                        <p className="text-2xl font-bold text-gray-200">{stats.total}</p>
                        <p className="text-xs text-gray-400">Total</p>
                      </div>
                      <div className="bg-green-900/30 rounded-md p-3">
                        <p className="text-2xl font-bold text-green-400">{stats.valid}</p>
                        <p className="text-xs text-gray-400">Valid</p>
                      </div>
                      <div className="bg-red-900/30 rounded-md p-3">
                        <p className="text-2xl font-bold text-red-400">{stats.invalid}</p>
                        <p className="text-xs text-gray-400">Issues</p>
                      </div>
                    </div>
                  )}

                  {results && (
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-gray-800">
                          <tr className="text-left text-gray-400 text-xs border-b border-gray-700">
                            <th className="pb-2 pr-4">Email</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((r, i) => (
                            <tr key={i} className="border-b border-gray-700/50 align-top">
                              <td className="py-2 pr-4 font-mono text-xs text-gray-200 break-all">{r.email}</td>
                              <td className="py-2 text-xs">
                                {r.valid
                                  ? <span className="text-green-400">Valid</span>
                                  : <span className="text-red-400">{r.issues.join('; ')}</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">What it checks:</strong> RFC 5322 syntax, local-part and domain
                    length limits, missing TLD, duplicates (case-insensitive), known disposable domains, and common
                    domain typos (gmial.com → gmail.com).
                  </p>
                  <p>
                    Syntax validation does not confirm a mailbox exists — that requires SMTP probing, which can't be
                    done client-side. This tool catches the data-quality issues that break CRM imports and hurt
                    sender reputation before you send.
                  </p>
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

export default EmailValidator;
