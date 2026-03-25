<script setup lang="ts">
import type { SiteInfo } from "~/models";
const siteInfo = inject<SiteInfo>("companyInfo");

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false); // Состояние мобильного меню
const isContactModalOpen = ref(false);
const router = useRouter();
const route = useRoute();

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Закрытие меню при клике
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const menuItems = [
  { name: "О нас", link: "#about" },
  { name: "Услуги", link: "#services" },
  { name: "Цены", link: "#price" },
  { name: "Партнеры", link: "#partners" },
  { name: "Блог", link: "#blog" },
];

const handleMenuClick = async (link: string) => {
  closeMobileMenu(); // Закрываем шторку при переходе

  if (link.startsWith("#")) {
    const targetId = link.substring(1);
    if (route.path !== "/") {
      await router.push("/");
      setTimeout(() => scrollWithOffset(targetId), 400);
    } else {
      scrollWithOffset(targetId);
    }
  } else {
    await router.push(link);
  }
};

const scrollWithOffset = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Скорректировал под мобильную шапку
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  }
};
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-100 transition-all duration-500',
      isScrolled || isMobileMenuOpen ? 'bg-white shadow-lg' : 'bg-transparent',
    ]"
    class="h-20 md:h-24 flex items-center"
  >
    <div class="container mx-auto flex items-center justify-between">
      <!-- Лого -->
      <NuxtLink
        to="/"
        class="flex items-center z-110 px-4"
        @click="closeMobileMenu"
      >
        <img
          :src="useImageUrl(siteInfo?.logoWithText)"
          alt="Renome Logo"
          class="w-auto h-16 md:h-20 object-contain transition-all duration-500 origin-left"
          :style="{
            transform: isScrolled ? 'scale(0.8)' : 'scale(1)',
            filter: isScrolled || isMobileMenuOpen ? 'brightness(0)' : 'none',
          }"
        />
      </NuxtLink>

      <!-- Десктопное меню -->
      <nav class="hidden lg:flex items-center gap-10">
        <a
          v-for="item in menuItems"
          :key="item.name"
          href="#"
          @click.prevent="handleMenuClick(item.link)"
          class="font-medium text-renome transition-all duration-300 hover:text-emerald-500"
        >
          {{ item.name }}
        </a>
      </nav>

      <div class="flex items-center gap-4">
        <!-- Кнопка "Связаться" (скрыта на совсем маленьких экранах или уменьшена) -->
        <button
          @click="isContactModalOpen = true"
          class="hidden sm:block bg-renome-gradient px-6 md:px-8 py-2 md:py-2.5 rounded-full text-white text-sm md:text-[17px] font-medium hover:brightness-110 transition-all active:scale-95 cursor-pointer"
        >
          Связаться
        </button>

        <!-- Бургер-иконка -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden flex flex-col gap-1.5 z-110 p-2"
        >
          <span
            :class="[
              'w-6 h-0.5 bg-renome transition-all',
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : '',
            ]"
          ></span>
          <span
            :class="[
              'w-6 h-0.5 bg-renome transition-all',
              isMobileMenuOpen ? 'opacity-0' : '',
            ]"
          ></span>
          <span
            :class="[
              'w-6 h-0.5 bg-renome transition-all',
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : '',
            ]"
          ></span>
        </button>
      </div>
    </div>

    <!-- Мобильное меню (Шторка) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-full"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-white z-100 lg:hidden flex flex-col items-center justify-center gap-8"
        style="height: 100dvh; min-height: -webkit-fill-available"
      >
        <a
          v-for="item in menuItems"
          :key="item.name"
          href="#"
          @click.prevent="handleMenuClick(item.link)"
          class="text-2xl font-semibold text-renome hover:text-emerald-500"
        >
          {{ item.name }}
        </a>
        <button
          @click="
            isContactModalOpen = true;
            closeMobileMenu();
          "
          class="bg-renome-gradient px-10 py-4 rounded-full text-white text-xl font-bold"
        >
          Связаться
        </button>
      </div>
    </Transition>
  </header>

  <Teleport to="body">
    <ContactModal
      :isOpen="isContactModalOpen"
      @close="isContactModalOpen = false"
    />
  </Teleport>
</template>
