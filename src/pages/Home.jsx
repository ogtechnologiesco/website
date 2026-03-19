import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
  );
}

export default Home;