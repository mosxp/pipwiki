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

const opioids = [
  "Sublingual buprenorphine tablets",
  "Sublingual buprenorphine-naloxone films",
  "Methadone oral syrup and liquid",
  "Long-acting injectable buprenorphine (LAI BPN) formulations",
];

const prescriptionFields: { field: string; detail: React.ReactNode }[] = [
  {
    field: "Prescriber authority",
    detail: (
      <>
        The <Strong tone="summary">Queensland Health QOTP Prescribing Approval</Strong> number.
      </>
    ),
  },
  {
    field: "Administration site",
    detail: (
      <>
        The explicit name of the pharmacy or clinic where doses are to be administered or dispensed.
      </>
    ),
  },
  {
    field: "Supply period & interval",
    detail: (
      <>
        Clear start and end dates, total quantity (
        <Strong>in words and numbers</Strong> for paper scripts), and minimum repeat interval (
        <Strong tone="summary">≥ 1 day</Strong>).
      </>
    ),
  },
  {
    field: "Dosing instructions",
    detail: (
      <>
        Schedule for <Strong>supervised administration</Strong> versus self-administered (
        <Strong>takeaway</Strong>) doses. Specific rules for floating takeaways (e.g. max per week
        or consecutive days) and double/triple dosing. <Strong>Methadone:</Strong> must specify both
        mg and mL, and state liquid vs. syrup. <Strong>LAI BPN:</Strong> must clearly state whether
        the dispenser administers the dose directly or supplies it to the medical practice for
        administration.
      </>
    ),
  },
  {
    field: "Prescription validity",
    detail: (
      <>
        Valid for dispensing for up to <Strong tone="summary">6 months</Strong> from the date
        written.
      </>
    ),
  },
];

export function QotpProgram() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Program Framework & Approved Opioids
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Harm-reduction treatment for diagnosed opioid use disorder delivered across public clinics
          (AODS), private clinics, shared-care general practice, and community/hospital pharmacies.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="px-4 py-3 font-medium">
                  Approved opioids (ODT medications) — Schedule 8
                </th>
              </tr>
            </thead>
            <tbody>
              {opioids.map((medicine, index) => (
                <tr
                  key={medicine}
                  className={[
                    "border-t border-line",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <td className="px-4 py-3 font-medium text-ink">{medicine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-ink">
          ODT medicines are simultaneously classified under <Strong>MPMR Schedule 2</Strong> as{" "}
          <Strong tone="summary">restricted</Strong>, <Strong tone="alert">high-risk</Strong>,{" "}
          <Strong tone="alert">diversion-risk</Strong>, and{" "}
          <Strong tone="moss">monitored medicines</Strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescriber Approvals & Statutory Exceptions
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Mandatory prescribing approval
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Prescribers must hold a{" "}
              <Strong tone="summary">Queensland Health QOTP Prescribing Approval</Strong> under the
              MPA to initiate or maintain treatment.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Continuing institutional treatment exception
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Medical practitioners and nurse practitioners treating admitted patients in a hospital
              or custodial facility do <Strong tone="moss">not need an individual approval</Strong>{" "}
              if the patient was already receiving ODT prior to admission (
              <Strong>Schedule 6 Part 1 Div 3 / Schedule 7 Part 1</Strong>).
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Admission & discharge reporting
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-6 text-ink">
              <li>
                <Strong>Admission form:</Strong> must be sent to Queensland Health no later than the{" "}
                <Strong tone="alert">end of the next business day</Strong> after starting treatment.
              </li>
              <li>
                <Strong>Discharge form:</Strong> must be sent within{" "}
                <Strong tone="summary">3 business days</Strong> of stopping treatment.
              </li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Interstate ODT scripts
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Interstate prescribers <Strong tone="alert">cannot hold Queensland approvals</Strong>,
              but their prescriptions are valid to dispense in Queensland if they include details of
              their home-jurisdiction prescribing authority.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Mandatory Prescription Writing Requirements (MPMR ss86–87)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Every written QOTP prescription must contain standard prescription elements plus specific
          statutory fields:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-64 px-4 py-3 font-medium">Field</th>
                <th className="px-4 py-3 font-medium">Requirement</th>
              </tr>
            </thead>
            <tbody>
              {prescriptionFields.map((row, index) => (
                <tr
                  key={row.field}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.field}
                  </th>
                  <td className="px-4 py-3">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Community Pharmacy Dispensing & QScript Workflow
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              <Strong tone="alert">Single dispense event</Strong> in software
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Pharmacists must dispense the <Strong>total prescription quantity</Strong> and create
              the software dispensing record <Strong tone="alert">once</Strong> — prior to
              administering/supplying the first dose. Do{" "}
              <Strong tone="alert">not create separate dispense events</Strong> in clinical software
              for subsequent daily doses or missed doses, as this corrupts real-time{" "}
              <Strong tone="moss">QScript</Strong> data feeds.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">QScript check obligations</h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              The pharmacist must check <Strong tone="moss">QScript</Strong> before dispensing the
              prescription (<Strong>prior to dose 1</Strong>). Checking QScript before daily
              subsequent doses is clinically optional and{" "}
              <Strong tone="summary">not mandated by law</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">Multiple strengths</h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              If a daily regimen combines strengths (e.g. buprenorphine-naloxone 10 mg as 8 mg + 2
              mg), dispense both drug lines simultaneously and state the combined daily dose in the
              directions.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">Titration annotation</h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              For dose titrations, enter the initial dose followed by the label{" "}
              <Strong tone="summary">*TITRATING DOSE*</Strong> and the schedule.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          S8 Drug Register & Daily Dosing Records
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Dispensing record vs medicine register
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              The electronic dispensing record uploads the initial prescription event to{" "}
              <Strong tone="moss">QScript</Strong>. Daily administration, takeaways, and stock
              movements must be logged <Strong tone="alert">separately</Strong> in the store&apos;s
              physical or electronic <Strong>S8 Medicine Register</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Register timing
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Entries must be made as soon as practicable and{" "}
              <Strong tone="alert">within 24 hours</Strong> of each transaction.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Reconciliation
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              The S8 safe manager must reconcile physical stock on hand against register balances{" "}
              <Strong tone="summary">at least monthly</Strong>.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Urgent Orders & Digital Transmissions
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Digital copies (fax / email)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Pharmacists can dispense on a digital copy received directly from the prescriber; the
              hardcopy original must be posted/sent no later than the{" "}
              <Strong tone="alert">end of the next business day</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Oral prescriptions
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Permitted in urgent scenarios; the prescriber must provide the written confirming
              script no later than the <Strong tone="alert">end of the next business day</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Prescription amendments
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Pharmacists may amend unclear details (e.g. clarifying administration instructions or
              adding a missing date of birth) with prescriber agreement and patient consent, signing
              and dating the change (<Strong>MPMR s117</Strong>).
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
