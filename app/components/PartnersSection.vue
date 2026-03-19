<script setup lang="ts">
import type { Response, Partner } from "~/models";

const { data: partnersResponse } = await useApi<Response<Partner[]>>(
  "/partners?populate=*",
);
</script>

<template>
  <section id="partners" class="py-24 font-sans">
    <div class="container mx-auto px-6 max-w-300">
      <!-- Заголовок и подзаголовок из макета -->
      <h2
        class="text-renome text-[36px] font-bold uppercase mb-4 tracking-tight"
      >
        ПАРТНЕРЫ
      </h2>
      <p
        class="text-[#4b5563] text-[16px] max-w-4xl mb-16 leading-relaxed font-light"
      >
        Мы работаем с ведущими платформами для автоматизации бизнеса и внедряем
        решения, которые максимально подходят под задачи компании.
      </p>

      <!-- Сетка 4 колонки -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
      >
        <div
          v-for="partner in partnersResponse?.data"
          :key="partner.id"
          class="bg-white rounded-4xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md"
        >
          <!-- Круглое лого с внутренним свечением -->
          <div
            class="h-32 mb-8 rounded-full border border-gray-50 flex items-center justify-center p-6 shadow-inner bg-white overflow-hidden"
          >
            <img
              :src="imageSrc(partner.logo)"
              :alt="partner.name"
              class="max-w-full max-h-full object-contain rounded-full"
            />
          </div>

          <!-- Название платформы -->
          <h3
            class="text-[18px] font-bold uppercase mb-4 tracking-widest text-slate-900 leading-tight"
          >
            {{ partner.name }}
          </h3>

          <!-- Описание (shortDescription) -->
          <p
            class="text-slate-500 text-[14px] leading-[1.6] mb-10 grow font-light"
          >
            {{ partner.shortDescription }}
          </p>

          <!-- Группа кнопок -->
          <div class="flex items-center gap-2 w-full mt-auto">
            <button
              class="grow bg-[#004236] text-white py-3.5 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-[#00352b] transition-all active:scale-95"
            >
              Узнать подробнее
            </button>
            <button
              class="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors group"
            >
              <span
                class="text-gray-400 group-hover:translate-x-0.5 transition-transform text-xl"
                >→</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
