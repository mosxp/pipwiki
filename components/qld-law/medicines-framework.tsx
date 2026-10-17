const regulations = [
  {
    name: "Medicines Regulation (MPMR 2021)",
    substances:
      "S2, S3, S4, S8 medicines + S9 and S10 prohibited substances (therapeutic use)",
    scope:
      "Regulates medicines for therapeutic use, healthcare professionals, and clinical settings.",
  },
  {
    name: "Poisons & Prohibited Substances Regulation 2021",
    substances: "S5, S6, S7 poisons + non-therapeutic use of S9, S10, and medicines",
    scope: "Non-therapeutic uses (e.g. laboratory testing), chemical use, and general poisons.",
  },
  {
    name: "Pest Management Activities Regulation 2021",
    substances: "APVMA approved pesticides and fumigants",
    scope: "Pest management activities, primary producers, and pest technicians.",
  },
];

const whoCanDeal = [
  "Approved Person (e.g. Pharmacist)",
  "Emergency Order Person",
  "Substance Authority Holder/Agent",
];

const dealings = [
  "Manufacture",
  "Buy",
  "Possess",
  "Supply",
  "Administer",
  "Prescribe",
  "Standing order",
  "Apply (poisons)",
  "Dispose of waste",
];

const authorisedWay = [
  "Legally authorised under the Act",
  "Complies with Regulation rules",
  "Complies with the Substance Management Plan (SMP)",
];

const approvedPersonSchedules = [
  "Schedule 3: Aboriginal and Torres Strait Islander health professions",
  "Schedule 4: Dentistry",
  "Schedule 5: Emergency service providers",
  "Schedule 6: Medical practitioners",
  "Schedule 7: Nursing/midwifery",
  "Schedule 8: Ocular treatment professions",
  "Schedule 9: Pharmaceutical professions",
  "Schedule 10: Podiatry",
  "Schedule 11: Veterinary",
  "Schedule 12: Other health practitioners",
  "Schedule 13: Workers at institutions and facilities",
  "Schedule 14: Suppliers and representatives",
  "Schedule 15: Miscellaneous",
];

const substanceAuthorityExamples = [
  "Manufacturing licence",
  "Wholesale licence",
  "Retail licence",
  "Pest management licence",
  "Prescribing approval",
  "General approval",
];

const authorisations = [
  {
    type: "Approved Persons (As-of-Right)",
    mechanism:
      "Authorised automatically by occupation, profession, or position held (no separate licence needed).",
    examplesLead: "Defined under MPMR Schedules 3-15:",
    examples: approvedPersonSchedules,
  },
  {
    type: "Substance Authorities",
    mechanism:
      "Granted by application to the Chief Executive (or delegate) of QLD Health; subject to conditions and prescribed fees.",
    examplesLead: null,
    examples: substanceAuthorityExamples,
  },
  {
    type: "Emergency Orders",
    mechanism:
      "Issued by the Chief Executive to manage immediate risks of significant harm, illness, or disasters.",
    examplesLead: null,
    examples: [
      "Urgent distribution of medicines during infectious disease outbreaks or natural disasters.",
    ],
  },
];

function ExampleList({ lead, items }: { lead: string | null; items: string[] }) {
  return (
    <div>
      {lead ? <p className="font-medium text-ink">{lead}</p> : null}
      <ul className={lead ? "mt-2 list-disc space-y-1 pl-4" : "list-disc space-y-1 pl-4"}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function MedicinesFramework() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          The Structure of the 3 Supporting Regulations
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-40 px-4 py-3 font-medium">Regulation</th>
                {regulations.map((regulation) => (
                  <th key={regulation.name} className="px-4 py-3 font-medium">
                    {regulation.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line align-top">
                <th scope="row" className="bg-paper px-4 py-3 font-medium text-ink">
                  Substances Covered
                </th>
                {regulations.map((regulation) => (
                  <td key={regulation.name} className="px-4 py-3 text-ink">
                    {regulation.substances}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-line bg-paper-raised align-top">
                <th scope="row" className="px-4 py-3 font-medium text-ink">
                  Scope & Key Focus
                </th>
                {regulations.map((regulation) => (
                  <td key={regulation.name} className="px-4 py-3 text-ink">
                    {regulation.scope}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Core Concept: &ldquo;The Authorised Way&rdquo;
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Under the Act, a person may only deal with a regulated substance if they are authorised
          and do so in the authorised way.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Who can deal
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-6 text-ink">
              {whoCanDeal.map((person) => (
                <li key={person}>{person}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              What dealings
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-6 text-ink">
              {dealings.map((dealing) => (
                <li key={dealing}>{dealing}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              How: the authorised way
            </h3>
            <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-sm leading-6 text-ink">
              {authorisedWay.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">Types of Authorisations</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-56 px-4 py-3 font-medium">Authorisation Type</th>
                <th className="w-80 px-4 py-3 font-medium">Mechanism & Basis</th>
                <th className="px-4 py-3 font-medium">Examples / Classes</th>
              </tr>
            </thead>
            <tbody>
              {authorisations.map((item, index) => (
                <tr
                  key={item.type}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    ({index + 1}) {item.type}
                  </th>
                  <td className="px-4 py-3 text-ink">{item.mechanism}</td>
                  <td className="px-4 py-3 text-ink">
                    <ExampleList lead={item.examplesLead} items={item.examples} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
