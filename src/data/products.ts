import type { Product } from "../types/product";
import { SHOW_DEMO_PRODUCTS } from "./site";

/**
 * ============================================================
 *  CATÁLOGO DE PRODUTOS — ÚNICA fonte de dados do site
 * ============================================================
 *
 *  Para ADICIONAR um produto: copie um bloco, mude o id/slug e preencha.
 *  Para EDITAR preço/descrição: altere o campo. (price: 49.9  →  R$ 49,90)
 *  Para REMOVER do site sem apagar: active: false
 *  Para marcar como esgotado: available: false
 *
 *  Os itens abaixo com demo: true são APENAS EXEMPLOS de layout.
 *  Eles não são produtos reais e somem quando SHOW_DEMO_PRODUCTS = false
 *  (em src/data/site.ts).
 */
const catalog: Product[] = [
  // ---------- EXEMPLOS (substitua pelos produtos reais) ----------
  {
    id: "demo-home-spray",
    slug: "exemplo-home-spray",
    name: "Home Spray — exemplo",
    category: "home-spray",
    description:
      "Item de exemplo para demonstrar o layout do catálogo. Substitua pelos dados reais do seu produto em src/data/products.ts.",
    fragrance: null,
    size: null,
    price: null,
    images: [],
    featured: true,
    active: true,
    available: true,
    demo: true,
  },
  {
    id: "demo-difusor",
    slug: "exemplo-difusor-de-vareta",
    name: "Difusor de Vareta — exemplo",
    category: "difusor",
    description:
      "Item de exemplo para demonstrar o layout do catálogo. Substitua pelos dados reais do seu produto em src/data/products.ts.",
    fragrance: null,
    size: null,
    price: null,
    images: [],
    featured: true,
    active: true,
    available: true,
    demo: true,
  },
  {
    id: "demo-vela",
    slug: "exemplo-vela-aromatica",
    name: "Vela Aromática — exemplo",
    category: "vela",
    description:
      "Item de exemplo para demonstrar o layout do catálogo. Substitua pelos dados reais do seu produto em src/data/products.ts.",
    fragrance: null,
    size: null,
    price: null,
    images: [],
    featured: true,
    active: true,
    available: true,
    demo: true,
  },
  {
    id: "demo-sabonete",
    slug: "exemplo-sabonete-artesanal",
    name: "Sabonete Artesanal — exemplo",
    category: "sabonete",
    description:
      "Item de exemplo para demonstrar o layout do catálogo. Substitua pelos dados reais do seu produto em src/data/products.ts.",
    fragrance: null,
    size: null,
    price: null,
    images: [],
    featured: true,
    active: true,
    available: true,
    demo: true,
  },
  {
    id: "demo-kit",
    slug: "exemplo-kit-presenteavel",
    name: "Kit Presenteável — exemplo",
    category: "kit",
    description:
      "Item de exemplo para demonstrar o layout do catálogo. Substitua pelos dados reais do seu produto em src/data/products.ts.",
    fragrance: null,
    size: null,
    price: null,
    images: [],
    featured: false,
    active: true,
    available: true,
    demo: true,
  },

  // ---------- PRODUTOS REAIS: adicione abaixo ----------
  // {
  //   id: "produto-001",
  //   slug: "nome-do-produto",
  //   name: "Nome do produto",
  //   category: "home-spray", // home-spray | difusor | vela | sabonete | kit
  //   description: "Descrição do produto",
  //   fragrance: "Fragrância",
  //   size: "250ml",
  //   price: null,            // ou 49.9
  //   images: ["/images/products/nome-do-produto-1.jpg"],
  //   details: ["Informação adicional opcional"],
  //   featured: true,
  //   active: true,
  //   available: true,
  // },
];

/** Produtos visíveis no site (ativos e, se configurado, sem os exemplos). */
export const products: Product[] = catalog.filter(
  (p) => p.active && (SHOW_DEMO_PRODUCTS || !p.demo),
);

export const featuredProducts = (): Product[] => products.filter((p) => p.featured);

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const relatedProducts = (product: Product, limit = 4): Product[] => {
  const same = products.filter((p) => p.id !== product.id && p.category === product.category);
  const others = products.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...same, ...others].slice(0, limit);
};

export const hasPrices = (): boolean => products.some((p) => p.price !== null);
export const fragrances = (): string[] =>
  [...new Set(products.map((p) => p.fragrance).filter((f): f is string => !!f))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
