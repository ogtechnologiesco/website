import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import PdfMerge from './PdfMerge';
import PdfSplit from './PdfSplit';
import ImageToPdf from './ImageToPdf';
import DocToPdf from './DocToPdf';
import PdfToWord from './PdfToWord';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', path: '/tools/merge-pdf/', component: PdfMerge },
  { id: 'split', label: 'Split PDF', path: '/tools/split-pdf/', component: PdfSplit },
  { id: 'image', label: 'Image → PDF', path: '/tools/image-to-pdf/', component: ImageToPdf },
  { id: 'doc', label: 'Document → PDF', path: '/tools/document-to-pdf/', component: DocToPdf },
  { id: 'word', label: 'PDF → Word', path: '/tools/pdf-to-word/', component: PdfToWord },
];

function PdfTools() {
  const ActiveComponent = TABS[0].component;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free PDF Tools - Merge, Split & Convert PDFs Online | OG Technologies EU</title>
        <meta name="description" content="Merge, split, and convert PDF files directly in your browser. Convert images and documents to PDF, or convert PDF to Word (.docx, .txt, .html). Free and private - no file is ever uploaded to a server." />
        <meta name="keywords" content="PDF tools, merge PDF, split PDF, image to PDF, DOCX to PDF, ODT to PDF, TXT to PDF, PDF to Word, PDF to docx, free PDF converter, browser PDF tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/pdf-tools/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/pdf-tools/" />
        <meta property="og:title" content="Free PDF Tools - Merge, Split & Convert PDFs Online | OG Technologies EU" />
        <meta property="og:description" content="Merge, split, and convert PDF files directly in your browser. Free and private - no file is ever uploaded to a server." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/pdf-tools/" />
        <meta name="twitter:title" content="Free PDF Tools - Merge, Split & Convert PDFs Online | OG Technologies EU" />
        <meta name="twitter:description" content="Merge, split, and convert PDF files directly in your browser. Free and private - no file is ever uploaded to a server." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        {/* JSON-LD Structured Data */}
      </Helmet>

      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">
        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1">PDF Tools</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Merge, split, convert, and transform PDF files directly in your browser. No file is sent to a server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Tabs */}
                <div className="flex flex-wrap rounded-lg overflow-hidden border border-gray-600 mb-8">
                  {TABS.map((tab) => (
                    <Link
                      key={tab.id}
                      to={tab.path}
                      className={`flex-1 min-w-[140px] px-4 py-3 text-sm font-medium transition-colors text-center ${
                        tab.id === 'merge'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>

                {/* Active tool */}
                <ActiveComponent />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}

export default PdfTools;
