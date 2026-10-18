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

const pathways: { schedule: React.ReactNode; eligibility: React.ReactNode; access: React.ReactNode; requirements: React.ReactNode }[] = [
  {
    schedule: (
      <>
        <Strong tone="moss">Schedule 3 (S3)</Strong>
        <span className="mt-1 block font-normal">Pharmacist-only</span>
      </>
    ),
    eligibility: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Adults aged <Strong tone="moss">≥ 18 years</Strong> only
        </li>
        <li>
          Nicotine concentration <Strong tone="moss">≤ 20 mg/mL</Strong> (or{" "}
          <Strong>zero-nicotine</Strong>)
        </li>
      </ul>
    ),
    access: (
      <>
        <Strong tone="moss">No prescription required</Strong> (pharmacist OTC consultation)
      </>
    ),
    requirements: (
      <ul className="list-disc space-y-1 pl-4">
        <li>Sight and verify evidence of age/identity.</li>
        <li>
          <Strong>Max 1 month supply</Strong>, once per month.
        </li>
        <li>
          Provide counselling on dosage/titration, alternative supports, and{" "}
          <Strong>Quitline</Strong> details.
        </li>
        <li>
          Submit TGA <Strong tone="summary">SAS Category C</Strong> notification within{" "}
          <Strong>28 days</Strong> of supply.
        </li>
      </ul>
    ),
  },
  {
    schedule: (
      <>
        <Strong tone="summary">Schedule 4 (S4)</Strong>
        <span className="mt-1 block font-normal">Prescription only</span>
      </>
    ),
    eligibility: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Patients <Strong tone="alert">under 18 years of age</Strong> (mandatory prescription)
        </li>
        <li>
          Nicotine concentrations <Strong tone="alert">&gt; 20 mg/mL</Strong>
        </li>
      </ul>
    ),
    access: (
      <>
        <Strong tone="summary">Prescription required</Strong> (from a medical practitioner or nurse
        practitioner)
      </>
    ),
    requirements: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Prescriber must hold Commonwealth <Strong tone="summary">Authorised Prescriber (AP)</Strong>{" "}
          or <Strong tone="summary">SAS</Strong> approval.
        </li>
        <li>Standard MPMR prescription validity and writing requirements apply.</li>
      </ul>
    ),
  },
];

export function TherapeuticVapes() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Regulatory Framework & Access Pathways
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Therapeutic vapes (nicotine-containing and zero-nicotine) are restricted exclusively to{" "}
          <Strong tone="moss">pharmacy supply</Strong> for smoking cessation or managing nicotine
          dependence. It is <Strong tone="alert">unlawful for any other retailer</Strong>{" "}
          (tobacconists, convenience stores, or online vendors) to sell any vaping products.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-44 px-4 py-3 font-medium">Schedule / pathway</th>
                <th className="w-72 px-4 py-3 font-medium">
                  Patient eligibility & nicotine concentration
                </th>
                <th className="w-64 px-4 py-3 font-medium">Access mechanism</th>
                <th className="px-4 py-3 font-medium">
                  Mandatory clinical & administrative requirements
                </th>
              </tr>
            </thead>
            <tbody>
              {pathways.map((row, index) => (
                <tr
                  key={index}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.schedule}
                  </th>
                  <td className="px-4 py-3">{row.eligibility}</td>
                  <td className="px-4 py-3">{row.access}</td>
                  <td className="px-4 py-3">{row.requirements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          TGA List of Notified Vapes & Product Standards (TGO 110)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Unapproved goods
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              There are <Strong tone="alert">no therapeutic vapes</Strong> registered on the{" "}
              <Strong>Australian Register of Therapeutic Goods (ARTG)</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Notified list mandate
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Pharmacists and prescribers can only supply products published on the{" "}
              <Strong tone="summary">TGA list of notified vapes</Strong> that comply with the
              Therapeutic Goods (Standard for Therapeutic Vaping Goods) (<Strong>TGO 110</Strong>)
              Order 2021. Supplying or dispensing products not on this list is{" "}
              <Strong tone="alert">unlawful</Strong>.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Extemporaneous Compounding Prohibitions
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              TGA approval required
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Pharmacists wishing to compound therapeutic vapes must obtain{" "}
              <Strong tone="summary">prior approval from the TGA</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Sponsor obligations
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              A compounding pharmacist is legally classed as the{" "}
              <Strong>Australian sponsor</Strong> and must ensure full conformity with{" "}
              <Strong>TGO 110</Strong> testing, labelling, and safety records.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Queensland Specific Legislation Controls (MPMR 2021)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Diversion-risk classification
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Therapeutic nicotine vapes are classified as{" "}
              <Strong tone="alert">diversion-risk medicines</Strong> under{" "}
              <Strong>MPMR Schedule 2, Part 3</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Point of sale & physical storage
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              May only be sold by a pharmacist at a <Strong tone="moss">community pharmacy</Strong>{" "}
              (MPMR Schedule 9, Part 1, Div 1). Under <Strong>MPMR s199</Strong> they must be stored
              completely <Strong tone="alert">out of sight</Strong> from members of the public.
              Displaying or promoting therapeutic vapes is an offence carrying up to{" "}
              <Strong tone="alert">40 penalty units</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Disposal & waste destruction (MPMR s148)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Because they are diversion-risk medicines, waste from therapeutic nicotine vapes must
              be destroyed by rendering it <Strong tone="alert">unusable and unidentifiable</Strong>{" "}
              prior to high-temperature disposal.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Mandatory reporting to the Chief Executive
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              <li>
                <Strong>Theft or loss (s226(1)(c)):</Strong> suspected loss or theft must be
                reported to the Chief Executive (Queensland Health) and the{" "}
                <Strong>Queensland Police Service</Strong> no later than the{" "}
                <Strong tone="alert">end of the next business day</Strong>.
              </li>
              <li>
                <Strong>Excessive supply requests (s233):</Strong> pharmacists must report any
                suspicious or excessive purchasing attempts to the Chief Executive.
              </li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4 lg:col-span-2">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Smoke-free laws (TOSPA)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Therapeutic vapes remain subject to Queensland&apos;s smoke-free legislation under the{" "}
              <Strong>Tobacco and Other Smoking Products Act 1998 (TOSPA)</Strong>.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
