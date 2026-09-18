import React from 'react';
import ToolShell from '../../components/ToolShell';
import PdfToWord from './PdfToWord';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word' },
];

function PdfToWordPage() {
  return (
    <ToolShell
      title="Free PDF to Word Converter - PDF to DOCX/TXT/HTML Online | OG Technologies EU"
      description="Convert PDF to Word (.docx), plain text (.txt), or HTML directly in your browser. No file is ever uploaded to a server — 100% client-side and private."
      canonical="/tools/pdf-to-word"
      keywords="PDF to Word, PDF to DOCX, convert PDF to Word, PDF to text, PDF to HTML, free PDF to Word converter"
      heading="PDF → Word"
      subheading="Convert PDF to Word (.docx), text, or HTML. No file is sent to a server."
      tabs={TABS}
      activeTab="word"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'PDF to Word Converter',
        url: 'https://www.ogtechnologies.co/tools/pdf-to-word/',
        description: 'Convert PDF to Word (.docx), plain text (.txt), or HTML directly in your browser. 100% client-side and private.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        featureList: [
          'Convert PDF to Word (.docx)',
          'Convert PDF to plain text (.txt)',
          'Convert PDF to HTML',
          '100% browser-based — no file uploads',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <PdfToWord />
    </ToolShell>
  );
}

export default PdfToWordPage;
