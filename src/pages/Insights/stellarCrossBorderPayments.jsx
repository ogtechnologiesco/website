import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-stellar-payments.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function StellarCrossBorderPayments() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>Building Cross-Border Payments on Stellar: Anchors, SEP-24, and USDC/EURC Settlement | OG Technologies EU</title>
          <meta name="description" content="How Stellar cross-border payments actually work: anchors and the SEP stack (SEP-6, SEP-24, SEP-31, SEP-38), trustlines, path payments, and USDC/EURC settlement for regulated businesses." />
          <meta name="keywords" content="Stellar cross border payments, Stellar anchors, SEP-24, SEP-6, SEP-31, Stellar USDC, EURC Stellar, Stellar remittance, path payments, trustlines, MoneyGram Access, blockchain payments" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/stellar-cross-border-payments-anchors-sep24/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/stellar-cross-border-payments-anchors-sep24/" />
          <meta property="og:title" content="Building Cross-Border Payments on Stellar: Anchors, SEP-24, and USDC/EURC Settlement" />
          <meta property="og:description" content="Anchors, the SEP stack, trustlines, and path payments — how Stellar moves money across borders in seconds for cents." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/stellar-cross-border-payments-anchors-sep24/" />
          <meta name="twitter:title" content="Building Cross-Border Payments on Stellar: Anchors, SEP-24, and USDC/EURC Settlement" />
          <meta name="twitter:description" content="Anchors, the SEP stack, trustlines, and path payments — how Stellar moves money across borders in seconds for cents." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Payments · Blockchain · Standards</div>
                  <h1 className="h1">Building Cross-Border Payments on Stellar: Anchors, SEP-24, and USDC/EURC Settlement</h1>
                  <div className="text-gray-400 text-center mt-4">03/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-2 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="Decentralized network of connected nodes — Stellar cross-border payment infrastructure"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-xs text-gray-500 mb-8">
                    Image: "Blockchain Decentralized Network Concept" by O.sediqi93, <a href="https://commons.wikimedia.org/wiki/File:Blockchain_Decentralized_Network_Concept_AFG.jpg" className="underline hover:text-gray-400" target="_blank" rel="noopener noreferrer">CC0</a>
                  </p>

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      International payments are still slow and expensive. A SWIFT wire can take days, touch multiple correspondent banks, and cost $20–50 plus FX spreads. <strong>Stellar</strong> was built to fix exactly this: an open, public network designed for issuing assets and moving value across borders with ~5-second finality and fees measured in fractions of a cent. This guide explains the architecture behind a real Stellar payment flow — the same architecture we used building <Link to="/portfolio/" className="text-purple-400 hover:text-purple-300 underline">Mozart Pay</Link>, our Stellar-based payment platform.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">How a Stellar Cross-Border Payment Flows</h2>
                    <p className="mb-8">
                      A Stellar payment doesn't send "dollars" or "euros" — those don't exist on-chain. It sends <strong>issued assets</strong>: tokens that represent a claim on fiat currency held by a regulated entity. The end-to-end flow looks like this:
                    </p>
                    <ol className="list-decimal list-inside mb-8 space-y-3">
                      <li><strong>Fiat deposit.</strong> The sender hands money to an <em>anchor</em> — a bank, money transmitter, or fintech — via bank transfer, card, or cash pickup.</li>
                      <li><strong>Token issuance.</strong> The anchor credits the sender's Stellar account with a token representing the deposit (e.g., a USD token, or natively issued USDC/EURC).</li>
                      <li><strong>On-chain transfer.</strong> The token moves to the recipient's Stellar address in ~5 seconds. If currencies differ, a <em>path payment</em> converts through the decentralized exchange and liquidity pools along the cheapest route — USD token in, EUR token out, atomically.</li>
                      <li><strong>Fiat redemption.</strong> The recipient's local anchor burns the token and pays out local currency to a bank account, mobile wallet, or cash pickup point.</li>
                    </ol>
                    <p className="mb-8">
                      The sender never touches crypto. The recipient never touches crypto. The blockchain is invisible settlement infrastructure between two regulated endpoints — which is precisely why the model works for compliant payments.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Anchors: The On/Off Ramps</h2>
                    <p className="mb-8">
                      Anchors are the connective tissue between Stellar and the traditional financial system. Each anchor is a licensed entity — a bank, EMIs, or money services business — that holds customer fiat and issues corresponding tokens on the network. Because anchors are regulated, they handle KYC, AML screening, and local payout rails. The Stellar blockchain itself doesn't know or care about your passport; the anchors enforce compliance at the edge.
                    </p>
                    <p className="mb-8">
                      A wallet integrating Stellar typically doesn't build its own anchor network — it plugs into existing ones. The question then becomes: <em>which protocol do you use to talk to the anchor?</em> That's what the SEP standards answer.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The SEP Stack: How Wallets Talk to Anchors</h2>
                    <p className="mb-8">
                      Stellar Ecosystem Proposals (SEPs) are the interoperable APIs that let any wallet work with any anchor without bespoke integration. The ones that matter for payments:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>SEP-10 — Web Authentication.</strong> How a wallet proves account ownership to an anchor before anything else happens. The anchor challenges, the wallet signs.</li>
                      <li><strong>SEP-12 — KYC API.</strong> Standardized collection of customer identity data (name, documents, photos) so anchors can run their compliance checks.</li>
                      <li><strong>SEP-24 — Hosted deposit & withdrawal.</strong> The most common retail pattern: the wallet redirects the user to an anchor-hosted web interface for the fiat leg (bank details, card entry, confirmation), then monitors status via API. Fastest to integrate; the anchor owns the UX.</li>
                      <li><strong>SEP-6 — Programmatic deposit & withdrawal.</strong> The non-interactive alternative: the wallet keeps the entire UX and calls the anchor's API directly for instructions. More work, more control — the right choice when the wallet is the product.</li>
                      <li><strong>SEP-31 — Cross-Border Payments API.</strong> Purpose-built for remittances: the sending anchor POSTs a payment to the receiving anchor with the recipient's details, and the receiving anchor handles the fiat payout. The two anchors settle on-chain between themselves.</li>
                      <li><strong>SEP-38 — Anchor RFQ.</strong> Request-for-quote API that lets the sending side lock an exchange rate before committing — essential for delivering "recipient gets exactly X" guarantees.</li>
                    </ul>
                    <p className="mb-8">
                      The practical rule of thumb: <strong>SEP-24 for hosted UX, SEP-6 for embedded UX, SEP-31 for rail-to-rail remittance</strong> — with SEP-38 layered in whenever you need firm FX quotes.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">USDC and EURC on Stellar</h2>
                    <p className="mb-8">
                      Circle issues <strong>USDC natively on Stellar</strong> (since 2021) and <strong>EURC</strong>, its euro-denominated stablecoin, on Stellar as well (since 2023). For European builders this combination is unusually convenient: EURC gives you a euro asset with a compliant, regulated issuer (Circle France, under MiCA), and USDC gives you global dollar liquidity on the same rails. A EUR→USD remittance can settle EURC → USDC through a single path payment, with both legs on regulated stablecoins.
                    </p>
                    <p className="mb-8">
                      For cash endpoints, <strong>MoneyGram Access</strong> connects Stellar wallets to MoneyGram's global retail network — users can convert USDC to physical cash (and vice versa) at agent locations without a bank account. That combination — regulated stablecoins plus cash rails — is what makes Stellar credible for financial inclusion use cases, not just fintech plumbing.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Trustlines, Path Payments, and Liquidity</h2>
                    <p className="mb-8">
                      Three protocol mechanics underpin the whole model. <strong>Trustlines</strong> are opt-in relationships between an account and an asset: before you can hold USDC issued on Stellar, your account explicitly trusts that issuer — a small but important safety property, since it prevents unsolicited token spam and makes liabilities explicit. <strong>Path payments</strong> bundle conversion into the transfer itself: the sender says "send X of asset A so recipient gets Y of asset B," and the protocol routes through order books and AMM liquidity pools in one atomic operation — either the whole thing settles or nothing does. <strong>Fees and finality</strong> are effectively negligible: a base fee of 100 stroops (0.00001 XLM — a fraction of a cent) and ledger close every ~5 seconds, with deterministic finality. There is no "probably confirmed" state.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Issuer Controls for Regulated Assets</h2>
                    <p className="mb-8">
                      Stellar's asset model was designed for issuers that answer to regulators. An asset issuer can set flags that give real control without breaking decentralization:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>Authorization required</strong> — accounts can only hold the asset after the issuer approves their trustline, enabling KYC-gated assets.</li>
                      <li><strong>Revocable authorization</strong> — the issuer can freeze an account's ability to transact the asset, supporting sanctions and fraud response.</li>
                      <li><strong>Clawbacks</strong> — the issuer can pull tokens back from an account, which regulated stablecoin issuers require for court orders, fraud recovery, and mistaken issuance.</li>
                    </ul>
                    <p className="mb-8">
                      These controls are why regulated entities like Circle and licensed anchors are willing to issue on a public network at all. If you're evaluating networks for a regulated payment product, our <Link to="/tools/blockchain-compliance-checker/" className="text-purple-400 hover:text-purple-300 underline">Blockchain Compliance Checker</Link> maps your network, use case, and jurisdiction against frameworks like MiCA, DORA, and the FATF Travel Rule.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">What We Learned Building on Stellar</h2>
                    <p className="mb-8">
                      We've been part of this ecosystem for a while — our team attended <Link to="/blog/meridian-2024-highlights/" className="text-purple-400 hover:text-purple-300 underline">Meridian 2024 in London</Link>, and we built <Link to="/portfolio/" className="text-purple-400 hover:text-purple-300 underline">Mozart Pay</Link> on Stellar with Circle USDC/EURC settlement. A few lessons that don't appear in the docs: choose your anchor strategy before your UX, because the anchor's coverage map defines your corridors; design for SEP-38 quotes early if you promise exact received amounts; and treat trustline setup as part of onboarding UX — users won't understand why they need one, so make it invisible.
                    </p>
                    <p className="mb-8">
                      The bigger picture: payment networks are converging on regulated, interoperable rails — the same standards-driven transformation playing out in <Link to="/insights/iso-20022-migration-guide/" className="text-purple-400 hover:text-purple-300 underline">ISO 20022 messaging</Link> and <Link to="/insights/dora-crypto-web3-compliance/" className="text-purple-400 hover:text-purple-300 underline">DORA compliance</Link>. Stellar's bet is that open infrastructure plus regulated endpoints beats both closed bank networks and unregulated crypto. For cross-border payments, it's a bet that's increasingly hard to argue against.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What is a Stellar anchor?</h3>
                    <p className="mb-8">
                      An anchor is a regulated financial entity — a bank, e-money institution, or money transmitter — that bridges fiat currency and the Stellar network. It accepts fiat deposits, issues corresponding tokens on-chain, and redeems tokens back into fiat. Anchors handle KYC/AML at the edges so the network itself stays neutral.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between SEP-6 and SEP-24?</h3>
                    <p className="mb-8">
                      Both handle fiat deposits and withdrawals through anchors. SEP-24 is <em>hosted</em>: the wallet opens an anchor-provided web interface where the user completes the fiat step. SEP-6 is <em>programmatic</em>: the wallet builds its own UX and calls the anchor's API directly. Use SEP-24 for speed of integration, SEP-6 when you want full control of the user experience.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is a trustline on Stellar?</h3>
                    <p className="mb-8">
                      A trustline is an explicit opt-in between a Stellar account and a specific issued asset. Your account can't hold USDC, EURC, or any other non-native asset until it trusts the issuer — which prevents unsolicited tokens and makes each asset relationship deliberate. Native XLM doesn't require trustlines.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Does Stellar support euro payments?</h3>
                    <p className="mb-8">
                      Yes. Circle's EURC — a fully reserved, MiCA-compliant euro stablecoin — is issued natively on Stellar. Combined with USDC and anchor fiat rails, it enables EUR↔USD cross-border flows entirely on regulated assets.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How fast and how cheap are Stellar payments?</h3>
                    <p className="mb-8">
                      Ledgers close roughly every 5 seconds with deterministic finality — no confirmation waiting game. The base transaction fee is 0.00001 XLM (100 stroops), a fraction of a cent. Real-world cost is dominated by anchor deposit/withdrawal fees and FX spreads, not the network itself.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/stellar-cross-border-payments-anchors-sep24/"
                    categories={['Payments', 'Blockchain', 'Standards']}
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

export default StellarCrossBorderPayments;
