<script setup lang="ts">
import type { LeadRequest } from "~/models";
const company = inject<any>("companyInfo");
const tgLink = inject<string>("tgLink");

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const form = ref<LeadRequest>({
  name: "",
  phone: "",
  comment: "",
  personalDataConfirmation: false,
});
const loading = ref(false);

const toast = reactive({
  show: false,
  message: "",
  isError: false,
});

// Блокировка скролла при открытии
watch(
  () => props.isOpen,
  (val) => {
    if (process.client) {
      document.body.style.overflow = val ? "hidden" : "auto";
    }
  },
);

const triggerToast = (msg: string, error = false) => {
  toast.message = msg;
  toast.isError = error;
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 4000);
};

const submitForm = async () => {
  if (!form.value.personalDataConfirmation) return;
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  if (!phoneRegex.test(form.value.phone.replace(/\D/g, ""))) {
    triggerToast("Введите корректный номер телефона", true);
    return;
  }
  loading.value = true;
  try {
    await useApi("/leads", {
      method: "POST",
      body: {
        data: form.value,
      },
    });

    form.value.name = "";
    form.value.phone = "";
    form.value.comment = "";
    form.value.personalDataConfirmation = false;

    triggerToast("Заявка успешно отправлена!");
    setTimeout(() => emit("close"), 1500);
  } catch (e) {
    triggerToast("Ошибка сервера", true);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="emit('close')"
      ></div>

      <!-- Modal Content -->
      <div
        class="relative w-full max-w-175 max-h-[95dvh] flex flex-col rounded-3xl md:rounded-4xl shadow-2xl no-scrollbar border border-white/20 bg-white"
      >
        <!-- Кнопка закрытия -->

        <button
          @click="emit('close')"
          class="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 text-gray-400 hover:text-black transition-all duration-300 hover:rotate-90 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-xl cursor-pointer"
        >
          <span class="text-3xl md:text-3xl leading-none font-light">✕</span>
        </button>
        <div class="fixed inset-0 z-0 pointer-events-none">
          <img
            src="/bg.png"
            class="w-full h-full object-cover object-center"
            alt="Background"
          />
        </div>

        <!-- Контентная часть -->
        <div
          class="relative z-10 p-6 md:p-12 flex flex-col min-h-full overflow-y-auto"
        >
          <!-- Верх контента (Logo + Headers) -->
          <div class="flex-1">
            <div class="flex flex-col items-center text-center mb-6 md:mb-10">
              <img
                src="/logo.png"
                alt="Renome"
                class="h-16 md:h-24 mb-4 md:mb-6 object-contain"
              />
              <h2
                class="text-[18px] md:text-[22px] font-bold uppercase text-renome tracking-tight"
              >
                Хотите узнать больше?
              </h2>
              <h3
                class="text-[22px] md:text-[28px] font-bold uppercase text-renome leading-tight md:leading-none"
              >
                Напишите нам, мы поможем
              </h3>
            </div>

            <!-- Форма -->
            <form
              @submit.prevent="submitForm"
              class="space-y-3 md:space-y-4 max-w-125 mx-auto"
            >
              <input
                v-model="form.name"
                type="text"
                placeholder="Имя"
                required
                class="w-full p-3 md:p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all"
              />

              <input
                v-model="form.phone"
                type="tel"
                placeholder="Телефон"
                required
                class="w-full p-3 md:p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all"
              />

              <textarea
                v-model="form.comment"
                placeholder="Комментарий"
                rows="3"
                class="w-full p-3 md:p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all resize-none"
              ></textarea>

              <div class="flex items-start gap-3 py-2">
                <input
                  v-model="form.personalDataConfirmation"
                  type="checkbox"
                  id="modal_agree"
                  required
                  class="mt-1 w-4 h-4 accent-renome shrink-0"
                />
                <label
                  for="modal_agree"
                  class="text-[12px] md:text-[14px] text-black leading-tight cursor-pointer"
                >
                  Нажимая кнопку «Отправить», я даю свое согласие на обработку
                  моих персональных данных, в соответствии с Федеральным законом
                  от 27.07.2006 года №152-ФЗ «О персональных данных», на
                  условиях и для целей, определенных в Согласии на обработку
                  персональных данных *
                </label>
              </div>

              <!-- Кнопка Отправить -->
              <div class="flex justify-center pt-2 md:pt-4">
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full md:w-auto bg-renome-gradient text-white px-8 md:px-10 py-3 md:py-4 rounded-full flex items-center justify-center md:justify-between gap-4 md:gap-6 transition-all group shadow-lg active:scale-95 cursor-pointer hover:brightness-110"
                >
                  <span
                    class="text-[13px] md:text-[14px] uppercase font-bold tracking-widest"
                  >
                    {{ loading ? "Отправка..." : "Отправить" }}
                  </span>
                  <div
                    class="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
                  >
                    <span class="text-lg md:text-xl">→</span>
                  </div>
                </button>
              </div>
            </form>
          </div>

          <!-- Футер (Контакты + SVG) -->
          <div
            class="mt-8 md:mt-12 flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-900 border-t border-gray-100 pt-6 md:pt-8 gap-6 w-full"
          >
            <div class="text-center md:text-left space-y-1">
              <p class="font-bold uppercase tracking-tighter">
                {{ company?.address }}
              </p>
              <p class="text-[14px] md:text-[16px] font-bold">
                {{ company?.phone }}
              </p>
              <p class="font-bold">{{ company?.email }}</p>
            </div>

            <div class="flex gap-4 mb-6">
              <!-- Telegram -->
              <a
                :href="tgLink"
                target="_blank"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-renome bg-white transition-all shadow-md group hover:scale-110"
              >
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path
                    d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4 c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z M17.1,7.4l-7.8,7.1L9,17.8L7.4,13l9.2-5.8 C17,6.9,17.4,7.1,17.1,7.4z"
                  />
                </svg>
              </a>
              <!-- Email (SVG Почты) -->
              <a
                :href="`mailto:${company.email}`"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-renome bg-white transition-all shadow-md group hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org"
                >
                  <path
                    d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z"
                  />
                </svg>
              </a>
              <!-- Phone -->
              <a
                :href="`tel:${company.phone}`"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-renome bg-white transition-all shadow-md group hover:scale-110"
              >
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path
                    d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="slide-up">
    <div
      v-if="toast.show"
      :class="[
        'fixed bottom-10 left-1/2 -translate-x-1/2 z-1000 px-6 py-3 rounded-2xl shadow-2xl text-white font-bold whitespace-nowrap',
        toast.isError ? 'bg-red-500' : 'bg-emerald-600',
      ]"
    >
      {{ toast.message }}
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
