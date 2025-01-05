import type { ImageDataProps } from "~/components/Ui/Image/index.vue";
import type { Entity } from "../shared";

type SizeData = {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
  url: string;
};

export type ImagePayload = Entity<{
  alt: string;
  b64loader: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  sizes: Record<"loader" | "mobile" | "standard" | "big", SizeData>;
  url: string;
}>;

export type ImageData = ImageDataProps;
