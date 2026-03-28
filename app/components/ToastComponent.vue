<template>
  <Teleport to="body">
    <Transition name="slide-up">
      <div
        v-if="toast.show"
        :class="[
          'fixed bottom-10 left-1/2 -translate-x-1/2 z-1000 px-6 py-3 rounded-2xl shadow-2xl text-white font-bold whitespace-nowrap',
          toast.isError ? 'bg-red-500' : 'bg-emerald-600',
        ]"
      >
        {{ toast.message }}
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { toast } = useAppToast();
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  transform: translate(-50%, 20px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translate(-50%, 20px);
  opacity: 0;
}
</style>
