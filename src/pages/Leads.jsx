import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import ProtectedRoute from '../components/ProtectedRoute';

// Sample leads data
const sampleLeads = [
  { id: 1, name: 'Acme Corp Deal', company: 'Acme Corporation', contact: 'John Doe', email: 'john@acme.com', value: 50000, stage: 'new', priority: 'high', source: 'Website', lastActivity: '2 hours ago' },
  { id: 2, name: 'TechStart Partnership', company: 'TechStart Inc', contact: 'Jane Smith', email: 'jane@techstart.com', value: 75000, stage: 'qualified', priority: 'high', source: 'Referral', lastActivity: '1 day ago' },
  { id: 3, name: 'Enterprise Solution', company: 'Big Enterprise', contact: 'Mike Johnson', email: 'mike@bigenterprise.com', value: 120000, stage: 'proposition', priority: 'medium', source: 'Email Campaign', lastActivity: '3 days ago' },
  { id: 4, name: 'SMB Package', company: 'SmallBiz Co', contact: 'Sarah Williams', email: 'sarah@smallbiz.com', value: 15000, stage: 'negotiation', priority: 'low', source: 'Social Media', lastActivity: '5 hours ago' },
  { id: 5, name: 'Startup Deal', company: 'New Startup', contact: 'David Brown', email: 'david@startup.com', value: 25000, stage: 'won', priority: 'medium', source: 'Event', lastActivity: '1 week ago' },
  { id: 6, name: 'Lost Opportunity', company: 'Competitor Win', contact: 'Tom Wilson', email: 'tom@competitor.com', value: 30000, stage: 'lost', priority: 'low', source: 'Cold Call', lastActivity: '2 weeks ago' }
];

const stages = [
  { id: 'new', name: 'New', color: 'gray' },
  { id: 'qualified', name: 'Qualified', color: 'blue' },
  { id: 'proposition', name: 'Proposition', color: 'yellow' },
  { id: 'negotiation', name: 'Negotiation', color: 'purple' },
  { id: 'won', name: 'Won', color: 'green' },
  { id: 'lost', name: 'Lost', color: 'red' }
];

function Leads() {
  const [leads, setLeads] = useState(sampleLeads);
  const [draggedLead, setDraggedLead] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('pipeline'); // 'pipeline' or 'list'

  const handleDragStart = (lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    if (draggedLead) {
      const updatedLeads = leads.map(lead => 
        lead.id === draggedLead.id ? { ...lead, stage: stageId } : lead
      );
      setLeads(updatedLeads);
      setDraggedLead(null);
    }
  };

  const handleAddLead = (newLead) => {
    const lead = {
      ...newLead,
      id: Math.max(...leads.map(l => l.id), 0) + 1,
      stage: 'new',
      lastActivity: 'Just now'
    };
    setLeads([...leads, lead]);
    setShowAddModal(false);
  };

  const getTotalValue = () => leads.reduce((sum, lead) => sum + (lead.stage !== 'lost' ? lead.value : 0), 0);
  const getWonValue = () => leads.filter(l => l.stage === 'won').reduce((sum, lead) => sum + lead.value, 0);

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
                <div className="mt-4 md:mt-0 flex gap-3">
                  <div className="flex bg-gray-800 rounded-md p-1">
                    <button
                      onClick={() => setViewMode('pipeline')}
                      className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                        viewMode === 'pipeline' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Pipeline
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                        viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      List
                    </button>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out flex items-center"
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
                  <p className="text-3xl font-bold text-white">€{getTotalValue().toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-lg p-6 border border-green-500/30">
                  <p className="text-gray-400 text-sm">Won Deals</p>
                  <p className="text-3xl font-bold text-white">€{getWonValue().toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-500/30">
                  <p className="text-gray-400 text-sm">Active Leads</p>
                  <p className="text-3xl font-bold text-white">{leads.filter(l => l.stage !== 'won' && l.stage !== 'lost').length}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 rounded-lg p-6 border border-yellow-500/30">
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-3xl font-bold text-white">
                    {Math.round((leads.filter(l => l.stage === 'won').length / leads.filter(l => l.stage === 'won' || l.stage === 'lost').length) * 100) || 0}%
                  </p>
                </div>
              </div>

              {/* Pipeline View */}
              {viewMode === 'pipeline' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {stages.map((stage) => {
                    const stageLeads = leads.filter(lead => lead.stage === stage.id);
                    const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);
                    
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
                          {stageLeads.map((lead) => (
                            <div
                              key={lead.id}
                              draggable
                              onDragStart={() => handleDragStart(lead)}
                              className={`bg-gray-800 p-3 rounded-lg border border-gray-700 cursor-move hover:border-${stage.color}-500/50 transition duration-150 ease-in-out`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-medium text-sm">{lead.name}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  lead.priority === 'high' ? 'bg-red-600 text-white' :
                                  lead.priority === 'medium' ? 'bg-yellow-600 text-white' :
                                  'bg-gray-600 text-gray-300'
                                }`}>
                                  {lead.priority}
                                </span>
                              </div>
                              <p className="text-gray-400 text-xs mb-1">{lead.company}</p>
                              <p className="text-gray-500 text-xs mb-2">{lead.contact}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-purple-400 text-sm font-semibold">€{lead.value.toLocaleString()}</span>
                                <span className="text-gray-500 text-xs">{lead.lastActivity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List View */
                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="p-4 text-left text-gray-300 font-semibold">Lead Name</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Company</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Value</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Stage</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Priority</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Source</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Last Activity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-700/50">
                          <td className="p-4">
                            <div>
                              <p className="text-white font-medium">{lead.name}</p>
                              <p className="text-gray-400 text-sm">{lead.contact}</p>
                            </div>
                          </td>
                          <td className="p-4 text-white">{lead.company}</td>
                          <td className="p-4 text-purple-400 font-semibold">€{lead.value.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              lead.stage === 'new' ? 'bg-gray-600 text-gray-300' :
                              lead.stage === 'qualified' ? 'bg-blue-600 text-white' :
                              lead.stage === 'proposition' ? 'bg-yellow-600 text-white' :
                              lead.stage === 'negotiation' ? 'bg-purple-600 text-white' :
                              lead.stage === 'won' ? 'bg-green-600 text-white' :
                              'bg-red-600 text-white'
                            }`}>
                              {lead.stage}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              lead.priority === 'high' ? 'bg-red-600 text-white' :
                              lead.priority === 'medium' ? 'bg-yellow-600 text-white' :
                              'bg-gray-600 text-gray-300'
                            }`}>
                              {lead.priority}
                            </span>
                          </td>
                          <td className="p-4 text-gray-400">{lead.source}</td>
                          <td className="p-4 text-gray-400">{lead.lastActivity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
    priority: 'medium',
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
              <label className="block text-gray-400 text-sm mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
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
