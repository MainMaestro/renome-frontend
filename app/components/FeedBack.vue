<script setup lang="ts">
import { ref, reactive, inject } from "vue";
const logoUrl = inject<string>('logoUrl');
const tgLink = inject<string>('tgLink');
const company = inject<any>('companyInfo');

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
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  if (!phoneRegex.test(phone.value.replace(/\D/g, ""))) {
    triggerToast("Введите корректный номер телефона", true);
    return;
  }
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
    class="pt-12 md:pt-24 font-sans relative overflow-hidden"
  >
    <div class="container mx-auto px-4 md:px-6 max-w-300">
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
              class="w-full lg:w-auto bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center justify-center gap-8 hover:brightness-110 transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
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
          class="w-full lg:w-1/2 flex flex-col items-center justify-center lg:items-end text-center lg:text-right self-stretch py-4"
        >
          <!-- Лого -->
          <div class="mb-12 lg:mb-20">
            <NuxtLink to="/" class="group">
              <img
                :src="logoUrl"
                alt="Renome Logo"
                class="h-40 md:h-50 w-auto object-contain transition-transform group-hover:scale-105 "
              />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row justify-between items-end gap-8 py-10 border-t border-gray-100"
      >
        <!-- ЛЕВАЯ ЧАСТЬ: Контакты -->
        <div class="text-left space-y-1 pb-1">
          <p class="text-[16px] font-bold text-black">{{ company?.address }}</p>
          <p class="text-[16px] font-bold text-black">{{ company?.phone }}</p>
          <p class="text-[16px] font-bold text-black">
            Email: <span class="font-bold">{{ company?.email }}</span>
          </p>
        </div>

        <!-- ПРАВАЯ ЧАСТЬ: Иконки + Реквизиты -->
        <div class="flex flex-col items-end max-w-2xl text-right">
          <!-- Блок с иконками -->
          <div class="flex items-center gap-6 mb-6">
            <a
              :href="tgLink"
              target="_blank"
              class="text-renome hover:opacity-80 transition-opacity"
            >
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path
                  d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4 c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z"
                />
              </svg>
            </a>
            <div class="w-px h-6 bg-gray-300"></div>
            <a
              :href="`tel:${company.phone}`"
              class="text-renome hover:opacity-80 transition-opacity"
            >
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path
                  d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"
                />
              </svg>
            </a>
            <div class="w-px h-6 bg-gray-300"></div>
            <a
              :href="`mailto:${company?.email}`"
              class="text-renome hover:opacity-80 transition-opacity"
            >
              <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path
                  d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z"
                />
              </svg>
            </a>
          </div>

          <div class="space-y-0.5 text-[13px] text-black leading-snug">
            <p class="font-bold uppercase tracking-tight">
              {{ company?.companyName }}
            </p>
            <p>
              {{ company?.companyAddress }}
            </p>
            <p>
              ИНН: {{ company?.companyInn }} / КПП: {{ company?.companyKpp }}{{ tgLink }}
            </p>
            <p>ОГРН: {{ company?.companyOgrn }}</p>
            <p class="text-gray-600">
              {{ company?.companyOkved }}
            </p>
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
