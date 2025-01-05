<script setup lang="ts">
defineProps<{
  totalPrice: number;
  checkoutDisabled?: boolean;
}>();
</script>

<template>
  <div class="pt-2 pb-3 px-5 border-t border-t-gray-100">
    <div class="flex justify-between items-center mb-3">
      <span class="font-semibold text-gray-600">WARTOŚĆ KOSZYKA:</span>
      <div>
        <span class="text-xl font-semibold text-gray-700">
          {{ totalPrice.toFixed(2) }} zł
        </span>
        <span class="block text-xs text-gray-400"> + koszt wysyłki </span>
      </div>
    </div>
    <UButton :disabled="checkoutDisabled" block size="xl" to="/checkout">
      <span class="font-semibold"> DO KASY </span>
    </UButton>
    <span class="block text-xs text-gray-400 mt-2 text-center">
      Rabat oraz kupony zniżkowe zostaną naliczone podczas finalizacji
      zamówienia.
    </span>
  </div>
</template>
