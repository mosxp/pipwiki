const definitionPoints = [
  {
    label: "Definition",
    detail:
      "A written document setting out how known and foreseeable risks associated with any dealing with a regulated substance are to be managed at, or in connection with, a regulated place.",
  },
  {
    label: "Policy Intent",
    detail:
      "Acts as an outcomes-focused, co-regulatory risk management tool proportionate to the risks of regulated activities.",
  },
  {
    label: "Legal Obligation",
    detail:
      "The responsible person for a regulated place must have an SMP in place before any dealing happens with a regulated substance at that place (unless holding a reasonable excuse).",
  },
  {
    label: "Penalty",
    detail: "Failure to make or maintain a compliant SMP attracts significant statutory penalties.",
  },
];

const coreElements = [
  {
    component: "Mandatory Details",
    requirement: [
      "The day the plan starts",
      "The location of the regulated place",
      "The specific dealings and regulated substances to which the plan applies",
      "The persons (staff members) to whom the plan applies",
    ],
  },
  {
    component: "Readability & Access",
    requirement: [
      "Must be written in a format easily understood by staff",
      "Must be made available to staff as soon as it is made",
    ],
  },
  {
    component: "Staff Obligation",
    requirement: "Staff must comply with the SMP unless they have a reasonable excuse.",
  },
  {
    component: "Departmental Standard",
    requirement:
      "Must address the prescribed matters set out in the Queensland Health Departmental Standard: Substance management plans for medicines.",
  },
];

const keyDefinitions = [
  {
    label: "Regulated Place",
    detail:
      "A place where dealing with a regulated substance happens (or is proposed), prescribed in MPMR Schedule 17.",
  },
  {
    label: "Responsible Person",
    detail:
      "The person prescribed under MPMR Schedule 17 to make and oversee the SMP for that specific regulated place.",
  },
];

const reviewRequirements = [
  {
    label: "Incident-Triggered Review",
    detail:
      "Must be reviewed as soon as practicable after a review incident occurs (incidents defined in the Substance management plans for medicines standard).",
  },
  {
    label: "Periodic Routine Review",
    detail:
      "Must be reviewed at least every 5 years from the day the plan starts, or from the date of the last review.",
  },
];

export function SubstanceManagementPlans() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Definition, Policy Intent & Legal Obligation
        </h2>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          {definitionPoints.map((point) => (
            <div
              key={point.label}
              className={
                point.label === "Penalty"
                  ? "rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-4"
                  : "rounded-lg border border-line bg-paper-raised px-5 py-4"
              }
            >
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
          Core Elements of a Substance Management Plan
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-56 px-4 py-3 font-medium">Component</th>
                <th className="px-4 py-3 font-medium">Legal Requirement</th>
              </tr>
            </thead>
            <tbody>
              {coreElements.map((element, index) => (
                <tr
                  key={element.component}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {element.component}
                  </th>
                  <td className="px-4 py-3 text-ink">
                    {Array.isArray(element.requirement) ? (
                      <ul className="list-disc space-y-1 pl-4">
                        {element.requirement.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      element.requirement
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Key Definitions & Legislative Framework
        </h2>
        <dl className="mt-4 grid gap-4 lg:grid-cols-2">
          {keyDefinitions.map((item) => (
            <div key={item.label} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">Review Requirements & Timelines</h2>
        <dl className="mt-4 grid gap-4 lg:grid-cols-2">
          {reviewRequirements.map((item) => (
            <div key={item.label} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
