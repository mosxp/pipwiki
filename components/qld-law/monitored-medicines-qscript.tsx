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

const exemptions: { category: string; circumstance: React.ReactNode; notes: React.ReactNode }[] = [
  {
    category: "Hospitals",
    circumstance: (
      <>
        Prescribing or dispensing for an inpatient where the medicine is to be administered while
        the patient is at the hospital.
      </>
    ),
    notes: (
      <>
        Does <Strong tone="alert">not apply</Strong> to discharge medications or outpatient
        dispensing to take home.
      </>
    ),
  },
  {
    category: "Residential aged care (RACFs)",
    circumstance: (
      <>
        Prescribing, dispensing, or giving a treatment dose for a patient being treated at an aged
        care facility.
      </>
    ),
    notes: <>Applies to community pharmacy dispensing for RACF residents.</>,
  },
  {
    category: "Custodial facilities",
    circumstance: (
      <>
        Prescribing, dispensing, or giving a treatment dose for a person detained at a prison,
        detention centre, or watch-house, to be taken while detained.
      </>
    ),
    notes: (
      <>
        Does <Strong tone="alert">not apply</Strong> to medications provided for use post-release.
      </>
    ),
  },
  {
    category: "Emergencies",
    circumstance: <>Treating a patient urgently in an unforeseen emergency.</>,
    notes: (
      <>
        Does <Strong tone="alert">not apply</Strong> to &quot;just in case&quot; emergency scripts
        for future use.
      </>
    ),
  },
  {
    category: "Life expectancy < 12 months",
    circumstance: (
      <>
        Prescribing, dispensing, or giving a treatment dose for a patient with a life expectancy{" "}
        <Strong tone="summary">under 12 months</Strong>.
      </>
    ),
    notes: <>Not limited to palliative oncologists; applies across any terminal illness.</>,
  },
  {
    category: "Palliative care",
    circumstance: (
      <>
        Prescribing, dispensing, or giving a treatment dose for a patient receiving palliative care.
      </>
    ),
    notes: (
      <>
        Applies to <Strong>all monitored medicines</Strong> for that patient, even if unrelated to
        palliative treatment.
      </>
    ),
  },
  {
    category: "Voluntary assisted dying (VAD)",
    circumstance: (
      <>
        For a patient assessed as eligible for access to VAD under the{" "}
        <Strong>Voluntary Assisted Dying Act 2021 (Qld)</Strong>.
      </>
    ),
    notes: (
      <>
        Applies to any monitored medicine once formal consulting assessment is complete.
      </>
    ),
  },
  {
    category: "Prescribing for administration",
    circumstance: (
      <>
        Prescribing a monitored medicine solely to direct an authorised person (e.g. RN) to
        administer directly to a patient.
      </>
    ),
    notes: (
      <>
        Applies only where the medicine is <Strong tone="alert">not dispensed</Strong> and the
        patient <Strong tone="alert">never takes custody</Strong>.
      </>
    ),
  },
];

export function MonitoredMedicinesQscript() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          QScript Look-Up, Exemptions & The Monitored Medicines Standard (Version 2)
        </h2>
        <h3 className="mt-6 font-serif text-xl tracking-tight text-ink">
          Mandatory QScript look-up obligations (<Strong>MPA s41</Strong>)
        </h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Relevant practitioners
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Pharmacists, intern pharmacists, medical practitioners, nurse practitioners, endorsed
              midwives, dentists, endorsed podiatrists, and podiatric surgeons.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Mandatory triggers
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Must check <Strong tone="moss">QScript</Strong> before:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
              <li>Prescribing a monitored medicine for a person.</li>
              <li>
                Dispensing a monitored medicine for a person (at the point of sale/attempt to sell).
              </li>
              <li>Giving a treatment dose of a monitored medicine for a person.</li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              When checking is not required
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-6 text-ink">
              <li>
                <Strong>Administering a medicine:</Strong> when personally dosing/injecting a
                patient immediately.
              </li>
              <li>
                <Strong>Veterinary prescriptions:</Strong> QScript is strictly for human patient
                therapy; looking up animal owners/custodians is unauthorized.
              </li>
              <li>
                <Strong>Subsequent QOTP doses:</Strong> once a QOTP prescription is dispensed (and
                checked), daily administration/supply of subsequent doses does not require repeat
                QScript look-ups.
              </li>
            </ul>
          </article>
          <article className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Delegation prohibition
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Checking QScript <Strong tone="alert">cannot be delegated</Strong> to dispensary
              assistants, interns, or other colleagues.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4 lg:col-span-2">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Compliance via notifications
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-6 text-ink">
              <li>
                <Strong tone="alert">Red or amber notification:</Strong> you must click through and
                view the patient profile to fulfill the legal check.
              </li>
              <li>
                <Strong tone="moss">Green notification:</Strong> receiving a green notification in
                integrated software automatically fulfills the legal requirement (manual search not
                required).
              </li>
              <li>
                <Strong>Multiple scripts in one consult:</Strong> viewing the profile once during
                that encounter covers all contemporaneous monitored scripts.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Statutory QScript Look-Up Exemptions (MPMR Schedule 18, Part 1A)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          The statutory requirement to check <Strong tone="moss">QScript</Strong> under{" "}
          <Strong>section 41 of the MPA</Strong> does not apply in the following low-risk
          circumstances:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-56 px-4 py-3 font-medium">Exemption category</th>
                <th className="px-4 py-3 font-medium">Circumstance under MPMR Schedule 18, Part 1A</th>
                <th className="w-80 px-4 py-3 font-medium">Practical notes</th>
              </tr>
            </thead>
            <tbody>
              {exemptions.map((row, index) => (
                <tr
                  key={row.category}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.category}
                  </th>
                  <td className="px-4 py-3">{row.circumstance}</td>
                  <td className="px-4 py-3">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-ink">
          <Strong tone="summary">&quot;Low risk does not mean no risk&quot;</Strong> — practitioners
          retain the right and clinical discretion to voluntarily check QScript at any time.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          The Monitored Medicines Standard (MMS) — Version 2
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          The <Strong tone="summary">Monitored Medicines Standard</Strong> (
          <Strong>MPMR s93 & s126</Strong>) focuses its mandatory minimum requirements specifically
          on patients registered on the <Strong>Queensland Opioid Treatment Program (QOTP)</Strong>:
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              Prescribing monitored medicines to a QOTP patient (
              <Strong tone="summary">Requirement P1-1</Strong>)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              A prescriber must <Strong tone="alert">not prescribe</Strong> a monitored medicine for
              a registered QOTP patient unless:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-6 text-ink">
              <li>They are the patient&apos;s designated QOTP service provider; or</li>
              <li>
                They have obtained <Strong>explicit agreement</Strong> from the patient&apos;s QOTP
                service provider and documented the details of that agreement; or
              </li>
              <li>
                <Strong tone="summary">Urgent exception:</Strong> if unable to contact the QOTP
                provider and it is urgent/essential for patient wellbeing, they may prescribe a
                maximum of <Strong tone="alert">3 days&apos; supply</Strong> or the smallest
                manufacturer&apos;s pack (whichever is smaller), and document attempts to contact
                and clinical rationale.
              </li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              Dispensing monitored medicines to a QOTP patient (
              <Strong tone="summary">Requirement D1-1</Strong>)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              A dispenser (pharmacist) who holds <Strong tone="alert">significant clinical concerns</Strong>{" "}
              about dispensing a monitored medicine for a patient registered on the QOTP must:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-6 text-ink">
              <li>
                Attempt to communicate with the prescriber regarding their concerns prior to
                dispensing.
              </li>
              <li>
                Document the details of their concerns and the outcome/details of their
                communication attempt.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescription Upload Mandates (<Strong>MPA s226</Strong>)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Who must upload
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              All dispensers (<Strong>community pharmacies</Strong>,{" "}
              <Strong>private hospital pharmacies</Strong>) dispensing monitored medicines must
              upload dispensing events <Strong tone="moss">in real time</Strong> via clinical
              software connected to a <Strong>Prescription Delivery Service</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Exemption from uploading
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              <Strong tone="summary">Public sector hospital pharmacies</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Prescribers
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              There is <Strong tone="alert">no requirement</Strong> for prescribers to upload
              prescribing records to QScript.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
