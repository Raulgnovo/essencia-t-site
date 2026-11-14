import { categories, categoryBySlug } from "../data/categories";
import { fragrances, hasPrices } from "../data/products";
import { brl, esc, normalize } from "../lib/utils";
import { messages } from "../lib/whatsapp";
import type { Product } from "../types/product";
import { button, emptyState, media, whatsAppButton } from "./common";
import { icons } from "./icons";

export function productCard(product: Product, index: number): string {
  const cat = categoryBySlug(product.category);
  const meta = [product.fragrance, product.size].filter(Boolean).join(" · ");
  const href = `/produtos/${product.slug}`;
  const price =
    product.price !== null
      ? `<p class="product-card__price">${brl(product.price)}</p>`
      : `<p class="product-card__price product-card__price--consult">Consulte valores</p>`;

  return `<li class="product-card" data-product
    data-name="${esc(normalize(product.name))}"
    data-category="${product.category}"
    data-fragrance="${esc(product.fragrance ?? "")}"
    data-price="${product.price ?? ""}"
    data-index="${index}">
    <a class="product-card__media" href="${href}" tabindex="-1" aria-hidden="true">
      ${media({ src: product.images[0] ?? null, alt: product.name, tone: cat.tone, ratio: "portrait", placeholderLabel: cat.name })}
      ${product.demo ? `<span class="badge badge--demo">Exemplo</span>` : ""}
      ${!product.available ? `<span class="badge">Indisponível</span>` : ""}
    </a>
    <div class="product-card__body">
      <p class="product-card__cat">${esc(cat.name)}</p>
      <h3 class="product-card__name display"><a href="${href}">${esc(product.name)}</a></h3>
      ${meta ? `<p class="product-card__meta">${esc(meta)}</p>` : ""}
      ${price}
      <div class="product-card__actions">
        ${button({ href, label: "Conhecer produto", variant: "outline", icon: "arrow" })}
        ${whatsAppButton(messages.product(product), "Consultar pelo WhatsApp", "text")}
      </div>
    </div>
  </li>`;
}

export function productGrid(list: Product[], id = "grade-produtos"): string {
  return `<ul class="product-grid" id="${id}">${list.map((p, i) => productCard(p, i)).join("")}</ul>`;
}

/** Barra de busca, filtros e ordenação do catálogo (controlada por main.js). */
export function productFilters(): string {
  const pills = [
    `<button type="button" class="pill is-active" data-filter-category="all" aria-pressed="true">Todos</button>`,
    ...categories.map(
      (c) =>
        `<button type="button" class="pill" data-filter-category="${c.slug}" aria-pressed="false">${esc(c.name)}</button>`,
    ),
  ].join("");

  const frs = fragrances();
  const fragranceSelect = frs.length
    ? `<div class="field"><label for="filtro-fragrancia">Fragrância</label>
        <select id="filtro-fragrancia"><option value="">Todas</option>${frs
          .map((f) => `<option value="${esc(f)}">${esc(f)}</option>`)
          .join("")}</select></div>`
    : "";

  const priceSort = hasPrices()
    ? `<option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option>`
    : "";

  return `<form class="filters" role="search" aria-label="Filtrar produtos" onsubmit="return false">
    <div class="filters__row">
      <div class="field field--search">
        <label for="busca-produto">Buscar produto</label>
        <span class="field__input">${icons.search}<input id="busca-produto" type="search" placeholder="Buscar por nome" autocomplete="off"></span>
      </div>
      ${fragranceSelect}
      <div class="field">
        <label for="ordenar">Ordenar por</label>
        <select id="ordenar"><option value="default">Destaques</option><option value="name-asc">Nome (A–Z)</option><option value="name-desc">Nome (Z–A)</option>${priceSort}</select>
      </div>
    </div>
    <div class="pills" role="group" aria-label="Categorias">${pills}</div>
    <p class="filters__count" id="contagem" role="status" aria-live="polite"></p>
  </form>`;
}

export function noResults(): string {
  return emptyState({
    id: "sem-resultados",
    hidden: true,
    title: "Nenhum produto encontrado",
    text: "Tente outra busca ou volte para ver todos os produtos. Se preferir, fale com a gente — ajudamos você a escolher.",
    actions: `<div class="empty-state__actions">${button({ href: "/produtos", label: "Ver todos", variant: "outline" })}${whatsAppButton(messages.general, "Falar pelo WhatsApp")}</div>`,
  });
}

export function emptyCatalog(): string {
  return emptyState({
    title: "Nosso catálogo está sendo preparado",
    text: "Enquanto isso, fale com a ESSÊNCIA T pelo WhatsApp e conheça nossas opções de aromas.",
    actions: `<div class="empty-state__actions">${whatsAppButton(messages.general, "Falar pelo WhatsApp")}</div>`,
  });
}

export function productGallery(product: Product): string {
  const cat = categoryBySlug(product.category);
  if (product.images.length === 0) {
    return `<div class="gallery">${media({ src: null, alt: product.name, tone: cat.tone, ratio: "portrait", placeholderLabel: "Foto do produto em breve", eager: true })}</div>`;
  }
  const [first, ...rest] = product.images;
  return `<div class="gallery">
    ${media({ src: first ?? null, alt: product.name, ratio: "portrait", eager: true, sizes: "(min-width: 900px) 50vw, 100vw" })}
    ${rest.length ? `<ul class="gallery__thumbs">${rest.map((src, i) => `<li>${media({ src, alt: `${product.name} — foto ${i + 2}`, ratio: "square", sizes: "20vw" })}</li>`).join("")}</ul>` : ""}
  </div>`;
}

export function productDetails(product: Product): string {
  const cat = categoryBySlug(product.category);
  const rows: [string, string][] = [["Categoria", cat.name]];
  if (product.fragrance) rows.push(["Fragrância", product.fragrance]);
  if (product.size) rows.push(["Tamanho", product.size]);
  rows.push(["Disponibilidade", product.available ? "Disponível" : "Indisponível no momento"]);

  const price =
    product.price !== null
      ? `<p class="detail__price">${brl(product.price)}</p>`
      : `<p class="detail__price detail__price--consult">Consulte valores pelo WhatsApp</p>`;

  return `<div class="detail">
    <p class="eyebrow"><a href="/categorias/${cat.slug}">${esc(cat.name)}</a></p>
    <h1 class="display detail__title">${esc(product.name)}</h1>
    ${product.demo ? `<p class="notice">Este é um item de exemplo, usado para demonstrar o layout. Não é um produto real.</p>` : ""}
    ${price}
    <p class="detail__desc">${esc(product.description)}</p>
    <dl class="detail__specs">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
    ${product.details?.length ? `<ul class="detail__list">${product.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
    <div class="detail__actions">
      ${whatsAppButton(messages.product(product), "Pedir pelo WhatsApp", "solid", "btn-block")}
      <p class="detail__note">Você será direcionado ao WhatsApp com uma mensagem pronta sobre este produto.</p>
    </div>
  </div>`;
}
