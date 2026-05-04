import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';
import { useStripePayment } from '../hooks/useStripePayment';

function Pricing() {
  const { isLoading, error, startProSubscription, clearError } = useStripePayment();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      
      <main className="grow">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-20 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              
              {/* Page Header */}
              <div className="text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Simple, Transparent Pricing</h1>
                <p className="text-xl text-gray-400 mb-8">
                  Choose the perfect plan for your business needs
                </p>
                <div className="max-w-3xl mx-auto">
                  <p className="text-lg text-gray-300">
                    Our CRM and Ticketing System scales with your business. Start free and upgrade as you grow.
                  </p>
                </div>
              </div>

              {/* Payment Error Alert */}
              {error && (
                <div className="max-w-3xl mx-auto mb-8">
                  <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-center justify-between">
                    <span>{error}</span>
                    <button
                      onClick={clearError}
                      className="text-red-300 hover:text-red-100 ml-4"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Pricing Cards */}
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  
                  {/* Free Plan */}
                  <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 relative">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                      <p className="text-gray-400 mb-4">Perfect for individuals</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-white">€0</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      <Link 
                        to="/signup"
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out inline-block"
                      >
                        Get Started Free
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-4">What's included:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Up to 100 contacts</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Basic ticket management</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Email support</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Basic reporting</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Mobile app access</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-500 mr-3 mt-1">✗</span>
                          <span className="text-gray-500">Advanced automation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-500 mr-3 mt-1">✗</span>
                          <span className="text-gray-500">Custom integrations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-500 mr-3 mt-1">✗</span>
                          <span className="text-gray-500">Priority support</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Pro Plan */}
                  <div className="bg-gradient-to-b from-purple-900/50 to-gray-800 rounded-lg p-8 border-2 border-purple-600 relative transform scale-105">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        MOST POPULAR
                      </span>
                    </div>
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                      <p className="text-gray-400 mb-4">For growing businesses</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-white">€8</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      <button
                        onClick={startProSubscription}
                        disabled={isLoading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Processing...' : 'Start Pro Trial'}
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-4">Everything in Free, plus:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Unlimited contacts</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Advanced ticketing system</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Priority email & chat support</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Advanced analytics & reporting</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Workflow automation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Custom fields & tags</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">API access</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Team collaboration tools</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Custom dashboards</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Enterprise Plan */}
                  <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 relative">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                      <p className="text-gray-400 mb-4">For large organizations</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-white">Custom</span>
                      </div>
                      <Link 
                        to="/quote"
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out inline-block"
                      >
                        Contact Sales
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-4">Everything in Pro, plus:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Unlimited everything</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Dedicated account manager</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">24/7 phone support</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Custom integrations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Advanced security features</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">SLA guarantee</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Custom training & onboarding</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">White-label options</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">Custom development</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

              {/* Feature Comparison */}
              <div className="max-w-5xl mx-auto mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">Compare Features</h2>
                  <p className="text-gray-400">See exactly what you get with each plan</p>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left p-4 text-gray-400">Feature</th>
                          <th className="text-center p-4 text-gray-400">Free</th>
                          <th className="text-center p-4 text-purple-400">Pro</th>
                          <th className="text-center p-4 text-gray-400">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-700">
                          <td className="p-4 text-gray-300">Contact Management</td>
                          <td className="p-4 text-center">100 contacts</td>
                          <td className="p-4 text-center text-green-400">Unlimited</td>
                          <td className="p-4 text-center text-green-400">Unlimited</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-4 text-gray-300">Ticket Management</td>
                          <td className="p-4 text-center text-green-400">Basic</td>
                          <td className="p-4 text-center text-green-400">Advanced</td>
                          <td className="p-4 text-center text-green-400">Premium</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-4 text-gray-300">Support</td>
                          <td className="p-4 text-center text-yellow-400">Email</td>
                          <td className="p-4 text-center text-green-400">Priority</td>
                          <td className="p-4 text-center text-green-400">24/7 Phone</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-4 text-gray-300">Analytics</td>
                          <td className="p-4 text-center text-green-400">Basic</td>
                          <td className="p-4 text-center text-green-400">Advanced</td>
                          <td className="p-4 text-center text-green-400">Custom</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-4 text-gray-300">Automation</td>
                          <td className="p-4 text-center text-red-400">—</td>
                          <td className="p-4 text-center text-green-400">Workflows</td>
                          <td className="p-4 text-center text-green-400">Advanced</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="p-4 text-gray-300">API Access</td>
                          <td className="p-4 text-center text-red-400">—</td>
                          <td className="p-4 text-center text-green-400">Standard</td>
                          <td className="p-4 text-center text-green-400">Advanced</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-gray-300">Custom Integrations</td>
                          <td className="p-4 text-center text-red-400">—</td>
                          <td className="p-4 text-center text-red-400">—</td>
                          <td className="p-4 text-center text-green-400">Included</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="max-w-3xl mx-auto mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                  <p className="text-gray-400">Common questions about our pricing</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Can I change plans anytime?</h3>
                    <p className="text-gray-300">Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.</p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Is there a free trial for paid plans?</h3>
                    <p className="text-gray-300">Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start.</p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">What payment methods do you accept?</h3>
                    <p className="text-gray-300">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Can I cancel my subscription?</h3>
                    <p className="text-gray-300">Absolutely. You can cancel your subscription at any time with no cancellation fees.</p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
                  <p className="text-gray-200 mb-6">
                    Join thousands of businesses using our CRM system to streamline their operations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      to="/signup"
                      className="bg-white text-purple-600 hover:bg-gray-100 py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out"
                    >
                      Start Free Trial
                    </Link>
                    <Link 
                      to="/quote"
                      className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out"
                    >
                      Schedule Demo
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Pricing;
