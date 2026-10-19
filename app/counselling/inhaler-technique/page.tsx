import type { Metadata } from "next";
import Link from "next/link";
import { InhalerTechnique } from "@/components/counselling/inhaler-technique";
import { Disclaimer } from "@/components/disclaimer";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Inhaler Technique & Asthma/COPD Counselling",
  description:
    "Medication Class Counselling Points, Comprehensive Device Step-by-Step Matrix, Spacer Guides, and Cleaning Instructions",
};

const toc = [
  { id: "classes", label: "Medication Class Counselling Points" },
  {
    id: "mist-inhalers",
    label: "Mist Inhalers",
    children: [
      { id: "pmdi", label: "pMDI Inhalers & Spacers" },
      { id: "nebuliser", label: "Nebuliser Guidance & Comparison" },
      { id: "respimat", label: "Respimat" },
      { id: "autohaler", label: "Autohaler" },
    ],
  },
  {
    id: "dry-powder",
    label: "Dry Powder Inhalers",
    children: [
      { id: "spiromax", label: "Spiromax" },
      { id: "ellipta", label: "Ellipta" },
      { id: "accuhaler", label: "Accuhaler" },
      { id: "turbuhaler", label: "Turbuhaler" },
      { id: "genuair", label: "Genuair" },
      { id: "easyhaler", label: "Easyhaler" },
    ],
  },
  {
    id: "capsules",
    label: "Capsule Devices",
    children: [
      { id: "breezhaler", label: "Breezhaler" },
      { id: "handihaler", label: "Handihaler" },
      { id: "zonda", label: "Zonda" },
    ],
  },
  { id: "cleaning", label: "Puffer Cleaning Instructions" },
];

const references = [
  {
    href: "https://www.nationalasthma.org.au/resources/inhaler-technique-for-people-with-asthma-or-copd",
    label: "Inhaler Technique Guide",
  },
  {
    href: "https://www.nationalasthma.org.au/resources/spacers-for-pressurised-metered-dose-inhalers-chart",
    label: "Spacers Chart",
  },
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

export default function InhalerTechniquePage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Counselling</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Inhaler Technique & Asthma/COPD Counselling
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Medication Class Counselling Points, Comprehensive Device Step-by-Step Matrix, Spacer Guides, and Cleaning
        Instructions
      </p>
      <div className="mt-5">
        <p className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">Reference</p>
        <ul className="mt-2 space-y-1.5">
          {references.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-amber-800 underline hover:text-amber-950"
              >
                {item.label}
                <ExternalLinkIcon />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <TocFrame items={toc} storageKey="inhaler-technique">
        <BackToCounselling />
        <div className="mt-8">
          <InhalerTechnique />
        </div>
        <div className="mt-10">
          <BackToCounselling />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
