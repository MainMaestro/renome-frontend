<script setup lang="ts">
import type { StrapiImage, StrapiImageFormat } from "~/models";

const NO_ALT = "Альтернативный текст не указан";

const props = defineProps<{
  src: StrapiImage;
  alt?: string;
  format?: keyof StrapiImageFormat;
  loading?: 'lazy' | 'eager';
}>();

const usedImage = computed(() => {
  if (!props.src.formats) return props.src;

  if (!props.format) return props.src;

  if (props.format in props.src.formats) {
    return props.src.formats[props.format as keyof StrapiImageFormat];
  }
  return props.src;
});
</script>
<template>
  <img
    :src="useImageUrl(usedImage)"
    :width="usedImage?.width"
    :height="usedImage?.height"
    :alt="alt ?? src.alternativeText ?? src.caption ?? NO_ALT"
    :loading="loading || 'lazy'" 
  />
</template>
