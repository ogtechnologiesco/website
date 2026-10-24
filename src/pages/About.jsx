import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';

const VALUES = [
  {
    title: 'Innovation',
    description: 'We strive to be at the forefront of the IT industry by constantly seeking new and better ways to serve our clients.',
  },
  {
    title: 'Quality',
    description: 'We are committed to providing our clients with the highest-quality services and solutions.',
  },
  {
    title: 'Customer service',
    description: 'We are dedicated to building long-lasting relationships with our clients by providing them with the highest level of service and support.',
  },
  {
    title: 'Professionalism',
    description: 'We conduct ourselves professionally and hold ourselves to the highest ethical standards.',
  },
  {
    title: 'Continuous improvement',
    description: 'We are committed to continuous improvement in everything we do, and we strive to be better every day.',
  },
  {
    title: 'Teamwork',
    description: 'We believe in the power of teamwork and strive to create a positive and collaborative working environment.',
  },
];

const EXPERTISE = [
  {
    title: 'Payment infrastructure',
    description: 'ISO 20022 migration, SEPA file pipelines, MT940 to camt.053 conversion, ERP-to-bank connectivity, and stablecoin settlement on Stellar.',
  },
  {
    title: 'DLT & blockchain',
    description: 'Smart contracts, decentralized applications, and regulatory alignment for Web3 initiatives — including MiCA and DORA readiness.',
  },
  {
    title: 'Digital identity',
    description: 'Verifiable credentials, DIDs, EBSI trust chains, and EUDI Wallet readiness under eIDAS 2.0.',
  },
  {
    title: 'International standards',
    description: 'ISO, CEN, and EBSI standards expertise — from ISO 27001 and ISO 9001 management systems to healthcare interoperability with HL7 v2 and FHIR.',
  },
];

function About() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>About Us - OG Technologies EU | IT Consulting in Vienna</title>
        <meta name="description" content="OG Technologies EU is a Vienna-based IT consultancy specializing in payment infrastructure, DLT, digital identity, and international standards. Learn about our mission, values, and expertise." />
        <meta name="keywords" content="about OG Technologies EU, IT consulting Vienna, blockchain consulting, payment infrastructure, digital identity, ISO standards, Web3" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/about/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/about/" />
        <meta property="og:title" content="About Us - OG Technologies EU | IT Consulting in Vienna" />
        <meta property="og:description" content="Vienna-based IT consultancy specializing in payment infrastructure, DLT, digital identity, and international standards." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/about/" />
        <meta name="twitter:title" content="About Us - OG Technologies EU | IT Consulting in Vienna" />
        <meta name="twitter:description" content="Vienna-based IT consultancy specializing in payment infrastructure, DLT, digital identity, and international standards." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
      </Helmet>

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1 mb-4" data-aos="fade-up">About OG Technologies EU</h1>
                <p className="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">
                  We provide technical expertise at the intersection of payment infrastructure, DLT, digital identity and international standards — from our base in Vienna, Austria, to clients worldwide.
                </p>
              </div>

              {/* Who we are */}
              <div className="max-w-3xl mx-auto pb-12 md:pb-16" data-aos="fade-up">
                <h2 className="h3 mb-4">Who we are</h2>
                <p className="text-lg text-gray-400 mb-4">
                  OG Technologies EU is an IT consulting and software development company headquartered in Vienna, Austria. We are a member of the Austrian Chamber of Commerce (WKO), Vienna specialist group for management consulting, accounting, and information technology.
                </p>
                <p className="text-lg text-gray-400">
                  We help enterprises and startups design, build, and ship technology that meets real regulatory and interoperability requirements — combining hands-on engineering with deep knowledge of the standards that govern payments, identity, security, and data exchange.
                </p>
              </div>

              {/* What we do */}
              <div className="pb-12 md:pb-16">
                <div className="max-w-3xl mx-auto text-center pb-12">
                  <h2 className="h2 mb-4" data-aos="fade-up">What we do</h2>
                </div>
                <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 md:max-w-2xl lg:max-w-none">
                  {EXPERTISE.map((item, i) => (
                    <div key={item.title} className="bg-gray-800 rounded-lg p-6" data-aos="fade-up" data-aos-delay={i * 100}>
                      <h3 className="h4 mb-2">{item.title}</h3>
                      <p className="text-lg text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission */}
              <div className="max-w-3xl mx-auto pb-12 md:pb-16" data-aos="fade-up">
                <h2 className="h3 mb-4">Our mission</h2>
                <p className="text-lg text-gray-400">
                  Our mission at OG Technologies EU is to provide our clients with the highest-quality IT consulting services and solutions. We are dedicated to helping businesses achieve their goals by providing them with customized solutions tailored to their specific needs — using the latest technology and tools, staying up to date with industry trends, and exceeding expectations with our level of service and support.
                </p>
              </div>

              {/* Values */}
              <div className="pb-12 md:pb-16">
                <div className="max-w-3xl mx-auto text-center pb-12">
                  <h2 className="h2 mb-4" data-aos="fade-up">Our values</h2>
                </div>
                <div className="max-w-sm mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none">
                  {VALUES.map((item, i) => (
                    <div key={item.title} className="text-center" data-aos="fade-up" data-aos-delay={i * 100}>
                      <h3 className="h4 mb-2 text-purple-400">{item.title}</h3>
                      <p className="text-lg text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beyond consulting */}
              <div className="max-w-3xl mx-auto pb-12 md:pb-16" data-aos="fade-up">
                <h2 className="h3 mb-4">Beyond consulting</h2>
                <p className="text-lg text-gray-400 mb-4">
                  Alongside client work, we build our own products and ventures — including the <Link to="/products/" className="text-purple-400 hover:text-purple-300">OG CRM &amp; Ticketing platform</Link>, grant-funded projects like <Link to="/portfolio/edunode/" className="text-purple-400 hover:text-purple-300">EduNode</Link> and <Link to="/portfolio/mozart-pay/" className="text-purple-400 hover:text-purple-300">Mozart Pay</Link>, and the open-source <Link to="/portfolio/stellar-go-cli/" className="text-purple-400 hover:text-purple-300">Stellar Go CLI</Link>.
                </p>
                <p className="text-lg text-gray-400">
                  We also maintain a growing library of <Link to="/tools/" className="text-purple-400 hover:text-purple-300">free browser-based tools</Link>, publish <Link to="/insights/" className="text-purple-400 hover:text-purple-300">technical articles</Link>, and support the ecosystem through our <Link to="/ventures/" className="text-purple-400 hover:text-purple-300">ventures</Link> and <Link to="/partners/" className="text-purple-400 hover:text-purple-300">partner program</Link>.
                </p>
              </div>

              {/* CTA */}
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="h3 mb-4" data-aos="fade-up">Work with us</h2>
                <p className="text-lg text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="100">
                  Have a project in mind? Tell us about it and we'll get back to you.
                </p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="fade-up" data-aos-delay="200">
                  <Link to="/quote/" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0">
                    Request a Quote
                  </Link>
                  <a href="mailto:hi@ogtechnologies.co" className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4">
                    Contact Us
                  </a>
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

export default About;
