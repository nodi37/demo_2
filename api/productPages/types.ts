import type { ProductData, ProductPayload } from "../products";
import type { ImageData, ImagePayload } from "../media";
import type { ManufacturerData, ManufacturerPayload } from "../manufacturer";
import type { CategoryData, CategoryPayload } from "../category";
import type { RichTextData, Entity, RichTextPayload } from "../shared";

export type ProductPagePayload = Entity<{
  metaTitle: string;
  metaDescription: string;
  name: string;
  slug: string;
  category: CategoryPayload;
  gallery: Array<{
    label: string;
    identifier: string;
    images: Array<{ image: ImagePayload }>;
  }>;
  shortDescription: RichTextPayload;
  description: RichTextPayload;
  productMap: Array<{
    label: string;
    identifier: string;
    product: ProductPayload;
  }>;
  parameters: Array<{ key: string; value: string }>;
  manufacturer: ManufacturerPayload;
}>;

export type ProductPageData = {
  id: string;
  metaTitle: string;
  metaDescription: string;
  name: string;
  slug: string;
  category: CategoryData;
  gallery: Array<{
    label: string;
    identifier: string;
    images: Array<ImageData>;
  }>;
  shortDescription: RichTextData;
  description: RichTextData;
  productMap: Array<{
    label: string;
    identifier: string;
    product: ProductData;
  }>;
  createdAt: string;
  updatedAt: string;
  parameters: Array<{ key: string; value: string }>;
  manufacturer: ManufacturerData;
};
