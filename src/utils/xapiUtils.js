// xAPI (Tin Can) statement utilities — verb/activity-type registry and a
// structural validator for xAPI 1.0.x / 2.0 statements.
// All client-side, no network calls.

export const XAPI_VERBS = [
  { id: 'http://adlnet.gov/expapi/verbs/abandoned', label: 'abandoned' },
  { id: 'http://adlnet.gov/expapi/verbs/answered', label: 'answered' },
  { id: 'http://adlnet.gov/expapi/verbs/asked', label: 'asked' },
  { id: 'http://adlnet.gov/expapi/verbs/attempted', label: 'attempted' },
  { id: 'http://adlnet.gov/expapi/verbs/attended', label: 'attended' },
  { id: 'http://adlnet.gov/expapi/verbs/commented', label: 'commented' },
  { id: 'http://adlnet.gov/expapi/verbs/completed', label: 'completed' },
  { id: 'http://adlnet.gov/expapi/verbs/exited', label: 'exited' },
  { id: 'http://adlnet.gov/expapi/verbs/experienced', label: 'experienced' },
  { id: 'http://adlnet.gov/expapi/verbs/failed', label: 'failed' },
  { id: 'http://adlnet.gov/expapi/verbs/imported', label: 'imported' },
  { id: 'http://adlnet.gov/expapi/verbs/initialized', label: 'initialized' },
  { id: 'http://adlnet.gov/expapi/verbs/interacted', label: 'interacted' },
  { id: 'http://adlnet.gov/expapi/verbs/launched', label: 'launched' },
  { id: 'http://adlnet.gov/expapi/verbs/mastered', label: 'mastered' },
  { id: 'http://adlnet.gov/expapi/verbs/passed', label: 'passed' },
  { id: 'http://adlnet.gov/expapi/verbs/preferred', label: 'preferred' },
  { id: 'http://adlnet.gov/expapi/verbs/progressed', label: 'progressed' },
  { id: 'http://adlnet.gov/expapi/verbs/registered', label: 'registered' },
  { id: 'http://adlnet.gov/expapi/verbs/responded', label: 'responded' },
  { id: 'http://adlnet.gov/expapi/verbs/resumed', label: 'resumed' },
  { id: 'http://adlnet.gov/expapi/verbs/scored', label: 'scored' },
  { id: 'http://adlnet.gov/expapi/verbs/shared', label: 'shared' },
  { id: 'http://adlnet.gov/expapi/verbs/suspended', label: 'suspended' },
  { id: 'http://adlnet.gov/expapi/verbs/terminated', label: 'terminated' },
  { id: 'http://adlnet.gov/expapi/verbs/voided', label: 'voided' },
  { id: 'http://adlnet.gov/expapi/verbs/waived', label: 'waived' },
  { id: 'http://id.tincanapi.com/verb/downloaded', label: 'downloaded' },
  { id: 'http://id.tincanapi.com/verb/selected', label: 'selected' },
  { id: 'http://id.tincanapi.com/verb/skipped', label: 'skipped' },
  { id: 'http://id.tincanapi.com/verb/tagged', label: 'tagged' },
  { id: 'http://id.tincanapi.com/verb/viewed', label: 'viewed' },
  { id: 'http://id.tincanapi.com/verb/voted', label: 'voted' },
];

export const XAPI_ACTIVITY_TYPES = [
  { id: 'http://adlnet.gov/expapi/activities/assessment', label: 'assessment' },
  { id: 'http://adlnet.gov/expapi/activities/attempt', label: 'attempt' },
  { id: 'http://adlnet.gov/expapi/activities/course', label: 'course' },
  { id: 'http://adlnet.gov/expapi/activities/cmi.interaction', label: 'cmi.interaction' },
  { id: 'http://adlnet.gov/expapi/activities/file', label: 'file' },
  { id: 'http://adlnet.gov/expapi/activities/interaction', label: 'interaction' },
  { id: 'http://adlnet.gov/expapi/activities/lesson', label: 'lesson' },
  { id: 'http://adlnet.gov/expapi/activities/link', label: 'link' },
  { id: 'http://adlnet.gov/expapi/activities/media', label: 'media' },
  { id: 'http://adlnet.gov/expapi/activities/meeting', label: 'meeting' },
  { id: 'http://adlnet.gov/expapi/activities/module', label: 'module' },
  { id: 'http://adlnet.gov/expapi/activities/objective', label: 'objective' },
  { id: 'http://adlnet.gov/expapi/activities/performance', label: 'performance' },
  { id: 'http://adlnet.gov/expapi/activities/profile', label: 'profile' },
  { id: 'http://adlnet.gov/expapi/activities/question', label: 'question' },
  { id: 'http://adlnet.gov/expapi/activities/simulation', label: 'simulation' },
  { id: 'http://id.tincanapi.com/activitytype/school-assignment', label: 'school-assignment' },
  { id: 'http://id.tincanapi.com/activitytype/category-tag', label: 'category-tag' },
];

export const INTERACTION_TYPES = [
  'true-false', 'choice', 'fill-in', 'long-fill-in', 'matching',
  'performance', 'sequencing', 'likert', 'numeric', 'other',
];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ISO8601_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/i;
const ISO8601_DURATION_RE = /^P(?=\d|T\d)(\d+(\.\d+)?Y)?(\d+(\.\d+)?M)?(\d+(\.\d+)?D)?(T(\d+(\.\d+)?H)?(\d+(\.\d+)?M)?(\d+(\.\d+)?S)?)?$/i;
const IRI_RE = /^[a-z][a-z0-9+.-]*:\S+$/i;
const MAILTO_RE = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const SHA1_RE = /^[0-9a-f]{40}$/i;
const SHA2_RE = /^[0-9a-f]{64}$/i;
const LANG_TAG_RE = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;

const IFI_KEYS = ['mbox', 'mbox_sha1sum', 'openid', 'account'];
const CONTEXT_ACTIVITY_KEYS = ['parent', 'grouping', 'category', 'other'];
const STATEMENT_KEYS = ['id', 'actor', 'verb', 'object', 'result', 'context', 'timestamp', 'stored', 'authority', 'version', 'attachments', 'voided'];

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isLangMap = (v) => isPlainObject(v) && Object.keys(v).length > 0 && Object.keys(v).every((k) => LANG_TAG_RE.test(k)) && Object.values(v).every((val) => typeof val === 'string');
const isIri = (v) => typeof v === 'string' && IRI_RE.test(v);

function verbLabel(id) {
  const hit = XAPI_VERBS.find((v) => v.id === id);
  if (hit) return `recognized ADL/TinCan verb "${hit.label}"`;
  const hit2 = id.match(/^https?:\/\/adlnet\.gov\/expapi\/verbs\/(.+)$/);
  if (hit2) return `ADL verb "${hit2[1]}" (not in core registry)`;
  return 'custom verb IRI';
}

function activityTypeLabel(id) {
  const hit = XAPI_ACTIVITY_TYPES.find((t) => t.id === id);
  return hit ? `recognized type "${hit.label}"` : 'custom activity type IRI';
}

function checkExtensions(obj, path, checks) {
  if (!obj || !isPlainObject(obj.extensions)) return;
  for (const key of Object.keys(obj.extensions)) {
    checks.push({
      label: `${path}.extensions key`,
      ok: isIri(key),
      detail: isIri(key) ? `"${key}" is a valid IRI` : `"${key}" is not a valid IRI — extension keys must be IRIs`,
    });
  }
}

function validateActor(actor, path, checks) {
  const type = actor.objectType || 'Agent';
  if (!['Agent', 'Group'].includes(type)) {
    checks.push({ label: `${path}.objectType`, ok: false, detail: `"${type}" must be "Agent" or "Group"` });
    return;
  }
  const ifis = IFI_KEYS.filter((k) => actor[k] !== undefined);
  checks.push({
    label: `${path} inverse functional identifier`,
    ok: ifis.length === 1,
    detail: ifis.length === 1
      ? `Identified by ${ifis[0]}`
      : `Exactly one IFI required (mbox, mbox_sha1sum, openid, account) — found ${ifis.length}`,
  });
  if (actor.mbox !== undefined) {
    checks.push({
      label: `${path}.mbox`,
      ok: MAILTO_RE.test(actor.mbox),
      detail: MAILTO_RE.test(actor.mbox) ? 'Valid mailto: IRI' : 'Must be "mailto:" + valid email address',
    });
  }
  if (actor.mbox_sha1sum !== undefined) {
    checks.push({
      label: `${path}.mbox_sha1sum`,
      ok: SHA1_RE.test(actor.mbox_sha1sum),
      detail: SHA1_RE.test(actor.mbox_sha1sum) ? 'Valid SHA-1 of mailto: address' : 'Expected 40-char hex SHA-1 of the mailto: string',
    });
  }
  if (actor.openid !== undefined) {
    checks.push({ label: `${path}.openid`, ok: isIri(actor.openid), detail: isIri(actor.openid) ? 'Valid URI' : 'OpenID must be a URI' });
  }
  if (actor.account !== undefined) {
    const accOk = isPlainObject(actor.account) && typeof actor.account.name === 'string' && actor.account.name.length > 0 && isIri(actor.account.homePage);
    checks.push({
      label: `${path}.account`,
      ok: accOk,
      detail: accOk ? `account "${actor.account.name}" @ ${actor.account.homePage}` : 'Requires name (string) and homePage (IRI)',
    });
  }
  if (type === 'Group') {
    const anon = ifis.length === 0;
    if (actor.member !== undefined) {
      const ok = Array.isArray(actor.member);
      checks.push({
        label: `${path}.member`,
        ok,
        detail: ok ? `${actor.member.length} member(s)` : 'member must be an array of Agents',
      });
      if (ok) actor.member.forEach((m, i) => validateActor(m, `${path}.member[${i}]`, checks));
    } else {
      checks.push({
        label: `${path} group type`,
        ok: !anon,
        detail: anon ? 'Anonymous Group — must include a "member" array' : 'Identified Group (named by IFI)',
      });
    }
  }
}

function validateObject(object, path, checks, inSubStatement) {
  const type = object.objectType || 'Activity';

  if (type === 'Agent' || type === 'Group') {
    checks.push({ label: `${path}.objectType`, ok: true, detail: `Object is a ${type}` });
    validateActor(object, path, checks);
    return;
  }

  if (type === 'StatementRef') {
    const ok = UUID_RE.test(object.id || '');
    checks.push({ label: `${path}.id`, ok, detail: ok ? 'Valid statement UUID' : 'StatementRef requires id (UUID of the referenced statement)' });
    checkExtensions(object, path, checks);
    return;
  }

  if (type === 'SubStatement') {
    if (inSubStatement) {
      checks.push({ label: `${path}.objectType`, ok: false, detail: 'SubStatements cannot be nested' });
      return;
    }
    checks.push({ label: `${path}.objectType`, ok: true, detail: 'SubStatement' });
    for (const banned of ['id', 'stored', 'version', 'authority']) {
      if (object[banned] !== undefined) {
        checks.push({ label: `${path}.${banned}`, ok: false, detail: `"${banned}" is not allowed inside a SubStatement` });
      }
    }
    if (!isPlainObject(object.actor)) {
      checks.push({ label: `${path}.actor`, ok: false, detail: 'SubStatement requires an actor object' });
    } else validateActor(object.actor, `${path}.actor`, checks);
    validateVerb(object.verb, `${path}.verb`, checks);
    validateObjectField(object.object, `${path}.object`, checks, true);
    if (object.result !== undefined) validateResult(object.result, `${path}.result`, checks);
    if (object.context !== undefined) validateContext(object.context, `${path}.context`, checks);
    if (object.timestamp !== undefined) validateTimestamp(object.timestamp, `${path}.timestamp`, checks);
    return;
  }

  if (type !== 'Activity') {
    checks.push({ label: `${path}.objectType`, ok: false, detail: `"${type}" must be Activity, Agent, Group, StatementRef, or SubStatement` });
    return;
  }

  // Activity
  const idOk = isIri(object.id);
  checks.push({ label: `${path}.id`, ok: idOk, detail: idOk ? 'Valid activity IRI' : 'Activity requires an id that is an IRI' });

  if (object.definition !== undefined) {
    const def = object.definition;
    if (!isPlainObject(def)) {
      checks.push({ label: `${path}.definition`, ok: false, detail: 'definition must be an object' });
      return;
    }
    for (const map of ['name', 'description']) {
      if (def[map] !== undefined) {
        checks.push({
          label: `${path}.definition.${map}`,
          ok: isLangMap(def[map]),
          detail: isLangMap(def[map]) ? `Language map (${Object.keys(def[map]).join(', ')})` : 'Must be a language map, e.g. {"en-US": "Course intro"}',
        });
      }
    }
    if (def.type !== undefined) {
      checks.push({
        label: `${path}.definition.type`,
        ok: isIri(def.type),
        detail: isIri(def.type) ? activityTypeLabel(def.type) : 'Activity type must be an IRI',
      });
    }
    if (def.moreInfo !== undefined) {
      checks.push({ label: `${path}.definition.moreInfo`, ok: isIri(def.moreInfo), detail: isIri(def.moreInfo) ? 'Valid URL' : 'moreInfo must be a URL' });
    }
    if (def.interactionType !== undefined) {
      const ok = INTERACTION_TYPES.includes(def.interactionType);
      checks.push({
        label: `${path}.definition.interactionType`,
        ok,
        detail: ok ? `"${def.interactionType}"` : `Must be one of: ${INTERACTION_TYPES.join(', ')}`,
      });
      if (def.interactionType === 'true-false' && def.correctResponsesPattern) {
        const ok2 = def.correctResponsesPattern.every((p) => p === 'true' || p === 'false');
        checks.push({ label: `${path} correctResponsesPattern`, ok: ok2, detail: ok2 ? 'Valid true/false pattern' : 'true-false answers must be "true" or "false" strings' });
      }
    }
    checkExtensions(def, `${path}.definition`, checks);
  }
  checkExtensions(object, path, checks);
}

function validateObjectField(object, path, checks, inSubStatement) {
  if (!isPlainObject(object)) {
    checks.push({ label: path, ok: false, detail: 'object is required and must be an object (Activity, Agent, Group, StatementRef, or SubStatement)' });
    return;
  }
  validateObject(object, path, checks, inSubStatement);
}

function validateVerb(verb, path, checks) {
  if (!isPlainObject(verb)) {
    checks.push({ label: path, ok: false, detail: 'verb is required and must be an object {id, display?}' });
    return;
  }
  const ok = isIri(verb.id);
  checks.push({
    label: `${path}.id`,
    ok,
    detail: ok ? verbLabel(verb.id) : 'verb.id must be an IRI, e.g. http://adlnet.gov/expapi/verbs/completed',
  });
  if (verb.display !== undefined) {
    checks.push({
      label: `${path}.display`,
      ok: isLangMap(verb.display),
      detail: isLangMap(verb.display) ? `Language map (${Object.keys(verb.display).join(', ')})` : 'display must be a language map, e.g. {"en-US": "completed"}',
    });
  }
}

function validateResult(result, path, checks) {
  if (!isPlainObject(result)) {
    checks.push({ label: path, ok: false, detail: 'result must be an object' });
    return;
  }
  for (const key of ['success', 'completion']) {
    if (result[key] !== undefined) {
      checks.push({ label: `${path}.${key}`, ok: typeof result[key] === 'boolean', detail: typeof result[key] === 'boolean' ? `${key}: ${result[key]}` : 'Must be true or false' });
    }
  }
  if (result.score !== undefined) {
    const s = result.score;
    if (!isPlainObject(s)) {
      checks.push({ label: `${path}.score`, ok: false, detail: 'score must be an object' });
    } else {
      for (const key of ['scaled', 'raw', 'min', 'max']) {
        if (s[key] !== undefined && typeof s[key] !== 'number') {
          checks.push({ label: `${path}.score.${key}`, ok: false, detail: 'Must be a number' });
        }
      }
      if (typeof s.scaled === 'number') {
        const ok = s.scaled >= -1 && s.scaled <= 1;
        checks.push({ label: `${path}.score.scaled`, ok, detail: ok ? `${s.scaled}` : 'scaled must be between -1 and 1' });
      }
      if (typeof s.min === 'number' && typeof s.max === 'number') {
        checks.push({ label: `${path}.score range`, ok: s.min <= s.max, detail: s.min <= s.max ? `min ${s.min} ≤ max ${s.max}` : `min ${s.min} exceeds max ${s.max}` });
      }
      if (typeof s.raw === 'number' && typeof s.min === 'number' && typeof s.max === 'number') {
        const ok = s.raw >= s.min && s.raw <= s.max;
        checks.push({ label: `${path}.score.raw`, ok, detail: ok ? `raw ${s.raw} within [${s.min}, ${s.max}]` : `raw ${s.raw} outside [${s.min}, ${s.max}]` });
      }
    }
  }
  if (result.duration !== undefined) {
    const ok = typeof result.duration === 'string' && ISO8601_DURATION_RE.test(result.duration);
    checks.push({ label: `${path}.duration`, ok, detail: ok ? 'Valid ISO 8601 duration' : 'Expected ISO 8601 duration, e.g. PT15M30S' });
  }
  if (result.response !== undefined) {
    checks.push({ label: `${path}.response`, ok: typeof result.response === 'string', detail: typeof result.response === 'string' ? `"${String(result.response).slice(0, 40)}"` : 'response must be a string' });
  }
  checkExtensions(result, path, checks);
}

function validateContext(context, path, checks) {
  if (!isPlainObject(context)) {
    checks.push({ label: path, ok: false, detail: 'context must be an object' });
    return;
  }
  if (context.registration !== undefined) {
    const ok = UUID_RE.test(context.registration);
    checks.push({ label: `${path}.registration`, ok, detail: ok ? 'Valid UUID' : 'registration must be a UUID' });
  }
  if (context.instructor !== undefined) {
    if (isPlainObject(context.instructor)) validateActor(context.instructor, `${path}.instructor`, checks);
    else checks.push({ label: `${path}.instructor`, ok: false, detail: 'instructor must be an Agent or Group object' });
  }
  if (context.team !== undefined) {
    if (isPlainObject(context.team) && (context.team.objectType === undefined || context.team.objectType === 'Group')) {
      validateActor(context.team, `${path}.team`, checks);
    } else {
      checks.push({ label: `${path}.team`, ok: false, detail: 'team must be a Group object' });
    }
  }
  if (context.contextActivities !== undefined) {
    const ca = context.contextActivities;
    if (!isPlainObject(ca)) {
      checks.push({ label: `${path}.contextActivities`, ok: false, detail: 'contextActivities must be an object' });
    } else {
      for (const key of Object.keys(ca)) {
        if (!CONTEXT_ACTIVITY_KEYS.includes(key)) {
          checks.push({ label: `${path}.contextActivities.${key}`, ok: false, detail: `Unknown key — allowed: ${CONTEXT_ACTIVITY_KEYS.join(', ')}` });
          continue;
        }
        const arr = Array.isArray(ca[key]) ? ca[key] : [ca[key]];
        if (!Array.isArray(ca[key])) {
          checks.push({ label: `${path}.contextActivities.${key}`, ok: null, detail: 'Should be an array of Activity objects (single object accepted by most LRSs)' });
        }
        arr.forEach((a, i) => {
          if (isPlainObject(a)) validateObject(a, `${path}.contextActivities.${key}[${i}]`, checks);
          else checks.push({ label: `${path}.contextActivities.${key}[${i}]`, ok: false, detail: 'Each entry must be an Activity object' });
        });
      }
    }
  }
  if (context.language !== undefined) {
    const ok = typeof context.language === 'string' && LANG_TAG_RE.test(context.language);
    checks.push({ label: `${path}.language`, ok, detail: ok ? `Language tag "${context.language}"` : 'Expected a BCP-47 language tag, e.g. en-US' });
  }
  if (context.platform !== undefined) {
    checks.push({ label: `${path}.platform`, ok: typeof context.platform === 'string', detail: typeof context.platform === 'string' ? `"${context.platform}"` : 'platform must be a string' });
  }
  if (context.revision !== undefined) {
    checks.push({ label: `${path}.revision`, ok: typeof context.revision === 'string', detail: typeof context.revision === 'string' ? `"${context.revision}"` : 'revision must be a string' });
  }
  if (context.statement !== undefined) {
    const ok = isPlainObject(context.statement) && context.statement.objectType === 'StatementRef' && UUID_RE.test(context.statement.id || '');
    checks.push({ label: `${path}.statement`, ok, detail: ok ? 'Valid StatementRef' : 'Must be a StatementRef: {objectType:"StatementRef", id: "<uuid>"}' });
  }
  checkExtensions(context, path, checks);
}

function validateTimestamp(ts, path, checks) {
  const ok = typeof ts === 'string' && ISO8601_RE.test(ts) && !Number.isNaN(Date.parse(ts));
  checks.push({ label: path, ok, detail: ok ? 'Valid ISO 8601 timestamp' : 'Expected ISO 8601 with timezone, e.g. 2026-10-25T14:30:00Z' });
}

function validateAttachments(attachments, checks) {
  if (!Array.isArray(attachments)) {
    checks.push({ label: 'attachments', ok: false, detail: 'attachments must be an array' });
    return;
  }
  attachments.forEach((a, i) => {
    const p = `attachments[${i}]`;
    if (!isPlainObject(a)) {
      checks.push({ label: p, ok: false, detail: 'Each attachment must be an object' });
      return;
    }
    const usageOk = isIri(a.usageType);
    checks.push({ label: `${p}.usageType`, ok: usageOk, detail: usageOk ? a.usageType : 'usageType is required and must be an IRI' });
    if (a.display !== undefined) {
      checks.push({ label: `${p}.display`, ok: isLangMap(a.display), detail: isLangMap(a.display) ? 'Valid language map' : 'display is required and must be a language map' });
    } else {
      checks.push({ label: `${p}.display`, ok: false, detail: 'display language map is required' });
    }
    if (a.description !== undefined) {
      checks.push({ label: `${p}.description`, ok: isLangMap(a.description), detail: isLangMap(a.description) ? 'Valid language map' : 'description must be a language map' });
    }
    for (const key of ['contentType', 'length', 'sha2']) {
      if (a[key] === undefined) {
        checks.push({ label: `${p}.${key}`, ok: false, detail: `${key} is required` });
      }
    }
    if (a.sha2 !== undefined && !SHA2_RE.test(a.sha2)) {
      checks.push({ label: `${p}.sha2`, ok: false, detail: 'sha2 should be a 64-char SHA-256 hex digest' });
    }
    if (a.fileUrl !== undefined) {
      checks.push({ label: `${p}.fileUrl`, ok: isIri(a.fileUrl), detail: isIri(a.fileUrl) ? 'Valid IRI' : 'fileUrl must be an IRI' });
    }
  });
}

export function validateStatement(text) {
  const result = { valid: false, checks: [], statement: null, error: null };
  const checks = result.checks;

  let stmt;
  try {
    stmt = JSON.parse(text);
  } catch (e) {
    checks.push({ label: 'JSON syntax', ok: false, detail: e.message });
    result.error = 'Invalid JSON — statement could not be parsed';
    return result;
  }
  checks.push({ label: 'JSON syntax', ok: true, detail: 'Parses cleanly' });

  if (Array.isArray(stmt)) {
    checks.push({ label: 'Root type', ok: null, detail: `Array of ${stmt.length} statements — validating the first one only` });
    stmt = stmt[0];
  }
  if (!isPlainObject(stmt)) {
    checks.push({ label: 'Root type', ok: false, detail: 'Statement must be a JSON object' });
    result.error = 'Not an xAPI statement object';
    return result;
  }
  result.statement = stmt;

  for (const required of ['actor', 'verb', 'object']) {
    if (stmt[required] === undefined) {
      checks.push({ label: `Required: ${required}`, ok: false, detail: `"${required}" is a mandatory statement property` });
    }
  }
  const missing = ['actor', 'verb', 'object'].filter((k) => stmt[k] === undefined);

  for (const key of Object.keys(stmt)) {
    if (!STATEMENT_KEYS.includes(key)) {
      checks.push({ label: `Unknown property "${key}"`, ok: null, detail: 'Not a core xAPI property — LRSs will ignore or reject it' });
    }
  }

  if (stmt.id !== undefined) {
    const ok = UUID_RE.test(stmt.id);
    checks.push({ label: 'id', ok, detail: ok ? 'Valid UUID' : 'id must be a UUID' });
  }
  if (stmt.version !== undefined) {
    const ok = /^[12]\.\d+\.\d+$/.test(stmt.version);
    checks.push({ label: 'version', ok, detail: ok ? stmt.version : 'Expected e.g. "1.0.3" or "2.0.0"' });
  }

  if (!missing.includes('actor')) {
    if (isPlainObject(stmt.actor)) validateActor(stmt.actor, 'actor', checks);
    else checks.push({ label: 'actor', ok: false, detail: 'actor must be an Agent or Group object' });
  }
  if (!missing.includes('verb')) validateVerb(stmt.verb, 'verb', checks);
  if (!missing.includes('object')) validateObjectField(stmt.object, 'object', checks);

  if (stmt.result !== undefined) validateResult(stmt.result, 'result', checks);
  if (stmt.context !== undefined) validateContext(stmt.context, 'context', checks);
  if (stmt.timestamp !== undefined) validateTimestamp(stmt.timestamp, 'timestamp', checks);
  if (stmt.stored !== undefined) validateTimestamp(stmt.stored, 'stored', checks);
  if (typeof stmt.timestamp === 'string' && typeof stmt.stored === 'string'
    && ISO8601_RE.test(stmt.timestamp) && ISO8601_RE.test(stmt.stored)
    && Date.parse(stmt.stored) < Date.parse(stmt.timestamp)) {
    checks.push({ label: 'stored vs timestamp', ok: null, detail: 'stored predates timestamp — unusual but legal' });
  }
  if (stmt.authority !== undefined) {
    if (isPlainObject(stmt.authority)) {
      validateActor(stmt.authority, 'authority', checks);
      if (stmt.authority.objectType === 'Group' && Array.isArray(stmt.authority.member)) {
        const ok = stmt.authority.member.length === 2;
        checks.push({ label: 'authority group', ok, detail: ok ? 'Two-member group (OAuth pair)' : 'An authority Group must have exactly 2 members' });
      }
    } else {
      checks.push({ label: 'authority', ok: false, detail: 'authority must be an Agent or Group object' });
    }
  }
  if (stmt.attachments !== undefined) validateAttachments(stmt.attachments, checks);

  result.valid = !checks.some((c) => c.ok === false) && missing.length === 0;
  return result;
}

export function buildStatement({ actorName, actorEmail, verbId, activityId, activityName, activityType, completed, success, scoreScaled, duration, platform, language, registration }) {
  const stmt = {
    actor: {
      objectType: 'Agent',
      mbox: `mailto:${actorEmail}`,
    },
    verb: {
      id: verbId,
      display: { 'en-US': verbId.split('/').pop() },
    },
    object: {
      objectType: 'Activity',
      id: activityId,
      definition: {
        name: { 'en-US': activityName },
      },
    },
  };
  if (actorName) stmt.actor.name = actorName;
  if (activityType) stmt.object.definition.type = activityType;

  const result = {};
  if (completed) result.completion = true;
  if (success !== '') result.success = success === 'true';
  if (scoreScaled !== '') result.score = { scaled: parseFloat(scoreScaled) };
  if (duration) result.duration = duration;
  if (Object.keys(result).length > 0) stmt.result = result;

  const context = {};
  if (platform) context.platform = platform;
  if (language) context.language = language;
  if (registration) context.registration = registration;
  if (Object.keys(context).length > 0) stmt.context = context;

  stmt.timestamp = new Date().toISOString();
  if (typeof crypto !== 'undefined' && crypto.randomUUID) stmt.id = crypto.randomUUID();
  return stmt;
}

export const XAPI_EXAMPLES = [
  {
    label: 'Completed course (scored)',
    json: {
      actor: { objectType: 'Agent', name: 'Jane Doe', mbox: 'mailto:jane@example.com' },
      verb: { id: 'http://adlnet.gov/expapi/verbs/completed', display: { 'en-US': 'completed' } },
      object: {
        objectType: 'Activity',
        id: 'https://lms.example.com/courses/dora-awareness',
        definition: {
          name: { 'en-US': 'DORA Awareness Training' },
          type: 'http://adlnet.gov/expapi/activities/course',
        },
      },
      result: { completion: true, success: true, score: { scaled: 0.92, raw: 46, min: 0, max: 50 }, duration: 'PT45M12S' },
      context: { platform: 'Academy LMS', language: 'en-US', registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8a7' },
      timestamp: '2026-10-25T14:30:00Z',
    },
  },
  {
    label: 'Answered question',
    json: {
      actor: { objectType: 'Agent', mbox: 'mailto:learner@example.com' },
      verb: { id: 'http://adlnet.gov/expapi/verbs/answered', display: { 'en-US': 'answered' } },
      object: {
        objectType: 'Activity',
        id: 'https://lms.example.com/quizzes/q-0412',
        definition: {
          name: { 'en-US': 'Which regulation governs EU ICT risk?' },
          type: 'http://adlnet.gov/expapi/activities/question',
          interactionType: 'choice',
          correctResponsesPattern: ['dora'],
        },
      },
      result: { response: 'dora', success: true },
      context: {
        contextActivities: {
          parent: [{ objectType: 'Activity', id: 'https://lms.example.com/quizzes/regulatory-basics' }],
        },
      },
      timestamp: '2026-10-25T09:15:30Z',
    },
  },
  {
    label: 'Broken statement (find the errors)',
    json: {
      actor: { name: 'Bad Actor', mbox: 'not-an-email' },
      verb: { id: 'completed' },
      object: { id: 'course-123' },
      result: { score: { scaled: 1.7 }, completion: 'yes' },
      timestamp: 'Tuesday afternoon',
    },
  },
];
