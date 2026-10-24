import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { DiclofenacNotes } from "@/components/otc-notes/diclofenac";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Diclofenac",
  description:
    "Over-the-Counter Medication Reference, Safety Checklist, Clinical Profile, CALs, Dosing, and Product Lineups",
};

const toc = [
  { id: "moa", label: "Mechanism of action" },
  {
    id: "safety-questions",
    label: "1. Safety Questions",
    children: [
      { id: "contraindications", label: "Contraindications" },
      { id: "precautions", label: "Precautions" },
      { id: "drug-interactions", label: "Drug interactions" },
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
      { id: "formulations", label: "Formulations and strengths" },
      { id: "dosing", label: "Dosing guidelines" },
    ],
  },
];

function BackToNsaids() {
  return (
    <Link
      href="/otc-notes/otc-medicines/nsaids"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to NSAIDs
    </Link>
  );
}

export default function DiclofenacPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">OTC Medicines</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Diclofenac (Non-Steroidal Anti-inflammatory Drug)
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Over-the-Counter Medication Reference, Safety Checklist, Clinical Profile, CALs, Dosing, and Product Lineups
      </p>
      <TocFrame items={toc} storageKey="diclofenac">
        <BackToNsaids />
        <div className="mt-8">
          <DiclofenacNotes />
        </div>
        <div className="mt-10">
          <BackToNsaids />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
