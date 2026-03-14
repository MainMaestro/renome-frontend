<script setup lang="ts">
const { data: companyData } = await useApi<any>("/company-section?populate=*");
const { data: teamResponse } = await useApi<any>("/team-members?populate=*");

// Берем массив данных
const allMembers = computed(() => teamResponse.value?.data || []);

// 1. Ищем Ирину по вхождению имени (так точно найдем, даже если ID другой)
const irina = computed(() =>
  allMembers.value.find((m: any) => m.name?.includes("ИРИНА")),
);

// 2. Остальные — это все, КРОМЕ Ирины (сравним по именам)
const others = computed(() =>
  allMembers.value.filter((m: any) => m.name !== irina.value?.name),
);

const stats = [
  { value: "5 +", label: "лет опыта" },
  { value: "30 +", label: "сервисов в работе" },
  { value: "50 +", label: "реализованных проектов" },
  { value: "IT", label: "включены в реестр" },
];
</script>

<template>
  <section class="relative py-24 font-sans text-black overflow-hidden">
    <!-- ФОНОВАЯ КАРТИНКА ВСЕГО БЛОКА -->

    <div class="container mx-auto px-6 max-w-[1200px] z-10 relative">
      <!-- ЗАГОЛОВОК СЕКЦИИ -->
      <h2
        class="text-renome text-[36px] font-medium leading-[140%] uppercase mb-10 tracking-wide"
      >
        О КОМПАНИИ
      </h2>

      <!-- ОПИСАНИЕ -->
      <div class="flex flex-col lg:flex-row gap-16 items-start">
        <!-- ЛЕВАЯ ЧАСТЬ: ТЕКСТ -->
        <div
          class="w-full lg:w-[55%] text-[18px] leading-[140%] font-book text-black"
        >
          <div v-if="companyData?.data" class="whitespace-pre-line">
            {{ companyData.data.description }}
          </div>

          <p
            v-if="companyData?.data?.task"
            class="mt-6 font-medium text-renome"
          >
            {{ companyData.data.task }}
          </p>
        </div>

        <!-- ПРАВАЯ ЧАСТЬ: КАРТОЧКИ С ЦИФРАМИ -->
        <div class="w-full lg:w-[45%] grid grid-cols-2 gap-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-gray-50 rounded-2xl flex flex-col justify-center border border-gray-100 shadow-2xl transition-all hover:shadow-md"
          >
            <span
              class="text-[46px] font-normal leading-none text-renome mb-2 text-center"
            >
              {{ stat.value }}
            </span>
            <span
              class="text-[14px] font-medium uppercase opacity-60 leading-tight text-black text-center"
            >
              {{ stat.label }}
            </span>
          </div>
        </div>
      </div>

      <h3
        class="text-renome text-[36px] font-medium leading-[140%] uppercase mt-12 tracking-wide"
      >
        КОМАНДА
      </h3>

      <!-- СЕТКА КОМАНДЫ -->
      <div
        class="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 auto-rows-fr"
      >
        <!-- ИРИНА-->
        <div
          v-if="irina"
          class="lg:col-start-1 lg:row-start-1 lg:row-span-2 flex flex-col group h-full"
        >
          <div
            class="flex-grow bg-gray-100 rounded-t-2xl overflow-hidden shadow-sm"
          >
            <img
              v-if="irina.avatar"
              :src="`http://79.174.80.177:1337${irina.avatar.url}`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-6 bg-renome-gradient rounded-b-2xl">
            <h3
              class="text-[20px] font-bold uppercase text-white leading-tight text-center"
            >
              {{ irina.name }}
            </h3>
            <p class="text-[12px] text-white/70 mt-1 uppercase text-center">
              {{ irina.position }}
            </p>
          </div>
        </div>

        <!-- 2x2 справа -->
        <div
          v-for="member in others"
          :key="member.id"
          class="flex flex-col group h-full"
        >
          <div class="aspect-video bg-gray-50 rounded-t-xl overflow-hidden">
            <img
              v-if="member.avatar"
              :src="`http://79.174.80.177:1337${member.avatar.url}`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div
            class="p-4 bg-renome-gradient rounded-b-xl flex-grow flex flex-col justify-center"
          >
            <h4
              class="text-[16px] font-bold uppercase text-white leading-tight text-center"
            >
              {{ member.name }}
            </h4>
            <p
              class="text-[11px] text-white/60 mt-1 uppercase leading-tight text-center"
            >
              {{ member.position }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
