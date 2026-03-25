// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts"],
  components: [
    { path: "~/components/modal", pathPrefix: false }, // Сканировать подпапку modal
    "~/components",
  ],
  runtimeConfig: {
    // Эта часть доступна только на сервере (SSR)
    strapiToken: process.env.STRAPI_TOKEN,
    public: {
      strapiUrl: `${process.env.STRAPI_URL}`,
      apiBase: `${process.env.STRAPI_URL}/api`,
      strapiToken: process.env.STRAPI_TOKEN, // Теперь доступно и в браузере
    },
  },
  googleFonts: {
    families: {
      "Fira+Sans": [300, 400, 500, 700],
    },
    display: "swap", // Чтобы текст не пропадал при загрузке
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
});
