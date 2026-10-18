import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { BreastfeedingTreatments } from "@/components/otc-notes/breastfeeding-treatments";
import { RefocusNav } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Common Treatments for Breastfeeding",
  description:
    "Over-the-Counter Management, Safe Medications, and Safeguards During Lactation",
};

const toc = [
  { id: "aches-pains", label: "Aches & Pains" },
  { id: "allergies", label: "Allergies & Hay Fever" },
  { id: "eye-nasal", label: "Eye & Nasal Symptoms" },
  { id: "cough-throat", label: "Cough & Sore Throat" },
  { id: "cold-sores", label: "Cold Sores & Mouth Ulcers" },
  { id: "gastrointestinal", label: "Gastrointestinal & Haemorrhoids" },
  { id: "parasites", label: "Parasites & Thrush" },
];

function BackToConditions() {
  return (
    <Link
      href="/otc-notes/conditions"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to Conditions
    </Link>
  );
}

export default function BreastfeedingTreatmentsPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Conditions</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Common Treatments for Breastfeeding
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Over-the-Counter Management, Safe Medications, and Safeguards During Lactation
      </p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        <RefocusNav items={toc} />
        <div className="min-w-0 lg:col-span-3">
          <BackToConditions />
          <div className="mt-8">
            <BreastfeedingTreatments />
          </div>
          <div className="mt-10">
            <BackToConditions />
          </div>
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
