import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { Navigate } from 'react-router-dom';

function AdminPage() {
  const { token, logout } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (!token) return;
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/messages`, { headers }),
      fetch(`${import.meta.env.VITE_API_URL}/projects`, { headers }),
    ])
      .then(async ([messagesRes, projectsRes]) => {
        const messagesData = await messagesRes.json();
        const projectsData = await projectsRes.json();
        if (messagesRes.ok) setMessages(messagesData);
        if (projectsRes.ok) setProjects(projectsData);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleDeleteMessage = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, { method: 'DELETE', headers });
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
                          await fetch(`${import.meta.env.VITE_API_URL}/projects/${project._id}`, {
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
