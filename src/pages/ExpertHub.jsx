import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { expertsAPI } from '../services/api';
import { EXPERT_PROJECTS } from '../data/expertProjects';

const engagementTypes = [
  {
    name: 'Project Sprint',
    description: 'A scoped piece of work inside a client delivery — a Soroban contract module, an MT940→camt.053 converter, an HL7 interface. Fixed scope, defined deliverables, clear done.',
  },
  {
    name: 'Staff Augmentation',
    description: 'Embed in our delivery team for a longer engagement — part-time or full-time, working directly with our engineers on client projects as one of us.',
  },
  {
    name: 'Specialist Advisory',
    description: 'Bring a niche we don\'t keep in-house — payment scheme rules, certification audit prep, eIDAS/EUDI specifics — on a call-and-review basis.',
  },
];

const skillTracks = [
  {
    title: 'Blockchain & DLT',
    description: 'Stellar, Soroban, Ethereum — smart contracts, tokenization, wallets, verifiable credentials, and the Go tooling around them.',
    tags: ['Rust', 'Soroban', 'Solidity', 'Go'],
  },
  {
    title: 'Payments & Financial Messaging',
    description: 'ISO 20022, SEPA, MT940/camt.053, EBICS — message mapping, migration, and validation for banks and payment platforms.',
    tags: ['ISO 20022', 'SEPA', 'MT940', 'camt.053'],
  },
  {
    title: 'Healthcare Interoperability',
    description: 'HL7 v2 interfaces and FHIR R4 resources — ADT feeds, lab results, profile conformance, and interface-engine plumbing.',
    tags: ['HL7 v2', 'FHIR', 'Mirth', 'IHE profiles'],
  },
  {
    title: 'Security & Compliance',
    description: 'ISO 27001, SOC 2, DORA, ISO 42001 — gap analyses, control mapping, risk assessments, and audit preparation.',
    tags: ['ISO 27001', 'SOC 2', 'DORA', 'ISO 42001'],
  },
  {
    title: 'Frontend Engineering',
    description: 'React 18, Vite, Tailwind, MUI — client dashboards, our public tools, and SEO-aware prerendered apps like this site.',
    tags: ['React', 'Vite', 'Tailwind', 'MUI'],
  },
  {
    title: 'Backend & APIs',
    description: 'Node.js, .NET, Go — REST APIs, payments integration, auth, and the Heroku-hosted services behind our products.',
    tags: ['Node.js', 'Go', 'PostgreSQL', 'Stripe'],
  },
];

const benefits = [
  'Remote-first — work from anywhere with a few hours of EU timezone overlap',
  'Written scope and terms before every engagement — no surprise scope creep',
  'Fast payment on invoice — we pay freelancers the way we expect to be paid',
  'Standards-heavy, portfolio-worthy work: ISO 20022, DORA, HL7/FHIR, Soroban',
  'Paid trial task — you never spec or sample work for free',
  'Your clients stay your clients — non-circumvention in both directions',
];

const steps = [
  { step: '1', title: 'Apply', description: 'Tell us what you\'re great at and link your work. A person — not a keyword filter — reviews every application.' },
  { step: '2', title: 'Intro call', description: '30 minutes on your experience, the projects we run, and mutual fit. A conversation, not a leetcode gauntlet.' },
  { step: '3', title: 'Paid trial task', description: 'A small, scoped piece of real work — paid — so both sides see how collaboration actually feels.' },
  { step: '4', title: 'Get matched', description: 'When a project fits your track, we reach out with scope, terms, and timeline. You always get to say yes or no first.' },
];

const faqs = [
  {
    q: 'Is the Expert Hub the same as a job at OG Technologies?',
    a: 'No — the Hub is for independent freelancers and contractors who join us on specific projects. If you\'re looking for employment, check our careers page instead.',
  },
  {
    q: 'Do I need to be based in the EU?',
    a: 'No. Most work is remote; we ask for a few hours of overlap with European time zones. Individual postings note when a client requires EU-based contractors.',
  },
  {
    q: 'How do rates work?',
    a: 'You state your day or hourly rate in the application. When a project matches, we agree scope and terms in writing before work starts — no unpaid discovery.',
  },
  {
    q: 'What does the paid trial task look like?',
    a: 'A small, real piece of work scoped to a few hours — a parser, a contract module, a control mapping — paid at your rate. It replaces a long interview loop.',
  },
  {
    q: 'Can I apply if no open project matches my skills?',
    a: 'Yes — choose "General application" in the form. Most matches happen when new projects come in, not from the board, so the bench is the point.',
  },
  {
    q: 'Who owns the work I produce?',
    a: 'Engagement deliverables are assigned per the project agreement. Your own tools, libraries, and know-how stay yours — and your existing clients stay your clients.',
  },
];

const seniorityOptions = [
  'Mid (3–5 yrs)',
  'Senior (5–8 yrs)',
  'Lead / Principal (8+ yrs)',
  'Domain specialist (regardless of yrs)',
];

const availabilityOptions = [
  'Immediate',
  'Within 2 weeks',
  'Within a month',
  'Part-time only, ongoing',
];

function ExpertHub() {
  const openProjects = EXPERT_PROJECTS.filter((p) => p.status === 'open');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skillTrack: skillTracks[0].title,
    seniority: seniorityOptions[1],
    project: 'General application',
    openSourceInterest: '',
    portfolioUrl: '',
    linkedinUrl: '',
    availability: availabilityOptions[0],
    timezone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const applyFor = (projectTitle) => {
    setFormData((prev) => ({ ...prev, project: projectTitle }));
    setSubmitSuccess(false);
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await expertsAPI.submitApplication({
        type: 'expert-application',
        name: formData.name,
        email: formData.email,
        skillTrack: formData.skillTrack,
        seniority: formData.seniority,
        project: formData.project,
        openSourceInterest: formData.openSourceInterest || undefined,
        portfolioUrl: formData.portfolioUrl,
        linkedinUrl: formData.linkedinUrl,
        availability: formData.availability,
        timezone: formData.timezone,
        message: formData.openSourceInterest
          ? `Open-source interest: ${formData.openSourceInterest}\n\n${formData.message}`
          : formData.message,
      });
      setSubmitSuccess(true);
      setSubmittedEmail(formData.email);
      setFormData({
        name: '', email: '', skillTrack: skillTracks[0].title, seniority: seniorityOptions[1], openSourceInterest: '',
        project: 'General application', portfolioUrl: '', linkedinUrl: '',
        availability: availabilityOptions[0], timezone: '', message: '',
      });
    } catch (error) {
      console.error('Error submitting expert application:', error);
      setSubmitError('Something went wrong submitting your application. Please email us at hi@ogtechnologies.co instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none';

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Expert Hub - Freelance & Contract Projects | OG Technologies EU</title>
        <meta name="description" content="Join the OG Technologies EU Expert Hub — freelance and contract work for independent developers and consultants on blockchain, payments, compliance, and healthcare IT projects. Browse open projects and apply." />
        <meta name="keywords" content="freelance blockchain developer, contract React developer, ISO 20022 consultant, HL7 FHIR freelance, ISO 27001 consultant, remote developer contracts, freelance network" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/expert-hub/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/expert-hub/" />
        <meta property="og:title" content="Expert Hub - Freelance & Contract Projects | OG Technologies EU" />
        <meta property="og:description" content="Freelance and contract work for independent developers and consultants — blockchain, payments, compliance, and healthcare IT. Paid trial, written terms, remote-first." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/expert-hub/" />
        <meta name="twitter:title" content="Expert Hub - Freelance & Contract Projects | OG Technologies EU" />
        <meta name="twitter:description" content="Freelance and contract work for independent developers and consultants — blockchain, payments, compliance, and healthcare IT." />
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
                <h1 className="h1 mb-4">Expert Hub — Freelance &amp; Contract Projects</h1>
                <p className="text-xl text-gray-400 mb-8">
                  Real projects for independent developers and consultants. Join our bench of vetted experts and get matched to blockchain, payments, compliance, and healthcare IT work — with written terms, a paid trial, and fast invoicing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#openings" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out inline-block">
                    Browse Open Projects
                  </a>
                  <a href="#apply" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out inline-block border border-gray-600">
                    Join the Hub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open projects board */}
        <section className="relative" id="openings">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">Open Projects</h2>
                <p className="text-xl text-gray-400">
                  {openProjects.length > 0
                    ? 'Engagements we need expert help with right now. Apply to a specific posting — or a general application puts you on the bench for what comes next.'
                    : 'No open postings right now — a general application puts you on the bench for what comes next.'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {openProjects.map((project) => (
                  <div key={project.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col" data-aos="fade-up">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="h4">{project.title}</h3>
                      <span className="text-xs font-semibold text-purple-300 bg-purple-900/40 border border-purple-500/30 rounded-full px-3 py-1 whitespace-nowrap shrink-0">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{project.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill) => (
                        <span key={skill} className="text-xs text-gray-300 bg-gray-700 rounded-full px-2.5 py-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 space-y-1 mb-5">
                      <p><span className="text-gray-400">Duration:</span> {project.duration} · <span className="text-gray-400">Commitment:</span> {project.commitment}</p>
                      <p><span className="text-gray-400">Start:</span> {project.start} · <span className="text-gray-400">Location:</span> {project.location}</p>
                    </div>
                    <button
                      onClick={() => applyFor(project.title)}
                      className="mt-auto bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-md font-semibold transition duration-150 ease-in-out self-start"
                    >
                      Apply for this project
                    </button>
                  </div>
                ))}
                {/* General application card */}
                <div className={`bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-500/30 flex flex-col${openProjects.length === 0 ? ' md:col-span-2 md:max-w-2xl md:mx-auto w-full' : ''}`} data-aos="fade-up">
                  <h3 className="h4 mb-2">Don't see your thing?</h3>
                  <p className="text-gray-400 mb-4">
                    The board shows what we need today — the bench is how most matches happen. If you're strong in any of our tracks, send a general application and we'll reach out when a project fits.
                  </p>
                  <button
                    onClick={() => applyFor('General application')}
                    className="mt-auto bg-gray-700 hover:bg-gray-600 text-white px-5 py-2.5 rounded-md font-semibold transition duration-150 ease-in-out self-start border border-gray-600"
                  >
                    Apply generally
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement types */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">How Engagements Work</h2>
                <p className="text-xl text-gray-400">
                  Three shapes of collaboration, depending on the project and how involved you want to be. Exact terms are set in writing per engagement.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {engagementTypes.map((type) => (
                  <div key={type.name} className="bg-gray-800 rounded-lg p-6 border border-gray-700" data-aos="fade-up">
                    <h3 className="h4 mb-2">{type.name}</h3>
                    <p className="text-gray-400">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skill tracks */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">Skill Tracks</h2>
                <p className="text-xl text-gray-400">
                  The work we actually deliver — if your expertise lands in one of these, there will be projects for you.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillTracks.map((track) => (
                  <div key={track.title} className="bg-gray-800 rounded-lg p-6 border border-gray-700" data-aos="fade-up">
                    <h3 className="h4 mb-2">{track.title}</h3>
                    <p className="text-gray-400 mb-4">{track.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {track.tags.map((tag) => (
                        <span key={tag} className="text-xs text-purple-300 bg-purple-900/30 border border-purple-500/30 rounded-full px-2.5 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What experts get */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">What You Get</h2>
              </div>
              <div className="max-w-3xl mx-auto">
                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start" data-aos="fade-up">
                      <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-400 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 mt-6 text-center">
                  Looking for full-time employment instead? Check our{' '}
                  <Link to="/careers/" className="text-purple-400 hover:text-purple-300">careers page</Link>.
                  Want to refer work rather than do it? Our{' '}
                  <Link to="/partners/" className="text-purple-400 hover:text-purple-300">partner program</Link>{' '}
                  pays revenue share.
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
                <h2 className="h2 mb-4">Joining the Hub</h2>
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

        {/* Expert Network */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">The Expert Network</h2>
                <p className="text-xl text-gray-400">
                  Registering takes two minutes — and it unlocks the private network for Hub experts.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700" data-aos="fade-up">
                  <h3 className="h4 mb-2">Connect with peers</h3>
                  <p className="text-gray-400">Send connection requests to other vetted experts — find the Soroban dev, the FHIR integrator, or the ISO auditor you'll need on the next engagement.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700" data-aos="fade-up">
                  <h3 className="h4 mb-2">Direct messaging</h3>
                  <p className="text-gray-400">Talk shop, share rates context, or assemble a team — conversations stay inside the network, no cold-emailing strangers.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700" data-aos="fade-up">
                  <h3 className="h4 mb-2">A feed that matters</h3>
                  <p className="text-gray-400">Post wins, questions, and availability — and see what your connections and suggested experts are working on, ranked by relevance.</p>
                </div>
              </div>
              <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/30 to-blue-900/20 rounded-lg p-6 border border-purple-500/30 text-center" data-aos="fade-up">
                <p className="text-gray-300 mb-4">
                  <span className="font-semibold text-white">How it works:</span> submit an application below, then create a free account with the same email — your network profile appears automatically, and you'll see your application status live.
                </p>
                <a href="#apply" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out">
                  Apply &amp; join the network
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h2 className="h2 mb-4">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.q} className="bg-gray-800 rounded-lg p-6 border border-gray-700" data-aos="fade-up">
                    <h3 className="h4 mb-2 text-lg">{faq.q}</h3>
                    <p className="text-gray-400">{faq.a}</p>
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
                <h2 className="h2 mb-4">Apply to the Expert Hub</h2>
                <p className="text-xl text-gray-400">
                  Tell us what you're great at and link your work. We review every application personally — or email us directly at{' '}
                  <a href="mailto:hi@ogtechnologies.co" className="text-purple-400 hover:text-purple-300">hi@ogtechnologies.co</a>.
                </p>
              </div>
              <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-4">
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-md p-4">
                    <p className="text-sm text-gray-400">
                      <span className="text-purple-300 font-semibold">Stand out:</span> the strongest applications point at real work — and the easiest way to show it is to build on our own products and ventures. Ship a small feature, fix an issue, or build an example on the{' '}
                      <Link to="/products/" className="text-purple-400 hover:text-purple-300">OG CRM &amp; Ticketing platform</Link>, our grant-funded{' '}
                      <Link to="/portfolio/edunode/" className="text-purple-400 hover:text-purple-300">EduNode</Link> or{' '}
                      <Link to="/portfolio/mozart-pay/" className="text-purple-400 hover:text-purple-300">Mozart Pay</Link> projects, or the open-source{' '}
                      <Link to="/portfolio/stellar-go-cli/" className="text-purple-400 hover:text-purple-300">Stellar Go CLI</Link>
                      {' '}— then link it in your application below.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expert-name" className="block text-gray-400 text-sm mb-1">Your Name *</label>
                      <input
                        id="expert-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="expert-email" className="block text-gray-400 text-sm mb-1">Email *</label>
                      <input
                        id="expert-email"
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
                      <label htmlFor="expert-track" className="block text-gray-400 text-sm mb-1">Primary Skill Track *</label>
                      <select
                        id="expert-track"
                        required
                        value={formData.skillTrack}
                        onChange={(e) => setFormData({ ...formData, skillTrack: e.target.value })}
                        className={inputClass}
                      >
                        {skillTracks.map((track) => (
                          <option key={track.title} value={track.title}>{track.title}</option>
                        ))}
                        <option value="Something else">Something else — see my message</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="expert-seniority" className="block text-gray-400 text-sm mb-1">Seniority *</label>
                      <select
                        id="expert-seniority"
                        required
                        value={formData.seniority}
                        onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                        className={inputClass}
                      >
                        {seniorityOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="expert-project" className="block text-gray-400 text-sm mb-1">Project of Interest *</label>
                    <select
                      id="expert-project"
                      required
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className={inputClass}
                    >
                      <option value="General application">General application — join the bench</option>
                      <option value="Open-source products & ventures">Open-source products &amp; ventures — contribute or build</option>
                      {openProjects.map((project) => (
                        <option key={project.id} value={project.title}>{project.title}</option>
                      ))}
                    </select>
                    {formData.project === 'Open-source products & ventures' && (
                      <div className="mt-3">
                        <label htmlFor="expert-oss" className="block text-gray-400 text-sm mb-1">Which product, or what would you build?</label>
                        <select
                          id="expert-oss"
                          required
                          value={formData.openSourceInterest}
                          onChange={(e) => setFormData({ ...formData, openSourceInterest: e.target.value })}
                          className={inputClass}
                        >
                          <option value="" disabled>Choose one…</option>
                          <option value="OG CRM & Ticketing platform">OG CRM &amp; Ticketing platform</option>
                          <option value="EduNode (Stellar education platform)">EduNode — Stellar education platform</option>
                          <option value="Mozart Pay (Stellar payments)">Mozart Pay — Stellar payments</option>
                          <option value="Stellar Go CLI (open source)">Stellar Go CLI — open source</option>
                          <option value="A new product or venture — see my message">A new product or venture — see my message</option>
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expert-portfolio" className="block text-gray-400 text-sm mb-1">Portfolio / GitHub *</label>
                      <input
                        id="expert-portfolio"
                        type="url"
                        required
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        className={inputClass}
                        placeholder="https://github.com/you"
                      />
                    </div>
                    <div>
                      <label htmlFor="expert-linkedin" className="block text-gray-400 text-sm mb-1">LinkedIn</label>
                      <input
                        id="expert-linkedin"
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                        className={inputClass}
                        placeholder="https://linkedin.com/in/you"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expert-availability" className="block text-gray-400 text-sm mb-1">Availability *</label>
                      <select
                        id="expert-availability"
                        required
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className={inputClass}
                      >
                        {availabilityOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="expert-timezone" className="block text-gray-400 text-sm mb-1">Timezone *</label>
                      <input
                        id="expert-timezone"
                        type="text"
                        required
                        value={formData.timezone}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        className={inputClass}
                        placeholder="e.g. CET (UTC+1)"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="expert-message" className="block text-gray-400 text-sm mb-1">What are you great at, and what are your rate expectations? *</label>
                    <textarea
                      id="expert-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder="e.g. I've built three Soroban contracts in production and done MT integrations for two banks. Day rate around €X."
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
                    <div className="bg-green-900/20 border border-green-600/40 rounded-md p-4 space-y-3">
                      <p className="text-green-400 text-center">Application received — if a project fits, we'll reach out about an intro call.</p>
                      <p className="text-sm text-gray-400 text-center">
                        Want to track your application?{' '}
                        <Link
                          to={`/signup/?email=${encodeURIComponent(submittedEmail)}`}
                          className="text-purple-400 hover:text-purple-300 underline font-medium"
                        >
                          Create a free account
                        </Link>{' '}
                        — your email is already filled in.
                      </p>
                    </div>
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

export default ExpertHub;
