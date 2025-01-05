<script setup lang="ts">
const isOpen = ref(false);
let resolver: (value: boolean) => void;

const open: () => Promise<boolean> = () => {
  isOpen.value = true;
  return new Promise((resolve) => (resolver = resolve));
};

const handleDecision = (decision: boolean) => {
  resolver(decision);
  isOpen.value = false;
};

defineExpose({ open });
</script>
<template>
  <UModal v-model="isOpen" preventClose>
    <div class="p-6">
      <slot />
      <div class="mt-8 flex gap-4">
        <UButton
          @click="() => handleDecision(false)"
          class="min-w-0 flex-1"
          size="lg"
          color="gray"
          variant="outline"
          block
        >
          Anuluj
        </UButton>
        <UButton
          @click="() => handleDecision(true)"
          class="min-w-0 flex-1"
          size="lg"
          block
        >
          Potwierdź
        </UButton>
      </div>
    </div>
  </UModal>
</template>
