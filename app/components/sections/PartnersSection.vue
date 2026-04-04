<script setup lang="ts">
import type { ListResponse, Partner } from "~/models";

const route = useRoute();
const router = useRouter();

const { data: partnersResponse } = await useApi<ListResponse<Partner>>(
  "/partners?populate=*",
);

// Состояние для модалки
const activePartner = ref<Partner | null>(null);

// 1. Следим за изменением ?partner=ID в URL
watch(
  () => route.query.partner,
  (newId) => {
    if (newId && partnersResponse.value?.data) {
      // Ищем партнера в загруженном списке по ID
      const found = partnersResponse.value.data.find(p => p.id === Number(newId));
      if (found) {
        activePartner.value = found;
      }
    } else {
      activePartner.value = null;
    }
  },
  { immediate: true } // Проверка при первой загрузке страницы
);

// 2. Функции для открытия и закрытия через URL
const openPartner = (partner: Partner) => {
  router.push({ query: { ...route.query, partner: partner.id } });
};

const closePartner = () => {
  // Убираем параметр из URL, сохраняя остальные (если есть)
  const { partner, ...restQuery } = route.query;
  router.push({ query: restQuery });
};
</script>


<template>
  <section id="partners" class="py-24 font-sans">
    <div class="container mx-auto px-6 max-w-300">
      <!-- Заголовок и подзаголовок из макета -->
      <h2
        class="text-renome text-[36px] font-bold uppercase mb-4 tracking-tight"
      >
        ПАРТНЕРЫ
      </h2>
      <p
        class="text-[#4b5563] text-[16px] max-w-4xl mb-16 leading-relaxed font-light"
      >
        Мы работаем с ведущими платформами для автоматизации бизнеса и внедряем
        решения, которые максимально подходят под задачи компании.
      </p>

      <!-- Сетка 4 колонки -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
      >
        <div
          v-for="partner in partnersResponse?.data"
          :key="partner.id"
          class="bg-white rounded-4xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md"
        >
          <!-- Круглое лого с внутренним свечением -->
          <div
            class="h-32 mb-8 rounded-full border border-gray-50 flex items-center justify-center p-6 shadow-inner bg-white overflow-hidden"
          >
            <StrapiImg
              :src="partner.logo"
              :alt="'Логотип ' + partner.name"
              class="max-w-full max-h-full object-contain rounded-full"
            />
          </div>

          <!-- Название платформы -->
          <h3
            class="text-[18px] font-bold uppercase mb-4 tracking-widest text-slate-900 leading-tight"
          >
            {{ partner.name }}
          </h3>

          <!-- Описание (shortDescription) -->
          <p
            class="text-slate-500 text-[14px] leading-[1.6] mb-10 grow font-light"
          >
            {{ partner.shortDescription }}
          </p>

          <!-- Группа кнопок -->
          <div class="flex items-center gap-2 w-full mt-auto">
            <button
               @click="openPartner(partner)"
              class="w-full bg-renome-gradient text-white py-3.5 rounded-full text-[12px] font-bold uppercase hover:bg-emerald-900 hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              Узнать подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
    <PartnerModal
      v-if="activePartner"
      :partner="activePartner"
      :is-open="!!activePartner"
      @close="closePartner"
    />
  </section>
</template>
