import React from 'react';
import ToolShell from '../../components/ToolShell';
import ImageToPdf from './ImageToPdf';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf/' },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf/' },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf/' },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf/' },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word/' },
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
      about={[
        {
          heading: 'Convert images to PDF privately',
          paragraphs: [
            'Image-to-PDF conversion is a common need for scanned receipts, whiteboard photos, ID documents, and design mockups. Most online converters upload your images to a server; this tool embeds them into a PDF directly in your browser, so nothing is transmitted or stored remotely.',
            'You can combine multiple images into a single PDF, with each image placed on its own page in the order you choose.',
          ],
        },
        {
          heading: 'Features',
          paragraphs: [],
          list: [
            'Convert PNG and JPG images to PDF',
            'Combine multiple images into one document',
            'Each image placed on its own page',
            'Original image quality preserved',
            'No uploads — processing happens entirely on your device',
          ],
        },
        {
          heading: 'When to use it',
          paragraphs: [
            'Use it to turn phone photos of documents into shareable PDFs, package scanned pages into a single file, submit image-based forms as PDF, or create a simple portfolio or report from screenshots and diagrams.',
          ],
        },
      ]}
      
    >
      <ImageToPdf />
    </ToolShell>
  );
}

export default ImageToPdfPage;
