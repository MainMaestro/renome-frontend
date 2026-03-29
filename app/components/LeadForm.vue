<script setup lang="ts">
import type { LeadRequest, SiteInfo } from "~/models";
const { triggerToast } = useAppToast();
const company = inject<SiteInfo>("companyInfo");

const loading = ref(false);

const toast = reactive({
  show: false,
  message: "",
  isError: false,
});

const form = ref({
  name: "",
  lastName: "",
  phone: "",
  email: "",
  comment: "",
  personalDataConfirmation: false,
});

const submitForm = async () => {
  if (!form.value.personalDataConfirmation) return;

  // Очистка телефона для валидации
  const cleanPhone = form.value.phone.replace(/\D/g, "");
  if (cleanPhone.length < 10) {
    triggerToast("Введите корректный номер телефона", true);
    return;
  }

  loading.value = true;

  // Формируем тело запроса согласно документации Битрикса
  const bitrixPayload = {
    fields: {
      TITLE: "Название формы",
      NAME: form.value.name,
      LAST_NAME: form.value.lastName,
      COMMENTS: form.value.comment,
      PHONE: [{ VALUE: form.value.phone, VALUE_TYPE: "WORK" }],
      EMAIL: [{ VALUE: form.value.email, VALUE_TYPE: "WORK" }],
      STATUS_ID: "NEW",
      SOURCE_ID: "WEB",
    },
  };

  try {
    await $fetch(
      "https://renome-consult.bitrix24.ru/rest/1/42dm7epne18yvu6o/crm.lead.add.json",
      {
        method: "POST",
        body: bitrixPayload,
      },
    );

    triggerToast("Заявка успешно отправлена!");

    // Сброс формы
    form.value = {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      comment: "",
      personalDataConfirmation: false,
    };
  } catch (e) {
    console.error(e);
    triggerToast("Ошибка при отправке в CRM", true);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <!-- Форма -->
  <form
    @submit.prevent="submitForm"
    class="space-y-3 md:space-y-4 max-w-125 mx-auto"
  >
    <input
      v-model="form.lastName"
      type="text"
      placeholder="Фамилия"
      required
      class="w-full p-3 md:p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all"
    />
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
    <input
      v-model="form.email"
      type="email"
      placeholder="Email"
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
        Нажимая кнопку «Отправить», я даю свое согласие на обработку моих
        персональных данных, в соответствии с Федеральным законом от 27.07.2006
        года №152-ФЗ «О персональных данных», на условиях и для целей,
        определенных в Согласии на обработку персональных данных *
      </label>
    </div>

    <!-- Кнопка Отправить -->
    <div class="flex flex-col gap-2 justify-center pt-2 md:pt-4">
      <button
        type="submit"
        :disabled="loading"
        class="w-full md:w-auto bg-renome-gradient text-white px-8 md:px-10 py-3 md:py-4 rounded-full flex items-center justify-center gap-4 md:gap-6 transition-all group shadow-lg active:scale-95 cursor-pointer hover:brightness-110"
      >
        <div
          class="text-[13px] md:text-[14px] uppercase font-bold tracking-widest"
        >
          {{ loading ? "Отправка..." : "Отправить" }}
        </div>
        <div
          class="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
        >
          <span class="text-lg md:text-xl">→</span>
        </div>
      </button>

      <a
        :href="'tel:' + company?.phone"
        target="_blank"
        ><div
          class="text-[13px] md:text-[14px] uppercase font-bold tracking-widest text-renome flex items-center gap-2 justify-center md:justify-start"
        >
          Или свяжитесь с нами по телефону
        </div>
      </a>
    </div>
  </form>
</template>
