<script setup lang="ts">
const model = defineModel<boolean>();

defineProps<{
  itemsCount: number;
}>();
</script>

<template>
  <button
    class="flex flex-col text-sm dark:text-gray-300 items-center"
    @click="model = true"
  >
    <UChip
      position="top-right"
      size="2xl"
      :text="itemsCount"
      :show="itemsCount > 0"
    >
      <UIcon class="size-7" name="i-solar-cart-large-2-outline" />
    </UChip>
    <span class="hidden sm:block">Koszyk</span>
  </button>
</template>
