import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { createRequire } from "module";

// Re-read the already-exported tools JSON if present; otherwise parse from TS lightly.
const toolsPath = new URL("./i18n-tools-en.json", import.meta.url);
const tools = JSON.parse(readFileSync(toolsPath, "utf8"));

mkdirSync(new URL("../src/lib/i18n", import.meta.url), { recursive: true });
writeFileSync(
  new URL("../src/lib/i18n/source-tools-en.json", import.meta.url),
  JSON.stringify(tools, null, 2),
);
console.log("synced", tools.length, "tools to src/lib/i18n/source-tools-en.json");
