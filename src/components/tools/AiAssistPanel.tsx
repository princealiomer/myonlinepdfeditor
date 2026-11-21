"use client";

import { useState, useTransition } from "react";
import type { Tool } from "@/lib/catalog";
import type { Dictionary } from "@/lib/i18n";
import { FileDropzone } from "@/components/FileDropzone";
import {
  ToolResultBanner,
  type ToolDownload,
} from "@/components/tools/ToolResultBanner";
import { downloadBlob, extractPdfText, fileToUint8Array } from "@/lib/pdf";

export function AiAssistPanel({
  tool,
  dict,
}: {
  tool: Tool;
  dict?: Dictionary;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [lastDownload, setLastDownload] = useState<ToolDownload | null>(null);
  const w = dict?.workspace;

  function run() {
    setError(null);
    setOutput(null);
    setMessage(null);
    setLastDownload(null);
    startTransition(async () => {
      try {
        if (!files[0]) throw new Error("Upload a PDF first.");
        const extracted = await extractPdfText(await fileToUint8Array(files[0]));
        const text = extracted.fullText.trim();
        if (!text) throw new Error("No extractable text found in this PDF.");

        let result = "";
        if (tool.slug === "summarize-key-points") {
          result = summarizeLocally(text);
        } else if (tool.slug === "simplify-document") {
          result = simplifyLocally(text);
        } else if (tool.slug === "ask-document") {
          if (!question.trim()) throw new Error("Enter a question.");
          result = answerLocally(text, question.trim());
        } else if (tool.slug === "translate-pdf") {
          result = [
            "Translation-ready extract (local, no cloud MT API)",
            "Paste into your preferred translator, or keep as source text.",
            "",
            text.slice(0, 20000),
          ].join("\n");
        } else {
          result = assistantOverview(text);
        }

        setOutput(result);
        const download = downloadBlob(
          new Blob([result], { type: "text/plain;charset=utf-8" }),
          `myonlinepdfeditor-${tool.slug}.txt`,
        );
        setLastDownload(download);
        setMessage(w?.done || "Done — your download should start automatically.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "AI assist failed.");
      }
    });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <FileDropzone
        accept=".pdf,application/pdf"
        files={files}
        onFiles={setFiles}
        label={(w?.uploadFor || "Upload for {name}").replace("{name}", tool.shortName)}
        hint={w?.localAiHint || "Text is extracted in your browser. No cloud AI API is called."}
        dropLabel={w?.dropHere}
        browseLabel={w?.orBrowse}
        removeLabel={w?.remove}
      />
      <section className="surface rounded-2xl p-5">
        <h2 className="text-lg font-semibold">{tool.shortName}</h2>
        <p className="mt-1 text-sm text-muted">{tool.summary}</p>
        {tool.slug === "ask-document" && (
          <div className="field mt-4">
            <label htmlFor="ai-question">{w?.askQuestion || "Your question"}</label>
            <input
              id="ai-question"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What is the deadline mentioned?"
            />
          </div>
        )}
        <button
          type="button"
          className="btn btn-accent mt-4 min-h-12 w-full"
          disabled={pending}
          onClick={run}
        >
          {pending ? w?.analyzing || "Analyzing…" : w?.runLocally || "Run locally"}
        </button>
        <ToolResultBanner
          pending={pending}
          error={error}
          message={message}
          download={lastDownload}
          labels={{
            working: w?.working || "Working…",
            downloadAgain: w?.downloadAgain || "Download again",
            readyTitle: w?.readyTitle || "Download ready",
          }}
        />
        {output && (
          <pre className="mt-4 max-h-80 overflow-auto rounded-lg bg-paper p-3 text-xs whitespace-pre-wrap">
            {output}
          </pre>
        )}
      </section>
    </div>
  );
}

function sentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40);
}

function summarizeLocally(text: string): string {
  const list = sentences(text);
  const picks = list.filter((_, i) => i % Math.max(1, Math.floor(list.length / 8)) === 0).slice(0, 8);
  return ["Key points (local extract):", "", ...picks.map((s, i) => `${i + 1}. ${s}`)].join("\n");
}

function simplifyLocally(text: string): string {
  const list = sentences(text).slice(0, 12);
  return [
    "Simplified reading draft (local):",
    "",
    ...list.map((s) =>
      s
        .replace(/\butilize\b/gi, "use")
        .replace(/\bapproximately\b/gi, "about")
        .replace(/\bin order to\b/gi, "to"),
    ),
  ].join("\n");
}

function answerLocally(text: string, question: string): string {
  const terms = question
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 3);
  const hits = sentences(text)
    .map((s) => ({
      s,
      score: terms.reduce((acc, t) => acc + (s.toLowerCase().includes(t) ? 1 : 0), 0),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (!hits.length) {
    return `No strong matches for “${question}”. Try different keywords.`;
  }
  return [
    `Answers for: ${question}`,
    "",
    ...hits.map((h, i) => `${i + 1}. ${h.s}`),
  ].join("\n");
}

function assistantOverview(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const list = sentences(text);
  return [
    "Document assistant overview (local):",
    "",
    `Approx. words: ${words}`,
    `Extracted sentences: ${list.length}`,
    "",
    "Opening excerpt:",
    list.slice(0, 3).join(" "),
    "",
    "Closing excerpt:",
    list.slice(-2).join(" "),
  ].join("\n");
}
