import type { Category, CategorySlug } from "../types/product";

export const categories: Category[] = [
  {
    slug: "home-spray",
    name: "Home Sprays",
    title: "Home Sprays",
    description: "Perfume seu ambiente com delicadeza, em um borrifar.",
    intro:
      "Home sprays artesanais para perfumar sala, quarto, cantinhos e tecidos da casa com leveza e personalidade.",
    whatsappMessage: "Olá! Gostaria de conhecer melhor os Home Sprays da ESSÊNCIA T.",
    tone: "sand",
  },
  {
    slug: "difusor",
    name: "Difusores de Vareta",
    title: "Difusores de Vareta",
    description: "Aroma que acompanha o ambiente em cada detalhe.",
    intro:
      "Difusores de vareta artesanais para deixar a casa perfumada e decorada com discrição e elegância.",
    whatsappMessage: "Olá! Gostaria de conhecer os difusores de vareta da ESSÊNCIA T.",
    tone: "greige",
  },
  {
    slug: "vela",
    name: "Velas Aromáticas",
    title: "Velas Aromáticas",
    description: "Luz e aroma para criar atmosfera e aconchego.",
    intro:
      "Velas aromáticas artesanais para acender momentos de pausa, encontro e aconchego.",
    whatsappMessage: "Olá! Tenho interesse nas velas aromáticas da ESSÊNCIA T.",
    tone: "nude",
  },
  {
    slug: "sabonete",
    name: "Sabonetes Artesanais",
    title: "Sabonetes Artesanais",
    description: "Feitos à mão, para um autocuidado delicado.",
    intro:
      "Sabonetes artesanais perfumados, pensados para tornar o autocuidado um pequeno ritual.",
    whatsappMessage: "Olá! Tenho interesse nos sabonetes artesanais da ESSÊNCIA T.",
    tone: "ivory",
  },
  {
    slug: "kit",
    name: "Kits Presenteáveis",
    title: "Kits Presenteáveis",
    description: "Combinações especiais para presentear com carinho.",
    intro:
      "Kits com combinações de produtos para presentear em datas especiais ou simplesmente demonstrar carinho.",
    whatsappMessage: "Olá! Gostaria de conhecer os kits presenteáveis da ESSÊNCIA T.",
    tone: "sand",
  },
];

export const categoryBySlug = (slug: CategorySlug): Category => {
  const found = categories.find((c) => c.slug === slug);
  if (!found) throw new Error(`Categoria desconhecida: ${slug}`);
  return found;
};

/** As quatro categorias exibidas na home (kits têm seção própria). */
export const homeCategories = categories.filter((c) => c.slug !== "kit");
