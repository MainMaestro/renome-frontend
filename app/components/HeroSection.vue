<script setup lang="ts">
import type { Response, HeroSection } from "~/models";
const isContactModalOpen = ref(false);

const { data: hero } = await useApi<Response<HeroSection>>(
  "/hero-section?populate=*",
);
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
</script>

<template>
  <section
    class="relative w-full min-h-svh h-full flex flex-col pt-15 sm:pt-25 overflow-hidden"
  >
    <div class="absolute inset-0 z-0">
      <img
        src="/hero-bg.png"
        alt="Hero Background"
        class="w-full h-full object-cover object-top-left md:object-center"
      />
    </div>

    <!-- Контент в контейнере 1200px -->
    <div
      class="container mx-auto z-10 px-6 flex flex-col grow justify-start xl:justify-center"
    >
      <div v-if="hero?.data" class="md:max-w-[50%] xl:max-w-175">
        <h1
          class="leading-[110%] uppercase mb-6 text-renome-title text-3xl sm:font-normal text-balance md:text-4xl xl:text-[46px]"
        >
          {{ hero.data.title }}
        </h1>
        <p
          class="md:font-medium sm:text-[14px] sm:leading-[140%] text-black uppercase sm:tracking-wider"
        >
          {{ hero.data.description }}
        </p>
      </div>
      <div class="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          @click="isContactModalOpen = true"
          class="bg-renome-gradient text-white px-8 py-4 rounded-full font-medium text-[16px] hover:bg-renome transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer hover:brightness-110"
        >
          Получить план внедрения
        </button>

        <button
          @click.prevent="scrollToSection('services')"
          class="border-2 backdrop-blur-xl backdrop-brightness-110 border-renome text-renome px-8 py-4 rounded-full font-medium text-[16px] hover:bg-renome active:bg-renome active:text-white hover:text-white transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          Наши услуги
        </button>
      </div>
    </div>
    <Teleport to="body">
      <ContactModal
        :isOpen="isContactModalOpen"
        @close="isContactModalOpen = false"
      />
    </Teleport>
  </section>
</template>
