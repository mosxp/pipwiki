const overviewPoints = [
  {
    label: "Effective Date",
    detail:
      "Commenced 1 March 2026 under the Medicines and Poisons (Medicines) Regulation 2021 (MPMR).",
  },
  {
    label: "Core Principle",
    detail:
      "Suitably trained health practitioners obtain as-of-right statutory authority to deal with Schedule 4 immunisation medicines and Schedule 2 paracetamol without needing a prescription, standing order, or Extended Practice Authority (EPA).",
  },
  {
    label: "Definition of Immunisation Medicine",
    detail:
      "A medicine that is a vaccine, or includes immunoglobulins or monoclonal antibodies for preventing an infectious disease (MPMR Schedule 22).",
  },
];

const practitioners = [
  { profession: "Pharmacists", schedule: "Schedule 9, Part 1, Division 1" },
  { profession: "Registered Nurses (RNs)", schedule: "Schedule 7, Part 3, Division 2" },
  { profession: "Midwives", schedule: "Schedule 7, Part 2, Division 2" },
  {
    profession: "Aboriginal & Torres Strait Islander Health Practitioners",
    schedule: "Schedule 3, Part 1, Division 2",
  },
];

const dealings = [
  {
    activity: "Administering Vaccines",
    medicine: "Any S4 immunisation medicine",
    conditions:
      "Requires completion of recognised immunisation training. (Administering on a prescription or standing order does not require this specific training).",
  },
  {
    activity: "Treating Adverse Effects",
    medicine: "S2 Paracetamol",
    conditions:
      "Authorised to administer and give a treatment dose for treating actual or potential side effects of an immunisation medicine.",
  },
  {
    activity: "Managing Emergency Anaphylaxis",
    medicine: "Adrenaline (epinephrine)",
    conditions: "Authorised to administer adrenaline to treat acute anaphylaxis.",
  },
  {
    activity: "Ordering Stock",
    medicine: "S4 immunisation medicines",
    conditions:
      "Authorised to give a purchase order for stock (including for shared clinic immunisation services under Chapter 4 Part 3 and Chapter 8 Part 2).",
  },
];

export function AsOfRightAuthorisation() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Overview of the Legislative Change
        </h2>
        <dl className="mt-4 grid gap-4 lg:grid-cols-3">
          {overviewPoints.map((point) => (
            <div key={point.label} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {point.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{point.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Eligible Health Practitioners & Legislative Schedules
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          The following registered health practitioners who complete recognised immunisation
          training hold this as-of-right authority:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="px-4 py-3 font-medium">Practitioner</th>
                <th className="px-4 py-3 font-medium">Legislative schedule</th>
              </tr>
            </thead>
            <tbody>
              {practitioners.map((person, index) => (
                <tr
                  key={person.profession}
                  className={[
                    "border-t border-line",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {person.profession}
                  </th>
                  <td className="px-4 py-3 text-ink">{person.schedule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">Scope of Authorised Dealings</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-64 px-4 py-3 font-medium">Dealing / Activity</th>
                <th className="w-64 px-4 py-3 font-medium">Permitted Medicine</th>
                <th className="px-4 py-3 font-medium">Conditions & Practical Application</th>
              </tr>
            </thead>
            <tbody>
              {dealings.map((dealing, index) => (
                <tr
                  key={dealing.activity}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {dealing.activity}
                  </th>
                  <td className="px-4 py-3 text-ink">{dealing.medicine}</td>
                  <td className="px-4 py-3 text-ink">{dealing.conditions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
