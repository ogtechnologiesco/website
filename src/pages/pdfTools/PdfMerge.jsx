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

function PdfMerge() {
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadPdf = async (file, setter) => {
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      setter({ file, bytes, pages: doc.getPageCount() });
      toast.success(`${file.name}: ${doc.getPageCount()} page(s)`);
    } catch (err) {
      console.error(err);
      toast.error('Could not read the PDF. It may be password protected.');
    }
  };

  const handleSwap = () => {
    setPdf1(pdf2);
    setPdf2(pdf1);
  };

  const handleMerge = async () => {
    if (!pdf1 || !pdf2) {
      toast.error('Please upload both PDF files');
      return;
    }
    setIsProcessing(true);
    try {
      const merged = await PDFDocument.create();
      for (const src of [pdf1, pdf2]) {
        const doc = await PDFDocument.load(src.bytes, { ignoreEncryption: true });
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const bytes = await merged.save();
      downloadPdf(bytes, 'merged.pdf');
      toast.success('Merged PDF downloaded');
    } catch (err) {
      console.error(err);
      toast.error('Error merging the PDFs');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <FileDrop
          label="Drag PDF 1 here, or click"
          accept=".pdf,application/pdf"
          extensions={['.pdf']}
          fileName={pdf1 ? `${pdf1.file.name} (${pdf1.pages} pg.)` : null}
          onFile={(file) => loadPdf(file, setPdf1)}
        />
        <FileDrop
          label="Drag PDF 2 here, or click"
          accept=".pdf,application/pdf"
          extensions={['.pdf']}
          fileName={pdf2 ? `${pdf2.file.name} (${pdf2.pages} pg.)` : null}
          onFile={(file) => loadPdf(file, setPdf2)}
        />
      </div>

      <div className="flex gap-3 mt-6 justify-end">
        <button
          className="btn-sm text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-md px-4 py-2 disabled:opacity-50"
          onClick={handleSwap}
          disabled={!pdf1 || !pdf2}
        >
          Swap order
        </button>
        <button
          className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 disabled:opacity-50"
          onClick={handleMerge}
          disabled={!pdf1 || !pdf2 || isProcessing}
        >
          {isProcessing ? 'Merging...' : 'Merge and download'}
        </button>
      </div>
    </div>
  );
}

export default PdfMerge;
