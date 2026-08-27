import React, { useState } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import mammoth from 'mammoth';
import JSZip from 'jszip';
import toast from 'react-hot-toast';
import FileDrop from './FileDrop';

const A4 = { width: 595.28, height: 841.89 };
const MARGIN = 50;
const LINE_HEIGHT_FACTOR = 1.4;

const STYLES = {
  h1: { size: 18, bold: true, spaceBefore: 18 },
  h2: { size: 15, bold: true, spaceBefore: 14 },
  h3: { size: 13, bold: true, spaceBefore: 10 },
  p: { size: 11, bold: false, spaceBefore: 6 },
};

// WinAnsi (pdf-lib standard fonts) does not support these Unicode characters
const CHAR_REPLACEMENTS = {
  '\u2010': '-', '\u2011': '-', '\u2012': '-', '\u2013': '-', '\u2014': '-', '\u2015': '-', '\u2212': '-',
  '\u2018': "'", '\u2019': "'", '\u201A': "'", '\u201B': "'", '\u2032': "'",
  '\u201C': '"', '\u201D': '"', '\u201E': '"', '\u2033': '"',
  '\u2026': '...', '\u00A0': ' ', '\u2009': ' ', '\u2002': ' ', '\u2003': ' ',
  '\u2022': '\u0095', '\u25CF': '\u0095',
};

function sanitizeText(text) {
  let out = text;
  for (const [bad, good] of Object.entries(CHAR_REPLACEMENTS)) {
    out = out.split(bad).join(good);
  }
  return out.replace(/[^\u0000-\u00FF]/g, '?');
}

function downloadPdf(bytes, name) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.download = name;
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 5000);
}

async function extractTxt(file) {
  const text = await file.text();
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((t) => ({ type: 'p', text: t }));
}

async function extractDocx(file) {
  const arrayBuffer = await file.arrayBuffer();
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const blocks = [];
  doc.body.querySelectorAll('h1, h2, h3, p, li').forEach((el) => {
    const text = el.textContent.trim();
    if (!text) return;
    const tag = el.tagName.toLowerCase();
    blocks.push({ type: ['h1', 'h2', 'h3'].includes(tag) ? tag : 'p', text });
  });
  return blocks;
}

async function extractOdt(file) {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const contentFile = zip.file('content.xml');
  if (!contentFile) throw new Error('content.xml not found in the .odt');
  const xml = await contentFile.async('string');
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const blocks = [];
  const all = doc.getElementsByTagName('*');
  for (let i = 0; i < all.length; i++) {
    const el = all[i];
    if (el.localName !== 'p' && el.localName !== 'h') continue;
    if (!el.namespaceURI || !el.namespaceURI.includes('text')) continue;
    const text = el.textContent.trim();
    if (!text) continue;
    let type = 'p';
    if (el.localName === 'h') {
      const level = parseInt(el.getAttribute('text:outline-level') || '1', 10);
      type = level <= 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
    }
    blocks.push({ type, text });
  }
  return blocks;
}

async function blocksToPdf(blocks) {
  const pdfDoc = await PDFDocument.create();
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([A4.width, A4.height]);
  let y = A4.height - MARGIN;
  const maxWidth = A4.width - 2 * MARGIN;

  const newPage = () => {
    page = pdfDoc.addPage([A4.width, A4.height]);
    y = A4.height - MARGIN;
  };

  for (const block of blocks) {
    const style = STYLES[block.type] || STYLES.p;
    const font = style.bold ? bold : regular;
    const lineHeight = style.size * LINE_HEIGHT_FACTOR;

    const words = sanitizeText(block.text).split(/\s+/);
    const lines = [];
    let current = '';
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, style.size) <= maxWidth) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);

    y -= style.spaceBefore;
    for (const line of lines) {
      if (y - lineHeight < MARGIN) newPage();
      page.drawText(line, { x: MARGIN, y: y - style.size, size: style.size, font });
      y -= lineHeight;
    }
  }

  return pdfDoc.save();
}

function DocToPdf() {
  const [doc, setDoc] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (!doc) return;
    setIsProcessing(true);
    try {
      const name = doc.file.name.toLowerCase();
      let blocks;
      if (name.endsWith('.txt')) {
        blocks = await extractTxt(doc.file);
      } else if (name.endsWith('.docx')) {
        blocks = await extractDocx(doc.file);
      } else {
        blocks = await extractOdt(doc.file);
      }
      if (blocks.length === 0) {
        toast.error('No text found in the document');
        return;
      }
      const bytes = await blocksToPdf(blocks);
      downloadPdf(bytes, `${doc.file.name.replace(/\.(docx|odt|txt)$/i, '')}.pdf`);
      toast.success(`PDF generated with ${blocks.length} text block(s)`);
    } catch (err) {
      console.error(err);
      toast.error('Error converting the document');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <FileDrop
        label="Drag your document (.docx, .odt or .txt) here, or click"
        accept=".docx,.odt,.txt"
        extensions={['.docx', '.odt', '.txt']}
        fileName={doc?.file.name || null}
        onFile={(file) => setDoc({ file })}
      />

      {doc && (
        <div className="flex gap-3 mt-6 justify-end">
          <button
            className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 disabled:opacity-50"
            onClick={handleConvert}
            disabled={isProcessing}
          >
            {isProcessing ? 'Converting...' : 'Convert and download'}
          </button>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        Note: conversion is 100% local and has basic fidelity: it preserves text, headings and paragraphs, but not images, tables or complex layout. The legacy binary .doc format is not supported (use .docx).
      </p>
    </div>
  );
}

export default DocToPdf;
