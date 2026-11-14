import { findImage } from "../lib/utils";

/**
 * Galeria "Um pouco da ESSÊNCIA T no seu dia a dia".
 * Não há integração com a API do Instagram. Para exibir fotos reais, salve-as em
 * public/images/instagram/ com os nomes 1.jpg, 2.jpg ... 6.jpg (ou .png/.webp).
 */
export const instagramTiles = (): { image: string | null; alt: string }[] =>
  [1, 2, 3, 4, 5, 6].map((n) => ({
    image: findImage("instagram", String(n)),
    alt: `Publicação ${n} do Instagram da ESSÊNCIA T`,
  }));
