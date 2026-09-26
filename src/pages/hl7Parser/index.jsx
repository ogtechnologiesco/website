import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { parseHl7 } from '../../utils/hl7Utils';

const SAMPLE_ADT = `MSH|^~\\&|HIS|STJUDE|LAB|DEST|202609210830||ADT^A01|MSG00001|P|2.5.1
EVN|A01|202609210830
PID|1||123456^^^STJUDE^MR||DOE^JOHN^A||19800115|M|||123 MAIN ST^^VIENNA^VA^1010||+43-1-5551234
PV1|1|I|ICU^101^01||||1234^SMITH^JANE^A^^^MD|||||||||||V12345
DG1|1|I10|I50.9^Heart failure^I10|Heart failure|20260921|A
OBX|1|NM|8867-4^Heart rate^LN||72|/min|60-100|N|||F`;

const SEGMENT_COLORS = {
  MSH: 'border-purple-500', PID: 'border-blue-500', PV1: 'border-blue-400',
  OBR: 'border-green-500', OBX: 'border-green-400', ORC: 'border-green-600',
  EVN: 'border-yellow-500', MSA: 'border-orange-500', ERR: 'border-red-500',
  DG1: 'border-pink-500', IN1: 'border-teal-500', NTE: 'border-gray-500',
};

function CheckRow({ check }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-700 last:border-0">
      <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${check.ok ? 'bg-green-900/60 text-green-400' : 'bg-red-900/60 text-red-400'}`}>
        {check.ok ? '✓' : '✗'}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-200">{check.label}</p>
        <p className="text-xs text-gray-400">{check.detail}</p>
      </div>
    </div>
  );
}

function SegmentView({ seg }) {
  const [open, setOpen] = useState(seg.name === 'MSH');
  const color = SEGMENT_COLORS[seg.name] || 'border-gray-600';
  return (
    <div className={`border-l-4 ${color} bg-gray-700/40 rounded-r-md mb-2`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 text-left"
      >
        <span className="text-sm">
          <span className="font-mono font-bold text-purple-300">{seg.name}</span>
          {seg.label && <span className="text-gray-400 ml-2">{seg.label}</span>}
        </span>
        <span className="text-gray-500 text-xs">{open ? '▾' : '▸'} {seg.fields.length} fields</span>
      </button>
      {open && (
        <div className="px-4 pb-3">
          <table className="w-full text-xs">
            <tbody>
              {seg.fields.map((f) => (
                <tr key={f.num} className="border-t border-gray-700/50 align-top">
                  <td className="py-1.5 pr-3 font-mono text-gray-500 whitespace-nowrap w-20">{seg.name}-{f.num}</td>
                  <td className="py-1.5 pr-3 text-gray-400 w-48">{f.label || ''}</td>
                  <td className="py-1.5 font-mono text-gray-200 break-all">
                    {f.components ? (
                      <span>
                        {f.components.map((c, i) => (
                          <span key={i}>
                            {i > 0 && <span className="text-purple-400">^</span>}
                            {c.subcomponents ? (
                              c.subcomponents.map((s, j) => (
                                <span key={j}>
                                  {j > 0 && <span className="text-yellow-400">&amp;</span>}
                                  {s}
                                </span>
                              ))
                            ) : c.value}
                          </span>
                        ))}
                      </span>
                    ) : (
                      f.value || <span className="text-gray-600">(empty)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Hl7Parser() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const parse = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(parseHl7(v));
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
        <title>Free HL7 v2 Message Parser & Viewer Online | OG Technologies EU</title>
        <meta name="description" content="Parse HL7 v2.x messages online: segment, field, component, and subcomponent breakdown with field labels for MSH, PID, PV1, OBR, OBX and more. Detects message type and version. 100% client-side — PHI never uploaded." />
        <meta name="keywords" content="hl7 parser, hl7 viewer, hl7 v2 message, hl7 message analyzer, msh pid obr obx, healthcare integration, hl7 validator" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/hl7-parser/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/hl7-parser/" />
        <meta property="og:title" content="Free HL7 v2 Message Parser & Viewer Online | OG Technologies EU" />
        <meta property="og:description" content="Parse HL7 v2.x messages: segment/field/component breakdown with labels. 100% client-side — PHI never uploaded." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/hl7-parser/" />
        <meta name="twitter:title" content="Free HL7 v2 Message Parser & Viewer Online | OG Technologies EU" />
        <meta name="twitter:description" content="Parse HL7 v2.x messages: segment/field/component breakdown with labels. 100% client-side — PHI never uploaded." />
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
                <h1 className="h1">HL7 v2 Message Parser</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste a pipe-delimited HL7 v2.x message to see every segment, field, component, and subcomponent
                  with human-readable labels. <strong className="text-gray-300">PHI never leaves your browser</strong> —
                  all parsing is client-side.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">HL7 v2.x message</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={8}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder={'MSH|^~\\&|HIS|FACILITY|LAB|DEST|202609210830||ADT^A01|MSG00001|P|2.5.1\nPID|1||123456^^^FAC^MR||DOE^JOHN||19800115|M'}
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
                      Load .hl7 / .txt file
                      <input type="file" accept=".hl7,.txt,.er7" className="hidden" onChange={onFile} />
                    </label>
                    <button
                      type="button"
                      onClick={() => { setInput(SAMPLE_ADT); setResult(parseHl7(SAMPLE_ADT)); }}
                      className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Sample ADT^A01
                    </button>
                  </div>

                  {result && (
                    <div>
                      {result.messageType && (
                        <div className="rounded-md px-4 py-3 mb-4 text-sm font-medium bg-purple-900/40 text-purple-300 border border-purple-700">
                          {result.messageType} — HL7 v{result.version || '?'}
                        </div>
                      )}

                      <div className="mb-6">
                        {result.checks.map((c) => <CheckRow key={c.label} check={c} />)}
                      </div>

                      <h3 className="text-sm font-semibold text-gray-300 mb-2">Segments</h3>
                      {result.segments.map((seg) => <SegmentView key={seg.index} seg={seg} />)}
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">HL7 v2 anatomy:</strong> each line is a segment (MSH, PID, PV1,
                    OBR, OBX…). Fields are separated by <code className="text-gray-400">|</code>, components by{' '}
                    <code className="text-gray-400">^</code>, repetitions by <code className="text-gray-400">~</code>,
                    and subcomponents by <code className="text-gray-400">&amp;</code> — all declared in MSH-1/MSH-2.
                  </p>
                  <p>
                    This parser shows structure and common field labels; it is not a conformance validator against a
                    specific HL7 version or implementation guide. For FHIR resources, use the{' '}
                    <a href="/tools/fhir-validator/" className="text-purple-400 hover:text-purple-300">FHIR Resource Viewer</a>.
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

export default Hl7Parser;
