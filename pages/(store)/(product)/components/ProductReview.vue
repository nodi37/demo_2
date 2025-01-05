<script setup lang="ts">
export type ProductReviewProps = {
  email: string;
  rating: number;
  content: string;
};

defineProps<ProductReviewProps>();
</script>
<template>
  <article class="px-2 py-5 border-b border-gray-100">
    <div class="w-full flex items-center gap-3 mb-2">
      <UIcon
        class="h-12 w-12 text-gray-400"
        name="i-solar-user-circle-bold-duotone"
      />
      <div>
        <span class="ml-1">{{ email }}</span>
        <RatingStars :rating="rating" />
      </div>
    </div>
    <p>{{ content }}</p>
  </article>
</template>
