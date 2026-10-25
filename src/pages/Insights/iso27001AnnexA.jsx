import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-iso27001-annexa.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const controlGroups = [
  {
    domain: 'A.5 — Organizational controls',
    count: 37,
    controls: [
      ['A.5.1', 'Policies for information security', 'Establish and communicate an approved set of information security policies.'],
      ['A.5.2', 'Information security roles and responsibilities', 'Define and assign security roles and responsibilities across the organization.'],
      ['A.5.3', 'Segregation of duties', 'Separate conflicting duties so no single person can abuse a critical process alone.'],
      ['A.5.4', 'Management responsibilities', 'Require management to direct, support, and enforce security within their teams.'],
      ['A.5.5', 'Contact with authorities', 'Maintain contact procedures with regulators, law enforcement, and supervisory bodies.'],
      ['A.5.6', 'Contact with special interest groups', 'Maintain relationships with security forums, CERTs, and professional associations.'],
      ['A.5.7', 'Threat intelligence', 'Collect and use threat intelligence to inform risk decisions and defenses.'],
      ['A.5.8', 'Information security in project management', 'Embed security requirements and risk assessment into project management.'],
      ['A.5.9', 'Inventory of information and other associated assets', 'Maintain a current inventory of information, systems, and supporting assets with owners.'],
      ['A.5.10', 'Acceptable use of information and other associated assets', 'Define and enforce rules for acceptable use of information and assets.'],
      ['A.5.11', 'Return of assets', 'Ensure employees and contractors return all assets when employment or contracts end.'],
      ['A.5.12', 'Classification of information', 'Classify information by sensitivity so protection matches value and risk.'],
      ['A.5.13', 'Labelling of information', 'Label information consistently with its classification — including in exports and copies.'],
      ['A.5.14', 'Information transfer', 'Control information transferred internally and externally, including email and APIs.'],
      ['A.5.15', 'Access control', 'Establish and enforce rules for who and what can access information and systems.'],
      ['A.5.16', 'Identity management', 'Manage the full lifecycle of identities — provisioning, review, and deprovisioning.'],
      ['A.5.17', 'Authentication information', 'Control allocation and management of credentials — passwords, keys, tokens.'],
      ['A.5.18', 'Access rights', 'Grant, review, and revoke access rights aligned with roles and least privilege.'],
      ['A.5.19', 'Information security in supplier relationships', 'Manage security risks from suppliers who can access or process your information.'],
      ['A.5.20', 'Addressing information security within supplier agreements', 'Include security requirements and controls in contracts with suppliers.'],
      ['A.5.21', 'Managing information security in the ICT supply chain', 'Address security risks across the ICT product and service supply chain.'],
      ['A.5.22', 'Monitoring, review and change management of supplier services', 'Monitor supplier security performance and manage changes to services.'],
      ['A.5.23', 'Information security for use of cloud services', 'Define and manage security requirements for acquiring and using cloud services.'],
      ['A.5.24', 'Information security incident management planning and preparation', 'Plan, staff, and prepare incident management before an incident happens.'],
      ['A.5.25', 'Assessment and decision on information security events', 'Assess reported events and decide whether they become declared incidents.'],
      ['A.5.26', 'Response to information security incidents', 'Respond to incidents through defined procedures — contain, eradicate, recover.'],
      ['A.5.27', 'Learning from information security incidents', 'Analyze incidents to identify root causes and improve controls.'],
      ['A.5.28', 'Collection of evidence', 'Collect and preserve evidence in a way that stands up to internal and legal scrutiny.'],
      ['A.5.29', 'Information security during disruption', 'Maintain security during disruptions — incidents are not an excuse to drop controls.'],
      ['A.5.30', 'ICT readiness for business continuity', 'Ensure ICT services can meet continuity requirements during and after disruption.'],
      ['A.5.31', 'Legal, statutory, regulatory and contractual requirements', 'Identify and document the legal and contractual obligations your ISMS must satisfy.'],
      ['A.5.32', 'Intellectual property rights', 'Protect intellectual property rights — yours and third parties\'.'],
      ['A.5.33', 'Protection of records', 'Protect records from loss, destruction, falsification, and unauthorized access.'],
      ['A.5.34', 'Privacy and protection of PII', 'Protect personal data per applicable privacy law — GDPR, CCPA, and equivalents.'],
      ['A.5.35', 'Independent review of information security', 'Have security arrangements independently reviewed — internal audit, external review.'],
      ['A.5.36', 'Compliance with policies, rules and standards for information security', 'Regularly check that operations actually follow the security policies you set.'],
      ['A.5.37', 'Documented operating procedures', 'Document and maintain operating procedures for security-relevant activities.'],
    ],
  },
  {
    domain: 'A.6 — People controls',
    count: 8,
    controls: [
      ['A.6.1', 'Screening', 'Verify candidate backgrounds proportionate to the role before hiring.'],
      ['A.6.2', 'Terms and conditions of employment', 'State security responsibilities in employment contracts and onboarding.'],
      ['A.6.3', 'Information security awareness, education and training', 'Provide ongoing security awareness and role-specific training.'],
      ['A.6.4', 'Disciplinary process', 'Define and communicate consequences for security policy violations.'],
      ['A.6.5', 'Responsibilities after termination or change of employment', 'Handle security duties that survive job changes or termination.'],
      ['A.6.6', 'Confidentiality or non-disclosure agreements', 'Use NDAs where needed — signed before access to sensitive information.'],
      ['A.6.7', 'Remote working', 'Protect information accessed, processed, or stored outside the office.'],
      ['A.6.8', 'Information security event reporting', 'Give personnel a clear way to report suspected security events promptly.'],
    ],
  },
  {
    domain: 'A.7 — Physical controls',
    count: 14,
    controls: [
      ['A.7.1', 'Physical security perimeters', 'Define and secure physical perimeters around sensitive areas.'],
      ['A.7.2', 'Physical entry', 'Control who can physically enter secured premises and areas.'],
      ['A.7.3', 'Protecting offices, rooms and facilities', 'Protect rooms and facilities housing information systems.'],
      ['A.7.4', 'Physical security monitoring', 'Monitor premises for unauthorized physical access — alarms, cameras, guards.'],
      ['A.7.5', 'Protecting against physical and environmental threats', 'Protect against fire, flood, power failure, and other physical hazards.'],
      ['A.7.6', 'Working in secure areas', 'Apply extra rules for work inside secure areas.'],
      ['A.7.7', 'Clear desk and clear screen', 'Keep desks and screens clear of sensitive information when unattended.'],
      ['A.7.8', 'Equipment siting and protection', 'Site and protect equipment against physical and environmental threats.'],
      ['A.7.9', 'Security of assets off-premises', 'Protect assets — laptops, phones, media — used outside your premises.'],
      ['A.7.10', 'Storage media', 'Manage storage media through acquisition, use, transport, and disposal.'],
      ['A.7.11', 'Supporting utilities', 'Protect power, cooling, and other utilities information systems depend on.'],
      ['A.7.12', 'Cabling security', 'Protect power and network cabling from interception and damage.'],
      ['A.7.13', 'Equipment maintenance', 'Maintain equipment so it stays secure and available.'],
      ['A.7.14', 'Secure disposal or reuse of equipment', 'Sanitize or destroy equipment before disposal or reuse.'],
    ],
  },
  {
    domain: 'A.8 — Technological controls',
    count: 34,
    controls: [
      ['A.8.1', 'User endpoint devices', 'Protect information on laptops, phones, and other endpoint devices.'],
      ['A.8.2', 'Privileged access rights', 'Restrict and tightly manage administrator and other privileged access.'],
      ['A.8.3', 'Information access restriction', 'Restrict access to information and functions per the access control policy.'],
      ['A.8.4', 'Access to source code', 'Control read and write access to source code and development tools.'],
      ['A.8.5', 'Secure authentication', 'Use strong authentication — including MFA — proportionate to access risk.'],
      ['A.8.6', 'Capacity management', 'Monitor and manage capacity so systems stay performant and available.'],
      ['A.8.7', 'Protection against malware', 'Detect, prevent, and recover from malware across systems.'],
      ['A.8.8', 'Management of technical vulnerabilities', 'Identify, assess, and remediate technical vulnerabilities in a timely way.'],
      ['A.8.9', 'Configuration management', 'Define, apply, and maintain secure baseline configurations for systems.'],
      ['A.8.10', 'Information deletion', 'Delete information when no longer required — beyond simple "delete" where needed.'],
      ['A.8.11', 'Data masking', 'Mask or anonymize sensitive data where full exposure isn\'t necessary.'],
      ['A.8.12', 'Data leakage prevention', 'Detect and prevent unauthorized extraction or exfiltration of information.'],
      ['A.8.13', 'Information backup', 'Back up information per policy and test restoration regularly.'],
      ['A.8.14', 'Redundancy of information processing facilities', 'Provide redundancy so processing keeps working through component failure.'],
      ['A.8.15', 'Logging', 'Record security-relevant events — who, what, when, where — in protected logs.'],
      ['A.8.16', 'Monitoring activities', 'Monitor systems for anomalies, attacks, and policy violations.'],
      ['A.8.17', 'Clock synchronization', 'Synchronize system clocks so logs correlate across the estate.'],
      ['A.8.18', 'Use of privileged utility programs', 'Restrict and monitor powerful utilities that can bypass controls.'],
      ['A.8.19', 'Installation of software on operational systems', 'Control which software can be installed on production systems.'],
      ['A.8.20', 'Network security', 'Protect networks and the information flowing over them.'],
      ['A.8.21', 'Security of network services', 'Define and manage security features and service levels of network services.'],
      ['A.8.22', 'Segregation of networks', 'Segment networks so compromise of one zone can\'t cascade.'],
      ['A.8.23', 'Web filtering', 'Filter access to external websites to reduce exposure to malicious content.'],
      ['A.8.24', 'Use of cryptography', 'Define and apply rules for encryption and key management.'],
      ['A.8.25', 'Secure development life cycle', 'Embed security into the software development life cycle.'],
      ['A.8.26', 'Application security requirements', 'Define and implement security requirements when acquiring or building applications.'],
      ['A.8.27', 'Secure system architecture and engineering principles', 'Apply secure architecture and engineering principles to system design.'],
      ['A.8.28', 'Secure coding', 'Apply secure coding standards to development.'],
      ['A.8.29', 'Security testing in development and acceptance', 'Test security during development and before acceptance into production.'],
      ['A.8.30', 'Outsourced development', 'Manage security when development is outsourced to third parties.'],
      ['A.8.31', 'Separation of development, test and production environments', 'Keep dev, test, and production separated — including their data.'],
      ['A.8.32', 'Change management', 'Control changes to systems so they don\'t introduce vulnerabilities.'],
      ['A.8.33', 'Test information', 'Protect test data — don\'t casually copy production data into test.'],
      ['A.8.34', 'Protection of information systems during audit testing', 'Ensure audit and security testing itself doesn\'t compromise production.'],
    ],
  },
];

function Iso27001AnnexA() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>ISO/IEC 27001 Annex A Controls: The Complete List of 93 Controls (2022) | OG Technologies EU</title>
          <meta name="description" content="All 93 ISO/IEC 27001:2022 Annex A controls listed by reference and title across the 4 themes (Organizational, People, Physical, Technological) — plus how to select them in your Statement of Applicability. Free controls checklist download." />
          <meta name="keywords" content="ISO 27001 annex a controls, ISO 27001 controls list, 93 controls ISO 27001, ISO 27001 annex a, ISO 27001:2022 controls, statement of applicability, ISO 27001 controls checklist, iso 27001 annex a controls list pdf, iso 27001 annex a controls list excel, ISMS controls" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/iso-27001-annex-a-controls/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/iso-27001-annex-a-controls/" />
          <meta property="og:title" content="ISO/IEC 27001 Annex A Controls: The Complete List of 93 Controls (2022)" />
          <meta property="og:description" content="All 93 Annex A controls of ISO/IEC 27001:2022, grouped by theme — and how to select them in your Statement of Applicability." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/iso-27001-annex-a-controls/" />
          <meta name="twitter:title" content="ISO/IEC 27001 Annex A Controls: The Complete List of 93 Controls (2022)" />
          <meta name="twitter:description" content="All 93 Annex A controls of ISO/IEC 27001:2022, grouped by theme — and how to select them in your Statement of Applicability." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Security · Standards · Compliance</div>
                  <h1 className="h1">ISO/IEC 27001 Annex A Controls: The Complete List of 93 Controls</h1>
                  <div className="text-gray-400 text-center mt-4">16/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="ISO/IEC 27001 Annex A — shield and checklist illustration with the four control themes"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      <strong>Annex A of ISO/IEC 27001:2022</strong> is the control catalogue of the information security standard: <strong>93 controls grouped into 4 themes</strong> — Organizational (A.5, 37 controls), People (A.6, 8), Physical (A.7, 14), and Technological (A.8, 34). The 2022 edition restructured the old 114-control, 14-domain model from ISO 27001:2013 into these four flat themes, added 11 new controls (threat intelligence, cloud services, data leakage prevention, web filtering, and others), and introduced <strong>attributes</strong> that let you tag controls by purpose, property, or cybersecurity concept. This page lists every control by reference and title with a one-line description of what it covers.
                    </p>
                    <p className="mb-8">
                      Annex A is a menu, not a mandate — your <Link to="/insights/iso-27001-statement-of-applicability/" className="text-purple-400 hover:text-purple-300 underline">Statement of Applicability (SoA)</Link> records which controls you apply and justifies every exclusion. If you're still scoping the work, our <Link to="/insights/iso-27001-gap-analysis-guide/" className="text-purple-400 hover:text-purple-300 underline">ISO 27001 gap analysis guide</Link> covers the assessment methodology, and the free <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">ISO 27001 Gap Analysis tool</Link> produces a scored readiness report in about 10 minutes.
                    </p>

                    <div className="not-prose bg-gray-800 border border-purple-700/50 rounded-xl p-6 mb-10 text-left">
                      <h3 className="text-lg font-bold text-white mb-2">Download the controls list</h3>
                      <p className="text-sm text-gray-300 mb-4">
                        All 93 Annex A controls as an Excel or CSV checklist — reference, title, and theme —
                        ready to import into your Statement of Applicability or GRC tool. The full gap analysis
                        template (clauses 4–10 + Annex A, with scoring columns) is also available.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a href="/downloads/iso-27001-annex-a-controls.xlsx" download className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
                          Annex A controls (.xlsx)
                        </a>
                        <a href="/downloads/iso-27001-annex-a-controls.csv" download className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors">
                          Annex A controls (.csv)
                        </a>
                        <a href="/downloads/iso-27001-annex-a-controls.pdf" download className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors">
                          Controls list (.pdf)
                        </a>
                        <a href="/downloads/iso-27001-gap-analysis-template.xlsx" download className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors">
                          Gap analysis template (.xlsx)
                        </a>
                        <a href="/downloads/iso-27001-gap-analysis-template.pdf" download className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors">
                          Gap template (.pdf)
                        </a>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">Working reference for self-assessment — not a substitute for the ISO/IEC 27001 standard or a formal certification audit.</p>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">How the 93 Controls Are Organized</h2>
                    <p className="mb-8">
                      Each theme answers a different question: <strong>who governs</strong> (Organizational), <strong>who works for you</strong> (People), <strong>where the information physically lives</strong> (Physical), and <strong>what the technology does</strong> (Technological). Unlike the 2013 edition there are no sub-domains — just four flat lists — and each control carries machine-readable attributes (control type, security properties like confidentiality/integrity/availability, NIST CSF mapping, operational capability) that make filtering and mapping easier.
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>A.5 Organizational controls</strong> — 37 controls</li>
                      <li><strong>A.6 People controls</strong> — 8 controls</li>
                      <li><strong>A.7 Physical controls</strong> — 14 controls</li>
                      <li><strong>A.8 Technological controls</strong> — 34 controls</li>
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
                      Clause 6.1.3 requires you to compare your risk treatment plan against Annex A and record the result in a Statement of Applicability. For each of the 93 controls the SoA records: whether it applies, why it does or doesn't, its implementation status, and where the evidence lives. Two practical rules: first, <strong>the risk assessment drives applicability</strong> — controls exist to treat the risks you actually identified, so a generic "we excluded it" without a risk-based reason will fail a Stage 1 audit. Second, <strong>exclusions need justification, inclusions need evidence</strong> — both directions get tested.
                    </p>
                    <p className="mb-8">
                      Our <Link to="/insights/iso-27001-statement-of-applicability/" className="text-purple-400 hover:text-purple-300 underline">Statement of Applicability guide</Link> walks through the mechanics — what auditors look for, how to word justifications, and the mistakes that draw nonconformities.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">What Auditors Expect to See</h2>
                    <p className="mb-8">
                      For each applicable control, auditors look for evidence the control <em>operates</em> — not just that a policy exists. Typical evidence: the approved policy set and review records (A.5.1), an asset inventory with named owners (A.5.9), access review logs showing rights were actually reviewed (A.5.18), supplier assessments and contract clauses (A.5.19–A.5.23), incident tickets and post-incident reviews (A.5.24–A.5.28), awareness training completion records (A.6.3), visitor logs and access records (A.7.2), backup restore test results (A.8.13), vulnerability scan reports with remediation tickets (A.8.8), and change tickets linking requests to approvals (A.8.32). The pattern across all of them: <strong>documented process + records showing it ran</strong>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Baseline Yourself in 10 Minutes</h2>
                    <p className="mb-8">
                      Our free <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">ISO 27001 Gap Analysis tool</Link> walks you through the clauses and all four Annex A themes as a structured questionnaire — it produces a maturity score, a prioritized gap list, and a downloadable PDF report, entirely in your browser. It's the fastest way to find out which of these 93 controls you already satisfy and which need work before you ever talk to an auditor.
                    </p>
                    <p className="mb-8">
                      Also working on AI governance or quality management? The Annex A pattern is shared — see the <Link to="/insights/iso-42001-annex-a-controls/" className="text-purple-400 hover:text-purple-300 underline">ISO/IEC 42001 Annex A controls list</Link> (38 controls for AI management), the <Link to="/tools/iso-9001-readiness-checker/" className="text-purple-400 hover:text-purple-300 underline">ISO 9001 Readiness Checker</Link>, and <Link to="/insights/integrated-management-system-iso-9001-27001-42001/" className="text-purple-400 hover:text-purple-300 underline">how the three standards integrate into one management system</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">How many controls are in ISO 27001 Annex A?</h3>
                    <p className="mb-8">
                      93 controls in the 2022 edition, grouped into 4 themes: 37 Organizational (A.5), 8 People (A.6), 14 Physical (A.7), and 34 Technological (A.8). The previous 2013 edition had 114 controls across 14 domains — the 2022 revision consolidated, merged, and added controls rather than simply renumbering them.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Are all 93 Annex A controls mandatory?</h3>
                    <p className="mb-8">
                      No. Annex A is a reference set — you select applicable controls through the Statement of Applicability based on your risk assessment and scope. What is mandatory is the <em>process</em>: you must compare your risk treatment plan against all 93 controls and justify each inclusion or exclusion. Some controls (like A.5.1 policies or A.6.3 awareness training) are effectively always applicable in practice.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What changed between ISO 27001:2013 and 2022 Annex A?</h3>
                    <p className="mb-8">
                      Three things: the 14 domains collapsed into 4 themes; the control count went from 114 to 93 (controls were merged, not just deleted); and 11 new controls arrived — including threat intelligence (A.5.7), cloud services (A.5.23), data masking (A.8.11), data leakage prevention (A.8.12), web filtering (A.8.23), and secure coding (A.8.28). Each control also gained attributes for tagging by type, security properties, and NIST CSF concepts.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What are Annex A control attributes?</h3>
                    <p className="mb-8">
                      Introduced in the 2022 edition, attributes are tags attached to each control — control type (preventive/detective/corrective), security properties (confidentiality/integrity/availability), cybersecurity concepts aligned to NIST CSF functions (identify/protect/detect/respond/recover), and operational capabilities. They let you filter the 93 controls into views — e.g. "all preventive confidentiality controls" — and map them to other frameworks like NIST CSF or CIS.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Do I need to map Annex A to NIST or CIS controls?</h3>
                    <p className="mb-8">
                      Not required, but useful. Annex A's attributes already include a conceptual link to NIST CSF functions, and Annex C of the standard cross-references ISO/IEC 27002. If you must report against multiple frameworks (SOC 2, CIS v8, NIST CSF), mapping once in your SoA or GRC tool avoids doing the assessment three times — many Annex A controls overlap substantially with those frameworks.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/iso-27001-annex-a-controls/"
                    categories={['Standards', 'Compliance', 'Security']}
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

export default Iso27001AnnexA;
