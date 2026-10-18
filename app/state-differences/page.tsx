import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";

export const metadata: Metadata = {
  title: "State Differences in Pharmacy Legislation",
  description:
    "Comparative notes and jurisdictional differences across Australian states.",
};

export default function StateDifferencesPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Law</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        State Differences in Pharmacy Legislation
      </h1>
      <p className="mt-8 max-w-2xl text-base leading-7 text-ink-soft">
        Comparative notes and jurisdictional differences across Australian states. This note has
        not been written yet.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
        >
          Back to Pipwiki
        </Link>
      </div>
      <Disclaimer />
    </article>
  );
}
