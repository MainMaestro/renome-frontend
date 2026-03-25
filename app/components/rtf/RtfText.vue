<script setup lang="ts">
import type { StrapiRtfItem } from "~/models";

defineProps<{
  text: StrapiRtfItem[];
}>();
</script>
<template>
  <RtfItem v-for="item in text" :item="item" />
</template>
