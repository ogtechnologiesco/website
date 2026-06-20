import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import ProtectedRoute from '../components/ProtectedRoute';
import { crmAPI } from '../services/api';
import toast from 'react-hot-toast';

const stages = [
  { id: 'new', name: 'New', color: 'gray' },
  { id: 'qualified', name: 'Qualified', color: 'blue' },
  { id: 'proposition', name: 'Proposition', color: 'yellow' },
  { id: 'negotiation', name: 'Negotiation', color: 'purple' },
  { id: 'won', name: 'Won', color: 'green' },
  { id: 'lost', name: 'Lost', color: 'red' }
];

function Leads() {
  const [leads, setLeads] = useState([]);
  const [draggedLead, setDraggedLead] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('pipeline');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      
      const response = await crmAPI.getLeads(params);
      setLeads(response.leads || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, stageId) => {
    e.preventDefault();
    if (draggedLead) {
      try {
        await crmAPI.updateLead(draggedLead._id || draggedLead.id, { status: stageId });
        toast.success('Lead stage updated');
        fetchLeads();
      } catch (error) {
        console.error('Error updating lead stage:', error);
        toast.error('Failed to update lead stage');
      }
      setDraggedLead(null);
    }
  };

  const handleAddLead = async (newLead) => {
    try {
      const leadData = {
        name: newLead.name,
        email: newLead.email,
        phone: newLead.contact,
        status: 'new',
        source: newLead.source,
        value: parseInt(newLead.value) || 0,
        customFields: {}
      };
      
      // Only include company if it's a valid MongoDB ObjectId (24 hex characters)
      // Otherwise, store company name in customFields
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      if (newLead.company && objectIdRegex.test(newLead.company)) {
        leadData.company = newLead.company;
      } else if (newLead.company) {
        leadData.customFields.companyName = newLead.company;
      }
      
      await crmAPI.createLead(leadData);
      toast.success('Lead created successfully');
      setShowAddModal(false);
      fetchLeads();
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error('Failed to create lead');
    }
  };

  const getTotalValue = () => leads.reduce((sum, lead) => sum + (lead.status !== 'lost' ? (lead.value || 0) : 0), 0);
  const getWonValue = () => leads.filter(l => l.status === 'won').reduce((sum, lead) => sum + (lead.value || 0), 0);

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
        <Header />
        
        <main className="grow">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <PageIllustration />
            
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                  <h1 className="h1 mb-2">Leads & Pipeline</h1>
                  <p className="text-xl text-gray-400">Manage your sales pipeline</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3 relative z-10">
                  <div className="flex bg-gray-800 rounded-md p-1">
                    <button
                      onClick={() => setViewMode('pipeline')}
                      className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out cursor-pointer ${
                        viewMode === 'pipeline' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Pipeline
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out cursor-pointer ${
                        viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      List
                    </button>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out flex items-center cursor-pointer"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add Lead
                  </button>
                </div>
              </div>

              {/* Pipeline Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-lg p-6 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Total Pipeline Value</p>
                  <p className="text-3xl font-bold text-white">{loading ? '-' : `€${getTotalValue().toLocaleString()}`}</p>
                </div>
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-lg p-6 border border-green-500/30">
                  <p className="text-gray-400 text-sm">Won Deals</p>
                  <p className="text-3xl font-bold text-white">{loading ? '-' : `€${getWonValue().toLocaleString()}`}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-500/30">
                  <p className="text-gray-400 text-sm">Active Leads</p>
                  <p className="text-3xl font-bold text-white">{loading ? '-' : leads.filter(l => l.status !== 'won' && l.status !== 'lost').length}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 rounded-lg p-6 border border-yellow-500/30">
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-3xl font-bold text-white">
                    {loading ? '-' : `${Math.round((leads.filter(l => l.status === 'won').length / Math.max(1, leads.filter(l => l.status === 'won' || l.status === 'lost').length)) * 100)}%`}
                  </p>
                </div>
              </div>

              {/* Pipeline View */}
              {viewMode === 'pipeline' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {stages.map((stage) => {
                    const stageLeads = leads.filter(lead => lead.status === stage.id);
                    const stageValue = stageLeads.reduce((sum, lead) => sum + (lead.value || 0), 0);
                    
                    return (
                      <div
                        key={stage.id}
                        className={`bg-${stage.color}-900/20 rounded-lg border border-${stage.color}-500/30 min-h-[500px]`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, stage.id)}
                      >
                        <div className={`p-4 border-b border-${stage.color}-500/30 bg-${stage.color}-900/30`}>
                          <div className="flex justify-between items-center">
                            <h3 className={`font-semibold text-${stage.color}-300`}>{stage.name}</h3>
                            <span className={`text-${stage.color}-300 text-sm`}>{stageLeads.length}</span>
                          </div>
                          <p className={`text-${stage.color}-400 text-xs mt-1`}>€{stageValue.toLocaleString()}</p>
                        </div>
                        
                        <div className="p-3 space-y-3">
                          {loading ? (
                            <p className="text-gray-400 text-xs text-center">Loading...</p>
                          ) : stageLeads.length === 0 ? (
                            <p className="text-gray-500 text-xs text-center">No leads</p>
                          ) : (
                            stageLeads.map((lead) => (
                              <div
                                key={lead._id || lead.id}
                                draggable
                                onDragStart={() => handleDragStart(lead)}
                                className={`bg-gray-800 p-3 rounded-lg border border-gray-700 cursor-move hover:border-${stage.color}-500/50 transition duration-150 ease-in-out`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-white font-medium text-sm">{lead.name}</h4>
                                </div>
                                <p className="text-gray-400 text-xs mb-1">{lead.company || '-'}</p>
                                <p className="text-gray-500 text-xs mb-2">{lead.email || lead.phone || '-'}</p>
                                <div className="flex justify-between items-center">
                                  <span className="text-purple-400 text-sm font-semibold">€{(lead.value || 0).toLocaleString()}</span>
                                  <span className="text-gray-500 text-xs">{lead.updatedAt ? new Date(lead.updatedAt).toLocaleDateString() : 'Never'}</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List View */
                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  {loading ? (
                    <div className="p-8 text-center">
                      <p className="text-gray-400">Loading leads...</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="p-4 text-left text-gray-300 font-semibold">Lead Name</th>
                          <th className="p-4 text-left text-gray-300 font-semibold">Company</th>
                          <th className="p-4 text-left text-gray-300 font-semibold">Value</th>
                          <th className="p-4 text-left text-gray-300 font-semibold">Stage</th>
                          <th className="p-4 text-left text-gray-300 font-semibold">Source</th>
                          <th className="p-4 text-left text-gray-300 font-semibold">Last Activity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {leads.map((lead) => (
                          <tr key={lead._id || lead.id} className="hover:bg-gray-700/50">
                            <td className="p-4">
                              <div>
                                <p className="text-white font-medium">{lead.name}</p>
                                <p className="text-gray-400 text-sm">{lead.email || lead.phone || '-'}</p>
                              </div>
                            </td>
                            <td className="p-4 text-white">{lead.company || '-'}</td>
                            <td className="p-4 text-purple-400 font-semibold">€{(lead.value || 0).toLocaleString()}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                lead.status === 'new' ? 'bg-gray-600 text-gray-300' :
                                lead.status === 'qualified' ? 'bg-blue-600 text-white' :
                                lead.status === 'proposition' ? 'bg-yellow-600 text-white' :
                                lead.status === 'negotiation' ? 'bg-purple-600 text-white' :
                                lead.status === 'won' ? 'bg-green-600 text-white' :
                                'bg-red-600 text-white'
                              }`}>
                                {lead.status || 'Unknown'}
                              </span>
                            </td>
                            <td className="p-4 text-gray-400">{lead.source || '-'}</td>
                            <td className="p-4 text-gray-400">{lead.updatedAt ? new Date(lead.updatedAt).toLocaleDateString() : 'Never'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {!loading && leads.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-gray-400 text-lg">No leads found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <AddLeadModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={handleAddLead}
        />
      )}
    </ProtectedRoute>
  );
}

function AddLeadModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
    email: '',
    value: '',
    source: 'Website'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      value: parseInt(formData.value) || 0
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Lead Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              placeholder="e.g., Enterprise Deal"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Company</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Contact Person</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Value (€)</label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Email Campaign">Email Campaign</option>
                <option value="Social Media">Social Media</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Event">Event</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition duration-150 ease-in-out"
            >
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Leads;
