import { useState, useEffect } from 'react';

const links = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Experience', target: 'experience' },
  { label: 'Services', target: 'services' },
  { label: 'Contact', target: 'contact' },
];

function Navbar() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${sticky ? 'border-b border-slate-700/80 bg-slate-950/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a href="#hero" className="cursor-pointer text-lg font-semibold tracking-wide text-white">
         
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <a key={item.target} href={`#${item.target}`} className="cursor-pointer text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </a>
          ))}
          <a href="/login" className="rounded-full border border-slate-700 bg-slate-900/70 px-5 py-2 text-sm text-slate-100 transition hover:border-cyan-400 hover:text-white">
            Admin
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
