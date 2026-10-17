import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Disclaimer } from "@/components/disclaimer";
import { ApprovedPersons } from "@/components/qld-law/approved-persons";
import { MedicinesFramework } from "@/components/qld-law/medicines-framework";
import { PurposesOfTheAct } from "@/components/qld-law/purposes-of-the-act";
import { SubstanceAuthorities } from "@/components/qld-law/substance-authorities";
import { allLawTopics, getLawTopic } from "@/lib/qld-law";

const topicNotes: Record<string, { subtitle: string; factsheet: string; content: React.ReactNode }> = {
  "purposes-of-the-act": {
    subtitle: "Queensland: Medicines and Poisons Act 2019",
    factsheet: "https://www.health.qld.gov.au/__data/assets/pdf_file/0030/1108974/fs-purposes-act.pdf",
    content: <PurposesOfTheAct />,
  },
  "overview-of-the-medicines-framework": {
    subtitle: "QLD Pharmacy Law - Medicine - General",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0032/1108976/fs-overview-meds-framework.pdf",
    content: <MedicinesFramework />,
  },
  "approved-persons-and-authorised-activities": {
    subtitle: "QLD Pharmacy Law - Medicine - General",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0032/1108985/fs-authorisations-activities-mpa.pdf",
    content: <ApprovedPersons />,
  },
  "substance-authorities": {
    subtitle: "QLD Pharmacy Law - Medicine - General",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0029/1108991/fs-substance-authorities-mpa.pdf",
    content: <SubstanceAuthorities />,
  },
};

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  return allLawTopics().map((topic) => ({ topic: topic.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getLawTopic(slug);
  if (!topic) return { title: "Topic not found" };

  return {
    title: topic.title,
    description: `${topic.title} — QLD Pharmacy Law notes.`,
  };
}

export default async function QldLawTopicPage({ params }: TopicPageProps) {
  const { topic: slug } = await params;
  const topic = getLawTopic(slug);
  if (!topic) notFound();

  const trail = ["QLD Pharmacy Law", ...topic.crumbs].join(" · ");
  const note = topicNotes[slug];

  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">{trail}</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">{topic.title}</h1>
      {note ? (
        <>
          <p className="mt-3 text-lg leading-7 text-ink-soft">{note.subtitle}</p>
          <a
            href={note.factsheet}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-amber-800 underline hover:text-amber-950"
          >
            View Original Queensland Health Factsheet (PDF)
            <ExternalLinkIcon />
          </a>
        </>
      ) : null}
      <div className="mt-6">
        <BackToHub />
      </div>
      {note ? note.content : <p className="mt-8 text-base leading-7 text-ink-soft">This note has not been written yet.</p>}
      <div className="mt-10">
        <BackToHub />
      </div>
      <Disclaimer />
    </article>
  );
}

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

function BackToHub() {
  return (
    <Link
      href="/qld-law"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to QLD Pharmacy Law
    </Link>
  );
}
