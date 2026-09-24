// FHIR R4 resource viewing and structural validation utilities.
// All client-side, no network calls. PHI never leaves the browser.

// Required fields and expected types for common FHIR R4 resources.
// type: 'string' | 'boolean' | 'number' | 'object' | 'array' | 'code' | 'date' | 'datetime' | 'uri' | 'id' | 'reference'
const RESOURCE_SCHEMAS = {
  Patient: {
    required: [],
    fields: {
      resourceType: 'code', id: 'id', meta: 'object', identifier: 'array',
      active: 'boolean', name: 'array', telecom: 'array', gender: 'code',
      birthDate: 'date', deceasedBoolean: 'boolean', deceasedDateTime: 'datetime',
      address: 'array', maritalStatus: 'object', contact: 'array',
      communication: 'array', generalPractitioner: 'array', managingOrganization: 'reference',
    },
  },
  Observation: {
    required: ['status', 'code'],
    fields: {
      resourceType: 'code', id: 'id', status: 'code', category: 'array',
      code: 'object', subject: 'reference', encounter: 'reference',
      effectiveDateTime: 'datetime', effectivePeriod: 'object', issued: 'datetime',
      performer: 'array', valueQuantity: 'object', valueCodeableConcept: 'object',
      valueString: 'string', valueBoolean: 'boolean', interpretation: 'array',
      referenceRange: 'array', component: 'array',
    },
  },
  Bundle: {
    required: ['type'],
    fields: {
      resourceType: 'code', id: 'id', identifier: 'object', type: 'code',
      timestamp: 'datetime', total: 'number', link: 'array', entry: 'array',
      signature: 'object',
    },
  },
  Encounter: {
    required: ['status'],
    fields: {
      resourceType: 'code', id: 'id', status: 'code', class: 'object',
      type: 'array', subject: 'reference', participant: 'array',
      period: 'object', reasonCode: 'array', diagnosis: 'array',
      serviceProvider: 'reference', location: 'array',
    },
  },
  MedicationRequest: {
    required: ['status', 'intent', 'subject'],
    fields: {
      resourceType: 'code', id: 'id', status: 'code', intent: 'code',
      medicationCodeableConcept: 'object', medicationReference: 'reference',
      subject: 'reference', encounter: 'reference', authoredOn: 'datetime',
      requester: 'reference', dosageInstruction: 'array', dispenseRequest: 'object',
    },
  },
  Condition: {
    required: ['subject'],
    fields: {
      resourceType: 'code', id: 'id', clinicalStatus: 'object',
      verificationStatus: 'object', category: 'array', severity: 'object',
      code: 'object', bodySite: 'array', subject: 'reference',
      encounter: 'reference', onsetDateTime: 'datetime', recordedDate: 'datetime',
      recorder: 'reference', asserter: 'reference',
    },
  },
  Procedure: {
    required: ['status', 'subject'],
    fields: {
      resourceType: 'code', id: 'id', status: 'code', code: 'object',
      subject: 'reference', encounter: 'reference', performedDateTime: 'datetime',
      performedPeriod: 'object', performer: 'array', reasonCode: 'array',
      outcome: 'object', complication: 'array',
    },
  },
  DiagnosticReport: {
    required: ['status', 'code'],
    fields: {
      resourceType: 'code', id: 'id', status: 'code', category: 'array',
      code: 'object', subject: 'reference', encounter: 'reference',
      effectiveDateTime: 'datetime', issued: 'datetime', performer: 'array',
      result: 'array', conclusion: 'string', conclusionCode: 'array',
    },
  },
  AllergyIntolerance: {
    required: ['patient'],
    fields: {
      resourceType: 'code', id: 'id', clinicalStatus: 'object',
      verificationStatus: 'object', type: 'code', category: 'array',
      criticality: 'code', code: 'object', patient: 'reference',
      encounter: 'reference', onsetDateTime: 'datetime', recordedDate: 'datetime',
      reaction: 'array',
    },
  },
  Immunization: {
    required: ['status', 'vaccineCode', 'patient'],
    fields: {
      resourceType: 'code', id: 'id', status: 'code', vaccineCode: 'object',
      patient: 'reference', encounter: 'reference', occurrenceDateTime: 'datetime',
      recorded: 'datetime', primarySource: 'boolean', manufacturer: 'reference',
      lotNumber: 'string', site: 'object', route: 'object', doseQuantity: 'object',
    },
  },
  Organization: {
    required: [],
    fields: {
      resourceType: 'code', id: 'id', identifier: 'array', active: 'boolean',
      type: 'array', name: 'string', alias: 'array', telecom: 'array',
      address: 'array', partOf: 'reference', contact: 'array',
    },
  },
  Practitioner: {
    required: [],
    fields: {
      resourceType: 'code', id: 'id', identifier: 'array', active: 'boolean',
      name: 'array', telecom: 'array', address: 'array', gender: 'code',
      birthDate: 'date', qualification: 'array', communication: 'array',
    },
  },
};

const TYPE_CHECKERS = {
  string: (v) => typeof v === 'string',
  boolean: (v) => typeof v === 'boolean',
  number: (v) => typeof v === 'number',
  object: (v) => typeof v === 'object' && v !== null && !Array.isArray(v),
  array: (v) => Array.isArray(v),
  code: (v) => typeof v === 'string',
  id: (v) => typeof v === 'string' && /^[A-Za-z0-9\-.]{1,64}$/.test(v),
  date: (v) => typeof v === 'string' && /^\d{4}(-\d{2}(-\d{2})?)?$/.test(v),
  datetime: (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}(T[\d:.+Z-]+)?$/.test(v),
  uri: (v) => typeof v === 'string',
  reference: (v) => typeof v === 'object' && v !== null && (v.reference !== undefined || v.display !== undefined || v.identifier !== undefined),
};

export function validateFhir(json) {
  const result = { checks: [], valid: false, resourceType: null, summary: [] };

  let obj;
  try {
    obj = JSON.parse(json);
  } catch (e) {
    result.checks.push({ label: 'JSON syntax', ok: false, detail: e.message });
    return result;
  }
  result.checks.push({ label: 'JSON syntax', ok: true, detail: 'Valid JSON' });

  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    result.checks.push({ label: 'Resource', ok: false, detail: 'FHIR resource must be a JSON object' });
    return result;
  }

  const rt = obj.resourceType;
  if (!rt || typeof rt !== 'string') {
    result.checks.push({ label: 'resourceType', ok: false, detail: 'Missing or invalid resourceType' });
    return result;
  }
  result.resourceType = rt;
  result.checks.push({ label: 'resourceType', ok: true, detail: rt });

  const schema = RESOURCE_SCHEMAS[rt];
  if (!schema) {
    result.checks.push({
      label: 'Schema',
      ok: true,
      detail: `No built-in schema for "${rt}" — showing structure only`,
    });
    result.valid = true;
    result.summary = flattenResource(obj);
    return result;
  }

  // Required fields
  schema.required.forEach((field) => {
    const present = obj[field] !== undefined && obj[field] !== null;
    result.checks.push({
      label: `Required: ${field}`,
      ok: present,
      detail: present ? 'Present' : `Missing required field "${field}"`,
    });
  });

  // Type checks on known fields
  Object.entries(obj).forEach(([key, value]) => {
    const expected = schema.fields[key];
    if (!expected) return; // unknown/extension fields are allowed
    const checker = TYPE_CHECKERS[expected];
    if (checker && !checker(value)) {
      result.checks.push({
        label: `Type: ${key}`,
        ok: false,
        detail: `Expected ${expected}, got ${Array.isArray(value) ? 'array' : typeof value}`,
      });
    }
  });

  result.valid = result.checks.every((c) => c.ok);
  result.summary = flattenResource(obj);
  return result;
}

// Flatten a FHIR resource into displayable rows: path → value
function flattenResource(obj, prefix = '', depth = 0) {
  const rows = [];
  if (depth > 6) return rows;
  Object.entries(obj).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      if (value.length === 0) return;
      if (value.every((v) => typeof v !== 'object' || v === null)) {
        rows.push({ path, value: value.join(', ') });
      } else {
        value.forEach((item, i) => {
          if (typeof item === 'object' && item !== null) {
            rows.push(...flattenResource(item, `${path}[${i}]`, depth + 1));
          } else {
            rows.push({ path: `${path}[${i}]`, value: String(item) });
          }
        });
      }
    } else if (typeof value === 'object') {
      rows.push(...flattenResource(value, path, depth + 1));
    } else {
      rows.push({ path, value: String(value) });
    }
  });
  return rows;
}
