import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { VitaminB12 } from "@/components/service-resources/vitamin-b12";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Vitamin B12 Injection",
  description:
    "Indications, Pathology Screening Ranges, Pregnancy & Safety, Dosing Schedules, Step-by-Step IM Injection Technique, and Product Availability",
};

const toc = [
  { id: "indications", label: "Indications & rationale" },
  {
    id: "symptoms",
    label: "Symptoms & causes",
    children: [
      { id: "causes", label: "Reasons for deficiency" },
      { id: "deficiency-symptoms", label: "Symptoms" },
    ],
  },
  { id: "pathology", label: "Pathology screening" },
  {
    id: "precautions",
    label: "Precautions",
    children: [
      { id: "anaemia-cause", label: "Cause of anaemia" },
      { id: "pregnancy", label: "Pregnancy & breastfeeding" },
      { id: "allergies", label: "Known allergies" },
      { id: "oral-alternative", label: "Unable to tolerate IM" },
    ],
  },
  { id: "dosing", label: "Dosing & maintenance" },
  {
    id: "administration",
    label: "Administration & sites",
    children: [
      { id: "equipment", label: "Equipment" },
      { id: "sites", label: "Injection sites" },
      { id: "steps", label: "Step-by-step" },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring & side effects",
    children: [
      { id: "onset", label: "Onset of effect" },
      { id: "potassium", label: "Potassium" },
      { id: "follow-up", label: "Follow-up" },
      { id: "side-effects", label: "Side effects" },
    ],
  },
  { id: "products", label: "Product information" },
];

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" aria-hidden="true">
      <path
        d="M6 3.5H3.5v9h9V10M8.5 3.5H12.5V7.5M12.5 3.5 7 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackToInjections() {
  return (
    <Link
      href="/service-resources/admin-medicines-by-inj"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to Admin Medicines by Inj.
    </Link>
  );
}

export default function VitaminB12Page() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Service Resources</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Hydroxocobalamin (Vitamin B12) Injection Reference &amp; Administration Guide
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Indications, Pathology Screening Ranges, Pregnancy &amp; Safety, Dosing Schedules, Step-by-Step IM Injection
        Technique, and Product Availability
      </p>
      <TocFrame items={toc} storageKey="vitamin-b12">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <BackToInjections />
          <a
            href="/docs/hydroxocobalamin-quick-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-moss underline decoration-1 underline-offset-4"
          >
            View Original PSA Reference Guide (PDF)
            <ExternalLinkIcon />
          </a>
        </div>
        <div className="mt-8">
          <VitaminB12 />
        </div>
        <div className="mt-10">
          <BackToInjections />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
