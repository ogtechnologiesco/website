// TLE (Two-Line Element set) parsing and orbital element derivation.
// Format: NORAD fixed-width columns. All client-side, no network calls.

const MU_EARTH = 398600.4418; // km^3/s^2
const R_EARTH = 6378.137; // km equatorial radius

function tleChecksum(line) {
  let sum = 0;
  for (let i = 0; i < Math.min(line.length, 68); i++) {
    const ch = line[i];
    if (ch >= '0' && ch <= '9') sum += ch.charCodeAt(0) - 48;
    else if (ch === '-') sum += 1;
  }
  return sum % 10;
}

// TLE epoch: 2-digit year + fractional day-of-year → Date (UTC)
export function tleEpochToDate(year2, dayOfYear) {
  const year = year2 < 57 ? 2000 + year2 : 1900 + year2;
  const ms = Date.UTC(year, 0, 1) + (dayOfYear - 1) * 86400000;
  return new Date(ms);
}

// Parse a single TLE (2 or 3 lines). Returns { name, line1 fields, line2 fields, derived, checks }
export function parseTle(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trimEnd()).filter((l) => l.trim().length > 0);
  const result = { checks: [], valid: false };

  if (lines.length < 2) {
    result.checks.push({ label: 'Input', ok: false, detail: 'Need at least 2 lines (TLE line 1 and line 2)' });
    return result;
  }

  let name = null;
  let l1, l2;
  if (lines[0].startsWith('1 ') || lines[0].startsWith('1')) {
    l1 = lines[0]; l2 = lines[1];
  } else {
    name = lines[0].replace(/^0\s+/, '').trim();
    l1 = lines[1]; l2 = lines[2];
  }
  result.name = name;

  if (!l1 || !l2 || !l1.startsWith('1') || !l2.startsWith('2')) {
    result.checks.push({ label: 'Structure', ok: false, detail: 'Lines must start with "1" and "2"' });
    return result;
  }
  result.checks.push({ label: 'Structure', ok: true, detail: 'Two TLE lines detected' });

  // Checksums (column 69)
  const cs1 = parseInt(l1[68], 10);
  const cs2 = parseInt(l2[68], 10);
  result.checks.push({
    label: 'Line 1 checksum',
    ok: !Number.isNaN(cs1) && tleChecksum(l1) === cs1,
    detail: Number.isNaN(cs1) ? 'Missing checksum digit' : `Computed ${tleChecksum(l1)}, stated ${cs1}`,
  });
  result.checks.push({
    label: 'Line 2 checksum',
    ok: !Number.isNaN(cs2) && tleChecksum(l2) === cs2,
    detail: Number.isNaN(cs2) ? 'Missing checksum digit' : `Computed ${tleChecksum(l2)}, stated ${cs2}`,
  });

  // Line 1 fields (1-indexed columns)
  const catalogNumber = l1.slice(2, 7).trim();
  const classification = l1.slice(7, 8).trim() || 'U';
  const intlDesignator = l1.slice(9, 17).trim();
  const epochYear = parseInt(l1.slice(18, 20), 10);
  const epochDay = parseFloat(l1.slice(20, 32));
  const ndot = parseFloat(l1.slice(33, 43));
  const nddot = parseFloat(`0.${l1.slice(44, 50).trim()}e${l1.slice(50, 52)}`);
  const bstar = parseFloat(`${l1.slice(53, 54)}.${l1.slice(54, 59).trim()}e${l1.slice(59, 61)}`);
  const ephemerisType = l1.slice(62, 63).trim();
  const elementSetNumber = l1.slice(64, 68).trim();

  // Line 2 fields
  const cat2 = l2.slice(2, 7).trim();
  const inclination = parseFloat(l2.slice(8, 16));
  const raan = parseFloat(l2.slice(17, 25));
  const eccentricity = parseFloat(`0.${l2.slice(26, 33).trim()}`);
  const argPerigee = parseFloat(l2.slice(34, 42));
  const meanAnomaly = parseFloat(l2.slice(43, 51));
  const meanMotion = parseFloat(l2.slice(52, 63));
  const revNumber = l2.slice(63, 68).trim();

  result.checks.push({
    label: 'Catalog number match',
    ok: catalogNumber === cat2,
    detail: catalogNumber === cat2 ? `NORAD ${catalogNumber}` : `Line 1: ${catalogNumber} vs line 2: ${cat2}`,
  });

  const epoch = tleEpochToDate(epochYear, epochDay);
  result.line1 = {
    catalogNumber,
    classification: { U: 'Unclassified', C: 'Classified', S: 'Secret' }[classification] || classification,
    intlDesignator,
    epochYear: epochYear < 57 ? 2000 + epochYear : 1900 + epochYear,
    epochDay,
    epochIso: epoch.toISOString(),
    epochAgeDays: (Date.now() - epoch.getTime()) / 86400000,
    ndot,
    nddot,
    bstar,
    ephemerisType,
    elementSetNumber,
  };
  result.line2 = {
    inclination, raan, eccentricity, argPerigee, meanAnomaly, meanMotion, revNumber,
  };

  // Derived orbital parameters (Keplerian)
  if (!Number.isNaN(meanMotion) && meanMotion > 0) {
    const periodSec = 86400 / meanMotion;
    const nRadS = (meanMotion * 2 * Math.PI) / 86400;
    const a = Math.cbrt(MU_EARTH / (nRadS * nRadS));
    const e = eccentricity;
    result.derived = {
      periodMin: periodSec / 60,
      semiMajorAxisKm: a,
      apogeeKm: a * (1 + e) - R_EARTH,
      perigeeKm: a * (1 - e) - R_EARTH,
      orbitType: orbitType(a, e, meanMotion),
    };
  }

  result.valid = result.checks.every((c) => c.ok);
  return result;
}

function orbitType(a, e, mm) {
  const alt = a - R_EARTH;
  if (Math.abs(mm - 1.0027) < 0.01) return 'Geosynchronous / GEO';
  if (e > 0.25 && alt > 6000) return 'Highly elliptical (HEO/Molniya-like)';
  if (alt < 2000) return 'Low Earth orbit (LEO)';
  if (alt < 35786) return 'Medium Earth orbit (MEO)';
  return 'High Earth orbit';
}

// Parse multiple TLEs / 3LEs from a block of text
export function parseTleBatch(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trimEnd()).filter((l) => l.trim().length > 0);
  const records = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].startsWith('1') && lines[i + 1] && lines[i + 1].startsWith('2')) {
      records.push({ name: null, l1: lines[i], l2: lines[i + 1] });
      i += 2;
    } else if (lines[i + 1] && lines[i + 1].startsWith('1') && lines[i + 2] && lines[i + 2].startsWith('2')) {
      records.push({ name: lines[i].replace(/^0\s+/, '').trim(), l1: lines[i + 1], l2: lines[i + 2] });
      i += 3;
    } else {
      i += 1;
    }
  }
  return records.map((r) => ({ ...parseTle(`${r.l1}\n${r.l2}`), name: r.name }));
}

// Convert a parsed TLE to CCSDS OMM / GP JSON field names
export function tleToOmm(parsed) {
  if (!parsed.line1 || !parsed.line2) return null;
  const l1 = parsed.line1;
  const l2 = parsed.line2;
  return {
    OBJECT_NAME: parsed.name || `NORAD ${l1.catalogNumber}`,
    OBJECT_ID: l1.intlDesignator || null,
    NORAD_CAT_ID: parseInt(l1.catalogNumber, 10),
    CLASSIFICATION_TYPE: l1.classification.charAt(0),
    EPOCH: l1.epochIso,
    MEAN_MOTION: l2.meanMotion,
    ECCENTRICITY: l2.eccentricity,
    INCLINATION: l2.inclination,
    RA_OF_ASC_NODE: l2.raan,
    ARG_OF_PERICENTER: l2.argPerigee,
    MEAN_ANOMALY: l2.meanAnomaly,
    EPHEMERIS_TYPE: parseInt(l1.ephemerisType, 10) || 0,
    ELEMENT_SET_NO: parseInt(l1.elementSetNumber, 10) || 0,
    REV_AT_EPOCH: parseInt(l2.revNumber, 10) || 0,
    BSTAR: l1.bstar,
    MEAN_MOTION_DOT: l1.ndot,
    MEAN_MOTION_DDOT: l1.nddot,
  };
}
