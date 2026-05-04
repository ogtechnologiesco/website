import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

function PaymentCancel() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      
      <main className="grow">
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                  </div>
                  <h1 className="h1 mb-4">Payment Canceled</h1>
                  <p className="text-xl text-gray-400 mb-8">
                    Your payment process was canceled. No charges were made.
                  </p>
                  <div className="max-w-md mx-auto">
                    <p className="text-lg text-gray-300 mb-8">
                      You can try upgrading to Pro again anytime. Your account remains on the Free plan.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/pricing"
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out"
                  >
                    Back to Pricing
                  </Link>
                  <Link 
                    to="/dashboard"
                    className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out"
                  >
                    Go to Dashboard
                  </Link>
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

export default PaymentCancel;
