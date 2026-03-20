<script setup lang="ts">
const { data: response } = await useApi<any>("/price-categories?populate=*");

const categories = computed(() => response.value?.data || []);

// Активная категория
const activeCategoryId = ref<number | null>(null);

watchEffect(() => {
  if (categories.value.length > 0 && activeCategoryId.value === null) {
    activeCategoryId.value = categories.value[0].id;
  }
});

// Текущая выбранная категория
const currentCategory = computed(() =>
  categories.value.find((c: any) => c.id === activeCategoryId.value),
);

// Функция для подготовки и сортировки цен
const getSortedPrices = (category: any) => {
  const rawPrices = category.attributes?.prices?.data || category.prices || [];

  return [...rawPrices].sort((a, b) => {
    const priceA = Number(a.attributes?.price || a.price || 0);
    const priceB = Number(b.attributes?.price || b.price || 0);
    return priceA - priceB;
  });
};

// Хелпер для форматирования цены (красивые отступы в тысячах)
const formatPrice = (val: any) => {
  const num = Number(val);
  if (num === 0) return "Бесплатно";
  return new Intl.NumberFormat("ru-RU").format(num) + " ₽";
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
        <p class="text-gray-500 font-medium">
          Консалтинг | Автоматизация | Интеграция
        </p>
        <div class="flex gap-6 items-start max-w-2xl mb-12">
          <div class="w-0.5 h-14 bg-renome shrink-0 mt-1"></div>

          <p class="text-[#4b5563] text-[18px] leading-relaxed font-light">
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
          @click="activeCategoryId = cat.id"
          class="px-8 py-4 rounded-xl font-bold text-[14px] transition-all"
          :class="[
            activeCategoryId === cat.id
              ? 'bg-renome-gradient text-white shadow-lg'
              : 'text-gray-400 hover:bg-gray-50',
          ]"
        >
          {{ cat.attributes?.name || cat.name }}
        </button>
      </div>

      <!-- Контент выбранной категории -->
      <div
        v-if="currentCategory"
        class="bg-white rounded-[40px] p-12 shadow-xl border border-white"
      >
        <h2 class="text-renome text-[42px] font-bold mb-10 uppercase">
          {{ currentCategory.attributes?.name || currentCategory.name }}
        </h2>

        <div class="space-y-4">
          <div
            v-for="price in getSortedPrices(currentCategory)"
            :key="price.id"
            class="flex items-center justify-between p-1 bg-[#f1f5f9] rounded-2xl overflow-hidden group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100"
          >
            <div class="pl-8 py-4">
              <h4 class="font-bold text-black text-[16px]">
                {{ price.attributes?.name || price.name }}
              </h4>
              <p class="text-gray-400 text-[13px] mt-1">
                {{
                  price.attributes?.description ||
                  price.description ||
                  "Подробности при консультации"
                }}
              </p>
            </div>

            <div
              class="bg-renome-gradient text-white px-10 py-5 font-bold text-[18px] min-w-45 text-center rounded-xl whitespace-nowrap"
            >
              {{ formatPrice(price.attributes?.price || price.price) }}
            </div>
          </div>
        </div>

        <div class="mt-12">
          <button
            class="bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center gap-6 group hover:bg-renome-gradient/20 transition-all shadow-lg"
          >
            <span class="text-[12px] uppercase font-bold tracking-widest"
              >Заказать</span
            >
            <div
              class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"
            >
              →
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
