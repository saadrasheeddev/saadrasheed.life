// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://saadrasheed.life', // 👈 required for sitemap
  integrations: [
    react(),
    sitemap(),                       // 👈 auto-generates /sitemap.xml
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});