import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const dir = dirname(fileURLToPath(import.meta.url));
const parts = ["de-i18n-part-a", "de-i18n-part-b", "de-i18n-part-c", "de-i18n-part-d", "de-i18n-part-e"];
const en = Object.assign(
  {},
  ...parts.map((p) => JSON.parse(readFileSync(join(dir, `${p}.json`), "utf8"))),
);
const enSlugs = JSON.parse(readFileSync(join(dir, "i18n-tools-en.json"), "utf8")).map(
  (t) => t.slug,
);

const keys = Object.keys(en);
const missing = enSlugs.filter((s) => !en[s]);
const extra = keys.filter((k) => !enSlugs.includes(k));
if (missing.length) throw new Error("Missing slugs: " + missing.join(", "));
if (extra.length) throw new Error("Extra slugs: " + extra.join(", "));

const outPath = join(dir, "..", "src", "lib", "i18n", "tools", "de.json");
writeFileSync(outPath, JSON.stringify(en, null, 2) + "\n", "utf8");
console.log("Wrote", keys.length, "tools to", outPath);