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
              class="bg-white p-2"
            >
              <h4 class="text-black font-bold text-lg mb-4">
                {{ block.title }}
              </h4>
              <RtfText :text="block.text" />
            </div>
          </div>
        </div>

        <!-- Футер с кнопками (как на скрине) -->
        <div class="mt-16 flex flex-wrap gap-4 justify-end">
          <button
            class="flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full font-bold uppercase text-[12px] tracking-widest hover:bg-gray-800 transition-all"
          >
            Перейти к прайсу
            <span
              class="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
              >→</span
            >
          </button>

          <button
            @click="$emit('order')"
            class="flex items-center gap-4 bg-renome-gradient text-white px-8 py-4 rounded-full font-bold uppercase text-[12px] tracking-widest shadow-lg hover:brightness-110 transition-all"
          >
            Заказать услугу
            <span
              class="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
              >→</span
            >
          </button>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  service: any;
}>();

const emit = defineEmits(["close", "order"]);

// Распределяем блоки
const leftBlocks = computed(() => props.service?.infoBlocks?.slice(0, 2) || []);
const rightBlocks = computed(() => props.service?.infoBlocks?.slice(2) || []);
</script>
