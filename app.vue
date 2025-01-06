<script lang="ts" setup>
import "./main.css";
</script>
<template>
  <!-- providers -->
  <UserContextProvider />
  <InPostWidgetCore />
  <CustomNotifications />
  <!-- content  -->
  <TopBar />
  <CategoryBar />
  <div class="flex-1 bg-white dark:bg-gray-800">
    <NuxtPage />
  </div>
  <Footer />
</template>
