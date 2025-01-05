<script setup lang="ts">
import type {
  UserAddressRemoveModal,
  UserAddressSavingModal,
} from "#build/components";
import type { AddressData } from "~/api/addresses";

defineProps<{
  error?: string;
}>();

const saveAddressModal = ref<InstanceType<
  typeof UserAddressSavingModal
> | null>(null);
const removeAddressModal = ref<InstanceType<
  typeof UserAddressRemoveModal
> | null>(null);
const orderStore = useOrderStore();
const { orderData } = storeToRefs(orderStore);
const addressesStore = useAddressesStore();

const addAddressHandler = (id: string) => {
  orderData.value.addressId = id;
};

const deleteHandler = (addressData: AddressData) => {
  removeAddressModal.value?.deleteAddress(addressData);
};

const editHandler = async (addressData: AddressData) => {
  saveAddressModal.value?.open(addressData);
};

const options = computed(() => {
  const calculatedOptions = [
    ...addressesStore.userAddresses.map((addressData) => {
      const { id, type, fullName, street, postcode, city, phone } = addressData;

      return {
        icon:
          type == "company"
            ? "solar-buildings-line-duotone"
            : "solar-home-line-duotone",
        label: fullName,
        help: [
          type == "company" ? `NIP: ${addressData.nip}` : undefined,
          `ul. ${street}`,
          `${postcode} ${city}`,
          `tel:${phone}`,
        ]
          .filter((v) => v)
          .join("\n"),
        value: id,
        actions: [
          {
            tooltip: "Edytuj",
            button: {
              icon: "solar-pen-new-square-line-duotone",
              color: "white",
              size: "xs",
              click: () => editHandler(addressData),
            },
          },
          {
            tooltip: "Usuń",
            button: {
              icon: "solar-trash-bin-minimalistic-linear",
              color: "white",
              size: "xs",
              click: () => deleteHandler(addressData),
            },
          },
        ],
      };
    }),
  ];

  if (addressesStore.moreAddressesAllowed) {
    calculatedOptions.push({
      icon: "solar-point-on-map-line-duotone",
      label: "Nowy",
      value: "new",
      help: "Dodaj nowy adres którego nie ma na liście",
      actions: [],
    });
  }

  return calculatedOptions;
});

watch(options, (nV) => {
  orderData.value.addressId = nV[0]?.value ?? "";
});
</script>

<template>
  <div class="flex flex-col">
    <UFormGroup
      class="mb-2"
      :error="error"
      label="Adres:"
      id="addressId"
      name="addressId"
      required
    >
      <div class="flex gap-2 flex-col">
        <UiCustomRadio
          class="flex-1"
          name="addressId"
          v-for="option in options"
          v-bind="option"
          v-model="orderData.addressId"
          actionsPosition="top"
          :actions="option.actions"
        />
      </div>
      <template v-if="!addressesStore.moreAddressesAllowed" #help>
        Możesz dodać maksymalnie 3 adresy. Usuń jeden z adresów aby dodać
        kolejny.
      </template>
    </UFormGroup>
    <UserAddressForm
      @address-saved="addAddressHandler"
      v-if="orderData.addressId == 'new'"
    />
    <UserAddressRemoveModal ref="removeAddressModal" />
    <UserAddressSavingModal ref="saveAddressModal" />
  </div>
</template>
