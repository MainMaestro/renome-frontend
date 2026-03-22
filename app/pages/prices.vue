<script setup lang="ts">
type Price = {
  id: number;
  name: string;
  description: string;
  anotation: string;
  price: number;
  isPriceFrom: boolean;
};
type Category = {
  id: number;
  name: string;
  longName: string;
  prices: Price[];
};

const { data: response } = await useApi<{
  data: Category[];
}>("/price-categories?populate=*");

const router = useRouter();
const route = useRoute();

const categories = computed(() => response.value?.data || []);

const activeCategoryId = computed(
  () => Number(route.query.category) || response.value?.data[0]?.id || 0,
);

const currentCategory = computed(() =>
  categories.value.find((c) => c.id === activeCategoryId.value || 0),
);
const navigateToCategory = (category: Category) => {
  router.push({ path: route.path, query: { category: category.id } });
};

const getSortedPrices = (category: Category) =>
  category.prices.toSorted((a, b) => a.price - b.price);

const formatPrice = (price: number) => {
  if (price === 0) return "Бесплатно";
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

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
  <section class="relative pt-32 pb-40 overflow-hidden">
    <div
      class="absolute top-0 right-0 w-full lg:w-2/3 h-full pointer-events-none"
    >
      <img
        src="/price.png"
        alt="Hero Background"
        class="w-full h-full object-contain object-top-right opacity-90"
      />
    </div>
    <div class="container mx-auto px-6 max-w-300 relative z-10">
      <div class="mb-16">
        <h1 class="text-renome text-[48px] font-bold uppercase mb-2">
          Цены на услуги
        </h1>
        <p class="text-gray-500 font-medium mb-6">
          Консалтинг | Автоматизация | Интеграция
        </p>
        <div class="flex gap-6 items-start max-w-2xl mb-12">
          <div class="w-0.5 h-20 bg-renome shrink-0 mt-1"></div>

          <p class="text-black/80 text-[18px] leading-relaxed font-light">
            Выберите подходящий формат работы — <br />
            консультация, разработка системы <br />
            или комплексной автоматизации процессов.
          </p>
        </div>
      </div>

      <!-- Табы -->
      <div
        class="bg-white rounded-2xl shadow-sm p-2 flex flex-wrap gap-2 mb-12 border border-gray-100"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="navigateToCategory(cat)"
          class="px-8 py-4 rounded-xl font-bold text-[14px] transition-all cursor-pointer"
          :class="[
            activeCategoryId === cat.id
              ? 'bg-renome-gradient text-white shadow-lg'
              : 'text-gray-400 hover:bg-gray-50',
          ]"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Контент выбранной категории -->
      <div
        v-if="currentCategory"
        class="bg-white rounded-[40px] p-12 shadow-xl border border-white"
      >
        <h2 class="text-renome text-[42px] font-bold mb-10 uppercase">
          {{ currentCategory.longName }}
        </h2>

        <div class="space-y-4">
          <div
            v-for="price in getSortedPrices(currentCategory)"
            :key="price.id"
            class="flex items-center justify-between p-1 bg-[#f1f5f9] rounded-2xl overflow-hidden group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100"
          >
            <div class="pl-8 py-4">
              <h4 class="font-bold text-black text-[16px]">
                {{ price.name }}
              </h4>
              <p
                class="text-gray-400 text-[13px] mt-1"
                v-if="price.description"
              >
                {{ price.description }}
              </p>
            </div>

            <div
              class="bg-renome-gradient text-white px-10 py-5 min-w-45 text-center rounded-xl whitespace-nowrap"
            >
              <div class="text-[18px] font-bold">
                {{ price.isPriceFrom ? "от" : "" }}
                {{ formatPrice(price.price) }}
              </div>
              <div class="text-xs">
                {{ price.anotation }}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12">
          <button
            @click="scrollToSection('feedBack')"
            class="bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center gap-6 group hover:bg-renome-gradient/20 transition-all shadow-lg cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <span class="text-[12px] uppercase font-bold tracking-widest"
              >Заказать</span
            >
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
