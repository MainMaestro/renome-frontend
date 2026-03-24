<script setup lang="ts">
import { inject } from "vue";
const logoWithoutText = inject<string>('logoWithoutText');
// 1. Достаем всё необходимое строго в начале setup
const config = useRuntimeConfig();
const isContactModalOpen = ref(false);

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

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};
</script>
<template>
  <section id="applications" class="py-12 md:py-24 ">
    <div class="container mx-auto px-4 md:px-6 max-w-300">
      <h2 class="text-renome text-[28px] md:text-[32px] font-bold uppercase mb-10 md:mb-16 tracking-tight text-center md:text-left">
        НАШИ ПРИЛОЖЕНИЯ
      </h2>

      <div class="flex flex-col gap-6 md:gap-12">
        <!-- Карточка приложения -->
        <div
          v-for="app in appsResponse?.data"
          :key="app.id"
          class="bg-white rounded-[2.5rem] md:rounded-[40px] p-6 md:p-14 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-10 md:gap-16 items-center overflow-hidden"
        >
          <!-- Контентная часть -->
          <div class="flex-[1.3] space-y-6 md:space-y-8 w-full">
            <div class="flex items-center md:items-start gap-4 md:gap-6">
              <div class="w-12 h-12 shrink-0 mt-1 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                <img
                  :src="logoWithoutText"
                  alt="App Icon"
                  class="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </div>
              <h3 class="text-[28px] md:text-[42px] font-bold text-black leading-[1.1] tracking-tighter">
                {{ app.attributes?.name || app.name }}
              </h3>
            </div>

            <p class="text-[#4b5563] text-[15px] md:text-[17px] leading-[1.6] md:leading-[1.7] font-light max-w-2xl whitespace-pre-line">
              {{ app.attributes?.description || app.description }}
            </p>

            <div class="pt-2 md:pt-4">
              <button
                @click="isContactModalOpen = true"
                class="w-full md:w-auto bg-renome-gradient text-white px-8 md:px-10 py-4 rounded-full font-bold text-[13px] md:text-[14px] uppercase tracking-wider hover:brightness-110 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                Оставить заявку
              </button>
            </div>
          </div>

          <!-- Скриншот (адаптивный масштаб) -->
          <div class="flex-1 w-full relative mt-4 lg:mt-0">
            <div v-if="getImgUrl(app)" class="relative group">
              <!-- Декоративный фон под скриншотом для объема на десктопе -->
              <div class="absolute -inset-4 bg-renome-gradient opacity-5 rounded-4xl blur-2xl hidden lg:block"></div>
              <img
                :src="getImgUrl(app)"
                class="relative w-full h-auto object-contain rounded-2xl shadow-xl lg:scale-110 lg:translate-y-3 transition-transform duration-500 group-hover:scale-115"
                alt="App Interface"
              />
            </div>
            <div v-else class="text-gray-300 italic text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed">
              Нет скриншота
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <ContactModal 
    :isOpen="isContactModalOpen" 
    @close="isContactModalOpen = false" 
  />
</template>
