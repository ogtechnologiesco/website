import { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './useAuth';
import { subscriptionAPI, paymentAPI } from '../services/api';
import useApi from './useApi';

// Cache for subscription plans to prevent duplicate API calls
let cachedPlans = null;
let plansPromise = null;

export const useSubscription = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get subscription plans with caching
  const { 
    data: plans, 
    loading: plansLoading, 
    error: plansError,
    refetch: refetchPlans 
  } = useApi('/api/subscriptions/plans?activeOnly=true', {
    immediate: isAuthenticated && !cachedPlans, // Only fetch if authenticated and not cached
    dependencies: [] // No dependencies to prevent refetch loops
  });

  // Cache plans when data arrives
  useEffect(() => {
    if (plans && !cachedPlans) {
      cachedPlans = plans;
    }
  }, [plans]);

  // Get user subscriptions with stable reference to prevent re-fetches
  const actualUser = user?.user || user;
  const currentUserId = actualUser?._id || actualUser?.id;
  
  // Use ref to maintain stable userId across renders
  const userIdRef = useRef(currentUserId);
  const hasFetchedRef = useRef(false);
  
  // Only update ref when userId actually changes
  useEffect(() => {
    if (currentUserId && currentUserId !== userIdRef.current) {
      userIdRef.current = currentUserId;
      hasFetchedRef.current = false; // Reset fetch flag when user changes
    }
  }, [currentUserId]);
  
  const shouldFetch = isAuthenticated && userIdRef.current && !hasFetchedRef.current;
  
  const { 
    data: userSubscriptions, 
    loading: subscriptionsLoading, 
    error: subscriptionsError,
    refetch: refetchSubscriptions 
  } = useApi(userIdRef.current ? `/api/subscriptions/user/${userIdRef.current}` : null, {
    immediate: shouldFetch
  });
  
  // Mark as fetched when data arrives
  useEffect(() => {
    if (userSubscriptions && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
    }
  }, [userSubscriptions]);

  // Handle different response formats (direct array or nested)
  const subscriptionsArray = Array.isArray(userSubscriptions) 
    ? userSubscriptions 
    : userSubscriptions?.subscriptions || userSubscriptions?.data || [];

  // Get current active subscription with case-insensitive status check
  const activeStatuses = ['active', 'Active', 'ACTIVE', 'paid', 'success'];
  const activeSubscription = subscriptionsArray.find(sub => 
    activeStatuses.includes(sub.status) || 
    sub.status?.toLowerCase() === 'active'
  ) || null;

  // Create subscription
  const createSubscription = useCallback(async (planId, billingCycle = 'monthly') => {
    if (!isAuthenticated || !actualUser || !userId) {
      return { success: false, error: 'User not authenticated or user data incomplete' };
    }

    setLoading(true);
    setError(null);

    try {
      const subscriptionData = {
        userId: userId,
        planId,
        billingCycle,
        trialStartDate: new Date().toISOString(),
        // Calculate trial end date (14 days from now)
        trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      };

      const subscription = await subscriptionAPI.createSubscription(subscriptionData);
      await refetchSubscriptions();
      
      return { success: true, subscription };
    } catch (error) {
      const errorMessage = error.message || 'Failed to create subscription';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, actualUser, refetchSubscriptions]);

  // Update subscription
  const updateSubscription = useCallback(async (subscriptionId, updateData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedSubscription = await subscriptionAPI.updateSubscription(subscriptionId, updateData);
      await refetchSubscriptions();
      
      return { success: true, subscription: updatedSubscription };
    } catch (error) {
      const errorMessage = error.message || 'Failed to update subscription';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [refetchSubscriptions]);

  // Cancel subscription
  const cancelSubscription = useCallback(async (subscriptionId) => {
    setLoading(true);
    setError(null);

    try {
      await subscriptionAPI.cancelSubscription(subscriptionId);
      await refetchSubscriptions();
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Failed to cancel subscription';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [refetchSubscriptions]);

  // Get plan by ID
  const getPlanById = useCallback((planId) => {
    if (!plans) return null;
    return plans.find(plan => plan._id === planId) || null;
  }, [plans]);

  // Check if user has active subscription
  const hasActiveSubscription = useCallback(() => {
    return !!activeSubscription;
  }, [activeSubscription]);

  // Check if user can subscribe to a plan
  const canSubscribeToPlan = useCallback((planId) => {
    if (!isAuthenticated || !user) return false;
    
    // Check if user already has an active subscription
    if (hasActiveSubscription()) {
      // Allow upgrading/downgrading but not duplicate subscriptions
      return true;
    }
    
    return true;
  }, [isAuthenticated, user, hasActiveSubscription]);

  // Calculate subscription savings for yearly billing
  const calculateYearlySavings = useCallback((plan) => {
    if (!plan || !plan.price) return 0;
    
    const monthlyTotal = plan.price * 12;
    const yearlyPrice = plan.price * 10; // Assuming 2 months free for yearly
    
    return monthlyTotal - yearlyPrice;
  }, []);

  return {
    // Data
    plans,
    userSubscriptions,
    activeSubscription,
    hasActiveSubscription,
    
    // Loading states
    loading: loading || plansLoading || subscriptionsLoading,
    plansLoading,
    subscriptionsLoading,
    
    // Error states
    error: error || plansError || subscriptionsError,
    plansError,
    subscriptionsError,
    
    // Actions
    createSubscription,
    updateSubscription,
    cancelSubscription,
    refetchPlans,
    refetchSubscriptions,
    
    // Utilities
    getPlanById,
    canSubscribeToPlan,
    calculateYearlySavings
  };
};

// Hook for payment operations
export const usePayment = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create payment intent
  const createPaymentIntent = useCallback(async (paymentData) => {
    if (!isAuthenticated || !user || !user._id) {
      return { success: false, error: 'User not authenticated or user data incomplete' };
    }

    setLoading(true);
    setError(null);

    try {
      const paymentIntentData = {
        userId: user._id,
        ...paymentData
      };

      const response = await paymentAPI.createPaymentIntent(paymentIntentData);
      
      return { success: true, paymentIntent: response.paymentIntent, payment: response.payment };
    } catch (error) {
      const errorMessage = error.message || 'Failed to create payment intent';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  // Confirm payment
  const confirmPayment = useCallback(async (confirmationData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await paymentAPI.confirmPayment(confirmationData);
      
      return { success: true, payment: result };
    } catch (error) {
      const errorMessage = error.message || 'Failed to confirm payment';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle payment failure
  const handlePaymentFailure = useCallback(async (failureData) => {
    setLoading(true);
    setError(null);

    try {
      await paymentAPI.handlePaymentFailure(failureData);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Failed to handle payment failure';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Process refund
  const processRefund = useCallback(async (paymentId, refundData) => {
    setLoading(true);
    setError(null);

    try {
      const refund = await paymentAPI.processRefund(paymentId, refundData);
      
      return { success: true, refund };
    } catch (error) {
      const errorMessage = error.message || 'Failed to process refund';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createPaymentIntent,
    confirmPayment,
    handlePaymentFailure,
    processRefund
  };
};

export default useSubscription;
