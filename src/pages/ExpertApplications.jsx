import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import ProtectedRoute from '../components/ProtectedRoute';
import { adminExpertsAPI } from '../services/api';
import toast from 'react-hot-toast';

const STATUSES = [
  { id: 'new', label: 'New', color: 'blue' },
  { id: 'reviewed', label: 'Reviewed', color: 'purple' },
  { id: 'intro-call', label: 'Intro call', color: 'yellow' },
  { id: 'trial-task', label: 'Trial task', color: 'orange' },
  { id: 'bench', label: 'Bench', color: 'green' },
  { id: 'rejected', label: 'Rejected', color: 'red' },
];

const STATUS_STYLE = {
  new: 'bg-blue-900/40 text-blue-300 border-blue-700/60',
  reviewed: 'bg-purple-900/40 text-purple-300 border-purple-700/60',
  'intro-call': 'bg-yellow-900/40 text-yellow-300 border-yellow-700/60',
  'trial-task': 'bg-orange-900/40 text-orange-300 border-orange-700/60',
  bench: 'bg-green-900/40 text-green-300 border-green-700/60',
  rejected: 'bg-red-900/40 text-red-300 border-red-700/60',
};

function DetailDrawer({ app, onClose, onStatus, onNote }) {
  const [note, setNote] = useState('');
  if (!app) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative w-full max-w-lg bg-gray-900 border-l border-gray-700 h-full overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">{app.name}</h2>
            <a href={`mailto:${app.email}`} className="text-purple-400 text-sm hover:text-purple-300">{app.email}</a>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between"><span className="text-gray-500">Track</span><span className="text-gray-200">{app.skillTrack}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Seniority</span><span className="text-gray-200">{app.seniority}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Project</span><span className="text-gray-200 text-right">{app.project}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Availability</span><span className="text-gray-200">{app.availability}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Timezone</span><span className="text-gray-200">{app.timezone}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Submitted</span><span className="text-gray-200">{new Date(app.createdAt).toLocaleString()}</span></div>
        </div>

        <div className="flex gap-3 mb-6 text-sm">
          {app.portfolioUrl && <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">Portfolio →</a>}
          {app.linkedinUrl && <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">LinkedIn →</a>}
        </div>

        {app.message && (
          <div className="bg-gray-800 rounded-md p-4 mb-6">
            <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Message</h4>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{app.message}</p>
          </div>
        )}

        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3">Move to</h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {STATUSES.filter((s) => s.id !== app.status).map((s) => (
            <button key={s.id} onClick={() => onStatus(app._id, s.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${STATUS_STYLE[s.id]} hover:opacity-80`}>
              {s.label}
            </button>
          ))}
        </div>

        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3">Internal notes</h4>
        <div className="space-y-2 mb-3">
          {(app.internalNotes || []).map((n, i) => (
            <div key={i} className="bg-gray-800 rounded-md p-3 text-sm">
              <p className="text-gray-300">{n.text}</p>
              <p className="text-gray-600 text-xs mt-1">{n.author?.name || 'staff'} · {new Date(n.createdAt).toLocaleString()}</p>
            </div>
          ))}
          {!(app.internalNotes || []).length && <p className="text-gray-600 text-sm">No notes yet.</p>}
        </div>
        <div className="flex gap-2">
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note…"
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600 text-sm focus:border-purple-500 focus:outline-none"
            onKeyDown={(e) => { if (e.key === 'Enter' && note.trim()) { onNote(app._id, note.trim()); setNote(''); } }} />
          <button onClick={() => { if (note.trim()) { onNote(app._id, note.trim()); setNote(''); } }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-md text-sm font-semibold">Add</button>
        </div>
      </div>
    </div>
  );
}

function ExpertApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [trackFilter, setTrackFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page };
      if (statusFilter) params.status = statusFilter;
      if (trackFilter) params.track = trackFilter;
      if (projectFilter) params.project = projectFilter;
      if (search) params.q = search;
      const res = await adminExpertsAPI.getApplications(params);
      setApps(res.applications || res.items || []);
      setPages(res.pages || res.totalPages || 1);
    } catch {
      toast.error('Could not load applications');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, trackFilter, projectFilter, search, page]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, status) => {
    try {
      await adminExpertsAPI.updateStatus(id, status);
      toast.success(`Moved to ${status.replace('-', ' ')}`);
      setSelected(null);
      load();
    } catch { toast.error('Status update failed'); }
  };

  const addNote = async (id, text) => {
    try {
      await adminExpertsAPI.addNote(id, text);
      const res = await adminExpertsAPI.getApplication(id);
      setSelected(res.application || res);
      load();
    } catch { toast.error('Could not add note'); }
  };

  const counts = STATUSES.map((s) => ({ ...s, n: apps.filter((a) => a.status === s.id).length }));

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
        <Header />
        <main className="grow">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <PageIllustration />
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                  <h1 className="h1 mb-2">Expert Applications</h1>
                  <p className="text-xl text-gray-400">Expert Hub pipeline — review, triage, and move applicants through the bench</p>
                </div>
                <Link to="/crm/" className="text-sm text-purple-400 hover:text-purple-300">← Back to CRM</Link>
              </div>

              {/* Status chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button onClick={() => { setStatusFilter(''); setPage(1); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${!statusFilter ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
                  All
                </button>
                {counts.map((s) => (
                  <button key={s.id} onClick={() => { setStatusFilter(s.id); setPage(1); }}
                    className={`px-4 py-2 rounded-md text-sm font-medium border transition ${statusFilter === s.id ? 'bg-purple-600 text-white border-purple-600' : `${STATUS_STYLE[s.id]} hover:opacity-80`}`}>
                    {s.label}{s.n ? ` (${s.n})` : ''}
                  </button>
                ))}
              </div>

              {/* Filters */}
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search name or email…"
                  className="bg-gray-800 text-white px-4 py-2.5 rounded-md border border-gray-700 text-sm focus:border-purple-500 focus:outline-none" />
                <select value={trackFilter} onChange={(e) => { setTrackFilter(e.target.value); setPage(1); }}
                  className="bg-gray-800 text-white px-4 py-2.5 rounded-md border border-gray-700 text-sm focus:border-purple-500 focus:outline-none">
                  <option value="">All skill tracks</option>
                  {['Blockchain & DLT', 'Payments & Financial Messaging', 'Healthcare Interoperability', 'Security & Compliance', 'Frontend Engineering', 'Backend & APIs', 'Something else'].map((t) => <option key={t}>{t}</option>)}
                </select>
                <select value={projectFilter} onChange={(e) => { setProjectFilter(e.target.value); setPage(1); }}
                  className="bg-gray-800 text-white px-4 py-2.5 rounded-md border border-gray-700 text-sm focus:border-purple-500 focus:outline-none">
                  <option value="">All projects</option>
                  <option>General application</option>
                  <option>Open-source products & ventures</option>
                </select>
              </div>

              {/* Table */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-700">
                      <th className="px-5 py-3 font-medium">Applicant</th>
                      <th className="px-5 py-3 font-medium hidden md:table-cell">Track</th>
                      <th className="px-5 py-3 font-medium hidden lg:table-cell">Project</th>
                      <th className="px-5 py-3 font-medium hidden sm:table-cell">Seniority</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium hidden lg:table-cell">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/60">
                    {apps.map((a) => (
                      <tr key={a._id} onClick={() => setSelected(a)} className="hover:bg-gray-700/40 cursor-pointer transition">
                        <td className="px-5 py-3">
                          <div className="text-gray-200 font-medium">{a.name}</div>
                          <div className="text-gray-500 text-xs">{a.email}</div>
                        </td>
                        <td className="px-5 py-3 text-gray-400 hidden md:table-cell">{a.skillTrack}</td>
                        <td className="px-5 py-3 text-gray-400 hidden lg:table-cell max-w-[200px] truncate">{a.project}</td>
                        <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">{a.seniority}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLE[a.status] || STATUS_STYLE.new}`}>
                            {(a.status || 'new').replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-500 hidden lg:table-cell">{new Date(a.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!loading && !apps.length && <p className="text-gray-500 text-center py-10">No applications match these filters.</p>}
                {loading && <p className="text-gray-500 text-center py-10">Loading…</p>}
              </div>

              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: pages }, (_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 rounded-md text-sm ${page === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <DetailDrawer app={selected} onClose={() => setSelected(null)} onStatus={updateStatus} onNote={addNote} />
      </div>
    </ProtectedRoute>
  );
}

export default ExpertApplications;
