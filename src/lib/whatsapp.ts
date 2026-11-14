import { site } from "../data/site";
import type { Category, Product } from "../types/product";

/**
 * Único lugar que monta links do WhatsApp.
 * Todos os botões do site passam por aqui.
 */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const messages = {
  general: "Olá! Conheci a ESSÊNCIA T pelo site e gostaria de fazer um pedido ou tirar uma dúvida.",
  category: (c: Category) => c.whatsappMessage,
  product: (p: Product) =>
    `Olá! Conheci a ESSÊNCIA T pelo site e gostaria de saber mais sobre o produto ${p.name}.`,
  gifts: "Olá! Gostaria de conhecer os kits presenteáveis da ESSÊNCIA T e montar um presente.",
  contact: "Olá! Gostaria de falar com a ESSÊNCIA T.",
} as const;
