import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-iso24874-stellar-sdg.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Iso24874StellarSdg() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>Measuring SDG Impact on Stellar: ISO 24874 KPIs, Benchmarking and Reporting | OG Technologies EU</title>
          <meta name="description" content="A whitepaper-style guide to ISO/DPAS 24874 — the draft ISO/TC 307 framework for smart contracts and the SDGs — and how to apply its KPI catalogue, maturity benchmarking, and SDG alignment methodology to Stellar-based solutions." />
          <meta name="keywords" content="ISO 24874, ISO DPAS 24874, ISO TC 307, SDG blockchain, Stellar SDG impact, Soroban smart contracts, SDG KPIs, impact measurement, ESG blockchain reporting, StellarCarbon, carbon credits Stellar, UNDP Stellar, financial inclusion blockchain" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/iso-24874-stellar-sdg-impact/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/iso-24874-stellar-sdg-impact/" />
          <meta property="og:title" content="Measuring SDG Impact on Stellar: ISO 24874 KPIs, Benchmarking and Reporting" />
          <meta property="og:description" content="How to apply the ISO/DPAS 24874 draft framework — KPI catalogue, maturity benchmarking, SDG alignment methodology — to measure and report the sustainability impact of Stellar-based solutions." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/iso-24874-stellar-sdg-impact/" />
          <meta name="twitter:title" content="Measuring SDG Impact on Stellar: ISO 24874 KPIs, Benchmarking and Reporting" />
          <meta name="twitter:description" content="How to apply the ISO/DPAS 24874 draft framework to measure and report SDG impact of Stellar-based solutions." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Blockchain · Standards · Sustainability</div>
                  <h1 className="h1">Measuring SDG Impact on Stellar: ISO 24874 KPIs, Benchmarking and Reporting</h1>
                  <div className="text-gray-400 text-center mt-4">22/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-2 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="KPI dashboard over a Stellar network constellation — measuring SDG impact with ISO 24874"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-xs text-gray-500 mb-8">
                    Illustration: OG Technologies EU — ISO/DPAS 24874 KPI panel mapped to the 17 UN Sustainable Development Goals.
                  </p>

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      "Blockchain for good" is easy to claim and hard to evidence. When a funder, procurement team, or ESG auditor asks a Stellar-based project what it actually delivered — how many previously unbanked users gained access, how many tonnes of CO₂ were verifiably retired, what each verified outcome cost — a narrative about financial inclusion is not an answer. <strong>ISO/DPAS 24874</strong>, a Draft Publicly Available Specification from ISO/TC 307 (Blockchain and distributed ledger technologies), is the emerging measurement layer: a KPI framework for evaluating smart contracts deployed in SDG-oriented applications, a maturity benchmarking model, and an alignment methodology that forces every impact claim through an auditable chain. This article maps that framework onto Stellar — its ledger telemetry, Soroban smart contracts, and real ecosystem deployments — so enterprises can measure and report SDG impact the way ISO intends it to be done.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The Context: Stellar's SDG Trajectory</h2>
                    <p className="mb-8">
                      We saw the narrative side of this story first-hand at <Link to="/blog/meridian-2024-highlights/" className="text-purple-400 hover:text-purple-300 underline">Meridian 2024 in London</Link>: Soroban smart contracts, Stellar Aid Assist, asset tokenization, and a community explicitly oriented toward financial inclusion — themes that align with SDG 1 (No Poverty) and SDG 8 (Decent Work and Economic Growth). Since then the ecosystem has moved from narrative to deployment:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li>The <a href="https://stellar.org/press/united-nations-development-programme-and-stellar-development-foundation-join-forces-to-advance-blockchain-solutions-for-financial-inclusion" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">UNDP–Stellar Development Foundation partnership</a> (announced January 2025, extended July 2026) researched digital payments across seventeen countries and ran live pilots in Haiti, Syria, Kenya, Guatemala, and The Gambia. In Aleppo, UNDP delivered Cash-for-Work stipends digitally with every transaction recorded on-chain — cutting the estimated cost of distribution from roughly 10 percent of funds under conventional channels.</li>
                      <li>The <a href="https://innovation.eurasia.undp.org/initiatives/alternative-finance-lab/sdg-blockchain-accelerator/" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">UNDP SDG Blockchain Accelerator</a>, run by the Alternative Finance Lab with SDF as a partner, matched Stellar-based solutions against real UN programme challenges — 46 implementation-ready solutions graduated across the first two cohorts, spanning digital payments, digital identity, traceability, and responsible data use.</li>
                      <li>Climate tooling arrived on the network too: <a href="https://stellarcarbon.io/" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">StellarCarbon</a> issues CARBON, a Stellar asset where each token represents one Verra Verified Carbon Unit (VCU), with retirements executed in the Verra Registry and mirrored on Stellar for public auditability.</li>
                    </ul>
                    <p className="mb-8">
                      The deployments now exist. What most of them still lack is a standardized way to state — and defend — their SDG contribution. That is precisely the gap ISO/DPAS 24874 addresses.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">ISO/DPAS 24874 at a Glance</h2>
                    <p className="mb-8">
                      ISO/DPAS 24874 — <em>Guidance on the use of smart contracts in contributing to the Sustainable Development Goals (SDGs)</em> — is a draft specification developed within ISO/TC 307. One important caveat up front: <strong>it is a draft, not a published standard</strong>. Its clause numbers and KPI identifiers may evolve before publication, so treat it as a reference framework and version your reports against the edition you used. The draft supports three decisions: whether a smart-contract approach is appropriate for an SDG use case; how to design, deploy, and govern such systems; and how to evaluate them against defined KPIs and benchmarking criteria.
                    </p>
                    <p className="mb-8">For enterprise readers, the clauses that matter most:</p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>Clause 5 — Summary for decision-makers.</strong> The ten-minute read for sponsors and policymakers.</li>
                      <li><strong>Clause 9 — KPI framework.</strong> A five-dimension KPI catalogue with measurement approaches, a metadata template, and explicit anti-gaming guidance.</li>
                      <li><strong>Clause 10 — Benchmarking framework.</strong> A five-level maturity model, scoring and comparability rules, and the SDG alignment methodology in 10.6.</li>
                      <li><strong>Clause 11 — SDG-oriented oracles.</strong> Design, security (aligned to ISO/IEC 27001), and integration principles for the external data feeds your impact claims depend on.</li>
                      <li><strong>Clauses 12–13 — Energy and climate-friendly design.</strong> How to account for DLT energy consumption and reduce it in contract design.</li>
                      <li><strong>Clause 14 — Supply chain visibility.</strong> Traceability guidance relevant to SDG 12 reporting.</li>
                    </ul>
                    <p className="mb-8">
                      The draft's posture is deliberately sober: its own use-case tables mark claims as "intended to contribute to" with the recurring note that <em>attribution has not been established</em>. If you adopt the framework, adopt that discipline too — it is what separates impact reporting from greenwashing.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The KPI Framework: Five Dimensions Mapped to Stellar</h2>
                    <p className="mb-8">
                      Clause 9 organizes KPIs into five dimensions: <strong>technical performance</strong>, <strong>security and oracle integrity</strong>, <strong>governance and compliance</strong>, <strong>energy and environmental impact</strong>, and <strong>SDG impact</strong>. Each KPI is expected to have a clear formula, unit, data source, baseline, target, and an owner — documented through the metadata template described below. The table below maps representative catalogue entries to where the data actually lives on Stellar.
                    </p>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-sm border border-gray-700">
                        <thead>
                          <tr>
                            <th className="text-left p-3 border-b border-gray-700">KPI</th>
                            <th className="text-left p-3 border-b border-gray-700">What it measures</th>
                            <th className="text-left p-3 border-b border-gray-700">Stellar data source</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="p-3 font-mono text-purple-300">T-01</td><td className="p-3">Execution success rate</td><td className="p-3">Horizon transaction result codes; Soroban diagnostic events for failed invocations</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">T-02</td><td className="p-3">Mean time to finality</td><td className="p-3">Ledger close (~5 s) via Horizon/node telemetry — deterministic finality, no confirmation window</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">T-04</td><td className="p-3">Resource consumption per execution</td><td className="p-3">Soroban resource metering: CPU instructions, ledger read/write entries, fee per invocation</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">T-05</td><td className="p-3">Cost per verified outcome</td><td className="p-3">On-chain fees (100 stroops base fee) + off-chain operating cost ÷ verified outcomes per period</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">O-01 / O-02</td><td className="p-3">Oracle freshness and mismatch rate</td><td className="p-3">Lag between source event (e.g., registry retirement, IoT reading) and on-chain update; cross-checks against an independent source</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">G-01 / G-02</td><td className="p-3">Upgrade timelock compliance; dispute rate</td><td className="p-3">Governance logs and contract upgrade history; dispute records per reporting period</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">E-01 / E-02</td><td className="p-3">Energy and carbon per transaction</td><td className="p-3">Node metering and network estimates — Stellar's SCP is federated BFT, no mining; document boundary and grid intensity (ISO 14064-1 method)</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">SDG-01</td><td className="p-3">Verified GHG emissions avoided/reduced (tCO₂e)</td><td className="p-3">MRV provider — e.g., Verra VCU retirements mirrored on-chain via StellarCarbon's CARBON asset</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">SDG-04</td><td className="p-3">Beneficiaries reached</td><td className="p-3">Service delivery records — disbursement recipients, aid program enrolment (off-chain, privacy-respecting)</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">SDG-05</td><td className="p-3">Financial inclusion: previously unbanked/underbanked users gaining access</td><td className="p-3">Anchor onboarding and KYC records correlated with first-transaction data</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">SDG-06</td><td className="p-3">Supply chain traceability coverage</td><td className="p-3">Share of products with complete chain-of-custody records on the ledger</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-8">
                      Two properties make Stellar unusually well-suited to this framework. First, <strong>the ledger is the telemetry</strong>: fees, finality, execution results, and asset movements are natively recorded, so technical KPIs come from the same source of truth as the impact claims — no separate instrumentation layer to audit. Second, <strong>Soroban's resource metering</strong> gives a per-execution cost in instructions and ledger I/O, which maps directly onto T-04 and feeds the efficiency side of the energy discussion in Clause 12.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The SDG Alignment Methodology (10.6): Two Worked Examples</h2>
                    <p className="mb-8">
                      Clause 10.6 requires every claimed SDG contribution to be documented as a chain: <strong>Activity → Output → Outcome → SDG target → Indicator → Data source → Verification method → Baseline → Target → Attribution → Assumptions</strong>. If you cannot fill a link, you do not have a claim yet. Here is the chain applied to the two most common Stellar patterns.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Example A — Humanitarian disbursement</h3>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-sm border border-gray-700">
                        <tbody>
                          <tr><td className="p-3 font-mono text-purple-300 w-40">Activity</td><td className="p-3">A Soroban contract releases USDC to verified recipients when programme conditions are confirmed by an oracle</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Output</td><td className="p-3">Disbursements settle on-chain with immutable receipts; distribution cost falls versus conventional channels (~10% baseline in the Aleppo Cash-for-Work pilot)</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Outcome</td><td className="p-3">Recipients gain reliable access to funds and, for many, a first transaction account</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">SDG target</td><td className="p-3">1.4 (equal rights to economic resources and financial services), 8.10 (capacity of domestic financial institutions to expand access)</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Indicator</td><td className="p-3">UN Global Indicator Framework indicators for 1.4 / 8.10 — e.g., proportion of adults with access to a transaction account</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Data source</td><td className="p-3">On-chain: Horizon disbursement records. Off-chain: anchor onboarding/KYC, programme M&amp;E records</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Verification</td><td className="p-3">Third-party programme audit; cross-verification of recipient counts against enrolment data</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Attribution</td><td className="p-3"><em>Direct</em> for the disbursement rail and its cost reduction; <em>enabling</em> for longer-term financial-inclusion outcomes</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-8">
                      Note the honesty in the attribution row — and note that the draft's own financial-inclusion use case maps to exactly these targets (1.4 and 8.10), which is the same linkage the UNDP–SDF work claims. When your chain lands on the same targets the standards authors used, you are on well-trodden ground.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Example B — Carbon sinking via StellarCarbon</h3>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-sm border border-gray-700">
                        <tbody>
                          <tr><td className="p-3 font-mono text-purple-300 w-40">Activity</td><td className="p-3">An enterprise sinks CARBON tokens — via stellarcarbon.io directly or through an integrated application such as the <a href="https://github.com/mozartpay/OAs" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">MozartPay Orchestrated Agreements CLI</a>, which exposes StellarCarbon offset integration alongside its payment and ISO 20022 reporting flows</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Output</td><td className="p-3">CARBON is sunk on Stellar; the corresponding VCUs are retired in the Verra Registry and mirrored on-chain</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Outcome</td><td className="p-3">Verified tonnes of CO₂ are compensated — each CARBON maps 1:1 to a Verra VCU from a vetted project (currently a REDD+ initiative in Peru, certified VCS + CCB-Gold)</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">SDG target</td><td className="p-3">SDG 13 (Climate action); co-benefits support targets under SDG 15 (life on land)</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Indicator</td><td className="p-3">tCO₂e retired (KPI SDG-01), with project-level co-benefit documentation</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Data source</td><td className="p-3">Verra Registry (the MRV layer) + Stellar ledger mirror (public audit trail)</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Verification</td><td className="p-3">Registry retirement is third-party verification by construction; the on-chain mirror lets any auditor reconcile independently</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">Attribution</td><td className="p-3"><em>Direct</em> for retired tonnes. Double counting is structurally prevented: retirement in Verra means the unit cannot be resold or re-claimed</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">Benchmarking Maturity: From Pilot to Optimised</h2>
                    <p className="mb-8">
                      Clause 10 defines a five-level maturity model. Most Stellar sustainability pilots today sit at Level 2 — KPIs named in a slide deck, no consistent measurement. Climbing the ladder is mostly process, not technology:
                    </p>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-sm border border-gray-700">
                        <thead>
                          <tr>
                            <th className="text-left p-3 border-b border-gray-700">Level</th>
                            <th className="text-left p-3 border-b border-gray-700">Designation</th>
                            <th className="text-left p-3 border-b border-gray-700">What it takes to get there</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="p-3 font-mono text-purple-300">1</td><td className="p-3">Emerging</td><td className="p-3">Ad hoc practices; no defined KPIs — "we help financial inclusion" as an assertion</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">2</td><td className="p-3">Identified</td><td className="p-3">KPIs defined but inconsistently measured; no baselines — the typical pilot stage</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">3</td><td className="p-3">Defined</td><td className="p-3">KPIs consistently measured; baselines and targets established; governance framework in place — where the UNDP pilots' documented, on-chain evidence points</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">4</td><td className="p-3">Operational</td><td className="p-3">KPIs drive decisions; independent verification; continuous improvement loop</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">5</td><td className="p-3">Optimised</td><td className="p-3">Benchmarked against industry standards; predictive analytics; full assurance</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-8">
                      The draft is strict about comparability: composite scores and cross-project comparisons are only valid when the system boundary, measurement period, normalisation basis, data sources, and verification quality are equivalent — and material differences must be documented. A "Level 4" claim from a project whose boundary quietly excludes its oracle layer means nothing.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Oracles, Energy, and Climate-Friendly Design</h2>
                    <p className="mb-8">
                      Clause 11 treats oracles as first-class risk: your SDG claim is only as good as the external data feeding it. The guidance calls for decentralized or redundant oracle sources, cryptographic authenticity, ISO/IEC 27001-grade operational security, multi-oracle cross-verification, and explicit timeout/fallback handling — all measurable through the O-series KPIs (freshness, mismatch rate, uptime). StellarCarbon's architecture is a useful reference pattern here: Verra functions as the MRV oracle, and the on-chain mirror converts a trusted-registry claim into a publicly auditable record — exactly the "cross-verification against an independent source" the O-02 KPI rewards.
                    </p>
                    <p className="mb-8">
                      On energy (Clause 12), the draft identifies four consumption sources — node storage, computation/consensus, inter-node communication, and oracle integration — and recommends event-driven oracle patterns (publish-subscribe, request-response) over always-on listeners. Stellar starts from a strong position: the Stellar Consensus Protocol is federated Byzantine agreement, not proof-of-work, so consensus energy is orders of magnitude below PoW networks. But <em>low</em> is not <em>zero</em>: E-01 and E-02 still require you to document the measurement boundary and carbon intensity assumptions. Clause 13's climate-friendly design guidance — efficient contract code, upgradeable architectures, off-chain computation, embedded climate incentives — reads almost as a description of Soroban's resource-metered design; and where residual footprint remains, the same ecosystem offers the offset mechanism via StellarCarbon.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Reporting: The KPI Metadata Template</h2>
                    <p className="mb-8">
                      The draft defines a metadata template every reported KPI should carry: name, ID, definition, formula, unit, direction of improvement, data sources, measurement frequency, baseline, target, threshold, owner, verification method, limitations and assumptions, and SDG linkage. Reports should be machine-readable where feasible, and include corrective actions taken when thresholds were breached. A minimal Stellar-flavoured record looks like this:
                    </p>
                    <pre className="bg-gray-800 rounded-lg p-4 mb-8 overflow-x-auto text-sm text-gray-300">
{`{
  "kpiId": "SDG-01",
  "kpiName": "Verified GHG emissions avoided or reduced",
  "unit": "tCO2e",
  "formula": "sum(vcus_retired_in_period)",
  "directionOfImprovement": "higher",
  "dataSources": ["verra_registry", "stellar_horizon:carbon_sink_txs"],
  "measurementFrequency": "monthly",
  "baseline": "0 tCO2e (pre-deployment)",
  "target": "1200 tCO2e FY2027",
  "verificationMethod": "Verra registry retirement + on-chain mirror audit",
  "sdgLinkage": { "goal": 13, "targets": ["13.2"], "attribution": "direct" },
  "limitations": "Co-benefit claims (SDG 15) not independently verified"
}`}
                    </pre>
                    <p className="mb-8">
                      A practical rollout sequence: pick the SDG targets you plausibly contribute to; run the 10.6 chain for each claim; select KPIs from the catalogue and fill the metadata template; fix baselines <em>before</em> deployment; instrument Horizon/Soroban telemetry plus your off-chain sources; then layer verification — internal consistency checks first, independent cross-verification second, third-party assurance where the audience (funders, regulators, ESG auditors) demands it.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Limitations and Honest Caveats</h2>
                    <p className="mb-8">
                      The draft is unusually candid about failure modes, and your reporting should be too:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>Goodhart's law.</strong> A KPI wired to incentives — token rewards, credits, funding tranches — stops being a measure and becomes a target to game. Use multiple complementary KPIs, independent verification, and anomaly detection.</li>
                      <li><strong>Attribution, additionality, double counting.</strong> Would the outcome have happened anyway? Is another project claiming the same beneficiaries or the same tonnes? Where attribution cannot be established, report "contributing to," never "achieving." Registry-anchored designs like StellarCarbon's solve the double-counting problem structurally; most other claim types have to solve it procedurally.</li>
                      <li><strong>Data quality disclosure.</strong> State what proportion of your KPI data is directly measured versus estimated, coverage completeness, and the uncertainty in your estimates.</li>
                      <li><strong>Oracle trust assumptions.</strong> Document provider identity, update frequency, verification method, failure consequences, and fallbacks — an SDG KPI fed by a single unaudited API is an assertion, not a metric.</li>
                      <li><strong>Draft status.</strong> DPAS documents can change during ballot and adoption. Pin the edition you used in every report, and expect catalogue codes to be renumbered before final publication.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Where This Leaves Stellar Builders</h2>
                    <p className="mb-8">
                      The combination is compelling: a public ledger whose native telemetry answers the technical KPI questions for free, a smart-contract platform with per-execution resource metering, an ecosystem running real SDG pilots with the UN, registry-grade MRV for climate claims via StellarCarbon — and now an ISO draft supplying the measurement grammar that ties it together for enterprise and public-sector audiences. The projects that adopt the framework early will find SDG reporting becomes a by-product of their architecture rather than a quarterly archaeology exercise.
                    </p>
                    <p className="mb-8">
                      We build in this space: <Link to="/portfolio/mozart-pay/" className="text-purple-400 hover:text-purple-300 underline">Mozart Pay</Link> is our Stellar-based payment platform, and the <Link to="/portfolio/stellar-go-cli/" className="text-purple-400 hover:text-purple-300 underline">Stellar Go CLI</Link> (the <a href="https://github.com/mozartpay/OAs" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">OAs repository</a>) already couples DID-attested payments with StellarCarbon offsets and ISO 20022 reporting — the same pattern of pairing transaction rails with audit-grade records that this article describes. If you are designing an SDG-oriented Stellar deployment and want the measurement layer engineered in from the start, <Link to="/quote/" className="text-purple-400 hover:text-purple-300 underline">talk to us</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What is ISO/DPAS 24874?</h3>
                    <p className="mb-8">
                      A Draft Publicly Available Specification under development by ISO/TC 307 (Blockchain and distributed ledger technologies) titled "Guidance on the use of smart contracts in contributing to the Sustainable Development Goals." It provides a KPI framework for evaluating smart contracts, a five-level benchmarking maturity model, an SDG alignment methodology, and guiding principles for SDG-oriented oracles, energy accounting, and climate-friendly contract design.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is ISO 24874 a published standard?</h3>
                    <p className="mb-8">
                      Not yet — DPAS denotes a draft at the Publicly Available Specification stage, still subject to ballot and revision within ISO/TC 307. It is usable today as a reference framework for structuring impact measurement, but treat clause and KPI identifiers as provisional and record the draft edition your reporting is based on.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How does StellarCarbon map to the ISO 24874 KPIs?</h3>
                    <p className="mb-8">
                      Sinking CARBON tokens corresponds to retiring Verra Verified Carbon Units — a direct fit for KPI SDG-01 (verified GHG emissions avoided or reduced, in tCO₂e). Verra acts as the MRV/oracle layer, the on-chain mirror provides public auditability, and registry retirement structurally prevents double counting. Its project co-benefits (REDD+ forest protection in Peru, VCS + CCB-Gold certified) can support SDG 15 linkages where verified.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Which SDG targets do Stellar payment solutions typically support?</h3>
                    <p className="mb-8">
                      Most commonly 1.4 (equal access to economic resources and financial services) and 8.10 (expanding access to banking and financial services) — the same targets the ISO draft assigns to its own financial-inclusion use case — plus 10.c for remittance-cost reduction. Climate-oriented deployments add SDG 13, and transparency architectures can support 16.6/16.10-style accountability claims and SDG 17 partnership objectives.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What does "attribution" mean in SDG impact reporting?</h3>
                    <p className="mb-8">
                      Attribution describes the causal link between your system and the outcome: direct (the system caused it, e.g., disbursements it executed), indirect (it contributed alongside other factors), or enabling (it created conditions for an outcome others deliver). ISO 24874 requires claims to be qualified as "contributing to" an SDG target whenever attribution cannot be established with confidence — the single most important anti-greenwashing rule in the framework.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/iso-24874-stellar-sdg-impact/"
                    categories={['Blockchain', 'Standards', 'Sustainability']}
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

export default Iso24874StellarSdg;
