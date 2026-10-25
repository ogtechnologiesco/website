// Fetch layer for the GEO checker.
// Priority: same-origin Netlify function (/api/geo-fetch, returns real status+headers)
// → public CORS proxies (body only) → caller shows "unreachable" and paste-HTML mode.
const PROXIES = [
  (u) => `/api/geo-fetch?url=${encodeURIComponent(u)}`,
  (u) => `/.netlify/functions/geo-fetch?url=${encodeURIComponent(u)}`,
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.org/?${encodeURIComponent(u)}`,
  (u) => `https://api.cors.lol/?url=${encodeURIComponent(u)}`,
];

const TIMEOUT = 20000;
const isFnPath = (p) => p.startsWith('/api/geo-fetch') || p.startsWith('/.netlify/');

// Returns { body, status, finalUrl, headersObj|null } or throws.
async function fetchText(url) {
  const attempts = [(u) => u, ...PROXIES];
  for (const make of attempts) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), TIMEOUT);
      const proxyUrl = make(url);
      const r = await fetch(proxyUrl, { signal: ctrl.signal, redirect: 'follow' });
      clearTimeout(t);
      if (!r.ok) continue;
      if (isFnPath(proxyUrl)) {
        // Our function returns JSON — but a 502/4xx inside means target failed.
        const j = await r.json();
        if (j && j.body && j.body.length > 50) {
          return { body: j.body, status: j.status, finalUrl: j.finalUrl || url, headersObj: j.headers || null };
        }
        continue;
      }
      const body = await r.text();
      if (body && body.length > 50) {
        return { body, status: r.status, finalUrl: url, headersObj: null };
      }
    } catch (e) { /* try next */ }
  }
  throw new Error('unreachable');
}

// Minimal Headers-like shim so checks can call .get(name) case-insensitively.
function makeHeaders(obj) {
  if (!obj) return null;
  const lower = {};
  Object.entries(obj).forEach(([k, v]) => { lower[k.toLowerCase()] = v; });
  return { get: (n) => lower[String(n).toLowerCase()] || null };
}

async function tryFile(url) {
  try { const r = await fetchText(url); return { ok: true, body: r.body }; }
  catch { return { ok: false, body: '' }; }
}

export async function dnsTxt(name) {
  try {
    const r = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=TXT`,
      { headers: { Accept: 'application/dns-json' } }
    );
    const j = await r.json();
    return (j.Answer || []).filter((a) => a.type === 16).map((a) => String(a.data).replace(/"/g, ''));
  } catch { return []; }
}

export function normalizeUrl(input) {
  let u = input.trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  try { return new URL(u); } catch { return null; }
}

// Returns { ok, error, ctx }
export async function scanSite(urlObj, onProgress = () => {}) {
  const origin = urlObj.origin;
  const pageUrl = urlObj.href;
  onProgress('Fetching page…');
  const t0 = Date.now();
  let page;
  try {
    page = await fetchText(pageUrl);
  } catch {
    return { ok: false, error: 'unreachable' };
  }
  const responseMs = Date.now() - t0;

  onProgress('Fetching robots.txt, sitemap, llms.txt…');
  const [robots, sitemap, llms, sectxt] = await Promise.all([
    tryFile(`${origin}/robots.txt`),
    tryFile(`${origin}/sitemap.xml`),
    tryFile(`${origin}/llms.txt`),
    tryFile(`${origin}/.well-known/security.txt`),
  ]);

  onProgress('Checking DNS records…');
  const host = urlObj.hostname.replace(/^www\./, '');
  const [dmarc, spf, mtasts] = await Promise.all([
    dnsTxt(`_dmarc.${host}`),
    dnsTxt(host).then((r) => r.filter((t) => t.startsWith('v=spf1'))),
    dnsTxt(`_mta-sts.${host}`),
  ]);

  return {
    ok: true,
    ctx: {
      html: page.body,
      responseMs,
      finalUrl: page.finalUrl || pageUrl,
      status: page.status,
      headers: makeHeaders(page.headersObj),
      robots, sitemap, llms, sectxt,
      dns: { dmarc, spf, mtasts },
    },
  };
}
