import React, { useState, useMemo } from 'react';

const SAMPLE_XSD = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="shiporder">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="orderperson" type="xs:string"/>
        <xs:element name="shipto">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="name" type="xs:string"/>
              <xs:element name="address" type="xs:string"/>
              <xs:element name="city" type="xs:string"/>
              <xs:element name="country" type="xs:string"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
        <xs:element name="item" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="title" type="xs:string"/>
              <xs:element name="quantity" type="xs:positiveInteger"/>
              <xs:element name="price" type="xs:decimal"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
      <xs:attribute name="orderid" type="xs:string" use="required"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`;

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<shiporder orderid="ORD-1042">
  <orderperson>Jane Doe</orderperson>
  <shipto>
    <name>Acme GmbH</name>
    <address>Donau-City-Strasse 7</address>
    <city>Vienna</city>
    <country>Austria</country>
  </shipto>
  <item>
    <title>USB-C Cable</title>
    <quantity>3</quantity>
    <price>9.90</price>
  </item>
  <item>
    <title>Docking Station</title>
    <quantity>1</quantity>
    <price>149.00</price>
  </item>
</shiporder>`;

const BUILTIN = {
  string: () => true,
  normalizedString: () => true,
  token: () => true,
  anyURI: () => true,
  boolean: (v) => /^(true|false|0|1)$/.test(v),
  decimal: (v) => /^-?\d+(\.\d+)?$/.test(v),
  float: (v) => /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(v) || /^(INF|-INF|NaN)$/.test(v),
  double: (v) => BUILTIN.float(v),
  integer: (v) => /^-?\d+$/.test(v),
  int: (v) => /^-?\d+$/.test(v) && +v >= -2147483648 && +v <= 2147483647,
  long: (v) => /^-?\d+$/.test(v),
  short: (v) => /^-?\d+$/.test(v) && +v >= -32768 && +v <= 32767,
  byte: (v) => /^-?\d+$/.test(v) && +v >= -128 && +v <= 127,
  nonNegativeInteger: (v) => /^-?\d+$/.test(v) && +v >= 0,
  positiveInteger: (v) => /^-?\d+$/.test(v) && +v >= 1,
  nonPositiveInteger: (v) => /^-?\d+$/.test(v) && +v <= 0,
  negativeInteger: (v) => /^-?\d+$/.test(v) && +v <= -1,
  unsignedLong: (v) => /^\d+$/.test(v),
  unsignedInt: (v) => /^\d+$/.test(v) && +v <= 4294967295,
  unsignedShort: (v) => /^\d+$/.test(v) && +v <= 65535,
  unsignedByte: (v) => /^\d+$/.test(v) && +v <= 255,
  date: (v) => /^\d{4}-\d{2}-\d{2}(Z|[+-]\d{2}:\d{2})?$/.test(v) && !isNaN(Date.parse(v)),
  dateTime: (v) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(v) && !isNaN(Date.parse(v)),
  time: (v) => /^\d{2}:\d{2}:\d{2}/.test(v),
  gYear: (v) => /^\d{4}/.test(v),
  gYearMonth: (v) => /^\d{4}-\d{2}/.test(v),
  duration: (v) => /^-?P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/.test(v),
  QName: (v) => /^[A-Za-z_][\w.-]*(:[\w.-]+)?$/.test(v),
  NCName: (v) => /^[A-Za-z_][\w.-]*$/.test(v),
  ID: (v) => BUILTIN.NCName(v),
  IDREF: (v) => BUILTIN.NCName(v),
  NMTOKEN: (v) => /^[\w.-]+$/.test(v),
  language: (v) => /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/.test(v),
};

const localName = (el) => el.localName || el.nodeName.split(':').pop();
const typeName = (t) => (t ? t.split(':').pop() : null);

function parseSimpleType(el, schema) {
  // el: xs:simpleType node -> { base, facets: {enumeration:[], pattern, minLength, ...} }
  const restriction = Array.from(el.children).find((c) => localName(c) === 'restriction');
  if (!restriction) return { base: 'string', facets: {} };
  const facets = {};
  Array.from(restriction.children).forEach((f) => {
    const n = localName(f);
    const val = f.getAttribute('value');
    if (n === 'enumeration') {
      (facets.enumeration = facets.enumeration || []).push(val);
    } else if (['pattern', 'minLength', 'maxLength', 'length', 'minInclusive', 'maxInclusive', 'minExclusive', 'maxExclusive', 'totalDigits', 'fractionDigits', 'whiteSpace'].includes(n)) {
      facets[n] = val;
    }
  });
  return { base: typeName(restriction.getAttribute('base')) || 'string', facets };
}

function parseParticles(container) {
  // returns list of {kind:'element'|'sequence'|'choice'|'all', ...}
  return Array.from(container.children)
    .map((c) => {
      const n = localName(c);
      if (n === 'element') {
        return {
          kind: 'element',
          name: c.getAttribute('name'),
          ref: c.getAttribute('ref'),
          type: c.getAttribute('type'),
          minOccurs: c.getAttribute('minOccurs') == null ? 1 : parseInt(c.getAttribute('minOccurs'), 10),
          maxOccurs: c.getAttribute('maxOccurs') === 'unbounded' ? Infinity : c.getAttribute('maxOccurs') == null ? 1 : parseInt(c.getAttribute('maxOccurs'), 10),
          node: c,
        };
      }
      if (['sequence', 'choice', 'all'].includes(n)) {
        return {
          kind: n,
          minOccurs: c.getAttribute('minOccurs') == null ? 1 : parseInt(c.getAttribute('minOccurs'), 10),
          maxOccurs: c.getAttribute('maxOccurs') === 'unbounded' ? Infinity : c.getAttribute('maxOccurs') == null ? 1 : parseInt(c.getAttribute('maxOccurs'), 10),
          children: parseParticles(c),
        };
      }
      return null;
    })
    .filter(Boolean);
}

function parseComplexType(el) {
  const attrs = [];
  let particles = [];
  let simpleContentBase = null;
  Array.from(el.children).forEach((c) => {
    const n = localName(c);
    if (['sequence', 'choice', 'all'].includes(n)) particles = particles.concat(parseParticles(el));
    else if (n === 'attribute') {
      attrs.push({
        name: c.getAttribute('name'),
        type: typeName(c.getAttribute('type')) || 'string',
        use: c.getAttribute('use') || 'optional',
        node: c,
      });
    } else if (n === 'simpleContent') {
      const ext = Array.from(c.children).find((x) => ['extension', 'restriction'].includes(localName(x)));
      if (ext) {
        simpleContentBase = typeName(ext.getAttribute('base')) || 'string';
        Array.from(ext.children).forEach((a) => {
          if (localName(a) === 'attribute') {
            attrs.push({ name: a.getAttribute('name'), type: typeName(a.getAttribute('type')) || 'string', use: a.getAttribute('use') || 'optional', node: a });
          }
        });
      }
    }
  });
  return { particles, attrs, simpleContentBase, mixed: el.getAttribute('mixed') === 'true' };
}

function resolveType(schema, el) {
  // inline complexType / simpleType wins, then type= ref, then default any
  const inlineC = Array.from(el.children).find((c) => localName(c) === 'complexType');
  const inlineS = Array.from(el.children).find((c) => localName(c) === 'simpleType');
  if (inlineC) return { kind: 'complex', model: parseComplexType(inlineC) };
  if (inlineS) return { kind: 'simple', model: parseSimpleType(inlineS, schema) };
  const t = typeName(el.getAttribute('type'));
  if (!t) return { kind: 'any' };
  if (schema.complexTypes[t]) return { kind: 'complex', model: schema.complexTypes[t] };
  if (schema.simpleTypes[t]) return { kind: 'simple', model: schema.simpleTypes[t] };
  return { kind: 'builtin', model: t };
}

function buildSchema(xsdDoc) {
  const schema = { elements: {}, complexTypes: {}, simpleTypes: {} };
  const root = xsdDoc.documentElement;
  Array.from(root.children).forEach((c) => {
    const n = localName(c);
    if (n === 'element' && c.getAttribute('name')) schema.elements[c.getAttribute('name')] = c;
    else if (n === 'complexType' && c.getAttribute('name')) schema.complexTypes[c.getAttribute('name')] = parseComplexType(c);
    else if (n === 'simpleType' && c.getAttribute('name')) schema.simpleTypes[c.getAttribute('name')] = parseSimpleType(c, schema);
  });
  return schema;
}

function checkSimple(model, value, path, errors, schema) {
  const label = (v) => `"${v.length > 40 ? v.slice(0, 40) + '…' : v}"`;
  if (model.base) {
    // named or anonymous restriction
    const fn = BUILTIN[model.base] || (() => true);
    if (!fn(value.trim())) errors.push(`${path}: value ${label(value)} is not a valid ${model.base}`);
    const f = model.facets || {};
    if (f.enumeration && !f.enumeration.includes(value)) errors.push(`${path}: ${label(value)} not in enumeration {${f.enumeration.join(', ')}}`);
    if (f.pattern && !(new RegExp(`^(${f.pattern})$`).test(value))) errors.push(`${path}: ${label(value)} does not match pattern ${f.pattern}`);
    if (f.minLength != null && value.length < +f.minLength) errors.push(`${path}: shorter than minLength ${f.minLength}`);
    if (f.maxLength != null && value.length > +f.maxLength) errors.push(`${path}: longer than maxLength ${f.maxLength}`);
    if (f.length != null && value.length !== +f.length) errors.push(`${path}: length must be ${f.length}`);
    if (f.minInclusive != null && +value < +f.minInclusive) errors.push(`${path}: ${value} < minInclusive ${f.minInclusive}`);
    if (f.maxInclusive != null && +value > +f.maxInclusive) errors.push(`${path}: ${value} > maxInclusive ${f.maxInclusive}`);
    return;
  }
  // built-in by name, or a named simpleType ref
  if (schema && schema.simpleTypes && schema.simpleTypes[model]) return checkSimple(schema.simpleTypes[model], value, path, errors, schema);
  const fn = BUILTIN[model] || (() => true);
  if (!fn(value.trim())) errors.push(`${path}: value ${label(value)} is not a valid ${model}`);
}

function matchElementDecl(schema, decl, el, path, errors) {
  const elName = decl.ref ? decl.ref.split(':').pop() : decl.name;
  if (localName(el) !== elName) return false;
  const declNode = decl.ref ? schema.elements[elName] : decl.node;
  if (!declNode) {
    errors.push(`${path}: cannot resolve element declaration ref="${decl.ref}"`);
    return true;
  }
  validateElement(schema, declNode, el, path, errors);
  return true;
}

function validateChildren(schema, particles, el, path, errors) {
  const kids = Array.from(el.children);
  const used = new Array(kids.length).fill(false);

  function walk(p) {
    if (p.kind === 'element') {
      let count = 0;
      for (let i = 0; i < kids.length; i++) {
        if (used[i]) continue;
        const declName = p.ref ? p.ref.split(':').pop() : p.name;
        if (localName(kids[i]) !== declName) continue;
        if (p.kind === 'element' && p.maxOccurs !== Infinity && count >= p.maxOccurs) break;
        used[i] = true;
        count++;
        matchElementDecl(schema, p, kids[i], `${path}/${localName(kids[i])}[${count}]`, errors);
        if (p.maxOccurs !== Infinity && count >= p.maxOccurs) break;
      }
      if (count < p.minOccurs) {
        errors.push(`${path}: missing required element <${p.ref ? p.ref.split(':').pop() : p.name}> (expected at least ${p.minOccurs})`);
      }
      return;
    }
    if (p.kind === 'sequence' || p.kind === 'all') {
      p.children.forEach(walk);
      return;
    }
    if (p.kind === 'choice') {
      // satisfied if any option matched at least once overall — approximate: count matches for each option
      let matched = 0;
      for (let i = 0; i < kids.length; i++) {
        if (used[i]) continue;
        for (const opt of p.children) {
          if (opt.kind !== 'element') continue;
          const declName = opt.ref ? opt.ref.split(':').pop() : opt.name;
          if (localName(kids[i]) === declName) {
            used[i] = true;
            matched++;
            matchElementDecl(schema, opt, kids[i], `${path}/${localName(kids[i])}`, errors);
            break;
          }
        }
      }
      if (matched < p.minOccurs) errors.push(`${path}: required choice did not match any option`);
      return;
    }
  }

  particles.forEach(walk);
  kids.forEach((k, i) => {
    if (!used[i]) errors.push(`${path}: unexpected element <${localName(k)}>`);
  });
}

function validateElement(schema, declNode, el, path, errors) {
  const resolved = resolveType(schema, declNode);
  if (resolved.kind === 'any') return;

  if (resolved.kind === 'builtin') {
    checkSimple(resolved.model, el.textContent.trim(), path, errors, schema);
    if (el.children.length) errors.push(`${path}: <${localName(el)}> should contain only text content of type ${resolved.model}`);
    return;
  }
  if (resolved.kind === 'simple') {
    checkSimple(resolved.model, el.textContent.trim(), path, errors, schema);
    return;
  }
  const model = resolved.model;
  if (model.simpleContentBase) {
    checkSimple(model.simpleContentBase, el.textContent.trim(), path, errors, schema);
  }
  validateChildren(schema, model.particles, el, path, errors);

  const present = new Set(Array.from(el.attributes).map((a) => a.name));
  model.attrs.forEach((a) => {
    if (a.use === 'required' && !present.has(a.name)) {
      errors.push(`${path}: missing required attribute "${a.name}"`);
    }
    if (present.has(a.name)) {
      checkSimple(a.type, el.getAttribute(a.name), `${path}@${a.name}`, errors, schema);
      present.delete(a.name);
    }
  });
  present.forEach((name) => {
    if (name.startsWith('xmlns')) return;
    errors.push(`${path}: attribute "${name}" is not declared`);
  });
}

function validateAgainstSchema(xmlText, xsdText) {
  const parser = new DOMParser();
  const xsdDoc = parser.parseFromString(xsdText, 'application/xml');
  if (xsdDoc.querySelector('parsererror')) return { valid: false, errors: ['XSD: the schema itself is not well-formed XML.'] };
  if (localName(xsdDoc.documentElement) !== 'schema') return { valid: false, errors: ['XSD: root element must be <xs:schema>.'] };

  const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
  const pe = xmlDoc.querySelector('parsererror');
  if (pe) return { valid: false, errors: [`XML is not well-formed: ${pe.textContent.slice(0, 300)}`] };

  const schema = buildSchema(xsdDoc);
  const rootEl = xmlDoc.documentElement;
  const decl = schema.elements[localName(rootEl)];
  const errors = [];
  if (!decl) {
    return {
      valid: false,
      errors: [`No global element declaration found for root <${localName(rootEl)}>. Schema declares: ${Object.keys(schema.elements).join(', ') || '(none)'}`],
    };
  }
  validateElement(schema, decl, rootEl, `/${localName(rootEl)}`, errors);
  return { valid: errors.length === 0, errors };
}

function XsdValidator() {
  const [xsd, setXsd] = useState(SAMPLE_XSD);
  const [xml, setXml] = useState(SAMPLE_XML);

  const result = useMemo(() => {
    if (!xsd.trim() || !xml.trim()) return null;
    try {
      return validateAgainstSchema(xml, xsd);
    } catch (e) {
      return { valid: false, errors: [`Validation failed: ${e.message}`] };
    }
  }, [xml, xsd]);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">XSD Schema Validator</h2>
      <p className="text-sm text-gray-400 mb-6">
        Validate an XML document against an XSD schema — element structure, cardinality, required attributes,
        and simple-type restrictions (enumerations, patterns, lengths, ranges). Supports common XSD 1.0 constructs
        (sequence, choice, all, named and inline types). Everything runs in your browser.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <button
          type="button"
          onClick={() => { setXsd(SAMPLE_XSD); setXml(SAMPLE_XML); }}
          className="text-xs px-3 py-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">XSD Schema</label>
          <textarea
            value={xsd}
            onChange={(e) => setXsd(e.target.value)}
            rows={16}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs resize-y"
            placeholder="Paste your XSD schema..."
            spellCheck="false"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">XML Document</label>
          <textarea
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            rows={16}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs resize-y"
            placeholder="Paste the XML to validate..."
            spellCheck="false"
          />
        </div>
      </div>

      {result && (
        result.valid ? (
          <div className="rounded-lg border border-green-600/50 bg-green-900/20 px-5 py-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-300 font-semibold">Valid — the document conforms to the schema</span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-red-600/50 bg-red-900/20 px-5 py-4">
            <div className="flex items-start gap-2 mb-3">
              <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-300 font-semibold">Invalid — {result.errors.length} issue{result.errors.length === 1 ? '' : 's'} found</p>
            </div>
            <ul className="space-y-1 font-mono text-xs text-red-300">
              {result.errors.slice(0, 50).map((e, i) => <li key={i}>• {e}</li>)}
              {result.errors.length > 50 && <li>… and {result.errors.length - 50} more</li>}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export default XsdValidator;
