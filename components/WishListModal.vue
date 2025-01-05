<script setup lang="ts">
const isOpen = ref(false);
let resolveFn: (value: string) => void;

const open = (id: string) => {
  isOpen.value = true;
  return new Promise((resolve) => (resolveFn = resolve));
};

const onClickHandler = () => {
  resolveFn("list-name");
  isOpen.value = false;
};

defineExpose({ open });
</script>
<template>
  <UModal v-model="isOpen">
    <div class="p-4">
      Wybierz listę:
      <button @click="onClickHandler">test</button>
    </div>
  </UModal>
</template>
