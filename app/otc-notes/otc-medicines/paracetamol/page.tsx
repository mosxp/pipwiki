import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { ParacetamolNotes } from "@/components/otc-notes/paracetamol";
import { RefocusNav } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Paracetamol",
  description: "Over-the-Counter Medication Reference & Clinical Triage Guide",
};

const toc = [
  {
    id: "safety-questions",
    label: "1. Safety Questions",
    children: [
      { id: "precautions", label: "Precautions and contraindications" },
      { id: "drug-interactions", label: "Drug interactions" },
      { id: "maximum-dose", label: "Maximum dose and toxicity" },
      { id: "paediatric-screening", label: "Paediatric screening" },
    ],
  },
  { id: "medicine-profile", label: "2. Medicine Profile" },
  {
    id: "product-lineup",
    label: "3. Product Lineup",
    children: [
      { id: "paracetamol-500", label: "Paracetamol 500 mg" },
      { id: "paracetamol-665", label: "Paracetamol 665 mg" },
      { id: "paracetamol-caffeine", label: "Paracetamol with caffeine" },
      { id: "childrens-formulations", label: "Children’s formulations" },
    ],
  },
  { id: "dosage-guidelines", label: "4. Dosage Guidelines" },
];

function BackToOtcMedicines() {
  return (
    <Link
      href="/otc-notes/otc-medicines"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to OTC Medicines
    </Link>
  );
}

export default function ParacetamolPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">OTC Medicines</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">Paracetamol</h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Over-the-Counter Medication Reference &amp; Clinical Triage Guide
      </p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        <RefocusNav items={toc} />
        <div className="min-w-0 lg:col-span-3">
          <BackToOtcMedicines />
          <div className="mt-8">
            <ParacetamolNotes />
          </div>
          <div className="mt-10">
            <BackToOtcMedicines />
          </div>
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
