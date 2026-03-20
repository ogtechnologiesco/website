import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';

// Sample contact data for initial implementation
const sampleContacts = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1234567890', company: 'Acme Corp', title: 'CEO', status: 'active', tags: ['VIP', 'Enterprise'], lastActivity: '2 days ago' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@techcorp.com', phone: '+1987654321', company: 'TechCorp', title: 'CTO', status: 'active', tags: ['Prospect'], lastActivity: '1 week ago' },
  { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike@startup.io', phone: '+1122334455', company: 'Startup Inc', title: 'Founder', status: 'lead', tags: ['Startup', 'Hot Lead'], lastActivity: '3 days ago' },
  { id: 4, firstName: 'Sarah', lastName: 'Williams', email: 'sarah@bigcorp.com', phone: '+1555666777', company: 'BigCorp', title: 'Manager', status: 'inactive', tags: ['Enterprise'], lastActivity: '1 month ago' },
  { id: 5, firstName: 'David', lastName: 'Brown', email: 'david@smallbiz.com', phone: '+1999888777', company: 'SmallBiz', title: 'Owner', status: 'active', tags: ['SMB'], lastActivity: '1 day ago' }
];

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState(sampleContacts);
  const [filteredContacts, setFilteredContacts] = useState(sampleContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Filter contacts based on search and status
  useEffect(() => {
    let filtered = contacts;
    
    if (searchTerm) {
      filtered = filtered.filter(contact => 
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }
    
    setFilteredContacts(filtered);
  }, [contacts, searchTerm, statusFilter]);

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedContacts.length} selected contacts?`)) {
      setContacts(contacts.filter(c => !selectedContacts.includes(c.id)));
      setSelectedContacts([]);
    }
  };

  const toggleContactSelection = (id) => {
    setSelectedContacts(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleAddContact = (newContact) => {
    const contact = {
      ...newContact,
      id: Math.max(...contacts.map(c => c.id), 0) + 1,
      lastActivity: 'Just now'
    };
    setContacts([...contacts, contact]);
    setShowAddModal(false);
  };

  const handleEditContact = (updatedContact) => {
    setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c));
    setEditingContact(null);
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
                      <option value="active">Active</option>
                      <option value="lead">Lead</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <button
                      onClick={() => {setSearchTerm(''); setStatusFilter('all');}}
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
                                setSelectedContacts(filteredContacts.map(c => c.id));
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
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-700/50">
                          <td className="p-4">
                            <input
                              type="checkbox"
                              checked={selectedContacts.includes(contact.id)}
                              onChange={() => toggleContactSelection(contact.id)}
                              className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {contact.firstName[0]}{contact.lastName[0]}
                              </div>
                              <div className="ml-3">
                                <p className="text-white font-medium">{contact.firstName} {contact.lastName}</p>
                                <p className="text-gray-400 text-sm">{contact.email}</p>
                                <p className="text-gray-500 text-xs">{contact.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-white">{contact.company}</p>
                              <p className="text-gray-400 text-sm">{contact.title}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              contact.status === 'active' ? 'bg-green-600 text-white' :
                              contact.status === 'lead' ? 'bg-blue-600 text-white' :
                              'bg-gray-600 text-gray-300'
                            }`}>
                              {contact.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {contact.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-gray-400">
                            {contact.lastActivity}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingContact(contact)}
                                className="text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-blue-600/20 transition duration-150 ease-in-out"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteContact(contact.id)}
                                className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-600/20 transition duration-150 ease-in-out"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredContacts.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-gray-400 text-lg">No contacts found</p>
                    <button
                      onClick={() => {setSearchTerm(''); setStatusFilter('all');}}
                      className="mt-4 text-purple-400 hover:text-purple-300"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredContacts.length} of {contacts.length} contacts
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out disabled:opacity-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out disabled:opacity-50">
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
  const [formData, setFormData] = useState(contact);

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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
