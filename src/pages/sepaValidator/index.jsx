import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateIban, validateBic, IBAN_COUNTRIES } from '../../utils/financeUtils';

const FAMILIES = {
  'pain.001': 'Credit Transfer Initiation (SCT)',
  'pain.008': 'Direct Debit Initiation (SDD)',
  'camt.053': 'Bank-to-Customer Statement',
};

const SAMPLE_PAIN001 = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>MSG-2026-0001</MsgId>
      <CreDtTm>2026-10-09T09:30:00</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>1000.00</CtrlSum>
      <InitgPty><Nm>Example Corp GmbH</Nm></InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>PMT-001</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <ReqdExctnDt>2026-10-12</ReqdExctnDt>
      <Dbtr><Nm>Example Corp GmbH</Nm></Dbtr>
      <DbtrAcct><Id><IBAN>AT611904300234573201</IBAN></Id></DbtrAcct>
      <DbtrAgt><FinInstnId><BIC>GIBAATWWXXX</BIC></FinInstnId></DbtrAgt>
      <ChrgBr>SLEV</ChrgBr>
      <CdtTrfTxInf>
        <PmtId><EndToEndId>E2E-001</EndToEndId></PmtId>
        <Amt><InstdAmt Ccy="EUR">1000.00</InstdAmt></Amt>
        <CdtrAgt><FinInstnId><BIC>DEUTDEFF</BIC></FinInstnId></CdtrAgt>
        <Cdtr><Nm>Supplier One Ltd</Nm></Cdtr>
        <CdtrAcct><Id><IBAN>DE89370400440532013000</IBAN></Id></CdtrAcct>
        <RmtInf><Ustrd>Invoice INV-1042</Ustrd></RmtInf>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`;

const SAMPLE_PAIN008 = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02">
  <CstmrDrctDbtInitn>
    <GrpHdr>
      <MsgId>SDD-2026-0007</MsgId>
      <CreDtTm>2026-10-09T10:00:00</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>59.90</CtrlSum>
      <InitgPty><Nm>Gym Plus OG</Nm></InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>DD-001</PmtInfId>
      <PmtMtd>DD</PmtMtd>
      <NbOfTxs>1</NbOfTxs>
      <PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl><LclInstrm><Cd>CORE</Cd></LclInstrm><SeqTp>RCUR</SeqTp></PmtTpInf>
      <ReqdColltnDt>2026-10-15</ReqdColltnDt>
      <Cdtr><Nm>Gym Plus OG</Nm></Cdtr>
      <CdtrAcct><Id><IBAN>AT611904300234573201</IBAN></Id></CdtrAcct>
      <CdtrAgt><FinInstnId><BIC>GIBAATWWXXX</BIC></FinInstnId></CdtrAgt>
      <ChrgBr>SLEV</ChrgBr>
      <CdtrSchmeId><Id><PrvtId><Othr><Id>AT98ZZZ01234567890</Id><SchmeNm><Prtry>SEPA</Prtry></SchmeNm></Othr></PrvtId></Id></CdtrSchmeId>
      <DrctDbtTxInf>
        <PmtId><EndToEndId>MEMBER-2211</EndToEndId></PmtId>
        <InstdAmt Ccy="EUR">59.90</InstdAmt>
        <DrctDbtTx><MndtRltdInf><MndtId>MANDATE-2211</MndtId><DtOfSgntr>2026-01-15</DtOfSgntr></MndtRltdInf></DrctDbtTx>
        <DbtrAgt><FinInstnId><BIC>DEUTDEFF</BIC></FinInstnId></DbtrAgt>
        <Dbtr><Nm>Customer One</Nm></Dbtr>
        <DbtrAcct><Id><IBAN>DE89370400440532013000</IBAN></Id></DbtrAcct>
        <RmtInf><Ustrd>Monthly membership</Ustrd></RmtInf>
      </DrctDbtTxInf>
    </PmtInf>
  </CstmrDrctDbtInitn>
</Document>`;

const SAMPLE_CAMT053 = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.02">
  <BkToCstmrStmt>
    <GrpHdr>
      <MsgId>STMT-2026-10-001</MsgId>
      <CreDtTm>2026-10-09T06:00:00</CreDtTm>
    </GrpHdr>
    <Stmt>
      <Id>1</Id>
      <CreDtTm>2026-10-09T06:00:00</CreDtTm>
      <Acct><Id><IBAN>AT611904300234573201</IBAN></Id><Ccy>EUR</Ccy></Acct>
      <Bal>
        <Tp><CdOrPrtry><Cd>OPBD</Cd></CdOrPrtry></Tp>
        <Amt Ccy="EUR">5000.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Dt><Dt>2026-10-08</Dt></Dt>
      </Bal>
      <Ntry>
        <Amt Ccy="EUR">1000.00</Amt>
        <CdtDbtInd>DBIT</CdtDbtInd>
        <Sts>BOOK</Sts>
        <BookgDt><Dt>2026-10-08</Dt></BookgDt>
        <ValDt><Dt>2026-10-08</Dt></ValDt>
      </Ntry>
    </Stmt>
  </BkToCstmrStmt>
</Document>`;

const txt = (el, tag) => {
  const node = el ? el.getElementsByTagName(tag)[0] : null;
  return node ? node.textContent.trim() : null;
};

const localName = (el) => el.localName || el.nodeName.split(':').pop();
const children = (el, tag) => Array.from(el.children).filter((c) => localName(c) === tag);

function detectFamily(doc) {
  const ns = doc.documentElement.namespaceURI || '';
  const m = ns.match(/xsd:([a-z]+\.\d+)/i);
  if (m) return { family: m[1].toLowerCase(), namespace: ns };
  const first = Array.from(doc.documentElement.children)[0];
  const MAP = {
    CstmrCdtTrfInitn: 'pain.001', CstmrDrctDbtInitn: 'pain.008', BkToCstmrStmt: 'camt.053',
    CstmrPmtStsRpt: 'pain.002', BkToCstmrAcctRpt: 'camt.052', BkToCstmrDbtCdtNtfctn: 'camt.054',
  };
  const family = first ? MAP[localName(first)] : null;
  return { family: family || null, namespace: ns || '(none)' };
}

function validateSepa(xmlText) {
  const findings = [];
  const add = (level, label, detail) => findings.push({ level, label, detail });

  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'application/xml');
  const pe = doc.querySelector('parsererror');
  if (pe) {
    return { findings: [{ level: 'error', label: 'XML is not well-formed', detail: pe.textContent.slice(0, 300) }], family: null };
  }

  const { family, namespace } = detectFamily(doc);
  if (!family) {
    add('error', 'Message type', `Could not detect an ISO 20022 message type from namespace or root structure (${namespace})`);
    return { findings, family: null, namespace };
  }
  const supported = !!FAMILIES[family];
  add(supported ? 'pass' : 'warn', 'Message type', `${family} — ${FAMILIES[family] || 'detected, but only pain.001, pain.008 and camt.053 get full SEPA checks'}`);
  if (/pain\.001\.001\.(?!03)|pain\.008\.001\.(?!02|08)/.test(namespace)) {
    add('warn', 'Schema version', 'This namespace is an uncommon variant — most European banks accept pain.001.001.03 and pain.008.001.02');
  }

  const grpHdr = doc.getElementsByTagName('GrpHdr')[0];
  if (!grpHdr) {
    add('error', 'Group header', 'Missing <GrpHdr> — every ISO 20022 message requires it');
  } else {
    if (txt(grpHdr, 'MsgId')) add('pass', 'MsgId', `Present: ${txt(grpHdr, 'MsgId')}`);
    else add('error', 'MsgId', 'Missing <MsgId> in GrpHdr');
    const dt = txt(grpHdr, 'CreDtTm');
    if (!dt) add('error', 'CreDtTm', 'Missing <CreDtTm> in GrpHdr');
    else if (!isNaN(Date.parse(dt))) add('pass', 'CreDtTm', `Valid timestamp: ${dt}`);
    else add('error', 'CreDtTm', `Invalid date-time: ${dt}`);
  }

  // Currency checks — SEPA credit transfers and direct debits must be EUR
  const amounts = Array.from(doc.getElementsByTagName('InstdAmt'))
    .concat(Array.from(doc.getElementsByTagName('Amt')))
    .concat(Array.from(doc.getElementsByTagName('EqvtAmt')));
  const ccys = new Set(amounts.map((a) => a.getAttribute('Ccy')).filter(Boolean));
  if (supported && family !== 'camt.053') {
    if (ccys.size === 0) add('error', 'Currency', 'No amounts with a Ccy attribute found');
    ccys.forEach((c) => {
      if (c === 'EUR') add('pass', 'Currency', 'All amounts in EUR as required by SEPA rulebooks');
      else add('error', 'Currency', `Amount in ${c} — SEPA SCT/SDD transactions must be denominated in EUR`);
    });
  }

  // Charge bearer — must be SLEV under SEPA rulebooks
  Array.from(doc.getElementsByTagName('ChrgBr')).forEach((el) => {
    const v = el.textContent.trim();
    if (v === 'SLEV') add('pass', 'ChrgBr', 'SLEV — shared charges, correct for SEPA');
    else add('error', 'ChrgBr', `${v} — SEPA rulebooks require SLEV (charges are shared)`);
  });

  // IBAN + BIC checks
  const seen = new Set();
  Array.from(doc.getElementsByTagName('IBAN')).forEach((el) => {
    const iban = el.textContent.trim().replace(/\s/g, '');
    if (seen.has(iban)) return;
    seen.add(iban);
    const v = validateIban(iban);
    if (!v.valid) {
      add('error', `IBAN ${iban.slice(0, 10)}…`, v.checks.find((c) => !c.ok)?.detail || 'Invalid IBAN');
      return;
    }
    const cc = iban.slice(0, 2);
    if (family !== 'camt.053' && IBAN_COUNTRIES[cc] && !IBAN_COUNTRIES[cc].sepa) {
      add('warn', `IBAN ${iban.slice(0, 10)}…`, `Valid ${v.country.name} IBAN, but ${cc} is outside the SEPA zone — check whether the scheme applies`);
    } else {
      add('pass', `IBAN ${iban.slice(0, 10)}…`, `Valid (${v.country.name})`);
    }
  });
  Array.from(doc.getElementsByTagName('BIC')).concat(Array.from(doc.getElementsByTagName('BICFI'))).forEach((el) => {
    const bic = el.textContent.trim();
    if (seen.has(bic)) return;
    seen.add(bic);
    const v = validateBic(bic);
    if (v.valid) add('pass', `BIC ${bic}`, 'Valid ISO 9362 structure');
    else add('error', `BIC ${bic}`, v.checks.find((c) => !c.ok)?.detail || 'Invalid BIC');
  });

  // Family-specific checks
  if (family === 'pain.001') {
    Array.from(doc.getElementsByTagName('PmtInf')).forEach((pmt, i) => {
      const p = `PmtInf #${i + 1}`;
      if (txt(pmt, 'PmtMtd') !== 'TRF') add('error', p, 'PmtMtd must be TRF for credit transfers');
      ['PmtInfId', 'ReqdExctnDt'].forEach((tag) => {
        if (!txt(pmt, tag)) add('error', p, `Missing <${tag}>`);
      });
      if (!pmt.getElementsByTagName('Dbtr')[0]) add('error', p, 'Missing <Dbtr> debtor');
      if (!pmt.getElementsByTagName('DbtrAcct')[0]) add('error', p, 'Missing <DbtrAcct> debtor account');
    });
    Array.from(doc.getElementsByTagName('CdtTrfTxInf')).forEach((tx, i) => {
      const p = `CdtTrfTxInf #${i + 1}`;
      if (!txt(tx, 'EndToEndId') && !txt(tx, 'InstrId')) add('error', p, 'Missing EndToEndId (or InstrId)');
      if (!tx.getElementsByTagName('InstdAmt')[0]) add('error', p, 'Missing <InstdAmt>');
      if (!tx.getElementsByTagName('Cdtr')[0]) add('error', p, 'Missing <Cdtr> creditor');
      if (!tx.getElementsByTagName('CdtrAcct')[0]) add('error', p, 'Missing <CdtrAcct> creditor account');
    });
  }

  if (family === 'pain.008') {
    Array.from(doc.getElementsByTagName('PmtInf')).forEach((pmt, i) => {
      const p = `PmtInf #${i + 1}`;
      if (txt(pmt, 'PmtMtd') !== 'DD') add('error', p, 'PmtMtd must be DD for direct debits');
      if (!txt(pmt, 'ReqdColltnDt')) add('error', p, 'Missing <ReqdColltnDt>');
      const lcl = txt(pmt, 'LclInstrm') || '';
      if (!/CORE|B2B/.test(lcl)) add('error', p, 'Missing or invalid LclInstrm — must be CORE (consumer) or B2B (business)');
      if (!pmt.getElementsByTagName('CdtrSchmeId')[0]) add('error', p, 'Missing <CdtrSchmeId> — creditor needs a SEPA Creditor Identifier');
      else add('pass', `${p} Creditor Scheme ID`, 'CdtrSchmeId present');
    });
    Array.from(doc.getElementsByTagName('DrctDbtTxInf')).forEach((tx, i) => {
      const p = `DrctDbtTxInf #${i + 1}`;
      const mandate = tx.getElementsByTagName('MndtRltdInf')[0];
      if (!mandate) add('error', p, 'Missing <MndtRltdInf> — direct debits require mandate details');
      else {
        if (!txt(mandate, 'MndtId')) add('error', p, 'Missing <MndtId> in mandate info');
        if (!txt(mandate, 'DtOfSgntr')) add('error', p, 'Missing <DtOfSgntr> in mandate info');
      }
      if (!tx.getElementsByTagName('DbtrAcct')[0]) add('error', p, 'Missing <DbtrAcct> debtor account');
    });
  }

  if (family === 'camt.053') {
    Array.from(doc.getElementsByTagName('Stmt')).forEach((stmt, i) => {
      const p = `Stmt #${i + 1}`;
      ['Id', 'Acct'].forEach((tag) => {
        if (!stmt.getElementsByTagName(tag)[0]) add('error', p, `Missing <${tag}>`);
      });
      const bals = stmt.getElementsByTagName('Bal').length;
      if (bals === 0) add('warn', p, 'No <Bal> balance elements — statements usually carry at least an opening balance');
      else add('pass', `${p} balances`, `${bals} balance(s) present`);
    });
  }

  // NbOfTxs / CtrlSum consistency
  const txCount = doc.getElementsByTagName('CdtTrfTxInf').length
    + doc.getElementsByTagName('DrctDbtTxInf').length
    + doc.getElementsByTagName('Ntry').length;
  const declaredTx = txt(doc, 'NbOfTxs');
  if (declaredTx != null) {
    if (parseInt(declaredTx, 10) === txCount) add('pass', 'NbOfTxs consistency', `Declared ${declaredTx}, counted ${txCount}`);
    else add('error', 'NbOfTxs consistency', `Declared ${declaredTx}, counted ${txCount} transaction(s)`);
  }
  const ctrlSum = txt(doc, 'CtrlSum');
  if (ctrlSum != null && txCount > 0) {
    // Sum leaf amounts only — <Amt><InstdAmt>…</InstdAmt></Amt> wrappers would double-count
    const leafAmounts = Array.from(doc.getElementsByTagName('InstdAmt')).length
      ? Array.from(doc.getElementsByTagName('InstdAmt'))
      : amounts.filter((el) => !el.getElementsByTagName('InstdAmt').length && !el.getElementsByTagName('EqvtAmt').length);
    const sum = leafAmounts.reduce((a, el) => a + (parseFloat(el.textContent) || 0), 0);
    if (Math.abs(parseFloat(ctrlSum) - sum) < 0.005) add('pass', 'CtrlSum consistency', `Declared ${parseFloat(ctrlSum).toFixed(2)}, computed ${sum.toFixed(2)}`);
    else add('error', 'CtrlSum consistency', `Declared ${ctrlSum}, computed ${sum.toFixed(2)} — banks reject mismatched control sums`);
  }

  // Dates sanity
  Array.from(doc.getElementsByTagName('ReqdExctnDt'))
    .concat(Array.from(doc.getElementsByTagName('ReqdColltnDt')))
    .concat(Array.from(doc.getElementsByTagName('DtOfSgntr')))
    .forEach((el) => {
      const v = el.textContent.trim();
      if (isNaN(Date.parse(v))) add('error', localName(el), `Invalid date: ${v}`);
    });

  return { findings, family, familyName: FAMILIES[family], namespace };
}

function Finding({ f }) {
  const styles = {
    pass: 'bg-green-900/60 text-green-400',
    warn: 'bg-yellow-900/60 text-yellow-400',
    error: 'bg-red-900/60 text-red-400',
  };
  const icon = { pass: '✓', warn: '!', error: '✗' }[f.level];
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-700 last:border-0">
      <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${styles[f.level]}`}>
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-200">{f.label}</p>
        <p className="text-xs text-gray-400">{f.detail}</p>
      </div>
    </div>
  );
}

function SepaXmlValidator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const run = (v) => {
    const value = v !== undefined ? v : input;
    if (!value.trim()) { setResult(null); return; }
    setResult(validateSepa(value));
  };

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const t = String(reader.result || '');
      setInput(t);
      run(t);
    };
    reader.readAsText(file);
  };

  const errors = result ? result.findings.filter((f) => f.level === 'error').length : 0;
  const warns = result ? result.findings.filter((f) => f.level === 'warn').length : 0;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free SEPA XML Validator - pain.001, pain.008, camt.053 | OG Technologies EU</title>
        <meta name="description" content="Validate SEPA payment files online: pain.001 credit transfers, pain.008 direct debits, camt.053 statements. Checks ISO 20022 structure, SEPA rulebook constraints (EUR currency, SLEV charges, mandates), IBANs and BICs. 100% client-side, no uploads." />
        <meta name="keywords" content="sepa xml validator, pain.001 validator, pain.008 validator, camt.053 validator, iso 20022 validator, sepa credit transfer, sepa direct debit, payment file validator, sepa xml checker online free" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/sepa-xml-validator/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/sepa-xml-validator/" />
        <meta property="og:title" content="Free SEPA XML Validator - pain.001, pain.008, camt.053 | OG Technologies EU" />
        <meta property="og:description" content="Validate SEPA XML payment files: ISO 20022 structure, rulebook checks, IBAN/BIC validation. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/sepa-xml-validator/" />
        <meta name="twitter:title" content="Free SEPA XML Validator - pain.001, pain.008, camt.053 | OG Technologies EU" />
        <meta name="twitter:description" content="Validate SEPA XML payment files: ISO 20022 structure, rulebook checks, IBAN/BIC validation. 100% client-side." />
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
                <h1 className="h1">SEPA XML Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Validate ISO 20022 SEPA payment files — <strong>pain.001</strong> credit transfers,{' '}
                  <strong>pain.008</strong> direct debits, and <strong>camt.053</strong> statements.
                  Checks message structure, SEPA rulebook constraints, embedded IBANs and BICs.
                  Everything runs in your browser — payment data is never uploaded.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">SEPA XML file content</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={12}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder='<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03">…'
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => run()}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Validate
                    </button>
                    <label className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors cursor-pointer">
                      Load file
                      <input type="file" accept=".xml,.txt" className="hidden" onChange={onFile} />
                    </label>
                    <button type="button" onClick={() => { setInput(SAMPLE_PAIN001); run(SAMPLE_PAIN001); }} className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                      pain.001 sample
                    </button>
                    <button type="button" onClick={() => { setInput(SAMPLE_PAIN008); run(SAMPLE_PAIN008); }} className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                      pain.008 sample
                    </button>
                    <button type="button" onClick={() => { setInput(SAMPLE_CAMT053); run(SAMPLE_CAMT053); }} className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                      camt.053 sample
                    </button>
                  </div>

                  {result && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium border ${
                        errors > 0
                          ? 'bg-red-900/40 text-red-300 border-red-700'
                          : warns > 0
                            ? 'bg-yellow-900/40 text-yellow-300 border-yellow-700'
                            : 'bg-green-900/40 text-green-300 border-green-700'
                      }`}>
                        {result.family
                          ? `${result.family} — ${result.familyName || 'unsupported family'}: ${errors} error(s), ${warns} warning(s)`
                          : 'Not an ISO 20022 payment message'}
                        {result.namespace && <span className="block text-xs text-gray-400 font-normal mt-1 font-mono break-all">{result.namespace}</span>}
                      </div>
                      <div className="bg-gray-900/40 rounded-md px-4">
                        {result.findings.map((f, i) => <Finding key={i} f={f} />)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="max-w-4xl mx-auto mt-12 space-y-8">
                  <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-4">What This Validator Checks</h2>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start"><span className="text-purple-400 mr-2 mt-1">•</span><span><strong>Well-formedness</strong> — XML syntax errors with parser detail</span></li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2 mt-1">•</span><span><strong>Message detection</strong> — family and schema version from the namespace (pain.001.001.03, pain.008.001.02, camt.053.001.02, …)</span></li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2 mt-1">•</span><span><strong>Required elements</strong> — GrpHdr, MsgId, CreDtTm, and per-family mandatory blocks like mandate info for direct debits</span></li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2 mt-1">•</span><span><strong>SEPA rulebook constraints</strong> — EUR-only amounts, ChrgBr = SLEV, SEPA Creditor Identifier, CORE/B2B local instrument</span></li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2 mt-1">•</span><span><strong>Consistency</strong> — NbOfTxs and CtrlSum recomputed against the actual transactions</span></li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2 mt-1">•</span><span><strong>Account identifiers</strong> — every IBAN checked for MOD-97 checksum and SEPA-zone reachability; every BIC for ISO 9362 structure</span></li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-4">Scope and Limitations</h2>
                    <p className="text-gray-300 text-sm mb-3">
                      This validator performs structural and rulebook-consistency checks — it does not run full XSD
                      schema validation against the official ISO 20022 schemas, and passing here does not guarantee
                      bank acceptance (each bank adds its own implementation guidelines on top of the EPC rulebooks).
                      For schema-level validation use our{' '}
                      <Link to="/tools/xsd-validator/" className="text-purple-400 hover:text-purple-300 underline">XSD Validator</Link>{' '}
                      with the official XSDs from iso20022.org. To inspect what a message contains, use the{' '}
                      <Link to="/tools/iso-20022-viewer/" className="text-purple-400 hover:text-purple-300 underline">ISO 20022 Viewer</Link>.
                      {' '}Need to build a file instead? The{' '}
                      <Link to="/tools/sepa-xml-generator/" className="text-purple-400 hover:text-purple-300 underline">SEPA XML Generator</Link>{' '}
                      produces pain.001 and pain.008 messages from a CSV of payments — come back here to check them.
                    </p>
                    <p className="text-gray-300 text-sm">
                      Working with legacy SWIFT statements? Convert them first with our{' '}
                      <Link to="/tools/mt940-to-csv/" className="text-purple-400 hover:text-purple-300 underline">MT940 to CSV converter</Link>{' '}
                      — and see the <Link to="/insights/iso-20022-migration-guide/" className="text-purple-400 hover:text-purple-300 underline">ISO 20022 migration guide</Link>{' '}
                      for what the November 2026 deadline changes.
                    </p>
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

export default SepaXmlValidator;
