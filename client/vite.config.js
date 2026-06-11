import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'omkarchandorkar-portfolio.local',
    port: 80,
    open: true,
  },
});
