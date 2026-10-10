import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-mt940-camt053.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Mt940Format() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>MT940 Format Explained: Field Tags, Field 86, and the Migration to camt.053 | OG Technologies EU</title>
          <meta name="description" content="The SWIFT MT940 bank statement format decoded: every field tag from :20: to :62F:, the :61: statement line, structured :86: remittance data (SEPA tags, ?NN subfields), and how it maps to ISO 20022 camt.053." />
          <meta name="keywords" content="MT940 format, MT940 file, MT940 to CSV, MT940 field 86, MT940 tag 61, SWIFT MT940, camt.053, bank statement format, .sta file, MT940 parser, MT940 specification" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/mt940-format-camt053-migration/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/mt940-format-camt053-migration/" />
          <meta property="og:title" content="MT940 Format Explained: Field Tags, Field 86, and the Migration to camt.053" />
          <meta property="og:description" content="Every MT940 tag decoded — :61: statement lines, :86: remittance data, SEPA subfields — and how the legacy format maps to ISO 20022 camt.053." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/mt940-format-camt053-migration/" />
          <meta name="twitter:title" content="MT940 Format Explained: Field Tags, Field 86, and the Migration to camt.053" />
          <meta name="twitter:description" content="Every MT940 tag decoded — :61: statement lines, :86: remittance data — and how the legacy format maps to ISO 20022 camt.053." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Payments · Standards</div>
                  <h1 className="h1">MT940 Format Explained: Field Tags, Field 86, and the Migration to camt.053</h1>
                  <div className="text-gray-400 text-center mt-4">09/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="OG Technologies EU MT940 to CSV converter — parsed statement entries and download button"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      The SWIFT <strong>MT940</strong> — Customer Statement Message — is the end-of-day bank statement format that corporate treasuries, accountants, and ERP systems have consumed for decades. Delivered as <code className="text-purple-300">.sta</code> or <code className="text-purple-300">.mt940</code> files through EBICS, host-to-host banking, or online banking exports, it encodes opening and closing balances plus every booked transaction in a compact, line-oriented tag structure. It is now being succeeded by the ISO 20022 <strong>camt.053</strong> XML statement — but MT940 remains the format most finance teams actually receive, and the one most "import my bank statement into Excel" searches are really about.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The Tag Structure at a Glance</h2>
                    <p className="mb-4">
                      An MT940 file contains one or more statements. Each statement is a sequence of fields introduced by a colon-delimited tag (<code className="text-purple-300">:20:</code>, <code className="text-purple-300">:61:</code>, …). A file may also arrive wrapped in SWIFT envelope blocks (<code className="text-purple-300">{'{1:…}{2:…}{4: … -}'}</code>) — strip those before parsing the tags themselves.
                    </p>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-left text-sm border border-gray-700">
                        <thead>
                          <tr className="bg-gray-800">
                            <th className="px-4 py-2 font-semibold text-gray-200 w-20">Tag</th>
                            <th className="px-4 py-2 font-semibold text-gray-200 w-56">Name</th>
                            <th className="px-4 py-2 font-semibold text-gray-200">Content</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            [':20:', 'Transaction reference', 'Sender\'s unique reference for the statement (max 16 chars)'],
                            [':21:', 'Related reference', 'Optional reference to a related message'],
                            [':25:', 'Account identification', 'IBAN or proprietary account number — may include the bank\'s BIC'],
                            [':28C:', 'Statement / sequence number', 'e.g. 00123/001 — statement number plus page sequence'],
                            [':60F: / :60M:', 'Opening balance', 'C/D mark + YYMMDD + currency + amount; F = final, M = intermediate'],
                            [':61:', 'Statement line', 'One booked transaction: dates, amount, transaction code, references'],
                            [':86:', 'Information to account owner', 'Remittance / booking text attached to the preceding :61:'],
                            [':62F: / :62M:', 'Closing balance', 'Same shape as :60: — the balance after all listed entries'],
                            [':64:', 'Closing available balance', 'Optional — the balance actually available for withdrawal'],
                            [':65:', 'Forward available balance', 'Optional — projected available balance at a future date'],
                          ].map(([tag, name, desc]) => (
                            <tr key={tag} className="border-t border-gray-700">
                              <td className="px-4 py-2 text-purple-300 font-mono text-xs align-top whitespace-nowrap">{tag}</td>
                              <td className="px-4 py-2 text-gray-200 align-top">{name}</td>
                              <td className="px-4 py-2 text-gray-400 align-top">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">Field :61: — The Statement Line</h2>
                    <p className="mb-4">
                      Each booked transaction occupies one <code className="text-purple-300">:61:</code> line. A real line looks like this:
                    </p>
                    <pre className="bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto text-sm text-gray-300">
{`:61:2609210921C250,00NTRFNONREF//RCV-778`}
                    </pre>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><code className="text-purple-300">260921</code> — value date (YYMMDD)</li>
                      <li><code className="text-purple-300">0921</code> — optional entry date (MMDD)</li>
                      <li><code className="text-purple-300">C</code> — debit/credit mark: <code className="text-purple-300">C</code> credit, <code className="text-purple-300">D</code> debit, <code className="text-purple-300">RC</code>/<code className="text-purple-300">RD</code> reversal of a credit/debit</li>
                      <li><code className="text-purple-300">250,00</code> — amount, always with a comma as decimal separator</li>
                      <li><code className="text-purple-300">NTRF</code> — transaction type: <code className="text-purple-300">N</code> + three-letter code (<code className="text-purple-300">TRF</code> transfer, <code className="text-purple-300">DDT</code> direct debit, <code className="text-purple-300">MSC</code> miscellaneous, <code className="text-purple-300">CHK</code> cheque, <code className="text-purple-300">INT</code> interest…)</li>
                      <li><code className="text-purple-300">NONREF</code> — customer reference (or <code className="text-purple-300">NONREF</code> when none)</li>
                      <li><code className="text-purple-300">//RCV-778</code> — bank's own servicing reference, after the double slash</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Field :86: — Where Every Bank Is Different</h2>
                    <p className="mb-8">
                      The <code className="text-purple-300">:86:</code> tag carries the human-readable booking text — and it is the least standardized part of the format. There is no single grammar: some banks write free text, most European banks use a structured dialect. Two conventions dominate:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>German <code className="text-purple-300">?NN</code> subfields.</strong> The content is split by question-mark codes: <code className="text-purple-300">?00</code> transaction type text, <code className="text-purple-300">?20–?29</code> remittance lines, <code className="text-purple-300">?30</code> counterparty BIC, <code className="text-purple-300">?31</code> counterparty account, <code className="text-purple-300">?32/?33</code> counterparty name, <code className="text-purple-300">?34</code> return reason.</li>
                      <li><strong>SEPA tags.</strong> Embedded inside the booking text as <code className="text-purple-300">TAG+value</code>: <code className="text-purple-300">SVWZ+</code> remittance information, <code className="text-purple-300">EREF+</code> end-to-end reference, <code className="text-purple-300">MREF+</code> mandate reference, <code className="text-purple-300">CRED+</code> creditor identifier, <code className="text-purple-300">PURP+</code> purpose code, <code className="text-purple-300">ABWA+/ABWE+</code> counterparty name.</li>
                    </ul>
                    <p className="mb-8">
                      This is why generic "MT940 parsers" so often fail: the :61: line is well-defined, but :86: requires a bank-specific parsing profile. A good parser extracts counterparty name, IBAN, BIC, and end-to-end references into separate fields rather than dumping the raw text.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">A Complete Statement, Decoded</h2>
                    <pre className="bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto text-sm text-gray-300">
{`:20:STMT-2026-09-001
:25:AT611904300234573201
:28C:00001/001
:60F:C260920EUR5000,00
:61:2609210921D1000,00NTRFNONREF//E2E-001
:86:020?00SEPA UEBERWEISUNG?20SVWZ+Invoice INV-1042
?30DEUTDEFF?31DE89370400440532013000?32Supplier One Ltd
:61:2609210921C250,00NTRFNONREF//RCV-778
:86:020?00SEPA GUTSCHRIFT?20SVWZ+Customer payment
?30GIBAATWW?31AT611904300234573201?32Customer Two
:62F:C260921EUR4250,00`}
                    </pre>
                    <p className="mb-8">
                      Reading top to bottom: statement <code className="text-purple-300">STMT-2026-09-001</code> on account <code className="text-purple-300">AT611904300234573201</code>, opening credit balance EUR 5,000.00 on 2026-09-20. Two entries: a EUR 1,000 debit (SEPA credit transfer to Supplier One Ltd for invoice INV-1042) and a EUR 250 credit from Customer Two. Closing balance EUR 4,250.00 — which you can verify: 5,000 − 1,000 + 250. That running-balance check is the single most useful integrity test for an MT940 file.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">From MT940 to camt.053</h2>
                    <p className="mb-8">
                      camt.053 (Bank-to-Customer Statement) is the ISO 20022 successor. Every MT940 concept has a structured equivalent: <code className="text-purple-300">:20:</code> becomes <code className="text-purple-300">Stmt/Id</code> and the account servicer reference, <code className="text-purple-300">:25:</code> maps to <code className="text-purple-300">Stmt/Acct</code>, balances land in <code className="text-purple-300">Bal</code> elements (<code className="text-purple-300">OPBD</code> opening, <code className="text-purple-300">CLBD</code> closing, <code className="text-purple-300">CLAV</code> available, <code className="text-purple-300">FWAV</code> forward), each <code className="text-purple-300">:61:</code> becomes an <code className="text-purple-300">Ntry</code> element with explicit amount, credit/debit indicator, value and booking dates, and bank transaction code — and <code className="text-purple-300">:86:</code> finally gets a proper home in <code className="text-purple-300">NtryDtls/TxDtls/RmtInf</code>, structured or unstructured.
                    </p>
                    <p className="mb-8">
                      One important nuance: the SWIFT MT/MX coexistence deadline covers <em>payment instructions</em> (MT103, MT202 → pacs.008), not statement reporting. No universal cutoff has been mandated for MT940 itself — the migration is bank-driven. In practice, European banks are moving statement delivery to camt.053 on their own schedules, so reconciliation pipelines should be ready to consume both. For the bigger picture, see our <Link to="/insights/iso-20022-migration-guide/" className="text-purple-400 hover:text-purple-300 underline">ISO 20022 migration guide</Link>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Working With MT940 Today</h2>
                    <p className="mb-8">
                      Most practical needs reduce to three operations: <strong>read it</strong> (decode the tags above), <strong>verify it</strong> (running balance against :62F:), and <strong>convert it</strong> (to CSV for Excel, Google Sheets, or an accounting import). Our tools cover all three in the browser:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li>
                        <Link to="/tools/mt940-to-csv/" className="text-purple-400 hover:text-purple-300 underline">MT940 to CSV Converter</Link> — parses :61:/:86: tags, decodes SEPA references (EREF+, MREF+, CRED+, SVWZ+) and ?NN subfields into dedicated columns, and verifies running balances against the closing balance.
                      </li>
                      <li>
                        <Link to="/tools/iso-20022-viewer/" className="text-purple-400 hover:text-purple-300 underline">ISO 20022 Message Viewer</Link> — for the camt.053 files your bank is migrating to: parse, inspect entries and balances, and validate structure.
                      </li>
                      <li>
                        <Link to="/tools/iban-validator/" className="text-purple-400 hover:text-purple-300 underline">IBAN Validator</Link> and <Link to="/tools/bic-validator/" className="text-purple-400 hover:text-purple-300 underline">BIC Validator</Link> — check the counterparty identifiers extracted from :86: fields.
                      </li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between MT940 and camt.053?</h3>
                    <p className="mb-8">
                      Both are bank statement formats, but MT940 encodes data in colon-delimited text tags while camt.053 uses ISO 20022 XML with typed, structured elements. The practical difference shows up in remittance data: what MT940 crams into a free-form :86: field becomes separately addressable elements (Ustrd/Strd, references, counterparty details) in camt.053 — which is why ERP auto-matching works far better on camt files.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is MT940 being discontinued?</h3>
                    <p className="mb-8">
                      There is no mandated end-date for MT940 itself — the SWIFT coexistence deadline applies to payment instructions, not statement reporting. However, banks are individually migrating statement delivery to camt.053, and several European banks already default to it. Plan for a dual-format period rather than a hard cutoff.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How do I open an MT940 file in Excel?</h3>
                    <p className="mb-8">
                      Convert it to CSV first — Excel cannot read the tagged format directly. Our <Link to="/tools/mt940-to-csv/" className="text-purple-400 hover:text-purple-300 underline">MT940 to CSV converter</Link> produces a UTF-8 file with one row per transaction: dates, signed amounts, counterparty name/IBAN/BIC, end-to-end references, and a verified running balance.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Why does my MT940 parser produce garbled :86: fields?</h3>
                    <p className="mb-8">
                      Because :86: has no single grammar — German banks use ?NN subfields, SEPA banks embed TAG+ sequences, and others write plain text. Your parser needs to detect which dialect is present (or decode both structured styles and fall back to raw text). Character encoding is the second trap: MT940 officially allows only a restricted character set, so files containing accented characters are often mis-encoded.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/mt940-format-camt053-migration/"
                    categories={['Payments', 'Standards']}
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

export default Mt940Format;
