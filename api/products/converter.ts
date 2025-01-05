import { convertManufacturerPayload } from "../manufacturer";
import { convertImagePayload } from "../media";
import type { ProductData, ProductPayload } from "./types";

export const convertProductPayload = (payload: ProductPayload): ProductData => {
  const { miniature, manufacturer, ...rest } = payload;

  return {
    ...rest,
    miniature: convertImagePayload(miniature),
    manufacturer: convertManufacturerPayload(manufacturer),
  };
};
