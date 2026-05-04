import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { subscriptionAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useAdminProActivation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated, isAdmin } = useAuth();

  const activateProSubscription = async (targetUserId = null, force = false) => {
    if (!isAuthenticated || !user) {
      toast.error('Please sign in to perform admin actions');
      return { success: false, error: 'Authentication required' };
    }

    if (!isAdmin()) {
      toast.error('Admin access required for this action');
      return { success: false, error: 'Admin access required' };
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use target user ID if provided, otherwise use current user
      const actualUser = user.user || user;
      const userId = targetUserId || actualUser?._id || actualUser?.id;
      
      if (!userId) {
        throw new Error('User ID not found');
      }

      // Debug user object and ID format
      console.log('User object structure:', actualUser);
      console.log('Extracted user ID:', userId);
      console.log('User ID type:', typeof userId);
      console.log('Activating Pro subscription for user:', userId, { force });
      
      const response = await subscriptionAPI.setProSubscription({ userId, force });
      console.log('Pro activation response:', response);

      if (force) {
        toast.success('Pro subscription force updated by admin!');
      } else {
        toast.success('Pro subscription activated successfully!');
      }
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to activate Pro subscription';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const deactivateProSubscription = async (targetUserId = null) => {
    if (!isAuthenticated || !user) {
      toast.error('Please sign in to perform admin actions');
      return { success: false, error: 'Authentication required' };
    }

    if (!isAdmin()) {
      toast.error('Admin access required for this action');
      return { success: false, error: 'Admin access required' };
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use target user ID if provided, otherwise use current user
      const userId = targetUserId || (user.user?._id || user._id || user.id);
      
      if (!userId) {
        throw new Error('User ID not found');
      }

      console.log('Removing Pro subscription for user:', userId);
      
      const response = await subscriptionAPI.removeProSubscription(userId);
      console.log('Pro deactivation response:', response);

      toast.success('Pro subscription removed successfully!');
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to remove Pro subscription';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Get current user ID for easy access
  const getCurrentUserId = () => {
    const actualUser = user.user || user;
    return actualUser?._id || actualUser?.id;
  };

  return {
    isLoading,
    error,
    activateProSubscription,
    deactivateProSubscription,
    clearError,
    getCurrentUserId,
    currentUser: user,
    isAdmin: isAdmin()
  };
};
