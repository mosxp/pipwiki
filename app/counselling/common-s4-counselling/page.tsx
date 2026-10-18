import type { Metadata } from "next";
import Link from "next/link";
import { S4Counselling } from "@/components/counselling/s4-counselling";
import { Disclaimer } from "@/components/disclaimer";
import { RefocusNav } from "@/components/vic-law/dpcs-toc";

export const metadata: Metadata = {
  title: "Common S4 Counselling",
  description:
    "Comprehensive Clinical Counselling Scripts, Auxiliary Warning Labels, Indications, Instructions, Side Effects, and Lifestyle Advice",
};

const toc = [
  { id: "steroids", label: "Steroids" },
  { id: "rheumatology", label: "Rheumatology Medicines" },
  { id: "gout", label: "Gout Medicines" },
  { id: "neurological", label: "Neurological Medicines" },
  { id: "antipsychotics", label: "Antipsychotics" },
  { id: "bipolar", label: "Bipolar Disorder Medicines" },
  { id: "antidepressants", label: "Antidepressants" },
  { id: "anxiety-sleep", label: "Anxiety & Sleep Disorder Medicines" },
  { id: "adhd", label: "ADHD Medicines" },
  { id: "endocrine", label: "Endocrine & Diabetic Medicines" },
  { id: "thyroid", label: "Thyroid Medicines" },
  { id: "bisphosphonates", label: "Bisphosphonates" },
  { id: "gynaecological", label: "Gynaecological & ECP Medicines" },
  { id: "genitourinary", label: "Genitourinary & BPH/ED Medicines" },
  { id: "ppis", label: "PPIs & H2RAs" },
  { id: "antiemetics", label: "Antiemetics" },
  { id: "laxatives", label: "Laxatives" },
  { id: "antidiarrhoeal", label: "Antidiarrhoeal Medicines" },
  { id: "respiratory", label: "Respiratory Medicines" },
];

function BackToCounselling() {
  return (
    <Link
      href="/counselling"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to Counselling
    </Link>
  );
}

export default function CommonS4CounsellingPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Counselling</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        Common S4 Counselling
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-ink-soft">
        Comprehensive Clinical Counselling Scripts, Auxiliary Warning Labels, Indications,
        Instructions, Side Effects, and Lifestyle Advice
      </p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
        <RefocusNav items={toc} />
        <div className="min-w-0 lg:col-span-3">
          <BackToCounselling />
          <div className="mt-8">
            <S4Counselling />
          </div>
          <div className="mt-10">
            <BackToCounselling />
          </div>
        </div>
      </div>
      <Disclaimer />
    </article>
  );
}
