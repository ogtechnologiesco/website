import React from 'react';
import ToolShell from '../../components/ToolShell';
import PdfToWord from './PdfToWord';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf/' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf/' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf/' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf/' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word/' },
  { id: 'metadata', label: 'Metadata', path: '/tools/pdf-metadata/' },
];

function PdfToWordPage() {
  return (
    <ToolShell
      title="Free PDF to Word Converter with OCR - PDF to DOCX/TXT/HTML | OG Technologies EU"
      description="Convert PDF to Word (.docx), plain text (.txt), or HTML directly in your browser — with OCR for scanned pages and embedded image extraction. No file is ever uploaded to a server — 100% client-side and private."
      canonical="/tools/pdf-to-word"
      keywords="PDF to Word, PDF to DOCX, convert PDF to Word, PDF to text, PDF to HTML, OCR PDF to Word, scanned PDF to Word, free PDF to Word converter"
      heading="PDF → Word"
      subheading="Convert PDF to Word (.docx), text, or HTML — including scanned pages via OCR. No file is sent to a server."
      tabs={TABS}
      activeTab="word"
      about={[
        {
          heading: 'PDF to editable formats, locally',
          paragraphs: [
            'PDFs are designed for viewing, not editing — extracting their content into an editable format requires parsing the document\'s text streams, images, and layout. This tool does that parsing in your browser and rebuilds the content as a Word (.docx), plain text (.txt), or HTML file, with no upload involved.',
            'Scanned PDFs contain page images rather than a text layer, so the tool runs OCR on them — a Tesseract engine that also runs entirely in your browser. OCR adds processing time per page and works best on clean, high-contrast scans.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Convert PDF to Word (.docx) for editing',
            'Extract plain text (.txt) for reuse elsewhere',
            'Convert to HTML for web publishing',
            'OCR for scanned, image-only pages — runs locally via Tesseract',
            'Embeds images from the PDF into the .docx',
            'Reconstructs tables — bordered ones with merged cells and column widths',
            'Preserves fonts, font sizes, bold/italic, and text alignment',
            'Detects multi-column layouts and keeps correct reading order',
            'Removes repeating headers, footers, and watermarks',
            'Files processed entirely on your device — nothing uploaded',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it to edit a document you only have as PDF, extract quotes or data from reports, repurpose PDF content for the web, or recover text from a file whose original source is unavailable.',
          ],
        },
      ]}
      
    >
      <PdfToWord />
    </ToolShell>
  );
}

export default PdfToWordPage;
