import {
  useAddressesApi,
  type AddressBody,
  type AddressData,
} from "~/api/addresses";

export const useAddressesStore = defineStore("addressesDataStore", () => {
  const addressesApi = useAddressesApi();
  const userAddresses = ref<Array<AddressData>>([]);
  const isLoggedIn = ref(false);
  const currentUserId = ref("");
  const moreAddressesAllowed = computed(() => userAddresses.value.length < 3);

  // Remote actions
  const reloadRemoteAddresses = async () => {
    if (!currentUserId.value) return;

    const { success, data } = await addressesApi.getAddressesByUserId(
      currentUserId.value
    );

    if (!success) {
      isLoggedIn.value = false;
      init();
      return;
    }

    userAddresses.value = data;
  };

  const addRemoteAddress = async (addressBody: AddressBody) => {
    const response = await addressesApi.saveNewAddress(
      currentUserId.value,
      addressBody
    );
    await reloadRemoteAddresses();
    return response;
  };

  const updateRemoteAddress = async (addressData: AddressData) => {
    const response = await addressesApi.updateAddress(addressData);
    await reloadRemoteAddresses();
    return response;
  };

  const deleteRemoteAddress = async (id: string) => {
    const { success } = await addressesApi.deleteAddressById(id);
    await reloadRemoteAddresses();

    return {
      success,
    };
  };

  // Local Actions
  const addLocalAddress: typeof addRemoteAddress = async (
    addressBody: AddressBody
  ) => {
    const newLocalId = `local-${new Date().getTime()}`;

    userAddresses.value.push({
      ...addressBody,
      id: newLocalId,
    });

    return { success: true, data: newLocalId };
  };

  const updateLocalAddress: typeof updateRemoteAddress = async (
    addressData: AddressData
  ) => {
    const addressIndex = userAddresses.value.findIndex(
      (address) => addressData.id === address.id
    );
    if (addressIndex === -1) {
      // Shouldn't happen in production
      // All edits in app should be triggered based on data from store
      throw new Error("Address not found");
    }
    userAddresses.value[addressIndex] = addressData;
    return { success: true, data: addressData.id };
  };

  const deleteLocalAddress: typeof deleteRemoteAddress = async (id: string) => {
    userAddresses.value = userAddresses.value.filter(
      (address) => address.id !== id
    );
    return { success: true };
  };

  // Init
  const saveAddress = ref(addLocalAddress);
  const updateAddress = ref(updateLocalAddress);
  const deleteAddress = ref(deleteLocalAddress);

  const init = async (userId?: string) => {
    const { success, data } = userId
      ? // ? await addressesApi.getAddressesByUserId(userId)
        { success: true, data: [] }
      : { success: false, data: [] };

    // Leave only local for demo
    // if (success) {
    //   saveAddress.value = addRemoteAddress;
    //   updateAddress.value = updateRemoteAddress;
    //   deleteAddress.value = deleteRemoteAddress;
    // } else {
    //   saveAddress.value = addLocalAddress;
    //   updateAddress.value = updateLocalAddress;
    //   deleteAddress.value = deleteLocalAddress;
    // }

    isLoggedIn.value = success;
    currentUserId.value = userId ?? "";
    userAddresses.value = data as Array<AddressData>;
  };

  return {
    isLoggedIn,
    userAddresses,
    moreAddressesAllowed,
    saveAddress,
    updateAddress,
    deleteAddress,
    init,
  };
});
