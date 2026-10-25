import React, { useEffect, useState } from 'react';

function getShareTarget() {
  const canonical = document.querySelector('link[rel="canonical"]');
  return {
    url: canonical?.href || window.location.href,
    title: document.title,
  };
}

export default function ShareButtons({ className = '' }) {
  const [links, setLinks] = useState(null);
  const [copied, setCopied] = useState(false);

  // Compute share URLs post-mount so the Helmet-managed canonical link is in the DOM
  useEffect(() => {
    const { url, title } = getShareTarget();
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(title);
    setLinks({
      url,
      x: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      email: `mailto:?subject=${t}&body=${u}`,
    });
  }, []);

  const openPopup = (href) => {
    window.open(href, '_blank', 'noopener,noreferrer,width=600,height=540');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(links?.url || getShareTarget().url);
    } catch {
      const el = document.createElement('textarea');
      el.value = links?.url || getShareTarget().url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnClass =
    'w-9 h-9 inline-flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white transition-colors duration-150';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm text-gray-400 font-medium">Share:</span>
      {links ? (
        <>
          <button type="button" className={btnClass} aria-label="Share on X" onClick={() => openPopup(links.x)}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </button>
          <button type="button" className={btnClass} aria-label="Share on LinkedIn" onClick={() => openPopup(links.linkedin)}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
          <button type="button" className={btnClass} aria-label="Share on Facebook" onClick={() => openPopup(links.facebook)}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <a className={btnClass} aria-label="Share by email" href={links.email}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
          <button type="button" className={btnClass} aria-label="Copy link" onClick={copyLink}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </svg>
          </button>
          {copied && <span className="text-sm text-green-400">Link copied!</span>}
        </>
      ) : (
        <span className="text-sm text-gray-500">…</span>
      )}
    </div>
  );
}
