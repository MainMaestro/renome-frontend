<script setup lang="ts">
onMounted(() => {
  const fixHeight = () => {
    // Берем реальную высоту в пикселях один раз
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  fixHeight();
  // Пересчитываем только при повороте экрана, а не при каждом скролле
  window.addEventListener("orientationchange", fixHeight);
});

// Если в Strapi есть описание (например, поле description), подставьте его сюда
const description = "Профессиональные консультации и ИТ-решения";

useHead({
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
const config = useRuntimeConfig();
const STRAPI_SERVER = config.public.apiBase.replace(/\/api$/, "");

const { data: siteResponse } = await useApi<any>("/site-info?populate=*");

// Основной объект данных
const companyData = computed(() => siteResponse.value?.data || {});
// Извлекаем данные (учитывая структуру Strapi 4)
const companyName = computed(
  () =>
    siteResponse.value?.data?.attributes?.companyName ||
    siteResponse.value?.data?.companyName ||
    "Реноме Консалтинг",
);
useSeoMeta({
  title: "Реноме консалтинг",
  ogTitle: companyName,
  description: description,
  ogDescription: description,
  ogImage: "/og-image.png", // Картинка для соцсетей (положите в /public)
  ogType: "website",
  twitterCard: "summary_large_image",
});
// Ссылка на Telegram (с проверкой структуры из вашего лога)
const tgLink = computed(() => {
  // Ищем массив links прямо в companyData.value
  const links = companyData.value?.links;

  if (Array.isArray(links)) {
    const found = links.find((l: any) => l.url?.includes("t.me"));
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
provide("companyInfo", companyData);
provide("tgLink", tgLink);
provide("logoUrl", logoUrl);
provide("logoWithoutText", logoWithoutText);
</script>

<template>
  <div class="fixed-bg-layer"></div>

  <div class="relative z-10 flex flex-col min-h-screen">
    <AppHeader />
    <!-- Обертка для контента, которая заставляет футер быть внизу -->
    <main class="flex-grow">
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
</style>
