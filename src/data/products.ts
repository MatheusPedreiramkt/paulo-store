export type Category =
  | "moda-masculina"
  | "moda-intima-masculina"
  | "moda-intima-feminina";

export interface ProductColor {
  name: string;
  image: string;
  /** Tamanhos disponíveis para esta cor. Se omitido, usa product.sizes. */
  sizes?: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  /** Quantidade mínima para ativar o preço promocional */
  promoQty?: number;
  /** Preço total ao atingir promoQty (ex: 2 por R$150) */
  promoPrice?: number;
  /** Label exibido na página do produto */
  promoLabel?: string;
  category: Category;
  /** União de todos os tamanhos disponíveis (para filtros) */
  sizes: string[];
  colors: ProductColor[];
  /** Galeria de imagens para produtos sem variação de cor */
  gallery?: string[];
  /** Texto exibido no lugar do seletor de cores (ex: "Cores variadas") */
  colorNote?: string;
  /** Badge exibido no card (ex: "15 UNIDADES") */
  badge?: string;
  /** SEO: título da página */
  metaTitle?: string;
  /** SEO: descrição da página */
  metaDescription?: string;
  featured: boolean;
  available: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  "moda-masculina": "Moda Masculina",
  "moda-intima-masculina": "Moda Íntima Masculina",
  "moda-intima-feminina": "Moda Íntima Feminina",
};

// ─── PRODUTO REAL ───────────────────────────────────────────────────────────

const shortTactel: Product = {
  id: "masc-3",
  name: "Short Tactel 100% Poliéster com Bolso Frente e Atrás e Cadarço",
  slug: "short-tactel",
  description:
    "Short tactel 100% poliéster com bolso na frente e atrás, e cadarço, variedade de cores.",
  price: 45.9,
  promoQty: 3,
  promoPrice: 140.9,
  promoLabel: "Leve 3 por R$ 140,90",
  category: "moda-masculina",
  sizes: ["P", "M", "G", "GG"],
  colors: [
    { name: "Bege", image: "/products/short-tactel/bege.webp" },
    { name: "Azul Royal", image: "/products/short-tactel/azul-royal.webp" },
    { name: "Verde Água", image: "/products/short-tactel/verde-agua.webp" },
    { name: "Verde Folha", image: "/products/short-tactel/verde-folha.webp" },
    { name: "Verde Militar", image: "/products/short-tactel/verde-militar.webp" },
  ],
  featured: true,
  available: true,
};

const bermudaTactel: Product = {
  id: "masc-2",
  name: "Short Tactel 96% Poliéster e 10% Elastano, Perfuração Aço Inoxidável",
  slug: "bermuda-tactel",
  description:
    "Short tactel 96% poliéster e 10% elastano, perfuração aço inoxidável, cores variadas.",
  price: 55.9,
  category: "moda-masculina",
  sizes: ["G"],
  colors: [
    { name: "Vermelho", image: "/products/bermuda/vermelho.webp" },
    { name: "Amarelo", image: "/products/bermuda/amarelo.webp" },
    { name: "Azul", image: "/products/bermuda/azul.webp" },
    { name: "Branco", image: "/products/bermuda/branco.webp" },
  ],
  featured: true,
  available: true,
};

const bermudaLinho: Product = {
  id: "masc-1",
  name: "Short Linho com Cadarço de Algodão, Perfuração Aço Inoxidável, Bolso Frente e Atrás",
  slug: "bermuda-linho",
  description:
    "Short linho com cadarço de algodão, perfuração aço inoxidável, bolso frente e atrás.",
  price: 65.9,
  category: "moda-masculina",
  sizes: ["G"],
  colors: [
    { name: "Bege", image: "/products/bermuda-linho/bege.webp" },
    { name: "Rosa", image: "/products/bermuda-linho/rosa.webp" },
    { name: "Azul", image: "/products/bermuda-linho/azul.webp" },
  ],
  featured: true,
  available: true,
};

const camisetaAlgodao: Product = {
  id: "real-1",
  name: "Camiseta 100% Algodão Fio 30.1 Penteado",
  slug: "camiseta-algodao-fio-30-penteado",
  description:
    "Camiseta masculina confeccionada em algodão fio 30.1 penteado, proporcionando conforto, durabilidade e excelente caimento para o dia a dia.",
  price: 100,
  promoQty: 2,
  promoPrice: 150,
  promoLabel: "Leve 2 por R$ 150,00",
  category: "moda-masculina",
  sizes: ["P", "M", "G", "GG"],
  colors: [
    {
      name: "Preta",
      image: "/products/camiseta-algodao/preta.webp",
      sizes: ["P", "M", "G", "GG"],
    },
    {
      name: "Branca",
      image: "/products/camiseta-algodao/branca.webp",
      sizes: ["G", "GG"],
    },
    {
      name: "Verde",
      image: "/products/camiseta-algodao/verde.webp",
      sizes: ["M", "G", "GG"],
    },
    {
      name: "Caramelo",
      image: "/products/camiseta-algodao/bege.webp",
      sizes: ["M", "G", "GG"],
    },
    {
      name: "Cinza",
      image: "/products/camiseta-algodao/cinza.webp",
      sizes: ["M", "G", "GG"],
    },
    {
      name: "Azul",
      image: "/products/camiseta-algodao/azul.webp",
      sizes: ["G", "GG"],
    },
  ],
  featured: true,
  available: true,
};

const kitCuecaBoxer15: Product = {
  id: "real-2",
  name: "Kit Cueca Boxer Masculina - 15 Unidades",
  slug: "kit-cueca-boxer-15-unidades",
  description:
    "Kit com 15 cuecas boxer masculinas. Confortáveis, macias e ideais para uso diário. Modelos enviados em cores variadas.",
  price: 85.9,
  category: "moda-intima-masculina",
  sizes: ["P", "M", "G", "GG"],
  colors: [],
  gallery: [
    "/products/cueca-box-15un/imagem-2.webp",
    "/products/cueca-box-15un/image-1.webp",
  ],
  colorNote: "Cores variadas",
  badge: "15 UNIDADES",
  metaTitle: "Kit Cueca Boxer Masculina 15 Unidades | Paulo Guimarães Store",
  metaDescription:
    "Kit com 15 cuecas boxer masculinas, conforto e excelente custo-benefício. Disponível nos tamanhos P ao GG.",
  featured: true,
  available: true,
};

const femaleProducts: Product[] = [
  {
    id: "fem-1",
    name: "Calcinha Adulto Fui Duplo Liso",
    slug: "calcinha-adulto-fui-duplo-liso",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 45.99,
    promoQty: 3,
    promoPrice: 85.9,
    promoLabel: "Leve 3 por R$ 85,90",
    category: "moda-intima-feminina",
    sizes: ["Único (até 42)"],
    colors: [],
    gallery: ["/products/Calcinha-adulto-fui-duplo-liso.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-2",
    name: "Calcinha Cottinho Adulto Algodão",
    slug: "calcinha-cottinho-adulto-algodao",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 48.9,
    promoQty: 3,
    promoPrice: 88.9,
    promoLabel: "Leve 3 por R$ 88,90",
    category: "moda-intima-feminina",
    sizes: ["G"],
    colors: [],
    gallery: ["/products/Calcinha-cottinho-adulto-algodão.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-3",
    name: "Calcinha Adulto Microfibra",
    slug: "calcinha-adulto-microfibra",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 25.99,
    promoQty: 3,
    promoPrice: 55.9,
    promoLabel: "Leve 3 por R$ 55,90",
    category: "moda-intima-feminina",
    sizes: ["G"],
    colors: [],
    gallery: ["/products/Calcinha-adulto-microfibra.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-4",
    name: "Calcinha Fio Toda na Renda com Regulagem",
    slug: "calcinha-fio-toda-na-renda-com-regulagem",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 31.9,
    promoQty: 3,
    promoPrice: 75.9,
    promoLabel: "Leve 3 por R$ 75,90",
    category: "moda-intima-feminina",
    sizes: ["36", "38", "40", "42"],
    colors: [],
    gallery: ["/products/Calcinha-fio-toda-na-renda-com-regulagem.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-5",
    name: "Calcinha Sem Costura Fio Dental",
    slug: "calcinha-sem-costura-fio-dental",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 32.9,
    promoQty: 3,
    promoPrice: 78.9,
    promoLabel: "Leve 3 por R$ 78,90",
    category: "moda-intima-feminina",
    sizes: ["P", "M", "G", "GG"],
    colors: [],
    gallery: ["/products/Calcinha-sem-costura-fio-dental.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-6",
    name: "Lingerie com Bojo com Detalhe de Renda",
    slug: "lingerie-com-bojo-com-detalhe-de-renda",
    description:
      "Peça feminina com excelente acabamento, conforto e visual delicado.",
    price: 65.9,
    promoQty: 3,
    promoPrice: 115.9,
    promoLabel: "Leve 3 por R$ 115,90",
    category: "moda-intima-feminina",
    sizes: ["P", "M", "G", "GG"],
    colors: [],
    gallery: ["/products/Lingerie-com-bojo-com-detalhe-de-renda.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-7",
    name: "Sutiã Reforçado",
    slug: "sutia-reforcado",
    description:
      "Peça feminina com excelente acabamento, conforto e visual delicado.",
    price: 30.99,
    promoQty: 3,
    promoPrice: 90.9,
    promoLabel: "Leve 3 por R$ 90,90",
    category: "moda-intima-feminina",
    sizes: ["M", "G", "GG"],
    colors: [],
    gallery: ["/products/Sutiã-reforçado.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-8",
    name: "Lingerie Carollis de Bojo",
    slug: "lingerie-carollis-de-bojo",
    description:
      "Peça feminina com excelente acabamento, conforto e visual delicado.",
    price: 75.9,
    promoQty: 3,
    promoPrice: 180.9,
    promoLabel: "Leve 3 por R$ 180,90",
    category: "moda-intima-feminina",
    sizes: ["P", "M", "G"],
    colors: [],
    gallery: ["/products/Lingerie-Carollis-de-bojo.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-9",
    name: "Calcinha Adulto Plus Size Lisa Cotton",
    slug: "calcinha-adulto-plus-size-lisa-cotton",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 35.9,
    promoQty: 3,
    promoPrice: 95.9,
    promoLabel: "Leve 3 por R$ 95,90",
    category: "moda-intima-feminina",
    sizes: ["44", "46", "48", "50"],
    colors: [],
    gallery: ["/products/Calcinha-adulto-plus-size-lisa-cotton.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-10",
    name: "Calcinha Adulto BL Cotton",
    slug: "calcinha-adulto-bl-cotton",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 25.9,
    promoQty: 3,
    promoPrice: 68.9,
    promoLabel: "Leve 3 por R$ 68,90",
    category: "moda-intima-feminina",
    sizes: ["G"],
    colors: [],
    gallery: ["/products/Calcinha-adulto-BL-cotton.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-11",
    name: "Calcinha Adulto Fio Duplo Liso",
    slug: "calcinha-adulto-fio-duplo-liso",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 25.9,
    promoQty: 3,
    promoPrice: 68.9,
    promoLabel: "Leve 3 por R$ 68,90",
    category: "moda-intima-feminina",
    sizes: ["36", "38", "40", "42"],
    colors: [],
    gallery: ["/products/Calcinha-adulto-fio-duplo-liso.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-13",
    name: "Calcinha Fio Duplo Encanto",
    slug: "calcinha-fio-duplo-encanto",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 35.9,
    promoQty: 3,
    promoPrice: 75.9,
    promoLabel: "Leve 3 por R$ 75,90",
    category: "moda-intima-feminina",
    sizes: ["P", "M", "G", "GG"],
    colors: [],
    gallery: ["/products/Calcinha-fio-duplo-encanto.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
  {
    id: "fem-12",
    name: "Calcinha de Algodão",
    slug: "calcinha-de-algodao",
    description:
      "Peça feminina confortável, disponível em cores variadas, ideal para o dia a dia.",
    price: 25.9,
    promoQty: 3,
    promoPrice: 68.9,
    promoLabel: "Leve 3 por R$ 68,90",
    category: "moda-intima-feminina",
    sizes: ["38", "40", "42"],
    colors: [],
    gallery: ["/products/Calcinha-de-algodão.webp"],
    colorNote: "Cores variadas",
    badge: "KIT 3 DISPONÍVEL",
    featured: true,
    available: true,
  },
];

export const products: Product[] = [
  shortTactel,
  bermudaTactel,
  bermudaLinho,
  camisetaAlgodao,
  kitCuecaBoxer15,
  ...femaleProducts,
];
