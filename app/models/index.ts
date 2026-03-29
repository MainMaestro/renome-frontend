export type Response<T> = {
  data: T;
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type ListResponse<T> = Required<Response<T[]>>;

export type StrapiModel = { id: number };

export type StrapiImage = StrapiModel & {
  url: string;
};

export type TeamMember = StrapiModel & {
  avatar: StrapiImage;

  name: string;
  position: string;
};

export type CompanySection = StrapiModel & {
  title: string;
  description: string;
};

export type Application = StrapiModel & {
  name: string;
  description: string;
  screenshot: StrapiImage;
};

export type LeadRequest = {
  name: string;
  phone: string;
  comment: string;
  personalDataConfirmation: boolean;
};

export type HeroSection = StrapiModel & {
  title: string;
  description: string;
};

export type ParnerTarif = StrapiModel & {
  name: string;
  description: string;
  price: number;
};

// export type StrapiParagraphType = "paragraph" | "text" | "heading";

export type StrapiRtfItem =
  | {
      type: "heading";
      children: StrapiRtfItem[];
      level: number;
    }
  | {
      type: "paragraph";
      children: StrapiRtfItem[];
      level?: number;
    }
  | {
      type: "text";
      text: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
      code?: boolean;
    }
  | {
      type: "list";
      format: "unordered" | "ordered";
      children: StrapiRtfItem[];
    }
  | { type: "list-item"; children: StrapiRtfItem[] };

const text: StrapiRtfItem[] = [
  {
    type: "list",
    format: "unordered",
    children: [
      {
        type: "list-item",
        children: [
          {
            type: "text",
            text: "Диагностика процессов",
          },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        text: "Анализируем текущую систему работы компании и выявляем слабые места",
      },
    ],
  },
];

export type Partner = StrapiModel & {
  name: string;
  shortDescription: string;
  logo: StrapiImage;
  anotation: string;
  tarifs: ParnerTarif[];
  tarifDescription?: string;
  // abilities?: string;
  description: StrapiRtfItem[];
};

export type QuickPrice = StrapiModel & {
  name: string;
  description: string;
  price: number;
};

export type Project = StrapiModel & {
  name: string;
  description: string;
  screenshot: StrapiImage;
};

export type Recomendation = StrapiModel & {
  title: string;
  text: string;
  author: string;
};

export type Service = StrapiModel & {
  icon: StrapiImage;
  name: string;
  description: string;
  picture?: StrapiImage;
  background: StrapiImage;
  annotation: string;
  infoBlocks: {
    title: string;
    text: StrapiRtfItem[];
    innerText?: StrapiRtfItem[];
    innerTitle?: string;
  }[];
};

export type TechStackSection = StrapiModel & {
  image: StrapiImage;
  title: string;
  description: string;
};

export type Integration = StrapiModel & {
  logo: StrapiImage;
  name: string;
};

export type LinkName = "telegram" | "whatsapp";

export type Link = {
  name: LinkName;
  url: string;
};

export type SiteInfo = StrapiModel & {
  address: string;
  phone: string;
  email: string;
  companyName: string;
  companyAddress: string;
  companyInn: string;
  companyKpp: string;
  companyOgrn: string;
  companyOkved: string;
  logo: StrapiImage;
  logoWithText: StrapiImage;
  links: Link[];
};
export type Price = {
  id: number;
  name: string;
  description: string;
  anotation: string;
  price: number;
  isPriceFrom: boolean;
};
export type PriceCategory = {
  id: number;
  name: string;
  longName: string;
  prices: Price[];
};

export type Author = StrapiModel & {
  firstName: string;
  surname: string;
  avatar: StrapiImage;
  url: string;
};

export type Post = StrapiModel & {
  title: string;
  text: StrapiRtfItem[];
  image: StrapiImage;
  author: Author;
  url: string;
  blog: Blog;
  publishedAt: string;
};

export type Blog = StrapiModel & {
  title: string;
  posts: Post[];
};
