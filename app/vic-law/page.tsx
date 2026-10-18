import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";

type QuickLink = {
  name: string;
  href: string;
};

const quickLinkGroups: { category: string; links: QuickLink[] }[] = [
  {
    category: "State-based law",
    links: [
      {
        name: "Drugs, Poisons and Controlled Substances Regulations (DPCS Reg) 2017",
        href: "https://www.legislation.vic.gov.au/in-force/statutory-rules/drugs-poisons-and-controlled-substances-regulations-2017/024",
      },
      {
        name: "Drugs, Poisons and Controlled Substances Act (DPCS Act) 1981",
        href: "https://www.legislation.vic.gov.au/in-force/acts/drugs-poisons-and-controlled-substances-act-1981/146",
      },
    ],
  },
  {
    category: "Pharmacy authority",
    links: [
      {
        name: "VPA (Victoria Pharmacy Authority)",
        href: "https://pharmacy.vic.gov.au/",
      },
    ],
  },
  {
    category: "Methadone",
    links: [
      {
        name: "VOPP (Opioid pharmacotherapy Program)",
        href: "https://www.health.vic.gov.au/drugs-and-poisons/opioid-dependence-treatment",
      },
      {
        name: "PSA Victorian Opioid Pharmacotherapy Program",
        href: "https://www.psa.org.au/programs/victorian-opioid-pharmacotherapy-program/",
      },
    ],
  },
  {
    category: "Expanded scope",
    links: [
      {
        name: "Community Pharmacist Program (Chemist Care Now)",
        href: "https://www.health.vic.gov.au/primary-care/community-pharmacist-program",
      },
    ],
  },
  {
    category: "Realtime monitoring",
    links: [
      {
        name: "Victoria’s SafeScript",
        href: "https://www.safescript.vic.gov.au/",
      },
    ],
  },
];

function QuickLinks() {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
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
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-moss underline decoration-moss/30 underline-offset-4 transition-colors hover:text-stone-950 hover:decoration-moss"
                    >
                      {link.name}
                    </a>
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

export default function VicLawPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Law</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        VIC Pharmacy Law
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        Victorian medicines legislation notes and quick links.
      </p>

      <div className="mt-10 space-y-8">
        <QuickLinks />
        <section className="space-y-4">
          <Link
            href="/vic-law/dpcs-reg-2017"
            className="block rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-stone-50 hover:shadow-md"
          >
            <h2 className="font-serif text-2xl tracking-tight text-stone-900">
              DPCS Regulations 2017 Notes
            </h2>
          </Link>
          <Link
            href="/vic-law/dpcs-act-1981"
            className="block rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-stone-50 hover:shadow-md"
          >
            <h2 className="font-serif text-2xl tracking-tight text-stone-900">
              DPCS Act 1981 &amp; SafeScript Notes
            </h2>
          </Link>
        </section>
      </div>

      <Disclaimer />
    </div>
  );
}
