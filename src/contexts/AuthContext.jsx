import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('jwtToken'),
  isAuthenticated: false,
  isLoading: true,
  error: null,
  isInitialized: false
};

// Action types
export const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOAD_USER_START: 'LOAD_USER_START',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE: 'LOAD_USER_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR',
  INIT_COMPLETE: 'INIT_COMPLETE'
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOAD_USER_START:
      return {
        ...state,
        isLoading: true
      };

    case AUTH_ACTIONS.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        isInitialized: true
      };

    case AUTH_ACTIONS.LOAD_USER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        isInitialized: true
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.INIT_COMPLETE:
      return {
        ...state,
        isInitialized: true,
        isLoading: false
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize authentication on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          // Validate token by fetching current user (with shorter timeout)
          const user = await authAPI.getCurrentUser();
          dispatch({
            type: AUTH_ACTIONS.LOAD_USER_SUCCESS,
            payload: user
          });
        } catch (error) {
          console.warn('Token validation failed:', error.message);
          // Token is invalid, clear storage
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('user');
          dispatch({
            type: AUTH_ACTIONS.LOAD_USER_FAILURE
          });
        }
      } else {
        // No token found
        dispatch({
          type: AUTH_ACTIONS.INIT_COMPLETE
        });
      }
    };

    // Add a small delay to prevent immediate API calls on page load
    const timeoutId = setTimeout(initializeAuth, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Login function
  const login = async (email, password, rememberMe = false) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });

      const response = await authAPI.login({ email, password });
      
      const { user, token } = response;

      // Store token and user data
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, token }
      });

      return { success: true, user };
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.REGISTER_START });

      const response = await authAPI.signup(userData);
      
      // Handle case where backend only returns success message
      if (response.message === "User created") {
        // Registration successful but no auto-login
        dispatch({
          type: AUTH_ACTIONS.REGISTER_SUCCESS,
          payload: { user: null, token: null }
        });
        return { success: true, user: null, message: "Registration successful! Please sign in." };
      }
      
      const { user, token } = response;

      // Store token and user data
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: { user, token }
      });

      return { success: true, user };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint to invalidate token on server
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of server response
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check if user is authenticated
  const isAuthenticatedUser = () => {
    return state.isAuthenticated && !!state.token;
  };

  // Get current user
  const getCurrentUser = () => {
    return state.user;
  };

  // Get auth token
  const getAuthToken = () => {
    return state.token;
  };

  // Check if user is admin
  const isAdmin = () => {
    const actualUser = state.user.user || state.user;
    if (!actualUser) return false;
    
    // Multiple admin validation methods
    return (
      actualUser?.role === 'admin' ||
      actualUser?.isAdmin === true ||
      actualUser?.email?.endsWith('@ogtechnologies.co') ||
      actualUser?.email?.endsWith('@admin.ogtechnologies.co')
    );
  };

  const value = {
    ...state,
    dispatch,
    login,
    register,
    logout,
    clearError,
    isAuthenticatedUser,
    getCurrentUser,
    getAuthToken,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
