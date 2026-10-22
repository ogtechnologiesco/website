import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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

function csvEscape(v) {
  if (v == null) return '';
  const s = String(v);
  return /[",\n\r;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(statements) {
  const header = [
    'StatementRef', 'Account', 'ValueDate', 'EntryDate', 'Amount', 'Currency',
    'CreditDebit', 'Reversal', 'TransactionType', 'CustomerRef', 'BankRef',
    'CounterpartyName', 'CounterpartyIBAN', 'CounterpartyBIC',
    'EndToEndRef', 'MandateRef', 'CreditorId', 'Purpose', 'Remittance', 'RunningBalance',
  ];
  const rows = [header.join(',')];
  statements.forEach((st) => {
    st.entries.forEach((e) => {
      const p = e.parsed86 || {};
      rows.push([
        st.ref, st.account, e.valueDate, e.entryDate,
        e.signedAmount != null ? e.signedAmount.toFixed(2) : '',
        st.opening ? st.opening.currency : (st.closing ? st.closing.currency : ''),
        e.drcr, e.reversal ? 'Y' : '', e.txType, e.custRef, e.bankRef,
        (p.counterpartyName || []).join(' '), p.iban, p.bic,
        p.eref, p.mref, p.cred, p.purpose, (p.remittance || []).join(' '),
        e.runningBalance != null ? e.runningBalance.toFixed(2) : '',
      ].map(csvEscape).join(','));
    });
  });
  return rows.join('\r\n');
}

function Mt940ToCsv() {
  const [input, setInput] = useState('');
  const [statements, setStatements] = useState(null);
  const [error, setError] = useState('');

  const convert = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setStatements(null); setError(''); return; }
    const parsed = parseMt940(v);
    if (!parsed.length || parsed.every((s) => s.entries.length === 0)) {
      setStatements(null);
      setError('No MT940 transactions found. Expected tags like :20:, :61:, :86:, :62F:.');
      return;
    }
    setError('');
    setStatements(parsed);
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

  const downloadCsv = () => {
    if (!statements) return;
    const csv = '﻿' + toCsv(statements); // UTF-8 BOM for Excel
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mt940-statement.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalEntries = statements ? statements.reduce((n, s) => n + s.entries.length, 0) : 0;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free MT940 to CSV Converter - SWIFT Statement Parser | OG Technologies EU</title>
        <meta name="description" content="Convert SWIFT MT940 bank statements to CSV online. Parses :61:/:86: tags, SEPA references (EREF+, MREF+, CRED+), running balances verified against the closing balance. 100% client-side — no upload." />
        <meta name="keywords" content="mt940 to csv, swift mt940 converter, bank statement to csv, mt940 parser, sta file converter, camt.053 alternative, treasury tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/mt940-to-csv/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/mt940-to-csv/" />
        <meta property="og:title" content="Free MT940 to CSV Converter - SWIFT Statement Parser | OG Technologies EU" />
        <meta property="og:description" content="Convert SWIFT MT940 bank statements to CSV. Parses :61:/:86: tags and SEPA references. 100% client-side — no upload." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/mt940-to-csv/" />
        <meta name="twitter:title" content="Free MT940 to CSV Converter - SWIFT Statement Parser | OG Technologies EU" />
        <meta name="twitter:description" content="Convert SWIFT MT940 bank statements to CSV. Parses :61:/:86: tags and SEPA references. 100% client-side — no upload." />
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
                <h1 className="h1">MT940 to CSV Converter</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Turn a SWIFT MT940 bank statement (.sta / .mt940) into a clean CSV for Excel, Google Sheets, or
                  your accounting system. Parses :61:/:86: tags, extracts SEPA references, and verifies running
                  balances against the closing balance. Your statement never leaves your browser.
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
                      Convert
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
                    {statements && (
                      <button
                        type="button"
                        onClick={downloadCsv}
                        className="px-4 py-2 rounded-md bg-green-700 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        Download CSV
                      </button>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-md px-4 py-3 text-sm font-medium bg-red-900/40 text-red-300 border border-red-700">
                      {error}
                    </div>
                  )}

                  {statements && statements.map((st, si) => (
                    <div key={si} className="mb-6">
                      <div className="grid sm:grid-cols-3 gap-3 text-sm mb-3">
                        <div className="bg-gray-700/60 rounded-md p-3">
                          <p className="text-gray-400 text-xs mb-1">Statement</p>
                          <p className="text-gray-200 font-mono break-all">{st.ref || '—'} {st.statementNr ? `(${st.statementNr})` : ''}</p>
                        </div>
                        <div className="bg-gray-700/60 rounded-md p-3">
                          <p className="text-gray-400 text-xs mb-1">Account</p>
                          <p className="text-gray-200 font-mono break-all">{st.account || '—'}</p>
                        </div>
                        <div className="bg-gray-700/60 rounded-md p-3">
                          <p className="text-gray-400 text-xs mb-1">Opening → Closing</p>
                          <p className="text-gray-200 font-mono">
                            {st.opening ? `${st.opening.drcr === 'D' ? '−' : ''}${st.opening.amount.toFixed(2)}` : '—'}
                            {' → '}
                            {st.closing ? `${st.closing.drcr === 'D' ? '−' : ''}${st.closing.amount.toFixed(2)} ${st.closing.currency}` : '—'}
                          </p>
                        </div>
                      </div>

                      {st.balanceCheck && (
                        <div className={`rounded-md px-4 py-2 mb-3 text-xs font-medium ${st.balanceCheck.ok ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-yellow-900/40 text-yellow-300 border border-yellow-700'}`}>
                          {st.balanceCheck.ok
                            ? `Balance check passed — computed closing ${st.balanceCheck.computed.toFixed(2)} matches stated ${st.balanceCheck.stated.toFixed(2)}`
                            : `Balance mismatch — computed ${st.balanceCheck.computed.toFixed(2)} vs stated ${st.balanceCheck.stated.toFixed(2)}`}
                        </div>
                      )}

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-gray-400 text-xs border-b border-gray-700">
                              <th className="pb-2 pr-4">Value date</th>
                              <th className="pb-2 pr-4">Amount</th>
                              <th className="pb-2 pr-4">Counterparty</th>
                              <th className="pb-2">Remittance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {st.entries.map((e, i) => (
                              <tr key={i} className="border-b border-gray-700/50 text-gray-200 align-top">
                                <td className="py-2 pr-4 font-mono text-xs whitespace-nowrap">{e.valueDate}</td>
                                <td className={`py-2 pr-4 font-mono whitespace-nowrap ${e.signedAmount < 0 ? 'text-red-300' : 'text-green-300'}`}>
                                  {e.signedAmount != null ? e.signedAmount.toFixed(2) : '—'}
                                </td>
                                <td className="py-2 pr-4 text-xs">
                                  {(e.parsed86.counterpartyName || []).join(' ') || '—'}
                                  {e.parsed86.iban && <span className="block text-gray-500 font-mono">{e.parsed86.iban}</span>}
                                </td>
                                <td className="py-2 text-xs break-all">
                                  {(e.parsed86.remittance || []).join(' ') || '—'}
                                  {e.parsed86.eref && <span className="block text-gray-500 font-mono">EREF: {e.parsed86.eref}</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  {statements && (
                    <p className="text-xs text-gray-500">{totalEntries} transaction(s) across {statements.length} statement block(s). CSV uses RFC 4180 quoting with a UTF-8 BOM so it opens cleanly in Excel.</p>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">Supported:</strong> SWIFT FIN MT940 (also .sta/.940), including
                    files wrapped in SWIFT envelopes ({'{1:…}{2:…}{4:…}'}). Structured :86: fields with ?NN subfield
                    codes and SEPA tags (SVWZ+, EREF+, MREF+, CRED+) are decoded into dedicated CSV columns.
                  </p>
                  <p>
                    MT940 is being replaced by ISO 20022 camt.053 across Europe — convert a statement directly with the{' '}
                    <a href="/tools/mt940-to-camt053/" className="text-purple-400 hover:text-purple-300">MT940 → camt.053 converter</a>, or
                    inspect camt files in the{' '}
                    <a href="/tools/iso-20022-viewer/" className="text-purple-400 hover:text-purple-300">ISO 20022 Message Viewer</a>. For
                    what each tag means, see the <a href="/insights/mt940-field-reference/" className="text-purple-400 hover:text-purple-300">MT940 field reference</a>.
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

export default Mt940ToCsv;
