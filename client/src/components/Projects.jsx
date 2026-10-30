import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { API_URL } from '../config/api';
import { usePortfolioContent } from './PortfolioContentProvider';

function Projects() {
  const { content: { sectionHeadings } } = usePortfolioContent();
  const heading = sectionHeadings.projects;
  const [visibleProjects, setVisibleProjects] = useState(projects);

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) setVisibleProjects(data);
      })
      .catch(() => {
        // Keep the bundled projects visible when the API is unavailable.
      });
  }, []);

  return (
    <section id="projects" className="mb-24">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">{heading.eyebrow}</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">Projects</h2>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <motion.article key={project._id || project.id || project.title} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.08 }} className="group overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-950/80 shadow-xl transition hover:-translate-y-1 hover:shadow-glow">
            <div className="relative h-56 overflow-hidden bg-slate-900">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">{project.category}</span>
                <div className="flex items-center gap-2 text-slate-400">
                  <Layers className="h-4 w-4" />
                  <span className="text-xs">{project.tech.join(' • ')}</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              <p className="text-sm leading-6 text-slate-400">{project.description}</p>
              <div className="grid gap-2 py-2 text-sm text-slate-300">
                {(project.features || []).map((feature) => (
                  <span key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    {feature}
                  </span>
                ))}
              </div>
              {project.title === 'Birthday Wish Email System' && project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10"
                >
                  Live application
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
