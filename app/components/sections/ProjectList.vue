<script setup lang="ts">
import type { Project, ListResponse, SiteInfo } from "~/models";

const siteInfo = inject<SiteInfo>("companyInfo");

const { data: projectsResponse } = await useApi<ListResponse<Project>>(
  "/projects?populate=*",
);
</script>

<template>
  <section id="projects" class="py-24 font-sans">
    <div class="container mx-auto px-6 max-w-300">
      <h2
        class="text-renome text-[36px] font-bold uppercase mb-16 tracking-tight"
      >
        РЕАЛИЗОВАННЫЕ ПРОЕКТЫ
      </h2>

      <div class="flex flex-col gap-10">
        <div
          v-for="project in projectsResponse?.data"
          :key="project.id"
          class="bg-white rounded-4xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col lg:flex-row gap-12 items-center"
        >
          <!-- Левая часть: Текст -->
          <div class="flex-1 space-y-6">
            <div class="flex items-start gap-5">
              <!-- Иконка-спираль -->
              <div
                class="w-12 h-12 shrink-0 mt-1 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
              >
                <StrapiImg
                  v-if="siteInfo"
                  :src="siteInfo.logo"
                  class="w-6 h-6 object-contain"
                />
              </div>
              <h3
                class="text-[22px] font-bold text-renome uppercase leading-tight tracking-tight"
              >
                {{ project.name }}
              </h3>
            </div>

            <p class="text-black text-[15px] leading-[1.7] font-light">
              {{ project.description }}
            </p>
          </div>

          <!-- Правая часть: Скриншот (с рамкой и тенью) -->
          <div class="flex-1 w-full">
            <div
              class="rounded-xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.1)] border border-gray-100 bg-white"
            >
              <StrapiImg
                v-if="project.screenshot"
                :src="project.screenshot"
                class="w-full h-auto object-cover"
                alt="Project Screenshot"
              />
              <div
                v-else
                class="aspect-video bg-gray-50 flex items-center justify-center text-gray-300"
              >
                Скриншот интерфейса
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
