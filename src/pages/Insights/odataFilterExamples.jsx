import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-odata-filter.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const EX = ({ code }) => (
  <pre className="bg-gray-900 rounded-md p-3 overflow-x-auto text-xs text-gray-300 mb-4">{code}</pre>
);

function OdataFilterExamples() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>OData $filter Examples: Operators, Functions, and 40+ Copy-Paste Queries | OG Technologies EU</title>
          <meta name="description" content="OData $filter examples cookbook: comparison and logical operators, startswith/contains/endswith, date and number filters, null checks, boolean filters, any/all on collections, and V2 vs V4 syntax." />
          <meta name="keywords" content="odata filter, odata filter examples, odata filter syntax, odata filter operators, odata boolean filter, odata greater than, odata less than or equal to, odata startswith, odata contains, odata nested expand, odata filter date" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/odata-filter-examples/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/odata-filter-examples/" />
          <meta property="og:title" content="OData $filter Examples: Operators, Functions, and 40+ Copy-Paste Queries" />
          <meta property="og:description" content="A copy-pasteable OData $filter cookbook: every operator and function with real examples, collection filters with any/all, and the V2 vs V4 differences that break queries." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/odata-filter-examples/" />
          <meta name="twitter:title" content="OData $filter Examples: Operators, Functions, and 40+ Copy-Paste Queries" />
          <meta name="twitter:description" content="Every OData filter operator and function with copy-paste examples — equality, dates, contains, boolean combos, and any/all." />
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
                  <h1 className="h1">OData $filter Examples: Operators, Functions, and 40+ Copy-Paste Queries</h1>
                  <div className="text-gray-400 text-center mt-4">20/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="OData $filter examples cookbook"
                  />

                  <article className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-8">
                      <code className="text-purple-300">$filter</code> is the OData query option people google most —
                      the syntax is strict, the error messages are useless, and half the examples online are for the
                      wrong protocol version. This cookbook collects every operator and function with a copy-pasteable
                      example. All queries assume a hypothetical <code className="text-purple-300">Orders</code> entity set
                      with properties <code className="text-purple-300">Id, Customer, Status, Total, OrderDate, Items</code>.
                      For the full query-option reference see
                      the <Link to="/insights/odata-query-options-guide/" className="text-purple-400 hover:text-purple-300 underline">OData query options cheat sheet</Link>;
                      to build URLs interactively use
                      the <Link to="/tools/sap-odata-url-builder/" className="text-purple-400 hover:text-purple-300 underline">SAP OData URL builder</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Comparison operators</h2>
                    <EX code={`$filter=Status eq 'Open'\n$filter=Status ne 'Cancelled'\n$filter=Total gt 1000\n$filter=Total ge 1000\n$filter=Total lt 500\n$filter=Total le 500`} />
                    <p className="mb-8">
                      Operators are words, not symbols — <code className="text-purple-300">eq, ne, gt, ge, lt, le</code>.
                      String literals use single quotes; numbers and booleans are bare. A double quote around
                      a string (<code className="text-purple-300">eq "Open"</code>) is a syntax error in OData.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Logical operators and precedence</h2>
                    <EX code={`$filter=Status eq 'Open' and Total gt 100\n$filter=Status eq 'Open' or Status eq 'Pending'\n$filter=not (Status eq 'Cancelled')\n$filter=(Total gt 1000 or Total lt 0) and Status ne 'Draft'`} />
                    <p className="mb-8">
                      <code className="text-purple-300">not</code> binds tightest, then <code className="text-purple-300">and</code>,
                      then <code className="text-purple-300">or</code>. When mixing, parenthesise — <code className="text-purple-300">A and B or C</code> reads
                      as <code className="text-purple-300">(A and B) or C</code>, which is rarely what you meant.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Arithmetic operators</h2>
                    <EX code={`$filter=Total div Quantity gt 100\n$filter=Price mul Quantity gt 5000\n$filter=Balance mod 1000 eq 0\n$filter=(Amount add Tax) gt 100`} />
                    <p className="mb-8">
                      <code className="text-purple-300">add, sub, mul, div, mod</code> work inside expressions — handy
                      when the API exposes gross/net split properties but not the derived total.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">String functions</h2>
                    <EX code={`$filter=startswith(Customer,'Cont')\n$filter=endswith(Customer,'Ltd')\n$filter=contains(Customer,'hold')          // V4\n$filter=substringof('hold',Customer)       // V2 equivalent\n$filter=indexof(Customer,'-') gt 0\n$filter=length(Customer) gt 10\n$filter=tolower(Customer) eq 'contoso'\n$filter=trim(Customer) eq 'Contoso'\n$filter=concat(concat(FirstName,' '),LastName) eq 'John Doe'\n$filter=substring(Customer,0,4) eq 'Cont'`} />
                    <p className="mb-8">
                      The V2→V4 rename that breaks the most queries: <code className="text-purple-300">substringof(needle,field)</code> became
                      {' '}<code className="text-purple-300">contains(field,needle)</code> — arguments swapped <em>and</em> renamed.
                      In V4, <code className="text-purple-300">substring(x,n)</code> (without a length) takes everything from position n.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Date and time functions</h2>
                    <EX code={`// V4 — Edm.DateTimeOffset / Edm.Date properties\n$filter=OrderDate gt 2026-01-01\n$filter=year(OrderDate) eq 2026\n$filter=month(OrderDate) eq 10 and year(OrderDate) eq 2026\n$filter=day(OrderDate) le 15\n$filter=hour(CreatedAt) lt 12\n\n// V2 — Edm.DateTime needs the datetime literal wrapper\n$filter=OrderDate gt datetime'2026-01-01T00:00:00'`} />
                    <p className="mb-8">
                      V4 dropped the <code className="text-purple-300">datetime'…'</code> wrapper for ISO 8601 bare literals —
                      the single most common "works in demo, fails on SAP" bug, because SAP Gateway still serves V2
                      for most Fiori services. <code className="text-purple-300">now()</code> is available in V4 only.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Null and boolean filters</h2>
                    <EX code={`$filter=ConfirmedBy eq null\n$filter=ConfirmedBy ne null\n$filter=IsPaid eq true\n$filter=IsPaid                    // V4 shorthand: boolean properties filter directly\n$filter=not IsPaid`} />
                    <p className="mb-8">
                      <code className="text-purple-300">null</code> is a literal, not a string — <code className="text-purple-300">eq 'null'</code> never
                      matches. Boolean properties can be the whole predicate in V4 (<code className="text-purple-300">$filter=IsPaid</code>).
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Collections: any and all (the "nested filter" question)</h2>
                    <p className="mb-4">
                      To filter a parent by a child collection property — e.g., "orders that contain an item over
                      €1000" — use the lambda operators <code className="text-purple-300">any</code> and <code className="text-purple-300">all</code>,
                      not a path into the collection:
                    </p>
                    <EX code={`// Orders with at least one item over 1000\n$filter=Items/any(i:i/Price gt 1000)\n\n// Orders where every item is in stock\n$filter=Items/all(i:i/InStock eq true)\n\n// Nested conditions\n$filter=Items/any(i:i/Price gt 1000 and i/Category eq 'Premium')`} />
                    <p className="mb-8">
                      <code className="text-purple-300">Items/Price gt 1000</code> is invalid — you can't address a
                      collection property directly. The lambda variable (<code className="text-purple-300">i:</code>) scopes
                      the inner predicates to a single element.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Enums, IN lists, and type casts</h2>
                    <EX code={`// Enum literal — fully qualified name, no quotes (V4)\n$filter=Status eq Demo.OrderStatus'Open'\n\n// V4.01+ — in-list\n$filter=Status in ('Open','Pending','Shipped')`} />
                    <p className="mb-8">
                      Enum values carry the namespace — <code className="text-purple-300">eq 'Open'</code> alone fails when
                      the property is typed. The <code className="text-purple-300">in</code> operator is V4.01; on older
                      services chain <code className="text-purple-300">or</code> conditions instead.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">SAP Gateway quirks that break filters</h2>
                    <ul className="list-disc pl-6 mb-8 space-y-2">
                      <li>Many SAP services require <code className="text-purple-300">sap-client=NNN</code> in the URL or a client header — without it you get an empty set, not an error.</li>
                      <li>SAP property names are case-sensitive and match the service's <code className="text-purple-300">$metadata</code>, not the ABAP field name (<code className="text-purple-300">CreatedAt</code> vs <code className="text-purple-300">ERDAT</code>).</li>
                      <li>Some SAP backends reject <code className="text-purple-300">contains()</code> and <code className="text-purple-300">startswith()</code> on non-string types — cast with <code className="text-purple-300">cast(Id,Edm.String)</code> first.</li>
                      <li>V2 services don't accept the V4 boolean shorthand — write <code className="text-purple-300">IsPaid eq true</code>.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Combine $filter with the rest</h2>
                    <EX code={`Orders?$filter=Status eq 'Open' and Total gt 100\n       &$select=Id,Customer,Total\n       &$orderby=OrderDate desc\n       &$top=50`} />
                    <p className="mb-8">
                      Always pair a filter with <code className="text-purple-300">$top</code> while developing — an unfiltered
                      entity set can be millions of rows. Build the URL with
                      the <Link to="/tools/sap-odata-url-builder/" className="text-purple-400 hover:text-purple-300 underline">OData URL builder</Link> and
                      check the encoded result before sending it to production.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">Why does my OData filter return a syntax error?</h3>
                    <p className="mb-8">
                      The top three causes: double-quoted strings (use <code className="text-purple-300">'single'</code>),
                      V4 syntax on a V2 service (<code className="text-purple-300">contains(F,'x')</code> →
                      {' '}<code className="text-purple-300">substringof('x',F)</code>), and bare dates on a V2 service
                      (<code className="text-purple-300">2026-01-01</code> → <code className="text-purple-300">datetime'2026-01-01T00:00:00'</code>).
                      Check the service version in <code className="text-purple-300">$metadata</code> before writing queries.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How do I filter on a nested or expanded property?</h3>
                    <p className="mb-8">
                      For a single-valued navigation property use a path: <code className="text-purple-300">$filter=Customer/Country eq 'DE'</code>.
                      For a collection-valued property you need <code className="text-purple-300">any</code>/<code className="text-purple-300">all</code>:
                      {' '}<code className="text-purple-300">$filter=Items/any(i:i/Price gt 100)</code> —
                      {' '}<code className="text-purple-300">Items/Price</code> alone is invalid.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is OData filter case-sensitive?</h3>
                    <p className="mb-8">
                      Property names are always case-sensitive. String <em>values</em> depend on the backend's
                      collation — most SAP systems are case-sensitive, Microsoft Graph is not. For a case-insensitive
                      match, normalise both sides: <code className="text-purple-300">tolower(Customer) eq 'contoso'</code>.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How do I filter by "contains" text?</h3>
                    <p className="mb-8">
                      V4: <code className="text-purple-300">contains(Field,'text')</code>. V2 (SAP Gateway):
                      {' '}<code className="text-purple-300">substringof('text',Field)</code>. Neither supports
                      wildcards — <code className="text-purple-300">%</code>-style patterns are a SQL thing, not OData.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/odata-filter-examples/"
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

export default OdataFilterExamples;
