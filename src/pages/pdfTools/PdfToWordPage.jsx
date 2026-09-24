import React from 'react';
import ToolShell from '../../components/ToolShell';
import PdfToWord from './PdfToWord';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf/' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf/' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf/' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf/' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word/' },
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
      about={[
        {
          heading: 'PDF to editable formats, locally',
          paragraphs: [
            'PDFs are designed for viewing, not editing — extracting their text into an editable format requires parsing the document\'s content streams. This tool does that parsing in your browser and rebuilds the content as a Word (.docx), plain text (.txt), or HTML file, with no upload involved.',
            'Text-based PDFs convert cleanly. Scanned PDFs contain images rather than text, so they require OCR and will produce limited output — a general limitation of any converter.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Convert PDF to Word (.docx) for editing',
            'Extract plain text (.txt) for reuse elsewhere',
            'Convert to HTML for web publishing',
            'Preserves paragraphs and basic formatting',
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
