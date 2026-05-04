import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

function PaymentSuccess() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      
      <main className="grow">
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h1 className="h1 mb-4">Payment Successful!</h1>
                  <p className="text-xl text-gray-400 mb-8">
                    Welcome to the Pro plan! Your subscription is now active.
                  </p>
                  <div className="max-w-md mx-auto">
                    <p className="text-lg text-gray-300 mb-8">
                      You now have access to all Pro features including unlimited contacts, advanced ticketing, priority support, and more.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/dashboard"
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out"
                  >
                    Go to Dashboard
                  </Link>
                  <Link 
                    to="/settings"
                    className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out"
                  >
                    Manage Subscription
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

export default PaymentSuccess;
