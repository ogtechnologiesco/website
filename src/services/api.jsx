import axios from 'axios';

// Environment configuration
const API_BASE_URL = 'https://og-technologies.herokuapp.com/';

// Default headers
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: defaultHeaders,
  timeout: 15000, // 15 seconds timeout for Heroku cold starts
});

// Create public axios instance (no authentication)
const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: defaultHeaders,
  timeout: 15000,
});

// Add request retry logic for network errors
let retryCount = 0;
const MAX_RETRIES = 3;

// Response interceptor for retry logic
api.interceptors.response.use(
  (response) => {
    retryCount = 0; // Reset retry count on success
    return response;
  },
  async (error) => {
    const { config, code, message } = error;
    
    // Check if it's a timeout or network error
    const isNetworkError = code === 'ECONNABORTED' || 
                          code === 'ETIMEDOUT' || 
                          !error.response ||
                          message?.includes('timeout');
    
    if (isNetworkError && retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`Network error detected, retrying... (${retryCount}/${MAX_RETRIES})`);
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, retryCount - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return api(config);
    }
    
    return Promise.reject(error);
  }
);

// Response interceptor for retry logic (public API)
let publicRetryCount = 0;
publicApi.interceptors.response.use(
  (response) => {
    publicRetryCount = 0;
    return response;
  },
  async (error) => {
    const { config, code, message } = error;
    
    const isNetworkError = code === 'ECONNABORTED' || 
                          code === 'ETIMEDOUT' || 
                          !error.response ||
                          message?.includes('timeout');
    
    if (isNetworkError && publicRetryCount < MAX_RETRIES) {
      publicRetryCount++;
      console.log(`Public API network error detected, retrying... (${publicRetryCount}/${MAX_RETRIES})`);
      
      const delay = Math.pow(2, publicRetryCount - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return publicApi(config);
    }
    
    return Promise.reject(error);
  }
);

// Global error handler
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    console.error(`API Error ${status}:`, data.message || data.error);
    
    // Return user-friendly error messages based on status
    switch (status) {
      case 400:
        return data.message || 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication required. Please sign in again.';
      case 403:
        return 'Access denied. You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data.message || 'An error occurred. Please try again.';
    }
  } else if (error.request) {
    // Network error
    console.error('Network Error:', error.message);
    if (error.message?.includes('timeout')) {
      return 'Backend is waking up... Please try again in a moment (Heroku free tier may need time to start).';
    }
    return 'Network error. Please check your internet connection.';
  } else {
    // Other error
    console.error('Error:', error.message);
    return 'An unexpected error occurred.';
  }
};

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      // Redirect to login page (this will be handled by AuthContext)
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Pending requests cache to prevent duplicate in-flight requests
const pendingRequests = new Map();

// Generate unique key for request
const getRequestKey = (method, url, data, config) => {
  return `${method}:${url}:${JSON.stringify(data || {})}:${JSON.stringify(config.params || {})}`;
};

// API utility functions with deduplication
export const apiRequest = async (method, url, data = null, config = {}) => {
  const requestKey = getRequestKey(method, url, data, config);
  
  // Return existing pending request if exists
  if (pendingRequests.has(requestKey)) {
    console.log(`Deduplicating request: ${method} ${url}`);
    return pendingRequests.get(requestKey);
  }
  
  try {
    const requestConfig = {
      method,
      url,
      ...config
    };
    // Only add data to request if it's not null/undefined (prevents sending "null" string)
    if (data !== null && data !== undefined) {
      requestConfig.data = data;
    }
    
    // Create promise and store in pending requests
    const requestPromise = api(requestConfig).then(response => {
      pendingRequests.delete(requestKey);
      return response.data;
    }).catch(error => {
      pendingRequests.delete(requestKey);
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    });
    
    pendingRequests.set(requestKey, requestPromise);
    return requestPromise;
  } catch (error) {
    pendingRequests.delete(requestKey);
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Specific API methods
export const apiGet = (url, config = {}) => apiRequest('GET', url, null, config);
export const apiPost = (url, data, config = {}) => apiRequest('POST', url, data, config);
export const apiPut = (url, data, config = {}) => apiRequest('PUT', url, data, config);
export const apiDelete = (url, config = {}) => apiRequest('DELETE', url, null, config);

// Public API methods (no authentication)
export const publicApiRequest = async (method, url, data = null, config = {}) => {
  try {
    const requestConfig = {
      method,
      url,
      ...config
    };
    if (data !== null && data !== undefined) {
      requestConfig.data = data;
    }
    
    const response = await publicApi(requestConfig);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const publicApiPost = (url, data, config = {}) => publicApiRequest('POST', url, data, config);

// Authentication API methods
export const authAPI = {
  // User registration
  signup: (userData) => apiPost('/api/users/signup', userData),

  // User login
  login: (credentials) => apiPost('/api/auth/login', credentials),

  // Google OAuth sign-in
  googleSignIn: (googleData) => apiPost('/api/auth/google', googleData),

  // Google OAuth sign-up
  googleSignUp: (googleData) => apiPost('/api/auth/google/signup', googleData),

  // Refresh token
  refreshToken: () => apiPost('/api/auth/refresh'),

  // Logout
  logout: () => apiPost('/api/auth/logout'),

  // Get current user
  getCurrentUser: () => apiGet('/api/auth/me'),
  
  // Password reset request
  requestPasswordReset: (email) => apiPost('/api/auth/forgot-password', { email }),

  // Reset password
  resetPassword: (token, newPassword) => apiPost('/api/auth/reset-password', {
    token,
    password: newPassword
  })
};

// Subscription API methods
export const subscriptionAPI = {
  // Get all subscription plans
  getPlans: (activeOnly = true) => apiGet(`/api/subscriptions/plans?activeOnly=${activeOnly}`),

  // Get single plan
  getPlan: (planId) => apiGet(`/api/subscriptions/plans/${planId}`),
  
  // Get user subscriptions
  getUserSubscriptions: (userId, status = null) => {
    const query = status ? `?status=${status}` : '';
    return apiGet(`/api/subscriptions/user/${userId}${query}`);
  },
  
  // Create subscription
  createSubscription: (subscriptionData) => apiPost('/api/subscriptions', subscriptionData),
  
  // Update subscription
  updateSubscription: (subscriptionId, updateData) => apiPut(`/api/subscriptions/${subscriptionId}`, updateData),
  
  // Cancel subscription
  cancelSubscription: (subscriptionId) => apiDelete(`/api/subscriptions/${subscriptionId}`),
  
  // Admin: Manually set user to Pro subscription
  setProSubscription: ({ userId, force = false }) => apiPost('/api/admin/set-pro-subscription', { userId, force }),
  
  // Admin: Remove Pro subscription
  removeProSubscription: (userId) => apiPost('/api/admin/remove-pro-subscription', { userId })
};

// Payment API methods
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: (paymentData) => apiPost('/api/payments/create-intent', paymentData),
  
  // Create Stripe checkout session
  createCheckoutSession: (sessionData) => apiPost('/api/payments/create-checkout-session', sessionData),
  
  // Create billing portal session
  createBillingPortal: (portalData) => apiPost('/api/payments/create-billing-portal', portalData),
  
  // Confirm payment
  confirmPayment: (confirmationData) => apiPost('/api/payments/confirm', confirmationData),
  
  // Handle payment failure
  handlePaymentFailure: (failureData) => apiPost('/api/payments/failed', failureData),
  
  // Process refund
  processRefund: (paymentId, refundData) => apiPost(`/api/payments/${paymentId}/refund`, refundData),
  
  // Get user payments
  getUserPayments: (userId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/payments/user/${userId}?${queryString}`);
  }
};

// CRM API methods
export const crmAPI = {
  // Contacts
  getContacts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/contacts?${queryString}`);
  },
  
  getContact: (contactId) => apiGet(`/api/contacts/${contactId}`),
  
  createContact: (contactData) => apiPost('/api/contacts', contactData),
  
  updateContact: (contactId, updateData) => apiPut(`/api/contacts/${contactId}`, updateData),
  
  deleteContact: (contactId) => apiDelete(`/api/contacts/${contactId}`),
  
  updateContactCompany: (contactId, companyId) => apiPut(`/api/contacts/${contactId}/company`, { companyId }),
  
  // Companies
  getCompanies: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/companies?${queryString}`);
  },
  
  getCompany: (companyId) => apiGet(`/api/companies/${companyId}`),
  
  createCompany: (companyData) => apiPost('/api/companies', companyData),
  
  updateCompany: (companyId, updateData) => apiPut(`/api/companies/${companyId}`, updateData),
  
  deleteCompany: (companyId) => apiDelete(`/api/companies/${companyId}`),
  
  getCompanyContacts: (companyId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/companies/${companyId}/contacts?${queryString}`);
  },
  
  // Leads
  getLeads: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/leads?${queryString}`);
  },
  
  getLead: (leadId) => apiGet(`/api/leads/${leadId}`),
  
  createLead: (leadData) => apiPost('/api/leads', leadData),
  
  updateLead: (leadId, updateData) => apiPut(`/api/leads/${leadId}`, updateData),
  
  deleteLead: (leadId) => apiDelete(`/api/leads/${leadId}`),
  
  // Opportunities
  getOpportunities: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/opportunities?${queryString}`);
  },
  
  getOpportunity: (opportunityId) => apiGet(`/api/opportunities/${opportunityId}`),
  
  createOpportunity: (opportunityData) => apiPost('/api/opportunities', opportunityData),
  
  updateOpportunity: (opportunityId, updateData) => apiPut(`/api/opportunities/${opportunityId}`, updateData),
  
  deleteOpportunity: (opportunityId) => apiDelete(`/api/opportunities/${opportunityId}`),
  
  // Activities
  getActivities: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/activities?${queryString}`);
  },
  
  getActivity: (activityId) => apiGet(`/api/activities/${activityId}`),
  
  createActivity: (activityData) => apiPost('/api/activities', activityData),
  
  updateActivity: (activityId, updateData) => apiPut(`/api/activities/${activityId}`, updateData),
  
  deleteActivity: (activityId) => apiDelete(`/api/activities/${activityId}`),
  
  // Dashboard
  getDashboardMetrics: (timeRange = 'all_time') => apiGet(`/api/dashboard/metrics?timeRange=${timeRange}`),
  
  // Import
  importContacts: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/import/contacts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => response.data);
  },
  
  // Tickets (existing)
  getTickets: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/tickets?${queryString}`);
  },

  createTicket: (ticketData) => apiPost('/api/tickets', ticketData),

  getTicket: (ticketId) => apiGet(`/api/tickets/${ticketId}`),

  updateTicket: (ticketId, updateData) => apiPut(`/api/tickets/${ticketId}`, updateData),

  deleteTicket: (ticketId) => apiDelete(`/api/tickets/${ticketId}`),

  addTicketComment: (ticketId, commentData) => apiPost(`/api/tickets/${ticketId}/comments`, commentData),

  // Users
  lookupUserByEmail: (email) => apiGet(`/api/users/lookup?email=${encodeURIComponent(email)}`)
};

// DORA Assessment API methods
export const doraAPI = {
  // Submit DORA compliance assessment (using public quote endpoint for non-registered users)
  submitAssessment: (assessmentData) => publicApiPost('/api/quote', {
    name: assessmentData.contactName,
    email: assessmentData.email,
    message: `DORA Assessment from ${assessmentData.companyName}\n\nFull Assessment Data:\n${JSON.stringify(assessmentData, null, 2)}`
  })
};

// Legacy API methods
export const legacyAPI = {
  // Newsletter subscription
  subscribeNewsletter: (email) => apiPost('/api/subscribe', { email }),
  
  // Quote requests
  submitQuote: (quoteData) => apiPost('/api/quote', quoteData)
};

export default api;
