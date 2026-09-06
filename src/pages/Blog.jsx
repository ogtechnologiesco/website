// Imprint.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageIllustration from '../partials/PageIllustration';
import FeaturedPost from './FeaturedPost';
import { blogPosts, allCategories } from '../data/blogPosts';

function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((post) => post.categories.includes(activeCategory));

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Blog - OG Technologies EU | Web3, Blockchain & IT Insights</title>
        <meta name="description" content="Explore the OG Technologies EU blog for insights on Web3, blockchain standards, verifiable credentials, digital payments, and enterprise IT innovation." />
        <meta name="keywords" content="blockchain blog, Web3 insights, verifiable credentials, EBSI, digital payments, ISO standards, DLT, Stellar, IT consulting" />
        <link rel="canonical" href="https://ogtechnologies.co/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ogtechnologies.co/blog" />
        <meta property="og:title" content="Blog - OG Technologies EU | Web3, Blockchain & IT Insights" />
        <meta property="og:description" content="Explore the OG Technologies EU blog for insights on Web3, blockchain standards, verifiable credentials, digital payments, and enterprise IT innovation." />
        <meta property="og:image" content="https://ogtechnologies.co/og-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ogtechnologies.co/blog" />
        <meta name="twitter:title" content="Blog - OG Technologies EU | Web3, Blockchain & IT Insights" />
        <meta name="twitter:description" content="Explore the OG Technologies EU blog for insights on Web3, blockchain standards, verifiable credentials, digital payments, and enterprise IT innovation." />
        <meta name="twitter:image" content="https://ogtechnologies.co/og-og-image.png" />
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
                <h1 className="h1">Welcome to our Blog</h1>
                <p>
                  Hello, and welcome to the blog of OG Technologies EU! We are thrilled you've decided to join us on this digital journey as we explore the dynamic world of Information Technology (IT) and the innovative solutions we offer at our top-tier consulting firm.
                  Based in Europe, OG Technologies EU is a leading IT consulting company with a strong commitment to delivering high-quality services and customized solutions to businesses across various industries. Our areas of expertise include Finance, Education, and Corporate Helpdesk. In addition, we set ourselves apart from the competition by specializing in cutting-edge technologies such as Web3 and Blockchain.
                </p>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {allCategories.map((cat) => (
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

export default Blog;
