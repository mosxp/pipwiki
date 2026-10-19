import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";

export const metadata: Metadata = {
  title: "Counselling",
  description: "Clinical counselling scripts and dispensing checklists.",
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

export default function CounsellingPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Counselling</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">Counselling</h1>
      <div className="mt-6">
        <BackHome />
      </div>
      <div className="mt-8 space-y-4">
        <Link
          href="/counselling/common-s4-counselling"
          className="block rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-stone-50 hover:shadow-md"
        >
          <h2 className="font-serif text-2xl tracking-tight text-stone-900">Common S4 Counselling</h2>
        </Link>
        <Link
          href="/counselling/cals"
          className="block rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-stone-50 hover:shadow-md"
        >
          <h2 className="font-serif text-2xl tracking-tight text-stone-900">
            CALs (Cautionary Advisory Labels)
          </h2>
        </Link>
        <Link
          href="/counselling/inhaler-technique"
          className="block rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-stone-50 hover:shadow-md"
        >
          <h2 className="font-serif text-2xl tracking-tight text-stone-900">Inhaler Technique</h2>
        </Link>
        <Link
          href="/notes/ms2step"
          className="block rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-stone-50 hover:shadow-md"
        >
          <h2 className="font-serif text-2xl tracking-tight text-stone-900">MS-2-Step</h2>
        </Link>
      </div>
      <div className="mt-10">
        <BackHome />
      </div>
      <Disclaimer />
    </article>
  );
}
