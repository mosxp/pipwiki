import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Disclaimer } from "@/components/disclaimer";
import { ApprovedPersons } from "@/components/qld-law/approved-persons";
import { AsOfRightAuthorisation } from "@/components/qld-law/as-of-right-authorisation";
import { DepartmentalStandards } from "@/components/qld-law/departmental-standards";
import { EmergencyOrders } from "@/components/qld-law/emergency-orders";
import { ExtendedPracticeAuthorities } from "@/components/qld-law/extended-practice-authorities";
import { MedicineCategories } from "@/components/qld-law/medicine-categories";
import { MedicinesFramework } from "@/components/qld-law/medicines-framework";
import { PharmacistRequirements } from "@/components/qld-law/pharmacist-requirements";
import { PrescriberBag } from "@/components/qld-law/prescriber-bag";
import { PurposesOfTheAct } from "@/components/qld-law/purposes-of-the-act";
import { QscriptGuide } from "@/components/qld-law/qscript-guide";
import { RelevantInstitutions } from "@/components/qld-law/relevant-institutions";
import { SelfPrescribeOffence } from "@/components/qld-law/self-prescribe-offence";
import { SubstanceAuthorities } from "@/components/qld-law/substance-authorities";
import { SubstanceManagementPlans } from "@/components/qld-law/substance-management-plans";
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
  "emergency-orders-and-public-warnings": {
    subtitle: "QLD Pharmacy Law - Medicine - General",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0029/1108982/fs-emerg-order-risk-declarations-recall-pub-warn.pdf",
    content: <EmergencyOrders />,
  },
  "general-extended-practice-authorities": {
    subtitle: "QLD Pharmacy Law - Medicine - General",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0035/1108979/fs-ext-practice-authorities.pdf",
    content: <ExtendedPracticeAuthorities />,
  },
  "approved-persons-extended-practice-authorities": {
    subtitle: "QLD Pharmacy Law - Medicine - General",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0035/1108979/fs-ext-practice-authorities.pdf",
    content: <ExtendedPracticeAuthorities />,
  },
  "as-of-right-authorisation-for-immunisation-medicines": {
    subtitle: "QLD Pharmacy Law - Medicine - Approved Persons",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0019/1490500/fs-as-of-right-immunisation-medicine-authorisation.pdf",
    content: <AsOfRightAuthorisation />,
  },
  "qscript-pharmaceutical-professions-and-guide": {
    subtitle: "QLD Pharmacy Law - Medicine - Approved Persons",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0036/1196676/fs-pharmacy-professions-qscript.pdf",
    content: <QscriptGuide />,
  },
  "offence-to-self-prescribe-or-self-administer": {
    subtitle: "QLD Pharmacy Law - Medicine - Approved Persons",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0026/1159316/fs-offence-selfprescribe-administer-highriskmeds.pdf",
    content: <SelfPrescribeOffence />,
  },
  "prescriber-bag-stock-vs-prescriptions": {
    subtitle: "QLD Pharmacy Law - Medicine - Approved Persons",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0026/1159316/fs-offence-selfprescribe-administer-highriskmeds.pdf",
    content: <PrescriberBag />,
  },
  "relevant-institutions": {
    subtitle: "QLD Pharmacy Law - Medicine - Approved Persons",
    factsheet: "https://www.health.qld.gov.au/__data/assets/pdf_file/0030/1142976/fs-relevant-institutions.pdf",
    content: <RelevantInstitutions />,
  },
  "pharmacists-key-legislative-requirements": {
    subtitle: "QLD Pharmacy Law - Medicine - Approved Persons",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0020/1023383/what-pharmacists-need-to-know.pdf",
    content: <PharmacistRequirements />,
  },
  "substance-management-plans": {
    subtitle: "QLD Pharmacy Law - Medicine - General",
    factsheet: "https://www.health.qld.gov.au/__data/assets/pdf_file/0028/1108972/fs-substance-mgmt-plans.pdf",
    content: <SubstanceManagementPlans />,
  },
  "departmental-standards-medicines": {
    subtitle: "QLD Pharmacy Law - Medicine - General",
    factsheet: "https://www.health.qld.gov.au/__data/assets/pdf_file/0027/1108971/fs-dept-stds.pdf",
    content: <DepartmentalStandards />,
  },
  "categories-of-medicines-and-dealings": {
    subtitle: "QLD Pharmacy Law - Medicine - General",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0035/1108988/fs-dealings-medicine-categories.pdf",
    content: <MedicineCategories />,
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
