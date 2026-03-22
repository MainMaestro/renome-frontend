<script setup lang="ts">
import { ref, reactive, watch } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const name = ref("");
const phone = ref("");
const comment = ref("");
const personalDataConfirmation = ref(false);
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
  if (!personalDataConfirmation.value) return;
  loading.value = true;
  try {
    // Используем ваш API endpoint
    await useApi("/leads", {
      method: "POST",
      body: {
        data: {
          name: name.value,
          phone: phone.value,
          comment: comment.value,
          personalDataConfirmation: true,
        },
      },
    });

    name.value = "";
    phone.value = "";
    comment.value = "";
    personalDataConfirmation.value = false;

    triggerToast("Заявка успешно отправлена!");
    setTimeout(() => emit("close"), 1500); // Закрываем после успеха
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
      class="fixed inset-0 z-100 flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="emit('close')"
      ></div>

      <!-- Modal Content -->
      <div
        class="relative w-full max-w-175 max-h-[95vh] overflow-y-auto rounded-4xl shadow-2xl no-scrollbar border border-white/20"
      >
        <!-- Кнопка закрытия (крестик) -->
        <button
          @click="emit('close')"
          class="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors text-2xl z-50"
        >
          ✕
        </button>

        <!-- Фоновая картинка (опционально, если partners.png подходит под Hero) -->
        <div class="absolute inset-0 z-0 pointer-events-none">
          <img src="/bg.png" class="w-full h-full object-cover" />
        </div>

        <div class="relative z-10 p-8 md:p-12">
          <!-- Logo & Header -->
          <div class="flex flex-col items-center text-center mb-10">
            <img
              src="/logo.png"
              alt="Renome"
              class="h-24 mb-6 object-contain"
            />
            <h2
              class="text-[22px] font-bold uppercase text-[#004d40] tracking-tight"
            >
              Хотите узнать больше?
            </h2>
            <h3
              class="text-[28px] font-bold uppercase text-[#004d40] leading-none"
            >
              Напишите нам, мы поможем
            </h3>
          </div>

          <!-- Form -->
          <form
            @submit.prevent="submitForm"
            class="space-y-4 max-w-[500px] mx-auto"
          >
            <input
              v-model="name"
              type="text"
              placeholder="Имя"
              required
              class="w-full p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all"
            />

            <input
              v-model="phone"
              type="tel"
              placeholder="Телефон"
              required
              class="w-full p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all"
            />

            <textarea
              v-model="comment"
              placeholder="Комментарий"
              rows="3"
              class="w-full p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all resize-none"
            ></textarea>

            <!-- Согласие -->
            <div class="flex items-start gap-3 py-2">
              <input
                v-model="personalDataConfirmation"
                type="checkbox"
                id="modal_agree"
                required
                class="mt-1 w-4 h-4 accent-[#004d40]"
              />
              <label
                for="modal_agree"
                class="text-[15px] text-black leading-tight"
              >
                Нажимая кнопку «Отправить», я даю свое согласие на обработку
                моих персональных данных, в соответствии с Федеральным законом
                от 27.07.2006 года №152-ФЗ «О персональных данных», на условиях
                и для целей, определенных в Согласии на обработку персональных
                данных *
              </label>
            </div>

            <!-- Кнопка Отправить (как в дизайне) -->
            <div class="flex justify-center pt-4">
              <button
                type="submit"
                :disabled="loading"
                class="bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center gap-6   transition-all group disabled:opacity-50 shadow-lg active:scale-95 cursor-pointer"
              >
                <span class="text-[14px] uppercase font-bold tracking-widest">
                  {{ loading ? "Отправка..." : "Отправить" }}
                </span>
                <div
                  class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
                >
                  <span class="text-xl">→</span>
                </div>
              </button>
            </div>
          </form>

          <div
            class="mt-12 flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-900 border-t border-gray-100 pt-8 gap-4"
          >
            <div class="text-center md:text-left">
              <p class="font-bold uppercase tracking-tighter">
                г. Санкт-Петербург
              </p>
              <p class="text-[16px] font-bold">+7(812)333-93-01</p>
              <p class="font-bold">Email: info@renome - consult.com</p>
            </div>

            <div class="flex gap-4">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              >
                <a
                  href="https://t.me"
                  target="_blank"
                  class="w-10 h-10 rounded-xl flex items-center justify-center text-renome   transition-all shadow-md group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="w-6 h-6 fill-current transition-transform group-hover:scale-110"
                    xmlns="http://www.w3.org"
                  >
                    <path
                      d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4 c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z M17.1,7.4l-7.8,7.1L9,17.8L7.4,13l9.2-5.8 C17,6.9,17.4,7.1,17.1,7.4z"
                    />
                  </svg>
                </a>
              </div>
              <a
                href="tel:+78123339301"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-renome  transition-all shadow-md group"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="w-6 h-6 fill-current transition-transform group-hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z"
                  />
                </svg>
              </a>
              <a
                href="mailto:info@renome-consult.com"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-renome   transition-all shadow-md group"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="w-6 h-6 stroke-current transition-transform group-hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    d="M20.9717 8C20.9717 8 16.9505 13 12.0005 13C7.05051 13 3.0293 8 3.0293 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Тост внутри модалки -->
      <Transition name="toast">
        <div
          v-if="toast.show"
          class="absolute bottom-10 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-full text-white shadow-xl text-sm font-bold uppercase tracking-wider"
          :class="toast.isError ? 'bg-red-500' : 'bg-green-600'"
        >
          {{ toast.message }}
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
