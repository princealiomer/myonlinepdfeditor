import { mkdir, writeFile, access } from "fs/promises";
import path from "path";

const icons = {
  "pdf.png": "59859",
  "merge.png": "Cpgkj1eIudXG",
  "edit.png": "71201",
  "signature.png": "61375",
  "share.png": "98959",
  "ai.png": "Kni843UOUPxB",
  "convert.png": "59872",
  "compress.png": "78839",
  "lock.png": "59825",
  "download.png": "59783",
  "split.png": "62915",
  "search.png": "59878",
  "unlock.png": "60016",
  "export-pdf.png": "102687",
};

const dir = path.resolve("public/icons/icons8");
await mkdir(dir, { recursive: true });

for (const [name, id] of Object.entries(icons)) {
  const out = path.join(dir, name);
  try {
    await access(out);
    const { size } = await import("fs").then((fs) => fs.promises.stat(out));
    if (size > 100) {
      console.log("skip", name, size);
      continue;
    }
  } catch {
    // missing
  }
  const url = `https://img.icons8.com/?id=${encodeURIComponent(id)}&format=png&size=64`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("fail", name, res.status);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(out, buf);
  console.log("ok", name, buf.length);
}
