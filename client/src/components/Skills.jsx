import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

function Skills() {
  return (
    <section id="skills" className="mb-24">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Skills</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">Technical expertise</h2>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {skillCategories.map((category, index) => (
          <motion.div key={category.title} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="glass rounded-[2rem] border border-slate-700 p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/15 text-cyan-300 shadow-glow">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
                <p className="text-sm text-slate-400">{category.skills.length} strong tools</p>
              </div>
            </div>
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
