import type { Entity } from "../shared";

export type CategoryPayload = Entity<{
  name: string;
  slug: string;
}>;

export type CategoryData = {
  id: string;
  name: string;
  slug: string;
};
