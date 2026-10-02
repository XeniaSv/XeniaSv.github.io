// Временный сервер для пересборки петли hero (см. docs/HERO_BLOB.md):
//   node scripts/hero-loop/serve.mjs <путь-к-исходному.mp4>
// Отдаёт страницу кодировщика, исходник (/src.mp4), muxer из node_modules и принимает результат (POST /save/<имя>)
// в src/assets/bg/. Открыть в Chromium: http://localhost:4400/scripts/hero-loop/enc.html
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = process.argv[2];
if (!source || !fs.existsSync(source)) {
  console.error('Укажите путь к исходному mp4: node scripts/hero-loop/serve.mjs <файл.mp4>');
  process.exit(1);
}
const outDir = path.join(root, 'src/assets/bg');
const types = { '.mjs': 'text/javascript', '.js': 'text/javascript', '.html': 'text/html', '.mp4': 'video/mp4' };

http
  .createServer((req, res) => {
    const u = new URL(req.url, 'http://x');
    if (req.method === 'POST' && u.pathname.startsWith('/save/')) {
      const name = path.basename(u.pathname);
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => {
        fs.writeFileSync(path.join(outDir, name), Buffer.concat(chunks));
        res.end('saved ' + name);
      });
      return;
    }
    const file = u.pathname === '/src.mp4' ? source : path.join(root, decodeURIComponent(u.pathname));
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.statusCode = 404;
      return res.end('not found');
    }
    const size = fs.statSync(file).size;
    res.setHeader('Content-Type', types[path.extname(file)] ?? 'application/octet-stream');
    res.setHeader('Accept-Ranges', 'bytes');
    const m = /bytes=(\d+)-(\d*)/.exec(req.headers.range ?? '');
    if (m) {
      const start = +m[1];
      const end = m[2] ? +m[2] : size - 1;
      res.statusCode = 206;
      res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
      res.setHeader('Content-Length', end - start + 1);
      fs.createReadStream(file, { start, end }).pipe(res);
    } else {
      res.setHeader('Content-Length', size);
      fs.createReadStream(file).pipe(res);
    }
  })
  .listen(4400, () => console.log('http://localhost:4400/scripts/hero-loop/enc.html'));
