const institutions = [
  {
    name: "Aged Care Facility",
    detail:
      "A place where nursing and personal care services are provided to residents by an approved provider under the Aged Care Act 1997 (Cwlth).",
  },
  {
    name: "Hospital",
    detail:
      "A public sector hospital (Hospital and Health Boards Act 2011) or a private health facility (Private Health Facilities Act 1999).",
  },
  {
    name: "Prison",
    detail: "A place declared to be a prison under the Corrective Services Act 2006.",
  },
  {
    name: "Detention Centre",
    detail: "A youth detention centre established under the Youth Justice Act 1992.",
  },
];

const standingOrderRules = [
  {
    rule: "Committee Approval Required",
    requirement:
      "A prescriber must not make a standing order for a relevant institution unless it is approved by the institution's Medicines and Therapeutics Committee (MTC).",
  },
  {
    rule: "Prescriber Signature",
    requirement:
      "The order must be signed by an authorised prescriber who is a member of that committee.",
  },
  {
    rule: "Mandatory MTC Composition",
    requirement: ["1 Medical Practitioner", "1 Registered Nurse", "1 Pharmacist"],
    lead: "The committee must include at least:",
  },
];

const stockRoles = [
  {
    role: "Medical Practitioner",
    position: "In charge of clinical/medical services",
    scope:
      "Schedule 6, Division 6: Order must be given for the institution and for the therapeutic treatment of its patients.",
  },
  {
    role: "Registered Nurse",
    position: "Nurse manager at the institution",
    scope:
      "Schedule 7, Division 3: Order must be given for the institution and for the therapeutic treatment of its patients.",
  },
  {
    role: "Pharmacist",
    position: "In charge of the dispensary",
    scope:
      "Schedule 9, Division 2: Order must be given for the institution and for the therapeutic treatment of its patients.",
  },
];

const stockDealings = [
  "Give a purchase order (S2, S3, S4, S8 stock)",
  "Possess stock at the institution",
];

export function RelevantInstitutions() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Definitions of &ldquo;Relevant Institutions&rdquo; (MPMR Dictionary)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Under the Medicines and Poisons (Medicines) Regulation 2021 (MPMR), a relevant institution
          encompasses four specific facility types:
        </p>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          {institutions.map((institution) => (
            <div
              key={institution.name}
              className="rounded-lg border border-line bg-paper-raised px-5 py-4"
            >
              <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {institution.name}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{institution.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Standing Orders in Relevant Institutions (MPMR s103)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          A standing order is a document authorising a medicine to be administered or given as a
          treatment dose at a stated place or in stated circumstances.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-64 px-4 py-3 font-medium">Rule / Concept</th>
                <th className="px-4 py-3 font-medium">Legal Requirement</th>
              </tr>
            </thead>
            <tbody>
              {standingOrderRules.map((item, index) => (
                <tr
                  key={item.rule}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {item.rule}
                  </th>
                  <td className="px-4 py-3 text-ink">
                    {Array.isArray(item.requirement) ? (
                      <>
                        <p>{item.lead}</p>
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                          {item.requirement.map((member) => (
                            <li key={member}>{member}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      item.requirement
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
          Giving Purchase Orders & Possessing Stock at Relevant Institutions
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Senior designated health practitioners are authorised under Schedules 6, 7, and 9 to order
          and possess stock (S2, S3, S4, and S8 medicines) for patient therapeutic treatment at the
          institution:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-64 px-4 py-3 font-medium">Approved Person Role</th>
                <th className="px-4 py-3 font-medium">Legislative Scope & Authority (MPMR)</th>
                <th className="w-72 px-4 py-3 font-medium">Dealings Authorised</th>
              </tr>
            </thead>
            <tbody>
              {stockRoles.map((person, index) => (
                <tr
                  key={person.role}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {person.role}
                    <span className="mt-1 block font-normal text-ink-soft">{person.position}</span>
                  </th>
                  <td className="px-4 py-3 text-ink">{person.scope}</td>
                  <td className="px-4 py-3 text-ink">
                    <ul className="list-disc space-y-1 pl-4">
                      {stockDealings.map((dealing) => (
                        <li key={dealing}>{dealing}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          S8 Safe Management & Secure Storage (MPMR Chapter 8, Part 2)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Person in charge of place
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">Must appoint in writing:</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm leading-6 text-ink">
              <li>S8 Safe Establisher (to set up/maintain S8 safe & store)</li>
              <li>S8 Safe Manager (to manage safe & medicine store)</li>
            </ol>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Giving access (s200)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Establisher may only give access to a person if:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
              <li>Person is an AUTHORISED USER of the S8 medicines; AND</li>
              <li>Person is permitted under the SUBSTANCE MANAGEMENT PLAN</li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Mandatory access controls
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">Access must strictly comply with:</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm leading-6 text-ink">
              <li>Departmental Standard: &lsquo;Secure storage of S8 medicines&rsquo;</li>
              <li>Site Substance Management Plan (SMP)</li>
            </ol>
          </article>
        </div>
      </section>
    </div>
  );
}
