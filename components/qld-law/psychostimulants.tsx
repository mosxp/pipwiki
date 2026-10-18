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

function Decision({ value }: { value: string }) {
  if (value.startsWith("Approval")) {
    return <Strong tone="summary">{value}</Strong>;
  }
  if (value.startsWith("Yes")) {
    return <Strong tone="moss">{value}</Strong>;
  }
  return <Strong tone="alert">{value}</Strong>;
}

const doseCaps = [
  { medicine: "Dexamfetamine", dose: "40 mg / day" },
  { medicine: "Lisdexamfetamine", dose: "70 mg / day" },
  { medicine: "Methylphenidate", dose: "80 mg / day" },
];

const columns = [
  "Medical Practitioner (General)",
  "Specialist GP (FRACGP/FACRRM)",
  "Paediatrician",
  "Psychiatrist",
  "Nurse Practitioner",
] as const;

const authorisations: { indication: string; decisions: string[] }[] = [
  { indication: "ADHD: 0–3 years", decisions: ["No", "No", "Yes", "Yes", "No"] },
  { indication: "ADHD: 4–17 years", decisions: ["Yes", "Yes", "Yes", "Yes", "No"] },
  {
    indication: "ADHD: 18–24 years",
    decisions: ["No", "Yes (up to max dose)", "Yes (up to max dose)", "Yes (up to max dose)", "No"],
  },
  {
    indication: "ADHD: 25+ years (Adults)",
    decisions: ["No", "Yes (up to max dose)", "No", "Yes (up to max dose)", "No"],
  },
  { indication: "Brain Injury: 0–3 years", decisions: ["No", "No", "Yes", "Yes", "No"] },
  { indication: "Brain Injury: 4–17 years", decisions: ["Yes", "Yes", "Yes", "Yes", "No"] },
  { indication: "Brain Injury: 18+ years", decisions: ["No", "No", "No", "No", "No"] },
  { indication: "Narcolepsy (Any age)", decisions: ["Yes", "Yes", "Yes", "Yes", "No"] },
  {
    indication: "Continuing Institutional Treatment (Hospital / Custodial admission)",
    decisions: ["Yes", "Yes", "Yes", "Yes", "Yes"],
  },
  {
    indication:
      "Other Conditions (e.g. Binge Eating Disorder, Depression, Hypersomnolence)",
    decisions: [
      "Approval Required",
      "Approval Required",
      "Approval Required",
      "Approval Required",
      "Approval Required",
    ],
  },
];

const approvalTriggers = [
  <>
    Prescribing <Strong tone="summary">above the maximum daily dose</Strong> for an adult with ADHD.
  </>,
  <>
    Prescribing for <Strong>adult ADHD (18+)</Strong> by a non-specialist medical practitioner
    (requires ongoing support of a psychiatrist).
  </>,
  <>
    Treating conditions other than ADHD, brain injury in children, or narcolepsy (e.g. binge eating
    disorder, depression, idiopathic hypersomnolence, palliative care) — requires support from a
    relevant specialist.
  </>,
  "Treating a child with ADHD who was not diagnosed by a paediatrician/psychiatrist or treated by an authorised doctor.",
];

const checklist = [
  {
    title: "Prescriber authorisation / approval on script (MPMR s86(1)(m))",
    detail: (
      <>
        The prescription must state details of the prescriber&apos;s authority (e.g., specialist
        registration/qualifications or a Queensland Health Prescribing Approval Number).
      </>
    ),
  },
  {
    title: "Condition stated (MPMR s87(2)(c))",
    detail: (
      <>
        Must state the specific condition being treated or the words{" "}
        <Strong>&ldquo;specified condition&rdquo;</Strong> (which legally denotes ADHD, brain
        injury, or narcolepsy).
      </>
    ),
  },
  {
    title: "Standard S8 writing requirements",
    detail: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Quantity in <Strong>words and numbers</Strong> (if paper).
        </li>
        <li>
          Minimum repeat interval of <Strong tone="summary">at least 1 day</Strong>.
        </li>
        <li>
          Patient <Strong>Date of Birth</Strong> included.
        </li>
        <li>
          Prescriptions <Strong tone="summary">valid for 6 months</Strong> from the date written.
        </li>
      </ul>
    ),
  },
  {
    title: "QScript & Monitored Medicines Standard (MPA s41 & MPMR s93/126)",
    detail: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          The dispensing pharmacist must check <Strong tone="moss">QScript</Strong> in real time
          prior to supply and comply with the <Strong>Monitored Medicines Standard</Strong>.
        </li>
        <li>
          Prescribers <Strong tone="alert">cannot self-prescribe or self-administer</Strong>{" "}
          psychostimulants.
        </li>
      </ul>
    ),
  },
];

export function Psychostimulants() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">Classification & Definition</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Definition
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              A <Strong tone="alert">Schedule 8 (S8)</Strong> medicine that is dexamfetamine,
              lisdexamfetamine (or another amfetamine), or methylphenidate (MPMR Schedule 22).
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Statutory classifications
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Classed simultaneously as a <Strong tone="summary">restricted medicine</Strong>,{" "}
              <Strong tone="alert">high-risk medicine</Strong>,{" "}
              <Strong tone="alert">diversion-risk medicine</Strong>, and{" "}
              <Strong tone="moss">monitored medicine</Strong> (MPMR Schedule 2).
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Prescribing authority
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Can only be prescribed by an approved person within their statutory scope or by a
              practitioner holding a state-issued prescribing approval.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Maximum Daily Dose Limits (MPMR Schedule 22)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Prescribing without an individual approval is strictly capped at the statutory maximum
          daily dose:
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {doseCaps.map((cap) => (
            <li key={cap.medicine} className="rounded-lg border border-line bg-paper-raised px-4 py-4">
              <p className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {cap.medicine}
              </p>
              <p className="mt-2 font-serif text-3xl tracking-tight text-[var(--summary)]">
                {cap.dose}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-ink">
          Exceeding these daily limits requires a formal{" "}
          <Strong tone="summary">Queensland Health prescribing approval</Strong>, supported by
          psychiatric peer review/rationale.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescribing Authorisations by Practitioner Class
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[72rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Clinical Indication & Age Group</th>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorisations.map((row, index) => (
                <tr
                  key={row.indication}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.indication}
                  </th>
                  {row.decisions.map((decision, decisionIndex) => (
                    <td key={columns[decisionIndex]} className="px-4 py-3">
                      <Decision value={decision} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          When is a Queensland Health Prescribing Approval Required?
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          A prescriber must apply for and hold an individual Prescribing Approval (
          <Strong>s67 MPA</Strong>) if:
        </p>
        <ul className="mt-3 max-w-4xl list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
          {approvalTriggers.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-ink">
          Prescribing approvals are <Strong tone="alert">strictly non-transferable</Strong> and can
          only be granted to prescribers physically prescribing in Queensland (never to interstate
          prescribers).
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Mandatory Dispensing & Prescription Checklist for Pharmacists
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {checklist.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <h3 className="text-sm font-semibold text-ink">
                <span className="text-moss">{index + 1}.</span> {item.title}
              </h3>
              <div className="mt-2 text-sm leading-6 text-ink">{item.detail}</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
