import React, { useState, useMemo } from 'react';

const SAMPLE = `<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>`;

function getParserError(doc) {
  const errorNode = doc.querySelector('parsererror');
  if (!errorNode) return null;
  const text = errorNode.textContent || '';
  const lineMatch = text.match(/line\s*(?:number\s*)?[:#]?\s*(\d+)/i);
  const colMatch = text.match(/column\s*(?:number\s*)?[:#]?\s*(\d+)/i);
  return {
    message: text.split('\n').filter(Boolean)[0] || 'Parse error',
    line: lineMatch ? parseInt(lineMatch[1], 10) : null,
    column: colMatch ? parseInt(colMatch[1], 10) : null,
  };
}

function formatNode(node, indent, indentStr) {
  let out = '';
  const child = node.firstChild;
  while (child) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const hasElementChildren = Array.from(child.childNodes).some(
        (n) => n.nodeType === Node.ELEMENT_NODE,
      );
      const hasTextOnly = !hasElementChildren && child.childNodes.length > 0;
      const tagName = child.tagName;

      if (hasTextOnly) {
        const text = child.textContent.trim();
        const attrs = Array.from(child.attributes)
          .map((a) => `${a.name}="${a.value}"`)
          .join(' ');
        if (text) {
          out += `${indent}<${tagName}${attrs ? ' ' + attrs : ''}>${text}</${tagName}>\n`;
        } else {
          out += `${indent}<${tagName}${attrs ? ' ' + attrs : ''} />\n`;
        }
      } else if (hasElementChildren) {
        const attrs = Array.from(child.attributes)
          .map((a) => `${a.name}="${a.value}"`)
          .join(' ');
        out += `${indent}<${tagName}${attrs ? ' ' + attrs : ''}>\n`;
        out += formatNode(child, indent + indentStr, indentStr);
        out += `${indent}</${tagName}>\n`;
      } else {
        const attrs = Array.from(child.attributes)
          .map((a) => `${a.name}="${a.value}"`)
          .join(' ');
        out += `${indent}<${tagName}${attrs ? ' ' + attrs : ''} />\n`;
      }
    } else if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent.trim();
      if (text) {
        out += `${indent}${text}\n`;
      }
    } else if (child.nodeType === Node.COMMENT_NODE) {
      out += `${indent}<!--${child.data}-->\n`;
    } else if (child.nodeType === Node.PROCESSING_INSTRUCTION_NODE) {
      out += `${indent}<?${child.target} ${child.data}?>\n`;
    }
    child = child.nextSibling;
  }
  return out;
}

function formatXml(xml, indentSize) {
  const indentStr = indentSize === 'tab' ? '\t' : ' '.repeat(indentSize);
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const error = getParserError(doc);
  if (error) return { error };

  const declaration = xml.match(/^\s*<\?xml[^>]*\?>\s*/);
  let result = declaration ? declaration[0].trim() + '\n' : '';
  result += formatNode(doc, '', indentStr);
  return { result: result.trimEnd() };
}

function XmlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const { result, error } = useMemo(() => {
    if (!input.trim()) return { result: '', error: null };
    return formatXml(input, indent);
  }, [input, indent]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">XML Formatter & Beautifier</h2>
      <p className="text-sm text-gray-400 mb-6">
        Paste minified or unformatted XML to pretty-print it with proper indentation.
        Comments, CDATA, and processing instructions are preserved.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-gray-300 text-sm font-medium">Indentation</label>
        <select
          value={indent}
          onChange={(e) => setIndent(e.target.value === 'tab' ? 'tab' : parseInt(e.target.value, 10))}
          className="bg-gray-700 text-white px-3 py-1.5 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value="tab">Tab</option>
        </select>
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
            placeholder="Paste XML here..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-gray-300 text-sm font-medium">Formatted Output</label>
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
            placeholder="Formatted XML will appear here..."
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-600/50 bg-red-900/20 px-5 py-3">
          <p className="text-sm text-red-300">
            <span className="font-semibold">Error:</span> {error.message}
            {error.line && <span className="ml-2">(line {error.line}{error.column ? `, column ${error.column}` : ''})</span>}
          </p>
        </div>
      )}
    </div>
  );
}

export default XmlFormatter;
