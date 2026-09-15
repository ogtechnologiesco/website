import React, { useState, useMemo } from 'react';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>\n<library>\n  <book id="1" category="fiction">\n    <title>XML Developer's Guide</title>\n    <author>Anonymous</author>\n    <price>44.95</price>\n  </book>\n  <book id="2" category="nonfiction">\n    <title>Midnight Rain</title>\n    <author>Eva Peretti</author>\n    <price>5.95</price>\n  </book>\n</library>`;

const EXAMPLES = [
  { label: 'All books', expr: '//book' },
  { label: 'Book titles', expr: '//title/text()' },
  { label: 'Books under 10', expr: '//book[price < 10]' },
  { label: 'First book', expr: '//book[1]' },
  { label: 'Book attributes', expr: '//book/@*' },
  { label: 'Count books', expr: 'count(//book)' },
];

const RESULT_TYPE_NAMES = {
  [XPathResult.ANY_TYPE]: 'Any',
  [XPathResult.NUMBER_TYPE]: 'Number',
  [XPathResult.STRING_TYPE]: 'String',
  [XPathResult.BOOLEAN_TYPE]: 'Boolean',
  [XPathResult.UNORDERED_NODE_ITERATOR_TYPE]: 'Unordered Node Iterator',
  [XPathResult.ORDERED_NODE_ITERATOR_TYPE]: 'Ordered Node Iterator',
  [XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE]: 'Unordered Node Snapshot',
  [XPathResult.ORDERED_NODE_SNAPSHOT_TYPE]: 'Ordered Node Snapshot',
  [XPathResult.ANY_UNORDERED_NODE_TYPE]: 'First Unordered Node',
  [XPathResult.FIRST_ORDERED_NODE_TYPE]: 'First Ordered Node',
};

function getParserError(doc) {
  const errorNode = doc.querySelector('parsererror');
  if (!errorNode) return null;
  const text = errorNode.textContent || '';
  return text.split('\n').filter(Boolean)[0] || 'Parse error';
}

function evaluateXPath(xml, xpath) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  if (getParserError(doc)) return { error: 'Invalid XML input.' };

  let result;
  try {
    result = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);
  } catch (err) {
    return { error: err.message || 'Invalid XPath expression.' };
  }

  const resultType = result.resultType;
  const results = [];

  if (resultType === XPathResult.NUMBER_TYPE) {
    results.push({ type: 'number', value: result.numberValue });
  } else if (resultType === XPathResult.STRING_TYPE) {
    results.push({ type: 'string', value: result.stringValue });
  } else if (resultType === XPathResult.BOOLEAN_TYPE) {
    results.push({ type: 'boolean', value: result.booleanValue });
  } else if (
    resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE ||
    resultType === XPathResult.ORDERED_NODE_ITERATOR_TYPE
  ) {
    let node;
    while ((node = result.iterateNext())) {
      if (node.nodeType === Node.ATTRIBUTE_NODE) {
        results.push({ type: 'attribute', name: node.name, value: node.value });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const attrs = Array.from(node.attributes).map((a) => `${a.name}="${a.value}"`).join(' ');
        results.push({
          type: 'element',
          name: node.tagName,
          attrs: attrs,
          text: node.textContent.trim().slice(0, 200),
        });
      } else if (node.nodeType === Node.TEXT_NODE) {
        results.push({ type: 'text', value: node.textContent.trim() });
      }
    }
  } else if (
    resultType === XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE ||
    resultType === XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
  ) {
    for (let i = 0; i < result.snapshotLength; i++) {
      const node = result.snapshotItem(i);
      if (node.nodeType === Node.ATTRIBUTE_NODE) {
        results.push({ type: 'attribute', name: node.name, value: node.value });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const attrs = Array.from(node.attributes).map((a) => `${a.name}="${a.value}"`).join(' ');
        results.push({
          type: 'element',
          name: node.tagName,
          attrs: attrs,
          text: node.textContent.trim().slice(0, 200),
        });
      } else if (node.nodeType === Node.TEXT_NODE) {
        results.push({ type: 'text', value: node.textContent.trim() });
      }
    }
  } else if (
    resultType === XPathResult.ANY_UNORDERED_NODE_TYPE ||
    resultType === XPathResult.FIRST_ORDERED_NODE_TYPE
  ) {
    const node = result.singleNodeValue;
    if (node) {
      if (node.nodeType === Node.ATTRIBUTE_NODE) {
        results.push({ type: 'attribute', name: node.name, value: node.value });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const attrs = Array.from(node.attributes).map((a) => `${a.name}="${a.value}"`).join(' ');
        results.push({
          type: 'element',
          name: node.tagName,
          attrs: attrs,
          text: node.textContent.trim().slice(0, 200),
        });
      }
    }
  }

  return { results, resultType, resultTypeName: RESULT_TYPE_NAMES[resultType] || 'Unknown' };
}

function XPathTester() {
  const [xml, setXml] = useState(SAMPLE_XML);
  const [xpath, setXpath] = useState('//book');

  const { results, resultType, resultTypeName, error } = useMemo(() => {
    if (!xml.trim() || !xpath.trim()) return { results: null, error: null };
    return evaluateXPath(xml, xpath);
  }, [xml, xpath]);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">XPath Tester</h2>
      <p className="text-sm text-gray-400 mb-6">
        Evaluate XPath expressions against your XML document in real time.
        Supports XPath 1.0 via the browser's native <code className="text-purple-300">document.evaluate()</code>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">XML Input</label>
          <textarea
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            rows={12}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm resize-y"
            placeholder="Paste XML here..."
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">XPath Expression</label>
          <input
            type="text"
            value={xpath}
            onChange={(e) => setXpath(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
            placeholder="//book/title"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => setXpath(ex.expr)}
                className="text-xs px-2.5 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-600/50 bg-red-900/20 px-5 py-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {results && (
        <div className="mt-4">
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
            <span>Result type: <span className="text-purple-300 font-mono">{resultTypeName}</span></span>
            <span>Matches: <span className="text-white font-mono">{results.length}</span></span>
          </div>

          {results.length === 0 ? (
            <div className="bg-gray-700 rounded-lg p-6 text-center text-gray-400 text-sm">
              No matching nodes found.
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((r, i) => (
                <div key={i} className="bg-gray-700 rounded-md px-4 py-3">
                  {r.type === 'element' && (
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 mr-2">element</span>
                      <span className="text-white font-mono text-sm">{'<'}{r.name}{r.attrs ? ' ' + r.attrs : ''}{'>'}</span>
                      {r.text && <p className="text-gray-400 text-xs mt-1 ml-6">{r.text}</p>}
                    </div>
                  )}
                  {r.type === 'attribute' && (
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 mr-2">attribute</span>
                      <span className="text-white font-mono text-sm">{r.name}="{r.value}"</span>
                    </div>
                  )}
                  {r.type === 'text' && (
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded bg-green-900/50 text-green-300 mr-2">text</span>
                      <span className="text-gray-200 text-sm">{r.value}</span>
                    </div>
                  )}
                  {r.type === 'number' && (
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded bg-yellow-900/50 text-yellow-300 mr-2">number</span>
                      <span className="text-white font-mono text-sm">{r.value}</span>
                    </div>
                  )}
                  {r.type === 'string' && (
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded bg-yellow-900/50 text-yellow-300 mr-2">string</span>
                      <span className="text-gray-200 text-sm">{r.value}</span>
                    </div>
                  )}
                  {r.type === 'boolean' && (
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded bg-orange-900/50 text-orange-300 mr-2">boolean</span>
                      <span className="text-white font-mono text-sm">{String(r.value)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default XPathTester;
