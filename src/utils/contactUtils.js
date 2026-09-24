// Contact-data utilities — vCard build/parse, email validation, CSV helpers.
// All client-side, no network calls.

// ---------------------------------------------------------------------------
// vCard (RFC 6350 / v3.0)
// ---------------------------------------------------------------------------
function escVcard(v) {
  return String(v).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function foldLine(line) {
  // RFC 6350: lines SHOULD be folded at 75 octets
  if (line.length <= 75) return line;
  const parts = [];
  let rest = line;
  while (rest.length > 75) {
    parts.push(rest.slice(0, 75));
    rest = ' ' + rest.slice(75);
  }
  parts.push(rest);
  return parts.join('\r\n');
}

export function buildVcard(fields, version = '3.0') {
  const lines = ['BEGIN:VCARD', `VERSION:${version}`];
  const { firstName, lastName, org, title, phone, phoneType, email, emailType, url, street, city, zip, country, note } = fields;
  const fn = [firstName, lastName].filter(Boolean).join(' ');
  if (version === '4.0') {
    lines.push(`FN:${escVcard(fn)}`);
    lines.push(`N:${escVcard(lastName || '')};${escVcard(firstName || '')};;;`);
  } else {
    lines.push(`N:${escVcard(lastName || '')};${escVcard(firstName || '')};;;`);
    lines.push(`FN:${escVcard(fn)}`);
  }
  if (org) lines.push(`ORG:${escVcard(org)}`);
  if (title) lines.push(`TITLE:${escVcard(title)}`);
  if (phone) {
    const t = phoneType ? (version === '4.0' ? `;TYPE=${phoneType.toLowerCase()}` : `;TYPE=${phoneType.toUpperCase()}`) : '';
    lines.push(`TEL${t}:${escVcard(phone)}`);
  }
  if (email) {
    const t = emailType ? (version === '4.0' ? `;TYPE=${emailType.toLowerCase()}` : `;TYPE=${emailType.toUpperCase()}`) : '';
    lines.push(`EMAIL${t}:${escVcard(email)}`);
  }
  if (url) lines.push(`URL:${escVcard(url)}`);
  if (street || city || zip || country) {
    lines.push(`ADR:;;${escVcard(street || '')};${escVcard(city || '')};;${escVcard(zip || '')};${escVcard(country || '')}`);
  }
  if (note) lines.push(`NOTE:${escVcard(note)}`);
  lines.push(`REV:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`);
  lines.push('END:VCARD');
  return lines.map(foldLine).join('\r\n');
}

export function parseVcard(text) {
  const unfolded = text.replace(/\r?\n[ \t]/g, '');
  const lines = unfolded.split(/\r?\n/);
  const props = [];
  let inCard = false;
  lines.forEach((line) => {
    if (!line.trim()) return;
    if (line === 'BEGIN:VCARD') { inCard = true; return; }
    if (line === 'END:VCARD') { inCard = false; return; }
    if (!inCard) return;
    const m = line.match(/^([A-Za-z0-9-]+)((?:;[^:]*)*):(.*)$/);
    if (!m) return;
    const [, name, params, value] = m;
    props.push({
      name,
      params: params.replace(/^;/, '').split(';').filter(Boolean),
      value: value.replace(/\\n/gi, '\n').replace(/\\([;,\\])/g, '$1'),
    });
  });
  return props;
}

// ---------------------------------------------------------------------------
// Email validation
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'temp-mail.org',
  '10minutemail.com', 'throwawaymail.com', 'yopmail.com', 'sharklasers.com',
  'getnada.com', 'maildrop.cc', 'dispostable.com', 'fakeinbox.com',
  'trashmail.com', 'mintemail.com', 'mytemp.email', 'mohmal.com',
]);

const DOMAIN_TYPOS = {
  'gmial.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gmail.co': 'gmail.com',
  'gamil.com': 'gmail.com', 'gmail.cm': 'gmail.com', 'gnail.com': 'gmail.com',
  'hotmal.com': 'hotmail.com', 'hotmial.com': 'hotmail.com', 'hotmail.co': 'hotmail.com',
  'hotmali.com': 'hotmail.com', 'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com',
  'yahho.com': 'yahoo.com', 'outlok.com': 'outlook.com', 'outloook.com': 'outlook.com',
  'outllook.com': 'outlook.com', 'iclod.com': 'icloud.com', 'icloud.co': 'icloud.com',
};

export function validateEmail(email) {
  const e = email.trim();
  const res = { email: e, valid: false, issues: [] };
  if (!e) { res.issues.push('Empty'); return res; }
  if (!EMAIL_RE.test(e)) {
    res.issues.push('Invalid syntax');
    return res;
  }
  const [local, domain] = e.split('@');
  if (local.length > 64) res.issues.push('Local part > 64 chars');
  if (domain.length > 253) res.issues.push('Domain > 253 chars');
  if (!domain.includes('.')) res.issues.push('Domain has no TLD');
  const dl = domain.toLowerCase();
  if (DISPOSABLE_DOMAINS.has(dl)) res.issues.push('Disposable domain');
  if (DOMAIN_TYPOS[dl]) res.issues.push(`Possible typo — did you mean ${DOMAIN_TYPOS[dl]}?`);
  res.valid = res.issues.length === 0;
  res.domain = dl;
  return res;
}

// ---------------------------------------------------------------------------
// CSV parsing (RFC 4180-ish, handles quoted fields)
// ---------------------------------------------------------------------------
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field); field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

export function csvEscape(v) {
  if (v == null) return '';
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows) {
  return rows.map((r) => r.map(csvEscape).join(',')).join('\r\n');
}

// Dedupe CSV rows by key columns (exact + normalized matching)
export function dedupeCsv(rows, keyCols, normalize = true) {
  if (rows.length < 2) return { unique: rows, dupes: [] };
  const header = rows[0];
  const seen = new Map();
  const unique = [header];
  const dupes = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const key = keyCols.map((c) => {
      let v = row[c] || '';
      if (normalize) v = v.trim().toLowerCase().replace(/\s+/g, ' ');
      return v;
    }).join('||');
    if (seen.has(key)) {
      dupes.push({ row: i + 1, dupOf: seen.get(key) + 1, values: keyCols.map((c) => row[c]) });
    } else {
      seen.set(key, i);
      unique.push(row);
    }
  }
  return { unique, dupes, header };
}
