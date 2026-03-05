import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import bb from '../images/bb.png';
import cultureImage1 from '../images/intrapreneurship.jpg';
import cultureImage2 from '../images/startups.jpg';
import cultureImage3 from '../images/new-business.jpg';






  

function Job() {


    


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
                <h1 className="h1">We are Hiring!</h1>
                <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="100">
                  Join our innovative team and help shape the future of technology
                </p>
              </div>

              {/* Company Culture Section */}
              <div className="max-w-6xl mx-auto pb-16 md:pb-24">
                <div className="text-center mb-12" data-aos="fade-up">
                  <h2 className="h2 mb-4">Why Join OG Technologies?</h2>
                  <p className="text-xl text-gray-400">
                    We're more than just a company – we're a community of innovators, creators, and problem-solvers
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3 lg:gap-12 items-start" data-aos-id-culture>
                  
                  {/* Culture Card 1 */}
                  <div className="relative flex flex-col" data-aos="fade-up" data-aos-anchor="[data-aos-id-culture]">
                    <div className="mb-6">
                      <img 
                        src={cultureImage1} 
                        alt="Innovation and intrapreneurship" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="h3 mb-3">Innovation-Driven Culture</h3>
                    <p className="text-lg text-gray-400 mb-4">
                      We foster intrapreneurship and encourage creative thinking. Every team member has the opportunity to innovate, experiment, and drive meaningful change in the blockchain and technology space.
                    </p>
                    <ul className="text-gray-400 space-y-2">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Innovation time and resources</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Cutting-edge technology projects</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Continuous learning opportunities</span>
                      </li>
                    </ul>
                  </div>

                  {/* Culture Card 2 */}
                  <div className="relative flex flex-col" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-culture]">
                    <div className="mb-6">
                      <img 
                        src={cultureImage2} 
                        alt="Collaborative startup environment" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="h3 mb-3">Collaborative Environment</h3>
                    <p className="text-lg text-gray-400 mb-4">
                      We believe in the power of collaboration and diverse perspectives. Our startup-like environment encourages open communication, knowledge sharing, and mutual growth among team members.
                    </p>
                    <ul className="text-gray-400 space-y-2">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Flat hierarchy and open doors</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Regular team building activities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Supportive mentorship programs</span>
                      </li>
                    </ul>
                  </div>

                  {/* Culture Card 3 */}
                  <div className="relative flex flex-col" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-culture]">
                    <div className="mb-6">
                      <img 
                        src={cultureImage3} 
                        alt="Growth and development opportunities" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="h3 mb-3">Growth & Development</h3>
                    <p className="text-lg text-gray-400 mb-4">
                      Your growth is our priority. We provide ample opportunities for professional development, career advancement, and personal growth in a rapidly evolving tech landscape.
                    </p>
                    <ul className="text-gray-400 space-y-2">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Professional development budget</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Career advancement paths</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Industry conference attendance</span>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Call to Action */}
                <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="300">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 max-w-4xl mx-auto">
                    <h3 className="h3 text-white mb-4">Ready to Make an Impact?</h3>
                    <p className="text-xl text-gray-100 mb-6">
                      Join us in building the future of blockchain technology. Whether you're a seasoned professional or just starting your career, we have a place for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="text-gray-100">
                        <strong className="text-white">What we offer:</strong> Competitive salary, flexible work arrangements, health benefits, and the chance to work on groundbreaking projects.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Openings Section */}
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12" data-aos="fade-up">
                  <h2 className="h2 mb-4">Current Openings</h2>
                  <p className="text-xl text-gray-400">
                    Find your perfect role and join our growing team
                  </p>
                </div>

                <div className="max-w-4xl mx-auto text-center" data-aos="fade-up" data-aos-delay="100">
                  <div className="bg-gray-800 rounded-lg p-12">
                    <div className="mb-6">
                      <svg className="w-20 h-20 mx-auto text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                      </svg>
                    </div>
                    <h3 className="h3 mb-4 text-white">No Current Openings</h3>
                    <p className="text-xl text-gray-400 mb-8">
                      We're not actively hiring at the moment, but we're always looking for talented individuals who share our vision.
                    </p>
                    <div className="text-gray-300 mb-8">
                      <p className="mb-4">Feel free to reach out to us if you're interested in future opportunities:</p>
                      <ul className="text-left max-w-md mx-auto space-y-2">
                        <li className="flex items-center justify-center">
                          <span className="text-purple-600 mr-2">•</span>
                          <span>Software Engineers & Developers</span>
                        </li>
                        <li className="flex items-center justify-center">
                          <span className="text-purple-600 mr-2">•</span>
                          <span>UX/UI Designers</span>
                        </li>
                        <li className="flex items-center justify-center">
                          <span className="text-purple-600 mr-2">•</span>
                          <span>Product Managers</span>
                        </li>
                        <li className="flex items-center justify-center">
                          <span className="text-purple-600 mr-2">•</span>
                          <span>Sales & Marketing Professionals</span>
                        </li>
                        <li className="flex items-center justify-center">
                          <span className="text-purple-600 mr-2">•</span>
                          <span>Data Scientists</span>
                        </li>
                      </ul>
                    </div>
                    <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                      <div>
                        <a className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0" onClick={() => window.location.href = 'mailto:hi@ogtechnologies.co?subject=Future Opportunities - OG Technologies'}>
                          Send Your Resume
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          
            <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
            wanna join our Family ?
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0" onClick={() => window.location.href = 'mailto:hi@ogtechnologies.co'}>
                  Contact Us
                </a>
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

export default Job;