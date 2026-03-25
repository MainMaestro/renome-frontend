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

export type Partner = StrapiModel & {
  name: string;
  shortDescription: string;
  logo: StrapiImage;
};
