import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";

export const metadata: Metadata = {
  title: "NSAIDs",
  description: "Non-steroidal anti-inflammatory drugs reference notes and individual medicine guides.",
};

const guides = [
  { href: "/otc-notes/otc-medicines/nsaids/ibuprofen", title: "Ibuprofen" },
  { href: "/otc-notes/otc-medicines/nsaids/diclofenac", title: "Diclofenac" },
  { href: "/otc-notes/otc-medicines/nsaids/naproxen", title: "Naproxen" },
  { href: "/otc-notes/otc-medicines/nsaids/mefenamic-acid", title: "Mefenamic Acid" },
  { href: "/otc-notes/otc-medicines/nsaids/celecoxib", title: "Celecoxib" },
];

function BackToOtcMedicines() {
  return (
    <Link
      href="/otc-notes/otc-medicines"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to OTC Medicines
    </Link>
  );
}

export default function NsaidsPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">OTC Medicines</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">NSAIDs</h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Non-steroidal anti-inflammatory drugs reference notes and individual medicine guides.
      </p>
      <div className="mt-8">
        <BackToOtcMedicines />
      </div>
      <div className="mt-8 space-y-4">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block rounded-lg border border-line bg-paper-raised p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
          >
            <h2 className="font-serif text-2xl tracking-tight text-ink">{guide.title}</h2>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <BackToOtcMedicines />
      </div>
      <Disclaimer />
    </article>
  );
}
