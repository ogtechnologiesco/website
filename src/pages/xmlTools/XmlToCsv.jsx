import React, { useState, useMemo } from 'react';

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>\n<catalog>\n  <book id="1" category="fiction">\n    <title>XML Developer's Guide</title>\n    <author>Anonymous</author>\n    <price>44.95</price>\n  </book>\n  <book id="2" category="nonfiction">\n    <title>Midnight Rain</title>\n    <author>Eva Peretti</author>\n    <price>5.95</price>\n  </book>\n</catalog>`;

function getParserError(doc) {
  const errorNode = doc.querySelector('parsererror');
  if (!errorNode) return null;
  const text = errorNode.textContent || '';
  return text.split('\n').filter(Boolean)[0] || 'Parse error';
}

function detectRecordElement(root) {
  const counts = {};
  for (const child of root.children) {
    counts[child.tagName] = (counts[child.tagName] || 0) + 1;
  }
  let best = null;
  let max = 0;
  for (const [tag, count] of Object.entries(counts)) {
    if (count > max) {
      max = count;
      best = tag;
    }
  }
  return best;
}

function escapeCsv(value, delimiter) {
  const str = String(value ?? '');
  if (str.includes(delimiter) || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function xmlToCsv(xml, recordName, delimiter) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  if (getParserError(doc)) return { error: 'Invalid XML — fix errors before converting.' };

  const root = doc.documentElement;
  if (!root) return { error: 'No root element found.' };

  const recordTag = recordName.trim() || detectRecordElement(root);
  if (!recordTag) return { error: 'Could not detect a repeating record element. Specify one manually.' };

  const records = root.querySelectorAll(':scope > ' + recordTag);
  if (records.length === 0) return { error: `No <${recordTag}> elements found as direct children of <${root.tagName}>.` };

  const columns = new Set();
  const rows = [];

  records.forEach((record) => {
    const row = {};
    for (const attr of record.attributes) {
      const colName = '@' + attr.name;
      columns.add(colName);
      row[colName] = attr.value;
    }
    for (const child of record.children) {
      const colName = child.tagName;
      columns.add(colName);
      row[colName] = child.textContent.trim();
    }
    rows.push(row);
  });

  const colArray = Array.from(columns);
  const header = colArray.map((c) => escapeCsv(c, delimiter)).join(delimiter);
  const body = rows
    .map((row) => colArray.map((c) => escapeCsv(row[c] ?? '', delimiter)).join(delimiter))
    .join('\n');

  return { result: header + '\n' + body, recordTag, count: rows.length, columns: colArray.length };
}

function XmlToCsv() {
  const [input, setInput] = useState(SAMPLE);
  const [recordName, setRecordName] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [copied, setCopied] = useState(false);

  const { result, error, recordTag, count, columns } = useMemo(() => {
    if (!input.trim()) return { result: '', error: null };
    return xmlToCsv(input, recordName, delimiter);
  }, [input, recordName, delimiter]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">XML to CSV Converter</h2>
      <p className="text-sm text-gray-400 mb-6">
        Convert XML to CSV by detecting repeating elements. Attributes are included as
        columns prefixed with <code className="text-purple-300">@</code>. Auto-detects the
        record element or lets you specify it manually.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div>
          <label className="block text-gray-300 text-xs font-medium mb-1">Record Element (optional)</label>
          <input
            type="text"
            value={recordName}
            onChange={(e) => setRecordName(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1.5 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm font-mono w-48"
            placeholder="auto-detect"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-xs font-medium mb-1">Delimiter</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1.5 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value={'\t'}>Tab</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => setInput(SAMPLE)}
          className="text-xs px-3 py-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors self-end"
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
            <label className="text-gray-300 text-sm font-medium">CSV Output</label>
            {result && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors"
                >
                  Download
                </button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={result || ''}
            rows={16}
            className="w-full bg-gray-900 text-green-300 px-4 py-2 rounded-md border border-gray-600 font-mono text-sm resize-y"
            placeholder="CSV output will appear here..."
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-600/50 bg-red-900/20 px-5 py-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {result && recordTag && (
        <div className="mt-4 flex gap-6 text-sm text-gray-400">
          <span>Record element: <span className="text-white font-mono">{'<'}{recordTag}{'>'}</span></span>
          <span>Rows: <span className="text-white font-mono">{count}</span></span>
          <span>Columns: <span className="text-white font-mono">{columns}</span></span>
        </div>
      )}
    </div>
  );
}

export default XmlToCsv;
