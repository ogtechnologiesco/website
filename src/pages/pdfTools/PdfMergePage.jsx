import React from 'react';
import ToolShell from '../../components/ToolShell';
import PdfMerge from './PdfMerge';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf/' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf/' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf/' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf/' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word/' },
];

function PdfMergePage() {
  return (
    <ToolShell
      title="Free Merge PDF Tool - Combine PDF Files Online | OG Technologies EU"
      description="Merge two or more PDF files into one document directly in your browser. No file is ever uploaded to a server — 100% client-side and private."
      canonical="/tools/merge-pdf"
      keywords="merge PDF, combine PDF, join PDF, PDF merger, merge PDF files online, free PDF merge"
      heading="Merge PDFs"
      subheading="Combine multiple PDF files into a single document. No file is sent to a server."
      tabs={TABS}
      activeTab="merge"
      about={[
        {
          heading: 'Why merge PDFs in the browser?',
          paragraphs: [
            'Most online PDF mergers upload your files to a server, process them, and hand back a download — meaning contracts, invoices, or personal documents pass through infrastructure you don\'t control. This tool assembles the merged PDF locally in your browser, so the files never leave your device.',
            'The merge preserves the original pages exactly: no recompression, no watermark, no page limit.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Combine two or more PDFs into a single document',
            'Reorder files before merging',
            'Preserves original page quality — no recompression or watermarks',
            'No file size or page-count limits imposed by a server',
            'Files are processed locally and never uploaded',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it to combine scanned documents into one file, assemble reports from separate chapters, merge signed contract pages with appendices, or bundle invoices and receipts for expense submissions.',
          ],
        },
      ]}
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Merge PDF',
        url: 'https://www.ogtechnologies.co/tools/merge-pdf/',
        description: 'Merge two or more PDF files into one document directly in your browser. 100% client-side and private.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        featureList: [
          'Merge multiple PDF files into a single document',
          'Reorder files before merging',
          '100% browser-based — no file uploads',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <PdfMerge />
    </ToolShell>
  );
}

export default PdfMergePage;
