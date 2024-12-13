import React from 'react';
import Container from '@mui/material/Container';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import blog1 from '../../images/stand.jpeg';
import bsl from '../../images/blockstand_logo.png';

// Add this before the Standards component
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

function Standards() {
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
                  <h1 className="h1">How Blockchain Standards Enable Enterprises to Reach Global Customers</h1>
                  <div className="text-gray-400 text-center">22/11/2024</div>
                </div>

                {/* Blog content */}
                <div className="max-w-3xl mx-auto">
                  <img 
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0" 
                    src={blog1} 
                    alt="Blockchain Standards" 
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  
                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      As blockchain technology continues to reshape industries, the importance of standards cannot be overstated. For enterprises seeking to expand their reach, interoperability, security, and regulatory compliance are key. Blockchain standards play a pivotal role in enabling cross-border communication, secure transactions, and universal compatibility, which are essential for enterprises aiming to connect with global customers.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Why Blockchain Standards Matter</h3>
                    <p className="mb-8">
                      Blockchain standards provide a framework for secure, reliable, and transparent transactions across borders. They allow businesses to:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2">Ensure interoperability between different blockchain networks</li>
                      <li className="mb-2">Meet regulatory compliance across jurisdictions</li>
                      <li className="mb-2">Reduce friction and increase efficiency in cross-border payments</li>
                      <li className="mb-2">Enhance the security of blockchain applications</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Blockchain Standards in Action</h3>
                    <p className="mb-8">
                      One of the most impactful applications of blockchain standards is in the financial sector, where they enable seamless and secure cross-border payments. By adhering to international blockchain interoperability standards, businesses can offer their services to customers across different regions without worrying about compatibility issues. Additionally, blockchain standards are increasingly becoming a benchmark for regulatory authorities, ensuring that blockchain-based businesses operate within legal frameworks.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">OG Technologies EU and BlockStand: A Partnership for Blockchain Standardization</h3>
                    <img 
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0" 
                    src={bsl} 
                    alt="Blockchain Standards" 
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                    <p className="mb-8">
                      At OG Technologies EU, we are proud to be part of the <a href="https://www.blockstand.eu" className="text-blue-600 hover:text-blue-800 underline">BlockStand initiative</a>, an EU-funded project coordinated by DIGITAL SME alongside partners such as Small Business Standards (SBS), the International Association for Trusted Blockchain Applications (INATBA), and UNINFO. BlockStand aims to support the active participation of European experts in blockchain standardization activities. Through this collaboration, we aim to ensure that European enterprises remain at the forefront of blockchain innovation by aligning with global standards and fostering cross-border interoperability.
                    </p>
                    <p className="mb-8">
                      Through the <a href="https://blockstand.eu/blockchain-standardisation-facility-community/" className="text-blue-600 hover:text-blue-800 underline">BlockStand Standardisation Facility</a>, experts and organizations can actively participate in shaping blockchain standards and access valuable resources for implementation.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Key Blockchain Standards Examples and working grups</h3>
                    <p className="mb-8">
                      Several important blockchain standards are shaping the industry today:
                    </p>
                    <ul className="list-none list-inside mb-8 text-gray-100">
                      <li className="mb-2">ISO 20022 - Global standard for financial messaging, crucial for blockchain-based financial services</li>
                      <li className="mb-2">ISO/IEC 27001 - Information security management systems, essential for blockchain security</li>
                      <li className="mb-2">ISO 14000 - Environmental management standards, relevant for sustainable blockchain implementations</li>
                    </ul>

                  
                    <h3 className="h3 mb-4 text-gray-100">Advanced Standards and Future-Proofing</h3>
                    <p className="mb-8">
                      As blockchain technology evolves, additional standards are becoming increasingly important:
                    </p>
                    <ul className="list-none list-inside mb-8 text-gray-100">
                      <li className="mb-2">ISO/IEC/IEEE 29119-1:2022 - Software testing standards applicable to blockchain solutions</li>
                      <li className="mb-2">ISO 31000 - Risk management principles crucial for blockchain implementations</li>
                      <li className="mb-2">NIST Post-Quantum Cryptography (PQC) - Essential for preparing blockchain systems for quantum computing threats</li>
                    </ul>

                    <p className="h3 mb-4 text-gray-100">
                      Several working groups are also shaping the future of blockchain standards:
                    </p>
                    <ul className="list-none list-inside mb-8 text-gray-100">
                      <li className="mb-2"> ISO/TC 307 - Provides standardization of blockchain technologies and distributed ledger technologies</li>
                      <li className="mb-2"> CEN/CLC JTC 19 - European blockchain and DLT standards</li> 
                      <li className="mb-2">W3C Credentials Community Group - Important for identity management and interoperability</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Implementing Blockchain Standards in Your Enterprise</h3>
                    <p className="mb-8">
                      To leverage blockchain standards effectively, businesses need a clear implementation strategy:
                    </p>
                    <ol className="list-decimal list-inside mb-8 text-gray-100">
                      <li className="mb-2">Assess the relevant blockchain standards for your industry</li>
                      <li className="mb-2">Develop a roadmap for integrating these standards into your systems</li>
                      <li className="mb-2">Invest in team training for blockchain compliance and standards</li>
                      <li className="mb-2">Ensure continuous monitoring and updates to maintain compliance</li>
                    </ol>

                    <p className="mb-8">
                      By partnering with BlockStand, we help ensure that European businesses can take full advantage of blockchain standards. This collaboration not only strengthens interoperability and security but also supports businesses in navigating complex regulatory landscapes, expanding their market reach, and remaining competitive on the global stage.
                    </p>

                    <p className="mb-8">
                      At OG Technologies EU, we specialize in helping enterprises navigate the evolving landscape of blockchain standards. Our expertise in blockchain interoperability, security, and regulatory compliance ensures that businesses can adopt blockchain technology confidently and scale globally, all while staying ahead of industry standards and legal requirements.
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

export default Standards;

