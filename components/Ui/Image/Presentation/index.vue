<script setup lang="ts">
const props = defineProps<{
  loaderImage?: string;
  shortenAnimations?: boolean;
  onLoad?: () => unknown;
  height: number;
  width: number;
}>();

defineOptions({
  inheritAttrs: false,
});

const { class: cssClass, ...attrs } = useAttrs();
const isLoaded = ref(false);
const imgRef = ref<HTMLImageElement>();

onMounted(() => {
  const interval = setInterval(() => {
    if (imgRef.value?.complete) {
      props.onLoad?.();
      isLoaded.value = true;
      clearInterval(interval);
    }
  }, 10);
});
</script>

<template>
  <figure
    :class="[
      'figure',
      cssClass,
      { loading: !isLoaded, shortAnimation: shortenAnimations },
    ]"
    :style="`--bg-url: url('${loaderImage}')`"
  >
    <img
      :class="['image', { loading: !isLoaded }]"
      ref="imgRef"
      v-bind="attrs"
      :width="width"
      :height="height"
    />
  </figure>
</template>
<style lang="scss" scoped>
.image {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  transition: opacity 150ms ease-out;

  &.loading {
    opacity: 0;
  }
}

.figure {
  position: relative;

  &.loading {
    background-image: var(--bg-url);
    background-size: cover;
    background-repeat: no-repeat;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(12px);
    opacity: 0;
    transition: opacity 150ms ease-out;
  }

  &.loading::after {
    opacity: 1;
  }
}

.shortAnimation::after,
.shortAnimation * {
  transition-duration: 50ms;
}
</style>
