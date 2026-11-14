import { homeCategories } from "../data/categories";
import { instagramTiles } from "../data/instagram";
import { featuredProducts } from "../data/products";
import { site } from "../data/site";
import { esc, findImage } from "../lib/utils";
import { messages, whatsappUrl } from "../lib/whatsapp";
import { button, container, media, sectionTitle, whatsAppButton } from "./common";
import { icons } from "./icons";
import { productGrid } from "./products";

export function hero(): string {
  const heroImg = findImage("hero", "hero");
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__inner">
    <div class="hero__text">
      <p class="eyebrow">${esc(site.tagline)} · ${esc(site.location)}</p>
      <h1 class="display hero__title" id="hero-title">Transforme pequenos momentos em <em>experiências especiais.</em></h1>
      <p class="lead hero__lead">Descubra aromas e produtos artesanais criados para perfumar ambientes, despertar sensações e tornar cada momento ainda mais especial.</p>
      <div class="hero__actions">
        ${button({ href: "/produtos", label: "Conheça nossos produtos", icon: "arrow" })}
        ${whatsAppButton(messages.contact, "Fale conosco", "outline")}
      </div>
    </div>
    <div class="hero__visual">
      ${media({ src: heroImg, alt: "Produtos da ESSÊNCIA T: home sprays, velas e sabonetes artesanais", ratio: "tall", tone: "sand", placeholderLabel: "Foto de destaque em breve", eager: true, sizes: "(min-width: 900px) 50vw, 100vw", extraClass: "hero__media" })}
    </div>
  </div>
</section>`;
}

export function categorySection(): string {
  const cards = homeCategories
    .map((c) => {
      const img = findImage("categories", c.slug);
      return `<li class="cat-card">
      <a class="cat-card__link" href="/categorias/${c.slug}" aria-label="${esc(c.name)} — ver produtos">
        ${media({ src: img, alt: c.name, tone: c.tone, ratio: "portrait", placeholderLabel: c.name })}
        <div class="cat-card__body">
          <h3 class="display cat-card__name">${esc(c.name)}</h3>
          <p>${esc(c.description)}</p>
          <span class="cat-card__more">Ver produtos ${icons.arrow}</span>
        </div>
      </a>
    </li>`;
    })
    .join("");

  return `<section class="section" aria-labelledby="cat-title">
  ${container(`
    ${sectionTitle({ eyebrow: "Coleções", title: "Escolha o seu aroma", lead: "Quatro formas de levar delicadeza para o seu dia a dia.", align: "center" }).replace("<h2", '<h2 id="cat-title"')}
    <ul class="cat-grid">${cards}</ul>
  `)}
</section>`;
}

export function featuredSection(): string {
  const list = featuredProducts();
  if (list.length === 0) return "";
  return `<section class="section section--tint" aria-labelledby="dest-title">
  ${container(`
    <div class="section-head">
      ${sectionTitle({ eyebrow: "Vitrine", title: "Em destaque" }).replace("<h2", '<h2 id="dest-title"')}
      ${button({ href: "/produtos", label: "Ver todos os produtos", variant: "text", icon: "arrow" })}
    </div>
    ${productGrid(list.slice(0, 4), "grade-destaques")}
  `)}
</section>`;
}

export function aboutSection(): string {
  const img = findImage("institutional", "sobre");
  return `<section class="section about" aria-labelledby="about-title">
  ${container(`
    <div class="about__grid">
      <div class="about__visual">${media({ src: img, alt: "Detalhes artesanais da ESSÊNCIA T", ratio: "portrait", tone: "nude", placeholderLabel: "Foto institucional em breve" })}</div>
      <div class="about__text">
        <p class="eyebrow">A marca</p>
        <h2 class="display" id="about-title">Mais do que aromas, experiências.</h2>
        <p class="lead">A ESSÊNCIA T nasceu da paixão pelos detalhes, pelos aromas e pela capacidade que pequenas experiências têm de transformar nossos momentos. Cada produto é pensado para levar delicadeza, aconchego e personalidade ao seu dia a dia.</p>
        ${button({ href: "/sobre", label: "Conheça a ESSÊNCIA T", variant: "outline", icon: "arrow" })}
      </div>
    </div>
  `)}
</section>`;
}

export function giftSection(): string {
  const items = ["Presentes especiais", "Combinações de produtos", "Kits personalizados", "Datas comemorativas"];
  return `<section class="gift" aria-labelledby="gift-title">
  ${container(`
    <div class="gift__grid">
      <div>
        <p class="eyebrow">${icons.gift} Kits presenteáveis</p>
        <h2 class="display" id="gift-title">Presentear com aroma é presentear com memória.</h2>
        <p class="lead">Conte para a gente quem vai receber e a ocasião. Ajudamos você a combinar produtos para um presente com a sua cara.</p>
        <div class="gift__actions">
          ${whatsAppButton(messages.gifts, "Monte seu presente", "solid")}
          ${button({ href: "/categorias/kit", label: "Ver kits", variant: "outline", icon: "arrow" })}
        </div>
      </div>
      <ul class="gift__list">${items.map((i, n) => `<li><span class="gift__num">0${n + 1}</span><span>${esc(i)}</span></li>`).join("")}</ul>
    </div>
  `)}
</section>`;
}

export function differentials(): string {
  const items: [string, string][] = [
    ["Produtos artesanais", "Feitos com cuidado, um a um."],
    ["Atenção aos detalhes", "Do aroma à apresentação."],
    ["Diferentes fragrâncias", "Opções para cada ambiente e momento."],
    ["Atendimento pelo WhatsApp", "Conversa direta, simples e pessoal."],
    ["Envio para todo o Brasil", "Receba onde estiver."],
  ];
  return `<section class="section" aria-labelledby="dif-title">
  ${container(`
    ${sectionTitle({ eyebrow: "Por que a ESSÊNCIA T", title: "Feito com delicadeza", align: "center" }).replace("<h2", '<h2 id="dif-title"')}
    <ul class="dif-list">${items
      .map(([t, d], i) => `<li><span class="dif-list__num">0${i + 1}</span><h3 class="display">${esc(t)}</h3><p>${esc(d)}</p></li>`)
      .join("")}</ul>
  `)}
</section>`;
}

export function instagramSection(): string {
  const tones = ["sand", "nude", "ivory", "greige", "sand", "nude"];
  const tiles = instagramTiles()
    .map(
      (t, i) => `<li><a class="ig-tile" href="${site.instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="Ver no Instagram (abre em nova aba)">${
        t.image
          ? `<img src="${esc(t.image)}" alt="${esc(t.alt)}" loading="lazy" decoding="async">`
          : `<span class="ig-tile__ph tone-${tones[i]}" aria-hidden="true">${icons.instagram}</span>`
      }</a></li>`,
    )
    .join("");
  return `<section class="section section--tint" aria-labelledby="ig-title">
  ${container(`
    ${sectionTitle({ eyebrow: site.instagramHandle, title: "Um pouco da ESSÊNCIA T no seu dia a dia.", align: "center" }).replace("<h2", '<h2 id="ig-title"')}
    <ul class="ig-grid">${tiles}</ul>
    <div class="center">${button({ href: site.instagramUrl, label: "Conheça nosso Instagram", variant: "outline", external: true, icon: "instagram" })}</div>
  `)}
</section>`;
}

export const finalCta = (): string => `<section class="cta-band" aria-label="Fale com a ESSÊNCIA T">
  ${container(`
    <p class="display cta-band__text">Ficou com alguma dúvida? Vamos conversar.</p>
    ${button({ href: whatsappUrl(messages.general), label: "Pedir pelo WhatsApp", external: true, icon: "whatsapp", variant: "light" })}
  `)}
</section>`;
