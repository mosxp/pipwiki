import type { ReactNode } from "react";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
      <h2 className="border-b border-line px-4 py-4 font-serif text-2xl tracking-tight text-ink">{title}</h2>
      <div className="space-y-4 px-4 py-5">{children}</div>
    </section>
  );
}

function Callout({ children, tone = "note" }: { children: ReactNode; tone?: "note" | "alert" }) {
  const toneClass =
    tone === "alert" ? "border-[#8c3b32] bg-[#f8ece8]" : "border-line bg-[#f3ecdf]";
  return <div className={`rounded-lg border px-4 py-3 text-sm leading-6 text-ink ${toneClass}`}>{children}</div>;
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const headClass = "px-3 py-2 font-medium";
const cellClass = "border-t border-line px-3 py-3 align-top";

function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm leading-6 text-ink">
        <thead className="bg-moss text-paper">
          <tr>
            {headers.map((header) => (
              <th key={header} className={headClass}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Row({
  index,
  cells,
  sticky = true,
}: {
  index: number;
  cells: ReactNode[];
  sticky?: boolean;
}) {
  return (
    <tr className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
      {cells.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className={`${cellClass} ${cellIndex === 0 && sticky ? "sticky left-0 z-10 min-w-40 bg-inherit font-medium" : "min-w-40"}`}
        >
          {cell}
        </td>
      ))}
    </tr>
  );
}

const definitions = [
  ["Phytocannabinoids", "Active cannabis compounds. They provide therapeutic effects."],
  [
    "Terpenes",
    "Active chemicals in cannabis, fruits, vegetables, spices, and oils. They provide plant aroma and potential therapeutic traits.",
  ],
  [
    "Entourage effect",
    "Cannabinoids and terpenes in full-spectrum products work synergistically. Full spectrum means the full range of compounds found in the raw cannabis plant.",
  ],
];

const cannabinoids = [
  {
    name: "THC (delta-9-tetrahydrocannabinol)",
    points: [
      "Psychoactive / euphoric “high”.",
      "Uses: relieves muscle spasms, pain, insomnia, nausea, and appetite loss.",
    ],
  },
  {
    name: "CBD (cannabidiol)",
    points: [
      "Non-psychoactive / non-intoxicating (minimal CNS action).",
      "Uses: anti-inflammatory, anti-epileptic, anxiolytic.",
      "Decreases unwanted THC side effects.",
    ],
  },
];

const strains = [
  ["Cannabis sativa", "Uplifting and energising. Daytime use (fatigue, energy, muscle spasticity, mood disorders)."],
  ["Cannabis indica", "Relaxing and calming. Evening use (insomnia, pain)."],
  [
    "*Hybrids",
    "Cross-breeding. Pure strains rarely exist. Most medicinal products are sativa-dominant or indica-dominant hybrids.",
  ],
];

const categories = [
  ["1", "CBD medicinal cannabis product", "S4", "≥ 98%", "< 2%"],
  ["2", "CBD-dominant medicinal cannabis product", "S8", "≥ 60% and < 98%", "Remaining content"],
  ["3", "Balanced medicinal cannabis product", "S8", "≥ 40% and < 60%", "Remaining content"],
  ["4", "THC-dominant medicinal cannabis product", "S8", "≥ 2% or < 40%", "≥ 60% and < 98%"],
  ["5", "THC medicinal cannabis product", "S8", "< 2%", "≥ 98%"],
];

const inhibitors = [
  "Antidepressants (fluoxetine, fluvoxamine)",
  "PPIs (omeprazole)",
  "Cimetidine",
  "Macrolide antibiotics (clarithromycin, erythromycin)",
  "Antimycotics (itraconazole, fluconazole, ketoconazole, miconazole)",
  "Calcium channel blockers (diltiazem, verapamil)",
  "HIV protease inhibitors (ritonavir)",
  "Amiodarone",
  "Isoniazid",
];

const inducers = [
  "Rifabutin",
  "Rifampicin",
  "Carbamazepine",
  "Phenobarbital",
  "Phenytoin",
  "Primidone",
  "St John’s wort",
];

const indications = [
  "Chemotherapy-induced nausea and/or vomiting",
  "Epilepsy in children",
  "Cancer pain and chronic non-cancer pain",
  "Neuropathic pain",
  "Muscle spasticity",
  "Palliative care",
];

const thcAvoid = [
  "Aged under 25 years.",
  "Previous psychosis, or an active mood or anxiety disorder.",
  "Pregnant, planning pregnancy, or breastfeeding.",
  "Unstable cardiovascular disease (unstable angina, arrhythmias, uncontrolled hypertension).",
  "History of drug or alcohol addiction.",
  "Allergy or hypersensitivity to cannabis or its constituents.",
];

export function MedicinalCannabis() {
  return (
    <div className="space-y-8">
      <Section id="cannabinoids" title="Cannabinoids, terpenes, and the endocannabinoid system">
        <Table headers={["Term", "Meaning"]}>
          {definitions.map(([term, meaning], index) => (
            <Row key={term} index={index} cells={[term, meaning]} />
          ))}
        </Table>
        <Callout>
          <p>
            <strong>Endocannabinoid system (ECS).</strong> Endocannabinoids, produced naturally by the body, bind cannabinoid receptors and regulate appetite, pain, mood, and memory.
          </p>
          <p className="mt-2">
            The cannabis plant contains more than 100 cannabinoids. The most studied cannabinoids used in medical treatment are cannabidiol (CBD) and delta-9-tetrahydrocannabinol (THC).
          </p>
        </Callout>
        <Table headers={["Cannabinoid", "Effects and uses"]}>
          {cannabinoids.map((item, index) => (
            <Row key={item.name} index={index} cells={[item.name, <Points key={item.name} items={item.points} />]} />
          ))}
        </Table>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Plant strains</h3>
          <Table headers={["Strain", "Effect"]}>
            {strains.map(([strain, effect], index) => (
              <Row key={strain} index={index} cells={[strain, effect]} />
            ))}
          </Table>
        </div>
      </Section>

      <Section id="regulation" title="Regulation and legalisation">
        <Table headers={["Topic", "Detail"]}>
          <Row
            index={0}
            cells={[
              "Regulatory body and scope",
              "The Therapeutic Goods Administration (TGA) regulates medicinal cannabis and approves all patient applications for use.",
            ]}
          />
          <Row
            index={1}
            cells={[
              "Key milestones (31 August 2016)",
              <Points
                key="milestones"
                items={[
                  "The Narcotics Drug Act 1967 was amended to permit cultivation and manufacturing for medical and research purposes.",
                  "The Poisons Standard moved products away from Schedule 9 (Prohibited Substance).",
                  "Schedule 8 (Controlled Medicines): products containing THC.",
                  "Schedule 4 (Prescription Only Medicines): CBD-dominant products. CBD is at least 98% of total cannabinoid content, and other naturally occurring cannabis cannabinoids are no more than 2% of total content.",
                ]}
              />,
            ]}
          />
          <Row
            index={2}
            cells={[
              "Dispensing compliance",
              <Points
                key="compliance"
                items={[
                  "The framework aligns manufacture, quality, and safe use with the Quality Use of Medicines and the National Medicines Policy.",
                  "Prescriptions must comply with both federal requirements and state or territory regulations.",
                ]}
              />,
            ]}
          />
          <Row
            index={3}
            cells={[
              "Registered products",
              "Listed on the Australian Register of Therapeutic Goods (ARTG).",
            ]}
          />
          <Row
            index={4}
            cells={[
              "Unregistered products",
              "The vast majority of available products are not listed on the ARTG and have not undergone the standard regulatory review. Before prescription through a TGA access pathway they must still meet TGO 93 (Standard for Medicinal Cannabis: quality and stability) and TGO 100 (Microbiological Standards for Medicines).",
            ]}
          />
        </Table>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Brand substitution by state</h3>
          <Table headers={["Jurisdiction", "Rule"]}>
            <Row
              index={0}
              cells={[
                "Victoria",
                <Points
                  key="vic"
                  items={[
                    "Substitution is allowed only if the active ingredients, strength, quantity, and form match, and the prescriber has not prohibited substitution.",
                    "Any variation requires verbal or written prescriber approval.",
                  ]}
                />,
              ]}
            />
            <Row
              index={1}
              cells={[
                "NSW, QLD, WA",
                <Points
                  key="other"
                  items={[
                    "Brand substitution is prohibited.",
                    "If a product is unavailable, the dispenser must contact the prescriber for a new prescription.",
                  ]}
                />,
              ]}
            />
          </Table>
        </div>
      </Section>

      <Section id="table-1" title="Table 1. Medicinal cannabis classifications">
        <Table
          headers={[
            "Category",
            "Approved indications",
            "Commonly prescribed for",
            "Access pathways",
            "Schedule",
            "Dosage form",
            "Storage",
          ]}
        >
          <Row
            index={0}
            cells={[
              "Registered products (ARTG listed)",
              <Points
                key="reg-ind"
                items={[
                  "CBD 100 mg/mL oral solution: Dravet syndrome (PBS subsidised); Lennox-Gastaut syndrome (not PBS subsidised).",
                  "1:1 CBD:THC oromucosal spray: moderate to severe multiple sclerosis spasticity.",
                ]}
              />,
              "Only TGA-approved indications.",
              "Standard prescription by a medical practitioner.",
              "Schedule 8 (Controlled Drug) or Schedule 4 (Prescription Only).",
              "Oral solution, or oromucosal spray.",
              <Points
                key="reg-store"
                items={[
                  "Oral solution: refrigerate before opening, then store at room temperature after opening.",
                  "Oromucosal spray: requires refrigeration.",
                ]}
              />,
            ]}
          />
          <Row
            index={1}
            cells={[
              "Unregistered products (not ARTG listed)",
              "None officially approved. Clinical justification is required. Not PBS listed.",
              <Points
                key="unreg-use"
                items={[
                  "Chemotherapy-induced nausea and/or vomiting.",
                  "Epilepsy in children.",
                  "Cancer pain.",
                  "Chronic non-cancer pain.",
                  "Muscle spasticity.",
                  "Insomnia.",
                ]}
              />,
              "Special Access Scheme Category B (SAS-B), or Authorised Prescriber (AP) approval. Approval is required before the script is written.",
              "Schedule 8 (Controlled Drug) or Schedule 4 (Prescription Only).",
              "Pastilles, wafers, oral oil, softgel capsule, flower, liquid extracts for inhalation, topical cream.",
              "Does not require refrigeration.",
            ]}
          />
        </Table>
      </Section>

      <Section id="prescribing" title="Prescriber and dispensing compliance">
        <Callout>
          <p className="font-medium">State-specific authorisations</p>
          <p className="mt-1">Prescribers may need state approval for:</p>
          <div className="mt-1">
            <Points
              items={[
                "Patients on opioid replacement therapy.",
                "Drug-dependent patients.",
                "Patients under 18 years of age.",
              ]}
            />
          </div>
        </Callout>
        <Table headers={["Rule", "Detail"]}>
          <Row
            index={0}
            cells={[
              "Paediatric access (as at 3 April 2025)",
              "Paediatric SAS-B applications must include specialist support, not a GP. Approval is for a maximum of 24 months. That timeframe is under review.",
            ]}
          />
          <Row index={1} cells={["Nurse practitioners", "Subject to further restrictions."]} />
          <Row
            index={2}
            cells={[
              "Eligible prescribers (as at May 2025)",
              "Any doctor or nurse practitioner can prescribe unregistered medicinal cannabis via the SAS-B or AP pathways.",
            ]}
          />
          <Row
            index={3}
            cells={[
              "SAS-B",
              "Requires approval for a specific patient and a specific indication.",
            ]}
          />
          <Row
            index={4}
            cells={[
              "Authorised Prescriber",
              "Available to more experienced doctors, with authority to prescribe to a class of patients. Doctors must notify state health departments where applicable.",
            ]}
          />
          <Row
            index={5}
            cells={[
              "Pharmacist records",
              <div key="records">
                <p>Retain approvals for the prescribed active ingredients.</p>
                <p className="mt-2">
                  <strong>510 battery.</strong> A separate SAS-B approval is required when dispensing cartridges. The battery powers the cartridge for drug delivery and is classified as a distinct accessory.
                </p>
              </div>,
            ]}
          />
          <Row
            index={6}
            cells={[
              "Prescriber prerequisite",
              "Confirm that first-line treatments have failed or are contraindicated, and assess medical and social risk factors.",
            ]}
          />
          <Row
            index={7}
            cells={[
              "Pharmacist S8 compliance",
              "Strict adherence to federal and state rules for S8 ordering, storage, supply, and destruction.",
            ]}
          />
        </Table>
      </Section>

      <Section id="table-2" title="Table 2. Product categories (November 2021)">
        <p className="text-sm leading-6 text-ink-soft">
          Category approvals replaced product-specific approvals. The category is based on the CBD proportion of total cannabinoid content. A new application is not required for each product, so a patient can change products within the same category.
        </p>
        <Table
          headers={[
            "Category",
            "Name",
            "Schedule",
            "CBD content",
            "Other cannabinoids, other than CBD*",
          ]}
        >
          {categories.map((row, index) => (
            <Row key={row[0]} index={index} cells={row} />
          ))}
        </Table>
        <p className="text-sm leading-6 text-ink-soft">* Other cannabinoids can include THC.</p>
      </Section>

      <Section id="s3" title="Schedule 3 over-the-counter status">
        <Callout tone="alert">
          <p>
            From February 2021, low-dose CBD at <strong>≤150 mg/day</strong> is classified as a Schedule 3 over-the-counter medicine.
          </p>
          <p className="mt-2">
            <strong>No products are currently listed on the ARTG for S3 supply.</strong>
          </p>
        </Callout>
        <Table headers={["Point", "Detail"]}>
          <Row
            index={0}
            cells={["TGA requirement", "Efficacy must be demonstrated through clinical trials."]}
          />
          <Row
            index={1}
            cells={[
              "Evidence mismatch",
              "The existing evidence base is mostly at higher doses (300–600 mg/day). Data at ≤150 mg/day are limited, inconclusive, and lack robust evidence.",
            ]}
          />
          <Row
            index={2}
            cells={[
              "Outcome",
              "The lack of robust trial data prevents TGA approval for over-the-counter pharmacy supply.",
            ]}
          />
        </Table>
      </Section>

      <Section id="compounding" title="Compounding rules and veterinary use">
        <Callout tone="alert">
          <strong>Bulk compounding is prohibited.</strong> A compounded product is prepared by a pharmacist for a specific patient at the time of need. It must not be prepared in advance or in anticipation of future scripts.
        </Callout>
        <Table headers={["Rule", "Detail"]}>
          <Row
            index={0}
            cells={[
              "Core rules (from April 2022)",
              <Points
                key="core"
                items={[
                  "Follow the Pharmacy Board of Australia standard for compounding medicines.",
                  "Extemporaneous compounding requires a valid prescription plus SAS-B or AP approval.",
                  "Prepared for a specific patient at the time of need only.",
                ]}
              />,
            ]}
          />
          <Row
            index={1}
            cells={[
              "Quality and records",
              "Comply with the Therapeutic Goods (Standard for Medicinal Cannabis) (TGO 93) Order 2017. Keep comprehensive records that demonstrate ongoing compliance.",
            ]}
          />
          <Row
            index={2}
            cells={[
              "Veterinary use",
              <Points
                key="vet"
                items={[
                  "Compounding is the only legal method of supply.",
                  "Strictly limited to Schedule 4 CBD products: CBD at least 98%, and other cannabinoids under 2%.",
                  "Must comply with state and federal rules, including the APVMA and the Pharmacy Board.",
                ]}
              />,
            ]}
          />
        </Table>
      </Section>

      <Section id="therapeutic" title="Therapeutic role, safety, and interactions">
        <Callout>
          <p>
            Evidence is limited. Medicinal cannabis is <strong>not endorsed as first-line treatment or as monotherapy</strong>. It is used under medical supervision only when first-line options fail or are unsuitable. Further research is needed for prescribing and dispensing practice.
          </p>
        </Callout>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Potential indications</h3>
          <Points items={indications} />
        </div>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">THC-containing products</h3>
          <p className="mb-2 text-sm leading-6">
            <strong>CBD-containing products</strong> are generally safe and well tolerated.
          </p>
          <Callout tone="alert">
            <p className="font-medium">THC-containing products are not appropriate for patients who:</p>
            <div className="mt-1">
              <Points items={thcAvoid} />
            </div>
          </Callout>
        </div>
        <Table headers={["Topic", "Detail"]}>
          <Row
            index={0}
            cells={[
              "Toxicity and addiction",
              "Low acute toxicity and low addictive potential when prescribed under medical supervision. Tolerance or dependence may occur, but few studies report addiction rates compared with recreational use.",
            ]}
          />
          <Row
            index={1}
            cells={[
              "Overdose",
              "Cannabinoid receptor density is low in the brainstem cardiorespiratory centres. There is no evidence of fatal overdose or respiratory depression.",
            ]}
          />
          <Row
            index={2}
            cells={[
              "Common side effects",
              "Depend on the cannabinoid profile and the patient’s ECS sensitivity. Drowsiness, dizziness, changes to mental alertness and coordination, increased appetite, nausea, and cough or dry mouth with inhaled forms.",
            ]}
          />
          <Row
            index={3}
            cells={[
              "Rare and high-THC effects",
              "Rare: toxic psychosis, paranoia, tachycardia, cannabis hyperemesis. High THC concentration or large doses: increased anxiety, disorientation, and intoxication.",
            ]}
          />
          <Row
            index={4}
            cells={[
              "Monitoring",
              "Monitor the health parameters that the medicine can affect, for example blood pressure in a patient with hypertension. Patients should record which formulations and doses give the greatest relief.",
            ]}
          />
        </Table>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">CYP450 interactions</h3>
          <p className="mb-3 text-sm leading-6 text-ink">
            Cannabis is metabolised by hepatic cytochrome P450. Medicines that share this pathway can cause clinically significant pharmacokinetic interactions. Higher THC levels are associated with more adverse effects.
          </p>
          <div className="grid gap-4 xl:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium tracking-wide text-ink uppercase">
                Increase THC levels (CYP inhibitors)
              </h4>
              <Points items={inhibitors} />
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium tracking-wide text-ink uppercase">
                Decrease THC levels (CYP inducers)
              </h4>
              <Points items={inducers} />
            </div>
          </div>
        </div>
        <Callout tone="alert">
          <p>
            <strong>CBD increases clobazam blood levels.</strong> Clobazam is used in children with refractory epilepsy. Concurrent use needs close monitoring under specialist supervision.
          </p>
          <p className="mt-2">
            Medicinal cannabis plus CNS depressants (benzodiazepines, hypnotics, opioid analgesics) can cause oversedation or marked impairment of alertness and coordination. Patients on more than one sedating or psychoactive medicine need that risk explained.
          </p>
        </Callout>
      </Section>

      <Section id="counselling" title="Important considerations and patient counselling">
        <Table headers={["Topic", "Detail"]}>
          <Row
            index={0}
            cells={[
              "Victoria driving laws (March 2025)",
              "Magistrates were granted discretion over driver licence suspensions. Pharmacists must advise patients on the driving implications.",
            ]}
          />
          <Row
            index={1}
            cells={[
              "Expiry labelling",
              "An updated expiry date must appear on the product label, not on a separate letter. Expired packaging needs supplier relabelling before dispensing. Extension letters are not permitted.",
            ]}
          />
          <Row
            index={2}
            cells={[
              "Cost",
              "Most products are not PBS-listed. Prescribers need to consider ongoing cost. Some dispensaries or suppliers offer concession discounts or compassionate access.",
            ]}
          />
        </Table>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Dosing and titration</h3>
          <Callout>
            <p>
              Dosing is individualised to the condition, sensitivity, and tolerance. <strong>Start low, go slow</strong>, and titrate to the lowest effective dose.
            </p>
            <div className="mt-2">
              <Points
                items={[
                  "THC doses above 40 mg/day are not recommended. They increase adverse events and tolerance.",
                  "CBD has no established maximum because toxicity is low. The therapeutic range is typically 100–800 mg/day.",
                  "Prescribers should set a maximum daily dose, even when the range is broad.",
                  "A monthly limit may be set for symptom flare-ups.",
                  "The pharmacist is not legally required to enforce a monthly limit. That responsibility rests with the prescriber. The limit appears on the script, not on the AP or SAS-B approval.",
                  "State approaches vary. NSW uses dispensing intervals.",
                ]}
              />
            </div>
          </Callout>
        </div>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Routes of administration</h3>
          <Table headers={["Route", "Onset and use"]}>
            <Row
              index={0}
              cells={[
                "Oral ingestion (oils, softgels)",
                "Slow onset (30–90 minutes) and a long duration (8–12 hours). Preferred for chronic conditions.",
              ]}
            />
            <Row
              index={1}
              cells={[
                "Inhalation (dried flower, vaporisation)",
                "Rapid onset (5–10 minutes). Preferred for acute symptoms such as pain, anxiety, and spasms.",
              ]}
            />
            <Row
              index={2}
              cells={["Other forms", "Sublingual wafers, liquid extracts for inhalation, and topical creams."]}
            />
          </Table>
        </div>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Counselling tips</h3>
          <p className="mb-3 text-sm leading-6 text-ink">
            The patient needs to understand the dosing regimen, especially where titration is involved, and how to administer the product. A dosing diary helps them record outcomes and report progress to the prescriber.
          </p>
          <Table headers={["Setting", "Points"]}>
            <Row
              index={0}
              cells={[
                "General dosing",
                <Points
                  key="general"
                  items={[
                    "Emphasise the titration schedule and the correct administration method.",
                    "A doctor may give a regimen for the first days or weeks so the dose can rise gradually to the lowest effective dose.",
                  ]}
                />,
              ]}
            />
            <Row
              index={1}
              cells={[
                "Oral oils",
                <Points
                  key="oils"
                  items={[
                    "Measure the dose with the oral syringe or dropper provided.",
                    "Take with or after food, especially a healthy fat such as cheese, yoghurt, nuts, or oil, to increase absorption.",
                    "Onset is 30–90 minutes. Schedule the dose so it covers the symptoms. The full benefit may take 1–2 weeks.",
                    "May cause drowsiness and increase the effects of alcohol. Do not drive or operate machinery if affected.",
                    "Avoid grapefruit and grapefruit juice.",
                    "For oral use only. Do not vaporise, smoke, or combust the oil.",
                  ]}
                />,
              ]}
            />
            <Row
              index={2}
              cells={[
                "Inhaled flower",
                <Points
                  key="flower"
                  items={[
                    "Use a dry-herb vaporiser. Vaporisation is preferred over combustion because it extracts cannabinoids and reduces lung damage.",
                    "Effect is within minutes. Wait 10–15 minutes and assess the effect before repeating the dose.",
                    "May cause drowsiness and increase the effects of alcohol. Do not drive or operate machinery if affected.",
                    "Avoid grapefruit and grapefruit juice.",
                  ]}
                />,
              ]}
            />
          </Table>
        </div>
      </Section>
    </div>
  );
}
