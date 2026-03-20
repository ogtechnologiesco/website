import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import ProtectedRoute from '../components/ProtectedRoute';

// Sample opportunities data
const sampleOpportunities = [
  { id: 1, name: 'Enterprise Software License', company: 'TechCorp Global', contact: 'Sarah Johnson', email: 'sarah@techcorp.com', value: 150000, probability: 75, stage: 'proposal', expectedClose: '2024-04-15', priority: 'high', source: 'Website', lastActivity: '2 hours ago', description: 'Full enterprise package including CRM, Helpdesk, and custom integrations' },
  { id: 2, name: 'CRM Implementation', company: 'StartupXYZ', contact: 'Mike Chen', email: 'mike@startupxyz.com', value: 45000, probability: 60, stage: 'negotiation', expectedClose: '2024-03-30', priority: 'medium', source: 'Referral', lastActivity: '1 day ago', description: 'CRM setup for 25 users with training and support' },
  { id: 3, name: 'Annual Subscription Renewal', company: 'Acme Corporation', contact: 'John Smith', email: 'john@acme.com', value: 85000, probability: 90, stage: 'closed_won', expectedClose: '2024-03-01', priority: 'high', source: 'Existing Customer', lastActivity: '3 days ago', description: '3-year enterprise subscription renewal' },
  { id: 4, name: 'Helpdesk Integration', company: 'ServicePro Ltd', contact: 'Lisa Williams', email: 'lisa@servicepro.com', value: 32000, probability: 40, stage: 'discovery', expectedClose: '2024-05-10', priority: 'medium', source: 'Trade Show', lastActivity: '5 hours ago', description: 'Integration with existing Zendesk setup' },
  { id: 5, name: 'Custom Development', company: 'InnovateTech', contact: 'David Brown', email: 'david@innovatetech.com', value: 120000, probability: 30, stage: 'qualification', expectedClose: '2024-06-20', priority: 'high', source: 'Partner Referral', lastActivity: '1 week ago', description: 'Custom AI-powered analytics module development' },
  { id: 6, name: 'Training Package', company: 'LearnFast Inc', contact: 'Emma Davis', email: 'emma@learnfast.com', value: 18000, probability: 80, stage: 'proposal', expectedClose: '2024-04-05', priority: 'low', source: 'Email Campaign', lastActivity: '2 days ago', description: 'Team training for 50 users across 3 departments' }
];

const stages = [
  { id: 'discovery', name: 'Discovery', color: 'gray', probability: 10 },
  { id: 'qualification', name: 'Qualification', color: 'blue', probability: 25 },
  { id: 'proposal', name: 'Proposal', color: 'yellow', probability: 50 },
  { id: 'negotiation', name: 'Negotiation', color: 'purple', probability: 75 },
  { id: 'closed_won', name: 'Closed Won', color: 'green', probability: 100 },
  { id: 'closed_lost', name: 'Closed Lost', color: 'red', probability: 0 }
];

function Opportunities() {
  const [opportunities, setOpportunities] = useState(sampleOpportunities);
  const [filteredOpps, setFilteredOpps] = useState(sampleOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('pipeline');

  // Calculate stats
  const stats = {
    totalValue: opportunities.reduce((sum, opp) => sum + opp.value, 0),
    weightedValue: opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0),
    wonValue: opportunities.filter(o => o.stage === 'closed_won').reduce((sum, opp) => sum + opp.value, 0),
    activeCount: opportunities.filter(o => !['closed_won', 'closed_lost'].includes(o.stage)).length,
    winRate: Math.round((opportunities.filter(o => o.stage === 'closed_won').length / 
      opportunities.filter(o => ['closed_won', 'closed_lost'].includes(o.stage)).length) * 100) || 0
  };

  // Filter opportunities
  useEffect(() => {
    let filtered = opportunities;
    
    if (searchTerm) {
      filtered = filtered.filter(opp => 
        opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.contact.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (stageFilter !== 'all') {
      filtered = filtered.filter(opp => opp.stage === stageFilter);
    }
    
    setFilteredOpps(filtered);
  }, [opportunities, searchTerm, stageFilter]);

  const handleAddOpportunity = (oppData) => {
    const newOpp = {
      ...oppData,
      id: Math.max(...opportunities.map(o => o.id), 0) + 1,
      lastActivity: 'Just now'
    };
    setOpportunities([...opportunities, newOpp]);
    setShowAddModal(false);
  };

  const updateStage = (oppId, newStage) => {
    const stage = stages.find(s => s.id === newStage);
    setOpportunities(opportunities.map(opp => 
      opp.id === oppId ? { ...opp, stage: newStage, probability: stage?.probability || opp.probability } : opp
    ));
  };

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
                  <h1 className="h1 mb-2">Opportunities</h1>
                  <p className="text-xl text-gray-400">Track and manage sales opportunities</p>
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
                    Add Opportunity
                  </button>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-500/30">
                  <p className="text-gray-400 text-sm">Total Pipeline</p>
                  <p className="text-3xl font-bold text-white">€{stats.totalValue.toLocaleString()}</p>
                  <p className="text-purple-400 text-sm mt-1">{stats.activeCount} active</p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-lg p-6 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Weighted Value</p>
                  <p className="text-3xl font-bold text-white">€{Math.round(stats.weightedValue).toLocaleString()}</p>
                  <p className="text-blue-400 text-sm mt-1">Expected revenue</p>
                </div>

                <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-lg p-6 border border-green-500/30">
                  <p className="text-gray-400 text-sm">Won Deals</p>
                  <p className="text-3xl font-bold text-white">€{stats.wonValue.toLocaleString()}</p>
                  <p className="text-green-400 text-sm mt-1">This period</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 rounded-lg p-6 border border-yellow-500/30">
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-3xl font-bold text-white">{stats.winRate}%</p>
                  <p className="text-yellow-400 text-sm mt-1">Conversion</p>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search opportunities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={stageFilter}
                      onChange={(e) => setStageFilter(e.target.value)}
                      className="bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="all">All Stages</option>
                      {stages.map(stage => (
                        <option key={stage.id} value={stage.id}>{stage.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {setSearchTerm(''); setStageFilter('all');}}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md transition duration-150 ease-in-out"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Pipeline View */}
              {viewMode === 'pipeline' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {stages.map((stage) => {
                    const stageOpps = filteredOpps.filter(opp => opp.stage === stage.id);
                    const stageValue = stageOpps.reduce((sum, opp) => sum + opp.value, 0);
                    
                    return (
                      <div key={stage.id} className={`bg-${stage.color}-900/20 rounded-lg border border-${stage.color}-500/30 min-h-[500px]`}>
                        <div className={`p-4 border-b border-${stage.color}-500/30 bg-${stage.color}-900/30`}>
                          <div className="flex justify-between items-center">
                            <h3 className={`font-semibold text-${stage.color}-300`}>{stage.name}</h3>
                            <span className={`text-${stage.color}-300 text-sm`}>{stageOpps.length}</span>
                          </div>
                          <p className={`text-${stage.color}-400 text-xs mt-1`}>€{stageValue.toLocaleString()}</p>
                        </div>
                        
                        <div className="p-3 space-y-3">
                          {stageOpps.map((opp) => (
                            <div key={opp.id} className={`bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-${stage.color}-500/50 transition duration-150 ease-in-out`}>
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-medium text-sm">{opp.name}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  opp.priority === 'high' ? 'bg-red-600 text-white' :
                                  opp.priority === 'medium' ? 'bg-yellow-600 text-white' :
                                  'bg-gray-600 text-gray-300'
                                }`}>
                                  {opp.priority}
                                </span>
                              </div>
                              <p className="text-gray-400 text-xs mb-1">{opp.company}</p>
                              <p className="text-gray-500 text-xs mb-2">{opp.contact}</p>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-purple-400 text-sm font-semibold">€{opp.value.toLocaleString()}</span>
                                <span className="text-gray-400 text-xs">{opp.probability}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-1 mb-2">
                <div 
                  className={`bg-${stage.color}-500 h-1 rounded-full`} 
                  style={{ width: `${opp.probability}%` }}
                ></div>
                              </div>
                              <p className="text-gray-500 text-xs">Close: {opp.expectedClose}</p>
                              
                              {/* Stage Actions */}
                              {!['closed_won', 'closed_lost'].includes(opp.stage) && (
                                <div className="mt-2 flex gap-1">
                                  {stages
                                    .filter(s => !['closed_won', 'closed_lost'].includes(s.id) && s.id !== opp.stage)
                                    .slice(0, 2)
                                    .map(s => (
                                      <button
                                        key={s.id}
                                        onClick={() => updateStage(opp.id, s.id)}
                                        className={`px-2 py-1 bg-${s.color}-600/30 text-${s.color}-300 rounded text-xs hover:bg-${s.color}-600/50 transition duration-150 ease-in-out`}
                                      >
                                        → {s.name}
                                      </button>
                                    ))}
                                  <button
                                    onClick={() => updateStage(opp.id, 'closed_won')}
                                    className="px-2 py-1 bg-green-600/30 text-green-300 rounded text-xs hover:bg-green-600/50 transition duration-150 ease-in-out"
                                  >
                                    Won
                                  </button>
                                  <button
                                    onClick={() => updateStage(opp.id, 'closed_lost')}
                                    className="px-2 py-1 bg-red-600/30 text-red-300 rounded text-xs hover:bg-red-600/50 transition duration-150 ease-in-out"
                                  >
                                    Lost
                                  </button>
                                </div>
                              )}
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
                        <th className="p-4 text-left text-gray-300 font-semibold">Opportunity</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Company</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Value</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Probability</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Stage</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Expected Close</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredOpps.map((opp) => (
                        <tr key={opp.id} className="hover:bg-gray-700/50">
                          <td className="p-4">
                            <div>
                              <p className="text-white font-medium">{opp.name}</p>
                              <p className="text-gray-400 text-sm">{opp.contact}</p>
                            </div>
                          </td>
                          <td className="p-4 text-white">{opp.company}</td>
                          <td className="p-4">
                            <p className="text-purple-400 font-semibold">€{opp.value.toLocaleString()}</p>
                            <p className="text-gray-500 text-sm">Weighted: €{Math.round(opp.value * opp.probability / 100).toLocaleString()}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full" 
                                  style={{ width: `${opp.probability}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-400 text-sm">{opp.probability}%</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                              opp.stage === 'discovery' ? 'bg-gray-600' :
                              opp.stage === 'qualification' ? 'bg-blue-600' :
                              opp.stage === 'proposal' ? 'bg-yellow-600' :
                              opp.stage === 'negotiation' ? 'bg-purple-600' :
                              opp.stage === 'closed_won' ? 'bg-green-600' :
                              'bg-red-600'
                            }`}>
                              {stages.find(s => s.id === opp.stage)?.name}
                            </span>
                          </td>
                          <td className="p-4 text-gray-400">{opp.expectedClose}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button className="text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-blue-600/20 transition duration-150 ease-in-out">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredOpps.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-gray-400 text-lg">No opportunities found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Add Opportunity Modal */}
        {showAddModal && (
          <AddOpportunityModal 
            onClose={() => setShowAddModal(false)} 
            onAdd={handleAddOpportunity}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}

function AddOpportunityModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
    email: '',
    value: '',
    probability: 50,
    stage: 'discovery',
    expectedClose: '',
    priority: 'medium',
    source: 'Website',
    description: ''
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
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Opportunity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Opportunity Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="block text-gray-400 text-sm mb-1">Contact Person</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Value (€)</label>
              <input
                type="number"
                required
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Probability (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({...formData, probability: parseInt(e.target.value)})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Stage</label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({...formData, stage: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                {stages.filter(s => !['closed_won', 'closed_lost'].includes(s.id)).map(stage => (
                  <option key={stage.id} value={stage.id}>{stage.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Expected Close Date</label>
              <input
                type="date"
                value={formData.expectedClose}
                onChange={(e) => setFormData({...formData, expectedClose: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                <option value="Partner Referral">Partner Referral</option>
                <option value="Existing Customer">Existing Customer</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
            />
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
              Add Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Opportunities;
