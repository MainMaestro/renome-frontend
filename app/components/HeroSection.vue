<script setup lang="ts">
interface StrapiResponse {
  data: {
    id: number;
    title: string;
    description: string;
  };
}

const { data: hero } = await useApi<StrapiResponse>("/hero-section?populate=*");
</script>

<template>
  <section class="relative w-full h-193.25 flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="/hero-bg.png"
        alt="Hero Background"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Контент в контейнере 1200px -->
    <div class="container mx-auto relative z-10 px-6">
      <div v-if="hero?.data" class="max-w-175">
        <h1
          class="leading-[110%] uppercase mb-6 text-renome-title font-normal text-[46px]"
        >
          {{ hero.data.title }}
        </h1>
        <p
          class="font-sans font-medium text-[14px] leading-[140%] text-black uppercase tracking-wider"
        >
          {{ hero.data.description }}
        </p>
      </div>
      <div class="mt-10 flex flex-wrap gap-4">
        <button
          class="bg-renome text-white px-8 py-4 rounded-full font-medium text-[16px] hover:bg-[#08352a] transition-all shadow-lg"
        >
          Получить план внедрения
        </button>

        <button
          class="border-2 border-renomerenome text-renome px-8 py-4 rounded-full font-medium text-[16px] hover:bg-renome hover:text-white transition-all"
        >
          Наши услуги
        </button>
      </div>
    </div>
  </section>
</template>
