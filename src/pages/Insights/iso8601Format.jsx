import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-iso8601-format.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Iso8601Format() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>ISO 8601 Date Formats Explained: Durations, Week Dates, Intervals, and the RFC 3339 Subset | OG Technologies EU</title>
          <meta name="description" content="ISO 8601 explained: the anatomy of date-time strings, calendar/ordinal/week dates, durations (PnYnMnDTnHnMnS), intervals, reduced precision, and how RFC 3339 differs. With a free online validator." />
          <meta name="keywords" content="ISO 8601, iso 8601 format, iso 8601 duration, iso 8601 week date, iso 8601 interval, RFC 3339 vs ISO 8601, iso 8601 explained, date time format, iso 8601 validator" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/iso-8601-format-guide/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/iso-8601-format-guide/" />
          <meta property="og:title" content="ISO 8601 Date Formats Explained: Durations, Week Dates, Intervals, and the RFC 3339 Subset" />
          <meta property="og:description" content="Calendar, ordinal, and week dates; durations and intervals; and where RFC 3339 fits — ISO 8601 decoded." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/iso-8601-format-guide/" />
          <meta name="twitter:title" content="ISO 8601 Date Formats Explained: Durations, Week Dates, Intervals, and the RFC 3339 Subset" />
          <meta name="twitter:description" content="Calendar, ordinal, and week dates; durations and intervals; and where RFC 3339 fits — ISO 8601 decoded." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Standards · Developer</div>
                  <h1 className="h1">ISO 8601 Date Formats Explained: Durations, Week Dates, Intervals, and the RFC 3339 Subset</h1>
                  <div className="text-gray-400 text-center mt-4">03/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-2 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="Digital watch displaying date and time — ISO 8601 date-time notation"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-xs text-gray-500 mb-8">
                    Image: "Casio F-91 W front closeup" by VSchagow, <a href="https://commons.wikimedia.org/wiki/File:Casio_F-91_W_front_closeup_minor_retouch.jpg" className="underline hover:text-gray-400" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
                  </p>

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      <strong>ISO 8601</strong> is the international standard for representing dates and times — the reason <code className="text-purple-300">2026-10-03</code> means October 3rd to everyone on Earth, regardless of whether their local convention reads 03/10 or 10/03. It kills the single most dangerous ambiguity in computing (is 03/04 March 4th or April 3rd?) by mandating one ordering: <strong>most significant first</strong> — year, month, day. But ISO 8601 is much bigger than the familiar <code className="text-purple-300">YYYY-MM-DDThh:mm:ssZ</code> shape most developers know. It also standardizes week dates, ordinal dates, durations, and time intervals — and its relationship to RFC 3339 trips up even experienced engineers.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Anatomy of a Date-Time String</h2>
                    <p className="mb-8">
                      The canonical form you see in APIs and databases:
                    </p>
                    <p className="mb-4">
                      <code className="text-purple-300 text-xl">2026-10-03T14:30:00+02:00</code>
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><code className="text-purple-300">2026</code> — year (four digits; expanded forms allow more)</li>
                      <li><code className="text-purple-300">-10</code> — month (01–12, always zero-padded)</li>
                      <li><code className="text-purple-300">-03</code> — day of month</li>
                      <li><code className="text-purple-300">T</code> — the separator between date and time parts (required, not optional)</li>
                      <li><code className="text-purple-300">14:30:00</code> — local time, 24-hour clock; seconds may be omitted and fractional seconds appended after a comma or period</li>
                      <li><code className="text-purple-300">+02:00</code> — UTC offset; <code className="text-purple-300">Z</code> means +00:00 (UTC). No offset at all means local time with no timezone information — a common source of bugs.</li>
                    </ul>
                    <p className="mb-8">
                      The standard defines a <strong>basic format</strong> without separators (<code className="text-purple-300">20261003T143000+0200</code>) and the <strong>extended format</strong> above with hyphens and colons. In practice, extended format dominates because it's human-readable; APIs almost universally use it.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Three Ways to Write the Same Date</h2>
                    <p className="mb-8">
                      ISO 8601 actually standardizes <strong>three date representations</strong>. October 3, 2026 is:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-3">
                      <li><strong>Calendar date:</strong> <code className="text-purple-300">2026-10-03</code> — the familiar year-month-day.</li>
                      <li><strong>Ordinal date:</strong> <code className="text-purple-300">2026-276</code> — year plus day-of-year (1–366). Handy in logistics and day-counting domains where "day 276" is more natural than a month/day pair.</li>
                      <li><strong>Week date:</strong> <code className="text-purple-300">2026-W40-6</code> — ISO year, week number, weekday (1=Monday…7=Sunday). Week 1 is the week containing the year's first Thursday — which means <code className="text-purple-300">2026-01-01</code> can belong to week date <code className="text-purple-300">2025-W53-4</code>, and December 29–31 can fall in week 1 of the <em>next</em> year. This mismatch between calendar year and ISO week-year is a classic source of off-by-one bugs in reporting systems.</li>
                    </ul>
                    <p className="mb-8">
                      Test any of these against our <Link to="/tools/iso-8601-validator/" className="text-purple-400 hover:text-purple-300 underline">ISO 8601 validator</Link> — it parses all three families plus durations and intervals, explains exactly which component fails when a string is invalid, and shows the normalized UTC form.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Durations: PnYnMnDTnHnMnS</h2>
                    <p className="mb-8">
                      Durations (lengths of time, not points in time) start with <strong>P</strong> for "period" and follow a strict positional pattern:
                    </p>
                    <p className="mb-4">
                      <code className="text-purple-300 text-xl">P1Y2M10DT2H30M</code>
                    </p>
                    <p className="mb-8">
                      Read: 1 year, 2 months, 10 days, 2 hours, 30 minutes. The <code className="text-purple-300">T</code> separates the date components (Y, M, W, D) from the time components (H, M, S) — which is why <code className="text-purple-300">M</code> can mean month <em>or</em> minute depending on which side of T it appears on. That's the most common parsing mistake: <code className="text-purple-300">P1M</code> is one month, but <code className="text-purple-300">PT1M</code> is one minute. Weeks (<code className="text-purple-300">P2W</code>) can't be combined with other units. Valid examples: <code className="text-purple-300">P3Y6M4DT12H30M5S</code>, <code className="text-purple-300">PT15M</code>, <code className="text-purple-300">P0.5Y</code> (fractions allowed on the smallest unit only).
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Time Intervals</h2>
                    <p className="mb-8">
                      Intervals are two endpoints joined by a slash — and one endpoint can be a duration:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><code className="text-purple-300">2026-10-03T00:00:00Z/2026-10-04T00:00:00Z</code> — start/end, the explicit form</li>
                      <li><code className="text-purple-300">2026-10-03T00:00:00Z/P1DT12H</code> — start plus duration</li>
                      <li><code className="text-purple-300">P1DT12H/2026-10-04T00:00:00Z</code> — duration before an end</li>
                    </ul>
                    <p className="mb-8">
                      Repeating intervals prefix an <code className="text-purple-300">R</code>: <code className="text-purple-300">R5/2026-01-01T00:00:00Z/P1W</code> means "every week, five times, starting January 1st." Recurrence rules like this power scheduling systems that need standard, unambiguous semantics.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Reduced Precision and Fractional Seconds</h2>
                    <p className="mb-8">
                      ISO 8601 allows dropping the least significant parts: <code className="text-purple-300">2026-10</code> is "October 2026," <code className="text-purple-300">2026</code> is the year — useful for "valid through" fields and partial dates in databases. Fractional seconds append after a comma or period — <code className="text-purple-300">14:30:00,5</code> or <code className="text-purple-300">14:30:00.500</code>. Both separators are legal in the standard, though most implementations (and RFC 3339) prefer the period.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">ISO 8601 vs RFC 3339: The Subset Everyone Actually Uses</h2>
                    <p className="mb-8">
                      <strong>RFC 3339</strong> is the IETF's profile of ISO 8601 for internet protocols — a deliberately restricted subset. If you've written <code className="text-purple-300">timestamps</code> for JSON APIs, you were really writing RFC 3339. The differences that matter:
                    </p>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-left text-sm border border-gray-700">
                        <thead>
                          <tr className="bg-gray-800">
                            <th className="px-4 py-2 font-semibold text-gray-200">Feature</th>
                            <th className="px-4 py-2 font-semibold text-gray-200">ISO 8601</th>
                            <th className="px-4 py-2 font-semibold text-gray-200">RFC 3339</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-gray-700"><td className="px-4 py-2 text-gray-200">Offset required</td><td className="px-4 py-2 text-gray-400">Optional (local time allowed)</td><td className="px-4 py-2 text-gray-400">Mandatory — <code className="text-purple-300">Z</code> or ±hh:mm</td></tr>
                          <tr className="border-t border-gray-700"><td className="px-4 py-2 text-gray-200">Basic format (no separators)</td><td className="px-4 py-2 text-gray-400">Yes — <code className="text-purple-300">20261003</code></td><td className="px-4 py-2 text-gray-400">No — separators required</td></tr>
                          <tr className="border-t border-gray-700"><td className="px-4 py-2 text-gray-200">Week & ordinal dates</td><td className="px-4 py-2 text-gray-400">Yes — <code className="text-purple-300">2026-W40-6</code>, <code className="text-purple-300">2026-276</code></td><td className="px-4 py-2 text-gray-400">No — calendar dates only</td></tr>
                          <tr className="border-t border-gray-700"><td className="px-4 py-2 text-gray-200">Durations & intervals</td><td className="px-4 py-2 text-gray-400">Yes</td><td className="px-4 py-2 text-gray-400">No — not covered</td></tr>
                          <tr className="border-t border-gray-700"><td className="px-4 py-2 text-gray-200">Reduced precision (<code className="text-purple-300">2026-10</code>)</td><td className="px-4 py-2 text-gray-400">Yes</td><td className="px-4 py-2 text-gray-400">No — full dates required</td></tr>
                          <tr className="border-t border-gray-700"><td className="px-4 py-2 text-gray-200">Space separator for T</td><td className="px-4 py-2 text-gray-400">No (T only)</td><td className="px-4 py-2 text-gray-400">Tolerated in practice (a NOTE permits it for readability)</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-8">
                      The practical rule: <strong>emit RFC 3339, accept ISO 8601.</strong> RFC 3339's mandatory offset kills the ambiguous-local-time bug class entirely, which is why it's the right choice for wire formats. But if you validate incoming user or partner data with an RFC 3339-only regex, you'll reject perfectly legal ISO 8601 inputs like week dates and durations.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Validation Gotchas That Break Real Systems</h2>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Week 53 exists (sometimes).</strong> <code className="text-purple-300">2026-W53</code> is invalid — 2026 has only 52 ISO weeks — but <code className="text-purple-300">2020-W53</code> is legal. Validators must compute the actual ISO week count per year.</li>
                      <li><strong>Leap days and leap seconds.</strong> <code className="text-purple-300">2026-02-29</code> is invalid (2026 isn't a leap year); <code className="text-purple-300">23:59:60</code> is technically legal for leap seconds and will crash parsers that assume seconds max at 59.</li>
                      <li><strong><code className="text-purple-300">24:00</code> vs <code className="text-purple-300">00:00</code>.</strong> ISO 8601 permits <code className="text-purple-300">24:00</code> meaning end-of-day; RFC 3339 and most implementations don't. Normalize it to <code className="text-purple-300">00:00</code> of the next day on ingest.</li>
                      <li><strong><code className="text-purple-300">Z</code> vs missing offset.</strong> <code className="text-purple-300">2026-10-03T14:30:00</code> isn't UTC — it's <em>unknown</em>. Storing it as UTC silently shifts times by your server's timezone.</li>
                      <li><strong>Year-week boundary.</strong> Formatting a week date with a calendar-year field produces strings like <code className="text-purple-300">2026-W01</code> for December 2025 dates — the week-year differs from the calendar year. Always use the ISO week-year when formatting.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Test Your Strings</h2>
                    <p className="mb-8">
                      Our free <Link to="/tools/iso-8601-validator/" className="text-purple-400 hover:text-purple-300 underline">ISO 8601 / RFC 3339 validator</Link> handles bulk validation of all the formats above — calendar, ordinal, and week dates; full date-times with offsets; durations; and intervals — with per-line explanations of which component failed and a UTC canonical form for valid inputs. Everything runs in your browser; nothing is uploaded.
                    </p>
                    <p className="mb-8">
                      Working with other structured formats? Our <Link to="/tools/hl7-parser/" className="text-purple-400 hover:text-purple-300 underline">HL7 parser</Link> decodes healthcare messages (which use their own timestamp quirks), and the <Link to="/insights/hl7-v2-message-structure/" className="text-purple-400 hover:text-purple-300 underline">HL7 v2 structure guide</Link> shows how standards bodies solve similar problems.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What does the T in ISO 8601 mean?</h3>
                    <p className="mb-8">
                      It's just a separator marking the transition from the date part to the time part — <code className="text-purple-300">2026-10-03T14:30:00</code> reads "October 3, 2026, at 14:30:00." It's required in ISO 8601 (not a placeholder). In durations, a second T also separates date units (years/months/days) from time units (hours/minutes/seconds) — which is how <code className="text-purple-300">P1M</code> (one month) differs from <code className="text-purple-300">PT1M</code> (one minute).
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is RFC 3339 the same as ISO 8601?</h3>
                    <p className="mb-8">
                      No — RFC 3339 is a profile (strict subset) of ISO 8601 designed for internet protocols. It mandates a UTC offset, requires separators, and only allows calendar dates — no week dates, ordinal dates, durations, intervals, or reduced precision. A valid RFC 3339 timestamp is always valid ISO 8601, but the reverse is not true.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is an ISO week date?</h3>
                    <p className="mb-8">
                      A date expressed as year-weeknumber-weekday: <code className="text-purple-300">2026-W40-6</code> is Saturday of week 40 (October 3, 2026). Week 1 is the week containing the first Thursday of the year, and weeks run Monday–Sunday. This means the ISO week-year can differ from the calendar year at year boundaries — <code className="text-purple-300">2025-12-29</code> through <code className="text-purple-300">2025-12-31</code> can belong to <code className="text-purple-300">2026-W01</code>.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How do I write a duration in ISO 8601?</h3>
                    <p className="mb-8">
                      Start with P, then date components, then T, then time components: <code className="text-purple-300">P1Y2M10DT2H30M</code> = 1 year, 2 months, 10 days, 2 hours, 30 minutes. Omit components you don't need (<code className="text-purple-300">PT15M</code> = 15 minutes). Weeks use <code className="text-purple-300">W</code> and can't be mixed with other units.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is 24:00 a valid ISO 8601 time?</h3>
                    <p className="mb-8">
                      Yes — ISO 8601 accepts <code className="text-purple-300">24:00</code> to mean midnight at the end of the day, equivalent to <code className="text-purple-300">00:00</code> of the following day. But RFC 3339 and most parsers reject it, so normalize to <code className="text-purple-300">00:00</code> when exchanging data.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/iso-8601-format-guide/"
                    categories={['Standards', 'Developer']}
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

export default Iso8601Format;
