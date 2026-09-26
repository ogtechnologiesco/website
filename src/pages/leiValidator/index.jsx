import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateLei } from '../../utils/financeUtils';

const EXAMPLES = [
  { label: 'Example LEI', lei: '529900T8BM49AURSDO55' },
  { label: 'Another example', lei: '213800WSGIIZCXF1P572' },
];

function CheckRow({ check }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-700 last:border-0">
      <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${check.ok ? 'bg-green-900/60 text-green-400' : 'bg-red-900/60 text-red-400'}`}>
        {check.ok ? '✓' : '✗'}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-200">{check.label}</p>
        <p className="text-xs text-gray-400">{check.detail}</p>
      </div>
    </div>
  );
}

function LeiValidator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const validate = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(validateLei(v));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free LEI Validator - Legal Entity Identifier Check (ISO 17442) | OG Technologies EU</title>
        <meta name="description" content="Validate Legal Entity Identifiers (LEI) online: 20-character structure, reserved positions, and ISO 7064 MOD 97-10 check digits. Decode the issuing LOU prefix. 100% client-side — no data sent to any server." />
        <meta name="keywords" content="lei validator, lei checker, legal entity identifier, iso 17442, gleif, lei check digit, mod 97" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/lei-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/lei-validator/" />
        <meta property="og:title" content="Free LEI Validator - Legal Entity Identifier Check (ISO 17442) | OG Technologies EU" />
        <meta property="og:description" content="Validate LEIs online: structure, reserved positions, and MOD 97-10 check digits per ISO 17442. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/lei-validator/" />
        <meta name="twitter:title" content="Free LEI Validator - Legal Entity Identifier Check (ISO 17442) | OG Technologies EU" />
        <meta name="twitter:description" content="Validate LEIs online: structure, reserved positions, and MOD 97-10 check digits per ISO 17442. 100% client-side." />
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
                <h1 className="h1">LEI Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Validate a Legal Entity Identifier against ISO 17442 — structure, reserved positions, and
                  MOD 97-10 check digits. Runs entirely in your browser; nothing is sent to a server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">LEI (20 characters)</label>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => { setInput(e.target.value); validate(e.target.value); }}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm uppercase"
                      placeholder="529900T8BM49AURSDO55"
                      maxLength={20}
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {EXAMPLES.map((ex) => (
                      <button
                        key={ex.lei}
                        type="button"
                        onClick={() => { setInput(ex.lei); validate(ex.lei); }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>

                  {result && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium ${result.valid ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                        {result.valid ? `Valid LEI — ${result.lei}` : 'Invalid LEI'}
                      </div>

                      <div className="mb-4">
                        {result.checks.map((c) => <CheckRow key={c.label} check={c} />)}
                      </div>

                      {result.parts && (
                        <div className="grid sm:grid-cols-3 gap-3 text-sm">
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">LOU prefix</p>
                            <p className="text-gray-200 font-mono">{result.parts.lou}</p>
                            {result.parts.louName && <p className="text-xs text-purple-300 mt-1">{result.parts.louName}</p>}
                          </div>
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">Entity identifier</p>
                            <p className="text-gray-200 font-mono break-all">{result.parts.entityId}</p>
                          </div>
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">Check digits</p>
                            <p className="text-gray-200 font-mono">{result.parts.checkDigits}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">LEI anatomy (ISO 17442):</strong> characters 1–4 identify the
                    Local Operating Unit (LOU) that issued the LEI, positions 5–6 are reserved and always "00",
                    characters 7–18 are the entity identifier, and 19–20 are MOD 97-10 check digits.
                  </p>
                  <p>
                    A valid checksum confirms the LEI is well-formed — it does not confirm the LEI is registered or
                    currently renewed. Check the <a href="https://search.gleif.org" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">GLEIF Global LEI Index</a> for
                    registration status. Lapsed LEIs can block MiFID II / EMIR reportable transactions.
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

export default LeiValidator;
