import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { InsulinChart } from "@/components/medicine-notes/insulin-chart";

export const metadata: Metadata = {
  title: "Insulin Chart",
  description:
    "Mechanisms of Action, Regimen Types, Single & Mixed Insulin Profiles, Delivery Devices, Initiation & Titration Protocols, Interactions, Hypoglycaemia, and Injection Site Reactions",
};

function BackHome() {
  return (
    <Link href="/" className="inline-block text-sm text-moss underline decoration-1 underline-offset-4">
      Back to Pipwiki
    </Link>
  );
}

export default function InsulinChartPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Medicine Notes</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Insulin Reference & Clinical Management Chart
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Mechanisms of Action, Regimen Types, Single & Mixed Insulin Profiles, Delivery Devices, Initiation & Titration Protocols, Interactions, Hypoglycaemia, and Injection Site Reactions
      </p>
      <div className="mt-8">
        <BackHome />
        <div className="mt-8">
          <InsulinChart />
        </div>
        <div className="mt-10">
          <BackHome />
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
