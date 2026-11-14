import { categories, categoryBySlug } from "./data/categories";
import { productBySlug, products, relatedProducts } from "./data/products";
import { site, siteUrl } from "./data/site";
import { button, container, sectionTitle, whatsAppButton } from "./components/common";
import {
  aboutSection,
  categorySection,
  differentials,
  featuredSection,
  finalCta,
  giftSection,
  hero,
  instagramSection,
} from "./components/home";
import { icons } from "./components/icons";
import { renderPage } from "./components/layout";
import {
  emptyCatalog,
  noResults,
  productDetails,
  productFilters,
  productGallery,
  productGrid,
} from "./components/products";
import { esc } from "./lib/utils";
import { messages, whatsappUrl } from "./lib/whatsapp";
import type { Product } from "./types/product";

export interface BuiltPage {
  /** Caminho da rota, ex.: "/produtos/meu-produto". */
  path: string;
  html: string;
  /** Entra no sitemap? */
  indexable: boolean;
}

const crumbs = (items: [string, string?][]): string =>
  `<nav class="breadcrumb" aria-label="Você está em"><ol>${items
    .map(([label, href], i) =>
      href && i < items.length - 1
        ? `<li><a href="${href}">${esc(label)}</a></li>`
        : `<li aria-current="page">${esc(label)}</li>`,
    )
    .join("")}</ol></nav>`;

const orgLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl(),
  logo: `${siteUrl()}/images/brand/logo-essencia-t.png`,
  slogan: site.slogan,
  description: site.description,
  telephone: "+" + site.whatsappNumber,
  sameAs: [site.instagramUrl],
  address: { "@type": "PostalAddress", addressLocality: "Maringá", addressRegion: "PR", addressCountry: "BR" },
  areaServed: { "@type": "Country", name: "Brasil" },
});

const breadcrumbLd = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${siteUrl()}${path}`,
  })),
});

function home(): BuiltPage {
  return {
    path: "/",
    indexable: true,
    html: renderPage({
      path: "/",
      title: "ESSÊNCIA T | Home sprays, difusores, velas aromáticas e sabonetes artesanais",
      description:
        "Home sprays, difusores de vareta, velas aromáticas e sabonetes artesanais da ESSÊNCIA T. Produtos artesanais para perfumar ambientes. Envio para todo o Brasil. Maringá — PR.",
      structuredData: [
        orgLd(),
        { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: siteUrl(), inLanguage: "pt-BR" },
      ],
      body: [hero(), categorySection(), featuredSection(), aboutSection(), giftSection(), differentials(), instagramSection(), finalCta()].join("\n"),
    }),
  };
}

function catalog(): BuiltPage {
  const body = `<section class="page-head">${container(
    `${crumbs([["Início", "/"], ["Produtos"]])}
     ${sectionTitle({ eyebrow: "Catálogo", title: "Todos os produtos", lead: "Home sprays, difusores, velas, sabonetes e kits artesanais. Escolha e peça pelo WhatsApp.", tag: "h1" })}`,
  )}</section>
  <section class="section section--flush">${container(
    products.length === 0
      ? emptyCatalog()
      : `${productFilters()}${productGrid(products)}${noResults()}`,
  )}</section>
  ${finalCta()}`;
  return {
    path: "/produtos",
    indexable: true,
    html: renderPage({
      path: "/produtos",
      title: "Produtos artesanais: home sprays, difusores, velas e sabonetes",
      description:
        "Veja o catálogo da ESSÊNCIA T: home sprays artesanais, difusores de vareta, velas aromáticas, sabonetes artesanais e kits presenteáveis. Peça pelo WhatsApp.",
      structuredData: [breadcrumbLd([["Início", "/"], ["Produtos", "/produtos"]])],
      body,
    }),
  };
}

function categoryPages(): BuiltPage[] {
  const seo: Record<string, { title: string; description: string }> = {
    "home-spray": {
      title: "Home spray artesanal",
      description: "Home sprays artesanais da ESSÊNCIA T para perfumar sala, quarto e tecidos. Aromas para casa com envio para todo o Brasil.",
    },
    difusor: {
      title: "Difusor de vareta artesanal",
      description: "Difusores de vareta artesanais da ESSÊNCIA T para aromatizar ambientes com elegância. Envio para todo o Brasil.",
    },
    vela: {
      title: "Velas aromáticas artesanais",
      description: "Velas aromáticas artesanais da ESSÊNCIA T para criar atmosfera e aconchego. Peça pelo WhatsApp e receba em todo o Brasil.",
    },
    sabonete: {
      title: "Sabonetes artesanais",
      description: "Sabonetes artesanais perfumados da ESSÊNCIA T para um autocuidado delicado. Peça pelo WhatsApp.",
    },
    kit: {
      title: "Kits presenteáveis e presentes perfumados",
      description: "Kits presenteáveis da ESSÊNCIA T: combinações de produtos artesanais para presentear em datas especiais.",
    },
  };

  return categories.map((c) => {
    const list = products.filter((p) => p.category === c.slug);
    const path = `/categorias/${c.slug}`;
    const body = `<section class="page-head">${container(
      `${crumbs([["Início", "/"], ["Produtos", "/produtos"], [c.name]])}
       ${sectionTitle({ eyebrow: "Categoria", title: c.title, lead: c.intro, tag: "h1" })}
       <div class="page-head__actions">${whatsAppButton(messages.category(c), `Falar sobre ${c.name}`, "outline")}</div>`,
    )}</section>
    <section class="section section--flush">${container(
      list.length
        ? productGrid(list)
        : `<div class="empty-state"><p class="display empty-state__title">Em breve por aqui</p><p>Os produtos desta categoria estão sendo cadastrados. Fale com a gente para conhecer as opções disponíveis.</p><div class="empty-state__actions">${whatsAppButton(messages.category(c), "Consultar pelo WhatsApp")}${button({ href: "/produtos", label: "Ver outros produtos", variant: "outline" })}</div></div>`,
    )}</section>
    ${finalCta()}`;
    return {
      path,
      indexable: true,
      html: renderPage({
        path,
        title: seo[c.slug]?.title ?? c.title,
        description: seo[c.slug]?.description ?? c.description,
        structuredData: [breadcrumbLd([["Início", "/"], ["Produtos", "/produtos"], [c.name, path]])],
        body,
      }),
    };
  });
}

function productPage(p: Product): BuiltPage {
  const cat = categoryBySlug(p.category);
  const path = `/produtos/${p.slug}`;
  const related = relatedProducts(p);
  const body = `<section class="section section--flush product-page">${container(
    `${crumbs([["Início", "/"], ["Produtos", "/produtos"], [cat.name, `/categorias/${cat.slug}`], [p.name]])}
     <div class="product-page__grid">${productGallery(p)}${productDetails(p)}</div>`,
  )}</section>
  ${
    related.length
      ? `<section class="section section--tint" aria-labelledby="rel-title">${container(
          `${sectionTitle({ eyebrow: "Continue explorando", title: "Você também pode gostar" }).replace("<h2", '<h2 id="rel-title"')}${productGrid(related, "grade-relacionados")}`,
        )}</section>`
      : ""
  }`;

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    category: cat.name,
    brand: { "@type": "Brand", name: site.name },
    ...(p.images.length ? { image: p.images.map((i) => `${siteUrl()}${i}`) } : {}),
    ...(p.price !== null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            price: p.price.toFixed(2),
            availability: p.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${siteUrl()}${path}`,
          },
        }
      : {}),
  };

  return {
    path,
    indexable: !p.demo,
    html: renderPage({
      path,
      title: `${p.name} — ${cat.name}`,
      description: p.description.slice(0, 155),
      ogImage: p.images[0],
      ogType: "product",
      noindex: p.demo,
      structuredData: [ld, breadcrumbLd([["Início", "/"], ["Produtos", "/produtos"], [p.name, path]])],
      body,
    }),
  };
}

function about(): BuiltPage {
  const values: [string, string][] = [
    ["Produtos artesanais", "Cada item é feito com cuidado e atenção aos detalhes."],
    ["Aromas para cada momento", "Diferentes opções de fragrâncias para perfumar ambientes e criar memórias."],
    ["Presentes com significado", "Kits e combinações para presentear com carinho."],
  ];
  const body = `<section class="page-head">${container(
    `${crumbs([["Início", "/"], ["Sobre"]])}
     ${sectionTitle({ eyebrow: "A marca", title: "Mais do que aromas, experiências.", tag: "h1" })}`,
  )}</section>
  <section class="section section--flush">${container(`<div class="prose">
    <p class="lead">A ESSÊNCIA T nasceu da paixão pelos detalhes, pelos aromas e pela capacidade que pequenas experiências têm de transformar nossos momentos. Cada produto é pensado para levar delicadeza, aconchego e personalidade ao seu dia a dia.</p>
    <p>Somos uma marca de produtos artesanais e aromáticos, de Maringá — PR, com home sprays, difusores de vareta, velas aromáticas, sabonetes artesanais e kits presenteáveis. Enviamos para todo o Brasil.</p>
    <p class="display about-slogan">${esc(site.slogan)}</p>
  </div>
  <ul class="dif-list dif-list--three">${values.map(([t, d], i) => `<li><span class="dif-list__num">0${i + 1}</span><h2 class="display">${esc(t)}</h2><p>${esc(d)}</p></li>`).join("")}</ul>`)}</section>
  ${giftSection()}
  ${instagramSection()}`;
  return {
    path: "/sobre",
    indexable: true,
    html: renderPage({
      path: "/sobre",
      title: "Sobre a ESSÊNCIA T",
      description: "Conheça a ESSÊNCIA T, marca de produtos artesanais e aromáticos de Maringá — PR: home sprays, difusores, velas e sabonetes artesanais.",
      structuredData: [orgLd(), breadcrumbLd([["Início", "/"], ["Sobre", "/sobre"]])],
      body,
    }),
  };
}

function contact(): BuiltPage {
  const topics = [
    ...categories.map((c) => ({ label: c.name, message: messages.category(c) })),
    { label: "Presentes e kits personalizados", message: messages.gifts },
  ];
  const body = `<section class="page-head">${container(
    `${crumbs([["Início", "/"], ["Contato"]])}
     ${sectionTitle({ eyebrow: "Contato", title: "Vamos conversar?", lead: "O WhatsApp é o nosso canal de pedidos. Escolha o assunto e abrimos a conversa com a mensagem pronta.", tag: "h1" })}`,
  )}</section>
  <section class="section section--flush">${container(`<div class="contact-grid">
    <div class="contact-card">
      <h2 class="display">Atendimento pelo WhatsApp</h2>
      <p>${esc(site.whatsappDisplay)}</p>
      <div class="topic-list">${topics.map((t) => `<a class="topic" href="${whatsappUrl(t.message)}" target="_blank" rel="noopener noreferrer"><span>${esc(t.label)}</span>${icons.arrow}</a>`).join("")}</div>
      <div class="contact-card__cta">${whatsAppButton(messages.general, "Iniciar conversa", "solid")}</div>
    </div>
    <div class="contact-card">
      <h2 class="display">Instagram</h2>
      <p>Acompanhe novidades e inspirações em ${esc(site.instagramHandle)}.</p>
      ${button({ href: site.instagramUrl, label: "Conheça nosso Instagram", variant: "outline", external: true, icon: "instagram" })}
      <h2 class="display contact-card__sub">Onde estamos</h2>
      <p class="contact-line">${icons.pin}<span>${esc(site.location)}</span></p>
      <p class="contact-line">${icons.package}<span>${esc(site.shipping)}</span></p>
    </div>
  </div>`)}</section>`;
  return {
    path: "/contato",
    indexable: true,
    html: renderPage({
      path: "/contato",
      title: "Contato e pedidos pelo WhatsApp",
      description: "Fale com a ESSÊNCIA T pelo WhatsApp para pedidos de home spray, difusores, velas, sabonetes e kits. Maringá — PR, envio para todo o Brasil.",
      structuredData: [orgLd(), breadcrumbLd([["Início", "/"], ["Contato", "/contato"]])],
      body,
    }),
  };
}

function privacy(): BuiltPage {
  const body = `<section class="page-head">${container(
    `${crumbs([["Início", "/"], ["Política de privacidade"]])}
     ${sectionTitle({ eyebrow: "Legal", title: "Política de privacidade", tag: "h1" })}`,
  )}</section>
  <section class="section section--flush">${container(`<div class="prose prose--legal">
    <p>Esta política explica, de forma simples, como o site da ${esc(site.name)} trata informações.</p>
    <h2 class="display">Dados que coletamos</h2>
    <p>Este site é uma vitrine e <strong>não possui cadastro, formulários nem login</strong>. Não coletamos dados pessoais diretamente por ele e, no momento, não utilizamos cookies de publicidade ou ferramentas de análise.</p>
    <h2 class="display">WhatsApp</h2>
    <p>Os botões do site abrem uma conversa no WhatsApp com uma mensagem pronta. A partir daí, as informações que você enviar (como nome e telefone) ficam na conversa e são usadas apenas para atendê-lo e processar seu pedido. O WhatsApp possui a própria política de privacidade.</p>
    <h2 class="display">Instagram e links externos</h2>
    <p>O site contém links para o Instagram e para o WhatsApp. Ao acessá-los, você passa a estar sujeito às políticas dessas plataformas.</p>
    <h2 class="display">Seus direitos</h2>
    <p>Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode solicitar acesso, correção ou exclusão de dados que tenha compartilhado em nossas conversas, entrando em contato pelo WhatsApp ${esc(site.whatsappDisplay)}.</p>
    <h2 class="display">Atualizações</h2>
    <p>Se passarmos a utilizar ferramentas de análise ou publicidade, esta página será atualizada e, quando necessário, solicitaremos seu consentimento.</p>
  </div>`)}</section>`;
  return {
    path: "/privacidade",
    indexable: true,
    html: renderPage({
      path: "/privacidade",
      title: "Política de privacidade",
      description: "Saiba como o site da ESSÊNCIA T trata informações e como falar conosco sobre seus dados.",
      body,
    }),
  };
}

export function notFound(): string {
  return renderPage({
    path: "/404",
    title: "Página não encontrada",
    description: "A página que você procura não foi encontrada.",
    noindex: true,
    body: `<section class="page-head page-head--center">${container(
      `<p class="eyebrow">Erro 404</p>
       <h1 class="display">Não encontramos esta página.</h1>
       <p class="lead">Ela pode ter mudado de lugar. Que tal ver nossos produtos ou falar com a gente?</p>
       <div class="page-head__actions page-head__actions--center">${button({ href: "/", label: "Voltar ao início", variant: "outline" })}${button({ href: "/produtos", label: "Ver produtos", icon: "arrow" })}${whatsAppButton(messages.general, "WhatsApp", "text")}</div>`,
    )}</section>`,
  });
}

export function buildPages(): BuiltPage[] {
  return [
    home(),
    catalog(),
    ...categoryPages(),
    ...products.map(productPage),
    about(),
    contact(),
    privacy(),
  ];
}

export { productBySlug };
