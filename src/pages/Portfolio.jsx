import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';
import { portfolioProjects } from '../data/portfolioProjects';

function Portfolio() {
  const projects = portfolioProjects;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Portfolio - OG Technologies EU | Innovative Projects</title>
        <meta name="description" content="Explore our portfolio of innovative projects including EduNode, an educational STEM/Web3/AI platform, Mozart Pay, a Stellar-based payment platform, and Stellar Go CLI, an open-source Stellar developer toolkit." />
        <meta name="keywords" content="portfolio, EduNode, Mozart Pay, Stellar Go CLI, Stellar, blockchain projects, Web3 projects, education technology, payment platform, open source" />
        <link rel="canonical" href="https://www.ogtechnologies.co/portfolio/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/portfolio/" />
        <meta property="og:title" content="Portfolio - OG Technologies EU | Innovative Projects" />
        <meta property="og:description" content="Explore our portfolio of innovative projects including EduNode, Mozart Pay, and Stellar Go CLI. Proven experience with cutting-edge technologies." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/portfolio/" />
        <meta name="twitter:title" content="Portfolio - OG Technologies EU | Innovative Projects" />
        <meta name="twitter:description" content="Explore our portfolio of innovative projects including EduNode, Mozart Pay, and Stellar Go CLI." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
      </Helmet>
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
                <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
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
                    key={project.slug}
                    className="rounded-lg border border-gray-700 bg-gray-800/50 overflow-hidden hover:border-purple-600 hover:bg-gray-800 transition duration-150 ease-in-out flex flex-col"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Project Image/Logo */}
                    <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative">
                      <div className="flex flex-col items-center justify-center text-center">
                        {project.logo ? (
                          <div className="text-white">
                            <img 
                              src={project.logo} 
                              alt={project.logoAlt} 
                              className="w-20 h-20 mb-2 rounded-full border-2 border-white"
                            />
                            <div className="text-sm font-medium">{project.name}</div>
                          </div>
                        ) : (
                          <div className="text-white">
                            <div className="w-20 h-20 mb-2 rounded-lg border-2 border-white bg-gray-900 flex items-center justify-center">
                              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="text-sm font-medium">{project.name}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col grow">
                      <div className="text-xs font-medium text-purple-400 mb-2">{project.category}</div>
                      <h3 className="text-2xl font-bold text-gray-100 mb-2">{project.name}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      
                      {/* Features */}
                      <ul className="mb-4 space-y-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-400 mr-2 mt-1">✓</span>
                            <span className="text-sm text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-3 mt-auto">
                        <Link
                          to={`/portfolio/${project.slug}/`}
                          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 transition-colors"
                        >
                          View Project
                        </Link>
                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-gray-600 text-gray-300 text-sm font-medium rounded hover:bg-gray-700 transition-colors"
                          >
                            Visit Website
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-gray-600 text-gray-300 text-sm font-medium rounded hover:bg-gray-700 transition-colors"
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
        <section className="border-y border-gray-800 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-100 mb-4" data-aos="fade-up">
                Building Trust Through Excellence
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Our portfolio demonstrates proven experience with innovative technologies and successful project delivery. 
                From award-winning open source contributions to proprietary platforms, we bring expertise that creates real value.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                  <div className="text-4xl font-bold text-blue-400 mb-2">3+</div>
                  <div className="text-gray-400">Major Projects</div>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="400">
                  <div className="text-4xl font-bold text-green-400 mb-2">2</div>
                  <div className="text-gray-400">Awards Won</div>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="500">
                  <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
                  <div className="text-gray-400">Client Satisfaction</div>
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
