import { getStore } from '@netlify/blobs';

const MAX_BODY_BYTES = 2048;
const MAX_DURATION_MS = 30 * 60 * 1000;
const ALLOWED_ORIGINS = ['ogtechnologies.co', 'localhost', '127.0.0.1'];

function truncateIp(ip) {
  if (!ip) return null;
  if (ip.includes('.')) {
    const parts = ip.split('.');
    return parts.length === 4 ? `${parts.slice(0, 3).join('.')}.0` : null;
  }
  const hextets = ip.split(':').filter(Boolean);
  return hextets.length ? `${hextets.slice(0, 3).join(':')}::` : null;
}

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const raw = await req.text();
  if (!raw || raw.length > MAX_BODY_BYTES) {
    return new Response('Invalid payload', { status: 400 });
  }

  const origin = req.headers.get('origin') || req.headers.get('referer') || '';
  if (origin && !ALLOWED_ORIGINS.some((host) => origin.includes(host))) {
    return new Response('Forbidden', { status: 403 });
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const path = typeof data.p === 'string' ? data.p.slice(0, 300) : '';
  if (!path.startsWith('/') || !data.vid || !data.sid) {
    return new Response('Invalid event', { status: 400 });
  }

  const received = Date.now();
  const record = {
    id: String(data.id || '').slice(0, 64) || null,
    vid: String(data.vid).slice(0, 64),
    sid: String(data.sid).slice(0, 64),
    p: path,
    t: String(data.t || '').slice(0, 200),
    r: String(data.r || '').slice(0, 200),
    ts: Number(data.ts) || received,
    d: Math.min(Math.max(0, Number(data.d) || 0), MAX_DURATION_MS),
    done: data.done === true,
    ip: truncateIp(context.ip || ''),
    geo: {
      cc: context.geo?.country?.code || null,
      cn: context.geo?.country?.name || null,
      city: context.geo?.city || null,
    },
    received,
  };

  const day = new Date(received).toISOString().slice(0, 10);
  const rand = Math.random().toString(36).slice(2, 10);
  const key = `events/${day}/${received}-${rand}.json`;

  try {
    const store = getStore('analytics');
    await store.set(key, JSON.stringify(record));
  } catch (err) {
    console.error('Blob write failed:', err);
    return new Response('Storage error', { status: 500 });
  }

  return new Response(null, { status: 204 });
};
