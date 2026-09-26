import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateIban, computeIbanCheckDigits, IBAN_COUNTRIES, formatIban } from '../../utils/financeUtils';

const EXAMPLES = [
  { label: 'Germany', iban: 'DE89370400440532013000' },
  { label: 'Austria', iban: 'AT611904300234573201' },
  { label: 'United Kingdom', iban: 'GB29NWBK60161331926819' },
  { label: 'France', iban: 'FR1420041010050500013M02606' },
  { label: 'Netherlands', iban: 'NL91ABNA0417164300' },
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

function IbanValidator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [calcCountry, setCalcCountry] = useState('AT');
  const [calcBban, setCalcBban] = useState('');
  const [calcResult, setCalcResult] = useState(null);

  const validate = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(validateIban(v));
  };

  const runCalc = () => {
    if (!calcBban.trim()) { setCalcResult(null); return; }
    const digits = computeIbanCheckDigits(calcCountry, calcBban);
    setCalcResult(digits ? `${calcCountry}${digits}${calcBban.replace(/[^A-Za-z0-9]/g, '').toUpperCase()}` : 'Invalid BBAN characters');
  };

  const countryOptions = Object.keys(IBAN_COUNTRIES).sort();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free IBAN Validator - Check IBAN Online (ISO 13616) | OG Technologies EU</title>
        <meta name="description" content="Validate IBANs online: MOD-97 checksum, per-country BBAN structure, and SEPA reachability for 90+ countries. Includes check digit calculator. 100% client-side — no data sent to any server." />
        <meta name="keywords" content="iban validator, iban checker, validate iban, iban check digit, mod 97, iso 13616, sepa iban, iban calculator" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/iban-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/iban-validator/" />
        <meta property="og:title" content="Free IBAN Validator - Check IBAN Online (ISO 13616) | OG Technologies EU" />
        <meta property="og:description" content="Validate IBANs online: MOD-97 checksum, per-country BBAN structure, and SEPA reachability. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/iban-validator/" />
        <meta name="twitter:title" content="Free IBAN Validator - Check IBAN Online (ISO 13616) | OG Technologies EU" />
        <meta name="twitter:description" content="Validate IBANs online: MOD-97 checksum, per-country BBAN structure, and SEPA reachability. 100% client-side." />
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
                <h1 className="h1">IBAN Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Validate any International Bank Account Number against ISO 13616 — MOD-97 checksum,
                  country-specific BBAN structure, and SEPA reachability. Everything runs in your browser;
                  the account number is never sent to a server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">IBAN to validate</label>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => { setInput(e.target.value); validate(e.target.value); }}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                      placeholder="DE89 3704 0044 0532 0130 00"
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {EXAMPLES.map((ex) => (
                      <button
                        key={ex.iban}
                        type="button"
                        onClick={() => { setInput(ex.iban); validate(ex.iban); }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>

                  {result && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium ${result.valid ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                        {result.valid ? `Valid IBAN — ${result.formatted}` : 'Invalid IBAN'}
                      </div>

                      <div className="mb-4">
                        {result.checks.map((c) => <CheckRow key={c.label} check={c} />)}
                      </div>

                      {result.valid && result.country && (
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">Country</p>
                            <p className="text-gray-200">{result.country.name} ({result.iban.slice(0, 2)})</p>
                          </div>
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">SEPA reachable</p>
                            <p className="text-gray-200">{result.country.sepa ? 'Yes' : 'No'}</p>
                          </div>
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">Check digits</p>
                            <p className="text-gray-200 font-mono">{result.iban.slice(2, 4)}</p>
                          </div>
                          <div className="bg-gray-700/60 rounded-md p-3">
                            <p className="text-gray-400 text-xs mb-1">BBAN</p>
                            <p className="text-gray-200 font-mono break-all">{result.bban}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-200 mb-3">Check digit calculator</h2>
                    <p className="text-xs text-gray-500 mb-3">Compute the two check digits for a country code + BBAN.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={calcCountry}
                        onChange={(e) => setCalcCountry(e.target.value)}
                        className="bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                      >
                        {countryOptions.map((cc) => (
                          <option key={cc} value={cc}>{cc} — {IBAN_COUNTRIES[cc].name}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={calcBban}
                        onChange={(e) => setCalcBban(e.target.value)}
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="BBAN (e.g. 1904300234573201)"
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
                        <code className="text-purple-300 font-mono text-sm break-all">{formatIban(calcResult)}</code>
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
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">How it works:</strong> the IBAN is rearranged (country code and
                    check digits moved to the end), letters are converted to numbers (A=10 … Z=35), and the result must
                    equal 1 mod 97. The BBAN is then checked against the national format registered with SWIFT for that
                    country.
                  </p>
                  <p>
                    A valid checksum confirms the number is well-formed — it does not confirm the account exists or is
                    open. Always confirm account details with the receiving bank before sending funds.
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

export default IbanValidator;
