/**
 * Informações de contato e configurações gerais da marca.
 * Para trocar telefone, Instagram ou textos de contato, altere SOMENTE este arquivo.
 */
export const site = {
  name: "ESSÊNCIA T",
  slogan: "Iluminando momentos, perfumando memórias.",
  tagline: "Velas & Aromas",
  description:
    "Home sprays, difusores de vareta, velas aromáticas e sabonetes artesanais. Produtos artesanais para perfumar ambientes e criar momentos especiais. Envio para todo o Brasil.",
  /** Somente dígitos, com DDI e DDD. */
  whatsappNumber: "5544998369737",
  whatsappDisplay: "+55 44 99836-9737",
  instagramHandle: "@essenciat.home",
  instagramUrl: "https://www.instagram.com/essenciat.home/",
  location: "Maringá — PR",
  shipping: "Envio para todo o Brasil",
  locale: "pt-BR",
  year: new Date().getFullYear(),
} as const;

/**
 * Enquanto você não cadastrar os produtos reais, o site exibe itens de exemplo
 * (claramente marcados como "Exemplo"). Quando cadastrar os reais, ponha false.
 */
export const SHOW_DEMO_PRODUCTS = true;

/** URL pública do site, usada em canonical, sitemap e Open Graph. */
export function siteUrl(): string {
  const fromEnv = process.env.SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
