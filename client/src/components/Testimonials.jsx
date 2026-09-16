import { motion } from 'framer-motion';
import { testimonials } from '../data/portfolioData';

function Testimonials() {
  return (
    <section id="testimonials" className="mb-24">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Testimonials</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">What clients say</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.div key={item.author} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.08 }} className="glass rounded-[2rem] border border-slate-700 p-8 shadow-xl">
            <p className="text-lg leading-8 text-slate-200">“{item.quote}”</p>
            <div className="mt-8">
              <p className="font-semibold text-white">{item.author}</p>
              <p className="text-sm text-slate-400">{item.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
