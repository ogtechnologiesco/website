import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import toast from 'react-hot-toast';
import FileDrop from './FileDrop';

const A4 = { width: 595.28, height: 841.89 };
const MARGIN = 40;

function downloadUrl(url, name) {
  const link = document.createElement('a');
  link.download = name;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function ImageToPdf() {
  const [image, setImage] = useState(null);
  const [pageSize, setPageSize] = useState('a4');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const clearResult = () => {
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
  };

  const loadImage = (file) => {
    clearResult();
    setImage({ file });
  };

  const handleConvert = async () => {
    if (!image) return;
    setIsProcessing(true);
    try {
      const bytes = await image.file.arrayBuffer();
      const pdfDoc = await PDFDocument.create();

      const isPng = image.file.type === 'image/png' || /\.png$/i.test(image.file.name);
      const embedded = isPng ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);

      if (pageSize === 'original') {
        const page = pdfDoc.addPage([embedded.width, embedded.height]);
        page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
      } else {
        const isLandscape = embedded.width > embedded.height;
        const pageW = isLandscape ? A4.height : A4.width;
        const pageH = isLandscape ? A4.width : A4.height;
        const page = pdfDoc.addPage([pageW, pageH]);
        const scale = Math.min(
          (pageW - 2 * MARGIN) / embedded.width,
          (pageH - 2 * MARGIN) / embedded.height
        );
        const w = embedded.width * scale;
        const h = embedded.height * scale;
        page.drawImage(embedded, {
          x: (pageW - w) / 2,
          y: (pageH - h) / 2,
          width: w,
          height: h,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const baseName = image.file.name.replace(/\.(png|jpe?g)$/i, '');
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      clearResult();
      setResult({ url, name: `${baseName}.pdf` });
      toast.success('PDF ready to download');
    } catch (err) {
      console.error(err);
      toast.error('Error converting the image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadUrl(result.url, result.name);
    toast.success('PDF downloaded');
  };

  return (
    <div>
      <FileDrop
        label="Drag your image (PNG or JPG) here, or click"
        accept="image/png,image/jpeg"
        extensions={['.png', '.jpg', '.jpeg']}
        fileName={image?.file.name || null}
        onFile={loadImage}
      />

      {image && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">Page size</label>
          <div className="flex rounded-md overflow-hidden border border-gray-600 w-fit">
            <button
              className={`px-4 py-2 text-sm font-medium ${pageSize === 'a4' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setPageSize('a4')}
            >
              Fit to A4
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${pageSize === 'original' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setPageSize('original')}
            >
              Image size
            </button>
          </div>

          <div className="flex gap-3 mt-6 justify-end items-center">
            <button
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 disabled:opacity-50"
              onClick={handleConvert}
              disabled={isProcessing}
            >
              {isProcessing ? 'Converting...' : 'Convert to PDF'}
            </button>
            {result && (
              <>
                <span className="text-sm text-gray-400">{result.name}</span>
                <button
                  className="btn-sm text-white bg-green-600 hover:bg-green-700 rounded-md px-4 py-2"
                  onClick={handleDownload}
                >
                  Download PDF
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageToPdf;
