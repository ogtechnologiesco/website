import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageIllustration from '../partials/PageIllustration';
import FeaturedPost from './FeaturedPost';
import { insightsPosts, allInsightCategories } from '../data/insightsPosts';

function Insights() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? insightsPosts
    : insightsPosts.filter((post) => post.categories.includes(activeCategory));

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Insights - OG Technologies EU | Industry Articles on Standards, Payments & Developer Tools</title>
        <meta name="description" content="In-depth industry articles from OG Technologies EU: ISO 20022 payments, ISO/IEC 42001 AI governance, IAM security, HL7/FHIR interoperability, and Ethereum development — with free tools to apply what you learn." />
        <meta name="keywords" content="ISO 20022, ISO 42001, AI management system, IAM policy security, HL7 FHIR, Ethereum ABI, calldata, payment standards, healthcare interoperability, developer tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/insights/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/insights/" />
        <meta property="og:title" content="Insights - OG Technologies EU | Industry Articles on Standards, Payments & Developer Tools" />
        <meta property="og:description" content="In-depth industry articles on ISO 20022, AI governance, IAM security, healthcare interoperability, and Ethereum development — with free tools to apply what you learn." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/" />
        <meta name="twitter:title" content="Insights - OG Technologies EU | Industry Articles on Standards, Payments & Developer Tools" />
        <meta name="twitter:description" content="In-depth industry articles on ISO 20022, AI governance, IAM security, healthcare interoperability, and Ethereum development — with free tools to apply what you learn." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Insights - OG Technologies EU",
            "description": "In-depth industry articles on payment standards, AI governance, cloud security, healthcare interoperability, and blockchain development.",
            "url": "https://www.ogtechnologies.co/insights/",
            "publisher": { "@type": "Organization", "name": "OG Technologies EU" },
            "hasPart": insightsPosts.map((post) => ({
              "@type": "Article",
              "headline": post.title,
              "description": post.description,
              "url": `https://www.ogtechnologies.co${post.link}`,
            })),
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
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Insights</h1>
                <p>
                  In-depth industry articles on the standards, protocols, and technologies behind our products and free tools. Each piece is written to be practical: understand the concept, then apply it immediately with our browser-based utilities — no uploads, no sign-up.
                </p>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {allInsightCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition duration-150 ease-in-out ${
                      activeCategory === cat
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Posts */}
              <div className="max-w-XL mx-auto">
                <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 1, pb: 6 }}>
                  <main>
                    <Grid container spacing={4}>
                      {filteredPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} />
                      ))}
                    </Grid>
                  </main>
                </Container>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Insights;
