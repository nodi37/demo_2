import { convertImagePayload } from "../media";
import type { RichTextData, RichTextPayload } from "./types";

export const convertRichTextPayload = (
  payload: RichTextPayload
): RichTextData => {
  return payload.map((node) => {
    if (node.type === "upload")
      return {
        ...node,
        value: convertImagePayload(node.value),
      };

    return node;
  });
};
