import type { Response } from "../shared";
import { convertProductPagePayload } from "./converter";
import { fakeData } from "./fakeData";
import type { ProductPageData } from "./types";

export const useProductPageApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  //if (!API_URL) throw new Error("NO API_URL SET");

  const getProductPageByUrl = async (
    url: string
  ): Promise<Response<ProductPageData>> => {
    try {
      // const req = await $fetch<PaginatedResponse<ProductPagePayload>>(
      //   `${API_URL}/api/productPages?where[slug][equals]=${url}&depth=999`,
      //   {
      //     method: "get",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // const data = req.docs[0];
      // if (!data) return { success: false };
      const data = fakeData.find((entry) => entry.slug.includes(url));
      // console.log(data);
      if (!data) throw new Error("Not found");
      return { success: true, data: convertProductPagePayload(data) };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  return {
    getProductPageByUrl,
  };
};
