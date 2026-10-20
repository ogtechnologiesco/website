import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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
  const [convInput, setConvInput] = useState('');
  const [convResult, setConvResult] = useState(null);

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

  const convertFormats = (value) => {
    const clean = value.replace(/[\s-]/g, '');
    if (!/^\d+$/.test(clean) || clean.length < 7 || clean.length > 14) { setConvResult(null); return; }
    const rows = [{ format: 'GTIN-14', code: clean.padStart(14, '0') }];
    if (clean.length === 13) rows.push({ format: 'EAN-13', code: clean });
    else if (clean.length === 14 && clean.startsWith('0')) rows.push({ format: 'EAN-13', code: clean.slice(1) });
    else if (clean.length < 13) rows.push({ format: 'EAN-13', code: clean.padStart(13, '0') });
    if (clean.length === 12) rows.push({ format: 'UPC-A', code: clean });
    else if (clean.length === 13 && clean.startsWith('0')) rows.push({ format: 'UPC-A', code: clean.slice(1) });
    else if (clean.length === 14 && clean.startsWith('00')) rows.push({ format: 'UPC-A', code: clean.slice(2) });
    if (clean.length === 8) rows.push({ format: 'EAN-8', code: clean });
    else if (clean.length > 8 && /^0+$/.test(clean.slice(0, clean.length - 8))) rows.push({ format: 'EAN-8', code: clean.slice(-8) });
    setConvResult(rows);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free GTIN Checker — GS1 Check Digit Calculator (UPC/EAN/ISBN) | OG Technologies EU</title>
        <meta name="description" content="Free GTIN checker online: verify UPC-A, EAN-8, EAN-13, and GTIN-14 barcodes against the GS1 mod-10 check digit, look up the country prefix, convert UPC to GTIN-14, and validate ISBNs. 100% client-side." />
        <meta name="keywords" content="gtin check, gtin checker, gtin check digit calculator, upc check, ean check, ean validator, barcode checker, gs1 check digit calculator, upc to gtin, ean-13, upc-a, isbn validator, gtin lookup" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/gtin-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/gtin-validator/" />
        <meta property="og:title" content="Free GTIN Checker — GS1 Check Digit Calculator (UPC/EAN/ISBN) | OG Technologies EU" />
        <meta property="og:description" content="Verify UPC-A, EAN-8, EAN-13, and GTIN-14 barcodes: GS1 check digit, format detection, country prefix lookup, UPC↔GTIN conversion. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/gtin-validator/" />
        <meta name="twitter:title" content="Free GTIN Checker — GS1 Check Digit Calculator (UPC/EAN/ISBN) | OG Technologies EU" />
        <meta name="twitter:description" content="Verify UPC-A, EAN-8, EAN-13, and GTIN-14 barcodes: GS1 check digit, format detection, country prefix lookup, UPC↔GTIN conversion. 100% client-side." />
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
                <h1 className="h1">GTIN Checker — UPC / EAN / ISBN Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Check retail barcodes against the GS1 check-digit algorithm — EAN-8, UPC-A, EAN-13, and
                  GTIN-14 — with format detection, country prefix lookup, and UPC↔GTIN conversion.
                  Everything runs in your browser.
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

                  <div className="mt-8 pt-6 border-t border-gray-700" id="check-digit-calculator">
                    <h2 className="text-lg font-semibold text-gray-200 mb-3">GS1 check digit calculator</h2>
                    <p className="text-xs text-gray-500 mb-3">Enter the digits without the check digit — the full code is returned. Works for GTIN-8, UPC-A, EAN-13, and GTIN-14.</p>
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

                  <div className="mt-8 pt-6 border-t border-gray-700" id="upc-to-gtin-converter">
                    <h2 className="text-lg font-semibold text-gray-200 mb-3">UPC ↔ GTIN converter</h2>
                    <p className="text-xs text-gray-500 mb-3">
                      Paste any barcode to see every equivalent format. Leading zeros never change the check
                      digit — a UPC-A is just a GTIN-14 without them.
                    </p>
                    <input
                      type="text"
                      value={convInput}
                      onChange={(e) => { setConvInput(e.target.value); convertFormats(e.target.value); }}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                      placeholder="036000291452"
                      spellCheck="false"
                    />
                    {convResult && (
                      <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-left text-sm border border-gray-700">
                          <thead>
                            <tr className="bg-gray-700/60">
                              <th className="px-4 py-2 font-semibold text-gray-300 w-28">Format</th>
                              <th className="px-4 py-2 font-semibold text-gray-300">Code</th>
                              <th className="px-4 py-2 font-semibold text-gray-300 w-24">Check digit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {convResult.map((row) => {
                              const v = validateGtin(row.code);
                              return (
                                <tr key={row.format} className="border-t border-gray-700">
                                  <td className="px-4 py-2 text-gray-300">{row.format}</td>
                                  <td className="px-4 py-2 font-mono text-purple-300">{row.code}</td>
                                  <td className={`px-4 py-2 text-xs font-medium ${v.valid ? 'text-green-400' : 'text-red-400'}`}>
                                    {v.valid ? '✓ valid' : '✗ invalid'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-700" id="isbn-validator">
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

                <div className="mt-12">
                  <h2 className="h4 mb-4">Frequently asked questions</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What is the difference between UPC, EAN, and GTIN?</h3>
                      <p className="text-sm text-gray-400">
                        GTIN is the umbrella identifier in the GS1 system. UPC-A (12 digits) is the North American
                        variant, EAN-8 and EAN-13 are the international retail formats, and GTIN-14 is the 14-digit
                        superset used on cases and pallets. They are the same numbering system — shorter codes are
                        simply zero-padded to GTIN-14.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">How do I convert UPC to GTIN-14?</h3>
                      <p className="text-sm text-gray-400">
                        Pad the UPC-A with leading zeros to 14 digits. The check digit does not change, because GS1
                        weights are counted from the rightmost data digit. Use the converter above — it shows every
                        equivalent format and re-verifies each one.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Does a valid check digit mean the barcode is registered?</h3>
                      <p className="text-sm text-gray-400">
                        No. The checksum only proves the digits are well-formed — it says nothing about whether GS1
                        issued the number or who owns it. Marketplaces like Amazon cross-check the GS1 registry and
                        brand ownership, so a checksum-valid code can still be rejected as unregistered or mismatched.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Can I look up which company or product a GTIN belongs to?</h3>
                      <p className="text-sm text-gray-400">
                        Not from the digits alone. A GTIN encodes a GS1 prefix (which identifies the issuing
                        country organization, shown in the result above), a company prefix, and an item
                        reference — but mapping those to a company name requires the GS1 registry (GEPIR) or a
                        licensed product database. This tool verifies the number is structurally valid; ownership
                        lookup is a separate registry query.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">How do I calculate a GTIN check digit by hand?</h3>
                      <p className="text-sm text-gray-400">
                        Starting from the rightmost data digit, multiply digits alternately by 3 and 1 moving
                        right-to-left, then sum. The check digit is whatever brings the total to the next
                        multiple of 10. The calculator above does this for you — enter the code without its last
                        digit and it returns the complete GTIN.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What does the check digit actually catch?</h3>
                      <p className="text-sm text-gray-400">
                        Single mistyped digits and most adjacent-digit transpositions — the classic data-entry errors
                        when someone keys a barcode by hand. It is an integrity check, not a security feature: the
                        algorithm is public and trivially reproducible.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Can I validate ISBNs here too?</h3>
                      <p className="text-sm text-gray-400">
                        Yes. ISBN-13 is just an EAN with a Bookland prefix (978 or 979) and validates with the same
                        GS1 check digit — paste one into the main field. The separate ISBN-10 box below uses the older
                        mod-11 checksum and also shows the ISBN-13 equivalent.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Is my barcode data uploaded anywhere?</h3>
                      <p className="text-sm text-gray-400">
                        No — every check runs in your browser. Nothing is sent to a server, logged, or stored, so
                        pre-launch product codes stay private.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="h4 mb-4">Related tools</h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Link to="/tools/iban-validator/" className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                      <p className="text-sm font-semibold text-gray-200">IBAN Validator</p>
                      <p className="text-xs text-gray-500 mt-1">MOD-97 check, BBAN structure, SEPA reachability</p>
                    </Link>
                    <Link to="/tools/bic-validator/" className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                      <p className="text-sm font-semibold text-gray-200">BIC / SWIFT Validator</p>
                      <p className="text-xs text-gray-500 mt-1">Decode bank codes per ISO 9362</p>
                    </Link>
                    <Link to="/tools/lei-validator/" className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                      <p className="text-sm font-semibold text-gray-200">LEI Validator</p>
                      <p className="text-xs text-gray-500 mt-1">Legal Entity Identifier check digits</p>
                    </Link>
                  </div>
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
