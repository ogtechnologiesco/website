import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-iso27001-template.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const TEMPLATE_COLUMNS = [
  ['Ref', 'Clause or Annex A reference — e.g. 6.1, A.5.23'],
  ['Requirement / Control', 'The requirement title or control name'],
  ['Current status', 'Implemented / Partial / Not implemented / N/A'],
  ['Gap severity', 'Critical / High / Medium / Low — drives remediation order'],
  ['Evidence in place', 'Link or reference to policies, tickets, logs, configs'],
  ['Remediation action', 'What closes the gap — not just "improve X" but a concrete step'],
  ['Owner', 'The person accountable for closing the gap'],
  ['Due date', 'Target completion — keeps the roadmap honest'],
];

function Iso27001GapTemplate() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>ISO 27001 Gap Analysis Template — Free Excel & PDF Download | OG Technologies EU</title>
          <meta name="description" content="Download a free ISO 27001:2022 gap analysis template (Excel, CSV-ready, printable PDF). Covers management-system clauses 4–10 and all 93 Annex A controls with status, gap severity, evidence, remediation, owner, and due-date columns." />
          <meta name="keywords" content="iso 27001 gap analysis template, iso 27001 gap assessment template, iso 27001 template excel, iso 27001 gap analysis checklist, iso 27001 self assessment, iso 27001 annex a checklist, isms gap analysis" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/iso-27001-gap-analysis-template/" />

          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/iso-27001-gap-analysis-template/" />
          <meta property="og:title" content="ISO 27001 Gap Analysis Template — Free Excel & PDF Download" />
          <meta property="og:description" content="Free ISO 27001:2022 gap analysis template: clauses 4–10 plus all 93 Annex A controls, with status, severity, evidence, and remediation columns. Excel and PDF." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/iso-27001-gap-analysis-template/" />
          <meta name="twitter:title" content="ISO 27001 Gap Analysis Template — Free Excel & PDF Download" />
          <meta name="twitter:description" content="Free ISO 27001:2022 gap analysis template: clauses 4–10 plus all 93 Annex A controls, with status, severity, evidence, and remediation columns. Excel and PDF." />
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
                  <h1 className="h1">ISO 27001 Gap Analysis Template — Free Excel &amp; PDF</h1>
                  <div className="text-gray-400 text-center mt-4">25/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="ISO 27001 gap analysis template — shield, checklist, and progress indicators"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      A <strong>gap analysis</strong> is the first real deliverable of an ISO/IEC 27001 program: the document that maps where your information security practices stand today against what the standard requires, so you can build a prioritized remediation roadmap. This free template covers <strong>all of it</strong> — the 22 management-system requirements of clauses 4–10 plus all <strong>93 Annex A controls</strong> — with the columns a working assessment actually needs: current status, gap severity, evidence, remediation action, owner, and due date.
                    </p>
                    <p className="mb-8">
                      Download it as an Excel workbook with instructions and two assessment sheets, or as a printable PDF for workshop sessions. If you'd rather answer questions than fill spreadsheets, our free <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">ISO 27001 Gap Analysis tool</Link> runs the same assessment as a guided questionnaire and produces a scored PDF report in about 10 minutes — and the <Link to="/insights/iso-27001-gap-analysis-guide/" className="text-purple-400 hover:text-purple-300 underline">step-by-step gap analysis guide</Link> explains the methodology behind the columns.
                    </p>

                    <div className="not-prose bg-gray-800 border border-purple-700/50 rounded-xl p-6 mb-10 text-left">
                      <h3 className="text-lg font-bold text-white mb-2">Download the template</h3>
                      <p className="text-sm text-gray-300 mb-4">
                        Three sheets — instructions, clauses 4–10, and the 93 Annex A controls — in Excel
                        (recommended) or a printable PDF for workshop use. No email required.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a href="/downloads/iso-27001-gap-analysis-template.xlsx" download className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
                          Excel template (.xlsx)
                        </a>
                        <a href="/downloads/iso-27001-gap-analysis-template.pdf" download className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors">
                          Printable PDF
                        </a>
                        <a href="/downloads/iso-27001-annex-a-controls.xlsx" download className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors">
                          Annex A only (.xlsx)
                        </a>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">Working aid for self-assessment — not a substitute for the ISO/IEC 27001 standard or a formal certification audit.</p>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">What's in the workbook</h2>
                    <p className="mb-6">
                      The template is organized as three sheets so the two halves of an ISO 27001 assessment stay separate — the management-system requirements auditors check first, and the Annex A control catalogue that feeds your Statement of Applicability:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Instructions</strong> — the four-step scoring convention (status → severity → evidence → remediation) so everyone rates controls the same way.</li>
                      <li><strong>Clauses 4–10</strong> — all 22 management-system requirements, from context and scope (4.x) through leadership, risk, and internal audit to improvement (10.x).</li>
                      <li><strong>Annex A Controls</strong> — all 93 controls grouped by theme: Organizational (A.5, 37), People (A.6, 8), Physical (A.7, 14), and Technological (A.8, 34).</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">The columns, and how to fill them</h2>
                    <div className="not-prose overflow-x-auto mb-10">
                      <table className="w-full text-left text-sm border border-gray-700">
                        <thead>
                          <tr className="bg-gray-800">
                            <th className="px-4 py-2 font-semibold text-gray-200 w-44">Column</th>
                            <th className="px-4 py-2 font-semibold text-gray-200">What goes in it</th>
                          </tr>
                        </thead>
                        <tbody>
                          {TEMPLATE_COLUMNS.map(([col, desc]) => (
                            <tr key={col} className="border-t border-gray-700">
                              <td className="px-4 py-2 text-purple-300 font-medium align-top">{col}</td>
                              <td className="px-4 py-2 text-gray-400 align-top">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">How to run the assessment</h2>
                    <ol className="list-decimal list-inside mb-8 space-y-2">
                      <li><strong>Scope first.</strong> Record what's in the ISMS boundary — entities, sites, systems. A gap against an out-of-scope system wastes effort; a missed in-scope system fails Stage 1.</li>
                      <li><strong>Score honestly.</strong> "Partial" is the most useful rating — it marks controls that exist but aren't documented, consistent, or evidenced. Auditors find the same gaps; better you find them first.</li>
                      <li><strong>Attach evidence as you go.</strong> A policy link, a ticket reference, a config export. Rows without evidence are where audit findings come from.</li>
                      <li><strong>Sort by gap severity → roadmap.</strong> Critical and High rows become the remediation plan; each one needs an owner and a date, not a "later".</li>
                    </ol>
                    <p className="mb-8">
                      When the Annex A sheet is scored, its rows carry straight into your <Link to="/insights/iso-27001-statement-of-applicability/" className="text-purple-400 hover:text-purple-300 underline">Statement of Applicability</Link> — the SoA adds the "applicable / justified" decision on top of the status you've already recorded. Need the controls list by itself? The <Link to="/insights/iso-27001-annex-a-controls/" className="text-purple-400 hover:text-purple-300 underline">complete Annex A controls reference</Link> has descriptions and standalone checklist downloads.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">Is this the same as a risk assessment?</h3>
                    <p className="mb-8">
                      No — they feed each other but answer different questions. A gap analysis measures your current practices against the standard's requirements; a risk assessment (clause 8.2) identifies threats to your specific assets and drives which Annex A controls you select. Do the gap analysis first to establish the baseline, then formalize the risk assessment before writing the SoA.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How long does a gap analysis take?</h3>
                    <p className="mb-8">
                      For a small team, expect one to three days: a few hours scoring clauses 4–10 with your policies in hand, a day walking the 93 Annex A controls with whoever owns each area (IT, HR, facilities), then half a day turning Critical/High gaps into a remediation plan. The online tool compresses the questionnaire part to about 10 minutes.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Do I need to assess all 93 Annex A controls?</h3>
                    <p className="mb-8">
                      Yes at the gap stage — you can't justify excluding a control you never evaluated. The template marks each one so exclusions in your SoA are decisions, not omissions. Some controls (A.5.1 policies, A.6.3 awareness) are effectively always applicable; others like A.7 physical controls may legitimately be N/A for fully remote companies — but that calls for a written justification.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Can I use the template for ISO 27001:2013?</h3>
                    <p className="mb-8">
                      It's built on the 2022 edition — 93 controls in 4 themes. If you're working from the 2013 edition (114 controls in 14 domains), most row content still maps across, but reference numbers changed; for certification work always assess against the edition on your certificate.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is the download really free?</h3>
                    <p className="mb-8">
                      Yes — no email, no account, no upsell. The files are generated on our site and served as direct downloads. The same data powers our free online tools if you'd rather work in the browser.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/iso-27001-gap-analysis-template/"
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

export default Iso27001GapTemplate;
