import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-iso27001-gap.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Iso27001GapAnalysisGuide() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>ISO 27001 Gap Analysis: A Step-by-Step Guide with Free Assessment Tool | OG Technologies EU</title>
          <meta name="description" content="How to run an ISO 27001 gap analysis: scope, clause-by-clause assessment, scoring, remediation roadmap, and a PDF report. Includes a free browser-based gap assessment tool." />
          <meta name="keywords" content="ISO 27001 gap analysis, ISO 27001 gap assessment, gap analysis checklist, ISMS gap analysis, ISO 27001 compliance assessment, gap analysis report pdf, ISO 27001 readiness" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/iso-27001-gap-analysis-guide/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/iso-27001-gap-analysis-guide/" />
          <meta property="og:title" content="ISO 27001 Gap Analysis: A Step-by-Step Guide" />
          <meta property="og:description" content="Scope, assess, score, and remediate — a practical ISO 27001 gap analysis workflow with a free assessment tool that generates a PDF report." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/iso-27001-gap-analysis-guide/" />
          <meta name="twitter:title" content="ISO 27001 Gap Analysis: A Step-by-Step Guide" />
          <meta name="twitter:description" content="Scope, assess, score, and remediate — a practical ISO 27001 gap analysis workflow with a free assessment tool." />
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
                  <h1 className="h1">ISO 27001 Gap Analysis: A Step-by-Step Guide</h1>
                  <div className="text-gray-400 text-center mt-4">26/09/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-2 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="Padlock representing information security controls — ISO 27001 gap analysis"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-xs text-gray-500 mb-8">
                    Image: "Internet Security Padlock" by mikemacmarketing, <a href="https://commons.wikimedia.org/wiki/File:Internet_Security_Padlock_for_VPN_%26_Online_Privacy.jpg" className="underline hover:text-gray-400" target="_blank" rel="noopener noreferrer">CC BY 2.0</a>
                  </p>

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      A <strong>gap analysis</strong> is the standard first move toward ISO 27001 certification: a structured comparison between what your information security management system (ISMS) looks like today and what the standard requires. Done properly, it produces the three artifacts every certification project needs — a clause-by-clause compliance score, a prioritized remediation roadmap, and a realistic timeline estimate.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Gap Analysis vs. Risk Assessment vs. Internal Audit</h2>
                    <p className="mb-8">
                      These three exercises are often confused, but they answer different questions:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Gap analysis</strong> — "How far are we from meeting the standard?" Done before implementation, usually once.</li>
                      <li><strong>Risk assessment</strong> — "What could go wrong, and which controls treat which risks?" A mandatory ISO 27001 clause (6.1.2) that feeds the Statement of Applicability.</li>
                      <li><strong>Internal audit</strong> — "Does our implemented ISMS actually work?" A recurring clause 9.2 requirement once the system exists.</li>
                    </ul>
                    <p className="mb-8">
                      The gap analysis comes first: it tells you whether you need a full ISMS build-out or a targeted remediation effort, and it scopes the risk assessment that follows.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The Five Steps of an ISO 27001 Gap Analysis</h2>
                    <ol className="list-decimal list-inside mb-8 space-y-3">
                      <li><strong>Define the scope.</strong> Which business units, systems, and locations are in? Scope creep is the most common reason gap analyses stall — be explicit about what is out of scope.</li>
                      <li><strong>Inventory the current state.</strong> Collect existing policies, procedures, org charts, contracts, technical configurations, and prior audit findings. You cannot score what you haven't documented.</li>
                      <li><strong>Assess clause by clause.</strong> Work through clauses 4–10 (context, leadership, planning, support, operation, performance evaluation, improvement) and the Annex A controls. For each requirement, mark it implemented, partially implemented, or absent — and record the evidence.</li>
                      <li><strong>Score and prioritize.</strong> Convert findings into a compliance percentage per clause, then rank gaps by certification impact and remediation effort. Not every gap is equal: a missing risk assessment methodology blocks certification; a lightly documented supplier policy does not.</li>
                      <li><strong>Build the remediation roadmap.</strong> Sequence the fixes, assign owners, and set dates. This roadmap is what turns a gap analysis from a report into a project plan.</li>
                    </ol>

                    <h2 className="h2 mb-4 text-gray-100">What a Good Gap Analysis Report Contains</h2>
                    <p className="mb-8">
                      Whether the assessment is done by a consultant or in-house, the deliverable should include: an executive summary for leadership, a clause-by-clause maturity score, an evidence log for each rating, the prioritized remediation list, and a rough effort estimate. Auditors and management both read these reports — a PDF export you can circulate and archive matters more than a spreadsheet that lives on one laptop.
                    </p>
                    <p className="mb-8">
                      Our <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">free ISO 27001 Gap Assessment tool</Link> walks you through the clauses and Annex A controls in a structured questionnaire, scores your compliance percentage per area, and generates a <strong>PDF report</strong> you can share with leadership — entirely in your browser, so no security data leaves your machine.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">DIY or Consultant?</h2>
                    <p className="mb-8">
                      For small teams with a modern SaaS stack, a structured self-assessment is usually sufficient for a first pass — you know where your skeletons are. Bring in a consultant when the scope spans multiple entities, when you need an independent baseline for the board, or when the gap analysis will directly feed a certified audit within 6 months. Either way, running a self-assessment first makes the paid work cheaper and faster.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">After the Gap Analysis</h2>
                    <p className="mb-8">
                      The natural next steps: conduct the formal risk assessment, draft the Statement of Applicability, close the priority gaps, then schedule internal audit and management review (clauses 9.2/9.3) before certification. If your organization also handles AI systems, consider running our <Link to="/tools/iso-42001-ai-readiness/" className="text-purple-400 hover:text-purple-300 underline">ISO/IEC 42001 AI Readiness Assessment</Link> in parallel — the management-system scaffolding largely overlaps, and our <Link to="/insights/iso-42001-ai-management-guide/" className="text-purple-400 hover:text-purple-300 underline">ISO 42001 implementation guide</Link> explains how the two standards complement each other.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">How long does an ISO 27001 gap analysis take?</h3>
                    <p className="mb-8">
                      A focused self-assessment takes 2–4 hours with a structured questionnaire. A consultant-led analysis for a mid-size company typically runs 2–4 weeks including document review and interviews.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between a gap analysis and a gap assessment?</h3>
                    <p className="mb-8">
                      The terms are used interchangeably. "Gap analysis" emphasizes the comparison methodology; "gap assessment" emphasizes the scoring deliverable. Both measure distance from ISO 27001 conformity.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Do I need a gap analysis before certification?</h3>
                    <p className="mb-8">
                      It is not a formal requirement, but skipping it is the most common cause of failed Stage 1 audits. Certification bodies expect you to arrive with a working ISMS — the gap analysis is how you find out whether you have one.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Can I get a gap analysis report as a PDF?</h3>
                    <p className="mb-8">
                      Yes. Our <Link to="/tools/iso-27001-gap-analysis/" className="text-purple-400 hover:text-purple-300 underline">ISO 27001 Gap Assessment tool</Link> generates a downloadable PDF report with per-clause scores and remediation priorities, free and browser-based.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/iso-27001-gap-analysis-guide/"
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

export default Iso27001GapAnalysisGuide;
