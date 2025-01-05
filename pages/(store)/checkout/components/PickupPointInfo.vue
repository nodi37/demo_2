<script setup lang="ts">
const orderStore = useOrderStore();
const componentData = computed(() => ({
  name: orderStore.pickupPointFullData?.name ?? "",
  address: `${orderStore.pickupPointFullData?.address.line1!} ${orderStore
    .pickupPointFullData?.address.line2!}`,
  openingHours: orderStore.pickupPointFullData?.openingHours ?? "",
}));
const { name, address, openingHours } = toRefs(componentData.value);
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-700 mb-1">
      Wybrany punkt odbioru:
    </h3>
    <p class="font-semibold text-gray-700">Paczkomat {{ name }}</p>
    <p class="font-light text-sm text-gray-700">
      {{ address }}
    </p>
    <p class="font-light text-sm text-gray-700">Dostępny {{ openingHours }}</p>
    <UButton
      variant="link"
      class="px-0 pt-1"
      size="lg"
      @click="orderStore.setPickupPointData(null)"
    >
      Zmień
    </UButton>
  </div>
</template>
