import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Disclaimer } from "@/components/disclaimer";
import { ApprovedPersons } from "@/components/qld-law/approved-persons";
import { AsOfRightAuthorisation } from "@/components/qld-law/as-of-right-authorisation";
import { DepartmentalStandards } from "@/components/qld-law/departmental-standards";
import { DepartmentalStandardCompounding } from "@/components/qld-law/departmental-standard-compounding";
import { DepartmentalStandardSubstanceManagementPlans } from "@/components/qld-law/departmental-standard-substance-management-plans";
import { DepartmentalStandardElectronicPrescription } from "@/components/qld-law/departmental-standard-electronic-prescription";
import { DepartmentalStandardMonitoredMedicines } from "@/components/qld-law/departmental-standard-monitored-medicines";
import { DepartmentalStandardPseudoephedrine } from "@/components/qld-law/departmental-standard-pseudoephedrine";
import { DepartmentalStandardSecureStorage } from "@/components/qld-law/departmental-standard-secure-storage";
import { DiversionRiskDestruction } from "@/components/qld-law/diversion-risk-destruction";
import { EmergencyOrders } from "@/components/qld-law/emergency-orders";
import { ExtendedPracticeAuthorities } from "@/components/qld-law/extended-practice-authorities";
import { ImageBasedPrescriptions } from "@/components/qld-law/image-based-prescriptions";
import { InterstatePrescriptions } from "@/components/qld-law/interstate-prescriptions";
import { LawfulPrescriptions } from "@/components/qld-law/lawful-prescriptions";
import { MedicineCategories } from "@/components/qld-law/medicine-categories";
import { MdmaPsilocybine } from "@/components/qld-law/mdma-psilocybine";
import { MedicinesFramework } from "@/components/qld-law/medicines-framework";
import { MonitoredMedicinesQscript } from "@/components/qld-law/monitored-medicines-qscript";
import { PharmacistRequirements } from "@/components/qld-law/pharmacist-requirements";
import { PrescriberBag } from "@/components/qld-law/prescriber-bag";
import { PrescriberScopes } from "@/components/qld-law/prescriber-scopes";
import { Psychostimulants } from "@/components/qld-law/psychostimulants";
import { PurposesOfTheAct } from "@/components/qld-law/purposes-of-the-act";
import { QotpProgram } from "@/components/qld-law/qotp-program";
import { QscriptGuide } from "@/components/qld-law/qscript-guide";
import { RelevantInstitutions } from "@/components/qld-law/relevant-institutions";
import { Schedule8Storage } from "@/components/qld-law/schedule-8-storage";
import { SelfPrescribeOffence } from "@/components/qld-law/self-prescribe-offence";
import { SubstanceAuthorities } from "@/components/qld-law/substance-authorities";
import { UnapprovedMedicinalCannabis } from "@/components/qld-law/unapproved-medicinal-cannabis";
import { SubstanceManagementPlans } from "@/components/qld-law/substance-management-plans";
import { TherapeuticVapes } from "@/components/qld-law/therapeutic-vapes";
import { allLawTopics, getLawTopic } from "@/lib/qld-law";

const topicNotes: Record<
  string,
  {
    subtitle: string;
    factsheet?: string;
    factsheets?: { label: string; href: string; text?: string }[];
    content: React.ReactNode;
  }
> = {
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
  "prescribers-inter-professional-prescribing-scopes": {
    subtitle: "QLD Pharmacy Law - Medicine - Approved Persons",
    factsheets: [
      {
        label: "Medical Practitioners",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0014/1144310/fs-medical-practitioners.pdf",
      },
      {
        label: "Dental Practitioners",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0015/1111506/info-sheet-dental-practitioners.pdf",
      },
      {
        label: "Nurse Practitioners",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0015/1144311/fs-nurse-practitioners.pdf",
      },
      {
        label: "Nurses",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0015/1111740/fs-nurses.pdf",
      },
      {
        label: "Midwives",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0023/1111739/fs-midwives.pdf",
      },
      {
        label: "Veterinary surgeons",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0026/1111499/fs-veterinary-surgeons.pdf",
      },
    ],
    content: <PrescriberScopes />,
  },
  "writing-lawful-prescriptions": {
    subtitle:
      "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - Prescription",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0011/1115003/writing-lawful-prescriptions.pdf",
    content: <LawfulPrescriptions />,
  },
  "interstate-prescriptions-for-dispensing": {
    subtitle:
      "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - Prescription",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0020/1161641/fs-interstate-prescribing.pdf",
    content: <InterstatePrescriptions />,
  },
  "image-based-prescriptions": {
    subtitle:
      "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - Prescription",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0016/1111507/image-based-prescriptions.pdf",
    content: <ImageBasedPrescriptions />,
  },
  "prescribing-psychostimulants": {
    subtitle:
      "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - Special & Restricted Medicines",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0021/1160391/fs-prescribing-psychostimulants.pdf",
    content: <Psychostimulants />,
  },
  "schedule-8-mdma-and-psilocybine": {
    subtitle:
      "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - Special & Restricted Medicines",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0028/1246780/mpa-s8-mdma-S8-psilocybine.pdf",
    content: <MdmaPsilocybine />,
  },
  "unapproved-medicinal-cannabis": {
    subtitle:
      "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - Special & Restricted Medicines",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0032/1256756/fs-prescribing-dispensing-unapproved-medicinal-cannabis.pdf",
    content: <UnapprovedMedicinalCannabis />,
  },
  "therapeutic-vapes": {
    subtitle:
      "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - Special & Restricted Medicines",
    factsheet: "https://www.health.qld.gov.au/__data/assets/pdf_file/0035/1364975/fs-therapeutic-vapes.pdf",
    content: <TherapeuticVapes />,
  },
  "schedule-8-storage-and-record-keeping": {
    subtitle: "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - S8 Safe",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0024/1159071/storage-record-keeping-s8-medicines.pdf",
    content: <Schedule8Storage />,
  },
  "destruction-of-diversion-risk-medicine-waste": {
    subtitle: "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - S8 Safe",
    factsheet:
      "https://www.health.qld.gov.au/__data/assets/pdf_file/0022/1113097/fs-disposal-destruction-medicine-waste.pdf",
    content: <DiversionRiskDestruction />,
  },
  "monitored-medicines-qscript": {
    subtitle:
      "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - Monitored Medicines",
    factsheets: [
      {
        label: "Checking QScript",
        text: "Checking QScript (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0025/1247470/guide-checking-QScript.pdf",
      },
      {
        label: "Changes to QScript look-up and Monitored Medicines Standard requirements",
        text: "Changes to QScript look-up and Monitored Medicines Standard requirements (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0023/1326254/fs-changes-qscript-lookup-mms-requirements.pdf",
      },
      {
        label: "QScript look-up exemptions",
        text: "QScript look-up exemptions (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0027/1344285/Guide-QScript-look-up-exemptions-frequently-asked-questions.pdf",
      },
      {
        label: "Changes to the Monitored Medicines Standard",
        text: "Changes to the Monitored Medicines Standard (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0021/1336215/faq-changes-to-mms.pdf",
      },
    ],
    content: <MonitoredMedicinesQscript />,
  },
  "qotp-queensland-opioid-treatment-program": {
    subtitle:
      "QLD Pharmacy Law - Medicine - Functional and Technical Requirements - Monitored Medicines",
    factsheets: [
      {
        label: "QOTP legislative requirements",
        text: "Queensland Health QOTP legislative requirements guide (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0032/1276763/guide-qotp-legislative-require-mpa.pdf",
      },
    ],
    content: <QotpProgram />,
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
  "departmental-standard-monitored-medicines": {
    subtitle: "QLD Pharmacy Law - Departmental Standards - Medicines",
    factsheets: [
      {
        label: "Departmental Standard – Monitored Medicines",
        text: "Departmental Standard – Monitored Medicines (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0029/1108937/ds-monitored-medicines.pdf",
      },
    ],
    content: <DepartmentalStandardMonitoredMedicines />,
  },
  "departmental-standard-secure-storage-of-s8-medicines": {
    subtitle: "QLD Pharmacy Law - Departmental Standards - Medicines",
    factsheets: [
      {
        label: "Departmental Standard – Secure Storage of S8 Medicines",
        text: "Departmental Standard – Secure Storage of S8 Medicines (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0031/1108939/ds-secure-storage-s8-medicines.pdf",
      },
    ],
    content: <DepartmentalStandardSecureStorage />,
  },
  "departmental-standard-pseudoephedrine-recording": {
    subtitle: "QLD Pharmacy Law - Departmental Standards - Medicines",
    factsheets: [
      {
        label: "Departmental Standard – Pseudoephedrine Recording",
        text: "Departmental Standard – Pseudoephedrine Recording (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0030/1108938/ds-pseudoephedrine-recording.pdf",
      },
    ],
    content: <DepartmentalStandardPseudoephedrine />,
  },
  "departmental-standard-compounding": {
    subtitle: "QLD Pharmacy Law - Departmental Standards - Medicines",
    factsheets: [
      {
        label: "Departmental Standard – Compounding",
        text: "Departmental Standard – Compounding (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0027/1108935/ds-compounding.pdf",
      },
    ],
    content: <DepartmentalStandardCompounding />,
  },
  "departmental-standard-substance-management-plans": {
    subtitle: "QLD Pharmacy Law - Departmental Standards - Medicines",
    factsheets: [
      {
        label: "Departmental Standard – Substance Management Plans for Medicines",
        text: "Departmental Standard – Substance Management Plans for Medicines (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0023/1108940/ds-substance-management-plans-medicines.pdf",
      },
    ],
    content: <DepartmentalStandardSubstanceManagementPlans />,
  },
  "departmental-standard-electronic-prescription-management-system": {
    subtitle: "QLD Pharmacy Law - Departmental Standards - Medicines",
    factsheets: [
      {
        label: "Departmental Standard – Requirements for an Electronic Prescription Management System",
        text: "Departmental Standard – Requirements for an Electronic Prescription Management System (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0028/1108936/ds-electronic-prescription-management-system.pdf",
      },
    ],
    content: <DepartmentalStandardElectronicPrescription />,
  },
  "extended-practice-authorities-pharmacists": {
    subtitle: "QLD Pharmacy Law",
    factsheets: [
      {
        label: "Extended Practice Authority – Pharmacists",
        text: "Extended Practice Authority – Pharmacists (PDF)",
        href: "https://www.health.qld.gov.au/__data/assets/pdf_file/0027/1108944/epa-pharmacists.pdf",
      },
    ],
    content: null,
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
          {note.factsheets ? (
            <ul className="mt-3 flex flex-col gap-1.5">
              {note.factsheets.map((sheet) => (
                <li key={sheet.href}>
                  <a
                    href={sheet.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-amber-800 underline hover:text-amber-950"
                  >
                    {sheet.text ?? `${sheet.label} factsheet (PDF)`}
                    <ExternalLinkIcon />
                  </a>
                </li>
              ))}
            </ul>
          ) : note.factsheet ? (
            <a
              href={note.factsheet}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-amber-800 underline hover:text-amber-950"
            >
              View Original Queensland Health Factsheet (PDF)
              <ExternalLinkIcon />
            </a>
          ) : null}
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
