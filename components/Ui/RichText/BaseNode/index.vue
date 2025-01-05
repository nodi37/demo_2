<script setup lang="ts">
export type BaseTextNodeProps = {
  type?: "";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};
const props = defineProps<BaseTextNodeProps>();
const content = ref(props.text);
if (props.bold) content.value = `<b>${content.value}</b>`;
if (props.italic) content.value = `<i>${content.value}</i>`;
if (props.underline) content.value = `<u>${content.value}</u>`;
if (props.strikethrough) content.value = `<s>${content.value}</s>`;
</script>
<template>
  <span v-html="content" />
</template>
