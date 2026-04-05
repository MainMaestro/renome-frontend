<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ListResponse, Recomendation } from "~/models";

const { data: recommendationsResponse } = await useApi<ListResponse<Recomendation>>(
  "/recomendations?populate=*"
);

// Состояние для модалки (увеличение картинки)
const selectedImage = ref<string | null>(null);
</script>

<template>
  <section class="pb-24 font-sans">
    <div class="container mx-auto px-6 max-w-300">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <div v-for="item in recommendationsResponse?.data" :key="item.id" class="h-full">
          
          <!-- ВАРИАНТ 1: ТЕКСТОВЫЙ ОТЗЫВ (если есть текст или автор) -->
          <div 
            v-if="item.text && item.text.trim()"
            class="bg-gray-50 rounded-3xl p-6 border border-gray-100 h-full flex flex-col justify-between transition-all hover:shadow-lg"
          >
            <div>
              <div class="flex gap-1 mb-4">
                <span v-for="i in 5" :key="i" class="text-[#00a651] text-sm">★</span>
              </div>
              <h3 v-if="item.title" class="text-[15px] font-bold mb-4 leading-tight">{{ item.title }}</h3>
              <p class="text-gray-600 text-[13px] leading-relaxed italic">{{ item.text }}</p>
            </div>
            
            <div class="mt-6 pt-4 border-t border-gray-200 flex justify-end">
              <div class="text-right flex items-center gap-3">
                <p class="text-[12px] font-bold leading-tight max-w-37.5">{{ item.author }}</p>
                <div class="w-0.5 h-8 bg-renome"></div>
              </div>
            </div>
          </div>

          <!-- ВАРИАНТ 2: СЕРТИФИКАТ / СКАН (если текста нет, но есть фото) -->
          <div 
            v-else-if="item.image"
            @click="selectedImage = useImageUrl(item.image)" 
            class="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 aspect-3/4 bg-white transition-all hover:shadow-2xl"
          >
            <StrapiImg 
              :src="item.image" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt="Certificate"
              loading="lazy"
            />
            
            <!-- Оверлей -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
              <div class="w-10 h-10 border border-white rounded-full flex items-center justify-center mb-2">
                <span class="text-white text-2xl">+</span>
              </div>
              <span class="text-white text-[12px] font-medium uppercase tracking-widest">Увеличить</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Lightbox (Просмотр фото) -->
    <Transition name="fade">
      <div 
        v-if="selectedImage" 
        class="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-6"
        @click="selectedImage = null"
      >
        <img :src="selectedImage" class="max-w-full max-h-full object-contain shadow-2xl" />
        <button class="absolute top-8 right-8 text-white text-4xl hover:rotate-90 transition-transform">&times;</button>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
