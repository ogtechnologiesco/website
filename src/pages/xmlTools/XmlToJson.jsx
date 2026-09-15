import React, { useState, useMemo } from 'react';

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>\n<catalog>\n  <book id="1" category="fiction">\n    <title>XML Developer's Guide</title>\n    <author>Anonymous</author>\n    <price>44.95</price>\n  </book>\n  <book id="2" category="nonfiction">\n    <title>Midnight Rain</title>\n    <author>Eva Peretti</author>\n    <price>5.95</price>\n  </book>\n</catalog>`;

function getParserError(doc) {
  const errorNode = doc.querySelector('parsererror');
  if (!errorNode) return null;
  const text = errorNode.textContent || '';
  return text.split('\n').filter(Boolean)[0] || 'Parse error';
}

function inferType(value, typeInference) {
  if (!typeInference) return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (value !== '' && !isNaN(value) && isFinite(value)) {
    const num = Number(value);
    if (Number.isInteger(num) && !value.includes('.')) return num;
    return num;
  }
  return value;
}

function nodeToJson(node, typeInference) {
  const obj = {};

  for (const attr of node.attributes) {
    obj['@' + attr.name] = inferType(attr.value, typeInference);
  }

  const textParts = [];
  const childMap = {};

  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) {
      const text = child.textContent.trim();
      if (text) textParts.push(text);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const childObj = nodeToJson(child, typeInference);
      if (childMap[child.tagName]) {
        if (!Array.isArray(childMap[child.tagName])) {
          childMap[child.tagName] = [childMap[child.tagName]];
        }
        childMap[child.tagName].push(childObj);
      } else {
        childMap[child.tagName] = childObj;
      }
    } else if (child.nodeType === Node.COMMENT_NODE) {
      if (!obj['#comment']) obj['#comment'] = [];
      obj['#comment'].push(child.data);
    }
  }

  for (const [key, val] of Object.entries(childMap)) {
    obj[key] = val;
  }

  const text = textParts.join(' ');
  if (text) {
    const hasChildren = Object.keys(childMap).length > 0 || node.attributes.length > 0;
    if (hasChildren) {
      obj['#text'] = inferType(text, typeInference);
    } else {
      return inferType(text, typeInference);
    }
  }

  return obj;
}

function xmlToJson(xml, typeInference) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  if (getParserError(doc)) return { error: 'Invalid XML — fix errors before converting.' };

  const root = doc.documentElement;
  if (!root) return { error: 'No root element found.' };

  const result = {};
  result[root.tagName] = nodeToJson(root, typeInference);
  return { result: JSON.stringify(result, null, 2) };
}

function XmlToJson() {
  const [input, setInput] = useState(SAMPLE);
  const [typeInference, setTypeInference] = useState(true);
  const [copied, setCopied] = useState(false);

  const { result, error } = useMemo(() => {
    if (!input.trim()) return { result: '', error: null };
    return xmlToJson(input, typeInference);
  }, [input, typeInference]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">XML to JSON Converter</h2>
      <p className="text-sm text-gray-400 mb-6">
        Convert XML to JSON using the <code className="text-purple-300">@</code>-prefix convention for attributes
        (compatible with <code className="text-purple-300">xml2js</code> and <code className="text-purple-300">xmltodict</code>).
        Repeated elements become arrays automatically.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={typeInference}
            onChange={(e) => setTypeInference(e.target.checked)}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
          />
          Infer types (numbers, booleans, null)
        </label>
        <button
          type="button"
          onClick={() => setInput(SAMPLE)}
          className="text-xs px-3 py-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Input XML</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm resize-y"
            placeholder="Paste XML to convert..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-gray-300 text-sm font-medium">JSON Output</label>
            {result && (
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={result || ''}
            rows={16}
            className="w-full bg-gray-900 text-green-300 px-4 py-2 rounded-md border border-gray-600 font-mono text-sm resize-y"
            placeholder="JSON output will appear here..."
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-600/50 bg-red-900/20 px-5 py-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p><strong>Convention:</strong> Attributes are prefixed with <code className="text-gray-400">@</code>, text content uses <code className="text-gray-400">#text</code>, comments use <code className="text-gray-400">#comment</code>.</p>
        <p className="mt-1"><strong>Arrays:</strong> Repeated sibling elements are automatically converted to arrays.</p>
      </div>
    </div>
  );
}

export default XmlToJson;
