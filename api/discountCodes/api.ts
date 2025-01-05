import type { Response } from "../shared";
import { convertDiscountCodePayload } from "./converter";

import type { DiscountCodePayload, DiscountCodeData } from "./types";

export const useDiscountCodesApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  //if (!API_URL) throw new Error("NO API_URL SET");

  const checkDiscountCode = async (
    code: string
  ): Promise<Response<DiscountCodeData>> => {
    try {
      // const req = await $fetch<DiscountCodePayload>(
      //   `${API_URL}/api/discountCodes/check/${code}`,
      //   {
      //     method: "get",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      if (code.toLowerCase() != "wiosna25") throw new Error("Code not found");
      return {
        success: true,
        data: convertDiscountCodePayload({
          id: "id",
          isAvailable: true,
          discountType: "percentage",
          discountAmountLeft: 25,
          discountAmount: 25,
          createdAt: "",
          updatedAt: "",
        }),
      };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  return {
    checkDiscountCode,
  };
};
