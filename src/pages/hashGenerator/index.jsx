import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { keccak256, keccak512 } from 'js-sha3';

const ALGORITHMS = [
  { id: 'sha-1', label: 'SHA-1', insecure: true },
  { id: 'sha-256', label: 'SHA-256', insecure: false },
  { id: 'sha-384', label: 'SHA-384', insecure: false },
  { id: 'sha-512', label: 'SHA-512', insecure: false },
  { id: 'keccak256', label: 'Keccak-256', insecure: false },
  { id: 'keccak512', label: 'Keccak-512', insecure: false },
  { id: 'md5', label: 'MD5', insecure: true },
];

async function computeHash(algorithm, input, inputMode) {
  let data;
  if (inputMode === 'hex') {
    const cleanHex = input.startsWith('0x') ? input.slice(2) : input;
    if (!/^[0-9a-fA-F]*$/.test(cleanHex) || cleanHex.length % 2 !== 0) throw new Error('Invalid hex input');
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
    }
    data = bytes;
  } else {
    data = new TextEncoder().encode(input);
  }

  if (algorithm === 'keccak256') {
    return keccak256(data);
  }
  if (algorithm === 'keccak512') {
    return keccak512(data);
  }

  if (algorithm === 'md5') {
    // MD5 implementation via crypto.subtle is not available in all browsers
    // Use a simple inline implementation
    return md5Hex(data);
  }

  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = new Uint8Array(hashBuffer);
  return Array.from(hashArray).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Minimal MD5 implementation
function md5Hex(data) {
  const s = [];
  for (let i = 0; i < 64; i++) s[i] = i;
  const K = [];
  for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);

  let bytes;
  if (data instanceof Uint8Array) {
    bytes = Array.from(data);
  } else {
    bytes = Array.from(new TextEncoder().encode(data));
  }

  const origLen = bytes.length;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  const lenBits = origLen * 8;
  for (let i = 0; i < 8; i++) bytes.push((lenBits >>> (i * 8)) & 0xff);

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;

  for (let chunk = 0; chunk < bytes.length; chunk += 64) {
    const M = [];
    for (let i = 0; i < 16; i++) {
      M[i] = bytes[chunk + i * 4] | (bytes[chunk + i * 4 + 1] << 8) | (bytes[chunk + i * 4 + 2] << 16) | (bytes[chunk + i * 4 + 3] << 24);
    }
    let A = a0, B = b0, C = c0, D = d0;
    for (let i = 0; i < 64; i++) {
      let F, g;
      if (i < 16) { F = (B & C) | (~B & D); g = i; }
      else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
      else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * i) % 16; }
      F = (F + A + K[i] + M[g]) >>> 0;
      A = D; D = C; C = B;
      B = (B + ((F << s[i]) | (F >>> (32 - s[i])))) >>> 0;
    }
    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  const result = [a0, b0, c0, d0].map((v) => {
    let hex = '';
    for (let i = 0; i < 4; i++) hex += ((v >>> (i * 8)) & 0xff).toString(16).padStart(2, '0');
    return hex;
  }).join('');
  return result;
}

function HashGenerator() {
  const [input, setInput] = useState('Hello, World!');
  const [inputMode, setInputMode] = useState('text');
  const [selectedAlgos, setSelectedAlgos] = useState(['sha-256', 'keccak256']);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputBytes = useMemo(() => {
    if (!input) return 0;
    if (inputMode === 'hex') {
      const clean = input.startsWith('0x') ? input.slice(2) : input;
      return clean.length / 2;
    }
    return new TextEncoder().encode(input).length;
  }, [input, inputMode]);

  const toggleAlgo = (algoId) => {
    setSelectedAlgos((prev) =>
      prev.includes(algoId) ? prev.filter((a) => a !== algoId) : [...prev, algoId]
    );
  };

  const generate = async () => {
    if (!input.trim()) { setError('Please enter input text'); return; }
    setLoading(true);
    setError('');
    const newResults = {};
    try {
      for (const algoId of selectedAlgos) {
        const hash = await computeHash(algoId, input, inputMode);
        newResults[algoId] = hash;
      }
      setResults(newResults);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free Hash Generator - SHA-256, SHA-512, Keccak256, MD5 | OG Technologies EU</title>
        <meta name="description" content="Generate hashes online: MD5, SHA-1, SHA-256, SHA-384, SHA-512, Keccak-256, Keccak-512. 100% client-side, no data sent to any server." />
        <meta name="keywords" content="hash generator, sha256, sha512, keccak256, md5, sha1, hash calculator, online hash tool, cryptographic hash" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/hash-generator" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/hash-generator" />
        <meta property="og:title" content="Free Hash Generator - SHA-256, SHA-512, Keccak256, MD5 | OG Technologies EU" />
        <meta property="og:description" content="Generate hashes online: MD5, SHA-1, SHA-256, SHA-384, SHA-512, Keccak-256, Keccak-512. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/hash-generator" />
        <meta name="twitter:title" content="Free Hash Generator - SHA-256, SHA-512, Keccak256, MD5 | OG Technologies EU" />
        <meta name="twitter:description" content="Generate hashes online: MD5, SHA-1, SHA-256, SHA-384, SHA-512, Keccak-256, Keccak-512. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Hash Generator',
            url: 'https://www.ogtechnologies.co/tools/hash-generator',
            description: 'Generate hashes online: MD5, SHA-1, SHA-256, SHA-384, SHA-512, Keccak-256, Keccak-512. 100% client-side.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            featureList: [
              'MD5 hash generation',
              'SHA-1, SHA-256, SHA-384, SHA-512',
              'Keccak-256 and Keccak-512',
              'Text and hex input modes',
              'Multiple algorithms simultaneously',
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
                <h1 className="h1">Hash Generator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Generate cryptographic hashes from text or hex data. Supports MD5, SHA-1, SHA-256, SHA-384, SHA-512,
                  Keccak-256, and Keccak-512. Everything runs in your browser — no data is sent to any server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="flex gap-2 mb-4">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        inputMode === 'text' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setInputMode('text')}
                    >
                      Text Input
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        inputMode === 'hex' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setInputMode('hex')}
                    >
                      Hex Input
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">
                      {inputMode === 'text' ? 'Text to hash' : 'Hex data to hash (with or without 0x prefix)'}
                    </label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={4}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                      placeholder={inputMode === 'text' ? 'Enter text to hash...' : '48656c6c6f'}
                    />
                    <p className="text-xs text-gray-500 mt-1">Input length: {inputBytes} bytes</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-2">Select Algorithms</label>
                    <div className="flex flex-wrap gap-2">
                      {ALGORITHMS.map((algo) => (
                        <button
                          key={algo.id}
                          type="button"
                          onClick={() => toggleAlgo(algo.id)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            selectedAlgos.includes(algo.id)
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {algo.label}
                          {algo.insecure && <span className="text-xs text-yellow-400 ml-1">⚠</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={generate}
                    disabled={loading || !input.trim() || selectedAlgos.length === 0}
                    className="w-full px-4 py-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
                  >
                    {loading ? 'Generating...' : 'Generate Hashes'}
                  </button>

                  {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

                  {Object.keys(results).length > 0 && (
                    <div className="space-y-3">
                      {ALGORITHMS.filter((a) => results[a.id]).map((algo) => (
                        <div key={algo.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-300 text-sm font-medium">
                              {algo.label}
                              {algo.insecure && <span className="text-xs text-yellow-400 ml-2">(insecure for crypto)</span>}
                            </span>
                            <button
                              type="button"
                              onClick={() => navigator.clipboard.writeText(results[algo.id])}
                              className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors"
                            >
                              Copy
                            </button>
                          </div>
                          <div className="bg-gray-700 rounded-md px-4 py-3">
                            <code className="text-purple-300 font-mono text-sm break-all">{results[algo.id]}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 text-xs text-gray-500">
                    <p><strong>SHA-1 and MD5</strong> are cryptographically broken — do not use for security purposes.</p>
                    <p className="mt-1"><strong>Keccak-256</strong> is the hash used by Ethereum (not the same as NIST SHA3-256).</p>
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

export default HashGenerator;
