import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { authAPI } from '../services/api';


function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get('token'));
  const [isResetMode, setIsResetMode] = useState(!!token);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 10;
  };

  const validateRequestForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateResetForm = () => {
    const errors = {};

    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (!validatePassword(newPassword)) {
      errors.newPassword = 'Password must be at least 10 characters long';
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRequestSubmit = async (event) => {
    event.preventDefault();

    if (!validateRequestForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await authAPI.requestPasswordReset(email);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();

    if (!validateResetForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await authAPI.resetPassword(token, newPassword);
      setSubmitSuccess(true);
      // Redirect to login after successful reset
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAlert = () => {
    if (submitSuccess) {
      return (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">Success!</p>
          <p>
            {isResetMode 
              ? 'Your password has been reset successfully. Redirecting to login...' 
              : 'Password reset instructions have been sent to your email.'
            }
          </p>
        </div>
      );
    } else if (submitError) {
      return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error!</p>
          <p>{submitError}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">
                  {isResetMode ? 'Reset Your Password' : 'Forgot your password?'}
                </h1>
                <p className="text-xl text-gray-400">
                  {isResetMode 
                    ? 'Enter your new password below.' 
                    : "We'll email you instructions on how to reset it."
                  }
                </p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                {isResetMode ? (
                  <form onSubmit={handleResetSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="new-password">New Password</label>
                        <input 
                          id="new-password" 
                          type="password" 
                          className={`form-input w-full text-gray-300 ${formErrors.newPassword ? 'border-red-500' : ''}`} 
                          placeholder="Enter new password (at least 10 characters)" 
                          required 
                          value={newPassword}
                          onChange={(event) => setNewPassword(event.target.value)}
                          disabled={isSubmitting}
                        />
                        {formErrors.newPassword && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.newPassword}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="confirm-password">Confirm New Password</label>
                        <input 
                          id="confirm-password" 
                          type="password" 
                          className={`form-input w-full text-gray-300 ${formErrors.confirmPassword ? 'border-red-500' : ''}`} 
                          placeholder="Confirm your new password" 
                          required 
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          disabled={isSubmitting}
                        />
                        {formErrors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button 
                          className="btn text-white bg-purple-600 hover:bg-purple-700 w-full disabled:opacity-50" 
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Resetting...' : 'Reset Password'}
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRequestSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input 
                          id="email" 
                          type="email" 
                          className={`form-input w-full text-gray-300 ${formErrors.email ? 'border-red-500' : ''}`} 
                          placeholder="you@yourcompany.com" 
                          required 
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          disabled={isSubmitting}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button 
                          className="btn text-white bg-purple-600 hover:bg-purple-700 w-full disabled:opacity-50" 
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Sending...' : 'Reset Password'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                {renderAlert()}
                <div className="text-gray-400 text-center mt-6">
                  <Link to="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">
                    {isResetMode ? 'Back to Sign In' : 'Cancel'}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>


    </div>
  );
}

export default ResetPassword;