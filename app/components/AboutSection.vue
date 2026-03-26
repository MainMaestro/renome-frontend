<script setup lang="ts">
import type {
  CompanySection,
  ListResponse,
  TeamMember,
  Response,
} from "~/models";

const { data: companyData } = await useApi<Response<CompanySection>>(
  "/company-section?populate=*",
);
const { data: teamResponse } = await useApi<ListResponse<TeamMember>>(
  "/team-members?populate=*",
);
const allMembers = computed(() => teamResponse.value?.data || []);
const displayMembers = computed(() => {
  const members = allMembers.value || [];

  return members.slice(0, 6); // Берем строго первые 6
});

const stats = [
  { value: "5 +", label: "лет опыта" },
  { value: "30 +", label: "сервисов в работе" },
  { value: "50 +", label: "реализованных проектов" },
  { value: "IT", label: "включены в реестр" },
];
</script>

<template>
  <section
    id="about"
    class="relative py-24 font-sans text-black overflow-hidden"
  >
    <!-- ФОНОВАЯ КАРТИНКА ВСЕГО БЛОКА -->

    <div class="container mx-auto px-6 max-w-300 z-10 relative">
      <!-- ЗАГОЛОВОК СЕКЦИИ -->
      <h2
        class="text-renome text-[36px] font-medium leading-[140%] uppercase mb-10 tracking-wide"
      >
        {{ companyData?.data.title }}
      </h2>

      <!-- ОПИСАНИЕ -->
      <div class="flex flex-col lg:flex-row gap-16 items-start">
        <!-- ЛЕВАЯ ЧАСТЬ: ТЕКСТ -->
        <div
          class="w-full lg:w-[55%] text-[18px] leading-[140%] font-book text-black"
        >
          <div v-if="companyData" class="whitespace-pre-line">
            {{ companyData.data.description }}
          </div>
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="member in displayMembers"
          :key="member.id"
          class="flex flex-col group w-full"
        >
          <!-- Квадратный контейнер для фото -->
          <div
            class="aspect-square bg-gray-100 rounded-t-xl overflow-hidden relative border-x border-t border-gray-100"
          >
            <img
              :src="useImageUrl(member.avatar)"
              :alt="member.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <!-- Инфо-блок (фиксируем высоту, чтобы все карточки были в ряд) -->
          <div
            class="p-5 bg-renome-gradient rounded-b-xl flex flex-col justify-center items-center min-h-25 h-25"
          >
            <h4
              class="text-[16px] font-extrabold uppercase text-white leading-tight text-center tracking-tight"
            >
              {{ member.name }}
            </h4>
            <p
              class="text-[11px] text-white/70 mt-2 uppercase leading-tight text-center font-medium tracking-widest"
            >
              {{ member.position }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
