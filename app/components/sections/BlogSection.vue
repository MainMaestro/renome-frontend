<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import type { ListResponse, Post, Response, Blog } from "~/models";

// Получаем данные для слайдера (Single Type)
const { data: sectionData } = await useApi<Response<Blog>>(
  "/blog-section?populate=posts.image&populate=posts.author",
);

// Получаем все посты для модалки (Collection Type)
const { data: allPosts } = await useApi<ListResponse<Post>>(
  "/blog-posts?populate=*",
);

const isModalOpen = ref(false);

const modules = [Navigation, Autoplay];

const breakpoints = {
  320: { slidesPerView: 1.1, spaceBetween: 16 },
  640: { slidesPerView: 2, spaceBetween: 20 },
  1024: { slidesPerView: 3, spaceBetween: 24 },
};
</script>

<template>
  <section
    id="blog"
    class="py-12 md:py-20 bg-transparent relative z-10 font-sans overflow-hidden"
  >
    <div class="container mx-auto px-4 md:px-6 max-w-310">
      <!-- Шапка -->
      <div class="flex items-center justify-between mb-8 md:mb-12">
        <div class="flex items-center gap-6">
          <h2
            class="text-[#004832] text-[28px] md:text-[40px] font-medium uppercase tracking-tight"
          >
            {{ sectionData?.data.title }}
          </h2>
          <button
            @click="isModalOpen = true"
            class="text-[#004832] border-b border-[#004832] pb-0.5 font-bold hover:opacity-70 transition-opacity uppercase text-sm md:text-base cursor-pointer"
          >
            Смотреть все
          </button>
        </div>

        <div class="flex gap-3">
          <button
            title="Назад"
            aria-label="Назад"
            class="prev-btn w-12 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-[#004832] hover:text-white transition-all disabled:opacity-30"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            title="Вперёд"
            aria-label="Вперёд"
            class="next-btn w-12 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-[#004832] hover:text-white transition-all disabled:opacity-30"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12h14m-7 7 7-7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Слайдер -->
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="20"
        :breakpoints="breakpoints"
        :navigation="{ prevEl: '.prev-btn', nextEl: '.next-btn' }"
        :autoplay="{ delay: 5000, disableOnInteraction: true }"
        class="blog-swiper overflow-visible!"
      >
        <swiper-slide
          v-for="post in sectionData?.data.posts"
          :key="post.id"
          class="h-auto"
        >
          <PostCard :post="post" />
        </swiper-slide>
      </swiper>
    </div>

    <!-- Модалка со всеми публикациями -->
    <Teleport to="body">
      <ModalDialog :is-open="isModalOpen" @close="isModalOpen = false">
        <template #header>
          <h2
            class="text-[#004832] text-[24px] md:text-[32px] font-medium uppercase"
          >
            Все публикации
          </h2>
        </template>
        <template #content>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl align-items-center"
          >
            <div v-for="post in allPosts?.data" :key="post.id" class="flex">
              <PostCard :post="post" />
            </div>
          </div>
        </template>
      </ModalDialog>
    </Teleport>
  </section>
</template>

<style scoped>
.blog-swiper {
  padding: 10px 0 40px 0;
}
button:active {
  transform: scale(0.95);
}
:deep(.swiper-slide) {
  display: flex;
  height: auto;
}
</style>
