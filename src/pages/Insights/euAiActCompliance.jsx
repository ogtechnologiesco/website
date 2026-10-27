import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-eu-ai-act.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function EuAiActCompliance() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>EU AI Act Compliance: What the August 2026 Obligations Mean for Your Business | OG Technologies EU</title>
          <meta name="description" content="The EU AI Act's general application date passed on 2 August 2026. What the transparency duties, deployer obligations, and high-risk rules mean for companies deploying AI." />
          <meta name="keywords" content="EU AI Act, AI Act compliance, Regulation 2024/1689, high-risk AI, GPAI, Article 50 transparency, AI chatbot disclosure, AI governance, ISO 42001" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/eu-ai-act-compliance-guide/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/eu-ai-act-compliance-guide/" />
          <meta property="og:title" content="EU AI Act Compliance: What the August 2026 Obligations Mean for Your Business" />
          <meta property="og:description" content="The EU AI Act's general application date passed on 2 August 2026 — transparency duties, deployer obligations, and high-risk rules now apply to most AI systems." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/eu-ai-act-compliance-guide/" />
          <meta name="twitter:title" content="EU AI Act Compliance: What the August 2026 Obligations Mean for Your Business" />
          <meta name="twitter:description" content="The EU AI Act's general application date passed on 2 August 2026 — transparency duties, deployer obligations, and high-risk rules now apply." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">AI Governance · Compliance · Standards</div>
                  <h1 className="h1">EU AI Act Compliance: What the August 2026 Obligations Mean for Your Business</h1>
                  <div className="text-gray-400 text-center mt-4">23/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="EU AI Act risk tiers and compliance timeline"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      The <strong>EU AI Act</strong> (Regulation (EU) 2024/1689) is the world's first comprehensive AI law, and its obligations no longer sit on the horizon — the general application date of <strong>2 August 2026</strong> has passed, which means the transparency duties, deployer obligations, and high-risk requirements now apply to most AI systems placed on or used in the EU market. If your organization deploys a customer-facing chatbot, embeds a third-party LLM into workflows, or uses AI in hiring, credit, or access decisions, the Act applies to you — and it applies extraterritorially, wherever the output is used in the EU.
                    </p>
                    <p className="mb-8">
                      The Act entered into force on 1 August 2024 with obligations phased in stages rather than a single deadline. Understanding which stage applies to which obligation is the first compliance task.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The Staged Timeline</h2>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>2 February 2025</strong> — prohibited practices (Article 5) and AI literacy obligations (Article 4) apply. Untargeted facial-image scraping, social scoring, manipulative techniques, and workplace emotion recognition are banned.</li>
                      <li><strong>2 August 2025</strong> — general-purpose AI (GPAI) model obligations, governance structures, and the penalty framework take effect.</li>
                      <li><strong>2 August 2026</strong> — general application: transparency duties (Article 50), high-risk rules for Annex III systems, deployer obligations, and the regulatory sandbox requirement now apply.</li>
                      <li><strong>2 August 2027</strong> — obligations extend to high-risk AI embedded in Annex I regulated products (machinery, toys, medical devices, and similar) and to certain legacy GPAI and public-sector systems.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Who Is in Scope: Providers and Deployers</h2>
                    <p className="mb-8">
                      The Act distinguishes <strong>providers</strong> (organizations that develop or substantially modify an AI system and place it on the market under their own name) from <strong>deployers</strong> (organizations that use an AI system under their own authority). Most businesses are deployers — but the line shifts: rebranding a third-party model, substantially modifying it, or repurposing a general-purpose system for a high-risk use can reclassify you as a provider, with the full compliance burden that carries.
                    </p>
                    <p className="mb-8">
                      Obligations also attach to <strong>importers, distributors, and authorized representatives</strong>, and the Act reaches non-EU companies whose AI output is used in the EU — the same extraterritorial logic as GDPR.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The Risk Tiers</h2>
                    <p className="mb-8">
                      Everything in the AI Act flows from a four-tier risk classification:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Prohibited (Article 5):</strong> social scoring, manipulative or exploitative techniques, untargeted facial-recognition database building, emotion inference in workplaces and schools, and most real-time remote biometric identification in public spaces. These carry the maximum penalty tier.</li>
                      <li><strong>High-risk (Annex III):</strong> AI used in biometrics, critical infrastructure, education and vocational training, employment and worker management, access to essential private and public services, law enforcement, migration, and administration of justice. This is where compliance work concentrates: risk management, data governance, technical documentation, logging, transparency to deployers, human oversight, accuracy and robustness.</li>
                      <li><strong>Transparency-risk (Article 50):</strong> systems that interact with humans or generate synthetic content — chatbots, emotion-recognition systems, deepfakes, AI-generated text published on matters of public interest.</li>
                      <li><strong>Minimal-risk:</strong> everything else — spam filters, recommenders, most internal automation. No obligations, though codes of conduct are encouraged.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Article 50: The Transparency Duty Almost Everyone Missed</h2>
                    <p className="mb-8">
                      The most broadly applicable provision is Article 50. Since August 2026, AI systems that interact directly with people — customer support chatbots, voice agents, conversational assistants — <strong>must inform users they are interacting with AI</strong>, unless that is obvious from context. Generative AI outputs must be marked as artificially generated or manipulated in a machine-readable way where feasible; deepfakes require visible disclosure. Emotion-recognition and biometric-categorization systems must disclose their operation to the persons exposed.
                    </p>
                    <p className="mb-8">
                      For most companies this means a concrete, near-term task list: audit every customer-facing AI touchpoint for disclosure, verify your model providers mark generated content, and review publication workflows for AI-authored text on matters of public interest.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Deployer Duties Under Article 26</h2>
                    <p className="mb-8">
                      If you deploy a <em>high-risk</em> AI system — CV screening, biometric access control, AI triage in essential services — Article 26 imposes operational duties: use the system in accordance with its instructions, assign human oversight to competent staff, ensure input data is relevant and sufficiently representative for your use case, retain logs under your control for at least six months, inform workers before deploying in the workplace, and inform natural persons when the system contributes to decisions about them. Deployers of certain systems must also complete a <strong>fundamental rights impact assessment (FRIA)</strong> under Article 27 before use.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">GPAI Models and the Foundation-Model Layer</h2>
                    <p className="mb-8">
                      Providers of general-purpose AI models — the foundation-model layer — face their own regime: technical documentation, a policy to comply with EU copyright law, and a sufficiently detailed summary of training content. Models with systemic risk (trainings above 10^25 FLOPs) carry additional duties: model evaluation, adversarial testing, incident reporting, and cybersecurity protections. Deployers do not inherit these obligations, but the documentation GPAI providers must publish is what you will rely on for your own risk classification and Art. 26 duties.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Penalties</h2>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Up to EUR 35M or 7% of global turnover</strong> — prohibited practices.</li>
                      <li><strong>Up to EUR 15M or 3%</strong> — most other violations, including deployer and transparency breaches.</li>
                      <li><strong>Up to EUR 7.5M or 1%</strong> — supplying incorrect or misleading information to authorities.</li>
                    </ul>
                    <p className="mb-8">
                      GPAI fines sit in a separate regime administered by the Commission's AI Office, up to EUR 15M or 3%.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">A Practical Compliance Sequence</h2>
                    <ol className="list-decimal list-inside mb-8 space-y-2">
                      <li><strong>Inventory your AI systems.</strong> Include third-party models embedded in products and internal tools — shadow AI included.</li>
                      <li><strong>Classify each system.</strong> Prohibited? Annex III high-risk? Article 50 transparency-risk? Minimal? Document the reasoning.</li>
                      <li><strong>Fix transparency first.</strong> Chatbot disclosures and synthetic-content marking are cheap, fast, and already enforceable.</li>
                      <li><strong>Map deployer duties for high-risk systems.</strong> Oversight, logs, worker notification, FRIA where required.</li>
                      <li><strong>Build the management system.</strong> The Act rewards demonstrable governance — and <Link to="/insights/iso-42001-ai-management-guide/" className="text-purple-400 hover:text-purple-300 underline">ISO/IEC 42001</Link> provides the certifiable scaffolding (risk processes, documentation, accountability) regulators and procurement teams increasingly expect. For the Article 17 QMS specifically, <Link to="/insights/en-18286-ai-act-qms/" className="text-purple-400 hover:text-purple-300 underline">EN 18286:2026</Link> is now the presumption-of-conformity route.</li>
                    </ol>

                    <h2 className="h2 mb-4 text-gray-100">Start With a Readiness Baseline</h2>
                    <p className="mb-8">
                      Our free{' '}
                      <Link to="/tools/iso-42001-ai-readiness/" className="text-purple-400 hover:text-purple-300 underline">ISO 42001 AI Readiness Assessment</Link>{' '}
                      scores your AI governance posture across clauses 4–10 and the Annex A controls — in your browser, with a downloadable PDF report. The{' '}
                      <Link to="/glossary/eu-ai-act/" className="text-purple-400 hover:text-purple-300 underline">EU AI Act glossary entry</Link>{' '}
                      and the{' '}
                      <Link to="/insights/iso-42001-annex-a-controls/" className="text-purple-400 hover:text-purple-300 underline">ISO/IEC 42001 Annex A control list</Link>{' '}
                      are useful references while you classify systems. If you deploy customer-facing AI, our{' '}
                      <Link to="/products/ai-chatbot/" className="text-purple-400 hover:text-purple-300 underline">AI agent development</Link>{' '}
                      practice builds disclosure, logging, and oversight hooks in by design — or{' '}
                      <Link to="/quote/" className="text-purple-400 hover:text-purple-300 underline">request a quote</Link>{' '}
                      for a compliance review of your AI footprint.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">Does the AI Act apply to companies outside the EU?</h3>
                    <p className="mb-8">
                      Yes, where the AI system's output is used in the EU. A US or UK company whose chatbot serves EU customers, or whose screening tool evaluates EU candidates, is in scope under the same extraterritorial logic as GDPR.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Do we have to disclose that customers are talking to a chatbot?</h3>
                    <p className="mb-8">
                      Yes — Article 50 has applied since 2 August 2026. AI systems interacting directly with natural persons must inform them they are interacting with AI, unless obvious from context. A short, conspicuous notice at the start of the interaction satisfies it.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is using a third-party LLM enough to make us a provider?</h3>
                    <p className="mb-8">
                      Usually not — calling a model API as a deployer stays a deployer role. You become a provider if you place an AI system on the market under your own name, substantially modify a GPAI model, or repurpose a general system into a high-risk use case.</p>
                    <h3 className="h3 mb-4 text-gray-100">Does ISO/IEC 42001 certification equal AI Act compliance?</h3>
                    <p className="mb-8">
                      No — certification is evidence of governance maturity, not a legal safe harbor. But an AIMS gives you the inventory, risk process, and documentation machinery the Act assumes you have, and EN 18286:2026 — cited in the Official Journal in October 2026 — now provides a presumption-of-conformity route for the Article 17 QMS.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the deadline most companies actually face?</h3>
                    <p className="mb-8">
                      It already passed: 2 August 2026 brought transparency duties, deployer obligations, and Annex III high-risk rules into force. The remaining milestone is 2 August 2027 for AI embedded in regulated products. Compliance now is catch-up, not preparation.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/eu-ai-act-compliance-guide/"
                    categories={['AI Governance', 'Compliance', 'Standards']}
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

export default EuAiActCompliance;
