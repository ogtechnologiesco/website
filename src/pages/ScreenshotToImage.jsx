import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageIllustration from '../partials/PageIllustration';

const MIME_TO_EXT = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
};

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function timestampName(ext) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `screenshot-${stamp}.${ext}`;
}

function ScreenshotToImage() {
  const [image, setImage] = useState(null);
  const [meta, setMeta] = useState(null);
  const objectUrlRef = useRef(null);

  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform || navigator.userAgent);
  const shortcut = isMac ? '⌘ + V' : 'Ctrl + V';

  const revokeCurrent = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  const handlePaste = useCallback((e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    const imageItem = Array.from(items).find((item) => item.type.startsWith('image/'));
    if (!imageItem) {
      toast.error('No image found in the clipboard');
      return;
    }
    const file = imageItem.getAsFile();
    if (!file) {
      toast.error('Could not read the image from the clipboard');
      return;
    }
    revokeCurrent();
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setImage({ file, url });

    const probe = new window.Image();
    probe.onload = () => {
      setMeta({
        width: probe.naturalWidth,
        height: probe.naturalHeight,
        type: file.type,
        size: file.size,
      });
    };
    probe.onerror = () => {
      setMeta({ width: null, height: null, type: file.type, size: file.size });
    };
    probe.src = url;
    toast.success('Image pasted successfully');
  }, [revokeCurrent]);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
      revokeCurrent();
    };
  }, [handlePaste, revokeCurrent]);

  const handleDownload = () => {
    if (!image) return;
    const ext = MIME_TO_EXT[image.file.type] || 'png';
    const link = document.createElement('a');
    link.download = timestampName(ext);
    link.href = image.url;
    link.click();
    toast.success('Image downloaded');
  };

  const handleReset = () => {
    revokeCurrent();
    setImage(null);
    setMeta(null);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Screenshot to Image - Paste & Download Clipboard Images | OG Technologies EU</title>
        <meta name="description" content="Paste a screenshot from your clipboard and download it as an image file. Free, private, and secure - everything happens locally in your browser." />
        <meta name="keywords" content="screenshot to image, paste screenshot, clipboard image download, save screenshot as file, browser tool, free tool" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ogtechnologies.co/tools/screenshot-to-image" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ogtechnologies.co/tools/screenshot-to-image" />
        <meta property="og:title" content="Screenshot to Image - Paste & Download Clipboard Images | OG Technologies EU" />
        <meta property="og:description" content="Paste a screenshot from your clipboard and download it as an image file. Everything happens locally in your browser." />
        <meta property="og:image" content="https://ogtechnologies.co/og-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ogtechnologies.co/tools/screenshot-to-image" />
        <meta name="twitter:title" content="Screenshot to Image - Paste & Download Clipboard Images | OG Technologies EU" />
        <meta name="twitter:description" content="Paste a screenshot from your clipboard and download it as an image file. Everything happens locally in your browser." />
        <meta name="twitter:image" content="https://ogtechnologies.co/og-og-image.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Screenshot to Image',
            url: 'https://ogtechnologies.co/tools/screenshot-to-image',
            description: 'Paste a screenshot from your clipboard and download it as an image file. Everything happens locally in your browser.',
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
                <h1 className="h1">Screenshot to Image</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste a screenshot from your clipboard and download it as an image file. Everything happens in your browser; nothing is sent to a server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Paste target area */}
                <div
                  className="border-2 border-dashed border-gray-600 hover:border-gray-400 rounded-lg p-10 text-center transition-colors"
                  tabIndex={0}
                >
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {image ? (
                    <p className="text-gray-300">
                      Image ready. Press <span className="font-semibold text-purple-400">{shortcut}</span> again to replace it.
                    </p>
                  ) : (
                    <p className="text-gray-400">
                      Copy a screenshot and press <span className="text-gray-200 font-semibold">{shortcut}</span> (or right-click → Paste) anywhere on this page
                    </p>
                  )}
                </div>

                {/* Preview + metadata */}
                {image && (
                  <div className="mt-8">
                    <div className="border border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 border-b border-gray-700 flex flex-wrap gap-x-6 gap-y-1">
                        <span>Preview</span>
                        {meta && (
                          <>
                            {meta.width && meta.height && (
                              <span>{meta.width} × {meta.height} px</span>
                            )}
                            <span>{meta.type}</span>
                            <span>{formatBytes(meta.size)}</span>
                          </>
                        )}
                      </div>
                      <div className="bg-gray-900 p-4 flex justify-center">
                        <img
                          src={image.url}
                          alt="Screenshot pasted from the clipboard"
                          className="max-w-full max-h-[500px] rounded"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 justify-end">
                      <button
                        className="btn-sm text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-md px-4 py-2"
                        onClick={handleReset}
                      >
                        Clear
                      </button>
                      <button
                        className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2"
                        onClick={handleDownload}
                      >
                        Download image
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      Note: the image is downloaded in the exact format the operating system delivers to the clipboard (usually PNG).
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

export default ScreenshotToImage;
