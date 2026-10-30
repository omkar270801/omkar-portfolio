import { Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolioContent } from './PortfolioContentProvider';

const icons = { Github, Linkedin, Mail };

function Footer() {
  const { content: { footer, hero } } = usePortfolioContent();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 px-6 py-8 text-slate-400 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()}. {hero.name}. {footer.copyright}</p>
        <div className="flex flex-wrap items-center gap-4">
          {footer.links.map((link) => {
            const Icon = icons[link.icon] || Mail;
            return (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
              <Icon className="h-4 w-4" />
              {link.label}
            </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
