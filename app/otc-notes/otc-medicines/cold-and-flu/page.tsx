import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { ColdAndFluNotes } from "@/components/otc-notes/cold-and-flu";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Oral Cold & Flu Products",
  description:
    "Decongestants, Analgesics, Antihistamines, Cough Suppressants, Expectorants, Mucolytics, Lozenges, and Complementary Herbal Medicines",
};

const toc = [
  { id: "allergic", label: "Allergic with decongestant" },
  { id: "pseudoephedrine", label: "Pseudoephedrine-based" },
  { id: "phenylephrine", label: "Phenylephrine-based" },
  { id: "dry-cough", label: "Cold and flu with dry cough" },
  { id: "chesty-cough", label: "Cold and flu with chesty cough" },
  { id: "antihistamine", label: "Antihistamine-based" },
  {
    id: "oral-liquids",
    label: "Oral liquid cough products",
    children: [
      { id: "chesty-liquids", label: "Chesty cough" },
      { id: "dry-liquids", label: "Dry cough" },
    ],
  },
  { id: "lozenges", label: "Cough lozenges" },
  { id: "complementary", label: "Complementary medicines, under 6 years" },
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

export default function ColdAndFluPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">OTC Medicines</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Oral Cold &amp; Flu Products Reference Guide
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Decongestants, Analgesics, Antihistamines, Cough Suppressants, Expectorants, Mucolytics, Lozenges, and
        Complementary Herbal Medicines
      </p>
      <TocFrame items={toc} storageKey="cold-and-flu">
        <BackToOtc />
        <div className="mt-8">
          <ColdAndFluNotes />
        </div>
        <div className="mt-10">
          <BackToOtc />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
