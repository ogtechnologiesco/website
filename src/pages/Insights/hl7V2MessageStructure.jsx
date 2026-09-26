import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-hl7-messages.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Hl7V2MessageStructure() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>HL7 v2 Message Structure Explained: Segments, Fields, and Delimiters | OG Technologies EU</title>
          <meta name="description" content="A practical anatomy of HL7 v2 messages: delimiters, segments (MSH, PID, OBR, OBX), fields, components, and message types — with a decoded ADT example and a free online parser." />
          <meta name="keywords" content="hl7 parser, hl7 message parser, hl7 v2 message, hl7 segments, hl7 msh segment, hl7 adt message, hl7 fields, hl7 delimiters, hl7 viewer, parse hl7 message online" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/hl7-v2-message-structure/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/hl7-v2-message-structure/" />
          <meta property="og:title" content="HL7 v2 Message Structure Explained: Segments, Fields, and Delimiters" />
          <meta property="og:description" content="A practical anatomy of HL7 v2 messages: delimiters, segments, fields, components, and message types — with a decoded ADT example." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/hl7-v2-message-structure/" />
          <meta name="twitter:title" content="HL7 v2 Message Structure Explained" />
          <meta property="twitter:description" content="Delimiters, segments, fields, and message types — with a decoded ADT example and free online parser." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Healthcare · Standards · Developer</div>
                  <h1 className="h1">HL7 v2 Message Structure Explained: Segments, Fields, and Delimiters</h1>
                  <div className="text-gray-400 text-center mt-4">26/09/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-2 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="Hospital patient monitor — HL7 v2 messages carry clinical data between systems"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-xs text-gray-500 mb-8">
                    Image: "Philips IntelliVue medical monitor" by Mr. Satterly, <a href="https://commons.wikimedia.org/wiki/File:Philips_IntelliVue_M3002A_X2_medical_monitor_at_Campbell_County_Memorial_Hospital_in_Gillette,_Wyoming_(input_output).jpg" className="underline hover:text-gray-400" target="_blank" rel="noopener noreferrer">CC0</a>
                  </p>

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      HL7 v2 is still the backbone of hospital interoperability: admissions, orders, results, and discharge summaries move between systems as pipe-delimited text messages. This guide decodes the structure — delimiters, segments, fields, and components — so you can read a raw message instead of staring at it.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Delimiters Come First</h2>
                    <p className="mb-8">
                      Every HL7 v2 message starts with an <code className="text-purple-300">MSH</code> segment that declares its own delimiters in the first eight characters:
                    </p>
                    <pre className="bg-gray-800 rounded-lg p-4 mb-8 overflow-x-auto text-sm text-gray-300">
MSH|^~\&amp;|SENDING_APP|SENDING_FAC|RECV_APP|RECV_FAC|202609261030||ADT^A01|MSG00001|P|2.5
                    </pre>
                    <p className="mb-8">
                      The character after <code className="text-purple-300">MSH</code> is the field separator (<code className="text-purple-300">|</code>), and the next four characters — conventionally <code className="text-purple-300">^~\&amp;</code> — are the component, repetition, escape, and sub-component separators. All parsing keys off these characters; a message with different delimiters is still valid HL7.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Segments, Fields, Components</h2>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Segment</strong> — one line of the message, identified by a 3-character ID (MSH, PID, OBR, OBX, EVN…).</li>
                      <li><strong>Field</strong> — a value between field separators. PID-3 is the third field of the PID segment (patient identifier list).</li>
                      <li><strong>Component</strong> — a value split by <code className="text-purple-300">^</code>. PID-5^1 is the patient's family name inside the name field.</li>
                      <li><strong>Repetition</strong> — multiple values separated by <code className="text-purple-300">~</code> (e.g., several patient identifiers in PID-3).</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">A Real ADT^A01 Message, Decoded</h2>
                    <pre className="bg-gray-800 rounded-lg p-4 mb-8 overflow-x-auto text-sm text-gray-300">
MSH|^~\&amp;|EPIC|GENERAL_HOSPITAL|LAB|LAB|20260926103015||ADT^A01|MSG00001|P|2.5
EVN|A01|20260926103000
PID|1||123456^^^MRN||Doe^John^A||19850315|M|||123 Main St^^Springfield^IL^62701
PV1|1|I|ICU^101^1||||1234^Smith^Jane^^^^MD|||||||||||VN123456
                    </pre>
                    <p className="mb-8">
                      Read top to bottom: <code className="text-purple-300">MSH</code> declares sender/receiver, timestamp, message type (ADT-A01 = patient admission) and version. <code className="text-purple-300">EVN</code> records the event. <code className="text-purple-300">PID</code> carries patient demographics — MRN 123456, John A. Doe, born 1985-03-15. <code className="text-purple-300">PV1</code> describes the visit — inpatient, ICU bed 101, attending Dr. Jane Smith.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Common Segments and Message Types</h2>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-left text-base">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="py-2 pr-4 text-gray-100">Segment</th>
                            <th className="py-2 text-gray-100">Purpose</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">MSH</td><td className="py-2">Message header — delimiters, sender, type, version</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">EVN</td><td className="py-2">Event type and timestamp</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">PID</td><td className="py-2">Patient identification and demographics</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">PV1</td><td className="py-2">Visit/encounter details, location, attending</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">OBR</td><td className="py-2">Observation request (order)</td></tr>
                          <tr className="border-b border-gray-800"><td className="py-2 pr-4">OBX</td><td className="py-2">Observation result — lab values, vitals, notes</td></tr>
                          <tr><td className="py-2 pr-4">MSA</td><td className="py-2">Acknowledgment (AA = accepted, AE = error)</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-8">
                      The most common message types are <strong>ADT</strong> (admission/discharge/transfer events A01–A40), <strong>ORM/ORU</strong> (orders and results), <strong>SIU</strong> (scheduling), and <strong>DFT</strong> (billing). Every message type has a required segment sequence defined by the standard — a missing PID in an ADT is a structural error.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Parsing Pitfalls</h2>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Positional fields.</strong> Empty fields are significant — <code className="text-purple-300">PID|1||123</code> means field 2 is empty, not that 123 is field 2. Trailing empty fields may be omitted entirely.</li>
                      <li><strong>Escaping.</strong> Literal delimiter characters in text are escaped with <code className="text-purple-300">\F\</code>, <code className="text-purple-300">\S\</code>, <code className="text-purple-300">\R\</code>, <code className="text-purple-300">\E\</code>, <code className="text-purple-300">\T\</code>.</li>
                      <li><strong>Encoding.</strong> HL7 v2 messages travel over MLLP wrapped in VT/FS control characters (0x0B … 0x1C0D) — a raw message pasted from a socket log includes them.</li>
                      <li><strong>Version drift.</strong> v2.3 vs v2.5 vs v2.8 change optionality and data types; always check MSH-12.</li>
                    </ul>
                    <p className="mb-8">
                      To inspect a message without writing a parser, paste it into our free <Link to="/tools/hl7-parser/" className="text-purple-400 hover:text-purple-300 underline">HL7 Parser</Link> — it splits the message into segments and fields, highlights the message type, and validates structure in your browser with no data leaving your machine. If you're consuming HL7 feeds into a FHIR-based system, our <Link to="/tools/fhir-validator/" className="text-purple-400 hover:text-purple-300 underline">FHIR Validator</Link> checks the resulting resources, and the <Link to="/insights/hl7-v2-vs-fhir-comparison/" className="text-purple-400 hover:text-purple-300 underline">HL7 v2 vs FHIR comparison</Link> covers when to use which.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What does the MSH segment contain?</h3>
                    <p className="mb-8">
                      The encoding characters (MSH-1/2), sending and receiving applications and facilities (MSH-3 to MSH-6), timestamp (MSH-7), message type (MSH-9, e.g. ADT^A01), control ID (MSH-10), processing ID (MSH-11), and HL7 version (MSH-12).
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between ADT and ORU messages?</h3>
                    <p className="mb-8">
                      ADT messages report patient movement events (admission, transfer, discharge). ORU messages report clinical observations and results — lab values, radiology reports. An order flows as ORM, its result returns as ORU.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is HL7 v2 still used, or has FHIR replaced it?</h3>
                    <p className="mb-8">
                      Still dominant inside hospitals — most EHR, lab, and imaging integrations run on v2 feeds. FHIR is the growing standard for APIs and external exchange, but coexistence is the reality; many organizations translate v2 to FHIR at the boundary.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How do I parse an HL7 message online?</h3>
                    <p className="mb-8">
                      Paste the raw message into our <Link to="/tools/hl7-parser/" className="text-purple-400 hover:text-purple-300 underline">HL7 Parser</Link> — it auto-detects delimiters, decodes segments and fields, and validates the structure. Everything runs locally in your browser.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/hl7-v2-message-structure/"
                    categories={['Healthcare', 'Standards', 'Developer']}
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

export default Hl7V2MessageStructure;
