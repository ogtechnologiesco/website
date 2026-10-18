import React, { useEffect, useRef } from 'react';
import { useMarketingConsent } from '../hooks/useMarketingConsent';

const AD_CLIENT = 'ca-pub-6055710326096481';
const DISPLAY_SLOT = '4791854686';
const IN_FEED_SLOT = '3185013564';
const IN_FEED_LAYOUT_KEY = '-6t+ed+2i-1n-4w';
const IN_ARTICLE_SLOT = '9106679222';

export function AdSlot({ slot = DISPLAY_SLOT, format = 'auto', layout, layoutKey, className = '' }) {
  const consented = useMarketingConsent();
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!consented || pushedRef.current) return;
    pushedRef.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      pushedRef.current = false;
    }
  }, [consented]);

  if (!consented) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle block"
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={!layout && !layoutKey ? 'true' : undefined}
      />
    </div>
  );
}

export function InFeedAd({ className = '' }) {
  return (
    <AdSlot
      slot={IN_FEED_SLOT}
      format="fluid"
      layoutKey={IN_FEED_LAYOUT_KEY}
      className={className}
    />
  );
}

export function InArticleAd({ className = '' }) {
  return (
    <AdSlot
      slot={IN_ARTICLE_SLOT}
      format="fluid"
      layout="in-article"
      className={`text-center ${className}`.trim()}
    />
  );
}
