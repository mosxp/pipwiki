const standardPoints = [
  {
    label: "Purpose",
    detail:
      "Task-specific standards made by the Chief Executive (or delegate) under the Medicines and Poisons Act 2019 (MPA) detailing procedures, storage, training/competency, product safety, and traceability for regulated substances.",
  },
  {
    label: "Adoption & Consultation",
    detail:
      "The Chief Executive may adopt external codes/guidelines and must take reasonable steps to consult affected entities or experts before making a standard.",
  },
  {
    label: "Publication",
    detail:
      "Published directly on the Queensland Health website (they are separate documents, not embedded directly within the Act or MPMR text).",
  },
];

const standards = [
  {
    name: "Compounding",
    appliesTo: "A person compounding a medicine for a patient.",
    focus: "Standards and procedures for preparing extemporaneous/compounded medicines.",
  },
  {
    name: "Secure storage of S8 medicines",
    appliesTo:
      "S8 safe establishers (pharmacy owners, builders, managers setting up S8 storage).",
    focus:
      "Specifications, construction, fixing, and security requirements for S8 safes and storage units.",
  },
  {
    name: "Monitored medicines",
    appliesTo:
      "Prescribers and dispensers (pharmacists) prescribing/dispensing monitored medicines.",
    focus:
      "Clinical protocols, decision-making frameworks, and QScript database integration/check rules.",
  },
  {
    name: "Pseudoephedrine recording",
    appliesTo: "Pharmacists selling Schedule 3 (S3) pseudoephedrine products.",
    focus: "Recording systems, data fields, and reporting workflows for OTC pseudoephedrine sales.",
  },
  {
    name: "Substance management plans for medicines",
    appliesTo: "Responsible persons for regulated places and staff working for relevant entities.",
    focus:
      "Required contents, risk-management structures, governance benchmarks, and review incident triggers for SMPs.",
  },
  {
    name: "Requirements for an electronic prescription management system",
    appliesTo:
      "System managers appointed by entities to set up and maintain electronic prescription systems.",
    focus:
      "Technical, security, data-integrity, and audit trail requirements for electronic prescription systems.",
  },
];

export function DepartmentalStandards() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">What is a Departmental Standard?</h2>
        <dl className="mt-4 grid gap-4 lg:grid-cols-3">
          {standardPoints.map((point) => (
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
          The 6 Prescribed Departmental Standards under the MPMR
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Departmental Standard Name</th>
                <th className="px-4 py-3 font-medium">Who It Applies To</th>
                <th className="px-4 py-3 font-medium">Core Subject Matter / Focus</th>
              </tr>
            </thead>
            <tbody>
              {standards.map((standard, index) => (
                <tr
                  key={standard.name}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {index + 1}. {standard.name}
                  </th>
                  <td className="px-4 py-3 text-ink">{standard.appliesTo}</td>
                  <td className="px-4 py-3 text-ink">{standard.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
