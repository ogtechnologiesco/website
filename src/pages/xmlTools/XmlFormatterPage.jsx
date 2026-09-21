import React from 'react';
import ToolShell from '../../components/ToolShell';
import XmlFormatter from './XmlFormatter';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter/' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator/' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json/' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier/' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester/' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv/' },
];

function XmlFormatterPage() {
  return (
    <ToolShell
      title="Free XML Formatter & Beautifier Online | OG Technologies EU"
      description="Format and beautify XML with customizable indentation (2 spaces, 4 spaces, or tabs). Pretty-print minified XML online — 100% browser-based, no data sent to any server."
      canonical="/tools/xml-formatter"
      keywords="XML formatter, XML beautifier, pretty print XML, XML prettifier, format XML online, XML indent"
      heading="XML Formatter & Beautifier"
      subheading="Pretty-print and beautify XML with configurable indentation. No data is sent to any server."
      tabs={TABS}
      activeTab="format"
      about={[
        {
          heading: 'What is XML formatting?',
          paragraphs: [
            'XML formatting (also called pretty-printing or beautifying) adds consistent indentation and line breaks to XML documents so their element hierarchy is easy to read. Minified or machine-generated XML often arrives as a single dense line, which makes manual inspection, debugging, and code review unnecessarily difficult.',
            'This tool re-formats your XML directly in the browser. Paste your document, choose an indentation style, and copy the result — nothing is uploaded or stored.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Configurable indentation: 2 spaces, 4 spaces, or tabs',
            'Preserves comments, CDATA sections, and processing instructions',
            'Syntax error reporting with line and column numbers',
            'Handles large documents entirely client-side',
            'Works offline once the page is loaded — no server round-trips',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use the formatter when inspecting SOAP or REST API responses, reviewing configuration files such as pom.xml or web.config, preparing XML for documentation, or diffing two documents where consistent formatting makes changes visible.',
          ],
        },
      ]}
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'XML Formatter & Beautifier',
        url: 'https://www.ogtechnologies.co/tools/xml-formatter/',
        description: 'Format and beautify XML with customizable indentation. Pretty-print minified XML online — 100% browser-based.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Pretty-print XML with 2-space, 4-space, or tab indentation',
          'Preserves comments, CDATA sections, and processing instructions',
          'Error reporting with line and column numbers',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <XmlFormatter />
    </ToolShell>
  );
}

export default XmlFormatterPage;
