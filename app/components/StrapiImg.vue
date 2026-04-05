<script setup lang="ts">
import type { StrapiImage, StrapiImageFormat } from "~/models";

const NO_ALT = "Альтернативный текст не указан";

const props = defineProps<{
  src: StrapiImage; // Здесь можно добавить ?, если src может отсутствовать
  alt?: string;
  format?: keyof StrapiImageFormat;
  loading?: "lazy" | "eager";
}>();

const usedImage = computed(() => {
  // Защита: если src не передан, возвращаем null
  if (!props.src) return null;

  if (!props.src.formats || !props.format) return props.src;

  if (props.format in props.src.formats) {
    return props.src.formats[props.format as keyof StrapiImageFormat];
  }
  return props.src;
});
</script>

<template>
  <!-- Рендерим только если есть usedImage и src -->
  <img
    v-if="usedImage && src"
    :src="useImageUrl(usedImage)"
    :width="usedImage?.width"
    :height="usedImage?.height"
    :alt="alt ?? src.alternativeText ?? src.caption ?? NO_ALT"
    :loading="loading || 'lazy'"
  />
</template>
