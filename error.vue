<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number;
    message: string;
  };
}>();

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>
<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <UButton @click="handleError">Wróć do strony głównej</UButton>
  </div>
</template>
