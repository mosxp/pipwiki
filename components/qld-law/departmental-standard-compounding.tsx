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

const premises = [
  {
    title: "Dedicated area",
    detail: "A defined, designated area used specifically for compounding.",
  },
  {
    title: "Surfaces & fixtures",
    detail:
      "Working surfaces must be in good repair, hygienic, and covered with impervious, washable materials.",
  },
  {
    title: "Plumbing & cleanliness",
    detail: "Must have a dedicated sink supplied with running water.",
  },
  {
    title: "Physical enclosure",
    detail:
      "Adequately enclosed, ventilated, painted, well-lit, and kept clean and free from any contaminating materials.",
  },
];

const qualityStandards = [
  <>
    <Strong>Therapeutic Goods Orders (TGOs)</Strong> made under section 10 of the Therapeutic Goods
    Act 1989 (Cwlth).
  </>,
  <>
    Default pharmacopoeial monographs (<Strong>British Pharmacopoeia</Strong> or{" "}
    <Strong>United States Pharmacopeia–National Formulary</Strong>).
  </>,
  <>
    <Strong>Pharmacy Board of Australia Guidelines on Compounding of Medicines</Strong> and the
    current <Strong>Australian Pharmaceutical Formulary and Handbook (APF)</Strong>.
  </>,
];

const rawMaterials: { rule: string; detail: React.ReactNode }[] = [
  {
    rule: "General raw materials",
    detail: (
      <>
        Must be stored strictly according to manufacturer specifications in packaging that preserves
        quality and stability (e.g. light-resistant and moisture-proof containers).
      </>
    ),
  },
  {
    rule: "Hazardous substances",
    detail: (
      <>
        Must be kept in enclosed containers that{" "}
        <Strong tone="alert">prevent cross-contamination</Strong> with other raw ingredients.
      </>
    ),
  },
  {
    rule: "Cytotoxic labelling",
    detail: (
      <>
        Cytotoxic raw materials and compounded products must display{" "}
        <Strong tone="alert">explicit cytotoxic warning labels</Strong> on the outer packaging.
      </>
    ),
  },
];

const sops = [
  "Staff training, competency validation, and ongoing monitoring.",
  "Compounding area cleaning and operational maintenance.",
  "Equipment calibration and planned preventive maintenance schedules.",
  "Complaints handling, recall management, and batch tracing/retrieval systems.",
  "Chemical spillage management, safe storage, and waste disposal.",
  "Packaging, labelling, storage, and handling protocols.",
  "Quality assurance processes.",
];

const operationalLogs = [
  "Staff training records.",
  "Cleaning logs for compounding surfaces and rooms.",
  "Equipment maintenance and calibration logs.",
  "Complaints and product recall register.",
  "Hazardous substance register accompanied by current Material Safety Data Sheets (MSDS / SDS) for every ingredient.",
];

const formulaItems: { label: string; detail: string }[] = [
  {
    label: "Risk assessment",
    detail: "Formal clinical and safety risk assessment conducted prior to compounding.",
  },
  {
    label: "Formulation",
    detail:
      "Australian Approved Name (AAN) of each ingredient, complete formula, reference source (including edition), method/procedure, and concentration of any preservatives.",
  },
  {
    label: "Batch traceability",
    detail: "Source, manufacturer batch number, and expiry date for every ingredient used.",
  },
  {
    label: "Water details",
    detail:
      "If water is used, the type of water (e.g. Purified, WFI), date of preparation or opening, and batch number.",
  },
  {
    label: "Technical notes",
    detail: "Stability considerations, calculations, notes, and references.",
  },
  {
    label: "Labelling",
    detail: "Record of all ancillary warning labels and specific instructions attached to the product.",
  },
];

export function DepartmentalStandardCompounding() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Departmental Standard – Compounding (<Strong tone="summary">Version 1</Strong>)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Mandatory compliance
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              <Strong>MPMR s47</Strong>: an authorised person (pharmacist) who compounds a medicine
              for human use must ensure that compounding complies with this Standard. Failure to
              comply means the activity is <Strong tone="alert">not conducted in the &quot;authorised way&quot;</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Hierarchy of quality standards
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">Compounded products must also satisfy:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
              {qualityStandards.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Environmental & Premises Requirements (Section 1)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          The compounding area must minimise particulate and microbial contamination:
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {premises.map((item) => (
            <article key={item.title} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink">
                {item.title === "Dedicated area" ? (
                  <>
                    A defined, <Strong tone="moss">designated area</Strong> used specifically for
                    compounding.
                  </>
                ) : item.title === "Plumbing & cleanliness" ? (
                  <>
                    Must have a <Strong>dedicated sink</Strong> supplied with running water.
                  </>
                ) : (
                  item.detail
                )}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Equipment & Sterile Compounding Infrastructure (Section 2)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              General equipment
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Must be <Strong>dedicated to compounding</Strong>, appropriate for the required
              accuracy of measurement, cleaned before and after each preparation, regularly
              maintained/calibrated per documented protocols, and protected from damage/contamination
              during storage.
            </p>
          </article>
          <article className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Hazardous substances equipment
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Any equipment used for formulations containing hazardous ingredients (e.g.{" "}
              <Strong tone="alert">cytotoxic agents</Strong>, hormones) must be{" "}
              <Strong tone="alert">clearly labelled and stored separately</Strong> from general
              equipment.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Sterile compounding standards
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">Must be performed in either:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              <li>
                A <Strong tone="moss">cleanroom</Strong> complying with Australian Standards,
                utilizing laminar flow cabinets or laminar flow workbenches that meet Australian
                Standards; or
              </li>
              <li>
                A <Strong tone="moss">pharmaceutical isolator</Strong> complying with relevant
                Australian Standards.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Raw Materials & Hazardous Substance Storage (Section 3)
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-64 px-4 py-3 font-medium">Material</th>
                <th className="px-4 py-3 font-medium">Storage rule</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((row, index) => (
                <tr
                  key={row.rule}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.rule}
                  </th>
                  <td className="px-4 py-3">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Standard Operating Procedures (SOPs) Required (Section 4)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Pharmacies undertaking compounding must implement and maintain documented{" "}
          <Strong>SOPs</Strong> covering:
        </p>
        <ul className="mt-3 max-w-4xl list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
          {sops.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Documentation & Compounding Log Requirements (Section 5)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              1. Operational logs (readily available for inspection)
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
              {operationalLogs.map((item) => (
                <li key={item}>
                  {item.startsWith("Hazardous") ? <Strong tone="summary">{item}</Strong> : item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              2. Compounding formula sheet / individual medicine record
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Every compounded product must have a <Strong tone="alert">signed and dated record</Strong>{" "}
              detailing:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              {formulaItems.map((item) => (
                <li key={item.label}>
                  <Strong>{item.label}:</Strong> {item.detail}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
