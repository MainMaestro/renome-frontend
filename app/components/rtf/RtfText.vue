<script setup lang="ts">
import type { StrapiRtfItem } from "~/models";

withDefaults(
  defineProps<{
    text: StrapiRtfItem[];
    useAccentColor?: boolean;
  }>(),
  { useAccentColor: true },
);
</script>
<template>
  <RtfItem v-for="item in text" :item="item" :useAccentColor="useAccentColor" />
</template>
