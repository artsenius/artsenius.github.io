import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain (www.arthursenko.com) serves from root, so base is '/'.
// Build output stays in 'build' to match the existing gh-pages deploy script.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://about-me-automation-backend.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
