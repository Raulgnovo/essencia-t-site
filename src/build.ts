import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { siteUrl } from "./data/site";
import { buildPages, notFound } from "./pages";
import { PUBLIC_DIR, ROOT } from "./lib/utils";

const DIST = join(ROOT, "dist");

function write(file: string, content: string): void {
  const target = join(DIST, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
}

export function build(): { pages: number } {
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  // Arquivos estáticos (imagens etc.)
  cpSync(PUBLIC_DIR, DIST, { recursive: true });

  // Assets
  write("assets/styles.css", readFileSync(join(ROOT, "src/styles/styles.css"), "utf8"));
  write("assets/main.js", readFileSync(join(ROOT, "src/client/main.js"), "utf8"));

  // Páginas
  const pages = buildPages();
  for (const page of pages) {
    write(page.path === "/" ? "index.html" : `${page.path.slice(1)}/index.html`, page.html);
  }
  write("404.html", notFound());

  // SEO
  const base = siteUrl();
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => p.indexable)
    .map((p) => `  <url><loc>${base}${p.path === "/" ? "" : p.path}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);

  return { pages: pages.length + 1 };
}

const result = build();
console.log(`✓ Site gerado em dist/ (${result.pages} páginas)`);
