import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { DpcsRegulations } from "@/components/vic-law/dpcs-regulations";
import { DpcsToc } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "DPCS Regulations 2017 (VIC)",
  description: "Victorian Medicines & Poisons Legislation - Detailed Notes",
};

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

export default function DpcsReg2017Page() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">
        VIC Pharmacy Law
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        DPCS Regulations 2017 (VIC)
      </h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        Victorian Medicines &amp; Poisons Legislation - Detailed Notes
      </p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        <DpcsToc />
        <div className="min-w-0 lg:col-span-3">
          <BackToHub />
          <div className="mt-8">
            <DpcsRegulations />
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
