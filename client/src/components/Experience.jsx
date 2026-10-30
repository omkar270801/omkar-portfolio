import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { timeline } from '../data/portfolioData';
import { API_URL } from '../config/api';
import { usePortfolioContent } from './PortfolioContentProvider';

function Experience() {
  const { content: { sectionHeadings } } = usePortfolioContent();
  const heading = sectionHeadings.experience;
  const [careerTimeline, setCareerTimeline] = useState(timeline);

  useEffect(() => {
    fetch(`${API_URL}/content`)
      .then((response) => (response.ok ? response.json() : null))
      .then((content) => {
        if (Array.isArray(content?.timeline) && content.timeline.length > 0) {
          setCareerTimeline(content.timeline.filter((item) => item.title !== 'Achievements'));
        }
      })
      .catch(() => {
        // Keep the bundled timeline available when the API is unavailable.
      });
  }, [API_URL]);

  return (
    <section id="experience" className="mb-24">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">{heading.eyebrow}</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">{heading.title}</h2>
      </div>
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-950/70 p-8 shadow-xl">
        <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-violet-500 opacity-50" />
        <div className="space-y-8 pl-12">
          {careerTimeline.map((item, index) => (
            <motion.div key={item._id || `${item.date}-${item.title}`} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.08 }} className="relative">
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
