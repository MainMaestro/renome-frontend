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

export type ListResponse<T extends Array<any>> = Required<Response<T>>;

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
