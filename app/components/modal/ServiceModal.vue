<template>
  <ModalDialog :isOpen="props.isOpen" @close="emit('close')">
    <template #header>
      <!-- Основное окно -->
    </template>
    <template #content>
      <!-- Контентная часть -->
      <div class="p-8 md:p-16">
        <!-- Заголовок и описание -->
        <div class="max-w-4xl mb-12">
          <h2
            class="text-renome text-[32px] md:text-[42px] font-bold uppercase leading-tight tracking-tight mb-6"
          >
            {{ service.name }}
          </h2>
          <p class="text-black text-lg font-light leading-relaxed">
            {{ service.annotation }}
          </p>
        </div>

        <!-- Центральная сетка (3 колонки: Блоки - Картинка - Блоки) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <!-- Левая колонка (первые два инфо-блока) -->
          <div class="lg:col-span-3 space-y-10">
            <div
              v-for="block in leftBlocks"
              :key="block.title"
              class="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl shadow-sm"
            >
              <h4 class="text-renome font-bold text-lg mb-4 uppercase">
                {{ block.title }}
              </h4>
              <RtfText :text="block.text" />
            </div>
          </div>

          <!-- Центральная колонка (Иллюстрация) -->
          <div class="lg:col-span-6 flex justify-center py-6">
            <img
              :src="useImageUrl(service.background)"
              class="w-full max-w-[500px] h-auto object-contain"
              alt="Service Illustration"
            />
          </div>

          <!-- Правая колонка (оставшиеся инфо-блоки) -->
          <div class="lg:col-span-3 space-y-10">
            <div
              v-for="block in rightBlocks"
              :key="block.title"
              class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h4 class="text-black font-bold text-lg mb-4">
                {{ block.title }}
              </h4>
              <RtfText :text="block.text" />
              <div
                class="lg:col-span-3 space-y-6 bg-renome-gradient p-8 mt-5 rounded-[40px] text-white self-start"
              >
                <div class="space-y-4">
                  <!-- Заголовок из innerTitle -->
                  <h4
                    class="text-[20px] font-bold leading-tight border-b border-white/20 pb-4 mb-4"
                  >
                    {{ service.innerTitle }}
                  </h4>

                  <!-- Текст из innerText -->
                  <div class="text-[13px] opacity-90 leading-snug prose-invert">
                    <RtfText :text="service.innerText" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Футер с кнопками (как на скрине) -->
        <div class="mt-16 flex flex-wrap gap-4 justify-end">
          <NuxtLink
            to="/prices"
            class="w-full md:w-auto bg-renome-gradient text-white px-8 md:px-10 py-4 rounded-full font-bold text-[13px] md:text-[14px] uppercase tracking-wider hover:brightness-110 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            Перейти к прайсу
          </NuxtLink>

          <button
            @click="isContactModalOpen = true"
            class="w-full md:w-auto bg-renome-gradient text-white px-8 md:px-10 py-4 rounded-full font-bold text-[13px] md:text-[14px] uppercase tracking-wider hover:brightness-110 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            Заказать услугу
          </button>
        </div>
      </div>
    </template>
  </ModalDialog>
  <Teleport to="body">
    <ContactModal
      :isOpen="isContactModalOpen"
      @close="isContactModalOpen = false"
    />
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  service: any;
}>();
import type { ListResponse, Service } from "~/models";
const { data: servicesResponse } = await useApi<ListResponse<Service>>(
  "/services?populate=*",
);

const emit = defineEmits(["close", "order"]);

// Распределяем блоки
const leftBlocks = computed(() => props.service?.infoBlocks?.slice(0, 2) || []);
const rightBlocks = computed(() => props.service?.infoBlocks?.slice(2) || []);

const isContactModalOpen = ref(false);
</script>
