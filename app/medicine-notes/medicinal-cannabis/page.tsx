import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { MedicinalCannabis } from "@/components/medicine-notes/medicinal-cannabis";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

const toc = [
  { id: "cannabinoids", label: "Cannabinoids & ECS" },
  { id: "regulation", label: "Regulation & TGA" },
  { id: "table-1", label: "Product classifications" },
  { id: "prescribing", label: "Prescriber compliance" },
  { id: "table-2", label: "Product categories" },
  { id: "s3", label: "S3 status" },
  { id: "compounding", label: "Compounding" },
  { id: "therapeutic", label: "Safety & interactions" },
  { id: "counselling", label: "Dosing & counselling tips" },
];

export const metadata: Metadata = {
  title: "Medicinal Cannabis",
  description:
    "Phytocannabinoids, Terpenes, Endocannabinoid System, Regulation & TGA Access Pathways, Product Classifications, Dispensing Compliance, Prescribing Requirements, S3 Status, Compounding Rules, Therapeutic Role, Safety & Interactions, and Patient Counselling Tips",
};

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" aria-hidden="true">
      <path
        d="M6 3.5H3.5v9h9V10M8.5 3.5H12.5V7.5M12.5 3.5 7 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackHome() {
  return (
    <Link href="/" className="inline-block text-sm text-moss underline decoration-1 underline-offset-4">
      Back to Pipwiki
    </Link>
  );
}

export default function MedicinalCannabisPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Medicine Notes</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Medicinal Cannabis Reference & Clinical Guide
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Phytocannabinoids, Terpenes, Endocannabinoid System, Regulation & TGA Access Pathways, Product Classifications, Dispensing Compliance, Prescribing Requirements, S3 Status, Compounding Rules, Therapeutic Role, Safety & Interactions, and Patient Counselling Tips
      </p>
      <TocFrame items={toc} storageKey="medicinal-cannabis">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <BackHome />
          <a
            href="https://catalyst.honahlee.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-moss underline decoration-1 underline-offset-4"
          >
            Catalyst Database (Honahlee)
            <ExternalLinkIcon />
          </a>
        </div>
        <div className="mt-8">
          <MedicinalCannabis />
        </div>
        <div className="mt-10">
          <BackHome />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
