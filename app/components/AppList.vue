<script setup lang="ts">
import type { Response, App } from "~/models";

const { data: appsResponse } = await useApi<Response<App[]>>(
  "/applications?populate=*",
);
</script>

<template>
  <section class="py-24">
    <div class="container mx-auto px-6">
      <h2
        class="text-renome text-[32px] font-bold uppercase mb-16 tracking-tight"
      >
        НАШИ ПРИЛОЖЕНИЯ
      </h2>

      <div class="flex flex-col gap-10">
        <!-- Безопасно перебираем data -->
        <div
          v-for="app in appsResponse?.data"
          :key="app.id"
          class="bg-white rounded-[40px] p-10 md:p-14 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-16 items-center"
        >
          <div class="flex-[1.3] space-y-8">
            <div class="flex items-start gap-6">
              <div class="w-14 h-14 shrink-0 mt-1">
                <!-- Иконка-заглушка, пока не подтянешь лого из Strapi -->
                <div
                  class="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-2xl"
                >
                  🌀
                </div>
              </div>
              <h3
                class="text-[42px] font-bold text-black leading-[1.1] tracking-tighter"
              >
                {{ app.name }}
              </h3>
            </div>

            <p
              class="text-[#4b5563] text-[17px] leading-[1.7] font-light max-w-2xl whitespace-pre-line"
            >
              {{ app.description }}
            </p>

            <div class="flex items-center gap-4 pt-4">
              <button
                class="bg-[#004236] text-white px-10 py-4 rounded-full font-bold text-[14px] uppercase tracking-wider hover:bg-[#00352b] transition-all shadow-lg active:scale-95"
              >
                Оставить заявку
              </button>
              <button
                class="w-14 h-14 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all group"
              >
                <span
                  class="text-2xl text-gray-400 group-hover:translate-x-1 transition-transform"
                  >→</span
                >
              </button>
            </div>
          </div>

          <!-- Скриншот справа на градиенте -->
          <div class="flex-1 w-full">
            <img
              v-if="imageSrc(app.screenshot)"
              :src="imageSrc(app.screenshot)"
              class="w-full h-full object-contain rounded-xl shadow-2xl scale-110 translate-y-3"
              :alt="'Снимок экрана ' + app.name"
            />
            <div v-else class="text-white/20 italic">Нет скриншота</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
