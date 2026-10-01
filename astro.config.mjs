import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.mm-therapiepraxis.ch',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // ponytail: CSS is ~10 KB gzip, inlining saves the render-blocking request
  build: { inlineStylesheets: 'always' },
});
