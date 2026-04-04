<script setup lang="ts">
import type { Partner } from "~/models";

const isContactModalOpen = ref(false);

const props = defineProps<{
  partner: Partner;
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const data = computed(() => props.partner || {});

const tarifs = computed(() => {
  return data.value.tarifs || [];
});

console.log(props.partner?.description);
</script>

<template>
  <ModalDialog :isOpen="props.isOpen" @close="emit('close')">
    <template #header>
      <div class="flex items-center gap-5">
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-white">
          <StrapiImg :src="data.logo" class="h-15 w-auto object-contain" />
        </div>
        <h2
          class="text-3xl md:text-4xl font-black text-renome uppercase tracking-tight"
        >
          ВНЕДРЕНИЕ {{ data.name }}
        </h2>
      </div>
    </template>

    <template #content>
      <div class="absolute top-0 right-0 w-full h-full pointer-events-none">
        <img
          src="/partners.png"
          alt=""
          class="w-full h-full object-cover object-top-right opacity-60 rounded-4xl"
        />
      </div>

      <div class="relative h-full">
        <!-- Описание -->
        <div
          class="text-[#455A64] text-[15px] leading-relaxed mb-10 max-w-4xl font-medium"
        >
          <p>{{ data.anotation }}</p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-col justify-center border border-white/50 hover:shadow-lg transition-all"
        >
          <div v-if="data.description">
            <RtfText :text="data.description" />
          </div>
        </div>

        <div v-if="tarifs.length > 0">
          <h3 class="text-3xl font-black text-renome mb-8 tracking-tight">
            Тарифы:
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              v-for="tarif in tarifs"
              :key="tarif.id"
              class="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col border border-white/50 hover:shadow-lg transition-all justify-between"
            >
              <div>
                <!-- Заголовок тарифа -->
                <div class="font-bold text-[#263238] text-[17px] mb-1">
                  {{ tarif.name }}
                </div>

                <!-- ПРОВЕРКА: Показываем блок "Включает", только если описание не пустое -->
                <div v-if="tarif.description">
                  <div class="text-[14px] text-[#78909C] font-semibold mb-2">
                    Включает:
                  </div>

                  <!-- Список пунктов -->
                  <div
                    v-for="line in (tarif.description || '').split('\n')"
                    :key="line"
                    class="flex items-start gap-2 text-[13px] text-[#455A64] leading-snug mb-1"
                  >
                    <span
                      class="w-1.5 h-1.5 bg-[#009688] mt-1.5 shrink-0"
                    ></span>
                    <span>{{ line }}</span>
                  </div>
                </div>
              </div>

              <!-- Цена внизу -->
              <div class="text-xl text-renome mt-6">
                {{ formatPrice(tarif.price) }}
                / в месяц
              </div>
            </div>
          </div>
        </div>

        <div class="py-12 flex justify-end">
          <button
            @click="isContactModalOpen = true"
            class="bg-renome-gradient text-white px-12 py-3.5 rounded-full text-base font-bold cursor-pointer transition-all shadow-xl active:scale-95 hover:brightness-110"
          >
            Заказать
          </button>
        </div>
      </div>
    </template>
  </ModalDialog>
  <ContactModal
    :sourceName="'Диалог партнёра ' + partner.name"
    :isOpen="isContactModalOpen"
    @close="isContactModalOpen = false"
  />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

h2 {
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}
</style>
