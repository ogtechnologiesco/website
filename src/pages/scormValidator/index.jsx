import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import JSZip from 'jszip';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';

function CheckRow({ check }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-700 last:border-0">
      <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${check.ok ? 'bg-green-900/60 text-green-400' : check.ok === null ? 'bg-yellow-900/60 text-yellow-400' : 'bg-red-900/60 text-red-400'}`}>
        {check.ok ? '✓' : check.ok === null ? '!' : '✗'}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-200">{check.label}</p>
        <p className="text-xs text-gray-400">{check.detail}</p>
      </div>
    </div>
  );
}

async function validateScormPackage(file) {
  const checks = [];
  const zip = await JSZip.loadAsync(file);
  const fileNames = Object.keys(zip.files).filter((n) => !zip.files[n].dir);
  const fileSet = new Set(fileNames.map((n) => n.toLowerCase()));

  // Detect standard
  const hasManifest = fileSet.has('imsmanifest.xml');
  const hasTincan = fileSet.has('tincan.xml');
  const hasCmi5 = fileSet.has('cmi5.xml');

  let standard = 'Unknown';
  if (hasCmi5) standard = 'cmi5';
  else if (hasTincan) standard = 'xAPI (Tin Can)';
  else if (hasManifest) standard = 'SCORM';

  checks.push({
    label: 'Package type',
    ok: standard !== 'Unknown',
    detail: standard !== 'Unknown' ? `Detected: ${standard}` : 'No imsmanifest.xml, tincan.xml, or cmi5.xml found at ZIP root',
  });

  if (standard === 'Unknown') return { checks, standard, fileCount: fileNames.length };

  // Manifest checks
  const manifestName = hasManifest ? 'imsmanifest.xml' : hasTincan ? 'tincan.xml' : 'cmi5.xml';
  const manifestFile = zip.files[fileNames.find((n) => n.toLowerCase() === manifestName)];
  const manifestText = await manifestFile.async('text');

  const parser = new DOMParser();
  const doc = parser.parseFromString(manifestText, 'application/xml');
  const parseError = doc.getElementsByTagName('parsererror')[0];
  checks.push({
    label: `${manifestName} well-formed`,
    ok: !parseError,
    detail: parseError ? `XML parse error: ${parseError.textContent.slice(0, 200)}` : 'XML parses cleanly',
  });
  if (parseError) return { checks, standard, fileCount: fileNames.length };

  if (hasManifest) {
    // SCORM version detection
    const schemaEl = doc.getElementsByTagName('schemaversion')[0];
    const schemaText = schemaEl ? schemaEl.textContent.trim() : '';
    let version = 'SCORM (version unknown)';
    if (/2004|CAM 1\.3/i.test(schemaText)) version = 'SCORM 2004';
    else if (/1\.2/i.test(schemaText)) version = 'SCORM 1.2';
    checks.push({ label: 'SCORM version', ok: true, detail: version });

    // Organizations / items / resources
    const orgs = doc.getElementsByTagName('organizations').length;
    const items = doc.getElementsByTagName('item').length;
    const resources = doc.getElementsByTagName('resource').length;
    checks.push({
      label: 'Manifest structure',
      ok: orgs > 0 && resources > 0,
      detail: `${orgs} organization(s), ${items} item(s), ${resources} resource(s)`,
    });

    // Launch file
    const launchEl = doc.querySelector('item[identifierref]');
    let launchHref = null;
    if (launchEl) {
      const resId = launchEl.getAttribute('identifierref');
      const res = Array.from(doc.getElementsByTagName('resource')).find((r) => r.getAttribute('identifier') === resId);
      launchHref = res ? res.getAttribute('href') : null;
    }
    if (!launchHref) {
      const firstRes = doc.getElementsByTagName('resource')[0];
      launchHref = firstRes ? firstRes.getAttribute('href') : null;
    }
    checks.push({
      label: 'Launch file',
      ok: !!launchHref && fileSet.has(launchHref.toLowerCase()),
      detail: launchHref
        ? fileSet.has(launchHref.toLowerCase())
          ? `${launchHref} exists in package`
          : `${launchHref} declared but NOT found in package`
        : 'No launch file declared in manifest',
    });

    // File references
    const hrefs = Array.from(doc.getElementsByTagName('file')).map((f) => f.getAttribute('href')).filter(Boolean);
    const missing = hrefs.filter((h) => !fileSet.has(h.toLowerCase()));
    const caseMismatch = hrefs.filter((h) => !fileNames.includes(h) && fileSet.has(h.toLowerCase()));
    checks.push({
      label: 'File references',
      ok: missing.length === 0,
      detail: missing.length === 0
        ? `All ${hrefs.length} referenced file(s) present`
        : `${missing.length} missing: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '…' : ''}`,
    });
    if (caseMismatch.length > 0) {
      checks.push({
        label: 'Case sensitivity',
        ok: null,
        detail: `${caseMismatch.length} file(s) differ only by case — will break on Linux LMS servers: ${caseMismatch.slice(0, 3).join(', ')}`,
      });
    }
  }

  if (hasTincan) {
    const launch = doc.getElementsByTagName('launch')[0];
    checks.push({
      label: 'xAPI launch activity',
      ok: !!launch,
      detail: launch ? 'Launch activity found in tincan.xml' : 'No launch element in tincan.xml',
    });
  }
  if (hasCmi5) {
    const au = doc.getElementsByTagName('au').length;
    checks.push({
      label: 'cmi5 assignable units',
      ok: au > 0,
      detail: `${au} assignable unit(s) in cmi5.xml`,
    });
  }

  return { checks, standard, fileCount: fileNames.length };
}

function ScormValidator() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = async (f) => {
    const target = f || file;
    if (!target) return;
    setLoading(true);
    setError('');
    try {
      const res = await validateScormPackage(target);
      setResult(res);
    } catch (e) {
      setError(`Could not read package: ${e.message}`);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setError('');
    validate(f);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free SCORM Package Validator - SCORM 1.2 / 2004 / xAPI / cmi5 | OG Technologies EU</title>
        <meta name="description" content="Validate SCORM, xAPI, and cmi5 packages online before LMS upload. Checks imsmanifest.xml, launch file, and file references — including case-sensitivity issues. 100% client-side — your package never leaves your browser." />
        <meta name="keywords" content="scorm validator, scorm checker, scorm package tester, imsmanifest.xml, xapi validator, cmi5 validator, lms upload test" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/scorm-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/scorm-validator/" />
        <meta property="og:title" content="Free SCORM Package Validator - SCORM 1.2 / 2004 / xAPI / cmi5 | OG Technologies EU" />
        <meta property="og:description" content="Validate SCORM, xAPI, and cmi5 packages before LMS upload. Manifest, launch file, and reference checks. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/scorm-validator/" />
        <meta name="twitter:title" content="Free SCORM Package Validator - SCORM 1.2 / 2004 / xAPI / cmi5 | OG Technologies EU" />
        <meta name="twitter:description" content="Validate SCORM, xAPI, and cmi5 packages before LMS upload. Manifest, launch file, and reference checks. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'SCORM Package Validator',
            url: 'https://www.ogtechnologies.co/tools/scorm-validator/',
            description: 'Validate SCORM 1.2, SCORM 2004, xAPI, and cmi5 packages before LMS upload. Checks manifest, launch file, and file references. 100% client-side.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            featureList: [
              'SCORM 1.2 / 2004 / xAPI / cmi5 detection',
              'imsmanifest.xml structure validation',
              'Launch file existence check',
              'File reference and case-sensitivity checks',
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
                <h1 className="h1">SCORM Package Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Drop a SCORM, xAPI, or cmi5 .zip package to run the same structural checks an LMS performs at
                  upload — manifest, launch file, and file references.{' '}
                  <strong className="text-gray-300">Your package never leaves your browser.</strong>
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <label className="block w-full border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors mb-6">
                    <input type="file" accept=".zip" className="hidden" onChange={onFile} />
                    <p className="text-gray-300 text-sm font-medium">
                      {file ? file.name : 'Click to select a .zip package'}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {file ? `${(file.size / 1024).toFixed(0)} KB — validating…` : 'SCORM 1.2, SCORM 2004, xAPI, or cmi5'}
                    </p>
                  </label>

                  {loading && <p className="text-sm text-gray-400 mb-4">Validating package…</p>}
                  {error && (
                    <div className="rounded-md px-4 py-3 mb-4 text-sm font-medium bg-red-900/40 text-red-300 border border-red-700">
                      {error}
                    </div>
                  )}

                  {result && !loading && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium ${result.standard !== 'Unknown' ? 'bg-purple-900/40 text-purple-300 border border-purple-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                        {result.standard !== 'Unknown'
                          ? `${result.standard} package — ${result.fileCount} file(s)`
                          : 'Not a recognized e-learning package'}
                      </div>
                      {result.checks.map((c, i) => <CheckRow key={i} check={c} />)}
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">What it checks:</strong> package type detection (SCORM 1.2,
                    SCORM 2004, xAPI via tincan.xml, cmi5 via cmi5.xml), manifest XML well-formedness, launch file
                    existence, and whether every file referenced in the manifest is actually present — including
                    case-sensitivity mismatches that break on Linux-hosted LMS servers.
                  </p>
                  <p>
                    This is a structural check, not a playback test — completion tracking and runtime behavior still
                    need a staging LMS or SCORM Cloud for full verification.
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

export default ScormValidator;
