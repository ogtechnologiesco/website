import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { buildVcard, parseVcard } from '../../utils/contactUtils';

const EMPTY = {
  firstName: '', lastName: '', org: '', title: '',
  phone: '', phoneType: 'CELL', email: '', emailType: 'WORK',
  url: '', street: '', city: '', zip: '', country: '', note: '',
};

const FIELD_DEFS = [
  ['firstName', 'First name'], ['lastName', 'Last name'], ['org', 'Organization'],
  ['title', 'Job title'], ['phone', 'Phone'], ['email', 'Email'], ['url', 'Website'],
  ['street', 'Street'], ['city', 'City'], ['zip', 'ZIP / postal code'], ['country', 'Country'], ['note', 'Note'],
];

function VcardGenerator() {
  const [fields, setFields] = useState(EMPTY);
  const [version, setVersion] = useState('3.0');
  const [parseInput, setParseInput] = useState('');
  const [parsed, setParsed] = useState(null);

  const vcf = useMemo(() => {
    const hasContent = fields.firstName || fields.lastName || fields.phone || fields.email;
    return hasContent ? buildVcard(fields, version) : '';
  }, [fields, version]);

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const download = () => {
    const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(fields.firstName || 'contact').toLowerCase()}-${(fields.lastName || 'card').toLowerCase()}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const runParse = (value) => {
    const v = value !== undefined ? value : parseInput;
    if (!v.trim()) { setParsed(null); return; }
    setParsed(parseVcard(v));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free vCard Generator & Parser - Create .vcf Contact Files | OG Technologies EU</title>
        <meta name="description" content="Create and parse vCard (.vcf) contact files online. Generate vCard 3.0 or 4.0 for iPhone, Android, Outlook, and Google Contacts — or paste a .vcf to inspect its fields. 100% client-side." />
        <meta name="keywords" content="vcard generator, vcf file, contact card, vcard parser, create vcard, digital business card, rfc 6350" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/vcard-generator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/vcard-generator/" />
        <meta property="og:title" content="Free vCard Generator & Parser - Create .vcf Contact Files | OG Technologies EU" />
        <meta property="og:description" content="Create vCard 3.0/4.0 contact files or parse existing .vcf files. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/vcard-generator/" />
        <meta name="twitter:title" content="Free vCard Generator & Parser - Create .vcf Contact Files | OG Technologies EU" />
        <meta name="twitter:description" content="Create vCard 3.0/4.0 contact files or parse existing .vcf files. 100% client-side." />
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
                <h1 className="h1">vCard Generator &amp; Parser</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Build a .vcf contact file for iPhone, Android, Outlook, or Google Contacts — or paste an existing
                  vCard to inspect its properties. Everything runs in your browser.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gray-300 text-sm font-medium">vCard version</span>
                    {['3.0', '4.0'].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setVersion(v)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${version === v ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {FIELD_DEFS.map(([key, label]) => (
                      <div key={key}>
                        <label className="block text-gray-400 text-xs mb-1">{label}</label>
                        <input
                          type="text"
                          value={fields[key]}
                          onChange={set(key)}
                          className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                          spellCheck="false"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Phone type</label>
                      <select value={fields.phoneType} onChange={set('phoneType')} className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm">
                        {['CELL', 'WORK', 'HOME', 'VOICE', 'FAX'].map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Email type</label>
                      <select value={fields.emailType} onChange={set('emailType')} className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm">
                        {['WORK', 'HOME', 'INTERNET'].map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {vcf && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm font-medium">Preview</span>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => navigator.clipboard.writeText(vcf)} className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors">Copy</button>
                          <button type="button" onClick={download} className="text-xs px-2 py-1 rounded bg-green-700 text-white hover:bg-green-600 transition-colors">Download .vcf</button>
                        </div>
                      </div>
                      <pre className="bg-gray-700 rounded-md px-4 py-3 text-purple-300 font-mono text-xs overflow-x-auto whitespace-pre">{vcf}</pre>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-200 mb-3">Parse a vCard</h2>
                    <textarea
                      value={parseInput}
                      onChange={(e) => { setParseInput(e.target.value); runParse(e.target.value); }}
                      rows={6}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder={'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\n...'}
                      spellCheck="false"
                    />
                    {parsed && (
                      <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-left text-gray-400 border-b border-gray-700">
                              <th className="pb-2 pr-4">Property</th>
                              <th className="pb-2 pr-4">Params</th>
                              <th className="pb-2">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {parsed.map((p, i) => (
                              <tr key={i} className="border-b border-gray-700/50 align-top">
                                <td className="py-1.5 pr-4 font-mono text-purple-300">{p.name}</td>
                                <td className="py-1.5 pr-4 font-mono text-gray-500">{p.params.join('; ') || '—'}</td>
                                <td className="py-1.5 font-mono text-gray-200 break-all">{p.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">vCard 3.0 vs 4.0:</strong> 3.0 (RFC 2426) is the safest choice
                    for Outlook and older clients; 4.0 (RFC 6350) is the modern default on Android and most apps.
                    Files are generated with proper line folding and escaping.
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

export default VcardGenerator;
