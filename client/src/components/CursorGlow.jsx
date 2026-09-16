import { useEffect, useState } from 'react';

function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-50 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl transition-transform duration-150"
      style={{ transform: `translate3d(${position.x - 96}px, ${position.y - 96}px, 0)` }}
    />
  );
}

export default CursorGlow;
