import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { DpcsAct } from "@/components/vic-law/dpcs-act";
import { RefocusNav } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "DPCS Act 1981 & SafeScript (VIC)",
  description: "Victorian Act-Level Legislation & Real-Time Monitoring Notes",
};

const toc = [
  {
    id: "act-structure",
    label: "Part I & Part II Structure",
    children: [
      { id: "part-ii", label: "Part II divisions" },
      { id: "later-parts", label: "Parts IIA to XII" },
    ],
  },
  {
    id: "duration",
    label: "Duration of Licences, Permits & Warrants (Sec 21)",
  },
  {
    id: "safescript",
    label: "SafeScript",
    children: [
      { id: "about-safescript", label: "About SafeScript" },
      { id: "safescript-uses", label: "Purpose" },
      { id: "privacy-protections", label: "Privacy protections" },
      { id: "correcting-records", label: "Correcting records" },
      { id: "safescript-regulations", label: "2018 Regulations" },
      { id: "how-safescript-works", label: "How SafeScript works" },
    ],
  },
  { id: "monitored-medicines", label: "Monitored Medicines" },
  {
    id: "risk-alerts",
    label: "Risk Indicator Alerts",
    children: [
      { id: "alert-colours", label: "Red, amber and green" },
      { id: "access-and-privacy", label: "Access and privacy" },
      { id: "legal-penalties", label: "Legal penalties" },
    ],
  },
];

function BackToHub() {
  return (
    <Link
      href="/vic-law"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to VIC Pharmacy Law
    </Link>
  );
}

export default function DpcsAct1981Page() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">
        VIC Pharmacy Law
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        DPCS Act 1981 &amp; SafeScript (VIC)
      </h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        Victorian Act-Level Legislation &amp; Real-Time Monitoring Notes
      </p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        <RefocusNav items={toc} />
        <div className="min-w-0 lg:col-span-3">
          <BackToHub />
          <div className="mt-8">
            <DpcsAct />
          </div>
          <div className="mt-10">
            <BackToHub />
          </div>
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
