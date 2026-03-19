import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import ProtectedRoute from '../components/ProtectedRoute';

function Dashboard() {
  const navigate = useNavigate();
  const { user, getDisplayName, hasActiveSubscription, isOnTrial, getCompany } = useAuth();
  const { activeSubscription, plans, loading: subscriptionLoading } = useSubscription();
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate recent activity data
    setRecentActivity([
      { type: 'login', message: 'Logged in successfully', time: '2 hours ago' },
      { type: 'profile_update', message: 'Profile updated', time: '1 day ago' },
      { type: 'subscription', message: 'Subscription activated', time: '3 days ago' }
    ]);
  }, []);

  const getSubscriptionStatus = () => {
    if (hasActiveSubscription()) {
      return { status: 'Active', color: 'text-green-400', icon: '✓' };
    } else if (isOnTrial()) {
      return { status: 'Trial', color: 'text-yellow-400', icon: '⏱' };
    } else {
      return { status: 'Free', color: 'text-gray-400', icon: '○' };
    }
  };

  const subscriptionStatus = getSubscriptionStatus();

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        
        <main className="grow">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-20 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>

          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                
                {/* Welcome Section */}
                <div className="text-center pb-12 md:pb-20">
                  <h1 className="h1 mb-4">
                    Welcome back, {getDisplayName()}!
                  </h1>
                  <p className="text-xl text-gray-400">
                    Manage your account and explore our services
                  </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  
                  {/* Profile Card */}
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {getDisplayName().charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">Profile</h3>
                        <p className="text-gray-400 text-sm">{user?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="text-gray-500">Company:</span> {getCompany()?.name || 'Not set'}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">Member since:</span> {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                    <Link 
                      to="/settings"
                      className="mt-4 block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                    >
                      Edit Profile
                    </Link>
                  </div>

                  {/* Subscription Card */}
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {subscriptionStatus.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">Subscription</h3>
                        <p className={`text-sm ${subscriptionStatus.color}`}>{subscriptionStatus.status}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="text-gray-500">Plan:</span> {activeSubscription?.plan?.name || 'Free Plan'}
                      </p>
                      {activeSubscription && (
                        <p className="text-gray-300">
                          <span className="text-gray-500">Next billing:</span> {new Date(activeSubscription.nextBillingDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Link 
                      to="/settings"
                      className="mt-4 block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                    >
                      Manage Subscription
                    </Link>
                  </div>

                  {/* Quick Actions Card */}
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        ⚡
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                        <p className="text-gray-400 text-sm">Get started</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Link 
                        to="/standards"
                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                      >
                        Explore Standards
                      </Link>
                      <Link 
                        to="/products"
                        className="block w-full text-center bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                      >
                        View Products
                      </Link>
                      <Link 
                        to="/quote"
                        className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                          <p className="text-gray-300">{activity.message}</p>
                        </div>
                        <span className="text-gray-500 text-sm">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;
