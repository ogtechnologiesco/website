import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';

const READING_WPM = 200;
const SPEAKING_WPM = 130;

const SAMPLE_TEXT = `Paste or type your text here and every statistic updates live as you write.

The counter measures words, characters (with and without spaces), spaces, sentences, paragraphs, and lines. It also estimates how long the text takes to read or speak, and shows which words you use most often. Everything is computed in your browser — nothing is uploaded to a server.`;

function countSentences(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const segments = trimmed.match(/[^.!?…]+(?:[.!?…]+|$)/g) || [];
  return segments.filter((s) => s.trim().length > 0).length;
}

function formatDuration(seconds) {
  if (seconds === 0) return '0 sec';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s} sec`;
  return s === 0 ? `${m} min` : `${m} min ${s} sec`;
}

function analyzeText(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      words: 0, characters: 0, charactersNoSpaces: 0, spaces: 0,
      sentences: 0, paragraphs: 0, lines: 0, uniqueWords: 0,
      avgWordLength: '0', longestWord: '—',
      readingTime: '0 sec', speakingTime: '0 sec', topWords: [],
    };
  }

  const wordTokens = trimmed
    .split(/\s+/)
    .filter((t) => /[\p{L}\p{N}]/u.test(t));

  const normalized = wordTokens
    .map((w) => w.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
    .filter((w) => w.length > 0);

  const freq = new Map();
  normalized.forEach((w) => freq.set(w, (freq.get(w) || 0) + 1));
  const topWords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([word, count]) => ({ word, count, pct: ((count / normalized.length) * 100).toFixed(1) }));

  const longest = normalized.reduce((a, b) => (b.length > a.length ? b : a), '');
  const totalWordChars = normalized.reduce((sum, w) => sum + w.length, 0);

  return {
    words: wordTokens.length,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    spaces: (text.match(/ /g) || []).length,
    sentences: countSentences(text),
    paragraphs: text.split(/\r?\n\s*\r?\n/).filter((b) => b.trim().length > 0).length,
    lines: text.split(/\r\n|\r|\n/).length,
    uniqueWords: freq.size,
    avgWordLength: normalized.length ? (totalWordChars / normalized.length).toFixed(1) : '0',
    longestWord: longest || '—',
    readingTime: formatDuration(Math.ceil((wordTokens.length / READING_WPM) * 60)),
    speakingTime: formatDuration(Math.ceil((wordTokens.length / SPEAKING_WPM) * 60)),
    topWords,
  };
}

function WordCounter() {
  const [input, setInput] = useState('');
  const stats = useMemo(() => analyzeText(input), [input]);

  const statCards = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.characters },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces },
    { label: 'Spaces', value: stats.spaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Lines', value: stats.lines },
    { label: 'Unique Words', value: stats.uniqueWords },
  ];

  const copyStats = () => {
    const summary = `Words: ${stats.words}\nCharacters: ${stats.characters}\nCharacters (no spaces): ${stats.charactersNoSpaces}\nSpaces: ${stats.spaces}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}\nLines: ${stats.lines}\nUnique words: ${stats.uniqueWords}\nReading time: ${stats.readingTime}\nSpeaking time: ${stats.speakingTime}`;
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free Word Counter - Words, Characters, Sentences, Paragraphs | OG Technologies EU</title>
        <meta name="description" content="Count words, characters, sentences, paragraphs, and spaces online. Live stats, reading and speaking time estimates, and keyword density — 100% free and private." />
        <meta name="keywords" content="word counter, character counter, sentence counter, paragraph counter, space counter, count words online, text counter, letter count, reading time calculator" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/word-counter/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/word-counter/" />
        <meta property="og:title" content="Free Word Counter - Words, Characters, Sentences, Paragraphs | OG Technologies EU" />
        <meta property="og:description" content="Count words, characters, sentences, paragraphs, and spaces online. Live stats, reading and speaking time estimates, and keyword density — 100% free and private." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/word-counter/" />
        <meta name="twitter:title" content="Free Word Counter - Words, Characters, Sentences, Paragraphs | OG Technologies EU" />
        <meta name="twitter:description" content="Count words, characters, sentences, paragraphs, and spaces online. Live stats, reading and speaking time estimates, and keyword density — 100% free and private." />
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
                <h1 className="h1">Word &amp; Character Counter</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste or type text to count words, characters, sentences, paragraphs, and spaces
                  in real time — plus reading time and keyword density. Everything runs in your
                  browser; nothing is sent to any server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {statCards.map((card) => (
                      <div key={card.label} className="bg-gray-700 rounded-md px-4 py-3 text-center">
                        <p className="text-2xl font-bold text-white">{card.value}</p>
                        <p className="text-xs text-gray-400">{card.label}</p>
                      </div>
                    ))}
                  </div>

                  <label className="block text-gray-300 text-sm font-medium mb-1">Your text</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={10}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm mb-3"
                    placeholder="Start typing or paste your text here..."
                  />

                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => setInput(SAMPLE_TEXT)}
                      className="px-4 py-2 rounded-md text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Load Sample
                    </button>
                    <button
                      type="button"
                      onClick={copyStats}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-md text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Copy Stats
                    </button>
                    <button
                      type="button"
                      onClick={() => setInput('')}
                      disabled={!input}
                      className="px-4 py-2 rounded-md text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Clear
                    </button>
                  </div>

                  {input.trim() && (
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      <div className="bg-gray-700 rounded-md px-4 py-3">
                        <p className="text-xs text-gray-400 mb-1">Reading time <span className="text-gray-500">(avg {READING_WPM} wpm)</span></p>
                        <p className="text-lg font-semibold text-white">{stats.readingTime}</p>
                      </div>
                      <div className="bg-gray-700 rounded-md px-4 py-3">
                        <p className="text-xs text-gray-400 mb-1">Speaking time <span className="text-gray-500">(avg {SPEAKING_WPM} wpm)</span></p>
                        <p className="text-lg font-semibold text-white">{stats.speakingTime}</p>
                      </div>
                      <div className="bg-gray-700 rounded-md px-4 py-3">
                        <p className="text-xs text-gray-400 mb-1">Average word length</p>
                        <p className="text-lg font-semibold text-white">{stats.avgWordLength} chars</p>
                      </div>
                      <div className="bg-gray-700 rounded-md px-4 py-3">
                        <p className="text-xs text-gray-400 mb-1">Longest word</p>
                        <p className="text-lg font-semibold text-white break-all">{stats.longestWord}</p>
                      </div>
                    </div>
                  )}

                  {stats.topWords.length > 0 && (
                    <div>
                      <p className="text-gray-300 text-sm font-medium mb-2">Keyword density</p>
                      <div className="space-y-1">
                        {stats.topWords.map((t) => (
                          <div key={t.word} className="flex items-center gap-3">
                            <span className="text-sm text-purple-300 font-mono w-32 truncate">{t.word}</span>
                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-purple-500"
                                style={{ width: `${Math.max(3, (t.count / stats.topWords[0].count) * 100)}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 w-20 text-right">{t.count}× · {t.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 text-xs text-gray-500">
                    <p><strong>Words</strong> are whitespace-separated tokens containing at least one letter or digit — hyphenated words like "state-of-the-art" count as one.</p>
                    <p className="mt-1"><strong>Sentences</strong> end with ., !, ?, or …; abbreviations like "e.g." may count as extra boundaries.</p>
                    <p className="mt-1"><strong>Paragraphs</strong> are blocks of text separated by blank lines.</p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mt-8">
                  <h2 className="text-2xl font-bold text-white mb-6">What This Counter Measures</h2>
                  <div className="grid sm:grid-cols-2 gap-6 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Words and characters</h3>
                      <p className="text-sm">
                        The two numbers most limits care about: word count for essays, articles, and
                        reports, and character count — with or without spaces — for tweets, meta
                        descriptions, SMS segments, and form fields.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Sentences and paragraphs</h3>
                      <p className="text-sm">
                        Sentence and paragraph counts help you spot dense writing at a glance.
                        Dividing words by sentences gives a rough readability signal — long averages
                        usually mean hard-to-follow prose.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Reading and speaking time</h3>
                      <p className="text-sm">
                        Estimates based on common averages — {READING_WPM} words per minute for
                        silent reading and {SPEAKING_WPM} wpm for presentations and voiceovers — so
                        you can size blog posts and scripts accurately.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Keyword density</h3>
                      <p className="text-sm">
                        The frequency table shows your most-used words and their share of the total —
                        useful for SEO drafts and for catching unintentional repetition before you
                        publish.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mt-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">How does this tool count words?</h3>
                      <p className="text-sm">
                        Text is split on whitespace, and each token that contains at least one letter
                        or digit counts as a word — matching how Word and Google Docs count.
                        Hyphenated terms count as one word; standalone punctuation does not.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">How are sentences and paragraphs counted?</h3>
                      <p className="text-sm">
                        A sentence ends at a period, exclamation mark, question mark, or ellipsis —
                        plus any trailing fragment without terminal punctuation. A paragraph is a
                        block of text separated by one or more blank lines.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">How accurate are the reading and speaking times?</h3>
                      <p className="text-sm">
                        They are estimates based on widely used averages — {READING_WPM} words per
                        minute for adult silent reading and {SPEAKING_WPM} wpm for spoken delivery.
                        Dense technical text reads slower; slides and dialogue read faster.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Is my text uploaded or stored anywhere?</h3>
                      <p className="text-sm">
                        No. All counting runs entirely in your browser — the text is never sent to a
                        server or persisted. You can verify this in your browser's network tab.
                      </p>
                    </div>
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

export default WordCounter;
