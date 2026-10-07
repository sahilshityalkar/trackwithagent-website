import { isValidElement, type ReactNode } from "react";

/** Plain text of a React node tree, for heading ids and the table of contents. */
export function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

/** "12. Grievance Officer" → "grievance-officer". Leading section numbers are dropped. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/^\s*\d+(\.\d+)*\.?\s*/, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
