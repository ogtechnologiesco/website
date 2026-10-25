// Server-side fetch for the GEO/SEO checker tool.
// GET /api/geo-fetch?url=https://example.com
// Returns { status, finalUrl, headers, body } so the client-side checker can
// analyze real response headers (not visible through public CORS proxies).
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
  'Content-Type': 'application/json',
};

const PASS_HEADERS = [
  'content-type', 'content-security-policy', 'strict-transport-security',
  'x-content-type-options', 'x-frame-options', 'referrer-policy',
  'permissions-policy', 'cache-control', 'etag', 'last-modified', 'server',
];

const MAX_BYTES = 3 * 1024 * 1024;
const TIMEOUT_MS = 15000;

// Basic SSRF guard — reject private/reserved hosts.
function isBlockedHost(hostname) {
  const h = hostname.toLowerCase();
  if (['localhost', 'ip6-localhost'].includes(h)) return true;
  if (h.endsWith('.internal') || h.endsWith('.local') || h === 'metadata.google.internal') return true;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(h)) {
    const [a, b] = h.split('.').map(Number);
    if (a === 0 || a === 10 || a === 127 || (a === 169 && b === 254)
      || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return true;
  }
  if (h.includes(':')) return true; // IPv6 literals — keep it simple, block all
  return false;
}

function respond(status, obj) {
  return new Response(JSON.stringify(obj), { status, headers: CORS_HEADERS });
}

export default async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== 'GET') return respond(405, { error: 'Method Not Allowed' });

  const target = new URL(req.url).searchParams.get('url');
  if (!target) return respond(400, { error: 'Missing url parameter' });

  let u;
  try { u = new URL(target); } catch { return respond(400, { error: 'Invalid URL' }); }
  if (!/^https?:$/.test(u.protocol)) return respond(400, { error: 'Only http(s) URLs allowed' });
  if (isBlockedHost(u.hostname)) return respond(403, { error: 'Host not allowed' });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch(u.href, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGTech-GEO-Checker/1.0; +https://www.ogtechnologies.co/tools/geo-checker/)',
        'Accept': 'text/html,application/xhtml+xml,application/xml,text/plain,*/*',
      },
    });
    clearTimeout(timer);

    const text = await r.text();
    const headers = {};
    PASS_HEADERS.forEach((h) => { const v = r.headers.get(h); if (v) headers[h] = v; });

    return respond(200, {
      status: r.status,
      finalUrl: r.url,
      headers,
      body: text.slice(0, MAX_BYTES),
      truncated: text.length > MAX_BYTES,
    });
  } catch (e) {
    clearTimeout(timer);
    const cause = e.cause ? ` (${e.cause.code || e.cause.message || e.cause})` : '';
    return respond(502, { error: e.name === 'AbortError' ? 'Target timed out' : `Fetch failed: ${e.message}${cause}` });
  }
};

export const config = { path: '/api/geo-fetch' };
