<script setup lang="ts">
import { ref, computed } from 'vue';

// Запрос данных сингл-типа tech-stack-section
const { data: techStackResponse } = await useApi<any>("/tech-stack-section?populate=*");

// Удобный доступ к данным
const techData = computed(() => techStackResponse.value?.data || {});

// Формируем URL изображения (подставь свой домен, если нужно)
const imageUrl = computed(() => {
  const url = techData.value.image?.url;
  return url ? `http://79.174.80.177:1337${url}` : '/TechStack.png';
});

const isContactModalOpen = ref(false);
</script>

<template>
  <section class="py-16 lg:py-24 font-sans overflow-hidden">
    <div class="container mx-auto px-6 max-w-300">
      <div class="mb-12 lg:mb-16">
        <h2
          class="text-renome text-[28px] md:text-[36px] font-bold uppercase mb-6 tracking-tight leading-tight"
        >
          ТЕХНОЛОГИЧЕСКИЙ СТЭК
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
            Мы разрабатываем интеграционные решения и автоматизируем бизнес-процессы на базе Битрикс24...
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
          <p class="text-renome font-bold text-[15px] mb-6 leading-tight uppercase tracking-wide">
            Технологии:
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="text-renome mt-1 text-[10px]">■</span>
              <p class="text-[14px] text-gray-600">
                <strong class="text-black">Node.js</strong> — для высоконагруженных API-сервисов
              </p>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-renome mt-1 text-[10px]">■</span>
              <p class="text-[14px] text-gray-600">
                <strong class="text-black">PHP</strong> — для разработки приложений и интеграций Битрикс24
              </p>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-renome mt-1 text-[10px]">■</span>
              <p class="text-[14px] text-gray-600">
                <strong class="text-black">REST API и OAuth 2.0</strong> — для безопасного обмена данными
              </p>
            </li>
          </ul>
        </div>

        <!-- Центральный круг (Изображение из Strapi) -->
        <div
          class="relative w-full max-w-70 md:max-w-125 aspect-square flex items-center justify-center order-1 lg:order-2"
        >
          <div class="absolute inset-0 bg-renome/5 rounded-full blur-3xl"></div>
          
          <img
            :src="imageUrl"
            alt="Tech Circle"
            class="w-full h-full object-contain relative z-10 hover:scale-105 transition-transform duration-700 animate-float"
          />
        </div>

        <!-- Правая карточка (Безопасность) -->
        <div
          class="z-10 w-full lg:w-87.5 bg-white rounded-3xl md:rounded-4xl p-6 md:p-8 shadow-sm border border-gray-100 order-3"
        >
          <p class="text-renome font-bold text-[15px] mb-6 leading-tight uppercase tracking-wide">
            Безопасность:
          </p>
          <ul class="space-y-4 mb-8">
            <li class="flex items-start gap-3 text-[14px] text-gray-600">
              <span class="text-renome mt-1 text-[10px]">■</span>
              <span>Соединения защищены <strong class="text-black">HTTPS</strong></span>
            </li>
            <li class="flex items-start gap-3 text-[14px] text-gray-600">
              <span class="text-renome mt-1 text-[10px]">■</span>
              <span>Данные передаются в формате <strong class="text-black">JSON</strong></span>
            </li>
            <li class="flex items-start gap-3 text-[14px] text-gray-600">
              <span class="text-renome mt-1 text-[10px]">■</span>
              Критическая информация шифруется на стороне сервера
            </li>
          </ul>
          <p
            class="text-[13px] md:text-[14px] text-black font-medium leading-relaxed border-t pt-6 border-gray-50 italic"
          >
            Это позволяет автоматизировать процессы, снизить количество ручных операций и повысить эффективность.
          </p>
        </div>
      </div>

      <div class="mt-12 lg:mt-16 flex justify-center lg:justify-start">
        <button
          @click="isContactModalOpen = true"
          class="w-full sm:w-auto bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center justify-center gap-6 group transition-all shadow-lg active:scale-95 cursor-pointer hover:brightness-110"
        >
          <span class="text-[12px] uppercase font-bold tracking-widest">Оставить заявку</span>
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
            <span class="text-lg">→</span>
          </div>
        </button>
      </div>
    </div>

    <ContactModal 
      :isOpen="isContactModalOpen" 
      @close="isContactModalOpen = false" 
    />
  </section>
</template>

<style scoped>

</style>
