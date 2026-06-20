import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import ProtectedRoute from '../components/ProtectedRoute';
import { crmAPI } from '../services/api';
import toast from 'react-hot-toast';

const activityIcons = {
  call: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  ),
  meeting: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  ),
  note: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
    </svg>
  ),
  task: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
    </svg>
  )
};

const activityColors = {
  call: 'bg-blue-600',
  email: 'bg-green-600',
  meeting: 'bg-purple-600',
  note: 'bg-yellow-600',
  task: 'bg-red-600'
};

const outcomeColors = {
  positive: 'text-green-400',
  negative: 'text-red-400',
  pending: 'text-yellow-400',
  completed: 'text-blue-400'
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('timeline');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [typeFilter, dateFilter]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (typeFilter !== 'all') params.type = typeFilter;
      if (dateFilter !== 'all') params.dateRange = dateFilter;

      const response = await crmAPI.getActivities(params);
      setActivities(response.activities || []);
      setFilteredActivities(response.activities || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  // Filter activities client-side for search
  useEffect(() => {
    if (searchTerm) {
      const filtered = activities.filter(activity => 
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activity.contact && activity.contact.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.company && activity.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.description && activity.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredActivities(filtered);
    } else {
      setFilteredActivities(activities);
    }
  }, [searchTerm, activities]);

  const handleAddActivity = async (activityData) => {
    try {
      const data = {
        type: activityData.type,
        title: activityData.title,
        description: activityData.description,
        contact: activityData.contact,
        company: activityData.company,
        date: activityData.date,
        time: activityData.time,
        duration: activityData.duration,
        outcome: activityData.outcome,
        relatedTo: activityData.relatedTo,
        relatedType: activityData.relatedType
      };
      
      await crmAPI.createActivity(data);
      toast.success('Activity created successfully');
      setShowAddModal(false);
      fetchActivities();
    } catch (error) {
      console.error('Error creating activity:', error);
      toast.error('Failed to create activity');
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await crmAPI.deleteActivity(activityId);
        toast.success('Activity deleted successfully');
        fetchActivities();
      } catch (error) {
        console.error('Error deleting activity:', error);
        toast.error('Failed to delete activity');
      }
    }
  };

  // Group activities by date for timeline view
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => new Date(b) - new Date(a));

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
                  <h1 className="h1 mb-2">Activities</h1>
                  <p className="text-xl text-gray-400">Track all interactions and touchpoints</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3 relative z-10">
                  <div className="flex bg-gray-800 rounded-md p-1">
                    <button
                      onClick={() => setViewMode('timeline')}
                      className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out cursor-pointer ${
                        viewMode === 'timeline' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Timeline
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
                    Log Activity
                  </button>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid md:grid-cols-5 gap-4 mb-8">
                {['call', 'email', 'meeting', 'note', 'task'].map(type => {
                  const count = activities.filter(a => a.type === type).length;
                  return (
                    <div key={type} className={`bg-${activityColors[type].replace('bg-', '')}-900/30 rounded-lg p-4 border border-${activityColors[type].replace('bg-', '')}-500/30`}>
                      <div className="flex items-center">
                        <div className={`w-10 h-10 ${activityColors[type]} rounded-full flex items-center justify-center mr-3`}>
                          {activityIcons[type]}
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm capitalize">{type}s</p>
                          <p className="text-2xl font-bold text-white">{count}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Filters */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="all">All Types</option>
                      <option value="call">Calls</option>
                      <option value="email">Emails</option>
                      <option value="meeting">Meetings</option>
                      <option value="note">Notes</option>
                      <option value="task">Tasks</option>
                    </select>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="week">This Week</option>
                    </select>
                    <button
                      onClick={() => {setSearchTerm(''); setTypeFilter('all'); setDateFilter('all');}}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md transition duration-150 ease-in-out"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Timeline View */}
              {viewMode === 'timeline' ? (
                <div className="space-y-8">
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400">Loading activities...</p>
                    </div>
                  ) : sortedDates.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400 text-lg">No activities found</p>
                    </div>
                  ) : (
                    sortedDates.map(date => (
                      <div key={date}>
                        <div className="flex items-center mb-4">
                          <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </div>
                          <div className="ml-4 flex-1 h-px bg-gray-700"></div>
                        </div>
                        
                        <div className="space-y-4 ml-4">
                          {groupedActivities[date].map((activity) => (
                            <div key={activity._id || activity.id} className="flex">
                              <div className="flex flex-col items-center mr-4">
                                <div className={`w-12 h-12 ${activityColors[activity.type]} rounded-full flex items-center justify-center`}>
                                  {activityIcons[activity.type]}
                                </div>
                                <div className="w-px h-full bg-gray-700 mt-2"></div>
                              </div>
                              
                              <div className="flex-1 bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="text-white font-semibold">{activity.title}</h3>
                                    <p className="text-gray-400 text-sm">{activity.time || ''} • {activity.contact || '-'} • {activity.company || '-'}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {activity.outcome && (
                                      <span className={`px-2 py-1 rounded text-xs font-semibold ${outcomeColors[activity.outcome]}`}>
                                        {activity.outcome}
                                      </span>
                                    )}
                                    <button 
                                      onClick={() => handleDeleteActivity(activity._id || activity.id)}
                                      className="text-red-400 hover:text-red-300 p-1"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                
                                <p className="text-gray-300 mb-3">{activity.description || ''}</p>
                                
                                {activity.duration && (
                                  <p className="text-gray-500 text-sm mb-2">
                                    <span className="font-medium">Duration:</span> {activity.duration}
                                  </p>
                                )}
                                
                                <div className="flex items-center justify-between">
                                  <Link 
                                    to={`/${activity.relatedType === 'contact' ? 'crm/contacts' : activity.relatedType === 'lead' ? 'crm/leads' : 'crm/opportunities'}`}
                                    className="text-purple-400 hover:text-purple-300 text-sm"
                                  >
                                    Related to: {activity.relatedTo || '-'}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* List View */
                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="p-4 text-left text-gray-300 font-semibold">Activity</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Contact</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Type</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Date & Time</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Outcome</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Related To</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredActivities.map((activity) => (
                        <tr key={activity.id} className="hover:bg-gray-700/50">
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 ${activityColors[activity.type]} rounded-full flex items-center justify-center mr-3`}>
                                {activityIcons[activity.type]}
                              </div>
                              <div>
                                <p className="text-white font-medium">{activity.title}</p>
                                <p className="text-gray-400 text-sm truncate max-w-xs">{activity.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-white">{activity.contact}</p>
                            <p className="text-gray-400 text-sm">{activity.company}</p>
                          </td>
                          <td className="p-4">
                            <span className="text-gray-300 capitalize">{activity.type}</span>
                          </td>
                          <td className="p-4 text-gray-400">
                            {activity.date} at {activity.time}
                          </td>
                          <td className="p-4">
                            {activity.outcome ? (
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${outcomeColors[activity.outcome]}`}>
                                {activity.outcome}
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            <Link 
                              to={`/${activity.relatedType === 'contact' ? 'crm/contacts' : activity.relatedType === 'lead' ? 'crm/leads' : 'crm/opportunities'}`}
                              className="text-purple-400 hover:text-purple-300 text-sm"
                            >
                              {activity.relatedTo}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredActivities.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-gray-400 text-lg">No activities found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Add Activity Modal */}
        {showAddModal && (
          <AddActivityModal 
            onClose={() => setShowAddModal(false)} 
            onAdd={handleAddActivity}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}

function AddActivityModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: 'call',
    title: '',
    description: '',
    contact: '',
    company: '',
    duration: '',
    outcome: 'completed',
    relatedTo: '',
    relatedType: 'contact'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Log Activity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Activity Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="call">Call</option>
                <option value="email">Email</option>
                <option value="meeting">Meeting</option>
                <option value="note">Note</option>
                <option value="task">Task</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Outcome</label>
              <select
                value={formData.outcome}
                onChange={(e) => setFormData({...formData, outcome: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="completed">Completed</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              placeholder="e.g., Discovery call with prospect"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Contact</label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
              placeholder="Details about the activity..."
            />
          </div>
          
          {['call', 'meeting'].includes(formData.type) && (
            <div>
              <label className="block text-gray-400 text-sm mb-1">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="e.g., 30 min"
              />
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Related To</label>
              <input
                type="text"
                value={formData.relatedTo}
                onChange={(e) => setFormData({...formData, relatedTo: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="e.g., Deal name or Contact"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Related Type</label>
              <select
                value={formData.relatedType}
                onChange={(e) => setFormData({...formData, relatedType: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="contact">Contact</option>
                <option value="lead">Lead</option>
                <option value="opportunity">Opportunity</option>
                <option value="account">Account</option>
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
              Log Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Activities;
