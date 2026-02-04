import React, { useState, useEffect } from 'react';

// Simple SVG icon components
const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Settings = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const BarChart3 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Zap = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Target = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allConsent));
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const consentWithTimestamp = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentWithTimestamp));
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handlePreferenceChange = (category) => {
    if (category !== 'necessary') {
      setPreferences(prev => ({
        ...prev,
        [category]: !prev[category]
      }));
    }
  };

  if (!isVisible) return null;

  const cookieCategories = [
    {
      id: 'necessary',
      icon: Shield,
      title: 'Strictly Necessary Cookies',
      description: 'Essential for the website to function properly. These cannot be disabled.',
      required: true
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website to improve performance.',
      required: false
    },
    {
      id: 'functional',
      icon: Zap,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization features.',
      required: false
    },
    {
      id: 'marketing',
      icon: Target,
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track marketing effectiveness.',
      required: false
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 shadow-2xl">
      <div className="max-w-6xl mx-auto p-6">
        {!showCustomize ? (
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                Privacy & Cookie Preferences
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                We use cookies to enhance your experience, analyze site performance, and support our marketing efforts. 
                Your privacy matters, and you can withdraw consent at any time.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </a>
                <a href="/cookie-policy" className="text-blue-400 hover:text-blue-300 underline">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 min-w-0">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center whitespace-nowrap"
              >
                Accept all
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors text-center whitespace-nowrap"
              >
                Reject non-essential
              </button>
              <button
                onClick={() => setShowCustomize(true)}
                className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors text-center whitespace-nowrap flex items-center justify-center gap-2"
                title="Customize cookie settings by category"
              >
                <Settings className="w-4 h-4" />
                Customize
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Customize Cookie Preferences
              </h3>
              <button
                onClick={() => setShowCustomize(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm text-gray-300">
              <p className="mb-4">
                We respect your privacy and use cookies only to enhance your experience. 
                Choose which categories you'd like to enable:
              </p>
              
              <div className="space-y-4">
                {cookieCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg"
                    >
                      <Icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{category.title}</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences[category.id]}
                              onChange={() => handlePreferenceChange(category.id)}
                              disabled={category.required}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer transition-colors ${
                              category.required 
                                ? 'bg-gray-600' 
                                : preferences[category.id] 
                                  ? 'bg-blue-600' 
                                  : 'bg-gray-700'
                            } peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 peer-focus:ring-offset-gray-900`}>
                              <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                                preferences[category.id] ? 'translate-x-5' : 'translate-x-0'
                              }`}></div>
                            </div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-400">{category.description}</p>
                        {category.required && (
                          <p className="text-xs text-blue-400 mt-1">Always required</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-800 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-white mb-2">Why this matters</h4>
                <p className="text-sm text-gray-400">
                  Your consent choices are stored locally and can be updated at any time. 
                  We only process data according to your preferences and applicable EU regulations.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
              <button
                onClick={handleSavePreferences}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save preferences
              </button>
              <button
                onClick={() => setShowCustomize(false)}
                className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
