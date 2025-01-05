<script setup lang="ts">
import type { ImageDataProps } from "~/components/Ui/Image/index.vue";

const props = defineProps<{
  images: Array<{ id?: string; label?: string; image: ImageDataProps }>;
  identifier: string;
}>();
const choosenElement = ref(0);
const imageData = computed(() => props.images[choosenElement.value]);
watch(
  () => props.identifier,
  (nV) => {
    const index = props.images.findIndex((imageData) => imageData.id === nV);
    if (isNaN(index)) return;
    choosenElement.value = index;
    if (window.innerWidth > 768) {
      const element = document.getElementById(imageData.value.id!);
      // Powinno zostać lepiej przetestowane to id
      element?.scrollIntoView({ block: "end" });
    }
  }
);
</script>
<template>
  <div class="flex flex-col">
    <UiImage
      v-bind="imageData.image"
      :key="choosenElement"
      max-size="standard"
      class="w-full h-auto aspect-1"
      :priority="!choosenElement"
    />
    <span class="text-xs mb-3 text-gray-500">{{ imageData.label }}</span>
    <div class="flex gap-4 overflow-auto py-2">
      <button
        v-for="(image, index) in images"
        @click="choosenElement = index"
        :class="[
          'block cursor-pointer border-4 transition-colors',
          choosenElement == index ? 'border-primary-500' : 'border-slate-100',
        ]"
        :id="image.id"
      >
        <UiImage
          class="h-28 aspect-1 block"
          v-bind="image.image"
          max-size="mobile"
        />
      </button>
    </div>
  </div>
</template>
