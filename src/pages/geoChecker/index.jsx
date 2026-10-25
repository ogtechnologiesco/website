import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { runChecks, scoreResults, CATEGORIES, SEV_WEIGHT } from '../../utils/geoChecks';
import { scanSite, normalizeUrl } from '../../utils/geoFetch';

const SEV_STYLE = {
  blocker: 'bg-red-900/60 text-red-300 border-red-700',
  severe: 'bg-red-900/40 text-red-300 border-red-700/60',
  medium: 'bg-amber-900/40 text-amber-300 border-amber-700/60',
  low: 'bg-blue-900/40 text-blue-300 border-blue-700/60',
  info: 'bg-gray-700/60 text-gray-300 border-gray-600',
};
const STATUS_STYLE = {
  pass: 'text-green-400', fail: 'text-red-400', na: 'text-gray-500', info: 'text-blue-300',
};
const GRADE_COLOR = { A: 'text-green-400 border-green-600', B: 'text-lime-400 border-lime-600', C: 'text-amber-400 border-amber-600', D: 'text-orange-400 border-orange-600', F: 'text-red-400 border-red-600' };

const inputClass = 'form-input w-full bg-gray-900 border border-gray-700 focus:border-purple-500 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500';
const btnClass = 'btn-sm px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

function mdReport(url, results, score) {
  const lines = [`# GEO & SEO report — ${url}`, `Grade: ${score.grade} (${score.pct}%)`, ''];
  CATEGORIES.forEach((cat) => {
    const rs = results.filter((r) => r.cat === cat.id);
    if (!rs.length) return;
    lines.push(`## ${cat.label}`);
    rs.forEach((r) => lines.push(`- [${r.status.toUpperCase()}] (${r.sev}) ${r.title}${r.note ? ` — ${r.note}` : ''}`));
    lines.push('');
  });
  return lines.join('\n');
}

export default function GeoChecker() {
  const [url, setUrl] = useState('');
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteHtml, setPasteHtml] = useState('');
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(null);
  const [target, setTarget] = useState('');
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef(null);
  const autoRan = useRef(false);

  const analyze = async (rawUrl, htmlOverride = null) => {
    const u = normalizeUrl(rawUrl);
    if (!u) { setError('Enter a valid URL, e.g. https://example.com'); return; }
    setError(''); setResults(null); setScore(null); setRunning(true); setTarget(u.origin + (u.pathname === '/' ? '' : u.pathname));
    try {
      let ctx;
      if (htmlOverride != null) {
        setProgress('Parsing pasted HTML…');
        ctx = { html: pasteHtml, finalUrl: u.href, status: 200, headers: null, words: 0,
          robots: { ok: false }, sitemap: { ok: false }, llms: { ok: false }, sectxt: { ok: false }, dns: {} };
      } else {
        const out = await scanSite(u, setProgress);
        if (!out.ok) {
          setError('Could not fetch that URL — the site may block automated requests or the proxies may be busy. Try again, or use "paste HTML" mode below.');
          setRunning(false); return;
        }
        ctx = out.ctx;
      }
      setProgress('Running checks…');
      const res = runChecks(ctx);
      setResults(res); setScore(scoreResults(res));
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } finally { setRunning(false); setProgress(''); }
  };

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('url');
    if (q && !autoRan.current) { autoRan.current = true; setUrl(q); analyze(q); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareLink = target ? `${window.location.origin}/tools/geo-checker/?url=${encodeURIComponent(target)}` : '';

  const fixList = results
    ? results.filter((r) => r.status === 'fail' && r.sev !== 'info')
      .sort((a, b) => (SEV_WEIGHT[b.sev] || 0) - (SEV_WEIGHT[a.sev] || 0))
    : [];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free GEO & SEO Checker — AI Search Visibility Audit | OG Technologies EU</title>
        <meta name="description" content="Audit any website against 50+ SEO and GEO (Generative Engine Optimization) checks: meta tags, structured data, llms.txt, AI crawler rules, DMARC, security headers. Free, no signup — results in seconds." />
        <meta name="keywords" content="geo checker, generative engine optimization, seo checker free, ai visibility checker, llms.txt checker, website audit tool, chatgpt visibility, seo audit online" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/geo-checker/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/geo-checker/" />
        <meta property="og:title" content="Free GEO & SEO Checker — AI Search Visibility Audit" />
        <meta property="og:description" content="Audit any website against 50+ SEO and GEO checks — structured data, llms.txt, AI crawler rules, DMARC, security headers. Free, no signup." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/geo-checker/" />
        <meta name="twitter:title" content="Free GEO & SEO Checker — AI Search Visibility Audit" />
        <meta name="twitter:description" content="Audit any website against 50+ SEO and GEO checks — structured data, llms.txt, AI crawler rules, DMARC, security headers." />
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
              <div className="max-w-3xl mx-auto text-center pb-10">
                <h1 className="h1">Free GEO &amp; SEO Website Checker</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Audit any site against 50+ checks across SEO fundamentals, structured data, AI-search readiness (GEO), and email security — graded A–F with a prioritized fix list. Free, no signup.
                </p>
              </div>

              {/* Input */}
              <div className="max-w-2xl mx-auto">
                <form onSubmit={(e) => { e.preventDefault(); analyze(url, pasteMode ? pasteHtml : null); }}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-4">
                  {!pasteMode ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
                        placeholder="example.com or https://example.com/page" className={inputClass} aria-label="Website URL to audit" />
                      <button type="submit" disabled={running || !url.trim()} className={btnClass}>
                        {running ? 'Checking…' : 'Analyze'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
                        placeholder="URL this HTML belongs to (for reporting)" className={inputClass} aria-label="URL this HTML belongs to" />
                      <textarea value={pasteHtml} onChange={(e) => setPasteHtml(e.target.value)} rows={6}
                        placeholder="Paste the full page source (view-source) here…" className={inputClass + ' font-mono text-xs'} aria-label="Page HTML source" />
                      <button type="submit" disabled={running || !pasteHtml.trim() || !url.trim()} className={btnClass}>
                        {running ? 'Checking…' : 'Analyze pasted HTML'}
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => setPasteMode(!pasteMode)} className="text-sm text-purple-400 hover:text-purple-300">
                      {pasteMode ? '← Back to URL check' : 'Site blocks automated fetch? Paste HTML instead →'}
                    </button>
                    {progress && <span className="text-sm text-purple-400 animate-pulse">{progress}</span>}
                  </div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                </form>
              </div>

              {/* Results */}
              {results && score && (
                <div ref={resultsRef} className="max-w-4xl mx-auto mt-10 space-y-6">
                  {/* Score card */}
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className={`w-20 h-20 rounded-xl border-4 flex items-center justify-center text-4xl font-bold ${GRADE_COLOR[score.grade]}`}>
                          {score.grade}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{score.pct}% SEO &amp; GEO score</div>
                          <div className="text-gray-400 text-sm">{target}</div>
                          {score.blocked && <div className="text-red-400 text-sm mt-1">Grade capped — blocker issues found</div>}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.filter((c) => c.id !== 'EMAIL').map((cat) => {
                          const rs = results.filter((r) => r.cat === cat.id && r.status !== 'na' && r.status !== 'info');
                          const p = rs.filter((r) => r.status === 'pass').length;
                          return (
                            <span key={cat.id} className="text-xs px-3 py-1.5 rounded-full bg-gray-700 text-gray-300">
                              {cat.icon} {p}/{rs.length}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-700">
                      <button onClick={() => { navigator.clipboard.writeText(shareLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                        className="text-sm px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600">
                        {copied ? 'Copied!' : 'Copy report link'}
                      </button>
                      <button onClick={() => {
                        const blob = new Blob([mdReport(target, results, score)], { type: 'text/markdown' });
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = `geo-report-${new URL('https://' + target.replace(/^https?:\/\//, '')).hostname}.md`;
                        a.click();
                      }} className="text-sm px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600">
                        Download report (.md)
                      </button>
                      <button onClick={() => window.print()} className="text-sm px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600">
                        Print / Save as PDF
                      </button>
                    </div>
                  </div>

                  {/* Priority fixes */}
                  {fixList.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <h2 className="h4 mb-4">Priority fixes for {new URL('https://' + target.replace(/^https?:\/\//, '')).hostname}</h2>
                      <ol className="space-y-2 list-decimal list-inside">
                        {fixList.slice(0, 10).map((r) => (
                          <li key={r.id} className="text-sm text-gray-300">
                            <span className={`inline-block text-xs px-2 py-0.5 rounded border mr-2 ${SEV_STYLE[r.sev]}`}>{r.sev}</span>
                            {r.title}{r.note ? <span className="text-gray-500"> — {r.note}</span> : null}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Category detail */}
                  {CATEGORIES.map((cat) => {
                    const rs = results.filter((r) => r.cat === cat.id);
                    if (!rs.length) return null;
                    return (
                      <div key={cat.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-700 font-semibold text-gray-200">
                          {cat.icon} {cat.label}
                        </div>
                        <ul className="divide-y divide-gray-700/60">
                          {rs.map((r) => (
                            <li key={r.id} className="px-6 py-3 flex items-start gap-3">
                              <span className={`shrink-0 text-xs px-2 py-0.5 rounded border mt-0.5 ${SEV_STYLE[r.sev]}`}>{r.sev}</span>
                              <div className="min-w-0">
                                <div className="text-sm text-gray-200">{r.title}</div>
                                {r.note && <div className="text-xs text-gray-500 mt-0.5">{r.note}</div>}
                              </div>
                              <span className={`ml-auto shrink-0 text-sm font-medium ${STATUS_STYLE[r.status]}`}>
                                {r.status === 'pass' ? 'Pass' : r.status === 'fail' ? 'Fail' : r.status === 'na' ? 'N/A' : 'Info'}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* About */}
              <div className="max-w-3xl mx-auto mt-16 space-y-8">
                <div>
                  <h2 className="h4 mb-3">What is GEO (Generative Engine Optimization)?</h2>
                  <p className="text-gray-400">
                    GEO is the practice of structuring a website so AI search engines — Google AI Overviews, ChatGPT, Perplexity, Claude — can accurately cite it in their answers. Traditional SEO wins the blue links; GEO determines whether your content appears when someone asks an AI assistant a question your site should answer. This checker audits both in one pass.
                  </p>
                </div>
                <div>
                  <h2 className="h4 mb-3">How the scoring works</h2>
                  <p className="text-gray-400">
                    Every check is pass/fail with an impact weight — Severe 3, Medium 2, Low 1. Your score is the weight of passing checks divided by the weight of all applicable checks; N/A checks are excluded. Grades: A 90%+, B 75%+, C 60%+, D 40%+, F below 40%. Blocker failures (noindex, unreachable, no indexable content) cap the grade at D. Email security is shown for context and does not affect the score.
                  </p>
                </div>
                <div>
                  <h2 className="h4 mb-3">What we check</h2>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li><strong>SEO:</strong> HTTPS, title/meta description, canonical, Open Graph, heading structure, image alt &amp; lazy-loading, favicon, manifest</li>
                    <li><strong>GEO:</strong> llms.txt, AI crawler rules in robots.txt (GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot and more), content-in-HTML, question headings, sitemap</li>
                    <li><strong>Structured data:</strong> valid JSON-LD, Organization (name/url/logo/sameAs/knowsAbout), WebSite, Article, BreadcrumbList, FAQPage</li>
                    <li><strong>Technical:</strong> security headers (when readable), mixed content, HTML size, security.txt, robots.txt health</li>
                    <li><strong>Email:</strong> DMARC, SPF, MTA-STS via DNS-over-HTTPS — informational, not scored</li>
                  </ul>
                </div>
                <div>
                  <h2 className="h4 mb-3">Privacy &amp; limitations</h2>
                  <p className="text-gray-400">
                    Checks run entirely in your browser. In production, page fetches route through a small serverless function on our domain that returns the real status code and response headers; public CORS proxies are the fallback when it isn't available (e.g. local dev). Either way, don't audit non-public pages containing secrets. If fetch still fails, use the paste-HTML mode — analysis is identical. Response-header checks show N/A when headers can't be read through the proxy.
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
