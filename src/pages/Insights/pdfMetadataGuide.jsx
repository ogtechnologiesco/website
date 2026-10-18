import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-pdf-metadata.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function PdfMetadataGuide() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>PDF Metadata Explained: How to View, Edit & Remove It | OG Technologies EU</title>
          <meta name="description" content="Every PDF carries hidden metadata — author names, timestamps, tool fingerprints. Learn what the document info dictionary and XMP stream actually contain, how to inspect them, and how to strip metadata before sharing a file." />
          <meta name="keywords" content="PDF metadata, remove PDF metadata, PDF metadata viewer, PDF metadata editor, strip PDF metadata, PDF properties, PDF author, XMP metadata, PDF privacy, anonymize PDF" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/pdf-metadata-guide/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/pdf-metadata-guide/" />
          <meta property="og:title" content="PDF Metadata Explained: How to View, Edit & Remove It" />
          <meta property="og:description" content="What the PDF document info dictionary and XMP stream reveal about your files — and how to inspect, fix, or strip them in your browser." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/pdf-metadata-guide/" />
          <meta name="twitter:title" content="PDF Metadata Explained: How to View, Edit & Remove It" />
          <meta name="twitter:description" content="What the PDF document info dictionary and XMP stream reveal about your files — and how to inspect, fix, or strip them in your browser." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Tools · Security</div>
                  <h1 className="h1">PDF Metadata Explained: What Your Files Reveal and How to Remove It</h1>
                  <div className="text-gray-400 text-center mt-4">18/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="OG Technologies EU PDF metadata tool — metadata table showing author, title, creator, producer, and timestamps"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      Every PDF you share carries an invisible label: who created it, which software produced it, when it was written and last modified. Most of the time that's harmless — a convenience for document management systems and search indexing. But that same label has embarrassed more than a few organizations: drafts circulated with internal authors attached, contracts revealing which department edited them last, reports exposing the exact toolchain used to produce them. Our <Link to="/tools/pdf-metadata/" className="text-purple-400 hover:text-purple-300 underline">free PDF metadata tool</Link> lets you see exactly what a file says about itself, fix what's wrong, or strip it entirely — in your browser, without uploading anything.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The Two Places PDF Metadata Hides</h2>
                    <p className="mb-8">
                      PDF metadata isn't one thing — it's two parallel stores, and cleaning a file properly means handling both. The older mechanism is the <strong>document information dictionary</strong>: a set of key-value pairs referenced from the file's trailer, with standard keys like <code className="text-purple-300">Title</code>, <code className="text-purple-300">Author</code>, <code className="text-purple-300">Subject</code>, <code className="text-purple-300">Keywords</code>, <code className="text-purple-300">Creator</code>, <code className="text-purple-300">Producer</code>, <code className="text-purple-300">CreationDate</code>, and <code className="text-purple-300">ModDate</code>. Applications can also invent their own keys — <code className="text-purple-300">Company</code>, <code className="text-purple-300">SourceModified</code>, internal IDs — which is why a raw view of the dictionary sometimes reveals fields you didn't know existed.
                    </p>
                    <p className="mb-8">
                      The newer mechanism is the <strong>XMP metadata stream</strong>: an XML packet embedded in the document catalog that duplicates the classic fields and extends them — think <code className="text-purple-300">dc:creator</code>, <code className="text-purple-300">xmp:ModifyDate</code>, <code className="text-purple-300">pdfaid:part</code> conformance flags, and tool-specific properties from Adobe, Microsoft, or the producing library. Deleting the info dictionary but leaving the XMP stream means the metadata is still there — just in a format most people don't check. Our tool shows whether a file contains XMP and removes it along with everything else when you strip.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">What Each Field Actually Means</h2>
                    <p className="mb-8">
                      The fields look self-explanatory but a few have subtleties worth knowing:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Title</strong> — what viewers show in the window title and what Google often uses as the result headline for indexed PDFs. Frequently blank, frequently wrong (Word exports love keeping a stale template title).</li>
                      <li><strong>Author</strong> — usually the name or login of whoever created the original document. Office apps fill this from the registered user — including personal account names you may not want on a published file.</li>
                      <li><strong>Subject / Keywords</strong> — free-form description and indexing terms; mostly used by document management systems.</li>
                      <li><strong>Creator</strong> — the application that produced the <em>original</em> content ("Microsoft® Word for Microsoft 365").</li>
                      <li><strong>Producer</strong> — the library that wrote the PDF bytes ("Adobe PDF Library 23.x", "iText", "pdf-lib"). Creator and Producer often differ — a useful fingerprint of a file's toolchain.</li>
                      <li><strong>CreationDate / ModDate</strong> — timestamps in PDF's <code className="text-purple-300">D:YYYYMMDDHHmmSS</code> format with timezone. ModDate in particular quietly records when someone last touched the file — occasionally awkward when a "final" document shows edits after a deadline.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Inspect a PDF's Metadata: Step by Step</h2>
                    <ol className="list-decimal list-inside mb-8 space-y-2">
                      <li>Open the <Link to="/tools/pdf-metadata/" className="text-purple-400 hover:text-purple-300 underline">PDF Metadata tool</Link>.</li>
                      <li>Drop a PDF onto the drop zone. It loads locally — check your network tab if you like; nothing is uploaded.</li>
                      <li>The summary line shows page count, file size, PDF version, and whether an XMP stream is present.</li>
                      <li>The <strong>Current metadata</strong> table lists every entry in the info dictionary, sorted alphabetically — including non-standard fields the tool didn't invent.</li>
                    </ol>
                    <p className="mb-8">
                      If the table is empty, the file has no document info dictionary — already clean. XMP presence is flagged separately, since a file can have an empty info dictionary and still carry an XML metadata packet.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Editing Metadata the Right Way</h2>
                    <p className="mb-8">
                      Below the table, each standard field is editable: fix a wrong title so it displays correctly in viewers, correct the author on a jointly-produced document, or add keywords for an archival system. Two details matter:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Empty fields are deleted.</strong> Clearing a field doesn't write an empty string — it removes the key from the document entirely, which is what you usually want for Author or Creator.</li>
                      <li><strong>Your values are written verbatim.</strong> Some PDF libraries stamp their own name into Producer every time they save a file. The tool saves with metadata updates disabled, so what you type — including a blank Producer — is exactly what the file contains.</li>
                    </ul>
                    <p className="mb-8">
                      Custom fields (anything outside the standard eight) are left untouched — you can see them in the table, and they survive an edit, but they can't be changed individually. If one of them needs to go, use the full strip.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Stripping Everything Before You Share</h2>
                    <p className="mb-8">
                      <strong>Remove all metadata &amp; download</strong> wipes both metadata stores in one pass: every entry in the info dictionary, the dictionary reference itself, and the XMP stream in the document catalog. The output file opens identically — pages, text, images, and layout are byte-for-byte preserved — it just stops introducing itself.
                    </p>
                    <p className="mb-8">
                      This is the right move before publishing a report, sending a proposal, or uploading a document to a public repository. Internal tooling conventions leak more than people expect: an Author of "jane.doe" is a username; a Producer naming a specific converter narrows your stack; timestamps reconstruct your working hours.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">When Metadata Removal Isn't Enough</h2>
                    <p className="mb-8">
                      Stripping metadata is privacy hygiene, not redaction — the distinction matters. Document-level removal does <em>not</em> touch:
                    </p>
                    <ul className="list-disc list-inside mb-8 space-y-2">
                      <li><strong>Comments and annotations.</strong> Sticky notes, highlights, and markup each carry their own author and date. A scrubbed file can still name its reviewers in the margin.</li>
                      <li><strong>Hidden content.</strong> Covered text, off-page objects, optional content layers, and deleted-but-not-purged revisions can persist in the file. This is the classic "black marker" redaction failure — the text is still under the rectangle.</li>
                      <li><strong>Embedded files and thumbnails.</strong> Attachments packaged inside the PDF and page preview images can carry their own data.</li>
                      <li><strong>The content itself.</strong> The fastest leak is the one you can read: headers, footers, document IDs, tracked changes exported to PDF.</li>
                    </ul>
                    <p className="mb-8">
                      For anything genuinely sensitive, treat metadata stripping as the last step of a review that also checks annotations and page content — and verify the output by dropping it back into the tool to confirm the stores are actually empty.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Try It</h2>
                    <p className="mb-8">
                      The <Link to="/tools/pdf-metadata/" className="text-purple-400 hover:text-purple-300 underline">PDF metadata viewer, editor, and remover</Link> is one of six PDF utilities on the site — all client-side, no signup, no watermarks. If you need to reshape the file itself, the <Link to="/tools/merge-pdf/" className="text-purple-400 hover:text-purple-300 underline">Merge</Link> and <Link to="/tools/split-pdf/" className="text-purple-400 hover:text-purple-300 underline">Split</Link> tools handle structure, while <Link to="/tools/document-to-pdf/" className="text-purple-400 hover:text-purple-300 underline">Document to PDF</Link> and <Link to="/tools/pdf-to-word/" className="text-purple-400 hover:text-purple-300 underline">PDF to Word</Link> cover the conversion round-trip.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What metadata does a PDF contain?</h3>
                    <p className="mb-8">
                      A document information dictionary with title, author, subject, keywords, creator, producer, and creation/modification timestamps — plus optional custom fields added by whatever wrote the file. Most PDFs also embed an XMP metadata packet (an XML stream) duplicating and extending those properties.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">What is the difference between Creator and Producer?</h3>
                    <p className="mb-8">
                      Creator names the application that authored the original content (e.g., Microsoft Word); Producer names the library or engine that converted it to PDF (e.g., Adobe PDF Library, iText). A Word document exported through a third-party converter will often show different values for each.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Does removing PDF metadata change the document?</h3>
                    <p className="mb-8">
                      No — only the document information dictionary and the XMP metadata stream are removed. Pages, text, images, fonts, and layout are preserved exactly; the file renders identically.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Does removing metadata fully anonymize a PDF?</h3>
                    <p className="mb-8">
                      No. It removes document-level properties — author, timestamps, tool names. Traces stored elsewhere remain: author names on comments and annotations, embedded files, hidden layers, and anything printed in the page content itself. For sensitive files, strip metadata after reviewing the visible content too.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is it safe to edit PDF metadata online?</h3>
                    <p className="mb-8">
                      With a client-side tool, yes — the file is parsed and rewritten in your browser and never transmitted. With server-based tools, your document is uploaded, processed, and downloaded again, which means it passes through infrastructure you don't control. You can verify the difference yourself in the browser's network tab.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/pdf-metadata-guide/"
                    categories={['Tools', 'Security']}
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

export default PdfMetadataGuide;
