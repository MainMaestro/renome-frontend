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
  runtimeConfig: {
    // Эта часть доступна только на сервере (SSR)
    strapiToken: process.env.STRAPI_TOKEN,
    public: {
      // Эта часть доступна везде
      apiBase: `${process.env.STRAPI_URL}/api`,
    },
  },
  googleFonts: {
    families: {
      "Fira+Sans": [300, 400, 500, 700],
    },
    display: "swap", // Чтобы текст не пропадал при загрузке
  },
});
