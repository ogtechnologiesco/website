import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { getProduct } from '../../data/products';

const LINK_GROUPS = [
  { types: ['tool'], heading: 'Free Tools' },
  { types: ['article', 'blog'], heading: 'Further Reading' },
  { types: ['service', 'product'], heading: 'Related Products & Services' },
];

function LinkCard({ heading, links }) {
  if (links.length === 0) return null;
  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
      <h3 className="text-xl font-bold text-white mb-4">{heading}</h3>
      <ul className="space-y-3 text-gray-300 text-sm">
        {links.map((link) => (
          <li key={link.url + link.label} className="flex items-start">
            <span className="text-purple-400 mr-2 mt-1">→</span>
            <a href={link.url} className="text-purple-400 hover:text-purple-300 underline">{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>Product Not Found - OG Technologies EU</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Header />
        <main className="grow">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Product not found</h1>
            <p className="text-xl text-gray-400 mb-8">The product you are looking for does not exist.</p>
            <Link
              to="/products/"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const canonicalUrl = `https://www.ogtechnologies.co/products/${product.slug}/`;
  const ctaLinks = (product.relatedLinks || []).filter((l) => l.type === 'cta');

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>{product.metaTitle}</title>
        <meta name="description" content={product.metaDescription} />
        <meta name="keywords" content={product.metaKeywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={product.metaTitle} />
        <meta property="og:description" content={product.metaDescription} />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={product.metaTitle} />
        <meta name="twitter:description" content={product.metaDescription} />
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
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">{product.badge}</span>
                  {product.status && <span className="text-green-400 text-sm">✓ {product.status}</span>}
                </div>
                <h1 className="h1 mb-4">{product.name}</h1>
                <p className="text-xl text-gray-400 mb-8">{product.tagline}</p>
                {ctaLinks.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {ctaLinks.map((link, i) => (
                      <a
                        key={link.url + link.label}
                        href={link.url}
                        className={i === 0
                          ? 'bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out text-center'
                          : 'bg-transparent border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out text-center'}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid lg:grid-cols-3 gap-12 items-start">

                {/* Main column — features + sections + FAQ */}
                <div className="lg:col-span-2">
                  {product.features && product.features.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                      <ul className="space-y-3 text-gray-300">
                        {product.features.map((f, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.sections.map((section, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
                      {section.paragraphs.map((p, j) => (
                        <p key={j} className="text-gray-300 mb-4 last:mb-0">{p}</p>
                      ))}
                    </div>
                  ))}

                  {product.faq && product.faq.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                      <div className="space-y-6 text-gray-300">
                        {product.faq.map((item, i) => (
                          <div key={i}>
                            <h3 className="text-lg font-semibold text-white mb-1">{item.q}</h3>
                            <p className="text-sm">{item.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar — links + CTA */}
                <div>
                  {LINK_GROUPS.map((group) => (
                    <LinkCard
                      key={group.heading}
                      heading={group.heading}
                      links={(product.relatedLinks || []).filter((l) => group.types.includes(l.type))}
                    />
                  ))}

                  <div className="bg-gray-800 rounded-lg p-8 border border-purple-700/50">
                    <h3 className="text-xl font-bold text-white mb-3">Interested?</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Tell us about your project — we tailor every engagement to specific business objectives.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/quote/"
                        className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Request a quote
                      </a>
                      <Link
                        to="/products/"
                        className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors"
                      >
                        All products
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;
