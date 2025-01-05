<script setup lang="ts">
const props = defineProps<{ rating: number }>();
const fullStars = Math.floor(props.rating);
const addPartialStar = props.rating - fullStars > 0.49;
const emptyStars = 5 - fullStars - (addPartialStar ? 1 : 0);
</script>
<template>
  <UTooltip :text="`${rating} / 5`" class="flex">
    <UIcon
      class="size-5 text-yellow-400"
      v-for="i in fullStars"
      name="i-solar-star-bold"
    />
    <UIcon
      v-if="addPartialStar"
      class="size-5 text-yellow-400"
      name="i-solar-star-bold-duotone"
    />
    <UIcon
      class="size-5 text-gray-500"
      v-for="i in emptyStars"
      name="i-solar-star-bold"
    />
  </UTooltip>
</template>
