/**
 * Canonical tool nav matching the DocHub-style footer taxonomy.
 * Every entry maps to a /tools/{slug} page.
 * Built from TOOLS so catalog and nav stay in sync.
 */
import { TOOLS, type ToolCategory } from "./tools";

export type NavGroup = {
  label: string;
  items: { label: string; slug: string }[];
};

const CATEGORY_LABEL: Record<ToolCategory, string> = {
  convert: "Convert",
  edit: "Edit & Annotate",
  sign: "Sign & Send",
  share: "Collaborate & Share",
  ai: "AI Features",
  other: "Others",
};

const CATEGORY_ORDER: ToolCategory[] = [
  "convert",
  "edit",
  "sign",
  "share",
  "ai",
  "other",
];

export const NAV_TOOL_GROUPS: NavGroup[] = CATEGORY_ORDER.map((id) => ({
  label: CATEGORY_LABEL[id],
  items: TOOLS.filter((t) => t.category === id).map((t) => ({
    label: t.name,
    slug: t.slug,
  })),
}));

export function allNavToolSlugs(): string[] {
  return NAV_TOOL_GROUPS.flatMap((group) => group.items.map((item) => item.slug));
}
