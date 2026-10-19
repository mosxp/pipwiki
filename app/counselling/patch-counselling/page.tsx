import type { Metadata } from "next";
import Link from "next/link";
import { PatchCounselling } from "@/components/counselling/patch-counselling";
import { Disclaimer } from "@/components/disclaimer";
import { RefocusNav } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Transdermal Patch Counselling & Reference Guide",
  description:
    "Comprehensive Application Steps, Body Site Locations, Wear Intervals, Rotations, and Special Warnings across Drug Classes",
};

const toc = [
  { id: "nrt", label: "Nicotine replacement therapy" },
  { id: "nitrates", label: "Nitrates" },
  { id: "rivastigmine", label: "Acetylcholinesterase inhibitors" },
  { id: "rotigotine", label: "Dopamine agonists" },
  { id: "oxybutynin", label: "Oxybutynin" },
  { id: "hrt", label: "Hormone replacement therapy" },
  { id: "opioids", label: "Opioids" },
  { id: "anaesthesia", label: "Anaesthesia" },
  { id: "alacare", label: "5-Aminolevulinic acid" },
];

function BackToCounselling() {
  return (
    <Link href="/counselling" className="inline-block text-sm text-moss underline decoration-1 underline-offset-4">
      Back to Counselling
    </Link>
  );
}

export default function PatchCounsellingPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Counselling</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Transdermal Patch Counselling & Reference Guide
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Comprehensive Application Steps, Body Site Locations, Wear Intervals, Rotations, and Special Warnings across
        Drug Classes
      </p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        <RefocusNav items={toc} />
        <div className="min-w-0 lg:col-span-3">
          <BackToCounselling />
          <div className="mt-8">
            <PatchCounselling />
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
