<script setup lang="ts">
import { type ProductReviewProps } from "./ProductReview.vue";

defineProps<{
  reviews: Array<ProductReviewProps>;
}>();
</script>
<template>
  <section
    id="reviews"
    class="prose-sm prose-p:m-0 pt-5 border-t border-gray-200"
  >
    <h2 class="mb-1">Opinie o produkcie</h2>
    <ProductReview v-for="review in reviews" v-bind="review" />
    <!-- TO DO -->
    <!-- <UButton class="mt-2" variant="link" size="xs" to="#">
      Sprawdź więcej recenzji tego produktu >
    </UButton> -->
    <!-- TO DO -->
  </section>
</template>
