import type { UiRichTextProps } from "~/components/Ui/RichText/index.vue";
import type { ImagePayload } from "../media";

// Paginated response
type NextPageData =
  | { hasNextPage: true; nextPage: number }
  | { hasNextPage: false; nextPage: null };

type PrevPageData =
  | { hasPrevPage: true; prevPage: number }
  | { hasPrevPage: false; prevPage: null };

export type PaginatedResponse<T> = {
  docs: Array<T>;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
} & NextPageData &
  PrevPageData;

// Unified response
export type Response<T> =
  | { success: false; data?: undefined; message?: string }
  | { success: true; data: T };

// Payload entity
export type Entity<T> = {
  id: string;
  createdAt: string;
  updatedAt: string;
} & T;

// RichText
type BaseTextNode = {
  type?: "";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};

type LinkNode = {
  type: "link";
  url: string;
  children: Array<BaseTextNode>;
};

type PNode = {
  type?: undefined;
  children: Array<BaseTextNode | LinkNode>;
};

type ImageNode = {
  type: "upload";
  value: ImagePayload;
};

type HeadingNodes = {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: Array<BaseTextNode | LinkNode>;
};

type ListNodes = {
  type: "ul" | "ol";
  children: Array<{
    type: "li";
    children: Array<BaseTextNode | LinkNode>;
  }>;
};

export type RichTextPayload = Array<
  PNode | ImageNode | HeadingNodes | ListNodes
>;

export type RichTextData = UiRichTextProps;
