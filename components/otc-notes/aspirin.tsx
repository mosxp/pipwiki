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
      "Do you have an allergy to anti-inflammatory medicines?",
      "Do you currently have or have a history of stomach ulcers or heart failure?",
    ],
  },
  {
    id: "precautions",
    category: <Strong tone="summary">Precautions</Strong>,
    questions: [
      "Do you have asthma, uncontrolled hypertension, or G6PD deficiency?",
      "Do you have renal or hepatic impairment?",
      "Are you currently experiencing an acute attack of gout?",
      "Do you intend to use this medication for a prolonged period, defined as more than a few days for adults or more than 24 hours for children?",
    ],
  },
  {
    id: "drug-interactions",
    category: "Drug interactions",
    questions: [
      "Are you currently taking any anticoagulants or antiplatelet medications?",
      "Are you taking NSAIDs, which can increase the risk of gastric ulceration and reduce the antiplatelet activity of low-dose aspirin?",
      "Are you taking any other medicines that contain aspirin or other anti-inflammatory ingredients?",
    ],
  },
  {
    id: "paediatric",
    category: <Strong tone="alert">Paediatric management</Strong>,
    questions: [
      "Is this medication for a child under 12 years of age, or a child between 12 and 16 years old who has or is recovering from chickenpox, influenza, or a fever, due to the risk of Reye’s syndrome?",
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
        Are you in the first six months of pregnancy, where this medication must be used with precaution (
        <Strong tone="summary">Category C</Strong>)?
      </>,
    ],
  },
  {
    id: "breastfeeding",
    category: "Breastfeeding",
    questions: [
      "Are you breastfeeding, keeping in mind that while occasional or single low doses can be taken, there is a theoretical risk of Reye’s syndrome?",
    ],
  },
];

const cals = [
  {
    src: "/otc-notes/aspirin/cal-13.jpg",
    name: "13",
    alt: "Cautionary advisory label 13: Do not remove from original packaging until dose required",
  },
  {
    src: "/otc-notes/aspirin/cal-19b.jpg",
    name: "19b",
    alt: "Cautionary advisory label 19b: Consult your doctor or pharmacist before taking other medicines for pain or inflammation",
  },
  {
    src: "/otc-notes/aspirin/cal-b.jpg",
    name: "B",
    alt: "Cautionary advisory label B: Take with or soon after food",
  },
  {
    src: "/otc-notes/aspirin/cal-a.jpg",
    name: "A",
    alt: "Cautionary advisory label A: Swallow whole. Do not crush or chew",
    note: "For enteric coated tablets, add label A.",
  },
];

export function AspirinNotes() {
  return (
    <div className="space-y-12">
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
                "Aspirin (high dose for analgesic, antipyretic, anti-inflammatory actions)",
                <BulletList
                  items={[
                    <>
                      <Strong>NSAIDs.</Strong> Increased risk of gastric ulceration, and reduced antiplatelet activity of
                      low-dose aspirin.
                    </>,
                    "Anticoagulant.",
                    "Antiplatelet.",
                  ]}
                />,
                <div className="space-y-3">
                  <div>
                    <Strong tone="alert">Contraindications</Strong>
                    <BulletList
                      items={[
                        "Pregnancy (last 3 months).",
                        "Anti-inflammatory allergy.",
                        "Stomach ulcer.",
                        "Heart failure history.",
                        "Concomitant anticoagulants.",
                      ]}
                    />
                  </div>
                  <div>
                    <Strong tone="summary">Precautions</Strong>
                    <BulletList
                      items={[
                        "Pregnancy (first 6 months).",
                        "Lactation.",
                        "Children < 12 years.",
                        "Children 12–16 years (with or recovering from chickenpox, influenza, or fever).",
                        "Asthma.",
                        "Renal impairment.",
                        "Hepatic impairment.",
                        "Prolonged use (> a few days in adults, > 24 hours in children).",
                        "Hypertension (uncontrolled).",
                        "G6PD deficiency.",
                        "Gout (during an acute attack).",
                      ]}
                    />
                  </div>
                </div>,
                <BulletList
                  items={[
                    "Monitor internal bleeding (dark or bloodstained bowel motions, coffee-coloured vomit). Stop taking and contact the doctor immediately.",
                    "Monitor gastrointestinal effects (new or unusual abdominal pain or abdominal tenderness, indigestion, heartburn) and tell the doctor.",
                    "Monitor nephrotoxicity — fluid retention (swollen ankles). Stop taking and contact the doctor immediately.",
                    "Monitor hypersensitivity. If swelling of the face, lips or tongue, rash, or difficulty breathing develops, stop taking and seek immediate medical attention.",
                    <>
                      <Strong tone="alert">Reye’s syndrome</Strong> (in children &lt; 16 years of age).
                    </>,
                  ]}
                />,
                <>
                  <Strong tone="alert">Category X:</Strong> contraindicated in the 3rd trimester.
                  <br />
                  <Strong tone="summary">Category C:</Strong> precaution in the 1st–2nd trimester.
                </>,
                "Occasional doses (single) or low doses can be taken. Theoretical risk of Reye’s syndrome.",
                <>
                  Avoid in children &lt; 12 years, and in children 12–16 years with or recovering from chickenpox,
                  influenza, or fever, because of the risk of <Strong tone="alert">Reye’s syndrome</Strong>.
                </>,
                "—",
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
                  {"note" in label && label.note ? <span className="mt-1 block text-ink-soft">{label.note}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
          <BulletList
            items={[
              "Take with or soon after food. This may reduce stomach upset.",
              "Remove tablets from the packaging just before use. Aspirin can break down rapidly if it isn’t protected by the packaging.",
              "It is safe to take paracetamol while you are taking this medicine.",
              "For dispersible tablets, mix the tablets in water immediately before use.",
              "It may be advisable to stop taking aspirin 7 days before planned surgery and some dental procedures. Discuss this with your doctor or dentist.",
            ]}
          />
        </div>
      </section>

      <section id="product-lineup" className="scroll-mt-8">
        <h2 className="font-serif text-2xl tracking-tight text-ink">4. Product Lineup</h2>
        <div className="mt-4 space-y-8">
          <div className="space-y-4">
            <Subhead id="aspirin-300">Aspirin 300 mg</Subhead>
            <DataTable
              headers={["Form", "Product", "Dose"]}
              minWidth="52rem"
              rows={[
                [
                  "Dispersible tablet",
                  <ProductThumb
                    src="/otc-notes/aspirin/solprin.png"
                    alt="Solprin dispersible aspirin 300 mg tablets"
                    caption="Solprin"
                  />,
                  <>
                    Adults: 1–3 tablets (300–900 mg) in water every 4–6 hours as required. Maximum 4 doses in 24 hours.
                    <br />
                    Children &gt; 12 years: 1–2 tablets (300–600 mg) every 4–6 hours as required. Maximum 4 doses in 24
                    hours.
                  </>,
                ],
                [
                  "Effervescent tablet",
                  <ProductThumb
                    src="/otc-notes/aspirin/aspro-clear.png"
                    alt="Aspro Clear Regular Strength effervescent aspirin tablets"
                    caption="Aspro Clear Regular Strength"
                  />,
                  <>
                    Dissolve in a glass of water.
                    <br />
                    Adults: 2–3 tablets (600–900 mg) every 4 hours as necessary. Maximum 6 tablets in 24 hours.
                    <br />
                    Children &gt; 12 years: 1–2 tablets (300–600 mg) every 4 hours as necessary. Maximum 6 tablets in 24
                    hours.
                  </>,
                ],
                [
                  "Dispersible tablet",
                  <ProductThumb
                    src="/otc-notes/aspirin/disprin-original.png"
                    alt="Disprin Original dispersible aspirin tablets"
                    caption="Disprin Original"
                  />,
                  <>
                    May swallow or disperse in water.
                    <br />
                    Adults: 1–3 tablets (300–900 mg) every 4–6 hours as required. Maximum 4 doses in 24 hours without
                    medical advice.
                    <br />
                    Children ≥ 12 years: 1–2 tablets (300–600 mg) every 6 hours as required. Maximum 4 doses in 24 hours
                    without medical advice.
                  </>,
                ],
                [
                  "Chewable tablet",
                  <ProductThumb
                    src="/otc-notes/aspirin/disprin-direct.png"
                    alt="Disprin Direct chewable aspirin tablets"
                    caption="Disprin Direct"
                  />,
                  <>
                    Chew or dissolve directly in the mouth or in water.
                    <br />
                    Adults: 1–3 tablets (300–900 mg) every 4–6 hours as required. Maximum 4 doses in 24 hours without
                    medical advice.
                    <br />
                    Children ≥ 12 years: 1–2 tablets (300–600 mg) every 6 hours as required. Maximum 4 doses in 24 hours
                    without medical advice.
                  </>,
                ],
              ]}
            />
          </div>

          <div className="space-y-4">
            <Subhead id="aspirin-500">Aspirin 500 mg</Subhead>
            <DataTable
              headers={["Form", "Product", "Dose"]}
              minWidth="52rem"
              rows={[
                [
                  "Dispersible tablet",
                  <ProductThumb
                    src="/otc-notes/aspirin/disprin-max.png"
                    alt="Disprin Max dispersible aspirin 500 mg tablets"
                    caption="Disprin Max"
                  />,
                  <>
                    May swallow or disperse in water.
                    <br />
                    Adults: 1–2 tablets (500–1,000 mg) every 4–6 hours. Maximum 4 doses in 24 hours without medical
                    advice.
                    <br />
                    Children ≥ 12 years: 1 tablet (500 mg) every 6 hours as required. Maximum 4 doses in 24 hours without
                    medical advice.
                  </>,
                ],
                [
                  "Effervescent tablet",
                  <ProductThumb
                    src="/otc-notes/aspirin/aspro-clear-extra.png"
                    alt="Aspro Clear Extra Strength effervescent aspirin tablets"
                    caption="Aspro Clear Extra Strength"
                  />,
                  <>
                    Dissolve in a glass of water.
                    <br />
                    Adults: 1–2 tablets (500–1,000 mg) every 4 hours as necessary. Maximum 8 tablets in 24 hours unless
                    directed by a doctor.
                    <br />
                    Children &gt; 12 years: 1 tablet (500 mg) every 4 hours as necessary. Maximum 8 tablets in 24 hours
                    unless directed by a doctor.
                  </>,
                ],
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
