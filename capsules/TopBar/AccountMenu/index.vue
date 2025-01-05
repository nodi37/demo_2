<script setup lang="ts">
const userDataStore = useUserDataStore();
const menuOpened = ref(false);
useActionOnUrlChange(() => (menuOpened.value = false));
</script>

<template>
  <UPopover v-model:open="menuOpened">
    <TopBarAccountMenuActivator
      :disabled="userDataStore.userState == 'loading'"
    />
    <template #panel>
      <TopBarAccountMenuContentView
        v-if="userDataStore.userState == 'loggedIn'"
      />
      <TopBarAccountMenuLoginView
        v-if="userDataStore.userState == 'unauthenticated'"
      />
    </template>
  </UPopover>
</template>
