import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { formatNoteDate, getAllNotes } from "@/lib/notes";

const frontMatterExample = `---
title: Metformin
category: Endocrine
summary: One line on what the note is for.
updated: "2026-10-07"
---

The note itself is ordinary Markdown.`;

export default function Home() {
  const notes = getAllNotes();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12 md:px-10 md:py-20">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">
        Local markdown
      </p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight text-ink md:text-6xl">
        Pipwiki
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
        A quiet notebook for pharmacy revision. Each page is a Markdown file
        in <span className="font-mono text-[0.95rem]">notes/</span>, with the
        title and category written in front matter.
      </p>

      {notes.length === 0 ? (
        <p className="mt-12 text-ink-soft">
          The notebook is empty. Add a <code>.md</code> file to get started.
        </p>
      ) : (
        <ul className="mt-12 border-t border-line">
          {notes.map((note) => (
            <li key={note.slug} className="border-b border-line">
              <Link href={`/notes/${note.slug}`} className="group block py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-serif text-[1.65rem] leading-tight tracking-tight text-ink group-hover:text-moss">
                    {note.title}
                  </h2>
                  <span className="text-[11px] tracking-[0.14em] text-ink-soft uppercase">
                    {note.category}
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
                  {note.summary}
                </p>
                {note.updated ? (
                  <p className="mt-2 text-xs text-ink-soft">
                    Updated {formatNoteDate(note.updated)}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <section className="mt-14">
        <h2 className="text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase">
          Add a note
        </h2>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-sidebar px-4 py-3 font-mono text-xs leading-6 text-ink">
          {frontMatterExample}
        </pre>
      </section>

      <Disclaimer />
    </div>
  );
}
