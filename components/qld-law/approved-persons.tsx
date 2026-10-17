const definitionPoints = [
  {
    label: "Definition",
    detail:
      "Classes of persons (such as pharmacists, doctors, dentists, podiatrists) explicitly stated in the regulations who hold statutory authority to carry out specific dealings with regulated substances.",
  },
  {
    label: "Location in Legislation",
    detail:
      "Prescribed in Schedules 3 to 15 of the Medicines and Poisons (Medicines) Regulation 2021 (MPMR).",
  },
];

const scheduleColumns = [
  {
    column: "Column 1",
    detail: "The authorised dealing (e.g. administer, possess, give a purchase order).",
  },
  {
    column: "Column 2",
    detail: "The specific medicine or schedule (e.g. S2, S4 local anaesthetics).",
  },
  {
    column: "Column 3",
    detail: "The exact scope, circumstances, or conditions attached to that dealing.",
  },
];

const chapter4Parts = [
  { part: "Part 2", requirement: "Manufacturing by compounding" },
  { part: "Part 3", requirement: "Buying by giving purchase orders" },
  { part: "Part 4", requirement: "Supplying stock" },
  { part: "Part 5", requirement: "Possessing stock for delivery" },
  { part: "Part 6", requirement: "Prescribing medicines" },
  { part: "Part 7", requirement: "Making standing orders" },
  { part: "Part 8", requirement: "Dispensing medicines" },
  { part: "Part 9", requirement: "Giving treatment doses of medicines" },
  { part: "Part 10", requirement: "Administering medicines" },
  { part: "Part 11", requirement: "Disposing of waste from diversion-risk medicines" },
];

const chapter5Parts = [
  { part: "Part 2", group: "Pharmacists" },
  { part: "Part 3", group: "Pharmacist employees" },
  { part: "Part 4", group: "Veterinary professions" },
  { part: "Part 5", group: "Wholesale representatives" },
];

const authorisedWayCriteria = [
  {
    title: "Statutory Authority",
    detail:
      "Authorised as an approved person (s54(4)), under an emergency order (s57), or under a substance authority (s62).",
  },
  {
    title: "Regulatory Compliance",
    detail:
      "Complying with all prescribed requirements under section 91(1) and MPMR Chapters 4 & 5.",
  },
  {
    title: "Substance Management Plan (SMP)",
    detail: "Complying with any applicable site-specific SMP.",
  },
];

export function ApprovedPersons() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">Who Are Approved Persons?</h2>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          {definitionPoints.map((point) => (
            <div key={point.label} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {point.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{point.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-base leading-7 text-ink">
          Mechanism: Each schedule defines the class of person and provides a table specifying:
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                {scheduleColumns.map((column) => (
                  <th key={column.column} className="px-4 py-3 font-medium">
                    {column.column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line bg-paper align-top">
                {scheduleColumns.map((column) => (
                  <td key={column.column} className="px-4 py-3 text-ink">
                    {column.detail}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          General Dealing Requirements (MPMR Chapter 4)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Anyone carrying out an authorised dealing must comply with the general requirements set
          out across Chapter 4 of the MPMR:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-32 px-4 py-3 font-medium">Chapter 4</th>
                <th className="px-4 py-3 font-medium">Operational requirement</th>
              </tr>
            </thead>
            <tbody>
              {chapter4Parts.map((item, index) => (
                <tr
                  key={item.part}
                  className={[
                    "border-t border-line",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {item.part}
                  </th>
                  <td className="px-4 py-3 text-ink">{item.requirement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Profession-Specific Additional Requirements (MPMR Chapter 5)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Certain practitioners and entities must meet additional conditions beyond Chapter 4:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-40 px-4 py-3 font-medium">Chapter 5 Part</th>
                <th className="px-4 py-3 font-medium">Regulated Group / Scope</th>
              </tr>
            </thead>
            <tbody>
              {chapter5Parts.map((item, index) => (
                <tr
                  key={item.part}
                  className={[
                    "border-t border-line",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {item.part}
                  </th>
                  <td className="px-4 py-3 text-ink">{item.group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Summary of &ldquo;The Authorised Way&rdquo;
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Carrying out an activity in the &ldquo;authorised way&rdquo; requires fulfilling three
          criteria:
        </p>
        <ol className="mt-5 grid gap-4 lg:grid-cols-3">
          {authorisedWayCriteria.map((criterion, index) => (
            <li key={criterion.title} className="rounded-lg border border-line bg-paper-raised px-4 py-4">
              <p className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {index + 1}. {criterion.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-ink">{criterion.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 max-w-4xl text-sm leading-6 text-ink">
          Failing to comply with these requirements means the activity is not done in the authorised
          way and constitutes an offence under the Act.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Regulated Places & Substance Management Plans (SMP)
        </h2>
        <dl className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Regulated Places
            </dt>
            <dd className="mt-2 text-sm leading-6 text-ink">
              Includes community pharmacies, public/private hospitals, aged care facilities,
              ambulance stations, schools/child care, and prisons/detention centres.
            </dd>
          </div>
          <div className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Responsible Person
            </dt>
            <dd className="mt-2 text-sm leading-6 text-ink">
              Prescribed in Schedule 17 of the MPMR (e.g. the pharmacy owner for a community
              pharmacy, executive director, or principal).
            </dd>
          </div>
          <div className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Standard Compliance
            </dt>
            <dd className="mt-2 text-sm leading-6 text-ink">
              All SMPs must strictly follow the Departmental Standard: Substance management plans
              for medicines.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
