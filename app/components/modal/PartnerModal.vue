<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue";

const config = useRuntimeConfig();
const isContactModalOpen = ref(false);

const props = defineProps<{
  partner: any;
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

// 1. Конфиг для картинок
const strapiHost = config.public.apiBase.replace(/\/api$/, "");

// 2. Доступ к данным
const data = computed(() => props.partner?.attributes || props.partner || {});

// 3. Хелпер URL
const getUrl = (path: string | undefined) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${strapiHost}${path}`;
};

// 4. Тарифы
const tarifs = computed(() => {
  const t = data.value.tarifs?.data || data.value.tarifs || [];
  return Array.isArray(t) ? t : [];
});

watch(
  () => props.isOpen,
  (newValue) => {
    if (process.client) {
      if (newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  },
  { immediate: true },
);

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.isOpen) emit("close");
};

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc);
  document.body.style.overflow = "auto";
});

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  emit("close");
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-100 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black/30 backdrop-blur-sm"
        @click="emit('close')"
      ></div>

      <div
        class="relative bg-[#EDF2F6] w-full max-w-262.5 max-h-[95vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
      >
        <div class="absolute top-0 right-0 w-full h-full pointer-events-none">
          <img
            src="/partners.png"
            alt=""
            class="w-full h-full object-cover object-top-right opacity-60"
          />
        </div>

        <button
          @click="emit('close')"
          class="absolute top-6 right-6 z-50 text-gray-400 hover:text-black transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 6L6 18M6 6l12 12" ) />
            >
          </svg>
        </button>

        <div class="relative z-10 p-8 md:p-12 overflow-y-auto no-scrollbar">
          <div class="flex items-center gap-5 mb-8">
            <div class="bg-white p-3 rounded-2xl shadow-sm border border-white">
              <img
                :src="
                  getUrl(data.logo?.url || data.logo?.data?.attributes?.url)
                "
                class="h-15 w-auto object-contain"
              />
            </div>
            <h2
              class="text-3xl md:text-4xl font-black text-renome uppercase tracking-tight"
            >
              ВНЕДРЕНИЕ {{ data.name }}
            </h2>
          </div>

          <!-- Описание -->
          <div
            class="text-[#455A64] text-[15px] leading-relaxed mb-10 max-w-4xl font-medium"
          >
            <p>{{ data.description }}</p>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-col justify-center border border-white/50 hover:shadow-lg transition-all"
          >
            <div>
              <h3
                class="text-renome font-black text-sm uppercase mb-5 tracking-wider"
              >
                ВОЗМОЖНОСТИ {{ data.name }}
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="item in data.abilities?.split('\n') || []"
                  :key="item"
                  class="flex gap-3 text-[14px] text-[#263238] font-medium leading-snug"
                >
                  <span class="w-2 h-2 bg-[#009688] mt-1.5 shrink-0"></span>
                  {{ item }}
                </li>
              </ul>
            </div>
            <div v-if="data.abilities2">
              <h3
                class="text-renome font-black text-sm uppercase mb-5 tracking-wider"
              >
                ПРЕИМУЩЕСТВА {{ data.name }}
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="item in data.abilities2?.split('\n') || []"
                  :key="item"
                  class="flex gap-3 text-[14px] text-[#263238] font-medium leading-snug"
                >
                  <span class="w-2 h-2 bg-[#009688] mt-1.5 shrink-0"></span>
                  {{ item }}
                </li>
              </ul>
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
                    {{ tarif.attributes?.name || tarif.name }}
                  </div>

                  <!-- ПРОВЕРКА: Показываем блок "Включает", только если описание не пустое -->
                  <div
                    v-if="tarif.attributes?.description || tarif.description"
                  >
                    <div class="text-[14px] text-[#78909C] font-semibold mb-2">
                      Включает:
                    </div>

                    <!-- Список пунктов -->
                    <div
                      v-for="line in (
                        tarif.attributes?.description ||
                        tarif.description ||
                        ''
                      ).split('\n')"
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
                  {{
                    (
                      tarif.attributes?.price ||
                      tarif.price ||
                      0
                    ).toLocaleString()
                  }}
                  Р/ в месяц
                </div>
              </div>
            </div>
          </div>

          <div class="mt-12 flex justify-end">
            <button
              @click="isContactModalOpen = true"
              class="bg-renome-gradient text-white px-12 py-3.5 rounded-full text-base font-bold cursor-pointer transition-all shadow-xl active:scale-95"
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <ContactModal
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
