<script setup lang="ts">
type ParametersItem = {
  key: string;
  value: string;
};

defineProps<{
  items: Array<ParametersItem>;
}>();
</script>
<template>
  <UAccordion
    size="xl"
    variant="soft"
    :items="[
      {
        label: 'Sczegółowe parametry produktu',
        defaultOpen: true,
        //@ts-expect-error
        content: items,
      },
    ]"
  >
    <template #item="{ item }">
      <div
        class="flex justify-between px-3 py-4 border-b border-gray-300"
        v-for="entry in item.content"
      >
        <span>{{ entry.key }}</span>
        <span>{{ entry.value }}</span>
      </div>
    </template>
  </UAccordion>
</template>
