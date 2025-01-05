import type { ManufacturerData, ManufacturerPayload } from "../manufacturer";

import type { ImageData, ImagePayload } from "../media";
import type { Entity } from "../shared";

export type ProductPayload = Entity<{
  miniature: ImagePayload;
  manufacturer: ManufacturerPayload;
  name: string;
  code: string;
  fakturaId: string;
  ean: string;
  modelName: string;
  variantName: string;
  nettoPrice: number;
  vatTaxRate: number;
  bruttoPrice: number;
  imgUrl: string;
  availability: number;
  lastLowestPrice: number;
  productPageSlug: string;
}>;

export type ProductData = {
  id: string;
  miniature: ImageData;
  manufacturer: ManufacturerData;
  name: string;
  code: string;
  fakturaId: string;
  ean: string;
  modelName: string;
  variantName: string;
  nettoPrice: number;
  vatTaxRate: number;
  bruttoPrice: number;
  createdAt: string;
  updatedAt: string;
  imgUrl: string;
  availability: number;
  lastLowestPrice: number;
  productPageSlug: string;
};
