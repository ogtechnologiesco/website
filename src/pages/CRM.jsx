import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';

// CRM Components
const CRMDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalLeads: 0,
    opportunities: 0,
    wonDeals: 0,
    recentActivities: []
  });

  // Mock data for initial implementation
  useEffect(() => {
    setStats({
      totalContacts: 156,
      totalLeads: 42,
      opportunities: 18,
      wonDeals: 8,
      recentActivities: [
        { id: 1, type: 'lead', message: 'New lead: Acme Corp', time: '2 hours ago' },
        { id: 2, type: 'contact', message: 'Contact updated: John Doe', time: '4 hours ago' },
        { id: 3, type: 'deal', message: 'Deal won: €5,000', time: '1 day ago' },
        { id: 4, type: 'task', message: 'Meeting scheduled with TechStart', time: '1 day ago' }
      ]
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Contacts</p>
              <p className="text-3xl font-bold text-white">{stats.totalContacts}</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-lg p-6 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Leads</p>
              <p className="text-3xl font-bold text-white">{stats.totalLeads}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 rounded-lg p-6 border border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Opportunities</p>
              <p className="text-3xl font-bold text-white">{stats.opportunities}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-lg p-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Won Deals</p>
              <p className="text-3xl font-bold text-white">{stats.wonDeals}</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate('/crm/contacts/new')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Contact
        </button>
        <button
          onClick={() => navigate('/crm/leads/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Lead
        </button>
        <button
          onClick={() => navigate('/crm/import')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          Import Contacts
        </button>
      </div>

      {/* Pipeline Overview */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Lead Pipeline</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {['New', 'Qualified', 'Proposition', 'Negotiation', 'Won/Lost'].map((stage, index) => {
            const counts = [12, 8, 5, 3, 14];
            const colors = ['gray', 'blue', 'yellow', 'purple', 'green'];
            return (
              <div key={stage} className={`bg-${colors[index]}-900/30 rounded-lg p-4 border border-${colors[index]}-500/30`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm font-medium">{stage}</span>
                  <span className={`text-${colors[index]}-400 font-bold`}>{counts[index]}</span>
                </div>
                <div className={`w-full bg-gray-700 rounded-full h-2`}>
                  <div 
                    className={`bg-${colors[index]}-500 h-2 rounded-full`} 
                    style={{ width: `${(counts[index] / 42) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {stats.recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'lead' ? 'bg-blue-500' :
                  activity.type === 'contact' ? 'bg-purple-500' :
                  activity.type === 'deal' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="text-gray-300">{activity.message}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main CRM Page Component
function CRM() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
        <Header />
        
        <main className="grow">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <PageIllustration />
            
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* CRM Header */}
              <div className="mb-8">
                <h1 className="h1 mb-2">OG CRM</h1>
                <p className="text-xl text-gray-400">Manage your contacts, leads, and sales pipeline</p>
              </div>

              {/* CRM Navigation */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 pb-4">
                <Link
                  to="/crm"
                  className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                    activeTab === 'dashboard' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </Link>
                <Link
                  to="/crm/contacts"
                  className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                    activeTab === 'contacts' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveTab('contacts')}
                >
                  Contacts
                </Link>
                <Link
                  to="/crm/leads"
                  className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                    activeTab === 'leads' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveTab('leads')}
                >
                  Leads
                </Link>
                <Link
                  to="/crm/opportunities"
                  className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                    activeTab === 'opportunities' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveTab('opportunities')}
                >
                  Opportunities
                </Link>
                <Link
                  to="/crm/activities"
                  className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                    activeTab === 'activities' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveTab('activities')}
                >
                  Activities
                </Link>
              </div>

              {/* Dashboard Content */}
              <CRMDashboard />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default CRM;
