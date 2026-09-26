import React from 'react';
import ToolShell from '../../components/ToolShell';
import XmlValidator from './XmlValidator';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter/' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator/' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json/' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier/' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester/' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv/' },
];

function XmlValidatorPage() {
  return (
    <ToolShell
      title="Free XML Validator Online - Check Well-Formed XML | OG Technologies EU"
      description="Validate XML well-formedness online. Check for unclosed tags, unescaped characters, duplicate attributes, and multiple root elements. Get error line and column numbers — 100% browser-based."
      canonical="/tools/xml-validator"
      keywords="XML validator, validate XML, XML well-formedness check, XML syntax checker, XML error finder"
      heading="XML Validator"
      subheading="Check if your XML is well-formed. Get error details with line and column numbers, plus document statistics."
      tabs={TABS}
      activeTab="validate"
      about={[
        {
          heading: 'What is XML validation?',
          paragraphs: [
            'XML validation checks whether a document is well-formed — meaning it follows the basic syntax rules of XML: every tag is closed, attributes are quoted, special characters are escaped, and there is exactly one root element. A well-formedness check catches structural errors before the document reaches a parser, an API consumer, or a production system.',
            'This validator runs entirely in your browser using the built-in DOM parser. Paste your XML and get an instant verdict — no data is uploaded or stored.',
          ],
        },
        {
          heading: 'What it checks',
          paragraphs: [],
          list: [
            'Unclosed or mismatched tags and invalid nesting',
            'Unescaped special characters such as &, <, and >',
            'Duplicate attributes on the same element',
            'Multiple root elements or content outside the root',
            'Error location reported with line and column numbers',
            'Document statistics: element count, attribute count, and maximum depth',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use the validator when an integration rejects your XML payload, when hand-editing configuration files, or when you need a quick sanity check on SVG, RSS, XSD, WSDL, or sitemap documents before deploying them.',
          ],
        },
      ]}
      
    >
      <XmlValidator />
    </ToolShell>
  );
}

export default XmlValidatorPage;
