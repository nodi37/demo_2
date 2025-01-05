<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
</script>
<template>
  <button
    class="flex flex-col text-sm dark:text-gray-300 items-center"
    :disabled="disabled"
  >
    <UIcon class="size-7" name="i-solar-user-circle-outline" />
    <span class="hidden sm:block">Konto</span>
  </button>
</template>
