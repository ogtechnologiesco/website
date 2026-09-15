import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import mammoth from 'mammoth';
import JSZip from 'jszip';
import toast from 'react-hot-toast';
import FileDrop from './FileDrop';

const A4 = { width: 595.28, height: 841.89 };
const MARGIN = 50;
const LINE_HEIGHT_FACTOR = 1.4;
const LINK_COLOR = rgb(0, 0, 0.85);

const STYLES = {
  h1: { size: 18, bold: true, spaceBefore: 18 },
  h2: { size: 15, bold: true, spaceBefore: 14 },
  h3: { size: 13, bold: true, spaceBefore: 10 },
  p: { size: 11, bold: false, spaceBefore: 6 },
  li: { size: 11, bold: false, spaceBefore: 4 },
  td: { size: 10, bold: false, spaceBefore: 2 },
  th: { size: 10, bold: true, spaceBefore: 2 },
};

const BULLET = '\u2022 ';
const MIN_CELL_WIDTH = 60;
const TABLE_BORDER = rgb(0.6, 0.6, 0.6);

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
    .map((t) => ({ type: 'p', runs: [{ text: t, bold: false, italic: false, link: false }] }));
}

function extractRuns(el) {
  const runs = [];
  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text) runs.push({ text, bold: false, italic: false, link: false });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();
      const isBold = ['strong', 'b'].includes(tag);
      const isItalic = ['em', 'i'].includes(tag);
      const isLink = tag === 'a';
      const childRuns = extractRuns(node);
      for (const r of childRuns) {
        r.bold = r.bold || isBold;
        r.italic = r.italic || isItalic;
        r.link = r.link || isLink;
        runs.push(r);
      }
    }
  }
  return runs;
}

function extractImageFromDataUri(dataUri) {
  const match = dataUri.match(/^data:(image\/(png|jpeg|jpg));base64,(.+)$/);
  if (!match) return null;
  return { format: match[1], data: match[3] };
}

async function extractDocx(file) {
  const arrayBuffer = await file.arrayBuffer();
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const blocks = [];

  for (const el of doc.body.children) {
    const tag = el.tagName.toLowerCase();
    if (['h1', 'h2', 'h3'].includes(tag)) {
      const runs = extractRuns(el);
      if (runs.length === 0) continue;
      blocks.push({ type: tag, runs });
    } else if (tag === 'p') {
      const runs = extractRuns(el);
      if (runs.length === 0) continue;
      blocks.push({ type: 'p', runs });
    } else if (tag === 'ul' || tag === 'ol') {
      let idx = 1;
      for (const li of el.querySelectorAll(':scope > li')) {
        const runs = extractRuns(li);
        if (runs.length === 0) continue;
        blocks.push({
          type: 'li',
          runs,
          listType: tag === 'ol' ? 'number' : 'bullet',
          index: idx++,
        });
      }
    } else if (tag === 'table') {
      const rows = [];
      for (const tr of el.querySelectorAll(':scope > thead > tr, :scope > tbody > tr, :scope > tr')) {
        const cells = [];
        for (const cell of tr.children) {
          const cellTag = cell.tagName.toLowerCase();
          const runs = extractRuns(cell);
          cells.push({ runs, isHeader: cellTag === 'th' });
        }
        if (cells.length) rows.push(cells);
      }
      if (rows.length) blocks.push({ type: 'table', rows });
    } else if (tag === 'img') {
      const src = el.getAttribute('src') || '';
      const img = extractImageFromDataUri(src);
      if (img) blocks.push({ type: 'image', ...img });
    } else {
      const runs = extractRuns(el);
      if (runs.length) blocks.push({ type: 'p', runs });
    }
  }
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
    blocks.push({ type, runs: [{ text, bold: false, italic: false, link: false }] });
  }
  return blocks;
}

function getFontForRun(run, fonts) {
  if (run.bold && run.italic) return fonts.boldOblique;
  if (run.bold) return fonts.bold;
  if (run.italic) return fonts.oblique;
  return fonts.regular;
}

function wrapRunsIntoLines(runs, fonts, size, maxWidth) {
  const lines = [];
  let currentRuns = [];

  for (const run of runs) {
    const font = getFontForRun(run, fonts);
    const words = sanitizeText(run.text).split(/(\s+)/);
    let i = 0;
    while (i < words.length) {
      let word = words[i];
      i++;
      while (i < words.length && /^\s+$/.test(words[i])) {
        word += words[i];
        i++;
      }
      if (!word) continue;

      if (currentRuns.length === 0) {
        currentRuns.push({ ...run, text: word, font });
      } else {
        const candidate = currentRuns.map((r) => r.text).join('') + word;
        const candidateWidth = currentRuns.reduce(
          (sum, r) => sum + r.font.widthOfTextAtSize(r.text, size),
          0,
        ) + font.widthOfTextAtSize(word, size);

        if (candidateWidth <= maxWidth) {
          currentRuns.push({ ...run, text: word, font });
        } else {
          lines.push(currentRuns);
          currentRuns = [{ ...run, text: word.trimStart(), font }];
        }
      }
    }
  }
  if (currentRuns.length) lines.push(currentRuns);
  return lines;
}

function drawRunsLine(page, lineRuns, x, y, size) {
  let currentX = x;
  for (const r of lineRuns) {
    const color = r.link ? LINK_COLOR : rgb(0, 0, 0);
    page.drawText(r.text, { x: currentX, y: y, size, font: r.font, color });
    currentX += r.font.widthOfTextAtSize(r.text, size);
  }
}

async function blocksToPdf(blocks) {
  const pdfDoc = await PDFDocument.create();
  const fonts = {
    regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
    bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    oblique: await pdfDoc.embedFont(StandardFonts.HelveticaOblique),
    boldOblique: await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique),
  };

  let page = pdfDoc.addPage([A4.width, A4.height]);
  let y = A4.height - MARGIN;
  const maxWidth = A4.width - 2 * MARGIN;

  const newPage = () => {
    page = pdfDoc.addPage([A4.width, A4.height]);
    y = A4.height - MARGIN;
  };

  for (const block of blocks) {
    if (block.type === 'image') {
      try {
        const imgBytes = Uint8Array.from(atob(block.data), (c) => c.charCodeAt(0));
        const isPng = block.format === 'image/png';
        const embedded = isPng
          ? await pdfDoc.embedPng(imgBytes)
          : await pdfDoc.embedJpg(imgBytes);

        const maxW = maxWidth;
        const maxH = A4.height - 2 * MARGIN;
        const scale = Math.min(maxW / embedded.width, maxH / embedded.height, 1);
        const w = embedded.width * scale;
        const h = embedded.height * scale;

        if (y - h < MARGIN) newPage();
        y -= h + 10;
        page.drawImage(embedded, {
          x: MARGIN + (maxWidth - w) / 2,
          y,
          width: w,
          height: h,
        });
      } catch (err) {
        console.error('Image embed failed:', err);
      }
      continue;
    }

    if (block.type === 'table') {
      const { rows } = block;
      const numCols = Math.max(...rows.map((r) => r.length));
      const colWidth = Math.max(MIN_CELL_WIDTH, maxWidth / numCols);

      for (const row of rows) {
        let maxCellHeight = 0;
        const cellLines = [];

        for (let c = 0; c < numCols; c++) {
          const cell = row[c] || { runs: [], isHeader: false };
          const style = cell.isHeader ? STYLES.th : STYLES.td;
          const lines = wrapRunsIntoLines(cell.runs, fonts, style.size, colWidth - 8);
          cellLines.push({ lines, style });
          maxCellHeight = Math.max(
            maxCellHeight,
            lines.length * style.size * LINE_HEIGHT_FACTOR + 8,
          );
        }

        if (y - maxCellHeight < MARGIN) newPage();
        y -= maxCellHeight;

        for (let c = 0; c < numCols; c++) {
          const cellX = MARGIN + c * colWidth;
          page.drawRectangle({
            x: cellX,
            y: y - 2,
            width: colWidth,
            height: maxCellHeight,
            borderColor: TABLE_BORDER,
            borderWidth: 0.5,
          });
          const { lines, style } = cellLines[c];
          let textY = y + maxCellHeight - style.size - 4;
          for (const line of lines) {
            drawRunsLine(page, line, cellX + 4, textY, style.size);
            textY -= style.size * LINE_HEIGHT_FACTOR;
          }
        }
        y -= 2;
      }
      y -= 6;
      continue;
    }

    const style = STYLES[block.type] || STYLES.p;
    const lineHeight = style.size * LINE_HEIGHT_FACTOR;

    let runs = block.runs || [{ text: block.text || '', bold: false, italic: false, link: false }];

    if (block.type === 'li') {
      const prefix = block.listType === 'number' ? `${block.index}. ` : BULLET;
      runs = [{ text: prefix, bold: false, italic: false, link: false }, ...runs];
    }

    const lines = wrapRunsIntoLines(runs, fonts, style.size, maxWidth);

    y -= style.spaceBefore;
    for (const line of lines) {
      if (y - lineHeight < MARGIN) newPage();
      drawRunsLine(page, line, MARGIN, y - style.size, style.size);
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
        Note: conversion is 100% local in your browser. It preserves text, headings, bold/italic, bullet and numbered lists, tables (with borders), images (PNG/JPEG), and hyperlinks (visual only). Fonts are limited to Helvetica; colors and complex multi-column layouts are not preserved. The legacy binary .doc format is not supported (use .docx).
      </p>
    </div>
  );
}

export default DocToPdf;
