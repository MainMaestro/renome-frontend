<script setup lang="ts">
import type { Integration, ListResponse } from "~/models";

const { data: partnersResponse } = await useApi<ListResponse<Integration>>(
  "/integrations?populate=*",
);

const partners = computed(() => {
  return partnersResponse.value?.data || [];
});

// Разделение на две строки
const row1 = computed(() =>
  partners.value.slice(0, Math.ceil(partners.value.length / 2)),
);
const row2 = computed(() =>
  partners.value.slice(Math.ceil(partners.value.length / 2)),
);
</script>
<template>
  <section
    class="py-12 md:py-20 bg-transparent relative z-10 font-sans overflow-hidden"
  >
    <div class="container mx-auto px-6 max-w-300 mb-8 md:mb-10">
      <h2
        class="text-renome-title text-[24px] md:text-[32px] font-bold uppercase tracking-tight text-center md:text-left"
      >
        РАБОТАЕМ С
      </h2>
    </div>

    <div class="flex flex-col gap-4 md:gap-6 w-full">
      <!-- Первая строка -->
      <div class="marquee-container">
        <div class="marquee-content">
          <div
            v-for="group in [1, 2]"
            :key="'row1-group-' + group"
            class="flex gap-4 px-2"
          >
            <div
              v-for="partner in row1"
              :key="'row1-' + group + '-' + partner.id"
              class="bg-white h-14 md:h-17.5 w-32 md:w-40 p-4 rounded-xl md:rounded-[14px] flex items-center justify-center border border-gray-100 shadow-sm shrink-0"
            >
              <StrapiImg
                v-if="partner.logo"
                :src="partner.logo"
                :alt="'Логотип ' + partner.name"
                format="thumbnail"
                class="max-w-full max-h-full object-contain pointer-events-none block"
              />
              <span
                v-else
                class="text-[10px] md:text-[12px] font-bold uppercase text-gray-400 whitespace-nowrap"
                >{{ partner.name }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Вторая строка (реверс) -->
      <div class="marquee-container">
        <div class="marquee-content reverse">
          <div
            v-for="group in [1, 2]"
            :key="'row2-group-' + group"
            class="flex gap-4 px-2"
          >
            <div
              v-for="partner in row2"
              :key="'row2-' + group + '-' + partner.id"
              class="bg-white h-14 md:h-17.5 w-32 md:w-40 p-4 rounded-xl md:rounded-[14px] flex items-center justify-center border border-gray-100 shadow-sm shrink-0"
            >
              <StrapiImg
                v-if="partner.logo"
                :src="partner.logo"
                :alt="'Логотип ' + partner.name"
                format="thumbnail"
                class="max-w-full max-h-full object-contain pointer-events-none block"
              />
              <span
                v-else
                class="text-[10px] md:text-[12px] font-bold uppercase text-gray-400 whitespace-nowrap"
                >{{ partner.name }}</span
              >
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
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.marquee-content {
  @apply flex flex-nowrap min-w-full shrink-0 items-center;
  animation: scroll-left 40s linear infinite;
  will-change: transform;
}

.marquee-content.reverse {
  animation: scroll-right 40s linear infinite;
}

@keyframes scroll-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .marquee-content {
    animation-duration: 25s;
  }
}
</style>
