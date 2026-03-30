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
          <!-- Контентная часть -->
          <div class="flex-[1.3] space-y-6 md:space-y-8 w-full">
            <div class="flex items-center md:items-start gap-4 md:gap-6">
              <div
                class="w-12 h-12 shrink-0 mt-1 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
              >
                <StrapiImg
                  v-if="siteInfo"
                  :src="siteInfo?.logo"
                  class="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
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
                Оставить заявку
              </button>
            </div>
          </div>

          <!-- Скриншот (адаптивный масштаб) -->
          <div class="flex-1 w-full relative mt-4 lg:mt-0">
            <div v-if="useImageUrl(app.screenshot)" class="relative group">
              <!-- Декоративный фон под скриншотом для объема на десктопе -->
              <div
                class="absolute -inset-4 bg-renome-gradient opacity-5 rounded-4xl blur-2xl hidden lg:block"
              ></div>
              <StrapiImg
                :src="app.screenshot"
                class="relative w-full h-auto object-contain rounded-2xl shadow-xl lg:scale-110 lg:translate-y-3 transition-transform duration-500 group-hover:scale-115"
                alt="App Interface"
              />
            </div>
            <div
              v-else
              class="text-gray-300 italic text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <ContactModal
    sourceName="Список приложений"
    :isOpen="isContactModalOpen"
    @close="isContactModalOpen = false"
  />
</template>
