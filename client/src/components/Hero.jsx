import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { hero } from '../data/portfolioData';

function Hero() {
  return (
    <section id="hero" className="relative mb-24 overflow-hidden rounded-[3rem] bg-hero-gradient px-6 py-28 text-slate-100 sm:px-10 md:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_30%)]" />
      <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }} className="glass relative overflow-hidden rounded-[2.5rem] border border-white/10 px-8 py-16 shadow-[0_45px_120px_rgba(15,23,42,0.5)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_42%)] opacity-40" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Premium digital experiences</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white md:text-6xl">{hero.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{hero.tagline}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {hero.ctas.map((cta) => {
                const href = cta.target ? `#${cta.target.replace('#', '')}` : cta.href;
                const className = cta.type === 'primary' ? 'btn-primary' : 'btn-secondary';
                return (
                  <a key={cta.label} href={href} className={`${className} ${cta.type === 'secondary' ? 'border-slate-600' : ''}` }>
                    {cta.label}
                    {cta.type === 'primary' ? <ArrowRight className="ml-2 h-4 w-4" /> : <Download className="ml-2 h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
