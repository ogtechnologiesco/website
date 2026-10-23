import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-cyber-resilience-act.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function CyberResilienceAct() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>EU Cyber Resilience Act: SBOMs, CE Marking, and the December 2027 Deadline | OG Technologies EU</title>
          <meta name="description" content="The Cyber Resilience Act's vulnerability-reporting duties apply since September 2026 and full obligations land December 2027. What manufacturers of products with digital elements must do — SBOMs, secure updates, CE marking." />
          <meta name="keywords" content="Cyber Resilience Act, CRA, EU CRA compliance, products with digital elements, SBOM, CE marking, vulnerability reporting ENISA, Regulation 2024/2847, secure by design" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/cyber-resilience-act-cra-guide/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/cyber-resilience-act-cra-guide/" />
          <meta property="og:title" content="EU Cyber Resilience Act: SBOMs, CE Marking, and the December 2027 Deadline" />
          <meta property="og:description" content="CRA vulnerability-reporting duties apply since September 2026 and full obligations land December 2027 — SBOMs, secure updates, CE marking for products with digital elements." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/cyber-resilience-act-cra-guide/" />
          <meta name="twitter:title" content="EU Cyber Resilience Act: SBOMs, CE Marking, and the December 2027 Deadline" />
          <meta name="twitter:description" content="CRA reporting duties are live and full obligations land December 2027 — SBOMs, secure updates, CE marking for products with digital elements." />
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
                  <h1 className="h1">EU Cyber Resilience Act: SBOMs, CE Marking, and the December 2027 Deadline</h1>
                  <div className="text-gray-400 text-center mt-4">23/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="Cyber Resilience Act — SBOM, CE marking, December 2027 deadline"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      The <strong>Cyber Resilience Act</strong> (Regulation (EU) 2024/2847) is the first EU law imposing mandatory cybersecurity requirements on <strong>products with digital elements</strong> — hardware and software sold on the EU market. It entered into force on 10 December 2024, the vulnerability- and incident-reporting duties began applying on <strong>11 September 2026</strong>, and the full product-security obligations — secure-by-design requirements, conformity assessment, CE marking — apply from <strong>11 December 2027</strong>. If you ship software, embedded devices, or connected hardware into the EU, you are a manufacturer under this regulation — regardless of where you are headquartered.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Who Is in Scope</h2>
                    <p className="mb-8">
                      The CRA covers any product whose intended purpose includes a direct or indirect logical or physical data connection — routers, operating systems, mobile and desktop applications, password managers, VPN clients, smart-home devices, industrial controllers, and embedded software. Pure online services (SaaS, cloud platforms) are out of scope <em>unless</em> they are an integral part of a product's functionality — a device whose remote processing happens in your cloud is covered as part of the product.
                    </p>
                    <p className="mb-8">
                      Products are tiered by risk. Around 90% are in the <strong>default category</strong> with self-assessment. <strong>Important products</strong> (Annex III) — identity and access management systems, browsers, password managers, network management, VPNs, operating systems, routers, smart-home security functions — face stricter conformity routes, with <strong>Class II</strong> products requiring third-party assessment. <strong>Critical products</strong> (Annex IV) — smartcards, hardware security modules, secure elements — need certified evaluation. Open-source developers acting outside commercial activity are largely exempt; a distinct "open-source software steward" category covers foundations that host and support projects commercially used.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Already in Force: The Reporting Duties</h2>
                    <p className="mb-8">
                      Since 11 September 2026, manufacturers must report to the single reporting platform operated by ENISA and the designated CSIRT:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Actively exploited vulnerabilities</strong> — early warning within <strong>24 hours</strong> of becoming aware, a notification within <strong>72 hours</strong>, and a final report within <strong>14 days</strong> after a corrective measure is available.</li>
                      <li><strong>Severe incidents</strong> impacting product security — early warning within <strong>24 hours</strong>, incident notification within <strong>72 hours</strong>, and a final report within <strong>1 month</strong>.</li>
                    </ul>
                    <p className="mb-8">
                      This is the obligation that is live <em>today</em> — it does not wait for the 2027 CE-marking regime. If you distribute software in the EU, you need a channel that can detect an exploited-in-the-wild report and turn it into a 24-hour early warning.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The December 2027 Regime</h2>
                    <p className="mb-8">
                      From 11 December 2027, products can only be placed on the market if they meet the essential security requirements of Annex I — split into <em>product properties</em> and <em>vulnerability handling</em>:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Secure by design:</strong> delivered without known exploitable vulnerabilities, with secure default configurations, protection of confidentiality, integrity, and availability, minimized attack surface, and security-by-design development processes.</li>
                      <li><strong>Vulnerability handling:</strong> effective vulnerability identification and remediation, regular testing and review, a coordinated vulnerability disclosure policy, secure and timely distribution of updates, and <strong>security support for at least 5 years</strong> (or the product's expected lifetime, if shorter).</li>
                      <li><strong>Technical documentation:</strong> risk assessment, security architecture, and component inventory — including a <strong>software bill of materials (SBOM)</strong> identifying all components, which enables market surveillance and your own vulnerability triage.</li>
                      <li><strong>EU declaration of conformity and CE marking:</strong> the visible signal the product complies, backed by the conformity assessment route your product category requires.</li>
                    </ul>
                    <p className="mb-8">
                      Importers and distributors carry verification duties — they must check the CE marking and documentation rather than trusting the supply chain. Non-compliance with the essential requirements or the reporting duties carries fines up to <strong>EUR 15M or 2.5% of global turnover</strong>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">SBOMs in Practice</h2>
                    <p className="mb-8">
                      The SBOM requirement is the operationally heavy piece: you must be able to identify which components — including open-source libraries — ship in each product version, so an exploited dependency maps to affected products in hours, not weeks. Practical implications: generate SBOMs in your build pipeline (CycloneDX or SPDX formats), keep them versioned alongside releases, and wire them to a monitoring feed for known vulnerabilities. The SBOM belongs to technical documentation — market-surveillance authorities can request it — it is not required to be public.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Mapping CRA to What You Already Have</h2>
                    <p className="mb-8">
                      If you run a certified ISMS, much of the machinery exists. Secure development lifecycle, vulnerability management, and supplier control map to ISO/IEC 27001 Annex A controls A.8.25–A.8.31 (secure development, architecture, testing, outsourced development) and A.5.19–A.5.23 (supplier and cloud security) — see the{' '}
                      <Link to="/insights/iso-27001-annex-a-controls/" className="text-purple-400 hover:text-purple-300 underline">full Annex A control list</Link>. Harmonized European standards — still being finalized — will offer presumption of conformity once published, and an existing EU cybersecurity certification can substitute for parts of the assessment. The CRA does not demand a new discipline so much as it demands <em>evidence</em>: documented risk assessment, tested vulnerability-handling, and reproducible SBOMs.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">A Practical Sequence for Software Vendors</h2>
                    <ol className="list-decimal list-inside mb-8 space-y-2">
                      <li><strong>Classify your products.</strong> Default, important Class I/II, or critical — the category determines the conformity route and whether third-party assessment is needed.</li>
                      <li><strong>Stand up the reporting lane now.</strong> 24-hour early warning on exploited vulnerabilities is already live — define who detects, decides, and files to the ENISA platform.</li>
                      <li><strong>Generate SBOMs in CI.</strong> Every release, versioned, queryable against CVE feeds.</li>
                      <li><strong>Formalize vulnerability handling.</strong> Intake channel (security.txt or disclosure form), coordinated disclosure policy, fix SLAs, secure update distribution.</li>
                      <li><strong>Commit the support period.</strong> Security updates for at least 5 years — decide how EOL products are handled and communicated.</li>
                      <li><strong>Build the technical file.</strong> Risk assessment, architecture, SBOM, test evidence — the documentation behind your declaration of conformity.</li>
                    </ol>
                    <p className="mb-8">
                      Our{' '}
                      <Link to="/products/grc-compliance-automation/" className="text-purple-400 hover:text-purple-300 underline">GRC &amp; management-system automation</Link>{' '}
                      service builds the evidence layer — risk registers, vulnerability-handling workflows, control tracking — and the free{' '}
                      <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">ISO 27001 Gap Analysis</Link>{' '}
                      gives you a baseline on the security-development controls CRA assumes. To scope an engagement,{' '}
                      <Link to="/quote/" className="text-purple-400 hover:text-purple-300 underline">request a quote</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">Does the CRA cover SaaS and cloud services?</h3>
                    <p className="mb-8">
                      Pure online services are out of scope — NIS2 covers those. But a cloud component that is integral to a product's functionality is assessed as part of the product: a smart lock's companion app and its backend are within the product's security boundary.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is the SBOM made public?</h3>
                    <p className="mb-8">
                      No — it is part of the technical documentation shared with market-surveillance authorities on request. What is public is the CE marking and the declaration of conformity; the component inventory stays in your technical file.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How long must security support last?</h3>
                    <p className="mb-8">
                      At least 5 years, or the product's expected lifetime if that is shorter. Security updates must be made available free of charge, and the support commitment becomes part of product documentation.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What applies right now versus December 2027?</h3>
                    <p className="mb-8">
                      Now: the reporting duties — 24-hour early warning and 72-hour notification for actively exploited vulnerabilities and severe incidents — plus the CE-marking/authority framework machinery. December 2027: the essential security requirements, conformity assessment, technical documentation, and CE marking obligations for products placed on the market.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Does CRA apply to open-source projects?</h3>
                    <p className="mb-8">
                      Non-commercial open-source development is exempt. Commercial activity changes the answer — monetized OSS products fall in scope — and a separate "open-source steward" regime gives foundations light-touch duties around cybersecurity policies and cooperation with authorities.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/cyber-resilience-act-cra-guide/"
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

export default CyberResilienceAct;
