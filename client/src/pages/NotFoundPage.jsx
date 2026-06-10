import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-24 text-center text-slate-100">
      <div className="max-w-xl rounded-3xl border border-slate-700 bg-slate-900/80 p-10 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">404 page</p>
        <h1 className="mt-6 text-5xl font-semibold">Page not found</h1>
        <p className="mt-4 text-slate-400">The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          Return home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
