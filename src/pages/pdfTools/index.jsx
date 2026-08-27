import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import PdfMerge from './PdfMerge';
import PdfSplit from './PdfSplit';
import ImageToPdf from './ImageToPdf';
import DocToPdf from './DocToPdf';

const TABS = [
  { id: 'merge', label: 'Merge PDFs', component: PdfMerge },
  { id: 'split', label: 'Split PDF', component: PdfSplit },
  { id: 'image', label: 'Image → PDF', component: ImageToPdf },
  { id: 'doc', label: 'Document → PDF', component: DocToPdf },
];

function PdfTools() {
  const [activeTab, setActiveTab] = useState('merge');
  const ActiveComponent = TABS.find((tab) => tab.id === activeTab).component;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free PDF Tools - Merge, Split & Convert PDFs Online | OG Technologies EU</title>
        <meta name="description" content="Merge, split, and convert PDF files directly in your browser. Convert images and documents to PDF. Free and private - no file is ever uploaded to a server." />
        <meta name="keywords" content="PDF tools, merge PDF, split PDF, image to PDF, DOCX to PDF, ODT to PDF, TXT to PDF, free PDF converter, browser PDF tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ogtechnologies.co/tools/pdf-tools" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ogtechnologies.co/tools/pdf-tools" />
        <meta property="og:title" content="Free PDF Tools - Merge, Split & Convert PDFs Online | OG Technologies EU" />
        <meta property="og:description" content="Merge, split, and convert PDF files directly in your browser. Free and private - no file is ever uploaded to a server." />
        <meta property="og:image" content="https://ogtechnologies.co/og-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ogtechnologies.co/tools/pdf-tools" />
        <meta name="twitter:title" content="Free PDF Tools - Merge, Split & Convert PDFs Online | OG Technologies EU" />
        <meta name="twitter:description" content="Merge, split, and convert PDF files directly in your browser. Free and private - no file is ever uploaded to a server." />
        <meta name="twitter:image" content="https://ogtechnologies.co/og-og-image.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'PDF Tools',
            url: 'https://ogtechnologies.co/tools/pdf-tools',
            description: 'Merge, split, and convert PDF files directly in your browser. Free and private - no file is ever uploaded to a server.',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            featureList: [
              'Merge two PDF files into one',
              'Split a PDF at any page',
              'Convert PNG/JPG images to PDF',
              'Convert DOCX, ODT, and TXT documents to PDF',
            ],
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            creator: {
              '@type': 'Organization',
              name: 'OG Technologies EU',
              url: 'https://ogtechnologies.co/',
            },
          })}
        </script>
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
                  Merge, split and convert PDF files directly in your browser. No file is sent to a server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Tabs */}
                <div className="flex flex-wrap rounded-lg overflow-hidden border border-gray-600 mb-8">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      className={`flex-1 min-w-[140px] px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
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
