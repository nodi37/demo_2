<script setup lang="ts">
import { useDiscountCodesApi } from "~/api/discountCodes";

const discountCodeApi = useDiscountCodesApi();
const orderStore = useOrderStore();
const codeState = ref<"idle" | "loading" | "found" | "not-found" | "expired">(
  "idle"
);
const inputValue = ref("");

// Handlers
const checkCodeHandler = async () => {
  codeState.value = "loading";
  const { success, data } = await discountCodeApi.checkDiscountCode(
    inputValue.value
  );

  if (!success) {
    codeState.value = "not-found";
    return;
  }

  if (!data.isAvailable) {
    codeState.value = "expired";
    return;
  }

  orderStore.setDiscountCodeData(data);
  codeState.value = "found";
};

const removeCodeHandler = () => {
  orderStore.setDiscountCodeData(null);
};

// Remove error when typing after error
watch(inputValue, () => {
  codeState.value = "idle";
});

// Code info message
const codeInfoMessage = computed(() => {
  if (!orderStore.discountCodeFullData) return "";
  if (orderStore.discountCodeFullData.discountType === "percentage") {
    return `Zastosowano ${orderStore.discountCodeFullData.discountAmount}% zniżki`;
  }
  if (orderStore.discountCodeFullData.discountType == "amount") {
    return `Kod uprawniający do ${orderStore.discountCodeFullData.discountAmount} zł zniżki.\nPozostało ${orderStore.discountCodeFullData.discountAmountLeft} zł do wykorzystania.`;
  }
});

// Code error messages
const codeErrorMessages = computed(() => {
  switch (codeState.value) {
    case "not-found":
      return "Podany kod nie został odnaleziony";
    case "expired":
      return "Podany kod został już wykorzystany";
    default:
      return "";
  }
});
</script>
<template>
  <form class="flex flex-col gap-3" @submit.prevent="checkCodeHandler">
    <UTooltip
      :text="
        orderStore.isDiscountCodeApplied
          ? 'Usuń poprzedni kod aby aktywować nowy'
          : 'Wprowadź kod kuponu'
      "
      class="flex-1 flex items-start gap-3"
    >
      <UFormGroup :error="codeErrorMessages" class="flex-1">
        <UInput
          placeholder="Kod rabatowy"
          icon="solar-tag-price-outline"
          size="xl"
          v-model="inputValue"
          :loading="codeState == 'loading'"
          :disabled="orderStore.isDiscountCodeApplied"
        />
      </UFormGroup>
      <UButton
        size="xl"
        variant="solid"
        type="submit"
        :disabled="
          !inputValue.length ||
          codeState == 'loading' ||
          orderStore.isDiscountCodeApplied
        "
      >
        Zastosuj
      </UButton>
    </UTooltip>
    <UNotification
      v-if="orderStore.discountCodeFullData?.isAvailable"
      :id="orderStore.discountCodeFullData.id"
      class="shadow-none"
      color="green"
      icon="solar-check-circle-line-duotone"
      :close-button="{
        label: 'Usuń kod',
        icon: 'solar-trash-bin-2-line-duotone',
        color: 'red',
        variant: 'link',
      }"
      @close="removeCodeHandler"
      :title="`Wykorzystany kod: ${inputValue}`"
      :description="codeInfoMessage"
      :timeout="0"
    >
      <template #description="{ description }">
        <span class="whitespace-pre-line">
          {{ description }}
        </span>
      </template>
    </UNotification>
  </form>
</template>
