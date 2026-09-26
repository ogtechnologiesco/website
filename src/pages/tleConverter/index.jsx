import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { parseTleBatch, tleToOmm } from '../../utils/tleUtils';

const SAMPLE = `ISS (ZARYA)
1 25544U 98067A   26265.50000000  .00016717  00000-0  30567-3 0  9993
2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.49560532456789
STARLINK-1007
1 44713U 19074A   26265.50000000  .00001264  00000-0  10162-3 0  9992
2 44713  53.0542 120.1234 0001234  90.1234 270.1234 15.06398765432109`;

const CSV_FIELDS = [
  'OBJECT_NAME', 'NORAD_CAT_ID', 'OBJECT_ID', 'EPOCH', 'MEAN_MOTION', 'ECCENTRICITY',
  'INCLINATION', 'RA_OF_ASC_NODE', 'ARG_OF_PERICENTER', 'MEAN_ANOMALY',
  'BSTAR', 'MEAN_MOTION_DOT', 'MEAN_MOTION_DDOT', 'REV_AT_EPOCH', 'ELEMENT_SET_NO',
];

function csvEscape(v) {
  if (v == null) return '';
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(omms) {
  const rows = [CSV_FIELDS.join(',')];
  omms.forEach((o) => rows.push(CSV_FIELDS.map((f) => csvEscape(o[f])).join(',')));
  return rows.join('\r\n');
}

function TleConverter() {
  const [input, setInput] = useState('');
  const [records, setRecords] = useState(null);
  const [output, setOutput] = useState('');
  const [format, setFormat] = useState('json');

  const convert = (value, fmt) => {
    const v = value !== undefined ? value : input;
    const f = fmt || format;
    if (!v.trim()) { setRecords(null); setOutput(''); return; }
    const parsed = parseTleBatch(v);
    setRecords(parsed);
    const omms = parsed.map(tleToOmm).filter(Boolean);
    setOutput(f === 'json' ? JSON.stringify(omms, null, 2) : toCsv(omms));
  };

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const txt = String(reader.result || '');
      setInput(txt);
      convert(txt);
    };
    reader.readAsText(file);
  };

  const download = () => {
    const blob = new Blob([output], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = format === 'json' ? 'tle-omm.json' : 'tle.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free TLE to JSON / CSV Converter - OMM GP Format | OG Technologies EU</title>
        <meta name="description" content="Convert NORAD TLE/3LE satellite element sets to CCSDS OMM/GP JSON or CSV online. Batch convert entire catalogs, validate checksums, download results. 100% client-side — no upload." />
        <meta name="keywords" content="tle to json, tle to csv, tle converter, omm json, gp json, satellite tle converter, 3le converter, ccsds omm" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/tle-converter/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/tle-converter/" />
        <meta property="og:title" content="Free TLE to JSON / CSV Converter - OMM GP Format | OG Technologies EU" />
        <meta property="og:description" content="Convert NORAD TLE/3LE element sets to CCSDS OMM/GP JSON or CSV. Batch conversion, checksum validation. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/tle-converter/" />
        <meta name="twitter:title" content="Free TLE to JSON / CSV Converter - OMM GP Format | OG Technologies EU" />
        <meta name="twitter:description" content="Convert NORAD TLE/3LE element sets to CCSDS OMM/GP JSON or CSV. Batch conversion, checksum validation. 100% client-side." />
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
                <h1 className="h1">TLE to JSON / CSV Converter</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Convert NORAD two-line element sets to modern CCSDS OMM/GP JSON or flat CSV — single satellites
                  or entire catalogs. Everything runs in your browser; nothing is uploaded.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">TLE / 3LE input (one or more records)</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={8}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder={'ISS (ZARYA)\n1 25544U 98067A   26265.50000000  .00016717  00000-0  30567-3 0  9993\n2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.49560532456789'}
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <div className="flex rounded-md overflow-hidden border border-gray-600">
                      <button
                        type="button"
                        onClick={() => { setFormat('json'); if (records) convert(undefined, 'json'); }}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${format === 'json' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                      >
                        JSON (OMM/GP)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setFormat('csv'); if (records) convert(undefined, 'csv'); }}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${format === 'csv' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                      >
                        CSV
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => convert()}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Convert
                    </button>
                    <label className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors cursor-pointer">
                      Load .tle / .txt file
                      <input type="file" accept=".tle,.txt,.3le" className="hidden" onChange={onFile} />
                    </label>
                    <button
                      type="button"
                      onClick={() => { setInput(SAMPLE); convert(SAMPLE); }}
                      className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Load sample
                    </button>
                    {output && (
                      <button
                        type="button"
                        onClick={download}
                        className="px-4 py-2 rounded-md bg-green-700 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        Download {format.toUpperCase()}
                      </button>
                    )}
                  </div>

                  {records && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">{records.length} record(s) parsed</p>
                      <div className="space-y-1">
                        {records.map((r, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${r.valid ? 'bg-green-900/60 text-green-400' : 'bg-yellow-900/60 text-yellow-400'}`}>
                              {r.valid ? '✓' : '!'}
                            </span>
                            <span className="text-gray-200">{r.name || `NORAD ${r.line1?.catalogNumber || '?'}`}</span>
                            <span className="text-gray-500 font-mono text-xs">{r.line1?.epochIso?.slice(0, 10)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {output && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm font-medium">Output</span>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(output)}
                          className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="bg-gray-700 rounded-md px-4 py-3 text-purple-300 font-mono text-xs overflow-x-auto max-h-96 overflow-y-auto whitespace-pre">{output}</pre>
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">OMM/GP JSON</strong> is the modern CCSDS-based format used by
                    CelesTrak and space-track.org — field names like <code className="text-gray-400">MEAN_MOTION</code>,{' '}
                    <code className="text-gray-400">RA_OF_ASC_NODE</code>, and <code className="text-gray-400">BSTAR</code>{' '}
                    map directly from the fixed-width TLE columns.
                  </p>
                  <p>
                    Records with bad checksums are still converted but flagged — check the source data before
                    propagating. To decode a single TLE field-by-field, use the{' '}
                    <a href="/tools/tle-parser/" className="text-purple-400 hover:text-purple-300">TLE Parser</a>.
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

export default TleConverter;
