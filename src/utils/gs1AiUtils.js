// GS1 Application Identifier (AI) parser — decodes GS1-128, GS1 DataMatrix,
// GS1 QR, and GS1 DataBar element strings like (01)09506000134352(17)260331(10)ABC123
// or raw scan output with FNC1/GS separators and ]C1 / ]d2 symbology identifiers.
// All client-side, no network calls.

import { gs1CheckDigit, gs1PrefixLookup } from './gs1Utils.js';

const FNC1 = '\u001d';

const SYMBOLOGY = {
  C1: 'GS1-128',
  d2: 'GS1 DataMatrix',
  d1: 'GS1 DataMatrix (restricted)',
  e0: 'GS1 DataBar Expanded / EAN.UCC composite',
  J1: 'GS1 DataBar',
  Q3: 'GS1 QR Code',
  L1: 'GS1 DotCode',
  X0: 'Mixed — non-GS1 symbology',
};

const ISO_CURRENCIES = {
  '008': 'ALL', '012': 'DZD', '032': 'ARS', '036': 'AUD', '040': 'ATS', '044': 'BSD',
  '050': 'BDT', '051': 'AMD', '052': 'BBD', '060': 'BMD', '064': 'BTN', '068': 'BOB',
  '072': 'BWP', '084': 'BZD', '090': 'SBD', '096': 'BND', '104': 'MMK', '108': 'BIF',
  '116': 'KHR', '124': 'CAD', '132': 'CVE', '136': 'KYD', '144': 'LKR', '152': 'CLP',
  '156': 'CNY', '170': 'COP', '174': 'KMF', '188': 'CRC', '191': 'HRK', '192': 'CUP',
  '203': 'CZK', '208': 'DKK', '214': 'DOP', '222': 'SVC', '230': 'ETB', '232': 'ERN',
  '238': 'FKP', '242': 'FJD', '262': 'DJF', '270': 'GMD', '288': 'GHS', '292': 'GIP',
  '320': 'GTQ', '324': 'GNF', '328': 'GYD', '332': 'HTG', '340': 'HNL', '344': 'HKD',
  '348': 'HUF', '352': 'ISK', '356': 'INR', '360': 'IDR', '364': 'IRR', '368': 'IQD',
  '376': 'ILS', '388': 'JMD', '392': 'JPY', '398': 'KZT', '400': 'JOD', '404': 'KES',
  '408': 'KPW', '410': 'KRW', '414': 'KWD', '417': 'KGS', '418': 'LAK', '422': 'LBP',
  '426': 'LSL', '430': 'LRD', '434': 'LYD', '446': 'MOP', '454': 'MWK', '458': 'MYR',
  '462': 'MVR', '480': 'MUR', '484': 'MXN', '496': 'MNT', '504': 'MAD', '512': 'OMR',
  '524': 'NPR', '532': 'ANG', '548': 'VUV', '554': 'NZD', '566': 'NGN', '578': 'NOK',
  '586': 'PKR', '590': 'PAB', '598': 'PGK', '600': 'PYG', '604': 'PEN', '608': 'PHP',
  '634': 'QAR', '643': 'RUB', '646': 'RWF', '682': 'SAR', '690': 'SCR', '702': 'SGD',
  '704': 'VND', '710': 'ZAR', '748': 'SZL', '752': 'SEK', '756': 'CHF', '760': 'SYP',
  '764': 'THB', '776': 'TOP', '780': 'TTD', '784': 'AED', '788': 'TND', '800': 'UGX',
  '807': 'MKD', '818': 'EGP', '826': 'GBP', '834': 'TZS', '840': 'USD', '858': 'UYU',
  '860': 'UZS', '894': 'ZMW', '901': 'TWD', '928': 'VES', '936': 'GHS', '940': 'UYI',
  '941': 'RSD', '946': 'RON', '949': 'TRY', '950': 'XAF', '951': 'XCD', '952': 'XOF',
  '953': 'XPF', '955': 'XPF', '956': 'EUR', '957': 'EUR', '958': 'EUR', '959': 'XAU',
  '960': 'XDR', '961': 'XAG', '962': 'XPT', '963': 'XTS', '967': 'ZMW', '968': 'SRD',
  '969': 'MGA', '970': 'COU', '971': 'AFN', '972': 'TJS', '973': 'AOA', '974': 'BYN',
  '975': 'BGN', '976': 'CDF', '977': 'BAM', '978': 'EUR', '979': 'MXV', '980': 'UAH',
  '981': 'GEL', '984': 'BOV', '985': 'PLN', '986': 'BRL', '990': 'CLF', '994': 'XSU',
  '997': 'USN', '999': 'XXX',
};

// AI table — key is the full AI string (2–4 digits).
// fmt.len: fixed data length; fmt.max: variable max length; fmt.numeric: digits only;
// fmt.check: last digit is a GS1 check digit; fmt.checkFirst: check digit on first n chars;
// fmt.kind: 'date' (YYMMDD), 'datetime' (YYMMDDHHMM+), 'decimal' (last AI digit = decimals),
// 'currency' (3-digit ISO 4217 + amount, last AI digit = decimals).
const AI_MAP = new Map();

function def(ai, title, fmt) {
  AI_MAP.set(ai, { ai, title, ...fmt });
}

// Identification keys
def('00', 'SSCC — Serial Shipping Container Code', { len: 18, numeric: true, check: true });
def('01', 'GTIN — Global Trade Item Number', { len: 14, numeric: true, check: true });
def('02', 'Contained GTIN', { len: 14, numeric: true, check: true });
def('10', 'Batch / lot number', { max: 20 });
def('11', 'Production date (YYMMDD)', { len: 6, numeric: true, kind: 'date' });
def('12', 'Due date (YYMMDD)', { len: 6, numeric: true, kind: 'date' });
def('13', 'Packaging date (YYMMDD)', { len: 6, numeric: true, kind: 'date' });
def('15', 'Best before date (YYMMDD)', { len: 6, numeric: true, kind: 'date' });
def('16', 'Sell by date (YYMMDD)', { len: 6, numeric: true, kind: 'date' });
def('17', 'Expiration date (YYMMDD)', { len: 6, numeric: true, kind: 'date' });
def('20', 'Internal product variant', { len: 2, numeric: true });
def('21', 'Serial number', { max: 20 });
def('22', 'Consumer product variant (CPV)', { max: 20 });
def('240', 'Additional item identification', { max: 30 });
def('241', 'Customer part number', { max: 30 });
def('242', 'Made-to-Order variation number', { max: 6, numeric: true });
def('243', 'Packaging component number (PCN)', { max: 20 });
def('250', 'Secondary serial number', { max: 30 });
def('251', 'Reference to source entity', { max: 30 });
def('253', 'GDTI — Global Document Type Identifier', { max: 30, numeric: true, checkFirst: 13 });
def('254', 'GLN extension component', { max: 20 });
def('255', 'GCN — Global Coupon Number', { max: 25, numeric: true, checkFirst: 13 });
def('30', 'Count of items', { max: 8, numeric: true });
def('37', 'Count of trade item units', { max: 8, numeric: true });

// Measures — 4-digit AI, last digit = number of decimals, value N6
const MEASURES = [
  ['310', 'Net weight (kg)', 'kg'], ['311', 'Length / 1st dimension (m)', 'm'],
  ['312', 'Width / 2nd dimension (m)', 'm'], ['313', 'Height / 3rd dimension (m)', 'm'],
  ['314', 'Area (m²)', 'm²'], ['315', 'Net volume (l)', 'l'], ['316', 'Net volume (m³)', 'm³'],
  ['320', 'Net weight (lb)', 'lb'], ['321', 'Length (in)', 'in'], ['322', 'Length (ft)', 'ft'],
  ['323', 'Length (yd)', 'yd'], ['324', 'Width (in)', 'in'], ['325', 'Width (ft)', 'ft'],
  ['326', 'Width (yd)', 'yd'], ['327', 'Depth (in)', 'in'], ['328', 'Depth (ft)', 'ft'],
  ['329', 'Depth (yd)', 'yd'],
  ['330', 'Logistic gross weight (kg)', 'kg'], ['331', 'Logistic length (m)', 'm'],
  ['332', 'Logistic width (m)', 'm'], ['333', 'Logistic height (m)', 'm'],
  ['334', 'Logistic area (m²)', 'm²'], ['335', 'Logistic volume (l)', 'l'], ['336', 'Logistic volume (m³)', 'm³'],
  ['337', 'Kilograms per square metre', 'kg/m²'],
  ['340', 'Logistic gross weight (lb)', 'lb'], ['341', 'Logistic length (in)', 'in'],
  ['342', 'Logistic length (ft)', 'ft'], ['343', 'Logistic length (yd)', 'yd'],
  ['344', 'Logistic width (in)', 'in'], ['345', 'Logistic width (ft)', 'ft'], ['346', 'Logistic width (yd)', 'yd'],
  ['347', 'Logistic depth (in)', 'in'], ['348', 'Logistic depth (ft)', 'ft'], ['349', 'Logistic depth (yd)', 'yd'],
  ['350', 'Area (sq in)', 'sq in'], ['351', 'Area (sq ft)', 'sq ft'], ['352', 'Area (sq yd)', 'sq yd'],
  ['353', 'Logistic area (sq in)', 'sq in'], ['354', 'Logistic area (sq ft)', 'sq ft'], ['355', 'Logistic area (sq yd)', 'sq yd'],
  ['356', 'Net weight (troy oz)', 'oz t'], ['357', 'Net weight / volume (oz)', 'oz'],
  ['360', 'Net volume (qt)', 'qt'], ['361', 'Net volume (gal)', 'gal'],
  ['362', 'Logistic volume (qt)', 'qt'], ['363', 'Logistic volume (gal)', 'gal'],
  ['364', 'Net volume (cu in)', 'cu in'], ['365', 'Net volume (cu ft)', 'cu ft'], ['366', 'Net volume (cu yd)', 'cu yd'],
  ['367', 'Logistic volume (cu in)', 'cu in'], ['368', 'Logistic volume (cu ft)', 'cu ft'], ['369', 'Logistic volume (cu yd)', 'cu yd'],
];
MEASURES.forEach(([prefix, title, unit]) => {
  for (let d = 0; d <= 9; d++) {
    def(`${prefix}${d}`, title, { len: 6, numeric: true, kind: 'decimal', decimals: d, unit });
  }
});

// Amounts payable — 4-digit AI, last digit = decimals
for (let d = 0; d <= 9; d++) {
  def(`390${d}`, 'Amount payable — local currency', { max: 15, numeric: true, kind: 'decimal', decimals: d });
  def(`391${d}`, 'Amount payable + ISO currency', { max: 18, numeric: true, kind: 'currency', decimals: d });
  def(`392${d}`, 'Amount payable — single monetary area', { max: 15, numeric: true, kind: 'decimal', decimals: d });
  def(`393${d}`, 'Amount payable + ISO currency', { max: 18, numeric: true, kind: 'currency', decimals: d });
  def(`394${d}`, 'Percentage discount', { len: 4, numeric: true, kind: 'decimal', decimals: d, unit: '%' });
  def(`395${d}`, 'Amount payable per unit', { len: 6, numeric: true, kind: 'decimal', decimals: d });
}

// Purchase/delivery/location
def('400', 'Customer purchase order number', { max: 30 });
def('401', 'GINC — Global Identification Number for Consignment', { max: 30 });
def('402', 'GSIN — Global Shipment Identification Number', { len: 17, numeric: true, check: true });
def('403', 'Routing code', { max: 30 });
def('410', 'Ship to / Deliver to GLN', { len: 13, numeric: true, check: true });
def('411', 'Bill to / Invoice to GLN', { len: 13, numeric: true, check: true });
def('412', 'Purchased from GLN', { len: 13, numeric: true, check: true });
def('413', 'Ship for / Deliver for / Forward to GLN', { len: 13, numeric: true, check: true });
def('414', 'Physical location GLN', { len: 13, numeric: true, check: true });
def('415', 'Invoicing party GLN', { len: 13, numeric: true, check: true });
def('416', 'Production / service location GLN', { len: 13, numeric: true, check: true });
def('417', 'Party GLN', { len: 13, numeric: true, check: true });
def('420', 'Ship-to postal code (single authority)', { max: 20 });
def('421', 'Ship-to postal code + ISO country', { max: 12 });
def('422', 'Country of origin (ISO 3166)', { len: 3, numeric: true });
def('423', 'Country of initial processing', { max: 15, numeric: true });
def('424', 'Country of processing', { len: 3, numeric: true });
def('425', 'Country of disassembly', { max: 15, numeric: true });
def('426', 'Country covering full process chain', { len: 3, numeric: true });
def('427', 'Origin subdivision (ISO 3166-2)', { max: 3 });

// Ship-to / return-to address fields
const ADDR = ['Company name', 'Address line 1', 'Address line 2', 'Suburb', 'City', 'Locality', 'Region', 'Country code', 'Telephone'];
for (let i = 0; i < 9; i++) {
  def(`430${i}`, `Ship-to — ${ADDR[i]}`, i === 7 ? { len: 2 } : { max: 35 });
  def(`431${i}`, `Return-to — ${ADDR[i]}`, i === 7 ? { len: 2 } : { max: 35 });
}
def('4320', 'Service code description', { max: 35 });
def('4321', 'Dangerous goods flag', { len: 1, numeric: true });
def('4322', 'Authority to leave flag', { len: 1, numeric: true });
def('4323', 'Signature required flag', { len: 1, numeric: true });
def('4324', 'Not before delivery datetime (YYMMDDHHMM)', { len: 10, numeric: true, kind: 'datetime' });
def('4325', 'Not after delivery datetime (YYMMDDHHMM)', { len: 10, numeric: true, kind: 'datetime' });
def('4326', 'Release date (YYMMDD)', { len: 6, numeric: true, kind: 'date' });
def('4330', 'Maximum temperature', { len: 6, numeric: true });
def('4331', 'Minimum temperature', { len: 6, numeric: true });

// 70xx / 71xx / 72xx — regulated product & healthcare
def('7001', 'NATO Stock Number (NSN)', { len: 13, numeric: true });
def('7002', 'UN/ECE meat carcass classification', { max: 30 });
def('7003', 'Expiration date and time (YYMMDDHHMM)', { len: 10, numeric: true, kind: 'datetime' });
def('7004', 'Active potency', { max: 4, numeric: true });
def('7005', 'Catch area', { max: 12 });
def('7006', 'First freeze date (YYMMDD)', { len: 6, numeric: true, kind: 'date' });
def('7007', 'Harvest date (YYMMDD–YYMMDD)', { max: 12, numeric: true });
def('7008', 'Species for fishery purposes', { max: 3 });
def('7009', 'Fishing gear type', { max: 10 });
def('7010', 'Production method', { max: 2 });
def('7011', 'Test by date (YYMMDD[HHMM])', { max: 10, numeric: true, kind: 'datetime' });
def('7020', 'Refurbishment lot ID', { max: 20 });
def('7021', 'Functional status', { max: 20 });
def('7022', 'Approval status', { max: 20 });
def('7023', 'GAP — Global Assembly Provider', { max: 30 });
for (let d = 0; d <= 9; d++) {
  def(`703${d}`, 'Processor approval number + ISO country', { max: 30 });
}
def('7040', 'UIC + extension', { len: 4 });
const NHRN = ['NHRN PZN (Germany)', 'NHRN CIP (France)', 'NHRN CN (Spain)', 'NHRN DRN (Brazil)', 'NHRN AIM (Portugal)', 'NHRN NDC (USA)'];
NHRN.forEach((title, i) => def(`71${i}`, title, { max: 20 }));
for (let d = 0; d <= 9; d++) {
  def(`723${d}`, 'Certification scheme + reference', { max: 30 });
}
def('7240', 'Protocol ID', { max: 20 });
def('7241', 'AIDC media type', { len: 2, numeric: true });
def('7242', 'Version control identifier (VCIN)', { max: 25 });

// 80xx / 81xx / 82xx — logistics, assets, coupons
def('8001', 'Roll products (width, length, core, direction, splices)', { len: 14, numeric: true });
def('8002', 'Cellular mobile telephone identifier (CMTN)', { max: 20 });
def('8003', 'GRAI — Global Returnable Asset Identifier', { max: 30, numeric: true, checkFirst: 14 });
def('8004', 'GIAI — Global Individual Asset Identifier', { max: 30 });
def('8005', 'Price per unit of measure', { len: 6, numeric: true });
def('8006', 'ITIP / GCTIN — piece of trade item', { len: 18, numeric: true });
def('8007', 'IBAN', { max: 34 });
def('8008', 'Production date and time (YYMMDDHHMM[SS])', { max: 12, numeric: true, kind: 'datetime' });
def('8009', 'Optically readable sensor indicator', { max: 50 });
def('8010', 'CPID — Component/Part Identifier', { max: 30 });
def('8011', 'CPID serial number', { max: 12, numeric: true });
def('8012', 'Software version', { max: 20 });
def('8013', 'GMN — Global Model Number', { max: 30 });
def('8017', 'GSRN — Service Relation Number (provider)', { len: 18, numeric: true, check: true });
def('8018', 'GSRN — Service Relation Number (recipient)', { len: 18, numeric: true, check: true });
def('8019', 'SRIN — Service Relation Instance Number', { max: 10, numeric: true });
def('8020', 'Payment slip reference number', { max: 25 });
def('8026', 'ITIP content (GTIN of pieces + piece count)', { len: 18, numeric: true });
def('8030', 'Digital signature (DigSig)', { max: 100 });
def('8110', 'Coupon code (North America)', { max: 70 });
def('8111', 'Loyalty points of a coupon', { len: 4, numeric: true });
def('8112', 'Paperless coupon code (North America)', { max: 70 });
def('8200', 'Extended packaging URL', { max: 70 });
def('90', 'Mutually agreed information', { max: 30 });
for (let n = 91; n <= 99; n++) def(`${n}`, 'Company internal information', { max: 90 });

function matchAI(s, pos) {
  for (let len = 4; len >= 2; len--) {
    const d = AI_MAP.get(s.slice(pos, pos + len));
    if (d) return d;
  }
  return null;
}

function parseDate(v, withTime) {
  // GS1 dates are YYMMDD[HHMM[SS]] — century is ambiguous; 20xx is the working assumption.
  if (v.length < 6) return { text: null, issue: 'Date needs at least 6 digits (YYMMDD)' };
  const yy = parseInt(v.slice(0, 2), 10);
  const mm = parseInt(v.slice(2, 4), 10);
  const dd = parseInt(v.slice(4, 6), 10);
  if (mm < 1 || mm > 12) return { text: null, issue: `Invalid month ${v.slice(2, 4)}` };
  const maxDay = new Date(2000 + yy, mm, 0).getDate();
  if (dd > maxDay) return { text: null, issue: `Invalid day ${v.slice(4, 6)} for month ${mm}` };
  let text = `20${v.slice(0, 2)}-${v.slice(2, 4)}-${v.slice(4, 6)}`;
  if (dd === 0) text = `20${v.slice(0, 2)}-${v.slice(2, 4)} (day not specified)`;
  if (withTime && v.length >= 10) {
    const hh = parseInt(v.slice(6, 8), 10);
    const mi = parseInt(v.slice(8, 10), 10);
    if (hh > 23 || mi > 59) return { text: null, issue: `Invalid time ${v.slice(6, 8)}:${v.slice(8, 10)}` };
    text += ` ${v.slice(6, 8)}:${v.slice(8, 10)}`;
    if (v.length >= 12) text += `:${v.slice(10, 12)}`;
  } else if (withTime && v.length === 6) {
    text += ' (date only)';
  }
  return { text, issue: null };
}

function decodeValue(defn, raw) {
  const out = { decoded: null, issues: [] };
  if (defn.numeric && !/^\d+$/.test(raw)) {
    out.issues.push('Value must be digits only');
  }
  if (defn.check) {
    const expected = gs1CheckDigit(raw.slice(0, -1));
    if (String(expected) === raw.slice(-1)) {
      out.decoded = 'check digit ✓';
    } else {
      out.issues.push(`Check digit invalid — expected ${expected}, found ${raw.slice(-1)}`);
    }
  }
  if (defn.checkFirst && raw.length >= defn.checkFirst) {
    const base = raw.slice(0, defn.checkFirst);
    const expected = gs1CheckDigit(base.slice(0, -1));
    if (String(expected) !== base.slice(-1)) {
      out.issues.push(`Check digit invalid in leading ${defn.checkFirst} digits — expected ${expected}, found ${base.slice(-1)}`);
    } else {
      out.decoded = `check digit ✓${raw.length > defn.checkFirst ? `, serial/ext: ${raw.slice(defn.checkFirst)}` : ''}`;
    }
  }
  if (defn.kind === 'date') {
    const { text, issue } = parseDate(raw, false);
    if (issue) out.issues.push(issue);
    else out.decoded = text + (out.decoded ? ` — ${out.decoded}` : '');
  }
  if (defn.kind === 'datetime') {
    const { text, issue } = parseDate(raw, true);
    if (issue) out.issues.push(issue);
    else out.decoded = text + (out.decoded ? ` — ${out.decoded}` : '');
  }
  if (defn.kind === 'decimal' && /^\d+$/.test(raw)) {
    const val = (parseInt(raw, 10) / 10 ** defn.decimals).toFixed(defn.decimals);
    out.decoded = `${val}${defn.unit ? ` ${defn.unit}` : ''}${out.decoded ? ` — ${out.decoded}` : ''}`;
  }
  if (defn.kind === 'currency') {
    const cur = raw.slice(0, 3);
    const amt = raw.slice(3);
    const code = ISO_CURRENCIES[cur];
    if (!code) out.issues.push(`Unknown ISO 4217 numeric code ${cur}`);
    else if (/^\d+$/.test(amt)) {
      const val = (parseInt(amt, 10) / 10 ** defn.decimals).toFixed(defn.decimals);
      out.decoded = `${val} ${code}`;
    }
  }
  if (defn.ai === '01' && raw.length === 14) {
    const p = gs1PrefixLookup(raw.slice(1));
    out.decoded = `GTIN-14 — GS1 prefix ${p.prefix} (${p.name})${out.decoded ? ` — ${out.decoded}` : ''}`;
  }
  if (defn.ai === '00') {
    out.decoded = `Extension digit ${raw[0]}, serial ${raw.slice(1, 17)}${out.decoded ? ` — ${out.decoded}` : ''}`;
  }
  return out;
}

function elementRow(defn, raw, pos) {
  const issues = [];
  if (defn.numeric && !/^\d+$/.test(raw)) issues.push('Expected digits only');
  if (defn.len !== undefined && raw.length !== defn.len) issues.push(`Expected ${defn.len} chars, got ${raw.length}`);
  if (defn.max !== undefined && raw.length > defn.max) issues.push(`Exceeds max length ${defn.max} (got ${raw.length})`);
  if (raw.length === 0) issues.push('Empty value');
  const { decoded, issues: di } = decodeValue(defn, raw);
  return { ai: defn.ai, title: defn.title, raw, decoded, issues: [...issues, ...di], pos };
}

export function parseGs1String(input) {
  const result = { elements: [], errors: [], symbology: null, mode: null };
  let s = (input || '').trim();
  if (!s) return result;

  // Symbology identifier, e.g. ]C1 (GS1-128), ]d2 (GS1 DataMatrix), ]Q3 (GS1 QR)
  const sym = s.match(/^\]([A-Za-z]\d)/);
  if (sym) {
    result.symbology = SYMBOLOGY[sym[1]] || `Unrecognized symbology identifier ]${sym[1]}`;
    s = s.slice(3);
  }

  // Normalize common FNC1 representations to the GS char.
  s = s.replace(/<GS>|\{GS\}|%GS%|\x1d|\^|\|/g, FNC1);

  if (/\(\d{2,4}\)/.test(s)) {
    // Bracketed notation: (01)0950...(17)260331...
    result.mode = 'brackets';
    const re = /\((\d{2,4})\)/g;
    let m;
    let prev = null;
    const spans = [];
    while ((m = re.exec(s)) !== null) {
      if (prev) prev.end = m.index;
      prev = { ai: m[1], start: m.index + m[0].length, end: s.length, mstart: m.index };
      spans.push(prev);
    }
    if (!/^\(/.test(s)) result.errors.push('Text before the first (AI) is ignored — use (AI)value notation or a raw scan string.');
    for (const sp of spans) {
      const raw = s.slice(sp.start, sp.end).replace(new RegExp(FNC1, 'g'), '').trim();
      const defn = AI_MAP.get(sp.ai) || { ai: sp.ai, title: 'Unknown / non-standard AI', max: 100 };
      const row = elementRow(defn, raw, sp.mstart);
      if (!AI_MAP.has(sp.ai)) row.issues.unshift('AI not found in the GS1 table — parsed as free text');
      result.elements.push(row);
    }
    return result;
  }

  // Scan mode: longest-prefix AI matching, FNC1 terminates variable-length fields.
  result.mode = 'scan';
  let pos = 0;
  while (pos < s.length) {
    if (s[pos] === FNC1) {
      result.errors.push(`Separator at position ${pos} with no preceding variable-length field`);
      pos += 1;
      continue;
    }
    const defn = matchAI(s, pos);
    if (!defn) {
      result.errors.push(`Unknown AI "${s.slice(pos, pos + 4)}" at position ${pos} — remaining data cannot be decoded`);
      break;
    }
    pos += defn.ai.length;
    if (defn.len !== undefined) {
      const raw = s.slice(pos, pos + defn.len);
      if (raw.includes(FNC1) || raw.length < defn.len) {
        result.errors.push(`AI ${defn.ai} truncated — expected ${defn.len} characters at position ${pos}`);
        if (raw.length > 0 && !raw.includes(FNC1)) result.elements.push(elementRow(defn, raw, pos));
        break;
      }
      result.elements.push(elementRow(defn, raw, pos));
      pos += defn.len;
    } else {
      const end = s.indexOf(FNC1, pos);
      const raw = end === -1 ? s.slice(pos) : s.slice(pos, end);
      result.elements.push(elementRow(defn, raw, pos));
      pos = end === -1 ? s.length : end + 1;
    }
  }
  return result;
}

export const GS1_EXAMPLES = [
  { label: 'GS1-128 carton', code: ']C101040123456789011726123110LOT-42X' },
  { label: 'GS1 DataMatrix (pharma)', code: ']d201034531200000111725083010ABC123\x1d212A3F4B' },
  { label: 'Bracketed notation', code: '(01)09506000134352(17)260331(10)ABC123' },
  { label: 'Pallet SSCC + weight', code: ']C1003761234500000100083302012500' },
];
