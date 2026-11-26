// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow.
// For a repo named kiwi9t.github.io the base path is "/".
// For any other repo name it is "/<repo-name>".
export default defineConfig({
  site: process.env.SITE_URL || 'https://kiwi9t.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
});
