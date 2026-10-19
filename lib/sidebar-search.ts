import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

const pageSources: Record<string, string[]> = {
  "/ec-triage": ["app/ec-triage/page.tsx"],
  "/hc-triage": ["app/hc-triage/page.tsx"],
  "/uti-triage": ["app/uti-triage/page.tsx"],
  "/impetigo-triage": ["app/impetigo-triage/page.tsx"],
  "/qld-law": ["lib/qld-law.ts", "components/qld-law", "app/qld-law"],
  "/vic-law": ["components/vic-law", "app/vic-law"],
  "/state-differences": ["components/state-differences", "app/state-differences"],
  "/otc-notes/otc-medicines": [
    "app/otc-notes/otc-medicines",
    "components/otc-notes/paracetamol.tsx",
  ],
  "/otc-notes/conditions": [
    "app/otc-notes/conditions",
    "components/otc-notes/pregnancy-treatments.tsx",
    "components/otc-notes/breastfeeding-treatments.tsx",
  ],
  "/counselling/common-s4-counselling": [
    "lib/s4-counselling.ts",
    "components/counselling/s4-counselling.tsx",
    "app/counselling/common-s4-counselling/page.tsx",
  ],
  "/counselling/cals": [
    "components/counselling/cals.tsx",
    "components/counselling/maoi-advice.tsx",
    "app/counselling/cals/page.tsx",
  ],
  "/counselling/inhaler-technique": [
    "components/counselling/inhaler-technique.tsx",
    "app/counselling/inhaler-technique/page.tsx",
  ],
  "/counselling/patch-counselling": [
    "components/counselling/patch-counselling.tsx",
    "app/counselling/patch-counselling/page.tsx",
  ],
  "/medicine-notes/asthma-copd-chart": [
    "components/medicine-notes/asthma-data.ts",
    "components/medicine-notes/asthma-copd-chart.tsx",
    "app/medicine-notes/asthma-copd-chart/page.tsx",
  ],
  "/medicine-notes/insulin-chart": [
    "components/medicine-notes/insulin-chart.tsx",
    "app/medicine-notes/insulin-chart/page.tsx",
  ],
  "/medicine-notes/medicinal-cannabis": [
    "components/medicine-notes/medicinal-cannabis.tsx",
    "app/medicine-notes/medicinal-cannabis/page.tsx",
  ],
};

function collectFiles(relativePath: string): string[] {
  const absolute = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(absolute)) return [];

  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];

  const files: string[] = [];
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const child = path.join(relativePath, entry.name);
    if (entry.isDirectory()) files.push(...collectFiles(child));
    else if (/\.(tsx|ts|md)$/.test(entry.name)) files.push(path.join(process.cwd(), child));
  }
  return files;
}

function readableText(source: string): string {
  const parts: string[] = [];
  const quoted = /(["'`])((?:\\.|(?!\1).){2,}?)\1/g;

  for (const match of source.matchAll(quoted)) {
    const value = match[2].replace(/\\n/g, " ").replace(/\\"/g, '"').trim();
    if (!/[A-Za-z]/.test(value)) continue;
    if (value.includes("${")) continue;
    if (/^(https?:|\/|\.|#|@)/.test(value)) continue;
    if (/^[a-z0-9_./:-]+$/.test(value)) continue;
    parts.push(value);
  }

  const visible = />([^<>{}][^<>{}]{1,})</g;
  for (const match of source.matchAll(visible)) {
    const value = match[1].replace(/\s+/g, " ").trim();
    if (value.length > 1 && /[A-Za-z]/.test(value)) parts.push(value);
  }

  return parts.join(" ");
}

function noteText(filePath: string): string {
  const raw = fs.readFileSync(filePath, "utf8");
  return raw
    .replace(/^---[\s\S]*?---/, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type SidebarSearch = {
  notes: Record<string, string>;
  pages: Record<string, string>;
};

export const getSidebarSearch = cache((): SidebarSearch => {
  const notes: Record<string, string> = {};
  const notesDirectory = path.join(process.cwd(), "notes");

  if (fs.existsSync(notesDirectory)) {
    for (const entry of fs.readdirSync(notesDirectory, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
      const slug = entry.name.slice(0, -3);
      notes[slug] = noteText(path.join(notesDirectory, entry.name));
    }
  }

  const pages: Record<string, string> = {};
  for (const [href, sources] of Object.entries(pageSources)) {
    const text = sources
      .flatMap((source) => collectFiles(source))
      .map((file) => readableText(fs.readFileSync(file, "utf8")))
      .join(" ");
    pages[href] = text;
  }

  return { notes, pages };
});
