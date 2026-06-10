/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 60px rgba(83, 110, 255, 0.18)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(94, 114, 228, 0.22), transparent 42%), radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.15), transparent 20%), radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.18), transparent 25%)',
      },
      colors: {
        bg: '#0b1220',
        surface: '#121b2f',
        panel: 'rgba(15, 23, 42, 0.76)',
        accent: '#5e72e4',
      },
    },
  },
  plugins: [],
};
