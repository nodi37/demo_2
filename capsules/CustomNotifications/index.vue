<template>
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
