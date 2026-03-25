<script setup lang="ts">



// Если в Strapi есть описание (например, поле description), подставьте его сюда
const description = "Профессиональные консультации и ИТ-решения";



useHead({
  meta: [
    // Это заставит фон "затекать" под системные индикаторы
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ],
  bodyAttrs: {
    class: 'min-h-[100dvh] m-0 p-0 overflow-x-hidden'
  }
});
const config = useRuntimeConfig();
const STRAPI_SERVER = config.public.apiBase.replace(/\/api$/, '');

const { data: siteResponse } = await useApi<any>("/site-info?populate=*");

// Основной объект данных
const companyData = computed(() => siteResponse.value?.data || {});
// Извлекаем данные (учитывая структуру Strapi 4)
const companyName = computed(() => 
  siteResponse.value?.data?.attributes?.companyName || 
  siteResponse.value?.data?.companyName || 
  'Реноме Консалтинг'
);
useSeoMeta({
  title: "Реноме консалтинг",
  ogTitle: companyName,
  description: description,
  ogDescription: description,
  ogImage: '/og-image.png', // Картинка для соцсетей (положите в /public)
  ogType: 'website',
  twitterCard: 'summary_large_image',
});
// Ссылка на Telegram (с проверкой структуры из вашего лога)
const tgLink = computed(() => {
  // Ищем массив links прямо в companyData.value
  const links = companyData.value?.links;
  
  if (Array.isArray(links)) {
    const found = links.find((l: any) => l.url?.includes('t.me'));
    return found?.url;
  }
  
});

const logoUrl = computed(() => {
  const path = companyData.value?.logoWithText?.url;
  return path ? `${STRAPI_SERVER}${path}` : null;
});

const logoWithoutText = computed(() => {
  const path = companyData.value?.logo?.url; // Берем из поля 'logo'
  return path ? `${STRAPI_SERVER}${path}` : null; // Заглушка, если нет в Strapi
});
// Пробрасываем данные
provide('companyInfo', companyData);
provide('tgLink', tgLink);
provide('logoUrl', logoUrl);
provide('logoWithoutText', logoWithoutText);
</script>

<template>
   <div 
  class="fixed inset-0 -z-10 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat"
  style="height: 100dvh; min-height: -webkit-fill-available; will-change: transform;"
></div>
  <div class="relative z-10">
    <AppHeader />
    <NuxtPage /> 
    <FeedBack />
  </div>
</template>

<style>
html { scroll-behavior: smooth; }
body { margin: 0; padding: 0; overscroll-behavior-y: none;}
</style>
