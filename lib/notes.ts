import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { defaultSchema, type Schema } from "hast-util-sanitize";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Blockquote, Nodes, Root } from "mdast";
import type { Note, NoteMeta } from "@/lib/types";

const notesDirectory = path.join(process.cwd(), "notes");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function asText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function asHandout(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const name = value.trim();
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*\.pdf$/.test(name)) return null;
  if (name.includes("..")) return null;

  return name;
}

function asDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return asText(value);
}

function noteFilePath(slug: string): string | null {
  if (!slugPattern.test(slug)) return null;
  return path.join(notesDirectory, `${slug}.md`);
}

function toMeta(slug: string, data: Record<string, unknown>): NoteMeta {
  return {
    slug,
    title: asText(data.title, slug),
    category: asText(data.category, "Notes"),
    summary: asText(data.summary),
    updated: asDate(data.updated),
  };
}

export function formatNoteDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;

  const date = new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])),
  );

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export const getAllNotes = cache((): NoteMeta[] => {
  if (!fs.existsSync(notesDirectory)) return [];

  return fs
    .readdirSync(notesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.slice(0, -3))
    .filter((slug) => slugPattern.test(slug))
    .flatMap((slug) => {
      const filePath = noteFilePath(slug);
      if (!filePath || !fs.existsSync(filePath)) return [];

      const file = fs.readFileSync(filePath, "utf8");
      const { data } = matter(file);
      return [toMeta(slug, data)];
    })
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
    );
});

export function getNoteSlugs(): string[] {
  return getAllNotes().map((note) => note.slug);
}

const calloutMarker = /^\[!(ALERT|STEP|SUMMARY)\]\s*/;

const calloutSchema: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    blockquote: [
      "cite",
      [
        "className",
        "callout",
        "callout-alert",
        "callout-step",
        "callout-summary",
      ],
    ],
  },
};

function remarkCallouts() {
  return (tree: Root) => {
    walkCallouts(tree);
  };
}

function walkCallouts(node: Nodes) {
  if (node.type === "blockquote") {
    tagCallout(node);
  }

  if ("children" in node && node.children) {
    for (const child of node.children) walkCallouts(child);
  }
}

function tagCallout(node: Blockquote) {
  const paragraph = node.children[0];
  if (paragraph?.type !== "paragraph") return;

  const text = paragraph.children[0];
  if (text?.type !== "text") return;

  const match = calloutMarker.exec(text.value);
  if (!match) return;

  node.data = {
    hProperties: {
      className: ["callout", `callout-${match[1].toLowerCase()}`],
    },
  };

  text.value = text.value.slice(match[0].length);
  if (!text.value) paragraph.children.shift();
  if (paragraph.children.length === 0) node.children.shift();
}

export const getNote = cache(async (slug: string): Promise<Note | null> => {
  const filePath = noteFilePath(slug);
  if (!filePath || !fs.existsSync(filePath)) return null;

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkCallouts)
    .use(remarkHtml, { sanitize: calloutSchema })
    .process(content);

  return {
    ...toMeta(slug, data),
    handout: asHandout(data.handout),
    contentHtml: processed.toString(),
  };
});
