import { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const parseResponse = async (response) => {
      const text = await response.text();
      if (!text) return null;
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    };

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await parseResponse(response);
      if (!response.ok) {
        const errorMessage = data && typeof data === 'object' && data.message ? data.message : data || 'Login failed';
        throw new Error(errorMessage);
      }
      if (!data || !data.token) throw new Error('Authentication failed. No token returned.');
      login(data.token);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-24 text-slate-100">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-10 shadow-glow backdrop-blur-xl">
        <h1 className="text-4xl font-semibold tracking-tight text-white">Admin Login</h1>
        <p className="mt-3 text-slate-400">Access the dashboard to manage projects and messages.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </label>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button type="submit" className="btn-primary w-full">Sign In</button>
          <button type="button" onClick={() => navigate('/')} className="btn-secondary w-full">Back to portfolio</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
