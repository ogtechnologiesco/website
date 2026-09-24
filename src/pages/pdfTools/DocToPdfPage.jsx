import React from 'react';
import ToolShell from '../../components/ToolShell';
import DocToPdf from './DocToPdf';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf/' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf/' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf/' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf/' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word/' },
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
      about={[
        {
          heading: 'Document to PDF without uploads',
          paragraphs: [
            'Converting a document to PDF usually means uploading it to a conversion service — a poor fit for contracts, reports, or anything confidential. This converter parses DOCX, ODT, and TXT files in your browser and renders a PDF locally, so the document\'s contents never leave your machine.',
            'The conversion preserves document structure: headings, bold and italic text, lists, tables, and embedded images carry over into the generated PDF.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Convert DOCX, ODT, and TXT files to PDF',
            'Preserves headings, emphasis, lists, tables, and images',
            'Generates a standard PDF readable by any viewer',
            'No account, watermark, or file-size limit',
            'Fully client-side — no document is ever uploaded',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it to produce a PDF for sharing or printing when you don\'t have a word processor installed, freeze a draft\'s formatting before distribution, convert open-document formats for recipients who expect PDF, or handle sensitive files that can\'t go to an online converter.',
          ],
        },
      ]}
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Document to PDF Converter',
        url: 'https://www.ogtechnologies.co/tools/document-to-pdf/',
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
