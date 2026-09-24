// HL7 v2.x message parsing utilities — segment/field/component breakdown.
// All client-side, no network calls. PHI never leaves the browser.

// Common segment names (HL7 v2.x)
export const SEGMENT_NAMES = {
  MSH: 'Message Header', EVN: 'Event Type', PID: 'Patient Identification',
  PD1: 'Patient Additional Demographics', NK1: 'Next of Kin',
  PV1: 'Patient Visit', PV2: 'Patient Visit - Additional Info',
  ORC: 'Common Order', OBR: 'Observation Request', OBX: 'Observation/Result',
  MSA: 'Message Acknowledgment', ERR: 'Error', QAK: 'Query Acknowledgment',
  QPD: 'Query Parameter Definition', RCP: 'Response Control Parameter',
  MFI: 'Master File Identification', MFE: 'Master File Entry',
  IN1: 'Insurance', IN2: 'Insurance Additional Info', IN3: 'Insurance Cert.',
  GT1: 'Guarantor', AL1: 'Patient Allergy Information', DG1: 'Diagnosis',
  PR1: 'Procedures', SCH: 'Scheduling Activity', TXA: 'Transcription Document Header',
  NTE: 'Notes and Comments', CTI: 'Clinical Trial Identification',
  IAM: 'Patient Adverse Reaction', ACC: 'Accident', UB1: 'UB82 Data',
  FT1: 'Financial Transaction', CTD: 'Contact Data', PRD: 'Provider Data',
  MRG: 'Merge Patient Information', ROL: 'Role', SFT: 'Software Segment',
  UAC: 'User Authentication Credential', ARQ: 'Appointment Request',
  AIL: 'Appointment Info - Location', AIP: 'Appointment Info - Personnel',
  AIG: 'Appointment Info - General Resource', AIS: 'Appointment Info - Service',
  SPM: 'Specimen', SAC: 'Specimen Container', TQ1: 'Timing/Quantity',
  RXE: 'Pharmacy Encoded Order', RXR: 'Pharmacy Route', RXO: 'Pharmacy Order',
  RXA: 'Pharmacy Administration', RXG: 'Pharmacy Give', RXD: 'Pharmacy Dispense',
  ORU: 'Observational Result (unsolicited)', PRT: 'Participation',
  CON: 'Consent Segment', LAN: 'Language Detail', PID_PD1: 'PD1',
};

// Key MSH fields for header display
const MSH_FIELDS = {
  'MSH-3': 'Sending Application', 'MSH-4': 'Sending Facility',
  'MSH-5': 'Receiving Application', 'MSH-6': 'Receiving Facility',
  'MSH-7': 'Date/Time of Message', 'MSH-9': 'Message Type',
  'MSH-10': 'Message Control ID', 'MSH-11': 'Processing ID',
  'MSH-12': 'Version ID', 'MSH-15': 'Accept Ack Type', 'MSH-16': 'App Ack Type',
  'MSH-17': 'Country Code', 'MSH-18': 'Character Set',
};

// Notable fields per segment for labeling (subset of the most-used fields)
const FIELD_LABELS = {
  PID: { 3: 'Patient Identifier List', 5: 'Patient Name', 7: 'Date/Time of Birth', 8: 'Administrative Sex', 10: 'Race', 11: 'Patient Address', 13: 'Phone Number - Home', 18: 'Patient Account Number', 19: 'SSN' },
  PV1: { 2: 'Patient Class', 3: 'Assigned Patient Location', 7: 'Attending Doctor', 8: 'Referring Doctor', 10: 'Hospital Service', 19: 'Visit Number', 44: 'Admit Date/Time', 45: 'Discharge Date/Time' },
  OBR: { 2: 'Placer Order Number', 3: 'Filler Order Number', 4: 'Universal Service Identifier', 6: 'Requested Date/Time', 7: 'Observation Date/Time', 16: 'Ordering Provider', 22: 'Results Rpt/Status Chng', 25: 'Result Status' },
  OBX: { 2: 'Value Type', 3: 'Observation Identifier', 5: 'Observation Value', 6: 'Units', 7: 'References Range', 8: 'Abnormal Flags', 11: 'Observation Result Status', 14: 'Date/Time of Observation' },
  ORC: { 1: 'Order Control', 2: 'Placer Order Number', 3: 'Filler Order Number', 9: 'Date/Time of Transaction', 12: 'Ordering Provider', 21: 'Ordering Facility Name' },
  EVN: { 1: 'Event Type Code', 2: 'Recorded Date/Time', 6: 'Event Occurred' },
  MSA: { 1: 'Acknowledgment Code', 2: 'Message Control ID', 3: 'Text Message' },
  ERR: { 2: 'Error Location', 3: 'HL7 Error Code', 4: 'Severity', 8: 'User Message' },
  DG1: { 3: 'Diagnosis Code', 4: 'Diagnosis Description', 5: 'Diagnosis Date/Time', 6: 'Diagnosis Type' },
  IN1: { 2: 'Insurance Plan ID', 3: 'Insurance Company ID', 4: 'Insurance Company Name', 16: 'Insured Name', 36: 'Policy Number' },
  SCH: { 2: 'Placer Appointment ID', 3: 'Filler Appointment ID', 7: 'Appointment Reason', 11: 'Appointment Timing/Quantity' },
  AL1: { 2: 'Allergen Type', 3: 'Allergen Code/Description', 5: 'Allergy Reaction', 6: 'Identification Date' },
  NK1: { 2: 'NK Name', 3: 'Relationship', 5: 'Phone Number', 7: 'Contact Role' },
  MFE: { 1: 'Record-Level Event Code', 4: 'Primary Key Value' },
  MFI: { 1: 'Master File Identifier', 3: 'File-Level Event Code' },
  SPM: { 2: 'Specimen ID', 4: 'Specimen Type', 17: 'Specimen Collection Date/Time' },
  RXE: { 2: 'Quantity/Timing', 3: 'Give Code', 10: 'Dispense Amount', 21: 'Pharmacy Instructions' },
  TXA: { 1: 'Set ID', 2: 'Document Type', 9: 'Originator', 12: 'Unique Document Number' },
};

export function fieldLabel(segName, fieldNum) {
  if (segName === 'MSH') return MSH_FIELDS[`MSH-${fieldNum}`] || null;
  return FIELD_LABELS[segName]?.[fieldNum] || null;
}

// Parse an HL7 v2 message into segments with fields/components/subcomponents.
// Handles \r, \n, \r\n separators. Returns { segments, delimiters, messageType, version, checks }
export function parseHl7(text) {
  const result = { segments: [], checks: [], messageType: null, version: null, delimiters: null };

  const raw = text.replace(/\r\n|\r/g, '\n').split('\n').filter((l) => l.trim().length > 0);
  if (raw.length === 0) {
    result.checks.push({ label: 'Input', ok: false, detail: 'Empty input' });
    return result;
  }

  const first = raw[0];
  if (!first.startsWith('MSH')) {
    result.checks.push({ label: 'MSH segment', ok: false, detail: 'Message must start with an MSH segment' });
    return result;
  }
  result.checks.push({ label: 'MSH segment', ok: true, detail: 'Message starts with MSH' });

  // Delimiters: MSH-1 is char 4 (field sep), MSH-2 is encoding chars
  const fieldSep = first[3];
  const encChars = first.slice(4, 8);
  const compSep = encChars[0] || '^';
  const repSep = encChars[1] || '~';
  const escChar = encChars[2] || '\\';
  const subSep = encChars[3] || '&';
  result.delimiters = { fieldSep, compSep, repSep, escChar, subSep };
  result.checks.push({
    label: 'Encoding characters',
    ok: encChars.length >= 4,
    detail: `Field "${fieldSep}", Component "${compSep}", Repetition "${repSep}", Escape "${escChar}", Subcomponent "${subSep}"`,
  });

  raw.forEach((line, idx) => {
    const segName = line.slice(0, 3);
    const isMsh = segName === 'MSH';

    // For MSH: field 1 = separator itself, field 2 = encoding chars, rest follow
    let fields;
    if (isMsh) {
      const parts = line.split(fieldSep);
      fields = parts.slice(1).map((v, i) => ({ num: i + 1, value: v }));
      fields.unshift({ num: 1, value: fieldSep });
      fields[1] = { num: 2, value: encChars };
    } else {
      fields = line.split(fieldSep).slice(1).map((v, i) => ({ num: i + 1, value: v }));
    }

    const parsedFields = fields.map((f) => ({
      ...f,
      label: fieldLabel(segName, f.num),
      components: f.value.includes(compSep)
        ? f.value.split(compSep).map((c) => ({
            value: c,
            subcomponents: c.includes(subSep) ? c.split(subSep) : null,
          }))
        : null,
    }));

    result.segments.push({
      name: segName,
      label: SEGMENT_NAMES[segName] || null,
      index: idx,
      fields: parsedFields,
      raw: line,
    });
  });

  // Extract message type + version from MSH
  const msh = result.segments[0];
  const msh9 = msh.fields.find((f) => f.num === 9);
  const msh12 = msh.fields.find((f) => f.num === 12);
  if (msh9) result.messageType = msh9.value;
  if (msh12) result.version = msh12.value;

  result.checks.push({
    label: 'Message type',
    ok: !!result.messageType,
    detail: result.messageType ? `${result.messageType} (MSH-9)` : 'MSH-9 missing',
  });
  result.checks.push({
    label: 'HL7 version',
    ok: !!result.version,
    detail: result.version ? `v${result.version} (MSH-12)` : 'MSH-12 missing',
  });

  // Segment count sanity
  result.checks.push({
    label: 'Segments',
    ok: result.segments.length > 1,
    detail: `${result.segments.length} segment(s) found`,
  });

  result.valid = result.checks.every((c) => c.ok);
  return result;
}
