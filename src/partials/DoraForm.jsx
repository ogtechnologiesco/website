import React, { useState } from 'react';
import { doraAPI } from '../services/api';
import toast from 'react-hot-toast';

function DoraForm() {
  const [formData, setFormData] = useState({
    // Section 1 - Company Information
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    companySize: '',
    companyType: [],
    
    // Section 2 - Technology Stack
    blockchainPlatforms: [],
    primaryTechFocus: '',
    web3Protocols: [],
    smartContractAuditStatus: '',
    
    // Section 3 - DORA Compliance Assessment
    ictRiskManagement: '',
    ictThirdPartyRisk: '',
    digitalResilienceTesting: '',
    ictIncidentReporting: '',
    informationSharing: '',
    criticalThirdPartyOversight: '',
    complianceDeadlineAwareness: '',
    
    // Section 4 - Project Details
    estimatedBudget: '',
    timeline: '',
    additionalComments: '',
    preferredContactMethod: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [complianceScore, setComplianceScore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name, value) => {
    setFormData(prev => {
      const currentArray = prev[name] || [];
      if (currentArray.includes(value)) {
        return { ...prev, [name]: currentArray.filter(item => item !== value) };
      } else {
        return { ...prev, [name]: [...currentArray, value] };
      }
    });
  };

  const calculateComplianceScore = () => {
    const doraFields = [
      'ictRiskManagement',
      'ictThirdPartyRisk',
      'digitalResilienceTesting',
      'ictIncidentReporting',
      'informationSharing',
      'criticalThirdPartyOversight'
    ];
    
    const scores = {
      'Implemented': 100,
      'Partially Implemented': 66,
      'Planning Phase': 33,
      'Not Started': 0,
      'Regular Testing': 100,
      'Occasional Testing': 66,
      'Full Capabilities': 100,
      'Partial Capabilities': 66,
      'Active Participation': 100,
      'Limited Participation': 66,
      'Comprehensive Oversight': 100,
      'Basic Oversight': 66
    };
    
    let totalScore = 0;
    doraFields.forEach(field => {
      totalScore += scores[formData[field]] || 0;
    });
    
    return Math.round(totalScore / doraFields.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Map DORA fields to quote form format
      const mappedService = [
        formData.companyType.length > 0 ? `Company Type: ${formData.companyType.join(', ')}` : null,
        formData.blockchainPlatforms.length > 0 ? `Blockchain Platforms: ${formData.blockchainPlatforms.join(', ')}` : null,
        formData.primaryTechFocus ? `Primary Tech Focus: ${formData.primaryTechFocus}` : null,
        formData.web3Protocols.length > 0 ? `Web3 Protocols: ${formData.web3Protocols.join(', ')}` : null,
        formData.smartContractAuditStatus ? `Smart Contract Audit Status: ${formData.smartContractAuditStatus}` : null,
        formData.timeline ? `Timeline: ${formData.timeline}` : null,
        formData.preferredContactMethod ? `Preferred Contact Method: ${formData.preferredContactMethod}` : null
      ].filter(Boolean).join(' | ');

      const mappedDescription = [
        formData.ictRiskManagement ? `ICT Risk Management: ${formData.ictRiskManagement}` : null,
        formData.ictThirdPartyRisk ? `ICT Third-Party Risk: ${formData.ictThirdPartyRisk}` : null,
        formData.digitalResilienceTesting ? `Digital Resilience Testing: ${formData.digitalResilienceTesting}` : null,
        formData.ictIncidentReporting ? `ICT Incident Reporting: ${formData.ictIncidentReporting}` : null,
        formData.informationSharing ? `Information Sharing: ${formData.informationSharing}` : null,
        formData.criticalThirdPartyOversight ? `Critical Third-Party Oversight: ${formData.criticalThirdPartyOversight}` : null,
        formData.complianceDeadlineAwareness ? `Compliance Deadline Awareness: ${formData.complianceDeadlineAwareness}` : null,
        formData.additionalComments ? `Additional Comments: ${formData.additionalComments}` : null
      ].filter(Boolean).join('\n');

      const quoteFormData = {
        name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        service: mappedService,
        description: mappedDescription,
        budget: formData.estimatedBudget,
        companySize: formData.companySize
      };

      const response = await fetch('https://og-technologies.herokuapp.com/api/quote/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteFormData),
      });

      if (response.ok) {
        const score = calculateComplianceScore();
        setComplianceScore(score);
        setSubmitSuccess(true);
        setShowModal(true);
        toast.success('DORA assessment submitted successfully!');
      } else {
        throw new Error('Failed to submit assessment');
      }
    } catch (error) {
      console.error('Error submitting DORA assessment:', error);
      setSubmissionError(error.message || 'Failed to submit assessment. Please try again.');
      setShowModal(true);
      toast.error('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const MultiSelectCheckbox = ({ label, name, options, value }) => (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-medium mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => handleMultiSelectChange(name, option)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800"
            />
            <span className="text-gray-300 text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );


  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">DORA Compliance Assessment Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1 - Company Information */}
        <div className="border-b border-gray-700 pb-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">1. Company Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Company Name *</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Contact Person Name *</label>
              <input
                type="text"
                name="contactName"
                required
                value={formData.contactName}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Company Size *</label>
              <select
                name="companySize"
                required
                value={formData.companySize}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>

            <MultiSelectCheckbox
              label="Company Type (select all that apply) *"
              name="companyType"
              options={['Fintech Startup', 'Traditional Bank', 'Payment Processor', 'Crypto Exchange', 'DeFi Protocol', 'Web3 Infrastructure', 'Other']}
              value={formData.companyType}
            />
          </div>
        </div>

        {/* Section 2 - Technology Stack */}
        <div className="border-b border-gray-700 pb-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">2. Technology Stack</h3>
          
          <div className="space-y-4">
            <MultiSelectCheckbox
              label="Blockchain/DLT Platforms Used (select all that apply)"
              name="blockchainPlatforms"
              options={['Ethereum', 'Solana', 'Polygon', 'Binance Smart Chain', 'Hyperledger', 'Corda', 'Polkadot', 'Avalanche', 'Stellar', 'EBSI', 'Other', 'None']}
              value={formData.blockchainPlatforms}
            />

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Primary Technology Focus *</label>
              <select
                name="primaryTechFocus"
                required
                value={formData.primaryTechFocus}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select primary focus</option>
                <option value="Smart Contracts">Smart Contracts</option>
                <option value="DeFi">DeFi</option>
                <option value="Payments">Payments</option>
                <option value="Digital Assets">Digital Assets</option>
                <option value="Identity/Verifiable Credentials">Identity/Verifiable Credentials</option>
                <option value="Supply Chain">Supply Chain</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <MultiSelectCheckbox
              label="Web3 Protocols (select all that apply)"
              name="web3Protocols"
              options={['IPFS', 'DID', 'ERC-20/721/1155', 'ENS', 'Lens Protocol', 'Other', 'None']}
              value={formData.web3Protocols}
            />

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Smart Contract Audit Status *</label>
              <select
                name="smartContractAuditStatus"
                required
                value={formData.smartContractAuditStatus}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select audit status</option>
                <option value="Audited">Audited</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Audited">Not Audited</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3 - DORA Compliance Assessment */}
        <div className="border-b border-gray-700 pb-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">3. DORA Compliance Assessment</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">ICT Risk Management Framework</label>
              <select
                name="ictRiskManagement"
                value={formData.ictRiskManagement}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select status</option>
                <option value="Implemented">Implemented</option>
                <option value="Partially Implemented">Partially Implemented</option>
                <option value="Planning Phase">Planning Phase</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">ICT Third-Party Risk Management</label>
              <select
                name="ictThirdPartyRisk"
                value={formData.ictThirdPartyRisk}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select status</option>
                <option value="Implemented">Implemented</option>
                <option value="Partially Implemented">Partially Implemented</option>
                <option value="Planning Phase">Planning Phase</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Digital Operational Resilience Testing</label>
              <select
                name="digitalResilienceTesting"
                value={formData.digitalResilienceTesting}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select status</option>
                <option value="Regular Testing">Regular Testing</option>
                <option value="Occasional Testing">Occasional Testing</option>
                <option value="Planning Phase">Planning Phase</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">ICT Incident Reporting Capabilities</label>
              <select
                name="ictIncidentReporting"
                value={formData.ictIncidentReporting}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select status</option>
                <option value="Full Capabilities">Full Capabilities</option>
                <option value="Partial Capabilities">Partial Capabilities</option>
                <option value="Planning Phase">Planning Phase</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Information Sharing Mechanisms</label>
              <select
                name="informationSharing"
                value={formData.informationSharing}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select status</option>
                <option value="Active Participation">Active Participation</option>
                <option value="Limited Participation">Limited Participation</option>
                <option value="Planning Phase">Planning Phase</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Critical Third-Party Provider Oversight</label>
              <select
                name="criticalThirdPartyOversight"
                value={formData.criticalThirdPartyOversight}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select status</option>
                <option value="Comprehensive Oversight">Comprehensive Oversight</option>
                <option value="Basic Oversight">Basic Oversight</option>
                <option value="Planning Phase">Planning Phase</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Current Compliance Deadline Awareness</label>
              <select
                name="complianceDeadlineAwareness"
                value={formData.complianceDeadlineAwareness}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select awareness level</option>
                <option value="January 2025">January 2025</option>
                <option value="Aware but Uncertain of Date">Aware but Uncertain of Date</option>
                <option value="Not Aware">Not Aware</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4 - Project Details */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-4">4. Project Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Estimated Budget for Compliance Services *</label>
              <select
                name="estimatedBudget"
                required
                value={formData.estimatedBudget}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select budget range</option>
                <option value="€10k-€50k">€10k-€50k</option>
                <option value="€50k-€100k">€50k-€100k</option>
                <option value="€100k-€250k">€100k-€250k</option>
                <option value="€250k-€500k">€250k-€500k</option>
                <option value="€500k+">€500k+</option>
                <option value="To Be Determined">To Be Determined</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Timeline for Compliance *</label>
              <select
                name="timeline"
                required
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select timeline</option>
                <option value="Immediate (<3 months)">Immediate (&lt;3 months)</option>
                <option value="Short-term (3-6 months)">Short-term (3-6 months)</option>
                <option value="Medium-term (6-12 months)">Medium-term (6-12 months)</option>
                <option value="Long-term (12+ months)">Long-term (12+ months)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Preferred Contact Method *</label>
              <select
                name="preferredContactMethod"
                required
                value={formData.preferredContactMethod}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select contact method</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Video Call">Video Call</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Additional Comments/Requirements</label>
              <textarea
                name="additionalComments"
                rows={4}
                value={formData.additionalComments}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Any additional information about your compliance needs..."
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
        </button>

        <p className="text-gray-400 text-xs text-center">
          By submitting this form, you agree to our privacy policy. We'll use your information to assess your DORA compliance needs and provide relevant services.
        </p>
      </form>

      {/* Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {submitSuccess ? 'Submission Successful' : 'Submission Failed'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Status Icon */}
              <div className="text-center mb-6">
                {submitSuccess ? (
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                )}
                <p className="text-gray-300">
                  {submitSuccess 
                    ? 'Your DORA compliance assessment has been submitted successfully.'
                    : submissionError || 'There was an error submitting your assessment.'}
                </p>
              </div>

              {/* Compliance Score (only show on success) */}
              {submitSuccess && (
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-6 border border-purple-500/30 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Your Compliance Score</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-white">{complianceScore}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${complianceScore}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm mt-3 text-center">
                    {complianceScore >= 75 ? 'Strong compliance posture' : 
                     complianceScore >= 50 ? 'Moderate compliance - areas for improvement' :
                     'Significant compliance gaps - immediate attention needed'}
                  </p>
                </div>
              )}

              {/* Submitted Information */}
              <div className="bg-gray-700 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Submitted Information</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-purple-400 font-medium">Company Name:</span>
                    <span className="text-gray-300 ml-2">{formData.companyName}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Contact Person:</span>
                    <span className="text-gray-300 ml-2">{formData.contactName}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Email:</span>
                    <span className="text-gray-300 ml-2">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Phone:</span>
                    <span className="text-gray-300 ml-2">{formData.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Company Size:</span>
                    <span className="text-gray-300 ml-2">{formData.companySize}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Company Type:</span>
                    <span className="text-gray-300 ml-2">{formData.companyType.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Blockchain Platforms:</span>
                    <span className="text-gray-300 ml-2">{formData.blockchainPlatforms.join(', ') || 'None'}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Primary Tech Focus:</span>
                    <span className="text-gray-300 ml-2">{formData.primaryTechFocus}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Web3 Protocols:</span>
                    <span className="text-gray-300 ml-2">{formData.web3Protocols.join(', ') || 'None'}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Smart Contract Audit Status:</span>
                    <span className="text-gray-300 ml-2">{formData.smartContractAuditStatus}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">ICT Risk Management:</span>
                    <span className="text-gray-300 ml-2">{formData.ictRiskManagement}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">ICT Third-Party Risk:</span>
                    <span className="text-gray-300 ml-2">{formData.ictThirdPartyRisk}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Digital Resilience Testing:</span>
                    <span className="text-gray-300 ml-2">{formData.digitalResilienceTesting}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">ICT Incident Reporting:</span>
                    <span className="text-gray-300 ml-2">{formData.ictIncidentReporting}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Information Sharing:</span>
                    <span className="text-gray-300 ml-2">{formData.informationSharing}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Critical Third-Party Oversight:</span>
                    <span className="text-gray-300 ml-2">{formData.criticalThirdPartyOversight}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Compliance Deadline Awareness:</span>
                    <span className="text-gray-300 ml-2">{formData.complianceDeadlineAwareness}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Estimated Budget:</span>
                    <span className="text-gray-300 ml-2">{formData.estimatedBudget}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Timeline:</span>
                    <span className="text-gray-300 ml-2">{formData.timeline}</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Preferred Contact Method:</span>
                    <span className="text-gray-300 ml-2">{formData.preferredContactMethod}</span>
                  </div>
                  {formData.additionalComments && (
                    <div>
                      <span className="text-purple-400 font-medium">Additional Comments:</span>
                      <span className="text-gray-300 ml-2">{formData.additionalComments}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-md font-semibold transition duration-150 ease-in-out"
                >
                  Close
                </button>
                {submitSuccess && (
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSubmitSuccess(false);
                      setFormData({
                        companyName: '',
                        contactName: '',
                        email: '',
                        phone: '',
                        companySize: '',
                        companyType: [],
                        blockchainPlatforms: [],
                        primaryTechFocus: '',
                        web3Protocols: [],
                        smartContractAuditStatus: '',
                        ictRiskManagement: '',
                        ictThirdPartyRisk: '',
                        digitalResilienceTesting: '',
                        ictIncidentReporting: '',
                        informationSharing: '',
                        criticalThirdPartyOversight: '',
                        complianceDeadlineAwareness: '',
                        estimatedBudget: '',
                        timeline: '',
                        additionalComments: '',
                        preferredContactMethod: ''
                      });
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition duration-150 ease-in-out"
                  >
                    Submit Another Assessment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoraForm;
