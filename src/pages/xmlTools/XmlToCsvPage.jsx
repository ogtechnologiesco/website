import React from 'react';
import ToolShell from '../../components/ToolShell';
import XmlToCsv from './XmlToCsv';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter/' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator/' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json/' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier/' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester/' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv/' },
];

function XmlToCsvPage() {
  return (
    <ToolShell
      title="Free XML to CSV Converter Online | OG Technologies EU"
      description="Convert XML to CSV online with automatic record element detection. Attributes included as @-prefixed columns. Choose comma, semicolon, or tab delimiter. Download or copy — 100% browser-based."
      canonical="/tools/xml-to-csv"
      keywords="XML to CSV, convert XML to CSV, XML CSV converter, XML to Excel, XML to spreadsheet, export XML to CSV"
      heading="XML to CSV Converter"
      subheading="Convert XML to CSV by detecting repeating elements. Auto-detects record elements or specify manually."
      tabs={TABS}
      activeTab="csv"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'XML to CSV Converter',
        url: 'https://www.ogtechnologies.co/tools/xml-to-csv/',
        description: 'Convert XML to CSV online with automatic record element detection. Attributes included as @-prefixed columns. 100% browser-based.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Automatic detection of repeating record elements',
          'Attributes included as @-prefixed columns',
          'Configurable delimiter: comma, semicolon, or tab',
          'Download as .csv file or copy to clipboard',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <XmlToCsv />
    </ToolShell>
  );
}

export default XmlToCsvPage;
