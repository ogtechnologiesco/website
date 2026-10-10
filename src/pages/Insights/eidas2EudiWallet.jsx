import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-eudi-wallet.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Eidas2EudiWallet() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>eIDAS 2.0 and the EUDI Wallet: What Businesses Need to Know Before the Rollout | OG Technologies EU</title>
          <meta name="description" content="eIDAS 2.0 (Regulation (EU) 2024/1183) introduces the European Digital Identity Wallet. What it contains, which businesses must accept it, how it relates to verifiable credentials and EBSI, and what to prepare now." />
          <meta name="keywords" content="eIDAS 2.0, EUDI Wallet, European Digital Identity Wallet, eIDAS regulation, verifiable credentials, PID, QEAA, OpenID4VP, digital identity EU, eIDAS 2.0 requirements, EUDI wallet business" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/eidas2-eudi-wallet/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/eidas2-eudi-wallet/" />
          <meta property="og:title" content="eIDAS 2.0 and the EUDI Wallet: What Businesses Need to Know Before the Rollout" />
          <meta property="og:description" content="What the EUDI Wallet contains, which businesses must accept it, how it relates to verifiable credentials and EBSI, and what to prepare now." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/eidas2-eudi-wallet/" />
          <meta name="twitter:title" content="eIDAS 2.0 and the EUDI Wallet: What Businesses Need to Know" />
          <meta name="twitter:description" content="What the EUDI Wallet contains, which businesses must accept it, and what to prepare before the rollout." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Compliance · Standards · Blockchain</div>
                  <h1 className="h1">eIDAS 2.0 and the EUDI Wallet: What Businesses Need to Know Before the Rollout</h1>
                  <div className="text-gray-400 text-center mt-4">09/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="European Digital Identity Wallet concept — EU stars surrounding a digital credential card"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      The European Union is building the largest interoperable digital identity system in the world. <strong>Regulation (EU) 2024/1183</strong> — commonly called <strong>eIDAS 2.0</strong> — entered into force in May 2024 and requires every member state to offer citizens at least one <strong>European Digital Identity Wallet (EUDI Wallet)</strong>. National wallet rollouts are underway through 2026, and businesses that authenticate customers will feel the effects well before the last country ships.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">What Changed From eIDAS 1.0?</h2>
                    <p className="mb-8">
                      The original 2014 eIDAS regulation created mutual recognition of <em>national</em> eID schemes — a German citizen could log into a Spanish government portal with their German eID. But it was government-centric: each country built its own scheme, private-sector usage was marginal, and cross-border consumer authentication never reached critical mass. eIDAS 2.0 keeps that foundation and adds three major pieces:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>The EUDI Wallet.</strong> A user-controlled app holding identity credentials — not just a login. It carries the citizen's <em>Person Identification Data</em> (PID) plus attribute attestations: driving licences, diplomas, professional qualifications, proof of age, payment credentials.</li>
                      <li><strong>Attribute attestations as trust services.</strong> New regulated services — electronic attribute attestations (EAA) and their qualified counterpart (QEAA) — let recognized issuers put verifiable claims into the wallet with legal effect across the EU.</li>
                      <li><strong>New qualified trust services.</strong> Qualified electronic ledgers, qualified electronic archiving, and electronic registered delivery are added to the existing signature, seal, and timestamp services. Electronic ledgers in particular matter for blockchain-adjacent record-keeping.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">How the Wallet Actually Works</h2>
                    <p className="mb-8">
                      The EUDI Wallet is an <em>eID means at assurance level "high"</em> — the strongest tier in the EU framework. When a user presents it, the counterparty gets cryptographic proof bound to the user's device, not a scanned document. Two properties distinguish it from every identity system businesses use today:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>Selective disclosure.</strong> A user can prove a single attribute — "over 18", "holds a valid driving licence", "authorized signatory of Company X" — without revealing name, date of birth, or anything else. For businesses this flips the data-minimization problem: you can satisfy age or entitlement checks without collecting identity documents at all.</li>
                      <li><strong>Verifiable credentials, standard plumbing.</strong> The technical rails come from the Architecture and Reference Framework (ARF): OpenID4VP for remote presentations, SD-JWT VC and ISO/IEC 18013-5 (the mobile driving licence format) as credential formats, with the W3C Digital Credentials API in the browser pipeline. Issuers write attestations in; relying parties request and verify presentations.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Who Must Act — and When</h2>
                    <p className="mb-8">
                      For citizens the wallet is <strong>voluntary</strong>. For businesses it is not entirely optional. The regulation requires <em>relying parties</em> to accept the wallet where strong user authentication is needed to identify a customer — by legal obligation or by contract — and explicitly pulls in very large online platforms under the DSA. In practice that means banks and payment providers performing KYC/AML onboarding, telecoms issuing SIMs, insurance companies, and large platforms should plan to accept wallet-based identification as it becomes available in their markets.
                    </p>
                    <p className="mb-8">
                      The timeline worth tracking: implementing acts were adopted through 2024–2025, member-state wallets roll out through 2026, and relying-party obligations follow on a transition period after the implementing acts — effectively a 2026–2028 compliance window depending on sector and member state. Each country implements through its own notification and certification regime, so the rollout will be uneven.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">From EBSI to the EUDI Wallet</h2>
                    <p className="mb-8">
                      If you followed the European Blockchain Services Infrastructure, much of this will look familiar. EBSI piloted exactly these primitives — verifiable credentials, trusted issuer registries, trust-chain verification — across EU member states, which is the work we covered in our post on <Link to="/blog/ebsi-verifiable-credentials/" className="text-purple-400 hover:text-purple-300 underline">verifying EBSI verifiable credentials and trust chains</Link>. The EUDI Wallet inherits the conceptual model — issuer → holder → verifier, with trust anchored in registries — but standardized on a different stack: OpenID4VP and SD-JWT/mDL rather than EBSI's original W3C VC profile. The verification discipline is the same; the wire formats and trust frameworks are what changed. Several member states are in fact migrating their EBSI-based pilots into the EUDI framework rather than discarding them.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">A Practical Preparation Checklist</h2>
                    <ol className="list-decimal list-inside mb-8 space-y-2">
                      <li><strong>Map your identification flows.</strong> Onboarding, KYC, age checks, contract signing, and delegated-authority scenarios ("act on behalf of company X") are the flows the wallet will touch first.</li>
                      <li><strong>Decide your relying-party posture.</strong> If strong customer authentication is legally required in your sector, accepting the wallet will likely become an obligation — start tracking your national transposition.</li>
                      <li><strong>Prototype presentation verification.</strong> Stand up an OpenID4VP verifier in a test environment; the large-scale pilots run by member states provide sample wallets and test credentials.</li>
                      <li><strong>Look at attestations you could issue.</strong> Qualifications, memberships, corporate roles, and licences your organization certifies today are candidate EAAs with EU-wide effect.</li>
                      <li><strong>Review data flows against selective disclosure.</strong> Where you currently collect full identity documents, redesign for attribute proofs — less data, less GDPR exposure.</li>
                    </ol>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">Is the EUDI Wallet mandatory for citizens?</h3>
                    <p className="mb-8">
                      No — use is voluntary for individuals. What is not voluntary is the obligation on certain businesses (relying parties requiring strong customer authentication, and very large online platforms) to <em>accept</em> the wallet when users choose to present it. Member states are also required to offer at least one certified wallet.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">When must businesses accept the EUDI Wallet?</h3>
                    <p className="mb-8">
                      Acceptance obligations attach to relying parties that already require strong user authentication by law or contract — banking, telecoms, insurance — plus VLOPs designated under the DSA. The obligations phase in on a transition period after the implementing acts, placing the effective compliance window around 2026–2028 depending on sector and member state.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between eIDAS 1.0 and eIDAS 2.0?</h3>
                    <p className="mb-8">
                      eIDAS 1.0 mutually recognized national eID schemes — mostly government-to-government login. eIDAS 2.0 adds the EUDI Wallet as a user-held credential container, makes attribute attestations a regulated trust service, introduces qualified electronic ledgers and archiving, and creates private-sector acceptance obligations. Think of it as moving from "portable login" to "portable, selective-disclosure identity."
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How does the EUDI Wallet relate to verifiable credentials and EBSI?</h3>
                    <p className="mb-8">
                      Same architecture, evolved standards. The issuer–holder–verifier model, trust registries, and trust-chain verification pioneered in EBSI carry over conceptually, but the EUDI framework standardized on OpenID4VP for presentation, SD-JWT VC and ISO/IEC 18013-5 as formats, and its own governance of trusted lists. Work built on EBSI VC profiles needs adapting to the EUDI stack rather than rebuilding.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/eidas2-eudi-wallet/"
                    categories={['Compliance', 'Standards', 'Blockchain']}
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

export default Eidas2EudiWallet;
