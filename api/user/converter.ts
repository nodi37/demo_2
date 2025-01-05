import { convertProductPayload } from "../products";
import type { UserData, UserPayload } from "./types";

export const convertUserPayload = (payload: UserPayload): UserData => {
  const { cart, ...rest } = payload;
  return {
    ...rest,
    cart: cart.map(({ product, ...rest }) => ({
      ...rest,
      product: convertProductPayload(product),
    })),
  };
};
