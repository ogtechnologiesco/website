import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';
import { expertNetworkAPI } from '../services/api';
import toast from 'react-hot-toast';

const inputClass = 'w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none text-sm';
const POLL_MS = 10000;
const ME_POLL_MS = 60000;

const timeAgo = (d) => {
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

const Avatar = ({ name = '?', vetted }) => (
  <div className="relative shrink-0">
    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
      {(name || '?').charAt(0).toUpperCase()}
    </div>
    {vetted && <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full" title="Vetted expert" />}
  </div>
);

function PersonCard({ person, action, actionLabel, note }) {
  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar name={person.name} vetted={person.isVetted} />
        <div className="min-w-0">
          <div className="text-white font-medium truncate">{person.name}</div>
          <div className="text-gray-500 text-xs truncate">{person.skillTrack}{person.headline ? ` · ${person.headline}` : ''}</div>
        </div>
      </div>
      <div className="flex gap-2 text-xs">
        {person.portfolioUrl && <a href={person.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">Portfolio</a>}
        {person.linkedinUrl && <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">LinkedIn</a>}
      </div>
      {note && <p className="text-gray-400 text-sm italic border-l-2 border-purple-600 pl-3">{note}</p>}
      {action && <button onClick={action} className="mt-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition">{actionLabel}</button>}
    </div>
  );
}

function Feed({ me }) {
  const [filter, setFilter] = useState('suggested');
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [openComments, setOpenComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const load = useCallback(async (c = '') => {
    try {
      const res = await expertNetworkAPI.getFeed(filter, c);
      const items = res.posts || res.items || res || [];
      setPosts((prev) => (c ? [...prev, ...items] : items));
      setCursor(res.nextCursor || null);
    } catch { toast.error('Could not load feed'); }
  }, [filter]);

  useEffect(() => { setPosts([]); load(''); }, [filter]); // eslint-disable-line

  const publish = async () => {
    if (!text.trim() || busy) return;
    setBusy(true);
    try {
      const res = await expertNetworkAPI.createPost({ text: text.trim() });
      setPosts((p) => [res.post || res, ...p]);
      setText('');
    } catch { toast.error('Post failed'); }
    setBusy(false);
  };

  const like = async (id) => {
    try {
      await expertNetworkAPI.likePost(id);
      setPosts((p) => p.map((x) => x._id === id ? { ...x, likes: [...(x.likes || []), me.profile?._id || 'me'] } : x));
    } catch { /* noop */ }
  };

  const comment = async (id) => {
    const t = (commentText[id] || '').trim();
    if (!t) return;
    try {
      const res = await expertNetworkAPI.commentPost(id, t);
      setPosts((p) => p.map((x) => x._id === id ? { ...x, comments: [...(x.comments || []), res.comment || { text: t, author: me.profile, createdAt: new Date() }] } : x));
      setCommentText((c) => ({ ...c, [id]: '' }));
    } catch { toast.error('Comment failed'); }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} maxLength={2000}
          placeholder="Share what you're working on — wins, questions, tools, availability…" className={`${inputClass} resize-none`} />
        <div className="flex justify-between items-center mt-3">
          <span className="text-gray-500 text-xs">{2000 - text.length} left</span>
          <button onClick={publish} disabled={busy || !text.trim()} className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-2 rounded-md text-sm font-semibold transition">Post</button>
        </div>
      </div>
      <div className="flex gap-2">
        {['suggested', 'connections'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === f ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
            {f === 'suggested' ? 'Suggested' : 'My Connections'}
          </button>
        ))}
      </div>
      {posts.map((p) => (
        <article key={p._id} className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <Avatar name={p.author?.name} vetted={p.author?.isVetted} />
            <div>
              <div className="text-white font-medium">{p.author?.name || 'Expert'}{p.author?.isVetted && <span className="ml-2 text-xs text-green-400">✓ Vetted</span>}</div>
              <div className="text-gray-500 text-xs">{p.author?.skillTrack} · {timeAgo(p.createdAt)}</div>
            </div>
          </div>
          <p className="text-gray-300 whitespace-pre-wrap mb-4">{p.text}</p>
          <div className="flex gap-4 text-sm border-t border-gray-700 pt-3">
            <button onClick={() => like(p._id)} className="text-gray-400 hover:text-purple-400 transition">♥ {(p.likes || []).length || ''}</button>
            <button onClick={() => setOpenComments((c) => ({ ...c, [p._id]: !c[p._id] }))} className="text-gray-400 hover:text-purple-400 transition">💬 {(p.comments || []).length || ''}</button>
          </div>
          {openComments[p._id] && (
            <div className="mt-3 space-y-2">
              {(p.comments || []).map((c, i) => (
                <div key={i} className="text-sm text-gray-400 border-l-2 border-gray-700 pl-3">
                  <span className="text-gray-300 font-medium">{c.author?.name || 'Expert'}:</span> {c.text}
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <input value={commentText[p._id] || ''} onChange={(e) => setCommentText((c) => ({ ...c, [p._id]: e.target.value }))}
                  placeholder="Add a comment…" className={inputClass} onKeyDown={(e) => e.key === 'Enter' && comment(p._id)} />
                <button onClick={() => comment(p._id)} className="bg-gray-700 hover:bg-gray-600 text-white px-4 rounded-md text-sm">Send</button>
              </div>
            </div>
          )}
        </article>
      ))}
      {!posts.length && <p className="text-gray-500 text-center py-8">No posts yet — connect with experts or be the first to post.</p>}
      {cursor && <button onClick={() => load(cursor)} className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-md text-sm transition">Load more</button>}
    </div>
  );
}

function Network({ me }) {
  const [connections, setConnections] = useState([]);
  const [pending, setPending] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const load = useCallback(async () => {
    try {
      const [acc, pen, sug] = await Promise.all([
        expertNetworkAPI.getConnections('accepted'),
        expertNetworkAPI.getConnections('pending'),
        expertNetworkAPI.getSuggestions(),
      ]);
      setConnections(acc.connections || acc || []);
      setPending(pen.connections || pen || []);
      setSuggestions(sug.suggestions || sug || []);
    } catch { toast.error('Could not load network'); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const respond = async (id, action) => {
    try { await expertNetworkAPI.respondConnection(id, action); load(); } catch { toast.error('Failed'); }
  };
  const request = async (id) => {
    try { await expertNetworkAPI.requestConnection(id); toast.success('Request sent'); load(); } catch { toast.error('Could not send request'); }
  };
  const remove = async (id) => {
    try { await expertNetworkAPI.removeConnection(id); load(); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-10">
      {pending.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-white mb-4">Pending requests ({pending.length})</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {pending.map((c) => {
              const other = c.requester?._id === me.profile?._id ? c.recipient : c.requester;
              const incoming = c.recipient?._id === me.profile?._id || c.recipient === me.profile?._id;
              return (
                <PersonCard key={c._id} person={other} note={c.message}
                  action={incoming ? () => respond(c._id, 'accept') : () => remove(c._id)}
                  actionLabel={incoming ? 'Accept' : 'Withdraw'} />
              );
            })}
          </div>
        </section>
      )}
      <section>
        <h3 className="text-lg font-semibold text-white mb-4">My connections ({connections.length})</h3>
        {connections.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map((c) => {
              const other = c.requester?._id === me.profile?._id ? c.recipient : c.requester;
              return <PersonCard key={c._id} person={other} action={() => remove(c._id)} actionLabel="Disconnect" />;
            })}
          </div>
        ) : <p className="text-gray-500">No connections yet — send a few requests below.</p>}
      </section>
      <section>
        <h3 className="text-lg font-semibold text-white mb-4">People you may know</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((p) => (
            <PersonCard key={p._id} person={p} action={() => request(p._id)} actionLabel="Connect" />
          ))}
        </div>
        {!suggestions.length && <p className="text-gray-500">No suggestions right now — check back as more experts register.</p>}
      </section>
    </div>
  );
}

function Messages({ me }) {
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const lastTs = useRef('');
  const pollRef = useRef(null);
  const bottomRef = useRef(null);

  const loadConversations = useCallback(async () => {
    try {
      const res = await expertNetworkAPI.getConversations();
      setConversations(res.conversations || res || []);
    } catch { /* silent on poll */ }
  }, []);

  const loadMessages = useCallback(async (conv, initial = false) => {
    try {
      const res = await expertNetworkAPI.getMessages(conv._id, initial ? '' : lastTs.current);
      const items = res.messages || res || [];
      if (items.length) {
        setMessages((prev) => initial ? items : [...prev, ...items]);
        lastTs.current = items[items.length - 1].createdAt;
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    } catch { /* silent */ }
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  useEffect(() => {
    clearInterval(pollRef.current);
    if (active) {
      lastTs.current = '';
      setMessages([]);
      loadMessages(active, true);
      pollRef.current = setInterval(() => { loadMessages(active); loadConversations(); }, POLL_MS);
    }
    return () => clearInterval(pollRef.current);
  }, [active, loadMessages, loadConversations]);

  const send = async () => {
    const t = text.trim();
    if (!t || !active) return;
    const other = active.participants?.find((p) => p._id !== me.profile?._id) || {};
    try {
      const res = await expertNetworkAPI.sendMessage(other._id, t);
      setMessages((m) => [...m, res.message || { text: t, from: me.profile, createdAt: new Date() }]);
      setText('');
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch { toast.error('Could not send — connect first'); }
  };

  return (
    <div className="grid md:grid-cols-3 gap-4 h-[600px]">
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-y-auto">
        <div className="px-4 py-3 border-b border-gray-700 text-white font-semibold">Messages</div>
        {conversations.map((c) => {
          const other = c.participants?.find((p) => p._id !== me.profile?._id) || {};
          const unread = c.unreadCount?.[me.profile?._id] || 0;
          return (
            <button key={c._id} onClick={() => setActive(c)}
              className={`w-full text-left px-4 py-3 border-b border-gray-700/60 flex items-center gap-3 hover:bg-gray-700/40 transition ${active?._id === c._id ? 'bg-gray-700/60' : ''}`}>
              <Avatar name={other.name} vetted={other.isVetted} />
              <div className="min-w-0 flex-1">
                <div className="text-gray-200 text-sm font-medium truncate">{other.name}</div>
                <div className="text-gray-500 text-xs truncate">{c.lastMessage?.text}</div>
              </div>
              {unread > 0 && <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-0.5">{unread}</span>}
            </button>
          );
        })}
        {!conversations.length && <p className="text-gray-500 text-sm p-4">No conversations — connect with someone first.</p>}
      </div>
      <div className="md:col-span-2 bg-gray-800 rounded-lg border border-gray-700 flex flex-col">
        {active ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => {
                const mine = (m.from?._id || m.from) === me.profile?._id;
                return (
                  <div key={i} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${mine ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                      {m.text}
                      <div className={`text-[10px] mt-1 ${mine ? 'text-purple-200' : 'text-gray-500'}`}>{timeAgo(m.createdAt)}</div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
            <div className="p-3 border-t border-gray-700 flex gap-2">
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Type a message…" className={inputClass} />
              <button onClick={send} className="bg-purple-600 hover:bg-purple-700 text-white px-5 rounded-md font-semibold text-sm">Send</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">Select a conversation</div>
        )}
      </div>
    </div>
  );
}

function Profile({ me, reload }) {
  const [form, setForm] = useState({ headline: '', bio: '', openTo: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (me.profile) setForm({ headline: me.profile.headline || '', bio: me.profile.bio || '', openTo: me.profile.openTo || [] });
  }, [me]);

  const toggleOpenTo = (v) => setForm((f) => ({ ...f, openTo: f.openTo.includes(v) ? f.openTo.filter((x) => x !== v) : [...f.openTo, v] }));

  const save = async () => {
    setSaving(true);
    try { await expertNetworkAPI.updateProfile(form); toast.success('Profile saved'); reload(); } catch { toast.error('Save failed'); }
    setSaving(false);
  };

  const app = me.application || me.profile?.application;
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {app && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">My application</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500">Project:</span> <span className="text-gray-300">{app.project}</span></div>
            <div><span className="text-gray-500">Status:</span> <span className="text-purple-300 capitalize">{String(app.status || 'new').replace('-', ' ')}</span></div>
            <div><span className="text-gray-500">Track:</span> <span className="text-gray-300">{app.skillTrack}</span></div>
            <div><span className="text-gray-500">Submitted:</span> <span className="text-gray-300">{new Date(app.createdAt).toLocaleDateString()}</span></div>
          </div>
        </div>
      )}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold text-white">Network profile</h3>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Headline</label>
          <input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} maxLength={120}
            placeholder="e.g. Soroban & Go — payments infrastructure" className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Bio</label>
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} maxLength={1000}
            placeholder="What you're great at, what you want to work on…" className={`${inputClass} resize-none`} />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Open to</label>
          <div className="flex flex-wrap gap-2">
            {['project-sprint', 'staff-augmentation', 'specialist-advisory'].map((v) => (
              <button key={v} type="button" onClick={() => toggleOpenTo(v)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${form.openTo.includes(v) ? 'bg-purple-600 border-purple-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-300'}`}>
                {v.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </div>
        <button onClick={save} disabled={saving} className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition">
          {saving ? 'Saving…' : 'Save profile'}
        </button>
      </div>
    </div>
  );
}

function ExpertNetwork() {
  const [me, setMe] = useState(null);
  const [noProfile, setNoProfile] = useState(false);
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get('tab') || 'feed');

  const loadMe = useCallback(async () => {
    try {
      const res = await expertNetworkAPI.getMe();
      setMe(res);
      setNoProfile(false);
    } catch (e) {
      if (e.response?.status === 404 || e.response?.status === 403) setNoProfile(true);
      else toast.error('Could not load your expert profile');
    }
  }, []);

  useEffect(() => { loadMe(); const t = setInterval(loadMe, ME_POLL_MS); return () => clearInterval(t); }, [loadMe]);

  const tabs = [
    { id: 'feed', label: 'Feed' },
    { id: 'network', label: `My Network${me?.counts?.pendingRequests ? ` (${me.counts.pendingRequests})` : ''}` },
    { id: 'messages', label: `Messages${me?.counts?.unreadMessages ? ` (${me.counts.unreadMessages})` : ''}` },
    { id: 'profile', label: 'My Profile' },
  ];

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
        <Header />
        <main className="grow">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <PageIllustration />
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="mb-8">
                <h1 className="h1 mb-2">Expert Network</h1>
                <p className="text-xl text-gray-400">Connect with vetted experts, message directly, share with the bench</p>
              </div>

              {noProfile ? (
                <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8 border border-purple-700/40 text-center">
                  <h2 className="h4 mb-3">No application on file</h2>
                  <p className="text-gray-400 mb-6">The Expert Network is for members of the Expert Hub bench. Submit an application first — once it's on file, your network profile appears here automatically.</p>
                  <Link to="/expert-hub/" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition">Apply to the Expert Hub</Link>
                </div>
              ) : !me ? (
                <div className="text-gray-400 text-center py-12">Loading your profile…</div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 pb-4">
                    {tabs.map((t) => (
                      <button key={t.id} onClick={() => setTab(t.id)}
                        className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${tab === t.id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {tab === 'feed' && <Feed me={me} />}
                  {tab === 'network' && <Network me={me} />}
                  {tab === 'messages' && <Messages me={me} />}
                  {tab === 'profile' && <Profile me={me} reload={loadMe} />}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default ExpertNetwork;
