<script setup lang="ts">
const { data: partnersResponse } = await useApi<any>("/integrations?populate=*");

// Безопасное получение данных
const partners = computed(() => {
  const data = partnersResponse.value?.data || [];
  return Array.isArray(data) ? data : [];
});

// Разделение на две строки
const row1 = computed(() => partners.value.slice(0, Math.ceil(partners.value.length / 2)));
const row2 = computed(() => partners.value.slice(Math.ceil(partners.value.length / 2)));
</script>

<template>
  <section class="py-20 bg-transparent relative z-10 font-sans overflow-hidden">
    <div class="container mx-auto px-6 max-w-300 mb-10">
      <h2 class="text-renome-title text-[32px] font-bold uppercase tracking-tight">
        РАБОТАЕМ С
      </h2>
    </div>

    <div class="flex flex-col gap-6 w-full">
      <!-- Первая строка -->
      <div class="marquee-container">
        <div class="marquee-content">
          <!-- Группа 1 и Группа 2 для бесшовности -->
          <div v-for="group in [1, 2]" :key="'row1-group-' + group" class="flex gap-4 px-2">
            <div 
              v-for="partner in row1" 
              :key="'row1-' + group + '-' + partner.id" 
              class="bg-white h-17.5 min-w-40 p-4 rounded-[14px] flex items-center justify-center border border-gray-100 shadow-sm"
            >
              <img 
                v-if="partner.logo" 
                :src="`http://79.174.80.177:1337${partner.logo.url}`" 
                class="w-full h-full object-contain" 
              />
              <span v-else class="text-[12px] font-bold uppercase text-gray-400">{{ partner.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Вторая строка (реверс) -->
      <div class="marquee-container">
        <div class="marquee-content reverse">
          <div v-for="group in [1, 2]" :key="'row2-group-' + group" class="flex gap-4 px-2">
            <div 
              v-for="partner in row2" 
              :key="'row2-' + group + '-' + partner.id" 
              class="bg-white h-17.5 min-w-40 p-4 rounded-[14px] flex items-center justify-center border border-gray-100 shadow-sm"
            >
              <img 
                v-if="partner.logo" 
                :src="`http://79.174.80.177:1337${partner.logo.url}`" 
                class="w-full h-full object-contain" 
              />
              <span v-else class="text-[12px] font-bold uppercase text-gray-400">{{ partner.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee-container {
  @apply flex overflow-hidden w-full;
}

.marquee-content {
  @apply flex flex-nowrap min-w-full shrink-0 items-center;
  animation: scroll-left 40s linear infinite;
}

.marquee-content.reverse {
  animation: scroll-right 40s linear infinite;
}

@keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes scroll-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
</style>
