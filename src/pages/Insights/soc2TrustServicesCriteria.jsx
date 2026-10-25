import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-soc2-tsc.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const controlGroups = [
  {
    domain: 'CC1 — Common Criteria: Control Environment',
    count: 5,
    controls: [
      ['CC1.1', 'Integrity and ethical values', 'Leadership demonstrates commitment to integrity and ethical values — tone at the top that anchors every other control.'],
      ['CC1.2', 'Board independence and oversight', 'The board (or equivalent) exercises independent oversight of internal control development and performance.'],
      ['CC1.3', 'Structures and responsibilities', 'Management establishes structures, reporting lines, authorities, and responsibilities aligned to objectives.'],
      ['CC1.4', 'Commitment to competence', 'Hiring, onboarding, training, and evaluation practices ensure people are competent for their security-relevant roles.'],
      ['CC1.5', 'Accountability', 'Personnel are held accountable for internal control responsibilities through performance measures and enforcement.'],
    ],
  },
  {
    domain: 'CC2 — Common Criteria: Communication and Information',
    count: 3,
    controls: [
      ['CC2.1', 'Relevant quality information', 'The entity obtains or generates relevant, quality information to support internal control functioning.'],
      ['CC2.2', 'Internal communication', 'Objectives, responsibilities, and control information are communicated internally so personnel can perform their roles.'],
      ['CC2.3', 'External communication', 'Relevant matters — commitments, incidents, requirements — are communicated to external parties including customers and vendors.'],
    ],
  },
  {
    domain: 'CC3 — Common Criteria: Risk Assessment',
    count: 4,
    controls: [
      ['CC3.1', 'Objectives and risk identification', 'Objectives are specified clearly enough to identify and assess risks relating to them.'],
      ['CC3.2', 'Risk analysis and response', 'Risks are analyzed for likelihood and impact, and a basis for risk response is determined.'],
      ['CC3.3', 'Fraud risk', 'The potential for fraud — including insider misuse and reporting manipulation — is assessed explicitly.'],
      ['CC3.4', 'Significant change', 'Risks arising from significant changes (new products, infrastructure, acquisitions, reorganizations) are identified and assessed.'],
    ],
  },
  {
    domain: 'CC4 — Common Criteria: Monitoring Activities',
    count: 2,
    controls: [
      ['CC4.1', 'Ongoing and separate evaluations', 'Controls are evaluated through ongoing monitoring, periodic self-assessments, or internal audits to confirm they keep working.'],
      ['CC4.2', 'Deficiency communication', 'Control deficiencies are evaluated and communicated to the parties responsible for corrective action — including management and the board.'],
    ],
  },
  {
    domain: 'CC5 — Common Criteria: Control Activities',
    count: 3,
    controls: [
      ['CC5.1', 'Control selection and deployment', 'Control activities are selected and deployed to mitigate risks to acceptable levels.'],
      ['CC5.2', 'Technology general controls', 'General controls over technology — infrastructure, security management, acquisition/development/maintenance — support the achievement of objectives.'],
      ['CC5.3', 'Policies and procedures', 'Control activities are deployed through policies that establish expectations and procedures that put them into action.'],
    ],
  },
  {
    domain: 'CC6 — Common Criteria: Logical and Physical Access',
    count: 8,
    controls: [
      ['CC6.1', 'Logical access infrastructure', 'Logical access security software, infrastructure, and architectures protect information assets from unauthorized access.'],
      ['CC6.2', 'User registration and authorization', 'New users are registered and authorized before credentials are issued — the joiner side of access lifecycle.'],
      ['CC6.3', 'Access modification and removal', 'Access is modified or removed appropriately on role change, termination, or when no longer required — with periodic reviews.'],
      ['CC6.4', 'Physical access', 'Physical access to facilities housing the system is restricted to authorized personnel (directly or via your datacenter/cloud provider).'],
      ['CC6.5', 'Protection against removal', 'Controls prevent or detect unauthorized removal of confidential information — devices, media, exports.'],
      ['CC6.6', 'Transmission and movement', 'Data transmission and movement is restricted — encryption in transit, approved channels, restricted copy paths.'],
      ['CC6.7', 'Data and media handling', 'Data and media are protected throughout storage, transmission, and disposal per their classification.'],
      ['CC6.8', 'Malicious software prevention', 'Controls prevent or detect unauthorized or malicious software — AV/EDR, allowlisting, and remediation processes.'],
    ],
  },
  {
    domain: 'CC7 — Common Criteria: System Operations',
    count: 5,
    controls: [
      ['CC7.1', 'Configuration and vulnerability detection', 'Configurations and susceptibilities are monitored — vulnerability scanning, baseline drift detection, patch management.'],
      ['CC7.2', 'Anomaly monitoring', 'System components are monitored for anomalies indicative of malicious acts, natural disasters, and errors.'],
      ['CC7.3', 'Security event evaluation', 'Detected events are evaluated to determine whether they are incidents and how to respond.'],
      ['CC7.4', 'Incident response', 'The entity responds to identified security incidents per defined procedures — contain, eradicate, communicate.'],
      ['CC7.5', 'Recovery and improvement', 'Activities to recover from incidents are developed and executed; incidents are reviewed to identify lessons learned.'],
    ],
  },
  {
    domain: 'CC8 — Common Criteria: Change Management',
    count: 1,
    controls: [
      ['CC8.1', 'Authorized change', 'Changes to infrastructure, data, software, and procedures are authorized, designed, developed, configured, documented, tested, approved, and implemented.'],
    ],
  },
  {
    domain: 'CC9 — Common Criteria: Risk Mitigation',
    count: 2,
    controls: [
      ['CC9.1', 'Risk mitigation activities', 'Risk mitigation activities are identified, selected, and developed — mitigation, transfer (e.g., insurance), or formal acceptance.'],
      ['CC9.2', 'Vendor and partner risk', 'Risks from vendors and business partners are assessed and managed — including subservice organizations that appear in your report.'],
    ],
  },
  {
    domain: 'A1 — Availability',
    count: 3,
    controls: [
      ['A1.1', 'Capacity management', 'Current processing capacity is measured and baselined to manage demand and enable availability commitments.'],
      ['A1.2', 'Availability commitments and recovery', 'Environmental protections, backup, and recovery infrastructure/processes support the entity\u2019s availability commitments and recovery objectives.'],
      ['A1.3', 'Recovery testing', 'Recovery plan procedures are tested so restoration actually works when needed — with documented results.'],
    ],
  },
  {
    domain: 'PI1 — Processing Integrity',
    count: 5,
    controls: [
      ['PI1.1', 'Processing procedures', 'Information processing procedures exist so products and services meet objectives — complete, valid, accurate, timely, authorized processing.'],
      ['PI1.2', 'Input completeness and accuracy', 'Inputs are verified for completeness and accuracy before processing — validation, reconciliation, rejection handling.'],
      ['PI1.3', 'Processing controls', 'Processing is controlled for completeness, validity, accuracy, timeliness, and authorization — checkpoints and error handling.'],
      ['PI1.4', 'Output accuracy and distribution', 'Outputs are verified for completeness and accuracy, and distribution is restricted to intended recipients.'],
      ['PI1.5', 'Storage of inputs and outputs', 'Inputs, items in processing, and outputs are stored completely, accurately, and timely — protected for their retention period.'],
    ],
  },
  {
    domain: 'C1 — Confidentiality',
    count: 2,
    controls: [
      ['C1.1', 'Identification and retention', 'Confidential information is identified and maintained, with defined retention and disposal practices for its lifecycle.'],
      ['C1.2', 'Disposal', 'Confidential information is disposed of securely at end of retention — sanitization, destruction, and vendor-held copies.'],
    ],
  },
  {
    domain: 'P — Privacy (aligned to GAPP)',
    count: 9,
    controls: [
      ['P1.0', 'Notice and communication', 'Notice about privacy practices is provided — what personal information is collected, why, and how it is used.'],
      ['P2.0', 'Choice and consent', 'Individuals are offered choices about collection/use, and consent is obtained where required.'],
      ['P3.0', 'Collection', 'Personal information is collected only for the purposes identified in the notice.'],
      ['P4.0', 'Use, retention, and disposal', 'Personal information is used, retained, and disposed of consistent with the notice and commitments.'],
      ['P5.0', 'Access', 'Individuals can access, review, correct, or delete their personal information.'],
      ['P6.0', 'Disclosure to third parties', 'PII is disclosed to third parties only for the purposes identified, with consent where required.'],
      ['P7.0', 'Security for privacy', 'Personal information is protected against unauthorized access — physical and logical.'],
      ['P8.0', 'Quality', 'Personal information is kept accurate, complete, and relevant for its identified purposes.'],
      ['P9.0', 'Monitoring and enforcement', 'Privacy compliance is monitored; complaints and disputes have a defined resolution process.'],
    ],
  },
];

function Soc2TrustServicesCriteria() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>SOC 2 Trust Services Criteria: The Complete List Explained | OG Technologies EU</title>
          <meta name="description" content="All 52 AICPA Trust Services Criteria listed and explained: the 33 Common Criteria (CC1–CC9) required in every SOC 2 report, plus the optional Availability, Processing Integrity, Confidentiality, and Privacy categories — with a free Excel/CSV/PDF scoping checklist download." />
          <meta name="keywords" content="SOC 2 trust services criteria, trust services criteria list, SOC 2 common criteria, CC1-CC9, SOC 2 criteria explained, SOC 2 controls list, SOC 2 requirements, TSP 100, SOC 2 trust services categories, soc 2 trust services criteria excel, soc 2 criteria checklist" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/soc-2-trust-services-criteria/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/soc-2-trust-services-criteria/" />
          <meta property="og:title" content="SOC 2 Trust Services Criteria: The Complete List Explained" />
          <meta property="og:description" content="All 52 Trust Services Criteria: the 33 Common Criteria every SOC 2 report requires, plus the optional Availability, Processing Integrity, Confidentiality, and Privacy categories." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/soc-2-trust-services-criteria/" />
          <meta name="twitter:title" content="SOC 2 Trust Services Criteria: The Complete List Explained" />
          <meta name="twitter:description" content="All 52 Trust Services Criteria: the 33 Common Criteria every SOC 2 report requires, plus the optional Availability, Processing Integrity, Confidentiality, and Privacy categories." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Compliance · Security · Standards</div>
                  <h1 className="h1">SOC 2 Trust Services Criteria: The Complete List Explained</h1>
                  <div className="text-gray-400 text-center mt-4">16/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="SOC 2 Trust Services Criteria — report sheet with checklist and the five trust services categories"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      The <strong>Trust Services Criteria (TSC)</strong> — published by the AICPA in TSP section 100 — are the benchmark every SOC 2 examination is performed against. The 2017 revision (with updated points of focus in 2022) defines <strong>33 Common Criteria</strong> in the CC1–CC9 series plus <strong>19 additional criteria</strong> across four optional categories — Availability (A1), Processing Integrity (PI1), Confidentiality (C1), and Privacy (P series). Every SOC 2 report must cover Security — the Common Criteria — and adds optional categories only when the service commitments or system requirements warrant them.
                    </p>
                    <p className="mb-8">
                      Where does this list fit? Unlike ISO 27001&apos;s Annex A control catalogue, the TSC are <em>criteria</em> — desired outcomes — not prescriptive controls. You design the controls; the auditor evaluates whether they meet the criteria. If you&apos;re deciding between frameworks, see our <Link to="/insights/soc-2-vs-iso-27001/" className="text-purple-400 hover:text-purple-300 underline">SOC 2 vs ISO 27001 comparison</Link>. To score where you stand right now, run the free <Link to="/tools/soc-2-readiness-checker/" className="text-purple-400 hover:text-purple-300 underline">SOC 2 Readiness Checker</Link> — it walks all five categories as a questionnaire and produces a PDF gap report.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">How the Criteria Are Organized</h2>
                    <p className="mb-8">
                      The nine Common Criteria series (CC1–CC9) are built on the COSO internal control framework — control environment, communication, risk assessment, monitoring, and control activities — extended with security-specific series for logical/physical access (CC6), system operations (CC7), change management (CC8), and risk mitigation (CC9). Each criterion in the standard also carries <strong>points of focus</strong>: implementation guidance describing the characteristics auditors expect. Points of focus are not checkboxes — an auditor evaluates whether your controls meet the criterion, not whether you did each point literally.
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Common Criteria (CC1–CC9)</strong> — 33 criteria · always required</li>
                      <li><strong>Availability (A1)</strong> — 3 criteria · add if you make uptime commitments</li>
                      <li><strong>Processing Integrity (PI1)</strong> — 5 criteria · add if you process transactions</li>
                      <li><strong>Confidentiality (C1)</strong> — 2 criteria · add for sensitive business data</li>
                      <li><strong>Privacy (P series)</strong> — 9 criteria · add when handling personal information</li>
                    </ul>

                    <h2 className="h2 mb-6 text-gray-100">The Complete Criteria List</h2>

                    <div className="not-prose bg-gray-800 border border-purple-700/50 rounded-xl p-6 mb-10 text-left">
                      <h3 className="text-lg font-bold text-white mb-2">Download the criteria checklist</h3>
                      <p className="text-sm text-gray-300 mb-4">
                        All 52 Trust Services Criteria as an Excel, CSV, or printable PDF scoping checklist —
                        domain, criterion, and title, with in-scope, implementation status, and evidence columns.
                        Ready for your readiness assessment or GRC tool.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a href="/downloads/soc-2-trust-services-criteria.xlsx" download className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
                          TSC checklist (.xlsx)
                        </a>
                        <a href="/downloads/soc-2-trust-services-criteria.csv" download className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors">
                          TSC checklist (.csv)
                        </a>
                        <a href="/downloads/soc-2-trust-services-criteria.pdf" download className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors">
                          Printable PDF
                        </a>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">Working reference for self-assessment — not a substitute for the AICPA Trust Services Criteria (TSP section 100) or a formal SOC 2 examination.</p>
                    </div>

                    {controlGroups.map((group) => (
                      <div key={group.domain} className="mb-10">
                        <h3 className="h3 mb-3 text-gray-100">{group.domain} <span className="text-purple-400 text-base font-normal">· {group.count} criteria</span></h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm border border-gray-700">
                            <thead>
                              <tr className="bg-gray-800">
                                <th className="px-4 py-2 font-semibold text-gray-200 w-20">Ref</th>
                                <th className="px-4 py-2 font-semibold text-gray-200 w-64">Criterion</th>
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

                    <h2 className="h2 mb-4 text-gray-100">Choosing Your Trust Services Categories</h2>
                    <p className="mb-8">
                      Scoping is the first real decision in a SOC 2 program. Security is non-negotiable. Beyond that, your service commitments drive the categories: contractual uptime SLAs pull in Availability; processing financial transactions or shipping deliverables pulls in Processing Integrity; handling customers&apos; sensitive business data under NDA-like commitments pulls in Confidentiality; and processing personal information pulls in Privacy. Adding categories expands the audit&apos;s scope, evidence requirements, and cost — most SaaS companies start with Security + Availability and add categories as deals require.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">What Auditors Expect to See</h2>
                    <p className="mb-8">
                      For a Type I report, auditors evaluate whether your controls are <em>suitably designed</em> to meet the criteria. For Type II, they must also see evidence the controls <em>operated effectively</em> across the observation window. In practice that means: policies that exist and were approved (CC1–CC5), access review records and deprovisioning tickets (CC6), monitoring dashboards and incident tickets (CC7), change tickets with approvals (CC8), vendor reviews (CC9), and for optional categories the corresponding operational evidence — DR test results (A1.3), reconciliation reports (PI1), disposal logs (C1.2), privacy request records (P5.0). The universal pattern: <strong>a defined process plus records showing it ran during the period</strong>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Baseline Yourself in 10 Minutes</h2>
                    <p className="mb-8">
                      Our free <Link to="/tools/soc-2-readiness-checker/" className="text-purple-400 hover:text-purple-300 underline">SOC 2 Readiness Checker</Link> turns this list into a structured questionnaire — answer per criterion, and it produces a readiness score, a prioritized gap list, and a downloadable PDF report, entirely in your browser. Already hold ISO 27001? Most of the Common Criteria map onto Annex A controls — our <Link to="/insights/iso-27001-annex-a-controls/" className="text-purple-400 hover:text-purple-300 underline">complete Annex A controls list</Link> and <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">ISO 27001 gap analysis</Link> show how much of the SOC 2 groundwork is already done.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">How many Trust Services Criteria are there?</h3>
                    <p className="mb-8">
                      52 in the 2017 TSC: 33 Common Criteria across the CC1–CC9 series, plus 19 additional criteria — 3 Availability, 5 Processing Integrity, 2 Confidentiality, and 9 Privacy. Only the 33 Common Criteria are mandatory for a SOC 2 report; the rest apply only if those categories are in your scope.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Are the Trust Services Criteria the same as controls?</h3>
                    <p className="mb-8">
                      No. Criteria describe desired outcomes; controls are the specific mechanisms you implement to meet them. Two companies can satisfy CC6.1 (logical access) with completely different toolchains. This is the core difference from ISO 27001&apos;s Annex A, which names specific controls — SOC 2 auditors evaluate design against the criteria, not conformance to a fixed list.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Which criteria matter most for a first SOC 2?</h3>
                    <p className="mb-8">
                      Auditors find the most exceptions in CC6 (logical access — MFA coverage, access reviews, deprovisioning), CC7 (monitoring and incident response with actual evidence), and CC8 (change management approval trails). A risk register that actually maps risks to controls (CC3/CC5) is the second most common gap — the criteria assume that linkage exists.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Do the criteria map to ISO 27001 or NIST?</h3>
                    <p className="mb-8">
                      Substantially. The AICPA publishes mapping supplements between the TSC, ISO/IEC 27001 Annex A, NIST CSF, and COBIT. CC1–CC5 map onto ISO 27001&apos;s organizational/management controls, CC6–CC8 onto its technological controls. If you hold ISO 27001, estimates commonly put 60–80% of Common Criteria coverage as already satisfied by a functioning ISMS — the gaps concentrate in monitoring cadence and evidence formatting.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What changed in the 2017 TSC versus the older principles?</h3>
                    <p className="mb-8">
                      The 2017 revision replaced the legacy Trust Services Principles and Criteria with the CC-series structure aligned to the 2013 COSO framework. Each criterion now carries points of focus describing expected characteristics. The 2022 update revised those points of focus (adding cloud, DevOps, and modern SaaS practice examples) without changing the criteria themselves — the CC1–CC9 numbering is unchanged.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/soc-2-trust-services-criteria/"
                    categories={['Compliance', 'Security', 'Standards']}
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

export default Soc2TrustServicesCriteria;
