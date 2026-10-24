import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";

export const metadata: Metadata = {
  title: "OTC Medicines",
  description: "Over-the-counter medicine reference notes.",
};

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

export default function OtcMedicinesPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">OTC Notes</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">OTC Medicines</h1>
      <div className="mt-6">
        <BackHome />
      </div>
      <div className="mt-8 space-y-4">
        <Link
          href="/otc-notes/otc-medicines/paracetamol"
          className="block rounded-lg border border-line bg-paper-raised p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
        >
          <h2 className="font-serif text-2xl tracking-tight text-ink">Paracetamol</h2>
        </Link>
        <Link
          href="/otc-notes/otc-medicines/aspirin"
          className="block rounded-lg border border-line bg-paper-raised p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
        >
          <h2 className="font-serif text-2xl tracking-tight text-ink">Aspirin (High Dose)</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            High-dose aspirin reference notes, safety checklist, contraindications, Reye’s syndrome risks, CALs, and
            product lineups.
          </p>
        </Link>
        <Link
          href="/otc-notes/otc-medicines/nsaids"
          className="block rounded-lg border border-line bg-paper-raised p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
        >
          <h2 className="font-serif text-2xl tracking-tight text-ink">NSAIDs</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Non-steroidal anti-inflammatory drugs reference notes and individual medicine guides.
          </p>
        </Link>
        <Link
          href="/otc-notes/otc-medicines/cold-and-flu"
          className="block rounded-lg border border-line bg-paper-raised p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
        >
          <h2 className="font-serif text-2xl tracking-tight text-ink">Oral Cold &amp; Flu Products</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Comprehensive reference guide for oral cold, flu, decongestant, cough, lozenge, and complementary herbal
            products.
          </p>
        </Link>
      </div>
      <div className="mt-10">
        <BackHome />
      </div>
      <Disclaimer />
    </article>
  );
}
