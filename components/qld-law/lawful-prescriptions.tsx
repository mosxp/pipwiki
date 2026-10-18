function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

const writtenFields: { title: string; items: React.ReactNode[] }[] = [
  {
    title: "Prescriber Details",
    items: [
      "Name or unique identifier",
      "Usual place of practice",
      "Phone number or pager number",
      "Professional qualifications",
    ],
  },
  {
    title: "Patient / Animal Details",
    items: [
      <>
        Human patient: full name and address; <Strong>Date of Birth is mandatory</Strong> for all{" "}
        <Strong>monitored medicines</Strong>.
      </>,
      <>
        Animal: species, animal name/description, owner/custodian name and address, plus the
        statement <Strong>&ldquo;for animal treatment only&rdquo;</Strong>.
      </>,
    ],
  },
  {
    title: "Medicine & Directions",
    items: [
      "Name, form, and strength of the medicine",
      "Quantity to be dispensed/given and number of repeats (if any)",
      "Clear instructions for use",
      <>
        Dispensing date (if intended for a future date; <Strong>no forward-dating permitted</Strong>
        )
      </>,
    ],
  },
  {
    title: "Authorisations & Endorsements",
    items: [
      <>
        <Strong>Restricted medicines</Strong>: prescriber&apos;s specialist qualification or
        Queensland Health prescribing approval number.
      </>,
      <>
        Hydroxychloroquine: must state <Strong>&ldquo;continuing treatment&rdquo;</Strong> if
        treating a patient previously initiated by another practitioner.
      </>,
    ],
  },
];

const s8Rules: { title: string; detail: React.ReactNode }[] = [
  {
    title: "Words and numbers",
    detail: (
      <>
        Paper <Strong>S8</Strong> prescriptions must state the quantity to be dispensed in both{" "}
        <Strong>words and numbers</Strong> (can be printed by computer; does not need to be
        handwritten). Electronic prescriptions require <Strong>words or numbers, not both</Strong>.
      </>
    ),
  },
  {
    title: "Repeat intervals",
    detail: (
      <>
        Must specify a minimum interval of <Strong>at least 1 day</Strong> between repeat
        dispensings.
      </>
    ),
  },
  {
    title: "Psychostimulants",
    detail: (
      <>
        Prescriptions for dexamfetamine, lisdexamfetamine, or methylphenidate must state the words{" "}
        <Strong>&ldquo;specified condition&rdquo;</Strong> or specify the condition being treated.
      </>
    ),
  },
  {
    title: "Single S8 rule",
    detail: (
      <>
        A prescription may include different forms/strengths of the same <Strong>S8</Strong> drug,
        but <Strong>must not state more than one type of S8 medicine</Strong> (though it may include
        an <Strong>S4</Strong> on the same script).
      </>
    ),
  },
  {
    title: "Approved opioids (QOTP)",
    detail: (
      <>
        Must include the Queensland Health prescribing approval number, administration location,
        dosing instructions, and <Strong>explicit start and end dates</Strong>.
      </>
    ),
  },
];

const prescriptionTypes: { type: string; detail: React.ReactNode }[] = [
  {
    type: "Handwritten Paper",
    detail: (
      <>
        Requires a <Strong>physical, handwritten signature</Strong> by the prescriber.
      </>
    ),
  },
  {
    type: "Computer-Generated Paper",
    detail: (
      <BulletList
        items={[
          <>
            Must feature a space for a <Strong>physical handwritten signature</Strong>{" "}
            (computer-printed signatures are <Strong>invalid</Strong>).
          </>,
          "Must include a unique identifier matching patient records.",
          <>
            Must include either the <Strong>total number of medicines prescribed</Strong> or{" "}
            <Strong>scoring/hatching</Strong> across blank spaces.
          </>,
        ]}
      />
    ),
  },
  {
    type: "Electronic Prescriptions",
    detail: (
      <BulletList
        items={[
          <>
            Must be generated and <Strong>digitally signed</Strong> within a conformant Electronic
            Prescription Management System (EPMS) on the national register.
          </>,
          <>
            Scanned images, emails, or faxes are <Strong>digital copies of paper scripts</Strong>,
            not electronic prescriptions.
          </>,
        ]}
      />
    ),
  },
  {
    type: "Medication Charts (s80)",
    detail: (
      <>
        Exempt from requiring the prescriber&apos;s usual address, phone number, and qualifications.
        National Residential Medication Charts (NRMC) comply automatically.
      </>
    ),
  },
];

export function LawfulPrescriptions() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          General Content of Written Prescriptions for Supply (<Strong>MPMR s86</Strong>)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          A written prescription authorising supply (dispensing or giving a treatment dose) is only
          lawful if it includes all mandatory fields:
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {writtenFields.map((field) => (
            <article key={field.title} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {field.title}
              </h3>
              <div className="mt-2 text-sm leading-6 text-ink">
                <BulletList items={field.items} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Additional Mandatory Content for Schedule 8 (<Strong>S8</Strong>) Prescriptions (
          <Strong>MPMR s87</Strong>)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {s8Rules.map((rule) => (
            <article key={rule.title} className="rounded-lg border border-line bg-paper-raised px-4 py-4">
              <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {rule.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink">{rule.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescription Types, Formatting & Signing Rules
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-64 px-4 py-3 font-medium">Prescription Type</th>
                <th className="px-4 py-3 font-medium">Legal & Practical Requirements</th>
              </tr>
            </thead>
            <tbody>
              {prescriptionTypes.map((row, index) => (
                <tr
                  key={row.type}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.type}
                  </th>
                  <td className="px-4 py-3 text-ink">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescription Amendments & Cancellations (<Strong>MPMR s90 & s117</Strong>)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Amendments by the prescriber (MPMR s90)
            </h3>
            <div className="mt-3 text-sm leading-6 text-ink">
              <BulletList
                items={[
                  <>
                    <Strong>Handwritten prescriptions</Strong>: the prescriber must sign and date the
                    amendment directly on the paper in a manner that does not obscure any original
                    text.
                  </>,
                  <>
                    <Strong>Computer-generated paper prescriptions</Strong>: the prescriber{" "}
                    <Strong>cannot hand-alter</Strong> the printed document. The details must be
                    updated in the prescribing software and a new paper prescription must be printed.
                  </>,
                  <>
                    <Strong>Electronic prescriptions</Strong>: <Strong>cannot be amended</Strong>. If
                    a change is needed, the prescriber must cancel the electronic prescription and
                    issue a new one in the system.
                  </>,
                ]}
              />
            </div>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Amendments by the pharmacist (MPMR s117)
            </h3>
            <div className="mt-3 text-sm leading-6 text-ink">
              <BulletList
                items={[
                  <>
                    Scope of amendment: a pharmacist may amend a written or electronic prescription
                    before dispensing only to add information that clarifies the prescriber&apos;s
                    directions.
                  </>,
                  <>
                    Mandatory consents: the pharmacist must obtain <Strong>consent from the patient</Strong>{" "}
                    (or agent) and <Strong>agreement from the original prescriber</Strong>.
                  </>,
                  <>
                    Documentation: the amendment must be made in the manner agreed with the
                    prescriber without obscuring existing details, and the pharmacist must{" "}
                    <Strong>sign and date</Strong> the alteration.
                  </>,
                ]}
              />
            </div>
          </article>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Validity Periods & Urgent Oral Orders
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Prescription validity periods
            </h3>
            <div className="mt-2 text-sm leading-6 text-ink">
              <BulletList
                items={[
                  <>
                    <Strong>S2, S3, S4</Strong> prescriptions: <Strong>valid for 12 months</Strong> (1
                    year) from the date written.
                  </>,
                  <>
                    <Strong>S8</Strong> prescriptions: <Strong>valid for 6 months</Strong> from the
                    date written.
                  </>,
                  <>
                    <Strong>Forward-dating is illegal</Strong>; future dispensing dates can only be
                    stated as instructions.
                  </>,
                ]}
              />
            </div>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Follow-up on oral prescriptions (s92)
            </h3>
            <div className="mt-2 text-sm leading-6 text-ink">
              <BulletList
                items={[
                  <>
                    <Strong>S4</Strong> supply: prescriber must provide a confirming written
                    prescription <Strong>within 7 days</Strong>.
                  </>,
                  <>
                    <Strong>S8</Strong> supply: prescriber must provide a confirming written
                    prescription as soon as practicable /{" "}
                    <Strong>no later than the end of the next business day</Strong>.
                  </>,
                ]}
              />
            </div>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Self-prescribing ban (s40)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              <Strong>Offence</Strong> for prescribers to self-prescribe{" "}
              <Strong>high-risk/monitored medicines</Strong>; pharmacists{" "}
              <Strong>cannot lawfully dispense</Strong> these scripts.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
