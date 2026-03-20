<script setup>
const menuItems = [
  { name: "О нас", link: "#about" },
  { name: "Услуги", link: "#services" },
  { name: "Прайс", link: "#price" },
  { name: "Партнеры", link: "#partners" },
  { name: "Блог", link: "#blog" },
];
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 py-8 bg-transparent">
    <div class="container mx-auto px-6 flex items-center justify-between">
      <!-- Лого -->
      <div class="text-2xl font-bold tracking-tighter text-white">
        <a href="/" class="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Renome Logo"
            class="h-15 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <!-- Если название текстом рядом с картинкой -->
          <span class="text-xl font-bold tracking-tight text-gray-900"
            ></span
          >
        </a>
      </div>

      <!-- Меню -->
      <nav class="hidden lg:flex items-center gap-12">
        <a
          v-for="item in menuItems"
          :key="item.name"
          :href="item.link"
          class="text-[18px] font-medium leading-[140%] text-renome-title hover:text-emerald-400 transition-all duration-300"
        >
          {{ item.name }}
        </a>
      </nav>

      <button
        class="bg-renome-gradient backdrop-blur-sm border border-white/20 px-8 py-3 rounded-full text-white text-[18px] hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-500"
      >
        Связаться
      </button>
    </div>
  </header>
</template>
