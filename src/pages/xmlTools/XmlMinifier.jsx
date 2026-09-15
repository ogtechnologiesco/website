import React, { useState, useMemo } from 'react';

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>\n<catalog>\n  <book id="1">\n    <title>XML Developer's Guide</title>\n    <author>Anonymous</author>\n    <price>44.95</price>\n  </book>\n  <book id="2">\n    <title>Midnight Rain</title>\n    <author>Eva Peretti</author>\n    <price>5.95</price>\n  </book>\n</catalog>`;

function getParserError(doc) {
  const errorNode = doc.querySelector('parsererror');
  if (!errorNode) return null;
  const text = errorNode.textContent || '';
  return text.split('\n').filter(Boolean)[0] || 'Parse error';
}

function minifyXml(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  if (getParserError(doc)) return { error: 'Invalid XML — fix errors before minifying.' };

  const serializer = new XMLSerializer();
  const serialized = serializer.serializeToString(doc);
  const minified = serialized
    .replace(/>\s+</g, '><')
    .replace(/^\s+|\s+$/g, '');
  return { result: minified };
}

function XmlMinifier() {
  const [input, setInput] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const { result, error } = useMemo(() => {
    if (!input.trim()) return { result: '', error: null };
    return minifyXml(input);
  }, [input]);

  const originalSize = new Blob([input]).size;
  const minifiedSize = result ? new Blob([result]).size : 0;
  const savings = originalSize > 0 && result ? Math.round((1 - minifiedSize / originalSize) * 100) : 0;

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">XML Minifier</h2>
      <p className="text-sm text-gray-400 mb-6">
        Compress XML by removing unnecessary whitespace between elements.
        Text content, CDATA sections, and comments are preserved.
      </p>

      <div className="flex items-center gap-4 mb-4">
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
            placeholder="Paste XML to minify..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-gray-300 text-sm font-medium">Minified Output</label>
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
            placeholder="Minified XML will appear here..."
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-600/50 bg-red-900/20 px-5 py-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 flex gap-6 text-sm text-gray-400">
          <span>Original: <span className="text-white font-mono">{originalSize} B</span></span>
          <span>Minified: <span className="text-white font-mono">{minifiedSize} B</span></span>
          <span>Savings: <span className="text-green-400 font-mono">{savings}%</span></span>
        </div>
      )}
    </div>
  );
}

export default XmlMinifier;
