import { categories } from "../data/categories";
import { site, siteUrl } from "../data/site";
import { esc, jsonLd } from "../lib/utils";
import { messages, whatsappUrl } from "../lib/whatsapp";
import { button } from "./common";
import { icons } from "./icons";

const logo = (cls = "") =>
  `<img class="logo ${cls}" src="/images/brand/logo-essencia-t.png" alt="ESSÊNCIA T" width="477" height="80">`;

export function header(currentPath: string): string {
  const is = (p: string) => (currentPath === p ? ' aria-current="page"' : "");
  const isProducts = currentPath.startsWith("/produtos") || currentPath.startsWith("/categorias");

  const dropdown = categories
    .map((c) => `<li><a href="/categorias/${c.slug}">${esc(c.name)}</a></li>`)
    .join("");

  const mobileLinks = [
    ["/", "Início"],
    ["/produtos", "Todos os produtos"],
    ...categories.map((c) => [`/categorias/${c.slug}`, c.name] as [string, string]),
    ["/sobre", "Sobre"],
    ["/contato", "Contato"],
  ]
    .map(([href, label]) => `<li><a href="${href}">${esc(label as string)}</a></li>`)
    .join("");

  return `<a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
<div class="announce"><p>${esc(site.shipping)} · Atendimento pelo WhatsApp</p></div>
<header class="site-header" id="topo">
  <div class="container site-header__inner">
    <a class="site-header__brand" href="/" aria-label="ESSÊNCIA T — página inicial">${logo()}</a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav__list">
        <li><a href="/"${is("/")}>Início</a></li>
        <li class="nav__has-menu">
          <a href="/produtos"${isProducts ? ' aria-current="page"' : ""}>Produtos ${icons.chevron}</a>
          <ul class="nav__menu" aria-label="Categorias">${dropdown}<li class="nav__menu-all"><a href="/produtos">Ver todos</a></li></ul>
        </li>
        <li><a href="/categorias/kit">Kits</a></li>
        <li><a href="/sobre"${is("/sobre")}>Sobre</a></li>
        <li><a href="/contato"${is("/contato")}>Contato</a></li>
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="icon-link" href="${site.instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="Instagram da ESSÊNCIA T (abre em nova aba)">${icons.instagram}</a>
      <a class="btn btn-solid btn-sm site-header__cta" href="${whatsappUrl(messages.general)}" target="_blank" rel="noopener noreferrer" aria-label="Fazer pedido pelo WhatsApp (abre em nova aba)">${icons.whatsapp}<span>Pedir pelo WhatsApp</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-mobile" aria-label="Abrir menu">${icons.menu}</button>
    </div>
  </div>
  <div class="mobile-menu" id="menu-mobile" hidden>
    <nav aria-label="Menu móvel">
      <ul>${mobileLinks}</ul>
    </nav>
    <div class="mobile-menu__foot">
      ${button({ href: whatsappUrl(messages.general), label: "Pedir pelo WhatsApp", external: true, icon: "whatsapp", extraClass: "btn-block" })}
      <a class="mobile-menu__ig" href="${site.instagramUrl}" target="_blank" rel="noopener noreferrer">${icons.instagram}<span>${esc(site.instagramHandle)}</span></a>
    </div>
  </div>
</header>`;
}

export function footer(): string {
  const catLinks = categories
    .map((c) => `<li><a href="/categorias/${c.slug}">${esc(c.name)}</a></li>`)
    .join("");
  return `<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div class="site-footer__brand">
        ${logo("logo--footer")}
        <p class="site-footer__slogan display">${esc(site.slogan)}</p>
        <p class="site-footer__meta">${icons.pin}<span>${esc(site.location)}</span></p>
        <p class="site-footer__meta">${icons.package}<span>${esc(site.shipping)}</span></p>
      </div>
      <nav aria-label="Rodapé — navegação">
        <h2 class="footer-heading">Navegação</h2>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/produtos">Produtos</a></li>
          <li><a href="/sobre">Sobre</a></li>
          <li><a href="/contato">Contato</a></li>
          <li><a href="/privacidade">Política de privacidade</a></li>
        </ul>
      </nav>
      <nav aria-label="Rodapé — categorias">
        <h2 class="footer-heading">Categorias</h2>
        <ul>${catLinks}</ul>
      </nav>
      <div>
        <h2 class="footer-heading">Fale conosco</h2>
        <ul>
          <li><a href="${whatsappUrl(messages.general)}" target="_blank" rel="noopener noreferrer">WhatsApp ${esc(site.whatsappDisplay)}</a></li>
          <li><a href="${site.instagramUrl}" target="_blank" rel="noopener noreferrer">Instagram ${esc(site.instagramHandle)}</a></li>
        </ul>
        <div class="site-footer__cta">${button({ href: whatsappUrl(messages.general), label: "Atendimento pelo WhatsApp", variant: "solid", external: true, icon: "whatsapp" })}</div>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>© ${site.year} ${esc(site.name)}. Todos os direitos reservados.</p>
      <p><a href="/privacidade">Política de privacidade</a></p>
    </div>
  </div>
</footer>
<a class="wa-float" href="${whatsappUrl(messages.general)}" target="_blank" rel="noopener noreferrer" aria-label="Falar com a ESSÊNCIA T pelo WhatsApp (abre em nova aba)">${icons.whatsapp}<span class="wa-float__label">Fale conosco</span></a>`;
}

export interface PageOptions {
  title: string;
  description: string;
  path: string;
  body: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: unknown[];
  /** Tipo Open Graph. */
  ogType?: "website" | "product";
}

export function renderPage(opts: PageOptions): string {
  const url = siteUrl();
  const canonical = `${url}${opts.path === "/" ? "" : opts.path}`;
  const og = opts.ogImage ?? "/images/brand/og-image.png";
  const ogAbs = og.startsWith("http") ? og : `${url}${og}`;
  const fullTitle = opts.path === "/" ? opts.title : `${opts.title} | ${site.name}`;
  const ld = (opts.structuredData ?? []).map(jsonLd).join("\n");

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(opts.description)}">
${opts.noindex ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow">'}
<link rel="canonical" href="${esc(canonical)}">
<meta name="theme-color" content="#F8F6F2">
<link rel="icon" href="/images/brand/icon.png" type="image/png">
<link rel="apple-touch-icon" href="/images/brand/icon.png">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="pt_BR">
<meta property="og:type" content="${opts.ogType ?? "website"}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(opts.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(ogAbs)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(opts.description)}">
<meta name="twitter:image" content="${esc(ogAbs)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Montserrat:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/styles.css">
${ld}
</head>
<body>
${header(opts.path)}
<main id="conteudo" tabindex="-1">
${opts.body}
</main>
${footer()}
<script src="/assets/main.js" defer></script>
</body>
</html>`;
}
