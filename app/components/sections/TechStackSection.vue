<script setup lang="ts">
import type { TechStackSection, Response } from "~/models";

const { data: techStackResponse } = await useApi<Response<TechStackSection>>(
  "/tech-stack-section?populate=*",
);

const techData = computed(
  () => techStackResponse.value?.data || ({} as TechStackSection),
);

const isContactModalOpen = ref(false);
</script>

<template>
  <section class="py-16 lg:py-24 font-sans overflow-hidden">
    <div class="container mx-auto px-6 max-w-300">
      <div class="mb-12 lg:mb-16">
        <h2
          class="text-renome text-[28px] md:text-[36px] font-bold uppercase mb-6 tracking-tight leading-tight"
        >
          {{ techData.title }}
        </h2>
        <div
          class="max-w-4xl text-[#334155] text-[15px] md:text-[16px] leading-[1.6] space-y-4 font-light"
        >
          <!-- Вывод описания из Strapi -->
          <p v-if="techData.description">
            {{ techData.description }}
          </p>
          <!-- Фоллбек если данных нет -->
          <p v-else>
            Мы разрабатываем интеграционные решения и автоматизируем
            бизнес-процессы на базе Битрикс24...
          </p>
        </div>
      </div>

      <div
        class="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
      >
        <!-- Левая карточка (Технологии) -->
        <div
          class="z-10 w-full lg:w-87.5 bg-white rounded-3xl md:rounded-4xl p-6 md:p-8 shadow-sm border border-gray-100 order-2 lg:order-1"
        >
          <RtfText :text="techData.leftText" />
        </div>

        <!-- Центральный круг (Изображение из Strapi) -->
        <div
          class="relative w-full max-w-70 md:max-w-125 aspect-square flex items-center justify-center order-1 lg:order-2"
        >
          <div class="absolute inset-0 bg-renome/5 rounded-full blur-3xl"></div>

          <StrapiImg
            :src="techData.image"
            alt="Tech Circle"
            class="w-full h-full object-contain relative z-10 hover:scale-105 transition-transform duration-700 animate-float"
          />
        </div>

        <!-- Правая карточка (Безопасность) -->
        <div
          class="z-10 w-full lg:w-87.5 bg-white rounded-3xl md:rounded-4xl p-6 md:p-8 shadow-sm border border-gray-100 order-3"
        >
          <RtfText :text="techData.rightText" />
        </div>
      </div>

      <div class="mt-12 lg:mt-16 flex justify-center lg:justify-start">
        <button
          @click="isContactModalOpen = true"
          class="w-full sm:w-auto bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center justify-center gap-6 group transition-all shadow-lg active:scale-95 cursor-pointer hover:brightness-110"
        >
          <span class="text-[12px] uppercase font-bold tracking-widest"
            >Оставить заявку</span
          >
        </button>
      </div>
    </div>

    <ContactModal
      sourceName="Секция технологического стека"
      :isOpen="isContactModalOpen"
      @close="isContactModalOpen = false"
    />
  </section>
</template>

<style scoped></style>
