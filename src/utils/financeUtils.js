// Shared financial identifier utilities — all client-side, no network calls.
// Standards: ISO 13616 (IBAN), ISO 9362 (BIC), ISO 17442 (LEI), ISO/IEC 7064 MOD 97-10.

// ---------------------------------------------------------------------------
// MOD 97-10 (ISO/IEC 7064) — letters expanded A=10..Z=35
// ---------------------------------------------------------------------------
export function mod97(str) {
  let remainder = 0;
  for (const ch of str) {
    let digits;
    if (ch >= '0' && ch <= '9') digits = ch;
    else if (ch >= 'A' && ch <= 'Z') digits = String(ch.charCodeAt(0) - 55);
    else return -1;
    for (const d of digits) remainder = (remainder * 10 + (d.charCodeAt(0) - 48)) % 97;
  }
  return remainder;
}

// ---------------------------------------------------------------------------
// IBAN (ISO 13616) — official registry BBAN formats
// fmt legend: n=digits, a=uppercase letters, c=alphanumeric, e=spaces
// ---------------------------------------------------------------------------
export const IBAN_COUNTRIES = {
  AD: { len: 24, bban: '4!n4!n12!c', name: 'Andorra', sepa: true },
  AE: { len: 23, bban: '3!n16!n', name: 'United Arab Emirates', sepa: false },
  AL: { len: 28, bban: '8!n16!c', name: 'Albania', sepa: false },
  AO: { len: 25, bban: '21!n', name: 'Angola', sepa: false },
  AT: { len: 20, bban: '5!n11!n', name: 'Austria', sepa: true },
  AZ: { len: 28, bban: '4!a20!c', name: 'Azerbaijan', sepa: false },
  BA: { len: 20, bban: '3!n3!n8!n2!n', name: 'Bosnia and Herzegovina', sepa: false },
  BE: { len: 16, bban: '3!n7!n2!n', name: 'Belgium', sepa: true },
  BF: { len: 27, bban: '23!n', name: 'Burkina Faso', sepa: false },
  BG: { len: 22, bban: '4!a4!n2!n8!c', name: 'Bulgaria', sepa: true },
  BH: { len: 22, bban: '4!a14!c', name: 'Bahrain', sepa: false },
  BI: { len: 27, bban: '12!n11!n', name: 'Burundi', sepa: false },
  BJ: { len: 28, bban: '24!c', name: 'Benin', sepa: false },
  BR: { len: 29, bban: '8!n5!n10!n1!a1!c', name: 'Brazil', sepa: false },
  BY: { len: 28, bban: '4!c4!n16!c', name: 'Belarus', sepa: false },
  CF: { len: 27, bban: '23!n', name: 'Central African Republic', sepa: false },
  CG: { len: 27, bban: '23!n', name: 'Congo', sepa: false },
  CH: { len: 21, bban: '5!n12!c', name: 'Switzerland', sepa: true },
  CI: { len: 28, bban: '2!a22!n', name: "Côte d'Ivoire", sepa: false },
  CM: { len: 27, bban: '23!n', name: 'Cameroon', sepa: false },
  CR: { len: 22, bban: '4!n14!n', name: 'Costa Rica', sepa: false },
  CV: { len: 25, bban: '21!n', name: 'Cape Verde', sepa: false },
  CY: { len: 28, bban: '3!n5!n16!c', name: 'Cyprus', sepa: true },
  CZ: { len: 24, bban: '4!n6!n10!n', name: 'Czech Republic', sepa: true },
  DE: { len: 22, bban: '8!n10!n', name: 'Germany', sepa: true },
  DJ: { len: 27, bban: '23!n', name: 'Djibouti', sepa: false },
  DK: { len: 18, bban: '4!n9!n1!n', name: 'Denmark', sepa: true },
  DO: { len: 28, bban: '4!c20!n', name: 'Dominican Republic', sepa: false },
  DZ: { len: 26, bban: '22!n', name: 'Algeria', sepa: false },
  EE: { len: 20, bban: '2!n2!n11!n1!n', name: 'Estonia', sepa: true },
  EG: { len: 29, bban: '4!n4!n17!n', name: 'Egypt', sepa: false },
  ES: { len: 24, bban: '4!n4!n1!n1!n10!n', name: 'Spain', sepa: true },
  FI: { len: 18, bban: '3!n11!n', name: 'Finland', sepa: true },
  FO: { len: 18, bban: '4!n9!n1!n', name: 'Faroe Islands', sepa: false },
  FR: { len: 27, bban: '5!n5!n11!c2!n', name: 'France', sepa: true },
  GA: { len: 27, bban: '23!n', name: 'Gabon', sepa: false },
  GB: { len: 22, bban: '4!a6!n8!n', name: 'United Kingdom', sepa: true },
  GE: { len: 22, bban: '2!a16!n', name: 'Georgia', sepa: false },
  GI: { len: 23, bban: '4!a15!c', name: 'Gibraltar', sepa: true },
  GL: { len: 18, bban: '4!n9!n1!n', name: 'Greenland', sepa: false },
  GQ: { len: 27, bban: '23!n', name: 'Equatorial Guinea', sepa: false },
  GR: { len: 27, bban: '3!n4!n16!c', name: 'Greece', sepa: true },
  GT: { len: 28, bban: '4!c20!c', name: 'Guatemala', sepa: false },
  GW: { len: 25, bban: '2!c19!n', name: 'Guinea-Bissau', sepa: false },
  HN: { len: 28, bban: '4!a20!n', name: 'Honduras', sepa: false },
  HR: { len: 21, bban: '7!n10!n', name: 'Croatia', sepa: true },
  HU: { len: 28, bban: '3!n4!n1!n15!n1!n', name: 'Hungary', sepa: true },
  IE: { len: 22, bban: '4!a6!n8!n', name: 'Ireland', sepa: true },
  IL: { len: 23, bban: '3!n3!n13!n', name: 'Israel', sepa: false },
  IQ: { len: 23, bban: '4!a3!n12!n', name: 'Iraq', sepa: false },
  IR: { len: 26, bban: '22!n', name: 'Iran', sepa: false },
  IS: { len: 26, bban: '4!n2!n6!n10!n', name: 'Iceland', sepa: true },
  IT: { len: 27, bban: '1!a5!n5!n12!c', name: 'Italy', sepa: true },
  JO: { len: 30, bban: '4!a4!n18!c', name: 'Jordan', sepa: false },
  KM: { len: 27, bban: '23!n', name: 'Comoros', sepa: false },
  KW: { len: 30, bban: '4!a22!c', name: 'Kuwait', sepa: false },
  KZ: { len: 20, bban: '3!n13!c', name: 'Kazakhstan', sepa: false },
  LB: { len: 28, bban: '4!n20!c', name: 'Lebanon', sepa: false },
  LC: { len: 32, bban: '4!a24!c', name: 'Saint Lucia', sepa: false },
  LI: { len: 21, bban: '5!n12!c', name: 'Liechtenstein', sepa: true },
  LT: { len: 20, bban: '5!n11!n', name: 'Lithuania', sepa: true },
  LU: { len: 20, bban: '3!n13!c', name: 'Luxembourg', sepa: true },
  LV: { len: 21, bban: '4!a13!c', name: 'Latvia', sepa: true },
  LY: { len: 25, bban: '3!n3!n15!n', name: 'Libya', sepa: false },
  MA: { len: 28, bban: '24!n', name: 'Morocco', sepa: false },
  MC: { len: 27, bban: '5!n5!n11!c2!n', name: 'Monaco', sepa: true },
  MD: { len: 24, bban: '2!c18!c', name: 'Moldova', sepa: false },
  ME: { len: 22, bban: '3!n13!n2!n', name: 'Montenegro', sepa: false },
  MG: { len: 27, bban: '23!n', name: 'Madagascar', sepa: false },
  MK: { len: 19, bban: '3!n10!c2!n', name: 'North Macedonia', sepa: false },
  ML: { len: 28, bban: '2!a22!n', name: 'Mali', sepa: false },
  MR: { len: 27, bban: '5!n5!n11!n2!n', name: 'Mauritania', sepa: false },
  MT: { len: 31, bban: '4!a5!n18!c', name: 'Malta', sepa: true },
  MU: { len: 30, bban: '4!a2!n2!n12!n3!n3!a', name: 'Mauritius', sepa: false },
  MZ: { len: 25, bban: '21!n', name: 'Mozambique', sepa: false },
  NE: { len: 28, bban: '2!a22!n', name: 'Niger', sepa: false },
  NI: { len: 32, bban: '4!a24!n', name: 'Nicaragua', sepa: false },
  NL: { len: 18, bban: '4!a10!n', name: 'Netherlands', sepa: true },
  NO: { len: 15, bban: '4!n6!n1!n', name: 'Norway', sepa: true },
  OM: { len: 23, bban: '3!n16!c', name: 'Oman', sepa: false },
  PK: { len: 24, bban: '4!a16!c', name: 'Pakistan', sepa: false },
  PL: { len: 28, bban: '8!n16!n', name: 'Poland', sepa: true },
  PS: { len: 29, bban: '4!a21!c', name: 'Palestine', sepa: false },
  PT: { len: 25, bban: '4!n4!n11!n2!n', name: 'Portugal', sepa: true },
  QA: { len: 29, bban: '4!a21!c', name: 'Qatar', sepa: false },
  RO: { len: 24, bban: '4!a16!c', name: 'Romania', sepa: true },
  RS: { len: 22, bban: '3!n13!n2!n', name: 'Serbia', sepa: false },
  SA: { len: 24, bban: '2!n18!c', name: 'Saudi Arabia', sepa: false },
  SC: { len: 31, bban: '4!a2!n2!n16!n3!a', name: 'Seychelles', sepa: false },
  SD: { len: 18, bban: '2!n12!n', name: 'Sudan', sepa: false },
  SE: { len: 24, bban: '3!n16!n1!n', name: 'Sweden', sepa: true },
  SI: { len: 19, bban: '5!n8!n2!n', name: 'Slovenia', sepa: true },
  SK: { len: 24, bban: '4!n6!n10!n', name: 'Slovakia', sepa: true },
  SM: { len: 27, bban: '1!a5!n5!n12!c', name: 'San Marino', sepa: true },
  SN: { len: 28, bban: '2!a22!n', name: 'Senegal', sepa: false },
  SO: { len: 23, bban: '4!n3!n12!n', name: 'Somalia', sepa: false },
  ST: { len: 25, bban: '21!n', name: 'Sao Tome and Principe', sepa: false },
  SV: { len: 28, bban: '4!a20!n', name: 'El Salvador', sepa: false },
  TD: { len: 27, bban: '23!n', name: 'Chad', sepa: false },
  TL: { len: 23, bban: '3!n14!n2!n', name: 'Timor-Leste', sepa: false },
  TN: { len: 24, bban: '2!n3!n13!n2!n', name: 'Tunisia', sepa: false },
  TR: { len: 26, bban: '5!n1!c16!c', name: 'Turkey', sepa: false },
  UA: { len: 29, bban: '6!n19!c', name: 'Ukraine', sepa: false },
  VA: { len: 22, bban: '3!n15!n', name: 'Vatican City', sepa: true },
  VG: { len: 24, bban: '4!a16!n', name: 'British Virgin Islands', sepa: false },
  XK: { len: 20, bban: '4!n10!n2!n', name: 'Kosovo', sepa: false },
  YE: { len: 30, bban: '4!a4!n18!c', name: 'Yemen', sepa: false },
};

// French territories sharing the FR format
const FRENCH_TERRITORIES = {
  GF: 'French Guiana', GP: 'Guadeloupe', MQ: 'Martinique', RE: 'Réunion',
  PF: 'French Polynesia', TF: 'French Southern Territories', YT: 'Mayotte',
  NC: 'New Caledonia', BL: 'Saint Barthélemy', MF: 'Saint Martin',
  PM: 'Saint Pierre and Miquelon', WF: 'Wallis and Futuna',
};
Object.entries(FRENCH_TERRITORIES).forEach(([cc, name]) => {
  IBAN_COUNTRIES[cc] = { len: 27, bban: '5!n5!n11!c2!n', name, sepa: true };
});
// Crown dependencies share the GB format
const GB_DEPENDENCIES = { GG: 'Guernsey', IM: 'Isle of Man', JE: 'Jersey' };
Object.entries(GB_DEPENDENCIES).forEach(([cc, name]) => {
  IBAN_COUNTRIES[cc] = { len: 22, bban: '4!a6!n8!n', name, sepa: true };
});

function bbanFormatToRegex(fmt) {
  let pattern = '^';
  const re = /(\d+)!([ance])/g;
  let m;
  while ((m = re.exec(fmt)) !== null) {
    const count = m[1];
    const cls = { n: '[0-9]', a: '[A-Z]', c: '[A-Z0-9]', e: ' ' }[m[2]];
    pattern += `${cls}{${count}}`;
  }
  return new RegExp(pattern + '$');
}

export function normalizeIban(input) {
  return input.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

export function formatIban(iban) {
  return iban.replace(/(.{4})/g, '$1 ').trim();
}

export function validateIban(input) {
  const iban = normalizeIban(input);
  const result = { iban, formatted: formatIban(iban), checks: [], valid: false };

  if (!iban) {
    result.checks.push({ label: 'Input', ok: false, detail: 'Empty input' });
    return result;
  }
  if (!/^[A-Z0-9]+$/.test(iban)) {
    result.checks.push({ label: 'Characters', ok: false, detail: 'Contains invalid characters' });
    return result;
  }
  result.checks.push({ label: 'Characters', ok: true, detail: 'Alphanumeric only' });

  const cc = iban.slice(0, 2);
  const spec = IBAN_COUNTRIES[cc];
  if (!spec) {
    result.checks.push({ label: 'Country code', ok: false, detail: `"${cc}" is not a registered IBAN country` });
    return result;
  }
  result.country = spec;
  result.checks.push({ label: 'Country code', ok: true, detail: `${cc} — ${spec.name}${spec.sepa ? ' (SEPA)' : ''}` });

  const lenOk = iban.length === spec.len;
  result.checks.push({
    label: 'Length',
    ok: lenOk,
    detail: `${iban.length} characters — expected ${spec.len} for ${cc}`,
  });
  if (!lenOk) return result;

  const bban = iban.slice(4);
  const bbanOk = bbanFormatToRegex(spec.bban).test(bban);
  result.bban = bban;
  result.checks.push({
    label: 'BBAN structure',
    ok: bbanOk,
    detail: bbanOk ? `Matches ${cc} national format (${spec.bban})` : `Does not match ${cc} format (${spec.bban})`,
  });

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const checksumOk = mod97(rearranged) === 1;
  result.checks.push({
    label: 'MOD-97 checksum',
    ok: checksumOk,
    detail: checksumOk ? 'Check digits valid (ISO 13616)' : 'Check digits invalid — possible typo',
  });

  result.valid = lenOk && bbanOk && checksumOk;
  return result;
}

export function computeIbanCheckDigits(countryCode, bban) {
  const cc = countryCode.toUpperCase();
  const cleanBban = bban.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const rearranged = cleanBban + cc + '00';
  const rem = mod97(rearranged);
  if (rem < 0) return null;
  return String(98 - rem).padStart(2, '0');
}

// ---------------------------------------------------------------------------
// BIC (ISO 9362) — 8 or 11 chars: bank(4a) country(2a) location(2c) branch(3c)
// ---------------------------------------------------------------------------
const KNOWN_BANK_CODES = {
  DEUT: 'Deutsche Bank', COBA: 'Commerzbank', DRES: 'Dresdner Bank', HYVE: 'HypoVereinsbank',
  BNP: 'BNP Paribas', BNPA: 'BNP Paribas', CRLY: 'Crédit Lyonnais', SOGE: 'Société Générale',
  AGRIFRPP: 'Crédit Agricole', CEPA: 'Caisse d\'Epargne', CMBR: 'Crédit Mutuel',
  INGB: 'ING Bank', ABNANL2A: 'ABN AMRO', RABO: 'Rabobank', KRED: 'KBC Bank',
  BBVA: 'BBVA', BSCH: 'Banco Santander', CAIX: 'CaixaBank', CGDI: 'Caixa Geral',
  UNIC: 'UniCredit', BCIT: 'Intesa Sanpaolo', UBSW: 'UBS', CSCH: 'Credit Suisse',
  ZKBK: 'Zürcher Kantonalbank', BKAU: 'Bank Austria', RZBA: 'Raiffeisen Bank Austria',
  GIBA: 'Erste Group Bank', BARC: 'Barclays', LOYD: 'Lloyds Bank', NWBK: 'NatWest',
  MIDL: 'HSBC UK', HSBC: 'HSBC', CHAS: 'JPMorgan Chase', CITI: 'Citibank',
  BOFA: 'Bank of America', WFBI: 'Wells Fargo', SCBL: 'Standard Chartered',
  DBSG: 'DBS Bank', BOTK: 'MUFG Bank', ESSE: 'SEB', NDEA: 'Nordea',
  DABA: 'Danske Bank', SWED: 'Swedbank', HAND: 'Handelsbanken', PCHB: 'PKO Bank Polski',
  CECE: 'ČSOB', GIBACZPX: 'ČSOB', TEBU: 'Türkiye Ekonomi Bankası', BPKO: 'PKO BP',
  EBIL: 'Emirates NBD', NBAD: 'First Abu Dhabi Bank', ARAB: 'Arab Bank',
  RZTI: 'Raiffeisen Bank International', OIBA: 'OeNB', OBKL: 'Oberbank',
  BAWA: 'BAWAG', VBOE: 'Volksbank', SPAD: 'Sparkasse', MARK: 'Bundesbank',
};

export function validateBic(input) {
  const bic = input.replace(/\s+/g, '').toUpperCase();
  const result = { bic, checks: [], valid: false, parts: null };

  if (!bic) {
    result.checks.push({ label: 'Input', ok: false, detail: 'Empty input' });
    return result;
  }
  if (!/^[A-Z0-9]+$/.test(bic)) {
    result.checks.push({ label: 'Characters', ok: false, detail: 'Only letters and digits allowed' });
    return result;
  }
  if (bic.length !== 8 && bic.length !== 11) {
    result.checks.push({ label: 'Length', ok: false, detail: `${bic.length} characters — must be 8 or 11` });
    return result;
  }
  result.checks.push({ label: 'Length', ok: true, detail: `${bic.length} characters (${bic.length === 8 ? 'BIC8' : 'BIC11'})` });

  const bankCode = bic.slice(0, 4);
  const countryCode = bic.slice(4, 6);
  const locationCode = bic.slice(6, 8);
  const branchCode = bic.length === 11 ? bic.slice(8, 11) : null;

  const bankOk = /^[A-Z]{4}$/.test(bankCode);
  result.checks.push({ label: 'Institution code', ok: bankOk, detail: `${bankCode} — 4 letters` });

  const countryOk = /^[A-Z]{2}$/.test(countryCode);
  result.checks.push({ label: 'Country code', ok: countryOk, detail: `${countryCode} — ISO 3166-1 alpha-2` });

  const locOk = /^[A-Z0-9]{2}$/.test(locationCode) && !/^[0-9]{2}$/.test(locationCode);
  result.checks.push({ label: 'Location code', ok: locOk, detail: `${locationCode} — alphanumeric, not both digits` });

  const branchOk = branchCode === null || /^[A-Z0-9]{3}$/.test(branchCode);
  result.checks.push({
    label: 'Branch code',
    ok: branchOk,
    detail: branchCode ? `${branchCode}${branchCode === 'XXX' ? ' — head/primary office' : ' — branch'}` : 'Not present (BIC8 = primary office)',
  });

  const known = KNOWN_BANK_CODES[bankCode] || KNOWN_BANK_CODES[bic];
  result.parts = {
    bankCode,
    bankName: known || null,
    countryCode,
    locationCode,
    branchCode: branchCode || 'XXX',
    isTestBic: locationCode[1] === '0',
    isReverseBilling: locationCode[1] === '1',
    isPassive: locationCode[1] === '2',
  };

  result.valid = bankOk && countryOk && locOk && branchOk;
  return result;
}

// ---------------------------------------------------------------------------
// LEI (ISO 17442) — 20 chars: LOU(4) reserved(2=00) entity(12) check(2)
// ---------------------------------------------------------------------------
const KNOWN_LOUS = {
  '5299': 'GLEIF (pre-LOU allocation)',
  '0974': 'Bloomberg LEI',
  '5493': 'London Stock Exchange (LEI)',
  '9695': 'Bundesanzeiger Verlag (Germany)',
  '2138': 'WM Datenservice (Germany)',
  '8945': 'Business Entity Data B.V. (GMEI Utility)',
  '5067': 'Ubisecure / RapidLEI',
  '3157': 'CIC (China)',
  '2594': 'KDPW (Poland)',
  '4851': 'CSD (Russia)',
  '9598': 'Banca d\'Italia / InfoCamere',
  '3912': 'China LEI',
  '6354': 'ROC (India)',
  '9845': 'Ireland / Irish Stock Exchange',
  '7245': 'Korea',
  '3537': 'Saudi Arabia',
  '7890': 'Canada (ISED)',
  '2549': 'Japan (JPX)',
};

export function validateLei(input) {
  const lei = input.replace(/\s+/g, '').toUpperCase();
  const result = { lei, checks: [], valid: false, parts: null };

  if (!lei) {
    result.checks.push({ label: 'Input', ok: false, detail: 'Empty input' });
    return result;
  }
  if (!/^[A-Z0-9]+$/.test(lei)) {
    result.checks.push({ label: 'Characters', ok: false, detail: 'Only letters and digits allowed' });
    return result;
  }
  if (lei.length !== 20) {
    result.checks.push({ label: 'Length', ok: false, detail: `${lei.length} characters — must be 20` });
    return result;
  }
  result.checks.push({ label: 'Length', ok: true, detail: '20 characters' });

  const lou = lei.slice(0, 4);
  const reserved = lei.slice(4, 6);
  const entity = lei.slice(6, 18);
  const checkDigits = lei.slice(18, 20);

  const reservedOk = reserved === '00';
  result.checks.push({
    label: 'Reserved positions 5-6',
    ok: reservedOk,
    detail: reservedOk ? '"00" as required' : `"${reserved}" — must be "00"`,
  });

  const checksumOk = mod97(lei) === 1;
  result.checks.push({
    label: 'MOD-97 checksum',
    ok: checksumOk,
    detail: checksumOk ? `Check digits "${checkDigits}" valid (ISO 17442)` : 'Check digits invalid — possible typo',
  });

  result.parts = {
    lou,
    louName: KNOWN_LOUS[lou] || null,
    entityId: entity,
    checkDigits,
  };
  result.valid = reservedOk && checksumOk;
  return result;
}
