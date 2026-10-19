import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";

export const metadata: Metadata = {
  title: "Admin Medicines by Inj.",
  description: "Service resource notes",
};

function BackHome() {
  return (
    <Link href="/" className="inline-block text-sm text-moss underline decoration-1 underline-offset-4">
      Back to Pipwiki
    </Link>
  );
}

export default function AdminMedicinesByInjPage() {
  return (
    <article className="mx-auto w-full max-w-full px-6 py-12 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Service Resources</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Admin Medicines by Inj.
      </h1>
      <div className="mt-8">
        <BackHome />
        <div className="mt-8">
          <Link
            href="/service-resources/admin-medicines-by-inj/vitamin-b12"
            className="block rounded-lg border border-line bg-paper-raised p-6 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
          >
            <h2 className="font-serif text-2xl tracking-tight text-ink">Vitamin B12 Injection</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Hydroxocobalamin intramuscular injection guidance, pathology interpretation, dosing, and step-by-step
              administration.
            </p>
          </Link>
        </div>
        <div className="mt-10">
          <BackHome />
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
