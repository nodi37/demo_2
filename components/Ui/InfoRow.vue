<script setup lang="ts">
defineProps<{
  label: string;
  content: string;
}>();
</script>

<template>
  <div class="flex justify-between font-medium">
    <span class="text-gray-500">{{ label }}</span>
    <span class="text-gray-700"> {{ content }}</span>
  </div>
</template>
