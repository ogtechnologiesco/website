import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';

const HALL_OF_FAME = [];

function SecurityHallOfFame() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Security Hall of Fame - OG Technologies EU</title>
        <meta name="description" content="Recognizing security researchers who have responsibly disclosed vulnerabilities to OG Technologies EU. Learn how to report security issues." />
        <meta name="keywords" content="security hall of fame, responsible disclosure, vulnerability reporting, security researchers, bug bounty" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/security-hall-of-fame/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/security-hall-of-fame/" />
        <meta property="og:title" content="Security Hall of Fame - OG Technologies EU" />
        <meta property="og:description" content="Recognizing security researchers who responsibly disclose vulnerabilities to OG Technologies EU." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/security-hall-of-fame/" />
        <meta name="twitter:title" content="Security Hall of Fame - OG Technologies EU" />
        <meta name="twitter:description" content="Recognizing security researchers who responsibly disclose vulnerabilities to OG Technologies EU." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Security Hall of Fame',
            url: 'https://www.ogtechnologies.co/security-hall-of-fame/',
            description: 'Recognizing security researchers who have responsibly disclosed vulnerabilities to OG Technologies EU.',
            creator: {
              '@type': 'Organization',
              name: 'OG Technologies EU',
              url: 'https://www.ogtechnologies.co/',
            },
          })}
        </script>
      </Helmet>

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Security Hall of Fame</h1>
                <p className="text-xl text-gray-400 mt-4">
                  We thank the security researchers who help keep OG Technologies EU
                  and our users safe by responsibly disclosing vulnerabilities.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">

                {/* Honorees */}
                <div className="mb-12" data-aos="fade-up">
                  <h2 className="h4 mb-4">Honorees</h2>
                  {HALL_OF_FAME.length === 0 ? (
                    <div className="p-6 rounded-lg border border-gray-700 bg-gray-800/50 text-center">
                      <p className="text-gray-400">
                        No entries yet — be the first. Researchers who report a valid,
                        previously unknown vulnerability may be listed here with their
                        permission.
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {HALL_OF_FAME.map((entry) => (
                        <li key={entry.name} className="text-gray-300">
                          {entry.name} — {entry.finding} ({entry.date})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* How to report */}
                <div className="mb-12" data-aos="fade-up" data-aos-delay="100">
                  <h2 className="h4 mb-4">Reporting a Vulnerability</h2>
                  <p className="text-gray-400 mb-3">
                    If you believe you have found a security vulnerability in our
                    website or services, please report it to{' '}
                    <a href="mailto:hi@ogtechnologies.co" className="text-purple-400 hover:text-purple-300">
                      hi@ogtechnologies.co
                    </a>
                    {' '}with a description of the issue, steps to reproduce, and the
                    affected URL or component.
                  </p>
                  <p className="text-gray-400">
                    Our full disclosure policy is published at{' '}
                    <a href="/.well-known/security.txt" className="text-purple-400 hover:text-purple-300">
                      /.well-known/security.txt
                    </a>.
                  </p>
                </div>

                {/* Guidelines */}
                <div data-aos="fade-up" data-aos-delay="200">
                  <h2 className="h4 mb-4">Responsible Disclosure Guidelines</h2>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Give us reasonable time to investigate and fix the issue before any public disclosure.</li>
                    <li>Do not access, modify, or exfiltrate user data beyond what is necessary to demonstrate the vulnerability.</li>
                    <li>Do not perform denial-of-service attacks or degrade service availability.</li>
                    <li>Do not use social engineering or phishing against our staff or users.</li>
                    <li>Act in good faith — we will not pursue legal action against researchers who follow these guidelines.</li>
                  </ul>
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

export default SecurityHallOfFame;
