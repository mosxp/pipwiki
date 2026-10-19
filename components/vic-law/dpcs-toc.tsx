"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type TocItem = {
  id: string;
  label: string;
  children?: { id: string; label: string }[];
};

const toc: TocItem[] = [
  {
    id: "chapter-breakdown",
    label: "Chapter Breakdown",
    children: [{ id: "chapter-2-parts", label: "Chapter 2 parts" }],
  },
  { id: "definitions", label: "Definitions (Reg 5)" },
  {
    id: "prescriptions",
    label: "Prescriptions & Prescriber Eligibility",
    children: [
      { id: "prescriber-scopes", label: "Prescriber scopes (Reg 16)" },
      { id: "treatment-limits", label: "Treatment limits (Reg 17–23)" },
      { id: "prescription-particulars", label: "What a prescription must include" },
      { id: "physical-signature", label: "Physical signature (Reg 24(2))" },
      { id: "as-directed", label: "“As directed” (Reg 24(3)(f))" },
    ],
  },
  {
    id: "emergency-supply",
    label: "Emergency Supply & Transmission",
    children: [
      { id: "emergency-verbal", label: "Emergency verbal instructions (Reg 25)" },
      { id: "faxed-or-emailed", label: "Faxed or emailed prescription (Reg 25A)" },
    ],
  },
  {
    id: "pharmacist-sale",
    label: "Pharmacist Sale & Supply",
    children: [
      { id: "therapeutic-need", label: "Therapeutic need (Reg 45)" },
      { id: "s4-supply", label: "Schedule 4 supply (Reg 47)" },
      { id: "s4-restrictions", label: "Schedule 4 restrictions (Reg 50)" },
      { id: "s8-supply", label: "Schedule 8 supply (Reg 48)" },
      { id: "s8-restrictions", label: "Schedule 8 restrictions (Reg 51)" },
      { id: "emergency-s4", label: "Emergency supply (Reg 56)" },
      { id: "continued-dispensing", label: "Continued dispensing (Reg 57)" },
      { id: "pbs-continued", label: "PBS continued dispensing" },
      { id: "pharmacist-initiated", label: "Pharmacist-initiated supply (Reg 57A)" },
    ],
  },
  {
    id: "departing",
    label: "Departing from Prescriptions & Script Markings",
    children: [
      { id: "exceptional-circumstances", label: "Exceptional circumstances (Reg 53)" },
      { id: "marking", label: "Marking the prescription (Reg 60)" },
      { id: "retain-unverified", label: "Unverified Schedule 8 scripts (Reg 63)" },
      { id: "last-repeat", label: "Final Schedule 8 supply (Reg 64)" },
      { id: "three-year-retention", label: "Three-year retention (Reg 66)" },
      { id: "fraudulent-obtaining", label: "Fraudulent obtaining (Reg 69)" },
      { id: "overlapping-prescribers", label: "Overlapping prescribers (Reg 70)" },
    ],
  },
  {
    id: "storage-records",
    label: "Storage, Records & Destruction",
    children: [
      { id: "storage", label: "Storage (Reg 74)" },
      { id: "what-must-be-recorded", label: "What must be recorded (Reg 108)" },
      { id: "how-records-are-kept", label: "How records must be kept (Reg 109)" },
      { id: "discrepancies", label: "Discrepancies and loss (Reg 111–113)" },
      { id: "destruction", label: "Destruction (Reg 114–115)" },
    ],
  },
  {
    id: "warrants-permits",
    label: "Warrants & Special Permits",
    children: [
      { id: "warrants", label: "Warrants (Reg 118–125)" },
      { id: "s8-permits", label: "Schedule 8 permits (Reg 10)" },
      { id: "permits-and-pharmacists", label: "Permits and pharmacists" },
    ],
  },
];

function tocIdsFor(items: TocItem[]) {
  return items.flatMap((item) => [item.id, ...(item.children?.map((child) => child.id) ?? [])]);
}

function scrollParent(node: HTMLElement) {
  let current = node.parentElement;
  while (current) {
    const overflow = getComputedStyle(current).overflowY;
    if (overflow === "auto" || overflow === "scroll") return current;
    current = current.parentElement;
  }
  return null;
}

function TocLink({
  id,
  label,
  active,
  nested,
}: {
  id: string;
  label: string;
  active: boolean;
  nested?: boolean;
}) {
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "location" : undefined}
      className={[
        "block rounded-md border-l-2 py-1 leading-5 transition-colors",
        nested ? "pr-2 pl-4 text-[13px]" : "pr-2 pl-2.5 text-sm",
        active
          ? "border-moss bg-paper font-medium text-ink"
          : "border-transparent text-ink-soft hover:bg-paper/80 hover:text-ink",
      ].join(" ")}
    >
      {label}
    </a>
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

export function RefocusNav({
  items,
  collapsed = false,
  onToggle,
}: {
  items: TocItem[];
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  const tocIds = tocIdsFor(items);
  const navRef = useRef<HTMLElement>(null);
  const listId = useId();
  const [activeId, setActiveId] = useState(tocIds[0]);

  useEffect(() => {
    const nav = navRef.current;
    const scroller = nav ? scrollParent(nav) : null;
    if (!nav || !scroller) return;
    const navEl = nav;
    const scrollerEl = scroller;
    const ids = tocIdsFor(items);

    function currentId() {
      const line = scrollerEl.getBoundingClientRect().top + 48;
      let current = ids[0];
      for (const id of ids) {
        const heading = document.getElementById(id);
        if (heading && heading.getBoundingClientRect().top <= line) current = id;
      }
      return current;
    }

    function onScroll() {
      setActiveId(currentId());
    }

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      if (!link || !navEl.contains(link)) return;
      const id = link.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!id || !target) return;

      event.preventDefault();
      event.stopPropagation();
      const top =
        target.getBoundingClientRect().top -
        scrollerEl.getBoundingClientRect().top +
        scrollerEl.scrollTop -
        32;
      scrollerEl.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    }

    onScroll();
    scrollerEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick, true);
    return () => {
      scrollerEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick, true);
    };
  }, [items]);

  useEffect(() => {
    const link = navRef.current?.querySelector<HTMLElement>(`[data-toc-link="${activeId}"]`);
    const list = link?.closest<HTMLElement>("[data-toc-list]");
    if (!link || !list) return;

    const linkRect = link.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    if (linkRect.top < listRect.top || linkRect.bottom > listRect.bottom) {
      const delta = linkRect.top - listRect.top - listRect.height / 2 + linkRect.height / 2;
      list.scrollBy({ top: delta });
    }
  }, [activeId]);

  return (
    <nav
      ref={navRef}
      aria-label="On this page"
      className="lg:sticky lg:top-8 lg:self-start"
    >
      <div
        className={[
          "rounded-lg border border-line bg-paper-raised",
          collapsed ? "p-1.5" : "px-3 py-4",
        ].join(" ")}
      >
        <div className={collapsed ? "flex justify-center" : "flex items-center justify-between gap-2"}>
          {collapsed ? null : (
            <p className="px-2.5 text-[11px] font-medium tracking-[0.16em] text-moss uppercase">
              On this page
            </p>
          )}
          {onToggle ? (
            <button
              type="button"
              aria-expanded={!collapsed}
              aria-controls={listId}
              aria-label={collapsed ? "Show sections" : "Hide sections"}
              title={collapsed ? "Show sections" : "Hide sections"}
              onClick={onToggle}
              className="grid size-7 shrink-0 place-items-center rounded-full border border-moss bg-moss text-paper shadow-sm transition-colors hover:bg-[#244c3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
            >
              <Chevron direction={collapsed ? "right" : "left"} />
            </button>
          ) : null}
        </div>
        <div
          className={[
            "grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none",
            collapsed ? "grid-rows-[0fr]" : "mt-3 grid-rows-[1fr]",
          ].join(" ")}
        >
          <ul
            id={listId}
            data-toc-list=""
            inert={collapsed ? true : undefined}
            className={[
              "min-h-0 max-h-72 space-y-0.5 lg:max-h-[calc(100vh-8rem)]",
              collapsed ? "overflow-hidden" : "overflow-y-auto",
            ].join(" ")}
          >
            {items.map((item) => (
              <li key={item.id}>
                <span data-toc-link={item.id}>
                  <TocLink id={item.id} label={item.label} active={activeId === item.id} />
                </span>
                {item.children ? (
                  <ul className="mt-0.5 space-y-0.5">
                    {item.children.map((child) => (
                      <li key={child.id} data-toc-link={child.id}>
                        <TocLink id={child.id} label={child.label} active={activeId === child.id} nested />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function TocFrame({
  items,
  children,
  storageKey,
}: {
  items: TocItem[];
  children: ReactNode;
  storageKey?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!storageKey) return;
    setCollapsed(localStorage.getItem(`pipwiki-toc-${storageKey}`) === "hidden");
  }, [storageKey]);

  function toggle() {
    setCollapsed((current) => {
      const next = !current;
      if (storageKey) localStorage.setItem(`pipwiki-toc-${storageKey}`, next ? "hidden" : "shown");
      return next;
    });
  }

  return (
    <div
      className="mt-8 grid grid-cols-1 items-start gap-8 transition-[grid-template-columns] duration-300 ease-in-out motion-reduce:transition-none lg:[grid-template-columns:var(--toc-col)_minmax(0,1fr)]"
      style={{ ["--toc-col" as string]: collapsed ? "3.25rem" : "calc((100% - 6rem) / 4)" }}
    >
      <div className="sticky top-8 self-start overflow-hidden">
        <RefocusNav items={items} collapsed={collapsed} onToggle={toggle} />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function DpcsToc() {
  return <RefocusNav items={toc} />;
}
