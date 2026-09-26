import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import XmlFormatter from './XmlFormatter';
import XmlValidator from './XmlValidator';
import XmlToJson from './XmlToJson';
import XmlMinifier from './XmlMinifier';
import XPathTester from './XPathTester';
import XmlToCsv from './XmlToCsv';

const TABS = [
  { id: 'format', label: 'Formatter', path: '/tools/xml-formatter/', component: XmlFormatter },
  { id: 'validate', label: 'Validator', path: '/tools/xml-validator/', component: XmlValidator },
  { id: 'json', label: 'XML → JSON', path: '/tools/xml-to-json/', component: XmlToJson },
  { id: 'minify', label: 'Minifier', path: '/tools/xml-minifier/', component: XmlMinifier },
  { id: 'xpath', label: 'XPath Tester', path: '/tools/xpath-tester/', component: XPathTester },
  { id: 'csv', label: 'XML → CSV', path: '/tools/xml-to-csv/', component: XmlToCsv },
];

function XmlTools() {
  const ActiveComponent = TABS[0].component;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free XML Tools — Formatter, Validator, Converter | OG Technologies EU</title>
        <meta name="description" content="Free online XML tools: format and beautify XML, validate well-formedness, convert XML to JSON or CSV, minify XML, and test XPath expressions. 100% browser-based, no data sent to any server." />
        <meta name="keywords" content="XML formatter, XML beautifier, XML validator, XML to JSON converter, XML minifier, XPath tester, XML to CSV converter, free XML tools, online XML utilities" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/xml-tools/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/xml-tools/" />
        <meta property="og:title" content="Free XML Tools — Formatter, Validator, Converter | OG Technologies EU" />
        <meta property="og:description" content="Free online XML tools: format and beautify XML, validate well-formedness, convert XML to JSON or CSV, minify XML, and test XPath expressions. 100% browser-based." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/xml-tools/" />
        <meta name="twitter:title" content="Free XML Tools — Formatter, Validator, Converter | OG Technologies EU" />
        <meta name="twitter:description" content="Free online XML tools: format and beautify XML, validate well-formedness, convert XML to JSON or CSV, minify XML, and test XPath expressions. 100% browser-based." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
      </Helmet>

      <Header />

      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1">XML Tools</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Format, validate, convert, and query XML directly in your browser.
                  No data is sent to any server — everything runs locally.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap rounded-lg overflow-hidden border border-gray-600 mb-8">
                  {TABS.map((tab) => (
                    <Link
                      key={tab.id}
                      to={tab.path}
                      className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-medium transition-colors text-center ${
                        tab.id === 'format'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`
                    }
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>

                <ActiveComponent />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default XmlTools;
