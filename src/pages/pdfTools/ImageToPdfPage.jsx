import React from 'react';
import ToolShell from '../../components/ToolShell';
import ImageToPdf from './ImageToPdf';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word' },
];

function ImageToPdfPage() {
  return (
    <ToolShell
      title="Free Image to PDF Converter - PNG/JPG to PDF Online | OG Technologies EU"
      description="Convert PNG and JPG images to PDF directly in your browser. No file is ever uploaded to a server — 100% client-side and private."
      canonical="/tools/image-to-pdf"
      keywords="image to PDF, PNG to PDF, JPG to PDF, convert image to PDF, image PDF converter, free image to PDF"
      heading="Image → PDF"
      subheading="Convert PNG and JPG images into a PDF document. No file is sent to a server."
      tabs={TABS}
      activeTab="image"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Image to PDF Converter',
        url: 'https://www.ogtechnologies.co/tools/image-to-pdf/',
        description: 'Convert PNG and JPG images to PDF directly in your browser. 100% client-side and private.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        featureList: [
          'Convert PNG and JPG images to PDF',
          'Multiple images in a single PDF',
          '100% browser-based — no file uploads',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }}
    >
      <ImageToPdf />
    </ToolShell>
  );
}

export default ImageToPdfPage;
