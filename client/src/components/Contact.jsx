import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending...');
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await parseResponse(response);
      if (!response.ok) {
        const errorMessage = data && typeof data === 'object' && data.message ? data.message : data || 'Submission failed';
        throw new Error(errorMessage);
      }
      setStatus('Message sent successfully.');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus(error.message || 'Submission failed');
    }
  };

  return (
    <section id="contact" className="mb-24">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Contact</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">Start your next project</h2>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-[2rem] border border-slate-700 p-10 shadow-xl">
          <p className="text-lg leading-8 text-slate-300">I’m available for remote and hybrid opportunities. Send me a message and I’ll respond within 24 hours.</p>
          <div className="mt-10 space-y-6 text-slate-300">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Email</p>
              <p className="mt-2">omkarchandorkar27@gmail.com</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Phone</p>
              <p className="mt-2">+91 99677 36905</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Location</p>
              <p className="mt-2">Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="glass rounded-[2rem] border border-slate-700 p-10 shadow-xl">
          <div className="grid gap-6">
            <label className="block text-sm text-slate-300">
              Name
              <input name="name" value={form.name} onChange={handleChange} required className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>
            <label className="block text-sm text-slate-300">
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>
            <label className="block text-sm text-slate-300">
              Message
              <textarea name="message" value={form.message} onChange={handleChange} required rows="6" className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>
            <button type="submit" className="btn-primary w-full">Send message</button>
            {status && <p className="text-sm text-slate-300">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
