import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { parseTle } from '../../utils/tleUtils';

const SAMPLE_ISS = `ISS (ZARYA)
1 25544U 98067A   26265.50000000  .00016717  00000-0  30567-3 0  9993
2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.49560532456789`;

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

function Field({ label, value, mono = true }) {
  if (value == null || value === '') return null;
  return (
    <div className="bg-gray-700/60 rounded-md p-3">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className={`text-gray-200 text-sm ${mono ? 'font-mono' : ''} break-all`}>{value}</p>
    </div>
  );
}

function TleParser() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const parse = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(parseTle(v));
  };

  const fmt = (n, d = 4) => (n == null || Number.isNaN(n) ? '—' : n.toFixed(d));

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free TLE Parser - Two-Line Element Set Decoder & Orbital Elements | OG Technologies EU</title>
        <meta name="description" content="Decode NORAD two-line element sets (TLE) online: satellite catalog number, epoch, inclination, RAAN, eccentricity, mean motion — plus derived orbital period, apogee, and perigee. 100% client-side." />
        <meta name="keywords" content="tle parser, two line element decoder, satellite tle, norad tle, orbital elements, satellite tracking, tle checksum" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/tle-parser/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/tle-parser/" />
        <meta property="og:title" content="Free TLE Parser - Two-Line Element Set Decoder & Orbital Elements | OG Technologies EU" />
        <meta property="og:description" content="Decode NORAD TLEs: catalog number, epoch, inclination, RAAN, eccentricity, mean motion, plus derived orbital parameters. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/tle-parser/" />
        <meta name="twitter:title" content="Free TLE Parser - Two-Line Element Set Decoder & Orbital Elements | OG Technologies EU" />
        <meta name="twitter:description" content="Decode NORAD TLEs: catalog number, epoch, inclination, RAAN, eccentricity, mean motion, plus derived orbital parameters. 100% client-side." />
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
                <h1 className="h1">TLE Parser &amp; Orbital Elements Decoder</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste a NORAD two-line element set to decode every field — catalog number, epoch, inclination,
                  RAAN, eccentricity, mean motion — plus derived orbital period, apogee, and perigee.
                  Everything runs in your browser.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">TLE (2 or 3 lines)</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={4}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder={'ISS (ZARYA)\n1 25544U 98067A   26265.50000000  .00016717  00000-0  30567-3 0  9993\n2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.49560532456789'}
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => parse()}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Decode TLE
                    </button>
                    <button
                      type="button"
                      onClick={() => { setInput(SAMPLE_ISS); setResult(parseTle(SAMPLE_ISS)); }}
                      className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Sample: ISS
                    </button>
                  </div>

                  {result && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium ${result.valid ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-yellow-900/40 text-yellow-300 border border-yellow-700'}`}>
                        {result.valid
                          ? `Valid TLE${result.name ? ` — ${result.name}` : ''}`
                          : 'TLE parsed with warnings — see checks below'}
                      </div>

                      <div className="mb-6">
                        {result.checks.map((c) => <CheckRow key={c.label} check={c} />)}
                      </div>

                      {result.line1 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-300 mb-2">Line 1 — identification &amp; epoch</h3>
                          <div className="grid sm:grid-cols-3 gap-3">
                            <Field label="NORAD catalog #" value={result.line1.catalogNumber} />
                            <Field label="Classification" value={result.line1.classification} mono={false} />
                            <Field label="Intl. designator" value={result.line1.intlDesignator} />
                            <Field label="Epoch (UTC)" value={result.line1.epochIso} />
                            <Field label="Epoch age" value={`${fmt(result.line1.epochAgeDays, 1)} days`} />
                            <Field label="B* drag term" value={result.line1.bstar?.toExponential(4)} />
                            <Field label="Mean motion 1st deriv." value={result.line1.ndot?.toExponential(4)} />
                            <Field label="Element set #" value={result.line1.elementSetNumber} />
                          </div>
                        </div>
                      )}

                      {result.line2 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-300 mb-2">Line 2 — orbital elements</h3>
                          <div className="grid sm:grid-cols-3 gap-3">
                            <Field label="Inclination" value={`${fmt(result.line2.inclination)}°`} />
                            <Field label="RAAN" value={`${fmt(result.line2.raan)}°`} />
                            <Field label="Eccentricity" value={fmt(result.line2.eccentricity, 7)} />
                            <Field label="Arg. of perigee" value={`${fmt(result.line2.argPerigee)}°`} />
                            <Field label="Mean anomaly" value={`${fmt(result.line2.meanAnomaly)}°`} />
                            <Field label="Mean motion" value={`${fmt(result.line2.meanMotion, 8)} rev/day`} />
                            <Field label="Rev # at epoch" value={result.line2.revNumber} />
                          </div>
                        </div>
                      )}

                      {result.derived && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-300 mb-2">Derived parameters</h3>
                          <div className="grid sm:grid-cols-3 gap-3">
                            <Field label="Orbital period" value={`${fmt(result.derived.periodMin, 2)} min`} />
                            <Field label="Semi-major axis" value={`${fmt(result.derived.semiMajorAxisKm, 1)} km`} />
                            <Field label="Apogee altitude" value={`${fmt(result.derived.apogeeKm, 1)} km`} />
                            <Field label="Perigee altitude" value={`${fmt(result.derived.perigeeKm, 1)} km`} />
                            <Field label="Orbit type" value={result.derived.orbitType} mono={false} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">TLE anatomy:</strong> line 1 carries the NORAD catalog number,
                    classification, international designator, element-set epoch (2-digit year + fractional day of
                    year), and drag terms (B*, first/second mean-motion derivatives). Line 2 carries the orbital
                    geometry: inclination, RAAN, eccentricity (implied leading decimal), argument of perigee, mean
                    anomaly, and mean motion in revolutions per day.
                  </p>
                  <p>
                    Derived values use Keplerian two-body math — accurate for understanding the orbit, but TLEs are
                    mean elements designed for the SGP4 propagator. For precise position prediction use an SGP4
                    implementation rather than the Keplerian approximations shown here.
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

export default TleParser;
