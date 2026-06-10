import { motion } from 'framer-motion';
import { about } from '../data/portfolioData';

function About() {
  return (
    <section id="about" className="mb-24">
      <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">About</p>
          <h2 className="mt-3 text-4xl font-semibold text-white">Professional Summary</h2>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="glass rounded-[2rem] border border-slate-700 p-8 shadow-xl">
          <p className="text-lg leading-8 text-slate-300">{about.summary}</p>
          <div className="mt-8 rounded-[1.75rem] border border-slate-700 bg-slate-950/70 p-6">
            <h3 className="text-xl font-semibold text-white">Career goals</h3>
            <p className="mt-3 text-slate-400">{about.goals}</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="space-y-4">
          {about.skills.map((skill) => (
            <div key={skill} className="glass rounded-3xl border border-slate-700 p-6 shadow-xl">
              <p className="font-semibold text-white">{skill}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
