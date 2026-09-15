import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  PageBreak,
  AlignmentType,
} from 'docx';
import toast from 'react-hot-toast';
import FileDrop from './FileDrop';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();

/* ── helpers ────────────────────────────────────────────────── */

function downloadBlob(blob, name) {
  const link = document.createElement('a');
  link.download = name;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(link.href), 5000);
}

function sanitizeText(text) {
  return text.replace(/\u0000/g, '').replace(/[ \t]+/g, ' ');
}

/* ── PDF text extraction & structure reconstruction ─────────── */

function groupItemsIntoLines(items, pageHeight) {
  const lines = [];
  for (const item of items) {
    const transform = item.transform;
    const x = transform[4];
    const y = pageHeight - transform[5];
    const fontSize = Math.hypot(transform[0], transform[3]);
    const text = sanitizeText(item.str);
    if (!text) continue;

    const fontName = item.fontName || '';
    const isBold = /bold/i.test(fontName);
    const isItalic = /italic|oblique/i.test(fontName);

    let merged = false;
    for (const line of lines) {
      if (Math.abs(line.y - y) <= 3) {
        line.items.push({ x, text, fontSize, isBold, isItalic });
        merged = true;
        break;
      }
    }
    if (!merged) {
      lines.push({ y, items: [{ x, text, fontSize, isBold, isItalic }] });
    }
  }

  lines.sort((a, b) => a.y - b.y);
  for (const line of lines) {
    line.items.sort((a, b) => a.x - b.x);
    line.text = line.items.map((i) => i.text).join('');
    line.fontSize = line.items.reduce((max, i) => Math.max(max, i.fontSize), 0);
    line.isBold = line.items.every((i) => i.isBold);
    line.isItalic = line.items.every((i) => i.isItalic);
  }
  return lines;
}

function groupLinesIntoBlocks(lines) {
  if (lines.length === 0) return [];

  const heights = lines.map((l) => l.fontSize).filter((f) => f > 0);
  const medianSize = heights.length
    ? heights.sort((a, b) => a - b)[Math.floor(heights.length / 2)]
    : 11;

  const blocks = [];
  let current = null;
  let prevY = null;

  for (const line of lines) {
    const gap = prevY !== null ? line.y - prevY : 0;
    const isNewPara =
      !current || gap > medianSize * 1.6 || gap < 0;

    if (isNewPara) {
      current = {
        lines: [line],
        fontSize: line.fontSize,
        isBold: line.isBold,
        isItalic: line.isItalic,
      };
      blocks.push(current);
    } else {
      current.lines.push(line);
      current.fontSize = Math.max(current.fontSize, line.fontSize);
      current.isBold = current.isBold && line.isBold;
      current.isItalic = current.isItalic && line.isItalic;
    }
    prevY = line.y;
  }

  for (const block of blocks) {
    block.text = block.lines.map((l) => l.text).join(' ').trim();
    if (block.fontSize > medianSize * 1.8) {
      block.type = 'h1';
    } else if (block.fontSize > medianSize * 1.4) {
      block.type = 'h2';
    } else if (block.fontSize > medianSize * 1.15) {
      block.type = 'h3';
    } else {
      block.type = 'p';
    }
  }

  return blocks;
}

function detectLists(blocks) {
  for (const block of blocks) {
    if (block.type !== 'p') continue;
    const text = block.text;
    if (/^[•·◦▪‣\-]\s+/.test(text)) {
      block.type = 'li';
      block.listType = 'bullet';
      block.text = text.replace(/^[•·◦▪‣\-]\s+/, '');
    } else if (/^\d+[.)]\s+/.test(text)) {
      block.type = 'li';
      block.listType = 'number';
      block.text = text.replace(/^\d+[.)]\s+/, '');
    }
  }
}

async function extractPdfStructure(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    const lines = groupItemsIntoLines(content.items, viewport.height);
    const blocks = groupLinesIntoBlocks(lines);
    detectLists(blocks);
    pages.push(blocks);
  }

  return pages;
}

/* ── .docx generation ────────────────────────────────────────── */

function buildDocxPages(pages) {
  const docxChildren = [];
  let firstPage = true;

  for (const pageBlocks of pages) {
    if (!firstPage) {
      docxChildren.push(
        new Paragraph({ children: [new PageBreak()] }),
      );
    }
    firstPage = false;

    for (const block of pageBlocks) {
      const runs = [
        new TextRun({
          text: block.text,
          bold: block.isBold || block.type === 'h1' || block.type === 'h2' || block.type === 'h3',
          italics: block.isItalic,
        }),
      ];

      if (block.type === 'h1') {
        docxChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: runs,
          }),
        );
      } else if (block.type === 'h2') {
        docxChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: runs,
          }),
        );
      } else if (block.type === 'h3') {
        docxChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: runs,
          }),
        );
      } else if (block.type === 'li') {
        docxChildren.push(
          new Paragraph({
            children: runs,
            bullet: block.listType === 'bullet' ? { level: 0 } : undefined,
            numbering:
              block.listType === 'number'
                ? { reference: 'default-numbering', level: 0 }
                : undefined,
          }),
        );
      } else {
        docxChildren.push(new Paragraph({ children: runs }));
      }
    }
  }

  return docxChildren;
}

function generateDocx(pages) {
  const children = buildDocxPages(pages);
  const doc = new Document({
    numbering: {
      config: [
        {
          reference: 'default-numbering',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '%1.',
              alignment: AlignmentType.START,
            },
          ],
        },
      ],
    },
    sections: [{ children }],
  });
  return Packer.toBlob(doc);
}

/* ── .txt generation ─────────────────────────────────────────── */

function generateTxt(pages) {
  const parts = [];
  for (let p = 0; p < pages.length; p++) {
    for (const block of pages[p]) {
      if (block.type === 'h1') {
        parts.push(block.text.toUpperCase());
        parts.push('='.repeat(Math.min(block.text.length, 60)));
      } else if (block.type === 'h2') {
        parts.push(block.text.toUpperCase());
        parts.push('-'.repeat(Math.min(block.text.length, 60)));
      } else if (block.type === 'h3') {
        parts.push(`## ${block.text}`);
      } else if (block.type === 'li') {
        const prefix = block.listType === 'bullet' ? '  - ' : '  1. ';
        parts.push(`${prefix}${block.text}`);
      } else {
        parts.push(block.text);
      }
      parts.push('');
    }
    if (p < pages.length - 1) parts.push('\f');
  }
  return new Blob([parts.join('\n')], { type: 'text/plain;charset=utf-8' });
}

/* ── .html generation ────────────────────────────────────────── */

function escapeHtml(text) {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>');
}

function generateHtml(pages, fileName) {
  const bodyParts = [];
  for (let p = 0; p < pages.length; p++) {
    for (const block of pages[p]) {
      const text = escapeHtml(block.text);
      const bold = block.isBold || block.type === 'h1' || block.type === 'h2' || block.type === 'h3';
      const italic = block.isItalic;
      const styled = italic ? `<em>${text}</em>` : text;
      const styledBold = bold ? `<strong>${styled}</strong>` : styled;

      if (block.type === 'h1') {
        bodyParts.push(`<h1>${styledBold}</h1>`);
      } else if (block.type === 'h2') {
        bodyParts.push(`<h2>${styledBold}</h2>`);
      } else if (block.type === 'h3') {
        bodyParts.push(`<h3>${styledBold}</h3>`);
      } else if (block.type === 'li') {
        bodyParts.push(`<li>${styledBold}</li>`);
      } else {
        bodyParts.push(`<p>${styledBold}</p>`);
      }
    }
    if (p < pages.length - 1) bodyParts.push('<hr style="page-break-after: always;" />');
  }

  const listItems = bodyParts.join('\n').replace(
    /(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/gs,
    (match) => `<ul>${match}</ul>`,
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(fileName.replace(/\.pdf$/i, ''))}</title>
<style>
  body { font-family: 'Calibri', 'Helvetica', sans-serif; max-width: 800px; margin: 2rem auto; line-height: 1.6; color: #333; }
  h1 { font-size: 1.8em; margin-top: 1.5em; }
  h2 { font-size: 1.4em; margin-top: 1.2em; }
  h3 { font-size: 1.2em; margin-top: 1em; }
  ul { padding-left: 1.5em; }
  hr { border: none; border-top: 1px dashed #ccc; margin: 2em 0; }
</style>
</head>
<body>
${listItems}
</body>
</html>`;

  return new Blob([html], { type: 'text/html;charset=utf-8' });
}

/* ── React component ────────────────────────────────────────── */

function PdfToWord() {
  const [pdf, setPdf] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const loadPdf = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdf({ file, numPages: doc.numPages });
      setResults(null);
      toast.success(`${file.name}: ${doc.numPages} page(s)`);
    } catch (err) {
      console.error(err);
      toast.error('Could not read the PDF. It may be corrupted or password protected.');
    }
  };

  const handleConvert = async () => {
    if (!pdf) return;
    setIsProcessing(true);
    setResults(null);
    try {
      const pages = await extractPdfStructure(pdf.file);
      const baseName = pdf.file.name.replace(/\.pdf$/i, '');

      const docxBlob = await generateDocx(pages);
      const txtBlob = generateTxt(pages);
      const htmlBlob = generateHtml(pages, pdf.file.name);

      setResults({
        docx: { blob: docxBlob, name: `${baseName}.docx` },
        txt: { blob: txtBlob, name: `${baseName}.txt` },
        html: { blob: htmlBlob, name: `${baseName}.html` },
      });
      toast.success('Conversion complete — ready to download');
    } catch (err) {
      console.error(err);
      toast.error('Error converting the PDF. It may contain only images (no text layer).');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (format) => {
    const r = results[format];
    if (r) downloadBlob(r.blob, r.name);
  };

  return (
    <div>
      <FileDrop
        label="Drag your PDF here, or click"
        accept=".pdf,application/pdf"
        extensions={['.pdf']}
        fileName={pdf ? `${pdf.file.name} (${pdf.numPages} pg.)` : null}
        onFile={loadPdf}
      />

      {pdf && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-3 justify-end items-center">
            <button
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 disabled:opacity-50"
              onClick={handleConvert}
              disabled={isProcessing}
            >
              {isProcessing ? 'Converting...' : 'Convert to Word'}
            </button>
          </div>

          {results && (
            <div className="mt-6 flex flex-wrap gap-3 justify-end items-center">
              <span className="text-sm text-gray-400">Download as:</span>
              <button
                className="btn-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2"
                onClick={() => handleDownload('docx')}
              >
                Word (.docx)
              </button>
              <button
                className="btn-sm text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md px-4 py-2"
                onClick={() => handleDownload('txt')}
              >
                Text (.txt)
              </button>
              <button
                className="btn-sm text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md px-4 py-2"
                onClick={() => handleDownload('html')}
              >
                HTML (.html)
              </button>
            </div>
          )}
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        Note: conversion is 100% local in your browser. It preserves text, headings,
        bold/italic, and basic list structure. Scanned PDFs (image-only) are not
        supported — there is no OCR. Images, tables, and exact layout are not preserved.
      </p>
    </div>
  );
}

export default PdfToWord;
