<script setup lang="ts">
const cartStore = useCartStore();
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="item in cartStore.cartData"
      class="flex flex-col gap-1 bg-white p-3 shadow rounded-xl"
    >
      <div class="flex gap-4">
        <UiImage
          class="h-24 w-24 rounded-lg overflow-hidden border-gray-300 border-2"
          v-bind="item.product.miniature"
        />
        <div class="flex-1 flex flex-col">
          <div class="flex items-center">
            <UButton
              class="p-0.5"
              size="md"
              variant="ghost"
              icon="i-solar-minus-circle-outline"
              :disabled="item.quantity < 2"
              @click="cartStore.decreaseItemQuantity(item.product.id)"
            />
            <span class="text-sm font-semibold text-gray-700 w-5 text-center">
              {{ item.quantity }}x
            </span>
            <UTooltip
              :text="
                !(item.product.availability > item.quantity)
                  ? 'Brak większej ilości w magazynie'
                  : ''
              "
            >
              <UButton
                class="p-0.5"
                size="md"
                variant="ghost"
                icon="i-solar-add-circle-outline"
                :disabled="!(item.product.availability > item.quantity)"
                @click="cartStore.increaseItemQuantity(item.product.id)"
              />
            </UTooltip>
            <UButton
              class="ml-auto p-0.5"
              size="md"
              variant="ghost"
              icon="i-solar-trash-bin-trash-outline"
              @click="cartStore.removeItemFromCart(item.product.id)"
            />
          </div>

          <NuxtLink
            :href="item.product.productPageSlug"
            class="text-medium text-sm sm:text-lg text-gray-600 underline"
          >
            {{ item.product.manufacturer.name }} {{ item.product.modelName }}
          </NuxtLink>
          <span class="text-medium text-sm text-gray-500">
            {{ item.product.variantName }}
          </span>
          <span class="text-medium text-sm text-gray-500"> </span>
          <span class="mt-auto text-gray-700">
            {{ (item.quantity * item.product.bruttoPrice).toFixed(2) }} zł
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
