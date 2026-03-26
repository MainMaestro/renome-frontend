<script setup lang="ts">
import type { SiteInfo, Response } from "./models";
const PRETTY_NAME = "Реноме Консалтинг";
const DESCRIPTION = "Профессиональные консультации и ИТ-решения";

onMounted(() => {
  const fixHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  fixHeight();
  window.addEventListener("orientationchange", fixHeight);

 
});

useHead({
  htmlAttrs: {
    lang: "ru",
  },
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  bodyAttrs: {
    class: "min-h-[100dvh] m-0 p-0 overflow-x-hidden",
  },
});

const { data: siteResponse } = await useApi<Response<SiteInfo>>(
  "/site-info?populate=*",
);

// Основной объект данных
const companyData = computed(
  () => siteResponse.value?.data || ({} as SiteInfo),
);
useSeoMeta({
  title: PRETTY_NAME,
  ogTitle: PRETTY_NAME,
  description: DESCRIPTION,
  ogDescription: DESCRIPTION,
  ogImage: "/og-image.png",
  ogType: "website",
  twitterCard: "summary_large_image",
});

/**
 * @deprecated Remove ASAP, change links display to v-for list
 */
const tgLink = computed(() => {
  return companyData.value.links.find((l: any) => l.url?.includes("t.me"))?.url;
});

provide("companyInfo", companyData);
provide("tgLink", tgLink);
</script>

<template>
  <div class="fixed-bg-layer"></div>

  <div class="relative z-10 flex flex-col min-h-screen">
    <AppHeader />
    <!-- Обертка для контента, которая заставляет футер быть внизу -->
    <main class="grow">
      <NuxtPage />
    </main>
    <FeedBack />
  </div>
</template>

<style>
/* 1. Убираем "ядовитые" фоны и фиксируем базу */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  /* Цвет-заглушка под цвет картинки, чтобы не было белых вспышек */
  background-color: #f8fafc;
}

/* 2. Идеальный фоновый слой */
.fixed-bg-layer {
  position: fixed;
  /* Используем inset вместо top/left для надежности */
  inset: 0;
  z-index: -1;
  background-image: url("/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* Фикс для Android: картинка не будет дергаться при скрытии адресной строки */
  height: 100vh;
  /* Для мобильных браузеров, поддерживающих новые юниты */
  height: 100lvh;

  /* Ускорение отрисовки */
  transform: translateZ(0);
  will-change: transform;
}

/* 3. Фикс для мобильного Android Chrome (запрет "прыжков") */
@media (max-width: 768px) {
  .fixed-bg-layer {
    /* Даем небольшой запас ВНИЗ (только для мобилок),
       чтобы перекрыть ход адресной строки */
    height: 110%;
    bottom: -10%;
  }

  body {
    /* Запрещаем системный "отскок" страницы */
    overscroll-behavior-y: none;
  }
}

/* 4. Плавный скролл */
html {
  scroll-behavior: smooth;
}
header {
  will-change: transform, background-color;
  transform: translateZ(0); /* Принудительный запуск GPU */
}
</style>
