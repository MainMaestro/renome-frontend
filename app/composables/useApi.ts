export const useApi = <T>(endpoint: string, opts = {}) => {
  const config = useRuntimeConfig(); // Должно быть только здесь!

  return useFetch<T>(endpoint, {
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${config.public.strapiToken}`,
    },
    ...opts,
  });
};

import type { ImageData } from "~/models";
export const imageSrc = (image: ImageData) => {
  const config = useRuntimeConfig();

  return `${config.public.strapiUrl}${image.url}`;
};
