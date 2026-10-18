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
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
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

// pdf.js exposes real PostScript font names (e.g. "NimbusSanL-Bold") through
// commonObjs after the operator list is fetched — item.fontName is only an
// internal key, so bold/italic cannot be detected from it directly.
async function buildFontMap(page, content, ops, fontMap) {
  const { OPS } = pdfjsLib;
  const names = new Set(Object.keys(content.styles || {}));
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] === OPS.setFont) names.add(ops.argsArray[i][0]);
  }
  await Promise.all(
    [...names]
      .filter((n) => n && !(n in fontMap))
      .map(
        (n) =>
          new Promise((resolve) => {
            const family = content.styles?.[n]?.fontFamily;
            const familyFont =
              family === 'serif'
                ? 'Times New Roman'
                : family === 'monospace'
                  ? 'Courier New'
                  : 'Arial';
            let settled = false;
            const finish = (entry) => {
              if (!settled) {
                settled = true;
                fontMap[n] = entry;
                resolve();
              }
            };
            // Some fonts (non-embedded standard fonts without
            // standardFontDataUrl) never arrive — don't wait forever.
            const timer = setTimeout(
              () => finish({ bold: false, italic: false, family: familyFont }),
              2000,
            );
            try {
              page.commonObjs.get(n, (obj) => {
                clearTimeout(timer);
                const psName = obj?.name || '';
                finish({
                  bold: /bold|black|heavy|semib|demi/i.test(psName),
                  italic: /ital|oblique/i.test(psName),
                  family: familyFont,
                });
              });
            } catch {
              clearTimeout(timer);
              finish({ bold: false, italic: false, family: familyFont });
            }
          }),
      ),
  );
}

function groupItemsIntoLines(items, pageHeight, fontMap) {
  const lines = [];
  for (const item of items) {
    const transform = item.transform;
    const x = transform[4];
    const y = pageHeight - transform[5];
    const fontSize = Math.hypot(transform[0], transform[3]);
    const text = sanitizeText(item.str);
    if (!text) continue;
    // Whitespace items with outsized width are positioning bridges between
    // separately-drawn strings (pdf-lib emits these) — they would span cell
    // and column gaps, so neutralize their width. Their text still joins.
    let width = item.width || 0;
    if (!text.trim() && width > Math.max(fontSize, 1) * 2) width = 0;

    const info = fontMap?.[item.fontName];
    const isBold = info ? info.bold : /bold/i.test(item.fontName || '');
    const isItalic = info ? info.italic : /italic|oblique/i.test(item.fontName || '');
    const fontFamily = info?.family || 'Arial';

    let merged = false;
    for (const line of lines) {
      if (Math.abs(line.y - y) <= 3) {
        line.items.push({ x, width, text, fontSize, isBold, isItalic, fontFamily });
        merged = true;
        break;
      }
    }
    if (!merged) {
      lines.push({ y, items: [{ x, width, text, fontSize, isBold, isItalic, fontFamily }] });
    }
  }

  lines.sort((a, b) => a.y - b.y);
  for (const line of lines) {
    line.items.sort((a, b) => a.x - b.x);
    line.text = line.items.map((i) => i.text).join('');
    line.fontSize = line.items.reduce((max, i) => Math.max(max, i.fontSize), 0);
    line.isBold = line.items.every((i) => i.isBold);
    line.isItalic = line.items.every((i) => i.isItalic);
    const fams = line.items.map((i) => i.fontFamily);
    line.fontFamily = fams.sort((a, b) => fams.filter((v) => v === a).length - fams.filter((v) => v === b).length).pop();
    line.xStart = Math.min(...line.items.map((i) => i.x));
    line.xEnd = Math.max(...line.items.map((i) => i.x + (i.width || i.text.length * i.fontSize * 0.5)));
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
        fontFamily: line.fontFamily,
      };
      blocks.push(current);
    } else {
      current.lines.push(line);
      current.fontSize = Math.max(current.fontSize, line.fontSize);
      current.isBold = current.isBold && line.isBold;
      current.isItalic = current.isItalic && line.isItalic;
      if (!current.fontFamily) current.fontFamily = line.fontFamily;
    }
    prevY = line.y;
  }

  for (const block of blocks) {
    block.y = block.lines[0].y;
    // Join wrapped lines; dehyphenate "exam-" + "ple" into "example".
    let text = '';
    for (const l of block.lines) {
      if (text && text.endsWith('-') && /^[a-z]/.test(l.text)) {
        text = text.slice(0, -1) + l.text;
      } else {
        text = text ? `${text} ${l.text}` : l.text;
      }
    }
    block.text = text.trim();
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
    }
  }
  // Numbered items only convert in runs of two or more — a single
  // "3. MARKET ANALYSIS" is a numbered heading, not a one-item list.
  let i = 0;
  while (i < blocks.length) {
    const isNumbered = (b) => b.type === 'p' && /^\d+[.)]\s+/.test(b.text);
    if (isNumbered(blocks[i])) {
      let j = i;
      while (j < blocks.length && isNumbered(blocks[j])) j++;
      if (j - i >= 2) {
        for (let k = i; k < j; k++) {
          blocks[k].type = 'li';
          blocks[k].listType = 'number';
          blocks[k].text = blocks[k].text.replace(/^\d+[.)]\s+/, '');
        }
      }
      i = j;
    } else {
      i++;
    }
  }
}

/* ── columns & tables ───────────────────────────────────────── */

const estimateItemWidth = (item) =>
  item.width || item.text.length * item.fontSize * 0.5;

function makeSegment(items, y) {
  return {
    y,
    x: items[0].x,
    x1: items[items.length - 1].x + estimateItemWidth(items[items.length - 1]),
    items,
    text: items.map((i) => i.text).join('').trim(),
    fontSize: items.reduce((m, i) => Math.max(m, i.fontSize), 0),
    isBold: items.every((i) => i.isBold),
    isItalic: items.every((i) => i.isItalic),
    fontFamily: items[0].fontFamily,
  };
}

// Split each merged line at horizontal gaps — table cells and text in
// separate columns share the same baseline y, so a line often contains
// several independent segments.
function splitLinesToSegments(lines) {
  const segments = [];
  for (const line of lines) {
    // A word gap is ~0.25-0.33 em; anything beyond ~0.6 em is a cell or
    // column boundary. Column gutters can be as tight as 10pt.
    const threshold = Math.max(6, line.fontSize * 0.6);
    let cur = [];
    let prevEnd = null;
    for (const item of line.items) {
      if (prevEnd !== null && item.x - prevEnd > threshold) {
        segments.push(makeSegment(cur, line.y));
        cur = [];
      }
      cur.push(item);
      prevEnd = Math.max(prevEnd ?? -Infinity, item.x + estimateItemWidth(item));
    }
    if (cur.length) segments.push(makeSegment(cur, line.y));
  }
  segments.sort((a, b) => a.y - b.y || a.x - b.x);
  return segments;
}

// Group segments into visual rows (same baseline).
function groupRows(segments) {
  const rows = [];
  for (const seg of segments) {
    const last = rows[rows.length - 1];
    if (last && seg.y - last.y <= 4) last.segs.push(seg);
    else rows.push({ y: seg.y, segs: [seg] });
  }
  return rows;
}

// Count x-start clusters that appear in at least two rows of the run.
function countAlignedColumns(run) {
  const cols = [];
  for (const row of run) {
    for (const s of row.segs) {
      const c = cols.find((k) => Math.abs(k.x - s.x) <= 15);
      if (c) c.count++;
      else cols.push({ x: s.x, count: 1 });
    }
  }
  return cols.filter((c) => c.count >= 2).length;
}

// A table = >=2 consecutive rows with >=3 cells each, aligned in >=3
// columns. Two-cell rows are ambiguous with two-column text, so they are
// left to the column detector (unless lattice borders prove them).
// Rows are padded to the column grid and wrapped cell lines are merged
// into the cell above when their gap is a fraction of the table's normal
// row spacing (pdf2docx merges at line level).
function buildStreamTableRows(run, bounds) {
  const gridRows = run.map((r) => {
    const cells = new Array(bounds.length).fill(null);
    for (const s of r.segs) {
      let bi = -1;
      let bd = Infinity;
      bounds.forEach((bx, i) => {
        const d = Math.abs(bx - s.x);
        if (d < bd) {
          bd = d;
          bi = i;
        }
      });
      if (bi === -1 || bd > 18) continue;
      cells[bi] = cells[bi] ? `${cells[bi]} ${s.text}` : s.text;
    }
    return { y: r.y, fontSize: r.segs.reduce((m, s) => Math.max(m, s.fontSize), 0), cells };
  });

  const gaps = [];
  for (let i = 1; i < gridRows.length; i++) gaps.push(gridRows[i].y - gridRows[i - 1].y);
  const medGap = medianValue(gaps.filter((g) => g > 0));

  const out = [gridRows[0]];
  for (let i = 1; i < gridRows.length; i++) {
    const cur = gridRows[i];
    const prev = out[out.length - 1];
    const curFilled = cur.cells.filter(Boolean).length;
    const prevFilled = prev.cells.filter(Boolean).length;
    const gap = cur.y - prev.y;
    const mergeLimit = Math.min(medGap * 0.75, prev.fontSize * 1.6);
    if (
      curFilled > 0 && curFilled < prevFilled &&
      medGap > 0 && gap > 0 && gap <= mergeLimit
    ) {
      cur.cells.forEach((t, ci) => {
        if (!t) return;
        prev.cells[ci] = prev.cells[ci] ? `${prev.cells[ci]}\n${t}` : t;
      });
      prev.y = cur.y;
    } else {
      out.push(cur);
    }
  }
  return out.map((r) => r.cells.map((t) => ({ text: t || '' })));
}

function extractTables(events) {
  let i = 0;
  while (i < events.length) {
    const ev = events[i];
    if (ev.kind === 'row' && ev.row.segs.length >= 3) {
      const run = [];
      let j = i;
      while (j < events.length && events[j].kind === 'row' && events[j].row.segs.length >= 3) {
        run.push(events[j].row);
        j++;
      }
      if (run.length >= 2 && countAlignedColumns(run) >= 3) {
        // column boundaries from the aligned x-start clusters
        const cols = [];
        for (const row of run) {
          for (const s of row.segs) {
            const c = cols.find((k) => Math.abs(k.x - s.x) <= 15);
            if (c) c.count++;
            else cols.push({ x: s.x, count: 1 });
          }
        }
        const bounds = cols.filter((c) => c.count >= 2).map((c) => c.x).sort((a, b) => a - b);
        if (bounds.length >= 2) {
          // absorb wrapped continuation rows: sparse rows whose segs all
          // snap onto the grid within a fraction of the row spacing are
          // cell continuations, not new rows (pdf2docx line-level merge)
          const runGaps = [];
          for (let k = 1; k < run.length; k++) runGaps.push(run[k].y - run[k - 1].y);
          const runMed = medianValue(runGaps.filter((g) => g > 0)) || 12;
          while (j < events.length && events[j].kind === 'row') {
            const r = events[j].row;
            if (r.segs.length >= 3) {
              const snapped = r.segs.filter((s) =>
                bounds.some((bx) => Math.abs(bx - s.x) <= 18),
              ).length;
              if (snapped < 2) break;
              run.push(r);
              j++;
              continue;
            }
            const gapOk = r.y - run[run.length - 1].y <= runMed * 0.75;
            const snaps = r.segs.every((s) =>
              bounds.some((bx) => Math.abs(bx - s.x) <= 18),
            );
            if (!gapOk || !snaps) break;
            run.push(r);
            j++;
          }
          // per-column width = extent of cells assigned to that column
          const colWidths = bounds.map((bx) => {
            let right = bx + 10;
            for (const row of run) {
              for (const s of row.segs) {
                if (Math.abs(s.x - bx) <= 18) right = Math.max(right, s.x1);
              }
            }
            return right - bx;
          });
          const rows = buildStreamTableRows(run, bounds);
          run.forEach((r) => r.segs.forEach((s) => { s.inTable = true; }));
          events.splice(i, j - i, {
            kind: 'table',
            y: run[0].y,
            x: Math.min(...run.flatMap((r) => r.segs.map((s) => s.x))),
            rows,
            colWidths: colWidths.map((w) => Math.round(w * 20)),
          });
          i++;
          continue;
        }
      }
      i = j;
    } else {
      i++;
    }
  }
}

// Find a vertical band separating two text columns. Candidates come from
// two sources: global whitespace bands (no segment crosses them at all)
// and per-row gaps clustered across rows — the latter tolerates a few
// bridging lines (full-width notes) that would mask the gutter in a
// global merge. The best candidate has the most segments cleanly on
// either side and the fewest crossing it.
function findGutter(segments) {
  if (segments.length < 8) return null;

  const candidates = [];

  // Global whitespace bands.
  const ivs = segments.map((s) => [s.x, s.x1]).sort((a, b) => a[0] - b[0]);
  let end = -Infinity;
  for (const [x0, x1] of ivs) {
    if (end !== -Infinity && x0 > end + 6) candidates.push([end, x0]);
    end = Math.max(end, x1);
  }

  // Per-row gaps, clustered where they overlap across rows.
  const rows = [];
  for (const s of segments) {
    const last = rows[rows.length - 1];
    if (last && s.y - last.y <= 4) last.segs.push(s);
    else rows.push({ y: s.y, segs: [s] });
  }
  const gaps = [];
  for (const row of rows) {
    row.segs.sort((a, b) => a.x - b.x);
    for (let i = 1; i < row.segs.length; i++) {
      const g0 = row.segs[i - 1].x1;
      const g1 = row.segs[i].x;
      if (g1 - g0 > 6) gaps.push([g0, g1]);
    }
  }
  gaps.sort((a, b) => a[0] - b[0]);
  let cluster = [];
  let clusterEnd = -Infinity;
  const flush = () => {
    if (cluster.length >= 3) {
      const start = Math.max(...cluster.map((g) => g[0]));
      const stop = Math.min(...cluster.map((g) => g[1]));
      if (start < stop) candidates.push([start, stop]);
      else {
        const mids = cluster.map((g) => (g[0] + g[1]) / 2).sort((a, b) => a - b);
        const mid = mids[Math.floor(mids.length / 2)];
        candidates.push([mid - 4, mid + 4]);
      }
    }
    cluster = [];
  };
  for (const g of gaps) {
    if (cluster.length && g[0] > clusterEnd) flush();
    cluster.push(g);
    clusterEnd = Math.max(clusterEnd, g[1]);
  }
  flush();

  // Boundary clustering (pdfplumber "text" strategy analogue): a column
  // edge is where many segments end, the next column where many start.
  // Works even when the columns rarely share a baseline.
  const clust1d = (vals, tol = 10, minN = 3) => {
    const out = [];
    for (const v of vals) {
      const last = out[out.length - 1];
      if (last && v - last.hi <= tol) {
        last.hi = v;
        last.n++;
      } else {
        out.push({ lo: v, hi: v, n: 1 });
      }
    }
    return out.filter((c) => c.n >= minN);
  };
  const endCls = clust1d(segments.map((s) => s.x1).sort((a, b) => a - b));
  const startCls = clust1d(segments.map((s) => s.x).sort((a, b) => a - b));
  for (const e of endCls) {
    const s = startCls.find((k) => k.lo > e.hi - 4);
    if (s && s.lo - e.hi >= 4) candidates.push([e.hi, s.lo]);
  }

  let best = null;
  let bestScore = 0;
  for (const [g0, g1] of candidates) {
    if (g1 - g0 < 6) continue;
    const left = segments.filter((s) => s.x1 <= g0).length;
    const right = segments.filter((s) => s.x >= g1).length;
    if (left < 3 || right < 3) continue;
    const crossing = segments.filter((s) => s.x < g0 && s.x1 > g1).length;
    const score = left + right - 2 * crossing;
    if (score > bestScore) {
      bestScore = score;
      best = [g0, g1];
    }
  }
  return best;
}

// Fold an ordered event list (row groups + tables) into document blocks.
function foldEvents(events) {
  const blocks = [];
  let lineRun = [];
  const flush = () => {
    if (!lineRun.length) return;
    const b = groupLinesIntoBlocks(lineRun);
    detectLists(b);
    blocks.push(...b);
    lineRun = [];
  };
  for (const ev of events) {
    if (ev.kind === 'table') {
      flush();
      blocks.push({ type: 'table', rows: ev.rows, colWidths: ev.colWidths, y: ev.y });
    } else {
      for (const seg of ev.row.segs) {
        lineRun.push({
          y: seg.y,
          items: seg.items,
          text: seg.text,
          fontSize: seg.fontSize,
          isBold: seg.isBold,
          isItalic: seg.isItalic,
          fontFamily: seg.fontFamily,
          xStart: seg.x,
          xEnd: seg.x1,
        });
      }
    }
  }
  flush();
  return blocks;
}

// Recursive XY-cut ordering. Rows whose segment fully spans the detected
// gutter are "cross-layout" elements (XY-Cut++ phase 1): instead of joining
// either column they split the page into horizontal bands. Within a band
// the left column reads fully before the right one, and each band-side
// recurses so three- and four-column layouts resolve too. Sparse sides
// (title-page artifacts) fall back to a plain fold (PDF Oxide guard).
function orderColumnEvents(events, segments, depth = 0) {
  if (depth >= 2 || !events.length) return foldEvents(events);
  const free = segments.filter((s) => !s.inTable);
  const gutter = findGutter(free);
  if (!gutter) return foldEvents(events);
  const [g0, g1] = gutter;
  const mid = (g0 + g1) / 2;

  const left = [];
  const right = [];
  const spanners = [];
  for (const ev of events) {
    if (ev.kind === 'table') {
      (ev.x < mid ? left : right).push(ev);
      continue;
    }
    if (ev.row.segs.some((s) => s.x < g0 && s.x1 > g1)) {
      spanners.push(ev);
      continue;
    }
    const l = ev.row.segs.filter((s) => s.x < mid);
    const r = ev.row.segs.filter((s) => s.x >= mid);
    if (l.length) left.push({ kind: 'row', row: { segs: l }, y: ev.y });
    if (r.length) right.push({ kind: 'row', row: { segs: r }, y: ev.y });
  }
  if (left.length < 3 || right.length < 3) return foldEvents(events);

  left.sort((a, b) => a.y - b.y);
  right.sort((a, b) => a.y - b.y);
  spanners.sort((a, b) => a.y - b.y);

  const out = [];
  let li = 0;
  let ri = 0;
  const emitBand = (upToY) => {
    const lBand = [];
    const rBand = [];
    const lSegs = [];
    const rSegs = [];
    while (li < left.length && left[li].y < upToY) {
      lBand.push(left[li]);
      if (left[li].kind === 'row') lSegs.push(...left[li].row.segs);
      li++;
    }
    while (ri < right.length && right[ri].y < upToY) {
      rBand.push(right[ri]);
      if (right[ri].kind === 'row') rSegs.push(...right[ri].row.segs);
      ri++;
    }
    if (lBand.length) out.push(...orderColumnEvents(lBand, lSegs, depth + 1));
    if (rBand.length) out.push(...orderColumnEvents(rBand, rSegs, depth + 1));
  };
  for (const sp of spanners) {
    emitBand(sp.y);
    out.push(...foldEvents([sp]));
  }
  emitBand(Infinity);
  return out;
}

// ── ruling lines (lattice table borders) ──────────────────────
// Walks the operator list tracking the CTM (save/restore/transform/form
// XObjects), collects stroked/filled path edges, and keeps only the
// axis-aligned ones — the borders of "lattice" tables (pdfplumber's
// "lines" strategy, pdf2docx's explicit tables).

const PATH_MOVE_TO = 13;
const PATH_LINE_TO = 14;
const PATH_CURVE_TO = 15;
const PATH_CURVE_2 = 16;
const PATH_CURVE_3 = 17;
const PATH_CLOSE = 18;
const PATH_RECT = 19;

const mulMatrix = (m1, m2) => [
  m1[0] * m2[0] + m1[2] * m2[1],
  m1[1] * m2[0] + m1[3] * m2[1],
  m1[0] * m2[2] + m1[2] * m2[3],
  m1[1] * m2[2] + m1[3] * m2[3],
  m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
  m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
];

const applyMatrix = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];

function extractRulingLines(ops, pageHeight) {
  const { OPS } = pdfjsLib;
  const hLines = [];
  const vLines = [];
  let ctm = [1, 0, 0, 1, 0, 0];
  let lineWidth = 1;
  let strokeColor = [0, 0, 0];
  let fillColor = [0, 0, 0];
  const stack = [];
  let path = null;

  const paint = (color, width) => {
    if (!path) return;
    const P = path.pts.map(([x, y]) => applyMatrix(ctm, x, y));
    const pushEdge = (pA, pB) => {
      const dx = Math.abs(pB[0] - pA[0]);
      const dy = Math.abs(pB[1] - pA[1]);
      if (dx < 1 && dy >= 3) {
        vLines.push({
          x: (pA[0] + pB[0]) / 2,
          y0: pageHeight - Math.max(pA[1], pB[1]),
          y1: pageHeight - Math.min(pA[1], pB[1]),
        });
      } else if (dy < 1 && dx >= 3) {
        hLines.push({
          y: pageHeight - (pA[1] + pB[1]) / 2,
          x0: Math.min(pA[0], pB[0]),
          x1: Math.max(pA[0], pB[0]),
        });
      }
    };
    for (let k = 1; k < P.length; k++) pushEdge(P[k - 1], P[k]);
    if (path.closed && P.length > 2) pushEdge(P[P.length - 1], P[0]);
    path = null;
  };

  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i];
    const args = ops.argsArray[i];
    switch (fn) {
      case OPS.save:
        stack.push({ ctm, lineWidth, strokeColor, fillColor });
        break;
      case OPS.restore: {
        const s = stack.pop();
        if (s) ({ ctm, lineWidth, strokeColor, fillColor } = s);
        break;
      }
      case OPS.transform:
        ctm = mulMatrix(ctm, args);
        break;
      case OPS.paintFormXObjectBegin:
        stack.push({ ctm, lineWidth, strokeColor, fillColor });
        if (args?.[0]) ctm = mulMatrix(ctm, args[0]);
        break;
      case OPS.paintFormXObjectEnd: {
        const s = stack.pop();
        if (s) ({ ctm, lineWidth, strokeColor, fillColor } = s);
        break;
      }
      case OPS.setLineWidth:
        lineWidth = args[0] || 1;
        break;
      case OPS.setStrokeRGBColor:
        strokeColor = [args[0], args[1], args[2]];
        break;
      case OPS.setFillRGBColor:
        fillColor = [args[0], args[1], args[2]];
        break;
      case OPS.constructPath: {
        const [pops, coords] = args;
        const pts = [];
        let ci = 0;
        let closed = false;
        for (const op of pops) {
          if (op === PATH_MOVE_TO || op === PATH_LINE_TO) {
            pts.push([coords[ci++], coords[ci++]]);
          } else if (op === PATH_RECT) {
            const [x, y, w, h] = [coords[ci++], coords[ci++], coords[ci++], coords[ci++]];
            pts.push([x, y], [x + w, y], [x + w, y + h], [x, y + h]);
            closed = true;
          } else if (op === PATH_CURVE_TO) {
            ci += 4;
            pts.push([coords[ci++], coords[ci++]]);
          } else if (op === PATH_CURVE_2 || op === PATH_CURVE_3) {
            ci += 2;
            pts.push([coords[ci++], coords[ci++]]);
          } else if (op === PATH_CLOSE) {
            closed = true;
          }
        }
        path = { pts, closed };
        break;
      }
      case OPS.stroke:
      case OPS.closeStroke:
      case OPS.fillStroke:
      case OPS.eoFillStroke:
      case OPS.closeFillStroke:
      case OPS.closeEOFillStroke:
        paint(strokeColor, lineWidth);
        break;
      case OPS.fill:
      case OPS.eoFill:
        // Filled rectangles are cell shading — their edges are still
        // strong structure evidence (pdfplumber uses rect edges too).
        paint(fillColor, 0);
        break;
      case OPS.endPath:
        path = null;
        break;
      default:
        break;
    }
  }
  return { hLines, vLines };
}

// ── lattice table reconstruction from ruling lines ───────────

const lineCoverage = (intervals, from, to, tol = 3) => {
  let covered = 0;
  for (const [a, b] of intervals) {
    const lo = Math.max(a, from - tol);
    const hi = Math.min(b, to + tol);
    if (hi > lo) covered += hi - lo;
  }
  return covered / Math.max(1e-6, to - from);
};

function clusterParallel(lines, keyFn, rangeFn) {
  const sorted = [...lines].sort((a, b) => keyFn(a) - keyFn(b));
  const clusters = [];
  for (const l of sorted) {
    const k = keyFn(l);
    const last = clusters[clusters.length - 1];
    if (last && Math.abs(last.pos - k) <= 2.5) last.lines.push(l);
    else clusters.push({ pos: k, lines: [l] });
  }
  for (const c of clusters) {
    c.intervals = c.lines.map(rangeFn);
    c.min = Math.min(...c.intervals.map((iv) => iv[0]));
    c.max = Math.max(...c.intervals.map((iv) => iv[1]));
  }
  return clusters;
}

function detectLatticeTables(ruling, segments) {
  if (!ruling || ruling.hLines.length < 2 || ruling.vLines.length < 2) return [];
  const hClusters = clusterParallel(ruling.hLines, (l) => l.y, (l) => [l.x0, l.x1]);
  const vClusters = clusterParallel(ruling.vLines, (l) => l.x, (l) => [l.y0, l.y1]);
  if (hClusters.length < 2 || vClusters.length < 2) return [];

  // connected components: a vertical and horizontal cluster intersect
  // when each lies within the other's extent
  const hAdj = hClusters.map(() => []);
  vClusters.forEach((v, vi) => {
    hClusters.forEach((h, hi) => {
      if (v.pos >= h.min - 2 && v.pos <= h.max + 2 && h.pos >= v.min - 2 && h.pos <= v.max + 2) {
        hAdj[hi].push(vi);
      }
    });
  });
  // union-find over h clusters via shared v clusters
  const parent = hClusters.map((_, i) => i);
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const vSeen = new Array(vClusters.length).fill(-1);
  hAdj.forEach((vis, hi) => {
    for (const vi of vis) {
      if (vSeen[vi] !== -1) parent[find(hi)] = find(vSeen[vi]);
      else vSeen[vi] = hi;
    }
  });

  const tables = [];
  const byRoot = new Map();
  hClusters.forEach((_, hi) => {
    const root = find(hi);
    if (!byRoot.has(root)) byRoot.set(root, { hs: [], vs: new Set() });
    byRoot.get(root).hs.push(hi);
    hAdj[hi].forEach((vi) => byRoot.get(root).vs.add(vi));
  });

  for (const { hs, vs } of byRoot.values()) {
    const hsPos = hs.map((hi) => hClusters[hi]).sort((a, b) => a.pos - b.pos);
    const vsPos = [...vs].map((vi) => vClusters[vi]).sort((a, b) => a.pos - b.pos);
    const ys = hsPos.map((c) => c.pos);
    const xs = vsPos.map((c) => c.pos);
    const nRows = ys.length - 1;
    const nCols = xs.length - 1;
    if (nRows < 1 || nCols < 1 || nRows * nCols < 2 || nCols > 40 || nRows > 300) continue;

    // claim all segments whose center falls inside the grid
    const inGrid = (s) => {
      const cx = (s.x + s.x1) / 2;
      const cy = s.y + s.fontSize / 2;
      return cx > xs[0] && cx < xs[nCols] && cy > ys[0] && cy < ys[nRows];
    };
    const claimed = segments.filter((s) => !s.inTable && inGrid(s));
    if (claimed.length < 2) continue;

    // border presence between adjacent rows/columns
    const hCover = (yIdx, c) => lineCoverage(hsPos[yIdx].intervals, xs[c], xs[c + 1]) >= 0.6;
    const vCover = (xIdx, r) => lineCoverage(vsPos[xIdx].intervals, ys[r], ys[r + 1]) >= 0.6;

    const occupied = Array.from({ length: nRows }, () => new Array(nCols).fill(false));
    const cellTexts = new Map();
    for (const s of claimed) {
      s.inTable = true;
      const cx = (s.x + s.x1) / 2;
      const cy = s.y + s.fontSize / 2;
      let c = 0;
      while (c < nCols - 1 && cx >= xs[c + 1]) c++;
      let r = 0;
      while (r < nRows - 1 && cy >= ys[r + 1]) r++;
      const key = `${r}|${c}`;
      if (!cellTexts.has(key)) cellTexts.set(key, []);
      cellTexts.get(key).push(s);
    }

    const rows = [];
    for (let r = 0; r < nRows; r++) {
      const rowCells = [];
      for (let c = 0; c < nCols; c++) {
        if (occupied[r][c]) continue;
        // rectangular span: extend right while internal verticals are
        // absent, then down while internal horizontals are absent
        let cw = 1;
        while (c + cw < nCols && !vCover(c + cw, r)) cw++;
        let rh = 1;
        outerLoop: while (r + rh < nRows) {
          for (let cc = c; cc < c + cw; cc++) {
            if (hCover(r + rh, cc)) break outerLoop;
          }
          for (let cc = c + 1; cc < c + cw; cc++) {
            if (vCover(cc, r + rh)) break outerLoop;
          }
          rh++;
        }
        for (let rr = r; rr < r + rh; rr++) {
          for (let cc = c; cc < c + cw; cc++) occupied[rr][cc] = true;
        }
        const texts = (cellTexts.get(`${r}|${c}`) || [])
          .sort((a, b) => a.y - b.y || a.x - b.x)
          .map((s) => s.text);
        const cell = { text: texts.join('\n') };
        if (cw > 1) cell.colSpan = cw;
        if (rh > 1) cell.rowSpan = rh;
        rowCells.push(cell);
      }
      if (rowCells.length) rows.push(rowCells);
    }
    if (!rows.length) continue;
    tables.push({
      kind: 'table',
      y: ys[0],
      x: xs[0],
      rows,
      colWidths: xs.slice(0, nCols).map((v, k) => Math.round((xs[k + 1] - v) * 20)),
      lattice: true,
    });
  }
  return tables;
}

// ── evidence-validated splits ──────────────────────────────────
// Splitting at every >0.6em gap is optimistic: justified text can produce
// wide word gaps. Keep a split only when the position is corroborated
// across rows, lies inside the voted column gutter, or is very wide.

function pruneUnsupportedSplits(segments, gutter) {
  const rows = groupRows(segments);
  const clusters = [];
  for (const row of rows) {
    row.segs.sort((a, b) => a.x - b.x);
    row.gaps = [];
    for (let i = 1; i < row.segs.length; i++) {
      const g0 = row.segs[i - 1].x1;
      const g1 = row.segs[i].x;
      if (g1 - g0 <= 0) {
        row.gaps.push(null);
        continue;
      }
      const mid = (g0 + g1) / 2;
      row.gaps.push({ g0, g1, mid, w: g1 - g0 });
      const c = clusters.find((k) => Math.abs(k.mid - mid) <= 10);
      if (c) c.count++;
      else clusters.push({ mid, count: 1 });
    }
  }
  const inGutter = (g) => gutter && g.g1 > gutter[0] + 1 && g.g0 < gutter[1] - 1;
  for (const row of rows) {
    const kept = [row.segs[0]];
    for (let i = 1; i < row.segs.length; i++) {
      const g = row.gaps[i - 1];
      const c = g ? clusters.find((k) => Math.abs(k.mid - g.mid) <= 10) : null;
      const supported = g && (g.w >= 15 || inGutter(g) || (c && c.count >= 3));
      if (supported) {
        kept.push(row.segs[i]);
      } else {
        const prev = kept[kept.length - 1];
        prev.items = prev.items.concat(row.segs[i].items);
        prev.x1 = Math.max(prev.x1, row.segs[i].x1);
        prev.text = `${prev.text} ${row.segs[i].text}`;
        prev.fontSize = Math.max(prev.fontSize, row.segs[i].fontSize);
        prev.isBold = prev.isBold && row.segs[i].isBold;
        prev.isItalic = prev.isItalic && row.segs[i].isItalic;
      }
    }
    row.segs = kept;
    delete row.gaps;
  }
  return rows.flatMap((r) => r.segs);
}

// ── alignment ─────────────────────────────────────────────────

const medianValue = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

function assignAlignment(blocks, bounds) {
  const contentW = bounds.right - bounds.left;
  if (!(contentW > 60)) return;
  for (const b of blocks) {
    if (b.type === 'table' || b.type === 'li' || !b.lines?.length) continue;
    const leftGaps = b.lines.map((l) => (l.xStart ?? bounds.left) - bounds.left);
    const rightGaps = b.lines.map((l) => bounds.right - (l.xEnd ?? bounds.right));
    const medL = medianValue(leftGaps);
    const medR = medianValue(rightGaps);
    const minR = Math.min(...rightGaps);
    if (
      medL > 12 && medR > 12 &&
      Math.abs(medL - medR) < Math.max(8, contentW * 0.06)
    ) {
      b.alignment = 'center';
    } else if (medL > 15 && minR < 8 && medR > 8) {
      b.alignment = 'right';
    }
  }
}

// Turn merged text lines into ordered document blocks: lattice tables
// claim their cell text first, then remaining splits are validated,
// stream tables detected, and two-column pages get correct reading order.
function structurePage(lines, ruling) {
  const segments = splitLinesToSegments(lines);
  if (!segments.length) return [];
  const bounds = { left: Infinity, right: -Infinity };
  for (const s of segments) {
    bounds.left = Math.min(bounds.left, s.x);
    bounds.right = Math.max(bounds.right, s.x1);
  }

  const lattice = detectLatticeTables(ruling, segments);
  const free = segments.filter((s) => !s.inTable);
  const gutter = findGutter(free);
  const pruned = pruneUnsupportedSplits(free, gutter);

  const rows = groupRows(pruned);
  const events = [];
  const sortedLattice = [...lattice].sort((a, b) => a.y - b.y);
  let li = 0;
  for (const row of rows) {
    while (li < sortedLattice.length && sortedLattice[li].y <= row.y) {
      events.push(sortedLattice[li++]);
    }
    events.push({ kind: 'row', row, y: row.y });
  }
  while (li < sortedLattice.length) events.push(sortedLattice[li++]);

  extractTables(events);
  const blocks = orderColumnEvents(events, pruned);
  assignAlignment(blocks, bounds);
  return blocks;
}

/* ── OCR (tesseract.js) ─────────────────────────────────────── */

async function createOcrWorker(logger) {
  const { createWorker, OEM } = await import('tesseract.js');
  return createWorker('eng', OEM.LSTM_ONLY, {
    workerPath: '/tessdata/worker.min.js',
    workerBlobURL: true,
    corePath: '/tessdata',
    langPath: '/tessdata',
    gzip: true,
    logger,
  });
}

function tsvToLines(tsv, scaleDiv) {
  const rows = tsv.split('\n').slice(1);
  const byKey = new Map();
  for (const row of rows) {
    const cols = row.split('\t');
    if (cols.length < 12 || Number(cols[0]) !== 5) continue;
    const key = `${cols[2]}|${cols[3]}|${cols[4]}`;
    const left = Number(cols[6]);
    const top = Number(cols[7]);
    const width = Number(cols[8]);
    const height = Number(cols[9]);
    const text = sanitizeText(cols[11]);
    if (!text) continue;
    if (!byKey.has(key)) byKey.set(key, { y: top, maxH: 0, words: [] });
    const line = byKey.get(key);
    line.y = Math.min(line.y, top);
    line.maxH = Math.max(line.maxH, height);
    line.words.push({ x: left, width, text });
  }
  const lines = [];
  for (const l of byKey.values()) {
    l.words.sort((a, b) => a.x - b.x);
    const fontSize = Math.max((l.maxH * 0.75) / scaleDiv, 6);
    const items = l.words.map((w) => ({
      x: w.x / scaleDiv,
      width: w.width / scaleDiv,
      text: `${w.text} `,
      fontSize,
      isBold: false,
      isItalic: false,
      fontFamily: 'Arial',
    }));
    const text = items.map((i) => i.text).join('').trim();
    if (!text) continue;
    const xStart = items[0].x;
    const xEnd = items[items.length - 1].x + (items[items.length - 1].width || 0);
    lines.push({ y: l.y / scaleDiv, items, text, fontSize, isBold: false, isItalic: false, fontFamily: 'Arial', xStart, xEnd });
  }
  lines.sort((a, b) => a.y - b.y);
  return lines;
}

function ocrDataToLines(data, scaleDiv) {
  if (data.tsv) {
    const fromTsv = tsvToLines(data.tsv, scaleDiv);
    if (fromTsv.length) return fromTsv;
  }
  // Fallback: plain text split, no positional information.
  return (data.text || '')
    .split('\n')
    .map((t) => sanitizeText(t))
    .filter(Boolean)
    .map((text, i) => ({
      y: i * 14,
      items: [{ x: 0, text, fontSize: 11, isBold: false, isItalic: false }],
      text,
      fontSize: 11,
      isBold: false,
      isItalic: false,
    }));
}

async function ocrPage(page, worker) {
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  await page.render({ canvasContext: ctx, viewport }).promise;
  const { data } = await worker.recognize(canvas);
  return ocrDataToLines(data, 2);
}

/* ── embedded image extraction ──────────────────────────────── */

const getObjectAsync = (page, name) =>
  new Promise((resolve) => {
    const stores = [page.commonObjs, page.objs].filter(Boolean);
    for (const store of stores) {
      try {
        const v = store.get(name);
        if (v) return resolve(v);
      } catch { /* not yet resolved */ }
    }
    let settled = false;
    let registered = 0;
    for (const store of stores) {
      try {
        store.get(name, (v) => {
          if (!settled) {
            settled = true;
            resolve(v || null);
          }
        });
        registered++;
      } catch { /* try next store */ }
    }
    if (!registered) resolve(null);
  });

async function imageToBytes(img) {
  try {
    // Raw JPEG passthrough — no need to re-encode.
    if (img.data && img.data[0] === 0xff && img.data[1] === 0xd8) {
      return { data: img.data, width: img.width, height: img.height, type: 'jpg' };
    }

    let canvas;
    const bmp = img.bitmap || img;
    if ((bmp instanceof ImageBitmap || bmp instanceof HTMLImageElement) || (!img.data && bmp.width && bmp.height)) {
      canvas = document.createElement('canvas');
      canvas.width = bmp.width;
      canvas.height = bmp.height;
      canvas.getContext('2d').drawImage(bmp, 0, 0);
    } else if (img.data && img.width && img.height) {
      canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(img.width, img.height);
      const d = imageData.data;
      const s = img.data;
      if (img.kind === 3) {
        d.set(s.subarray(0, d.length));
      } else if (img.kind === 2) {
        for (let i = 0, j = 0; i + 2 < s.length && j + 3 < d.length; i += 3, j += 4) {
          d[j] = s[i]; d[j + 1] = s[i + 1]; d[j + 2] = s[i + 2]; d[j + 3] = 255;
        }
      } else if (img.kind === 1) {
        const rowLen = Math.ceil(img.width / 8);
        for (let y = 0; y < img.height; y++) {
          for (let x = 0; x < img.width; x++) {
            const v = (s[y * rowLen + (x >> 3)] >> (7 - (x & 7))) & 1 ? 255 : 0;
            const j = (y * img.width + x) * 4;
            d[j] = v; d[j + 1] = v; d[j + 2] = v; d[j + 3] = 255;
          }
        }
      } else {
        return null;
      }
      ctx.putImageData(imageData, 0, 0);
    } else {
      return null;
    }

    const maxDim = 1600;
    if (canvas.width > maxDim || canvas.height > maxDim) {
      const scale = maxDim / Math.max(canvas.width, canvas.height);
      const shrunk = document.createElement('canvas');
      shrunk.width = Math.max(1, Math.round(canvas.width * scale));
      shrunk.height = Math.max(1, Math.round(canvas.height * scale));
      shrunk.getContext('2d').drawImage(canvas, 0, 0, shrunk.width, shrunk.height);
      canvas = shrunk;
    }

    const hasAlpha = img.kind === 3;
    const mime = hasAlpha ? 'image/png' : 'image/jpeg';
    const blob = await new Promise((r) => canvas.toBlob(r, mime, 0.92));
    if (!blob) return null;
    return {
      data: new Uint8Array(await blob.arrayBuffer()),
      width: canvas.width,
      height: canvas.height,
      type: hasAlpha ? 'png' : 'jpg',
    };
  } catch {
    return null;
  }
}

// Extracts embedded images with their placement: the paint-time CTM maps
// the unit square to the image's page rectangle. Full-page images are
// background scans — keep them only on OCR pages where they are the
// content itself.
async function extractPageImages(page, ops, viewport, allowFullPage) {
  const { OPS } = pdfjsLib;
  const images = [];
  const seen = new Set();
  let ctm = [1, 0, 0, 1, 0, 0];
  const stack = [];

  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i];
    const args = ops.argsArray[i];
    if (
      fn !== OPS.paintImageXObject &&
      fn !== OPS.paintJpegXObject &&
      fn !== OPS.paintInlineImageXObject
    ) {
      switch (fn) {
        case OPS.save:
          stack.push(ctm);
          break;
        case OPS.restore:
          ctm = stack.pop() || ctm;
          break;
        case OPS.transform:
          ctm = mulMatrix(ctm, args);
          break;
        case OPS.paintFormXObjectBegin:
          stack.push(ctm);
          if (args?.[0]) ctm = mulMatrix(ctm, args[0]);
          break;
        case OPS.paintFormXObjectEnd:
          ctm = stack.pop() || ctm;
          break;
        default:
          break;
      }
      continue;
    }
    const name = args[0];
    if (seen.has(name)) continue;
    seen.add(name);

    const p0 = applyMatrix(ctm, 0, 0);
    const p1 = applyMatrix(ctm, 1, 1);
    const bx = Math.min(p0[0], p1[0]);
    const bx1 = Math.max(p0[0], p1[0]);
    const by = Math.min(p0[1], p1[1]);
    const by1 = Math.max(p0[1], p1[1]);
    const isFullPage =
      (bx1 - bx) * (by1 - by) >= 0.85 * viewport.width * viewport.height;
    if (isFullPage && !allowFullPage) continue;

    const img =
      fn === OPS.paintInlineImageXObject ? args[0] : await getObjectAsync(page, name);
    if (img) {
      const converted = await imageToBytes(img);
      if (converted) {
        images.push({
          ...converted,
          yTop: viewport.height - by1,
          fullPage: isFullPage,
        });
      }
    }
  }
  return images;
}

/* ── page processing ────────────────────────────────────────── */

const MIN_TEXT_CHARS = 15;
const FURNITURE_BAND = 60;

// Page furniture (running headers, footers, watermarks) repeats at the top
// or bottom band across pages. Digits normalize to '#' so page numbers
// match; trailing roman numerals get the same treatment.
const normalizeFurniture = (text) =>
  text
    .replace(/\d+/g, '#')
    .replace(/\s+[ivxl]{1,5}\s*$/i, ' #')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

function detectFurniture(pageData) {
  if (pageData.length < 2) return null;
  const counts = new Map();
  for (const { lines, height } of pageData) {
    const seen = new Set();
    for (const line of lines) {
      const band =
        line.y < FURNITURE_BAND
          ? 'top'
          : line.y + line.fontSize > height - FURNITURE_BAND
            ? 'bottom'
            : null;
      if (!band) continue;
      const norm = normalizeFurniture(line.text);
      if (norm.length < 6 && !(band === 'bottom' && /^[\s#]*$/.test(norm))) continue;
      const key = `${band}|${norm}`;
      if (seen.has(key)) continue;
      seen.add(key);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  const furniture = new Set();
  for (const [key, n] of counts) if (n >= 2) furniture.add(key);
  if (!furniture.size) return null;
  return (line, height) => {
    const band =
      line.y < FURNITURE_BAND
        ? 'top'
        : line.y + line.fontSize > height - FURNITURE_BAND
          ? 'bottom'
          : null;
    if (!band) return false;
    return furniture.has(`${band}|${normalizeFurniture(line.text)}`);
  };
}

const clampMargin = (v) => Math.round(Math.min(200, Math.max(18, Number.isFinite(v) ? v : 72)) * 20);

async function extractPdfStructure(file, { enableOcr, embedImages, onProgress }) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = [];
  const pageData = [];
  const fontMap = {};
  let ocrWorker = null;
  let ocrPages = 0;
  let skippedPages = 0;

  try {
    // Pass 1 — raw extraction: text lines, ruling lines, images, fonts
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      const content = await page.getTextContent();
      const ops = await page.getOperatorList();
      await buildFontMap(page, content, ops, fontMap);
      let lines = groupItemsIntoLines(content.items, viewport.height, fontMap);
      const charCount = lines.reduce(
        (n, l) => n + l.text.replace(/\s/g, '').length,
        0,
      );

      let ruling = null;
      try {
        ruling = extractRulingLines(ops, viewport.height);
      } catch (err) {
        console.error(`Ruling-line extraction failed on page ${i}`, err);
      }

      let images = [];
      if (embedImages) {
        try {
          images = await extractPageImages(
            page,
            ops,
            viewport,
            charCount < MIN_TEXT_CHARS,
          );
        } catch (err) {
          console.error(`Image extraction failed on page ${i}`, err);
        }
      }

      if (charCount < MIN_TEXT_CHARS) {
        if (enableOcr) {
          if (!ocrWorker) {
            onProgress('Loading OCR engine (first time downloads ~14 MB)...');
            ocrWorker = await createOcrWorker((m) => {
              if (m.status === 'recognizing text') {
                onProgress(
                  `OCR — page ${i}/${pdf.numPages} (${Math.round(m.progress * 100)}%)`,
                );
              }
            });
          }
          onProgress(`OCR — page ${i}/${pdf.numPages}`);
          try {
            lines = await ocrPage(page, ocrWorker);
            if (lines.length) ocrPages++;
          } catch (err) {
            console.error(`OCR failed on page ${i}`, err);
          }
        } else {
          skippedPages++;
        }
      } else {
        onProgress(`Extracting page ${i}/${pdf.numPages}`);
      }

      pageData.push({
        lines,
        ruling,
        images,
        width: viewport.width,
        height: viewport.height,
      });
    }

    // Pass 2 — furniture removal, structure, geometry
    const isFurniture = detectFurniture(pageData);
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const { lines, ruling, images, height } of pageData) {
      const kept = isFurniture ? lines.filter((l) => !isFurniture(l, height)) : lines;
      for (const l of kept) {
        minX = Math.min(minX, l.xStart ?? minX);
        maxX = Math.max(maxX, l.xEnd ?? maxX);
        minY = Math.min(minY, l.y);
        maxY = Math.max(maxY, l.y + l.fontSize);
      }
      const blocks = structurePage(kept, ruling);
      pages.push({ blocks, images });
    }

    const first = pageData[0] || { width: 595.28, height: 841.89 };
    const geometry = {
      width: first.width,
      height: first.height,
      margins: {
        top: clampMargin(minY),
        right: clampMargin(first.width - maxX),
        bottom: clampMargin(first.height - maxY),
        left: clampMargin(minX),
      },
    };

    return { pages, ocrPages, skippedPages, geometry };
  } finally {
    if (ocrWorker) await ocrWorker.terminate();
  }
}

/* ── .docx generation ────────────────────────────────────────── */

const MAX_IMAGE_WIDTH = 550;

function buildDocxPages(pages) {
  const docxChildren = [];
  const numberingRefs = new Set();
  let firstPage = true;
  let numberedListId = 0;
  let inNumberedRun = false;

  const alignmentOf = (block) =>
    block.alignment === 'center'
      ? AlignmentType.CENTER
      : block.alignment === 'right'
        ? AlignmentType.RIGHT
        : undefined;

  for (const pageData of pages) {
    if (!firstPage) {
      docxChildren.push(
        new Paragraph({ children: [new PageBreak()] }),
      );
    }
    firstPage = false;

    // weave images and blocks by their vertical position
    const entries = [
      ...pageData.blocks.map((block) => ({ y: block.y ?? Infinity, block })),
      ...pageData.images.map((img) => ({ y: img.yTop ?? Infinity, img })),
    ].sort((a, b) => a.y - b.y);

    for (const entry of entries) {
      if (entry.img) {
        const img = entry.img;
        const scale = img.width > MAX_IMAGE_WIDTH ? MAX_IMAGE_WIDTH / img.width : 1;
        docxChildren.push(
          new Paragraph({
            children: [
              new ImageRun({
                type: img.type,
                data: img.data,
                transformation: {
                  width: Math.max(1, Math.round(img.width * scale)),
                  height: Math.max(1, Math.round(img.height * scale)),
                },
              }),
            ],
          }),
        );
        continue;
      }
      const block = entry.block;
      if (block.type === 'table') {
        const totalDxa = (block.colWidths || []).reduce((a, b) => a + b, 0);
        docxChildren.push(
          new Table({
            width: totalDxa
              ? { size: totalDxa, type: WidthType.DXA }
              : { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: block.colWidths,
            rows: block.rows.map(
              (row) =>
                new TableRow({
                  children: row.map((cell) => {
                    const lines = cell.text ? cell.text.split('\n') : [''];
                    return new TableCell({
                      columnSpan: cell.colSpan > 1 ? cell.colSpan : undefined,
                      rowSpan: cell.rowSpan > 1 ? cell.rowSpan : undefined,
                      children: lines.map(
                        (t) =>
                          new Paragraph({
                            children: t ? [new TextRun({ text: t })] : [],
                          }),
                      ),
                    });
                  }),
                }),
            ),
          }),
        );
        docxChildren.push(new Paragraph({ children: [] }));
        continue;
      }

      if (block.type === 'li' && block.listType !== 'number') inNumberedRun = false;
      const size = block.fontSize
        ? Math.min(200, Math.max(12, Math.round(block.fontSize * 2)))
        : undefined;
      const runs = [
        new TextRun({
          text: block.text,
          bold: block.isBold || block.type === 'h1' || block.type === 'h2' || block.type === 'h3',
          italics: block.isItalic,
          size,
          font: block.fontFamily,
        }),
      ];

      if (block.type === 'h1') {
        docxChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: alignmentOf(block),
            children: runs,
          }),
        );
      } else if (block.type === 'h2') {
        docxChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: alignmentOf(block),
            children: runs,
          }),
        );
      } else if (block.type === 'h3') {
        docxChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            alignment: alignmentOf(block),
            children: runs,
          }),
        );
      } else if (block.type === 'li') {
        let numbering;
        if (block.listType === 'number') {
          if (!inNumberedRun) {
            numberedListId++;
            inNumberedRun = true;
            numberingRefs.add(numberedListId);
          }
          numbering = { reference: `numbered-${numberedListId}`, level: 0 };
        }
        docxChildren.push(
          new Paragraph({
            children: runs,
            alignment: alignmentOf(block),
            bullet: block.listType === 'bullet' ? { level: 0 } : undefined,
            numbering,
          }),
        );
      } else {
        docxChildren.push(
          new Paragraph({
            children: runs,
            alignment: alignmentOf(block),
          }),
        );
      }
      if (block.type !== 'li') inNumberedRun = false;
    }
  }

  return { children: docxChildren, numberingRefs: [...numberingRefs] };
}

function generateDocx(pages, geometry) {
  const { children, numberingRefs } = buildDocxPages(pages);
  const geo = geometry || {
    width: 595.28,
    height: 841.89,
    margins: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
  };
  const doc = new Document({
    numbering: {
      config: numberingRefs.map((id) => ({
        reference: `numbered-${id}`,
        levels: [
          {
            level: 0,
            format: 'decimal',
            text: '%1.',
            alignment: AlignmentType.START,
            start: 1,
          },
        ],
      })),
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: Math.round(geo.width * 20),
              height: Math.round(geo.height * 20),
            },
            margin: geo.margins,
          },
        },
        children,
      },
    ],
  });
  return Packer.toBlob(doc);
}

/* ── .txt generation ─────────────────────────────────────────── */

function generateTxt(pages) {
  const parts = [];
  let numCounter = 0;
  for (let p = 0; p < pages.length; p++) {
    for (const block of pages[p].blocks) {
      if (block.type === 'h1') {
        parts.push(block.text.toUpperCase());
        parts.push('='.repeat(Math.min(block.text.length, 60)));
        numCounter = 0;
      } else if (block.type === 'h2') {
        parts.push(block.text.toUpperCase());
        parts.push('-'.repeat(Math.min(block.text.length, 60)));
        numCounter = 0;
      } else if (block.type === 'h3') {
        parts.push(`## ${block.text}`);
        numCounter = 0;
      } else if (block.type === 'li') {
        if (block.listType === 'number') {
          parts.push(`  ${++numCounter}. ${block.text}`);
        } else {
          parts.push(`  - ${block.text}`);
          numCounter = 0;
        }
      } else if (block.type === 'table') {
        for (const row of block.rows) {
          parts.push(`  | ${row.map((c) => c.text.replace(/\n/g, ' ')).join(' | ')} |`);
        }
        numCounter = 0;
      } else {
        parts.push(block.text);
        numCounter = 0;
      }
      parts.push('');
    }
    if (p < pages.length - 1) parts.push('\f');
  }
  return new Blob([parts.join('\n')], { type: 'text/plain;charset=utf-8' });
}

/* ── .html generation ────────────────────────────────────────── */

const AMP = '\u0026'; // written via escape to keep the entity literal intact

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, AMP + 'amp;')
    .replace(/</g, AMP + 'lt;')
    .replace(/>/g, AMP + 'gt;')
    .replace(/"/g, AMP + 'quot;');
}

function generateHtml(pages, fileName) {
  const bodyParts = [];
  const alignStyle = (block) =>
    block.alignment === 'center'
      ? ' style="text-align:center"'
      : block.alignment === 'right'
        ? ' style="text-align:right"'
        : '';

  const openList = (listType) => bodyParts.push(listType === 'number' ? '<ol>' : '<ul>');
  const closeList = (listType) => bodyParts.push(listType === 'number' ? '</ol>' : '</ul>');

  for (let p = 0; p < pages.length; p++) {
    let openListType = null;
    for (const block of pages[p].blocks) {
      const closeIfOpen = () => {
        if (openListType) {
          closeList(openListType);
          openListType = null;
        }
      };
      if (block.type === 'table') {
        closeIfOpen();
        const rowsHtml = block.rows
          .map(
            (row) =>
              `<tr>${row
                .map(
                  (c) =>
                    `<td${c.colSpan ? ` colspan="${c.colSpan}"` : ''}${c.rowSpan ? ` rowspan="${c.rowSpan}"` : ''}>${escapeHtml(c.text).replace(/\n/g, '<br/>')}</td>`,
                )
                .join('')}</tr>`,
          )
          .join('');
        bodyParts.push(`<table>${rowsHtml}</table>`);
        continue;
      }
      const text = escapeHtml(block.text);
      const bold = block.isBold || block.type === 'h1' || block.type === 'h2' || block.type === 'h3';
      const italic = block.isItalic;
      const styled = italic ? `<em>${text}</em>` : text;
      const styledBold = bold ? `<strong>${styled}</strong>` : styled;

      if (block.type === 'li') {
        if (openListType !== block.listType) {
          closeIfOpen();
          openListType = block.listType;
          openList(block.listType);
        }
        bodyParts.push(`<li>${styledBold}</li>`);
      } else {
        closeIfOpen();
        if (block.type === 'h1') {
          bodyParts.push(`<h1${alignStyle(block)}>${styledBold}</h1>`);
        } else if (block.type === 'h2') {
          bodyParts.push(`<h2${alignStyle(block)}>${styledBold}</h2>`);
        } else if (block.type === 'h3') {
          bodyParts.push(`<h3${alignStyle(block)}>${styledBold}</h3>`);
        } else {
          bodyParts.push(`<p${alignStyle(block)}>${styledBold}</p>`);
        }
      }
    }
    if (openListType) closeList(openListType);
    if (p < pages.length - 1) bodyParts.push('<hr style="page-break-after: always;" />');
  }

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
  ul, ol { padding-left: 1.5em; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  td { border: 1px solid #bbb; padding: 0.35em 0.6em; }
  hr { border: none; border-top: 1px dashed #ccc; margin: 2em 0; }
</style>
</head>
<body>
${bodyParts.join('\n')}
</body>
</html>`;

  return new Blob([html], { type: 'text/html;charset=utf-8' });
}

/* ── React component ────────────────────────────────────────── */

function PdfToWord() {
  const [pdf, setPdf] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [enableOcr, setEnableOcr] = useState(true);
  const [embedImages, setEmbedImages] = useState(true);
  const [progress, setProgress] = useState('');

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
    setProgress('Reading PDF...');
    try {
      const { pages, ocrPages, skippedPages, geometry } = await extractPdfStructure(
        pdf.file,
        { enableOcr, embedImages, onProgress: setProgress },
      );
      const hasContent = pages.some(
        (pg) =>
          pg.blocks.some(
            (b) =>
              (b.text || '').trim() ||
              (b.type === 'table' &&
                b.rows.some((row) => row.some((c) => (c.text || '').trim()))),
          ) || pg.images.length,
      );
      if (!hasContent) {
        toast.error(
          enableOcr
            ? 'No readable content found in this PDF.'
            : 'No text layer found — enable OCR to process scanned pages.',
        );
        return;
      }

      setProgress('Generating files...');
      const baseName = pdf.file.name.replace(/\.pdf$/i, '');
      const docxBlob = await generateDocx(pages, geometry);
      const txtBlob = generateTxt(pages);
      const htmlBlob = generateHtml(pages, pdf.file.name);

      setResults({
        docx: { blob: docxBlob, name: `${baseName}.docx` },
        txt: { blob: txtBlob, name: `${baseName}.txt` },
        html: { blob: htmlBlob, name: `${baseName}.html` },
        ocrPages,
      });
      if (skippedPages) {
        toast(`${skippedPages} scanned page(s) skipped — enable OCR to include them.`);
      } else {
        toast.success(
          ocrPages
            ? `Conversion complete — ${ocrPages} page(s) recovered via OCR`
            : 'Conversion complete — ready to download',
        );
      }
    } catch (err) {
      console.error(err);
      toast.error('Error converting the PDF.');
    } finally {
      setIsProcessing(false);
      setProgress('');
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
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enableOcr}
                onChange={(e) => setEnableOcr(e.target.checked)}
                className="form-checkbox h-4 w-4 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
              />
              OCR scanned pages (slower)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={embedImages}
                onChange={(e) => setEmbedImages(e.target.checked)}
                className="form-checkbox h-4 w-4 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
              />
              Embed images in .docx
            </label>
          </div>

          {progress && (
            <p className="text-sm text-purple-300 mb-3">{progress}</p>
          )}

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
        Note: conversion is 100% local in your browser — including OCR, which runs
        on a Tesseract engine loaded to your device (~14 MB on first use, then cached).
        It preserves text, headings, bold/italic, fonts, font sizes, alignment, lists,
        embedded images, and multi-column reading order in the .docx output. Tables are
        reconstructed with merged cells and column widths, repeating headers/footers and
        watermarks are removed, and hyphenated line breaks are rejoined. Exact page
        layout (spacing, floating elements) is still an approximation.
      </p>
    </div>
  );
}

export default PdfToWord;
