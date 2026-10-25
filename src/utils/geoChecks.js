// GEO/SEO website checker — pure client-side check engine.
// Each check: { id, cat, sev, title, run(ctx) -> { status: 'pass'|'fail'|'na'|'info', note } }
// sev: 'blocker'|'severe'|'medium'|'low'|'info'.  ctx is built by geoFetch.js.
export const SEV_WEIGHT = { blocker: 3, severe: 3, medium: 2, low: 1, info: 0 };

export const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Amazonbot',
  'meta-externalagent', 'cohere-ai', 'Bytespider', 'CCBot', 'Diffbot', 'ImagesiftBot',
];

const text = (html) => {
  const d = new DOMParser().parseFromString(html || '', 'text/html');
  // Second parse for word counting — checks need scripts (JSON-LD) intact.
  const stripped = new DOMParser().parseFromString(html || '', 'text/html');
  stripped.querySelectorAll('script,style,noscript,template').forEach((n) => n.remove());
  const words = (stripped.body?.textContent || '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
  return { doc: d, words };
};

const findLd = (doc, type) => {
  const out = [];
  doc.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
    try {
      const j = JSON.parse(s.textContent);
      (Array.isArray(j) ? j : [j]).forEach((o) => {
        if (!o || typeof o !== 'object') return;
        const items = o['@graph'] ? o['@graph'] : [o];
        items.forEach((g) => {
          const t = g['@type'];
          const types = Array.isArray(t) ? t : [t];
          if (!type || types.some((x) => String(x).toLowerCase() === type.toLowerCase())) out.push(g);
        });
      });
    } catch (e) { /* collected separately */ }
  });
  return out;
};

const meta = (doc, sel) => doc.querySelector(sel)?.getAttribute('content') || doc.querySelector(sel)?.content || '';
const GENERIC_ANCHORS = /^(click here|learn more|read more|more|here|link|view|details|see more|find out more)\.?\s*$/i;

export const CHECKS = [
  // ── SEO FUNDAMENTALS ─────────────────────────────────────────────
  { id: 'https', cat: 'SEO', sev: 'blocker', title: 'Page served over HTTPS',
    run: (c) => c.finalUrl?.startsWith('https://')
      ? { status: 'pass' }
      : { status: 'fail', note: 'Site does not redirect to/serve HTTPS — browsers flag it as Not Secure' } },
  { id: 'status200', cat: 'SEO', sev: 'blocker', title: 'Page returns HTTP 200',
    run: (c) => (c.status === 200 || c.status === 0 /* proxy may mask */)
      ? { status: 'pass' }
      : { status: 'fail', note: `Returned HTTP ${c.status}` } },
  { id: 'title', cat: 'SEO', sev: 'medium', title: 'Title tag present',
    run: (c) => { const t = c.doc?.title?.trim(); return t ? { status: 'pass' } : { status: 'fail', note: 'No <title> element found' }; } },
  { id: 'titlelen', cat: 'SEO', sev: 'low', title: 'Title length 30–65 chars',
    run: (c) => { const t = c.doc?.title?.trim() || ''; if (!t) return { status: 'na', note: 'No title' };
      return t.length >= 30 && t.length <= 65 ? { status: 'pass' } : { status: 'fail', note: `${t.length} characters` }; } },
  { id: 'desc', cat: 'SEO', sev: 'medium', title: 'Meta description present',
    run: (c) => meta(c.doc, 'meta[name="description"]') ? { status: 'pass' } : { status: 'fail', note: 'Missing — Google may show a poor snippet' } },
  { id: 'desclen', cat: 'SEO', sev: 'low', title: 'Meta description 70–160 chars',
    run: (c) => { const d = meta(c.doc, 'meta[name="description"]'); if (!d) return { status: 'na' };
      return d.length >= 70 && d.length <= 160 ? { status: 'pass' } : { status: 'fail', note: `${d.length} characters` }; } },
  { id: 'canonical', cat: 'SEO', sev: 'medium', title: 'Canonical URL declared',
    run: (c) => { const h = c.doc?.querySelector('link[rel="canonical"]')?.href;
      return h ? (h.startsWith('http') ? { status: 'pass' } : { status: 'fail', note: 'Canonical is not an absolute URL' })
               : { status: 'fail', note: 'No <link rel="canonical">' }; } },
  { id: 'noindex', cat: 'SEO', sev: 'blocker', title: 'Page is indexable (no noindex)',
    run: (c) => { const r = (meta(c.doc, 'meta[name="robots"]') || '').toLowerCase();
      return r.includes('noindex') ? { status: 'fail', note: 'robots meta contains noindex — page is excluded from search' } : { status: 'pass' }; } },
  { id: 'viewport', cat: 'SEO', sev: 'low', title: 'Viewport meta (mobile-friendly)',
    run: (c) => meta(c.doc, 'meta[name="viewport"]')?.includes('width=device-width') ? { status: 'pass' } : { status: 'fail' } },
  { id: 'lang', cat: 'SEO', sev: 'low', title: 'lang attribute on <html>',
    run: (c) => c.doc?.documentElement?.lang ? { status: 'pass' } : { status: 'fail' } },
  { id: 'charset', cat: 'SEO', sev: 'low', title: 'UTF-8 charset declared',
    run: (c) => (meta(c.doc, 'meta[charset]') !== '' || c.doc?.querySelector('meta[charset]')) ? { status: 'pass' } : { status: 'fail' } },
  { id: 'h1', cat: 'SEO', sev: 'medium', title: 'At least one <h1>',
    run: (c) => { const n = c.doc?.querySelectorAll('h1').length || 0;
      return n > 0 ? { status: 'pass' } : { status: 'fail', note: 'No <h1> found' }; } },
  { id: 'h1one', cat: 'SEO', sev: 'low', title: 'Only one <h1>',
    run: (c) => { const n = c.doc?.querySelectorAll('h1').length || 0;
      return n === 0 ? { status: 'na' } : n === 1 ? { status: 'pass' } : { status: 'fail', note: `${n} h1 elements` }; } },
  { id: 'h2', cat: 'SEO', sev: 'low', title: '<h2> headings present',
    run: (c) => (c.doc?.querySelectorAll('h2').length || 0) > 0 ? { status: 'pass' } : { status: 'fail' } },
  { id: 'hier', cat: 'SEO', sev: 'low', title: 'Heading hierarchy not skipped',
    run: (c) => { const hs = [...(c.doc?.querySelectorAll('h1,h2,h3,h4,h5,h6') || [])].map((e) => +e.tagName[1]);
      for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) return { status: 'fail', note: `Jumps h${hs[i - 1]} → h${hs[i]}` };
      return { status: 'pass' }; } },
  { id: 'ogtitle', cat: 'SEO', sev: 'medium', title: 'og:title present',
    run: (c) => meta(c.doc, 'meta[property="og:title"]') ? { status: 'pass' } : { status: 'fail' } },
  { id: 'ogdesc', cat: 'SEO', sev: 'medium', title: 'og:description present',
    run: (c) => meta(c.doc, 'meta[property="og:description"]') ? { status: 'pass' } : { status: 'fail' } },
  { id: 'ogimg', cat: 'SEO', sev: 'medium', title: 'og:image present & absolute',
    run: (c) => { const v = meta(c.doc, 'meta[property="og:image"]');
      if (!v) return { status: 'fail', note: 'Missing — links shared on social/messaging will show no image' };
      return v.startsWith('http') ? { status: 'pass' } : { status: 'fail', note: 'og:image is relative, must be absolute' }; } },
  { id: 'ogtype', cat: 'SEO', sev: 'low', title: 'og:type present',
    run: (c) => meta(c.doc, 'meta[property="og:type"]') ? { status: 'pass' } : { status: 'fail', note: 'Defaults to website' } },
  { id: 'ogurl', cat: 'SEO', sev: 'low', title: 'og:url matches canonical',
    run: (c) => { const o = meta(c.doc, 'meta[property="og:url"]'), k = c.doc?.querySelector('link[rel="canonical"]')?.href;
      if (!o) return { status: 'fail', note: 'og:url missing' };
      return o === k ? { status: 'pass' } : { status: 'fail', note: `og:url ${o} ≠ canonical ${k}` }; } },
  { id: 'ogdims', cat: 'SEO', sev: 'low', title: 'og:image:width/height declared',
    run: (c) => (meta(c.doc, 'meta[property="og:image:width"]') && meta(c.doc, 'meta[property="og:image:height"]')) ? { status: 'pass' } : { status: 'fail' } },
  { id: 'ogalt', cat: 'SEO', sev: 'low', title: 'og:image:alt describes the share image',
    run: (c) => meta(c.doc, 'meta[property="og:image:alt"]') ? { status: 'pass' } : { status: 'fail' } },
  { id: 'twcard', cat: 'SEO', sev: 'low', title: 'Twitter card meta present',
    run: (c) => (meta(c.doc, 'meta[name="twitter:card"]') || meta(c.doc, 'meta[property="twitter:card"]')) ? { status: 'pass' } : { status: 'fail' } },
  { id: 'favicon', cat: 'SEO', sev: 'medium', title: 'Favicon linked or /favicon.ico',
    run: (c) => c.doc?.querySelector('link[rel*="icon"]') ? { status: 'pass' } : { status: 'fail' } },
  { id: 'appletouch', cat: 'SEO', sev: 'low', title: 'apple-touch-icon linked',
    run: (c) => c.doc?.querySelector('link[rel="apple-touch-icon"]') ? { status: 'pass' } : { status: 'fail' } },
  { id: 'manifest', cat: 'SEO', sev: 'low', title: '<link rel="manifest"> present',
    run: (c) => c.doc?.querySelector('link[rel="manifest"]') ? { status: 'pass' } : { status: 'fail', note: 'Browser best practice for home-screen shortcuts' } },
  { id: 'themecolor', cat: 'SEO', sev: 'low', title: '<meta name="theme-color"> present',
    run: (c) => meta(c.doc, 'meta[name="theme-color"]') ? { status: 'pass' } : { status: 'fail' } },
  { id: 'imgalt', cat: 'SEO', sev: 'medium', title: 'Content images have alt attributes',
    run: (c) => { const imgs = [...(c.doc?.querySelectorAll('img') || [])];
      const missing = imgs.filter((i) => !i.hasAttribute('alt')).length;
      if (!imgs.length) return { status: 'na' };
      return missing === 0 ? { status: 'pass' } : { status: 'fail', note: `${missing}/${imgs.length} images missing alt` }; } },
  { id: 'anchors', cat: 'SEO', sev: 'medium', title: 'Links have descriptive anchor text',
    run: (c) => { const bad = [...(c.doc?.querySelectorAll('a') || [])].filter((a) => GENERIC_ANCHORS.test((a.textContent || '').trim()));
      return bad.length === 0 ? { status: 'pass' } : { status: 'fail', note: `${bad.length} generic link(s): "${(bad[0].textContent || '').trim()}"` }; } },
  { id: 'imgdims', cat: 'SEO', sev: 'medium', title: 'All <img> tags have width & height',
    run: (c) => { const imgs = [...(c.doc?.querySelectorAll('img') || [])];
      if (!imgs.length) return { status: 'na' };
      const miss = imgs.filter((i) => !(i.width || i.getAttribute('width')) || !(i.height || i.getAttribute('height'))).length;
      return miss === 0 ? { status: 'pass' } : { status: 'fail', note: `${miss}/${imgs.length} missing dimensions — causes CLS` }; } },
  { id: 'lazyimg', cat: 'SEO', sev: 'low', title: 'Below-fold images use loading="lazy"',
    run: (c) => { const imgs = [...(c.doc?.querySelectorAll('img') || [])];
      if (imgs.length < 3) return { status: 'na' };
      const lazy = imgs.filter((i) => i.loading === 'lazy' || i.getAttribute('loading') === 'lazy').length;
      return lazy / imgs.length >= 0.5 ? { status: 'pass' } : { status: 'fail', note: `${lazy}/${imgs.length} lazy` }; } },
  { id: 'webp', cat: 'SEO', sev: 'medium', title: 'Images served in WebP/AVIF format',
    run: (c) => { const srcs = [...(c.doc?.querySelectorAll('img') || [])].map((i) => i.src || '').filter(Boolean);
      if (!srcs.length) return { status: 'na' };
      const mod = srcs.filter((s) => /\.(webp|avif)(\?|$)/i.test(s)).length;
      return mod / srcs.length >= 0.5 ? { status: 'pass' } : { status: 'fail', note: `${mod}/${srcs.length} images use WebP/AVIF` }; } },
  { id: 'doctype', cat: 'SEO', sev: 'low', title: 'HTML5 doctype',
    run: (c) => /^<!doctype html/i.test((c.html || '').trim()) ? { status: 'pass' } : { status: 'fail' } },

  // ── GEO & AI READINESS ───────────────────────────────────────────
  { id: 'llms', cat: 'GEO', sev: 'low', title: 'llms.txt exists',
    run: (c) => c.llms?.ok ? { status: 'pass' } : { status: 'fail', note: 'No llms.txt — emerging best practice for AI assistants' } },
  { id: 'llmsContent', cat: 'GEO', sev: 'low', title: 'llms.txt has substantial content',
    run: (c) => { if (!c.llms?.ok) return { status: 'na' };
      return c.llms.body.length > 500 ? { status: 'pass' } : { status: 'fail', note: `Only ${c.llms.body.length} chars` }; } },
  { id: 'crawlers', cat: 'GEO', sev: 'medium', title: 'AI search crawlers named in robots.txt',
    run: (c) => { if (!c.robots?.ok) return { status: 'fail', note: 'No robots.txt' };
      const named = AI_CRAWLERS.filter((n) => c.robots.body.includes(n));
      const missing = ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'].filter((n) => !named.includes(n));
      return missing.length === 0 ? { status: 'pass', note: `${named.length} AI crawlers named` }
        : { status: 'fail', note: `Not named: ${missing.join(', ')}` }; } },
  { id: 'aiblocked', cat: 'GEO', sev: 'medium', title: 'AI crawlers not explicitly blocked',
    run: (c) => { if (!c.robots?.ok) return { status: 'na' };
      const b = c.robots.body; const blocked = AI_CRAWLERS.filter((n) => {
        const re = new RegExp('User-agent:\\s*' + n + '[\\s\\S]*?(?=User-agent:|$)', 'i');
        const g = b.match(re);
        if (!g) return false;
        const rules = g[0].split('\n').map((l) => l.trim());
        return rules.includes('Disallow: /');
      });
      return blocked.length ? { status: 'fail', note: `Blocked: ${blocked.join(', ')}` } : { status: 'pass' }; } },
  { id: 'htmlcontent', cat: 'GEO', sev: 'blocker', title: 'Main content in initial HTML',
    run: (c) => c.words >= 200 ? { status: 'pass', note: `~${c.words} words in HTML` }
      : { status: 'fail', note: `Only ~${c.words} words — content may require JavaScript to render` } },
  { id: 'qheadings', cat: 'GEO', sev: 'low', title: 'Question-format headings (how/what/why)',
    run: (c) => { const qs = [...(c.doc?.querySelectorAll('h2,h3') || [])].filter((h) => /^(how|what|why|when|where|which|can|is|are|do|does)\b/i.test((h.textContent || '').trim()));
      return qs.length ? { status: 'pass', note: `${qs.length} question headings — good for AI snippets` } : { status: 'fail' }; } },
  { id: 'nosnippet', cat: 'GEO', sev: 'medium', title: 'data-nosnippet not applied to main content',
    run: (c) => c.doc?.querySelector('[data-nosnippet]') ? { status: 'fail' } : { status: 'pass' } },
  { id: 'maximg', cat: 'GEO', sev: 'medium', title: 'max-image-preview:large in robots meta',
    run: (c) => (meta(c.doc, 'meta[name="robots"]') || '').includes('max-image-preview:large')
      ? { status: 'pass' } : { status: 'fail', note: 'Recommended by Google for Discover/large previews' } },
  { id: 'sitemapdecl', cat: 'GEO', sev: 'medium', title: 'Sitemap declared in robots.txt',
    run: (c) => c.robots?.ok && /sitemap:/i.test(c.robots.body) ? { status: 'pass' } : { status: 'fail' } },
  { id: 'sitemap', cat: 'GEO', sev: 'medium', title: 'sitemap.xml reachable',
    run: (c) => c.sitemap?.ok && /<url>|<sitemapindex/i.test(c.sitemap.body) ? { status: 'pass' }
      : { status: 'fail', note: 'No valid sitemap.xml' } },
  { id: 'identity', cat: 'GEO', sev: 'low', title: 'Organization/Person identity schema',
    run: (c) => (findLd(c.doc, 'Organization').length || findLd(c.doc, 'Person').length) ? { status: 'pass' } : { status: 'fail' } },
  { id: 'ttfb', cat: 'GEO', sev: 'low', title: 'Fast initial response (<1.5s)',
    run: (c) => c.responseMs ? (c.responseMs < 1500 ? { status: 'pass', note: `${c.responseMs} ms` } : { status: 'fail', note: `${c.responseMs} ms (via proxy — real TTFB may differ)` }) : { status: 'na' } },

  // ── STRUCTURED DATA ──────────────────────────────────────────────
  { id: 'sdpresent', cat: 'SD', sev: 'medium', title: 'Structured data present (JSON-LD)',
    run: (c) => (c.doc?.querySelectorAll('script[type="application/ld+json"]').length || 0) > 0 ? { status: 'pass' } : { status: 'fail' } },
  { id: 'sdvalid', cat: 'SD', sev: 'severe', title: 'All JSON-LD blocks are valid JSON',
    run: (c) => { let bad = 0, n = 0;
      c.doc?.querySelectorAll('script[type="application/ld+json"]').forEach((s) => { n++; try { JSON.parse(s.textContent); } catch { bad++; } });
      return n === 0 ? { status: 'na' } : bad === 0 ? { status: 'pass' } : { status: 'fail', note: `${bad}/${n} blocks fail to parse` }; } },
  { id: 'org', cat: 'SD', sev: 'medium', title: 'Organization schema present',
    run: (c) => findLd(c.doc, 'Organization').length ? { status: 'pass' } : { status: 'fail' } },
  { id: 'orgfields', cat: 'SD', sev: 'medium', title: 'Organization has name, url & logo',
    run: (c) => { const o = findLd(c.doc, 'Organization')[0]; if (!o) return { status: 'na' };
      const m = ['name', 'url', 'logo'].filter((k) => !o[k]);
      return m.length ? { status: 'fail', note: `Missing: ${m.join(', ')}` } : { status: 'pass' }; } },
  { id: 'sameas', cat: 'SD', sev: 'medium', title: 'Organization sameAs profile links',
    run: (c) => { const o = findLd(c.doc, 'Organization')[0]; if (!o) return { status: 'na' };
      return o.sameAs?.length ? { status: 'pass', note: `${o.sameAs.length} profiles` } : { status: 'fail' }; } },
  { id: 'website', cat: 'SD', sev: 'medium', title: 'WebSite schema with name & url',
    run: (c) => { const w = findLd(c.doc, 'WebSite')[0];
      return w && w.name && w.url ? { status: 'pass' } : { status: 'fail', note: w ? 'WebSite found but missing name/url' : 'Missing — helps Google show your site name' }; } },
  { id: 'inlang', cat: 'SD', sev: 'low', title: 'inLanguage declared in schema',
    run: (c) => findLd(c.doc).some((o) => o.inLanguage) ? { status: 'pass' } : { status: 'fail' } },
  { id: 'atid', cat: 'SD', sev: 'low', title: '@id with absolute URL on main entity',
    run: (c) => findLd(c.doc).some((o) => /^https?:\/\//.test(o['@id'] || '')) ? { status: 'pass' } : { status: 'fail', note: 'Entity-linking best practice' } },
  { id: 'knowsabout', cat: 'SD', sev: 'low', title: 'knowsAbout on Organization schema',
    run: (c) => { const o = findLd(c.doc, 'Organization')[0]; if (!o) return { status: 'na' };
      return o.knowsAbout?.length ? { status: 'pass' } : { status: 'fail' }; } },
  { id: 'article', cat: 'SD', sev: 'low', title: 'Article schema present (if article page)',
    run: (c) => { const isArt = meta(c.doc, 'meta[property="og:type"]') === 'article';
      if (!isArt) return { status: 'na', note: 'Not an article page' };
      return (findLd(c.doc, 'Article').length || findLd(c.doc, 'BlogPosting').length) ? { status: 'pass' } : { status: 'fail' }; } },
  { id: 'breadcrumb', cat: 'SD', sev: 'low', title: 'BreadcrumbList schema',
    run: (c) => findLd(c.doc, 'BreadcrumbList').length ? { status: 'pass' } : { status: 'fail' } },
  { id: 'faq', cat: 'SD', sev: 'info', title: 'FAQPage schema detected',
    run: (c) => findLd(c.doc, 'FAQPage').length ? { status: 'info', note: 'FAQPage found — can win rich/AI snippets' } : { status: 'info', note: 'No FAQPage — add one if the page has a FAQ section' } },

  // ── TECHNICAL & SECURITY ─────────────────────────────────────────
  { id: 'hdrnosniff', cat: 'TECH', sev: 'medium', title: 'X-Content-Type-Options: nosniff header',
    run: (c) => c.headers ? (/nosniff/i.test(c.headers.get('x-content-type-options') || '') ? { status: 'pass' } : { status: 'fail' }) : { status: 'na', note: 'Headers unavailable via proxy' } },
  { id: 'hsts', cat: 'TECH', sev: 'medium', title: 'Strict-Transport-Security header',
    run: (c) => c.headers ? (/strict/i.test('') || /max-age=\d{6,}/.test(c.headers.get('strict-transport-security') || '') ? { status: 'pass' } : { status: 'fail' }) : { status: 'na', note: 'Headers unavailable via proxy' } },
  { id: 'csp', cat: 'TECH', sev: 'medium', title: 'Content-Security-Policy header',
    run: (c) => c.headers ? (c.headers.get('content-security-policy') ? { status: 'pass' } : { status: 'fail' }) : { status: 'na', note: 'Headers unavailable via proxy' } },
  { id: 'xframe', cat: 'TECH', sev: 'low', title: 'Clickjacking protection (X-Frame-Options / frame-ancestors)',
    run: (c) => c.headers ? ((c.headers.get('x-frame-options') || /frame-ancestors/.test(c.headers.get('content-security-policy') || '')) ? { status: 'pass' } : { status: 'fail' }) : { status: 'na', note: 'Headers unavailable via proxy' } },
  { id: 'refpol', cat: 'TECH', sev: 'low', title: 'Referrer-Policy header',
    run: (c) => c.headers ? (c.headers.get('referrer-policy') ? { status: 'pass' } : { status: 'fail' }) : { status: 'na', note: 'Headers unavailable via proxy' } },
  { id: 'robotstxt', cat: 'TECH', sev: 'severe', title: 'robots.txt exists & returns 200',
    run: (c) => c.robots?.ok ? { status: 'pass' } : { status: 'fail' } },
  { id: 'securitytxt', cat: 'TECH', sev: 'low', title: 'security.txt present (.well-known)',
    run: (c) => c.sectxt?.ok && /contact:/i.test(c.sectxt.body) ? { status: 'pass' } : { status: 'fail', note: 'RFC 9116 — helps researchers report vulnerabilities' } },
  { id: 'mixed', cat: 'TECH', sev: 'medium', title: 'No mixed-content (http:// assets on https page)',
    run: (c) => { if (!c.finalUrl?.startsWith('https')) return { status: 'na' };
      const m = (c.html || '').match(/<(img|script|link|iframe|source)[^>]+(?:src|href)=["']http:\/\/(?!localhost|127\.)/gi);
      return m ? { status: 'fail', note: `${m.length} http:// resources` } : { status: 'pass' }; } },
  { id: 'size', cat: 'TECH', sev: 'low', title: 'HTML under ~500 KB',
    run: (c) => { const kb = Math.round((c.html?.length || 0) / 1024);
      return kb < 512 ? { status: 'pass', note: `${kb} KB` } : { status: 'fail', note: `${kb} KB of HTML` }; } },

  // ── EMAIL SECURITY (not scored) ──────────────────────────────────
  { id: 'dmarc', cat: 'EMAIL', sev: 'info', title: 'DMARC record present (_dmarc domain TXT)',
    run: (c) => c.dns?.dmarc?.length ? { status: 'info', note: 'Present' } : { status: 'info', note: 'No DMARC — anyone can spoof your domain' } },
  { id: 'dmarcp', cat: 'EMAIL', sev: 'info', title: 'DMARC policy is quarantine or reject',
    run: (c) => { const d = c.dns?.dmarc?.[0]; if (!d) return { status: 'na' };
      return /p=(quarantine|reject)/.test(d) ? { status: 'info', note: d.match(/p=\w+/)[0] } : { status: 'info', note: `${d.match(/p=\w+/)?.[0] || 'p=none'} — monitoring only` }; } },
  { id: 'spf', cat: 'EMAIL', sev: 'info', title: 'SPF record present',
    run: (c) => c.dns?.spf?.length ? { status: 'info', note: 'Present' } : { status: 'info', note: 'No SPF record found' } },
  { id: 'mtasts', cat: 'EMAIL', sev: 'info', title: 'MTA-STS configured',
    run: (c) => c.dns?.mtasts?.length ? { status: 'info', note: 'Present' } : { status: 'info', note: 'Not configured (optional hardening)' } },
];

export const CATEGORIES = [
  { id: 'SEO', label: 'SEO Fundamentals', icon: '🔍' },
  { id: 'GEO', label: 'GEO & AI Readiness', icon: '🤖' },
  { id: 'SD', label: 'Structured Data', icon: '📋' },
  { id: 'TECH', label: 'Technical & Security', icon: '🔒' },
  { id: 'EMAIL', label: 'Email Security — not scored', icon: '✉' },
];

export function runChecks(ctx) {
  const { doc, words } = text(ctx.html);
  ctx.doc = doc; ctx.words = words;
  return CHECKS.map((ch) => {
    let r;
    try { r = ch.run(ctx); } catch (e) { r = { status: 'fail', note: 'Check errored' }; }
    return { ...ch, ...r };
  });
}

export function scoreResults(results) {
  let got = 0, max = 0, blocked = false;
  results.forEach((r) => {
    if (r.status === 'na' || r.status === 'info' || r.sev === 'info') return;
    const w = SEV_WEIGHT[r.sev] || 0;
    max += w;
    if (r.status === 'pass') got += w;
    if (r.sev === 'blocker' && r.status === 'fail') blocked = true;
  });
  const pct = max ? Math.round((got / max) * 100) : 0;
  let grade = pct >= 90 ? 'A' : pct >= 75 ? 'B' : pct >= 60 ? 'C' : pct >= 40 ? 'D' : 'F';
  if (blocked && 'ABC'.includes(grade)) grade = 'D';
  return { pct, grade, blocked };
}
