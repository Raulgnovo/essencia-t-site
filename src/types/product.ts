export type CategorySlug = "home-spray" | "difusor" | "vela" | "sabonete" | "kit";

export interface Category {
  slug: CategorySlug;
  /** Nome curto, usado em filtros e menu. */
  name: string;
  /** Nome completo, usado em títulos de seção. */
  title: string;
  /** Descrição curta para cartões e meta description. */
  description: string;
  /** Texto de introdução da página da categoria. */
  intro: string;
  /** Mensagem pré-preenchida do WhatsApp para esta categoria. */
  whatsappMessage: string;
  /** Tom do espaço reservado enquanto não houver fotografia. */
  tone: "sand" | "nude" | "greige" | "ivory";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  /** Fragrância, quando houver. Habilita o filtro por fragrância automaticamente. */
  fragrance: string | null;
  /** Volume ou peso, por exemplo "250ml" ou "90g". */
  size: string | null;
  /** Preço em reais (ex.: 49.9). Use null para não exibir preço. */
  price: number | null;
  /** Caminhos a partir de /public, por exemplo "/images/products/meu-produto-1.jpg". */
  images: string[];
  /** Linhas extras exibidas na página do produto (ex.: "Acompanha varetas"). */
  details?: string[];
  featured: boolean;
  /** false = o produto some do site (sem apagar do arquivo). */
  active: boolean;
  /** false = aparece como indisponível no momento. */
  available: boolean;
  /** Marca o item como exemplo. Itens de exemplo são ocultados por SHOW_DEMO_PRODUCTS = false. */
  demo?: boolean;
}
