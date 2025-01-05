import type { ImageDataProps } from "~/components/Ui/Image/index.vue";
import type { ImagePayload } from "./types";

export const convertImagePayload = (payload: ImagePayload): ImageDataProps => {
  const { alt, sizes, b64loader, url, height, width } = payload;
  const sizeSourcesObj = Object.fromEntries(
    Object.entries(sizes).map(([key, data]) => [key, data.url])
  ) as Record<"loader" | "mobile" | "standard" | "big", string>;

  return {
    height,
    width,
    loaderUrl: b64loader,
    alt,
    sources: { ...sizeSourcesObj, ultra: url },
  };
};
