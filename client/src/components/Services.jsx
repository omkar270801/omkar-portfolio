import { motion } from 'framer-motion';
import { services } from '../data/portfolioData';
import { Globe2, Layers, Server, Sparkles } from 'lucide-react';

const icons = {
  Globe2,
  Layers,
  Server,
  Sparkles,
};

function Services() {
  return (
    <section id="services" className="mb-24">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Services</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">What I offer</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = icons[service.icon] || Globe2;
          return (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.06 }} className="glass rounded-[2rem] border border-slate-700 p-8 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/50">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 shadow-glow">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 text-slate-400">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
