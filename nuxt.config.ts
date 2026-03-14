// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
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

  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Fira Sans"', "sans-serif"],
          },
          fontWeight: {
            book: "350",
          },
        },
      },
    },
  },
});
