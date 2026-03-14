// Добавляем <T = any>, чтобы функция принимала тип данных
export const useApi = <T = any>(endpoint: string, opts = {}) => {
  const config = useRuntimeConfig()
  
  // Передаем этот тип <T> внутрь useFetch
  return useFetch<T>(endpoint, {
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${config.strapiToken}`
    },
    ...opts
  })
}
