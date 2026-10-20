import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { AspirinNotes } from "@/components/otc-notes/aspirin";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Aspirin (High Dose)",
  description: "Over-the-Counter Medication Reference & Clinical Triage Guide",
};

const toc = [
  {
    id: "safety-questions",
    label: "1. Safety Questions",
    children: [
      { id: "contraindications", label: "Contraindications" },
      { id: "precautions", label: "Precautions" },
      { id: "drug-interactions", label: "Drug interactions" },
      { id: "paediatric", label: "Paediatric management" },
      { id: "pregnancy", label: "Pregnancy" },
      { id: "breastfeeding", label: "Breastfeeding" },
    ],
  },
  { id: "medicine-profile", label: "2. Medicine Profile" },
  { id: "counselling", label: "3. Counselling & CALs" },
  {
    id: "product-lineup",
    label: "4. Product Lineup",
    children: [
      { id: "aspirin-300", label: "Aspirin 300 mg" },
      { id: "aspirin-500", label: "Aspirin 500 mg" },
    ],
  },
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

export default function AspirinPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">OTC Medicines</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Aspirin (High Dose for Analgesic, Antipyretic, Anti-inflammatory Actions)
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Over-the-Counter Medication Reference &amp; Clinical Triage Guide
      </p>
      <TocFrame items={toc} storageKey="aspirin">
        <BackToOtcMedicines />
        <div className="mt-8">
          <AspirinNotes />
        </div>
        <div className="mt-10">
          <BackToOtcMedicines />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
