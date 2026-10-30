import { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { achievements as defaultAchievements } from '../data/portfolioData';
import { API_URL } from '../config/api';
import { usePortfolioContent } from './PortfolioContentProvider';

function Achievements() {
  const { content: { sectionHeadings } } = usePortfolioContent();
  const heading = sectionHeadings.achievements;
  const [achievements, setAchievements] = useState(defaultAchievements);

  useEffect(() => {
    fetch(`${API_URL}/content`)
      .then((response) => (response.ok ? response.json() : null))
      .then((content) => {
        if (Array.isArray(content?.achievements)) setAchievements(content.achievements);
      })
      .catch(() => {
        // Keep the bundled achievements visible when the API is unavailable.
      });
  }, []);

  if (!achievements.length) return null;

  return (
    <section id="achievements" className="mb-24">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">{heading.eyebrow}</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">{heading.title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((item, index) => (
          <article key={item._id || `${item.year}-${item.title}-${index}`} className="glass rounded-3xl border border-slate-700 p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <span className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300"><Award className="h-6 w-6" /></span>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.year}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                {item.organization && <p className="mt-1 text-sm text-cyan-300">{item.organization}</p>}
                {item.details && <p className="mt-3 leading-6 text-slate-400">{item.details}</p>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Achievements;
