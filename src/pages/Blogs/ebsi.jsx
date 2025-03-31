import React from 'react';
import Container from '@mui/material/Container';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import ebsiImage from '../../images/ebsi2.png';
import eu from '../../images/eu.png'
import bsl from '../../images/blockstand_logo.png';


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
                      The European Blockchain Services Infrastructure (EBSI) represents one of the most ambitious blockchain initiatives in the public sector globally. Launched by the European Commission and the European Blockchain Partnership (EBP), EBSI aims to deliver EU-wide cross-border public services using blockchain technology. This infrastructure is designed to enhance trust, efficiency, and security in digital interactions between citizens, businesses, and public administrations across Europe.
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
                      EBSI enables citizens to create and control their own identity across borders without relying on centralized authorities. This allows for seamless verification of credentials while maintaining privacy and data sovereignty.
                    </p>

                    <h4 className="h4 mb-2 text-gray-100">2. Diplomas and Educational Credentials</h4>
                    <p className="mb-8">
                      The infrastructure provides a secure way to issue, store, and verify educational credentials, reducing fraud and simplifying credential recognition across EU member states. This is particularly valuable for students studying abroad and professionals seeking employment in different countries.
                    </p>

                    <h4 className="h4 mb-2 text-gray-100">3. Trusted Data Sharing</h4>
                    <p className="mb-8">
                      EBSI facilitates secure document exchange between public administrations, businesses, and citizens, ensuring data integrity and auditability while complying with data protection regulations.
                    </p>

                    <img 
                      className="w-full rounded-xl mb-8 animate-fade-in opacity-0" 
                      src={eu} 
                      alt="European Union Flag" 
                      style={{ animation: 'fadeIn 1s ease-in forwards' }}
                    />

                    <h3 className="h3 mb-4 text-gray-100">Technical Architecture and Standards</h3>
                    <p className="mb-8">
                      EBSI is built on a permissioned blockchain network with nodes operated by the European Commission and member states. Its architecture incorporates:
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

                    <h3 className="h3 mb-4 text-gray-100">Key Standards Supporting EBSI Implementation</h3>
                    <p className="mb-8">
                      The successful implementation of EBSI relies on adherence to internationally recognized standards that ensure security, interoperability, and regulatory compliance:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>eIDAS Regulation (EU N°910/2014)</strong> - Establishes the legal framework for electronic identification and trust services across Europe, providing the foundation for EBSI's identity solutions</li>
                      <li className="mb-2"><strong>ISO/IEC 29115</strong> - Defines Levels of Assurance (LoA) for entity authentication, critical for establishing trust in EBSI's identity verification processes</li>
                      <li className="mb-2"><strong>ISO/IEC 27001</strong> - Provides the framework for Information Security Management Systems (ISMS) that secure EBSI's infrastructure</li>
                      <li className="mb-2"><strong>ISO/IEC 23220-1:2023</strong> - Outlines generic architectures for mobile eID solutions, supporting EBSI's mobile identity capabilities</li>
                      <li className="mb-2"><strong>ISO/IEC TS 27560:2023</strong> - Defines structured consent records, essential for EBSI's compliance with data protection regulations</li>
                      <li className="mb-2"><strong>EBSI Verifiable Trust Model</strong> - Establishes the blockchain-based trust framework that facilitates compliant cross-border identity verification</li>
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
                    <img 
                      className="w-full rounded-xl mb-8 animate-fade-in opacity-0" 
                      src={bsl} 
                      alt="Blockstand" 
                      style={{ animation: 'fadeIn 1s ease-in forwards' }}
                    />
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