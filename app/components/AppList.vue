<script setup lang="ts">
// 1. Достаем всё необходимое строго в начале setup
const config = useRuntimeConfig();
const strapiHost = config.public.apiBase.replace(/\/api$/, "");

// 2. Делаем запрос. Используем стандартный useFetch, чтобы исключить ошибки в твоем useApi
const { data: appsResponse } = await useFetch<any>("/applications?populate=*", {
  baseURL: config.public.apiBase,
  headers: {
    Authorization: `Bearer ${config.public.strapiToken}`,
  },
});

// 3. Функция-помощник (не использует хуки Nuxt, только переданные параметры)
const getImgUrl = (app: any) => {
  const path =
    app.attributes?.screenshot?.data?.attributes?.url || app.screenshot?.url;
  if (!path) return null;
  return path.startsWith("http") ? path : `${strapiHost}${path}`;
};
</script>

<template>
  <section class="py-24">
    <div class="container mx-auto px-6">
      <h2
        class="text-renome text-[32px] font-bold uppercase mb-16 tracking-tight"
      >
        НАШИ ПРИЛОЖЕНИЯ
      </h2>

      <div class="flex flex-col gap-10">
        <!-- Безопасно перебираем data -->
        <div
          v-for="app in appsResponse?.data"
          :key="app.id"
          class="bg-white rounded-[40px] p-10 md:p-14 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-16 items-center"
        >
          <div class="flex-[1.3] space-y-8">
            <div class="flex items-start gap-6">
              <div class="w-14 h-14 shrink-0 mt-1">
                <!-- Иконка-заглушка, пока не подтянешь лого из Strapi -->
                <div
                  class="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-2xl"
                >
                  🌀
                </div>
              </div>
              <h3
                class="text-[42px] font-bold text-black leading-[1.1] tracking-tighter"
              >
                {{ app.attributes?.name || app.name }}
              </h3>
            </div>

            <p
              class="text-[#4b5563] text-[17px] leading-[1.7] font-light max-w-2xl whitespace-pre-line"
            >
              {{ app.attributes?.description || app.description }}
            </p>

            <div class="flex items-center gap-4 pt-4">
              <button
                class="bg-renome-gradient text-white px-10 py-4 rounded-full font-bold text-[14px] uppercase tracking-wider hover:bg-[#00352b] transition-all shadow-lg active:scale-95"
              >
                Оставить заявку
              </button>
              <button
                class="w-14 h-14 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all group"
              >
                <span
                  class="text-2xl text-gray-400 group-hover:translate-x-1 transition-transform"
                  >→</span
                >
              </button>
            </div>
          </div>

          <!-- Скриншот справа на градиенте -->
          <div class="flex-1 w-full">
            <img
              v-if="getImgUrl(app)"
              :src="getImgUrl(app)"
              class="w-full h-full object-contain rounded-xl shadow-2xl scale-110 translate-y-3"
              alt="App Interface"
            />
            <div v-else class="text-white/20 italic">Нет скриншота</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
