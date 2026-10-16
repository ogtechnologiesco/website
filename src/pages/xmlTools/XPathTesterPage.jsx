import React from 'react';
import ToolShell from '../../components/ToolShell';
import XPathTester from './XPathTester';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter/' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator/' },
  { id: 'xsd', label: 'XSD Validator', path: '/tools/xsd-validator/' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json/' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier/' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester/' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv/' },
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
      about={[
        {
          heading: 'What is XPath?',
          paragraphs: [
            'XPath (XML Path Language) is a query language for selecting nodes from XML documents. Expressions like //book[@category="tech"]/title navigate the document tree the way file paths navigate a filesystem, with predicates for filtering on attributes, position, and content.',
            'This tester evaluates XPath 1.0 expressions using the browser\'s native document.evaluate() engine — the same implementation your web page scripts use. Results are typed: element and attribute nodes, text, numbers, strings, or booleans.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Evaluate XPath 1.0 expressions in real time',
            'Typed results: elements, attributes, text, numbers, booleans',
            'Example expressions for common query patterns',
            'Clear error reporting for malformed expressions',
            'Everything runs client-side — documents stay in the browser',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it when writing XPath for web scraping or test automation selectors, extracting data from SOAP responses, debugging queries before embedding them in XSLT or application code, or learning XPath interactively against a real document.',
          ],
        },
      ]}
      faq={[
        { q: 'Which XPath version does this tester support?', a: 'XPath 1.0, via the browser\'s native document.evaluate() engine — the same implementation your page scripts and most automation tools use. XPath 2.0/3.x functions like matches() or tokenize() are not available in browsers.' },
        { q: 'How do I write an XPath expression?', a: 'Start with // for a descendant search (//item finds every item element), / for direct children, [@attr="value"] for attribute filters, [1] or [last()] for position, and functions like contains() or text() for content matching. The example expressions in the tool cover the common patterns.' },
        { q: 'Does it work with XML namespaces?', a: 'Yes — namespaced elements can be matched using their prefix or local-name() (e.g. //*[local-name()="item"]), which is the practical workaround when prefixes differ between documents.' },
        { q: 'Is my XML or query sent to a server?', a: 'No — evaluation happens entirely in the browser via document.evaluate(). Nothing is uploaded, which makes it safe for internal XML payloads.' },
      ]}
      
    >
      <XPathTester />
    </ToolShell>
  );
}

export default XPathTesterPage;
