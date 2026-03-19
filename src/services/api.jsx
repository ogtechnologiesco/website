import axios from 'axios';

// Environment configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Default headers
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: defaultHeaders,
  timeout: 5000, // 5 seconds timeout - reduced from 10 seconds
});

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

// API utility functions
export const apiRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Specific API methods
export const apiGet = (url, config = {}) => apiRequest('GET', url, null, config);
export const apiPost = (url, data, config = {}) => apiRequest('POST', url, data, config);
export const apiPut = (url, data, config = {}) => apiRequest('PUT', url, data, config);
export const apiDelete = (url, config = {}) => apiRequest('DELETE', url, null, config);

// Authentication API methods
export const authAPI = {
  // User registration
  signup: (userData) => apiPost('/api/users/signup', userData),
  
  // User login
  login: (credentials) => apiPost('/api/auth/login', credentials),
  
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
  cancelSubscription: (subscriptionId) => apiDelete(`/api/subscriptions/${subscriptionId}`)
};

// Payment API methods
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: (paymentData) => apiPost('/api/payments/create-intent', paymentData),
  
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
  
  createContact: (contactData) => apiPost('/api/contacts', contactData),
  
  updateContact: (contactId, updateData) => apiPut(`/api/contacts/${contactId}`, updateData),
  
  deleteContact: (contactId) => apiDelete(`/api/contacts/${contactId}`),
  
  // Companies
  getCompanies: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/companies?${queryString}`);
  },
  
  createCompany: (companyData) => apiPost('/api/companies', companyData),
  
  getCompanyContacts: (companyId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/companies/${companyId}/contacts?${queryString}`);
  },
  
  // Tickets
  getTickets: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGet(`/api/tickets?${queryString}`);
  },
  
  createTicket: (ticketData) => apiPost('/api/tickets', ticketData),
  
  getTicket: (ticketId) => apiGet(`/api/tickets/${ticketId}`),
  
  addTicketComment: (ticketId, commentData) => apiPost(`/api/tickets/${ticketId}/comments`, commentData)
};

// Legacy API methods
export const legacyAPI = {
  // Newsletter subscription
  subscribeNewsletter: (email) => apiPost('/api/subscribe', { email }),
  
  // Quote requests
  submitQuote: (quoteData) => apiPost('/api/quote', quoteData)
};

export default api;
