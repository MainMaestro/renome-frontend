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
  <section id="feedBack" class="py-24 font-sans relative overflow-hidden">
    <div class="container mx-auto px-6 max-w-300">
      <div class="flex flex-col lg:flex-row gap-20 items-start">
        <div class="w-full lg:w-1/2">
          <div class="mb-10 text-renome">
            <h2 class="text-[24px] font-bold uppercase tracking-tight">
              Хотите узнать больше?
            </h2>
            <h3
              class="text-[32px] font-bold uppercase tracking-tight leading-tight"
            >
              Напишите нам, мы поможем
            </h3>
          </div>

          <form
            @submit.prevent="submitForm"
            class="bg-white p-10 rounded-4xl shadow-xl space-y-5 border border-white"
          >
            <input
              v-model="name"
              type="text"
              placeholder="Имя"
              required
              class="w-full p-5 rounded-2xl bg-[#f8fafc] border border-gray-100 outline-none text-black placeholder:text-gray-400"
            />

            <input
              v-model="phone"
              type="tel"
              placeholder="Телефон"
              required
              class="w-full p-5 rounded-2xl bg-[#f8fafc] border border-gray-100 outline-none text-black placeholder:text-gray-400"
            />

            <textarea
              v-model="comment"
              placeholder="Комментарий"
              rows="4"
              class="w-full p-5 rounded-2xl bg-[#f8fafc] border border-gray-100 outline-none text-black placeholder:text-gray-400 resize-none"
            ></textarea>

            <div class="flex items-start gap-4 py-2">
              <input
                v-model="personalDataConfirmation"
                type="checkbox"
                id="agree_footer"
                required
                class="mt-1 w-5 h-5 accent-renome"
              />
              <label
                for="agree_footer"
                class="text-[11px] text-gray-400 leading-tight cursor-pointer"
              >
                Нажимая кнопку «Отправить», я даю свое согласие на обработку
                моих персональных данных...
              </label>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center gap-8 group hover:bg-[#00352b] transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <span class="text-[13px] uppercase font-bold tracking-widest">
                {{ loading ? "Отправка..." : "Отправить" }}
              </span>
              
            </button>
          </form>
        </div>

        <div
          class="w-full lg:w-1/2 flex flex-col items-end text-right justify-between self-stretch py-4"
        >
          <div class="mb-20">
            <!-- Лого -->
            <div class="text-2xl font-bold tracking-tighter text-white">
              <a href="/" class="flex items-center gap-2 group">
                <img
                  src="/logo.png"
                  alt="Renome Logo"
                  class="h-30 w-auto object-contain transition-transform group-hover:scale-105"
                />
                <!-- Если название текстом рядом с картинкой -->
                <span
                  class="text-xl font-bold tracking-tight text-gray-900"
                ></span>
              </a>
            </div>
          </div>

          <div class="space-y-8 text-gray-900">
            <div class="flex flex-col items-end gap-1">
              <p class="font-bold">г. Санкт-Петербург</p>
              <p class="text-[22px] font-bold">+7(812)333-93-01</p>
              <p class="underline font-bold">info@renome-consult.com</p>
            </div>

            <div
              class="text-[10px] text-gray-400 space-y-1 leading-relaxed max-w-100"
            >
              <p>ООО "РЕНОМЕ КОНСАЛТИНГ"</p>
              <p>
                Юр. адрес: 188664, Россия, обл Ленинградская, р-н
                Всеволожский...
              </p>
              <p>ИНН / КПП 4706092018 / 470601001</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Всплывающее уведомление (Toast) -->
    <Transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-8 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10"
        :class="
          toast.isError ? 'bg-red-600 text-white' : 'bg-renome text-white'
        "
      >
        <div
          class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[12px]"
        >
          {{ toast.isError ? "!" : "✓" }}
        </div>
        <span class="text-[14px] font-bold uppercase tracking-wider">
          {{ toast.message }}
        </span>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, 40px);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
