import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { timeline as defaultTimeline } from '../data/portfolioData';
import { Navigate } from 'react-router-dom';

function AdminPage() {
  const { token, logout } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [careerTimeline, setCareerTimeline] = useState(defaultTimeline);
  const [timelineSaving, setTimelineSaving] = useState(false);
  const [timelineStatus, setTimelineStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const headers = {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError('');

    Promise.all([
      fetch(`${API_URL}/messages`, { headers }),
      fetch(`${API_URL}/projects`, { headers }),
      fetch(`${API_URL}/content`),
    ])
      .then(async ([messagesRes, projectsRes, contentRes]) => {
        if (!messagesRes.ok) {
          const errorBody = await messagesRes.json().catch(() => null);
          throw new Error(errorBody?.message || 'Failed to fetch messages');
        }
        if (!projectsRes.ok) {
          const errorBody = await projectsRes.json().catch(() => null);
          throw new Error(errorBody?.message || 'Failed to fetch projects');
        }
        if (!contentRes.ok) {
          const errorBody = await contentRes.json().catch(() => null);
          throw new Error(errorBody?.message || 'Failed to fetch portfolio content');
        }

        const [messagesData, projectsData, contentData] = await Promise.all([
          messagesRes.json(),
          projectsRes.json(),
          contentRes.json(),
        ]);

        setMessages(messagesData);
        setProjects(projectsData);
        if (Array.isArray(contentData.timeline)) setCareerTimeline(contentData.timeline);
      })
      .catch((fetchError) => {
        setError(fetchError.message || 'Failed to fetch admin data');
      })
      .finally(() => setLoading(false));
  }, [token]);

  const updateTimelineItem = (index, field, value) => {
    setCareerTimeline((currentTimeline) => currentTimeline.map((item, itemIndex) => (
      itemIndex === index ? { ...item, [field]: value } : item
    )));
    setTimelineStatus('');
  };

  const addTimelineItem = () => {
    setCareerTimeline((currentTimeline) => [
      ...currentTimeline,
      { date: '', title: '', organization: '', details: '' },
    ]);
    setTimelineStatus('');
  };

  const removeTimelineItem = (index) => {
    setCareerTimeline((currentTimeline) => currentTimeline.filter((_, itemIndex) => itemIndex !== index));
    setTimelineStatus('');
  };

  const saveTimeline = async () => {
    setTimelineSaving(true);
    setTimelineStatus('');
    try {
      const response = await fetch(`${API_URL}/content`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ timeline: careerTimeline }),
      });
      const content = await response.json().catch(() => null);
      if (!response.ok) throw new Error(content?.message || 'Failed to save career timeline');
      setCareerTimeline(content.timeline || careerTimeline);
      setTimelineStatus('Career timeline saved.');
    } catch (saveError) {
      setTimelineStatus(saveError.message || 'Failed to save career timeline');
    } finally {
      setTimelineSaving(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE', headers });
    setMessages(messages.filter((message) => message._id !== id));
  };

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-glow backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <p className="mt-2 text-slate-400">Manage projects and incoming messages securely.</p>
          </div>
          <button onClick={logout} className="btn-secondary">Logout</button>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl border border-slate-700 p-6 shadow-xl lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Career Timeline</h2>
                <p className="mt-2 text-slate-400">Update the experience and education shown on your portfolio.</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={addTimelineItem} className="btn-secondary">Add entry</button>
                <button type="button" onClick={saveTimeline} disabled={timelineSaving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                  {timelineSaving ? 'Saving…' : 'Save timeline'}
                </button>
              </div>
            </div>
            <div className="mt-6 space-y-5">
              {careerTimeline.map((item, index) => (
                <div key={item._id || index} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="font-semibold text-white">Entry {index + 1}</p>
                    <button type="button" onClick={() => removeTimelineItem(index)} className="rounded-full border border-rose-500 px-3 py-1 text-rose-300 transition hover:bg-rose-500/10">Delete</button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ['date', 'Date'],
                      ['title', 'Title'],
                      ['organization', 'Organization'],
                    ].map(([field, label]) => (
                      <label key={field} className="block text-sm text-slate-300">
                        {label}
                        <input
                          value={item[field] || ''}
                          onChange={(event) => updateTimelineItem(index, field, event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        />
                      </label>
                    ))}
                  </div>
                  <label className="mt-4 block text-sm text-slate-300">
                    Details
                    <textarea
                      value={item.details || ''}
                      onChange={(event) => updateTimelineItem(index, 'details', event.target.value)}
                      rows="3"
                      className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                    />
                  </label>
                </div>
              ))}
            </div>
            {timelineStatus && <p className={`mt-4 text-sm ${timelineStatus.includes('saved') ? 'text-emerald-400' : 'text-rose-400'}`}>{timelineStatus}</p>}
          </div>

          <div className="glass rounded-3xl border border-slate-700 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">Project Management</h2>
            <p className="mt-2 text-slate-400">Use the backend API to keep your portfolio projects up to date.</p>
            <div className="mt-6 space-y-4">
              {loading ? (
                <p className="text-slate-400">Loading projects…</p>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-white">{project.title}</h3>
                        <p className="text-sm text-slate-400">{project.category}</p>
                      </div>
                      <button
                        onClick={async () => {
                          await fetch(`${API_URL}/projects/${project._id}`, {
                            method: 'DELETE',
                            headers,
                          });
                          setProjects(projects.filter((item) => item._id !== project._id));
                        }}
                        className="rounded-full border border-rose-500 px-3 py-1 text-rose-300 transition hover:bg-rose-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass rounded-3xl border border-slate-700 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">Messages</h2>
            <p className="mt-2 text-slate-400">Review contact submissions from your portfolio visitors.</p>
            <div className="mt-6 space-y-3">
              {loading ? (
                <p className="text-slate-400">Loading messages…</p>
              ) : messages.length === 0 ? (
                <p className="text-slate-400">No messages yet.</p>
              ) : (
                messages.map((message) => (
                  <div key={message._id} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{message.name}</p>
                        <p className="text-sm text-slate-400">{message.email}</p>
                      </div>
                      <button onClick={() => handleDeleteMessage(message._id)} className="rounded-full border border-rose-500 px-3 py-1 text-rose-300 hover:bg-rose-500/10">Delete</button>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{message.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
