import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const ProtectedRoute = ({
  children,
  requiredRole = null,
  requiredPermission = null,
  redirectTo = '/signin',
  fallback = null
}) => {
  const { isAuthenticated, isLoading, hasRole, hasPermission, user } = useAuth();
  const location = useLocation();

  // Handle toast notifications after render
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        toast.error('Please sign in to access this page');
      } else if (requiredRole && !hasRole(requiredRole)) {
        toast.error('You do not have the required permissions to access this page');
      } else if (requiredPermission && !hasPermission(requiredPermission)) {
        toast.error('You do not have the required permissions to access this page');
      }
    }
  }, [isLoading, isAuthenticated, requiredRole, requiredPermission, hasRole, hasPermission]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }

  // Check if user has required role
  if (requiredRole && !hasRole(requiredRole)) {
    return fallback || <Navigate to="/unauthorized" replace />;
  }

  // Check if user has required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required permissions
  return children;
};

// Higher-order component for protecting routes
export const withProtection = (Component, options = {}) => {
  const WrappedComponent = (props) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );

  WrappedComponent.displayName = `withProtection(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Component for subscription-protected routes
export const SubscriptionProtectedRoute = ({
  children,
  requireActiveSubscription = true,
  redirectTo = '/pricing',
  fallback = null
}) => {
  const { hasActiveSubscription, isOnTrial } = useAuth();
  const location = useLocation();
  const needsSubscription = requireActiveSubscription && !hasActiveSubscription() && !isOnTrial();

  useEffect(() => {
    if (needsSubscription) {
      toast.error('This feature requires an active subscription');
    }
  }, [needsSubscription]);

  if (needsSubscription) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

// Component for verified user routes
export const VerifiedUserRoute = ({ children, redirectTo = '/verify-email' }) => {
  const { isVerified } = useAuth();
  const location = useLocation();
  const verified = isVerified();

  useEffect(() => {
    if (!verified) {
      toast.error('Please verify your email address to access this page');
    }
  }, [verified]);

  if (!verified) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
