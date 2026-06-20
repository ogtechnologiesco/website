import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import ProtectedRoute from '../components/ProtectedRoute';
import { crmAPI } from '../services/api';
import toast from 'react-hot-toast';

function Import() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a file to import');
      return;
    }

    // Check file type
    const validTypes = ['text/csv', 'application/json', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/xml', 'text/xml'];
    const fileType = file.type || 'application/octet-stream';
    const fileName = file.name.toLowerCase();
    const isValidType = validTypes.includes(fileType) || 
                        fileName.endsWith('.csv') || 
                        fileName.endsWith('.json') || 
                        fileName.endsWith('.xls') || 
                        fileName.endsWith('.xlsx') || 
                        fileName.endsWith('.xml');

    if (!isValidType) {
      toast.error('Invalid file type. Please upload CSV, JSON, Excel, or XML files.');
      return;
    }

    try {
      setUploading(true);
      setImportResult(null);
      const response = await crmAPI.importContacts(file);
      setImportResult(response);
      toast.success('Import completed successfully');
    } catch (error) {
      console.error('Error importing contacts:', error);
      toast.error(error.message || 'Failed to import contacts');
    } finally {
      setUploading(false);
    }
  };

  const resetImport = () => {
    setFile(null);
    setImportResult(null);
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
              <div className="mb-8">
                <Link to="/crm" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
                  ← Back to CRM
                </Link>
                <h1 className="text-4xl font-bold text-white mb-2">Import Contacts</h1>
                <p className="text-gray-400">Bulk import contacts from CSV, JSON, Excel, or XML files</p>
              </div>

              {/* Upload Area */}
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600 hover:border-purple-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".csv,.json,.xls,.xlsx,.xml"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-gray-300 text-lg mb-2">
                      {file ? file.name : 'Drag and drop your file here, or click to browse'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Supports CSV, JSON, Excel, and XML files
                    </p>
                  </label>
                </div>

                {file && (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-gray-300">
                      Selected: <span className="text-white font-medium">{file.name}</span>
                      <span className="text-gray-500 ml-2">({(file.size / 1024).toFixed(2)} KB)</span>
                    </div>
                    <button
                      onClick={resetImport}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleImport}
                    disabled={!file || uploading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-md transition duration-150 ease-in-out font-medium"
                  >
                    {uploading ? 'Importing...' : 'Import Contacts'}
                  </button>
                  <button
                    onClick={resetImport}
                    className="px-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md transition duration-150 ease-in-out"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Import Results */}
              {importResult && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-4">Import Results</h2>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                      <p className="text-green-400 text-sm">Successfully Imported</p>
                      <p className="text-3xl font-bold text-white">{importResult.imported || 0}</p>
                    </div>
                    <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/30">
                      <p className="text-red-400 text-sm">Failed</p>
                      <p className="text-3xl font-bold text-white">{importResult.failed || 0}</p>
                    </div>
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                      <p className="text-blue-400 text-sm">Total Processed</p>
                      <p className="text-3xl font-bold text-white">{(importResult.imported || 0) + (importResult.failed || 0)}</p>
                    </div>
                  </div>

                  {importResult.errors && importResult.errors.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold mb-3">Errors:</h3>
                      <div className="bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
                        {importResult.errors.map((error, index) => (
                          <div key={index} className="text-red-400 text-sm mb-2">
                            Row {error.row}: {error.message}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {importResult.warnings && importResult.warnings.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-white font-semibold mb-3">Warnings:</h3>
                      <div className="bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
                        {importResult.warnings.map((warning, index) => (
                          <div key={index} className="text-yellow-400 text-sm mb-2">
                            Row {warning.row}: {warning.message}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <Link
                      to="/crm/contacts"
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition duration-150 ease-in-out"
                    >
                      View Imported Contacts
                    </Link>
                  </div>
                </div>
              )}

              {/* File Format Instructions */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-8">
                <h2 className="text-xl font-bold text-white mb-4">File Format Guidelines</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">CSV Format</h3>
                    <p className="text-gray-400 text-sm">Required columns: name, email. Optional: phone, company, tags (comma-separated), status</p>
                  </div>
                  
                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">JSON Format</h3>
                    <p className="text-gray-400 text-sm">Array of contact objects with fields: name, email, phone, company, tags, status</p>
                  </div>
                  
                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">Excel Format</h3>
                    <p className="text-gray-400 text-sm">First row should contain headers: name, email, phone, company, tags, status</p>
                  </div>

                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">Status Values</h3>
                    <p className="text-gray-400 text-sm">Valid status values: customer, lead, prospect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default Import;
