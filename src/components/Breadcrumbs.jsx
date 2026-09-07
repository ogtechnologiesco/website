import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const routeNames = {
  '': 'Home',
  'products': 'Products',
  'pricing': 'Pricing',
  'standards': 'Standards',
  'dora': 'DORA Compliance',
  'blog': 'Blog',
  'ventures': 'Ventures',
  'portfolio': 'Portfolio',
  'careers': 'Careers',
  'quote': 'Request a Quote',
  'terms': 'Terms',
  'privacy': 'Privacy Policy',
  'cookie-policy': 'Cookie Policy',
  'imprint': 'Imprint',
  'helpdesk': 'Helpdesk',
  'tools': 'Tools',
  'html-to-image': 'HTML to Image',
  'screenshot-to-image': 'Screenshot to Image',
  'pdf-tools': 'PDF Tools',
  'security-tools': 'Security Scanner',
  'blockchain-compliance-checker': 'Blockchain Compliance Checker',
  'reaching-new-frontiers': 'Reaching New Frontiers',
  'meridian-2024-highlights': 'Meridian 2024 Highlights',
  'ebsi-verifiable-credentials': 'EBSI Verifiable Credentials',
  'how-blockchain-standards-enable-enterprises-to-reach-global-customers': 'Blockchain Standards for Global Customers',
  'digital-payments-future': "Europe's Digital Payment Future",
  'estandares-sismicos-colombia': 'Estándares Sísmicos Colombia',
};

function Breadcrumbs() {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/') return null;

  const segments = path.split('/').filter(Boolean);
  const crumbs = [{ name: 'Home', path: '/' }];
  let currentPath = '';

  segments.forEach((segment) => {
    currentPath += '/' + segment;
    const name = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    crumbs.push({ name, path: currentPath });
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://www.ogtechnologies.co${crumb.path}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="relative max-w-6xl mx-auto px-4 sm:px-6" style={{ paddingTop: '88px' }}>
        <ol className="flex flex-wrap items-center text-sm text-gray-500 pb-2">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-gray-600" aria-hidden="true">/</span>
                )}
                {isLast ? (
                  <span className="text-gray-400" aria-current="page">{crumb.name}</span>
                ) : (
                  <Link to={crumb.path} className="text-purple-600 hover:text-purple-400 transition duration-150 ease-in-out">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
