import React, { useRef, useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageIllustration from '../partials/PageIllustration';

function HtmlToImage() {
  const [htmlContent, setHtmlContent] = useState(null);
  const [fileName, setFileName] = useState('');
  const [format, setFormat] = useState('png');
  const [scale, setScale] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef(null);
  const fileInputRef = useRef(null);

  const readFile = (file) => {
    if (!file) return;
    if (!/\.html?$/i.test(file.name)) {
      toast.error('Please upload an .html or .htm file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setIframeLoaded(false);
      setHtmlContent(e.target.result);
      setFileName(file.name.replace(/\.html?$/i, ''));
      toast.success('File loaded successfully');
    };
    reader.onerror = () => toast.error('Could not read the file');
    reader.readAsText(file);
  };

  const handleFileChange = (e) => {
    readFile(e.target.files?.[0]);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    readFile(e.dataTransfer.files?.[0]);
  };

  const handleConvert = async () => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!doc || !doc.documentElement) {
      toast.error('Please upload an HTML file first');
      return;
    }
    setIsConverting(true);
    try {
      // Wait for document scripts (e.g. Mermaid) to finish rendering
      if (!iframeLoaded) {
        await new Promise((resolve) => {
          iframe.addEventListener('load', resolve, { once: true });
          setTimeout(resolve, 5000);
        });
      }
      await doc.fonts?.ready;
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const node = doc.documentElement;
      const width = Math.max(node.scrollWidth, doc.body?.scrollWidth || 0, 800);
      const height = Math.max(node.scrollHeight, doc.body?.scrollHeight || 0, 600);
      const options = {
        pixelRatio: scale,
        width,
        height,
        backgroundColor: '#ffffff',
        style: { margin: '0' },
      };
      const dataUrl = format === 'png'
        ? await toPng(node, options)
        : await toJpeg(node, { ...options, quality: 0.95 });

      const link = document.createElement('a');
      link.download = `${fileName || 'page'}.${format === 'png' ? 'png' : 'jpg'}`;
      link.href = dataUrl;
      link.click();
      toast.success('Image downloaded');
    } catch (err) {
      console.error(err);
      toast.error('Conversion failed. Some external resources may be blocked by CORS.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setHtmlContent(null);
    setFileName('');
    setIframeLoaded(false);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>HTML to Image Converter - Free Browser Tool | OG Technologies EU</title>
        <meta name="description" content="Convert HTML files to PNG or JPG images directly in your browser. Free, private, and secure - no file is ever uploaded to a server." />
        <meta name="keywords" content="HTML to image, HTML to PNG, HTML to JPG, HTML screenshot, convert HTML to image, browser tool, free converter" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ogtechnologies.co/tools/html-to-image" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ogtechnologies.co/tools/html-to-image" />
        <meta property="og:title" content="HTML to Image Converter - Free Browser Tool | OG Technologies EU" />
        <meta property="og:description" content="Convert HTML files to PNG or JPG images directly in your browser. No file is ever uploaded to a server." />
        <meta property="og:image" content="https://ogtechnologies.co/og-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ogtechnologies.co/tools/html-to-image" />
        <meta name="twitter:title" content="HTML to Image Converter - Free Browser Tool | OG Technologies EU" />
        <meta name="twitter:description" content="Convert HTML files to PNG or JPG images directly in your browser. No file is ever uploaded to a server." />
        <meta name="twitter:image" content="https://ogtechnologies.co/og-og-image.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'HTML to Image Converter',
            url: 'https://ogtechnologies.co/tools/html-to-image',
            description: 'Convert HTML files to PNG or JPG images directly in your browser. No file is ever uploaded to a server.',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            creator: {
              '@type': 'Organization',
              name: 'OG Technologies EU',
              url: 'https://ogtechnologies.co/',
            },
          })}
        </script>
      </Helmet>

      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">
        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1">HTML to PNG / JPG</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Upload an HTML file and download it as an image. Conversion happens entirely in your browser; no file is sent to a server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Upload area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? 'border-purple-500 bg-purple-500 bg-opacity-10'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".html,.htm"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {htmlContent ? (
                    <p className="text-gray-300">
                      <span className="font-semibold text-purple-400">{fileName}.html</span> loaded. Click or drag to replace it.
                    </p>
                  ) : (
                    <p className="text-gray-400">
                      Drag your <span className="text-gray-200 font-semibold">.html</span> file here, or click to select it
                    </p>
                  )}
                </div>

                {/* Options + preview */}
                {htmlContent && (
                  <div className="mt-8">
                    {/* Options */}
                    <div className="flex flex-wrap items-end gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Format</label>
                        <div className="flex rounded-md overflow-hidden border border-gray-600">
                          <button
                            className={`px-4 py-2 text-sm font-medium ${format === 'png' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                            onClick={() => setFormat('png')}
                          >
                            PNG
                          </button>
                          <button
                            className={`px-4 py-2 text-sm font-medium ${format === 'jpg' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                            onClick={() => setFormat('jpg')}
                          >
                            JPG
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Scale</label>
                        <div className="flex rounded-md overflow-hidden border border-gray-600">
                          {[1, 2, 3].map((s) => (
                            <button
                              key={s}
                              className={`px-4 py-2 text-sm font-medium ${scale === s ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                              onClick={() => setScale(s)}
                            >
                              {s}x
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 ml-auto">
                        <button
                          className="btn-sm text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-md px-4 py-2"
                          onClick={handleReset}
                        >
                          Clear
                        </button>
                        <button
                          className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 disabled:opacity-50"
                          onClick={handleConvert}
                          disabled={isConverting}
                        >
                          {isConverting ? 'Converting...' : `Download ${format.toUpperCase()}`}
                        </button>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="border border-gray-700 rounded-lg overflow-hidden bg-white">
                      <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                        Preview
                      </div>
                      <iframe
                        ref={iframeRef}
                        title="HTML preview"
                        sandbox="allow-same-origin allow-scripts"
                        srcDoc={htmlContent}
                        onLoad={() => setIframeLoaded(true)}
                        className="w-full bg-white"
                        style={{ height: '500px', border: 'none' }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      Note: the file's JavaScript runs inside a sandbox so diagrams and dynamic content like Mermaid render properly. Conversion waits a few seconds for rendering to finish. External resources (images, fonts, CSS) may be omitted if the origin server does not allow CORS. Only upload HTML files from trusted sources.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}

export default HtmlToImage;
