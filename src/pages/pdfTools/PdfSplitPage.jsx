import React from 'react';
import ToolShell from '../../components/ToolShell';
import PdfSplit from './PdfSplit';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word' },
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
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Split PDF',
        url: 'https://www.ogtechnologies.co/tools/split-pdf',
        description: 'Split a PDF at any page number to extract specific pages or ranges. 100% browser-based.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        featureList: [
          'Split a PDF at any page number',
          'Extract specific page ranges',
          '100% browser-based — no file uploads',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <PdfSplit />
    </ToolShell>
  );
}

export default PdfSplitPage;
