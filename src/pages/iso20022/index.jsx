import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateIban, validateBic } from '../../utils/financeUtils';

const MESSAGE_TYPES = {
  'pain.001': 'Customer Credit Transfer Initiation',
  'pain.002': 'Customer Payment Status Report',
  'pain.007': 'Customer Payment Reversal',
  'pain.008': 'Customer Direct Debit Initiation',
  'pacs.002': 'FI-to-FI Payment Status Report',
  'pacs.003': 'FI-to-FI Direct Debit',
  'pacs.004': 'Payment Return',
  'pacs.007': 'FI-to-FI Payment Reversal',
  'pacs.008': 'FI-to-FI Customer Credit Transfer',
  'pacs.009': 'Financial Institution Credit Transfer',
  'camt.029': 'Resolution of Investigation',
  'camt.052': 'Bank-to-Customer Account Report',
  'camt.053': 'Bank-to-Customer Statement',
  'camt.054': 'Bank-to-Customer Debit/Credit Notification',
  'camt.055': 'Customer Payment Cancellation Request',
  'camt.056': 'FI-to-FI Payment Cancellation Request',
  'camt.060': 'Account Reporting Request',
  'head.001': 'Business Application Header',
};

const SAMPLE_PAIN001 = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>MSG-2026-0001</MsgId>
      <CreDtTm>2026-09-21T09:30:00</CreDtTm>
      <NbOfTxs>2</NbOfTxs>
      <CtrlSum>1750.00</CtrlSum>
      <InitgPty><Nm>Example Corp GmbH</Nm></InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>PMT-001</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <ReqdExctnDt>2026-09-22</ReqdExctnDt>
      <Dbtr><Nm>Example Corp GmbH</Nm></Dbtr>
      <DbtrAcct><Id><IBAN>AT611904300234573201</IBAN></Id></DbtrAcct>
      <DbtrAgt><FinInstnId><BIC>GIBAATWWXXX</BIC></FinInstnId></DbtrAgt>
      <CdtTrfTxInf>
        <PmtId><EndToEndId>E2E-001</EndToEndId></PmtId>
        <Amt><InstdAmt Ccy="EUR">1000.00</InstdAmt></Amt>
        <CdtrAgt><FinInstnId><BIC>DEUTDEFF</BIC></FinInstnId></CdtrAgt>
        <Cdtr><Nm>Supplier One Ltd</Nm></Cdtr>
        <CdtrAcct><Id><IBAN>DE89370400440532013000</IBAN></Id></CdtrAcct>
        <RmtInf><Ustrd>Invoice INV-1042</Ustrd></RmtInf>
      </CdtTrfTxInf>
      <CdtTrfTxInf>
        <PmtId><EndToEndId>E2E-002</EndToEndId></PmtId>
        <Amt><InstdAmt Ccy="EUR">750.00</InstdAmt></Amt>
        <Cdtr><Nm>Supplier Two OG</Nm></Cdtr>
        <CdtrAcct><Id><IBAN>AT611904300234573201</IBAN></Id></CdtrAcct>
        <RmtInf><Ustrd>Invoice INV-1057</Ustrd></RmtInf>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`;

const SAMPLE_CAMT053 = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.02">
  <BkToCstmrStmt>
    <GrpHdr>
      <MsgId>STMT-2026-09-001</MsgId>
      <CreDtTm>2026-09-21T06:00:00</CreDtTm>
    </GrpHdr>
    <Stmt>
      <Id>1</Id>
      <CreDtTm>2026-09-21T06:00:00</CreDtTm>
      <Acct><Id><IBAN>AT611904300234573201</IBAN></Id><Ccy>EUR</Ccy></Acct>
      <Bal>
        <Tp><CdOrPrtry><Cd>OPBD</Cd></CdOrPrtry></Tp>
        <Amt Ccy="EUR">5000.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Dt><Dt>2026-09-20</Dt></Dt>
      </Bal>
      <Bal>
        <Tp><CdOrPrtry><Cd>CLBD</Cd></CdOrPrtry></Tp>
        <Amt Ccy="EUR">4250.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Dt><Dt>2026-09-21</Dt></Dt>
      </Bal>
      <Ntry>
        <Amt Ccy="EUR">1000.00</Amt>
        <CdtDbtInd>DBIT</CdtDbtInd>
        <Sts>BOOK</Sts>
        <BookgDt><Dt>2026-09-21</Dt></BookgDt>
        <ValDt><Dt>2026-09-21</Dt></ValDt>
        <NtryDtls><TxDtls><Refs><EndToEndId>E2E-001</EndToEndId></Refs><RmtInf><Ustrd>Invoice INV-1042</Ustrd></RmtInf></TxDtls></NtryDtls>
      </Ntry>
      <Ntry>
        <Amt Ccy="EUR">250.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Sts>BOOK</Sts>
        <BookgDt><Dt>2026-09-21</Dt></BookgDt>
        <ValDt><Dt>2026-09-21</Dt></ValDt>
        <NtryDtls><TxDtls><Refs><EndToEndId>RCV-778</EndToEndId></Refs><RmtInf><Ustrd>Customer payment</Ustrd></RmtInf></TxDtls></NtryDtls>
      </Ntry>
    </Stmt>
  </BkToCstmrStmt>
</Document>`;

function text(el, tag) {
  const node = el ? el.getElementsByTagName(tag)[0] : null;
  return node ? node.textContent.trim() : null;
}

function detectMessageType(doc) {
  const root = doc.documentElement;
  const ns = root.namespaceURI || '';
  const m = ns.match(/xsd:([a-z]+\.\d+)/i);
  if (m) return m[1];
  // Fallback: inspect root child element names
  const child = Array.from(root.children)[0];
  const name = child ? child.localName : root.localName;
  const MAP = {
    CstmrCdtTrfInitn: 'pain.001', CstmrPmtStsRpt: 'pain.002', CstmrDrctDbtInitn: 'pain.008',
    FIToFICstmrCdtTrf: 'pacs.008', FIToFIPmtStsRpt: 'pacs.002', PmtRtr: 'pacs.004',
    BkToCstmrStmt: 'camt.053', BkToCstmrAcctRpt: 'camt.052', BkToCstmrDbtCdtNtfctn: 'camt.054',
    FIToFIPmtCxlReq: 'camt.056', CstmrPmtCxlReq: 'camt.055', RsltnOfInvstgtn: 'camt.029',
  };
  return MAP[name] || name || 'unknown';
}

function parseIso20022(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'application/xml');
  const parseError = doc.getElementsByTagName('parsererror')[0];
  if (parseError) {
    return { error: `XML parse error: ${parseError.textContent.slice(0, 300)}` };
  }

  const type = detectMessageType(doc);
  const result = {
    type,
    typeName: MESSAGE_TYPES[type] || 'Unknown / unsupported message type',
    namespace: doc.documentElement.namespaceURI,
    header: {},
    transactions: [],
    balances: [],
    findings: [],
  };

  const grpHdr = doc.getElementsByTagName('GrpHdr')[0];
  if (grpHdr) {
    result.header.msgId = text(grpHdr, 'MsgId');
    result.header.creDtTm = text(grpHdr, 'CreDtTm');
    result.header.nbOfTxs = text(grpHdr, 'NbOfTxs');
    result.header.ctrlSum = text(grpHdr, 'CtrlSum');
    result.header.initgPty = text(grpHdr, 'InitgPty') ? text(grpHdr.getElementsByTagName('InitgPty')[0], 'Nm') : null;
  }

  // Payment initiation / FI transfer transactions
  const txNodes = Array.from(doc.getElementsByTagName('CdtTrfTxInf'))
    .concat(Array.from(doc.getElementsByTagName('DrctDbtTxInf')))
    .concat(Array.from(doc.getElementsByTagName('TxInf')));

  txNodes.forEach((tx) => {
    const amtEl = tx.getElementsByTagName('InstdAmt')[0] || tx.getElementsByTagName('IntrBkSttlmAmt')[0] || tx.getElementsByTagName('Amt')[0];
    const ibanEl = Array.from(tx.getElementsByTagName('IBAN'));
    const bicEl = Array.from(tx.getElementsByTagName('BIC')).concat(Array.from(tx.getElementsByTagName('BICFI')));
    result.transactions.push({
      endToEndId: text(tx, 'EndToEndId') || text(tx, 'InstrId'),
      amount: amtEl ? amtEl.textContent.trim() : null,
      currency: amtEl ? amtEl.getAttribute('Ccy') : null,
      debtor: text(tx.getElementsByTagName('Dbtr')[0], 'Nm'),
      creditor: text(tx.getElementsByTagName('Cdtr')[0], 'Nm'),
      ibans: ibanEl.map((e) => e.textContent.trim()),
      bics: bicEl.map((e) => e.textContent.trim()),
      remittance: text(tx, 'Ustrd'),
    });
  });

  // camt statements: balances + entries
  Array.from(doc.getElementsByTagName('Bal')).forEach((bal) => {
    const amtEl = bal.getElementsByTagName('Amt')[0];
    result.balances.push({
      type: text(bal, 'Cd') || text(bal, 'Prtry'),
      amount: amtEl ? amtEl.textContent.trim() : null,
      currency: amtEl ? amtEl.getAttribute('Ccy') : null,
      cdtDbt: text(bal, 'CdtDbtInd'),
      date: text(bal, 'Dt'),
    });
  });

  Array.from(doc.getElementsByTagName('Ntry')).forEach((ntry) => {
    const amtEl = ntry.getElementsByTagName('Amt')[0];
    result.transactions.push({
      endToEndId: text(ntry, 'EndToEndId') || text(ntry, 'AcctSvcrRef'),
      amount: amtEl ? amtEl.textContent.trim() : null,
      currency: amtEl ? amtEl.getAttribute('Ccy') : null,
      cdtDbt: text(ntry, 'CdtDbtInd'),
      status: text(ntry, 'Sts'),
      bookingDate: text(ntry.getElementsByTagName('BookgDt')[0], 'Dt'),
      valueDate: text(ntry.getElementsByTagName('ValDt')[0], 'Dt'),
      remittance: text(ntry, 'Ustrd'),
      ibans: Array.from(ntry.getElementsByTagName('IBAN')).map((e) => e.textContent.trim()),
      bics: [],
    });
  });

  // Consistency findings
  if (result.header.nbOfTxs != null) {
    const declared = parseInt(result.header.nbOfTxs, 10);
    const counted = result.transactions.length;
    result.findings.push({
      ok: declared === counted,
      label: 'NbOfTxs consistency',
      detail: `Declared ${declared}, counted ${counted} transaction(s)`,
    });
  }
  if (result.header.ctrlSum != null && result.transactions.length > 0) {
    const declared = parseFloat(result.header.ctrlSum);
    const sum = result.transactions.reduce((acc, t) => acc + (parseFloat(t.amount) || 0), 0);
    result.findings.push({
      ok: Math.abs(declared - sum) < 0.005,
      label: 'CtrlSum consistency',
      detail: `Declared ${declared.toFixed(2)}, computed ${sum.toFixed(2)}`,
    });
  }

  // Validate embedded IBANs / BICs
  const seen = new Set();
  result.transactions.forEach((t) => {
    t.ibans.forEach((iban) => {
      if (seen.has(`iban:${iban}`)) return;
      seen.add(`iban:${iban}`);
      const v = validateIban(iban);
      result.findings.push({
        ok: v.valid,
        label: `IBAN ${iban.slice(0, 8)}…`,
        detail: v.valid ? `Valid (${v.country.name})` : v.checks.find((c) => !c.ok)?.detail || 'Invalid',
      });
    });
    t.bics.forEach((bic) => {
      if (seen.has(`bic:${bic}`)) return;
      seen.add(`bic:${bic}`);
      const v = validateBic(bic);
      result.findings.push({
        ok: v.valid,
        label: `BIC ${bic}`,
        detail: v.valid ? 'Valid ISO 9362 structure' : v.checks.find((c) => !c.ok)?.detail || 'Invalid',
      });
    });
  });

  return result;
}

function Finding({ f }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-700 last:border-0">
      <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${f.ok ? 'bg-green-900/60 text-green-400' : 'bg-red-900/60 text-red-400'}`}>
        {f.ok ? '✓' : '✗'}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-200">{f.label}</p>
        <p className="text-xs text-gray-400">{f.detail}</p>
      </div>
    </div>
  );
}

function Iso20022Viewer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const parse = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(parseIso20022(v));
  };

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const txt = String(reader.result || '');
      setInput(txt);
      parse(txt);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free ISO 20022 Message Viewer - pain.001, camt.053, pacs.008 | OG Technologies EU</title>
        <meta name="description" content="Parse and inspect ISO 20022 XML messages online: pain.001, pain.008, camt.052/053/054, pacs.008. Auto-detects message type, checks NbOfTxs/CtrlSum consistency, validates embedded IBANs and BICs. 100% client-side." />
        <meta name="keywords" content="iso 20022 validator, pain.001 viewer, camt.053 parser, pacs.008, sepa xml validator, iso20022 message viewer, payment xml" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/iso-20022-viewer/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/iso-20022-viewer/" />
        <meta property="og:title" content="Free ISO 20022 Message Viewer - pain.001, camt.053, pacs.008 | OG Technologies EU" />
        <meta property="og:description" content="Parse and inspect ISO 20022 XML messages: auto-detect type, check consistency, validate IBANs/BICs. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/iso-20022-viewer/" />
        <meta name="twitter:title" content="Free ISO 20022 Message Viewer - pain.001, camt.053, pacs.008 | OG Technologies EU" />
        <meta name="twitter:description" content="Parse and inspect ISO 20022 XML messages: auto-detect type, check consistency, validate IBANs/BICs. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'ISO 20022 Message Viewer',
            url: 'https://www.ogtechnologies.co/tools/iso-20022-viewer/',
            description: 'Parse and inspect ISO 20022 XML messages: pain.001, pain.008, camt.052/053/054, pacs.008. Auto-detects message type, checks NbOfTxs/CtrlSum consistency, validates embedded IBANs and BICs. 100% client-side.',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            featureList: [
              'Auto-detection of message type from namespace',
              'pain.001, pain.008, camt.052/053/054, pacs.008 support',
              'NbOfTxs and CtrlSum consistency checks',
              'Embedded IBAN and BIC validation',
              'Balances and transaction extraction',
            ],
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
          })}
        </script>
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
                <h1 className="h1">ISO 20022 Message Viewer</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste or drop an ISO 20022 XML message — pain.001, pain.008, camt.052/053/054, pacs.008 and more.
                  The viewer detects the message type, extracts transactions and balances, checks NbOfTxs/CtrlSum
                  consistency, and validates embedded IBANs and BICs. Nothing leaves your browser.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">ISO 20022 XML message</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={10}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder='<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03">…'
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => parse()}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Parse Message
                    </button>
                    <label className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors cursor-pointer">
                      Load file
                      <input type="file" accept=".xml,.txt" className="hidden" onChange={onFile} />
                    </label>
                    <button
                      type="button"
                      onClick={() => { setInput(SAMPLE_PAIN001); setResult(parseIso20022(SAMPLE_PAIN001)); }}
                      className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Sample pain.001
                    </button>
                    <button
                      type="button"
                      onClick={() => { setInput(SAMPLE_CAMT053); setResult(parseIso20022(SAMPLE_CAMT053)); }}
                      className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Sample camt.053
                    </button>
                  </div>

                  {result && result.error && (
                    <div className="rounded-md px-4 py-3 text-sm font-medium bg-red-900/40 text-red-300 border border-red-700">
                      {result.error}
                    </div>
                  )}

                  {result && !result.error && (
                    <div>
                      <div className="rounded-md px-4 py-3 mb-4 text-sm font-medium bg-purple-900/40 text-purple-300 border border-purple-700">
                        {result.type} — {result.typeName}
                        <span className="block text-xs text-gray-400 font-normal mt-1 font-mono break-all">{result.namespace}</span>
                      </div>

                      {Object.keys(result.header).length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-300 mb-2">Group header</h3>
                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            {result.header.msgId && <div className="bg-gray-700/60 rounded-md p-3"><p className="text-gray-400 text-xs mb-1">Message ID</p><p className="text-gray-200 font-mono break-all">{result.header.msgId}</p></div>}
                            {result.header.creDtTm && <div className="bg-gray-700/60 rounded-md p-3"><p className="text-gray-400 text-xs mb-1">Created</p><p className="text-gray-200 font-mono">{result.header.creDtTm}</p></div>}
                            {result.header.nbOfTxs && <div className="bg-gray-700/60 rounded-md p-3"><p className="text-gray-400 text-xs mb-1">NbOfTxs</p><p className="text-gray-200 font-mono">{result.header.nbOfTxs}</p></div>}
                            {result.header.ctrlSum && <div className="bg-gray-700/60 rounded-md p-3"><p className="text-gray-400 text-xs mb-1">CtrlSum</p><p className="text-gray-200 font-mono">{result.header.ctrlSum}</p></div>}
                            {result.header.initgPty && <div className="bg-gray-700/60 rounded-md p-3"><p className="text-gray-400 text-xs mb-1">Initiating party</p><p className="text-gray-200">{result.header.initgPty}</p></div>}
                          </div>
                        </div>
                      )}

                      {result.balances.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-300 mb-2">Balances</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="text-left text-gray-400 text-xs border-b border-gray-700">
                                  <th className="pb-2 pr-4">Type</th>
                                  <th className="pb-2 pr-4">Amount</th>
                                  <th className="pb-2 pr-4">Cdt/Dbt</th>
                                  <th className="pb-2">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.balances.map((b, i) => (
                                  <tr key={i} className="border-b border-gray-700/50 text-gray-200">
                                    <td className="py-2 pr-4 font-mono">{b.type}</td>
                                    <td className="py-2 pr-4 font-mono">{b.amount} {b.currency}</td>
                                    <td className="py-2 pr-4">{b.cdtDbt}</td>
                                    <td className="py-2 font-mono">{b.date}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {result.transactions.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-300 mb-2">Transactions ({result.transactions.length})</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="text-left text-gray-400 text-xs border-b border-gray-700">
                                  <th className="pb-2 pr-4">End-to-End ID</th>
                                  <th className="pb-2 pr-4">Amount</th>
                                  <th className="pb-2 pr-4">Counterparty</th>
                                  <th className="pb-2">Remittance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.transactions.map((t, i) => (
                                  <tr key={i} className="border-b border-gray-700/50 text-gray-200 align-top">
                                    <td className="py-2 pr-4 font-mono text-xs break-all">{t.endToEndId || '—'}</td>
                                    <td className="py-2 pr-4 font-mono whitespace-nowrap">
                                      {t.cdtDbt === 'DBIT' ? '−' : ''}{t.amount} {t.currency}
                                      {t.cdtDbt && <span className="block text-xs text-gray-500">{t.cdtDbt}</span>}
                                    </td>
                                    <td className="py-2 pr-4 text-xs">{t.creditor || t.debtor || '—'}</td>
                                    <td className="py-2 text-xs break-all">{t.remittance || '—'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {result.findings.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-300 mb-2">Consistency checks</h3>
                          {result.findings.map((f, i) => <Finding key={i} f={f} />)}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">Supported messages:</strong> payment initiation (pain.001,
                    pain.008), FI-to-FI transfers (pacs.008, pacs.004), cash management statements and reports
                    (camt.052, camt.053, camt.054), and related types. The message type is detected from the XML
                    namespace.
                  </p>
                  <p>
                    This viewer performs structural parsing and business-rule consistency checks (NbOfTxs, CtrlSum,
                    IBAN/BIC validity). It is not a full XSD schema validator — for official schema validation use
                    your bank's or scheme's conformance tooling.
                  </p>
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

export default Iso20022Viewer;
