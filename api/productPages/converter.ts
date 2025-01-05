import { convertCategoryPayload } from "../category";
import { convertManufacturerPayload } from "../manufacturer";
import { convertImagePayload } from "../media";
import { convertProductPayload } from "../products";
import { convertRichTextPayload } from "../shared";
import type { ProductPagePayload, ProductPageData } from "./types";

export const convertProductPagePayload = (
  payload: ProductPagePayload
): ProductPageData => {
  const {
    category,
    shortDescription,
    description,
    productMap,
    manufacturer,
    gallery,
    ...rest
  } = payload;

  return {
    ...rest,
    category: convertCategoryPayload(category),
    manufacturer: convertManufacturerPayload(manufacturer),
    gallery: gallery.map(({ images, ...rest }) => ({
      ...rest,
      images: images.map(({ image }) => convertImagePayload(image)),
    })),
    productMap: productMap.map((mapData) => {
      return {
        ...mapData,
        product: convertProductPayload(mapData.product),
      };
    }),
    description: convertRichTextPayload(description),
    shortDescription: convertRichTextPayload(shortDescription),
  };
};
