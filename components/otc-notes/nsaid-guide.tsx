import type { ReactNode } from "react";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { TocFrame } from "@/components/vic-law/dpcs-toc";

function BackToNsaids() {
  return (
    <Link
      href="/otc-notes/otc-medicines/nsaids"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to NSAIDs
    </Link>
  );
}

export function NsaidGuidePage({
  title,
  storageKey,
  children,
}: {
  title: string;
  storageKey: string;
  children?: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">OTC Medicines</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">{title}</h1>
      <TocFrame items={[]} storageKey={storageKey}>
        <BackToNsaids />
        {children ? <div className="mt-8">{children}</div> : null}
        <div className="mt-10">
          <BackToNsaids />
        </div>
      </TocFrame>
      <Disclaimer />
    </article>
  );
}
