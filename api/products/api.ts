import type { Response } from "../shared";
import { convertProductPayload } from "./converter";
import { fakeData } from "./fakeData";
import type { ProductData } from "./types";

export const useProductApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  //if (!API_URL) throw new Error("NO API_URL SET");

  const getProductById = async (id: string): Promise<Response<ProductData>> => {
    try {
      // const data = await $fetch<ProductPayload>(
      //   `${API_URL}/api/products/${id}?depth=999`,
      //   {
      //     method: "get",
      //     credentials: "include",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const productData = fakeData.find((product) => product.id == id);
      if (!productData) throw new Error("Product not found");
      return { success: true, data: convertProductPayload(productData) };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  return {
    getProductById,
  };
};
