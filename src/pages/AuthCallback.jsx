import React, { useEffect, useContext } from 'react';
import AuthContext, { AUTH_ACTIONS } from '../contexts/AuthContext';

const AuthCallback = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    console.log('[DEBUG] ================== AuthCallback MOUNTED ==================');
    console.log('[DEBUG] Timestamp:', new Date().toISOString());
    console.log('[DEBUG] Full URL:', window.location.href);
    console.log('[DEBUG] Search params:', window.location.search);
    console.log('[DEBUG] Hash:', window.location.hash);

    const handleOAuthCallback = () => {
      try {
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userParam = params.get('user');
        const error = params.get('error');
        const errorDescription = params.get('error_description');

        console.log('[DEBUG] Parsed params:');
        console.log('  - token:', token ? `Present (${token.substring(0, 20)}...)` : 'MISSING');
        console.log('  - user:', userParam ? 'Present' : 'MISSING');
        console.log('  - error:', error || 'none');
        console.log('  - error_description:', errorDescription || 'none');

        if (error) {
          console.error('[DEBUG] OAuth error from backend:', error, errorDescription);
          window.location.replace('/signin');
          return;
        }

        if (!token || !userParam) {
          console.error('[DEBUG] Missing token or user data in callback');
          console.log('[DEBUG] All params:', Object.fromEntries(params.entries()));
          window.location.replace('/signin');
          return;
        }

        // Parse user data
        let user;
        try {
          user = JSON.parse(decodeURIComponent(userParam));
          console.log('[DEBUG] User parsed successfully:', JSON.stringify(user, null, 2));
        } catch (parseError) {
          console.error('[DEBUG] Error parsing user data:', parseError);
          console.error('[DEBUG] Raw userParam:', userParam);
          window.location.replace('/signin');
          return;
        }

        // Store in localStorage
        console.log('[DEBUG] Storing in localStorage...');
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('[DEBUG] localStorage updated:');
        console.log('  - jwtToken:', localStorage.getItem('jwtToken') ? 'SET' : 'NOT SET');
        console.log('  - user:', localStorage.getItem('user') ? 'SET' : 'NOT SET');

        // Update authentication state
        console.log('[DEBUG] Dispatching LOGIN_SUCCESS...');
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { token, user }
        });
        console.log('[DEBUG] Dispatch completed');

        // Redirect to dashboard
        console.log('[DEBUG] Redirecting to /dashboard...');
        window.location.replace('/dashboard');
      } catch (error) {
        console.error('[DEBUG] Error handling OAuth callback:', error);
        console.error('[DEBUG] Error stack:', error.stack);
        window.location.replace('/signin');
      }
    };

    // Add small delay to ensure React has fully mounted
    setTimeout(() => {
      console.log('[DEBUG] Executing handleOAuthCallback after delay');
      handleOAuthCallback();
    }, 100);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-300">Completing sign-in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
