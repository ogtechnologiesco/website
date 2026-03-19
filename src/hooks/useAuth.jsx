import { useContext, useCallback } from 'react';
import { useAuth as useAuthContext } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

// Enhanced useAuth hook with additional utility functions
export const useAuth = () => {
  const authContext = useAuthContext();
  
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
    login,
    register,
    logout,
    clearError
  } = authContext;

  // Enhanced login with additional options
  const enhancedLogin = useCallback(async (email, password, options = {}) => {
    const { rememberMe = false, redirectTo = '/' } = options;
    
    const result = await login(email, password, rememberMe);
    
    if (result.success && redirectTo) {
      // Handle redirect in the component that calls this hook
      return { ...result, redirectTo };
    }
    
    return result;
  }, [login]);

  // Enhanced registration with additional options
  const enhancedRegister = useCallback(async (userData, options = {}) => {
    const { redirectTo = '/' } = options;
    
    const result = await register(userData);
    
    if (result.success && redirectTo) {
      return { ...result, redirectTo };
    }
    
    return result;
  }, [register]);

  // Check if user has specific role/permission
  const hasRole = useCallback((role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  }, [user]);

  // Check if user has specific permission
  const hasPermission = useCallback((permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  }, [user]);

  // Get user display name
  const getDisplayName = useCallback(() => {
    if (!user) return '';
    return user.name || user.email || 'User';
  }, [user]);

  // Check if token is expired
  const isTokenExpired = useCallback(() => {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error parsing token:', error);
      return true;
    }
  }, [token]);

  // Refresh token if needed
  const refreshTokenIfNeeded = useCallback(async () => {
    if (isTokenExpired()) {
      try {
        await authAPI.refreshToken();
        return true;
      } catch (error) {
        console.error('Token refresh failed:', error);
        await logout();
        return false;
      }
    }
    return true;
  }, [isTokenExpired, logout]);

  // Update user profile
  const updateProfile = useCallback(async (profileData) => {
    try {
      // This would need to be implemented in the API
      // const updatedUser = await authAPI.updateProfile(profileData);
      // For now, just return the current user
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [user]);

  // Change password
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      // This would need to be implemented in the API
      // await authAPI.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Get authentication headers for API calls
  const getAuthHeaders = useCallback(() => {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }, [token]);

  // Check if user is verified
  const isVerified = useCallback(() => {
    return user && user.isVerified;
  }, [user]);

  // Get user subscription status
  const getSubscriptionStatus = useCallback(() => {
    return user?.subscription || null;
  }, [user]);

  // Check if user has active subscription
  const hasActiveSubscription = useCallback(() => {
    const subscription = getSubscriptionStatus();
    return subscription && subscription.status === 'active';
  }, [getSubscriptionStatus]);

  // Get user company information
  const getCompany = useCallback(() => {
    return user?.company || null;
  }, [user]);

  // Check if user is on trial
  const isOnTrial = useCallback(() => {
    const subscription = getSubscriptionStatus();
    return subscription && subscription.status === 'trialing';
  }, [getSubscriptionStatus]);

  return {
    // Core auth state
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
    
    // Core auth methods
    login: enhancedLogin,
    register: enhancedRegister,
    logout,
    clearError,
    
    // Utility methods
    hasRole,
    hasPermission,
    getDisplayName,
    isTokenExpired,
    refreshTokenIfNeeded,
    updateProfile,
    changePassword,
    getAuthHeaders,
    
    // User status methods
    isVerified,
    getSubscriptionStatus,
    hasActiveSubscription,
    getCompany,
    isOnTrial
  };
};

export default useAuth;
