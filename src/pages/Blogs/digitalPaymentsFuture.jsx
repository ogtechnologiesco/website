import React from 'react';
import Container from '@mui/material/Container';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import blogImage from '../../images/digital-payments-future.jpg';
import standictLogo from '../../images/standict-logo.svg';
import euLogo from '../../images/eu-co-funded-logo.png';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function DigitalPaymentsFuture() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main className="grow">
          <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>

          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Blog header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">Building the Rails for Europe's Digital Payment Future</h1>
                  <div className="text-gray-400 text-center">21/07/2026</div>
                </div>

                {/* Blog content */}
                <div className="max-w-3xl mx-auto">
                  <img 
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0" 
                    src={blogImage} 
                    alt="Digital Payment Future" 
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  
                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      If you've been following European digital finance news lately, you've probably noticed: everything is happening at once.
                    </p>

                    <p className="mb-8">
                      On July 1, MiCA, the EU's landmark crypto-assets regulation, fully took effect. Regulated exchanges began delisting non-compliant stablecoins, while compliant issuers secured licenses to operate across all 27 member states.
                    </p>

                    <p className="mb-8">
                      Just days later, the European Parliament approved the Single Currency Package, paving the way for trilogue negotiations on the digital euro. The European Central Bank selected 36 payment service providers to join the digital euro pilot, scheduled to start in the second half of 2027. If negotiations stay on track, the digital euro could be available to citizens by 2029.
                    </p>

                    <p className="mb-8">
                      And from November 2026, just four months away, ISO 20022 becomes the mandatory standard for payment messages, with banks required to use structured, data-rich formats for cross-border payments.
                    </p>

                    <p className="mb-8">
                      Three major transitions. Three converging timelines. All pointing to one conclusion: Europe is building a new digital payment infrastructure, and we need the standards to make it work.
                    </p>

                    <p className="mb-8">
                      That's exactly what my StandICT.eu 2029 fellowship is about.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">The Challenge: When DLT Meets Traditional Payments</h3>
                    <p className="mb-8">
                      Distributed Ledger Technology (DLT) offers something traditional payment systems struggle with: programmability, near-instant settlement finality, and transparent transaction records. Whether it's a MiCA-compliant stablecoin, a future digital euro, or a tokenised bank deposit, DLT-based assets are becoming real contenders in retail payments.
                    </p>

                    <p className="mb-8">
                      But there's a problem.
                    </p>

                    <p className="mb-8">
                      Today's DLT payment systems and traditional financial messaging standards, like ISO 20022, don't speak the same language. A DLT transaction carries metadata that ISO 20022 messages simply don't have a field for. Compliance data (KYC/AML attributes, consent proofs, SCA evidence) is represented inconsistently across platforms. And for European SMEs and Payment Service Providers (PSPs), this fragmentation means higher costs, legal uncertainty, and a competitive disadvantage against non-EU players with proprietary infrastructures.
                    </p>

                    <p className="mb-8">
                      The EU's Retail Payments Strategy explicitly calls for interoperability, privacy, and competition. The ICT Rolling Plan for Standardisation prioritises action on these fronts. But the technical standards to bridge DLT and traditional payments? They don't exist yet.
                    </p>

                    <p className="mb-8">
                      That's the gap my fellowship is filling.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">The Work: Three Standards Contributions, One Vision</h3>
                    <p className="mb-8">
                      My fellowship project, "Retail Payments Standards for Interoperable, Compliant DLT Integration", is delivering three concrete contributions to international standardisation bodies:
                    </p>

                    <h4 className="h4 mb-3 text-gray-100">1. Semantic Mapping for Retail Payments</h4>
                    <p className="mb-8">
                      I'm proposing a harmonisation framework to map DLT transaction data directly into ISO 20022 messages (specifically the pacs.008 credit transfer). Using the standard's SupplementaryData element, we can carry DLT-specific metadata, asset type, block hashes, smart contract details, without breaking existing infrastructure. With ISO 20022 becoming mandatory in November 2026, this mapping couldn't be more timely.
                    </p>

                    <h4 className="h4 mb-3 text-gray-100">2. Privacy-Preserving Compliance Profile</h4>
                    <p className="mb-8">
                      Working with W3C Verifiable Credentials, I'm developing a tailored compliance profile for retail payments. It enables PSPs to share KYC/AML, consent, and regulatory data with selective disclosure, revealing only what's necessary, nothing more. This is GDPR-aligned by design and supports the Strong Customer Authentication requirements of PSD2.
                    </p>

                    <h4 className="h4 mb-3 text-gray-100">3. Interoperability Test Vectors</h4>
                    <p className="mb-8">
                      Theory is one thing. Practical implementation is another. I'm creating a concrete test suite with baseline scenarios and pass/fail criteria. This gives European SMEs and fintech developers a clear, low-cost path to validate their DLT payment implementations against recognised standards.
                    </p>

                    <p className="mb-8">
                      These contributions are directed at ISO/TC 307 (Blockchain and DLT), ISO/TC 68 (Financial Services), W3C, and CEN/CENELEC JTC 19, ensuring European priorities are embedded in the global standards of tomorrow.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Technical Profile: Privacy-Preserving Identity & Compliance</h3>
                    <p className="mb-8">
                      Beyond the standardisation contributions, I'm developing a concrete technical specification—a privacy-preserving identity and compliance profile for retail payment flows built on <a href="https://www.w3.org/TR/vc-data-model/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">W3C Verifiable Credentials</a>. This profile bridges the gap between DLT-based payment systems and regulatory requirements.
                    </p>

                    <h4 className="h4 mb-3 text-gray-100">Core Claims Set</h4>
                    <p className="mb-8">
                      The profile defines a minimal set of claims that must be included in a retail payment compliance credential, enabling efficient verification while protecting privacy:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>legalPersonIdentifier</strong> - Unique identifier of the legal entity (LEI or national registration number)</li>
                      <li className="mb-2"><strong>naturalPersonIdentifier</strong> - Pseudonymised natural person identifier (one-way hash for privacy)</li>
                      <li className="mb-2"><strong>subjectRole</strong> - Distinguishes the role in the payment flow: payer, payee, intermediary, or escrow</li>
                      <li className="mb-2"><strong>amlRiskCategory</strong> - AML risk score assigned by the issuer: low, medium, or high</li>
                      <li className="mb-2"><strong>transactionPurposeCode</strong> - Purpose of the transaction following ISO 20022 PurposeCode (e.g., CASH, SALA)</li>
                      <li className="mb-2"><strong>consentProof</strong> - Cryptographic proof of user consent for data processing (GDPR Art. 7)</li>
                      <li className="mb-2"><strong>scaEvidence</strong> - Strong Customer Authentication evidence for transactions above PSD2 thresholds</li>
                      <li className="mb-2"><strong>credentialStatus</strong> - Endpoint to check revocation status via W3C Status List 2021</li>
                    </ul>

                    <h4 className="h4 mb-3 text-gray-100">Selective Disclosure with BBS+ Signatures</h4>
                    <p className="mb-8">
                      The profile recommends <strong>BBS+ Signatures</strong> as the primary proof format, enabling:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>Selective disclosure</strong> - Holders can reveal only the claims necessary for a given interaction</li>
                      <li className="mb-2"><strong>Unlinkable presentations</strong> - Each presentation generates a different zero-knowledge proof, preventing correlation</li>
                      <li className="mb-2"><strong>Blind signature support</strong> - Issuers can sign credentials without learning user attributes</li>
                    </ul>
                    <p className="mb-8">
                      This approach balances privacy with regulatory compliance, allowing PSPs to verify required attributes without exposing unnecessary personal data.
                    </p>

                    <h4 className="h4 mb-3 text-gray-100">ISO 20022 Integration</h4>
                    <p className="mb-8">
                      The profile provides a mapping between VC claims and ISO 20022 elements, leveraging the <strong>SupplementaryData</strong> extension mechanism to carry compliance evidence without modifying the core schema. To address message size constraints, it introduces a <strong>Reference Pattern</strong>: the ISO 20022 message includes only a hash (SHA-256) of the full VC, with the full credential stored in a secure, retrievable location and referenced via a DID URL or HTTPS endpoint.
                    </p>

                    <h4 className="h4 mb-3 text-gray-100">Regulatory Alignment</h4>
                    <p className="mb-8">
                      The profile aligns with key European regulations:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>MiCA</strong> - Supports stablecoin requirements through issuer identification and reserve attestation</li>
                      <li className="mb-2"><strong>PSD2</strong> - Includes dedicated <strong>scaEvidence</strong> claim for Strong Customer Authentication</li>
                      <li className="mb-2"><strong>DORA</strong> - Enables traceability and incident reporting through unique identification</li>
                      <li className="mb-2"><strong>GDPR</strong> - Designed with data minimisation, purpose limitation, and consent tracking</li>
                      <li className="mb-2"><strong>FATF Travel Rule</strong> - Fulfils requirements for sharing originator/beneficiary information for transfers above 1,000 EUR</li>
                    </ul>

                    <h4 className="h4 mb-3 text-gray-100">Implementation Guidance for SMEs and PSPs</h4>
                    <p className="mb-8">
                      The profile includes concrete implementation guidance covering the full credential lifecycle: issuance, storage, presentation, verification, and revocation via <a href="https://www.w3.org/TR/vc-status-list-2021/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">W3C Status List 2021</a>. It provides test vectors for baseline scenarios (P2P stablecoin transfer, CBDC point-of-sale) and conformance criteria to ensure interoperability across diverse national infrastructures.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Relevant Standards</h3>
                    <p className="mb-8">
                      The successful implementation of interoperable DLT-based retail payments relies on adherence to internationally recognized standards that ensure security, privacy, and regulatory compliance:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>ISO 20022</strong> - <a href="https://www.iso20022.org" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Financial messaging standard</a> that becomes mandatory for cross-border payments in November 2026, providing the foundation for structured, data-rich payment messages</li>
                      <li className="mb-2"><strong>ISO/TC 307</strong> - <a href="https://www.iso.org/committee/6266604.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Blockchain and Distributed Ledger Technologies</a> committee developing international standards for blockchain and DLT interoperability</li>
                      <li className="mb-2"><strong>ISO/TC 68</strong> - <a href="https://www.iso.org/committee/5490744.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Financial Services</a> committee responsible for standards in banking, securities, and other financial services</li>
                      <li className="mb-2"><strong>W3C Verifiable Credentials Data Model</strong> - <a href="https://www.w3.org/TR/vc-data-model/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Standard format</a> for verifiable digital credentials that enables privacy-preserving compliance and selective disclosure</li>
                      <li className="mb-2"><strong>CEN/CENELEC JTC 19</strong> - <a href="https://www.cencenelec.eu/technologies/sectors/digital/blockchain-and-distributed-ledger-technologies/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">European Blockchain and DLT</a> standards committee ensuring European priorities are reflected in global standardisation</li>
                      <li className="mb-2"><strong>MiCA Regulation</strong> - <a href="https://commission.europa.eu/law/bills-proposals/2020-09-24-proposal-regulation-markets-crypto-assets_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Markets in Crypto-Assets Regulation</a> establishing the EU's comprehensive framework for crypto-assets and stablecoins</li>
                      <li className="mb-2"><strong>PSD2</strong> - <a href="https://commission.europa.eu/financial-services/financial-markets/retail-payments/psd2_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Payment Services Directive 2</a> governing payment services and Strong Customer Authentication (SCA) requirements in the EU</li>
                      <li className="mb-2"><strong>eIDAS Regulation</strong> - <a href="https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Electronic Identification and Trust Services</a> regulation providing the legal framework for electronic signatures and digital identity</li>
                      <li className="mb-2"><strong>ISO/IEC 27001</strong> - <a href="https://www.iso.org/isoiec-27001-information-security.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Information Security Management</a> standard providing the framework for securing payment infrastructure and protecting sensitive data</li>
                      <li className="mb-2"><strong>ISO/IEC 29115</strong> - <a href="https://www.iso.org/standard/45138.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Entity Authentication Assurance</a> framework defining Levels of Assurance (LoA) for identity verification in digital transactions</li>
                    </ul>
                    <p className="mb-8">
                      By aligning with these standards, European businesses can ensure their DLT payment implementations are secure, interoperable, and compliant with EU regulations while maintaining competitiveness in the global market.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Why This Matters Right Now</h3>
                    <p className="mb-8">
                      The timing of this work isn't accidental, it's essential.
                    </p>

                    <p className="mb-8">
                      MiCA is live. Stablecoin payments are entering the European mainstream. But without standardised messaging, every PSP integrating DLT payments will build its own custom solution. That's fragmentation by another name.
                    </p>

                    <p className="mb-8">
                      The digital euro is coming. The Eurosystem's comprehensive payments strategy, published on 31 March 2026, highlights how the digital euro will foster pan-European private retail payment solutions. But a digital euro that can't interoperate with existing ISO 20022 infrastructure? That's a missed opportunity for seamless integration.
                    </p>

                    <p className="mb-8">
                      ISO 20022 is the new baseline. From November 2026, unstructured payment data won't cut it anymore. The standards we define now will shape how DLT payments integrate with this new mandatory framework.
                    </p>

                    <p className="mb-8">
                      Europe has a choice: let DLT payment standards be defined by non-EU actors with different values, or lead the development of standards that reflect European principles, privacy, sovereignty, competition, and SME inclusion.
                    </p>

                    <p className="mb-8">
                      My fellowship is a small but concrete contribution to the second path.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">The Broader Picture: StandICT.eu 2029</h3>
                    <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
                      <div className="rounded-xl py-4 px-6 flex items-center" style={{ backgroundColor: '#003B71' }}>
                        <img src={standictLogo} alt="StandICT.eu" className="h-12 w-auto" />
                      </div>
                      <div className="bg-white rounded-xl p-4 flex items-center">
                        <img src={euLogo} alt="Co-funded by the European Union" className="h-12 w-auto" />
                      </div>
                    </div>
                    <p className="mb-8">
                      This work is made possible by StandICT.eu 2029, the EU's flagship programme for ICT standardisation. With €4.2 million in funding supporting over 300 experts across six open calls, StandICT.eu enables European specialists to represent Europe in major standardisation bodies. In Open Call 1 alone, 75 fellowships were selected, with an average quality score of 8.2 out of 10.
                    </p>

                    <p className="mb-8">
                      The programme bridges the gap between EU digital policy and the technical standards that make policy real. That's exactly what we need at this moment of rapid transformation.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">What's Next</h3>
                    <p className="mb-8">
                      Over the coming months, I'll be:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2">Presenting draft contributions at ISO/TC 68 and ISO/TC 307 plenaries</li>
                      <li className="mb-2">Conducting interoperability testing with independent implementers</li>
                      <li className="mb-2">Finalising ballot-ready submissions</li>
                      <li className="mb-2">Publishing a public technical report and hosting a webinar for European SMEs and regulators</li>
                    </ul>

                    <p className="mb-8">
                      The goal is simple: make it easier, cheaper, and safer for European businesses to adopt DLT-based payments,while ensuring those payments are compliant, privacy-preserving, and truly interoperable.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Join the Conversation</h3>
                    <p className="mb-8">
                      If you're working at the intersection of payments, DLT, and standards,or if you're an SME or PSP navigating the MiCA, digital euro, and ISO 20022 transitions, I'd love to hear from you.
                    </p>

                    <p className="mb-8">
                      The standards we build today will shape Europe's digital payment landscape for a generation. Let's build them together.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">References</h3>
                    <ul className="list-none mb-8 text-gray-100">
                      <li className="mb-2">[1] StandICT.eu 2029, "Official Website," <a href="https://www.standict.eu" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.standict.eu</a></li>
                      <li className="mb-2">[2] European Commission, "Markets in Crypto-Assets Regulation (MiCA)," <a href="https://commission.europa.eu/law/bills-proposals/2020-09-24-proposal-regulation-markets-crypto-assets_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://commission.europa.eu/law/bills-proposals/2020-09-24-proposal-regulation-markets-crypto-assets_en</a></li>
                      <li className="mb-2">[3] European Central Bank, "Digital Euro," <a href="https://www.ecb.europa.eu/euro/digital-euro/html/index.en.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.ecb.europa.eu/euro/digital-euro/html/index.en.html</a></li>
                      <li className="mb-2">[4] ISO, "ISO 20022 - Financial Services," <a href="https://www.iso20022.org" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso20022.org</a></li>
                      <li className="mb-2">[5] ISO/TC 307, "Blockchain and Distributed Ledger Technologies," <a href="https://www.iso.org/committee/6266604.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/committee/6266604.html</a></li>
                      <li className="mb-2">[6] ISO/TC 68, "Financial Services," <a href="https://www.iso.org/committee/5490744.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/committee/5490744.html</a></li>
                      <li className="mb-2">[7] W3C, "Verifiable Credentials Data Model," <a href="https://www.w3.org/TR/vc-data-model/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.w3.org/TR/vc-data-model/</a></li>
                      <li className="mb-2">[8] CEN/CENELEC JTC 19, "Blockchain and Distributed Ledger Technologies," <a href="https://www.cencenelec.eu/technologies/sectors/digital/blockchain-and-distributed-ledger-technologies/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.cencenelec.eu/technologies/sectors/digital/blockchain-and-distributed-ledger-technologies/</a></li>
                      <li className="mb-2">[9] European Commission, "Retail Payments Strategy," <a href="https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/digital-finance/retail-payments-strategy_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/digital-finance/retail-payments-strategy_en</a></li>
                      <li className="mb-2">[10] European Commission, "ICT Rolling Plan for Standardisation," <a href="https://digital-strategy.ec.europa.eu/en/policies/ict-standardisation" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://digital-strategy.ec.europa.eu/en/policies/ict-standardisation</a></li>
                      <li className="mb-2">[11] European Commission, "PSD2 - Payment Services Directive," <a href="https://commission.europa.eu/financial-services/financial-markets/retail-payments/psd2_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://commission.europa.eu/financial-services/financial-markets/retail-payments/psd2_en</a></li>
                      <li className="mb-2">[12] European Commission, "Single Currency Package," <a href="https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/euro/digital-euro_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/euro/digital-euro_en</a></li>
                      <li className="mb-2">[13] European Commission, "eIDAS Regulation," <a href="https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation</a></li>
                      <li className="mb-2">[14] ISO, "ISO/IEC 27001 - Information security management," <a href="https://www.iso.org/isoiec-27001-information-security.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/isoiec-27001-information-security.html</a></li>
                      <li className="mb-2">[15] ISO, "ISO/IEC 29115:2013 - Entity authentication assurance framework," <a href="https://www.iso.org/standard/45138.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/45138.html</a></li>
                      <li className="mb-2">[16] W3C, "Status List 2021," <a href="https://www.w3.org/TR/vc-status-list-2021/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.w3.org/TR/vc-status-list-2021/</a></li>
                      <li className="mb-2">[17] ISO, "ISO 17442:2020 - Legal Entity Identifier (LEI)," <a href="https://www.iso.org/standard/59721.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/59721.html</a></li>
                      <li className="mb-2">[18] European Commission, "DORA - Digital Operational Resilience Act," <a href="https://commission.europa.eu/law/bills-proposals/2020-09-24-proposal-regulation-digital-operational-resilience_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://commission.europa.eu/law/bills-proposals/2020-09-24-proposal-regulation-digital-operational-resilience_en</a></li>
                      <li className="mb-2">[19] FATF, "Updated Guidance for a Risk-Based Approach to Virtual Assets and Virtual Asset Service Providers," <a href="https://www.fatf-gafi.org/publications/virtual-assets/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.fatf-gafi.org/publications/virtual-assets/</a></li>
                    </ul>

                    <div className="mt-12 pt-8 border-t border-gray-700">
                      <p className="text-gray-400 mb-4">
                        <strong>Olvis Enrique Gil Ríos</strong> is the founder of OG Technologies EU and a StandICT.eu 2029 fellow. His project, "Retail Payments Standards for Interoperable, Compliant DLT Integration," runs from March to September 2026.
                      </p>
                      <p className="text-gray-500 text-sm">
                        #StandICT #DigitalPayments #DLT #ISO20022 #MiCA #DigitalEuro #VerifiableCredentials #EUSovereignty #FintechStandards
                      </p>
                    </div>
                  </article>
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

export default DigitalPaymentsFuture;
