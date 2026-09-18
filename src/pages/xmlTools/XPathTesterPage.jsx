import React from 'react';
import ToolShell from '../../components/ToolShell';
import XPathTester from './XPathTester';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv' },
];

function XPathTesterPage() {
  return (
    <ToolShell
      title="Free XPath Tester Online - Evaluate XPath Expressions | OG Technologies EU"
      description="Test and evaluate XPath expressions against XML documents in real time. Supports XPath 1.0 via the browser's native document.evaluate(). 100% client-side, no data sent to any server."
      canonical="/tools/xpath-tester"
      keywords="XPath tester, XPath evaluator, XPath query, test XPath online, XPath expression, XML path language"
      heading="XPath Tester"
      subheading="Evaluate XPath expressions against your XML document in real time. Supports XPath 1.0 with typed results."
      tabs={TABS}
      activeTab="xpath"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'XPath Tester',
        url: 'https://www.ogtechnologies.co/tools/xpath-tester/',
        description: 'Test and evaluate XPath expressions against XML documents in real time. Supports XPath 1.0 via the browser native document.evaluate(). 100% client-side.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        featureList: [
          'Evaluate XPath 1.0 expressions against XML documents',
          'Typed results: elements, attributes, text, numbers, strings, booleans',
          'Example expressions for common queries',
          'Real-time evaluation with error reporting',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <XPathTester />
    </ToolShell>
  );
}

export default XPathTesterPage;
