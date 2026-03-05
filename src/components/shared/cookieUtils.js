// Shared utility functions for cookie consent management

export const COOKIE_CONSENT_KEY = 'cookieConsent';

export const defaultCookiePreferences = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false
};

export const getStoredConsent = () => {
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent ? JSON.parse(consent) : null;
  } catch (error) {
    console.error('Error reading cookie consent:', error);
    return null;
  }
};

export const saveConsent = (preferences) => {
  try {
    const consentWithTimestamp = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentWithTimestamp));
    return true;
  } catch (error) {
    console.error('Error saving cookie consent:', error);
    return false;
  }
};

export const hasConsent = () => {
  return getStoredConsent() !== null;
};

export const getCurrentPreferences = () => {
  const stored = getStoredConsent();
  if (stored) {
    const { timestamp, ...preferences } = stored;
    return preferences;
  }
  return defaultCookiePreferences;
};
