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
  closeMobileMenu();

  if (link.startsWith("#")) {
    const targetId = link.substring(1);

    // Если мы уже на главной, просто скроллим
    if (route.path === "/") {
      scrollWithOffset(targetId);
    } else {
      // Если на другой странице, переходим на главную с хешем
      // Vue Router сам подставит /#price в URL
      await router.push({ path: "/", hash: link });

      // Небольшая задержка, чтобы страница успела отрендериться
      setTimeout(() => scrollWithOffset(targetId), 100);
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
    <div
      class="mx-auto flex grow px-5 md:px-10 items-center justify-between gap-10"
    >
      <!-- Лого -->
      <NuxtLink
        to="/"
        class="flex items-center z-110 px-4"
        @click="closeMobileMenu"
      >
        <StrapiImg
          v-if="siteInfo"
          :src="siteInfo.logoWithText"
          alt="Логотип Реноме консалтинг"
          class="w-auto h-16 md:h-20 object-contain transition-all duration-500 origin-left"
          :style="{
            transform: isScrolled ? 'scale(0.8)' : 'scale(1)',
            filter: isScrolled || isMobileMenuOpen ? 'brightness(0)' : 'none',
          }"
        />
      </NuxtLink>

      <!-- Десктопное меню -->
      <nav class="hidden lg:flex items-center gap-10">
        <ul class="hidden lg:flex items-center gap-10">
          <li
            v-for="item in menuItems"
            class="font-medium text-renome transition-all duration-300 hover:text-emerald-500"
          >
            <NuxtLink
              :key="item.name"
              to="#"
              @click.prevent="handleMenuClick(item.link)"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-4">
        <!-- Кнопка "Связаться" (скрыта на совсем маленьких экранах или уменьшена) -->
        <button
          @click="isContactModalOpen = true"
          class="hidden sm:block btn-renome btn-sm"
        >
          Связаться
        </button>

        <!-- Бургер-иконка -->
        <button
          aria-label="Меню"
          title="Меню сайта"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden z-20 flex flex-col gap-1.5 p-3 cursor-pointer"
        >
          <span hidden>Меню</span>
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
      <ul
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-white z-10 lg:hidden flex flex-col items-center justify-center gap-8"
        style="height: 100dvh; min-height: -webkit-fill-available"
      >
        <li
          class="text-2xl font-semibold text-renome hover:text-emerald-500"
          v-for="item in menuItems"
          :key="item.name"
        >
          <NuxtLink href="#" @click.prevent="handleMenuClick(item.link)">
            {{ item.name }}
          </NuxtLink>
        </li>
        <button
          @click="
            isContactModalOpen = true;
            closeMobileMenu();
          "
          class="btn-renome btn-xl"
        >
          Связаться
        </button>
      </ul>
    </Transition>
  </header>

  <Teleport to="body">
    <ContactModal
      sourceName="Панель навигации"
      :isOpen="isContactModalOpen"
      @close="isContactModalOpen = false"
    />
  </Teleport>
</template>
