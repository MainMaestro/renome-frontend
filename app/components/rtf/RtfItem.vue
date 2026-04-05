<script setup lang="ts">
import type { StrapiRtfItem } from "~/models";

defineProps<{
  item: StrapiRtfItem;
  useAccentColor?: boolean;
}>();
</script>
<template>
  <b v-if="item.type == 'text' && item.bold">{{ item.text }}</b>
  <i v-else-if="item.type == 'text' && item.italic">{{ item.text }}</i>
  <u v-else-if="item.type == 'text' && item.underline">{{ item.text }}</u>
  <s v-else-if="item.type == 'text' && item.strikethrough">{{ item.text }}</s>
  <code v-else-if="item.type == 'text' && item.code">{{ item.text }}</code>
  <span v-else-if="item.type == 'text'">{{ item.text }}</span>
  <p v-if="item.type == 'paragraph'" class="text-balance">
    <RtfItem
      v-for="child in item.children"
      :item="child"
      :useAccentColor="useAccentColor"
    ></RtfItem>
  </p>
  <h3
    v-if="item.type == 'heading'"
    class="text-renome font-black text-sm uppercase my-5 tracking-wider"
  >
    <RtfItem
      v-for="child in item.children"
      :item="child"
      :useAccentColor="useAccentColor"
    ></RtfItem>
  </h3>
  <ul v-if="item.type == 'list' && item.format == 'unordered'">
    <RtfItem
      v-for="child in item.children"
      :item="child"
      :useAccentColor="useAccentColor"
    ></RtfItem>
  </ul>
  <ol v-if="item.type == 'list' && item.format == 'ordered'">
    <RtfItem
      v-for="child in item.children"
      :item="child"
      :useAccentColor="useAccentColor"
    ></RtfItem>
  </ol>
  <li
    v-if="item.type == 'list-item'"
    class="leading-snug flex gap-3 text-[14px] font-medium"
  >
    <span
      :class="useAccentColor ? 'bg-renome-gradient' : 'bg-current'"
      class="w-2 h-2 mt-1.5 shrink-0"
    ></span>
    <RtfItem
      v-for="child in item.children"
      :item="child"
      :useAccentColor="useAccentColor"
    ></RtfItem>
  </li>
</template>
