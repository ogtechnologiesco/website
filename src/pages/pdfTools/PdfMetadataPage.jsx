import React from 'react';
import ToolShell from '../../components/ToolShell';
import PdfMetadata from './PdfMetadata';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf/' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf/' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf/' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf/' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word/' },
  { id: 'metadata', label: 'Metadata', path: '/tools/pdf-metadata/' },
];

const FAQ = [
  {
    q: 'What metadata does a PDF contain?',
    a: 'A PDF stores a document information dictionary with fields like title, author, subject, keywords, creator application, producer library, and creation/modification timestamps. Many files also embed an XMP metadata packet with the same or additional properties, and applications may add custom fields.',
  },
  {
    q: 'Is my PDF uploaded to a server?',
    a: 'No. The file is read and rewritten entirely in your browser using JavaScript — nothing is transmitted, logged, or stored on our infrastructure.',
  },
  {
    q: 'Does removing metadata change the document content?',
    a: 'No. Only the document information dictionary and the embedded XMP metadata stream are removed. Pages, text, images, and layout are preserved exactly.',
  },
  {
    q: 'Does removing metadata fully anonymize a PDF?',
    a: 'It removes document-level properties such as author name, timestamps, and tool identifiers. Traces stored elsewhere — author names in comments and annotations, embedded fonts, hidden layers, or content inside the pages themselves — are separate and are not affected.',
  },
  {
    q: 'Can I clear just one field instead of everything?',
    a: 'Yes. In the editor, simply empty the fields you want gone — blank fields are deleted from the document — then download the result.',
  },
];

function PdfMetadataPage() {
  return (
    <ToolShell
      title="Free PDF Metadata Editor - View, Edit & Remove Metadata Online | OG Technologies EU"
      description="View, edit, and remove PDF metadata — title, author, subject, keywords, creator, producer, and timestamps — directly in your browser. Strip hidden metadata for privacy. 100% client-side, no uploads."
      canonical="/tools/pdf-metadata"
      keywords="PDF metadata, PDF metadata viewer, PDF metadata editor, remove PDF metadata, strip PDF metadata, edit PDF properties, PDF author remover, PDF privacy, free PDF metadata remover"
      heading="PDF Metadata"
      subheading="Inspect, edit, or strip a PDF's metadata — title, author, keywords, producer, timestamps. No file is sent to a server."
      tabs={TABS}
      activeTab="metadata"
      about={[
        {
          heading: 'What lives inside a PDF\'s metadata?',
          paragraphs: [
            'Every PDF carries a hidden set of document properties: who created it, which application produced it, when it was made and last modified, and often free-form keywords or custom fields. On top of that, most tools embed an XMP packet — an XML block duplicating and extending those properties.',
            'This tool reads both the classic document information dictionary and the XMP stream, lets you edit the standard fields, and can wipe all of it before you share a file.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'View all document info fields, including non-standard and custom entries',
            'Edit title, author, subject, keywords, creator, producer, and timestamps',
            'Remove every metadata field plus the embedded XMP stream in one click',
            'Shows file size, page count, PDF version, and XMP presence',
            'Files are processed locally and never uploaded',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it to scrub author names and tool fingerprints before publishing a document, fix a wrong title or author that shows up in search results and print dialogs, add missing keywords for archival systems, or simply audit what a PDF reveals about its origin.',
          ],
        },
      ]}
      faq={FAQ}
    >
      <PdfMetadata />
    </ToolShell>
  );
}

export default PdfMetadataPage;
