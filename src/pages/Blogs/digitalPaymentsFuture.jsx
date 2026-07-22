import React from 'react';
import Container from '@mui/material/Container';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import blogImage from '../../images/digital-payments-future.jpg';

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
                      On July 1, MiCA—the EU's landmark crypto-assets regulation—fully took effect. Regulated exchanges began delisting non-compliant stablecoins, while compliant issuers secured licenses to operate across all 27 member states.
                    </p>

                    <p className="mb-8">
                      Just days later, the European Parliament approved the Single Currency Package, paving the way for trilogue negotiations on the digital euro. The European Central Bank selected 36 payment service providers to join the digital euro pilot, scheduled to start in the second half of 2027. If negotiations stay on track, the digital euro could be available to citizens by 2029.
                    </p>

                    <p className="mb-8">
                      And from November 2026—just four months away—ISO 20022 becomes the mandatory standard for payment messages, with banks required to use structured, data-rich formats for cross-border payments.
                    </p>

                    <p className="mb-8">
                      Three major transitions. Three converging timelines. All pointing to one conclusion: Europe is building a new digital payment infrastructure—and we need the standards to make it work.
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
                      Today's DLT payment systems and traditional financial messaging standards—like ISO 20022—don't speak the same language. A DLT transaction carries metadata that ISO 20022 messages simply don't have a field for. Compliance data (KYC/AML attributes, consent proofs, SCA evidence) is represented inconsistently across platforms. And for European SMEs and Payment Service Providers (PSPs), this fragmentation means higher costs, legal uncertainty, and a competitive disadvantage against non-EU players with proprietary infrastructures.
                    </p>

                    <p className="mb-8">
                      The EU's Retail Payments Strategy explicitly calls for interoperability, privacy, and competition. The ICT Rolling Plan for Standardisation prioritises action on these fronts. But the technical standards to bridge DLT and traditional payments? They don't exist yet.
                    </p>

                    <p className="mb-8">
                      That's the gap my fellowship is filling.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">The Work: Three Standards Contributions, One Vision</h3>
                    <p className="mb-8">
                      My fellowship project—"Retail Payments Standards for Interoperable, Compliant DLT Integration" —is delivering three concrete contributions to international standardisation bodies:
                    </p>

                    <h4 className="h4 mb-3 text-gray-100">1. Semantic Mapping for Retail Payments</h4>
                    <p className="mb-8">
                      I'm proposing a harmonisation framework to map DLT transaction data directly into ISO 20022 messages (specifically the pacs.008 credit transfer). Using the standard's SupplementaryData element, we can carry DLT-specific metadata—asset type, block hashes, smart contract details—without breaking existing infrastructure. With ISO 20022 becoming mandatory in November 2026, this mapping couldn't be more timely.
                    </p>

                    <h4 className="h4 mb-3 text-gray-100">2. Privacy-Preserving Compliance Profile</h4>
                    <p className="mb-8">
                      Working with W3C Verifiable Credentials, I'm developing a tailored compliance profile for retail payments. It enables PSPs to share KYC/AML, consent, and regulatory data with selective disclosure—revealing only what's necessary, nothing more. This is GDPR-aligned by design and supports the Strong Customer Authentication requirements of PSD2.
                    </p>

                    <h4 className="h4 mb-3 text-gray-100">3. Interoperability Test Vectors</h4>
                    <p className="mb-8">
                      Theory is one thing. Practical implementation is another. I'm creating a concrete test suite with baseline scenarios and pass/fail criteria. This gives European SMEs and fintech developers a clear, low-cost path to validate their DLT payment implementations against recognised standards.
                    </p>

                    <p className="mb-8">
                      These contributions are directed at ISO/TC 307 (Blockchain and DLT), ISO/TC 68 (Financial Services), W3C, and CEN/CENELEC JTC 19—ensuring European priorities are embedded in the global standards of tomorrow.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Why This Matters Right Now</h3>
                    <p className="mb-8">
                      The timing of this work isn't accidental—it's essential.
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
                      Europe has a choice: let DLT payment standards be defined by non-EU actors with different values, or lead the development of standards that reflect European principles—privacy, sovereignty, competition, and SME inclusion.
                    </p>

                    <p className="mb-8">
                      My fellowship is a small but concrete contribution to the second path.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">The Broader Picture: StandICT.eu 2029</h3>
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
                      <li className="mb-2">Presenting draft contributions at ISO/TC 68 (Rome, May) and ISO/TC 307 (Paris, June) plenaries</li>
                      <li className="mb-2">Conducting interoperability testing with independent implementers</li>
                      <li className="mb-2">Finalising ballot-ready submissions</li>
                      <li className="mb-2">Publishing a public technical report and hosting a webinar for European SMEs and regulators</li>
                    </ul>

                    <p className="mb-8">
                      The goal is simple: make it easier, cheaper, and safer for European businesses to adopt DLT-based payments—while ensuring those payments are compliant, privacy-preserving, and truly interoperable.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Join the Conversation</h3>
                    <p className="mb-8">
                      If you're working at the intersection of payments, DLT, and standards—or if you're an SME or PSP navigating the MiCA, digital euro, and ISO 20022 transitions—I'd love to hear from you.
                    </p>

                    <p className="mb-8">
                      The standards we build today will shape Europe's digital payment landscape for a generation. Let's build them together.
                    </p>

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
