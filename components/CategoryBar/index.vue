<script setup lang="ts">
const items = [
  { label: "Kaski", href: "/helments" },
  { label: "Kurtki", href: "/jackets" },
  { label: "Spodnie", href: "/pants" },
  { label: "Kombinezony", href: "/suits" },
  { label: "Rękawice", href: "/gloves" },
  { label: "Buty", href: "/boots" },
  { label: "Intercomy", href: "/intercoms" },
];
</script>
<template>
  <nav class="bg-primary-500 shadow-lg relative z-10">
    <ul
      class="flex text-white gap-5 overflow-x-auto overflow-y-hidden max-w-7xl mx-auto px-4"
    >
      <li v-for="item in items">
        <NuxtLink
          class="block px-4 py-3 hover:bg-primary-600"
          active-class="underline"
          :href="item.href"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
