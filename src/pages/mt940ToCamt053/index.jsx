import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { parseMt940 } from '../../utils/mt940Utils';

const SAMPLE_MT940 = `{1:F01GIBAATWWXXXX0000000000}{2:I940BANKDEFFXXXXN}{4:
:20:STMT-2026-09-001
:25:AT611904300234573201
:28C:00001/001
:60F:C260920EUR5000,00
:61:2609210921D1000,00NTRFNONREF//E2E-001
:86:020?00SEPA UEBERWEISUNG?20SVWZ+Invoice INV-1042?30DEUTDEFF?31DE89370400440532013000?32Supplier One Ltd
:61:2609210921C250,00NTRFNONREF//RCV-778
:86:020?00SEPA GUTSCHRIFT?20SVWZ+Customer payment?30GIBAATWW?31AT611904300234573201?32Customer Two
:62F:C260921EUR4250,00
-}`;

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function looksLikeIban(s) {
  return /^[A-Z]{2}\d{2}[A-Z0-9]{11,32}$/i.test(String(s || '').replace(/\s/g, ''));
}

// Booking date: entry date MMDD + value-date year. If the entry month is after
// the value month, the entry belongs to the previous year.
function bookingDate(entry) {
  if (!entry.entryDate) return entry.valueDate;
  const year = parseInt(entry.valueDate.slice(0, 4), 10);
  const eMonth = parseInt(entry.entryDate.slice(0, 2), 10);
  const vMonth = parseInt(entry.valueDate.slice(5, 7), 10);
  return `${eMonth > vMonth ? year - 1 : year}-${entry.entryDate}`;
}

function balanceXml(type, bal) {
  if (!bal) return '';
  return `        <Bal>
          <Tp><CdOrPrtry><Cd>${type}</Cd></CdOrPrtry></Tp>
          <Amt Ccy="${esc(bal.currency)}">${bal.amount.toFixed(2)}</Amt>
          <CdtDbtInd>${bal.drcr === 'D' ? 'DBIT' : 'CRDT'}</CdtDbtInd>
          <Dt><Dt>${bal.date}</Dt></Dt>
        </Bal>`;
}

function entryXml(e, ccy) {
  const p = e.parsed86 || {};
  const isCredit = e.drcr === 'C' || e.drcr === 'RC';
  const partyTag = isCredit ? 'Dbtr' : 'Cdtr';
  const agentTag = isCredit ? 'DbtrAgt' : 'CdtrAgt';
  const counterparty = (p.counterpartyName || []).join(' ').trim();
  const remittance = (p.remittance || []).join(' ').trim();
  const endToEnd = p.eref || (e.custRef && e.custRef !== 'NONREF' ? e.custRef : null);

  const lines = [];
  lines.push(`        <Ntry>`);
  lines.push(`          <Amt Ccy="${esc(ccy)}">${e.amount.toFixed(2)}</Amt>`);
  lines.push(`          <CdtDbtInd>${isCredit ? 'CRDT' : 'DBIT'}</CdtDbtInd>`);
  if (e.reversal) lines.push(`          <RvslInd>true</RvslInd>`);
  lines.push(`          <Sts>BOOK</Sts>`);
  lines.push(`          <BookgDt><Dt>${bookingDate(e)}</Dt></BookgDt>`);
  lines.push(`          <ValDt><Dt>${e.valueDate}</Dt></ValDt>`);
  if (e.bankRef) lines.push(`          <AcctSvcrRef>${esc(e.bankRef)}</AcctSvcrRef>`);

  const details = [];
  if (endToEnd || e.bankRef) {
    details.push(`            <Rfs>`);
    if (endToEnd) details.push(`              <EndToEndId>${esc(endToEnd)}</EndToEndId>`);
    if (e.bankRef) details.push(`              <AcctSvcrRef>${esc(e.bankRef)}</AcctSvcrRef>`);
    details.push(`            </Rfs>`);
  }
  if (counterparty || p.iban) {
    details.push(`            <RltdPties>`);
    details.push(`              <${partyTag}>${counterparty ? `<Nm>${esc(counterparty)}</Nm>` : ''}</${partyTag}>`);
    if (p.iban) details.push(`              <${partyTag}Acct><Id><IBAN>${esc(p.iban)}</IBAN></Id></${partyTag}Acct>`);
    details.push(`            </RltdPties>`);
  }
  if (p.bic) {
    details.push(`            <RltdAgts><${agentTag}><FinInstnId><BIC>${esc(p.bic)}</BIC></FinInstnId></${agentTag}></RltdAgts>`);
  }
  if (remittance || p.cred || p.mref) {
    details.push(`            <RmtInf>`);
    if (remittance) details.push(`              <Ustrd>${esc(remittance)}</Ustrd>`);
    if (p.cred || p.mref) {
      details.push(`              <Strd>`);
      if (p.cred) details.push(`                <Cdtr><Id><PrvtId><Othr><Id>${esc(p.cred)}</Id></Othr></PrvtId></Id></Cdtr>`);
      if (p.mref) details.push(`                <RfrdDocInf><Nb>${esc(p.mref)}</Nb></RfrdDocInf>`);
      details.push(`              </Strd>`);
    }
    details.push(`            </RmtInf>`);
  }

  if (details.length) {
    lines.push(`          <NtryDtls><TxDtls>`);
    lines.push(...details);
    lines.push(`          </TxDtls></NtryDtls>`);
  }
  lines.push(`        </Ntry>`);
  return lines.join('\n');
}

function toCamt053(statements, msgId) {
  const creDtTm = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const stmts = statements.map((st) => {
    const seq = st.statementNr ? st.statementNr.split('/')[0] : null;
    const ccy = (st.opening && st.opening.currency) || (st.closing && st.closing.currency) || 'EUR';
    const acctId = looksLikeIban(st.account)
      ? `<IBAN>${esc(st.account.replace(/\s/g, ''))}</IBAN>`
      : `<Othr><Id>${esc(st.account || 'UNKNOWN')}</Id></Othr>`;

    const bals = [
      st.opening && balanceXml('OPBD', st.opening),
      st.closing && balanceXml('CLBD', st.closing),
      st.available && balanceXml('CLAV', st.available),
      ...st.forward.map((b) => balanceXml('FWAV', b)),
    ].filter(Boolean).join('\n');

    const entries = st.entries.map((e) => entryXml(e, ccy)).join('\n');

    return `    <Stmt>
      <Id>${esc([st.ref, st.statementNr].filter(Boolean).join('-') || 'STMT')}</Id>
${seq ? `      <ElctrncSeqNb>${esc(seq)}</ElctrncSeqNb>` : ''}
      <CreDtTm>${creDtTm}</CreDtTm>
${st.opening && st.closing ? `      <FrToDt><FrDt>${st.opening.date}</FrDt><ToDt>${st.closing.date}</ToDt></FrToDt>` : ''}
      <Acct><Id>${acctId}</Id><Ccy>${esc(ccy)}</Ccy></Acct>
${bals}
${entries}
    </Stmt>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.02">
  <BkToCstmrStmt>
    <GrpHdr>
      <MsgId>${esc(msgId)}</MsgId>
      <CreDtTm>${creDtTm}</CreDtTm>
    </GrpHdr>
${stmts}
  </BkToCstmrStmt>
</Document>`;
}

function Mt940ToCamt053() {
  const [input, setInput] = useState('');
  const [xml, setXml] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  const convert = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setXml(null); setSummary(null); setError(''); return; }
    const parsed = parseMt940(v);
    if (!parsed.length) {
      setXml(null); setSummary(null);
      setError('No MT940 statement found. Expected tags like :20:, :60F:, :61:, :62F:.');
      return;
    }
    setError('');
    const entries = parsed.reduce((n, s) => n + s.entries.length, 0);
    setXml(toCamt053(parsed, `MT940-CAMT053-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`));
    setSummary({ statements: parsed.length, entries });
  };

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const txt = String(reader.result || '');
      setInput(txt);
      convert(txt);
    };
    reader.readAsText(file);
  };

  const downloadXml = () => {
    if (!xml) return;
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'camt.053.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free MT940 to camt.053 Converter - ISO 20022 Migration Tool | OG Technologies EU</title>
        <meta name="description" content="Convert SWIFT MT940 bank statements to ISO 20022 camt.053.001.02 XML online. Maps :60F:/:62F: balances, :61: entries, and :86: remittance data. 100% client-side — no upload." />
        <meta name="keywords" content="mt940 to camt053, mt940 converter, iso 20022 converter, camt.053 generator, mt940 iso 20022 equivalent, swift to iso 20022, mt940 migration, bank statement converter" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/mt940-to-camt053/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/mt940-to-camt053/" />
        <meta property="og:title" content="Free MT940 to camt.053 Converter - ISO 20022 Migration Tool | OG Technologies EU" />
        <meta property="og:description" content="Convert MT940 statements to camt.053 XML: balances, entries, and remittance mapped. 100% client-side — no upload." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/mt940-to-camt053/" />
        <meta name="twitter:title" content="Free MT940 to camt.053 Converter - ISO 20022 Migration Tool | OG Technologies EU" />
        <meta name="twitter:description" content="Convert MT940 statements to camt.053 XML: balances, entries, and remittance mapped. 100% client-side — no upload." />
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
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1">MT940 to camt.053 Converter</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Migrate a SWIFT MT940 statement (.sta) to ISO 20022 camt.053.001.02 XML. Balances become
                  OPBD/CLBD entries, :61: lines become Ntry elements, and :86: SEPA remittance data lands in
                  RmtInf — all in your browser, nothing uploaded.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">MT940 statement</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={10}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder=":20:STATEMENT-REF&#10;:25:AT611904300234573201&#10;:28C:00001/001&#10;:60F:C260920EUR5000,00&#10;:61:..."
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => convert()}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Convert to camt.053
                    </button>
                    <label className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors cursor-pointer">
                      Load .sta / .mt940 file
                      <input type="file" accept=".sta,.mt940,.940,.txt" className="hidden" onChange={onFile} />
                    </label>
                    <button
                      type="button"
                      onClick={() => { setInput(SAMPLE_MT940); convert(SAMPLE_MT940); }}
                      className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Load sample
                    </button>
                    {xml && (
                      <>
                        <button
                          type="button"
                          onClick={downloadXml}
                          className="px-4 py-2 rounded-md bg-green-700 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          Download .xml
                        </button>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(xml)}
                          className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                        >
                          Copy XML
                        </button>
                      </>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-md px-4 py-3 text-sm font-medium bg-red-900/40 text-red-300 border border-red-700">
                      {error}
                    </div>
                  )}

                  {xml && summary && (
                    <>
                      <div className="rounded-md px-4 py-3 mb-4 text-sm font-medium bg-green-900/40 text-green-300 border border-green-700">
                        Generated camt.053.001.02 — {summary.statements} statement(s), {summary.entries} Ntry element(s).
                        Validate the output with the <Link to="/tools/sepa-xml-validator/" className="underline hover:text-green-200">SEPA XML Validator</Link> or inspect it in the <Link to="/tools/iso-20022-viewer/" className="underline hover:text-green-200">ISO 20022 Viewer</Link>.
                      </div>
                      <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto text-xs text-gray-300 max-h-[32rem] overflow-y-auto">
                        {xml}
                      </pre>
                    </>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">Field mapping:</strong> :60F:/:60M: → OPBD balance,
                    :62F:/:62M: → CLBD, :64: → CLAV, :65: → FWAV. Each :61: becomes an Ntry with BookgDt
                    (entry date) and ValDt (value date); RC/RD reversal marks set RvslInd. Structured :86:
                    fields map counterparty name/IBAN/BIC into RltdPties/RltdAgts and SVWZ+/EREF+ text into
                    RmtInf/EndToEndId.
                  </p>
                  <p>
                    <strong className="text-gray-400">Known limitations:</strong> MT940 carries no account owner
                    or BIC for your own account, so Acct contains only the IBAN and currency — enrich these
                    before production use. This converter produces schema-shaped XML for migration testing and
                    reconciliation work, not a bank-certified message. See the{' '}
                    <Link to="/insights/mt940-field-reference/" className="text-purple-400 hover:text-purple-300">MT940 field reference</Link> for
                    what each tag means.
                  </p>
                </div>

                <div className="mt-12">
                  <h2 className="h4 mb-4">Frequently asked questions</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What is the ISO 20022 equivalent of an MT940?</h3>
                      <p className="text-sm text-gray-400">
                        camt.053 (Bank-to-Customer Statement) replaces MT940 for end-of-day account statements.
                        camt.052 covers intraday reporting (like MT942), and camt.054 replaces MT900/MT910
                        debit/credit advices. SWIFT's MT↔MX coexistence period ends in November 2026.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Which camt.053 version does this generate?</h3>
                      <p className="text-sm text-gray-400">
                        camt.053.001.02 — the version most widely deployed in SEPA (EBA/CGI guideline). Newer
                        versions like .001.08 restructure some elements (e.g., remittance under NtryDtls) but the
                        .02 schema remains the common denominator banks currently accept.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Why doesn't my converted file include my bank's BIC or account owner?</h3>
                      <p className="text-sm text-gray-400">
                        MT940 simply doesn't carry them — the account is identified by tag :25: (your IBAN) and
                        nothing else. camt.053 has optional Acct/Ownr and Acct/Svcr elements, but there is no
                        source data to fill them, so the converter leaves them out rather than inventing values.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Can I use the output as a real bank statement?</h3>
                      <p className="text-sm text-gray-400">
                        The XML is schema-shaped and useful for testing ISO 20022 parsers, building reconciliation
                        pipelines, and validating your migration before the deadline. It is not a bank-certified
                        statement — production feeds come from your bank with full party and agent enrichment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="h4 mb-4">Related tools</h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Link to="/tools/mt940-to-csv/" className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                      <p className="text-sm font-semibold text-gray-200">MT940 to CSV</p>
                      <p className="text-xs text-gray-500 mt-1">Same parser, spreadsheet output</p>
                    </Link>
                    <Link to="/tools/iso-20022-viewer/" className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                      <p className="text-sm font-semibold text-gray-200">ISO 20022 Viewer</p>
                      <p className="text-xs text-gray-500 mt-1">Inspect pain.001, camt.053, pacs.008</p>
                    </Link>
                    <Link to="/tools/sepa-xml-validator/" className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                      <p className="text-sm font-semibold text-gray-200">SEPA XML Validator</p>
                      <p className="text-xs text-gray-500 mt-1">Rulebook checks on your camt file</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Mt940ToCamt053;
