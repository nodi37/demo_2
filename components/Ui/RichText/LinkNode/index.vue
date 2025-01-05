<script setup lang="ts">
import type { BaseTextNodeProps } from "../BaseNode/index.vue";

export type LinkNodeProps = {
  type: "link";
  url: string;
  children: Array<BaseTextNodeProps>;
};

defineProps<LinkNodeProps>();
</script>
<template>
  <NuxtLink class="hover:underline hover:decoration-primary-600" :href="url">
    <UiRichTextBaseNode v-for="child in children" v-bind="child" />
  </NuxtLink>
</template>
