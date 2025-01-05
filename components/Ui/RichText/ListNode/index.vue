<script setup lang="ts">
import type { BaseTextNodeProps } from "../BaseNode/index.vue";
import type { LinkNodeProps } from "../LinkNode/index.vue";

export type ListNodeProps = {
  type: "ul" | "ol";
  children: Array<{
    type: "li";
    children: Array<BaseTextNodeProps | LinkNodeProps>;
  }>;
};

defineProps<ListNodeProps>();
</script>
<template>
  <component :is="type">
    <li v-for="child in children">
      <template v-for="nestedChild in child.children">
        <UiRichTextBaseNode
          v-if="!nestedChild?.type"
          v-bind="nestedChild as BaseTextNodeProps "
        />
        <UiRichTextLinkNode v-else v-bind="nestedChild as LinkNodeProps" />
      </template>
    </li>
  </component>
</template>
