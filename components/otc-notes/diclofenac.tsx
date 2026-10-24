import type { ReactNode } from "react";
import { ZoomImage } from "@/components/counselling/zoom-image";

function Strong({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "alert" | "summary" | "moss";
}) {
  const color = {
    ink: "text-ink",
    alert: "text-[var(--alert)]",
    summary: "text-[var(--summary)]",
    moss: "text-moss",
  }[tone];

  return <strong className={`font-semibold ${color}`}>{children}</strong>;
}

function Subhead({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="scroll-mt-8 rounded-lg border-2 border-moss bg-moss/10 px-4 py-2 text-lg font-bold tracking-tight text-ink"
    >
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function DataTable({
  headers,
  rows,
  minWidth = "42rem",
}: {
  headers: string[];
  rows: ReactNode[][];
  minWidth?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-sm leading-6" style={{ minWidth }}>
        <thead>
          <tr className="bg-moss text-paper-raised">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const bg = index % 2 === 1 ? "bg-paper-raised" : "bg-paper";
            return (
              <tr key={index} className={`border-t border-line align-top ${bg}`}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th
                      key={cellIndex}
                      scope="row"
                      className={`sticky left-0 z-10 px-4 py-3 font-medium text-ink ${bg}`}
                    >
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} className="px-4 py-3">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ProductThumb({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="w-44">
      <ZoomImage src={src} alt={alt} className="h-auto max-h-36 w-full object-contain" buttonClassName="block w-full" />
      <figcaption className="mt-2 text-xs leading-5 text-ink-soft">{caption}</figcaption>
    </figure>
  );
}

const safetyChecks: { id: string; category: ReactNode; questions: ReactNode[] }[] = [
  {
    id: "contraindications",
    category: <Strong tone="alert">Contraindications</Strong>,
    questions: [
      "Do you have an allergy or hypersensitivity to NSAIDs, including aspirin?",
      "Do you currently have, or have a history of, gastrointestinal ulcers, bleeding, or perforation?",
      "Do you have a history of heart failure or renal impairment?",
      "Are you currently trying to become pregnant?",
    ],
  },
  {
    id: "precautions",
    category: <Strong tone="summary">Precautions</Strong>,
    questions: [
      "Do you have cardiovascular disease, hypertension, or asthma?",
      "Do you have severe hepatic impairment or any coagulation disorders?",
      "Are you currently experiencing dehydration, for example from vomiting or diarrhoea?",
      "Are you aged 65 years or older and planning to take a high dose?",
      "Do you intend to use this medication for prolonged pain or fever lasting more than a few days, which can increase the risk of stroke, heart attack, or liver damage?",
    ],
  },
  {
    id: "drug-interactions",
    category: "Drug interactions",
    questions: [
      "Are you currently taking blood pressure medications such as ACE inhibitors (ACEIs), ARBs, or diuretics?",
      "Are you taking any anticoagulants or antiplatelet medications, including low-dose aspirin?",
      "Are you taking oral corticosteroids, lithium, methotrexate, or tenofovir disoproxil?",
      "Are you taking an oral hypoglycaemic, digoxin, ciclosporin, a quinolone, phenytoin, or a potent CYP2C9 inhibitor such as voriconazole?",
    ],
  },
  {
    id: "pregnancy",
    category: "Pregnancy",
    questions: [
      "Are you expecting a baby?",
      <>
        Are you in the last three months (third trimester) of pregnancy, during which this medication is strictly
        contraindicated (<Strong tone="alert">Category X</Strong>)?
      </>,
      <>
        Are you in the first or second trimester of pregnancy, where this medication must be used with precaution (
        <Strong tone="summary">Category C</Strong>)?
      </>,
    ],
  },
  {
    id: "breastfeeding",
    category: "Breastfeeding",
    questions: [
      "Are you breastfeeding? If yes, diclofenac is generally safe to use, as shorter-acting NSAIDs are preferred during lactation.",
    ],
  },
];

const cals = [
  {
    src: "/otc-notes/diclofenac/cal-10a.jpg",
    name: "10a",
    alt: "Cautionary advisory label 10a: Do not take more than one aspirin tablet or capsule each day while being treated with this medicine",
  },
  {
    src: "/otc-notes/diclofenac/cal-19b.jpg",
    name: "19b",
    alt: "Cautionary advisory label 19b: Consult your doctor or pharmacist before taking other medicines for pain or inflammation",
  },
  {
    src: "/otc-notes/diclofenac/cal-12.jpg",
    name: "12†",
    alt: "Cautionary advisory label 12: This medicine may affect mental alertness and/or coordination. If affected, do not drive a motor vehicle or operate machinery",
  },
  {
    src: "/otc-notes/diclofenac/cal-b.jpg",
    name: "B",
    alt: "Cautionary advisory label B: Take with or soon after food",
  },
];

export function DiclofenacNotes() {
  return (
    <div className="space-y-12">
      <section id="moa" className="scroll-mt-8">
        <div className="overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
          <div className="px-6 py-5 md:px-8">
            <h2 className="font-serif text-2xl tracking-tight text-ink">Mechanism of action</h2>
          </div>
          <div className="border-t border-line px-6 py-5 text-sm leading-6 md:px-8">
            <BulletList
              items={[
                "Inhibit synthesis of prostaglandins by inhibiting cyclo-oxygenase (COX).",
                "COX-1 inhibition → impaired gastric cytoprotection and antiplatelet effects.",
                "COX-2 inhibition → anti-inflammatory and analgesic action.",
                "COX inhibition (both 1 and 2) → reduction in glomerular filtration and renal blood flow.",
              ]}
            />
          </div>
        </div>
      </section>

      <section id="safety-questions" className="scroll-mt-8">
        <div className="overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
          <div className="px-6 py-5 md:px-8">
            <h2 className="font-serif text-2xl tracking-tight text-ink">1. Safety Questions (Screening Checklist)</h2>
          </div>
          <div className="overflow-x-auto border-t border-line">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm leading-6">
              <thead>
                <tr className="bg-moss text-paper-raised">
                  <th className="w-56 px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Screening Question / Clinical Check</th>
                </tr>
              </thead>
              <tbody>
                {safetyChecks.flatMap((group, groupIndex) => {
                  const bg = groupIndex % 2 === 1 ? "bg-paper" : "bg-paper-raised";
                  return group.questions.map((question, questionIndex) => (
                    <tr key={`${group.id}-${questionIndex}`} className={`border-t border-line align-top ${bg}`}>
                      {questionIndex === 0 ? (
                        <th
                          id={group.id}
                          scope="rowgroup"
                          rowSpan={group.questions.length}
                          className={`sticky left-0 z-10 scroll-mt-8 px-4 py-3 font-medium text-ink ${bg}`}
                        >
                          {group.category}
                        </th>
                      ) : null}
                      <td className="px-4 py-3">{question}</td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="medicine-profile" className="scroll-mt-8">
        <h2 className="font-serif text-2xl tracking-tight text-ink">2. Medicine Profile</h2>
        <div className="mt-4">
          <DataTable
            minWidth="72rem"
            headers={[
              "Medicine",
              "Possible drug interactions",
              "Contraindications and precautions",
              "Adverse effects",
              "Pregnancy",
              "Breastfeeding",
              "Management in children",
              "Management in older patients",
            ]}
            rows={[
              [
                <>
                  Diclofenac
                  <BulletList
                    items={["Relieve pain, especially due to inflammation.", "Reduces fever."]}
                  />
                </>,
                <BulletList
                  items={[
                    "ACEIs / ARBs.",
                    "Diuretics.",
                    "Anticoagulants.",
                    "Antiplatelets.",
                    "Oral corticosteroids.",
                    "Lithium.",
                    "Methotrexate.",
                    "Tenofovir disoproxil.",
                    "Oral hypoglycaemics.",
                    "Digoxin.",
                    "Ciclosporin.",
                    "Quinolones.",
                    "Phenytoin.",
                    "Potent CYP2C9 inhibitors (for example, voriconazole).",
                  ]}
                />,
                <div className="space-y-3">
                  <div>
                    <Strong tone="alert">Contraindications</Strong>
                    <BulletList
                      items={[
                        "NSAID hypersensitivity (including aspirin).",
                        "GI ulcer, bleeding, or perforation (including history).",
                        "Heart failure.",
                        "Renal impairment.",
                        "Pregnancy.",
                        "Women trying to become pregnant.",
                      ]}
                    />
                  </div>
                  <div>
                    <Strong tone="summary">Precautions</Strong>
                    <BulletList
                      items={[
                        "Cardiovascular disease.",
                        "Hypertension.",
                        "Asthma.",
                        "Severe hepatic impairment.",
                        "Certain coagulation disorders.",
                        "Dehydration (for example, vomiting or diarrhoea).",
                        "Prolonged (more than a few days) pain or fever — consult a doctor. Prolonged use increases the risk of stroke, heart attack, and liver damage.",
                        "High dose in people ≥ 65 years.",
                        "Lactation.",
                      ]}
                    />
                  </div>
                </div>,
                <BulletList
                  items={[
                    "Gastrointestinal effects (for example, nausea and dyspepsia). Taking with food may reduce gastrointestinal adverse effects.",
                    "Dehydration increases the risk of adverse effects, especially in children and older people. Take with a glass of water.",
                  ]}
                />,
                <>
                  <Strong tone="alert">Category X:</Strong> contraindicated in the 3rd trimester.
                  <br />
                  <Strong tone="summary">Category C:</Strong> precaution in the 1st–2nd trimester.
                </>,
                "Safe to use. Shorter-acting NSAIDs such as ibuprofen or diclofenac are preferred over other NSAIDs.",
                "Indicated for children older than 1 year.",
                "People ≥ 65 years are at increased risk of adverse effects from NSAIDs, particularly heart failure, gastrointestinal ulceration, and renal impairment.",
              ],
            ]}
          />
        </div>
      </section>

      <section id="counselling" className="scroll-mt-8">
        <h2 className="font-serif text-2xl tracking-tight text-ink">3. Counselling and CALs</h2>
        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            {cals.map((label) => (
              <figure key={label.name} className="w-56">
                <ZoomImage
                  src={label.src}
                  alt={label.alt}
                  className="h-auto w-full object-contain"
                  buttonClassName="block w-full bg-white"
                />
                <figcaption className="mt-2 text-sm leading-6 text-ink">
                  <Strong>Label {label.name}</Strong>
                </figcaption>
              </figure>
            ))}
          </div>
          <BulletList
            items={[
              "Take with or soon after food. This may reduce stomach upset.",
              "Do not take this medicine if dehydrated (for example, vomiting or diarrhoea).",
              "Take with a glass of water.",
              "Do not take aspirin as pain relief; it will increase the risk of adverse effects. Do not stop low-dose aspirin treatment when using NSAIDs. Some NSAIDs, including ibuprofen and naproxen, can reduce the antiplatelet activity of low-dose aspirin and may reduce its cardioprotective effects. This does not apply to an occasional dose of ibuprofen. Choose an alternative NSAID if regular use is anticipated.",
            ]}
          />
        </div>
      </section>

      <section id="product-lineup" className="scroll-mt-8">
        <h2 className="font-serif text-2xl tracking-tight text-ink">4. Product Lineup</h2>
        <div className="mt-4 space-y-8">
          <div className="space-y-4">
            <Subhead id="formulations">Formulations and strengths</Subhead>
            <DataTable
              headers={["Strength", "Product"]}
              minWidth="42rem"
              rows={[
                [
                  "Diclofenac potassium 12.5 mg",
                  "Tablet: Voltaren Rapid 12.5. Soft capsule: Voltaren Rapid 12.5 liquid capsules.",
                ],
                [
                  "Diclofenac potassium 25 mg",
                  <div className="space-y-3">
                    <ProductThumb
                      src="/otc-notes/diclofenac/voltaren-rapid-25.png"
                      alt="Voltaren Rapid 25 tablets, diclofenac potassium 25 mg, pharmacist only medicine"
                      caption="Voltaren Rapid 25"
                    />
                    <p>
                      Tablet: Voltaren Rapid 25. 20 and 30 tablets, <Strong tone="alert">S3</Strong> (Pharmacist Only
                      Medicine).
                    </p>
                  </div>,
                ],
                [
                  "Diclofenac sodium 25 mg",
                  <div className="space-y-3">
                    <ProductThumb
                      src="/otc-notes/diclofenac/wagner-diclofenac-25.png"
                      alt="Wagner Health Diclofenac enteric coated tablets, diclofenac sodium 25 mg, pharmacist only medicine"
                      caption="Wagner Health Diclofenac 25 mg"
                    />
                    <p>
                      Enteric-coated tablet: Wagner Health Diclofenac 25 mg. 30 tablets, <Strong tone="alert">S3</Strong>{" "}
                      (Pharmacist Only Medicine).
                    </p>
                  </div>,
                ],
              ]}
            />
          </div>

          <div className="space-y-4">
            <Subhead id="dosing">Dosing guidelines</Subhead>
            <DataTable
              headers={["Indication", "Dose"]}
              minWidth="42rem"
              rows={[
                [
                  "Adults (mild pain), children > 14 years",
                  "75–100 mg per day in two or three doses. Maximum 200 mg daily (8 tablets of 25 mg).",
                ],
                [
                  "Acute migraine",
                  "Initially 50 mg at the first sign of an impending attack; then 50 mg after 2 hours if there is no initial relief; then 50 mg every 4–6 hours as necessary. Maximum 200 mg per day (8 tablets of 25 mg) per attack.",
                ],
                [
                  "Primary dysmenorrhoea",
                  "Initially 50–100 mg at the first symptom; then 50 mg three times daily for 3 days. May be administered for a few days as necessary.",
                ],
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
