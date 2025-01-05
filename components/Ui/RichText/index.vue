<script setup lang="ts">
import type { BaseTextNodeProps } from "./BaseNode/index.vue";
import type { LinkNodeProps } from "./LinkNode/index.vue";
import type { HeadingNodeProps } from "./HeadingNode/index.vue";
import type { ListNodeProps } from "./ListNode/index.vue";
import type { ImageData } from "~/api/media";

type PNode = {
  type?: undefined;
  children: Array<BaseTextNodeProps | LinkNodeProps>;
};

type ImageNode = {
  type: "upload";
  value: ImageData;
};

export type UiRichTextProps = Array<
  PNode | ImageNode | HeadingNodeProps | ListNodeProps
>;

defineProps<{ content: UiRichTextProps }>();
</script>
<template>
  <template v-for="node in content">
    <p v-if="!node.type">
      <template v-for="child in node.children">
        <UiRichTextBaseNode v-if="!child?.type" v-bind="child" />
        <UiRichTextLinkNode v-else v-bind="child" />
      </template>
    </p>
    <UiImage v-if="node.type == 'upload'" v-bind="node.value" />
    <UiRichTextHeadingNode
      v-if="['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.type ?? '')"
      v-bind="node as HeadingNodeProps"
    />
    <UiRichTextListNode
      v-if="['ol', 'ul'].includes(node.type ?? '')"
      v-bind="node as ListNodeProps"
    />
  </template>
</template>
