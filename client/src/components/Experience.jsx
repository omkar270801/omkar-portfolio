import { motion } from 'framer-motion';
import { timeline } from '../data/portfolioData';

function Experience() {
  return (
    <section id="experience" className="mb-24">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Experience</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">Career timeline</h2>
      </div>
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-950/70 p-8 shadow-xl">
        <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-violet-500 opacity-50" />
        <div className="space-y-8 pl-12">
          {timeline.map((item, index) => (
            <motion.div key={item.date} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.08 }} className="relative">
              <div className="absolute left-[-1.45rem] top-2 h-4 w-4 rounded-full bg-cyan-400 shadow-glow" />
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.date}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-cyan-300">{item.organization}</p>
              <p className="mt-4 max-w-2xl text-slate-400">{item.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
