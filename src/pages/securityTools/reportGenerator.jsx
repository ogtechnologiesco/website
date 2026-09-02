import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const PAGE_WIDTH = 595.28; // A4 width in points
const PAGE_HEIGHT = 841.89; // A4 height in points
const MARGIN = 50;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const COLORS = {
  black: rgb(0, 0, 0),
  darkGray: rgb(0.25, 0.25, 0.25),
  gray: rgb(0.5, 0.5, 0.5),
  lightGray: rgb(0.75, 0.75, 0.75),
  purple: rgb(0.37, 0.25, 0.63),
  white: rgb(1, 1, 1),
  red: rgb(0.72, 0.18, 0.18),
  green: rgb(0.18, 0.55, 0.28),
  amber: rgb(0.72, 0.52, 0.1),
  blue: rgb(0.18, 0.38, 0.72),
};

const SEVERITY_COLORS = {
  critical: COLORS.red,
  high: COLORS.red,
  medium: COLORS.amber,
  low: COLORS.blue,
  info: COLORS.green,
};

function getGradeColor(grade) {
  if (grade === 'A' || grade === 'B') return COLORS.green;
  if (grade === 'C') return COLORS.amber;
  if (grade === 'D') return COLORS.amber;
  return COLORS.red;
}

export async function generatePdfReport(scanData, auditInfo) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { results, summary, scannedUrl } = scanData;
  const lines = [];
  let y = PAGE_HEIGHT - MARGIN;

  function addLine(text, fontType = font, size = 10, color = COLORS.darkGray, gap = 14) {
    lines.push({ text, font: fontType, size, color, y, gap });
    y -= gap;
  }

  function addWrappedText(text, fontType = font, size = 10, color = COLORS.darkGray, maxWidth = CONTENT_WIDTH, gap = 14) {
    const words = text.split(' ');
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = fontType.widthOfTextAtSize(testLine, size);
      if (width > maxWidth && currentLine) {
        lines.push({ text: currentLine, font: fontType, size, color, y, gap });
        y -= gap;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push({ text: currentLine, font: fontType, size, color, y, gap });
      y -= gap;
    }
  }

  function addSpacer(gap = 10) {
    y -= gap;
  }

  function checkNewPage(neededSpace = 60) {
    if (y < MARGIN + neededSpace) {
      return true;
    }
    return false;
  }

  // Group findings by category
  const grouped = results.reduce((acc, r) => {
    if (!acc[r.owaspCategory]) acc[r.owaspCategory] = [];
    acc[r.owaspCategory].push(r);
    return acc;
  }, {});
  const sortedCategories = Object.keys(grouped).sort();

  // Build all content blocks first, then paginate
  const blocks = [];

  function pushBlock(type, data) {
    blocks.push({ type, data });
  }

  // Header
  pushBlock('header', {});

  // Audit section
  pushBlock('audit', {
    url: scannedUrl,
    timestamp: auditInfo?.timestamp || new Date().toISOString(),
    ip: auditInfo?.ip || 'unknown',
    affirmation: auditInfo?.affirmationText || '',
  });

  // Summary
  pushBlock('summary', { summary });

  // Findings
  for (const category of sortedCategories) {
    pushBlock('category', { name: category });
    for (const finding of grouped[category]) {
      pushBlock('finding', { finding });
    }
  }

  // Footer
  pushBlock('footer', {});

  // Render blocks into pages
  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  y = PAGE_HEIGHT - MARGIN;

  function ensureSpace(needed) {
    if (y < MARGIN + needed) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
  }

  function drawText(text, fontType, size, color, x = MARGIN) {
    page.drawText(text, { x, y, size, font: fontType, color });
    y -= size + 4;
  }

  function drawWrapped(text, fontType, size, color, x = MARGIN, maxWidth = CONTENT_WIDTH) {
    const words = text.split(' ');
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = fontType.widthOfTextAtSize(testLine, size);
      if (width > maxWidth && currentLine) {
        page.drawText(currentLine, { x, y, size, font: fontType, color });
        y -= size + 4;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, { x, y, size, font: fontType, color });
      y -= size + 4;
    }
  }

  function drawSeparator() {
    ensureSpace(20);
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_WIDTH - MARGIN, y },
      thickness: 0.5,
      color: COLORS.lightGray,
    });
    y -= 16;
  }

  for (const block of blocks) {
    switch (block.type) {
      case 'header': {
        ensureSpace(80);
        drawText('OG Technologies EU', boldFont, 20, COLORS.purple);
        drawText('Web Security Scan Report', boldFont, 14, COLORS.darkGray);
        addSpacer();
        const dateStr = new Date().toLocaleString('en-EU', {
          dateStyle: 'long',
          timeStyle: 'short',
        });
        drawText(`Report generated: ${dateStr}`, font, 9, COLORS.gray);
        drawSeparator();
        break;
      }

      case 'audit': {
        ensureSpace(100);
        drawText('Audit & Authorization', boldFont, 12, COLORS.purple);
        addSpacer();
        const d = block.data;
        drawText(`Scanned URL: ${d.url}`, font, 10, COLORS.darkGray);
        const ts = new Date(d.timestamp).toLocaleString('en-EU', {
          dateStyle: 'long',
          timeStyle: 'short',
        });
        drawText(`Authorization timestamp: ${ts}`, font, 10, COLORS.darkGray);
        drawText(`Requester IP: ${d.ip}`, font, 10, COLORS.darkGray);
        addSpacer();
        drawWrapped(`Affirmation: ${d.affirmation}`, font, 9, COLORS.gray);
        drawSeparator();
        break;
      }

      case 'summary': {
        ensureSpace(100);
        const s = block.data.summary;
        drawText('Security Summary', boldFont, 12, COLORS.purple);
        addSpacer();
        const gradeColor = getGradeColor(s.grade);
        drawText(`Overall Grade: ${s.grade}  (Score: ${s.score}/100)`, boldFont, 14, gradeColor);
        addSpacer();
        drawText(
          `Checks: ${s.total} total  |  Passed: ${s.statusCounts.pass}  |  Warnings: ${s.statusCounts.warn}  |  Failed: ${s.statusCounts.fail}`,
          font,
          10,
          COLORS.darkGray
        );
        addSpacer();
        drawText(
          `Critical: ${s.counts.critical || 0}  |  High: ${s.counts.high || 0}  |  Medium: ${s.counts.medium || 0}  |  Low: ${s.counts.low || 0}`,
          font,
          10,
          COLORS.darkGray
        );
        drawSeparator();
        break;
      }

      case 'category': {
        ensureSpace(40);
        drawText(block.data.name, boldFont, 11, COLORS.purple);
        y -= 6;
        break;
      }

      case 'finding': {
        const f = block.data.finding;
        const sevColor = SEVERITY_COLORS[f.severity] || COLORS.darkGray;
        ensureSpace(80);

        const statusLabel = f.status === 'pass' ? '[PASS]' : f.status === 'warn' ? '[WARN]' : '[FAIL]';
        drawText(`${statusLabel} ${f.title}`, boldFont, 10, sevColor);

        drawWrapped(`Severity: ${f.severity}`, font, 9, COLORS.gray);
        drawWrapped(f.description, font, 9, COLORS.darkGray);
        drawWrapped(`Remediation: ${f.remediation}`, font, 9, COLORS.gray);
        y -= 8;
        break;
      }

      case 'footer': {
        ensureSpace(40);
        drawSeparator();
        drawWrapped(
          'Generated by OG Technologies EU Security Scanner. This report is based on passive, non-intrusive checks only and is not a substitute for professional penetration testing.',
          font,
          8,
          COLORS.gray
        );
        drawText('https://ogtechnologies.co/tools/security-tools', font, 8, COLORS.purple);
        break;
      }

      default:
        break;
    }
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export function downloadPdfReport(pdfBytes, filename) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
