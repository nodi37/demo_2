<script setup lang="ts">
import type { AddressData } from "~/api/addresses";
import type ConfirmationModal from "~/components/ConfirmationModal.vue";

const addressStore = useAddressesStore();
const confirmationModal = ref<InstanceType<typeof ConfirmationModal> | null>(
  null
);

const addressData = reactive<AddressData>({
  id: "",
  type: "personal",
  fullName: "",
  street: "",
  postcode: "",
  city: "",
  phone: "",
});

const deleteAddress = async (address: AddressData) => {
  Object.assign(addressData, address);
  const decision = await confirmationModal.value?.open();
  if (!decision) return;
  addressStore.deleteAddress(address.id);
};

defineExpose({ deleteAddress });
</script>
<template>
  <ConfirmationModal ref="confirmationModal">
    <div class="text-sm text-gray-500 font-medium">
      <p class="text-lg text-gray-800 mb-1">
        Czy na pewno chcesz usunąć adres?
      </p>
      <div class="flex flex-col">
        <span>{{ addressData.fullName }}</span>
        <span>{{ addressData.street }}</span>
        <span> {{ addressData.postcode }} {{ addressData.city }} </span>
        <span>{{ addressData.phone }}</span>
      </div>
    </div>
  </ConfirmationModal>
</template>
