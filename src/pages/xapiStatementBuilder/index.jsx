import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateStatement, buildStatement, XAPI_VERBS, XAPI_ACTIVITY_TYPES, XAPI_EXAMPLES } from '../../utils/xapiUtils';

function CheckRow({ check }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-700 last:border-0">
      <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${check.ok ? 'bg-green-900/60 text-green-400' : check.ok === null ? 'bg-yellow-900/60 text-yellow-400' : 'bg-red-900/60 text-red-400'}`}>
        {check.ok ? '✓' : check.ok === null ? '!' : '✗'}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-200">{check.label}</p>
        <p className="text-xs text-gray-400 break-words">{check.detail}</p>
      </div>
    </div>
  );
}

const inputCls = 'w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm';
const labelCls = 'block text-gray-300 text-sm font-medium mb-1';

function XapiStatementBuilder() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const [actorName, setActorName] = useState('Jane Doe');
  const [actorEmail, setActorEmail] = useState('jane@example.com');
  const [verbId, setVerbId] = useState('http://adlnet.gov/expapi/verbs/completed');
  const [activityId, setActivityId] = useState('https://lms.example.com/courses/intro');
  const [activityName, setActivityName] = useState('Introductory Course');
  const [activityType, setActivityType] = useState('http://adlnet.gov/expapi/activities/course');
  const [completed, setCompleted] = useState(true);
  const [success, setSuccess] = useState('true');
  const [scoreScaled, setScoreScaled] = useState('');
  const [duration, setDuration] = useState('');
  const [platform, setPlatform] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [registration, setRegistration] = useState('');

  const validate = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(validateStatement(v));
  };

  const loadExample = (ex) => {
    const json = JSON.stringify(ex.json, null, 2);
    setInput(json);
    setResult(validateStatement(json));
  };

  const built = useMemo(() => buildStatement({
    actorName, actorEmail, verbId, activityId, activityName, activityType,
    completed, success, scoreScaled, duration, platform, language, registration,
  }), [actorName, actorEmail, verbId, activityId, activityName, activityType, completed, success, scoreScaled, duration, platform, language, registration]);

  const builtJson = JSON.stringify(built, null, 2);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free xAPI Statement Builder & Validator - Tin Can API Tester | OG Technologies EU</title>
        <meta name="description" content="Build and validate xAPI (Tin Can) statements online. Check actor/verb/object structure, IFIs, scores, context, and attachments against the xAPI 1.0.x / 2.0 spec — plus a live statement builder with the official ADL verb registry. 100% client-side." />
        <meta name="keywords" content="xapi validator, xapi statement builder, tin can api, experience api, xapi statement tester, lrs, learning record store, adl verbs, scorm alternative, elearning developer tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/xapi-statement-builder/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/xapi-statement-builder/" />
        <meta property="og:title" content="Free xAPI Statement Builder & Validator - Tin Can API Tester | OG Technologies EU" />
        <meta property="og:description" content="Build and validate xAPI statements against the 1.0.x / 2.0 spec — actors, verbs, objects, results, context, attachments. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/xapi-statement-builder/" />
        <meta name="twitter:title" content="Free xAPI Statement Builder & Validator - Tin Can API Tester | OG Technologies EU" />
        <meta name="twitter:description" content="Build and validate xAPI statements against the 1.0.x / 2.0 spec — actors, verbs, objects, results, context, attachments. 100% client-side." />
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
                <h1 className="h1">xAPI Statement Builder &amp; Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste an xAPI (Tin Can) statement to check it against the 1.0.x / 2.0 spec — actors, IFIs,
                  verbs, objects, results, context, and attachments — or compose a valid statement below.
                  <strong className="text-gray-300"> Everything runs in your browser.</strong>
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className={labelCls}>xAPI statement (JSON)</label>
                    <textarea
                      value={input}
                      onChange={(e) => { setInput(e.target.value); validate(e.target.value); }}
                      rows={10}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                      placeholder='{"actor": {"mbox": "mailto:jane@example.com"}, "verb": {"id": "http://adlnet.gov/expapi/verbs/completed"}, "object": {"id": "https://example.com/course"}}'
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {XAPI_EXAMPLES.map((ex) => (
                      <button
                        key={ex.label}
                        type="button"
                        onClick={() => loadExample(ex)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>

                  {result && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium ${result.valid ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                        {result.valid
                          ? 'Valid xAPI statement — structurally conformant'
                          : result.error || 'Statement has structural errors'}
                      </div>
                      {result.checks.map((c, i) => <CheckRow key={i} check={c} />)}
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-700" id="statement-builder">
                    <h2 className="text-lg font-semibold text-gray-200 mb-3">Statement builder</h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={labelCls}>Actor name</label>
                        <input type="text" value={actorName} onChange={(e) => setActorName(e.target.value)} className={inputCls} placeholder="Jane Doe" spellCheck="false" />
                      </div>
                      <div>
                        <label className={labelCls}>Actor email (mbox)</label>
                        <input type="email" value={actorEmail} onChange={(e) => setActorEmail(e.target.value)} className={inputCls} placeholder="jane@example.com" spellCheck="false" />
                      </div>
                      <div>
                        <label className={labelCls}>Verb</label>
                        <select value={verbId} onChange={(e) => setVerbId(e.target.value)} className={inputCls}>
                          {XAPI_VERBS.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Activity type</label>
                        <select value={activityType} onChange={(e) => setActivityType(e.target.value)} className={inputCls}>
                          {XAPI_ACTIVITY_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Activity ID (IRI)</label>
                        <input type="text" value={activityId} onChange={(e) => setActivityId(e.target.value)} className={`${inputCls} font-mono`} placeholder="https://lms.example.com/courses/intro" spellCheck="false" />
                      </div>
                      <div>
                        <label className={labelCls}>Activity name</label>
                        <input type="text" value={activityName} onChange={(e) => setActivityName(e.target.value)} className={inputCls} placeholder="Introductory Course" spellCheck="false" />
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Result (optional)</h3>
                    <div className="grid sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className={labelCls}>Success</label>
                        <select value={success} onChange={(e) => setSuccess(e.target.value)} className={inputCls}>
                          <option value="">—</option>
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Scaled score (−1…1)</label>
                        <input type="number" step="0.01" min="-1" max="1" value={scoreScaled} onChange={(e) => setScoreScaled(e.target.value)} className={inputCls} placeholder="0.92" />
                      </div>
                      <div>
                        <label className={labelCls}>Duration (ISO 8601)</label>
                        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className={`${inputCls} font-mono`} placeholder="PT45M12S" spellCheck="false" />
                      </div>
                      <div className="flex items-end pb-1">
                        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500" />
                          completion: true
                        </label>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Context (optional)</h3>
                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className={labelCls}>Platform</label>
                        <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} className={inputCls} placeholder="Academy LMS" spellCheck="false" />
                      </div>
                      <div>
                        <label className={labelCls}>Language (BCP-47)</label>
                        <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className={`${inputCls} font-mono`} placeholder="en-US" spellCheck="false" />
                      </div>
                      <div>
                        <label className={labelCls}>Registration (UUID)</label>
                        <input type="text" value={registration} onChange={(e) => setRegistration(e.target.value)} className={`${inputCls} font-mono`} placeholder="ec531277-…" spellCheck="false" />
                      </div>
                    </div>

                    <div className="relative">
                      <pre className="bg-gray-900 rounded-md p-4 text-xs font-mono text-purple-300 overflow-x-auto max-h-80 overflow-y-auto border border-gray-700">{builtJson}</pre>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => { navigator.clipboard.writeText(builtJson); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                          className="text-xs px-2.5 py-1.5 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
                        >
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setInput(builtJson); setResult(validateStatement(builtJson)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="text-xs px-2.5 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                        >
                          Validate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">What it checks:</strong> required actor/verb/object
                    structure, inverse functional identifiers (mbox, mbox_sha1sum, openid, account), verb and
                    activity IRIs against the ADL registry, score bounds (scaled −1…1, raw within min–max),
                    ISO 8601 timestamps and durations, UUID formats, context rules, SubStatement restrictions,
                    and attachment fields.
                  </p>
                  <p>
                    This is a structural check — acceptance still depends on your Learning Record Store.
                    Some LRSs reject statements with unknown properties or non-registered verb IRIs; warnings
                    flag those cases.
                  </p>
                </div>

                <div className="mt-12">
                  <h2 className="h4 mb-4">Frequently asked questions</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What is an xAPI statement?</h3>
                      <p className="text-sm text-gray-400">
                        An xAPI (Experience API, aka Tin Can) statement is a JSON record in the form
                        actor–verb–object: <em>&quot;Jane completed the safety course.&quot;</em> Learning
                        systems emit statements to a Learning Record Store (LRS), which can track far richer
                        activity than SCORM — simulations, offline learning, videos, job performance.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Which properties are required?</h3>
                      <p className="text-sm text-gray-400">
                        Every statement needs <code className="text-purple-300">actor</code>, <code className="text-purple-300">verb</code>,
                        and <code className="text-purple-300">object</code>. The actor must carry exactly one inverse
                        functional identifier — an <code className="text-purple-300">mbox</code> (mailto: email), SHA-1
                        hash of it, an OpenID URI, or an account (name + homePage). IDs, timestamps, results,
                        and context are optional but constrained: UUIDs, ISO 8601 timestamps, and bounded scores.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Can I use my own verb or activity IRIs?</h3>
                      <p className="text-sm text-gray-400">
                        Yes — the spec allows any IRI. Prefer the ADL verb registry (used in the builder&apos;s
                        dropdown) so LRSs and analytics tools display a canonical label like
                        &quot;completed&quot; instead of a raw URL. Custom IRIs must still be well-formed URIs,
                        ideally on a domain you control.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What is a SubStatement?</h3>
                      <p className="text-sm text-gray-400">
                        A SubStatement describes something that happened within the object of a parent statement —
                        e.g. &quot;team reported that Jane completed the course.&quot; It has the same
                        actor–verb–object shape but cannot contain its own id, timestamp, stored, authority, or
                        version, and it cannot be nested inside another SubStatement. The validator enforces both rules.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Does a valid statement get accepted by every LRS?</h3>
                      <p className="text-sm text-gray-400">
                        Structural validity is necessary but not sufficient. LRSs apply their own profiles —
                        cmi5 and the SCORM-to-xAPI profile add required fields and vocabularies on top of the
                        core spec. Validate here first, then test against your target LRS&apos;s statement endpoint.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Is my data sent anywhere?</h3>
                      <p className="text-sm text-gray-400">
                        No. Parsing, validation, and statement generation run entirely in your browser —
                        nothing is uploaded, logged, or stored.
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

export default XapiStatementBuilder;
