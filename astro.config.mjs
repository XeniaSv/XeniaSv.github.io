import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Пользовательский сайт GitHub Pages (<user>.github.io) отдаётся из корня,
// поэтому `base` не нужен. Если репозиторий станет проектным (<user>.github.io/<repo>),
// задайте BASE_PATH=/<repo> при сборке (см. README).
const site = process.env.SITE_URL ?? 'https://xeniasv.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx()],
  build: { format: 'directory' },
});
