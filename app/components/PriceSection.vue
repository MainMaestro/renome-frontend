<script setup lang="ts">
const { data: quickPriceResponse } = await useApi<any>(
  "/quick-prices?populate=*",
);
const quickPrices = computed(() => quickPriceResponse.value?.data || []);
</script>

<template>
  <section id="price" class="py-24 relative z-10 font-sans">
    <div class="container mx-auto px-6 max-w-300">
      <h2
        class="text-renome text-[36px] font-medium uppercase mb-12 tracking-wide"
      >
        ЦЕНА
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div
          v-for="item in quickPrices"
          class="group p-10 rounded-4xl flex flex-col justify-between text-center transition-all duration-500 shadow-sm even:bg-renome-gradient even:text-white even:scale-105 even:z-20 even:border-white/10 border odd:bg-white odd:text-black odd:border-gray-100"
          :key="item.id"
        >
          <div>
            <div
              class="inline-block px-6 py-2 rounded-full text-[14px] font-bold uppercase mb-8 group-even:bg-white group-even:text-renome bg-renome text-white"
            >
              {{ item.name }}
            </div>

            <p
              class="group-even:text-[15px] group-even:leading-[160%] group-even:mb-10 group-even:font-book group-even:text-white/90 text-[15px] leading-[160%] mb-10 font-book text-black/70"
            >
              {{ item.description }}
            </p>
          </div>

          <div
            class="font-bold group-even:text-[48px] group-even:text-white text-[40px] text-renome"
          >
            от {{ item.price }} &#8381
          </div>
        </div>
      </div>

      <div class="mt-20 flex justify-center">
        <NuxtLink
          to="/prices"
          class="bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center gap-6 group hover:bg-emerald-900 transition-all shadow-lg"
        >
          <span class="text-[12px] uppercase font-bold tracking-widest"
            >Смотреть полный прайс</span
          >
          <div
            class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"
          >
            →
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
