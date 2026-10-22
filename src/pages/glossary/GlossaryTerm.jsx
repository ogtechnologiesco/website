import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { getGlossaryTerm, getGlossaryCategory, getGlossaryTerm as find } from '../../data/glossaryTerms';

const LINK_GROUPS = [
  { types: ['tool', 'download'], heading: 'Free Tools & Resources' },
  { types: ['article', 'blog'], heading: 'Further Reading' },
  { types: ['service', 'product'], heading: 'Products & Services' },
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

function GlossaryTerm() {
  const { slug } = useParams();
  const term = getGlossaryTerm(slug);

  if (!term) {
    return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>Term Not Found | OG Technologies EU</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Header />
        <main className="grow">
          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20 text-center">
                <h1 className="h1 mb-4">Term not found</h1>
                <p className="text-xl text-gray-400 mb-8">
                  We do not have a glossary entry for &ldquo;{slug}&rdquo;.
                </p>
                <Link to="/glossary/" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg">
                  Browse the glossary
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const category = getGlossaryCategory(term.category);
  const canonical = `https://www.ogtechnologies.co/glossary/${term.slug}/`;
  const title = `${term.term} — Definition & Meaning | OG Technologies EU`;
  const relatedTerms = (term.relatedTerms || [])
    .map((s) => find(s))
    .filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={term.definition} />
        <meta name="keywords" content={`${term.term}, ${term.shortName}, ${term.term} definition, ${term.term} meaning, ${category.name}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={term.definition} />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={term.definition} />
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
                <Link
                  to={`/glossary/#${category.id}`}
                  className="inline-block text-xs font-medium uppercase tracking-wider text-purple-400 hover:text-purple-300 mb-4"
                >
                  {category.name}
                </Link>
                <h1 className="h1 mb-4">{term.term}</h1>
                <p className="text-xl text-gray-400">{term.definition}</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-12 items-start">

                {/* Main column — definition sections + FAQ */}
                <div className="lg:col-span-2">
                  {term.sections.map((section, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
                      {section.paragraphs.map((p, j) => (
                        <p key={j} className="text-gray-300 mb-4 last:mb-0">{p}</p>
                      ))}
                    </div>
                  ))}

                  {term.faq && term.faq.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                      <div className="space-y-6 text-gray-300">
                        {term.faq.map((item, i) => (
                          <div key={i}>
                            <h3 className="text-lg font-semibold text-white mb-1">{item.q}</h3>
                            <p className="text-sm">{item.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {relatedTerms.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">Related Terms</h2>
                      <div className="flex flex-wrap gap-2">
                        {relatedTerms.map((rt) => (
                          <Link
                            key={rt.slug}
                            to={`/glossary/${rt.slug}/`}
                            className="px-4 py-2 rounded-full bg-gray-700 text-gray-200 text-sm hover:bg-purple-700 hover:text-white transition duration-150 ease-in-out"
                          >
                            {rt.term}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar — standards + links + CTA */}
                <div>
                  {term.standards && term.standards.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                      <h3 className="text-xl font-bold text-white mb-4">Related Standards</h3>
                      <ul className="space-y-3 text-gray-300 text-sm">
                        {term.standards.map((s, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            {s.url ? (
                              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                                {s.name}
                              </a>
                            ) : (
                              <span>{s.name}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {LINK_GROUPS.map((group) => (
                    <LinkCard
                      key={group.heading}
                      heading={group.heading}
                      links={(term.relatedLinks || []).filter((l) => group.types.includes(l.type))}
                    />
                  ))}

                  <div className="bg-gray-800 rounded-lg p-8 border border-purple-700/50">
                    <h3 className="text-xl font-bold text-white mb-3">Need help with this?</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      We consult and build across all of these domains — tell us what you are working on.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/quote/"
                        className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Request a quote
                      </a>
                      <Link
                        to="/glossary/"
                        className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors"
                      >
                        All glossary terms
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

export default GlossaryTerm;
