import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';

const RFC3339_REGEX = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

const ISO8601_PATTERNS = [
  { name: 'Calendar date (extended)', regex: /^\d{4}-\d{2}-\d{2}$/, example: '2026-05-26' },
  { name: 'Calendar date (basic)', regex: /^\d{8}$/, example: '20260526' },
  { name: 'Date + time, UTC', regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, example: '2026-05-26T14:30:00Z' },
  { name: 'Date + time, offset', regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/, example: '2026-05-26T14:30:00+05:30' },
  { name: 'Date + time, no zone', regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, example: '2026-05-26T14:30:00' },
  { name: 'Week date', regex: /^\d{4}-W\d{2}-\d$/, example: '2026-W22-2' },
  { name: 'Ordinal date', regex: /^\d{4}-\d{3}$/, example: '2026-146' },
  { name: 'Duration', regex: /^P(?=.)(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?=.)(?:\d+H)?(?:\d+M)?(?:\d+S)?)?$/, example: 'P3Y6M4DT12H30M5S' },
  { name: 'Interval', regex: /^.+\/.+$/, example: '2026-01-01/2026-12-31' },
];

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year, month) {
  const days = [31, 28, 31, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) return 29;
  return days[month - 1] || 0;
}

function getISOWeeksInYear(year) {
  const jan1 = new Date(year, 0, 1);
  const dec31 = new Date(year, 11, 31);
  const jan1Day = jan1.getDay() === 0 ? 7 : jan1.getDay();
  const dec31Day = dec31.getDay() === 0 ? 7 : dec31.getDay();
  return (dec31Day < 4 || jan1Day > 4) ? 52 : 53;
}

function validateDate(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const result = { input: trimmed, valid: false, rfc3339: false, reason: '', components: null, canonical: null, form: '' };

  // Try RFC 3339 first (strictest)
  const rfcMatch = trimmed.match(RFC3339_REGEX);
  if (rfcMatch) {
    const [, year, month, day, hour, minute, second, frac, offset] = rfcMatch;
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const h = parseInt(hour, 10);
    const min = parseInt(minute, 10);
    const s = parseInt(second, 10);

    if (m < 1 || m > 12) { result.reason = `Month ${m} out of range`; return result; }
    if (d < 1 || d > daysInMonth(y, m)) { result.reason = `Day ${d} invalid for ${year}-${month}`; return result; }
    if (h > 23) { result.reason = `Hour ${h} out of range`; return result; }
    if (min > 59) { result.reason = `Minute ${min} out of range`; return result; }
    if (s > 59) { result.reason = `Second ${s} out of range`; return result; }

    const date = new Date(trimmed);
    if (isNaN(date.getTime())) { result.reason = 'Unparseable date'; return result; }

    result.valid = true;
    result.rfc3339 = true;
    result.form = 'RFC 3339 (strict ISO 8601 profile)';
    result.components = { year: y, month: m, day: d, hour: h, minute: min, second: s, fractional: frac || null, offset };
    result.canonical = date.toISOString();
    return result;
  }

  // Try other ISO 8601 patterns
  for (const pattern of ISO8601_PATTERNS) {
    if (pattern.regex.test(trimmed)) {
      result.form = pattern.name;

      // Calendar date (extended)
      const calMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (calMatch) {
        const [, y, m, d] = calMatch;
        const yi = parseInt(y, 10), mi = parseInt(m, 10), di = parseInt(d, 10);
        if (mi < 1 || mi > 12) { result.reason = `Month ${mi} out of range`; return result; }
        if (di < 1 || di > daysInMonth(yi, mi)) { result.reason = `Day ${di} invalid for ${y}-${m}`; return result; }
        result.valid = true;
        result.components = { year: yi, month: mi, day: di };
        result.canonical = new Date(yi, mi - 1, di).toISOString().split('T')[0];
        return result;
      }

      // Calendar date (basic)
      const basicMatch = trimmed.match(/^(\d{4})(\d{2})(\d{2})$/);
      if (basicMatch) {
        const [, y, m, d] = basicMatch;
        const yi = parseInt(y, 10), mi = parseInt(m, 10), di = parseInt(d, 10);
        if (mi < 1 || mi > 12) { result.reason = `Month ${mi} out of range`; return result; }
        if (di < 1 || di > daysInMonth(yi, mi)) { result.reason = `Day ${di} invalid for ${y}${m}`; return result; }
        result.valid = true;
        result.components = { year: yi, month: mi, day: di };
        result.canonical = `${y}-${m}-${d}`;
        return result;
      }

      // Date + time without zone
      const dtMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})$/);
      if (dtMatch) {
        const [, y, m, d, h, min, s] = dtMatch;
        const yi = parseInt(y, 10), mi = parseInt(m, 10), di = parseInt(d, 10);
        const hi = parseInt(h, 10), mini = parseInt(min, 10), si = parseInt(s, 10);
        if (mi < 1 || mi > 12) { result.reason = `Month ${mi} out of range`; return result; }
        if (di < 1 || di > daysInMonth(yi, mi)) { result.reason = `Day ${di} invalid for ${y}-${m}`; return result; }
        if (hi > 23) { result.reason = `Hour ${hi} out of range`; return result; }
        if (mini > 59) { result.reason = `Minute ${mini} out of range`; return result; }
        if (si > 59) { result.reason = `Second ${si} out of range`; return result; }
        result.valid = true;
        result.components = { year: yi, month: mi, day: di, hour: hi, minute: mini, second: si, offset: 'none (local time)' };
        result.canonical = `${y}-${m}-${d}T${h}:${min}:${s}`;
        return result;
      }

      // Week date
      const weekMatch = trimmed.match(/^(\d{4})-W(\d{2})-(\d)$/);
      if (weekMatch) {
        const [, y, w, dw] = weekMatch;
        const yi = parseInt(y, 10), wi = parseInt(w, 10), dwi = parseInt(dw, 10);
        const maxWeeks = getISOWeeksInYear(yi);
        if (wi < 1 || wi > maxWeeks) { result.reason = `Week ${wi} invalid (year ${yi} has ${maxWeeks} weeks)`; return result; }
        if (dwi < 1 || dwi > 7) { result.reason = `Day of week ${dwi} out of range (1–7)`; return result; }
        result.valid = true;
        result.components = { isoYear: yi, isoWeek: wi, isoDayOfWeek: dwi };
        result.canonical = trimmed;
        return result;
      }

      // Ordinal date
      const ordMatch = trimmed.match(/^(\d{4})-(\d{3})$/);
      if (ordMatch) {
        const [, y, doy] = ordMatch;
        const yi = parseInt(y, 10), doyi = parseInt(doy, 10);
        const maxDay = isLeapYear(yi) ? 366 : 365;
        if (doyi < 1 || doyi > maxDay) { result.reason = `Day of year ${doyi} invalid (${yi} has ${maxDay} days)`; return result; }
        result.valid = true;
        result.components = { year: yi, dayOfYear: doyi };
        result.canonical = trimmed;
        return result;
      }

      // Duration
      if (pattern.name === 'Duration') {
        result.valid = true;
        result.components = { duration: trimmed };
        result.canonical = trimmed;
        return result;
      }

      // Interval
      if (pattern.name === 'Interval') {
        const [start, end] = trimmed.split('/');
        const startResult = validateDate(start);
        const endResult = validateDate(end);
        if (startResult?.valid && endResult?.valid) {
          result.valid = true;
          result.components = { start: startResult.canonical, end: endResult.canonical };
          result.canonical = `${startResult.canonical}/${endResult.canonical}`;
          return result;
        }
        result.reason = 'Invalid interval endpoints';
        return result;
      }
    }
  }

  result.reason = 'Unrecognized format — not valid ISO 8601';
  return result;
}

function Iso8601Validator() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const handleValidate = () => {
    const lines = input.split('\n').filter((l) => l.trim());
    const validated = lines.map(validateDate).filter(Boolean);
    setResults(validated);
  };

  const handleClear = () => {
    setInput('');
    setResults(null);
  };

  const handleCopyCanonical = () => {
    const canonical = results.filter((r) => r.valid && r.canonical).map((r) => r.canonical).join('\n');
    navigator.clipboard.writeText(canonical);
  };

  const validCount = results?.filter((r) => r.valid).length || 0;
  const invalidCount = results?.filter((r) => !r.valid).length || 0;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>ISO 8601 Date Validator - Free Online Date Format Checker | OG Technologies EU</title>
        <meta name="description" content="Free ISO 8601 / RFC 3339 date validator. Validate date-time strings in bulk, catch malformed formats, illegal leap days, and missing offsets. 100% browser-based, no uploads." />
        <meta name="keywords" content="ISO 8601 validator, RFC 3339 checker, date format validator, ISO 8601 date parser, bulk date validation, timestamp validator, datetime format checker" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/iso-8601-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/iso-8601-validator/" />
        <meta property="og:title" content="ISO 8601 Date Validator - Free Online Date Format Checker | OG Technologies EU" />
        <meta property="og:description" content="Free ISO 8601 / RFC 3339 date validator. Validate date-time strings in bulk. 100% browser-based, no uploads." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/iso-8601-validator/" />
        <meta name="twitter:title" content="ISO 8601 Date Validator - Free Online Date Format Checker | OG Technologies EU" />
        <meta name="twitter:description" content="Free ISO 8601 / RFC 3339 date validator. Validate date-time strings in bulk. 100% browser-based, no uploads." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'ISO 8601 Date Validator',
            url: 'https://www.ogtechnologies.co/tools/iso-8601-validator/',
            description: 'Free ISO 8601 / RFC 3339 date validator. Validate date-time strings in bulk, catch malformed formats, illegal leap days, and missing offsets. 100% browser-based, no uploads.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            featureList: [
              'Bulk validation of ISO 8601 / RFC 3339 date strings',
              'Per-line valid/invalid verdicts with error explanations',
              'Parsed component display (year, month, day, hour, minute, second, offset)',
              'UTC canonical form output for valid dates',
              'Supports calendar dates, week dates, ordinal dates, durations, and intervals',
              '100% browser-based — no data uploaded to any server',
            ],
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            creator: {
              '@type': 'Organization',
              name: 'OG Technologies EU',
              url: 'https://www.ogtechnologies.co/',
            },
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
                <h1 className="h1 mb-4">ISO 8601 Date Validator</h1>
                <p className="text-xl text-gray-400 mb-4">
                  Validate ISO 8601 / RFC 3339 date strings in bulk. Catch malformed formats, illegal
                  leap days, out-of-range components, and missing offsets. 100% browser-based, no uploads.
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left — Input & Results */}
                  <div>
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Paste date strings (one per line)
                      </label>
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={10}
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder={'2026-05-26T14:30:00Z\n2026-05-26T14:30:00+05:30\n2026-05-26\n2026-W22-2\n2026-146\nP3Y6M4DT12H30M5S\n2026-13-45\n2026-02-29'}
                      />
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={handleValidate}
                          disabled={!input.trim()}
                          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Validate
                        </button>
                        <button
                          onClick={handleClear}
                          className="px-6 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 font-medium hover:bg-gray-600 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    {results && (
                      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-gray-300">
                            Results: <span className="text-green-400">{validCount} valid</span>
                            <span className="text-gray-500 mx-2">|</span>
                            <span className="text-red-400">{invalidCount} invalid</span>
                          </h3>
                          {validCount > 0 && (
                            <button
                              onClick={handleCopyCanonical}
                              className="text-xs px-3 py-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                            >
                              Copy Canonical Forms
                            </button>
                          )}
                        </div>

                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {results.map((r, idx) => (
                            <div
                              key={idx}
                              className={`rounded-md border p-3 ${
                                r.valid
                                  ? 'border-green-500/30 bg-green-900/10'
                                  : 'border-red-500/30 bg-red-900/10'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <span className={`text-xs font-bold shrink-0 ${r.valid ? 'text-green-400' : 'text-red-400'}`}>
                                  {r.valid ? '✓' : '✗'}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-mono text-gray-200 break-all">{r.input}</p>
                                  {r.valid ? (
                                    <div className="mt-1">
                                      <p className="text-xs text-green-400">
                                        Valid{r.rfc3339 ? ' — RFC 3339 compliant' : ''}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-0.5">Form: {r.form}</p>
                                      {r.canonical && (
                                        <p className="text-xs text-purple-400 mt-0.5 font-mono">
                                          UTC: {r.canonical}
                                        </p>
                                      )}
                                      {r.components && (
                                        <details className="mt-1">
                                          <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                                            Parsed components
                                          </summary>
                                          <pre className="text-xs text-gray-400 mt-1 font-mono">
                                            {JSON.stringify(r.components, null, 2)}
                                          </pre>
                                        </details>
                                      )}
                                    </div>
                                  ) : (
                                    <p className="text-xs text-red-400 mt-1">{r.reason}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right — Educational Content */}
                  <div>
                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                      <h2 className="text-xl font-bold text-white mb-4">ISO 8601 vs RFC 3339</h2>
                      <p className="text-gray-300 mb-3">
                        <strong className="text-purple-400">ISO 8601</strong> is the broad international standard for
                        date and time representation. It allows many forms: calendar dates, week dates, ordinal
                        dates, durations, and intervals.
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong className="text-purple-400">RFC 3339</strong> is a strict subset of ISO 8601 designed
                        for internet protocols. It requires a full date-time with an explicit timezone offset
                        (Z or ±hh:mm). When a spec says "ISO 8601," it almost always means the RFC 3339 subset.
                      </p>
                      <p className="text-gray-300 text-sm">
                        This validator checks both: it flags RFC 3339 compliance separately from general ISO 8601 validity.
                      </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                      <h3 className="text-lg font-bold text-white mb-4">Supported Formats</h3>
                      <div className="space-y-2 text-sm">
                        {[
                          { form: 'Calendar date', example: '2026-05-26', note: 'Most common' },
                          { form: 'Date + time, UTC', example: '2026-05-26T14:30:00Z', note: 'RFC 3339' },
                          { form: 'Date + time, offset', example: '2026-05-26T14:30:00+05:30', note: 'RFC 3339' },
                          { form: 'Date + time, no zone', example: '2026-05-26T14:30:00', note: 'Local time' },
                          { form: 'Week date', example: '2026-W22-2', note: 'ISO 8601 only' },
                          { form: 'Ordinal date', example: '2026-146', note: 'ISO 8601 only' },
                          { form: 'Duration', example: 'P3Y6M4DT12H30M5S', note: 'ISO 8601 only' },
                          { form: 'Interval', example: '2026-01-01/2026-12-31', note: 'ISO 8601 only' },
                        ].map((f) => (
                          <div key={f.form} className="flex items-center justify-between border-b border-gray-700 pb-2">
                            <div>
                              <span className="text-gray-300">{f.form}</span>
                              <span className="text-xs text-gray-500 ml-2">{f.note}</span>
                            </div>
                            <code className="text-xs text-purple-400 font-mono">{f.example}</code>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                      <h3 className="text-lg font-bold text-white mb-4">Common Use Cases</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2 mt-1">•</span>
                          <span>Validating API payload timestamps before processing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2 mt-1">•</span>
                          <span>Auditing timestamps in JSON or NDJSON logs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2 mt-1">•</span>
                          <span>Cleaning CSV columns of mixed date formats before ETL</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2 mt-1">•</span>
                          <span>Pre-flight checking webhook payload timestamps</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2 mt-1">•</span>
                          <span>Verifying OpenAPI/Swagger date-time fields</span>
                        </li>
                      </ul>
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

export default Iso8601Validator;
