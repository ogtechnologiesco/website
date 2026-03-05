
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/og_logo.png';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Top area: Blocks */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">

            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                {/* Logo */}
                <Link to="/" className="inline-block" aria-label="sarah">
                  <div style={{ width: '100px', height: '60px' }}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  </div>
                </Link>
              </div>
              <div className="text-gray-400">Widerhofergasse 6 /12, 1090 Vienna, Austria.</div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8">

             

              {/* 3rd block */}
              

              {/* 4th block */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-1">Company</h6>
                <ul>
                  <li className="mb-1">
                    <Link to="/imprint" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Imprint</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/terms" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Terms</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/privacy" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Privacy Policy</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/blog" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Blogs</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/products" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Products</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/quote" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Quotes</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/careers" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Careers</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/ventures" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Ventures</Link>
                  </li>
                  <li className="mb-1">
                    <button 
                      onClick={() => window.openCookieSettings?.()}
                      className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out text-left w-full"
                    >
                      Cookie Settings
                    </button>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between">

            {/* Social links */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              <li>
                <Link to="https://x.com/og_technologies" className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="X">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link to="https://github.com/ogtechnologiesco" className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Github">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
              </li>
             
              <li className="ml-4">
                <Link to="https://www.linkedin.com/company/og-technologies-eu" className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Linkedin">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link to="https://bsky.app/profile/did:plc:4njcm2f7fhkq4iyoeldn37ar" className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Bluesky">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/>
                  </svg>
                </Link>
              </li>
            </ul>

            {/* Copyright note */}
            <div className="text-gray-400 text-sm mr-4">&copy; {currentYear} OG Technologies EU. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
