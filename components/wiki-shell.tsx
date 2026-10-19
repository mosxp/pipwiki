"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarSearch } from "@/lib/sidebar-search";
import type { NoteMeta } from "@/lib/types";

const SIDEBAR_KEY = "pipwiki-sidebar";

const categoryClass =
  "mb-1 border-b border-moss px-2.5 pb-1 text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase";

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

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

const clinicalTools = [
  { href: "/ec-triage", title: "Emergency contraception" },
  { href: "/hc-triage", title: "Resupply of Hormonal Contraception" },
  { href: "/uti-triage", title: "UTI Management" },
  { href: "/impetigo-triage", title: "Impetigo Management" },
];

const lawLinks = [
  { href: "/qld-law", title: "QLD Law" },
  { href: "/vic-law", title: "VIC Law" },
  { href: "/state-differences", title: "State Differences" },
];

const otcLinks = [
  { href: "/otc-notes/otc-medicines", title: "OTC Medicines" },
  { href: "/otc-notes/conditions", title: "Conditions" },
];

const counsellingLinks = [
  { href: "/counselling/common-s4-counselling", title: "Common S4 Counselling" },
  { href: "/counselling/cals", title: "CALs" },
  { href: "/counselling/inhaler-technique", title: "Inhaler Technique" },
  { href: "/counselling/patch-counselling", title: "Patch counselling" },
];

const medicineLinks = [
  { href: "/medicine-notes/asthma-copd-chart", title: "Asthma & COPD Medications Chart" },
  { href: "/medicine-notes/insulin-chart", title: "Insulin Chart" },
  { href: "/medicine-notes/medicinal-cannabis", title: "Medicinal Cannabis" },
];

function searchTerms(query: string) {
  return query
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function matchesQuery(query: string, ...fields: Array<string | undefined>) {
  const terms = searchTerms(query);
  if (terms.length === 0) return true;
  const haystack = fields.filter(Boolean).join(" ").toLocaleLowerCase();
  return terms.every((term) => haystack.includes(term));
}

function CategoryHeading({ children }: { children: React.ReactNode }) {
  return <h2 className={categoryClass}>{children}</h2>;
}

function SidebarToggle({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={!collapsed}
      aria-controls="notes-nav"
      aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
      title={collapsed ? "Show sidebar" : "Hide sidebar"}
      onClick={onToggle}
      className={[
        "absolute top-5 z-50 hidden size-7 place-items-center rounded-full border border-moss bg-moss text-paper shadow-sm transition-colors hover:bg-[#244c3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss md:grid",
        collapsed ? "left-2" : "right-0 translate-x-1/2",
      ].join(" ")}
    >
      <Chevron direction={collapsed ? "right" : "left"} />
    </button>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
      <path
        d={direction === "left" ? "M10 3.5 5.5 8 10 12.5" : "M6 3.5 10.5 8 6 12.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WikiShell({
  notes,
  search,
  children,
}: {
  notes: NoteMeta[];
  search: SidebarSearch;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const open = openPath === pathname;

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    setCollapsed(localStorage.getItem(SIDEBAR_KEY) === "hidden");
  }, []);

  useEffect(() => {
    navRef.current?.scrollTo({ top: 0 });
  }, [query]);

  function toggleSidebar() {
    setCollapsed((current) => {
      const next = !current;
      localStorage.setItem(SIDEBAR_KEY, next ? "hidden" : "shown");
      return next;
    });
  }

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const needle = query.trim();
  const path = normalizePath(pathname);
  const visible = needle
    ? notes.filter((note) =>
        matchesQuery(
          needle,
          note.title,
          note.category,
          note.summary,
          search.notes[note.slug],
        ),
      )
    : notes;
  const groups = groupByCategory(visible);
  const tools = clinicalTools.filter((tool) =>
    matchesQuery(needle, "clinical tools", tool.title, "triage", search.pages[tool.href]),
  );
  const laws = lawLinks.filter((item) =>
    matchesQuery(needle, "law", "pharmacy", item.title, search.pages[item.href]),
  );
  const otc = otcLinks.filter((item) =>
    matchesQuery(needle, "otc notes", item.title, search.pages[item.href]),
  );
  const counselling = counsellingLinks.filter((item) =>
    matchesQuery(needle, "counselling", item.title, search.pages[item.href]),
  );
  const medicine = medicineLinks.filter((item) =>
    matchesQuery(needle, "medicine notes", item.title, search.pages[item.href]),
  );
  const counsellingInNotes = groups.some((group) => group.category === "Counselling");
  const matchCount = needle
    ? tools.length +
      laws.length +
      otc.length +
      medicine.length +
      (counsellingInNotes ? 0 : counselling.length) +
      groups.reduce(
        (count, group) =>
          count + group.notes.length + (group.category === "Counselling" ? counselling.length : 0),
        0,
      )
    : null;

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

      <div
        className={[
          "relative z-30 h-full w-0 shrink-0 overflow-visible transition-[width] duration-300 ease-in-out motion-reduce:transition-none",
          collapsed ? "md:w-0" : "md:w-72",
        ].join(" ")}
      >
      <aside
        id="notes-nav"
        inert={collapsed && !open ? true : undefined}
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-[min(18rem,86vw)] flex-col border-r border-line bg-sidebar transition-transform duration-300 ease-in-out motion-reduce:transition-none md:absolute md:w-72",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed ? "md:-translate-x-full" : "md:translate-x-0",
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
          {matchCount !== null ? (
            <p aria-live="polite" className="mt-2 text-[11px] text-ink-soft">
              {matchCount === 0
                ? "No matching pages"
                : `${matchCount} matching ${matchCount === 1 ? "page" : "pages"}`}
            </p>
          ) : null}
        </div>

        <nav
          ref={navRef}
          aria-label="Notes"
          className="min-h-0 flex-1 overflow-y-auto px-3 pb-4"
        >
          {tools.length > 0 ? (
            <section className="mb-5">
              <CategoryHeading>Clinical Tools</CategoryHeading>
              <ul>
                {tools.map((tool) => {
                  const active = path === tool.href;
                  return (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        aria-current={active ? "page" : undefined}
                        className={linkClass(active)}
                      >
                        {tool.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {laws.length > 0 ? (
            <section className="mb-5">
              <CategoryHeading>LAW</CategoryHeading>
              <ul>
                {laws.map((item) => {
                  const active = path === item.href || path.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={linkClass(active)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {otc.length > 0 ? (
            <section className="mb-5">
              <CategoryHeading>OTC Notes</CategoryHeading>
              <ul>
                {otc.map((item) => {
                  const active = path === item.href || path.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={linkClass(active)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {!counsellingInNotes && counselling.length > 0 ? (
            <section className="mb-5">
              <CategoryHeading>Counselling</CategoryHeading>
              <ul>
                {counselling.map((item) => {
                  const active = path === item.href || path.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={linkClass(active)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {medicine.length > 0 ? (
            <section className="mb-5">
              <CategoryHeading>Medicine Notes</CategoryHeading>
              <ul>
                {medicine.map((item) => {
                  const active = path === item.href || path.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={linkClass(active)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {groups.length === 0 &&
          tools.length === 0 &&
          laws.length === 0 &&
          otc.length === 0 &&
          counselling.length === 0 &&
          medicine.length === 0 ? (
            <p className="px-2.5 py-4 text-sm leading-6 text-ink-soft">
              {notes.length === 0
                ? "No Markdown files in notes/ yet."
                : `No notes match “${query.trim()}”.`}
            </p>
          ) : (
            groups.map((group) => (
              <section key={group.category} className="mb-5">
                <CategoryHeading>{group.category}</CategoryHeading>
                <ul>
                  {group.category === "Counselling"
                    ? counselling.map((item) => {
                        const active = path === item.href || path.startsWith(`${item.href}/`);
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              aria-current={active ? "page" : undefined}
                              className={linkClass(active)}
                            >
                              {item.title}
                            </Link>
                          </li>
                        );
                      })
                    : null}
                  {group.notes.map((note) => {
                    const href = `/notes/${note.slug}`;
                    const active = path === href;

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
      <SidebarToggle collapsed={collapsed} onToggle={toggleSidebar} />
      </div>

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
          className="min-h-0 flex-1 scroll-smooth overflow-y-auto pt-14 md:pt-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
