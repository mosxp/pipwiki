import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { StateComparison } from "@/components/state-differences/comparison";
import { RefocusNav } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Comparative State Pharmacy Legislation & Jurisdictional Matrix",
  description:
    "Comprehensive cross-jurisdictional notes, statutory differences, and national framework comparisons across Australian states and territories.",
};

const toc = [
  { id: "national-framework", label: "1. National Legislation Framework" },
  { id: "state-acts", label: "2. State & Territory Acts & Regulations" },
  {
    id: "s2-s3",
    label: "3. Schedule 2 & Schedule 3",
    children: [
      { id: "s2-storage", label: "S2 storage" },
      { id: "s3-supply", label: "S3 supply and labelling" },
      { id: "s3-recording", label: "S3 recording" },
    ],
  },
  {
    id: "s4",
    label: "4. Schedule 4 Prescriptions",
    children: [
      { id: "s4-particulars", label: "Mandatory particulars" },
      { id: "s4-authority", label: "Authority and unusual doses" },
      { id: "emergency-supply", label: "Emergency supply" },
      { id: "continued-dispensing", label: "Continued dispensing" },
      { id: "restricted-s4", label: "Steroids, benzodiazepines, barbiturates" },
    ],
  },
  {
    id: "s8",
    label: "5. Schedule 8 & RTPM",
    children: [
      { id: "s8-stimulants", label: "S8 stimulants" },
      { id: "interstate-s8", label: "Interstate scripts and RTPM" },
      { id: "s8-one-item", label: "One S8 item per form" },
      { id: "s8-particulars", label: "S8 prescription particulars" },
      { id: "drug-register", label: "Drug register and stocktake" },
    ],
  },
  {
    id: "nsw-2026",
    label: "6. NSW Updates (5 November 2026)",
    children: [
      { id: "nsw-direct", label: "Direct rule changes" },
      { id: "nsw-further", label: "Further NSW requirements" },
    ],
  },
];

function BackHome() {
  return (
    <Link
      href="/"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to Pipwiki
    </Link>
  );
}

export default function StateDifferencesPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Law</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Comparative State Pharmacy Legislation &amp; Jurisdictional Matrix
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Comprehensive cross-jurisdictional notes, statutory differences, and national framework
        comparisons across Australian states and territories.
      </p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        <RefocusNav items={toc} />
        <div className="min-w-0 lg:col-span-3">
          <BackHome />
          <div className="mt-8">
            <StateComparison />
          </div>
          <div className="mt-10">
            <BackHome />
          </div>
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
