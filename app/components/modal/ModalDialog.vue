<template>
  <Transition name="fade">
    <div
      class="z-100 top-0 left-0 bottom-0 right-0 p-2 md:p-5 fixed w-full h-dvh backdrop-blur-3xl flex items-center justify-center drop-shadow-2xl"
      v-if="isOpen"
      @click.self="emit('close')"
    >
      <!-- Основной белый контейнер (теперь relative) -->
      <div
        class="relative z-200 bg-white rounded-4xl h-full w-full drop-shadow-2xl flex flex-col overflow-hidden"
      >
        <!-- Фоновое изображение (теперь внутри relative контейнера) -->
        <div class="absolute inset-0 pointer-events-none">
          <img
            src="/bg.png"
            alt="Фоновое изображение"
            class="w-full h-full object-cover object-top-right opacity-50 rounded-4xl"
          />
        </div>

        <!-- Кнопка закрытия (фиксирована справа сверху относительно модалки) -->
        <button
          @click="emit('close')"
          title="Закрыть"
          class="absolute top-4 right-4 md:top-8 md:right-8 z-500 p-2 md:p-3 text-gray-400 hover:text-black transition-all duration-300 hover:rotate-90 active:scale-90 focus:outline-none rounded-xl cursor-pointer"
        >
          <span class="text-3xl leading-none font-light">✕</span>
        </button>

        <!-- Заголовок (если нужен) -->
        <div
          class="relative z-300 flex flex-row justify-between p-2 md:px-10 rounded-t-4xl"
        >
          <slot name="header" />
        </div>

        <!-- Контентная часть (только она скроллится) -->
        <div
          class="relative z-10 flex grow justify-center items-start overflow-y-auto h-full px-3 md:px-10 py-10"
        >
          <slot name="content" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from "vue";
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);
watch(
  () => props.isOpen,
  (val) => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = val ? "hidden" : "";
    }
  },
);

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.isOpen) emit("close");
};

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
  // Если модалка открыта сразу при монтировании, блокируем скролл здесь
  if (props.isOpen) {
    document.body.style.overflow = "hidden";
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc);
  // Принудительно возвращаем скролл, когда компонент уничтожается
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
