<script setup lang="ts">
// Запрос к коллекции recomendations
const { data: recommendationsResponse } = await useApi<{
  data: { id: number; title: string; text: string; author: string }[];
}>("/recomendations?populate=*");

// Данные из Strapi
const reviews = computed(() => recommendationsResponse.value?.data || []);
</script>

<template>
  <section class="py-24 font-sans overflow-hidden">
    <div class="container mx-auto px-6 max-w-300">
      <h2
        class="text-renome text-[36px] font-bold uppercase mb-16 tracking-tight"
      >
        НАС РЕКОМЕНДУЮТ
      </h2>

      <!-- Сетка отзывов -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
      >
        <div
          v-for="review in reviews"
          :key="review.id"
          class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md"
        >
          <div>
            <!-- Рейтинг (Звезды) -->
            <div class="flex gap-1 mb-6">
              <span v-for="i in 5" :key="i" class="text-[#00a651] text-xl"
                >★</span
              >
            </div>

            <!-- Заголовок отзыва (title) -->
            <h3 class="text-[16px] font-bold text-black mb-6 leading-snug">
              {{ review.title }}
            </h3>

            <!-- Текст отзыва (text) -->
            <p
              class="text-gray-600 text-[14px] leading-[1.7] font-light mb-8 italic"
            >
              {{ review.text }}
            </p>
          </div>

          <!-- Автор (author) -->
          <div class="mt-auto pt-6 border-t border-gray-50 flex justify-end">
            <div class="text-right flex items-center gap-3">
              <p
                class="text-[13px] font-bold text-black leading-tight max-w-50"
              >
                {{ review.author }}
              </p>
              <!-- Вертикальная черта из макета -->
              <div class="w-0.5 h-8 bg-renome mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
