"use client";

import { useState } from "react";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { qldLawSections, type LawNode } from "@/lib/qld-law";

function TopicLink({ topic }: { topic: LawNode }) {
  return (
    <li>
      <Link
        href={`/qld-law/${topic.slug}`}
        className="block rounded-md px-2 py-1.5 text-sm leading-6 text-ink/90 hover:bg-paper hover:text-ink"
      >
        {topic.title}
      </Link>
    </li>
  );
}

function TopicList({ topics }: { topics: LawNode[] }) {
  return (
    <ul className="-mx-2">
      {topics.map((topic) => (
        <TopicLink key={topic.slug} topic={topic} />
      ))}
    </ul>
  );
}

type QuickLink = {
  name: string;
  href?: string;
  nested?: boolean;
};

const quickLinkGroups: { category: string; links: QuickLink[] }[] = [
  {
    category: "State-based law",
    links: [
      {
        name: "Medicines and Poisons Act (MPA) 2019",
        href: "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2019-026",
      },
      { name: "Medicines and Poisons Regulation (MPR) 2021" },
      {
        name: "MP(M)R - (Medicines)",
        href: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2021-0140",
        nested: true,
      },
      {
        name: "MP(PP)R - (Poisons & Prohibited Substances)",
        href: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2021-0141",
        nested: true,
      },
      {
        name: "MP(PM)R - (Pest Management Activities)",
        href: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2021-0142",
        nested: true,
      },
      {
        name: "Therapeutic Goods Act 2019",
        href: "https://www.legislation.qld.gov.au/view/whole/html/asmade/act-2019-027",
      },
      {
        name: "Therapeutic Goods Reg 2021",
        href: "https://www.legislation.qld.gov.au/view/html/inforce/current/sl-2021-0143",
      },
      {
        name: "Queensland Health",
        href: "https://www.health.qld.gov.au/system-governance/licences/medicines-poisons/medicines-poisons-act/legislation-standards",
      },
    ],
  },
  {
    category: "Pharmacy authority",
    links: [
      {
        name: "QLD PBOC (Pharmacy Business Ownership Council)",
        href: "https://www.pboc.qld.gov.au/",
      },
    ],
  },
  {
    category: "Methadone",
    links: [
      {
        name: "QOTP (Opioid Treatment Program)",
        href: "https://www.health.qld.gov.au/public-health/topics/mhaod/for-healthcare-providers/programs-and-services/queensland-opioid-treatment-program",
      },
    ],
  },
  {
    category: "Expanded scope",
    links: [
      {
        name: "Pharmacists extended practice authority",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0027/1108944/epa-pharmacists.pdf",
      },
    ],
  },
  {
    category: "Realtime monitoring",
    links: [
      {
        name: "QScript",
        href: "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/medicines/qscript",
      },
    ],
  },
];

function QuickLinkName({ link }: { link: QuickLink }) {
  if (!link.href) {
    return <span className="font-medium text-stone-800">{link.name}</span>;
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "text-moss underline decoration-moss/30 underline-offset-4 transition-colors hover:text-stone-950 hover:decoration-moss",
        link.nested ? "block pl-4" : "",
      ].join(" ")}
    >
      {link.name}
    </a>
  );
}

function QuickLinks() {
  return (
    <section className="mb-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-2xl tracking-tight text-stone-900">Quick links</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-[11px] font-medium tracking-[0.14em] text-stone-500 uppercase">
              <th className="w-40 py-2 pr-4 font-medium">Category</th>
              <th className="py-2 font-medium">Reference</th>
            </tr>
          </thead>
          <tbody>
            {quickLinkGroups.map((group) =>
              group.links.map((link, index) => (
                <tr
                  key={`${group.category}-${link.name}`}
                  className="border-b border-stone-200 transition-colors last:border-b-0 hover:bg-stone-50"
                >
                  {index === 0 ? (
                    <th
                      scope="rowgroup"
                      rowSpan={group.links.length}
                      className="py-2.5 pr-4 align-top font-medium text-stone-800"
                    >
                      {group.category}
                    </th>
                  ) : null}
                  <td className="py-2.5 align-top">
                    <QuickLinkName link={link} />
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function GroupCard({ node }: { node: LawNode }) {
  const children = node.children ?? [];
  const nested = children.some((child) => child.children?.length);

  return (
    <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
      <h3 className="font-serif text-xl tracking-tight text-ink">{node.title}</h3>
      {nested ? (
        <div className="mt-4 space-y-5">
          {children.map((child) => (
            <div key={child.title}>
              <h4 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {child.title}
              </h4>
              <div className="mt-1">
                <TopicList topics={child.children ?? []} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2">
          <TopicList topics={children} />
        </div>
      )}
    </article>
  );
}

function FactsheetChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={[
        "size-5 shrink-0 text-stone-500 transition-transform duration-300",
        open ? "rotate-180" : "",
      ].join(" ")}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function QldLawPage() {
  const [isFactsheetOpen, setIsFactsheetOpen] = useState(true);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Law</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        QLD Pharmacy Law
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        Queensland medicines legislation notes. Open a topic to write it up.
      </p>

      <div className="mt-10">
        <QuickLinks />
        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2>
            <button
              type="button"
              aria-expanded={isFactsheetOpen}
              aria-controls="factsheet-notes"
              onClick={() => setIsFactsheetOpen((open) => !open)}
              className="flex w-full items-center justify-between gap-4 rounded-md text-left"
            >
              <span className="font-serif text-2xl tracking-tight text-stone-900">Factsheet notes</span>
              <FactsheetChevron open={isFactsheetOpen} />
            </button>
          </h2>
          <div
            id="factsheet-notes"
            className={[
              "grid transition-[grid-template-rows] duration-300 ease-out",
              isFactsheetOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            ].join(" ")}
          >
            <div className="overflow-hidden">
          <div className="mt-6 space-y-10">
        {qldLawSections.map((section) =>
          section.slug ? (
            <Link
              key={section.slug}
              href={`/qld-law/${section.slug}`}
              className="block rounded-lg border border-line bg-paper-raised px-5 py-5 transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
            >
              <h2 className="font-serif text-2xl tracking-tight text-ink">{section.title}</h2>
            </Link>
          ) : (
            <section key={section.title}>
              <h2 className="font-serif text-2xl tracking-tight text-ink">{section.title}</h2>
              {(section.children ?? []).every((child) => child.slug) ? (
                <article className="mt-4 rounded-lg border border-line bg-paper-raised px-5 py-4">
                  <TopicList topics={section.children ?? []} />
                </article>
              ) : (
                <div className="mt-4 space-y-4">
                  {(section.children ?? []).map((child) => (
                    <GroupCard key={child.title} node={child} />
                  ))}
                </div>
              )}
            </section>
          ),
        )}
          </div>
            </div>
          </div>
        </section>
      </div>

      <Disclaimer />
    </div>
  );
}
