// SWIFT MT940 statement parsing utilities shared by the CSV and camt.053 converters.

// Strip SWIFT envelope blocks {1:...}{2:...}{4: ... -}
export function stripEnvelope(text) {
  let t = text;
  t = t.replace(/\{1:[^}]*\}/g, '').replace(/\{2:[^}]*\}/g, '').replace(/\{3:[^}]*\}/g, '');
  t = t.replace(/\{4:\s*/g, '').replace(/-\}\s*$/g, '').replace(/\{5:[^}]*\}/g, '');
  return t;
}

// Parse structured :86: remittance info (German ?NN subfields + SEPA tags)
export function parseTag86(raw) {
  const out = { remittance: [], counterpartyName: [], iban: null, bic: null, eref: null, mref: null, cred: null, purpose: null };
  if (!raw) return out;

  const sepaTags = { EREF: 'eref', MREF: 'mref', CRED: 'cred', SVWZ: 'remittance', PURP: 'purpose', ABWA: 'counterpartyName', ABWE: 'counterpartyName' };
  let cleaned = raw;

  // Extract SEPA TAG+value sequences (value runs until next TAG+ or ?NN or end)
  const sepaRe = /(EREF|MREF|CRED|SVWZ|PURP|ABWA|ABWE|KREF|RTRN|DEBT|COAM|OAMT|IBAN|BIC)\+([^?]*?)(?=(?:[A-Z]{4}\+)|(?:\?\d{2})|$)/g;
  let m;
  while ((m = sepaRe.exec(raw)) !== null) {
    const key = sepaTags[m[1]];
    const val = m[2].trim();
    if (!val) continue;
    if (key === 'remittance' || key === 'counterpartyName') out[key].push(val);
    else if (key && !out[key]) out[key] = val;
  }
  // Remove SEPA tags from the text before ?NN parsing
  cleaned = cleaned.replace(/[A-Z]{4}\+[^?]*?(?=(?:[A-Z]{4}\+)|(?:\?\d{2})|$)/g, '');

  // ?NN subfields
  const subRe = /\?(\d{2})([^?]*)/g;
  const subfields = {};
  while ((m = subRe.exec(cleaned)) !== null) {
    const code = m[1];
    subfields[code] = (subfields[code] || '') + m[2];
  }
  if (subfields['30']) out.bic = subfields['30'].trim();
  if (subfields['31']) out.iban = subfields['31'].replace(/\s+/g, '');
  if (subfields['32']) out.counterpartyName.push(subfields['32'].trim());
  if (subfields['33']) out.counterpartyName.push(subfields['33'].trim());
  ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29'].forEach((c) => {
    if (subfields[c]) out.remittance.push(subfields[c].trim());
  });
  if (subfields['34']) out.purpose = subfields['34'].trim();

  // If nothing structured was found, treat the whole thing as free text
  if (out.remittance.length === 0 && !out.iban && out.counterpartyName.length === 0) {
    out.remittance.push(raw.trim());
  }
  return out;
}

export function parseAmount(str) {
  if (str == null) return null;
  const n = parseFloat(str.replace(/\./g, '').replace(',', '.'));
  return Number.isNaN(n) ? null : n;
}

// Parse a balance tag value: C|D YYMMDD CCC amount
function parseBalance(value) {
  const mm = value.match(/^([CD])(\d{6})([A-Z]{3})([\d,\.]+)/);
  if (!mm) return null;
  return { drcr: mm[1], date: `20${mm[2].slice(0, 2)}-${mm[2].slice(2, 4)}-${mm[2].slice(4, 6)}`, currency: mm[3], amount: parseAmount(mm[4]) };
}

// Parse :61: statement line
// YYMMDD [MMDD] C/D/RC/RD [funds code] amount Nxxx reference //bankref [CRLF supplementary]
export function parseTag61(line) {
  const m = line.match(/^(\d{6})(\d{4})?(RC|RD|C|D)([A-Z])?([\d,\.]+)([A-Z])([A-Z0-9]{3})([^\n/]*)(?:\/\/([^\n]*))?(?:\n(.*))?$/s);
  if (!m) return null;
  const [, valueDate, entryDate, drcr, , amount, , txType, custRef, bankRef, supplementary] = m;
  return {
    valueDate: `20${valueDate.slice(0, 2)}-${valueDate.slice(2, 4)}-${valueDate.slice(4, 6)}`,
    entryDate: entryDate ? `${entryDate.slice(0, 2)}-${entryDate.slice(2, 4)}` : '',
    drcr,
    amount: parseAmount(amount),
    txType,
    custRef: custRef.trim(),
    bankRef: (bankRef || '').trim(),
    supplementary: (supplementary || '').trim(),
  };
}

export function parseMt940(text) {
  const cleaned = stripEnvelope(text);
  const lines = cleaned.split(/\r?\n/);

  const statements = [];
  let current = null;
  let lastTag = null;

  const pushTag = (tag, value) => {
    if (!current) current = { ref: null, relatedRef: null, account: null, statementNr: null, opening: null, closing: null, available: null, forward: [], entries: [] };
    switch (tag) {
      case '20': current.ref = value; break;
      case '21': current.relatedRef = value; break;
      case '25': current.account = value; break;
      case '28C': current.statementNr = value; break;
      case '60F': case '60M': current.opening = parseBalance(value); break;
      case '62F': case '62M': current.closing = parseBalance(value); break;
      case '64': current.available = parseBalance(value); break;
      case '65': { const b = parseBalance(value); if (b) current.forward.push(b); break; }
      case '61': {
        const entry = parseTag61(value);
        if (entry) current.entries.push({ ...entry, raw86: '' });
        break;
      }
      case '86': {
        if (current.entries.length > 0) {
          current.entries[current.entries.length - 1].raw86 = value;
        }
        break;
      }
      default: break;
    }
  };

  const tagRe = /^:(\d{2}[A-Z]?):?(.*)$/;
  lines.forEach((line) => {
    const m = line.match(tagRe);
    if (m) {
      lastTag = m[1];
      pushTag(lastTag, m[2]);
    } else if (lastTag === '86' && current && current.entries.length > 0) {
      current.entries[current.entries.length - 1].raw86 += '\n' + line;
    } else if (lastTag === '61' && current && current.entries.length > 0) {
      current.entries[current.entries.length - 1].supplementary += ' ' + line.trim();
    }
  });

  if (current && (current.entries.length > 0 || current.ref)) statements.push(current);

  // Enrich entries with :86: decode + running balance check
  statements.forEach((st) => {
    let running = st.opening ? (st.opening.drcr === 'C' ? st.opening.amount : -st.opening.amount) : 0;
    st.entries.forEach((e) => {
      e.parsed86 = parseTag86(e.raw86);
      const signed = (e.drcr === 'D' || e.drcr === 'RD') ? -e.amount : e.amount;
      if (e.drcr === 'RC' || e.drcr === 'RD') e.reversal = true;
      e.signedAmount = signed;
      running += signed;
      e.runningBalance = running;
    });
    if (st.closing) {
      const closingSigned = st.closing.drcr === 'C' ? st.closing.amount : -st.closing.amount;
      st.balanceCheck = { ok: Math.abs(running - closingSigned) < 0.005, computed: running, stated: closingSigned };
    }
  });

  return statements;
}
