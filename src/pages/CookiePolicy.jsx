import React from 'react';

// Simple SVG icon components
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

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Lock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CookiePolicy = () => {
  const cookieCategories = [
    {
      icon: Shield,
      title: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function properly and cannot be disabled.',
      examples: ['Authentication tokens', 'Security settings', 'Load balancing'],
      retention: 'Session to 1 year'
    },
    {
      icon: BarChart3,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website to improve performance and user experience.',
      examples: ['Page views', 'Time on site', 'Bounce rates', 'Geographic data'],
      retention: '2 years'
    },
    {
      icon: Zap,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization features beyond what is strictly necessary.',
      examples: ['Language preferences', 'Theme settings', 'Custom features'],
      retention: '1 year'
    },
    {
      icon: Target,
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track marketing campaign effectiveness.',
      examples: ['Ad personalization', 'Campaign tracking', 'Cross-site behavior'],
      retention: '2 years'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">Cookie Policy</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">
                Cookies are small text files stored on your device when you visit websites. They help us provide 
                better experiences by remembering your preferences and understanding how you use our services.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                As an EU-based company, we comply with the General Data Protection Regulation (GDPR) and the 
                ePrivacy Directive. This means we only use cookies with your explicit consent, and you have 
                full control over which types of cookies you accept.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Cookie Categories We Use</h2>
            <div className="grid gap-6">
              {cookieCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600/20 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                        <p className="text-gray-300 mb-4">{category.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              Examples
                            </h4>
                            <ul className="text-sm text-gray-400 space-y-1">
                              {category.examples.map((example, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Retention Period
                            </h4>
                            <p className="text-sm text-gray-400">{category.retention}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights and Choices</h2>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white mb-1">Full Control</h3>
                    <p className="text-gray-300 text-sm">
                      You can accept, reject, or customize cookie preferences at any time through our consent banner.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white mb-1">Withdraw Consent</h3>
                    <p className="text-gray-300 text-sm">
                      Consent can be withdrawn at any time. Changes take effect immediately for future visits.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white mb-1">Transparency</h3>
                    <p className="text-gray-300 text-sm">
                      We provide clear information about what each cookie category does and how long data is retained.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Managing Cookies</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">
                You can manage your cookie preferences in several ways:
              </p>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li>Through our cookie consent banner when you first visit the site</li>
                <li>By adjusting your browser settings to block or delete cookies</li>
                <li>Through the cookie settings panel available in your account preferences</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Note that blocking strictly necessary cookies may affect website functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">
                We may use third-party services that place their own cookies. These include:
              </p>
              <ul className="text-gray-300 space-y-2 mt-4">
                <li>Analytics providers (e.g., Google Analytics)</li>
                <li>Marketing platforms (e.g., LinkedIn, Google Ads)</li>
                <li>Content delivery networks</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Each third-party service has its own privacy policy and cookie practices. 
                We encourage you to review these policies for detailed information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">
                If you have questions about our Cookie Policy or how we handle your data, please contact us:
              </p>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-4">
                <p className="text-gray-300">
                  E-mail: hi@ogtechnologies.co<br />
                  Address: Widerhofergasse 6 / 12, 1090 Vienna, Austria<br />
                </p>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              This policy is part of our commitment to transparency and compliance with EU data protection laws. 
              We may update this policy periodically to reflect changes in our practices or legal requirements.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
