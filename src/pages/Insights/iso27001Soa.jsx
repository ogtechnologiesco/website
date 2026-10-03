import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-iso27001-soa.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Iso27001Soa() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>ISO 27001 Statement of Applicability: How to Choose and Justify Annex A Controls | OG Technologies EU</title>
          <meta name="description" content="The Statement of Applicability (SoA) is the document ISO 27001 auditors ask for first. Learn what it must contain under Clause 6.1.3, how to justify Annex A control selections and exclusions, and the mistakes that fail Stage 1 audits." />
          <meta name="keywords" content="ISO 27001 statement of applicability, SoA iso 27001, statement of applicability template, annex a controls selection, ISO 27001 clause 6.1.3, applicable controls justification, ISMS documentation, ISO 27001 audit" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/iso-27001-statement-of-applicability/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/iso-27001-statement-of-applicability/" />
          <meta property="og:title" content="ISO 27001 Statement of Applicability: How to Choose and Justify Annex A Controls" />
          <meta property="og:description" content="What Clause 6.1.3 actually requires: selecting Annex A controls, justifying exclusions, and building an SoA that survives Stage 1." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/iso-27001-statement-of-applicability/" />
          <meta name="twitter:title" content="ISO 27001 Statement of Applicability: How to Choose and Justify Annex A Controls" />
          <meta name="twitter:description" content="What Clause 6.1.3 actually requires: selecting Annex A controls, justifying exclusions, and building an SoA that survives Stage 1." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Standards · Compliance · Security</div>
                  <h1 className="h1">ISO 27001 Statement of Applicability: How to Choose and Justify Annex A Controls</h1>
                  <div className="text-gray-400 text-center mt-4">03/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-2 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="Clipboard with a list of steps — documenting applicable controls in a Statement of Applicability"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-xs text-gray-500 mb-8">
                    Image: "Clipboard on a table with steps listed on it" by RyanT27, <a href="https://commons.wikimedia.org/wiki/File:Clipboard_on_a_table_with_steps_listed_on_it.jpg" className="underline hover:text-gray-400" target="_blank" rel="noopener noreferrer">CC0</a>
                  </p>

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      Ask an ISO 27001 auditor what document they request first, and the answer is almost always the same: the <strong>Statement of Applicability (SoA)</strong>. It is the single artifact that connects your risk assessment to your control environment — a declaration of which Annex A controls apply to your ISMS, which don't, and exactly why. Get it wrong and Stage 1 stalls; get it right and the rest of the audit has a backbone to follow.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">What Clause 6.1.3 Actually Requires</h2>
                    <p className="mb-8">
                      The SoA is mandated by <strong>Clause 6.1.3(d)</strong> of ISO/IEC 27001:2022. The requirement is precise: you must produce a Statement of Applicability that contains the necessary controls — from Annex A and anywhere else — together with:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li>A <strong>justification for inclusion</strong> of each control — linked to your risk treatment decisions.</li>
                      <li>An <strong>implementation status</strong> — whether each included control is implemented or not.</li>
                      <li>A <strong>justification for exclusion</strong> of any Annex A controls you decided not to apply.</li>
                    </ul>
                    <p className="mb-8">
                      Two subtleties trip people up. First, the SoA is not only about Annex A — controls from other sources (contractual obligations, NIST, internal policies) belong in it too. Second, "implemented or not" means an honest status: marking a control included-but-not-yet-implemented is perfectly acceptable; claiming implementation you can't evidence is not.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Where the SoA Sits in the Workflow</h2>
                    <p className="mb-8">
                      The SoA is an output, not a starting point. The sequence Clause 6.1 prescribes is: <strong>scope (4.3) → risk assessment (6.1.2) → risk treatment plan → SoA (6.1.3)</strong>. Your risk assessment identifies what could go wrong; the risk treatment plan decides whether to modify, retain, avoid, or share each risk; and the SoA records which controls execute that plan. This ordering is why you cannot legitimately copy someone else's SoA — it encodes <em>your</em> risks, scope, and treatment decisions.
                    </p>
                    <p className="mb-8">
                      If you haven't baselined yet, our <Link to="/insights/iso-27001-gap-analysis-guide/" className="text-purple-400 hover:text-purple-300 underline">ISO 27001 gap analysis guide</Link> covers the assessment that comes before all of this, and the <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">free gap analysis tool</Link> produces a clause-by-clause readiness report you can use to prioritize SoA work.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Annex A:2022 — The Menu You're Choosing From</h2>
                    <p className="mb-8">
                      The 2022 revision restructured Annex A into <strong>93 controls across 4 themes</strong> (down from 114 in 14 domains in the 2013 edition):
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>A.5 Organizational</strong> — 37 controls: policies, roles, asset management, supplier relationships, incident management, business continuity.</li>
                      <li><strong>A.6 People</strong> — 8 controls: screening, awareness and training, disciplinary process, remote working, confidentiality agreements.</li>
                      <li><strong>A.7 Physical</strong> — 14 controls: perimeter security, entry controls, equipment protection, clear desk, secure disposal.</li>
                      <li><strong>A.8 Technological</strong> — 34 controls: access control, authentication, cryptography, network security, logging, vulnerability management, backups, secure development.</li>
                    </ul>
                    <p className="mb-8">
                      Each control now also carries <strong>attributes</strong> (control type, security properties, cyber concepts, operational capabilities) — useful metadata for filtering and reporting, though the attributes themselves are informative, not requirements.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Anatomy of a Good SoA</h2>
                    <p className="mb-8">
                      Whether it's a spreadsheet or a GRC tool, a usable SoA has a consistent row structure. Minimum columns:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Control reference and title</strong> (e.g., A.8.2 — Privileged access rights)</li>
                      <li><strong>Applicable?</strong> — Yes / No</li>
                      <li><strong>Justification</strong> — one or two sentences tying the decision to a risk, obligation, or scope boundary</li>
                      <li><strong>Implementation status</strong> — Implemented / Partial / Planned / Not implemented</li>
                      <li><strong>Evidence / link</strong> — where the proof lives (policy doc, config export, training records)</li>
                      <li><strong>Owner</strong> — who is accountable for the control</li>
                      <li><strong>Related risks</strong> — the risk register entries this control treats</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Worked Example Rows</h2>
                    <p className="mb-8">
                      Three rows showing the range of honest answers:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>A.8.2 Privileged access rights</strong> — Applicable: Yes. Justification: admin access to production identified as high risk (R-12). Status: Implemented. Evidence: IAM policy + quarterly access review. Owner: CISO.</li>
                      <li><strong>A.7.4 Physical security monitoring</strong> — Applicable: No. Justification: fully remote organization, no owned premises; office access controlled by landlord under shared-responsibility agreement documented in supplier register. Status: N/A.</li>
                      <li><strong>A.8.28 Secure coding</strong> — Applicable: Yes. Justification: in-house SaaS product handles customer PII. Status: Partial — secure SDLC documented, SAST in CI, penetration test scheduled Q1. Owner: VP Engineering.</li>
                    </ul>
                    <p className="mb-8">
                      Notice the middle row: a legitimate exclusion, justified by scope, with the residual coverage point documented elsewhere. Auditors accept "not applicable, here's why" — they reject "not applicable" with a blank justification.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">How to Justify Exclusions (and When You Can't)</h2>
                    <p className="mb-8">
                      You can exclude an Annex A control only when it is <strong>not necessary</strong> for your risk treatment. Valid justifications sound like: "no physical premises in scope," "no cardholder data processed — PCI controls unnecessary," "development outsourced — supplier control A.5.19 covers this risk instead." Invalid justifications sound like: "too expensive," "we're small," "we'll do it later." If a control treats an identified risk, excluding it without an alternative treatment is a nonconformity waiting to be found. Exclusions are where inexperienced implementations fail audits — not because they excluded too much, but because they couldn't show the reasoning.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Common SoA Mistakes</h2>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Copying a template SoA wholesale.</strong> Auditors spot the same boilerplate justifications across dozens of companies. Your justifications must reference your risk register and scope.</li>
                      <li><strong>Treating it as a one-time document.</strong> The SoA is living documentation — update it when risks change, controls are implemented, or scope shifts. It belongs in your management review (Clause 9.3) inputs.</li>
                      <li><strong>All controls "implemented."</strong> Suspicious and usually false. An honest "Partial" with a remediation plan reads far better than unverifiable claims.</li>
                      <li><strong>No link between risks and controls.</strong> If control X doesn't map to risk register entry Y, the auditor can't verify your treatment plan — and neither can you.</li>
                      <li><strong>Missing version control and approval.</strong> The SoA is documented information under Clause 7.5 — it needs an owner, a version, a date, and management approval.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">What Auditors Check</h2>
                    <p className="mb-8">
                      At Stage 1, auditors verify the SoA exists, is approved, covers all 93 Annex A controls (included or justifiably excluded), and is consistent with your scope and risk assessment. At Stage 2, they sample included controls and ask for evidence — which is why the "evidence link" column matters more than any formatting choice. An SoA that says "A.5.15 access control — implemented" with no pointer to the actual policy, config, or review record sends the auditor hunting, and hunting auditors find nonconformities.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The SoA Beyond ISO 27001</h2>
                    <p className="mb-8">
                      The mechanism is spreading. <strong>ISO/IEC 42001</strong> (AI management systems) uses the same pattern — an AI Statement of Applicability selecting from its own <Link to="/insights/iso-42001-annex-a-controls/" className="text-purple-400 hover:text-purple-300 underline">38 Annex A controls</Link>. If you build your ISMS SoA properly, the muscle transfers directly to AI governance — see our <Link to="/insights/iso-42001-ai-management-guide/" className="text-purple-400 hover:text-purple-300 underline">ISO 42001 guide</Link> and <Link to="/tools/iso-42001-ai-readiness/" className="text-purple-400 hover:text-purple-300 underline">AI readiness assessment</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">Is the Statement of Applicability mandatory for ISO 27001?</h3>
                    <p className="mb-8">
                      Yes. Clause 6.1.3(d) makes the SoA a required piece of documented information. Without it a certification body cannot proceed — it is typically the first document requested at the Stage 1 audit.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How many controls does the SoA cover?</h3>
                    <p className="mb-8">
                      Under ISO/IEC 27001:2022, Annex A contains 93 controls across four themes (Organizational, People, Physical, Technological). Every one must appear in your SoA — marked applicable with justification and status, or excluded with justification. The 2013 edition had 114 controls in 14 domains; certified organizations had to transition by October 2025.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Can I exclude Annex A controls?</h3>
                    <p className="mb-8">
                      Yes — but only when a control is not necessary for your risk treatment, and you must justify each exclusion in the SoA itself. "No physical offices" is a legitimate exclusion for physical controls; "too expensive" is not. Any control needed to treat an identified risk cannot be excluded without an alternative treatment.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between the risk assessment and the SoA?</h3>
                    <p className="mb-8">
                      The risk assessment (Clause 6.1.2) identifies and evaluates threats to your information assets. The SoA (Clause 6.1.3) records which controls you chose to treat those risks, their implementation status, and justifications. The assessment finds the problems; the SoA documents the answers.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How often should the SoA be updated?</h3>
                    <p className="mb-8">
                      Whenever something material changes — new risks identified, controls implemented or retired, scope modified, incidents revealing gaps — and at minimum at your periodic management review (Clause 9.3). Auditors at surveillance audits will compare it to the previous version and ask what changed and why.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/iso-27001-statement-of-applicability/"
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

export default Iso27001Soa;
