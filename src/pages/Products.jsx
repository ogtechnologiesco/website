import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FeatImage01 from '../images/1.png';
import FeatImage02 from '../images/2.png';
import FeatImage03 from '../images/3.png';
import ai from '../images/ai.jpeg';
import bloch from '../images/bloch.png';
import blockchain from '../images/blockchain.png';
import ecom from '../images/ecomm.png';
import ecommerce from '../images/ecommerce.png';
import elearn from '../images/eleran.png';
import travel from '../images/travel.png';
import bb from '../images/bb.png';
import aii from '../images/ai.png';
import space from "../images/space.png"




function Products() {
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
            
            <h1 className="h2 mb-4">Our Products</h1>
            
          </div>

          {/* Items */}
          <div className="grid gap-20">

            {/* CRM Product - Main Product */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-8 border border-purple-500/30">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-600/20 rounded-lg blur-xl"></div>
                  <div className="relative bg-gray-800 rounded-lg p-6 border border-purple-500/30">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">CRM & Ticketing System</h4>
                      <p className="text-purple-300 text-sm">Our flagship product</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="flex items-center mb-3">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2">MAIN PRODUCT</span>
                    <span className="text-green-400 text-sm">✓ Active Development</span>
                  </div>
                  <h3 className="h3 mb-3 text-white">Complete CRM and Ticketing Solution</h3>
                  <p className="text-xl text-gray-300 mb-4">Transform your customer relationships with our comprehensive CRM and ticketing system. Manage contacts, track interactions, automate workflows, and provide exceptional customer support - all in one powerful platform.</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Features:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <span className="text-purple-400 mr-2">✓</span>
                        Contact Management & CRM
                      </li>
                      <li className="flex items-center">
                        <span className="text-purple-400 mr-2">✓</span>
                        Advanced Ticketing System
                      </li>
                      <li className="flex items-center">
                        <span className="text-purple-400 mr-2">✓</span>
                        Automation & Workflows
                      </li>
                      <li className="flex items-center">
                        <span className="text-purple-400 mr-2">✓</span>
                        Analytics & Reporting
                      </li>
                      <li className="flex items-center">
                        <span className="text-purple-400 mr-2">✓</span>
                        Multi-channel Support
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/pricing"
                      className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out text-center"
                    >
                      View Pricing Plans
                    </Link>
                    <Link 
                      to="/quote"
                      className="bg-transparent border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white py-3 px-6 rounded-md font-semibold transition duration-150 ease-in-out text-center"
                    >
                      Request Demo
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={travel} width="540" height="405" alt="Features 01" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  
                  <h3 className="h3 mb-3">Customized travel booking platform development </h3>
                  <p className="text-xl text-gray-400 mb-4">Our team of experts can help your business build a customized travel booking platform that incorporates AI and blockchain technologies. We work closely with you to understand your business requirements and design a platform that provides personalized travel recommendations and a seamless booking experience, while ensuring secure and transparent transactions.</p>
                  
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={ecom} width="540" height="405" alt="Features 02" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                 
                  <h3 className="h3 mb-3">E-commerce marketplace development </h3>
                  <p className="text-xl text-gray-400 mb-4"> We can help your business build a decentralized and secure e-commerce marketplace that utilizes blockchain technology. Our team of developers and designers can work with you to create a user-friendly platform that incorporates AI algorithms to provide personalized product recommendations and real-time pricing optimization.</p>
                  
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={bb} width="540" height="405" alt="Features 03" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                 
                  <h3 className="h3 mb-3">Blockchain consulting services </h3>
                  <p className="text-xl text-gray-400 mb-4"> Our team of blockchain experts provides consulting services to companies looking to integrate blockchain technology into their existing systems. We can help you develop a blockchain strategy, design and build smart contracts, and develop blockchain-based applications that streamline your business operations. </p>
                  
                </div>
              </div>
            </div>
 
  {/* 2nd item */}
  <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={aii} width="540" height="405" alt="Features 02" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                 
                  <h3 className="h3 mb-3">AI-powered chatbot development  </h3>
                  <p className="text-xl text-gray-400 mb-4">We can help your business build an AI-powered agents/chatbot that provides 24/7 customer support to your customers. Our team of developers and data scientists can work with you to design a agent/chatbot that uses natural language processing and machine learning algorithms to provide personalized assistance to your customers.</p>
                  
                </div>
              </div>
            </div>


              {/* 3rd item */}
              <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={bloch} width="540" height="405" alt="Features 03" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                 
                  <h3 className="h3 mb-3">Blockchain-based loyalty program development  </h3>
                  <p className="text-xl text-gray-400 mb-4"> We can help your business build a blockchain-based loyalty program that rewards and retains your customers. Our team of developers can work with you to design and develop a loyalty program that uses blockchain technology to ensure transparency and security in the reward distribution process. </p>
                  
                </div>
              </div>
            </div>



              {/* 2nd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={elearn} width="540" height="405" alt="Features 02" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                 
                  <h3 className="h3 mb-3">E-learning platform development </h3>
                  <p className="text-xl text-gray-400 mb-4"> We can help your business build a custom e-learning platform that incorporates the latest technologies such as AI and blockchain. Our team of instructional designers, developers, and data scientists can work with you to design and develop an e-learning platform that provides personalized learning experiences to your users, while ensuring data security and integrity.</p>
                  
                </div>
              </div>
            </div>

             {/* 3rd item */}
             <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={space} width="540" height="405" alt="Features 03" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                 
                  <h3 className="h3 mb-3">Space technology development </h3>
                  <p className="text-xl text-gray-400 mb-4"> Explore the cosmos with our expertise in crafting cutting-edge space technology solutions. Our skilled team, comprising engineers, developers, and data specialists, is ready to collaborate with you in creating a bespoke space technology platform. From satellite communications to celestial data analysis, we tailor solutions that offer unparalleled experiences. Ensuring the utmost security and integrity of space-related data, we bring innovation to the forefront of your cosmic endeavors. Join hands with us to propel your business into the future of space technology. </p>
                  
                </div>
              </div>
            </div>

            {/* Health Industry item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-emerald-600/20 rounded-lg blur-xl"></div>
                  <div className="relative bg-gray-800 rounded-lg p-8 border border-teal-500/30 flex items-center justify-center min-h-[300px]">
                    <svg className="w-32 h-32 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" style={{opacity: 0.6}}></path>
                      <circle cx="12" cy="12" r="10" strokeWidth="1.5" stroke="currentColor" fill="none" opacity="0.3"></circle>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4" opacity="0.8"></path>
                    </svg>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                        <span className="text-teal-300 text-xs font-medium">Digital Health</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="flex items-center mb-3">
                    <span className="bg-teal-600/20 text-teal-400 text-xs px-2 py-1 rounded-full border border-teal-500/30">HEALTHCARE</span>
                  </div>
                  <h3 className="h3 mb-3">Health Industry Solutions </h3>
                  <p className="text-xl text-gray-400 mb-4">Transform healthcare delivery with our cutting-edge digital health solutions. We specialize in building secure, HIPAA-compliant healthcare platforms that leverage AI diagnostics, telemedicine capabilities, and blockchain-based health records. From patient management systems to remote monitoring solutions, we help healthcare providers deliver better patient outcomes through innovative technology.</p>
                  <ul className="space-y-2 text-gray-300 mb-4">
                    <li className="flex items-center">
                      <span className="text-teal-400 mr-2">✓</span>
                      Electronic Health Records (EHR) Systems
                    </li>
                    <li className="flex items-center">
                      <span className="text-teal-400 mr-2">✓</span>
                      Telemedicine & Virtual Care Platforms
                    </li>
                    <li className="flex items-center">
                      <span className="text-teal-400 mr-2">✓</span>
                      AI-Powered Diagnostic Tools
                    </li>
                  </ul>
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

export default Products;