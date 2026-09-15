import React from 'react';
import ToolShell from '../../components/ToolShell';
import XmlMinifier from './XmlMinifier';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv' },
];

function XmlMinifierPage() {
  return (
    <ToolShell
      title="Free XML Minifier Online - Compress XML | OG Technologies EU"
      description="Minify and compress XML by removing unnecessary whitespace. Reduce XML file size for production payloads. Shows original vs minified size and savings percentage — 100% browser-based."
      canonical="/tools/xml-minifier"
      keywords="XML minifier, compress XML, minify XML, XML compressor, reduce XML size, XML optimizer"
      heading="XML Minifier"
      subheading="Compress XML by removing unnecessary whitespace between elements. Text content and CDATA are preserved."
      tabs={TABS}
      activeTab="minify"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'XML Minifier',
        url: 'https://www.ogtechnologies.co/tools/xml-minifier',
        description: 'Minify and compress XML by removing unnecessary whitespace. Reduce XML file size for production payloads. 100% browser-based.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Remove whitespace between XML elements',
          'Preserve text content, CDATA sections, and comments',
          'Shows original size, minified size, and savings percentage',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <XmlMinifier />
    </ToolShell>
  );
}

export default XmlMinifierPage;
