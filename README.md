# ESSÊNCIA T — Site oficial

Vitrine de produtos artesanais (home sprays, difusores de vareta, velas aromáticas, sabonetes e kits) com pedidos pelo WhatsApp. Slogan: *Iluminando momentos, perfumando memórias.*

## Como o projeto funciona

O site é **gerado de forma estática** por um script em TypeScript (`src/build.ts`). Ele lê os dados centralizados (`src/data/`), monta todas as páginas em HTML e escreve o resultado na pasta `dist/`. O resultado é muito rápido, barato de hospedar e ótimo para SEO.

> **Observação técnica:** o briefing preferia Next.js + Tailwind. O ambiente em que o site foi construído não permitia instalar pacotes do npm, então o site foi feito sem esses dois (HTML gerado por TypeScript + CSS próprio). A organização por componentes, a fonte única de dados e a função central de WhatsApp foram mantidas, e migrar para Next.js depois é simples porque dados, textos e CSS já estão separados.

**Tecnologias:** TypeScript (gerador), HTML semântico, CSS próprio (mobile-first), JavaScript simples no navegador (menu, busca, filtros). Fontes: Cormorant Garamond (títulos) e Montserrat (textos), via Google Fonts.

## Pré-requisitos

- Node.js 20 ou superior

## Instalação e execução local

```bash
npm install
npm run dev        # gera o site e abre em http://localhost:3000
```

Depois de editar qualquer arquivo, rode `npm run build` (ou reinicie o `npm run dev`) para regenerar. Outros comandos:

```bash
npm run build      # gera a pasta dist/
npm run typecheck  # verifica os tipos do TypeScript
```

## Estrutura de pastas

```
src/
  data/        site.ts (contato, textos gerais) · categories.ts · products.ts · instagram.ts
  components/  layout (cabeçalho/rodapé) · home · products · common · icons
  lib/         whatsapp.ts (único lugar que cria links do WhatsApp) · utils.ts
  types/       product.ts
  styles/      styles.css
  client/      main.js (menu móvel, busca e filtros)
  pages.ts     monta cada página e o SEO
  build.ts     gera dist/, sitemap.xml e robots.txt
public/images/ brand · hero · products · categories · institutional · instagram
```

## Como cadastrar produtos

Abra `src/data/products.ts`. Copie o bloco de exemplo comentado no fim do arquivo, cole abaixo de "PRODUTOS REAIS" e preencha. Campos principais:

| Campo | O que é |
|---|---|
| `slug` | Endereço da página (`nome-do-produto` → `/produtos/nome-do-produto`). Sem acentos e espaços. |
| `category` | `home-spray`, `difusor`, `vela`, `sabonete` ou `kit` |
| `fragrance` | Fragrância (ou `null`). Quando houver fragrâncias cadastradas, o filtro por fragrância aparece sozinho. |
| `size` | Ex.: `"250ml"` ou `"90g"` (ou `null`) |
| `price` | Ex.: `49.9` para R$ 49,90, ou `null` para exibir "Consulte valores". A ordenação por preço aparece sozinha quando houver preços. |
| `images` | Lista de caminhos, ex.: `["/images/products/vela-1.jpg"]` |
| `featured` | `true` para aparecer em "Em destaque" na home |
| `active` | `false` esconde o produto do site sem apagá-lo |
| `available` | `false` mostra como indisponível |

**Itens de exemplo:** os 5 produtos marcados `demo: true` servem só para mostrar o layout. Quando cadastrar os reais, abra `src/data/site.ts` e troque `SHOW_DEMO_PRODUCTS` para `false`.

## Como atualizar imagens

Salve as fotos em `public/images/` (JPG, PNG, WebP ou AVIF) com estes nomes, e o site passa a usá-las automaticamente, sem mexer em código:

- Hero (foto de destaque da home): `public/images/hero/hero.jpg`
- Categorias: `public/images/categories/home-spray.jpg`, `difusor.jpg`, `vela.jpg`, `sabonete.jpg`
- Seção institucional: `public/images/institutional/sobre.jpg`
- Galeria do Instagram: `public/images/instagram/1.jpg` … `6.jpg`
- Produtos: salve em `public/images/products/` e informe o caminho em `images` no produto.

Recomendações: fotos em proporção **4:5 (retrato)**, com cerca de 1200 px de largura e menos de 300 KB cada (comprima antes, por exemplo em squoosh.app). Enquanto não houver foto, o site mostra um espaço reservado discreto com a legenda "Foto em breve".

## Como alterar preços e informações de contato

- **Preços:** campo `price` do produto em `src/data/products.ts`.
- **WhatsApp, Instagram, localização, slogan:** `src/data/site.ts`. Todos os botões do site usam esse número.
- **Mensagens pré-preenchidas do WhatsApp:** `src/data/categories.ts` (por categoria) e `src/lib/whatsapp.ts` (geral, produto, presentes).

## Publicar na Vercel

1. Crie uma conta em vercel.com e envie este projeto para um repositório no GitHub.
2. Na Vercel: **Add New → Project** e escolha o repositório. As configurações já estão em `vercel.json` (comando `npm run build`, saída `dist`).
3. Clique em **Deploy**. O site ficará disponível em um endereço `*.vercel.app`.

## Configurar domínio próprio

1. Compre o domínio (Registro.br, por exemplo). Nada foi comprado ou contratado por este projeto.
2. Na Vercel: **Project → Settings → Domains → Add**, e siga as instruções de DNS.
3. Em **Settings → Environment Variables**, crie `SITE_URL` com o endereço final (ex.: `https://www.seudominio.com.br`) e faça um novo deploy. Isso ajusta canonical, sitemap e compartilhamento.

## Atualizar o site depois de publicado

Edite os arquivos (produtos, preços, fotos), faça `commit` e `push` no GitHub: a Vercel gera e publica a nova versão automaticamente.

## SEO e rastreamento

Já incluídos: título e descrição por página, URLs amigáveis, canonical, Open Graph, `sitemap.xml`, `robots.txt`, dados estruturados (Organization, WebSite, Product, BreadcrumbList) e textos alternativos nas imagens. As páginas dos itens de exemplo ficam com `noindex` e fora do sitemap.

**Nenhum script de rastreamento é carregado.** Para adicionar Google Analytics 4, Meta Pixel ou Search Console no futuro, o ideal é incluir também um aviso de consentimento e atualizar `/privacidade`. O ponto de entrada é a função `renderPage` em `src/components/layout.ts`.

## Evolução futura

Dados centralizados e tipados em `src/data/` facilitam migrar para banco de dados/painel administrativo, carrinho, Pix, frete e estoque quando for a hora.

## Texto legal

A página `/privacidade` é um texto-base simples e coerente com o site atual (sem cadastros nem rastreamento). Revise-o com um profissional se o site passar a coletar dados.
