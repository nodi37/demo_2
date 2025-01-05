import type { Entity } from "../shared";

type DiscountCode = {
  isAvailable: boolean;
  discountType: "percentage" | "amount";
  discountAmount: number;
  discountAmountLeft: number;
};

export type DiscountCodePayload = Entity<DiscountCode>;
export type DiscountCodeData = DiscountCodePayload;
