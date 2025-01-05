<script setup lang="ts">
import { logoDark, logoLight } from "~/config/logos";
</script>
<template>
  <div class="z-50 dark:bg-black">
    <div
      class="max-w-7xl mx-auto gap-2 grid md:grid-cols-[auto_1fr_auto] py-6 px-4 items-center"
    >
      <div class="sm:flex gap-4 items-center">
        <NuxtLink href="/">
          <UiImage
            class="h-auto w-48 dark:hidden"
            v-bind="logoDark"
            max-size="mobile"
            priority
          />
          <UiImage
            class="h-auto w-48 hidden dark:block"
            v-bind="logoLight"
            max-size="mobile"
            priority
          />
        </NuxtLink>
        <!-- <UButton icon="" to="/articles" variant="outline" size="2xs">
          Artykuły
        </UButton> -->
      </div>
      <TopBarSearchInput
        class="w-full max-w-xl mx-auto row-start-2 col-span-2 xl:row-start-1 xl:col-start-2 xl:col-span-1"
      />
      <div class="flex gap-2 md:gap-4 justify-self-end">
        <ClientOnly>
          <TopBarWishList />
          <TopBarCartMenu />
          <TopBarAccountMenu />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
