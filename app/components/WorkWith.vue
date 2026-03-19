<script setup lang="ts">
const { data: partnersResponse } = await useApi<any>(
  "/integrations?populate=*",
);
const partners = computed(() => partnersResponse.value?.data || []);
</script>

<template>
  <section id="partners" class="py-20 bg-transparent relative z-10 font-sans">
    <div class="container mx-auto px-6 max-w-300">
      <h2
        class="text-renome-title text-[32px] font-bold uppercase mb-10 tracking-tight"
      >
        РАБОТАЕМ С
      </h2>

      <div class="flex flex-wrap justify-start gap-3">
        <!-- Плашка логотипа -->
        <div
          v-for="partner in partners"
          :key="partner.id"
          class="bg-white h-17.5 min-w-35 p-4 rounded-[14px] flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        >
          <img
            v-if="partner.logo"
            :src="`http://79.174.80.177:1337${partner.logo.url}`"
            :alt="partner.name"
            class="w-full h-full object-contain"
          />

          <span v-else class="text-[12px] font-bold uppercase text-renome/40">
            {{ partner.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
