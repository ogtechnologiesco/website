import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateGtin, validateIsbn10, isbn10to13, gs1CheckDigit } from '../../utils/gs1Utils';

const EXAMPLES = [
  { label: 'EAN-13 (AT)', code: '9002233441037' },
  { label: 'UPC-A (US)', code: '036000291452' },
  { label: 'EAN-8', code: '96385074' },
  { label: 'ISBN-13', code: '9780140447934' },
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

function GtinValidator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [isbnInput, setIsbnInput] = useState('');
  const [isbnResult, setIsbnResult] = useState(null);
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState(null);

  const validate = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(validateGtin(v));
  };

  const validateIsbn = (value) => {
    const v = value !== undefined ? value : isbnInput;
    if (!v.trim()) { setIsbnResult(null); return; }
    setIsbnResult(validateIsbn10(v));
  };

  const runCalc = () => {
    const clean = calcInput.replace(/[\s-]/g, '');
    if (!/^\d+$/.test(clean) || clean.length < 7) { setCalcResult(null); return; }
    setCalcResult(clean + gs1CheckDigit(clean));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free GTIN / UPC / EAN Barcode Validator - GS1 Check Digit | OG Technologies EU</title>
        <meta name="description" content="Validate UPC-A, EAN-8, EAN-13, and GTIN-14 barcodes online: GS1 mod-10 check digit verification, format detection, and country prefix lookup. Includes ISBN validator and check digit calculator. 100% client-side." />
        <meta name="keywords" content="gtin validator, upc validator, ean validator, barcode check digit, gs1 check digit calculator, ean-13, upc-a, isbn validator" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/gtin-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/gtin-validator/" />
        <meta property="og:title" content="Free GTIN / UPC / EAN Barcode Validator - GS1 Check Digit | OG Technologies EU" />
        <meta property="og:description" content="Validate UPC-A, EAN-8, EAN-13, and GTIN-14 barcodes: GS1 check digit, format detection, country prefix lookup. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/gtin-validator/" />
        <meta name="twitter:title" content="Free GTIN / UPC / EAN Barcode Validator - GS1 Check Digit | OG Technologies EU" />
        <meta name="twitter:description" content="Validate UPC-A, EAN-8, EAN-13, and GTIN-14 barcodes: GS1 check digit, format detection, country prefix lookup. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'GTIN / UPC / EAN Barcode Validator',
            url: 'https://www.ogtechnologies.co/tools/gtin-validator/',
            description: 'Validate UPC-A, EAN-8, EAN-13, and GTIN-14 barcodes: GS1 mod-10 check digit, format detection, country prefix lookup, ISBN validation. 100% client-side.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            featureList: [
              'GS1 mod-10 check digit verification',
              'EAN-8, UPC-A, EAN-13, GTIN-14 format detection',
              'GS1 country prefix lookup',
              'ISBN-10/ISBN-13 validation',
              'Check digit calculator',
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
                <h1 className="h1">GTIN / UPC / EAN Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Validate retail barcodes against the GS1 check-digit algorithm — EAN-8, UPC-A, EAN-13, and
                  GTIN-14 — with format detection and country prefix lookup. Everything runs in your browser.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">Barcode number</label>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => { setInput(e.target.value); validate(e.target.value); }}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                      placeholder="036000291452"
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {EXAMPLES.map((ex) => (
                      <button
                        key={ex.code}
                        type="button"
                        onClick={() => { setInput(ex.code); validate(ex.code); }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>

                  {result && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium ${result.valid ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                        {result.valid ? `Valid ${result.format} — ${result.code}` : 'Invalid barcode'}
                      </div>

                      <div className="mb-4">
                        {result.checks.map((c) => <CheckRow key={c.label} check={c} />)}
                      </div>

                      {result.prefix && (
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">GS1 prefix</p>
                            <p className="text-gray-200 font-mono">{result.prefix.prefix}</p>
                          </div>
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">Issuing organization</p>
                            <p className="text-gray-200">{result.prefix.name}</p>
                          </div>
                        </div>
                      )}
                      {result.isbn && (
                        <p className="mt-3 text-xs text-purple-300">This is also a valid ISBN-13 (Bookland prefix 978).</p>
                      )}
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-200 mb-3">Check digit calculator</h2>
                    <p className="text-xs text-gray-500 mb-3">Enter the digits without the check digit — the full code is returned.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={calcInput}
                        onChange={(e) => setCalcInput(e.target.value)}
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="03600029145"
                        spellCheck="false"
                      />
                      <button
                        type="button"
                        onClick={runCalc}
                        className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Compute
                      </button>
                    </div>
                    {calcResult && (
                      <div className="mt-3 bg-gray-700 rounded-md px-4 py-3 flex items-center justify-between">
                        <code className="text-purple-300 font-mono text-sm">{calcResult}</code>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(calcResult)}
                          className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors ml-3 shrink-0"
                        >
                          Copy
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-200 mb-3">ISBN-10 validator</h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={isbnInput}
                        onChange={(e) => { setIsbnInput(e.target.value); validateIsbn(e.target.value); }}
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="0-14-044793-5"
                        spellCheck="false"
                      />
                    </div>
                    {isbnResult && (
                      <div className={`mt-3 rounded-md px-4 py-3 text-sm font-medium ${isbnResult.valid ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                        {isbnResult.detail}
                        {isbnResult.valid && (
                          <span className="block text-xs text-gray-400 font-normal mt-1 font-mono">
                            ISBN-13: {isbn10to13(isbnInput.replace(/[\s-]/g, '').toUpperCase())}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">How it works:</strong> starting from the digit left of the
                    check digit, weights alternate 3, 1, 3, 1 moving right-to-left. The check digit brings the
                    weighted sum to the next multiple of 10 — the same formula across UPC-A, EAN-8/13, and GTIN-14.
                  </p>
                  <p>
                    A valid check digit confirms the number is well-formed, not that it was issued by GS1 to your
                    brand. Marketplaces like Amazon cross-check the GS1 registry — reseller codes can pass the
                    checksum and still be rejected.
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

export default GtinValidator;
