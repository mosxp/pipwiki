import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Immunisation",
  description: "Service resource notes",
};

const toc: { id: string; label: string }[] = [];

function BackHome() {
  return (
    <Link href="/" className="inline-block text-sm text-moss underline decoration-1 underline-offset-4">
      Back to Pipwiki
    </Link>
  );
}

export default function ImmunisationPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Service Resources</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">Immunisation</h1>
      <TocFrame items={toc} storageKey="immunisation">
        <BackHome />
        <div className="mt-10">
          <BackHome />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
