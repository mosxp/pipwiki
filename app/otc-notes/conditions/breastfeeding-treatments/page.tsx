import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { BreastfeedingTreatments } from "@/components/otc-notes/breastfeeding-treatments";
import { RefocusNav } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Common Treatments for Breastfeeding",
  description:
    "Over-the-Counter Management, Safe Medications, and Safeguards During Lactation",
};

const toc = [
  { id: "aches-pains", label: "Aches & Pains" },
  { id: "allergies", label: "Allergies & Hay Fever" },
  { id: "eye-nasal", label: "Eye & Nasal Symptoms" },
  { id: "cough-throat", label: "Cough & Sore Throat" },
  { id: "cold-sores", label: "Cold Sores & Mouth Ulcers" },
  { id: "gastrointestinal", label: "Gastrointestinal & Haemorrhoids" },
  { id: "parasites", label: "Parasites (Worms, Head Lice & Scabies)" },
  { id: "vaginal-thrush", label: "Vaginal Thrush" },
];

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

const references = [
  {
    text: "The Royal Women's Hospital - Medicines, Drugs and Breastfeeding",
    href: "https://www.thewomens.org.au/health-information/breastfeeding/medicines-drugs-and-breastfeeding",
  },
  {
    text: "The Royal Women's Hospital - Medicines in Breastfeeding Fact Sheet (PDF)",
    href: "https://www.thewomens.org.au/images/uploads/fact-sheets/Medicines-in-breastfeeding-151018.pdf",
  },
];

function BackToConditions() {
  return (
    <Link
      href="/otc-notes/conditions"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to Conditions
    </Link>
  );
}

export default function BreastfeedingTreatmentsPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Conditions</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Common Treatments for Breastfeeding
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Over-the-Counter Management, Safe Medications, and Safeguards During Lactation
      </p>
      <div className="mt-5">
        <p className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">References</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {references.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-amber-800 underline hover:text-amber-950"
              >
                {item.text}
                <ExternalLinkIcon />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        <RefocusNav items={toc} />
        <div className="min-w-0 lg:col-span-3">
          <BackToConditions />
          <div className="mt-8">
            <BreastfeedingTreatments />
          </div>
          <div className="mt-10">
            <BackToConditions />
          </div>
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
