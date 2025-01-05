<script setup lang="ts">
let isContextInitialized = false;
const userDataStore = useUserDataStore();
const addressStore = useAddressesStore();
const cartStore = useCartStore();

const initUserRelatedStores = async () => {
  await addressStore.init(userDataStore.userData.id);
  await cartStore.init(userDataStore.userData);
};

watch(
  () => userDataStore.userState,
  (userAuthState) => {
    if (!isContextInitialized || userAuthState == "loading") return;
    initUserRelatedStores();
  }
);

onMounted(async () => {
  await userDataStore.init();
  await initUserRelatedStores();
  isContextInitialized = true;
});
</script>
<template></template>
