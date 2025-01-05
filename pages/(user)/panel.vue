<script setup lang="ts">
useSeoMeta({
  title: ":: 4Ride.pl :: Panel użytkownika",
  robots: {
    noindex: true,
  },
});

const menuEntries = [
  {
    icon: "i-solar-cart-large-2-outline",
    label: "Moje zamówienia",
    to: "/panel/orders",
  },
  {
    icon: "i-solar-map-point-outline",
    label: "Moje adresy",
    to: "/panel/addresses",
  },
  {
    icon: "i-solar-heart-outline",
    label: "Listy życzeń",
    to: "/panel/wish-lists",
  },
  {
    icon: "i-solar-settings-outline",
    label: "Ustawienia konta",
    to: "/panel/account",
  },
];
</script>
<template>
  <div
    class="max-w-7xl mx-auto h-full flex flex-col md:flex-row gap-y-5 gap-x-10 px-4 py-6"
  >
    <UVerticalNavigation :links="menuEntries" />
    <div class="border w-full">
      <NuxtPage />
    </div>
  </div>
</template>
