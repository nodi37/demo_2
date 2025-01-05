<script setup lang="ts">
defineProps<{
  title: string;
  price: number;
  best30DaysPrice: number;
  rating?: number;
}>();

// const rating = 5;
</script>
<template>
  <h1 id="title" class="text-3xl font-bold text-gray-800 tracking-wide">
    {{ title }}
  </h1>
  <div v-if="rating" class="mt-3 gap-2 flex items-center">
    <RatingStars :rating="rating" />
    <NuxtLink class="text-xs text-slate-500 mt-px" to="#reviews">
      Zobacz recenzje >
    </NuxtLink>
  </div>
  <UiShortDivider class="mb-4 mt-8" />
  <div class="prose mb-4">
    <slot name="summary" />
  </div>
  <UiShortDivider class="mb-8" />
  <span class="block text-2xl text-slate-600 font-semibold">
    {{ price }} zł
  </span>
  <span class="block text-[10px] text-slate-400">
    Najniższa cena z ostatnich 30 dni: {{ best30DaysPrice }} zł
  </span>
  <span class="block mb-4 text-[10px] text-slate-400">
    Zawiera podatek VAT
  </span>
</template>
