import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { parseCsv, toCsv, dedupeCsv } from '../../utils/contactUtils';

const SAMPLE = `first_name,last_name,email,phone
John,Doe,john@example.com,+43 1 555 1234
Jane,Smith,jane@example.com,+43 664 1234567
John,Doe,JOHN@example.com,+43-1-555-1234
Bob,Weber,bob@example.com,
John,Doe,john@example.com,+43 1 555 1234`;

function CsvDeduplicator() {
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(null);
  const [keyCols, setKeyCols] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const load = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setRows(null); setResult(null); return; }
    const parsed = parseCsv(v);
    if (parsed.length < 2) {
      setError('Need a header row plus at least one data row.');
      setRows(null);
      return;
    }
    setError('');
    setRows(parsed);
    setResult(null);
    // Auto-select likely key columns
    const header = parsed[0].map((h) => h.toLowerCase());
    const auto = [];
    ['email', 'e-mail', 'mail'].forEach((k) => { const i = header.indexOf(k); if (i >= 0) auto.push(i); });
    if (auto.length === 0) ['phone', 'telephone', 'mobile'].forEach((k) => { const i = header.indexOf(k); if (i >= 0) auto.push(i); });
    if (auto.length === 0) auto.push(0);
    setKeyCols(auto);
  };

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const txt = String(reader.result || '');
      setInput(txt);
      load(txt);
    };
    reader.readAsText(file);
  };

  const toggleCol = (i) => {
    setKeyCols((prev) => prev.includes(i) ? prev.filter((c) => c !== i) : [...prev, i]);
  };

  const dedupe = () => {
    if (!rows || keyCols.length === 0) return;
    setResult(dedupeCsv(rows, keyCols));
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob(['﻿' + toCsv(result.unique)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deduplicated.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free CSV Deduplicator - Remove Duplicate Rows for CRM Import | OG Technologies EU</title>
        <meta name="description" content="Remove duplicate rows from CSV files online. Pick key columns (email, phone, name), see a duplicate report, and download a clean CSV ready for CRM import. 100% client-side — your data never leaves your browser." />
        <meta name="keywords" content="csv deduplicator, remove duplicates csv, csv cleaner, crm import cleanup, dedupe contacts, csv duplicate remover" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/csv-deduplicator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/csv-deduplicator/" />
        <meta property="og:title" content="Free CSV Deduplicator - Remove Duplicate Rows for CRM Import | OG Technologies EU" />
        <meta property="og:description" content="Remove duplicate rows from CSV files: pick key columns, see a dupe report, download clean CSV. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/csv-deduplicator/" />
        <meta name="twitter:title" content="Free CSV Deduplicator - Remove Duplicate Rows for CRM Import | OG Technologies EU" />
        <meta name="twitter:description" content="Remove duplicate rows from CSV files: pick key columns, see a dupe report, download clean CSV. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'CSV Deduplicator',
            url: 'https://www.ogtechnologies.co/tools/csv-deduplicator/',
            description: 'Remove duplicate rows from CSV files. Pick key columns, see a duplicate report, and download a clean CSV ready for CRM import. 100% client-side.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            featureList: [
              'Duplicate detection by selected key columns',
              'Case-insensitive normalized matching',
              'Duplicate report with row numbers',
              'Clean CSV export with UTF-8 BOM',
            ],
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
          })}
        </script>
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
                <h1 className="h1">CSV Deduplicator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Remove duplicate rows from a CSV before importing into your CRM. Pick the columns that define a
                  duplicate — email, phone, name — and download a clean file.{' '}
                  <strong className="text-gray-300">Your data never leaves your browser.</strong>
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">CSV data (with header row)</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={8}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder={'first_name,last_name,email\nJohn,Doe,john@example.com\nJane,Smith,jane@example.com'}
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => load()}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Load CSV
                    </button>
                    <label className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors cursor-pointer">
                      Load .csv file
                      <input type="file" accept=".csv,.txt" className="hidden" onChange={onFile} />
                    </label>
                    <button
                      type="button"
                      onClick={() => { setInput(SAMPLE); load(SAMPLE); }}
                      className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Load sample
                    </button>
                  </div>

                  {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

                  {rows && (
                    <div className="mb-6">
                      <p className="text-gray-300 text-sm font-medium mb-2">
                        Select key columns — rows matching on all selected columns are duplicates
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {rows[0].map((h, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => toggleCol(i)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${keyCols.includes(i) ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={dedupe}
                        disabled={keyCols.length === 0}
                        className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Find Duplicates
                      </button>
                    </div>
                  )}

                  {result && (
                    <div>
                      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                        <div className="bg-gray-700/60 rounded-md p-3">
                          <p className="text-2xl font-bold text-gray-200">{rows.length - 1}</p>
                          <p className="text-xs text-gray-400">Input rows</p>
                        </div>
                        <div className="bg-green-900/30 rounded-md p-3">
                          <p className="text-2xl font-bold text-green-400">{result.unique.length - 1}</p>
                          <p className="text-xs text-gray-400">Unique</p>
                        </div>
                        <div className="bg-red-900/30 rounded-md p-3">
                          <p className="text-2xl font-bold text-red-400">{result.dupes.length}</p>
                          <p className="text-xs text-gray-400">Duplicates removed</p>
                        </div>
                      </div>

                      {result.dupes.length > 0 && (
                        <div className="mb-4 overflow-x-auto max-h-48 overflow-y-auto">
                          <table className="w-full text-xs">
                            <thead className="sticky top-0 bg-gray-800">
                              <tr className="text-left text-gray-400 border-b border-gray-700">
                                <th className="pb-2 pr-4">Row</th>
                                <th className="pb-2 pr-4">Duplicate of row</th>
                                <th className="pb-2">Key values</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.dupes.map((d, i) => (
                                <tr key={i} className="border-b border-gray-700/50">
                                  <td className="py-1.5 pr-4 font-mono text-gray-200">{d.row}</td>
                                  <td className="py-1.5 pr-4 font-mono text-gray-400">{d.dupOf}</td>
                                  <td className="py-1.5 font-mono text-gray-400 break-all">{d.values.join(' | ')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={download}
                        className="px-4 py-2 rounded-md bg-green-700 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        Download deduplicated CSV
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">Matching:</strong> key values are normalized (trimmed,
                    lowercased, whitespace-collapsed) before comparison, so <code className="text-gray-400">John@Example.com</code>{' '}
                    and <code className="text-gray-400">john@example.com</code> count as duplicates. Select multiple
                    columns for stricter matching — e.g. first name + last name + email.
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

export default CsvDeduplicator;
