import React from 'react';
import ToolShell from '../../components/ToolShell';
import PdfSplit from './PdfSplit';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf/' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf/' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf/' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf/' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word/' },
];

function PdfSplitPage() {
  return (
    <ToolShell
      title="Free Split PDF Tool - Extract PDF Pages Online | OG Technologies EU"
      description="Split a PDF at any page number to extract specific pages or ranges. 100% browser-based — no file is ever uploaded to a server."
      canonical="/tools/split-pdf"
      keywords="split PDF, PDF split, extract PDF pages, divide PDF, PDF separator, free PDF split"
      heading="Split PDF"
      subheading="Split a PDF at any page. Extract exactly the pages you need. No file is sent to a server."
      tabs={TABS}
      activeTab="split"
      about={[
        {
          heading: 'How does PDF splitting work?',
          paragraphs: [
            'Splitting a PDF means extracting a subset of its pages into a new document — a single page, a range, or everything before or after a split point. This tool performs the split locally: it reads the PDF in your browser, copies the selected pages into a new file, and offers it as a download.',
            'Because nothing is uploaded, it\'s suitable for confidential documents such as legal filings, medical records, and financial statements that you wouldn\'t want on a third-party server.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Split a PDF at any page number',
            'Extract specific pages or page ranges',
            'Original page content preserved without recompression',
            'No watermarks or usage limits',
            '100% client-side — the file never leaves your browser',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it to pull a single page from a large report, separate a signed page from a contract for circulation, extract a chapter for review, or remove cover sheets and blank pages before sharing a document.',
          ],
        },
      ]}
      
    >
      <PdfSplit />
    </ToolShell>
  );
}

export default PdfSplitPage;
