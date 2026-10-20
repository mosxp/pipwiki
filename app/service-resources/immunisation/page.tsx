import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { Immunisation } from "@/components/service-resources/immunisation";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Immunisation",
  description:
    "Australian Immunisation Handbook Guidelines, National Immunisation Program, NIPVIP, and State-Specific Resources (QLD & VIC)",
};

const toc = [
  { id: "aih", label: "AIH quick links" },
  { id: "national", label: "National links" },
  {
    id: "qld",
    label: "Queensland",
    children: [{ id: "qld-funded", label: "State-funded programs" }],
  },
  { id: "vic", label: "Victoria" },
];

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
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Immunisation Reference &amp; Quick Links
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Australian Immunisation Handbook Guidelines, National Immunisation Program, NIPVIP, and State-Specific Resources
        (QLD &amp; VIC)
      </p>
      <TocFrame items={toc} storageKey="immunisation">
        <BackHome />
        <div className="mt-8">
          <Link
            href="/service-resources/immunisation/recommended-needle-size"
            className="block rounded-lg border border-line bg-paper-raised p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
          >
            <h2 className="font-serif text-2xl tracking-tight text-ink">Recommended Needle Size</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Gauge and length specifications, insertion angles for IM, SC, and ID injections, and color-coded needle
              identification guides.
            </p>
          </Link>
        </div>
        <div className="mt-8">
          <Immunisation />
        </div>
        <div className="mt-10">
          <BackHome />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
