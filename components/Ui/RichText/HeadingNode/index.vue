<script setup lang="ts">
import type { BaseTextNodeProps } from "../BaseNode/index.vue";
import type { LinkNodeProps } from "../LinkNode/index.vue";

export type HeadingNodeProps = {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: Array<BaseTextNodeProps | LinkNodeProps>;
};

defineProps<HeadingNodeProps>();
</script>
<template>
  <component :is="type">
    <template v-for="child in children">
      <UiRichTextBaseNode v-if="!child?.type" v-bind="child" />
      <UiRichTextLinkNode v-else v-bind="child" />
    </template>
  </component>
</template>
