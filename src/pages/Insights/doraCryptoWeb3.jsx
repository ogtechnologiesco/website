import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-dora-crypto.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function DoraCryptoWeb3() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>DORA for Crypto and Web3 Companies: What EU Regulation 2022/2554 Requires | OG Technologies EU</title>
          <meta name="description" content="DORA applies to crypto-asset service providers since January 2025. What CASPs and Web3 firms must implement: ICT risk management, incident reporting, resilience testing, and third-party registers." />
          <meta name="keywords" content="DORA crypto, DORA for crypto providers, web3 compliance, CASP compliance, DORA digital operational resilience act, MiCA compliance, crypto compliance EU, blockchain compliance" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/dora-crypto-web3-compliance/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/dora-crypto-web3-compliance/" />
          <meta property="og:title" content="DORA for Crypto and Web3 Companies: What EU Regulation 2022/2554 Requires" />
          <meta property="og:description" content="DORA applies to crypto-asset service providers since January 2025 — the ICT risk, incident reporting, testing, and vendor requirements CASPs must implement." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/dora-crypto-web3-compliance/" />
          <meta name="twitter:title" content="DORA for Crypto and Web3 Companies" />
          <meta name="twitter:description" content="What CASPs and Web3 firms must implement under EU Regulation 2022/2554 — in force since January 2025." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Compliance · Blockchain · Standards</div>
                  <h1 className="h1">DORA for Crypto and Web3 Companies: What You Need to Comply</h1>
                  <div className="text-gray-400 text-center mt-4">26/09/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-2 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="European Parliament hemicycle in Brussels — DORA regulation applies to crypto service providers"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-xs text-gray-500 mb-8">
                    Image: "European Parliament Hemicycle, Brussels" by Profpcde, <a href="https://commons.wikimedia.org/wiki/File:European_Parliament_Hemicycle_-_Brussels_2024.jpg" className="underline hover:text-gray-400" target="_blank" rel="noopener noreferrer">CC0</a>
                  </p>

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      The Digital Operational Resilience Act — Regulation (EU) 2022/2554 — has applied since <strong>17 January 2025</strong>. Unlike earlier EU financial rules, DORA explicitly names <strong>crypto-asset service providers (CASPs) authorized under MiCA</strong> as in-scope entities. If you operate a custodial wallet, exchange, or token service in the EU, DORA compliance is not optional — and its requirements reach deep into how you build and run infrastructure.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Who Is in Scope</h2>
                    <p className="mb-8">
                      DORA covers virtually every regulated financial entity: banks, payment institutions, investment firms, insurers — and CASPs. For Web3, the bright line is MiCA authorization: a CASP licensed under MiCA is automatically a DORA "financial entity". Pure DeFi protocols without a central operator sit outside the perimeter today, but any centralized front-end, custodian, or fiat on-ramp pulls the operation in. Their critical ICT vendors — cloud providers, node infrastructure, custody tech — fall under DORA's third-party regime too.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The Five Pillars</h2>
                    <ol className="list-decimal list-inside mb-8 space-y-3">
                      <li><strong>ICT risk management and governance.</strong> A documented risk framework approved by the management body, with assigned accountability, asset inventory, and regular review — not a policy PDF that lives in a drawer.</li>
                      <li><strong>Incident management and reporting.</strong> Classification of ICT incidents by severity, with mandatory reporting of major incidents to the competent authority on tight deadlines — initial notification as early as 4 hours after classification under the RTS.</li>
                      <li><strong>Digital operational resilience testing.</strong> A risk-based testing program: vulnerability scans, scenario testing, and — for significant entities — threat-led penetration testing (TLPT) at least every three years. For crypto firms this means, at minimum, testing key-management and signing-path resilience.</li>
                      <li><strong>ICT third-party risk.</strong> A maintained <strong>register of information</strong> covering every ICT vendor contract, mandatory contractual clauses (audit rights, exit plans, subcontracting rules), and concentration-risk assessment. Cloud providers and smart-contract auditors both belong in the register.</li>
                      <li><strong>Information sharing.</strong> Optional participation in cyber-threat intelligence sharing arrangements between financial entities.</li>
                    </ol>

                    <h2 className="h2 mb-4 text-gray-100">Where Smart Contracts Fit</h2>
                    <p className="mb-8">
                      DORA doesn't mention smart contracts by name, but they sit squarely inside the ICT risk framework for a CASP: a deployed contract is a critical function whose compromise is a reportable ICT incident. Practically, that means: audits belong in the resilience-testing program, audit vendors go in the register of information, key-management compromise scenarios belong in incident classification, and upgrade/multisig governance must be documented as part of the risk framework. See our <Link to="/dora/" className="text-purple-400 hover:text-purple-300 underline">DORA service overview</Link> for how we structure this work.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">DORA, MiCA, NIS2, GDPR: How They Interlock</h2>
                    <p className="mb-8">
                      MiCA grants the license; DORA governs operational resilience. NIS2 applies to CASPs in parallel as "digital providers" in several member states, and GDPR still covers personal data on top. The overlap is real but manageable: DORA's register of information and incident reporting flow largely subsume NIS2's for financial entities (DORA is lex specialis where they conflict). The sensible approach is one integrated risk framework mapped to all four regimes, not four parallel programs.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">A Practical First Pass</h2>
                    <ol className="list-decimal list-inside mb-8 space-y-2">
                      <li><strong>Confirm scope.</strong> If you hold or are seeking MiCA authorization, you're in.</li>
                      <li><strong>Gap-assess the risk framework.</strong> Map existing security policies against DORA Chapter II requirements.</li>
                      <li><strong>Build the register of information.</strong> Inventory every ICT vendor and contract — most CASPs discover they have none.</li>
                      <li><strong>Set up incident classification.</strong> Define thresholds and reporting workflows before an incident forces the question.</li>
                      <li><strong>Schedule testing.</strong> Establish the resilience-testing calendar, including smart-contract audit cadence and TLPT if you're a significant entity.</li>
                    </ol>
                    <p className="mb-8">
                      A quick starting point: our free <Link to="/tools/blockchain-compliance-checker/" className="text-purple-400 hover:text-purple-300 underline">Blockchain Compliance Checker</Link> gives a structured readiness snapshot across DORA, MiCA, and AML requirements — useful as a first-pass baseline before a deeper <Link to="/dora/" className="text-purple-400 hover:text-purple-300 underline">DORA implementation engagement</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">Does DORA apply to crypto companies?</h3>
                    <p className="mb-8">
                      Yes — crypto-asset service providers authorized under MiCA are explicitly listed as financial entities under Article 2. Unlicensed pure-DeFi protocols are outside the perimeter, but any centralized custodian, exchange, or on-ramp operating in the EU is in scope.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">When did DORA take effect?</h3>
                    <p className="mb-8">
                      DORA entered into force on 16 January 2023 and has applied since 17 January 2025. There is no transition period left — obligations are live now.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the register of information?</h3>
                    <p className="mb-8">
                      A mandatory, maintained register of all contractual arrangements with ICT third-party service providers — vendors, scope, criticality, data locations, subcontracting chains. Supervisors can request it at any time, and missing it is a common first finding in supervisory reviews.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How does DORA interact with smart contract audits?</h3>
                    <p className="mb-8">
                      Audits fit into the resilience-testing pillar: contract audits and security testing form part of the testing program, audit firms are ICT vendors in the register, and a contract exploit is a reportable ICT incident if it disrupts a critical function.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/dora-crypto-web3-compliance/"
                    categories={['Compliance', 'Blockchain', 'Standards']}
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

export default DoraCryptoWeb3;
