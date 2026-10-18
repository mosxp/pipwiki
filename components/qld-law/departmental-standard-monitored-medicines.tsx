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

const exclusions = [
  {
    title: "Prescribing for direct administration",
    detail: (
      <>
        Directing an authorised nurse or practitioner to administer a dose immediately to a patient
        (where the medicine is <Strong tone="alert">not dispensed</Strong> and the patient does{" "}
        <Strong tone="alert">not take custody</Strong>).
      </>
    ),
  },
  {
    title: "Staged supply / installments",
    detail: (
      <>
        Handing over individual daily doses of an <Strong>already dispensed</Strong> monitored
        medicine.
      </>
    ),
  },
  {
    title: "Veterinary prescriptions",
    detail: <>Prescribing or dispensing for animal treatment.</>,
  },
  {
    title: "Non-QOTP patients",
    detail: (
      <>
        General monitored medicine dispensing for <Strong>non-QOTP patients</Strong> (standard
        professional diligence applies).
      </>
    ),
  },
];

const prescribingCriteria: { criterion: React.ReactNode; detail: React.ReactNode }[] = [
  {
    criterion: (
      <>
        1. <Strong tone="moss">Designated provider</Strong>
      </>
    ),
    detail: (
      <>
        The prescriber is the patient&apos;s registered{" "}
        <Strong tone="moss">QOTP service provider</Strong> (including any authorised doctor/NP
        working in the same practice/clinic).
      </>
    ),
  },
  {
    criterion: (
      <>
        2. <Strong tone="summary">Documented agreement</Strong>
      </>
    ),
    detail: (
      <>
        The prescriber has obtained <Strong>explicit agreement</Strong> from the patient&apos;s
        QOTP service provider to prescribe the monitored medicine, and documents the details of that
        agreement in the patient&apos;s medical records.
      </>
    ),
  },
  {
    criterion: (
      <>
        3. <Strong tone="alert">Urgent clinical exception</Strong>
      </>
    ),
    detail: (
      <>
        If the prescriber reasonably believes prescribing is urgent and essential for the
        patient&apos;s wellbeing, but is unable to contact the QOTP service provider after
        attempting to do so, the prescriber must prescribe a maximum quantity of no more than{" "}
        <Strong tone="alert">3 days&apos; supply</Strong> or the smallest available
        manufacturer&apos;s pack (whichever is smallest), and must document the details of the
        attempt(s) to contact the QOTP provider and the clinical rationale for why urgent
        prescribing was essential.
      </>
    ),
  },
];

export function DepartmentalStandardMonitoredMedicines() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Departmental Standard – Monitored Medicines (Version 2)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Core shift in Version 2
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Unlike <Strong>Version 1</Strong> (which applied broad administrative rules to all
              patients receiving monitored medicines), <Strong tone="summary">Version 2</Strong>{" "}
              strictly targets and mandates requirements for patients currently registered on the{" "}
              <Strong tone="moss">Queensland Opioid Treatment Program (QOTP)</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Non-QOTP patients
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Prescribing or dispensing monitored medicines to non-QOTP patients is governed by{" "}
              <Strong>general professional practice standards</Strong> rather than specific minimum
              requirements under this Standard.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          What is Excluded from the Standard&apos;s Mandatory Rules
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Compliance with the <Strong>Monitored Medicines Standard</Strong> is{" "}
          <Strong tone="alert">not required</Strong> for:
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {exclusions.map((item) => (
            <article key={item.title} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Part 1: Prescribing Monitored Medicines to a QOTP Patient (
          <Strong tone="summary">Requirement P1-1</Strong>)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          A prescriber must <Strong tone="alert">not direct the dispensing or the giving of a treatment dose</Strong>{" "}
          of any monitored medicine (e.g. opioids, benzodiazepines, pregabalin, z-drugs) for a
          patient currently registered on the QOTP unless one of the following three criteria is
          met:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Criterion</th>
                <th className="px-4 py-3 font-medium">Requirement</th>
              </tr>
            </thead>
            <tbody>
              {prescribingCriteria.map((row, index) => (
                <tr
                  key={index}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.criterion}
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
          Part 2: Dispensing Monitored Medicines to a QOTP Patient (
          <Strong tone="summary">Requirement D1-1</Strong>)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          When a pharmacist or dispenser dispenses a monitored medicine (on an oral or written
          prescription, whether from Queensland or interstate) for a patient currently registered on
          the QOTP:
        </p>
        <article className="mt-4 rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4">
          <h3 className="text-sm font-semibold text-ink">
            <Strong tone="alert">Significant clinical concerns</Strong>
          </h3>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-ink">
            If the dispenser holds significant concerns regarding the clinical safety or
            appropriateness of dispensing the monitored medicine to that QOTP patient, the dispenser
            must:
          </p>
          <ul className="mt-2 max-w-4xl list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
            <li>
              Attempt to <Strong>communicate directly with the prescriber</Strong> regarding their
              clinical concerns prior to making the decision to dispense; and
            </li>
            <li>
              <Strong>Document</Strong> the details of the clinical concerns and the outcome/details
              of the communication attempts.
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
