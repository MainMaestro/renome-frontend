<script setup lang="ts">
const { data: quickPriceResponse } = await useApi<any>("/quick-prices?populate=*");
const quickPrices = computed(() => quickPriceResponse.value?.data || []);

// 1. Готовим данные
const displayPrices = computed(() => {
  const items = quickPrices.value;
  const consult = items.find((p: any) => p.name.includes('КОНСУЛЬТАЦИЯ'));
  const auto = items.find((p: any) => p.name.includes('АВТОМАТИЗАЦИЯ'));
  const kpi = items.find((p: any) => p.name.includes('KPI'));
  return [consult, auto, kpi].filter(Boolean);
});

// 2. Функции для классов (чтобы TS не видел дефисы как минус)
const getCardBaseClass = (name: string) => {
  const isMain = name.includes('АВТОМАТИЗАЦИЯ');
  const base = "p-10 rounded-[32px] flex flex-col justify-between text-center transition-all duration-500 shadow-sm";
  const extra = isMain 
    ? "bg-renome-gradient text-white scale-105 z-20 border-white/10 border" 
    : "bg-white text-black border-gray-100 border";
  return `${base} ${extra}`;
};

const getBadgeClass = (name: string) => {
  const isMain = name.includes('АВТОМАТИЗАЦИЯ');
  const base = "inline-block px-6 py-2 rounded-full text-[14px] font-bold uppercase mb-8";
  const extra = isMain ? "bg-white text-[#0A4436]" : "bg-[#0A4436] text-white";
  return `${base} ${extra}`;
};

const getDescriptionClass = (name: string) => {
  const isMain = name.includes('АВТОМАТИЗАЦИЯ');
  return isMain ? "text-[15px] leading-[160%] mb-10 font-book text-white/90" : "text-[15px] leading-[160%] mb-10 font-book text-black/70";
};

const getPriceClass = (name: string) => {
  const isMain = name.includes('АВТОМАТИЗАЦИЯ');
  return isMain ? "font-bold text-[48px] text-white" : "font-bold text-[40px] text-[#0A4436]";
};
</script>

<template>
  <section id="price" class="py-24 relative z-10 font-sans">
    <div class="container mx-auto px-6 max-w-[1200px]">
      
      <h2 class="text-[#0A4436] text-[36px] font-medium uppercase mb-12 tracking-wide">ПРАЙС</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        <div 
          v-for="item in displayPrices" 
          :key="item.id"
          :class="getCardBaseClass(item.name)"
        >
          <div>
            <div :class="getBadgeClass(item.name)">
              {{ item.name }}
            </div>

            <p :class="getDescriptionClass(item.name)">
              {{ item.description }}
            </p>
          </div>

          <div :class="getPriceClass(item.name)">
            от {{ item.price }}
          </div>
        </div>

      </div>

      <div class="mt-20 flex justify-center">
        <button class="bg-[#0A4436] text-white px-10 py-4 rounded-full flex items-center gap-6 group hover:bg-emerald-900 transition-all shadow-lg">
          <span class="text-[12px] uppercase font-bold tracking-widest">Смотреть полный прайс</span>
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">→</div>
        </button>
      </div>

    </div>
  </section>
</template>
