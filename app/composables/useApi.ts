// useApi.ts
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
