<script setup lang="ts">
import type { Post } from "@/models";
defineProps<{
  post: Post;
}>();
</script>

<template>
  <div
    class="bg-white p-6 rounded-4xl shadow-2xl border border-gray-50 flex flex-col h-full min-h-130 hover:shadow-lg transition-shadow w-full"
  >
    <div v-if="post.image" class="w-full h-64 rounded-3xl overflow-hidden mb-6">
      <StrapiImg
        :src="post.image"
        :alt="'Иллюстрация: ' + post.title"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="mb-3">
      <NuxtLink v-if="post.author?.url" :to="`${post.author.url}`">
        <span
          class="text-gray-400 hover:text-renome transition-colors text-[14px] font-medium uppercase tracking-wider"
        >
          {{ post.author.firstName }} {{ post.author.surname }}
        </span>
      </NuxtLink>
    </div>
    <div class="min-h-20 mb-8">
      <h3
        class="text-[#1A1A1A] text-[18px] md:text-[22px] font-bold leading-[1.4] line-clamp-4"
      >
        {{ post.title }}
      </h3>
    </div>
    <div class="flex items-center gap-3 mt-auto">
      <a :href="post.url" target="_blank" class="btn-renome btn-md">
        Узнать подробнее
      </a>
    </div>
  </div>
</template>
