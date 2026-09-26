import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import FeaturesZigZag from '../partials/FeaturesZigzag';
import Testimonials from '../partials/Testimonials';
import Newsletter from '../partials/Newsletter';
import Footer from '../partials/Footer';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user, isInitialized } = useAuth();

  // Auto-redirect to dashboard if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && isInitialized) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, isInitialized, navigate]);

  return (
    <>
      <Helmet>
        <title>OG Technologies EU - Web3 & Blockchain Innovation</title>
        <meta name="description" content="Transform your business with cutting-edge Web3 and blockchain solutions. OG Technologies EU delivers enterprise-grade decentralized applications, verifiable credentials, and digital identity systems." />
        <meta name="keywords" content="Web3, blockchain, enterprise solutions, verifiable credentials, digital identity, Stellar, DeFi, decentralized applications" />
        <link rel="canonical" href="https://www.ogtechnologies.co/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/" />
        <meta property="og:title" content="OG Technologies EU - Web3 & Blockchain Innovation" />
        <meta property="og:description" content="Transform your business with cutting-edge Web3 and blockchain solutions. Enterprise-grade decentralized applications and digital identity systems." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/" />
        <meta name="twitter:title" content="OG Technologies EU - Web3 & Blockchain Innovation" />
        <meta name="twitter:description" content="Transform your business with cutting-edge Web3 and blockchain solutions. Enterprise-grade decentralized applications and digital identity systems." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
        
        {/* JSON-LD Structured Data */}
        {/* VideoObject Structured Data */}
      </Helmet>
      <div className="flex flex-col min-h-screen overflow-hidden" id="light">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <HeroHome />
        <FeaturesBlocks />
        <FeaturesZigZag />
        <Testimonials />
        <Newsletter />
      </main>

      

      {/*  Site footer */}
      <Footer />
    </div>
    </>
  );
}

export default Home;