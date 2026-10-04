import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
import { headTags, robotsTxt, sitemapXml } from './src/lib/schema.ts';

/** Injeta title, metas, Open Graph e JSON-LD a partir de src/data/site.ts e gera robots/sitemap. */
function seo(): Plugin {
  return {
    name: 'pasta-seo',
    transformIndexHtml: (html) => html.replace('<!--app-head-->', headTags()),
    generateBundle() {
      if (this.environment.config.consumer !== 'client') return;
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools({ removeMetadata: true }), seo()],
  build: {
    // As fotos já saem em AVIF/WebP; nada pequeno o bastante para virar data URI.
    assetsInlineLimit: 2048,
  },
});
