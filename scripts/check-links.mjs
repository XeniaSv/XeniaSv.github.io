// Проверка внутренних ссылок и ассетов в собранном сайте (dist/).
// Запуск: npm run build && npm run check:links
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const base = (process.env.BASE_PATH ?? '/').replace(/\/$/, '');

if (!existsSync(DIST)) {
  console.error('dist/ не найден — сначала выполните `npm run build`.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const problems = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const page = '/' + relative(DIST, file).split(sep).join('/');

  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(raw)) continue;
    checked++;
    const [pathPart, hash] = raw.split('#');
    let target = pathPart;
    if (target === '') {
      // Якорь на текущей странице.
      if (hash && !ids.has(decodeURIComponent(hash))) problems.push(`${page}: нет якоря #${hash}`);
      continue;
    }
    if (!target.startsWith('/')) continue; // относительные пути в проекте не используются
    if (base && target.startsWith(base)) target = target.slice(base.length) || '/';
    const candidates = [target, join(target, 'index.html')];
    const found = candidates.some((c) => existsSync(join(DIST, c)) && statSync(join(DIST, c)).isFile());
    if (!found) {
      problems.push(`${page}: битая ссылка ${attr}="${raw}"`);
      continue;
    }
    if (hash && target.endsWith('/')) {
      const targetHtml = readFileSync(join(DIST, target, 'index.html'), 'utf8');
      const targetIds = new Set([...targetHtml.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
      if (!targetIds.has(decodeURIComponent(hash))) problems.push(`${page}: в ${target} нет якоря #${hash}`);
    }
  }
}

if (problems.length) {
  console.error(`Найдено проблем: ${problems.length}`);
  problems.forEach((p) => console.error(' - ' + p));
  process.exit(1);
}
console.log(`OK: ${htmlFiles.length} страниц, проверено ссылок/ассетов: ${checked}`);
