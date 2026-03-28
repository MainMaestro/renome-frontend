<template>
  <Transition name="fade">
    <div
      class="z-100 top-0 left-0 bottom-0 right-0 p-2 md:p-20 fixed w-full h-dvh backdrop-blur-3xl flex"
      v-if="isOpen"
      @click.self="emit('close')"
    >
      <div
        class="z-200 bg-white rounded-4xl h-full w-full drop-shadow-2xl flex flex-col pb-3 md:gap-10 md:py-10 grow"
      >
        <div
          class="flex bg-white md:bg-transparent z-300 flex-row justify-between p-2 md:px-10 rounded-t-4xl drop-shadow-2xl"
        >
          <slot name="header" />
          <div>
            <button
              @click="emit('close')"
              title="Закрыть"
              class="p-2 z-400 md:p-3 text-gray-400 hover:text-black transition-all duration-300 hover:rotate-90 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-xl cursor-pointer"
            >
              <span class="text-3xl md:text-3xl leading-none font-light"
                >✕</span
              >
            </button>
          </div>
        </div>
        <div
          class="flex grow justify-center items-center overflow-y-auto h-full px-3 md:px-10"
        >
          <slot name="content" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);
watch(
  () => props.isOpen,
  (val) => {
    if (import.meta.client) {
      document.body.style.overflow = val ? "hidden" : "auto";
    }
  },
);
const handleEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.isOpen) emit("close");
};

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc);
  document.body.style.overflow = "auto";
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
