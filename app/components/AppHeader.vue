<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const isScrolled = ref(false);
const router = useRouter();
const route = useRoute();

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Ссылки: если это якорь на главной, пишем просто #id
const menuItems = [
  { name: "О нас", link: "#about" },
  { name: "Услуги", link: "#services" },
  { name: "Цены", link: "#price" },
  { name: "Партнеры", link: "#partners" },
  { name: "Блог", link: "#blog" },
];

const handleMenuClick = async (link: string) => {
  // Если это якорь (начинается с #)
  if (link.startsWith('#')) {
    const targetId = link.substring(1);

    // 1. Если мы НЕ на главной
    if (route.path !== '/') {
      // Переходим на главную
      await router.push('/');
      
      // Ждем, пока Nuxt завершит переход и отрисует DOM
      // Используем небольшую задержку, чтобы страница успела "собраться"
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          scrollWithOffset(targetId);
        } else {
          // Если элемент еще не появился (бывает на тяжелых страницах), 
          // пробуем еще раз через мгновение
          setTimeout(() => scrollWithOffset(targetId), 200);
        }
      }, 400); 
    } else {
      // 2. Если уже на главной — просто скроллим
      scrollWithOffset(targetId);
    }
  } else {
    // 3. Если это обычная ссылка на страницу
    await router.push(link);
  }
};

const scrollWithOffset = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 100; // Высота шапки
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Очищаем URL от якоря, чтобы при F5 не прыгало
    window.history.replaceState(null, '', window.location.pathname);
  }
};
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-100 transition-all duration-500',
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent',
    ]"
  >
    <div class="container mx-auto px-6 flex items-center justify-between">
      <!-- Лого -->
      <NuxtLink to="/" class="flex items-center group">
        <img
          src="/logo.png"
          alt="Renome Logo"
          :class="[
            'w-auto object-contain transition-all duration-500',
            isScrolled ? 'h-10 brightness-0' : 'h-14',
          ]"
        />
      </NuxtLink>

      <!-- Меню -->
      <nav class="hidden lg:flex items-center gap-10">
        <a
          v-for="item in menuItems"
          :key="item.name"
          href="#"
          @click.prevent="handleMenuClick(item.link)"
          :class=" ['font-medium text-renome transition-all duration-300 cursor-pointer hover:text-emerald-500'
          ]"
        >
          {{ item.name }}
        </a>
      </nav>

      <!-- Кнопка -->
      <button
        @click="scrollWithOffset('feedBack')"
        class="bg-renome-gradient border border-white/20 px-8 py-2.5 rounded-full text-white text-[17px] font-medium hover:brightness-110 transition-all shadow-md active:scale-95 cursor-pointer"
      >
        Связаться
      </button>
    </div>
  </header>
</template>
