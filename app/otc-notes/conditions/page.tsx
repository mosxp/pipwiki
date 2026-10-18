import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";

export const metadata: Metadata = {
  title: "Conditions",
  description: "Common conditions and clinical triage notes.",
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

export default function ConditionsPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">OTC Notes</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">Conditions</h1>
      <div className="mt-6">
        <BackHome />
      </div>
      <p className="mt-8 text-base leading-7 text-ink-soft">
        Common conditions and clinical triage notes. This note has not been written yet.
      </p>
      <div className="mt-10">
        <BackHome />
      </div>
      <Disclaimer />
    </article>
  );
}
