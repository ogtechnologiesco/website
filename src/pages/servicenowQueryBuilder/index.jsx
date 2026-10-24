import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';

const OPERATOR_GROUPS = [
  { label: 'Comparison', ops: ['=', '!=', '>', '<', '>=', '<='] },
  { label: 'String', ops: ['LIKE', 'NOTLIKE', 'CONTAINS', 'DOESNOTCONTAIN', 'STARTSWITH', 'ENDSWITH'] },
  { label: 'List', ops: ['IN', 'NOTIN', 'BETWEEN', 'ONEOF'] },
  { label: 'Date & Time', ops: ['ON', 'NOTON', 'BEFORE', 'AFTER', 'DATEPART', 'RELATIVE', 'TREND', 'MORETHAN', 'LESSTHAN'] },
  { label: 'Empty / Changes', ops: ['ISEMPTY', 'ISNOTEMPTY', 'ISEMPTYSTRING', 'EMPTYSTRING', 'ANYTHING', 'VALCHANGES', 'CHANGESFROM', 'CHANGESTO'] },
  { label: 'Field Comparison', ops: ['SAMEAS', 'NSAMEAS', 'GT_FIELD', 'LT_FIELD', 'GT_OR_EQUALS_FIELD', 'LT_OR_EQUALS_FIELD'] },
  { label: 'Other', ops: ['DYNAMIC', 'INSTANCEOF'] },
];

const NO_VALUE_OPERATORS = new Set([
  'ISEMPTY', 'ISNOTEMPTY', 'ISEMPTYSTRING', 'EMPTYSTRING', 'ANYTHING', 'VALCHANGES',
]);

const KNOWN_OPERATORS = [
  '=', '!=', '>', '<', '>=', '<=',
  'LIKE', 'NOTLIKE', 'CONTAINS', 'DOESNOTCONTAIN', 'STARTSWITH', 'ENDSWITH',
  'IN', 'NOTIN', 'INSTRING', 'NOTINSTRING', 'BETWEEN', 'ONEOF',
  'ON', 'NOTON', 'BEFORE', 'AFTER', 'AT', 'DATEPART', 'RELATIVE', 'TREND', 'MORETHAN', 'LESSTHAN',
  'ISEMPTY', 'ISNOTEMPTY', 'ISEMPTYSTRING', 'EMPTYSTRING', 'ANYTHING',
  'VALCHANGES', 'CHANGESFROM', 'CHANGESTO',
  'SAMEAS', 'NSAMEAS', 'GT_FIELD', 'LT_FIELD', 'GT_OR_EQUALS_FIELD', 'LT_OR_EQUALS_FIELD',
  'DYNAMIC', 'INSTANCEOF',
];

// Longest-first ordering so prefix operators (e.g. IN vs INSTANCEOF, ISEMPTY vs
// ISEMPTYSTRING, > vs >=) always match correctly during parsing. Field names are
// restricted to lowercase — ServiceNow column names never contain uppercase, and
// this is what separates the field name from the uppercase operator.
const CONDITION_REGEX = new RegExp(
  `^([a-z0-9_.]+)(${KNOWN_OPERATORS.slice().sort((a, b) => b.length - a.length).join('|')})([\\s\\S]*)$`
);

const COMMON_FIELDS = [
  'number', 'sys_id', 'state', 'incident_state', 'priority', 'urgency', 'impact', 'severity',
  'category', 'subcategory', 'assignment_group', 'assigned_to', 'caller_id', 'opened_by',
  'short_description', 'description', 'work_notes', 'comments', 'active',
  'sys_created_on', 'sys_updated_on', 'opened_at', 'resolved_at', 'closed_at', 'due_date',
  'cmdb_ci', 'service_offering', 'company', 'location', 'department',
  'contact_type', 'approval', 'close_code', 'sla_due',
];

let nextId = 1;
const newCondition = (joiner = 'AND') => ({ id: nextId++, joiner, field: '', operator: '=', value: '' });

function buildEncodedQuery(conditions) {
  return conditions
    .filter((c) => c.field.trim())
    .map((c, i) => {
      const cond = NO_VALUE_OPERATORS.has(c.operator)
        ? `${c.field.trim()}${c.operator}`
        : `${c.field.trim()}${c.operator}${c.value.trim()}`;
      if (i === 0) return cond;
      if (c.joiner === 'OR') return `^OR${cond}`;
      if (c.joiner === 'NQ') return `^NQ${cond}`;
      return `^${cond}`;
    })
    .join('');
}

function extractQueryText(input) {
  let s = input.trim();
  const m = s.match(/sysparm_query=([^&\s]+)/);
  if (m) s = m[1];
  try {
    s = decodeURIComponent(s);
  } catch (e) {
    // keep raw text if it isn't valid percent-encoding
  }
  return s;
}

function parseEncodedQuery(input) {
  const s = extractQueryText(input);
  if (!s) return { conditions: [], errors: [] };

  const conditions = [];
  const errors = [];

  s.split('^').forEach((segment, index) => {
    if (segment === '') return;

    let joiner = index === 0 ? 'WHERE' : 'AND';
    let rest = segment;
    if (index > 0 && /^NQ/.test(rest)) {
      joiner = 'NQ';
      rest = rest.slice(2);
    } else if (index > 0 && /^OR/.test(rest)) {
      joiner = 'OR';
      rest = rest.slice(2);
    }

    const m = rest.match(CONDITION_REGEX);
    if (!m) {
      errors.push(`Could not parse "${segment}" — expected field + operator + value`);
      return;
    }
    conditions.push({ joiner, field: m[1], operator: m[2], value: m[3] });
  });

  if (conditions.length === 0 && errors.length === 0) {
    errors.push('No conditions found in the query');
  }

  return { conditions, errors };
}

function ServiceNowQueryBuilder() {
  const [mode, setMode] = useState('build');
  const [conditions, setConditions] = useState([
    { id: nextId++, joiner: 'AND', field: 'active', operator: '=', value: 'true' },
    { id: nextId++, joiner: 'AND', field: 'priority', operator: '<=', value: '2' },
    { id: nextId++, joiner: 'OR', field: 'assigned_to', operator: 'ISEMPTY', value: '' },
  ]);
  const [parseInput, setParseInput] = useState('active=true^priorityIN1,2^ORassigned_toISEMPTY');
  const [table, setTable] = useState('incident');
  const [instance, setInstance] = useState('yourinstance');

  const query = useMemo(() => buildEncodedQuery(conditions), [conditions]);
  const parsed = useMemo(() => parseEncodedQuery(parseInput), [parseInput]);

  const apiUrl = useMemo(() => {
    if (!query) return '';
    const inst = instance.trim().replace(/\.service-now\.com.*$/, '') || 'yourinstance';
    const tbl = table.trim() || 'incident';
    return `https://${inst}.service-now.com/api/now/table/${tbl}?sysparm_query=${encodeURIComponent(query)}`;
  }, [query, instance, table]);

  const glideScript = useMemo(() => {
    if (!query) return '';
    const tbl = table.trim() || 'incident';
    return [
      `var gr = new GlideRecord('${tbl}');`,
      `gr.addEncodedQuery('${query}');`,
      'gr.query();',
      'while (gr.next()) {',
      '  // process each record',
      '}',
    ].join('\n');
  }, [query, table]);

  const updateCondition = (id, key, value) => {
    setConditions((prev) => prev.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
  };

  const removeCondition = (id) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  };

  const loadIntoBuilder = () => {
    if (parsed.conditions.length === 0) return;
    setConditions(
      parsed.conditions.map((c) => ({
        id: nextId++,
        joiner: c.joiner === 'NQ' ? 'NQ' : c.joiner === 'OR' ? 'OR' : 'AND',
        field: c.field,
        operator: c.operator,
        value: c.value,
      }))
    );
    setMode('build');
  };

  const inputClass = 'w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm';

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>ServiceNow Encoded Query Builder - Free Online Tool | OG Technologies EU</title>
        <meta name="description" content="Build and decode ServiceNow encoded queries visually — ^, ^OR, and ^NQ joiners with all operators (CONTAINS, IN, BETWEEN, ISEMPTY, ON). Generates sysparm_query URLs and GlideRecord scripts. 100% client-side." />
        <meta name="keywords" content="ServiceNow encoded query, sysparm_query, encoded query builder, GlideRecord addEncodedQuery, ServiceNow Table API, ServiceNow filter, ServiceNow query builder, ^OR ^NQ" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/servicenow-query-builder/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/servicenow-query-builder/" />
        <meta property="og:title" content="ServiceNow Encoded Query Builder - Free Online Tool | OG Technologies EU" />
        <meta property="og:description" content="Build and decode ServiceNow encoded queries visually — generates sysparm_query URLs and GlideRecord scripts. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/servicenow-query-builder/" />
        <meta name="twitter:title" content="ServiceNow Encoded Query Builder - Free Online Tool | OG Technologies EU" />
        <meta name="twitter:description" content="Build and decode ServiceNow encoded queries visually — generates sysparm_query URLs and GlideRecord scripts. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
      </Helmet>

      <Header />

      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1">ServiceNow Encoded Query Builder</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Build ServiceNow encoded queries with a visual condition editor, or paste an existing
                  query to decode it. Generates <code>sysparm_query</code> URLs and GlideRecord scripts.
                  Everything runs in your browser — no data is sent to any server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="flex gap-2 mb-6">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        mode === 'build' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setMode('build')}
                    >
                      Build Query
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        mode === 'decode' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setMode('decode')}
                    >
                      Decode Query
                    </button>
                  </div>

                  {mode === 'build' && (
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Conditions</label>
                      <div className="space-y-3 mb-4">
                        {conditions.map((c, i) => (
                          <div key={c.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                            <div className="md:col-span-2">
                              {i === 0 ? (
                                <span className="block text-center text-xs font-semibold text-purple-300 bg-gray-700 rounded-md py-2.5 border border-gray-600">
                                  WHERE
                                </span>
                              ) : (
                                <select
                                  value={c.joiner}
                                  onChange={(e) => updateCondition(c.id, 'joiner', e.target.value)}
                                  className="w-full bg-gray-700 text-white px-2 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                                >
                                  <option value="AND">AND (^)</option>
                                  <option value="OR">OR (^OR)</option>
                                  <option value="NQ">New Query (^NQ)</option>
                                </select>
                              )}
                            </div>
                            <div className="md:col-span-4">
                              <input
                                type="text"
                                list="sn-fields"
                                value={c.field}
                                onChange={(e) => updateCondition(c.id, 'field', e.target.value)}
                                className={inputClass}
                                placeholder="field (e.g. assigned_to)"
                              />
                            </div>
                            <div className="md:col-span-3">
                              <select
                                value={c.operator}
                                onChange={(e) => updateCondition(c.id, 'operator', e.target.value)}
                                className="w-full bg-gray-700 text-white px-2 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                              >
                                {OPERATOR_GROUPS.map((g) => (
                                  <optgroup key={g.label} label={g.label}>
                                    {g.ops.map((op) => (
                                      <option key={op} value={op}>{op}</option>
                                    ))}
                                  </optgroup>
                                ))}
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <input
                                type="text"
                                value={c.value}
                                onChange={(e) => updateCondition(c.id, 'value', e.target.value)}
                                disabled={NO_VALUE_OPERATORS.has(c.operator)}
                                className={`${inputClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                                placeholder={NO_VALUE_OPERATORS.has(c.operator) ? '(no value)' : 'value'}
                              />
                            </div>
                            <div className="md:col-span-1 text-right">
                              <button
                                type="button"
                                onClick={() => removeCondition(c.id)}
                                disabled={conditions.length === 1}
                                className="px-3 py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                                aria-label="Remove condition"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <datalist id="sn-fields">
                        {COMMON_FIELDS.map((f) => (
                          <option key={f} value={f} />
                        ))}
                      </datalist>

                      <button
                        type="button"
                        onClick={() => setConditions((prev) => [...prev, newCondition()])}
                        className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors text-sm font-medium mb-6"
                      >
                        + Add condition
                      </button>
                    </div>
                  )}

                  {mode === 'decode' && (
                    <div className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Encoded query, sysparm_query value, or Table API URL
                      </label>
                      <textarea
                        value={parseInput}
                        onChange={(e) => setParseInput(e.target.value)}
                        rows={3}
                        className={inputClass}
                        placeholder="active=true^priorityIN1,2^ORassigned_toISEMPTY"
                      />

                      {parsed.errors.length > 0 && (
                        <div className="mt-3">
                          {parsed.errors.map((err, i) => (
                            <p key={i} className="text-xs text-red-400">{err}</p>
                          ))}
                        </div>
                      )}

                      {parsed.conditions.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-300 text-sm font-medium">Decoded conditions</span>
                            <button
                              type="button"
                              onClick={loadIntoBuilder}
                              className="text-xs px-3 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                            >
                              Load into builder
                            </button>
                          </div>
                          <div className="bg-gray-700 rounded-md overflow-hidden">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="text-left text-gray-400 border-b border-gray-600">
                                  <th className="px-4 py-2 font-medium">Joiner</th>
                                  <th className="px-4 py-2 font-medium">Field</th>
                                  <th className="px-4 py-2 font-medium">Operator</th>
                                  <th className="px-4 py-2 font-medium">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {parsed.conditions.map((c, i) => (
                                  <tr key={i} className="border-b border-gray-600/50 last:border-0">
                                    <td className="px-4 py-2 text-purple-300 font-mono">{c.joiner}</td>
                                    <td className="px-4 py-2 text-gray-200 font-mono break-all">{c.field}</td>
                                    <td className="px-4 py-2 text-gray-200 font-mono">{c.operator}</td>
                                    <td className="px-4 py-2 text-gray-200 font-mono break-all">{c.value || '—'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {mode === 'build' && query && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Table (for script & URL output)</label>
                          <input
                            type="text"
                            value={table}
                            onChange={(e) => setTable(e.target.value)}
                            className={inputClass}
                            placeholder="incident"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Instance name (for URL output)</label>
                          <input
                            type="text"
                            value={instance}
                            onChange={(e) => setInstance(e.target.value)}
                            className={inputClass}
                            placeholder="yourinstance"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Encoded query</label>
                          <div className="flex items-start gap-3 bg-gray-700 rounded-md px-4 py-3">
                            <code className="text-purple-300 font-mono text-sm break-all flex-1">{query}</code>
                            <button
                              type="button"
                              onClick={() => navigator.clipboard.writeText(query)}
                              className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">sysparm_query (URL-encoded)</label>
                          <div className="flex items-start gap-3 bg-gray-700 rounded-md px-4 py-3">
                            <code className="text-purple-300 font-mono text-sm break-all flex-1">sysparm_query={encodeURIComponent(query)}</code>
                            <button
                              type="button"
                              onClick={() => navigator.clipboard.writeText(`sysparm_query=${encodeURIComponent(query)}`)}
                              className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Table API URL</label>
                          <div className="flex items-start gap-3 bg-gray-700 rounded-md px-4 py-3">
                            <code className="text-purple-300 font-mono text-sm break-all flex-1">{apiUrl}</code>
                            <button
                              type="button"
                              onClick={() => navigator.clipboard.writeText(apiUrl)}
                              className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">GlideRecord script</label>
                          <div className="relative bg-gray-700 rounded-md px-4 py-3">
                            <pre className="text-purple-300 font-mono text-sm whitespace-pre-wrap break-all">{glideScript}</pre>
                            <button
                              type="button"
                              onClick={() => navigator.clipboard.writeText(glideScript)}
                              className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 text-xs text-gray-500">
                    <p><strong>Joiners:</strong> <code>^</code> = AND, <code>^OR</code> = OR, <code>^NQ</code> = New Query (top-level OR group).</p>
                    <p className="mt-1"><strong>Common operators:</strong> =, !=, CONTAINS, STARTSWITH, ENDSWITH, IN, NOTIN, BETWEEN, ISEMPTY, ISNOTEMPTY, ON, BEFORE, AFTER, SAMEAS, GT_FIELD.</p>
                    <p className="mt-1"><strong>BETWEEN</strong> uses <code>value1@value2</code> (e.g. <code>priorityBETWEEN1@3</code>). <strong>IN</strong> uses comma-separated values (e.g. <code>stateIN1,2,3</code>). Date operators accept relative values like <code>Last 7 days</code> or <code>Today</code>.</p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mt-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">What is a ServiceNow encoded query?</h3>
                      <p className="text-sm">
                        An encoded query is ServiceNow's compact condition syntax — <code className="text-purple-300">field + operator + value</code> pairs
                        joined by <code className="text-purple-300">^</code> (AND), <code className="text-purple-300">^OR</code> (OR),
                        or <code className="text-purple-300">^NQ</code> (new query group). The same string works in list
                        filters, <code className="text-purple-300">GlideRecord.addEncodedQuery()</code>, and the Table
                        API's <code className="text-purple-300">sysparm_query</code> parameter.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">How do I use this with the Table API?</h3>
                      <p className="text-sm">
                        Enter your instance name and table, then copy the generated Table API URL — the query is already
                        URL-encoded in the <code className="text-purple-300">sysparm_query</code> parameter. Send it as a GET
                        request with Basic Auth or an OAuth Bearer token. Add <code className="text-purple-300">sysparm_fields</code>,
                        <code className="text-purple-300"> sysparm_limit</code>, and other parameters as needed.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">What does ^NQ (New Query) do?</h3>
                      <p className="text-sm">
                        <code className="text-purple-300">^NQ</code> starts a new top-level query group that is OR'd with
                        everything before it. It's how you express <em>(A AND B) OR (C AND D)</em> in flat encoded-query
                        syntax — equivalent to clicking "New Query" in the list filter designer.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Is it safe to paste queries here?</h3>
                      <p className="text-sm">
                        Yes. Building and decoding run entirely in your browser — nothing is sent to a server or stored.
                        You can verify this in your browser's network tab.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ServiceNowQueryBuilder;
