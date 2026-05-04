import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { useAuth } from '../hooks/useAuth'; 

function SignUp() {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { register, error: authError, isAuthenticated, isInitialized } = useAuth();
  

  // Redirect if already authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate('/');
    }
  }, [isInitialized, isAuthenticated, navigate]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 10;
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!companyName.trim()) {
      errors.companyName = 'Company name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      errors.password = 'Password must be at least 10 characters long';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await register({
        name,
        companyName,
        email,
        password
      });

      if (result.success) {
        // Registration successful, show success message
        console.log('Registration successful:', result.message);
        setShowSuccess(true);
        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    console.log('Google sign-up clicked');
    
    try {
      // Redirect to backend Google OAuth endpoint
      window.location.href = 'https://og-technologies.herokuapp.com/api/auth/google';
    } catch (error) {
      console.error('Google sign-up error:', error);
      setFormErrors({ google: 'Google sign-up is not available: ' + error.message });
    }
  };

  const renderAlert = () => {
    if (showSuccess) {
      return (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">Success!</p>
          <p>Registration successful! Redirecting to sign in page...</p>
        </div>
      );
    }
    if (authError) {
      return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error!</p>
          <p>{authError}</p>
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
                <h1 className="h1">Welcome. We exist to make entrepreneurship easier.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button 
                        type="button"
                        onClick={handleGoogleSignUp}
                        className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                      >
                        <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Sign up with Google</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-400">Or, register with your email</div>
                  <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
                </div>
                <form  onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Full Name <span className="text-red-600">*</span></label>
                      <input 
                        id="full-name" 
                        type="text" 
                        className={`form-input w-full text-gray-300 ${formErrors.name ? 'border-red-500' : ''}`} 
                        placeholder="First and last name" 
                        required 
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">Company Name <span className="text-red-600">*</span></label>
                      <input 
                        id="company-name" 
                        type="text" 
                        className={`form-input w-full text-gray-300 ${formErrors.companyName ? 'border-red-500' : ''}`} 
                        placeholder="Your company or app name" 
                        required 
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                      />
                      {formErrors.companyName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.companyName}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Work Email <span className="text-red-600">*</span></label>
                      <input 
                        id="email" 
                        type="email" 
                        className={`form-input w-full text-gray-300 ${formErrors.email ? 'border-red-500' : ''}`} 
                        placeholder="you@yourcompany.com" 
                        required 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input 
                        id="password" 
                        type="password" 
                        className={`form-input w-full text-gray-300 ${formErrors.password ? 'border-red-500' : ''}`} 
                        placeholder="Password (at least 10 characters)" 
                        required 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      {formErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="confirm-password">Confirm Password <span className="text-red-600">*</span></label>
                      <input 
                        id="confirm-password" 
                        type="password" 
                        className={`form-input w-full text-gray-300 ${formErrors.confirmPassword ? 'border-red-500' : ''}`} 
                        placeholder="Confirm your password" 
                        required 
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                      />
                      {formErrors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button 
                        className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" 
                        type="submit" 
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </form>
                {renderAlert()}
                {formErrors.google && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                    <p className="font-bold">Google Sign-up Error!</p>
                    <p>{formErrors.google}</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

   
    </div>
  );
}

export default SignUp;