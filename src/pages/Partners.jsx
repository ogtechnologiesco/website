import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { publicApiPost } from '../services/api';

const partnerTypes = [
  {
    title: 'Compliance & Legal Advisors',
    description: 'Auditors, law firms, and consultants whose clients need technical delivery for DORA, ISO 27001, ISO 42001, or ISO 20022 — work you advise on but don\'t implement.',
  },
  {
    title: 'MSPs & IT Service Providers',
    description: 'Managed service providers and IT firms that own SME relationships and regularly hit blockchain, security, or compliance requirements outside their scope.',
  },
  {
    title: 'Independent Consultants & Fractional Executives',
    description: 'Fractional CTOs, CISOs, and senior advisors who shape technology decisions and want a reliable delivery partner behind their recommendations.',
  },
  {
    title: 'Agencies & System Integrators',
    description: 'Web, marketing, and integration agencies that need a specialist engineering team for blockchain, payments, or standards-heavy projects.',
  },
];

const partnershipModels = [
  {
    name: 'Referral Partner',
    terms: '10–15% of first contract value',
    description: 'You make the introduction, we handle sales and delivery. Commission paid on cash collected — no caps on deal size.',
  },
  {
    name: 'Reseller',
    terms: '20–30% margin',
    description: 'You own the client relationship and invoice. We deliver under your brand or alongside you, whichever your clients prefer.',
  },
  {
    name: 'Co-Delivery',
    terms: 'Scoped per engagement',
    description: 'Joint delivery on larger contracts — e.g. you run the audit or advisory workstream, we build and implement the technical solution.',
  },
];

const partnerBenefits = [
  'Registered-deal protection: leads you register are reserved to you for 90 days',
  'Commission paid on cash collected — stated plainly in a written agreement',
  'Partner kit: one-pager, email templates, case studies, and pricing bands you can forward',
  'Co-branded use of our free assessment tools (ISO 27001, ISO 42001, ISO 9001, DORA, blockchain compliance) as lead magnets for your clients',
  'Pipeline visibility: referred deals are tracked with partner attribution in our CRM',
  'Non-circumvention in both directions — your client stays your client',
];

const steps = [
  { step: '1', title: 'Apply', description: 'Tell us who you are and who you serve. We onboard partners who already sit in front of our buyers.' },
  { step: '2', title: 'Register a lead', description: 'Send us the company name and context. We confirm registration in writing — your deal is protected for 90 days.' },
  { step: '3', title: 'We close & deliver', description: 'We run discovery, scoping, and delivery with you in the loop. You stay as involved as the model requires.' },
  { step: '4', title: 'Get paid', description: 'Commission is paid on cash collected from the client, per the partnership agreement.' },
];

function Partners() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    website: '',
    partnerType: 'Referral Partner',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await publicApiPost('/api/quote', {
        name: formData.name,
        email: formData.email,
        message: `Partner Program Application\n\nCompany: ${formData.company}\nWebsite: ${formData.website || '-'}\nPartnership model: ${formData.partnerType}\n\n${formData.message}`,
      });
      setSubmitSuccess(true);
      setFormData({ name: '', company: '', email: '', website: '', partnerType: 'Referral Partner', message: '' });
    } catch (error) {
      console.error('Error submitting partner application:', error);
      setSubmitError('Something went wrong submitting your application. Please email us at hi@ogtechnologies.co instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none';

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Partner Program - Revenue Share Partnerships | OG Technologies EU</title>
        <meta name="description" content="Earn 10-30% revenue share referring enterprise IT, blockchain, and compliance contracts to OG Technologies EU. Referral, reseller, and co-delivery partnership models for consultants, MSPs, and agencies." />
        <meta name="keywords" content="partner program, revenue share, referral partnership, IT consulting partner, reseller program, blockchain consulting partner, compliance referral, channel partner" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/partners/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/partners/" />
        <meta property="og:title" content="Partner Program - Revenue Share Partnerships | OG Technologies EU" />
        <meta property="og:description" content="Earn revenue share on high-value IT consulting, blockchain, and compliance contracts. Referral, reseller, and co-delivery models." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/partners/" />
        <meta name="twitter:title" content="Partner Program - Revenue Share Partnerships | OG Technologies EU" />
        <meta name="twitter:description" content="Earn revenue share on high-value IT consulting, blockchain, and compliance contracts. Referral, reseller, and co-delivery models." />
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
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h1 className="h1 mb-4">Partner Program</h1>
                <p className="text-xl text-gray-400 mb-8">
                  You know the clients. We do the technical delivery. Earn revenue share on high-value IT consulting, blockchain, and compliance contracts — with registered-deal protection and a written agreement.
                </p>
                <a href="#apply" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out inline-block">
                  Apply to Partner
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">Who We Partner With</h2>
                <p className="text-xl text-gray-400">
                  The program is built for people already in front of our buyers — not for cold prospecting on our behalf.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {partnerTypes.map((type) => (
                  <div key={type.title} className="bg-gray-800 rounded-lg p-6 border border-gray-700" data-aos="fade-up">
                    <h3 className="h4 mb-2">{type.title}</h3>
                    <p className="text-gray-400">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partnership models */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">Partnership Models</h2>
                <p className="text-xl text-gray-400">
                  Three ways to work together, depending on how involved you want to be. Exact terms are set in the partnership agreement.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {partnershipModels.map((model) => (
                  <div key={model.name} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-500/30" data-aos="fade-up">
                    <h3 className="h4 mb-1">{model.name}</h3>
                    <p className="text-purple-400 font-semibold mb-3">{model.terms}</p>
                    <p className="text-gray-400">{model.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What partners get */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">What You Get</h2>
              </div>
              <div className="max-w-3xl mx-auto">
                <ul className="space-y-4">
                  {partnerBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start" data-aos="fade-up">
                      <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-400 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 mt-6 text-center">
                  Our <Link to="/tools/" className="text-purple-400 hover:text-purple-300">free tools</Link> — including the{' '}
                  <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300">ISO 27001 gap analysis</Link>,{' '}
                  <Link to="/tools/iso-42001-ai-readiness/" className="text-purple-400 hover:text-purple-300">ISO 42001 AI readiness</Link>, and{' '}
                  <Link to="/tools/blockchain-compliance-checker/" className="text-purple-400 hover:text-purple-300">blockchain compliance checker</Link>{' '}
                  — are natural entry points you can offer your clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">How It Works</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {steps.map((item) => (
                  <div key={item.step} className="text-center" data-aos="fade-up">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="h4 mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application form */}
        <section className="relative" id="apply">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">Apply to Partner</h2>
                <p className="text-xl text-gray-400">
                  Tell us about your business and the clients you serve. We review every application personally — or email us directly at{' '}
                  <a href="mailto:hi@ogtechnologies.co" className="text-purple-400 hover:text-purple-300">hi@ogtechnologies.co</a>.
                </p>
              </div>
              <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="partner-name" className="block text-gray-400 text-sm mb-1">Your Name *</label>
                      <input
                        id="partner-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="partner-email" className="block text-gray-400 text-sm mb-1">Email *</label>
                      <input
                        id="partner-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="partner-company" className="block text-gray-400 text-sm mb-1">Company *</label>
                      <input
                        id="partner-company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="partner-website" className="block text-gray-400 text-sm mb-1">Website</label>
                      <input
                        id="partner-website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className={inputClass}
                        placeholder="https://"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="partner-type" className="block text-gray-400 text-sm mb-1">Partnership Model *</label>
                    <select
                      id="partner-type"
                      required
                      value={formData.partnerType}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      className={inputClass}
                    >
                      {partnershipModels.map((model) => (
                        <option key={model.name} value={model.name}>{model.name} — {model.terms}</option>
                      ))}
                      <option value="Not sure yet">Not sure yet — let's discuss</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="partner-message" className="block text-gray-400 text-sm mb-1">Who do you serve, and where do you see the fit? *</label>
                    <textarea
                      id="partner-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder="e.g. We're an audit firm in Germany — our clients keep asking about DORA technical requirements we can't deliver."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white py-3 rounded-md font-semibold transition duration-150 ease-in-out"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                  {submitSuccess && (
                    <p className="text-green-400 text-center">Application received — we'll get back to you shortly.</p>
                  )}
                  {submitError && (
                    <p className="text-red-400 text-center">{submitError}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}

export default Partners;
