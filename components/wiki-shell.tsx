"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NoteMeta } from "@/lib/types";

function groupByCategory(notes: NoteMeta[]) {
  const groups: { category: string; notes: NoteMeta[] }[] = [];

  for (const note of notes) {
    const current = groups[groups.length - 1];
    if (current && current.category === note.category) {
      current.notes.push(note);
    } else {
      groups.push({ category: note.category, notes: [note] });
    }
  }

  return groups;
}

function linkClass(active: boolean) {
  return [
    "block rounded-r-md border-l-2 py-1.5 pr-2.5 pl-2.5 text-sm leading-5 transition-colors",
    active
      ? "border-moss bg-paper-raised font-medium text-ink"
      : "border-transparent text-ink/80 hover:bg-paper/70 hover:text-ink",
  ].join(" ");
}

export function WikiShell({
  notes,
  children,
}: {
  notes: NoteMeta[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const open = openPath === pathname;

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const needle = query.trim().toLocaleLowerCase();
  const visible = needle
    ? notes.filter((note) =>
        [note.title, note.category, note.summary].some((field) =>
          field.toLocaleLowerCase().includes(needle),
        ),
      )
    : notes;
  const groups = groupByCategory(visible);

  return (
    <div className="flex h-full min-h-0">
      {open ? (
        <button
          type="button"
          aria-label="Close notes"
          className="fixed inset-0 z-30 bg-ink/30 md:hidden"
          onClick={() => setOpenPath(null)}
        />
      ) : null}

      <aside
        id="notes-nav"
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-[min(18rem,86vw)] flex-col border-r border-line bg-sidebar transition-transform duration-200 md:static md:z-auto md:w-72 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link
                href="/"
                className="font-serif text-[1.65rem] leading-none tracking-tight text-ink"
              >
                Pipwiki
              </Link>
              <p className="mt-2 text-[11px] tracking-[0.18em] text-ink-soft uppercase">
                Pharmacy notes
              </p>
            </div>
            <button
              type="button"
              className="mt-1 text-sm text-ink-soft md:hidden"
              onClick={() => setOpenPath(null)}
            >
              Close
            </button>
          </div>

          <div className="relative mt-6">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notes"
              aria-label="Search notes"
              className="w-full border-b border-line bg-transparent py-2 pr-12 text-sm text-ink outline-none placeholder:text-ink-soft/70 focus:border-moss"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-0 -translate-y-1/2 text-xs text-ink-soft hover:text-ink"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>

        <nav
          aria-label="Notes"
          className="min-h-0 flex-1 overflow-y-auto px-3 pb-4"
        >
          {groups.length === 0 ? (
            <p className="px-2.5 py-4 text-sm leading-6 text-ink-soft">
              {notes.length === 0
                ? "No Markdown files in notes/ yet."
                : `No notes match “${query.trim()}”.`}
            </p>
          ) : (
            groups.map((group) => (
              <section key={group.category} className="mb-5">
                <h2 className="px-2.5 pb-1 text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase">
                  {group.category}
                </h2>
                <ul>
                  {group.notes.map((note) => {
                    const href = `/notes/${note.slug}`;
                    const active = pathname === href;

                    return (
                      <li key={note.slug}>
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          className={linkClass(active)}
                        >
                          {note.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))
          )}
        </nav>

        <p className="border-t border-line px-5 py-4 text-[11px] leading-5 text-ink-soft">
          {notes.length} {notes.length === 1 ? "note" : "notes"} in{" "}
          <span className="font-mono text-[10px]">notes/</span>
        </p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-paper/95 px-4 backdrop-blur-sm md:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="notes-nav"
            onClick={() => setOpenPath(pathname)}
            className="rounded-md px-2 py-1 text-sm text-ink"
          >
            Index
          </button>
          <Link href="/" className="font-serif text-lg tracking-tight">
            Pipwiki
          </Link>
        </header>

        <div
          ref={scrollerRef}
          className="min-h-0 flex-1 overflow-y-auto pt-14 md:pt-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
