import React, { useState } from 'react';
import { PDFDocument, PDFDict, PDFName } from 'pdf-lib';
import toast from 'react-hot-toast';
import FileDrop from './FileDrop';

const TEXT_FIELDS = [
  { key: 'title', label: 'Title', infoKey: 'Title' },
  { key: 'author', label: 'Author', infoKey: 'Author' },
  { key: 'subject', label: 'Subject', infoKey: 'Subject' },
  { key: 'keywords', label: 'Keywords (comma-separated)', infoKey: 'Keywords' },
  { key: 'creator', label: 'Creator', infoKey: 'Creator' },
  { key: 'producer', label: 'Producer', infoKey: 'Producer' },
];

const DATE_FIELDS = [
  { key: 'creationDate', label: 'Creation date', infoKey: 'CreationDate' },
  { key: 'modDate', label: 'Modification date', infoKey: 'ModDate' },
];

const EMPTY_FIELDS = {
  title: '',
  author: '',
  subject: '',
  keywords: '',
  creator: '',
  producer: '',
  creationDate: '',
  modDate: '',
};

const pad = (n) => String(n).padStart(2, '0');

const toDateInput = (d) =>
  d instanceof Date && !isNaN(d)
    ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
    : '';

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const lookupInfoDict = (doc) => {
  try {
    const info = doc.context.lookup(doc.context.trailerInfo.Info);
    return info instanceof PDFDict ? info : null;
  } catch {
    return null;
  }
};

const formatRawValue = (key, obj) => {
  try {
    if ((key === 'CreationDate' || key === 'ModDate') && typeof obj.decodeDate === 'function') {
      const d = obj.decodeDate();
      if (d instanceof Date && !isNaN(d)) return `${d.toISOString()} (${obj.decodeText()})`;
    }
    if (typeof obj.decodeText === 'function') return obj.decodeText();
    if (typeof obj.asString === 'function') return obj.asString();
    return obj.toString();
  } catch {
    return String(obj);
  }
};

function downloadPdf(bytes, name) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.download = name;
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 5000);
}

function PdfMetadata() {
  const [pdf, setPdf] = useState(null);
  const [entries, setEntries] = useState([]);
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadPdf = async (file) => {
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true, updateMetadata: false });
      const info = lookupInfoDict(doc);
      const rawEntries = info
        ? info
            .entries()
            .map(([k, v]) => {
              const key = k.asString().replace(/^\//, '');
              return { key, value: formatRawValue(key, v) };
            })
            .sort((a, b) => a.key.localeCompare(b.key))
        : [];
      let version = 'unknown';
      try {
        version = doc.context.header.toString().split('\n')[0].replace('%', '');
      } catch { /* keep 'unknown' */ }
      setPdf({
        file,
        bytes,
        pages: doc.getPageCount(),
        version,
        hasXmp: !!doc.catalog.get(PDFName.of('Metadata')),
      });
      setEntries(rawEntries);
      setFields({
        title: doc.getTitle() || '',
        author: doc.getAuthor() || '',
        subject: doc.getSubject() || '',
        keywords: doc.getKeywords() || '',
        creator: doc.getCreator() || '',
        producer: doc.getProducer() || '',
        creationDate: toDateInput(doc.getCreationDate()),
        modDate: toDateInput(doc.getModificationDate()),
      });
      toast.success(`${file.name}: ${doc.getPageCount()} page(s)`);
    } catch (err) {
      console.error(err);
      toast.error('Could not read the PDF. It may be password protected.');
    }
  };

  const outputName = (suffix) => `${pdf.file.name.replace(/\.pdf$/i, '')}${suffix}.pdf`;

  const handleSave = async () => {
    if (!pdf) return;
    setIsProcessing(true);
    try {
      const doc = await PDFDocument.load(pdf.bytes, { ignoreEncryption: true, updateMetadata: false });
      const info = lookupInfoDict(doc);

      const applyText = (infoKey, value, setter) => {
        if (value.trim()) setter(value.trim());
        else if (info) info.delete(PDFName.of(infoKey));
      };
      applyText('Title', fields.title, (v) => doc.setTitle(v));
      applyText('Author', fields.author, (v) => doc.setAuthor(v));
      applyText('Subject', fields.subject, (v) => doc.setSubject(v));
      applyText('Creator', fields.creator, (v) => doc.setCreator(v));
      applyText('Producer', fields.producer, (v) => doc.setProducer(v));

      const keywords = fields.keywords.split(',').map((s) => s.trim()).filter(Boolean);
      if (keywords.length) doc.setKeywords(keywords);
      else if (info) info.delete(PDFName.of('Keywords'));

      const applyDate = (infoKey, value, setter) => {
        if (value) {
          const d = new Date(value);
          if (isNaN(d.getTime())) throw new Error(`Invalid ${infoKey}`);
          setter(d);
        } else if (info) info.delete(PDFName.of(infoKey));
      };
      applyDate('CreationDate', fields.creationDate, (d) => doc.setCreationDate(d));
      applyDate('ModDate', fields.modDate, (d) => doc.setModificationDate(d));

      const out = await doc.save({ updateMetadata: false });
      downloadPdf(out, outputName('-edited'));
      toast.success('Updated PDF downloaded');
    } catch (err) {
      console.error(err);
      toast.error('Could not update metadata. Check the date fields.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveAll = async () => {
    if (!pdf) return;
    setIsProcessing(true);
    try {
      const doc = await PDFDocument.load(pdf.bytes, { ignoreEncryption: true, updateMetadata: false });
      const info = lookupInfoDict(doc);
      if (info) info.keys().forEach((k) => info.delete(k));
      delete doc.context.trailerInfo.Info;
      doc.catalog.delete(PDFName.of('Metadata'));
      const out = await doc.save({ updateMetadata: false });
      downloadPdf(out, outputName('-no-metadata'));
      toast.success('Metadata-free PDF downloaded');
    } catch (err) {
      console.error(err);
      toast.error('Could not strip metadata from this PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const inputClass =
    'mt-1 w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm';

  return (
    <div>
      <FileDrop
        label="Drag a PDF here, or click"
        accept=".pdf,application/pdf"
        extensions={['.pdf']}
        fileName={pdf ? `${pdf.file.name} (${pdf.pages} pg.)` : null}
        onFile={loadPdf}
      />

      {pdf && (
        <div className="mt-8 space-y-8">
          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 text-sm text-gray-400 flex flex-wrap gap-x-6 gap-y-1">
            <span>Pages: <span className="text-gray-200">{pdf.pages}</span></span>
            <span>Size: <span className="text-gray-200">{formatSize(pdf.file.size)}</span></span>
            <span>PDF version: <span className="text-gray-200">{pdf.version}</span></span>
            <span>XMP metadata: <span className="text-gray-200">{pdf.hasXmp ? 'Present' : 'None'}</span></span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-200 mb-3">Current metadata</h2>
            {entries.length === 0 ? (
              <p className="text-gray-500 text-sm">No document metadata found in this file.</p>
            ) : (
              <div className="rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-800 text-gray-300 text-left">
                      <th className="px-4 py-2 font-medium w-40 sm:w-56">Field</th>
                      <th className="px-4 py-2 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((e) => (
                      <tr key={e.key} className="border-t border-gray-700">
                        <td className="px-4 py-2 text-purple-300 font-mono align-top">{e.key}</td>
                        <td className="px-4 py-2 text-gray-300 break-all">{e.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-200 mb-1">Edit metadata</h2>
            <p className="text-sm text-gray-500 mb-4">Fields left empty are removed from the document.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {TEXT_FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-sm text-gray-400">{f.label}</span>
                  <input
                    type="text"
                    value={fields[f.key]}
                    onChange={(e) => setFields({ ...fields, [f.key]: e.target.value })}
                    className={inputClass}
                  />
                </label>
              ))}
              {DATE_FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-sm text-gray-400">{f.label}</span>
                  <input
                    type="datetime-local"
                    value={fields[f.key]}
                    onChange={(e) => setFields({ ...fields, [f.key]: e.target.value })}
                    className={inputClass}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-end">
            <button
              className="btn-sm text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-md px-4 py-2 disabled:opacity-50"
              onClick={handleRemoveAll}
              disabled={isProcessing}
            >
              Remove all metadata &amp; download
            </button>
            <button
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 disabled:opacity-50"
              onClick={handleSave}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Save metadata & download'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfMetadata;
