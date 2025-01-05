import type { ProductPayload, ProductData } from "../products";

export type SignUpArgs = {
  email: string;
  password: string;
  marketingConsent: boolean;
};

export type LogInArgs = {
  email: string;
  password: string;
};

export type UserPayload = {
  id: string;
  marketingConsent: boolean;
  email: string;
  cart: Array<{
    quantity: number;
    priceWhenAdded: number;
    withdrawn?: boolean;
    product: ProductPayload;
  }>;
};

export type SignUpResponse = {
  message: string;
  doc: UserPayload;
};

export type LogInResponseObject =
  | {
      exp: number;
      token: string;
      user: UserPayload;
    }
  | { user: null };

export type UserData = {
  id: string;
  marketingConsent: boolean;
  email: string;
  cart: Array<{
    quantity: number;
    priceWhenAdded: number;
    withdrawn?: boolean;
    product: ProductData;
  }>;
};
