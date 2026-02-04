import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';

function Alliance() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: 'Thank you for your submission! We will review your application and get back to you soon. In the meantime, please send us an email at hi@ogtechnologies.co with your Alliance Code and letting us know about your interest in the alliance program.'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      <main className="grow">
        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Alliance Partnership Program</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Apply for the OG Technologies and Alliance partnership program. Please fill out the form below to get started.
                </p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                {submitStatus.message ? (
                  <div className={`p-4 rounded ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submitStatus.message}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="company">
                          Company Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="company"
                          type="text"
                          className={`form-input w-full text-white ${errors.company ? 'border-red-500' : ''}`}
                          placeholder="Your company name"
                          {...register('company', { required: 'Company name is required' })}
                        />
                        {errors.company && (
                          <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="founder">
                          Founder Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="founder"
                          type="text"
                          className={`form-input w-full text-white ${errors.founder ? 'border-red-500' : ''}`}
                          placeholder="Your full name"
                          {...register('founder', { required: 'Founder name is required' })}
                        />
                        {errors.founder && (
                          <p className="text-red-500 text-sm mt-1">{errors.founder.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="affiliation">
                          Alliance Affiliation <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="affiliation"
                          type="text"
                          className={`form-input w-full text-white ${errors.affiliation ? 'border-red-500' : ''}`}
                          placeholder="Your Alliance affiliation"
                          {...register('affiliation', { required: 'Alliance affiliation is required' })}
                        />
                        {errors.affiliation && (
                          <p className="text-red-500 text-sm mt-1">{errors.affiliation.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="description">
                          Project Description <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          id="description"
                          rows="4"
                          className={`form-textarea w-full text-white ${errors.description ? 'border-red-500' : ''}`}
                          placeholder="Tell us about your project"
                          {...register('description', { required: 'Project description is required' })}
                        ></textarea>
                        {errors.description && (
                          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="timeline">
                          Estimated Timeline <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="timeline"
                          type="text"
                          className={`form-input w-full text-white ${errors.timeline ? 'border-red-500' : ''}`}
                          placeholder="e.g., 3 months, Q2 2024, etc."
                          {...register('timeline', { required: 'Timeline is required' })}
                        />
                        {errors.timeline && (
                          <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="code">
                          Alliance Code <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="code"
                          type="text"
                          className={`form-input w-full text-white ${errors.code ? 'border-red-500' : ''}`}
                          placeholder="Enter your unique Alliance code"
                          {...register('code', { 
                            required: 'Alliance code is required',
                            pattern: {
                              value: /^[A-Z0-9]{8,}$/,
                              message: 'Please enter a valid Alliance code'
                            }
                          })}
                        />
                        {errors.code && (
                          <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Don't have a code? Contact Alliance for your unique code.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button
                          type="submit"
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}

export default Alliance;