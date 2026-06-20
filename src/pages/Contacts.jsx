import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';
import { crmAPI } from '../services/api';
import toast from 'react-hot-toast';

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchContacts();
  }, [pagination.page, pagination.limit]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'all') params.status = statusFilter;

      const response = await crmAPI.getContacts(params);
      setContacts(response.contacts || []);
      setFilteredContacts(response.contacts || []);
      setPagination({
        ...pagination,
        total: response.pagination?.total || 0,
        pages: response.pagination?.pages || 0
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  // Filter contacts based on search and status (client-side for immediate feedback)
  useEffect(() => {
    if (searchTerm || statusFilter !== 'all') {
      fetchContacts();
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchTerm, statusFilter]);

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await crmAPI.deleteContact(id);
        toast.success('Contact deleted successfully');
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Failed to delete contact');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Delete ${selectedContacts.length} selected contacts?`)) {
      try {
        await Promise.all(selectedContacts.map(id => crmAPI.deleteContact(id)));
        toast.success('Contacts deleted successfully');
        setSelectedContacts([]);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contacts:', error);
        toast.error('Failed to delete contacts');
      }
    }
  };

  const toggleContactSelection = (id) => {
    setSelectedContacts(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleAddContact = async (newContact) => {
    try {
      // Map frontend form data to backend API format
      const contactData = {
        name: `${newContact.firstName} ${newContact.lastName}`,
        email: newContact.email,
        phone: newContact.phone,
        tags: newContact.tags || [],
        status: newContact.status === 'active' ? 'customer' : newContact.status,
        customFields: {
          title: newContact.title
        }
      };
      
      // Only include company if it's a valid MongoDB ObjectId (24 hex characters)
      // Otherwise, store company name in customFields
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      if (newContact.company && objectIdRegex.test(newContact.company)) {
        contactData.company = newContact.company;
      } else if (newContact.company) {
        contactData.customFields.companyName = newContact.company;
      }
      
      await crmAPI.createContact(contactData);
      toast.success('Contact created successfully');
      setShowAddModal(false);
      fetchContacts();
    } catch (error) {
      console.error('Error creating contact:', error);
      toast.error('Failed to create contact');
    }
  };

  const handleEditContact = async (updatedContact) => {
    try {
      const contactData = {
        name: `${updatedContact.firstName} ${updatedContact.lastName}`,
        email: updatedContact.email,
        phone: updatedContact.phone,
        company: updatedContact.company,
        tags: updatedContact.tags || [],
        status: updatedContact.status === 'active' ? 'customer' : updatedContact.status,
        customFields: {
          title: updatedContact.title
        }
      };
      
      await crmAPI.updateContact(updatedContact._id || updatedContact.id, contactData);
      toast.success('Contact updated successfully');
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact');
    }
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
                  <h1 className="h1 mb-2">Contacts</h1>
                  <p className="text-xl text-gray-400">Manage your contact database</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add Contact
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Import
                  </button>
                </div>
              </div>

              {/* Filters and Search */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-3 pl-12 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="customer">Customer</option>
                      <option value="lead">Lead</option>
                      <option value="prospect">Prospect</option>
                    </select>
                    <button
                      onClick={() => {setSearchTerm(''); setStatusFilter('all'); fetchContacts();}}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md transition duration-150 ease-in-out"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedContacts.length > 0 && (
                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 mb-6 flex items-center justify-between">
                  <span className="text-white">{selectedContacts.length} contacts selected</span>
                  <div className="flex gap-3">
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-150 ease-in-out"
                    >
                      Delete Selected
                    </button>
                    <button
                      onClick={() => setSelectedContacts([])}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-150 ease-in-out"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              )}

              {/* Contacts Table */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="p-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedContacts(filteredContacts.map(c => c._id || c.id));
                              } else {
                                setSelectedContacts([]);
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                          />
                        </th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Contact</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Company</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Status</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Tags</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Last Activity</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {loading ? (
                        <tr>
                          <td colSpan="7" className="p-8 text-center">
                            <p className="text-gray-400">Loading contacts...</p>
                          </td>
                        </tr>
                      ) : filteredContacts.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-8 text-center">
                            <p className="text-gray-400 text-lg">No contacts found</p>
                            <button
                              onClick={() => {setSearchTerm(''); setStatusFilter('all'); fetchContacts();}}
                              className="mt-4 text-purple-400 hover:text-purple-300"
                            >
                              Clear filters
                            </button>
                          </td>
                        </tr>
                      ) : (
                        filteredContacts.map((contact) => {
                          const nameParts = (contact.name || '').split(' ');
                          const firstName = nameParts[0] || '';
                          const lastName = nameParts.slice(1).join(' ') || '';
                          return (
                            <tr key={contact._id || contact.id} className="hover:bg-gray-700/50">
                              <td className="p-4">
                                <input
                                  type="checkbox"
                                  checked={selectedContacts.includes(contact._id || contact.id)}
                                  onChange={() => toggleContactSelection(contact._id || contact.id)}
                                  className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                                />
                              </td>
                              <td className="p-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    {firstName[0]}{lastName[0] || firstName[0]}
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-white font-medium">{contact.name}</p>
                                    <p className="text-gray-400 text-sm">{contact.email}</p>
                                    <p className="text-gray-500 text-xs">{contact.phone}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div>
                                  <p className="text-white">{contact.company || '-'}</p>
                                  <p className="text-gray-400 text-sm">{contact.customFields?.title || '-'}</p>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  contact.status === 'customer' ? 'bg-green-600 text-white' :
                                  contact.status === 'lead' ? 'bg-blue-600 text-white' :
                                  contact.status === 'prospect' ? 'bg-yellow-600 text-white' :
                                  'bg-gray-600 text-gray-300'
                                }`}>
                                  {contact.status || 'Unknown'}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex flex-wrap gap-1">
                                  {contact.tags && contact.tags.length > 0 ? (
                                    contact.tags.map((tag, index) => (
                                      <span key={index} className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded text-xs">
                                        {tag}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-gray-500 text-xs">No tags</span>
                                  )}
                                </div>
                              </td>
                              <td className="p-4 text-gray-400">
                                {contact.updatedAt ? new Date(contact.updatedAt).toLocaleDateString() : 'Never'}
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingContact({
                                        ...contact,
                                        firstName,
                                        lastName,
                                        title: contact.customFields?.title || ''
                                      });
                                    }}
                                    className="text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-blue-600/20 transition duration-150 ease-in-out"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteContact(contact._id || contact.id)}
                                    className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-600/20 transition duration-150 ease-in-out"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredContacts.length} of {pagination.total} contacts
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPagination({...pagination, page: Math.max(1, pagination.page - 1)})}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-300">
                    Page {pagination.page} of {pagination.pages || 1}
                  </span>
                  <button 
                    onClick={() => setPagination({...pagination, page: Math.min(pagination.pages, pagination.page + 1)})}
                    disabled={pagination.page >= pagination.pages}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <AddContactModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={handleAddContact}
        />
      )}

      {/* Edit Contact Modal */}
      {editingContact && (
        <EditContactModal 
          contact={editingContact}
          onClose={() => setEditingContact(null)}
          onEdit={handleEditContact}
        />
      )}
    </ProtectedRoute>
  );
}

// Add Contact Modal Component
function AddContactModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    status: 'lead',
    tags: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
          <div>
            <label className="block text-gray-400 text-sm mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="lead">Lead</option>
              <option value="customer">Customer</option>
              <option value="prospect">Prospect</option>
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
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Contact Modal Component
function EditContactModal({ contact, onClose, onEdit }) {
  const [formData, setFormData] = useState({
    ...contact,
    firstName: contact.firstName || '',
    lastName: contact.lastName || '',
    title: contact.title || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Edit Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
          <div>
            <label className="block text-gray-400 text-sm mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="lead">Lead</option>
              <option value="customer">Customer</option>
              <option value="prospect">Prospect</option>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contacts;
