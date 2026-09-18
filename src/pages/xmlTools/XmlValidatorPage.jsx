import React from 'react';
import ToolShell from '../../components/ToolShell';
import XmlValidator from './XmlValidator';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv' },
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
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'XML Validator',
        url: 'https://www.ogtechnologies.co/tools/xml-validator/',
        description: 'Validate XML well-formedness online. Check for unclosed tags, unescaped characters, and duplicate attributes with error line and column reporting.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Well-formedness checking with line and column error reporting',
          'Document statistics: element count, attribute count, max depth, comments',
          'Supports all XML dialects including SVG, RSS, XSD, and WSDL',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <XmlValidator />
    </ToolShell>
  );
}

export default XmlValidatorPage;
