export type LawNode = {
  title: string;
  slug?: string;
  children?: LawNode[];
};

export type LawTopic = {
  slug: string;
  title: string;
  crumbs: string[];
};

export const qldLawSections: LawNode[] = [
  {
    title: "Medicine",
    children: [
      {
        title: "General",
        children: [
          { title: "Purposes of the Act", slug: "purposes-of-the-act" },
          {
            title: "Overview of the Medicines Framework (MPA 2019)",
            slug: "overview-of-the-medicines-framework",
          },
          {
            title: "Approved Persons & Authorised Activities (MPA 2019)",
            slug: "approved-persons-and-authorised-activities",
          },
          { title: "Substance Authorities (MPA 2019)", slug: "substance-authorities" },
          {
            title: "Emergency Orders, Emerging Risk Declarations, Recall Orders & Public Warnings",
            slug: "emergency-orders-and-public-warnings",
          },
          {
            title: "Extended Practice Authorities (EPA)",
            slug: "general-extended-practice-authorities",
          },
          { title: "Substance Management Plans (SMP)", slug: "substance-management-plans" },
          {
            title: "Departmental Standards (Medicines)",
            slug: "departmental-standards-medicines",
          },
          {
            title: "Categories of Medicines and Dealings (MPA 2019)",
            slug: "categories-of-medicines-and-dealings",
          },
        ],
      },
      {
        title: "Approved Persons",
        children: [
          {
            title: "As-of-Right Authorisation for Immunisation Medicines",
            slug: "as-of-right-authorisation-for-immunisation-medicines",
          },
          {
            title: "Relevant Institutions (Aged Care, Hospitals, Prisons & Detention Centres)",
            slug: "relevant-institutions",
          },
          {
            title: "PHARMACISTS: Key Legislative Requirements for Pharmacists (MPA 2019 & MPMR 2021)",
            slug: "pharmacists-key-legislative-requirements",
          },
          {
            title: "PRESCRIBERS: Inter-Professional Prescribing & Dealing Scopes (MPMR 2021)",
            slug: "prescribers-inter-professional-prescribing-scopes",
          },
        ],
      },
      {
        title: "Functional and Technical Requirements",
        children: [
          {
            title: "Prescription",
            children: [
              {
                title: "Writing Lawful Prescriptions (MPMR 2021)",
                slug: "writing-lawful-prescriptions",
              },
              {
                title: "Interstate Prescriptions for Dispensing (MPA 2019 & MPMR 2021)",
                slug: "interstate-prescriptions-for-dispensing",
              },
              {
                title: "Image-Based Prescriptions (MPMR 2021)",
                slug: "image-based-prescriptions",
              },
            ],
          },
          {
            title: "Doctor's Bag, Self-Prescribing & QScript",
            children: [
              {
                title: "QScript: Pharmaceutical Professions and QScript Guide",
                slug: "qscript-pharmaceutical-professions-and-guide",
              },
              {
                title: "Offence to Self-Prescribe and/or Self-Administer High-Risk Medicines",
                slug: "offence-to-self-prescribe-or-self-administer",
              },
              {
                title: "Prescriber Bag Stock vs. Prescriptions (Avoiding False QScript Flags)",
                slug: "prescriber-bag-stock-vs-prescriptions",
              },
            ],
          },
          {
            title: "Special & Restricted Medicines",
            children: [
              {
                title: "Prescribing Psychostimulants (MPA 2019 & MPMR 2021)",
                slug: "prescribing-psychostimulants",
              },
              {
                title: "Schedule 8 – MDMA and Psilocybine (MPMR 2021)",
                slug: "schedule-8-mdma-and-psilocybine",
              },
              {
                title: "Prescribing & Dispensing Unapproved Medicinal Cannabis (MPA 2019 & MPMR 2021)",
                slug: "unapproved-medicinal-cannabis",
              },
              { title: "Therapeutic Vapes (MPA 2019 & MPMR 2021)", slug: "therapeutic-vapes" },
            ],
          },
          {
            title: "Monitored Medicines",
            children: [
              { title: "Monitored Medicines & QScript", slug: "monitored-medicines-qscript" },
              {
                title: "QOTP: Queensland Opioid Treatment Program",
                slug: "qotp-queensland-opioid-treatment-program",
              },
            ],
          },
          {
            title: "S8 Safe",
            children: [
              {
                title: "Storage and Record-Keeping for Schedule 8 Medicines (MPMR 2021)",
                slug: "schedule-8-storage-and-record-keeping",
              },
              {
                title: "Destruction of Diversion-Risk Medicine Waste (MPMR 2021)",
                slug: "destruction-of-diversion-risk-medicine-waste",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Departmental Standards - Medicines",
    children: [
      {
        title: "Departmental Standard – Monitored Medicines",
        slug: "departmental-standard-monitored-medicines",
      },
      {
        title: "Departmental Standard – Secure Storage of S8 Medicines",
        slug: "departmental-standard-secure-storage-of-s8-medicines",
      },
      {
        title: "Departmental Standard – Pseudoephedrine Recording",
        slug: "departmental-standard-pseudoephedrine-recording",
      },
      { title: "Departmental Standard – Compounding", slug: "departmental-standard-compounding" },
      {
        title: "Departmental Standard – Substance Management Plans for Medicines",
        slug: "departmental-standard-substance-management-plans",
      },
      {
        title: "Departmental Standard – Requirements for an Electronic Prescription Management System",
        slug: "departmental-standard-electronic-prescription-management-system",
      },
    ],
  },
  {
    title: "Extended Practice Authorities - Pharmacists",
    slug: "extended-practice-authorities-pharmacists",
  },
];

export function allLawTopics(nodes: LawNode[] = qldLawSections, crumbs: string[] = []): LawTopic[] {
  const topics: LawTopic[] = [];

  for (const node of nodes) {
    if (node.slug) topics.push({ slug: node.slug, title: node.title, crumbs });
    if (node.children) topics.push(...allLawTopics(node.children, [...crumbs, node.title]));
  }

  return topics;
}

const topics = allLawTopics();
const slugs = new Set(topics.map((topic) => topic.slug));

if (slugs.size !== topics.length) {
  throw new Error("QLD law topics contain a duplicate slug.");
}

export function getLawTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug) ?? null;
}
