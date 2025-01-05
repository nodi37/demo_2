import { convertImagePayload } from "../media";
import type { ManufacturerData, ManufacturerPayload } from "./types";

export const convertManufacturerPayload = (
  payload: ManufacturerPayload
): ManufacturerData => {
  const { logo, ...rest } = payload;

  return {
    ...rest,
    logo: convertImagePayload(logo),
  };
};
