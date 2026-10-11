import React from 'react';
import ToolShell from '../../components/ToolShell';
import XsdValidator from './XsdValidator';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter/' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator/' },
  { id: 'xsd', label: 'XSD Validator', path: '/tools/xsd-validator/' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json/' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier/' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester/' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv/' },
];

function XsdValidatorPage() {
  return (
    <ToolShell
      title="Free XSD Schema Validator Online - Validate XML Against Schema | OG Technologies EU"
      description="Validate XML against an XSD schema online. Checks element structure, cardinality, required attributes, and simple-type restrictions like enumerations and patterns — with path-level errors. 100% browser-based, no uploads."
      canonical="/tools/xsd-validator"
      keywords="XSD validator, XML schema validator, XSD validation online, validate XML against XSD, XML schema checker, xs:element validation"
      heading="XSD Schema Validator"
      subheading="Validate an XML document against an XSD schema. Reports structural, cardinality, attribute, and type errors with element paths."
      tabs={TABS}
      activeTab="xsd"
      about={[
        {
          heading: 'What is XSD validation?',
          paragraphs: [
            'Well-formed XML is only half the story — XSD (XML Schema Definition) validation checks whether a document conforms to a declared structure: which elements must appear, in what order, how many times, which attributes are required, and whether values match declared types like integers, dates, or enumerations.',
            'Paste your schema on the left and the document on the right. Validation runs entirely in your browser — nothing is uploaded.',
          ],
        },
        {
          heading: 'What it checks',
          paragraphs: [],
          list: [
            'Root element matches a global xs:element declaration',
            'Element structure per xs:sequence, xs:choice, and xs:all',
            'Cardinality: minOccurs and maxOccurs on element declarations',
            'Required attributes (use="required") and undeclared attributes',
            'Built-in xs: types — string, integer, decimal, boolean, date, dateTime, and more',
            'Simple-type restrictions: enumeration, pattern, min/maxLength, min/maxInclusive',
            'Named and inline xs:complexType and xs:simpleType definitions',
          ],
        },
        {
          heading: 'Scope and limitations',
          paragraphs: [
            'This validator covers the commonly used XSD 1.0 constructs: elements, attributes, sequences, choices, type references, and simple-type facets. Advanced features like xs:group, attributeGroup, identity constraints (xs:key/xs:unique), substitution groups, and xsi:type polymorphism are not evaluated. For production validation of complex schemas, use a full XSD engine such as xmllint or Xerces — this tool is built for quick development and debugging checks.',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it when an API rejects your XML payload with a schema error, when testing whether a generated document matches a contract schema, or when learning how XSD declarations map to document requirements. For plain well-formedness checks (no schema), use the XML Validator instead.',
          ],
        },
      ]}

    >
      <XsdValidator />
    </ToolShell>
  );
}

export default XsdValidatorPage;
