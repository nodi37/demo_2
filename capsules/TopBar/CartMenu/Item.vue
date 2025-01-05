<script setup lang="ts">
import type { ProductData } from "~/api/products";

const props = defineProps<{
  quantity: number;
  product: ProductData;
}>();

const emit = defineEmits<{
  (e: "increaseItemQuantity", id: string): void;
  (e: "decreaseItemQuantity", id: string): void;
  (e: "deleteItem", id: string): void;
}>();

const allAvailabilityUsed = computed(
  () => !(props.product.availability > props.quantity)
);
</script>
<template>
  <div class="relative flex py-2 items-center border-b border-gray-300">
    <div
      v-if="product.availability < 1"
      class="absolute h-full w-full grid place-items-center z-30 bg-white bg-opacity-80 uppercase font-semibold text-sm text-gray-700"
    >
      Ten produkt nie jest aktualnie dostępny
    </div>
    <UiImage class="h-20 w-20" v-bind="product.miniature" />
    <div
      class="flex-1 flex flex-col justify-between pl-3 border-l border-l-gray-300"
    >
      <div class="flex justify-between items-center gap-10 mb-2">
        <div>
          <span class="block text-xs text-gray-600 font-semibold">
            {{ product.manufacturer.name }}
          </span>
          <NuxtLink
            :to="`/${product.productPageSlug}`"
            class="block text-sm text-gray-600 hover:text-primary-500 font-semibold underline underline-offset-2"
          >
            {{ product.modelName }}
          </NuxtLink>
          <span class="block text-xs text-gray-600 font-thin tracking-wider">
            {{ product.variantName }}
          </span>
        </div>
        <UButton
          size="md"
          variant="ghost"
          icon="i-solar-trash-bin-trash-outline"
          @click="() => emit('deleteItem', product.id)"
        />
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <UButton
            class="p-0.5"
            size="md"
            variant="ghost"
            icon="i-solar-minus-circle-outline"
            :disabled="quantity < 2"
            @click="() => emit('decreaseItemQuantity', product.id)"
          />
          <span class="text-sm font-semibold text-gray-700 w-5 text-center">
            {{ quantity }}
          </span>
          <UButton
            class="p-0.5"
            size="md"
            variant="ghost"
            icon="i-solar-add-circle-outline"
            :disabled="allAvailabilityUsed"
            @click="() => emit('increaseItemQuantity', product.id)"
          />
        </div>
        <span class="text-sm text-gray-800 font-semibold">
          {{ (quantity * product.bruttoPrice).toFixed(2) }} zł
        </span>
      </div>
      <span class="text-[10px] text-red-400" v-if="allAvailabilityUsed">
        Dodano maksymalną ilość dostępną w magazynie
      </span>
    </div>
  </div>
</template>
