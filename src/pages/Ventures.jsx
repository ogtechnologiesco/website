import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import startups from '../images/startups.jpg';
import newBusiness from '../images/new-business.jpg';
import spinoffs from '../images/spinoffs.jpg';
import intrapreneurship from '../images/intrapreneurship.jpg';

function Ventures() {
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

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-200">
            
            <h1 className="h2 mb-4">Our Ventures</h1>
            <p className="text-xl text-gray-400 mb-4">We support innovation and entrepreneurship across various domains, helping transform ideas into successful ventures.</p>
            
          </div>

          {/* Items */}
          <div className="grid gap-20">

            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={startups} width="540" height="405" alt="Support to Startups" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  
                  <h3 className="h3 mb-3">Support to Startups</h3>
                  <p className="text-xl text-gray-400 mb-4">We provide comprehensive support to early-stage startups, offering mentorship, technical expertise, and strategic guidance. Our team helps entrepreneurs navigate the challenges of building a scalable business, from product development to market entry and fundraising strategies.</p>
                  
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={newBusiness} width="540" height="405" alt="New Business" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                 
                  <h3 className="h3 mb-3">New Business</h3>
                  <p className="text-xl text-gray-400 mb-4">We partner with existing companies and corporate entities to launch new business ventures and innovative initiatives. Our expertise helps established organizations explore new markets, develop disruptive technologies, and create sustainable growth opportunities in rapidly evolving industries.</p>
                  
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={spinoffs} width="540" height="405" alt="Spin-offs" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                 
                  <h3 className="h3 mb-3">Spin-offs</h3>
                  <p className="text-xl text-gray-400 mb-4">We facilitate the creation of spin-offs by researchers and universities, helping transform academic research and innovations into commercial ventures. Our team provides the bridge between scientific discovery and market application, ensuring successful technology transfer and commercialization.</p>
                  
                </div>
              </div>
            </div>

            {/* 4th item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={intrapreneurship} width="540" height="405" alt="Intrapreneurship" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                 
                  <h3 className="h3 mb-3">Intrapreneurship</h3>
                  <p className="text-xl text-gray-400 mb-4">We foster intrapreneurship within organizations, empowering employees to innovate and drive internal ventures. Our programs help companies build entrepreneurial cultures, develop innovation frameworks, and support internal teams in creating new products, services, and business models from within the organization.</p>
                  
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>

      </main>

      <Footer />

    </div>
  );
}

export default Ventures;
