const checkPoints = [
  "Prescribing a monitored medicine",
  "Dispensing a monitored medicine (at the point of sale/attempt to sell)",
  "Giving a treatment dose of a monitored medicine",
];

const checkRules = [
  {
    label: "No Delegation",
    detail:
      "The requirement to look up QScript cannot be delegated to any other person (e.g. assistants, trainees, or another pharmacist).",
  },
  {
    label: "Login Security",
    detail:
      "Practitioners must keep login credentials strictly confidential and must never share user profiles.",
  },
  {
    label: "Exceptions",
    detail:
      "Applies unless the practitioner has a reasonable excuse (assessed case-by-case) or falls under specific exemptions prescribed in MPMR Schedule 18, Part 1A.",
  },
];

type RoleMark = { allowed: boolean; note?: string };

const roles = ["Pharmacist", "Intern pharmacist", "Trainee pharmacist", "Pharmacy assistant"];

const roleRows: { question: string; cells: RoleMark[] }[] = [
  {
    question: "Authorised to access QScript?",
    cells: [{ allowed: true }, { allowed: true }, { allowed: false }, { allowed: false }],
  },
  {
    question: "Can lawfully dispense a medicine?",
    cells: [
      { allowed: true },
      { allowed: true, note: "Only under the supervision of a pharmacist." },
      { allowed: false },
      { allowed: false },
    ],
  },
  {
    question: "Must upload monitored medicine dispensing records to QScript?",
    cells: [
      { allowed: true, note: "Unless practising in a public sector hospital." },
      { allowed: true, note: "Unless practising in a public sector hospital." },
      { allowed: false },
      { allowed: false },
    ],
  },
  {
    question: "Should be recorded as the ‘dispenser’ on a dispensing record?",
    cells: [
      { allowed: true, note: "Only if they were the dispensing pharmacist." },
      { allowed: true, note: "Only if they were the dispensing pharmacist." },
      { allowed: false },
      { allowed: false },
    ],
  },
];

const integrityPoints = [
  {
    title: "Record actual dispenser (s124)",
    items: [
      "Must be the name of the dispensing pharmacist/intern",
      "Never record an assistant or trainee name",
    ],
  },
  {
    title: "Unregistered & compounded monitored medicines",
    items: ["Must still be uploaded to QScript", "Matched via keyword text-matching system"],
  },
  {
    title: "Patient identifiers (s124)",
    items: [
      "Accurate name (matching Medicare)",
      "Accurate Date of Birth (Mandatory)",
      "Validate government health & pension cards/identifiers",
    ],
  },
];

const workflows = [
  {
    scenario: "Prescriber Bag Orders",
    rules: [
      "Supplied via Purchase Order, not as a prescription.",
      "Pharmacist is selling/supplying stock, not dispensing for a patient.",
      "If software lacks a dedicated module, write “Prescriber's bag” or “Doctor's bag” in directions.",
    ],
    impact:
      "Correct processing automatically filters stock out so it does not upload to QScript (prevents false self-prescribing flags under s40).",
  },
  {
    scenario: "Veterinary Scripts",
    rules: [
      "QScript is exclusively for the treatment of persons, not animals.",
      "Ensure prescriber type is set correctly (e.g. 'V' for veterinarian).",
    ],
    impact:
      "Must not upload to QScript. Setting the prescriber type to 'V' automatically filters it out or removes accidental uploads in real time.",
  },
  {
    scenario: "Data Correction",
    rules: [
      "QScript reflects source dispensary software without amendment.",
      "If an error occurs (wrong drug, dose, prescriber), correct it in dispensary software.",
    ],
    impact:
      "Correcting the source record updates/removes the error in QScript in real time.",
  },
];

function RoleMarkCell({ mark }: { mark: RoleMark }) {
  return (
    <div>
      <span
        className={mark.allowed ? "font-medium text-moss" : "font-medium text-[var(--alert)]"}
        aria-label={mark.allowed ? "Yes" : "No"}
      >
        {mark.allowed ? "✓" : "✗"}
      </span>
      {mark.note ? <p className="mt-1 text-ink">{mark.note}</p> : null}
    </div>
  );
}

export function QscriptGuide() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Mandatory Requirement to Check QScript (MPA s41)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          When to Check: Relevant practitioners (pharmacists and intern pharmacists) must check
          QScript before:
        </p>
        <ul className="mt-3 max-w-4xl list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
          {checkPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <dl className="mt-4 grid gap-4 lg:grid-cols-3">
          {checkRules.map((rule) => (
            <div key={rule.label} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {rule.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{rule.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Authorisation & Role Comparison
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          The table below provides a high-level overview of some of the key authorisations and
          requirements of different pharmaceutical professionals, as described in this guide.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Requirement</th>
                {roles.map((role) => (
                  <th key={role} className="px-4 py-3 font-medium">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roleRows.map((row, index) => (
                <tr
                  key={row.question}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.question}
                  </th>
                  {row.cells.map((cell, cellIndex) => (
                    <td key={roles[cellIndex]} className="px-4 py-3">
                      <RoleMarkCell mark={cell} />
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
          Uploading Monitored Medicine Dispensing Records (MPA s226)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          All dispensers (pharmacists and interns, other than in public sector hospitals) must use
          dispensing software connected to a Prescription Delivery Service to upload monitored
          medicine dispensing data in real time.
        </p>
        <h3 className="mt-6 text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
          Dispensing record integrity
        </h3>
        <div className="mt-3 grid gap-4 lg:grid-cols-3">
          {integrityPoints.map((point) => (
            <article key={point.title} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <h4 className="text-sm font-medium text-ink">{point.title}</h4>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
                {point.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Special Dispensing Workflows & Common Errors
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-48 px-4 py-3 font-medium">Scenario</th>
                <th className="px-4 py-3 font-medium">Rule & Correct Handling</th>
                <th className="px-4 py-3 font-medium">QScript Impact</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((workflow, index) => (
                <tr
                  key={workflow.scenario}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {workflow.scenario}
                  </th>
                  <td className="px-4 py-3 text-ink">
                    <ul className="list-disc space-y-1 pl-4">
                      {workflow.rules.map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-ink">{workflow.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
