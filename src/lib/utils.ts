import { existsSync } from "node:fs";
import { join } from "node:path";

export const ROOT = process.cwd();
export const PUBLIC_DIR = join(ROOT, "public");

/** Escapa texto para uso seguro em HTML. */
export const esc = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const brl = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Minúsculas e sem acentos — usado na busca. */
export const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"];

/**
 * Procura uma imagem por convenção de nome em /public/images/<dir>/<base>.<ext>.
 * Retorna o caminho público ou null. Assim basta soltar o arquivo na pasta.
 */
export function findImage(dir: string, base: string): string | null {
  for (const ext of EXTENSIONS) {
    if (existsSync(join(PUBLIC_DIR, "images", dir, `${base}.${ext}`))) {
      return `/images/${dir}/${base}.${ext}`;
    }
  }
  return null;
}

/** Serializa JSON-LD de forma segura para dentro de <script>. */
export const jsonLd = (data: unknown): string =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
