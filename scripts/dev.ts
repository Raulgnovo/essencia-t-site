/**
 * Servidor local simples: gera o site e serve a pasta dist/.
 * Uso: npm run dev   (porta 3000, ou defina PORT)
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");
const port = Number(process.env.PORT ?? 3000);

// Gera o site diretamente (sem depender de npx/shell, que falha no Windows).
await import("../src/build");

if (!existsSync(join(dist, "index.html"))) {
  console.error("Não foi possível gerar o site: dist/index.html não existe. Veja as mensagens de erro acima.");
  process.exit(1);
}

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "");
  let file = resolve(dist, rel);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!file.startsWith(dist) || !existsSync(file)) {
    res.writeHead(404, { "content-type": types[".html"] as string });
    res.end(readFileSync(join(dist, "404.html")));
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(port, () =>
  console.log(`\nSite no ar: http://localhost:${port}\n(Para parar, aperte Ctrl + C. Após editar arquivos, rode "npm run dev" de novo.)`),
);
