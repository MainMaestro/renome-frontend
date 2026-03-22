<script setup lang="ts">
import { ref, reactive } from "vue";

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
  } catch (e) {
    triggerToast("Ошибка сервера", true);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <section
    id="feedBack"
    class="py-12 md:py-24 font-sans relative overflow-hidden"
  >
    <div class="container mx-auto px-4 md:px-6 max-w-[1200px]">
      <!-- flex-col-reverse, чтобы форма на мобилках была ниже или выше в зависимости от логики. 
           Обычно форму оставляют внизу, а контакты/лого сверху, либо наоборот. 
           Здесь сделаем стандартный flex-col (заголовки -> форма -> контакты) -->
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        <!-- ЛЕВАЯ ЧАСТЬ: Форма -->
        <div class="w-full lg:w-1/2">
          <div class="mb-8 md:mb-10 text-renome text-center lg:text-left">
            <h2
              class="text-[20px] md:text-[24px] font-bold uppercase tracking-tight"
            >
              Хотите узнать больше?
            </h2>
            <h3
              class="text-[26px] md:text-[32px] font-bold uppercase tracking-tight leading-tight"
            >
              Напишите нам, мы поможем
            </h3>
          </div>

          <form
            @submit.prevent="submitForm"
            class="bg-white p-6 md:p-10 rounded-3xl md:rounded-4xl shadow-xl space-y-4 md:space-y-5 border border-gray-50"
          >
            <input
              v-model="name"
              type="text"
              placeholder="Имя"
              required
              class="w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-emerald-500 transition-all text-base"
            />

            <input
              v-model="phone"
              type="tel"
              placeholder="Телефон"
              required
              class="w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-emerald-500 transition-all text-base"
            />

            <textarea
              v-model="comment"
              placeholder="Комментарий"
              rows="4"
              class="w-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-emerald-500 transition-all resize-none text-base"
            ></textarea>

            <div class="flex items-start gap-4 py-2">
              <input
                v-model="personalDataConfirmation"
                type="checkbox"
                id="agree_footer"
                required
                class="mt-1 w-5 h-5 shrink-0 accent-renome"
              />
              <label
                for="agree_footer"
                class="text-[10px] md:text-[11px] text-gray-400 leading-tight cursor-pointer"
              >
                Нажимая кнопку «Отправить», я даю свое согласие на обработку
                моих персональных данных, в соответствии с Федеральным законом
                от 27.07.2006 года №152-ФЗ «О персональных данных», на условиях
                и для целей, определенных в Согласии на обработку персональных
                данных *
              </label>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full lg:w-auto bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center justify-center gap-8 hover:brightness-110 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              <span class="text-[13px] uppercase font-bold tracking-widest">
                {{ loading ? "Отправка..." : "Отправить" }}
              </span>
              <span class="text-xl">→</span>
            </button>
          </form>
        </div>

        <!-- ПРАВАЯ ЧАСТЬ: Контакты -->
        <div
          class="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right justify-between self-stretch py-4"
        >
          <!-- Лого -->
          <div class="mb-12 lg:mb-20">
            <NuxtLink to="/" class="group">
              <img
                src="/logo.png"
                alt="Renome Logo"
                class="h-20 md:h-30 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </NuxtLink>
          </div>

          <!-- Инфо -->
          <div class="space-y-8 text-gray-900 w-full">
            <div class="flex flex-col items-center lg:items-end gap-2">
              <p class="font-bold opacity-60 uppercase text-xs md:text-sm">
                г. Санкт-Петербург
              </p>
              <a
                href="tel:+78123339301"
                class="text-[24px] md:text-[28px] font-bold hover:text-emerald-600 transition-colors"
              >
                +7 (812) 333-93-01
              </a>
              <a
                href="mailto:info@renome-consult.com"
                class="underline font-bold text-base md:text-lg hover:text-emerald-600 transition-colors"
              >
                info@renome-consult.com
              </a>
            </div>

            <!-- Соцсети -->
            <div class="flex justify-center lg:justify-end gap-4">
              <a
                href="https://t.me"
                target="_blank"
                class="w-12 h-12 rounded-2xl flex items-center justify-center text-renome bg-white shadow-md hover:-translate-y-1 transition-all"
              >
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path
                    d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4 c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z M17.1,7.4l-7.8,7.1L9,17.8L7.4,13l9.2-5.8 C17,6.9,17.4,7.1,17.1,7.4z"
                  />
                </svg>
              </a>
              <a
                href="mailto:info@renome-consult.com"
                class="w-12 h-12 rounded-2xl flex items-center justify-center text-renome bg-white shadow-md hover:-translate-y-1 transition-all"
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
              <a
                href="tel:+78123339301"
                class="w-12 h-12 rounded-2xl flex items-center justify-center text-renome bg-white shadow-md hover:-translate-y-1 transition-all"
              >
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path
                    d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Тост-уведомление -->
    <Transition name="slide-up">
      <div
        v-if="toast.show"
        :class="[
          'fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-2xl text-white font-bold',
          toast.isError ? 'bg-red-500' : 'bg-emerald-600',
        ]"
      >
        {{ toast.message }}
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
