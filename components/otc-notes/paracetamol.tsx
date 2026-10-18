function Strong({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
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

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-8 first:mt-0">
      <h2 className="font-serif text-2xl tracking-tight text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-ink">{children}</div>
    </section>
  );
}

function Subhead({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-8 text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
      {children}
    </h3>
  );
}

function Callout({
  tone,
  children,
}: {
  tone: "alert" | "summary";
  children: React.ReactNode;
}) {
  const styles =
    tone === "alert"
      ? "border-[var(--alert)]/35 bg-[var(--alert-bg)]"
      : "border-[var(--summary)]/35 bg-[var(--summary-bg)]";

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm leading-6 ${styles}`}>{children}</div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
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
  rows: React.ReactNode[][];
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

const safetyChecks: { id: string; category: string; questions: React.ReactNode[] }[] = [
  {
    id: "precautions",
    category: "Precautions & Contraindications",
    questions: [
      <>
        Do you have any history of <Strong tone="alert">liver conditions or hepatic impairment</Strong>?
      </>,
    ],
  },
  {
    id: "drug-interactions",
    category: "Drug Interactions",
    questions: [
      <>
        Are you currently <Strong>taking any other medications</Strong>, such as cough and cold{" "}
        <Strong>formulations that contain paracetamol</Strong>?
      </>,
      <>
        Are you currently taking <Strong>warfarin</Strong>? Keeping in mind that clinically significant
        interactions are unlikely with short-term use.
      </>,
    ],
  },
  {
    id: "maximum-dose",
    category: "Maximum Dose / Toxicity",
    questions: [
      <>
        <Strong tone="alert">Are you aware of the total maximum daily dose</Strong> to prevent liver
        toxicity? No more than 8 standard 500 mg tablets (4 g daily), or 6 controlled-release tablets
        (3,990 mg daily).
      </>,
    ],
  },
  {
    id: "paediatric-screening",
    category: "Paediatric Screening",
    questions: [
      <>
        Is the <Strong>child at least 1 month old</Strong>?
      </>,
      <>
        Is the child experiencing <Strong>pain, irritability, or lethargy</Strong>? Children tolerate
        low-grade fevers well and only require treatment if they seem unwell.
      </>,
      <>
        Has the pain or fever <Strong tone="alert">lasted for more than 48 hours</Strong>? That would
        require consulting a doctor.
      </>,
    ],
  },
];

export function ParacetamolNotes() {
  return (
    <div>
      <section id="safety-questions" className="scroll-mt-8">
        <div className="overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
          <div className="px-6 py-5 md:px-8">
            <h2 className="font-serif text-2xl tracking-tight text-ink">
              1. Safety Questions (Screening Checklist)
            </h2>
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

      <Section id="medicine-profile" title="2. Medicine Profile">
        <DataTable
          headers={["Topic", "Detail"]}
          minWidth="40rem"
          rows={[
            [
              "Therapeutic class",
              <BulletList
                key="class"
                items={["Relieves mild-moderate pain.", "Reduces fever."]}
              />,
            ],
            [
              "Drug interactions",
              "Clinically significant interactions are unlikely with short-term use (paracetamol-containing products, warfarin).",
            ],
            [
              "Contraindications and precautions",
              <Strong key="hepatic" tone="alert">
                Hepatic impairment
              </Strong>,
            ],
            [
              "Adverse effects and toxicity",
              <>
                <Strong tone="alert">Liver toxicity</Strong> in overdose. Do not take more than{" "}
                <Strong tone="alert">8 tablets or capsules of 500 mg strength (4 g daily)</Strong> or
                more than <Strong tone="alert">6 controlled-release tablets (3,990 mg daily)</Strong>{" "}
                each day. If you take more than one paracetamol-containing product,{" "}
                <Strong>calculate the total daily dose</Strong>.
              </>,
            ],
            [
              "Pregnancy",
              <>
                Category A; <Strong tone="moss">safe to use</Strong>.
              </>,
            ],
            [
              "Breastfeeding",
              <Strong key="bf" tone="moss">
                Safe to use
              </Strong>,
            ],
            [
              "Management in children",
              <BulletList
                key="children"
                items={[
                  <>
                    Paracetamol from <Strong>≥1 month</Strong>.
                  </>,
                  <>
                    Fever in children <Strong>does not need to be treated</Strong> unless the child
                    seems <Strong>unwell or has other cold symptoms</Strong>. Infants and children
                    tolerate low-grade fever well (eg &lt;38–38.5°C), often respond to fluids and
                    comfort, and may not need paracetamol.
                  </>,
                  <>
                    <Strong>Only give paracetamol or ibuprofen if the child has</Strong> pain, or is
                    miserable, irritable or lethargic.
                  </>,
                  <>
                    Give <Strong>strictly according to the dose instructions on the label</Strong>. If
                    pain or fever lasts &gt;48 hours, consult the doctor.
                  </>,
                ]}
              />,
            ],
            ["Management in older patients", "—"],
          ]}
        />
      </Section>

      <Section id="product-lineup" title="3. Product Lineup and Formulations">
        <Subhead id="paracetamol-500">Paracetamol 500 mg</Subhead>
        <DataTable
          headers={["Form", "Products"]}
          minWidth="36rem"
          rows={[
            ["Tablet", "Panadol"],
            ["Mini caps", "Panadol Mini Caps. Capsule-shaped, gelatin-coated tablet."],
            ["Liquid capsule", "Panadol Liquid Caps. Wagner Liquigesic."],
            [
              "Caplet with sodium bicarbonate",
              "Panadol Rapid. Panadol Rapid handipak.",
            ],
            ["Effervescent tablet with sodium bicarbonate", "Panadol Rapid Soluble"],
            ["Tablet with Optizorb", "Panadol Optizorb tablet"],
            ["Caplet with Optizorb", "Panadol caplet"],
            ["Suppositories", "Panadol Suppositories"],
          ]}
        />
        <Callout tone="summary">
          <BulletList
            items={[
              <>
                <Strong>Panadol Rapid and Rapid Soluble</Strong> contain sodium bicarbonate, so they
                are absorbed twice as fast as regular Panadol tablets. Onset of action is 10 minutes
                faster than standard Panadol.
              </>,
              <>
                <Strong>Panadol Optizorb</Strong> uses a patented delivery system that delivers
                paracetamol more efficiently. It is absorbed 25% faster than regular Panadol tablets.
              </>,
            ]}
          />
        </Callout>

        <Subhead id="paracetamol-665">Paracetamol 665 mg (modified release, S3 pharmacist only)</Subhead>
        <p>
          Bi-layer caplet (modified-release tablet): <Strong>Panadol Osteo</Strong> and{" "}
          <Strong>Osteomol</Strong>. 96 tablets; S3 (pharmacist only).
        </p>
        <Callout tone="summary">
          <Strong>Panadol Osteo</Strong> is released in two stages, one quickly and one more slowly, to
          provide long-lasting relief from osteoarthritis pain for up to 8 hours.
        </Callout>

        <Subhead id="paracetamol-caffeine">Paracetamol 500 mg with caffeine 65 mg</Subhead>
        <p>
          Caplet with Optizorb: <Strong>Panadol Extra</Strong>.
        </p>

        <Subhead id="childrens-formulations">Children’s liquid and suspension formulations</Subhead>
        <DataTable
          headers={["Form", "Product and age"]}
          minWidth="40rem"
          rows={[
            ["Liquid 100 mg/mL", "Children’s Panadol Colourfree liquid (1 month–1 year)"],
            ["Suspension 24 mg/mL", "Children’s Panadol Colourfree Suspension (1–5 years)"],
            ["Liquid 48 mg/mL", "Children’s Panadol Elixir (5–12 years)"],
            ["Suspension 48 mg/mL", "Children’s Panadol Colourfree Suspension (5–12 years)"],
            ["Chewable tablet 120 mg", "Panadol Chewable Tablets (3+ years)"],
            ["Suppositories 125 mg", "Children’s Panadol Suppositories (6 months–5 years)"],
            ["Suppositories 250 mg", "Children’s Panadol Suppositories (5–12 years)"],
          ]}
        />
      </Section>

      <Section id="dosage-guidelines" title="4. Dosage Guidelines">
        <DataTable
          headers={["Regimen", "Adult dose", "Paediatric dose (≥1 month)"]}
          minWidth="52rem"
          rows={[
            [
              "Oral / rectal",
              <>
                <Strong>Oral/rectal:</Strong> 500–1,000 mg <Strong>4–6-hourly</Strong>.{" "}
                <Strong tone="alert">Maximum 4 g daily (8 tablets).</Strong>
              </>,
              <>
                <Strong>Oral:</Strong> <Strong>15 mg/kg (up to 1 g) 4–6-hourly</Strong>.{" "}
                <Strong tone="alert">Maximum 60 mg/kg (up to 4 g) daily</Strong> for up to 48 hours.
                Up to 90 mg/kg daily may be given in acute conditions for short periods in hospital.{" "}
                <Strong>Rectal:</Strong> 15–20 mg/kg (up to 1 g) 6-hourly. Maximum 60 mg/kg (up to 4 g)
                daily.
              </>,
            ],
            [
              "Controlled release",
              <>
                <Strong>Controlled release:</Strong> 665–1,330 mg <Strong>6–8-hourly</Strong>.{" "}
                <Strong tone="alert">Maximum 3,990 mg (6 tablets) daily.</Strong>
              </>,
              "—",
            ],
          ]}
        />
      </Section>
    </div>
  );
}
