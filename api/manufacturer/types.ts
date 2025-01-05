import type { ImageData, ImagePayload } from "../media";
import type { Entity } from "../shared";

export type ManufacturerPayload = Entity<{
  name: string;
  logo: ImagePayload;
}>;

export type ManufacturerData = {
  id: string;
  name: string;
  logo: ImageData;
};
