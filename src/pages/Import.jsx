import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import ProtectedRoute from '../components/ProtectedRoute';
import { crmAPI } from '../services/api';
import { parseCsv } from '../utils/contactUtils';
import toast from 'react-hot-toast';

const TARGET_FIELDS = [
  { key: 'name', label: 'Name', required: false },
  { key: 'firstName', label: 'First name', required: false },
  { key: 'lastName', label: 'Last name', required: false },
  { key: 'email', label: 'Email', required: true },
  { key: 'phone', label: 'Phone', required: false },
  { key: 'company', label: 'Company', required: false },
  { key: 'title', label: 'Job title', required: false },
  { key: 'tags', label: 'Tags', required: false },
  { key: 'status', label: 'Status', required: false },
];

const HEADER_ALIASES = {
  name: ['name', 'full name', 'fullname', 'contact name', 'contact'],
  firstName: ['first name', 'firstname', 'first_name', 'given name', 'givenname', 'fname'],
  lastName: ['last name', 'lastname', 'last_name', 'surname', 'family name', 'familyname', 'lname'],
  email: ['email', 'e-mail', 'email address', 'e-mail address', 'mail'],
  phone: ['phone', 'telephone', 'phone number', 'mobile', 'tel', 'contact number'],
  company: ['company', 'company name', 'organization', 'organisation', 'account', 'account name', 'business'],
  title: ['title', 'job title', 'jobtitle', 'position', 'role'],
  tags: ['tags', 'tag', 'labels', 'label', 'groups', 'group'],
  status: ['status', 'stage', 'contact status', 'type'],
};

const VALID_STATUSES = ['customer', 'lead', 'prospect'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function guessMapping(header) {
  const normalized = header.map((h) => String(h || '').trim().toLowerCase());
  const mapping = {};
  TARGET_FIELDS.forEach(({ key }) => {
    const idx = normalized.findIndex((h) => HEADER_ALIASES[key].includes(h));
    if (idx >= 0) mapping[key] = idx;
  });
  return mapping;
}

function jsonToRows(data) {
  const arr = Array.isArray(data) ? data : (Array.isArray(data?.contacts) ? data.contacts : null);
  if (!arr || arr.length === 0 || typeof arr[0] !== 'object' || arr[0] === null || Array.isArray(arr[0])) {
    return null;
  }
  const header = [];
  arr.forEach((obj) => {
    Object.keys(obj).forEach((k) => { if (!header.includes(k)) header.push(k); });
  });
  return [header, ...arr.map((obj) => header.map((h) => (obj[h] == null ? '' : String(obj[h]))))];
}

function buildContact(row, mapping) {
  const get = (key) => (mapping[key] !== undefined ? String(row[mapping[key]] || '').trim() : '');
  const errors = [];

  const nameParts = [get('firstName'), get('lastName')].filter(Boolean);
  const name = get('name') || nameParts.join(' ');
  const email = get('email');
  if (!email) errors.push('Missing email');
  else if (!EMAIL_RE.test(email)) errors.push(`Invalid email "${email}"`);

  let status = get('status').toLowerCase();
  let warning = null;
  if (!status) {
    status = 'lead';
  } else if (status === 'active') {
    status = 'customer';
  } else if (!VALID_STATUSES.includes(status)) {
    warning = `Unknown status "${get('status')}" — defaulted to lead`;
    status = 'lead';
  }

  const tags = get('tags')
    .split(/[;|]/)
    .flatMap((t) => t.split(','))
    .map((t) => t.trim())
    .filter(Boolean);

  const contactData = {
    name: name || email,
    email,
    phone: get('phone'),
    tags,
    status,
    customFields: {},
  };
  const company = get('company');
  const title = get('title');
  if (company) contactData.customFields.companyName = company;
  if (title) contactData.customFields.title = title;

  return { contactData, errors, warning };
}

function Import() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  // Client-side pipeline state (CSV / JSON)
  const [parsedRows, setParsedRows] = useState(null);
  const [mapping, setMapping] = useState({});
  const [progress, setProgress] = useState(null);

  const isServerFile = (f) => /\.(xlsx?|xml)$/i.test(f?.name || '');

  const processFile = (f) => {
    setImportResult(null);
    setParsedRows(null);
    setMapping({});
    setProgress(null);
    setFile(f);
    if (!f || isServerFile(f)) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result || '');
        let rows;
        if (/\.json$/i.test(f.name)) {
          rows = jsonToRows(JSON.parse(text));
          if (!rows) throw new Error('JSON must be an array of contact objects (or { contacts: [...] })');
        } else {
          rows = parseCsv(text.replace(/^﻿/, ''));
        }
        if (!rows || rows.length < 2) throw new Error('File needs a header row plus at least one data row.');
        setParsedRows(rows);
        setMapping(guessMapping(rows[0]));
      } catch (err) {
        toast.error(err.message || 'Could not parse file');
        setFile(null);
      }
    };
    reader.onerror = () => toast.error('Could not read file');
    reader.readAsText(f);
  };

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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const importServerFile = async () => {
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

  const importParsedRows = async () => {
    if (mapping.email === undefined) {
      toast.error('Map a column to Email — it is required for every contact.');
      return;
    }

    const dataRows = parsedRows.slice(1);
    const seenEmails = new Set();
    const errors = [];
    const warnings = [];
    const toImport = [];
    let skipped = 0;

    dataRows.forEach((row, i) => {
      const rowNum = i + 2; // 1-based incl. header
      const { contactData, errors: rowErrors, warning } = buildContact(row, mapping);
      if (rowErrors.length > 0) {
        errors.push({ row: rowNum, message: rowErrors.join('; ') });
        return;
      }
      const emailKey = contactData.email.toLowerCase();
      if (seenEmails.has(emailKey)) {
        skipped++;
        warnings.push({ row: rowNum, message: `Duplicate of earlier row (${contactData.email}) — skipped` });
        return;
      }
      seenEmails.add(emailKey);
      if (warning) warnings.push({ row: rowNum, message: warning });
      toImport.push({ rowNum, contactData });
    });

    try {
      setUploading(true);
      setImportResult(null);
      let imported = 0;
      for (let i = 0; i < toImport.length; i++) {
        const { rowNum, contactData } = toImport[i];
        try {
          await crmAPI.createContact(contactData);
          imported++;
        } catch (err) {
          errors.push({ row: rowNum, message: err.message || 'Server rejected contact' });
        }
        setProgress({ done: i + 1, total: toImport.length });
      }
      setImportResult({ imported, failed: errors.length, skipped, errors, warnings });
      toast.success(`Imported ${imported} of ${dataRows.length} rows`);
    } catch (error) {
      console.error('Error importing contacts:', error);
      toast.error(error.message || 'Failed to import contacts');
    } finally {
      setUploading(false);
      setProgress(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a file to import');
      return;
    }
    if (isServerFile(file)) {
      await importServerFile();
    } else if (parsedRows) {
      await importParsedRows();
    }
  };

  const resetImport = () => {
    setFile(null);
    setParsedRows(null);
    setMapping({});
    setImportResult(null);
    setProgress(null);
  };

  const downloadTemplate = () => {
    const csv = 'name,email,phone,company,title,tags,status\nJane Doe,jane@example.com,+43 1 555 1234,Acme GmbH,CEO,vip;newsletter,customer\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'og-crm-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateMapping = (fieldKey, colIdx) => {
    setMapping((prev) => {
      const next = { ...prev };
      if (colIdx === '') delete next[fieldKey];
      else next[fieldKey] = Number(colIdx);
      return next;
    });
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
                <Link to="/crm/" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
                  ← Back to CRM
                </Link>
                <h1 className="text-4xl font-bold text-white mb-2">Import Contacts</h1>
                <p className="text-gray-400">
                  Bulk import contacts from CSV or JSON — columns are mapped in your browser before upload. Excel and
                  XML files are processed server-side.
                </p>
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

                {/* Column mapping for CSV/JSON */}
                {parsedRows && (
                  <div className="mt-6">
                    <h3 className="text-white font-semibold mb-1">Map columns</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {parsedRows.length - 1} rows detected. Email is required — everything else is optional.
                      First name + last name are combined into the contact name.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      {TARGET_FIELDS.map(({ key, label, required }) => (
                        <div key={key}>
                          <label className="block text-gray-400 text-xs mb-1">
                            {label}{required && <span className="text-purple-400"> *</span>}
                          </label>
                          <select
                            value={mapping[key] !== undefined ? mapping[key] : ''}
                            onChange={(e) => updateMapping(key, e.target.value)}
                            className={`w-full bg-gray-700 text-white px-3 py-2 rounded-md border focus:outline-none text-sm ${
                              required && mapping[key] === undefined ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                            }`}
                          >
                            <option value="">— skip —</option>
                            {parsedRows[0].map((h, i) => (
                              <option key={i} value={i}>{h || `(column ${i + 1})`}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    {/* Preview */}
                    <div className="overflow-x-auto mb-2">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-left text-gray-400 border-b border-gray-700">
                            <th className="pb-2 pr-4">Row</th>
                            {parsedRows[0].map((h, i) => (
                              <th key={i} className="pb-2 pr-4">
                                {h || `(col ${i + 1})`}
                                {Object.entries(mapping).find(([, v]) => v === i) && (
                                  <span className="ml-1 text-purple-400">
                                    → {TARGET_FIELDS.find((f) => f.key === Object.entries(mapping).find(([, v]) => v === i)[0])?.label}
                                  </span>
                                )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {parsedRows.slice(1, 6).map((row, i) => (
                            <tr key={i} className="border-b border-gray-700/50">
                              <td className="py-1.5 pr-4 font-mono text-gray-500">{i + 2}</td>
                              {row.map((cell, j) => (
                                <td key={j} className="py-1.5 pr-4 text-gray-300 break-all max-w-[200px]">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {parsedRows.length > 6 && (
                        <p className="text-gray-500 text-xs mt-2">Showing first 5 of {parsedRows.length - 1} rows</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleImport}
                    disabled={!file || uploading || (!isServerFile(file) && !parsedRows)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-md transition duration-150 ease-in-out font-medium"
                  >
                    {uploading
                      ? progress
                        ? `Importing ${progress.done} of ${progress.total}...`
                        : 'Importing...'
                      : 'Import Contacts'}
                  </button>
                  <button
                    onClick={resetImport}
                    className="px-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md transition duration-150 ease-in-out"
                  >
                    Clear
                  </button>
                </div>

                {uploading && progress && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${(progress.done / progress.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Import Results */}
              {importResult && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-4">Import Results</h2>

                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                      <p className="text-green-400 text-sm">Successfully Imported</p>
                      <p className="text-3xl font-bold text-white">{importResult.imported || 0}</p>
                    </div>
                    <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/30">
                      <p className="text-red-400 text-sm">Failed</p>
                      <p className="text-3xl font-bold text-white">{importResult.failed || 0}</p>
                    </div>
                    <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-500/30">
                      <p className="text-yellow-400 text-sm">Duplicates Skipped</p>
                      <p className="text-3xl font-bold text-white">{importResult.skipped || 0}</p>
                    </div>
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                      <p className="text-blue-400 text-sm">Total Processed</p>
                      <p className="text-3xl font-bold text-white">
                        {(importResult.imported || 0) + (importResult.failed || 0) + (importResult.skipped || 0)}
                      </p>
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
                      to="/crm/contacts/"
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition duration-150 ease-in-out"
                    >
                      View Imported Contacts
                    </Link>
                  </div>
                </div>
              )}

              {/* File Format Instructions */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">File Format Guidelines</h2>
                  <button
                    onClick={downloadTemplate}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    Download CSV template
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">CSV Format</h3>
                    <p className="text-gray-400 text-sm">
                      Header row required. Column names are auto-detected — email (or e-mail, mail) is required;
                      name / first name + last name, phone, company, title, tags, and status are optional and can be
                      remapped before importing.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">JSON Format</h3>
                    <p className="text-gray-400 text-sm">
                      Array of contact objects — or an object with a <code className="text-purple-300">contacts</code> array — with
                      fields like name, email, phone, company, tags, status. Keys are treated as columns.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">Tags</h3>
                    <p className="text-gray-400 text-sm">Separate multiple tags with semicolons, pipes, or commas — e.g. <code className="text-purple-300">vip;newsletter</code></p>
                  </div>

                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">Status Values</h3>
                    <p className="text-gray-400 text-sm">Valid status values: customer, lead, prospect (defaults to lead)</p>
                  </div>

                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">Duplicates</h3>
                    <p className="text-gray-400 text-sm">
                      Rows with a duplicate email inside the same file are skipped and reported. Clean your file first
                      with our free{' '}
                      <Link to="/tools/csv-deduplicator/" className="text-purple-400 hover:text-purple-300 underline">
                        CSV Deduplicator
                      </Link>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">Excel & XML</h3>
                    <p className="text-gray-400 text-sm">
                      .xls, .xlsx, and .xml files are uploaded and processed server-side with the same field names.
                    </p>
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
