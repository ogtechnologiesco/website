import React from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';

function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'EduNode',
      description: 'Educational platform for STEM, WEB3 and AI',
      category: 'Own Brand',
      website: 'https://edunode.org/',
      github: 'https://github.com/EduNodeOrg?tab=repositories',
      image: '/images/edunode-preview.jpg',
      features: [
        'STEM Education Platform',
        'Web3 Integration',
        'AI-Powered Learning',
        'Grant-funded by Stelar Development Foundation'
      ],
      tags: ['Education', 'STEM', 'Web3', 'AI', 'Open Source']
    },
    {
      id: 2,
      title: 'Mozart Pay',
      description: 'Payment platform using Stellar Network and Circle USDC/EURC',
      category: 'Own Brand',
      website: 'https://mozartpay.com/',
      github: 'https://github.com/mozartpay?tab=repositories',
      image: '/images/mozartpay-preview.jpg',
      features: [
        'Stellar Network Integration',
        'USDC/EURC Support',
        'Cross-border Payments',
        'Decentralized Finance'
      ],
      tags: ['FinTech', 'Blockchain', 'Payments', 'Stellar', 'DeFi']
    },
   
  ];

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

        {/*  Hero Section */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4" data-aos="fade-up">
                  Portfolio
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                  Showcasing innovative projects with prominent companies and cutting-edge technologies
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*  Projects Grid */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-20">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <div 
                    key={project.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Project Image/Logo */}
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                      <div className="flex flex-col items-center justify-center text-center">
                        {project.id === 1 && (
                          <div className="text-white">
                            <img 
                              src="https://pbs.twimg.com/profile_images/1307989699357749251/Be0jAooe_400x400.jpg" 
                              alt="EduNode Logo" 
                              className="w-20 h-20 mb-2 rounded-full border-2 border-white"
                            />
                            <div className="text-sm font-medium">EduNode</div>
                          </div>
                        )}
                        {project.id === 2 && (
                          <div className="text-white">
                            <img 
                              src="https://pbs.twimg.com/profile_images/1346878845622890506/GPNnoIeT_400x400.jpg" 
                              alt="MozartPay Logo" 
                              className="w-20 h-20 mb-2 rounded-full border-2 border-white"
                            />
                            <div className="text-sm font-medium">MozartPay</div>
                          </div>
                        )}
                        {project.id === 3 && (
                          <div className="text-white">
                            <div className="text-4xl mb-2">🏆</div>
                            <div className="text-sm font-medium">Reflector Oracle Client</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      
                      {/* Features */}
                      <ul className="mb-4 space-y-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-3">
                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                          >
                            Visit Website
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/*  Trust Section */}
        <section className="bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4" data-aos="fade-up">
                Building Trust Through Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Our portfolio demonstrates proven experience with innovative technologies and successful project delivery. 
                From award-winning open source contributions to proprietary platforms, we bring expertise that creates real value.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                  <div className="text-4xl font-bold text-blue-600 mb-2">3+</div>
                  <div className="text-gray-600">Major Projects</div>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="400">
                  <div className="text-4xl font-bold text-green-600 mb-2">2</div>
                  <div className="text-gray-600">Awards Won</div>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="500">
                  <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Portfolio;
