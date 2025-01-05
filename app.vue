<script lang="ts" setup>
import "./main.css";
</script>
<template>
  <UserContextProvider />
  <InPostWidgetCore />
  <TopBar />
  <CategoryBar />
  <div class="flex-1 bg-white dark:bg-gray-800">
    <NuxtPage />
  </div>
  <Footer />
  <UNotifications>
    <template #title="{ title }">
      <span
        class="block text-xl font-semibold leading-tight -mt-1 mb-1"
        v-html="title"
      />
    </template>
    <template #description="{ description }">
      <span class="text-base leading-tight" v-html="description" />
    </template>
  </UNotifications>
</template>
