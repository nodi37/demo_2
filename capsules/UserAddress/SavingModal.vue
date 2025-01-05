<script setup lang="ts">
import type { AddressData } from "~/api/addresses";

const modalActive = ref(false);
const initialData = ref<AddressData | undefined>(undefined);

const open = (currentAddressData?: AddressData) => {
  initialData.value = currentAddressData;
  modalActive.value = true;
};

const close = () => {
  modalActive.value = false;
};

defineExpose({
  open,
});
</script>
<template>
  <UModal v-model="modalActive" preventClose>
    <div class="relative p-4">
      <UButton
        class="absolute top-2 right-2"
        icon="solar-close-circle-line-duotone"
        @click="close"
        size="xl"
        variant="ghost"
      />
      <h3 class="font-medium text-xl mb-3 text-gray-700">Dodaj adres:</h3>
      <UserAddressForm :initial-data="initialData" @addressSaved="close" />
    </div>
  </UModal>
</template>
