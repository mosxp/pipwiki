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

const writingStandards: { rule: string; detail: React.ReactNode }[] = [
  {
    rule: "Exact product details required (s86)",
    detail: (
      <>
        The prescription must state the <Strong>exact name, form, and strength</Strong> of the
        medicine. A prescription that states only a{" "}
        <Strong tone="alert">&quot;TGA Category&quot;</Strong> (e.g. Category 5) or a broad strength
        range (e.g. <Strong tone="alert">THC 19–24%</Strong>) is{" "}
        <Strong tone="alert">illegal under the MPMR and cannot be dispensed</Strong>.
      </>
    ),
  },
  {
    rule: "Quantity & repeat limits",
    detail: (
      <>
        Must state the <Strong>explicit quantity</Strong> to be dispensed and the{" "}
        <Strong>number of repeats</Strong> (if any). Pharmacists{" "}
        <Strong tone="alert">cannot alter the pack size or repeat numbers</Strong> (e.g. changing
        30g + 3 repeats to 10g + 11 repeats) without prescriber agreement/re-issuance.
      </>
    ),
  },
  {
    rule: "Dispensing interval (s87(2)(b))",
    detail: (
      <>
        <Strong tone="alert">S8</Strong> medicinal cannabis prescriptions must state a minimum
        interval between dispensings of <Strong tone="summary">at least 1 day</Strong>.
      </>
    ),
  },
  {
    rule: "Single drug rule (s87(6))",
    detail: (
      <>
        <Strong tone="alert">Only one medicinal cannabis product</Strong> can be written per
        prescription.
      </>
    ),
  },
  {
    rule: "Monthly limits",
    detail: (
      <>
        Monthly totals written on scripts reflect <Strong>prescriber TGA conditions</Strong>, not
        statutory dispenser limits. A limit written on one prescription cannot be legally applied
        across other prescriptions for the patient. Dispensers must ensure the supply is clinically
        safe, but are <Strong>not legally liable</Strong> for policing cross-pharmacy TGA prescriber
        caps.
      </>
    ),
  },
];

const checklist = [
  {
    title: "Prescription form",
    detail: (
      <>
        Must name an <Strong>exact product</Strong>, <Strong>specific strength</Strong>,{" "}
        <Strong>exact dosage form</Strong>, and <Strong>total quantity</Strong> (
        <Strong tone="alert">never a broad category or strength range</Strong>).
      </>
    ),
  },
  {
    title: "Substitution rule",
    detail: (
      <>
        <Strong tone="alert">No brand or category substitution</Strong> allowed. Stock
        unavailability requires a <Strong>new prescription</Strong>.
      </>
    ),
  },
  {
    title: "Monitoring",
    detail: (
      <>
        <Strong tone="moss">Real-time QScript check mandatory</Strong> before supply for all{" "}
        <Strong tone="alert">S8</Strong> categories (<Strong>Categories 2 to 5</Strong>).
      </>
    ),
  },
];

export function UnapprovedMedicinalCannabis() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Regulatory Approvals & Prescriber Pathways
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Unapproved goods status
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Most medicinal cannabis products are not registered on the{" "}
              <Strong>Australian Register of Therapeutic Goods (ARTG)</Strong> and require
              Commonwealth approval via the <Strong tone="summary">Special Access Scheme (SAS)</Strong>{" "}
              or <Strong tone="summary">Authorised Prescriber (AP)</Strong> scheme.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Queensland approval exemption (MPA s50)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Medical practitioners and nurse practitioners who hold valid TGA approval (
              <Strong>SAS</Strong> or <Strong>AP</Strong>) do{" "}
              <Strong tone="moss">not require any additional Queensland Health prescribing approval</Strong>.
              Only medical practitioners are currently eligible to apply to the TGA as an{" "}
              <Strong tone="summary">Authorised Prescriber</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Monitored medicine rules (MPA s41)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              All <Strong tone="alert">Schedule 8 (S8)</Strong> medicinal cannabis products are{" "}
              <Strong tone="moss">monitored medicines</Strong>. Prescribers and pharmacists must
              check <Strong tone="moss">QScript in real-time</Strong> before prescribing or
              dispensing S8 products and comply with the{" "}
              <Strong>Monitored Medicines Standard</Strong>.
            </p>
          </article>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-ink">
          <Strong>Interstate prescribers</Strong> must be authorised in their home state/territory,
          hold TGA approval (<Strong>SAS/AP</Strong>), hold any home-jurisdiction approvals, and
          write prescriptions that meet <Strong>MPMR sections 86 to 88</Strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescription Writing & Validity Standards (MPMR s86 & s87)
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Requirement</th>
                <th className="px-4 py-3 font-medium">Standard</th>
              </tr>
            </thead>
            <tbody>
              {writingStandards.map((row, index) => (
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

      <section className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Brand Substitution & Product Changes
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Generic substitution prohibited (s128)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Unapproved medicinal cannabis products do{" "}
              <Strong tone="alert">not meet the legal definition of generic medicines</Strong> under{" "}
              <Strong>MPMR section 128</Strong>. Pharmacists{" "}
              <Strong tone="alert">cannot substitute alternative brands</Strong> or swap products
              within the same TGA category.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Unavailable stock / alternative products
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Prescriptions listing <Strong tone="alert">&quot;substitute options&quot;</Strong> are{" "}
              <Strong tone="alert">non-compliant</Strong>. If the prescribed brand is out of stock,
              the pharmacist must contact the prescriber to{" "}
              <Strong>cancel the current prescription and issue a new one</Strong> for the available
              product.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Electronic prescription annotations
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Listing substitute products in the &quot;notes&quot; or &quot;annotations&quot; section
              of an electronic prescription{" "}
              <Strong tone="alert">does not make them lawful alternatives</Strong>. If a change is
              needed, the prescriber must cancel and remake the electronic script (
              <Strong>MPMR s90(4)</Strong>).
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Summary Checklist for Dispensers
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {checklist.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <h3 className="text-sm font-semibold text-ink">
                <span className="text-moss">{index + 1}.</span> {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
