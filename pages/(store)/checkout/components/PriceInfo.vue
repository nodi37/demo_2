<script setup lang="ts">
const orderStore = useOrderStore();

const infoRows = computed(() => [
  {
    label: "Wartość koszyka",
    content: orderStore.cartWorth.toFixed(2) + " zł",
    condition: true,
  },
  {
    label: "Koszty dostawy",
    content: orderStore.shippingCost.toFixed(2) + " zł",
    condition: true,
  },
  {
    label: "Kod rabatowy",
    content: "-" + orderStore.couponDiscount.toFixed(2) + " zł",
    condition: orderStore.couponDiscount > 0,
  },
  {
    label: "Rabat użytkownika",
    content: "-" + orderStore.userDiscount.toFixed(2) + " zł",
    condition: orderStore.userDiscount > 0,
  },
  {
    label: "Rabat w sumie",
    content: "-" + orderStore.totalDiscount.toFixed(2) + " zł",
    condition: true,
  },
]);
</script>

<template>
  <!-- INFO ROWS -->
  <UiInfoRow
    class="text-sm"
    v-for="rowData in infoRows.filter((row) => row.condition)"
    v-bind="rowData"
  />

  <!-- PRICE ROW -->
  <UiInfoRow
    class="text-lg mt-1"
    label="Suma:"
    :content="`${orderStore.orderTotalPrice.toFixed(2)} zł`"
  />
</template>
