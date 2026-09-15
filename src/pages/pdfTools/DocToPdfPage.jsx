import React from 'react';
import ToolShell from '../../components/ToolShell';
import DocToPdf from './DocToPdf';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word' },
];

function DocToPdfPage() {
  return (
    <ToolShell
      title="Free Document to PDF Converter - DOCX/ODT/TXT to PDF | OG Technologies EU"
      description="Convert DOCX, ODT, and TXT documents to PDF directly in your browser. Preserves text, headings, bold/italic, lists, tables, and images. No file is ever uploaded to a server."
      canonical="/tools/document-to-pdf"
      keywords="document to PDF, DOCX to PDF, ODT to PDF, TXT to PDF, convert document to PDF, free document to PDF"
      heading="Document → PDF"
      subheading="Convert DOCX, ODT, and TXT files to PDF. No file is sent to a server."
      tabs={TABS}
      activeTab="doc"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Document to PDF Converter',
        url: 'https://www.ogtechnologies.co/tools/document-to-pdf',
        description: 'Convert DOCX, ODT, and TXT documents to PDF directly in your browser. Preserves text, headings, lists, tables, and images. 100% client-side.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        featureList: [
          'Convert DOCX, ODT, and TXT to PDF',
          'Preserves headings, bold/italic, lists, tables, and images',
          '100% browser-based — no file uploads',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <DocToPdf />
    </ToolShell>
  );
}

export default DocToPdfPage;
