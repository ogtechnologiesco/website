import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageIllustration from '../partials/PageIllustration';

function ToolShell({
  title,
  description,
  canonical,
  keywords,
  jsonLd,
  tabs,
  activeTab,
  heading,
  subheading,
  children,
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.ogtechnologies.co${canonical}/`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.ogtechnologies.co${canonical}/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://www.ogtechnologies.co${canonical}/`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        {jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        )}
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
                <h1 className="h1">{heading}</h1>
                <p className="text-xl text-gray-400 mt-4">{subheading}</p>
              </div>

              <div className="max-w-4xl mx-auto">
                {tabs && tabs.length > 0 && (
                  <div className="flex flex-wrap rounded-lg overflow-hidden border border-gray-600 mb-8">
                    {tabs.map((tab) => (
                      <Link
                        key={tab.path}
                        to={tab.path}
                        className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-medium transition-colors text-center ${
                          activeTab === tab.id
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {tab.label}
                      </Link>
                    ))}
                  </div>
                )}

                {children}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ToolShell;
