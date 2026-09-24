import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/og_logo.png';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import toast from 'react-hot-toast';
import SiteSearch from '../components/SiteSearch';


function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [utilitiesOpen, setUtilitiesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileUtilitiesOpen, setMobileUtilitiesOpen] = useState(false);
  const trigger = useRef(null);
  const mobileNav = useRef(null);
  const userMenuRef = useRef(null);
  const utilitiesRef = useRef(null);
  const solutionsRef = useRef(null);
  const resourcesRef = useRef(null);
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

  // close solutions menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!solutionsRef.current) return;
      if (!solutionsOpen || solutionsRef.current.contains(target)) return;
      setSolutionsOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close resources menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!resourcesRef.current) return;
      if (!resourcesOpen || resourcesRef.current.contains(target)) return;
      setResourcesOpen(false);
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
                <img src={logo} alt="Logo" width="100" height="60" style={{ maxWidth: '100%', maxHeight: '100%' }} />
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
                <Link to="/products/" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Products </Link>
              </li>
              <li>
                <Link to="/pricing/" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Pricing </Link>
              </li>

              {/* Solutions dropdown */}
              <li className="relative" ref={solutionsRef}>
                <button
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  onClick={() => { setSolutionsOpen(!solutionsOpen); setResourcesOpen(false); setUtilitiesOpen(false); }}
                  aria-expanded={solutionsOpen}
                >
                  Solutions
                  <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 12 12">
                    <path d="M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.762L10.825 4z" />
                  </svg>
                </button>
                {solutionsOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <Link to="/standards/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setSolutionsOpen(false)}>Standards</Link>
                    <Link to="/dora/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setSolutionsOpen(false)}>DORA Compliance</Link>
                    <Link to="/ventures/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setSolutionsOpen(false)}>Ventures</Link>
                    <Link to="/portfolio/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setSolutionsOpen(false)}>Portfolio</Link>
                  </div>
                )}
              </li>

              {/* Resources dropdown */}
              <li className="relative" ref={resourcesRef}>
                <button
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  onClick={() => { setResourcesOpen(!resourcesOpen); setSolutionsOpen(false); setUtilitiesOpen(false); }}
                  aria-expanded={resourcesOpen}
                >
                  Resources
                  <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 12 12">
                    <path d="M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.762L10.825 4z" />
                  </svg>
                </button>
                {resourcesOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <Link to="/blog/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setResourcesOpen(false)}>Blog</Link>
                    <Link to="/insights/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setResourcesOpen(false)}>Insights</Link>
                    <Link to="/careers/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setResourcesOpen(false)}>Careers</Link>
                    <Link to="/quote/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setResourcesOpen(false)}>Request a Quote</Link>
                  </div>
                )}
              </li>

              {/* Utilities dropdown */}
              <li className="relative" ref={utilitiesRef}>
                <button
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  onClick={() => { setUtilitiesOpen(!utilitiesOpen); setSolutionsOpen(false); setResourcesOpen(false); }}
                  aria-expanded={utilitiesOpen}
                >
                  Utilities
                  <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 12 12">
                    <path d="M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.762L10.825 4z" />
                  </svg>
                </button>
                {utilitiesOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg py-1 z-50 max-h-[70vh] overflow-y-auto">
                    <p className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Image & PDF</p>
                    <Link to="/tools/html-to-image/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>HTML to Image</Link>
                    <Link to="/tools/screenshot-to-image/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>Screenshot to Image</Link>
                    <Link to="/tools/pdf-tools/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>PDF Tools</Link>
                    <Link to="/tools/merge-pdf/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>Merge PDFs</Link>
                    <Link to="/tools/split-pdf/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>Split PDF</Link>
                    <Link to="/tools/image-to-pdf/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>Image → PDF</Link>
                    <Link to="/tools/document-to-pdf/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>Document → PDF</Link>
                    <Link to="/tools/pdf-to-word/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>PDF → Word</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">XML Tools</p>
                    <Link to="/tools/xml-tools/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>XML Tools</Link>
                    <Link to="/tools/xml-formatter/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>XML Formatter</Link>
                    <Link to="/tools/xml-validator/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>XML Validator</Link>
                    <Link to="/tools/xml-to-json/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>XML → JSON</Link>
                    <Link to="/tools/xml-minifier/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>XML Minifier</Link>
                    <Link to="/tools/xpath-tester/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>XPath Tester</Link>
                    <Link to="/tools/xml-to-csv/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>XML → CSV</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Security</p>
                    <Link to="/tools/security-tools/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>Security Scanner</Link>
                    <Link to="/tools/blockchain-compliance-checker/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>Blockchain Compliance Checker</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">ISO Standards</p>
                    <Link to="/tools/iso-27001-gap-analysis/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>ISO 27001 Gap Analysis</Link>
                    <Link to="/tools/iso-9001-readiness-checker/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>ISO 9001 Readiness Checker</Link>
                    <Link to="/tools/iso-42001-ai-readiness/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>ISO 42001 AI Readiness</Link>
                    <Link to="/tools/iso-8601-validator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>ISO 8601 Date Validator</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Developer Tools</p>
                    <Link to="/tools/ethereum-toolkit/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>Ethereum Toolkit</Link>
                    <Link to="/tools/wei-converter/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>Wei Converter</Link>
                    <Link to="/tools/keccak256-hash/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>Keccak256 Hash</Link>
                    <Link to="/tools/function-selector/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>Function Selector</Link>
                    <Link to="/tools/abi-encoder/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>ABI Encoder</Link>
                    <Link to="/tools/address-checksum/" className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white pl-8" onClick={() => setUtilitiesOpen(false)}>Address Checksum</Link>
                    <Link to="/tools/aws-arn-parser/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>AWS ARN Parser</Link>
                    <Link to="/tools/iam-policy-validator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>IAM Policy Validator</Link>
                    <Link to="/tools/sap-odata-url-builder/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>SAP OData URL Builder</Link>
                    <Link to="/tools/hash-generator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>Hash Generator</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Finance & Payments</p>
                    <Link to="/tools/iban-validator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>IBAN Validator</Link>
                    <Link to="/tools/bic-validator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>BIC Validator</Link>
                    <Link to="/tools/lei-validator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>LEI Validator</Link>
                    <Link to="/tools/iso-20022-viewer/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>ISO 20022 Viewer</Link>
                    <Link to="/tools/mt940-to-csv/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>MT940 to CSV</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Health IT</p>
                    <Link to="/tools/hl7-parser/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>HL7 Parser</Link>
                    <Link to="/tools/fhir-validator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>FHIR Validator</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Space</p>
                    <Link to="/tools/tle-parser/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>TLE Parser</Link>
                    <Link to="/tools/tle-converter/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>TLE to JSON/CSV</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">E-Learning</p>
                    <Link to="/tools/scorm-validator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>SCORM Validator</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">E-Commerce</p>
                    <Link to="/tools/gtin-validator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>GTIN Validator</Link>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">CRM & Contact Data</p>
                    <Link to="/tools/phone-formatter/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>Phone Formatter</Link>
                    <Link to="/tools/vcard-generator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>vCard Generator</Link>
                    <Link to="/tools/email-validator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>Email Validator</Link>
                    <Link to="/tools/csv-deduplicator/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setUtilitiesOpen(false)}>CSV Deduplicator</Link>
                    <Link to="/tools/" className="block px-4 py-2 text-sm text-purple-400 hover:bg-gray-700 hover:text-white border-t border-gray-700 mt-1" onClick={() => setUtilitiesOpen(false)}>All Tools →</Link>
                  </div>
                )}
              </li>

              {/* Search bar */}
              <li className="px-2">
                <SiteSearch />
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
                        to="/dashboard/"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {hasActiveSubscription() && (
                        <>
                          <Link
                            to="/crm/"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            OG CRM
                          </Link>
                          <Link
                            to="/helpdesk/"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            OG Helpdesk
                          </Link>
                        </>
                      )}
                      <Link
                        to="/settings/"
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
                    <Link to="/signin/" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Sign In </Link>
                  </li>
                  <li>
                    <Link to="/signup/" className="font-medium text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md flex items-center transition duration-150 ease-in-out"> Sign Up </Link>
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
                <li className="pb-2">
                  <SiteSearch isMobile={true} />
                </li>
                <li>
                  <Link to="/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Home</Link>
                </li>
                <li>
                  <Link to="/products/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Products</Link>
                </li>
                <li>
                  <Link to="/pricing/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Pricing</Link>
                </li>

                {/* Mobile Solutions section */}
                <li className="border-t border-gray-700 pt-2 mt-2">
                  <button
                    className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center items-center"
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  >
                    Solutions
                    <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 12 12">
                      <path d="M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.762L10.825 4z" />
                    </svg>
                  </button>
                  {mobileSolutionsOpen && (
                    <ul className="bg-gray-700 rounded mt-1 mb-1">
                      <li><Link to="/standards/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Standards</Link></li>
                      <li><Link to="/dora/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">DORA Compliance</Link></li>
                      <li><Link to="/ventures/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Ventures</Link></li>
                      <li><Link to="/portfolio/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Portfolio</Link></li>
                    </ul>
                  )}
                </li>

                {/* Mobile Resources section */}
                <li className="border-t border-gray-700 pt-2 mt-2">
                  <button
                    className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center items-center"
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  >
                    Resources
                    <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 12 12">
                      <path d="M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.762L10.825 4z" />
                    </svg>
                  </button>
                  {mobileResourcesOpen && (
                    <ul className="bg-gray-700 rounded mt-1 mb-1">
                      <li><Link to="/blog/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Blog</Link></li>
                      <li><Link to="/insights/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Insights</Link></li>
                      <li><Link to="/careers/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Careers</Link></li>
                      <li><Link to="/quote/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Request a Quote</Link></li>
                    </ul>
                  )}
                </li>

                {/* Mobile Utilities section */}
                <li className="border-t border-gray-700 pt-2 mt-2">
                  <button
                    className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center items-center"
                    onClick={() => setMobileUtilitiesOpen(!mobileUtilitiesOpen)}
                  >
                    Utilities
                    <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 12 12">
                      <path d="M6 8.825L1.175 4 2.238 2.938 6 6.7l3.763-3.762L10.825 4z" />
                    </svg>
                  </button>
                  {mobileUtilitiesOpen && (
                    <ul className="bg-gray-700 rounded mt-1 mb-1">
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Image & PDF</li>
                      <li><Link to="/tools/html-to-image/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">HTML to Image</Link></li>
                      <li><Link to="/tools/screenshot-to-image/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Screenshot to Image</Link></li>
                      <li><Link to="/tools/pdf-tools/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">PDF Tools</Link></li>
                      <li><Link to="/tools/merge-pdf/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">Merge PDFs</Link></li>
                      <li><Link to="/tools/split-pdf/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">Split PDF</Link></li>
                      <li><Link to="/tools/image-to-pdf/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">Image → PDF</Link></li>
                      <li><Link to="/tools/document-to-pdf/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">Document → PDF</Link></li>
                      <li><Link to="/tools/pdf-to-word/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">PDF → Word</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">XML Tools</li>
                      <li><Link to="/tools/xml-tools/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">XML Tools</Link></li>
                      <li><Link to="/tools/xml-formatter/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">XML Formatter</Link></li>
                      <li><Link to="/tools/xml-validator/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">XML Validator</Link></li>
                      <li><Link to="/tools/xml-to-json/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">XML → JSON</Link></li>
                      <li><Link to="/tools/xml-minifier/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">XML Minifier</Link></li>
                      <li><Link to="/tools/xpath-tester/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">XPath Tester</Link></li>
                      <li><Link to="/tools/xml-to-csv/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">XML → CSV</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Security</li>
                      <li><Link to="/tools/security-tools/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Security Scanner</Link></li>
                      <li><Link to="/tools/blockchain-compliance-checker/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Blockchain Compliance Checker</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">ISO Standards</li>
                      <li><Link to="/tools/iso-27001-gap-analysis/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">ISO 27001 Gap Analysis</Link></li>
                      <li><Link to="/tools/iso-9001-readiness-checker/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">ISO 9001 Readiness Checker</Link></li>
                      <li><Link to="/tools/iso-42001-ai-readiness/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">ISO 42001 AI Readiness</Link></li>
                      <li><Link to="/tools/iso-8601-validator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">ISO 8601 Date Validator</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Developer Tools</li>
                      <li><Link to="/tools/ethereum-toolkit/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Ethereum Toolkit</Link></li>
                      <li><Link to="/tools/wei-converter/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">Wei Converter</Link></li>
                      <li><Link to="/tools/keccak256-hash/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">Keccak256 Hash</Link></li>
                      <li><Link to="/tools/function-selector/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">Function Selector</Link></li>
                      <li><Link to="/tools/abi-encoder/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">ABI Encoder</Link></li>
                      <li><Link to="/tools/address-checksum/" className="flex font-medium w-full text-gray-400 hover:text-white py-2 px-8 justify-center">Address Checksum</Link></li>
                      <li><Link to="/tools/aws-arn-parser/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">AWS ARN Parser</Link></li>
                      <li><Link to="/tools/iam-policy-validator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">IAM Policy Validator</Link></li>
                      <li><Link to="/tools/sap-odata-url-builder/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">SAP OData URL Builder</Link></li>
                      <li><Link to="/tools/hash-generator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Hash Generator</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Finance & Payments</li>
                      <li><Link to="/tools/iban-validator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">IBAN Validator</Link></li>
                      <li><Link to="/tools/bic-validator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">BIC Validator</Link></li>
                      <li><Link to="/tools/lei-validator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">LEI Validator</Link></li>
                      <li><Link to="/tools/iso-20022-viewer/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">ISO 20022 Viewer</Link></li>
                      <li><Link to="/tools/mt940-to-csv/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">MT940 to CSV</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Health IT</li>
                      <li><Link to="/tools/hl7-parser/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">HL7 Parser</Link></li>
                      <li><Link to="/tools/fhir-validator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">FHIR Validator</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Space</li>
                      <li><Link to="/tools/tle-parser/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">TLE Parser</Link></li>
                      <li><Link to="/tools/tle-converter/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">TLE to JSON/CSV</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">E-Learning</li>
                      <li><Link to="/tools/scorm-validator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">SCORM Validator</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">E-Commerce</li>
                      <li><Link to="/tools/gtin-validator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">GTIN Validator</Link></li>
                      <li className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">CRM & Contact Data</li>
                      <li><Link to="/tools/phone-formatter/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Phone Formatter</Link></li>
                      <li><Link to="/tools/vcard-generator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">vCard Generator</Link></li>
                      <li><Link to="/tools/email-validator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">Email Validator</Link></li>
                      <li><Link to="/tools/csv-deduplicator/" className="flex font-medium w-full text-gray-300 hover:text-white py-2 px-4 justify-center">CSV Deduplicator</Link></li>
                      <li className="border-t border-gray-600 mt-1"><Link to="/tools/" className="flex font-medium w-full text-purple-400 hover:text-white py-2 px-4 justify-center">All Tools →</Link></li>
                    </ul>
                  )}
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
                      <Link to="/dashboard/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Dashboard</Link>
                    </li>
                    {hasActiveSubscription() && (
                      <>
                        <li>
                          <Link to="/crm/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">OG CRM</Link>
                        </li>
                        <li>
                          <Link to="/helpdesk/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">OG Helpdesk</Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link to="/settings/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Settings</Link>
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
                      <Link to="/signin/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Sign In</Link>
                    </li>
                    <li>
                      <Link to="/signup/" className="flex font-medium w-full text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md my-2 justify-center">Sign Up</Link>
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
