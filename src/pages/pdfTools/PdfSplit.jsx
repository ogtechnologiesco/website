import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import toast from 'react-hot-toast';
import FileDrop from './FileDrop';

function downloadPdf(bytes, name) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.download = name;
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 5000);
}

function PdfSplit() {
  const [pdf, setPdf] = useState(null);
  const [cutPage, setCutPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadPdf = async (file) => {
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const total = doc.getPageCount();
      if (total < 2) {
        toast.error('The PDF must have at least 2 pages to be split');
        return;
      }
      setPdf({ file, bytes, pages: total });
      setCutPage(Math.ceil(total / 2));
      toast.success(`${file.name}: ${total} page(s)`);
    } catch (err) {
      console.error(err);
      toast.error('Could not read the PDF. It may be password protected.');
    }
  };

  const handleCutChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (Number.isNaN(value)) return;
    setCutPage(Math.min(Math.max(value, 1), pdf.pages - 1));
  };

  const handleSplit = async () => {
    if (!pdf) return;
    setIsProcessing(true);
    try {
      const src = await PDFDocument.load(pdf.bytes, { ignoreEncryption: true });
      const baseName = pdf.file.name.replace(/\.pdf$/i, '');

      const part1 = await PDFDocument.create();
      const pages1 = await part1.copyPages(src, Array.from({ length: cutPage }, (_, i) => i));
      pages1.forEach((page) => part1.addPage(page));

      const part2 = await PDFDocument.create();
      const pages2 = await part2.copyPages(src, Array.from({ length: pdf.pages - cutPage }, (_, i) => cutPage + i));
      pages2.forEach((page) => part2.addPage(page));

      downloadPdf(await part1.save(), `${baseName}-part-1.pdf`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      downloadPdf(await part2.save(), `${baseName}-part-2.pdf`);
      toast.success('PDF split: 2 files downloaded');
    } catch (err) {
      console.error(err);
      toast.error('Error splitting the PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <FileDrop
        label="Drag your PDF here, or click"
        accept=".pdf,application/pdf"
        extensions={['.pdf']}
        fileName={pdf ? `${pdf.file.name} (${pdf.pages} pg.)` : null}
        onFile={loadPdf}
      />

      {pdf && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Cut page (part 1 = pages 1–{cutPage}, part 2 = pages {cutPage + 1}–{pdf.pages})
          </label>
          <input
            type="number"
            min={1}
            max={pdf.pages - 1}
            value={cutPage}
            onChange={handleCutChange}
            className="w-24 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:border-purple-500 focus:outline-none"
          />

          <div className="flex gap-3 mt-6 justify-end">
            <button
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 disabled:opacity-50"
              onClick={handleSplit}
              disabled={isProcessing}
            >
              {isProcessing ? 'Splitting...' : 'Split and download'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfSplit;
