import React from 'react';
import ToolShell from '../../components/ToolShell';
import XmlMinifier from './XmlMinifier';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter/' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator/' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json/' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier/' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester/' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv/' },
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
      about={[
        {
          heading: 'What is XML minification?',
          paragraphs: [
            'Minification removes the whitespace added for human readability — indentation, line breaks, and padding between elements — without changing the document\'s meaning. A formatted XML file can shrink substantially, which matters for SOAP payloads, configuration files, and API responses transmitted over the network.',
            'This minifier only strips whitespace between elements. Text content inside elements, CDATA sections, and comments are preserved exactly as written.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Removes whitespace and line breaks between elements',
            'Preserves text content, CDATA, comments, and processing instructions',
            'Reports original size, minified size, and savings percentage',
            'Processes large documents entirely in the browser',
            'No uploads — your XML never leaves the page',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it before embedding XML in a request body, shrinking SOAP envelopes for bandwidth-constrained services, reducing the size of stored configuration files, or preparing fixtures and test payloads where formatting is irrelevant.',
          ],
        },
      ]}
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'XML Minifier',
        url: 'https://www.ogtechnologies.co/tools/xml-minifier/',
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
