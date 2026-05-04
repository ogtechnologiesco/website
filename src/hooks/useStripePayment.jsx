import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createCheckoutSession } from '../services/stripeService';
import { subscriptionAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useStripePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();
  
  console.log('useStripePayment hook initialized', { user, isAuthenticated });

  // Function to get Pro plan ID from backend
  const getProPlanId = async () => {
    try {
      console.log('Fetching plans from API...');
      const response = await subscriptionAPI.getPlans(true); // Get active plans only
      console.log('API response for plans:', response);
      
      // Handle different response structures
      let plans = response;
      if (response && response.data) {
        plans = response.data;
      } else if (response && response.plans) {
        plans = response.plans;
      }
      
      console.log('Processed plans array:', plans);
      
      // Ensure plans is an array
      if (!Array.isArray(plans)) {
        console.error('Plans is not an array:', typeof plans, plans);
        return null;
      }
      
      // Find Pro plan by name, slug, or price (€8/month)
      const proPlan = plans.find(plan => 
        plan.name?.toLowerCase() === 'pro' || 
        plan.slug === 'pro' || 
        plan.price === 8 ||
        plan.name === 'Pro'
      );
      
      console.log('Found Pro plan:', proPlan);
      
      if (proPlan && proPlan._id) {
        console.log('Returning real Pro plan ID:', proPlan._id);
        return proPlan._id;
      }
      
      // Fallback: try to find by price
      const fallbackPlan = plans.find(plan => plan.price === 8);
      console.log('Fallback plan by price:', fallbackPlan);
      return fallbackPlan?._id || null;
    } catch (err) {
      console.error('Error fetching Pro plan:', err);
      return null;
    }
  };

  const startProSubscription = async () => {
    console.log('startProSubscription called', { isAuthenticated, user });
    
    if (!isAuthenticated || !user) {
      console.log('Authentication failed', { isAuthenticated, user });
      toast.error('Please sign in to start your Pro subscription');
      return { success: false, error: 'Authentication required' };
    }

    console.log('Authentication passed, starting payment process');
    setIsLoading(true);
    setError(null);

    try {
      // Get the real Pro plan ID from backend
      const proPlanId = await getProPlanId();
      
      if (!proPlanId) {
        throw new Error('Pro plan not found. Please contact support.');
      }
      
      const actualUser = user.user || user; // Handle nested user structure
      const userId = actualUser._id || actualUser.id; // Handle both MongoDB _id and generic id
      console.log('Creating checkout session', { userId, proPlanId, actualUser, user });
      const response = await createCheckoutSession(userId, proPlanId);
      console.log('Checkout session response:', response);
      
      if (response.url) {
        // Redirect to Stripe Checkout
        console.log('Redirecting to Stripe:', response.url);
        window.location.href = response.url;
        return { success: true };
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to start subscription';
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

  return {
    isLoading,
    error,
    startProSubscription,
    clearError
  };
};
