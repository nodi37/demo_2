<script setup lang="ts">
import type { ImageDataProps } from "~/components/Ui/Image/index.vue";

export type ProductSelectProps = {
  productMap: Array<{
    id: string;
    label: string;
    image: ImageDataProps;
    disabled?: boolean;
  }>;
};

defineProps<ProductSelectProps>();
const model = defineModel<number>();
</script>

<template>
  <fieldset class="w-full min-w-0 [&_*]:select-none">
    <legend class="mb-2 text-sm font-medium text-slate-600">
      Wybierz typ:
    </legend>
    <div class="flex flex-wrap gap-2 overflow-hidden">
      <label
        v-for="(entry, index) in productMap"
        :class="[
          'flex flex-col justify-center items-center gap-1 cursor-pointer border-2 transition-colors p-1',
          model == index ? 'border-primary-500' : 'border-slate-100',
          entry.disabled ? 'opacity-30' : '',
        ]"
      >
        <input
          class="hidden"
          type="radio"
          name="type"
          :value="index"
          v-model="model"
        />
        <UiImage
          class="w-16 h-16"
          v-bind="entry.image"
          max-size="mobile"
          draggable="false"
        />
        <span class="text-xs">{{ entry.label }}</span>
      </label>
    </div>
  </fieldset>
</template>
