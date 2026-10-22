import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import Header from '../../partials/Header';
import PageIllustration from '../../partials/PageIllustration';
import Footer from '../../partials/Footer';
import { portfolioProjects } from '../../data/portfolioProjects';

function ProjectDetail() {
  const { slug } = useParams();
  const project = portfolioProjects.find((p) => p.slug === slug);
  const canonicalUrl = `https://www.ogtechnologies.co/portfolio/${slug}/`;

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>Project Not Found - OG Technologies EU</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Header />
        <main className="grow">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Project not found</h1>
            <p className="text-xl text-gray-400 mb-8">The project you are looking for does not exist.</p>
            <Link
              to="/portfolio/"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 transition-colors"
            >
              Back to Portfolio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>{project.metaTitle}</title>
        <meta name="description" content={project.metaDescription} />
        <meta name="keywords" content={project.metaKeywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={project.metaTitle} />
        <meta property="og:description" content={project.metaDescription} />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={project.metaTitle} />
        <meta name="twitter:description" content={project.metaDescription} />
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
            <div className="pt-32 pb-12 md:pt-40 md:pb-16">
              <div className="max-w-3xl mx-auto text-center">
                <div className="text-sm mb-4" data-aos="fade-up">
                  <Link to="/portfolio/" className="text-purple-400 hover:text-purple-300 font-medium">
                    ← Back to Portfolio
                  </Link>
                </div>
                <div className="text-purple-400 text-sm font-medium mb-3" data-aos="fade-up" data-aos-delay="100">
                  {project.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4" data-aos="fade-up" data-aos-delay="150">
                  {project.name}
                </h1>
                <p className="text-xl text-gray-400 mb-4" data-aos="fade-up" data-aos-delay="200">
                  {project.tagline}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-full border border-green-500/30" data-aos="fade-up" data-aos-delay="250">
                  {project.status}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  Project Content */}
        <section className="relative">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">

            {/* Overview */}
            <div className="mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">Overview</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{project.overview}</p>
            </div>

            {/* Key Capabilities */}
            <div className="mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">Key capabilities</h2>
              <ul className="space-y-3">
                {project.keyCapabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span className="text-lg text-gray-300">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology */}
            <div className="mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">Technology</h2>
              <div className="flex flex-wrap gap-2">
                {project.technology.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm font-medium rounded-full border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">Project links</h2>
              <div className="flex flex-wrap gap-3">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 transition-colors"
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
                    Project repository on GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Business Relevance */}
            <div className="mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">Business relevance</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{project.businessRelevance}</p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-8" data-aos="fade-up">
              <h2 className="text-2xl font-bold text-gray-100 mb-3">Get in touch</h2>
              <p className="text-lg text-gray-300 mb-6">{project.cta}</p>
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-3 bg-gray-800 border border-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors"
                  >
                    View on GitHub
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-3 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 transition-colors"
                  >
                    Visit Website
                  </a>
                )}
                <Link
                  to="/quote/"
                  className="inline-flex items-center px-5 py-3 border-2 border-purple-600 text-purple-400 text-sm font-medium rounded hover:bg-purple-600 hover:text-white transition-colors"
                >
                  Contact OG Technologies
                </Link>
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

export default ProjectDetail;
