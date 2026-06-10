import { Github, Linkedin, Mail } from 'lucide-react';

const links = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/omkar270801' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/omkar-chandorkar-4ab81622a' },
  { icon: Mail, label: 'Email', href: 'mailto:omkarchandorkar27@gmail.com' },
];

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 px-6 py-8 text-slate-400 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()}. Omkar Chandorkar. Crafted for premium impact.</p>
        <div className="flex flex-wrap items-center gap-4">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
              <link.icon className="h-4 w-4" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
