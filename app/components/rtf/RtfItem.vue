<script setup lang="ts">
import type { StrapiRtfItem } from "~/models";

defineProps<{
  item: StrapiRtfItem;
}>();
</script>
<template>
  <span v-if="item.type == 'text'">{{ item.text }}</span>
  <p v-if="item.type == 'paragraph'">
    <RtfItem v-for="child in item.children" :item="child"></RtfItem>
  </p>
  <h3
    v-if="item.type == 'heading'"
    class="text-renome font-black text-sm uppercase mb-5 tracking-wider"
  >
    <RtfItem v-for="child in item.children" :item="child"></RtfItem>
  </h3>
  <ul v-if="item.type == 'list'">
    <RtfItem v-for="child in item.children" :item="child"></RtfItem>
  </ul>
  <li
    v-if="item.type == 'list-item'"
    class="leading-snug flex gap-3 text-[14px] text-[#263238] font-medium"
  >
    <span class="w-2 h-2 bg-[#009688] mt-1.5 shrink-0"></span>
    <RtfItem v-for="child in item.children" :item="child"></RtfItem>
  </li>
</template>
