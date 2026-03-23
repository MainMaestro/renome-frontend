<script setup lang="ts">
const { data: siteInfo } = await useApi<any>("/site-info?populate=*");

// Извлекаем данные (учитывая структуру Strapi 4)
const companyName = computed(() => 
  siteInfo.value?.data?.attributes?.companyName || 
  siteInfo.value?.data?.companyName || 
  'Реноме Консалтинг'
);

// Если в Strapi есть описание (например, поле description), подставьте его сюда
const description = "Профессиональные консультации и ИТ-решения";

useSeoMeta({
  title: companyName,
  ogTitle: companyName,
  description: description,
  ogDescription: description,
  ogImage: '/og-image.png', // Картинка для соцсетей (положите в /public)
  ogType: 'website',
  twitterCard: 'summary_large_image',
});

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ],
  bodyAttrs: {
    class: 'bg-[url("/bg.png")] bg-cover bg-center bg-fixed min-h-screen font-sans'
  }
});
</script>

<template>
  <div class="relative z-10">
    <AppHeader />
    <NuxtPage /> 
    <FeedBack />
  </div>
</template>

<style>
html { scroll-behavior: smooth; }
body { margin: 0; padding: 0; }
</style>
