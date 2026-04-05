<script setup lang="ts">
import type { CompanySection, Response } from "~/models";

const { data: companyData } = await useApi<Response<CompanySection>>(
  "/company-section?populate=*",
);
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
          <p v-if="companyData" class="whitespace-pre-line">
            {{ companyData.data.description }}
          </p>
        </div>

        <!-- ПРАВАЯ ЧАСТЬ: КАРТОЧКИ С ЦИФРАМИ -->
        <div class="w-full lg:w-[45%]">
          <ul class="grid grid-cols-2 gap-6">
            <li
              v-for="stat in companyData?.data.characteristics"
              :key="stat.title"
              class="bg-gray-50 rounded-2xl flex flex-col justify-center border border-gray-100 shadow-2xl transition-all hover:shadow-md"
            >
              <div
                class="text-[46px] font-normal leading-none text-renome mb-2 text-center"
              >
                {{ stat.title }}
              </div>
              <div
                class="text-[14px] font-medium uppercase opacity-60 leading-tight text-black text-center"
              >
                {{ stat.text }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
