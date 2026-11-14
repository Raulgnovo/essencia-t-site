import { esc } from "../lib/utils";
import { whatsappUrl } from "../lib/whatsapp";
import { icons } from "./icons";

interface ButtonOptions {
  href: string;
  label: string;
  variant?: "solid" | "outline" | "light" | "text";
  external?: boolean;
  icon?: "arrow" | "whatsapp" | "instagram" | null;
  ariaLabel?: string;
  extraClass?: string;
}

export function button({
  href,
  label,
  variant = "solid",
  external = false,
  icon = null,
  ariaLabel,
  extraClass = "",
}: ButtonOptions): string {
  const rel = external ? ` target="_blank" rel="noopener noreferrer"` : "";
  const aria = ariaLabel ? ` aria-label="${esc(ariaLabel)}"` : "";
  return `<a class="btn btn-${variant} ${extraClass}" href="${esc(href)}"${rel}${aria}>${
    icon && icon !== "arrow" ? icons[icon] : ""
  }<span>${esc(label)}</span>${icon === "arrow" ? icons.arrow : ""}</a>`;
}

/** Botão que abre o WhatsApp com mensagem específica. */
export function whatsAppButton(
  message: string,
  label: string,
  variant: ButtonOptions["variant"] = "solid",
  extraClass = "",
): string {
  return button({
    href: whatsappUrl(message),
    label,
    variant,
    external: true,
    icon: "whatsapp",
    extraClass,
    ariaLabel: `${label} (abre o WhatsApp em nova aba)`,
  });
}

export function sectionTitle(opts: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tag?: "h1" | "h2";
}): string {
  const { eyebrow, title, lead, align = "left", tag = "h2" } = opts;
  return `<header class="section-title section-title--${align}">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
    <${tag} class="display">${esc(title)}</${tag}>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ""}
  </header>`;
}

export const container = (inner: string, extraClass = ""): string =>
  `<div class="container ${extraClass}">${inner}</div>`;

export function emptyState(opts: { title: string; text: string; actions?: string; hidden?: boolean; id?: string }): string {
  return `<div class="empty-state"${opts.id ? ` id="${opts.id}"` : ""}${opts.hidden ? " hidden" : ""}>
    <p class="display empty-state__title">${esc(opts.title)}</p>
    <p>${esc(opts.text)}</p>
    ${opts.actions ?? ""}
  </div>`;
}

interface MediaOptions {
  src: string | null;
  alt: string;
  ratio?: "portrait" | "square" | "landscape" | "tall";
  tone?: "sand" | "nude" | "greige" | "ivory";
  /** Texto pequeno dentro do espaço reservado. */
  placeholderLabel?: string;
  eager?: boolean;
  sizes?: string;
  extraClass?: string;
}

/** Imagem com proporção fixa. Sem arquivo, mostra um espaço reservado discreto e identificado. */
export function media({
  src,
  alt,
  ratio = "portrait",
  tone = "sand",
  placeholderLabel = "Foto em breve",
  eager = false,
  sizes = "(min-width: 900px) 33vw, 90vw",
  extraClass = "",
}: MediaOptions): string {
  if (src) {
    return `<div class="media media--${ratio} ${extraClass}"><img src="${esc(src)}" alt="${esc(alt)}" sizes="${esc(sizes)}" ${
      eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'
    } decoding="async"></div>`;
  }
  return `<div class="media media--${ratio} tone-${tone} media--placeholder ${extraClass}" role="img" aria-label="${esc(alt)} — foto em breve">
    <span class="media__frame"></span>
    <span class="media__label">${esc(placeholderLabel)}</span>
  </div>`;
}
