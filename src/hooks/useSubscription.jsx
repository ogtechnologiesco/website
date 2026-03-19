import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { subscriptionAPI, paymentAPI } from '../services/api';
import useApi from './useApi';

export const useSubscription = () => {
  const { user, isAuthenticated, hasActiveSubscription } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get subscription plans
  const { 
    data: plans, 
    loading: plansLoading, 
    error: plansError,
    refetch: refetchPlans 
  } = useApi('/api/subscriptions/plans?activeOnly=true', {
    immediate: isAuthenticated
  });

  // Get user subscriptions
  const { 
    data: userSubscriptions, 
    loading: subscriptionsLoading, 
    error: subscriptionsError,
    refetch: refetchSubscriptions 
  } = useApi(user && user._id ? `/api/subscriptions/user/${user._id}` : null, {
    immediate: isAuthenticated && user && user._id
  });

  // Get current active subscription
  const activeSubscription = userSubscriptions?.find(sub => sub.status === 'active') || null;

  // Create subscription
  const createSubscription = useCallback(async (planId, billingCycle = 'monthly') => {
    if (!isAuthenticated || !user || !user._id) {
      return { success: false, error: 'User not authenticated or user data incomplete' };
    }

    setLoading(true);
    setError(null);

    try {
      const subscriptionData = {
        userId: user._id,
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
  }, [isAuthenticated, user, refetchSubscriptions]);

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
