<script setup lang="ts">
import type { SiteInfo } from "~/models";
const { triggerToast } = useAppToast();
const company = inject<SiteInfo>("companyInfo");

const props = defineProps<{
  sourceName: string;
}>();

const loading = ref(false);

const form = ref({
  name: "",
  lastName: "",
  phone: "",
  email: "",
  comment: "",
  personalDataConfirmation: false,
});
type BitrixContact = {
  VALUE: string;
  VALUE_TYPE: "WORK" | "HOME" | "MOBILE";
};
type BitrixLeadRequest = {
  fields: {
    TITLE: string;
    NAME: string;
    LAST_NAME: string;
    COMMENTS: string;
    PHONE: BitrixContact[];
    EMAIL: BitrixContact[];
    STATUS_ID: "NEW";
    SOURCE_ID: "WEB";
  };
};

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
  const bitrixPayload: BitrixLeadRequest = {
    fields: {
      TITLE: props.sourceName,
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
    <input hidden :value="props.sourceName" required readonly name="title" />
    <input
      v-model="form.lastName"
      name="last-name"
      type="text"
      placeholder="Фамилия"
      required
      autocomplete="family-name"
      class="w-full entry p-3 md:p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all"
    />
    <input
      v-model="form.name"
      name="first-name"
      type="text"
      placeholder="Имя"
      required
      autocomplete="given-name"
      class="w-full entry p-3 md:p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all"
    />

    <input
      v-model="form.phone"
      name="phone"
      type="tel"
      placeholder="Телефон"
      required
      autocomplete="tel"
      class="w-full entry p-3 md:p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all"
    />
    <input
      v-model="form.email"
      name="email"
      type="email"
      placeholder="Email"
      required
      autocomplete="email"
      class="w-full entry p-3 md:p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all"
    />

    <textarea
      v-model="form.comment"
      name="comment"
      placeholder="Комментарий"
      rows="3"
      class="w-full entry p-3 md:p-4 rounded-xl bg-[#f8fafc] border border-gray-100 outline-none focus:border-renome transition-all resize-none"
    ></textarea>

    <div class="flex items-start gap-3 py-2">
      <input
        v-model="form.personalDataConfirmation"
        type="checkbox"
        id="personal-data-confirmation"
        required
        class="mt-1 w-4 h-4 accent-renome shrink-0"
      />
      <label
        for="personal-data-confirmation"
        class="text-[12px] md:text-[14px] text-black leading-tight cursor-pointer"
      >
        Нажимая кнопку «Отправить», я даю свое согласие на обработку моих
        персональных данных, в соответствии с Федеральным законом от 27.07.2006
        года №152-ФЗ «О персональных данных», на условиях и для целей,
        определенных в Согласии на обработку персональных данных
      </label>
    </div>

    <!-- Кнопка Отправить -->
    <div class="flex flex-col gap-8 justify-center pt-2 md:pt-4">
      <button
        type="submit"
        :disabled="loading"
        class="w-full md:w-auto bg-renome-gradient text-white px-8 py-3 rounded-full flex items-center justify-center gap-4 md:gap-6 transition-all group shadow-lg active:scale-95 cursor-pointer hover:brightness-110"
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
      <div v-if="company" class="text-lg text-balance">
        <span> Или свяжитесь с нами по телефону </span>
        <a
          :href="'tel:' + company.phone"
          target="_blank"
          class="text-renome hover:underline active:text-renome/70"
        >
          {{ company.phone }}
        </a>
      </div>
    </div>
  </form>
</template>
<style scoped>
@import "tailwindcss";
.entry {
  @apply shadow;
}
</style>
