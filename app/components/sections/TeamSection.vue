<script setup lang="ts">
import type { ListResponse, TeamMember } from "~/models";

const { data: teamResponse } = await useApi<ListResponse<TeamMember>>(
  "/team-members?populate=*",
);
const allMembers = computed(() => teamResponse.value?.data || []);
const displayMembers = computed(() => {
  const members = allMembers.value || [];

  return members.slice(0, 6); // Берем строго первые 6
});
</script>

<template>
  <section
    id="about"
    class="relative py-24 font-sans text-black overflow-hidden"
  >
    <div class="container mx-auto px-6 max-w-300 z-10 relative">
      <h3
        class="text-renome text-[36px] font-medium leading-[140%] uppercase mt-12 tracking-wide"
      >
        КОМАНДА
      </h3>

      <!-- СЕТКА КОМАНДЫ -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
          v-for="member in displayMembers"
          :key="member.id"
          class="flex flex-col group w-full h-full"
        >
          <!-- Квадратный контейнер для фото -->
          <div
            class="aspect-square bg-gray-100 rounded-t-xl overflow-hidden relative border-x border-t border-gray-100"
          >
            <StrapiImg
              :src="member.avatar"
              :alt="'Фотография члена команды: ' + member.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <!-- Инфо-блок (фиксируем высоту, чтобы все карточки были в ряд) -->
          <div
            class="p-5 bg-renome-gradient rounded-b-xl flex flex-col justify-center items-center min-h-25 h-fit sm:h-25"
          >
            <h4
              class="text-sm font-medium uppercase text-white leading-tight text-center tracking-tight"
            >
              {{ member.name }}
            </h4>
            <p
              class="text-xs text-white/70 mt-1 leading-tight text-center tracking-widest lowercase text-balance"
            >
              {{ member.position }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
