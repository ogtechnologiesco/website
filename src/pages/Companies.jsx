import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import ProtectedRoute from '../components/ProtectedRoute';
import { crmAPI } from '../services/api';
import toast from 'react-hot-toast';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchCompanies();
  }, [pagination.page, pagination.limit]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      if (searchTerm) params.search = searchTerm;

      const response = await crmAPI.getCompanies(params);
      setCompanies(response.companies || []);
      setFilteredCompanies(response.companies || []);
      setPagination({
        ...pagination,
        total: response.pagination?.total || 0,
        pages: response.pagination?.pages || 0
      });
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchCompanies();
    } else {
      setFilteredCompanies(companies);
    }
  }, [searchTerm]);

  const handleDeleteCompany = async (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await crmAPI.deleteCompany(companyId);
        toast.success('Company deleted successfully');
        fetchCompanies();
      } catch (error) {
        console.error('Error deleting company:', error);
        toast.error('Failed to delete company');
      }
    }
  };

  const handleAddCompany = async (companyData) => {
    try {
      await crmAPI.createCompany(companyData);
      toast.success('Company created successfully');
      setShowAddModal(false);
      fetchCompanies();
    } catch (error) {
      console.error('Error creating company:', error);
      toast.error('Failed to create company');
    }
  };

  const handleEditCompany = async (updatedCompany) => {
    try {
      await crmAPI.updateCompany(updatedCompany._id || updatedCompany.id, updatedCompany);
      toast.success('Company updated successfully');
      setEditingCompany(null);
      fetchCompanies();
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Failed to update company');
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
              <div className="flex items-center justify-between mb-8">
                <div>
                  <Link to="/crm" className="text-purple-400 hover:text-purple-300 mb-2 inline-block">
                    ← Back to CRM
                  </Link>
                  <h1 className="text-4xl font-bold text-white mb-2">Companies</h1>
                  <p className="text-gray-400">Manage your company database</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition duration-150 ease-in-out font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Add Company
                </button>
              </div>

              {/* Filters and Search */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search companies..."
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
                    <button
                      onClick={() => {setSearchTerm(''); fetchCompanies();}}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md transition duration-150 ease-in-out"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Companies Table */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="p-4 text-left text-gray-300 font-semibold">Company Name</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Industry</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Website</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Employees</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Contacts</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center">
                            <p className="text-gray-400">Loading companies...</p>
                          </td>
                        </tr>
                      ) : filteredCompanies.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center">
                            <p className="text-gray-400 text-lg">No companies found</p>
                            <button
                              onClick={() => {setSearchTerm(''); fetchCompanies();}}
                              className="mt-4 text-purple-400 hover:text-purple-300"
                            >
                              Clear filters
                            </button>
                          </td>
                        </tr>
                      ) : (
                        filteredCompanies.map((company) => (
                          <tr key={company._id || company.id} className="hover:bg-gray-700/50">
                            <td className="p-4">
                              <div>
                                <p className="text-white font-medium">{company.name}</p>
                                <p className="text-gray-400 text-sm">{company.address || '-'}</p>
                              </div>
                            </td>
                            <td className="p-4 text-white">{company.industry || '-'}</td>
                            <td className="p-4">
                              {company.website ? (
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                                  {company.website}
                                </a>
                              ) : '-'}
                            </td>
                            <td className="p-4 text-gray-400">{company.employeeCount || '-'}</td>
                            <td className="p-4 text-gray-400">{company.contactCount || '-'}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setEditingCompany(company)}
                                  className="text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-blue-600/20 transition duration-150 ease-in-out"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteCompany(company._id || company.id)}
                                  className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-600/20 transition duration-150 ease-in-out"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredCompanies.length} of {pagination.total} companies
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

      {/* Add Company Modal */}
      {showAddModal && (
        <AddCompanyModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={handleAddCompany} 
        />
      )}

      {/* Edit Company Modal */}
      {editingCompany && (
        <EditCompanyModal 
          company={editingCompany}
          onClose={() => setEditingCompany(null)} 
          onEdit={handleEditCompany} 
        />
      )}
    </ProtectedRoute>
  );
}

// Add Company Modal Component
function AddCompanyModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    address: '',
    employeeCount: '',
    phone: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      employeeCount: parseInt(formData.employeeCount) || null
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Industry</label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              placeholder="https://"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Employee Count</label>
            <input
              type="number"
              value={formData.employeeCount}
              onChange={(e) => setFormData({...formData, employeeCount: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
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
              Add Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Company Modal Component
function EditCompanyModal({ company, onClose, onEdit }) {
  const [formData, setFormData] = useState({
    ...company,
    employeeCount: company.employeeCount || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...formData,
      employeeCount: parseInt(formData.employeeCount) || null
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Edit Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Industry</label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              placeholder="https://"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Employee Count</label>
            <input
              type="number"
              value={formData.employeeCount}
              onChange={(e) => setFormData({...formData, employeeCount: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Companies;
