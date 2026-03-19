import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import ProtectedRoute from '../components/ProtectedRoute';
import toast from 'react-hot-toast';

function Settings() {
  const navigate = useNavigate();
  const { user, getDisplayName, updateProfile, changePassword, logout } = useAuth();
  const { activeSubscription, plans, cancelSubscription } = useSubscription();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    companyName: user?.companyName || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const validateProfileForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 10) {
      errors.newPassword = 'Password must be at least 10 characters long';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) return;
    
    setLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setLoading(true);
    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (result.success) {
        toast.success('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(result.error || 'Failed to change password');
      }
    } catch (error) {
      toast.error('An error occurred while changing password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    
    setLoading(true);
    try {
      const result = await cancelSubscription(activeSubscription._id);
      if (result.success) {
        toast.success('Subscription cancelled successfully');
      } else {
        toast.error(result.error || 'Failed to cancel subscription');
      }
    } catch (error) {
      toast.error('An error occurred while cancelling subscription');
    } finally {
      setLoading(false);
    }
  };

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
                
                {/* Page Header */}
                <div className="text-center pb-12 md:pb-20">
                  <h1 className="h1 mb-4">Settings</h1>
                  <p className="text-xl text-gray-400">
                    Manage your account and preferences
                  </p>
                </div>

                {/* Settings Tabs */}
                <div className="max-w-4xl mx-auto">
                  <div className="border-b border-gray-700 mb-8">
                    <nav className="-mb-px flex space-x-8">
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'profile'
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
                        }`}
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => setActiveTab('security')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'security'
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
                        }`}
                      >
                        Security
                      </button>
                      <button
                        onClick={() => setActiveTab('subscription')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'subscription'
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
                        }`}
                      >
                        Subscription
                      </button>
                    </nav>
                  </div>

                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
                      <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="name">
                            Full Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className={`form-input w-full text-gray-300 ${formErrors.name ? 'border-red-500' : ''}`}
                            value={formData.name}
                            onChange={handleProfileChange}
                            disabled={loading}
                          />
                          {formErrors.name && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                            Email Address
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-input w-full text-gray-300 ${formErrors.email ? 'border-red-500' : ''}`}
                            value={formData.email}
                            onChange={handleProfileChange}
                            disabled={loading}
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="companyName">
                            Company Name
                          </label>
                          <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            className="form-input w-full text-gray-300"
                            value={formData.companyName}
                            onChange={handleProfileChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
                          >
                            {loading ? 'Updating...' : 'Update Profile'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === 'security' && (
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-6">Change Password</h3>
                      <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="currentPassword">
                            Current Password
                          </label>
                          <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            className={`form-input w-full text-gray-300 ${formErrors.currentPassword ? 'border-red-500' : ''}`}
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            disabled={loading}
                          />
                          {formErrors.currentPassword && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.currentPassword}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="newPassword">
                            New Password
                          </label>
                          <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            className={`form-input w-full text-gray-300 ${formErrors.newPassword ? 'border-red-500' : ''}`}
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            disabled={loading}
                          />
                          {formErrors.newPassword && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.newPassword}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="confirmPassword">
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={`form-input w-full text-gray-300 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            disabled={loading}
                          />
                          {formErrors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                          )}
                        </div>

                        <div className="flex justify-between">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
                          >
                            {loading ? 'Changing...' : 'Change Password'}
                          </button>
                        </div>
                      </form>

                      <div className="mt-8 pt-8 border-t border-gray-700">
                        <button
                          onClick={handleLogout}
                          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition duration-150 ease-in-out"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Subscription Tab */}
                  {activeTab === 'subscription' && (
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-6">Subscription Management</h3>
                      
                      {activeSubscription ? (
                        <div className="space-y-6">
                          <div className="bg-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-white font-semibold">{activeSubscription.plan?.name}</h4>
                                <p className="text-gray-400 text-sm">{activeSubscription.plan?.description}</p>
                              </div>
                              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                                Active
                              </span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p className="text-gray-300">
                                <span className="text-gray-500">Billing Cycle:</span> {activeSubscription.billingCycle}
                              </p>
                              <p className="text-gray-300">
                                <span className="text-gray-500">Next Billing:</span> {new Date(activeSubscription.nextBillingDate).toLocaleDateString()}
                              </p>
                              <p className="text-gray-300">
                                <span className="text-gray-500">Price:</span> ${activeSubscription.plan?.price}/{activeSubscription.billingCycle}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-4">
                            <Link
                              to="/standards"
                              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition duration-150 ease-in-out"
                            >
                              Upgrade Plan
                            </Link>
                            <button
                              onClick={handleCancelSubscription}
                              disabled={loading}
                              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
                            >
                              {loading ? 'Cancelling...' : 'Cancel Subscription'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-400 mb-6">You don't have an active subscription</p>
                          <Link
                            to="/standards"
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition duration-150 ease-in-out"
                          >
                            View Plans
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default Settings;
