import { useEffect, useState } from 'react';
import { COOKIE_CONSENT_EVENT, getCurrentPreferences } from '../components/shared/cookieUtils';

export function useMarketingConsent() {
  const [consented, setConsented] = useState(() => getCurrentPreferences().marketing === true);

  useEffect(() => {
    const onConsentChange = (event) => setConsented(event.detail?.marketing === true);
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentChange);
  }, []);

  return consented;
}
