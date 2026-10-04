import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

const { ANALYTICS_TOKEN } = process.env;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Content-Type': 'application/json',
};

const READ_BATCH = 20;
const MAX_PAGES = 100;
const MAX_REFERRERS = 25;
const MAX_IPS = 50;
const MAX_COUNTRIES = 50;

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== 'GET') {
    return respond(405, { error: 'Method Not Allowed' });
  }
  if (!isAuthorized(req.headers.get('authorization'))) {
    return respond(401, { error: 'Unauthorized' });
  }

  const days = clampDays(parseInt(new URL(req.url).searchParams.get('days'), 10));
  const sinceDay = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10);

  try {
    const events = await loadEvents(sinceDay);
    return respond(200, aggregate(events, days));
  } catch (err) {
    console.error('Stats failed:', err);
    return respond(500, { error: 'Stats unavailable' });
  }
};

function respond(statusCode, body) {
  return new Response(JSON.stringify(body), { status: statusCode, headers: CORS_HEADERS });
}

function isAuthorized(header) {
  if (!ANALYTICS_TOKEN || !header) return false;
  const provided = header.replace(/^Bearer\s+/i, '');
  const a = Buffer.from(provided);
  const b = Buffer.from(ANALYTICS_TOKEN);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function clampDays(days) {
  if (!Number.isFinite(days)) return 30;
  return Math.min(Math.max(1, days), 365);
}

async function loadEvents(sinceDay) {
  const store = getStore('analytics');
  const { blobs } = await store.list({ prefix: 'events/' });
  const keys = blobs
    .map((b) => b.key)
    .filter((key) => key.slice(7, 17) >= sinceDay);

  const events = [];
  for (let i = 0; i < keys.length; i += READ_BATCH) {
    const batch = await Promise.all(
      keys.slice(i, i + READ_BATCH).map((key) => store.get(key, { type: 'json' }))
    );
    for (const e of batch) {
      if (e && e.p) events.push(e);
    }
  }
  return events;
}

function aggregate(raw, days) {
  const byId = new Map();
  for (const e of raw) {
    const key = e.id || `${e.vid}:${e.sid}:${e.p}:${e.ts}`;
    const prev = byId.get(key);
    if (!prev || (e.d || 0) > (prev.d || 0) || ((e.d || 0) === (prev.d || 0) && e.done)) {
      byId.set(key, e);
    }
  }
  const views = [...byId.values()];

  const visitors = new Set();
  const sessions = new Set();
  const perDay = {};
  const perPath = {};
  const perRef = {};
  const perIp = {};
  const perCountry = {};
  const perCity = {};
  const buckets = { under10s: 0, s10to60: 0, m1to5: 0, over5m: 0 };
  let engagedSum = 0;

  for (const e of views) {
    visitors.add(e.vid);
    sessions.add(e.sid);
    const engaged = e.d || 0;
    engagedSum += engaged;

    const day = new Date(e.ts || e.received).toISOString().slice(0, 10);
    perDay[day] = (perDay[day] || 0) + 1;

    const pp = perPath[e.p] || (perPath[e.p] = { views: 0, visitors: new Set(), engaged: 0 });
    pp.views += 1;
    pp.visitors.add(e.vid);
    pp.engaged += engaged;

    if (e.r && !e.r.startsWith('internal:')) {
      perRef[e.r] = (perRef[e.r] || 0) + 1;
    }

    if (e.ip) {
      const pi = perIp[e.ip] || (perIp[e.ip] = { views: 0, visitors: new Set(), engaged: 0 });
      pi.views += 1;
      pi.visitors.add(e.vid);
      pi.engaged += engaged;
    }

    const cc = e.geo && e.geo.cc;
    if (cc) {
      const pc = perCountry[cc] || (perCountry[cc] = { name: e.geo.cn || cc, views: 0, visitors: new Set() });
      pc.views += 1;
      pc.visitors.add(e.vid);

      if (e.geo.city) {
        const cityKey = `${e.geo.city}, ${cc}`;
        perCity[cityKey] = (perCity[cityKey] || 0) + 1;
      }
    }

    const secs = engaged / 1000;
    if (secs < 10) buckets.under10s += 1;
    else if (secs < 60) buckets.s10to60 += 1;
    else if (secs < 300) buckets.m1to5 += 1;
    else buckets.over5m += 1;
  }

  const daily = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    daily.push({ day, views: perDay[day] || 0 });
  }

  const pages = Object.entries(perPath)
    .map(([path, p]) => ({
      path,
      views: p.views,
      uniques: p.visitors.size,
      avgEngagedMs: p.views ? Math.round(p.engaged / p.views) : 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, MAX_PAGES);

  const referrers = Object.entries(perRef)
    .map(([referrer, count]) => ({ referrer, views: count }))
    .sort((a, b) => b.views - a.views)
    .slice(0, MAX_REFERRERS);

  const ips = Object.entries(perIp)
    .map(([ip, p]) => ({
      ip,
      views: p.views,
      uniques: p.visitors.size,
      avgEngagedMs: p.views ? Math.round(p.engaged / p.views) : 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, MAX_IPS);

  const countries = Object.entries(perCountry)
    .map(([code, c]) => ({ code, name: c.name, views: c.views, uniques: c.visitors.size }))
    .sort((a, b) => b.views - a.views)
    .slice(0, MAX_COUNTRIES);

  const cities = Object.entries(perCity)
    .map(([city, count]) => ({ city, views: count }))
    .sort((a, b) => b.views - a.views)
    .slice(0, MAX_COUNTRIES);

  return {
    days,
    generatedAt: new Date().toISOString(),
    totals: {
      views: views.length,
      visitors: visitors.size,
      sessions: sessions.size,
      avgEngagedMs: views.length ? Math.round(engagedSum / views.length) : 0,
    },
    daily,
    pages,
    referrers,
    ips,
    countries,
    cities,
    buckets,
  };
}
