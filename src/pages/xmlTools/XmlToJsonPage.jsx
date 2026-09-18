import React from 'react';
import ToolShell from '../../components/ToolShell';
import XmlToJson from './XmlToJson';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv' },
];

function XmlToJsonPage() {
  return (
    <ToolShell
      title="Free XML to JSON Converter Online | OG Technologies EU"
      description="Convert XML to JSON online using the @-prefix attribute convention (compatible with xml2js and xmltodict). Repeated elements become arrays automatically. 100% browser-based, no uploads."
      canonical="/tools/xml-to-json"
      keywords="XML to JSON, convert XML to JSON, XML JSON converter, xml2js, xmltodict, XML to JSON online"
      heading="XML to JSON Converter"
      subheading="Convert XML to JSON with @-prefix attributes and automatic arrays. Compatible with xml2js and xmltodict conventions."
      tabs={TABS}
      activeTab="json"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'XML to JSON Converter',
        url: 'https://www.ogtechnologies.co/tools/xml-to-json/',
        description: 'Convert XML to JSON online using the @-prefix attribute convention. Repeated elements become arrays automatically. 100% browser-based.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'XML to JSON conversion with @-prefix attribute convention',
          'Automatic array detection for repeated sibling elements',
          'Optional type inference for numbers, booleans, and null',
          'Compatible with xml2js and xmltodict output format',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <XmlToJson />
    </ToolShell>
  );
}

export default XmlToJsonPage;
