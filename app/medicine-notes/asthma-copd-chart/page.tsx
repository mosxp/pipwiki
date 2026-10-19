import type { Metadata } from "next";
import Link from "next/link";
import { AsthmaCopdChart } from "@/components/medicine-notes/asthma-copd-chart";
import { Disclaimer } from "@/components/disclaimer";

export const metadata: Metadata = {
  title: "Asthma & COPD Medications Chart",
  description:
    "Comprehensive Reliever, Preventer, and Combination Inhaler Reference Guide with PBS Criteria and Device Types",
};

const references = [
  {
    href: "https://www.nationalasthma.org.au/resources/asthma-copd-medications-chart",
    label: "Asthma & COPD Medications Chart",
  },
  {
    href: "https://www.nationalasthma.org.au/resources/monoclonal-antibody-therapy-for-severe-asthma-chart",
    label: "Monoclonal Antibody Therapy for Severe Asthma Chart",
  },
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
      <div className="mt-5">
        <p className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">Reference</p>
        <ul className="mt-2 space-y-1.5">
          {references.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-amber-800 underline hover:text-amber-950"
              >
                {item.label}
                <ExternalLinkIcon />
              </a>
            </li>
          ))}
        </ul>
      </div>
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
