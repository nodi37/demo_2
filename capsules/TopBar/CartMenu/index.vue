<script setup lang="ts">
const cartStore = useCartStore();
const cartOpen = ref(false);
useActionOnUrlChange(() => (cartOpen.value = false));
</script>

<template>
  <TopBarCartMenuActivator
    v-model="cartOpen"
    :itemsCount="cartStore.itemsCount"
  />
  <USlideover v-model="cartOpen">
    <div class="relative flex flex-col flex-1 pt-8 overflow-hidden">
      <UButton
        class="absolute left-4 top-6 sm:hidden"
        @click="cartOpen = false"
        icon="i-solar-double-alt-arrow-right-outline"
        variant="soft"
        size="xl"
      />

      <span class="mb-8 text-lg text-center font-semibold text-gray-600">
        Koszyk:
      </span>
      <div
        class="flex-1 flex flex-col overflow-hidden border-t border-t-gray-100"
      >
        <div class="relative flex-1 overflow-x-hidden overflow-y-auto px-5">
          <TopBarCartMenuItem
            v-for="item in cartStore.cartData"
            v-bind="item"
            @decrease-item-quantity="cartStore.decreaseItemQuantity"
            @increase-item-quantity="cartStore.increaseItemQuantity"
            @delete-item="cartStore.removeItemFromCart"
          />
          <div
            class="h-20 sticky bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent"
          />
        </div>
        <TopBarCartMenuFooter
          class="mt-auto"
          :totalPrice="cartStore.totalPrice"
          :checkout-disabled="cartStore.itemsCount < 1"
        />
      </div>
    </div>
  </USlideover>
</template>
