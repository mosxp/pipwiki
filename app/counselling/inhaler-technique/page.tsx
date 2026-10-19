import type { Metadata } from "next";
import Link from "next/link";
import { InhalerTechnique } from "@/components/counselling/inhaler-technique";
import { Disclaimer } from "@/components/disclaimer";
import { RefocusNav } from "@/components/vic-law/dpcs-toc";

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
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Counselling</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Inhaler Technique & Asthma/COPD Counselling
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Medication Class Counselling Points, Comprehensive Device Step-by-Step Matrix, Spacer Guides, and Cleaning
        Instructions
      </p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        <RefocusNav items={toc} />
        <div className="min-w-0 lg:col-span-3">
          <BackToCounselling />
          <div className="mt-8">
            <InhalerTechnique />
          </div>
          <div className="mt-10">
            <BackToCounselling />
          </div>
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
