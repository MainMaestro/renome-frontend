<script setup lang="ts">
const { data: servicesResponse } = await useApi<any>("/services?populate=*");
const allServices = computed(() => servicesResponse.value?.data || []);

// Первая услуга (Автоматизация)
const mainService = computed(() => allServices.value[0]);
// Остальные три
const otherServices = computed(() => allServices.value.slice(1, 4));
</script>
<template>
  <section id="services" class="py-12 md:py-20 bg-transparent relative z-10 font-sans">
    <div class="container mx-auto px-4 md:px-6 max-w-[1200px]"> <!-- Исправил max-w-300 на стандартный -->
      <h2 class="text-renome text-[28px] md:text-[36px] font-medium uppercase mb-8 md:mb-10 text-center md:text-left">
        УСЛУГИ
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 1. ГЛАВНАЯ УСЛУГА (Full width on all screens, layout changes on md) -->
        <div
          v-if="mainService"
          class="md:col-span-3 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-4xl shadow-xl flex flex-col md:flex-row gap-8 md:gap-10 border border-gray-100"
        >
          <div class="flex-1 order-2 md:order-1">
            <div class="flex items-center md:items-start gap-4 mb-6">
              <div class="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0">
                <img
                  v-if="mainService.icon"
                  :src="`http://79.174.80.177:1337${mainService.icon.url}`"
                  class="w-full h-full object-contain"
                />
              </div>
              <h3 class="text-renome text-[22px] md:text-[28px] font-bold uppercase leading-tight">
                {{ mainService.name }}
              </h3>
            </div>
            <p class="text-black/80 text-[15px] md:text-[16px] leading-[150%] mb-8">
              {{ mainService.description }}
            </p>
            <button class="w-full md:w-auto flex items-center justify-center md:justify-start gap-4 bg-renome-gradient text-white px-8 py-4 rounded-full hover:opacity-90 transition-all">
              <span class="text-[14px] font-medium uppercase tracking-wider">Узнать подробнее</span>
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">→</div>
            </button>
          </div>

          <!-- Картинка: сверху на мобилках, справа на десктопе -->
          <div class="order-1 md:order-2 w-full md:w-80 lg:w-96 shrink-0 flex justify-center">
            <img
              v-if="mainService.picture"
              :src="`http://79.174.80.177:1337${mainService.picture.url}`"
              class="max-h-[200px] md:max-h-full w-auto object-contain"
            />
          </div>
        </div>

        <!-- 2. ОСТАЛЬНЫЕ УСЛУГИ -->
        <div
          v-for="service in otherServices"
          :key="service.id"
          class="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-4xl shadow-xl flex flex-col border border-gray-100 h-full transition-transform hover:-translate-y-1"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
              <img
                v-if="service.icon"
                :src="`http://79.174.80.177:1337${service.icon.url}`"
                class="w-full h-full object-contain"
              />
            </div>
            <h3 class="text-renome text-[18px] font-bold uppercase leading-tight">
              {{ service.name }}
            </h3>
          </div>
          <p class="text-black/70 text-[14px] leading-[160%] mb-8 grow">
            {{ service.description }}
          </p>
          <button class="flex items-center justify-between bg-renome-gradient text-white px-6 py-3 rounded-full w-full sm:w-fit gap-4 hover:opacity-90 transition-all">
            <span class="text-[12px] uppercase font-bold tracking-wider">Узнать подробнее</span>
            <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">→</div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
