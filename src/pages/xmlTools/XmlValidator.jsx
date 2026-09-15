import React, { useState, useMemo } from 'react';

const SAMPLE = `<note>\n  <to>Tove</to>\n  <from>Jani</from>\n  <heading>Reminder</heading>\n  <body>Don't forget me this weekend!</body>\n</note>`;

function getParserError(doc) {
  const errorNode = doc.querySelector('parsererror');
  if (!errorNode) return null;
  const text = errorNode.textContent || '';
  const lineMatch = text.match(/line\s*(?:number\s*)?[:#]?\s*(\d+)/i);
  const colMatch = text.match(/column\s*(?:number\s*)?[:#]?\s*(\d+)/i);
  const msg = text.split('\n').filter(Boolean);
  return {
    message: msg[0] || 'Parse error',
    detail: msg.slice(1).join(' ') || '',
    line: lineMatch ? parseInt(lineMatch[1], 10) : null,
    column: colMatch ? parseInt(colMatch[1], 10) : null,
  };
}

function collectStats(doc) {
  let elements = 0;
  let attributes = 0;
  let maxDepth = 0;
  let comments = 0;

  function walk(node, depth) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      elements++;
      attributes += node.attributes.length;
      maxDepth = Math.max(maxDepth, depth);
      for (const child of node.children) {
        walk(child, depth + 1);
      }
    } else if (node.nodeType === Node.COMMENT_NODE) {
      comments++;
    }
  }

  for (const child of doc.childNodes) {
    walk(child, 0);
  }
  return { elements, attributes, maxDepth, comments };
}

function XmlValidator() {
  const [input, setInput] = useState(SAMPLE);

  const result = useMemo(() => {
    if (!input.trim()) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'application/xml');
    const error = getParserError(doc);
    if (error) return { valid: false, error };
    return { valid: true, stats: collectStats(doc) };
  }, [input]);

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">XML Validator</h2>
      <p className="text-sm text-gray-400 mb-6">
        Check if your XML is well-formed. Reports errors with line and column numbers,
        plus document statistics including element count, max depth, and attribute count.
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

      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-1">XML Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm resize-y"
          placeholder="Paste XML to validate..."
        />
      </div>

      {result && (
        <>
          {result.valid ? (
            <div className="rounded-lg border border-green-600/50 bg-green-900/20 px-5 py-4 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-300 font-semibold">Valid XML — well-formed</span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-red-600/50 bg-red-900/20 px-5 py-4 mb-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-red-300 font-semibold">Invalid XML</p>
                  <p className="text-sm text-red-300 mt-1">{result.error.message}</p>
                  {result.error.detail && (
                    <p className="text-xs text-red-400 mt-1">{result.error.detail}</p>
                  )}
                  {result.error.line && (
                    <p className="text-xs text-red-400 mt-1">
                      Line {result.error.line}{result.error.column ? `, Column ${result.error.column}` : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {result.valid && result.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">{result.stats.elements}</p>
                <p className="text-xs text-gray-400 mt-1">Elements</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">{result.stats.attributes}</p>
                <p className="text-xs text-gray-400 mt-1">Attributes</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">{result.stats.maxDepth}</p>
                <p className="text-xs text-gray-400 mt-1">Max Depth</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">{result.stats.comments}</p>
                <p className="text-xs text-gray-400 mt-1">Comments</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default XmlValidator;
