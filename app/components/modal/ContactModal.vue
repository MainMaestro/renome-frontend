<script setup lang="ts">
import type { SiteInfo } from "~/models";
const company = inject<SiteInfo>("companyInfo");
const tgLink = inject<string>("tgLink");
const whatsappLink = inject<string>("whatsappLink");

const props = defineProps<{
  isOpen: boolean;
  sourceName: string;
}>();

const emit = defineEmits(["close"]);

// Блокировка скролла при открытии
watch(
  () => props.isOpen,
  (val) => {
    if (process.client) {
      document.body.style.overflow = val ? "hidden" : "auto";
    }
  },
);
</script>
<template>
  <ModalDialog :isOpen="props.isOpen" @close="emit('close')">
    <template #content>
      <!-- Контентная часть -->
      <div
        class="relative z-10 p-6 md:p-12 flex flex-col min-h-full overflow-y-auto"
      >
        <!-- Верх контента (Logo + Headers) -->
        <div class="flex-1">
          <div class="flex flex-col items-center text-center mb-6 md:mb-10">
            <img
              src="/logo.png"
              alt="Логотип Реноме консалтинг"
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
          <LeadForm :sourceName="sourceName" />
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

          <!-- Блок с иконками соцсетей из Strapi + Телефон и Почта -->
          <div class="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
            <!-- Цикл по ссылкам из Strapi -->
            <template v-for="link in company?.links" :key="link.name">
              <!-- Telegram -->
              <a
                v-if="link.name === 'telegram'"
                :href="link.url"
                target="_blank"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-renome bg-white transition-all shadow-md group hover:scale-110"
                title="Telegram"
              >
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path
                    d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4 c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z"
                  />
                </svg>
              </a>

              <!-- WhatsApp -->
              <a
                v-else-if="link.name === 'whatsapp'"
                :href="link.url"
                target="_blank"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-renome bg-white transition-all shadow-md group hover:scale-110"
                title="WhatsApp"
              >
                <svg
                  class="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.014 8.006c.114-.904 1.289-2.132 2.221-1.996l-.002-.001c.907.172 1.625 1.734 2.03 2.436.287.51.1 1.026-.167 1.244-.361.29-.926.692-.807 1.095.21.717 2.71 3.217 3.94 3.927.465.27.803-.44 1.091-.803.21-.28.726-.447 1.234-.171.76.442 1.475.956 2.136 1.534.33.276.408.684.18 1.115-.403.76-1.569 1.76-2.415 1.557-1.478-.355-7.454-2.672-9.374-9.384-.108-.318-.08-.438-.066-.552z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M12 23c-1.224 0-1.901-.131-3-.5L6.894 23.553C5.565 24.218 4 23.25 4 21.764V19.5C1.847 17.492 1 15.177 1 12 1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm-6-4.37l-.636-.593C3.69 16.477 3 14.733 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9c-.986 0-1.448-.089-2.364-.396l-.788-.264-2.848 1.424v-3.134z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>

              <!-- Max -->
              <a
                v-else-if="link.name === 'max'"
                :href="link.url"
                target="_blank"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-renome bg-white transition-all shadow-md group hover:scale-110"
                title="Max"
              >
                <svg viewBox="0 0 720 720" class="w-6 h-6 fill-current">
                  <path
                    d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z"
                  />
                </svg>
              </a>

              <!-- Яндекс Мессенджер -->
              <a
                v-else-if="link.name === 'yandex-messenger'"
                :href="link.url"
                target="_blank"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-renome bg-white transition-all shadow-md group hover:scale-110"
                title="Яндекс Мессенджер"
              >
                <svg
                  class="w-6 h-6 fill-current"
                  viewBox="0 0 16 16"
                  xmlns="http://w3.org"
                >
                  <path
                    fill-rule="evenodd"
                    d="m3.585 11.965l-.716.148a1.863 1.863 0 0 1-1.792-3.036L2 8l-.923-1.077A1.863 1.863 0 0 1 2.87 3.887l.716.148l-.07-.303a1.822 1.822 0 0 1 2.64-2.014l8.293 4.466a2 2 0 0 1 1.052 1.76v.111a2 2 0 0 1-1.052 1.761l-8.293 4.466a1.822 1.822 0 0 1-2.64-2.014zm1.617-.334l-.225.974a.322.322 0 0 0 .466.356l1.625-.875l3.895-1.647zm5.761-6.07L7.068 3.914l-1.625-.875a.322.322 0 0 0-.466.356l.225.974zM3.14 8.976L3.976 8l-.837-.976l-.923-1.077a.363.363 0 0 1 .349-.591l11.162 2.309a.342.342 0 0 1 0 .67l-11.162 2.31a.363.363 0 0 1-.349-.592z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </template>

            <!-- Почта -->
            <a
              v-if="company?.email"
              :href="`mailto:${company.email}`"
              title="Написать письмо"
              class="w-10 h-10 rounded-xl flex items-center justify-center text-renome bg-white transition-all shadow-md group hover:scale-110"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z"
                />
              </svg>
            </a>

            <!-- Телефон -->
            <a
              v-if="company?.phone"
              :href="`tel:${company.phone}`"
              title="Позвонить"
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
    </template>
  </ModalDialog>
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
