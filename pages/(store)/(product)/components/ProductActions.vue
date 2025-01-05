<script setup lang="ts">
const emit = defineEmits<{
  (e: "addToCart"): void;
  (e: "addToWishList"): void;
}>();
defineProps<{ cartDisabled?: boolean }>();
</script>
<template>
  <div class="flex gap-4">
    <UButton
      icon="i-solar-cart-plus-outline"
      class="justify-center"
      size="xl"
      trailing
      @click="() => emit('addToCart')"
      :disabled="cartDisabled"
    >
      Dodaj do koszyka
    </UButton>

    <UTooltip text="Dodaj do listy życzeń">
      <UButton
        variant="soft"
        size="xl"
        icon="i-solar-heart-outline"
        @click="() => emit('addToWishList')"
      />
    </UTooltip>
  </div>
</template>
