import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-nis2-compliance.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Nis2Compliance() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>NIS2 Compliance: Scope, Management Liability, and the ISO 27001 Shortcut | OG Technologies EU</title>
          <meta name="description" content="NIS2 applies to ~160,000 EU organizations across 18 sectors. Who is in scope, what Article 21 requires, the 24/72-hour reporting clock, management liability — and how ISO 27001 gets you most of the way." />
          <meta name="keywords" content="NIS2, NIS2 Directive, NIS2 compliance, essential entities, important entities, Article 21, incident reporting 24 72 hours, ISO 27001, cybersecurity directive" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/nis2-compliance-iso-27001/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/nis2-compliance-iso-27001/" />
          <meta property="og:title" content="NIS2 Compliance: Scope, Management Liability, and the ISO 27001 Shortcut" />
          <meta property="og:description" content="Who NIS2 covers, what Article 21 requires, the 24/72-hour reporting clock, management liability — and how ISO 27001 covers most of the ground." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/nis2-compliance-iso-27001/" />
          <meta name="twitter:title" content="NIS2 Compliance: Scope, Management Liability, and the ISO 27001 Shortcut" />
          <meta name="twitter:description" content="Who NIS2 covers, what Article 21 requires, the reporting clock, management liability — and the ISO 27001 shortcut." />
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
                  <h1 className="h1">NIS2 Compliance: Scope, Management Liability, and the ISO 27001 Shortcut</h1>
                  <div className="text-gray-400 text-center mt-4">23/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="NIS2 directive scope — essential and important entities"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      <strong>NIS2</strong> (Directive (EU) 2022/2555) replaced the original NIS directive and expanded EU cybersecurity law from a narrow set of operators to roughly <strong>160,000 organizations across 18 sectors</strong>. The transposition deadline passed in October 2024, and through 2025–2026 member-state enforcement has ramped up: national registers opened, competent authorities began supervision, and the first national transposition laws started carrying real penalties. If you operate in the EU in a covered sector and employ 50+ people — or turn over more than EUR 10M — NIS2 almost certainly applies to you.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Essential vs. Important Entities</h2>
                    <p className="mb-8">
                      NIS2 splits in-scope organizations into two classes with the same obligations but different supervision and penalty tiers:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Essential entities (EE):</strong> large organizations (250+ employees or EUR 50M turnover) in Annex I sectors — energy, transport, banking, financial-market infrastructure, health, drinking water, wastewater, digital infrastructure, ICT service management, public administration, and space. Essential entities face proactive supervision and fines up to <strong>EUR 10M or 2% of global turnover</strong>.</li>
                      <li><strong>Important entities (IE):</strong> medium-sized organizations (50+ employees or EUR 10M turnover) in Annex I, plus medium and large organizations in Annex II sectors — postal services, waste management, chemicals, food, manufacturing, digital providers (marketplaces, search engines, social platforms), and research. Important entities are supervised mainly after incidents, with fines up to <strong>EUR 7M or 1.4%</strong>.</li>
                    </ul>
                    <p className="mb-8">
                      Some entities are in scope regardless of size: domain-name registries, TLD operators, DNS providers, cloud providers, content-delivery networks, managed service providers, and — under the "single point of failure" logic — any entity whose disruption could have significant impact on public safety or systemic risk.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Article 20: Management Is Personally on the Hook</h2>
                    <p className="mb-8">
                      NIS2's sharpest edge is Article 20: the <strong>management body must approve the cybersecurity measures, oversee their implementation, and can be held liable</strong> for infringements. Member-state laws can temporarily suspend responsible managers from their functions in cases of non-compliance. This is not an IT problem that can be delegated away — boards are required to understand cyber risk well enough to supervise it, and training for management is explicitly mandated.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Article 21: The Ten Required Measures</h2>
                    <p className="mb-8">
                      All covered entities must implement "appropriate and proportionate" technical, operational, and organizational measures across ten areas:
                    </p>
                    <ol className="list-decimal list-inside mb-8 space-y-2">
                      <li>Risk-analysis and information-security policies</li>
                      <li>Incident handling (prevention, detection, response)</li>
                      <li>Business continuity, backup management, disaster recovery, and crisis management</li>
                      <li>Supply-chain security — including security of each supplier and service provider</li>
                      <li>Security in network and information system acquisition, development, and maintenance — including vulnerability handling and disclosure</li>
                      <li>Policies and procedures to assess the effectiveness of the risk-management measures</li>
                      <li>Cyber-hygiene practices and cybersecurity training</li>
                      <li>Policies on cryptography and, where appropriate, encryption</li>
                      <li>Human resources security, access-control policies, and asset management</li>
                      <li>Multi-factor or continuous authentication, secured voice/video/text communications, and secured emergency communication systems</li>
                    </ol>

                    <h2 className="h2 mb-4 text-gray-100">Article 23: The Reporting Clock</h2>
                    <p className="mb-8">
                      NIS2 compresses incident notification into tight deadlines — to the national CSIRT or competent authority:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>24 hours</strong> — early warning after becoming aware of a significant incident (also, where feasible, whether it is suspected criminal).</li>
                      <li><strong>72 hours</strong> — incident notification with initial assessment: severity, impact, indicators of compromise.</li>
                      <li><strong>1 month</strong> — final report: full description, threat type, applied mitigation, cross-border impact.</li>
                    </ul>
                    <p className="mb-8">
                      An incident is "significant" when it causes or can cause severe operational disruption or financial loss, or when it affects other parties. Entities must also notify service recipients of measures they can take in response — and, for certain digital services, of the significant cyber threats they face.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">NIS2, DORA, and GDPR: Where the Regimes Overlap</h2>
                    <p className="mb-8">
                      Financial entities already under <Link to="/dora/" className="text-purple-400 hover:text-purple-300 underline">DORA</Link> are covered by its sector-specific rules, which prevail over NIS2 where they overlap. Personal-data breaches still run through GDPR's 72-hour channel in parallel — NIS2 reports go to the CSIRT, GDPR notifications to the data protection authority, and a single incident can trigger both. The practical consequence: incident-response playbooks need parallel reporting lanes, not a single "72-hour rule."
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The ISO 27001 Shortcut</h2>
                    <p className="mb-8">
                      Here is the part that saves months: <strong>ISO/IEC 27001 covers the large majority of Article 21</strong>. Risk-analysis policies map to Clause 6 and the risk assessment process; incident handling to A.5.24–A.5.28; business continuity to A.5.29–A.5.30; supply chain to A.5.19–A.5.23; secure development to A.8.25–A.8.31; cryptography to A.8.24; HR security and access control to A.5.15–A.5.18 and A.6.x; MFA to A.8.5. Our{' '}
                      <Link to="/insights/iso-27001-annex-a-controls/" className="text-purple-400 hover:text-purple-300 underline">Annex A control reference</Link>{' '}
                      lists all 93 controls — the mapping is almost one-to-one.
                    </p>
                    <p className="mb-8">
                      ISO 27001 certification is <em>not</em> automatic NIS2 compliance — the directive adds the reporting clock, management accountability, registration duties, and sector specifics no certificate covers. But an operational ISMS gives you the management system, the{' '}
                      <Link to="/insights/iso-27001-statement-of-applicability/" className="text-purple-400 hover:text-purple-300 underline">Statement of Applicability</Link>{' '}
                      as your control register, and the audit trail regulators ask for first. Several national transposition laws and supervisory guidance explicitly treat certified ISMSs as strong evidence of Article 21 conformity.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">A Practical Sequence</h2>
                    <ol className="list-decimal list-inside mb-8 space-y-2">
                      <li><strong>Confirm scope.</strong> Sector, size, and the size-independent categories — or whether a customer in scope pushes obligations onto you through the supply chain.</li>
                      <li><strong>Register.</strong> Many member states require covered entities to register with the national authority — check your transposition law.</li>
                      <li><strong>Brief the board.</strong> Article 20 accountability is personal: management needs documented approval and oversight of the measures.</li>
                      <li><strong>Baseline against ISO 27001.</strong> Run a{' '}
                        <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">gap analysis</Link>{' '}
                        — it doubles as your NIS2 readiness map.</li>
                      <li><strong>Build the reporting lane.</strong> 24-hour early warning requires detection-to-decision processes that run outside business hours.</li>
                      <li><strong>Extend to the supply chain.</strong> Supplier security clauses and vendor registers are obligations, not nice-to-haves.</li>
                    </ol>
                    <p className="mb-8">
                      If you want the ISMS-as-evidence approach implemented rather than documented, our{' '}
                      <Link to="/products/grc-compliance-automation/" className="text-purple-400 hover:text-purple-300 underline">GRC &amp; management-system automation</Link>{' '}
                      service builds the gap analysis, SoA register, and incident-reporting workflows — or{' '}
                      <Link to="/quote/" className="text-purple-400 hover:text-purple-300 underline">request a quote</Link>. The{' '}
                      <Link to="/glossary/nis2/" className="text-purple-400 hover:text-purple-300 underline">NIS2 glossary entry</Link>{' '}
                      covers the directive's terminology.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">Is my company in scope for NIS2?</h3>
                    <p className="mb-8">
                      If you operate in an Annex I or II sector in the EU and have 50+ employees or over EUR 10M turnover, yes. Digital infrastructure, cloud, DNS, and managed-service providers are covered regardless of size — and even a small company can be designated by a member state as critical to public safety or systemic resilience.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Can directors really be held personally liable?</h3>
                    <p className="mb-8">
                      Yes — Article 20 requires the management body to approve the measures, oversee implementation, and train accordingly. National laws implement liability through fines on the entity and, for essential entities, the power to temporarily suspend responsible managers from their functions.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is ISO 27001 certification enough for NIS2?</h3>
                    <p className="mb-8">
                      Not alone — the directive adds the 24/72-hour reporting regime, registration, management accountability, and sector-specific rules no certificate covers. But a certified ISMS implements most of Article 21 and provides the evidence structure supervisors expect; it is the fastest credible path.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How does NIS2 relate to DORA?</h3>
                    <p className="mb-8">
                      DORA is sector-specific law for financial entities — where the two overlap, DORA prevails as lex specialis. Banks, insurers, and CASPs follow DORA's testing, incident, and register regimes; their non-financial group entities may still sit under NIS2.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What if an incident is also a personal-data breach?</h3>
                    <p className="mb-8">
                      Both regimes apply in parallel: report the significant incident to the CSIRT under NIS2's 24/72-hour clock and the personal-data breach to the data protection authority under GDPR's 72-hour rule. Plan for two lanes, not one.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/nis2-compliance-iso-27001/"
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

export default Nis2Compliance;
