import type { Entity } from "../shared";

type CompanyAddress = {
  type: "company";
  nip: number;
  fullName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
};

type PrivateAddress = {
  type: "personal";
  fullName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
};

export type AddressBody = CompanyAddress | PrivateAddress;
export type AddressPayload = Entity<AddressBody>;
export type AddressData = AddressBody & { id: string };
