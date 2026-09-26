import React from 'react';
import ToolShell from '../../components/ToolShell';
import XmlToJson from './XmlToJson';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter/' },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator/' },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json/' },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier/' },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester/' },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv/' },
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
      about={[
        {
          heading: 'How does XML to JSON conversion work?',
          paragraphs: [
            'XML and JSON model data differently: XML has attributes, mixed content, and repeated elements that have no direct JSON equivalent. This converter follows the widely-used convention where attributes become @-prefixed properties, element text becomes a #text property when mixed with children, and repeated sibling elements collapse into arrays.',
            'The output is compatible with the conventions used by xml2js (Node.js) and xmltodict (Python), so converted documents behave predictably if you feed them to tooling built around those libraries.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Attributes mapped to @-prefixed JSON properties',
            'Repeated sibling elements automatically become arrays',
            'Optional type inference for numbers, booleans, and null',
            'Handles namespaces and nested structures',
            'Runs in the browser — no data uploaded',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it when migrating an XML-based API to JSON, inspecting SOAP or RSS feeds in a JSON-friendly tool, feeding XML data into JavaScript applications, or quickly checking how a document will look after a programmatic conversion.',
          ],
        },
      ]}
      
    >
      <XmlToJson />
    </ToolShell>
  );
}

export default XmlToJsonPage;
