import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { parsePhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';

const COUNTRY_NAMES = new Intl.DisplayNames(['en'], { type: 'region' });
const COUNTRIES = getCountries().map((c) => ({
  code: c,
  name: COUNTRY_NAMES.of(c) || c,
  callingCode: `+${getCountryCallingCode(c)}`,
})).sort((a, b) => a.name.localeCompare(b.name));

function formatOne(raw, defaultCountry) {
  try {
    const phone = parsePhoneNumber(raw, defaultCountry);
    if (!phone) return { raw, valid: false, error: 'Could not parse' };
    return {
      raw,
      valid: phone.isValid(),
      possible: phone.isPossible(),
      e164: phone.number,
      international: phone.formatInternational(),
      national: phone.formatNational(),
      rfc3966: phone.getURI(),
      country: phone.country ? (COUNTRY_NAMES.of(phone.country) || phone.country) : null,
      type: phone.getType() || null,
    };
  } catch (e) {
    return { raw, valid: false, error: e.message };
  }
}

function PhoneFormatter() {
  const [mode, setMode] = useState('single');
  const [input, setInput] = useState('');
  const [country, setCountry] = useState('AT');
  const [result, setResult] = useState(null);
  const [bulkResults, setBulkResults] = useState(null);

  const runSingle = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(formatOne(v, country));
  };

  const runBulk = () => {
    const lines = input.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (!lines.length) { setBulkResults(null); return; }
    setBulkResults(lines.map((l) => formatOne(l, country)));
  };

  const copyBulk = () => {
    if (!bulkResults) return;
    navigator.clipboard.writeText(bulkResults.map((r) => r.e164 || r.raw).join('\n'));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free Phone Number Formatter - E.164, International, National | OG Technologies EU</title>
        <meta name="description" content="Format and validate phone numbers online: E.164, international, national, and RFC 3966 formats for 240+ countries. Bulk mode for CRM imports and SMS campaigns. Powered by libphonenumber. 100% client-side." />
        <meta name="keywords" content="phone number formatter, e164 format, phone validator, international phone format, crm phone cleanup, twilio e164, bulk phone formatter" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/phone-formatter/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/phone-formatter/" />
        <meta property="og:title" content="Free Phone Number Formatter - E.164, International, National | OG Technologies EU" />
        <meta property="og:description" content="Format and validate phone numbers: E.164, international, national, RFC 3966. Bulk mode for CRM imports. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/phone-formatter/" />
        <meta name="twitter:title" content="Free Phone Number Formatter - E.164, International, National | OG Technologies EU" />
        <meta name="twitter:description" content="Format and validate phone numbers: E.164, international, national, RFC 3966. Bulk mode for CRM imports. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Phone Number Formatter',
            url: 'https://www.ogtechnologies.co/tools/phone-formatter/',
            description: 'Format and validate phone numbers: E.164, international, national, and RFC 3966 formats for 240+ countries. Bulk mode for CRM imports. 100% client-side.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            featureList: [
              'E.164, international, national, RFC 3966 output',
              'Validity and line-type detection',
              'Bulk list processing for CRM imports',
              '240+ country numbering plans (libphonenumber)',
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
                <h1 className="h1">Phone Number Formatter</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Normalize phone numbers to E.164, international, national, or RFC 3966 formats — single numbers
                  or bulk lists for CRM imports and SMS campaigns. Powered by Google's libphonenumber metadata;
                  everything runs in your browser.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => { setMode('single'); setBulkResults(null); }}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'single' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                      Single
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMode('bulk'); setResult(null); }}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'bulk' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                      Bulk list
                    </button>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>{c.name} ({c.callingCode})</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">
                      {mode === 'single' ? 'Phone number' : 'Phone numbers (one per line)'}
                    </label>
                    {mode === 'single' ? (
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => { setInput(e.target.value); runSingle(e.target.value); }}
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="+43 1 555 1234 or (555) 123-4567"
                        spellCheck="false"
                      />
                    ) : (
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={8}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                        placeholder={'+43 1 555 1234\n(555) 123-4567\n0043 664 1234567'}
                        spellCheck="false"
                      />
                    )}
                  </div>

                  {mode === 'bulk' && (
                    <div className="flex gap-2 mb-6">
                      <button
                        type="button"
                        onClick={runBulk}
                        disabled={!input.trim()}
                        className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Format All
                      </button>
                      {bulkResults && (
                        <button
                          type="button"
                          onClick={copyBulk}
                          className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors"
                        >
                          Copy E.164 list
                        </button>
                      )}
                    </div>
                  )}

                  {mode === 'single' && result && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium ${result.valid ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                        {result.valid ? 'Valid number' : result.error || 'Invalid or incomplete number'}
                      </div>
                      {result.valid && (
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          {[['E.164', result.e164], ['International', result.international], ['National', result.national], ['RFC 3966', result.rfc3966]].map(([label, val]) => (
                            <div key={label} className="bg-gray-700/60 rounded-md p-3 flex items-center justify-between">
                              <div>
                                <p className="text-gray-400 text-xs mb-1">{label}</p>
                                <p className="text-gray-200 font-mono break-all">{val}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(val)}
                                className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors ml-2 shrink-0"
                              >
                                Copy
                              </button>
                            </div>
                          ))}
                          {result.country && (
                            <div className="bg-gray-700/60 rounded-md p-3">
                              <p className="text-gray-400 text-xs mb-1">Country</p>
                              <p className="text-gray-200">{result.country}</p>
                            </div>
                          )}
                          {result.type && (
                            <div className="bg-gray-700/60 rounded-md p-3">
                              <p className="text-gray-400 text-xs mb-1">Line type</p>
                              <p className="text-gray-200">{result.type}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {mode === 'bulk' && bulkResults && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-400 text-xs border-b border-gray-700">
                            <th className="pb-2 pr-4">Input</th>
                            <th className="pb-2 pr-4">E.164</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bulkResults.map((r, i) => (
                            <tr key={i} className="border-b border-gray-700/50 align-top">
                              <td className="py-2 pr-4 font-mono text-xs text-gray-400 break-all">{r.raw}</td>
                              <td className="py-2 pr-4 font-mono text-xs text-gray-200">{r.e164 || '—'}</td>
                              <td className="py-2 text-xs">
                                {r.valid
                                  ? <span className="text-green-400">Valid{r.type ? ` · ${r.type}` : ''}</span>
                                  : <span className="text-red-400">{r.error || 'Invalid'}</span>}
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
                    <strong className="text-gray-400">E.164</strong> is the canonical format for CRMs, SMS gateways
                    (Twilio, Vonage), and auth providers — a leading <code className="text-gray-400">+</code>, country
                    code, and subscriber digits with no spaces. Validation checks each country's numbering plan for
                    length and prefix rules; it does not confirm the line is active.
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

export default PhoneFormatter;
