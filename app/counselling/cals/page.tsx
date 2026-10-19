import type { Metadata } from "next";
import Link from "next/link";
import { CalsNotes } from "@/components/counselling/cals";
import { Disclaimer } from "@/components/disclaimer";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "CALs (Cautionary Advisory Labels)",
  description:
    "Legislative Obligations, Standard Warnings, and Dispensing Advisory Label Reference Guide",
};

const toc = [
  { id: "legislative", label: "Legislative Obligations" },
  { id: "drowsiness", label: "Drowsiness & Sedation" },
  { id: "posing-harms", label: "Posing Harms" },
  { id: "ineffective", label: "Ineffective Risk" },
  { id: "interactions", label: "Interactions" },
  { id: "concurrent", label: "Risk of Concurrent Use & Overdose" },
  { id: "allergy", label: "Allergy Concerns" },
  { id: "instructions", label: "Instructions & Dosage Form Cautions" },
  { id: "duration", label: "Duration" },
  { id: "storage", label: "Storage" },
  { id: "compounded", label: "Compounded Products" },
  { id: "special-handling", label: "Special Handling Required" },
];

function BackToCounselling() {
  return (
    <Link
      href="/counselling"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to Counselling
    </Link>
  );
}

export default function CalsPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Counselling</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        CALs (Cautionary Advisory Labels)
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Legislative Obligations, Standard Warnings, and Dispensing Advisory Label Reference Guide
      </p>
      <TocFrame items={toc} storageKey="cals">
        <BackToCounselling />
        <div className="mt-8">
          <CalsNotes />
        </div>
        <div className="mt-10">
          <BackToCounselling />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
