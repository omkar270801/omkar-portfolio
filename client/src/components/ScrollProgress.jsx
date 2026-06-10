import { useEffect, useState } from 'react';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollDistance = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollDistance / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-slate-900/40">
      <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default ScrollProgress;
