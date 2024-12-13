import React, { useState } from 'react';
import axios from 'axios'; // import axios library to make HTTP requests

function HelpDeskForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await axios.post('https://og-technologies.herokuapp.com/api/help-desk/', {
        name,
        email,
        phone,
        company,
        issue,
        description,
      });

      if (response.status === 200) {
        setSubmitSuccess(true);
      } else {
        setSubmitError('Failed to submit the form. Please try again later.');
      }
    } catch (error) {
      setSubmitError('Failed to submit the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative bg-purple-600 py-10 px-8 md:py-16 md:px-12" data-aos="fade-up">
          <div className="absolute right-0 top-0 -ml-40 pointer-events-none" aria-hidden="true">
            <svg width="238" height="110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="illustration-04" x1="369.483" y1="-84.633" x2="139.954" y2="-199.798" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" stopOpacity=".01" />
                  <stop offset="1" stopColor="#fff" stopOpacity=".24" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="relative flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
              <h3 className="h3 text-white mb-2">Help Desk Ticket Submission Form</h3>
              <p className="text-purple-200 text-lg">Please fill out the form below to submit your help desk ticket. Our team will assist you shortly.</p>
            </div>
            <form id="help-desk-form" className="w-full lg:w-1/2" onSubmit={handleFormSubmit}>
              <div className="flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
                <input
                  type="text"
                  className="w-full appearance-none bg-purple-700 border border-purple-500 focus:border-purple-300 rounded-sm px-4 py-3 mb-2 sm:mb-2 sm:mr-2 text-white placeholder-purple-400"
                  placeholder="Your Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
                <input
                  type="email"
                  className="w-full appearance-none bg-purple-700 border border-purple-500 focus:border-purple-300 rounded-sm px-4 py-3 mb-2 sm:mb-2 sm:mr-2 text-white placeholder-purple-400"
                  placeholder="Your Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full appearance-none bg-purple-700 border border-purple-500 focus:border-purple-300 rounded-sm px-4 py-3 mb-2 sm:mb-2 sm:mr-2 text-white placeholder-purple-400"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full appearance-none bg-purple-700 border border-purple-500 focus:border-purple-300 rounded-sm px-4 py-3 mb-2 sm:mb-2 sm:mr-2 text-white placeholder-purple-400"
                  placeholder="Your Company Name"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
                <input
                  type="text"
                  className="w-full appearance-none bg-purple-700 border border-purple-500 focus:border-purple-300 rounded-sm px-4 py-3 mb-2 sm:mb-2 sm:mr-2 text-white placeholder-purple-400"
                  placeholder="Issue Title"
                  value={issue}
                  onChange={(event) => setIssue(event.target.value)}
                  required
                />
                <textarea
                  className="w-full appearance-none bg-purple-700 border border-purple-500 focus:border-purple-300 rounded-sm px-4 py-3 mb-2 sm:mb-2 sm:mr-2 text-white placeholder-purple-400"
                  placeholder="Description of the Issue"
                  rows="4"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="btn text-purple-600 bg-purple-100 mb-2 hover:bg-white shadow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {/* Success message */}
              {submitSuccess && (
                <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '10px' }}>
                  Success! Your help desk ticket has been submitted.
                </div>
              )}

              {/* Error message */}
              {submitError && (
                <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '10px' }}>
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HelpDeskForm;
