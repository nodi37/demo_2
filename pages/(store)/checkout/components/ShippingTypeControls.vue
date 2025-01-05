<script setup lang="ts">
defineProps<{
  error?: string;
}>();

const orderStore = useOrderStore();
const { orderData } = storeToRefs(orderStore);

const options = computed(() => [
  {
    label: "Kurier",
    value: "directShipping",
    help: "Paczka zostanie dostarczona na wskazany adres",
    icon: "solar-delivery-line-duotone",
  },
  {
    label: "Punkt odbioru",
    value: "pickupPoint",
    help: "Twoja paczka zostanie dostarczona do wybranego punktu odbioru",
    icon: "solar-box-minimalistic-line-duotone",
    disabled: orderData.value.paymentType == "onDelivery",
  },
]);

watch(
  () => orderData.value.paymentType,
  (newPaymentType) => {
    if (
      newPaymentType == "onDelivery" &&
      orderData.value.shippingType == "pickupPoint"
    ) {
      orderData.value.shippingType = "";
    }
  }
);
</script>

<template>
  <UFormGroup
    id="shippingType"
    name="shippingType"
    label="Forma wysyłki:"
    :error="error"
    required
  >
    <div id="pickupPointCode" class="flex flex-col sm:flex-row gap-2">
      <UiCustomRadio
        v-for="option in options"
        v-bind="option"
        v-model="orderData.shippingType"
        class="flex-1"
        name="shipping"
      />
    </div>
  </UFormGroup>
</template>
