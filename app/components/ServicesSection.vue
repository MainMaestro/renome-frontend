<script setup lang="ts">
import type { Image, Response } from "~/models";

type Service = {
  id: number;
  name: string;
  description: string;
  icon: Image;
  picture?: Image;
};

const { data: servicesResponse } = await useApi<Response<Service[]>>(
  "/services?populate=*",
);
const allServices = computed(() => servicesResponse.value?.data || []);

// Первая услуга (Автоматизация)
const mainService = computed(() => allServices.value[0]);
// Остальные три
const otherServices = computed(() => allServices.value.slice(1, 4));
</script>
<template>
  <section id="services" class="py-20 bg-transparent relative z-10 font-sans">
    <div class="container mx-auto px-6 max-w-300">
      <h2 class="text-renome text-[36px] font-medium uppercase mb-10">
        УСЛУГИ
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 1. ГЛАВНАЯ УСЛУГА -->
        <div
          v-if="mainService"
          class="md:col-span-3 bg-white p-10 rounded-4xl shadow-2xl flex flex-col md:flex-row gap-10 border border-gray-100"
        >
          <div class="flex-1">
            <div class="flex items-start gap-4 mb-6">
              <div
                class="w-75 h-75 rounded-xl flex items-center justify-center shrink-0"
              >
                <img
                  v-if="mainService.icon"
                  :src="`http://79.174.80.177:1337${mainService.icon.url}`"
                  class="w-20"
                />
              </div>
              <h3
                class="text-renome text-[28px] font-bold uppercase leading-tight"
              >
                {{ mainService.name }}
              </h3>
            </div>
            <p class="text-black/80 text-[16px] leading-[150%] mb-8">
              {{ mainService.description }}
            </p>
            <button
              class="flex items-center gap-4 bg-renome-gradient text-white px-6 py-3 rounded-full hover:opacity-90 transition-all"
            >
              <span class="text-[14px] font-medium uppercase tracking-wider"
                >Узнать подробнее</span
              >
              <div
                class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              >
                →
              </div>
            </button>
          </div>

          <div class="hidden md:block w-87.5 shrink-0">
            <img
              v-if="mainService.picture"
              :src="imageSrc(mainService.picture)"
              class="w-full object-contain"
            />
          </div>
        </div>

        <!-- 2. ОСТАЛЬНЫЕ УСЛУГИ (3 в ряд) -->
        <div
          v-for="service in otherServices"
          :key="service.id"
          class="bg-white p-8 rounded-4xl shadow-2xl flex flex-col border border-gray-100 h-full"
        >
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
            >
              <img
                v-if="service.icon"
                :src="imageSrc(service.icon)"
                class="w-20"
              />
            </div>
            <h3
              class="text-renome text-[18px] font-bold uppercase leading-tight"
            >
              {{ service.name }}
            </h3>
          </div>
          <p class="text-black/70 text-[14px] leading-[160%] mb-10 grow">
            {{ service.description }}
          </p>
          <button
            class="flex items-center justify-between bg-renome-gradient text-white px-5 py-3 rounded-full w-fit gap-4 hover:opacity-90 transition-all mt-auto"
          >
            <span class="text-[12px] uppercase font-bold tracking-wider"
              >Узнать подробнее</span
            >
            <div
              class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
            >
              →
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
