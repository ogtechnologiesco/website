import { paymentAPI } from './api';

// Create Stripe checkout session for Pro subscription
export const createCheckoutSession = async (userId, planId) => {
  try {
    console.log('stripeService: Creating checkout session', { 
      userId, 
      planId,
      successUrl: `${window.location.origin}/payment/success`,
      cancelUrl: `${window.location.origin}/payment/cancel`
    });
    
    const response = await paymentAPI.createCheckoutSession({
      userId,
      planId,
      successUrl: `${window.location.origin}/payment/success`,
      cancelUrl: `${window.location.origin}/payment/cancel`
    });

    console.log('stripeService: API response:', response);
    return response;
  } catch (error) {
    console.error('stripeService: Error creating checkout session:', error);
    console.error('stripeService: Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// Create billing portal session for managing subscription
export const createBillingPortalSession = async (userId) => {
  try {
    const response = await paymentAPI.createBillingPortal({
      userId,
      returnUrl: `${window.location.origin}/settings`
    });

    return response;
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    throw error;
  }
};

// Cancel subscription
export const cancelSubscription = async (subscriptionId) => {
  try {
    const response = await paymentAPI.cancelSubscription(subscriptionId);

    return response;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

// Get user subscription status
export const getUserSubscription = async (userId) => {
  try {
    const response = await paymentAPI.getUserPayments(userId);
    return response;
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    throw error;
  }
};
