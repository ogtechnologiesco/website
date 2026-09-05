import React, { useState } from 'react';

const INITIAL_DATA = {
  contactName: '',
  email: '',
  phone: '',
  companyName: '',
  companySize: '',
  blockchainNetwork: [],
  useCase: '',
  identity: '',
  payments: '',
  jurisdiction: [],
  dataHandled: [],
  targetMarket: [],
  additionalComments: '',
};

const BLOCKCHAIN_OPTIONS = [
  'Ethereum', 'Solana', 'Polygon', 'Hyperledger', 'Corda',
  'EBSI', 'Polkadot', 'Avalanche', 'Stellar', 'Other',
];

const USE_CASE_OPTIONS = [
  'Digital Identity', 'Payments/DeFi', 'Supply Chain', 'Tokenized Assets',
  'Data Marketplace', 'NFT/Creator', 'Governance', 'Other',
];

const IDENTITY_OPTIONS = [
  'W3C Verifiable Credentials', 'DIDs', 'EBSI Diplomas',
  'Self-Sovereign Identity', 'None',
];

const PAYMENT_OPTIONS = [
  'Crypto Payments', 'CBDC', 'Stablecoins', 'Traditional Bridge',
  'ISO 20022 Integration', 'None',
];

const JURISDICTION_OPTIONS = ['EU', 'UK', 'US', 'APAC', 'LATAM', 'Global/Other'];

const DATA_OPTIONS = [
  'Personal Data (PII)', 'Financial Data', 'Health Data',
  'Credential Data', 'Public/On-chain Only',
];

const MARKET_OPTIONS = ['EU/EEA', 'UK', 'US', 'APAC', 'LATAM', 'Global'];

function MultiSelectCheckbox({ label, name, options, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-medium mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => onChange(name, option)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800"
            />
            <span className="text-gray-300 text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ComplianceForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name, value) => {
    setFormData((prev) => {
      const currentArray = prev[name] || [];
      if (currentArray.includes(value)) {
        return { ...prev, [name]: currentArray.filter((item) => item !== value) };
      }
      return { ...prev, [name]: [...currentArray, value] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Blockchain Compliance Assessment Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Section 1 — Contact Information */}
        <div className="border-b border-gray-700 pb-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">1. Contact Information</h3>
          <div className="space-y-4">
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
          </div>
        </div>

        {/* Section 2 — Project Details */}
        <div className="border-b border-gray-700 pb-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">2. Project Details</h3>
          <div className="space-y-4">
            <MultiSelectCheckbox
              label="Blockchain / Network (select all that apply) *"
              name="blockchainNetwork"
              options={BLOCKCHAIN_OPTIONS}
              value={formData.blockchainNetwork}
              onChange={handleMultiSelectChange}
            />
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Primary Use Case *</label>
              <select
                name="useCase"
                required
                value={formData.useCase}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select primary use case</option>
                {USE_CASE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Identity / Credentials Approach</label>
              <select
                name="identity"
                value={formData.identity}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select identity approach</option>
                {IDENTITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Payments Integration</label>
              <select
                name="payments"
                value={formData.payments}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select payments approach</option>
                {PAYMENT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3 — Regulatory Context */}
        <div className="border-b border-gray-700 pb-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">3. Regulatory Context</h3>
          <div className="space-y-4">
            <MultiSelectCheckbox
              label="Jurisdiction(s) (select all that apply)"
              name="jurisdiction"
              options={JURISDICTION_OPTIONS}
              value={formData.jurisdiction}
              onChange={handleMultiSelectChange}
            />
            <MultiSelectCheckbox
              label="Data Handled (select all that apply)"
              name="dataHandled"
              options={DATA_OPTIONS}
              value={formData.dataHandled}
              onChange={handleMultiSelectChange}
            />
            <MultiSelectCheckbox
              label="Target Market(s) (select all that apply)"
              name="targetMarket"
              options={MARKET_OPTIONS}
              value={formData.targetMarket}
              onChange={handleMultiSelectChange}
            />
          </div>
        </div>

        {/* Section 4 — Additional Information */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-4">4. Additional Information</h3>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Additional Comments</label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              placeholder="Any additional context about your project, specific compliance concerns, or questions..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating Compliance Roadmap...
            </>
          ) : (
            'Generate Compliance Roadmap'
          )}
        </button>
      </form>
    </div>
  );
}

export default ComplianceForm;
