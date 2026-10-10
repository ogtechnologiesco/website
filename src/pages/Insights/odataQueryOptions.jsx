import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-odata-query.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function OdataQueryOptions() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>OData Query Options Explained: $filter, $select, $expand, and $orderby | OG Technologies EU</title>
          <meta name="description" content="A practical guide to OData query options: $filter operators and functions, $select projections, $expand navigation properties, $orderby, $top/$skip pagination, V2 vs V4 differences, and SAP Gateway specifics." />
          <meta name="keywords" content="OData, OData query, $filter, $select, $expand, $orderby, $top, $skip, $count, SAP OData, OData V2 vs V4, OData URL, OData filter syntax, OData tutorial" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/odata-query-options-guide/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/odata-query-options-guide/" />
          <meta property="og:title" content="OData Query Options Explained: $filter, $select, $expand, and $orderby" />
          <meta property="og:description" content="OData query options with worked examples: $filter, $select, $expand, $orderby, pagination, V2 vs V4 syntax, and SAP Gateway specifics." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/odata-query-options-guide/" />
          <meta name="twitter:title" content="OData Query Options Explained: $filter, $select, $expand, and $orderby" />
          <meta name="twitter:description" content="OData query options with worked examples, V2 vs V4 syntax, and SAP Gateway specifics." />
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
                {/* Article header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <div className="text-purple-400 text-sm font-medium mb-2">Developer · Standards</div>
                  <h1 className="h1">OData Query Options Explained: $filter, $select, $expand, and $orderby</h1>
                  <div className="text-gray-400 text-center mt-4">09/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="OG Technologies EU SAP OData URL Builder — query parameter fields and generated URL"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      OData (Open Data Protocol) is the OASIS-standardized query language for REST APIs — also published as ISO/IEC 20802 — that turns a URL into a structured database query. If you work with <strong>SAP Gateway</strong>, <strong>Microsoft Dynamics 365</strong>, <strong>SharePoint</strong>, <strong>Microsoft Graph</strong>, or Salesforce Connect, you write OData URLs whether you call them that or not. The protocol defines a set of <em>system query options</em> — reserved parameters starting with <code className="text-purple-300">$</code> — that control filtering, projection, expansion, sorting, and paging.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Anatomy of an OData URL</h2>
                    <pre className="bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto text-sm text-gray-300">
{`{service-root}/{EntitySet}('key')?{query-options}

https://host/sap/opu/odata/sap/SALESORDER_SRV/SalesOrderSet
  ?$filter=TotalAmount gt 1000
  &$select=SalesOrderID,CustomerName,TotalAmount
  &$orderby=TotalAmount desc
  &$top=10
  &$format=json`}
                    </pre>
                    <p className="mb-8">
                      Everything before the <code className="text-purple-300">?</code> addresses a resource — the service root, then an entity set, optionally a key like <code className="text-purple-300">SalesOrderSet('500000123')</code> for a single record. Everything after it is a query option evaluated server-side. Options combine freely with <code className="text-purple-300">&</code>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">$select — Return Only What You Need</h2>
                    <p className="mb-8">
                      <code className="text-purple-300">$select</code> is a projection: a comma-separated list of properties to return. <code className="text-purple-300">$select=SalesOrderID,CustomerName</code> returns just those fields. It is the cheapest performance win available — entity types in SAP regularly carry dozens of properties, and omitting <code className="text-purple-300">$select</code> pulls them all over the wire.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">$filter — The Operator Reference</h2>
                    <p className="mb-4">
                      <code className="text-purple-300">$filter</code> takes a Boolean expression evaluated per entity. The core operators:
                    </p>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-left text-sm border border-gray-700">
                        <thead>
                          <tr className="bg-gray-800">
                            <th className="px-4 py-2 font-semibold text-gray-200 w-32">Operator</th>
                            <th className="px-4 py-2 font-semibold text-gray-200 w-32">Meaning</th>
                            <th className="px-4 py-2 font-semibold text-gray-200">Example</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ['eq / ne', 'equal / not equal', "Status eq 'Open'"],
                            ['gt / ge', 'greater than / or equal', 'TotalAmount ge 1000'],
                            ['lt / le', 'less than / or equal', "CreatedAt lt 2026-01-01T00:00:00Z"],
                            ['and / or / not', 'logical combination', "Status eq 'Open' and TotalAmount gt 100"],
                            ['contains()', 'substring match (V4)', "contains(CustomerName,'Acme')"],
                            ['startswith() / endswith()', 'prefix / suffix match', "startswith(CustomerName,'Ac')"],
                            ['tolower() / toupper()', 'case normalization', "tolower(CustomerName) eq 'acme gmbh'"],
                            ['year() / month() / day()', 'date parts', 'year(OrderDate) eq 2026'],
                            ['substringof()', 'substring match (V2)', "substringof('Acme',CustomerName)"],
                          ].map(([op, meaning, example]) => (
                            <tr key={op} className="border-t border-gray-700">
                              <td className="px-4 py-2 text-purple-300 font-mono text-xs align-top">{op}</td>
                              <td className="px-4 py-2 text-gray-200 align-top">{meaning}</td>
                              <td className="px-4 py-2 text-gray-400 align-top font-mono text-xs">{example}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-8">
                      Watch the literal syntax: strings take single quotes (<code className="text-purple-300">eq 'Open'</code>), numbers are bare, and dates differ by version — V2 uses <code className="text-purple-300">datetime'2026-01-01T00:00:00'</code>, V4 uses bare ISO 8601. Two syntax traps cause most failures: <strong>V2 vs V4 string functions</strong> (<code className="text-purple-300">substringof('x',Field)</code> in V2 becomes <code className="text-purple-300">contains(Field,'x')</code> in V4 — note the reversed arguments), and <strong>URL encoding</strong> — spaces and quotes must be percent-encoded, which is exactly where a builder tool earns its keep.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">$expand — Joining Related Entities</h2>
                    <p className="mb-8">
                      <code className="text-purple-300">$expand</code> inlines navigation properties — the OData equivalent of a JOIN. <code className="text-purple-300">$expand=ToLineItems</code> on a sales order embeds its items in the same response instead of forcing a second request. In OData V4 you can nest query options inside the expand: <code className="text-purple-300">$expand=ToLineItems($select=Product,Quantity;$top=5;$filter=Quantity gt 2)</code> — a feature SAP V2 services do not support, where all items come back unfiltered.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">$orderby, $top, $skip, $count — Sorting and Paging</h2>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><code className="text-purple-300">$orderby=TotalAmount desc</code> — sort by one or more properties (<code className="text-purple-300">asc</code> is default)</li>
                      <li><code className="text-purple-300">$top=10</code> — return at most N entities</li>
                      <li><code className="text-purple-300">$skip=20</code> — skip N entities; combined with <code className="text-purple-300">$top</code> it implements paging</li>
                      <li><code className="text-purple-300">$count=true</code> — include the total matching count (<code className="text-purple-300">$inlinecount=allpages</code> in V2)</li>
                    </ul>
                    <p className="mb-8">
                      One SAP-specific caveat: many SAP Gateway services ignore client-side paging or cap <code className="text-purple-300">$top</code> server-side — check for a <code className="text-purple-300">__next</code> link in the response and follow it rather than assuming you got everything.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">SAP Gateway Specifics</h2>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>Service URLs</strong> follow <code className="text-purple-300">/sap/opu/odata/sap/{'{'}SERVICE_NAME{'}'}_SRV/</code>, with entity sets typically named <code className="text-purple-300">XxxSet</code> (e.g., <code className="text-purple-300">SalesOrderSet</code>). Fetch <code className="text-purple-300">$metadata</code> first — it is the service's data dictionary: entity types, properties, keys, and navigation names.</li>
                      <li><strong><code className="text-purple-300">$format=json</code></strong> is effectively mandatory on SAP V2 services, which default to verbose Atom XML. V4 defaults to JSON.</li>
                      <li><strong><code className="text-purple-300">sap-client</code></strong> is a custom (non-$) query option many systems require, e.g. <code className="text-purple-300">sap-client=100</code>.</li>
                      <li><strong>Writes need a CSRF token</strong> — GET the service with <code className="text-purple-300">x-csrf-token: Fetch</code>, then replay the returned token on POST/PATCH/DELETE.</li>
                      <li><strong>Property names are case-sensitive</strong> and must match <code className="text-purple-300">$metadata</code> exactly — <code className="text-purple-300">totalamount</code> ≠ <code className="text-purple-300">TotalAmount</code>.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Build and Test a URL</h2>
                    <p className="mb-8">
                      The fastest way to learn the syntax is to see the encoded result as you type. Our <Link to="/tools/sap-odata-url-builder/" className="text-purple-400 hover:text-purple-300 underline">SAP OData URL Builder</Link> assembles <code className="text-purple-300">$select</code>, <code className="text-purple-300">$expand</code>, <code className="text-purple-300">$filter</code>, <code className="text-purple-300">$orderby</code>, <code className="text-purple-300">$top</code>, <code className="text-purple-300">$skip</code>, <code className="text-purple-300">$format</code>, <code className="text-purple-300">$count</code>, and <code className="text-purple-300">$search</code> into a correctly encoded URL — and shows the decoded form so you can verify it reads the way you intended. Then paste the URL into a browser or Postman against your system's <code className="text-purple-300">$metadata</code>-verified property names.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between OData V2 and V4?</h3>
                    <p className="mb-8">
                      V4 (the OASIS/ISO standard) simplified the protocol: JSON became the default format, <code className="text-purple-300">substringof('x',F)</code> became <code className="text-purple-300">contains(F,'x')</code>, date literals dropped the <code className="text-purple-300">datetime''</code> wrapper for bare ISO 8601, <code className="text-purple-300">$inlinecount</code> became <code className="text-purple-300">$count</code>, and <code className="text-purple-300">$expand</code> gained nested query options. Most SAP Gateway services are still V2 — check the service metadata before writing queries.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is OData still relevant?</h3>
                    <p className="mb-8">
                      Very much so in enterprise software. Every SAP S/4HANA Fiori app talks to OData services, Microsoft Graph is an OData API, and Dynamics 365, SharePoint, and Teamcenter all expose it. GraphQL displaced it in new public APIs, but inside the SAP and Microsoft ecosystems OData remains the standard data access layer.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between $filter and $search?</h3>
                    <p className="mb-8">
                      <code className="text-purple-300">$filter</code> evaluates structured predicates against named properties — <code className="text-purple-300">Status eq 'Open'</code>. <code className="text-purple-300">$search</code> performs full-text search across the entity where the server supports it — <code className="text-purple-300">$search=invoice</code>. Filter is exact and deterministic; search is implementation-defined and only exists in OData V4.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How do I test an OData URL before using it in code?</h3>
                    <p className="mb-8">
                      Paste it into a browser — OData GET requests need no tooling beyond a login session. Start with <code className="text-purple-300">$metadata</code> to confirm property names, build the URL with our <Link to="/tools/sap-odata-url-builder/" className="text-purple-400 hover:text-purple-300 underline">OData URL Builder</Link>, and add <code className="text-purple-300">$top=5</code> while iterating so you do not pull entire entity sets.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/odata-query-options-guide/"
                    categories={['Developer', 'Standards']}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default OdataQueryOptions;
