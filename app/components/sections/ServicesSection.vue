<script setup lang="ts">
import type { ListResponse, Service } from "~/models";

const IsServiceModalOpen = ref(false);
const selectedService = ref<Service | null>(null);
// Функция для открытия модалки
const openService = (service: Service) => {
  selectedService.value = service;
  IsServiceModalOpen.value = true;
};

const { data: servicesResponse } = await useApi<ListResponse<Service>>(
  "/services?populate=*",
);
const allServices = computed(() => servicesResponse.value?.data || []);
// Первая услуга (Автоматизация)
const mainService = computed(() => allServices.value[0]);
// Остальные три
const otherServices = computed(() => allServices.value.slice(1, 4));
</script>
<template>
  <section
    id="services"
    class="py-12 md:py-20 bg-transparent relative z-10 font-sans"
  >
    <div class="container mx-auto px-4 md:px-6 max-w-300">
      <!-- Исправил max-w-300 на стандартный -->
      <h2
        class="text-renome text-[28px] md:text-[36px] font-medium uppercase mb-8 md:mb-10 text-center md:text-left"
      >
        УСЛУГИ
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 1. ГЛАВНАЯ УСЛУГА (Full width on all screens, layout changes on md) -->
        <div
          v-if="mainService"
          class="md:col-span-3 bg-white p-6 md:p-10 rounded-4xl md:rounded-4xl shadow-xl flex flex-col md:flex-row gap-8 md:gap-10 border border-gray-100"
        >
          <div class="flex-1 order-2 md:order-1">
            <div class="flex items-center md:items-start gap-4 mb-6">
              <div
                class="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0"
              >
                <StrapiImg
                  v-if="mainService.icon"
                  :src="mainService.icon"
                  :alt="'Иконка услуги ' + mainService.name"
                  class="w-full h-full object-contain"
                />
              </div>
              <h3
                class="text-renome text-[22px] md:text-[28px] font-bold uppercase leading-tight"
              >
                {{ mainService.name }}
              </h3>
            </div>
            <p
              class="text-black/80 text-[15px] md:text-[16px] leading-[150%] mb-8"
            >
              {{ mainService.description }}
            </p>
            <button
              @click="openService(mainService)"
              class="w-full md:w-auto flex items-center justify-center md:justify-start gap-4 bg-renome-gradient text-white px-8 py-4 rounded-full hover:opacity-90 transition-all hover:brightness-110 shadow-lg active:scale-95 cursor-pointer"
            >
              <span class="text-[14px] font-medium uppercase tracking-wider"
                >Узнать подробнее</span
              >
            </button>
          </div>

          <!-- Картинка: сверху на мобилках, справа на десктопе -->
          <div
            class="order-1 md:order-2 w-full md:w-80 lg:w-96 shrink-0 flex justify-center"
          >
            <StrapiImg
              v-if="mainService.picture"
              :src="mainService.picture"
              class="max-h-50 md:max-h-full w-auto object-contain"
            />
          </div>
        </div>

        <!-- 2. ОСТАЛЬНЫЕ УСЛУГИ -->
        <div
          v-for="service in otherServices"
          :key="service.id"
          class="bg-white p-6 md:p-8 rounded-4xl md:rounded-4xl shadow-xl flex flex-col border border-gray-100 h-full transition-transform hover:-translate-y-1"
        >
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0"
            >
              <StrapiImg
                v-if="service.icon"
                :src="service.icon"
                :alt="'Иконка услуги ' + service.name"
                class="w-full h-full object-contain"
              />
            </div>
            <h3
              class="text-renome text-[18px] font-bold uppercase leading-tight"
            >
              {{ service.name }}
            </h3>
          </div>
          <p class="text-black/70 text-[14px] leading-[160%] mb-8 grow">
            {{ service.description }}
          </p>
          <button
            @click="openService(service)"
            class="flex items-center justify-between bg-renome-gradient text-white px-6 py-3 rounded-full w-full sm:w-fit gap-4 hover:opacity-90 transition-all hover:brightness-110 cursor-pointer shadow-md active:scale-95"
          >
            <span class="text-[12px] uppercase font-bold tracking-wider"
              >Узнать подробнее</span
            >
          </button>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ServiceModal
        v-if="selectedService"
        :service="selectedService"
        :is-open="IsServiceModalOpen"
        @close="IsServiceModalOpen = false"
      />
    </Teleport>
  </section>
</template>
