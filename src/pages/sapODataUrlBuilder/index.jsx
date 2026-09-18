import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';

function buildODataUrl(baseUrl, entitySet, params) {
  const cleanBase = baseUrl.trim().replace(/\/+$/, '');
  const cleanEntity = entitySet.trim();
  if (!cleanBase || !cleanEntity) return '';

  let url = `${cleanBase}/${cleanEntity}`;

  const queryParts = [];

  if (params.select.trim()) {
    queryParts.push(`$select=${encodeURIComponent(params.select.trim())}`);
  }
  if (params.expand.trim()) {
    queryParts.push(`$expand=${encodeURIComponent(params.expand.trim())}`);
  }
  if (params.filter.trim()) {
    queryParts.push(`$filter=${encodeURIComponent(params.filter.trim())}`);
  }
  if (params.orderby.trim()) {
    queryParts.push(`$orderby=${encodeURIComponent(params.orderby.trim())}`);
  }
  if (params.top.trim()) {
    queryParts.push(`$top=${encodeURIComponent(params.top.trim())}`);
  }
  if (params.skip.trim()) {
    queryParts.push(`$skip=${encodeURIComponent(params.skip.trim())}`);
  }
  if (params.format.trim()) {
    queryParts.push(`$format=${encodeURIComponent(params.format.trim())}`);
  }
  if (params.count) {
    queryParts.push('$count=true');
  }
  if (params.search.trim()) {
    queryParts.push(`$search=${encodeURIComponent(params.search.trim())}`);
  }

  if (queryParts.length > 0) {
    url += '?' + queryParts.join('&');
  }

  return url;
}

function SapODataUrlBuilder() {
  const [baseUrl, setBaseUrl] = useState('/sap/opu/odata/sap/ZMY_SERVICE_SRV');
  const [entitySet, setEntitySet] = useState('SalesOrderSet');
  const [params, setParams] = useState({
    select: 'SalesOrderID,CustomerName,TotalAmount',
    expand: '',
    filter: "TotalAmount gt 1000",
    orderby: 'TotalAmount desc',
    top: '10',
    skip: '',
    format: 'json',
    count: false,
    search: '',
  });

  const url = useMemo(() => buildODataUrl(baseUrl, entitySet, params), [baseUrl, entitySet, params]);

  const updateParam = (key, value) => setParams({ ...params, [key]: value });

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free SAP OData URL Builder Online | OG Technologies EU</title>
        <meta name="description" content="Build SAP OData query URLs interactively with $select, $expand, $filter, $orderby, $top, $skip, $format, and $count parameters. 100% client-side." />
        <meta name="keywords" content="SAP OData URL builder, OData query, SAP Gateway, $filter, $select, $expand, SAP developer tools, OData V2, OData V4" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/sap-odata-url-builder/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/sap-odata-url-builder/" />
        <meta property="og:title" content="Free SAP OData URL Builder Online | OG Technologies EU" />
        <meta property="og:description" content="Build SAP OData query URLs interactively with $select, $expand, $filter, $orderby, $top, $skip, $format. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/sap-odata-url-builder/" />
        <meta name="twitter:title" content="Free SAP OData URL Builder Online | OG Technologies EU" />
        <meta name="twitter:description" content="Build SAP OData query URLs interactively with $select, $expand, $filter, $orderby, $top, $skip, $format. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'SAP OData URL Builder',
            url: 'https://www.ogtechnologies.co/tools/sap-odata-url-builder/',
            description: 'Build SAP OData query URLs interactively with $select, $expand, $filter, $orderby, $top, $skip, $format, and $count parameters. 100% client-side.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            featureList: [
              'Interactive OData query parameter builder',
              'Support for $select, $expand, $filter, $orderby',
              'Support for $top, $skip, $format, $count, $search',
              'Live URL preview with URL encoding',
              'Copy generated URL to clipboard',
            ],
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
          })}
        </script>
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
                <h1 className="h1">SAP OData URL Builder</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Build SAP OData query URLs interactively with $select, $expand, $filter, $orderby, $top, $skip,
                  and $format parameters. Everything runs in your browser — no data is sent to any server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-1">Base Service URL</label>
                      <input
                        type="text"
                        value={baseUrl}
                        onChange={(e) => setBaseUrl(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="/sap/opu/odata/sap/ZMY_SERVICE_SRV"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">Entity Set</label>
                      <input
                        type="text"
                        value={entitySet}
                        onChange={(e) => setEntitySet(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="SalesOrderSet"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">$select (comma-separated properties)</label>
                      <input
                        type="text"
                        value={params.select}
                        onChange={(e) => updateParam('select', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="SalesOrderID,CustomerName"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">$expand (navigation properties)</label>
                      <input
                        type="text"
                        value={params.expand}
                        onChange={(e) => updateParam('expand', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="Items,Customer"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">$filter</label>
                      <input
                        type="text"
                        value={params.filter}
                        onChange={(e) => updateParam('filter', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="TotalAmount gt 1000 and Status eq 'Open'"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">$orderby</label>
                      <input
                        type="text"
                        value={params.orderby}
                        onChange={(e) => updateParam('orderby', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="TotalAmount desc"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">$top</label>
                        <input
                          type="text"
                          value={params.top}
                          onChange={(e) => updateParam('top', e.target.value)}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                          placeholder="10"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">$skip</label>
                        <input
                          type="text"
                          value={params.skip}
                          onChange={(e) => updateParam('skip', e.target.value)}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">$format</label>
                        <select
                          value={params.format}
                          onChange={(e) => updateParam('format', e.target.value)}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                        >
                          <option value="">(none)</option>
                          <option value="json">json</option>
                          <option value="xml">xml</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">$count</label>
                        <div className="flex items-center h-10">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={params.count}
                              onChange={(e) => updateParam('count', e.target.checked)}
                              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-300">true</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">$search</label>
                      <input
                        type="text"
                        value={params.search}
                        onChange={(e) => updateParam('search', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="search term (OData V4 only)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1">Generated OData URL (encoded)</label>
                    <div className="flex items-start gap-3 bg-gray-700 rounded-md px-4 py-3 mb-2">
                      <code className="text-purple-300 font-mono text-sm break-all flex-1">{url || 'Fill in fields to generate URL...'}</code>
                      {url && (
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(url)}
                          className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
                        >
                          Copy
                        </button>
                      )}
                    </div>
                    {url && (
                      <div className="bg-gray-700/50 rounded-md px-4 py-3">
                        <p className="text-xs text-gray-400 mb-1">Decoded (human-readable)</p>
                        <code className="text-gray-300 font-mono text-sm break-all">{decodeURIComponent(url)}</code>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 text-xs text-gray-500">
                    <p><strong>Common $filter operators:</strong> eq, ne, gt, ge, lt, le, and, or, not, startswith(), substringof(), tolower()</p>
                    <p className="mt-1"><strong>OData V2</strong> uses <code>substringof('text',Field)</code>, <strong>V4</strong> uses <code>contains(Field,'text')</code></p>
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

export default SapODataUrlBuilder;
