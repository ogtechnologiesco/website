import React from 'react';
import Container from '@mui/material/Container';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import ebsiImage from '../../images/ebsi2.png';
import eu from '../../images/eu.png'
import bsl from '../../images/blockstand_logo.png';
import bslPartners from '../../images/blockstand_partners.png';
import trustChainExample from '../../images/trust_chain_education.png';


// Add fadeIn animation keyframes
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

function EBSI() {
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
                  <h1 className="h1">Key Requirements for Verifying EBSI Verifiable Credentials, Including Trust Chain Verification and Regulatory Alignment</h1>
                  <div className="text-gray-400 text-center">31/03/2025</div>
                  <div className="text-gray-400 text-center mt-2"><em>Updated: 17.04.2025</em></div>
                </div>

                {/* Blog content */}
                <div className="max-w-3xl mx-auto">
                  <img 
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0" 
                    src={ebsiImage} 
                    alt="European Blockchain Services Infrastructure" 
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  
                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                    
                      The <a href="https://hub.ebsi.eu/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">European Blockchain Services Infrastructure (EBSI)</a> represents one of the most ambitious blockchain initiatives in the public sector globally. Launched by the <a href="https://commission.europa.eu/index_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">European Commission (EC)</a> and the <a href="https://digital-strategy.ec.europa.eu/en/policies/blockchain-partnership" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">European Blockchain Partnership
                      (EBP)</a>, EBSI aims to deliver EU-wide cross-border public services using blockchain technology. This infrastructure is designed to enhance trust, efficiency, and security in digital interactions between citizens, businesses, and public administrations across Europe.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">The Vision and Mission of EBSI</h3>
                    <p className="mb-8">
                      EBSI's core mission is to leverage blockchain technology to create a trusted digital infrastructure that supports:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2">Verification of information and documents across borders</li>
                      <li className="mb-2">Secure and privacy-preserving management of digital identities</li>
                      <li className="mb-2">Trusted data sharing between authorities and citizens</li>
                      <li className="mb-2">Digital transformation of public services across the EU</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Key Use Cases and Applications</h3>
                    <p className="mb-8">
                      EBSI is being implemented through several high-impact use cases that demonstrate the practical benefits of blockchain technology in public services:
                    </p>
                    
                    <h4 className="h4 mb-2 text-gray-100">1. Self-Sovereign Identity</h4>
                    <p className="mb-8">
                      EBSI enables citizens to create and control their own identity across borders without relying on centralized authorities. This allows for seamless verification of credentials while maintaining privacy and data sovereignty. See here for <a href="https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/5+reasons+why+professionals+and+enthusiasts+of+Self-Sovereign+Information+Sharing+should+look+into+EBSI+this+summer" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">more details.</a>
                    </p>

                    <h4 className="h4 mb-2 text-gray-100">2. Diplomas and Educational Credentials</h4>
                    <p className="mb-8">
                      The infrastructure provides a secure way to issue, store, and verify educational credentials, reducing fraud and simplifying credential recognition across EU member states. This is particularly valuable for students studying abroad and professionals seeking employment in different countries. See here for <a href="https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/Formal+Accreditation+and+Recognition" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">more details.</a>
                    </p>

                    <h4 className="h4 mb-2 text-gray-100">3. Trusted Data Sharing</h4>
                    <p className="mb-8">
                      EBSI facilitates secure document exchange between public administrations, businesses, and citizens, ensuring data integrity and auditability while complying with data protection regulations. See here for <a href="https://hub.ebsi.eu/get-started/build/ti" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">more details.</a>
                    </p>

                    <img 
                      className="w-full rounded-xl mb-8 animate-fade-in opacity-0" 
                      src={eu} 
                      alt="European Union Flag" 
                      style={{ animation: 'fadeIn 1s ease-in forwards' }}
                    />

                    <h3 className="h3 mb-4 text-gray-100">Technical Architecture and Standards</h3>
                    <p className="mb-8">
                      EBSI is built on a permissioned blockchain network with nodes operated by European companies, institutions, and member states. According to the <a href="https://hub.ebsi.eu/blockchain" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">EBSI HUB</a>, it uses the QBFT (Quorum Byzantine Fault Tolerance) consensus protocol. Validators take turns proposing blocks, requiring a super-majority (≥ 2/3) of signatures for block finalization. This consensus mechanism is detailed in the <a href="https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/EBSI+and+the+Digital+Rights+Declaration+-+how+we+design+with+your+rights+in+mind" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">EBSI Consensus Documentation</a>. Its architecture incorporates:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2">A distributed ledger network ensuring transparency and immutability</li>
                      <li className="mb-2">Verifiable Credentials and Decentralized Identifiers (DIDs) following W3C standards</li>
                      <li className="mb-2">Privacy-by-design principles compliant with GDPR</li>
                      <li className="mb-2">Open-source components and interoperability with existing systems</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Key Requirements for Verifying EBSI Verifiable Credentials</h3>
                    <p className="mb-8">
                      Effective verification of EBSI Verifiable Credentials requires adherence to specific technical standards and regulatory frameworks that ensure trust, security, and compliance:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>Trust Chain Verification</strong> - Ensures the complete chain of trust from the credential issuer to the European Trust Anchor is validated, maintaining the integrity of the verification process</li>
                      <li className="mb-2"><strong>eIDAS Regulation (EU N°910/2014)</strong> - Provides the legal foundation for electronic identification and trust services, essential for cross-border recognition of EBSI credentials</li>
                      <li className="mb-2"><strong>ISO/IEC 29115</strong> - Implements Levels of Assurance (LoA) framework to establish appropriate trust levels for different types of credentials and use cases</li>
                      <li className="mb-2"><strong>ISO/IEC 27001</strong> - Ensures information security management practices protect the integrity and confidentiality of credentials throughout their lifecycle</li>
                      <li className="mb-2"><strong>EBSI Verifiable Trust Model</strong> - Defines the blockchain-based trust architecture that enables secure, transparent, and auditable credential verification across borders</li>
                      <li className="mb-2"><strong>W3C Verifiable Credentials Data Model</strong> - Provides the standardized format for expressing and exchanging credentials in a cryptographically secure manner</li>
                    </ul>
                    <p className="mb-8">
                      By implementing these requirements, EBSI creates a robust framework for credential verification that balances technical security with regulatory compliance, enabling trusted digital interactions across the European Union while protecting user privacy and data sovereignty.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Trust Chain Verification in Detail</h3>
                    <p className="mb-8">
                      Trust Chain Verification is a cornerstone of EBSI's security model, establishing confidence in the authenticity and integrity of verifiable credentials. This process involves several critical components:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>European Trust Anchor (ETA)</strong> - The root of trust in the EBSI ecosystem, operated by the European Commission, which validates trusted issuers through a cryptographic attestation process</li>
                      <li className="mb-2"><strong>Trusted Issuer Registry (TIR)</strong> - A blockchain-based registry that maintains an up-to-date list of authorized credential issuers, enabling verifiers to confirm issuer legitimacy</li>
                      <li className="mb-2"><strong>Cryptographic Proof Verification</strong> - The process of validating digital signatures on credentials using public key cryptography, ensuring data hasn't been tampered with</li>
                      <li className="mb-2"><strong>Revocation Checking</strong> - Verification against the Status Registry to confirm credentials haven't been revoked by the issuer</li>
                      <li className="mb-2"><strong>Timestamp Validation</strong> - Ensuring credentials are used within their valid time period, preventing replay attacks</li>
                    </ul>
                    <p className="mb-8">
                      The complete trust chain verification flow typically follows these steps:
                    </p>
                    <ol className="list-decimal list-inside mb-8 text-gray-100">
                      <li className="mb-2">Verify the credential's cryptographic signature using the issuer's public key</li>
                      <li className="mb-2">Confirm the issuer's DID is registered in the Trusted Issuer Registry</li>
                      <li className="mb-2">Validate that the issuer's attestation from the European Trust Anchor is valid</li>
                      <li className="mb-2">Check the credential's status against the Status Registry to ensure it hasn't been revoked</li>
                      <li className="mb-2">Verify the credential is being used within its valid time period</li>
                    </ol>
                    <p className="mb-8">
                      This multi-layered approach ensures that only credentials from legitimate, authorized sources are accepted, creating a secure foundation for cross-border digital services. For more details on the technical implementation, see the <a href="https://hub.ebsi.eu/vc-framework/guidelines/le-credential-registry" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">EBSI Trusted Issuers Registry API documentation</a>.
                    </p>

                    <h4 className="h4 mb-2 text-gray-100">Designing Your Trust Chain</h4>
                    <p className="mb-8">
                      The following guidance helps you design a Trust Chain for your specific use case. The goal is to identify all possible actors and their interactions, and to structure your trust chain accordingly.
                    </p>
                    <p className="mb-8">
                      A Trust Chain is a hierarchical relationship among different entities, where trust flows downwards and is inherited from the top of the chain. By establishing trust between entities that do not necessarily know each other, this framework allows for the secure and decentralized exchange of Verifiable Credentials.
                    </p>
                    
                    <img 
                      className="w-full rounded-xl mb-8 animate-fade-in opacity-0" 
                      src={trustChainExample} 
                      alt="Trust Chain Example in Education Domain" 
                      style={{ animation: 'fadeIn 1s ease-in forwards' }}
                    />
                    
                    <p className="mb-8">
                      The figure above provides an illustration of a Trust Chain for an example use case in the education domain, where the first link, or Root Trusted Accreditation Organisation (RTAO), is a National Government. The trust chain demonstrates how authority flows from the government through various levels to ultimately enable the issuance of verifiable diplomas.
                    </p>
                    
                    <p className="mb-8">
                      A properly designed Trust Chain must contain at least one of each of the following three roles:
                    </p>
                    
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>Root Trusted Accreditation Organisation (Root TAO)</strong> - Represents the foundation of the Trust Model and has full control of the Trust Chain. In the EBSI context, this is typically the European Commission acting through the European Trust Anchor.</li>
                      <li className="mb-2"><strong>Trusted Accreditation Organisation(s) (TAOs)</strong> - Govern an accreditation segment on behalf of the Root TAO. These might be national authorities or sector-specific regulatory bodies that are authorized to accredit issuers in their domain.</li>
                      <li className="mb-2"><strong>Trusted Issuer(s) (TIs)</strong> - Represent the actual issuers of credentials in a trust chain. These could be universities issuing diplomas, hospitals issuing health records, or government agencies issuing permits.</li>
                    </ul>
                    <p className="mb-8">
                      When designing your Trust Chain for EBSI integration, consider the following steps:
                    </p>
                    <ol className="list-decimal list-inside mb-8 text-gray-100">
                      <li className="mb-2">Map your organizational ecosystem to identify potential Root TAOs, TAOs, and TIs</li>
                      <li className="mb-2">Define the attestation flows between these entities</li>
                      <li className="mb-2">Establish governance rules for each level of the hierarchy</li>
                      <li className="mb-2">Implement appropriate technical controls for each entity type</li>
                      <li className="mb-2">Design revocation mechanisms that respect the hierarchical structure</li>
                    </ol>
                    <p className="mb-8">
                      By carefully designing your Trust Chain architecture, you ensure that verifiers can trace the provenance of any credential back to its authoritative source, maintaining the integrity of the entire verification process.
                    </p>

                    <p className="mb-8">
                      For more information, see the <a href="https://hub.ebsi.eu/get-started/design/trust-chain" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">EBSI Trust Chain Design documentation</a>.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Expanding on Key Requirements for Verifying EBSI Verifiable Credentials</h3>
                    <p className="mb-8">
                      Let's explore each key requirement in greater detail:
                    </p>
                    
                    <h4 className="h4 mb-2 text-gray-100">1. Trust Chain Verification</h4>
                    <p className="mb-8">
                      Beyond the basic verification flow described above (see here for <a href="https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/EBSI+Verifiable+Credentials" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">more details.</a>), robust trust chain verification in EBSI implements:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>Domain-Specific Trust Schemes</strong> - Specialized trust frameworks for different sectors (education, healthcare, etc.) with domain-specific validation rules</li>
                      <li className="mb-2"><strong>Cross-Border Trust Bridging</strong> - Mechanisms to validate credentials across different national trust infrastructures within the EU</li>
                      <li className="mb-2"><strong>Trust Translation Services</strong> - Components that map between different levels of assurance across member states</li>
                      
                    </ul>
                    

                    <h4 className="h4 mb-2 text-gray-100">2. eIDAS Regulation Compliance</h4>
                    <p className="mb-8">
                      The <a href="https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">eIDAS Regulation</a> (EU N°910/2014) provides the legal foundation for EBSI credentials through:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>Qualified Electronic Signatures (QES)</strong> - The highest level of legally recognized electronic signatures, equivalent to handwritten signatures across the EU</li>
                      <li className="mb-2"><strong>Qualified Electronic Seals</strong> - Providing legal certainty about the origin and integrity of documents issued by legal entities</li>
                      <li className="mb-2"><strong>Qualified Timestamps</strong> - Legally recognized proof of time for credential issuance and verification</li>
                      <li className="mb-2"><strong>Qualified Trust Service Providers (QTSPs)</strong> - Organizations authorized to issue qualified certificates that underpin the highest level of trust</li>
                    </ul>
                    <p className="mb-8">
                      With the upcoming eIDAS 2.0 regulation, EBSI is positioned to integrate with the European Digital Identity Wallet, further enhancing its legal recognition and utility.
                    </p>

                    <h4 className="h4 mb-2 text-gray-100">3. ISO/IEC 29115 Implementation</h4>
                    <p className="mb-8">
                      <a href="https://www.iso.org/standard/45138.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">ISO/IEC 29115</a> defines four Levels of Assurance (LoA) that EBSI implements to categorize credentials based on their verification rigor:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>LoA 1 (Low)</strong> - Basic assurance with minimal verification requirements, suitable for low-risk scenarios</li>
                      <li className="mb-2"><strong>LoA 2 (Medium)</strong> - Moderate assurance with some identity proofing and credential management controls</li>
                      <li className="mb-2"><strong>LoA 3 (High)</strong> - High assurance with substantial identity verification and strong cryptographic mechanisms</li>
                      <li className="mb-2"><strong>LoA 4 (Very High)</strong> - Very high assurance with rigorous identity proofing, often including biometrics and hardware-based credential storage</li>
                    </ul>
                    <p className="mb-8">
                      EBSI maps these levels to specific verification requirements, ensuring appropriate security measures for different use cases while maintaining interoperability.
                    </p>

                    <h4 className="h4 mb-2 text-gray-100">4. ISO/IEC 27001 Security Framework</h4>
                    <p className="mb-8">
                      <a href="https://www.iso.org/isoiec-27001-information-security.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">ISO/IEC 27001</a> provides the information security management framework that protects EBSI's infrastructure through:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>Risk Assessment Methodology</strong> - Systematic approach to identifying and mitigating security risks in the credential ecosystem</li>
                      <li className="mb-2"><strong>Security Controls Implementation</strong> - Technical and organizational measures protecting the confidentiality, integrity, and availability of credentials</li>
                      <li className="mb-2"><strong>Incident Management Procedures</strong> - Processes for detecting, reporting, and responding to security breaches</li>
                      <li className="mb-2"><strong>Continuous Improvement</strong> - Regular security assessments and updates to address emerging threats</li>
                    </ul>
                    <p className="mb-8">
                      EBSI node operators and trusted issuers are typically required to maintain ISO/IEC 27001 certification, ensuring consistent security practices across the network.
                    </p>

                    <h4 className="h4 mb-2 text-gray-100">5. EBSI Verifiable Trust Model</h4>
                    <p className="mb-8">
                      The <a href="https://hub.ebsi.eu/vc-framework/trust-model" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">EBSI Verifiable Trust Model</a> defines the blockchain-based architecture that enables secure credential verification through:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>Decentralized Identifiers (DIDs)</strong> - Blockchain-registered identifiers that enable verifiable, decentralized digital identity for issuers and verifiers</li>
                      <li className="mb-2"><strong>Verifiable Credentials</strong> - Tamper-evident credentials with cryptographic proofs that can be verified without contacting the issuer</li>
                      <li className="mb-2"><strong>Distributed Ledger</strong> - A permissioned blockchain network that maintains trust registries without requiring a central authority</li>
                      <li className="mb-2"><strong>Smart Contracts</strong> - Automated business logic that enforces trust rules and governance policies</li>
                    </ul>
                    <p className="mb-8">
                      This model enables a "web of trust" approach where credentials can be verified across organizational and national boundaries while maintaining security and privacy.
                    </p>

                    <h4 className="h4 mb-2 text-gray-100">6. W3C Verifiable Credentials Data Model</h4>
                    <p className="mb-8">
                      The <a href="https://www.w3.org/TR/vc-data-model/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">W3C Verifiable Credentials Data Model</a> provides the standardized format for EBSI credentials, including:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>JSON-LD Context</strong> - Semantic vocabulary definitions that ensure consistent interpretation of credential data</li>
                      <li className="mb-2"><strong>Credential Subject</strong> - The entity about whom claims are made in the credential</li>
                      <li className="mb-2"><strong>Issuer</strong> - The entity that asserts the claims and issues the credential</li>
                      <li className="mb-2"><strong>Proof</strong> - Cryptographic material that enables verification of the credential's authenticity</li>
                      <li className="mb-2"><strong>Credential Status</strong> - Information about how to check if the credential has been suspended or revoked</li>
                    </ul>
                    <p className="mb-8">
                      EBSI extends this model with EU-specific schemas and contexts, ensuring credentials contain all necessary information for European use cases while maintaining global interoperability.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Regulatory and Technical Alignment</h3>
                    <p className="mb-8">
                      EBSI's verification requirements are carefully designed to align with broader European digital initiatives:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong><a href="https://digital-strategy.ec.europa.eu/en/policies/eudi-regulation" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">European Digital Identity Framework</a></strong> - Integration with the upcoming EU Digital Identity Wallet ecosystem</li>
                      <li className="mb-2"><strong><a href="https://commission.europa.eu/law/cross-border-cases/judicial-cooperation_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Cross-Border Judicial Cooperation</a></strong> - Supporting secure document exchange in legal proceedings</li>
                      <li className="mb-2"><strong><a href="https://ec.europa.eu/info/strategy/priorities-2019-2024/europe-fit-digital-age/european-data-strategy_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">European Data Strategy</a></strong> - Contributing to secure data spaces and data sovereignty</li>
                      <li className="mb-2"><strong><a href="https://ec.europa.eu/growth/single-market/single-digital-gateway_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Single Digital Gateway</a></strong> - Enabling seamless access to online public services across the EU</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Key Standards Supporting EBSI Implementation</h3>
                    <p className="mb-8">
                      The successful implementation of EBSI relies on adherence to internationally recognized standards that ensure security, interoperability, and regulatory compliance:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>eIDAS Regulation (EU N°910/2014)</strong> - <a href="https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Establishes</a> the legal framework for electronic identification and trust services across Europe, providing the foundation for EBSI's identity solutions</li>
                      <li className="mb-2"><strong>ISO/IEC 29115</strong> - <a href="https://www.iso.org/standard/45138.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Defines</a> Levels of Assurance (LoA) for entity authentication, critical for establishing trust in EBSI's identity verification processes</li>
                      <li className="mb-2"><strong>ISO/IEC 27001</strong> - <a href="https://www.iso.org/isoiec-27001-information-security.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Provides</a> the framework for Information Security Management Systems (ISMS) that secure EBSI's infrastructure</li>
                      <li className="mb-2"> ISO, "ISO/IEC 23220-1:2023 - Cards and security devices for personal identification — Building blocks for identity management via mobile devices," <a href="https://www.iso.org/standard/74910.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/74910.html</a></li>
                      <li className="mb-2"><strong>ISO/IEC TS 27560:2023</strong> - <a href="https://www.iso.org/standard/80392.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Defines</a> structured consent records, essential for EBSI's compliance with data protection regulations</li>
                      <li className="mb-2"><strong>W3C DID Core v1.0</strong> - <a href="https://www.w3.org/TR/did-core/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Specification</a> for Decentralized Identifiers that EBSI implements for identity management</li>
                      <li className="mb-2"><strong>ETSI TS 119 312</strong> - <a href="https://www.etsi.org/deliver/etsi_ts/119300_119399/119312/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Cryptographic Suites</a> recommendations that EBSI follows for secure digital signatures</li>
                    </ul>
                    <p className="mb-8">
                      By aligning with these standards, EBSI ensures that its blockchain infrastructure meets the highest requirements for security, privacy, and interoperability while maintaining compliance with European regulations.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">EBSI and European Digital Strategy</h3>
                    <p className="mb-8">
                      EBSI is a cornerstone of Europe's digital transformation strategy, aligning with several key EU initiatives:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2">The European Digital Identity framework and eIDAS regulation</li>
                      <li className="mb-2">The Digital Europe Programme</li>
                      <li className="mb-2">The European Data Strategy</li>
                      <li className="mb-2">The Single Digital Gateway Regulation</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Challenges and Opportunities</h3>
                    <p className="mb-8">
                      While EBSI presents tremendous opportunities for digital transformation, several challenges must be addressed:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2">Harmonizing legal frameworks across member states</li>
                      <li className="mb-2">Ensuring widespread adoption by public administrations</li>
                      <li className="mb-2">Balancing technical innovation with regulatory compliance</li>
                      <li className="mb-2">Maintaining security while scaling the infrastructure</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">OG Technologies EU and EBSI</h3>
                    <p className="mb-8">
                      At OG Technologies EU, we are actively engaged with the EBSI ecosystem, contributing to its development and helping organizations leverage this infrastructure. Our expertise includes:
                    </p>
                    <ol className="list-decimal list-inside mb-8 text-gray-100">
                      <li className="mb-2">Developing EBSI-compatible applications and services</li>
                      <li className="mb-2">Consulting on EBSI integration for public and private organizations</li>
                      <li className="mb-2">Participating in EBSI standardization efforts</li>
                      <li className="mb-2">Building bridges between EBSI and other blockchain networks</li>
                    </ol>

                    <h3 className="h3 mb-4 text-gray-100">Our Partnership with BlockStand</h3>
                    <div className="flex flex-col gap-4 mb-8">
                      <img 
                        className="w-full rounded-xl animate-fade-in opacity-0" 
                        src={bsl} 
                        alt="Blockstand" 
                        style={{ animation: 'fadeIn 1s ease-in forwards' }}
                      />
                      <img 
                        className="w-full rounded-xl animate-fade-in opacity-0" 
                        src={bslPartners} 
                        alt="Blockstand Partners" 
                        style={{ animation: 'fadeIn 1s ease-in forwards', animationDelay: '0.3s' }}
                      />
                    </div>
                    <p className="mb-8">
                      Our work with EBSI is strengthened through our partnership with <a href="https://www.blockstand.eu" className="text-blue-600 hover:text-blue-800 underline">BlockStand</a>, an EU-funded initiative focused on blockchain standardization. Through this collaboration, we ensure that our EBSI implementations adhere to the highest standards of interoperability and security, while actively contributing to the development of European blockchain standards that support cross-border services.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">The Future of EBSI</h3>
                    <p className="mb-8">
                      Looking ahead, EBSI is poised to expand its scope and impact through:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2">Integration with the European Digital Identity Wallet</li>
                      <li className="mb-2">New use cases in healthcare, supply chain, and sustainable finance</li>
                      <li className="mb-2">Enhanced interoperability with private sector blockchain networks</li>
                      <li className="mb-2">Potential expansion beyond EU borders through international partnerships</li>
                    </ul>

                    <p className="mb-8">
                      The European Blockchain Services Infrastructure represents a significant step forward in the application of blockchain technology for public good. By creating a secure, trusted, and standardized infrastructure for digital services, EBSI is helping to build a more connected, efficient, and citizen-centric Europe.
                    </p>

                    <p className="mb-8">
                      At OG Technologies EU, we are committed to supporting this vision by providing expertise, solutions, and services that help organizations harness the full potential of EBSI and contribute to Europe's digital transformation journey.
                    </p>
                    
                    <h3 className="h3 mb-4 text-gray-100">References</h3>
                    <ul className="list-none mb-8 text-gray-100">
                      <li className="mb-2">[1] European Commission, "European Blockchain Services Infrastructure (EBSI)," <a href="https://hub.ebsi.eu/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://hub.ebsi.eu/</a></li>
                      <li className="mb-2">[2] European Commission, "Official Website," <a href="https://commission.europa.eu/index_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://commission.europa.eu/index_en</a></li>
                      <li className="mb-2">[3] European Commission, "European Blockchain Partnership," <a href="https://digital-strategy.ec.europa.eu/en/policies/blockchain-partnership" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://digital-strategy.ec.europa.eu/en/policies/blockchain-partnership</a></li>
                      <li className="mb-2">[4] European Commission, "EBSI Trust Model," <a href="https://hub.ebsi.eu/vc-framework/trust-model" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/digital-building-blocks/wikis/display/EBSI/EBSI+Trust+Model</a></li>
                      <li className="mb-2">[5] European Commission, "EBSI Trust Chain Design," <a href="https://hub.ebsi.eu/get-started/design/trust-chain" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://hub.ebsi.eu/get-started/design/trust-chain</a></li>
                      <li className="mb-2">[6] W3C, "Verifiable Credentials Data Model v1.1," <a href="https://www.w3.org/TR/vc-data-model/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.w3.org/TR/vc-data-model/</a></li>
                      <li className="mb-2">[7] W3C, "Decentralized Identifiers (DIDs) v1.0," <a href="https://www.w3.org/TR/did-core/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.w3.org/TR/did-core/</a></li>
                      <li className="mb-2">[8] European Commission, "eIDAS Regulation," <a href="https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation</a></li>
                      <li className="mb-2">[9] ISO, "ISO/IEC 29115:2013 - Entity authentication assurance framework," <a href="https://www.iso.org/standard/45138.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/45138.html</a></li>
                      <li className="mb-2">[10] ISO, "ISO/IEC 27001 - Information security management," <a href="https://www.iso.org/isoiec-27001-information-security.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/isoiec-27001-information-security.html</a></li>
                      <li className="mb-2">[11] ISO, "ISO/IEC TS 27560:2023 - Privacy technologies — Consent record information structure," <a href="https://www.iso.org/standard/80392.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/80392.html</a></li>
                      <li className="mb-2">[12] European Commission, "European Digital Identity," <a href="https://digital-strategy.ec.europa.eu/en/policies/eudi-regulation" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://digital-strategy.ec.europa.eu/en/policies/european-digital-identity</a></li>
                      <li className="mb-2">[13] European Commission, "European Data Strategy," <a href="https://ec.europa.eu/info/strategy/priorities-2019-2024/europe-fit-digital-age/european-data-strategy_en" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/info/strategy/priorities-2019-2024/europe-fit-digital-age/european-data-strategy_en</a></li>
                      <li className="mb-2">[14] ETSI, "ETSI TS 119 312 - Cryptographic Suites," <a href="https://www.etsi.org/deliver/etsi_ts/119300_119399/119312/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.etsi.org/deliver/etsi_ts/119300_119399/119312/</a></li>
                      <li className="mb-2">[15] European Commission, "EBSI Blockchain," <a href="https://hub.ebsi.eu/blockchain" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://hub.ebsi.eu/blockchain</a></li>
                      <li className="mb-2">[16] European Commission, "EBSI Trusted Issuers Registry API," <a href="https://hub.ebsi.eu/vc-framework/guidelines/le-credential-registry" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://hub.ebsi.eu/vc-framework/guidelines/le-credential-registry</a></li>
                      <li className="mb-2">[17] European Commission, "EBSI Consensus Documentation," <a href="https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/EBSI+and+the+Digital+Rights+Declaration+-+how+we+design+with+your+rights+in+mind" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/EBSI+and+the+Digital+Rights+Declaration+-+how+we+design+with+your+rights+in+mind</a></li>
                      <li className="mb-2">[18] European Commission, "Self-Sovereign Information Sharing," <a href="https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/5+reasons+why+professionals+and+enthusiasts+of+Self-Sovereign+Information+Sharing+should+look+into+EBSI+this+summer" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/5+reasons+why+professionals+and+enthusiasts+of+Self-Sovereign+Information+Sharing+should+look+into+EBSI+this+summer</a></li>
                      <li className="mb-2">[19] European Commission, "Formal Accreditation and Recognition," <a href="https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/Formal+Accreditation+and+Recognition" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/Formal+Accreditation+and+Recognition</a></li>
                      <li className="mb-2">[20] European Commission, "Trusted Issuers," <a href="https://hub.ebsi.eu/get-started/build/ti" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://hub.ebsi.eu/get-started/build/ti</a></li>
                     
                    </ul>
                    
                    <h3 className="h3 mb-4 text-gray-100">DISCLAIMER</h3>
                    <p className="mb-8 text-sm text-gray-400 border-t border-gray-700 pt-4">
                      The European Commission support for the production of this publication does not constitute
                      an endorsement of the contents which reflects the views only of the authors, and the Commission
                      cannot be held responsible for any use which may be made of the information contained therein.
                      This document is proprietary of the BlockStand Consortium.
                      Project material developed in the context of Project Management & Implementation activities is
                      not allowed to be copied or distributed in any form or by any means, without the prior written
                      agreement of the BlockStand Consortium.
                    </p>
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

export default EBSI;