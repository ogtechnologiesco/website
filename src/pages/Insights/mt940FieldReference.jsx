import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-mt940-fields.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Mt940FieldReference() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>MT940 Fields Explained: Complete Tag Reference (:20: to :62F:) | OG Technologies EU</title>
          <meta name="description" content="Every MT940 field tag explained: :20:, :21:, :25:, :28C:, :60F:/:60M:, :61:, :86:, :62F:/:62M:, :64:, :65: — plus the :61: subfield anatomy, structured :86: SEPA tags, and transaction codes." />
          <meta name="keywords" content="mt940 fields, mt940 tags, mt940 tag 61, mt940 tag 86, mt940 tag 25, mt940 62f, tag 86 in mt940, mt940 transaction codes, mt940 format, swift mt940" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/mt940-field-reference/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/mt940-field-reference/" />
          <meta property="og:title" content="MT940 Fields Explained: Complete Tag Reference (:20: to :62F:)" />
          <meta property="og:description" content="A tag-by-tag MT940 reference: header, balance, and statement line fields, the :86: structured remittance subfields, and the transaction code table." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/mt940-field-reference/" />
          <meta name="twitter:title" content="MT940 Fields Explained: Complete Tag Reference" />
          <meta name="twitter:description" content="Tag-by-tag MT940 reference: :60F:, :61:, :86:, :62F:, structured remittance subfields, and transaction codes." />
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
                  <h1 className="h1">MT940 Fields Explained: The Complete Tag Reference</h1>
                  <div className="text-gray-400 text-center mt-4">20/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="MT940 field tag reference table"
                  />

                  <article className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-8">
                      MT940 is the SWIFT customer statement message — the format banks have used for decades to
                      send end-of-day account statements to corporate clients. It is being retired in favour of
                      ISO 20022 <code className="text-purple-300">camt.053</code> (the MT↔MX coexistence period ends
                      in November 2026), but billions of lines of MT940 are still produced daily and every bank
                      statement parser in production still has to read it. This reference covers every tag you will
                      actually meet, in the order it appears in a statement.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The tag reference</h2>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-sm border border-gray-700">
                        <thead>
                          <tr className="bg-gray-800">
                            <th className="text-left p-3 border-b border-gray-700">Tag</th>
                            <th className="text-left p-3 border-b border-gray-700">Name</th>
                            <th className="text-left p-3 border-b border-gray-700">Format</th>
                            <th className="text-left p-3 border-b border-gray-700">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr><td className="p-3 font-mono text-purple-300">:20:</td><td className="p-3">Transaction Reference Number</td><td className="p-3 font-mono text-xs">16x</td><td className="p-3">Sender's reference for the whole statement. Always present.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:21:</td><td className="p-3">Related Reference</td><td className="p-3 font-mono text-xs">16x</td><td className="p-3">Optional — links the statement to a prior instruction (e.g., a :202: request).</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:25:</td><td className="p-3">Account Identification</td><td className="p-3 font-mono text-xs">35x</td><td className="p-3">The account being reported — usually the IBAN, sometimes a domestic account number or IBAN in an odd format.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:28C:</td><td className="p-3">Statement Number / Sequence Number</td><td className="p-3 font-mono text-xs">5n[/5n]</td><td className="p-3">e.g. <code className="font-mono">00042/001</code> — statement 42, page 1. Multi-page statements share the first number.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:60F: / :60M:</td><td className="p-3">Opening Balance</td><td className="p-3 font-mono text-xs">C/D YYMMDD CCC amount</td><td className="p-3">F = first, M = intermediate (page 2+ of a long statement). Amount uses a comma as decimal separator.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:61:</td><td className="p-3">Statement Line</td><td className="p-3 font-mono text-xs">complex</td><td className="p-3">One per transaction. Anatomy decoded below — the field everyone searches for.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:86:</td><td className="p-3">Information to Account Owner</td><td className="p-3 font-mono text-xs">6×65x</td><td className="p-3">The remittance/remark text that follows a :61:. Either free text or structured <code className="font-mono">?NN</code> subfields / SEPA tags.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:62F: / :62M:</td><td className="p-3">Closing Balance</td><td className="p-3 font-mono text-xs">C/D YYMMDD CCC amount</td><td className="p-3">F = final (last page), M = intermediate (carried to next page). The value every reconciliation checks.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:64:</td><td className="p-3">Available Balance</td><td className="p-3 font-mono text-xs">C/D YYMMDD CCC amount</td><td className="p-3">Current cleared/available balance — often different from the closing book balance.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:65:</td><td className="p-3">Forward Available Balance</td><td className="p-3 font-mono text-xs">C/D YYMMDD CCC amount</td><td className="p-3">Projected balance at a future value date (pending debits). Can repeat.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:90D: / :90C:</td><td className="p-3">Summary totals</td><td className="p-3 font-mono text-xs">count CCC amount</td><td className="p-3">Number and sum of debit (:90D:) or credit (:90C:) entries in the statement.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">:NS:</td><td className="p-3">Non-SWIFT Extension</td><td className="p-3 font-mono text-xs">65x</td><td className="p-3">Bank-specific data — some banks hide proprietary structured info here.</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">Anatomy of a :61: statement line</h2>
                    <p className="mb-4">A single <code className="text-purple-300">:61:</code> line packs up to ten subfields:</p>
                    <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto text-xs text-gray-300 mb-4">
{`:61:2609210921D1000,00NTRFNONREF//E2E-001
     └─┬─┘ └─┬┘ └─┬─┬───┘└┬┘└──┬──┘└─┬───┘
     value   entry D/  amt funds tx cust    //bank
     date    date  C       code  code ref   ref`}
                    </pre>
                    <ul className="list-disc pl-6 mb-8 space-y-2">
                      <li><strong className="text-gray-200">Value date</strong> — <code className="text-purple-300">YYMMDD</code>, always present.</li>
                      <li><strong className="text-gray-200">Entry date</strong> — optional <code className="text-purple-300">MMDD</code> (booking date; may differ from value date).</li>
                      <li><strong className="text-gray-200">Debit/credit mark</strong> — <code className="text-purple-300">C</code>, <code className="text-purple-300">D</code>, or the reversal marks <code className="text-purple-300">RC</code>/<code className="text-purple-300">RD</code>.</li>
                      <li><strong className="text-gray-200">Funds code</strong> — optional single letter (S = same-day, V = value-date, B = booked).</li>
                      <li><strong className="text-gray-200">Amount</strong> — comma as decimal separator: <code className="text-purple-300">1000,00</code>.</li>
                      <li><strong className="text-gray-200">Transaction type</strong> — <code className="text-purple-300">N</code> + 3-letter code (see table below).</li>
                      <li><strong className="text-gray-200">Customer reference</strong> — <code className="text-purple-300">NONREF</code> or a reference, up to the <code className="text-purple-300">//</code> delimiter.</li>
                      <li><strong className="text-gray-200">Bank reference</strong> — after <code className="text-purple-300">//</code>: the bank's own entry ID.</li>
                      <li><strong className="text-gray-200">Supplementary details</strong> — free text that may spill onto the next physical line.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Debit/credit marks</h2>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-sm border border-gray-700">
                        <thead><tr className="bg-gray-800"><th className="text-left p-3 border-b border-gray-700">Mark</th><th className="text-left p-3 border-b border-gray-700">Meaning</th></tr></thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr><td className="p-3 font-mono text-purple-300">C</td><td className="p-3">Credit — money in.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">D</td><td className="p-3">Debit — money out.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">RC</td><td className="p-3">Reversal credit — reverses a previous <em>debit</em>. Money effectively comes back to you.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">RD</td><td className="p-3">Reversal debit — reverses a previous <em>credit</em>. Money is effectively taken back.</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-8">
                      Parsers trip over <code className="text-purple-300">RC</code>/<code className="text-purple-300">RD</code> constantly: an RD entry must be treated as negative — a returned direct debit shows as RD, not as a normal debit.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Transaction type codes</h2>
                    <p className="mb-4">The letter after the amount identifies the transaction class. Common codes:</p>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-sm border border-gray-700">
                        <thead><tr className="bg-gray-800"><th className="text-left p-3 border-b border-gray-700">Code</th><th className="text-left p-3 border-b border-gray-700">Meaning</th></tr></thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr><td className="p-3 font-mono text-purple-300">NTRF</td><td className="p-3">Transfer — ordinary SEPA credit transfers and most payments.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">NDDT</td><td className="p-3">Direct debit — a SDD collection charged to the account.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">NMSC</td><td className="p-3">Miscellaneous — catch-all for bank-specific postings.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">NCHK</td><td className="p-3">Cheque.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">NBNK</td><td className="p-3">Bank charges / fees.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">NINT</td><td className="p-3">Interest credit or debit.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">NCMZ</td><td className="p-3">Cash management sweep / zero balancing.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">NCCO / NRCR</td><td className="p-3">Card payment / card receipt (acquiring settlement).</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">NEXN</td><td className="p-3">External transfer — FX or cross-border payments.</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">Structured :86: — the remittance tag</h2>
                    <p className="mb-4">
                      The <code className="text-purple-300">:86:</code> field either contains free text or a structured
                      form that starts with a transaction-type <code className="text-purple-300">?00</code> code, then
                      subfields tagged <code className="text-purple-300">?NN</code>. German-language banks (and most
                      SEPA MT940s) use the structured variant:
                    </p>
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm border border-gray-700">
                        <thead><tr className="bg-gray-800"><th className="text-left p-3 border-b border-gray-700">Subfield</th><th className="text-left p-3 border-b border-gray-700">Content</th></tr></thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr><td className="p-3 font-mono text-purple-300">?00</td><td className="p-3">Posting text / transaction class ("SEPA UEBERWEISUNG").</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">?10</td><td className="p-3">Original posting text.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">?20–?29</td><td className="p-3">Remittance lines — free text or SEPA tags (below).</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">?30</td><td className="p-3">Counterparty BIC.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">?31</td><td className="p-3">Counterparty IBAN / account number.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">?32, ?33</td><td className="p-3">Counterparty name (continues across both).</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">?34</td><td className="p-3">SEPA purpose code.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">?60–?63</td><td className="p-3">Additional remittance text.</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-4">Inside the ?20–?29 lines, SEPA remittance is packed as four-letter tags:</p>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-sm border border-gray-700">
                        <thead><tr className="bg-gray-800"><th className="text-left p-3 border-b border-gray-700">Tag</th><th className="text-left p-3 border-b border-gray-700">Maps to (camt)</th><th className="text-left p-3 border-b border-gray-700">Content</th></tr></thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr><td className="p-3 font-mono text-purple-300">EREF+</td><td className="p-3">EndToEndId</td><td className="p-3">End-to-end reference — the invoice or mandate ref you need for reconciliation.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">SVWZ+</td><td className="p-3">RmtInf/Ustrd</td><td className="p-3">SEPA remittance text (unstructured).</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">CRED+</td><td className="p-3">CdtrSchmeId</td><td className="p-3">Creditor scheme identifier (SDD collections).</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">MREF+</td><td className="p-3">MndtId</td><td className="p-3">Mandate reference (SDD).</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">PURP+</td><td className="p-3">Purp</td><td className="p-3">SEPA purpose code (SALA, PENS, etc.).</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">ABWA+ / ABWE+</td><td className="p-3">RltdPties</td><td className="p-3">Alternative / corrected counterparty name.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300">RTRN+</td><td className="p-3">RtrInf</td><td className="p-3">Return reason code for rejected/returned payments.</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">A worked example</h2>
                    <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto text-xs text-gray-300 mb-4">
{`:61:2609210921D1000,00NTRFNONREF//E2E-001
:86:020?00SEPA UEBERWEISUNG?20SVWZ+Invoice INV-1042?30DEUTDEFF?31DE89370400440532013000?32Supplier One Ltd`}
                    </pre>
                    <ul className="list-disc pl-6 mb-8 space-y-2">
                      <li>Debited 1,000.00 on 21 September 2026 (value date = entry date).</li>
                      <li>Type NTRF — an ordinary transfer; bank reference E2E-001.</li>
                      <li>Structured :86: says it was a SEPA transfer with remittance "Invoice INV-1042", paid to Supplier One Ltd (DE8937...3000 via DEUTDEFF).</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Try it on real data</h2>
                    <p className="mb-8">
                      Paste a statement into the <Link to="/tools/mt940-to-csv/" className="text-purple-400 hover:text-purple-300 underline">MT940 to CSV converter</Link> to
                      see every field decoded in a table, or convert the same file to ISO 20022 with
                      the <Link to="/tools/mt940-to-camt053/" className="text-purple-400 hover:text-purple-300 underline">MT940 → camt.053 converter</Link> to
                      see how each tag maps across — our <Link to="/insights/mt940-format-camt053-migration/" className="text-purple-400 hover:text-purple-300 underline">MT940 → camt.053 migration guide</Link> covers
                      the coexistence deadline and what changes at the message level.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What is tag :86: in an MT940?</h3>
                    <p className="mb-8">
                      :86: is "Information to Account Owner" — the remittance/remark text attached to the preceding :61:
                      transaction line. In SEPA statements it is usually structured: a <code className="text-purple-300">?00</code> posting
                      code followed by <code className="text-purple-300">?NN</code> subfields carrying the counterparty name (?32/?33),
                      IBAN (?31), BIC (?30), and the SEPA remittance tags EREF+, SVWZ+, CRED+, and MREF+.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between :62F: and :64:?</h3>
                    <p className="mb-8">
                      :62F: is the final <em>book</em> balance of the statement period — what the ledger showed at the
                      statement's closing date. :64: is the <em>available</em> balance — what you could actually withdraw at
                      generation time, after holds and pending debits. Reconciliation should tie against :62F:, not :64:.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What do C, D, RC, and RD mean in :61:?</h3>
                    <p className="mb-8">
                      C is a credit and D a debit. RC and RD are <em>reversal</em> marks: RC reverses a previous debit
                      (money comes back), RD reverses a previous credit (money is taken back — e.g., a returned direct
                      debit). Treat RD entries as negative amounts when summing.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Why does the amount use a comma?</h3>
                    <p className="mb-8">
                      SWIFT MT formats use the comma as the decimal separator and no thousands separator:
                      <code className="text-purple-300">1234567,89</code>. Parsers that assume a dot will either mis-parse or
                      return NaN — normalise the comma before converting to a number.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/mt940-field-reference/"
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

export default Mt940FieldReference;
