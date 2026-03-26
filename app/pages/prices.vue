<script setup lang="ts">
import type { ListResponse, PriceCategory } from "~/models";

const isContactModalOpen = ref(false);

const { data: response } = await useApi<ListResponse<PriceCategory>>(
  "/price-categories?populate=*",
);

const router = useRouter();
const route = useRoute();

const categories = computed(() => response.value?.data || []);

const activeCategoryId = computed(
  () => Number(route.query.category) || response.value?.data[0]?.id || 0,
);

const currentCategory = computed(() =>
  categories.value.find((c) => c.id === activeCategoryId.value || 0),
);
const navigateToCategory = (category: PriceCategory) => {
  router.push({ path: route.path, query: { category: category.id } });
};

const getSortedPrices = (category: PriceCategory) =>
  category.prices.toSorted((a, b) => a.price - b.price);

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
</script>
<template>
  <section class="relative pt-20 lg:pt-32 pb-20 lg:pb-40 overflow-hidden">
    <!-- Фоновое изображение: скрываем на мобилках или уменьшаем видимость -->
    <div
      class="absolute top-0 right-0 w-full lg:w-2/3 h-full pointer-events-none z-0"
    >
      <img
        src="/price.png"
        alt="Hero Background"
        class="w-full h-full object-contain object-top-right lg:object-top-right opacity-40 lg:opacity-90"
      />
    </div>

    <div class="container mx-auto px-4 lg:px-6 max-w-300 relative z-10">
      <div class="mb-10 lg:mb-16">
        <h1
          class="text-renome text-[32px] md:text-[40px] lg:text-[48px] font-bold uppercase mb-2"
        >
          Цены на услуги
        </h1>
        <p class="text-gray-500 font-medium mb-6">
          Консалтинг | Автоматизация | Интеграция
        </p>
        <div class="flex gap-4 lg:gap-6 items-start max-w-2xl mb-8 lg:mb-12">
          <div class="w-0.5 h-16 lg:h-20 bg-renome shrink-0 mt-1"></div>

          <p
            class="text-black/80 text-[16px] lg:text-[18px] leading-relaxed font-light"
          >
            Выберите подходящий формат работы — <br class="hidden md:block" />
            консультация, разработка системы <br class="hidden md:block" />
            или комплексной автоматизации процессов.
          </p>
        </div>
      </div>

      <!-- Табы: добавляем горизонтальный скролл на мобильных -->
      <div
        class="bg-white rounded-2xl shadow-sm p-2 flex flex-nowrap lg:flex-wrap gap-2 mb-8 lg:mb-12 border border-gray-100 overflow-x-auto no-scrollbar"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="navigateToCategory(cat)"
          class="px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-[13px] lg:text-[14px] transition-all cursor-pointer whitespace-nowrap"
          :class="[
            activeCategoryId === cat.id
              ? 'bg-renome-gradient text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-50',
          ]"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Контент выбранной категории -->
      <div
        v-if="currentCategory"
        class="bg-white rounded-3xl lg:rounded-[40px] p-6 lg:p-12 shadow-xl border border-white"
      >
        <h2
          class="text-renome text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-8 lg:mb-10 uppercase leading-tight"
        >
          {{ currentCategory.longName }}
        </h2>

        <div class="space-y-4">
          <div
            v-for="price in getSortedPrices(currentCategory)"
            :key="price.id"
            class="flex flex-col md:flex-row md:items-center justify-between p-1 bg-[#f1f5f9] rounded-2xl overflow-hidden group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100"
          >
            <div class="px-6 py-4 lg:pl-8 lg:py-4">
              <h3 class="font-bold text-black text-[16px]">
                {{ price.name }}
              </h3>
              <p
                class="text-gray-600 text-[13px] mt-1"
                v-if="price.description"
              >
                {{ price.description }}
              </p>
            </div>

            <button
              @click="isContactModalOpen = true"
              class="bg-renome-gradient text-white px-6 lg:px-10 py-4 lg:py-5 min-w-full md:min-w-45 text-center rounded-xl whitespace-nowrap hover:brightness-110 transition-all shadow-lg active:scale-95 mt-4 md:mt-0 cursor-pointer"
            >
              <div class="text-[16px] lg:text-[18px] font-bold">
                {{ price.isPriceFrom ? "от" : "" }}
                {{ formatPrice(price.price) }}
              </div>
              <div class="text-[10px] lg:text-xs opacity-90">
                {{ price.anotation }}
              </div>
            </button>
          </div>
        </div>

        <div class="mt-8 lg:mt-12 flex justify-center md:justify-start">
          <button
            @click="scrollToSection('feedBack')"
            class="w-full md:w-auto justify-center bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center gap-6 group hover:bg-renome-gradient/20 transition-all shadow-lg cursor-pointer active:scale-95 disabled:opacity-50 hover:brightness-110"
          >
            <span class="text-[12px] uppercase font-bold tracking-widest"
              >Заказать</span
            >
          </button>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ContactModal
        :isOpen="isContactModalOpen"
        @close="isContactModalOpen = false"
      />
    </Teleport>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
