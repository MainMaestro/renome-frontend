export type Response<T> = { data: T; meta: StrapiMeta };

export type StrapiDocument = {
  id: number;
  documentId: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};

export type StrapiMeta = {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type Media = {} & StrapiDocument;

export type ImageData = {
  url: string;
  width: number;
  height: number;
  ext: string;
};
export type Image = Media &
  ImageData & {
    alternativeText: string;
    caption: string;
    formats: {
      thumbnail: ImageData;
      small: ImageData;
      medium: ImageData;
      large: ImageData;
    };
  };

export type App = {
  name: string;
  screenshot: Image;
  description: string;
} & StrapiDocument;

export type Partner = {
  logo: Image;
  name: string;
  shortDescription: string;
  description: string;
  abilities: string;
} & StrapiDocument;

export type TeamMember = {
  id: number;
  name: string;
  avatar: Image;
  position: string;
} & StrapiDocument;
