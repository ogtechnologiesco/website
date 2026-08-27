import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/og_logo.png';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import toast from 'react-hot-toast';


function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [utilitiesOpen, setUtilitiesOpen] = useState(false);
  const trigger = useRef(null);
  const mobileNav = useRef(null);
  const userMenuRef = useRef(null);
  const utilitiesRef = useRef(null);
  const navigate = useNavigate();
  
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    isInitialized,
    login,
    register,
    logout,
    clearError,
    getDisplayName
  } = useAuth();

  const { hasActiveSubscription } = useSubscription();

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close user menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!userMenuRef.current) return;
      if (!userMenuOpen || userMenuRef.current.contains(target)) return;
      setUserMenuOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close utilities menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!utilitiesRef.current) return;
      if (!utilitiesOpen || utilitiesRef.current.contains(target)) return;
      setUtilitiesOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close mobile menu if esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
      setUserMenuOpen(false);
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <header className={`absolute w-full z-30 ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-2">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="sarah">
              <div style={{ width: '100px', height: '60px' }}>
                <img src={logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link to="/" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Home </Link>
              </li>
              <li>
                <Link to="/standards" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Standards </Link>
              </li>
              <li>
                <Link to="/dora" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> DORA </Link>
              </li>
              <li>
                <Link to="/products" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Products </Link>
              </li>
              <li>
                <Link to="/pricing" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Pricing </Link>
              </li>
              <li>
                <Link to="/imprint" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Imprint </Link>
              </li>
              <li>
                <Link to="/terms" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Terms </Link>
              </li>
              <li>
                <Link to="/Privacy" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Privacy </Link>
              </li>
              <li>
                <Link to="/blog" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Blogs </Link>
              </li>
              <li>
                <Link to="/ventures" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Ventures </Link>
              </li>
              <li>
                <Link to="/portfolio" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Portfolio </Link>
              </li>
              <li>
                <Link to="/careers" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Careers </Link>
              </li>
              <li>
                <Link to="/quote" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Quotes </Link>
              </li>

              {/* Utilities dropdown */}
              <li className="relative" ref={utilitiesRef}>
                <button
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  onClick={() => setUtilitiesOpen(!utilitiesOpen)}
                  aria-expanded={utilitiesOpen}
                >
                  Utilities
                  <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 12 12">
                    <path d="M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.762L10.825 4z" />
                  </svg>
                </button>
                {utilitiesOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/tools/html-to-image"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setUtilitiesOpen(false)}
                    >
                      HTML to Image
                    </Link>
                    <Link
                      to="/tools/screenshot-to-image"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setUtilitiesOpen(false)}
                    >
                      Screenshot to Image
                    </Link>
                    <Link
                      to="/tools/pdf-tools"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setUtilitiesOpen(false)}
                    >
                      PDF Tools
                    </Link>
                  </div>
                )}
              </li>

              {/* Authentication buttons */}
              {isLoading ? (
                <li className="px-4 py-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                </li>
              ) : isAuthenticated ? (
                <li className="relative">
                  <button
                    ref={userMenuRef}
                    className="flex items-center text-purple-600 hover:text-gray-200 px-4 py-3 transition duration-150 ease-in-out"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="font-medium">{getDisplayName()}</span>
                    <svg className="w-4 h-4 ml-2 fill-current" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                  
                  {/* User dropdown menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm font-medium text-white">{getDisplayName()}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                        {hasActiveSubscription() && (
                          <p className="text-xs text-green-400">Active Subscription</p>
                        )}
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {hasActiveSubscription() && (
                        <>
                          <Link
                            to="/crm"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            OG CRM
                          </Link>
                          <Link
                            to="/helpdesk"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            OG Helpdesk
                          </Link>
                        </>
                      )}
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/signin" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Sign In </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="font-medium text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md flex items-center transition duration-150 ease-in-out"> Sign Up </Link>
                  </li>
                </>
              )}
            </ul>

            <div>
          
    </div>

          </nav>

        
          {/* Mobile menu */}
          <div className="md:hidden">

            {/* Hamburger button */}
            <button ref={trigger} className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <nav id="mobile-nav" ref={mobileNav} className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: .8 } }>
              <ul className="bg-gray-800 px-4 py-2">
                <li>
                  <Link to="/imprint" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Imprint</Link>
                </li>
                <li>
                  <Link to="/standards" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Standards</Link>
                </li>
                <li>
                  <Link to="/dora" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">DORA</Link>
                </li>
                <li>
                  <Link to="/products" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Products</Link>
                </li>
                <li>
                  <Link to="/pricing" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Pricing</Link>
                </li>
                <li>
                  <Link to="/terms" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Terms</Link>
                </li>
                <li>
                  <Link to="/Privacy" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Privacy</Link>
                </li>
                <li>
                  <Link to="/blog" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Blogs</Link>
                </li>
                <li>
                  <Link to="/ventures" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Ventures</Link>
                </li>
                <li>
                  <Link to="/portfolio" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Portfolio</Link>
                </li>
                <li className="border-t border-gray-700 pt-2 mt-2">
                  <p className="text-xs font-semibold text-gray-400 text-center uppercase tracking-wide">Utilities</p>
                </li>
                <li>
                  <Link to="/tools/html-to-image" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">HTML to Image</Link>
                </li>
                <li>
                  <Link to="/tools/screenshot-to-image" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Screenshot to Image</Link>
                </li>
                <li>
                  <Link to="/tools/pdf-tools" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">PDF Tools</Link>
                </li>

                {/* Mobile authentication buttons */}
                {isLoading ? (
                  <li className="flex justify-center py-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                  </li>
                ) : isAuthenticated ? (
                  <>
                    <li className="border-t border-gray-700 pt-2 mt-2">
                      <div className="text-center">
                        <p className="text-sm font-medium text-white">{getDisplayName()}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                        {hasActiveSubscription() && (
                          <p className="text-xs text-green-400">Active Subscription</p>
                        )}
                      </div>
                    </li>
                    <li>
                      <Link to="/dashboard" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Dashboard</Link>
                    </li>
                    {hasActiveSubscription() && (
                      <>
                        <li>
                          <Link to="/crm" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">OG CRM</Link>
                        </li>
                        <li>
                          <Link to="/helpdesk" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">OG Helpdesk</Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link to="/settings" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Settings</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/signin" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Sign In</Link>
                    </li>
                    <li>
                      <Link to="/signup" className="flex font-medium w-full text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md my-2 justify-center">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
