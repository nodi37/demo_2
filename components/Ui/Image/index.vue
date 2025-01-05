<script setup lang="ts">
type Sources = {
  mobile: string; // 700px
  standard: string; // 1080px
  big: string; // 1440px
  ultra: string; // 2170px
};

export type ImageDataProps = {
  alt: string;
  loaderUrl: string;
  sources: Sources;
  height: number;
  width: number;
};

type ImageSettingsProps = {
  /**
   * Overrides all the way up.
   * It means standard option will override standard, big and ultra.
   * You can override more than once.
   * Example:
   * When standard and big applied
   * standard will override only standard option,
   * big will override big and ultra option.
   * @example
   * const {image, bigImage} = props; // Both of type ImageProps
   * <Image {...image} overrideFrom={{big: bigImage.sources}} />
   */
  overrideFrom?: {
    standard?: Sources;
    big?: Sources;
    ultra?: Sources;
  };
  /**
   * mobile: 700px;
   * standard: 1080px;
   * big: 1440px;
   * default: 2170px;
   */
  maxSize?: "mobile" | "standard" | "big";
  priority?: boolean;
  onLoad?: () => unknown;
};

export type ImageProps = ImageDataProps & ImageSettingsProps;
const props = defineProps<ImageProps>();

// Sorting and order number finding
const breakpointsOrder = ["mobile", "standard", "big", "ultra"];

const getBreakpointOrder = (breakpoint: string) => {
  return breakpointsOrder.indexOf(breakpoint);
};

const sortSourcesArray = (sourcesArray: Array<[string, string]>) => {
  return sourcesArray.sort(
    (a, b) => breakpointsOrder.indexOf(a[0]) - breakpointsOrder.indexOf(b[0])
  );
};

/**
 * Takes original sources object and object of sources to override original sources
 * Overrides original sources in mobile first style
 * This means applying `standard` in `overridingSourcesObject` will override big and ultra breakpoints too
 */
const parseSourcesToSingleArray = (
  originalSources: ImageDataProps["sources"],
  overridingSourcesObject: ImageSettingsProps["overrideFrom"]
) => {
  const mainImageSourcesMap = new Map(Object.entries(originalSources));

  for (const key in overridingSourcesObject) {
    const breakpoint = key as keyof typeof overridingSourcesObject;
    const overridingSources = overridingSourcesObject[breakpoint];
    if (!overridingSources) continue;
    const overridingSourcesArray = Object.entries(overridingSources);
    const itemsSkipCount = getBreakpointOrder(breakpoint);
    const sourcesToUpdate = sortSourcesArray(overridingSourcesArray).slice(
      itemsSkipCount
    );
    sourcesToUpdate.forEach((source) =>
      mainImageSourcesMap.set(source[0], source[1])
    );
  }

  return sortSourcesArray(Array.from(mainImageSourcesMap));
};

/**
 * Removes sources of too big images
 */
const removeLimitedSources = (
  sourcesArray: Array<[string, string]>,
  maxSize: ImageSettingsProps["maxSize"]
) => {
  const maxSizeSourceOrder = getBreakpointOrder(maxSize ?? "");
  if (maxSizeSourceOrder < 0) return sourcesArray;
  return sortSourcesArray(sourcesArray).slice(0, maxSizeSourceOrder + 1);
};

/**
 * Creates srcset string property in format `https:\\example.com\image.png 700w, ...`
 */
const convertSourcesArrayToSrcset = (sourcesArray: Array<[string, string]>) => {
  const imageSizes = {
    mobile: "700w",
    standard: "1280w",
    big: "1920w",
    ultra: "2560w",
  };
  return sortSourcesArray(sourcesArray)
    .map((source) => {
      const imageUrl = encodeURI(source[1]);
      const imageRealWidth = imageSizes[source[0] as keyof typeof imageSizes];
      return `${imageUrl} ${imageRealWidth}`;
    })
    .join(",");
};

const parsedSourcesArray = parseSourcesToSingleArray(
  props.sources,
  props.overrideFrom
);
const limitedSourcesArray = removeLimitedSources(
  parsedSourcesArray,
  props.maxSize
);
const srcSetString = convertSourcesArrayToSrcset(limitedSourcesArray);
</script>
<template>
  <UiImagePresentation
    :alt="alt"
    :src="sources['standard']"
    :srcSet="srcSetString"
    sizes="(max-width: 700px) 700px, (max-width: 1280px) 1280px, (max-width: 1920px) 1920px, (max-width: 2560px) 2560px"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchPriority="priority ? 'high' : 'low'"
    :shortenAnimations="priority"
    :loaderImage="loaderUrl"
    :onLoad="onLoad"
    :width="width"
    :height="height"
  />
</template>
