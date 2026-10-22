import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS } from '../../data/glossaryTerms';

function Glossary() {
  const [query, setQuery] = useState('');

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_CATEGORIES.map((category) => ({
      ...category,
      terms: GLOSSARY_TERMS.filter(
        (t) =>
          t.category === category.id &&
          (!q ||
            t.term.toLowerCase().includes(q) ||
            t.shortName.toLowerCase().includes(q) ||
            t.definition.toLowerCase().includes(q))
      ),
    })).filter((c) => c.terms.length > 0);
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>IT &amp; Standards Glossary - Security, Payments, Identity &amp; Data Terms | OG Technologies EU</title>
        <meta name="description" content="Plain-language glossary of the standards, regulations, and technologies our clients work with: ISO 27001, ISO 42001, DORA, GDPR, ISO 20022, SEPA, eIDAS, HL7/FHIR, verifiable credentials, blockchain, and more." />
        <meta name="keywords" content="IT glossary, standards glossary, ISO 27001 definition, ISO 20022 glossary, DORA definition, GDPR glossary, eIDAS glossary, payments glossary, compliance terms, technology dictionary" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/glossary/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/glossary/" />
        <meta property="og:title" content="IT &amp; Standards Glossary | OG Technologies EU" />
        <meta property="og:description" content="Plain-language definitions of the standards, regulations, and technologies our clients work with — security, payments, identity, blockchain, health IT, and more." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/glossary/" />
        <meta name="twitter:title" content="IT &amp; Standards Glossary | OG Technologies EU" />
        <meta name="twitter:description" content="Plain-language definitions of the standards, regulations, and technologies our clients work with — security, payments, identity, blockchain, health IT, and more." />
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
                <h1 className="h1 mb-4">Technology &amp; Standards Glossary</h1>
                <p className="text-xl text-gray-400 mb-8">
                  Plain-language definitions of the standards, regulations, and technologies
                  our clients work with — each with related standards, free tools, and
                  further reading.
                </p>
                <div className="max-w-xl mx-auto">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${GLOSSARY_TERMS.length} terms…`}
                    aria-label="Search glossary terms"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {grouped.length === 0 ? (
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-gray-400">
                    No terms match &ldquo;{query}&rdquo;.{' '}
                    <button onClick={() => setQuery('')} className="text-purple-400 hover:text-purple-300 underline">
                      Clear search
                    </button>
                  </p>
                </div>
              ) : (
                grouped.map((category) => (
                  <div key={category.id} className="mb-12" id={category.id}>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-1">{category.name}</h2>
                      <p className="text-gray-400 text-sm">{category.description}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.terms.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/glossary/${t.slug}/`}
                          className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-600 transition duration-150 ease-in-out"
                        >
                          <h3 className="text-lg font-semibold text-white mb-2">{t.term}</h3>
                          <p className="text-sm text-gray-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">{t.definition}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              )}

              <div className="max-w-4xl mx-auto mt-12">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Who is this glossary for?</h3>
                      <p className="text-sm">
                        Clients, partners, and practitioners who work with the standards and technologies we
                        implement — compliance teams preparing for ISO 27001 or DORA, engineers integrating
                        ISO 20022 or HL7, and product teams navigating eIDAS, MiCA, and verifiable credentials.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Are these the official definitions?</h3>
                      <p className="text-sm">
                        No — these are practical summaries written for orientation. Each entry lists the related
                        standards and regulations it is based on; for compliance work always refer to the
                        official standard text. Where we have free tools or in-depth articles, they are linked
                        from each page.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Can I request a term?</h3>
                      <p className="text-sm">
                        Yes — email us at <a href="mailto:hi@ogtechnologies.co" className="text-purple-400 hover:text-purple-300 underline">hi@ogtechnologies.co</a> or
                        use the <a href="/quote/" className="text-purple-400 hover:text-purple-300 underline">quote form</a> if
                        you want a walkthrough of how a standard or technology applies to your project.
                      </p>
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

export default Glossary;
