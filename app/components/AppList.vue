<script setup lang="ts">
const isContactModalOpen = ref(false);
const siteInfo = inject<SiteInfo>("companyInfo");

import type { ListResponse, Application, SiteInfo } from "~/models";

const { data: appsResponse } = await useApi<ListResponse<Application>>(
  "/applications?populate=*",
);
</script>
<template>
  <section id="applications" class="py-24 font-sans">
    <div class="container mx-auto px-6 max-w-300">
      <h2
        class="text-renome text-[36px] font-bold uppercase mb-16 tracking-tight text-center md:text-left"
      >
        НАШИ ПРИЛОЖЕНИЯ
      </h2>

      <div class="flex flex-col gap-10">
        <!-- Карточка приложения -->
        <div
          v-for="app in appsResponse?.data"
          :key="app.id"
          class="bg-white rounded-4xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-8 md:gap-12"
        >
          <!-- Верхний ряд: Текст + Скриншот -->
          <div
            class="flex flex-col lg:flex-row gap-10 items-center lg:items-start"
          >
            <!-- Левая часть: Контент -->
            <div class="flex-1 space-y-6 w-full flex flex-col items-start">
              <div class="flex gap-5 items-center">
                <div
                  class="w-12 h-12 shrink-0 mt-1 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner"
                >
                  <img
                    :src="useImageUrl(siteInfo?.logo)"
                    alt="App Icon"
                    class="w-6 h-6 object-contain"
                  />
                </div>
                <h3
                  class="text-[22px] font-bold text-renome uppercase leading-tight tracking-tight"
                >
                  <a
                    v-if="app.url"
                    :href="app.url"
                    target="_blank"
                    class="hover:opacity-80 transition-opacity flex items-center gap-2"
                  >
                    {{ app.name }}
                    <!-- Опционально: иконка внешней ссылки -->
                    <span class="text-[14px] normal-case font-normal opacity-50"
                      >↗</span
                    >
                  </a>
                  <span v-else>{{ app.name }}</span>
                </h3>
              </div>

              <p
                class="text-black text-[15px] leading-[1.7] font-light whitespace-pre-line"
              >
                {{ app.description }}
              </p>
            </div>

            <!-- Правая часть: Скриншот -->
            <div class="flex-1 w-full">
              <div
                class="rounded-xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.1)] border border-gray-100 bg-white"
              >
                <img
                  v-if="useImageUrl(app.screenshot)"
                  :src="useImageUrl(app.screenshot)"
                  class="w-full h-auto object-cover"
                  alt="App Interface"
                />
                <div
                  v-else
                  class="aspect-video bg-gray-50 flex items-center justify-center text-gray-300 italic"
                >
                  Нет скриншота
                </div>
              </div>
            </div>
          </div>

          <!-- Нижний ряд: Кнопка (всегда внизу) -->
          <div class="flex justify-start">
            <button
              @click="isContactModalOpen = true"
              class="w-full md:w-auto bg-renome-gradient text-white px-10 py-4 rounded-full font-bold text-[13px] md:text-[14px] uppercase tracking-wider hover:brightness-110 transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              Оставить заявку
            </button>
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
