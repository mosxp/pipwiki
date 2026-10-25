import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { OralAntihistamineNotes } from "@/components/otc-notes/oral-antihistamines";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Oral Antihistamines",
  description:
    "Indications, Safety Screening, Sedating vs. Less-Sedating Profiles, CALs, and Product Lineups",
};

const toc = [
  { id: "indications", label: "Indications" },
  {
    id: "safety",
    label: "Safety and precautions",
    children: [
      { id: "contraindications", label: "Contraindications and precautions" },
      { id: "interactions", label: "Interactions" },
      { id: "side-effects", label: "Side effects" },
    ],
  },
  {
    id: "sedating",
    label: "Sedating antihistamines",
    children: [
      { id: "triprolidine", label: "Triprolidine" },
      { id: "brompheniramine", label: "Brompheniramine" },
      { id: "chlorpheniramine", label: "Chlorpheniramine" },
      { id: "dexchlorpheniramine", label: "Dexchlorpheniramine" },
      { id: "cyproheptadine", label: "Cyproheptadine" },
      { id: "promethazine", label: "Promethazine" },
      { id: "diphenhydramine", label: "Diphenhydramine" },
      { id: "doxylamine", label: "Doxylamine" },
      { id: "dimenhydrinate", label: "Dimenhydrinate" },
      { id: "cyclizine", label: "Cyclizine" },
    ],
  },
  {
    id: "less-sedating",
    label: "Less-sedating antihistamines",
    children: [
      { id: "cetirizine", label: "Cetirizine" },
      { id: "loratadine", label: "Loratadine" },
      { id: "desloratadine", label: "Desloratadine" },
      { id: "fexofenadine", label: "Fexofenadine" },
      { id: "bilastine", label: "Bilastine" },
    ],
  },
];

function BackToOtc() {
  return (
    <Link
      href="/otc-notes/otc-medicines"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to OTC Medicines
    </Link>
  );
}

export default function OralAntihistaminesPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">OTC Medicines</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Oral Antihistamines Reference Guide
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Indications, Safety Screening, Sedating vs. Less-Sedating Profiles, CALs, and Product Lineups
      </p>
      <TocFrame items={toc} storageKey="oral-antihistamines">
        <BackToOtc />
        <div className="mt-8">
          <OralAntihistamineNotes />
        </div>
        <div className="mt-10">
          <BackToOtc />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
