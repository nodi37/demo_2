<script setup lang="ts">
const orderStore = useOrderStore();
const { orderData } = storeToRefs(orderStore);
</script>
<template>
  <div>
    <UFormGroup label="Wiadomość do zamówienia">
      <UTextarea
        placeholder="Dodatkowe informacje / Wiadomość dla kuriera"
        v-model="orderData.orderMessage"
      />
    </UFormGroup>
  </div>
</template>
