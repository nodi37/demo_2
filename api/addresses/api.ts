import type { PaginatedResponse, Response } from "../shared";
import { convertAddressPayload } from "./converter";
import type { AddressBody, AddressData, AddressPayload } from "./types";

export const useAddressesApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  //if (!API_URL) throw new Error("NO API_URL SET");

  const getAddressesByUserId = async (
    userId: string
  ): Promise<Response<Array<AddressData>>> => {
    try {
      const req = await $fetch<PaginatedResponse<AddressPayload>>(
        `${API_URL}/api/addresses?where[owner][equals]=${userId}&depth=999`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = req.docs;
      if (!data) return { success: false };
      return {
        success: true,
        data: data.map((addressData) => convertAddressPayload(addressData)),
      };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const saveNewAddress = async (
    userId: string,
    addressData: AddressBody
  ): Promise<Response<AddressData["id"]>> => {
    try {
      const req = await $fetch<{ doc: AddressPayload }>(
        `${API_URL}/api/addresses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner: userId,
            ...addressData,
          }),
        }
      );

      return { success: true, data: req.doc.id };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const updateAddress = async (
    addressData: AddressData
  ): Promise<Response<AddressData["id"]>> => {
    try {
      const req = await $fetch<{ doc: AddressPayload }>(
        `${API_URL}/api/addresses/${addressData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressData),
        }
      );
      const { id } = req.doc;

      return { success: true, data: id };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const deleteAddressById = async (id: string) => {
    try {
      await $fetch(`${API_URL}/api/addresses/${id}`, {
        method: "DELETE",
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  return {
    saveNewAddress,
    updateAddress,
    deleteAddressById,
    getAddressesByUserId,
  };
};
