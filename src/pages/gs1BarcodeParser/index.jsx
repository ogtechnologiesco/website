import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { parseGs1String, GS1_EXAMPLES } from '../../utils/gs1AiUtils';

const COMMON_AIS = [
  ['00', 'SSCC — pallet/container serial', 'N18'],
  ['01', 'GTIN — trade item number', 'N14'],
  ['02', 'Contained GTIN', 'N14'],
  ['10', 'Batch / lot number', 'X≤20, variable'],
  ['11', 'Production date', 'YYMMDD'],
  ['15', 'Best before date', 'YYMMDD'],
  ['17', 'Expiration date', 'YYMMDD'],
  ['20', 'Internal product variant', 'N2'],
  ['21', 'Serial number', 'X≤20, variable'],
  ['240', 'Additional item ID', 'X≤30, variable'],
  ['241', 'Customer part number', 'X≤30, variable'],
  ['30', 'Count of items', 'N≤8, variable'],
  ['310n', 'Net weight (kg) — n = decimals', 'N6'],
  ['330n', 'Logistic gross weight (kg)', 'N6'],
  ['390n', 'Amount payable, local currency', 'N≤15, variable'],
  ['391n', 'Amount payable + ISO currency', 'N≤18, variable'],
  ['400', 'Customer purchase order', 'X≤30, variable'],
  ['401', 'GINC — consignment number', 'X≤30, variable'],
  ['402', 'GSIN — shipment ID', 'N17'],
  ['410–417', 'GLN — location numbers', 'N13'],
  ['420', 'Ship-to postal code', 'X≤20, variable'],
  ['422', 'Country of origin (ISO 3166)', 'N3'],
  ['7003', 'Expiry date + time', 'N10'],
  ['8003', 'GRAI — returnable asset', 'N14+X≤16'],
  ['8004', 'GIAI — individual asset', 'X≤30, variable'],
  ['90–99', 'Company internal data', 'X≤30–90, variable'],
];

function Gs1BarcodeParser() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const parse = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(parseGs1String(v));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free GS1 Barcode Parser — Application Identifier (AI) Decoder | OG Technologies EU</title>
        <meta name="description" content="Decode GS1-128, GS1 DataMatrix, and GS1 QR barcodes online. Parse Application Identifiers — GTIN, SSCC, batch/lot, serial, dates, weights, GLN — with check-digit validation, FNC1/GS separator handling, and ]C1/]d2 symbology detection. 100% client-side." />
        <meta name="keywords" content="gs1 barcode parser, gs1 application identifier, ai parser, gs1-128 decoder, gs1 datamatrix parser, gtin batch serial decoder, fnc1 separator, gs1 element string" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/gs1-barcode-parser/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/gs1-barcode-parser/" />
        <meta property="og:title" content="Free GS1 Barcode Parser — Application Identifier (AI) Decoder | OG Technologies EU" />
        <meta property="og:description" content="Decode GS1 element strings online: GTIN, SSCC, batch, serial, dates, weights, GLN — check-digit validation and FNC1 handling. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/gs1-barcode-parser/" />
        <meta name="twitter:title" content="Free GS1 Barcode Parser — Application Identifier (AI) Decoder | OG Technologies EU" />
        <meta name="twitter:description" content="Decode GS1 element strings online: GTIN, SSCC, batch, serial, dates, weights, GLN — check-digit validation and FNC1 handling. 100% client-side." />
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
                <h1 className="h1">GS1 Barcode / AI Parser</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste a GS1 element string — raw scanner output like{' '}
                  <code className="text-purple-300">]C1010401…</code>, bracketed notation like{' '}
                  <code className="text-purple-300">(01)0950…(17)…</code>, or a GS/FNC1-separated scan — and get
                  every Application Identifier decoded. <strong className="text-gray-300">Nothing is uploaded.</strong>
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">GS1 element string</label>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => { setInput(e.target.value); parse(e.target.value); }}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                      placeholder="]C101040123456789011726123110LOT-42X"
                      spellCheck="false"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Accepts <code className="text-gray-400">]C1</code>/<code className="text-gray-400">]d2</code>/<code className="text-gray-400">]Q3</code> symbology
                      identifiers, <code className="text-gray-400">(AI)</code> brackets, and FNC1 separators
                      written as <code className="text-gray-400">^</code>, <code className="text-gray-400">|</code>, <code className="text-gray-400">&lt;GS&gt;</code>, or ASCII 29.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {GS1_EXAMPLES.map((ex) => (
                      <button
                        key={ex.label}
                        type="button"
                        onClick={() => { setInput(ex.code); parse(ex.code); }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>

                  {result && (
                    <div>
                      {(result.symbology || result.mode) && (
                        <div className="flex flex-wrap gap-3 mb-4">
                          {result.symbology && (
                            <div className="rounded-md px-4 py-2 text-sm font-medium bg-purple-900/40 text-purple-300 border border-purple-700">
                              Symbology: {result.symbology}
                            </div>
                          )}
                          <div className="rounded-md px-4 py-2 text-sm font-medium bg-gray-700/60 text-gray-300 border border-gray-600">
                            {result.mode === 'brackets' ? '(AI) bracket notation' : 'Raw scan string'}
                            {result.elements.length > 0 && ` — ${result.elements.length} element${result.elements.length === 1 ? '' : 's'}`}
                          </div>
                        </div>
                      )}

                      {result.errors.map((e, i) => (
                        <div key={i} className="rounded-md px-4 py-3 mb-3 text-sm font-medium bg-red-900/40 text-red-300 border border-red-700">
                          {e}
                        </div>
                      ))}

                      {result.elements.length > 0 && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm border border-gray-700">
                            <thead>
                              <tr className="bg-gray-700/60">
                                <th className="px-4 py-2 font-semibold text-gray-300 w-16">AI</th>
                                <th className="px-4 py-2 font-semibold text-gray-300">Element</th>
                                <th className="px-4 py-2 font-semibold text-gray-300">Raw value</th>
                                <th className="px-4 py-2 font-semibold text-gray-300">Decoded</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.elements.map((el, i) => (
                                <tr key={i} className={`border-t border-gray-700 ${el.issues.length ? 'bg-red-900/10' : ''}`}>
                                  <td className="px-4 py-2 font-mono text-purple-300">{el.ai}</td>
                                  <td className="px-4 py-2 text-gray-300">{el.title}</td>
                                  <td className="px-4 py-2 font-mono text-gray-200 break-all">{el.raw}</td>
                                  <td className="px-4 py-2">
                                    {el.decoded && <span className="text-gray-300 text-xs block">{el.decoded}</span>}
                                    {el.issues.map((iss, j) => (
                                      <span key={j} className="text-red-400 text-xs block">⚠ {iss}</span>
                                    ))}
                                    {!el.decoded && el.issues.length === 0 && <span className="text-gray-500 text-xs">—</span>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-200 mb-3">Common Application Identifiers</h2>
                  <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-gray-700/60">
                          <th className="px-4 py-2 font-semibold text-gray-300 w-24">AI</th>
                          <th className="px-4 py-2 font-semibold text-gray-300">Meaning</th>
                          <th className="px-4 py-2 font-semibold text-gray-300 w-44">Format</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COMMON_AIS.map(([ai, meaning, fmt]) => (
                          <tr key={ai} className="border-t border-gray-700">
                            <td className="px-4 py-1.5 font-mono text-purple-300 text-xs">{ai}</td>
                            <td className="px-4 py-1.5 text-gray-300 text-xs">{meaning}</td>
                            <td className="px-4 py-1.5 text-gray-400 text-xs font-mono">{fmt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">How it parses:</strong> the AI table drives a longest-prefix
                    match — fixed-length AIs (GTIN, dates, GLN) consume a set number of characters, while
                    variable-length AIs (batch, serial) run to the next FNC1 separator or end of data. Check
                    digits are verified on SSCC, GTIN, GSIN, GLN, GRAI, GDTI, GCN, and GSRN fields; dates are
                    decoded to ISO format; measure AIs are scaled by their decimal indicator.
                  </p>
                  <p>
                    Need to verify just the trade item number? The{' '}
                    <Link to="/tools/gtin-validator/" className="text-purple-400 hover:text-purple-300">
                      GTIN / UPC / EAN validator
                    </Link>{' '}
                    covers check digits, format conversion, and country-prefix lookup in more depth.
                  </p>
                </div>

                <div className="mt-12">
                  <h2 className="h4 mb-4">Frequently asked questions</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What is a GS1 Application Identifier?</h3>
                      <p className="text-sm text-gray-400">
                        An AI is a 2–4 digit prefix that tells the receiver what the data after it means.
                        <code className="text-purple-300"> (01)</code> is always a GTIN, <code className="text-purple-300">(17)</code> an
                        expiry date, <code className="text-purple-300">(10)</code> a batch number. One GS1-128 or DataMatrix
                        symbol can carry many elements — a carton label might encode GTIN + expiry + lot + serial
                        in a single string like <code className="text-purple-300">]C101…17…10…21…</code>.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What is the ]C1 or ]d2 at the start of my scan?</h3>
                      <p className="text-sm text-gray-400">
                        That&apos;s the ISO/IEC 15424 symbology identifier — the scanner announcing which barcode
                        type it read: <code className="text-purple-300">]C1</code> = GS1-128, <code className="text-purple-300">]d2</code> =
                        GS1 DataMatrix, <code className="text-purple-300">]Q3</code> = GS1 QR Code, <code className="text-purple-300">]e0</code> =
                        GS1 DataBar. It&apos;s metadata, not part of the data, and can be disabled in most scanner
                        settings.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What is FNC1 and why does my scan show a strange character?</h3>
                      <p className="text-sm text-gray-400">
                        FNC1 is a special control character GS1 barcodes use to separate variable-length fields —
                        batch and serial numbers have no fixed length, so a separator tells the parser where one
                        ends and the next AI begins. Scanners emit it as ASCII 29 (Group Separator), often shown
                        as <code className="text-purple-300">^</code>, <code className="text-purple-300">|</code>, or
                        <code className="text-purple-300"> &lt;GS&gt;</code>. This tool accepts all of them.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Why does the date show a two-digit year?</h3>
                      <p className="text-sm text-gray-400">
                        GS1 dates are encoded YYMMDD — the century is not in the barcode. This tool decodes to
                        20xx, which is correct for any data generated this century. A day of
                        <code className="text-purple-300"> 00</code> is legal and means &quot;end of month / day not
                        specified.&quot;
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What does a check-digit warning mean?</h3>
                      <p className="text-sm text-gray-400">
                        Identification keys like GTIN (01), SSCC (00), and GLN (410–417) end in a GS1 mod-10
                        check digit. A mismatch means the barcode was mistyped, truncated, or generated by
                        software that computed the digit wrongly — scan the symbol again or re-key the number.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Can I parse QR codes and regular retail barcodes?</h3>
                      <p className="text-sm text-gray-400">
                        Retail UPC/EAN barcodes carry only a GTIN — use the GTIN validator for those. This parser
                        is for GS1 element strings: GS1-128, GS1 DataMatrix, GS1 QR Code, GS1 DataBar Expanded,
                        and GS1 DotCode, the symbologies used on cases, pallets, pharma packs, and logistic labels.
                      </p>
                    </div>
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

export default Gs1BarcodeParser;
