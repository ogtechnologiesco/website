import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateIban, validateBic, normalizeIban } from '../../utils/financeUtils';
import { parseCsv } from '../../utils/contactUtils';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const MODES = {
  sct: {
    id: 'sct',
    label: 'Credit Transfer (pain.001)',
    schema: 'pain.001.001.03',
    partyRole: 'creditors you pay',
    dateLabel: 'Requested execution date',
    columns: 'name, iban, amount, remittance, [bic], [end-to-end-id]',
    sample: `name,iban,amount,remittance,bic,endtoendid
Supplier One GmbH,DE89370400440532013000,1250.00,Invoice INV-1042,DEUTDEFF,INV-1042
Cloud Hosting Ltd,AT611904300234573201,89.90,Contract 5566 October,GIBAATWW,CTR-5566
Freelance Designer,FR1420041010050500013M02606,450.00,Design work,,FR-2026-041`,
  },
  sdd: {
    id: 'sdd',
    label: 'Direct Debit (pain.008)',
    schema: 'pain.008.001.02',
    partyRole: 'debtors you collect from',
    dateLabel: 'Requested collection date',
    columns: 'name, iban, amount, mandate-id, mandate-date, remittance, [bic], [end-to-end-id]',
    sample: `name,iban,amount,mandateid,mandatedate,remittance,bic,endtoendid
Member One,DE89370400440532013000,29.99,MDT-1001,2026-01-15,Membership 2026-10,DEUTDEFF,MEM-1001
Member Two,AT611904300234573201,29.99,MDT-1002,2026-01-20,Membership 2026-10,GIBAATWW,MEM-1002`,
  },
};

function todayPlus(days) {
  const d = new Date(Date.now() + days * 86400000);
  return d.toISOString().slice(0, 10);
}

function parseAmount(s) {
  const n = parseFloat(String(s || '').replace(',', '.').trim());
  return Number.isFinite(n) ? n : null;
}

function parseRows(text, mode) {
  const rows = parseCsv(text).map((r) => r.map((c) => c.trim())).filter((r) => r.some(Boolean));
  if (!rows.length) return { header: null, txns: [] };
  const first = rows[0].map((c) => c.toLowerCase());
  const hasHeader = first.some((c) => ['name', 'iban', 'amount', 'remittance', 'mandateid', 'mandate-id'].includes(c));
  const data = hasHeader ? rows.slice(1) : rows;
  const col = (r, name) => {
    if (!hasHeader) return null;
    const i = first.indexOf(name);
    return i >= 0 ? r[i] : null;
  };
  const txns = data.map((r) => {
    if (hasHeader) {
      return {
        name: col(r, 'name'), iban: col(r, 'iban'), amount: col(r, 'amount'),
        remittance: col(r, 'remittance'), bic: col(r, 'bic'), e2e: col(r, 'endtoendid') || col(r, 'end-to-end-id'),
        mandateId: col(r, 'mandateid') || col(r, 'mandate-id'), mandateDate: col(r, 'mandatedate') || col(r, 'mandate-date'),
      };
    }
    return mode === 'sdd'
      ? { name: r[0], iban: r[1], amount: r[2], mandateId: r[3], mandateDate: r[4], remittance: r[5], bic: r[6], e2e: r[7] }
      : { name: r[0], iban: r[1], amount: r[2], remittance: r[3], bic: r[4], e2e: r[5] };
  });
  return { header: hasHeader ? first : null, txns };
}

function validateTx(tx, mode, i) {
  const issues = [];
  if (!tx.name) issues.push('missing name');
  const iban = tx.iban ? validateIban(tx.iban) : null;
  if (!tx.iban) issues.push('missing IBAN');
  else if (!iban.valid) issues.push('IBAN invalid');
  const amt = parseAmount(tx.amount);
  if (amt == null) issues.push('amount not a number');
  else if (amt <= 0) issues.push('amount must be positive');
  if (tx.bic && !validateBic(tx.bic).valid) issues.push('BIC invalid');
  if (mode === 'sdd') {
    if (!tx.mandateId) issues.push('missing mandate ID');
    if (!tx.mandateDate || !/^\d{4}-\d{2}-\d{2}$/.test(tx.mandateDate)) issues.push('mandate date must be YYYY-MM-DD');
  }
  return { line: i + 1, issues };
}

function buildPain001({ debtor, txns, date }) {
  const ctrlSum = txns.reduce((s, t) => s + parseAmount(t.amount), 0).toFixed(2);
  const txXml = txns.map((t) => `      <CdtTrfTxInf>
        <PmtId><EndToEndId>${esc(t.e2e || 'NOTPROVIDED')}</EndToEndId></PmtId>
        <Amt><InstdAmt Ccy="EUR">${parseAmount(t.amount).toFixed(2)}</InstdAmt></Amt>
${t.bic ? `        <CdtrAgt><FinInstnId><BIC>${esc(t.bic.replace(/\s/g, '').toUpperCase())}</BIC></FinInstnId></CdtrAgt>\n` : ''}        <Cdtr><Nm>${esc(t.name)}</Nm></Cdtr>
        <CdtrAcct><Id><IBAN>${esc(normalizeIban(t.iban))}</IBAN></Id></CdtrAcct>
${t.remittance ? `        <RmtInf><Ustrd>${esc(t.remittance)}</Ustrd></RmtInf>\n` : ''}      </CdtTrfTxInf>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>OGT-${Date.now()}</MsgId>
      <CreDtTm>${new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')}</CreDtTm>
      <NbOfTxs>${txns.length}</NbOfTxs>
      <CtrlSum>${ctrlSum}</CtrlSum>
      <InitgPty><Nm>${esc(debtor.name)}</Nm></InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>PMT-${Date.now()}</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <BtchBookg>true</BtchBookg>
      <NbOfTxs>${txns.length}</NbOfTxs>
      <CtrlSum>${ctrlSum}</CtrlSum>
      <PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf>
      <ReqdExctnDt>${esc(date)}</ReqdExctnDt>
      <Dbtr><Nm>${esc(debtor.name)}</Nm></Dbtr>
      <DbtrAcct><Id><IBAN>${esc(normalizeIban(debtor.iban))}</IBAN></Id></DbtrAcct>
${debtor.bic ? `      <DbtrAgt><FinInstnId><BIC>${esc(debtor.bic.replace(/\s/g, '').toUpperCase())}</BIC></FinInstnId></DbtrAgt>\n` : ''}      <ChrgBr>SLEV</ChrgBr>
${txXml}
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`;
}

function buildPain008({ creditor, txns, date }) {
  const ctrlSum = txns.reduce((s, t) => s + parseAmount(t.amount), 0).toFixed(2);
  const txXml = txns.map((t) => `      <DrctDbtTxInf>
        <PmtId><EndToEndId>${esc(t.e2e || 'NOTPROVIDED')}</EndToEndId></PmtId>
        <InstdAmt Ccy="EUR">${parseAmount(t.amount).toFixed(2)}</InstdAmt>
        <DrctDbtTx><MndtRltdInf><MndtId>${esc(t.mandateId)}</MndtId><DtOfSgntr>${esc(t.mandateDate)}</DtOfSgntr></MndtRltdInf></DrctDbtTx>
${t.bic ? `        <DbtrAgt><FinInstnId><BIC>${esc(t.bic.replace(/\s/g, '').toUpperCase())}</BIC></FinInstnId></DbtrAgt>\n` : ''}        <Dbtr><Nm>${esc(t.name)}</Nm></Dbtr>
        <DbtrAcct><Id><IBAN>${esc(normalizeIban(t.iban))}</IBAN></Id></DbtrAcct>
${t.remittance ? `        <RmtInf><Ustrd>${esc(t.remittance)}</Ustrd></RmtInf>\n` : ''}      </DrctDbtTxInf>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <CstmrDrctDbtInitn>
    <GrpHdr>
      <MsgId>OGT-${Date.now()}</MsgId>
      <CreDtTm>${new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')}</CreDtTm>
      <NbOfTxs>${txns.length}</NbOfTxs>
      <CtrlSum>${ctrlSum}</CtrlSum>
      <InitgPty><Nm>${esc(creditor.name)}</Nm></InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>PMT-${Date.now()}</PmtInfId>
      <PmtMtd>DD</PmtMtd>
      <BtchBookg>true</BtchBookg>
      <NbOfTxs>${txns.length}</NbOfTxs>
      <CtrlSum>${ctrlSum}</CtrlSum>
      <PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl><LclInstrm><Cd>CORE</Cd></LclInstrm><SeqTp>RCUR</SeqTp></PmtTpInf>
      <ReqdColltnDt>${esc(date)}</ReqdColltnDt>
      <Cdtr><Nm>${esc(creditor.name)}</Nm></Cdtr>
      <CdtrAcct><Id><IBAN>${esc(normalizeIban(creditor.iban))}</IBAN></Id></CdtrAcct>
${creditor.bic ? `      <CdtrAgt><FinInstnId><BIC>${esc(creditor.bic.replace(/\s/g, '').toUpperCase())}</BIC></FinInstnId></CdtrAgt>\n` : ''}      <CdtrSchmeId><Id><PrvtId><Othr><Id>${esc(creditor.schemeId)}</Id><SchmeNm><Prtry>SEPA</Prtry></SchmeNm></Othr></PrvtId></Id></CdtrSchmeId>
${txXml}
    </PmtInf>
  </CstmrDrctDbtInitn>
</Document>`;
}

function SepaXmlGenerator() {
  const [mode, setMode] = useState('sct');
  const [partyName, setPartyName] = useState('');
  const [partyIban, setPartyIban] = useState('');
  const [partyBic, setPartyBic] = useState('');
  const [schemeId, setSchemeId] = useState('');
  const [date, setDate] = useState(todayPlus(2));
  const [csvInput, setCsvInput] = useState('');

  const cfg = MODES[mode];
  const isSdd = mode === 'sdd';

  const result = useMemo(() => {
    if (!csvInput.trim()) return null;
    const { txns } = parseRows(csvInput, mode);
    const issues = txns.map((t, i) => validateTx(t, mode, i)).filter((v) => v.issues.length);
    const valid = txns.filter((_, i) => !issues.some((v) => v.line === i + 1));
    return { txns, issues, valid };
  }, [csvInput, mode]);

  const partyIssues = useMemo(() => {
    const out = [];
    if (!partyName.trim()) out.push('name required');
    if (!partyIban.trim()) out.push('IBAN required');
    else if (!validateIban(partyIban).valid) out.push('IBAN invalid');
    if (partyBic.trim() && !validateBic(partyBic).valid) out.push('BIC invalid');
    if (isSdd && !schemeId.trim()) out.push('creditor scheme ID required');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) out.push('date must be YYYY-MM-DD');
    return out;
  }, [partyName, partyIban, partyBic, schemeId, date, isSdd]);

  const canGenerate = result && result.valid.length > 0 && partyIssues.length === 0;

  const xml = useMemo(() => {
    if (!canGenerate) return null;
    const party = { name: partyName.trim(), iban: partyIban, bic: partyBic.trim(), schemeId: schemeId.trim() };
    return isSdd
      ? buildPain008({ creditor: party, txns: result.valid, date })
      : buildPain001({ debtor: party, txns: result.valid, date });
  }, [canGenerate, isSdd, partyName, partyIban, partyBic, schemeId, date, result]);

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCsvInput(String(reader.result || ''));
    reader.readAsText(file);
  };

  const downloadXml = () => {
    if (!xml) return;
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cfg.schema}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free SEPA XML Generator - pain.001 & pain.008 from CSV | OG Technologies EU</title>
        <meta name="description" content="Generate SEPA pain.001 credit transfer and pain.008 direct debit XML files from a CSV of payments. IBAN/BIC validation built in. 100% client-side — no upload." />
        <meta name="keywords" content="sepa xml generator, pain.001 generator, pain.008 generator, sepa credit transfer xml, sct xml, direct debit xml, csv to pain.001, sepa xml erstellen" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/sepa-xml-generator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/sepa-xml-generator/" />
        <meta property="og:title" content="Free SEPA XML Generator - pain.001 & pain.008 from CSV | OG Technologies EU" />
        <meta property="og:description" content="Generate SEPA pain.001 and pain.008 XML from a CSV of payments. IBAN/BIC validation, batch totals, no upload." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/sepa-xml-generator/" />
        <meta name="twitter:title" content="Free SEPA XML Generator - pain.001 & pain.008 from CSV | OG Technologies EU" />
        <meta name="twitter:description" content="Generate SEPA pain.001 and pain.008 XML from a CSV of payments. IBAN/BIC validation, batch totals, no upload." />
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
                <h1 className="h1">SEPA XML Generator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Build a pain.001 credit transfer or pain.008 direct debit file from a list of payments.
                  IBANs and BICs are validated as you type — everything runs locally, nothing is uploaded.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="flex flex-wrap rounded-lg overflow-hidden border border-gray-600 mb-6">
                    {Object.values(MODES).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMode(m.id)}
                        className={`flex-1 min-w-[200px] px-4 py-3 text-sm font-medium transition-colors ${
                          mode === m.id ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">{isSdd ? 'Creditor name' : 'Debtor name'}</label>
                      <input
                        type="text"
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                        placeholder={isSdd ? 'Your company (collecting)' : 'Your company (paying)'}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">{isSdd ? 'Creditor IBAN' : 'Debtor IBAN'}</label>
                      <input
                        type="text"
                        value={partyIban}
                        onChange={(e) => setPartyIban(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="AT611904300234573201"
                        spellCheck="false"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">BIC <span className="text-gray-500 font-normal">(optional — most banks derive it)</span></label>
                      <input
                        type="text"
                        value={partyBic}
                        onChange={(e) => setPartyBic(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                        placeholder="GIBAATWW"
                        spellCheck="false"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">{cfg.dateLabel}</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                      />
                    </div>
                    {isSdd && (
                      <div className="sm:col-span-2">
                        <label className="block text-gray-300 text-sm font-medium mb-1">Creditor scheme ID (Gläubiger-Identifikationsnummer)</label>
                        <input
                          type="text"
                          value={schemeId}
                          onChange={(e) => setSchemeId(e.target.value)}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                          placeholder="AT00ZZZ00000000001"
                          spellCheck="false"
                        />
                      </div>
                    )}
                  </div>

                  {partyIssues.length > 0 && (partyName || partyIban || csvInput) && (
                    <p className="text-xs text-amber-400 mb-4">Your party block: {partyIssues.join(' · ')}</p>
                  )}

                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">
                      Transactions CSV — columns: <code className="text-purple-300">{cfg.columns}</code>
                    </label>
                    <textarea
                      value={csvInput}
                      onChange={(e) => setCsvInput(e.target.value)}
                      rows={8}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder={cfg.sample}
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <label className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors cursor-pointer">
                      Load .csv file
                      <input type="file" accept=".csv,.txt" className="hidden" onChange={onFile} />
                    </label>
                    <button
                      type="button"
                      onClick={() => setCsvInput(cfg.sample)}
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

                  {result && (
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-300">
                        {result.txns.length} row(s): <span className="text-green-400">{result.valid.length} valid</span>
                        {result.issues.length > 0 && <span className="text-red-400"> · {result.issues.length} with issues</span>}
                      </p>
                      {result.issues.map((v) => (
                        <p key={v.line} className="text-xs text-red-400">Line {v.line}: {v.issues.join(', ')}</p>
                      ))}
                    </div>
                  )}

                  {xml && (
                    <>
                      <div className="rounded-md px-4 py-3 mb-4 text-sm font-medium bg-green-900/40 text-green-300 border border-green-700">
                        Generated {cfg.schema} — {result.valid.length} transaction(s), control sum{' '}
                        {result.valid.reduce((s, t) => s + parseAmount(t.amount), 0).toFixed(2)} EUR.
                        Check it with the <Link to="/tools/sepa-xml-validator/" className="underline hover:text-green-200">SEPA XML Validator</Link> before
                        submitting to your bank.
                      </div>
                      <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto text-xs text-gray-300 max-h-[32rem] overflow-y-auto">
                        {xml}
                      </pre>
                    </>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">Before you upload to a bank:</strong> generated files are
                    schema-shaped and validated for structure, but banks enforce additional rulebook checks
                    (allowed characters, mandate sequence types, cut-off times). Always test a small batch
                    first — many banks reject files silently when business rules fail.
                  </p>
                </div>

                <div className="mt-12">
                  <h2 className="h4 mb-4">Frequently asked questions</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">What is the difference between pain.001 and pain.008?</h3>
                      <p className="text-sm text-gray-400">
                        pain.001 (SCT) pushes money — you instruct your bank to credit other accounts. pain.008
                        (SDD) pulls money — you collect from debtors who signed a mandate, which is why each
                        transaction needs a mandate ID and signature date, and you need a creditor scheme ID.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Which pain.001 version do banks accept?</h3>
                      <p className="text-sm text-gray-400">
                        pain.001.001.03 remains the most widely accepted SEPA version. Some banks also offer
                        .001.09 (the ISO 20022:2019 version used for CGI/global rollouts). Check your bank's
                        upload documentation — the schema version is in the xmlns declaration.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Do I need the BIC for each payment?</h3>
                      <p className="text-sm text-gray-400">
                        Not for SEPA payments — since 2016 (SCT) and 2014 (SDD), BIC is optional inside the SEPA
                        zone and banks derive it from the IBAN. The generator accepts it per row if you have it,
                        but you can leave the column empty.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1.5">Is my payment data uploaded anywhere?</h3>
                      <p className="text-sm text-gray-400">
                        No — CSV parsing, IBAN/BIC validation, and XML generation all run in your browser.
                        Nothing is sent to a server, logged, or stored, which matters when the file contains
                        real customer names and account numbers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="h4 mb-4">Related tools</h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Link to="/tools/sepa-xml-validator/" className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                      <p className="text-sm font-semibold text-gray-200">SEPA XML Validator</p>
                      <p className="text-xs text-gray-500 mt-1">Rulebook checks on generated files</p>
                    </Link>
                    <Link to="/tools/iban-validator/" className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                      <p className="text-sm font-semibold text-gray-200">IBAN Validator</p>
                      <p className="text-xs text-gray-500 mt-1">MOD-97 + SEPA reachability</p>
                    </Link>
                    <Link to="/tools/iso-20022-viewer/" className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                      <p className="text-sm font-semibold text-gray-200">ISO 20022 Viewer</p>
                      <p className="text-xs text-gray-500 mt-1">Inspect your generated XML</p>
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

export default SepaXmlGenerator;
