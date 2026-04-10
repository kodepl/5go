import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ============================================
// KONFIGURACJA ASTRO - 5Go Blog
// ============================================

export default defineConfig({
  // URL domeny 5go.biz
  site: 'https://5go.biz',
  
  // Tryb statycznego generowania
  output: 'static',
  
  // Integracje
  integrations: [
    tailwind({
      configFile: './tailwind.config.mjs',
      applyBaseStyles: false,
    }),
    // Sitemap automatyczny - zbiera wszystkie statyczne strony
    sitemap(),
  ],
  
  // Optymalizacje obrazów
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: ['picsum.photos'],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  
  // Konfiguracja buildu
  build: {
    format: 'directory',
  },
  
  // Prefetchowanie linków
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  
  // Vite config
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
    },
  },
});
