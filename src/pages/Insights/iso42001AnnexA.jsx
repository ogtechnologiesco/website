import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-iso42001-annexa.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const controlGroups = [
  {
    domain: 'A.2 — Policies related to AI',
    count: 3,
    controls: [
      ['A.2.2', 'AI policy', 'Establish, document, and communicate a policy governing AI development and use.'],
      ['A.2.3', 'Alignment with other organisational policies', 'Align the AI policy with existing policies — security, data protection, ethics.'],
      ['A.2.4', 'Review of the AI policy', 'Review the AI policy at planned intervals and when circumstances change.'],
    ],
  },
  {
    domain: 'A.3 — Internal organisation',
    count: 2,
    controls: [
      ['A.3.2', 'AI roles and responsibilities', 'Define and allocate AI-related roles, responsibilities, and accountability.'],
      ['A.3.3', 'Reporting of concerns', 'Provide a channel for reporting concerns about AI systems without fear of reprisal.'],
    ],
  },
  {
    domain: 'A.4 — Resources for AI systems',
    count: 5,
    controls: [
      ['A.4.2', 'Resource documentation', 'Document the resources AI systems depend on across their life cycle.'],
      ['A.4.3', 'Data resources', 'Identify and document data resources used by AI systems.'],
      ['A.4.4', 'Tooling resources', 'Manage and document the tools used to develop and operate AI systems.'],
      ['A.4.5', 'System and computing resources', 'Document the systems and computing infrastructure AI systems run on.'],
      ['A.4.6', 'Human resources', 'Ensure people working on AI have documented competence, roles, and awareness.'],
    ],
  },
  {
    domain: 'A.5 — Assessing impacts of AI systems',
    count: 4,
    controls: [
      ['A.5.2', 'AI system impact assessment process', 'Define and apply a process to assess impacts before and during the AI life cycle.'],
      ['A.5.3', 'Documentation of AI system impact assessments', 'Document assessment results so decisions and reasoning are auditable.'],
      ['A.5.4', 'Assessing AI system impact on individuals or groups of individuals', 'Evaluate how each AI system affects the people subject to its outputs.'],
      ['A.5.5', 'Assessing societal impacts of AI systems', 'Evaluate broader societal effects — fairness, labour, environment, institutions.'],
    ],
  },
  {
    domain: 'A.6 — AI system life cycle',
    count: 9,
    controls: [
      ['A.6.1.2', 'Objectives for responsible development of AI system', 'Set and document objectives for responsible AI development.'],
      ['A.6.1.3', 'Processes for responsible design and development of AI systems', 'Apply defined responsible-development processes in design and build.'],
      ['A.6.2.2', 'AI system requirements and specification', 'Specify requirements — functional, data, transparency, safety — before building.'],
      ['A.6.2.3', 'Documentation of AI system design and development', 'Record design and development decisions so the system can be understood and audited.'],
      ['A.6.2.4', 'AI system verification and validation', 'Verify the system meets its requirements and validate it does what is intended.'],
      ['A.6.2.5', 'AI system deployment', 'Control how AI systems are released into production and into which environments.'],
      ['A.6.2.6', 'AI system operation and monitoring', 'Operate and monitor systems against defined performance and behaviour expectations.'],
      ['A.6.2.7', 'AI system technical documentation', 'Maintain technical documentation for interested parties across the life cycle.'],
      ['A.6.2.8', 'AI system recording of event logs', 'Keep logs of AI system events sufficient for incident investigation and accountability.'],
    ],
  },
  {
    domain: 'A.7 — Data for AI systems',
    count: 5,
    controls: [
      ['A.7.2', 'Data for development and enhancement of AI system', 'Govern the data used to develop and improve AI systems.'],
      ['A.7.3', 'Acquisition of data', 'Control how training and operational data is sourced — including legality and rights.'],
      ['A.7.4', 'Quality of data for AI systems', 'Define and enforce data quality criteria appropriate to each AI system.'],
      ['A.7.5', 'Data provenance', 'Document where data came from and how it was processed — lineage you can show.'],
      ['A.7.6', 'Data preparation', 'Control data preparation: cleaning, labelling, augmentation, and their effects on bias.'],
    ],
  },
  {
    domain: 'A.8 — Information for interested parties of AI systems',
    count: 4,
    controls: [
      ['A.8.2', 'System documentation and information for users', 'Provide users documentation covering capabilities, limitations, and intended use.'],
      ['A.8.3', 'External reporting', 'Enable external parties to receive or request information about AI systems.'],
      ['A.8.4', 'Communication of incidents', 'Define how AI incidents are communicated to affected and interested parties.'],
      ['A.8.5', 'Information for interested parties', 'Determine and provide the information interested parties need about your AI systems.'],
    ],
  },
  {
    domain: 'A.9 — Use of AI systems',
    count: 3,
    controls: [
      ['A.9.2', 'Processes for responsible use of AI systems', 'Define and follow processes so AI systems are used responsibly.'],
      ['A.9.3', 'Objectives for responsible use of AI system', 'Set measurable objectives for how AI systems should be used.'],
      ['A.9.4', 'Intended use of the AI system', 'Use AI systems only for their intended purposes, with human oversight appropriate to the context.'],
    ],
  },
  {
    domain: 'A.10 — Third-party and customer relationships',
    count: 3,
    controls: [
      ['A.10.2', 'Allocation of responsibilities', 'Allocate responsibilities between your organisation, suppliers, partners, and customers.'],
      ['A.10.3', 'Suppliers', 'Ensure suppliers of AI products, components, or data meet your responsible-AI expectations.'],
      ['A.10.4', 'Customers', 'Manage customer relationships so AI systems are used as intended — including expectations set in agreements.'],
    ],
  },
];

function Iso42001AnnexA() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>ISO/IEC 42001 Annex A Controls: The Complete List of 38 Controls Across 9 Domains | OG Technologies EU</title>
          <meta name="description" content="Every ISO/IEC 42001:2023 Annex A control listed: all 38 controls across the 9 domains (A.2–A.10) with one-line descriptions, plus how to select them in your AI Statement of Applicability." />
          <meta name="keywords" content="ISO 42001 controls, ISO 42001 controls list, ISO 42001 annex a, ISO/IEC 42001 controls, AIMS controls, ISO 42001 requirements, AI management system controls, ISO 42001 statement of applicability" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/iso-42001-annex-a-controls/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/iso-42001-annex-a-controls/" />
          <meta property="og:title" content="ISO/IEC 42001 Annex A Controls: The Complete List of 38 Controls Across 9 Domains" />
          <meta property="og:description" content="All 38 Annex A controls of ISO/IEC 42001:2023, grouped by domain — and how to select them in your Statement of Applicability." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/iso-42001-annex-a-controls/" />
          <meta name="twitter:title" content="ISO/IEC 42001 Annex A Controls: The Complete List of 38 Controls Across 9 Domains" />
          <meta name="twitter:description" content="All 38 Annex A controls of ISO/IEC 42001:2023, grouped by domain — and how to select them in your Statement of Applicability." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">AI Governance · Standards · Compliance</div>
                  <h1 className="h1">ISO/IEC 42001 Annex A Controls: The Complete List of 38 Controls Across 9 Domains</h1>
                  <div className="text-gray-400 text-center mt-4">03/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-2 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="Illustration of humans and robots working together — AI management system controls"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-xs text-gray-500 mb-8">
                    Image: "AI Humans and Robots" by Bovee and Thill, <a href="https://commons.wikimedia.org/wiki/File:AI_Humans_and_Robots.jpg" className="underline hover:text-gray-400" target="_blank" rel="noopener noreferrer">CC BY 2.0</a>
                  </p>

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      <strong>Annex A of ISO/IEC 42001:2023</strong> is the control catalogue of the AI Management System standard: <strong>38 controls grouped into 9 domains</strong> numbered A.2 through A.10. Like its ISO 27001 counterpart, Annex A is a menu — you assess each control against your scope and AI-related risks, apply the ones that fit, and record every applicable-or-excluded decision with justification in your <strong>Statement of Applicability (SoA)</strong>. This page lists every control by reference and title, with a one-line description of what it covers. Implementation detail for each control lives in Annex B of the standard.
                    </p>
                    <p className="mb-8">
                      New to the standard? Start with our <Link to="/insights/iso-42001-ai-management-guide/" className="text-purple-400 hover:text-purple-300 underline">ISO/IEC 42001 practical guide</Link> for the full picture — clauses 4–10, the EU AI Act relationship, and the certification roadmap — then come back here for the control-level detail.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">How the 38 Controls Are Organized</h2>
                    <p className="mb-8">
                      Each domain represents an AI governance objective; the controls beneath it are the mechanisms that achieve it. The numbering looks odd at first — controls start at .2, not .1 — because the .1 sub-clause of each domain holds the <strong>control objective statement</strong> itself. A.6 (AI system life cycle) is the largest domain with 9 controls and is split into two sub-objectives: responsible development (A.6.1) and life-cycle processes (A.6.2).
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>A.2 Policies related to AI</strong> — 3 controls</li>
                      <li><strong>A.3 Internal organisation</strong> — 2 controls</li>
                      <li><strong>A.4 Resources for AI systems</strong> — 5 controls</li>
                      <li><strong>A.5 Assessing impacts of AI systems</strong> — 4 controls</li>
                      <li><strong>A.6 AI system life cycle</strong> — 9 controls</li>
                      <li><strong>A.7 Data for AI systems</strong> — 5 controls</li>
                      <li><strong>A.8 Information for interested parties</strong> — 4 controls</li>
                      <li><strong>A.9 Use of AI systems</strong> — 3 controls</li>
                      <li><strong>A.10 Third-party and customer relationships</strong> — 3 controls</li>
                    </ul>

                    <h2 className="h2 mb-6 text-gray-100">The Complete Controls List</h2>

                    {controlGroups.map((group) => (
                      <div key={group.domain} className="mb-10">
                        <h3 className="h3 mb-3 text-gray-100">{group.domain} <span className="text-purple-400 text-base font-normal">· {group.count} controls</span></h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm border border-gray-700">
                            <thead>
                              <tr className="bg-gray-800">
                                <th className="px-4 py-2 font-semibold text-gray-200 w-20">Ref</th>
                                <th className="px-4 py-2 font-semibold text-gray-200 w-64">Control</th>
                                <th className="px-4 py-2 font-semibold text-gray-200">What it covers</th>
                              </tr>
                            </thead>
                            <tbody>
                              {group.controls.map(([ref, name, desc]) => (
                                <tr key={ref} className="border-t border-gray-700">
                                  <td className="px-4 py-2 text-purple-300 font-mono text-xs align-top">{ref}</td>
                                  <td className="px-4 py-2 text-gray-200 align-top">{name}</td>
                                  <td className="px-4 py-2 text-gray-400 align-top">{desc}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    <h2 className="h2 mb-4 text-gray-100">How to Select Controls: The Statement of Applicability</h2>
                    <p className="mb-8">
                      Annex A is not a checklist where everything is mandatory — it is a reference set you filter through your context. The mechanism is identical to ISO 27001: for each control, your SoA records whether it applies, why, and its implementation status. The drivers of applicability are your AIMS scope (Clause 4.3), your AI risk assessment, and your <strong>AI system impact assessments</strong> — the domain A.5 controls generate the very inputs that determine which other controls you need.
                    </p>
                    <p className="mb-8">
                      Two practical rules: first, <strong>role matters</strong> — an organisation that develops AI systems needs nearly all of A.6 and A.7, while an organisation that merely <em>uses</em> third-party AI concentrates on A.9 (responsible use) and A.10 (third-party relationships). Second, <strong>exclusions need reasons</strong> — "we don't develop models" is a valid justification for skipping data-preparation controls; "too hard" is not. Our <Link to="/insights/iso-27001-statement-of-applicability/" className="text-purple-400 hover:text-purple-300 underline">Statement of Applicability guide</Link> covers the mechanics in depth — the SoA pattern is shared across both standards.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">What Auditors Expect to See</h2>
                    <p className="mb-8">
                      For each applicable control, auditors want evidence the control operates — not just that a policy exists. Typical evidence: the approved AI policy (A.2.2), a RACI or org chart with named AI accountability (A.3.2), the AI system inventory with resource documentation (A.4.2), completed impact assessment reports per in-scope system (A.5.2–A.5.5), V&V records and deployment approvals (A.6.2.4–A.6.2.5), monitoring dashboards and event logs (A.6.2.6–A.6.2.8), data lineage records (A.7.5), user-facing documentation like model or system cards (A.8.2), and supplier assessments for third-party AI (A.10.3). The pattern across all of them: <strong>documented process + records showing it ran</strong>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Baseline Yourself in 10 Minutes</h2>
                    <p className="mb-8">
                      Our free <Link to="/tools/iso-42001-ai-readiness/" className="text-purple-400 hover:text-purple-300 underline">ISO 42001 AI Readiness Assessment</Link> walks you through the clauses and Annex A domains as a structured questionnaire — it produces a maturity score, a prioritized gap list, and a downloadable PDF report, entirely in your browser. It's the fastest way to find out which of these 38 controls you already satisfy and which need work before you ever talk to an auditor.
                    </p>
                    <p className="mb-8">
                      Already running ISO 27001 or ISO 9001? Much of the management-system scaffolding carries over — check your baselines with our <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">ISO 27001 Gap Analysis</Link> and <Link to="/tools/iso-9001-readiness-checker/" className="text-purple-400 hover:text-purple-300 underline">ISO 9001 Readiness Checker</Link>, and see <Link to="/insights/integrated-management-system-iso-9001-27001-42001/" className="text-purple-400 hover:text-purple-300 underline">how the three standards integrate into one management system</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">How many controls are in ISO 42001 Annex A?</h3>
                    <p className="mb-8">
                      38 controls across 9 domains (A.2–A.10). By comparison, ISO/IEC 27001:2022 Annex A has 93 controls in 4 themes. The 42001 set is smaller because it focuses specifically on AI governance; information-security controls are referenced to ISO 27001 rather than duplicated.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Are all 38 Annex A controls mandatory?</h3>
                    <p className="mb-8">
                      No. Annex A is a reference set — you select applicable controls through the Statement of Applicability based on your scope, AI risk assessment, and impact assessments. What is mandatory is the <em>process</em>: you must evaluate all 38 and justify each inclusion or exclusion.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Why do the control numbers start at .2 instead of .1?</h3>
                    <p className="mb-8">
                      The .1 sub-clause in each domain contains the control objective statement — the goal that domain's controls achieve. The numbered controls therefore begin at .2. A.6 additionally splits into two sub-objectives (A.6.1 responsible development, A.6.2 life-cycle processes), each with its own objective statement.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Which controls matter most if we only use third-party AI?</h3>
                    <p className="mb-8">
                      A.9 (use of AI systems — all 3 controls apply) and A.10 (third-party relationships, especially A.10.2 responsibilities and A.10.3 suppliers), plus the cross-cutting governance controls A.2, A.3, and A.5 impact assessment. Development-heavy domains A.6 and A.7 largely shift to your vendors — which is exactly what A.10 exists to manage.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How does Annex A relate to the EU AI Act?</h3>
                    <p className="mb-8">
                      Annex A provides the management-system machinery — impact assessments, documentation, oversight processes — that regulators expect to see, but it doesn't replace AI Act conformity work. Think of it as complementary: the AIMS gives you the operational processes; the AI Act defines the legal obligations for in-scope systems. Many organisations map Annex A controls to AI Act requirements as part of their compliance program.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/iso-42001-annex-a-controls/"
                    categories={['AI Governance', 'Standards', 'Compliance']}
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

export default Iso42001AnnexA;
