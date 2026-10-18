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

const components: { name: React.ReactNode; role: React.ReactNode }[] = [
  {
    name: (
      <>
        <Strong tone="moss">Prescribing system (PS)</Strong>
      </>
    ),
    role: (
      <>
        Software used by prescribers to create, digitally sign, and transfer prescription records.
      </>
    ),
  },
  {
    name: (
      <>
        <Strong tone="summary">Prescription delivery service (PDS)</Strong>
      </>
    ),
    role: (
      <>
        Secure intermediary software that communicates, exchanges, and stores electronic
        prescription data between prescribers and dispensers.
      </>
    ),
  },
  {
    name: (
      <>
        <Strong tone="moss">Dispensing system (DS)</Strong>
      </>
    ),
    role: (
      <>
        Software used by dispensers to retrieve electronic prescriptions from the PDS and record
        dispensing activities.
      </>
    ),
  },
];

export function DepartmentalStandardElectronicPrescription() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Departmental Standard – Requirements for an Electronic Prescription Management System (
          <Strong tone="summary">Version 1</Strong>)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Application scope
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Applies to <Strong>Chapter 8, Part 1</Strong> of the Medicines and Poisons (Medicines)
              Regulation 2021 (<Strong>MPMR</Strong>) for creating, transmitting, retrieving, and
              recording electronic prescriptions and dispensing activities.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Definition of an electronic prescription
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              A prescription in electronic form prepared and transferred through an{" "}
              <Strong tone="moss">end-to-end conformant system</Strong> to an authorised dispenser.
            </p>
          </article>
          <article className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Digital copies excluded
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Scanned copies, PDFs, emails, or faxes of paper prescriptions are{" "}
              <Strong tone="alert">not electronic prescriptions</Strong> and are exempt from this
              specific standard (governed instead by image-based script rules).
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Core Technical Architecture & Responsibilities
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          An <Strong>Electronic Prescription Management (EPM)</Strong> system comprises three
          interconnected components:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-80 px-4 py-3 font-medium">Component</th>
                <th className="px-4 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {components.map((row, index) => (
                <tr
                  key={index}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.name}
                  </th>
                  <td className="px-4 py-3">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">Conformance Requirements</h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          To be legally compliant for prescribing or dispensing under the MPMR, an EPM system must
          satisfy one of the following pathways:
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              <Strong tone="moss">Pathway A:</Strong> National Conformance Register
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              <li>
                Must comply with <Strong>Chapter 8, Part 1 of the MPMR</Strong>; and
              </li>
              <li>
                The prescribing system, dispensing system, and prescription delivery service must
                each be listed software products on the{" "}
                <Strong>Electronic Prescribing – External Conformance Register</Strong> published by
                the <Strong tone="summary">Australian Digital Health Agency (ADHA)</Strong>, with an
                active, valid <Strong tone="summary">Conformance Identifier (ID)</Strong>.
              </li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              <Strong tone="summary">Pathway B:</Strong> Electronic National Residential Medication
              Chart (eNRMC)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Be an approved electronic medication chart system operated under the{" "}
              <Strong>
                National Health (Electronic National Residential Medication Chart Trial) Special
                Arrangement 2018 (Cth)
              </Strong>{" "}
              at an approved participating entity.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescribing & Dispensing Authorisations (MPMR s83, s114 & s120)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Prescribers (MPMR s83)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Authorised health practitioners may only issue and transmit electronic prescriptions
              for dispensing if they utilize a <Strong tone="moss">conformant EPM system</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Dispensers (MPMR s114 & s120)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Pharmacists and dispensers can only lawfully retrieve and dispense electronic
              prescriptions (and record amendments or cancellations) through a{" "}
              <Strong tone="moss">conformant EPM system</Strong> connected to a{" "}
              <Strong tone="summary">compliant PDS</Strong>.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
