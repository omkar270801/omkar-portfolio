import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  envDir: '..',
  server: {
    host: 'localhost',
    port: 5173,
    open: false,
=======
  server: {
    host: 'omkarchandorkar-portfolio.local',
    port: 80,
    open: true,
>>>>>>> 87a19f2c47a81131568efa48f4f43f1e63c09003
  },
});
