import type { Metadata } from "next";
import Link from "next/link";
import { AsthmaCopdChart } from "@/components/medicine-notes/asthma-copd-chart";
import { Disclaimer } from "@/components/disclaimer";

export const metadata: Metadata = {
  title: "Asthma & COPD Medications Chart",
  description:
    "Comprehensive Reliever, Preventer, and Combination Inhaler Reference Guide with PBS Criteria and Device Types",
};

function BackHome() {
  return (
    <Link href="/" className="inline-block text-sm text-moss underline decoration-1 underline-offset-4">
      Back to Pipwiki
    </Link>
  );
}

export default function AsthmaCopdChartPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Medicine Notes</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Asthma & COPD Medications Chart
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Comprehensive Reliever, Preventer, and Combination Inhaler Reference Guide with PBS Criteria and Device Types
      </p>
      <div className="mt-8">
        <BackHome />
        <div className="mt-8">
          <AsthmaCopdChart />
        </div>
        <div className="mt-10">
          <BackHome />
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
