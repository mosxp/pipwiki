import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { RecommendedNeedleSize } from "@/components/service-resources/recommended-needle-size";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Recommended Needle Size",
  description:
    "Age- and Size-Specific Specifications for Intramuscular (IM), Subcutaneous (SC), and Intradermal (ID) Injections",
};

const toc = [
  { id: "specifications", label: "Specifications" },
  {
    id: "color-guide",
    label: "Color-coded guide",
    children: [
      { id: "orange", label: "25G Orange" },
      { id: "blue", label: "23G Blue" },
      { id: "green", label: "21G Green" },
    ],
  },
  {
    id: "diagrams",
    label: "Diagrams",
    children: [
      { id: "comparison", label: "Needle comparison" },
      { id: "gauge-chart", label: "Gauge chart" },
    ],
  },
];

function BackToImmunisation() {
  return (
    <Link
      href="/service-resources/immunisation"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to Immunisation
    </Link>
  );
}

export default function RecommendedNeedleSizePage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Service Resources</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Recommended Needle Size, Length &amp; Insertion Angle for Vaccines
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Age- and Size-Specific Specifications for Intramuscular (IM), Subcutaneous (SC), and Intradermal (ID) Injections
      </p>
      <TocFrame items={toc} storageKey="recommended-needle-size">
        <BackToImmunisation />
        <div className="mt-8">
          <RecommendedNeedleSize />
        </div>
        <div className="mt-10">
          <BackToImmunisation />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
