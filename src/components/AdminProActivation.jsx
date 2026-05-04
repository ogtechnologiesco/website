import React, { useState } from 'react';
import { useAdminProActivation } from '../hooks/useAdminProActivation';
import { useSubscription } from '../hooks/useSubscription';

const AdminProActivation = () => {
  const { 
    isLoading, 
    error, 
    activateProSubscription, 
    deactivateProSubscription, 
    clearError,
    getCurrentUserId,
    isAdmin
  } = useAdminProActivation();
  
  const { activeSubscription } = useSubscription();
  
  const [targetUserId, setTargetUserId] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleActivatePro = async () => {
    const userId = showAdvanced ? targetUserId : null;
    await activateProSubscription(userId, activeSubscription ? true : false); // Force override if subscription exists
  };

  const handleDeactivatePro = async () => {
    const userId = showAdvanced ? targetUserId : null;
    await deactivateProSubscription(userId);
  };

  const currentUserId = getCurrentUserId();

  // Show access denied message for non-admin users
  if (!isAdmin) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Admin: Pro Subscription Control</h3>
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Access Denied</span>
        </div>
        
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <h4 className="text-red-300 font-semibold">Admin Access Required</h4>
          </div>
          <p className="text-red-200 text-sm">
            This feature is restricted to administrators only. You need admin privileges to manually activate Pro subscriptions.
          </p>
          <p className="text-red-300 text-xs mt-2">
            Contact your system administrator if you need access to this feature.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Admin: Pro Subscription Control</h3>
        <div className="flex items-center gap-2">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Admin Access</span>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            {showAdvanced ? 'Simple Mode' : 'Advanced Mode'}
          </button>
        </div>
      </div>

      {/* Show current subscription status */}
      {activeSubscription && (
        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-green-300 font-semibold">Current Subscription Status</h4>
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-green-200">
              <span className="text-green-400">Plan:</span> {activeSubscription.plan?.name || 'Pro'}
            </p>
            <p className="text-green-200">
              <span className="text-green-400">Status:</span> {activeSubscription.status}
            </p>
            <p className="text-green-200">
              <span className="text-green-400">Billing Cycle:</span> {activeSubscription.billingCycle || 'Monthly'}
            </p>
            {activeSubscription.nextBillingDate && (
              <p className="text-green-200">
                <span className="text-green-400">Next Billing:</span> {new Date(activeSubscription.nextBillingDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-red-300 hover:text-red-100"
          >
            ×
          </button>
        </div>
      )}

      {showAdvanced ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target User ID (MongoDB ObjectId)
            </label>
            <input
              type="text"
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              placeholder="Enter user ID (e.g., 507f1f77bcf86cd799439011)"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Leave empty to use current user ID: {currentUserId}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
          <p className="text-gray-300 mb-2">
            <strong>Current User ID:</strong> {currentUserId}
          </p>
          <p className="text-sm text-gray-400">
            This will activate Pro subscription for your current account.
          </p>
        </div>
      )}

      <div className="flex gap-4">
        {activeSubscription ? (
          <>
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h.01M9 16h.01M16 16h-4.01M4 16h-6.938M12 16v4"></path>
                </svg>
                <h4 className="text-yellow-300 font-semibold">Existing Subscription Detected</h4>
              </div>
              <p className="text-yellow-200 text-sm mb-2">
                User already has an active Pro subscription. Admin override available.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleDeactivatePro}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Deactivating...' : 'Deactivate Pro'}
              </button>
              <button
                onClick={handleActivatePro}
                disabled={isLoading}
                className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md font-semibold transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating...' : 'Force Update Pro'}
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={handleActivatePro}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-semibold transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Activating...' : 'Activate Pro'}
          </button>
        )}
      </div>

      <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
        <p className="text-yellow-300 text-sm">
          <strong>Admin Only:</strong> This creates a manual Pro subscription without Stripe integration. 
          Use for testing, complimentary accounts, or admin purposes.
        </p>
      </div>
    </div>
  );
};

export default AdminProActivation;
