import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateBic } from '../../utils/financeUtils';

const EXAMPLES = [
  { label: 'Erste Group (AT)', bic: 'GIBAATWWXXX' },
  { label: 'Deutsche Bank (DE)', bic: 'DEUTDEFF' },
  { label: 'ING (NL)', bic: 'INGBNL2A' },
  { label: 'UniCredit (IT)', bic: 'UNCRITMM' },
  { label: 'HSBC (GB)', bic: 'MIDLGB22' },
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

function BicValidator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const validate = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(validateBic(v));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free BIC / SWIFT Code Validator & Decoder (ISO 9362) | OG Technologies EU</title>
        <meta name="description" content="Validate and decode BIC/SWIFT codes online: institution, country, location, and branch breakdown per ISO 9362. Detects test BICs and primary office codes. 100% client-side — no data sent to any server." />
        <meta name="keywords" content="bic validator, swift code checker, bic decoder, iso 9362, swift bic lookup, bank identifier code, bic8 bic11" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/bic-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/bic-validator/" />
        <meta property="og:title" content="Free BIC / SWIFT Code Validator & Decoder (ISO 9362) | OG Technologies EU" />
        <meta property="og:description" content="Validate and decode BIC/SWIFT codes: institution, country, location, and branch breakdown per ISO 9362. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/bic-validator/" />
        <meta name="twitter:title" content="Free BIC / SWIFT Code Validator & Decoder (ISO 9362) | OG Technologies EU" />
        <meta name="twitter:description" content="Validate and decode BIC/SWIFT codes: institution, country, location, and branch breakdown per ISO 9362. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'BIC / SWIFT Code Validator',
            url: 'https://www.ogtechnologies.co/tools/bic-validator/',
            description: 'Validate and decode BIC/SWIFT codes: institution, country, location, and branch breakdown per ISO 9362. 100% client-side.',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            featureList: [
              'ISO 9362 structure validation',
              'Institution, country, location, branch breakdown',
              'Test BIC and passive participant detection',
              'BIC8 and BIC11 support',
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
                <h1 className="h1">BIC / SWIFT Code Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Validate and decode any Business Identifier Code against ISO 9362 — institution, country,
                  location, and branch components. Runs entirely in your browser; nothing is sent to a server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">BIC / SWIFT code (8 or 11 characters)</label>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => { setInput(e.target.value); validate(e.target.value); }}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm uppercase"
                      placeholder="GIBAATWWXXX"
                      maxLength={11}
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {EXAMPLES.map((ex) => (
                      <button
                        key={ex.bic}
                        type="button"
                        onClick={() => { setInput(ex.bic); validate(ex.bic); }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>

                  {result && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium ${result.valid ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                        {result.valid ? `Valid BIC structure — ${result.bic}` : 'Invalid BIC'}
                      </div>

                      <div className="mb-4">
                        {result.checks.map((c) => <CheckRow key={c.label} check={c} />)}
                      </div>

                      {result.parts && (
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">Institution code</p>
                            <p className="text-gray-200 font-mono">{result.parts.bankCode}</p>
                            {result.parts.bankName && <p className="text-xs text-purple-300 mt-1">{result.parts.bankName}</p>}
                          </div>
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">Country code</p>
                            <p className="text-gray-200 font-mono">{result.parts.countryCode}</p>
                          </div>
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">Location code</p>
                            <p className="text-gray-200 font-mono">{result.parts.locationCode}</p>
                            {result.parts.isTestBic && <p className="text-xs text-yellow-400 mt-1">Test BIC (not connected to live network)</p>}
                            {result.parts.isReverseBilling && <p className="text-xs text-yellow-400 mt-1">Reverse billing BIC</p>}
                            {result.parts.isPassive && <p className="text-xs text-yellow-400 mt-1">Passive participant</p>}
                          </div>
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">Branch code</p>
                            <p className="text-gray-200 font-mono">{result.parts.branchCode}</p>
                            {result.parts.branchCode === 'XXX' && <p className="text-xs text-gray-400 mt-1">Head / primary office</p>}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">BIC anatomy (ISO 9362):</strong> 4-letter institution code,
                    2-letter ISO 3166-1 country code, 2-character location code, and an optional 3-character branch
                    code. A location code ending in 0 marks a test BIC; ending in 1 marks reverse billing; ending in 2
                    marks a passive (non-connected) participant.
                  </p>
                  <p>
                    This tool validates structure only — it does not confirm the BIC is registered or active on the
                    SWIFT network. Verify the code with the receiving bank before initiating a transfer.
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

export default BicValidator;
