import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import ScanForm from './ScanForm';
import ScanResults from './ScanResults';
import AcceptableUseNotice from './AcceptableUseNotice';
import { runScan } from './scanEngine.jsx';
import { useAuth } from '../../hooks/useAuth';

function SecurityTools() {
  const { isAuthenticated } = useAuth();
  const [accepted, setAccepted] = useState(false);
  const [auditInfo, setAuditInfo] = useState(null);
  const [scanData, setScanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (url) => {
    setLoading(true);
    setError('');
    setScanData(null);

    try {
      const data = await runScan(url);
      setScanData(data);
    } catch (err) {
      setError(
        err.message?.includes('All CORS proxies failed')
          ? 'Unable to reach the target URL through any proxy. The site may be down, blocking external requests, or all proxies are temporarily unavailable. Please try again in a few moments.'
          : err.message?.includes('Failed to fetch')
          ? 'Network error: unable to connect. Please check the URL and your internet connection, then try again.'
          : `Scan failed: ${err.message || 'Unknown error'}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setScanData(null);
    setError('');
  };

  const handleAccept = (record) => {
    setAuditInfo(record);
    setAccepted(true);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Web Security Scanner - Free Online Passive Security Check | OG Technologies EU</title>
        <meta name="description" content="Enter any website URL and get an instant passive security scan. Checks HTTPS, security headers, cookies, mixed content, and more — mapped to OWASP Top 10. Free and no signup required." />
        <meta name="keywords" content="web security scanner, OWASP top 10, security headers check, passive security scan, free pentesting tool, website security analysis, HSTS check, CSP check, cookie security" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ogtechnologies.co/tools/security-tools" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ogtechnologies.co/tools/security-tools" />
        <meta property="og:title" content="Web Security Scanner - Free Online Passive Security Check | OG Technologies EU" />
        <meta property="og:description" content="Enter any website URL and get an instant passive security scan mapped to OWASP Top 10. Free and no signup required." />
        <meta property="og:image" content="https://ogtechnologies.co/og-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ogtechnologies.co/tools/security-tools" />
        <meta name="twitter:title" content="Web Security Scanner - Free Online Passive Security Check | OG Technologies EU" />
        <meta name="twitter:description" content="Enter any website URL and get an instant passive security scan mapped to OWASP Top 10. Free and no signup required." />
        <meta name="twitter:image" content="https://ogtechnologies.co/og-og-image.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Web Security Scanner',
            url: 'https://ogtechnologies.co/tools/security-tools',
            description: 'Enter any website URL and get an instant passive security scan. Checks HTTPS, security headers, cookies, mixed content, and more — mapped to OWASP Top 10.',
            applicationCategory: 'SecurityApplication',
            operatingSystem: 'Any',
            featureList: [
              'HTTPS enforcement and HSTS verification',
              'Content-Security-Policy analysis',
              'Security headers audit (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)',
              'Cookie security flags check (Secure, HttpOnly, SameSite)',
              'Mixed content detection on HTTPS pages',
              'Sensitive path exposure probing',
              'Information disclosure detection',
              'OWASP Top 10 category mapping with remediation advice',
            ],
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            creator: {
              '@type': 'Organization',
              name: 'OG Technologies EU',
              url: 'https://ogtechnologies.co/',
            },
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
              <div className="max-w-3xl mx-auto text-center pb-8">
                <h1 className="h1">Web Security Scanner</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Enter a website URL to get an instant passive security assessment with
                  OWASP Top 10 mapping and remediation advice. Free, no signup required.
                </p>
              </div>

              {/* Acceptable use gate */}
              {!accepted && (
                <AcceptableUseNotice onAccept={handleAccept} />
              )}

              {/* Auth gate after acceptance */}
              {accepted && !isAuthenticated && !scanData && (
                <div className="max-w-md mx-auto mt-8 mb-8 text-center">
                  <div className="rounded-xl border border-purple-600/40 bg-purple-900/20 px-6 py-8">
                    <svg className="w-12 h-12 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-100 mb-2">Sign in required</h2>
                    <p className="text-sm text-gray-400 mb-6">
                      Please sign in or create a free account to start scanning. This helps us maintain accountability and prevent abuse.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        to="/signin"
                        state={{ from: '/tools/security-tools' }}
                        className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        state={{ from: '/tools/security-tools' }}
                        className="px-6 py-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 font-medium hover:bg-gray-700 transition-colors"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Scan form */}
              {accepted && isAuthenticated && !scanData && (
                <>
                  <ScanForm onScan={handleScan} loading={loading} />
                  {error && (
                    <div className="max-w-2xl mx-auto mt-4 rounded-lg border border-red-600/50 bg-red-900/20 px-5 py-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-sm text-red-300">{error}</p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Scan results */}
              {scanData && (
                <ScanResults scanData={scanData} auditInfo={auditInfo} onReset={handleReset} />
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}

export default SecurityTools;
