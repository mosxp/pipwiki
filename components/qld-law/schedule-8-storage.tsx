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

const roles: { role: string; duties: React.ReactNode }[] = [
  {
    role: "Safe Establisher",
    duties: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Appointed <Strong>in writing</Strong> by the person with overall accountability for the
          place (or is the sole practitioner possessing S8s).
        </li>
        <li>
          Responsible for establishing and maintaining an <Strong tone="moss">S8 safe</Strong> that
          strictly complies with the Departmental Standard: Secure storage of S8 medicines (
          <Strong>MPMR s197</Strong>).
        </li>
        <li>
          Grants access to authorised users and ensures manufacturer storage conditions (e.g.{" "}
          <Strong>cold chain</Strong>) are maintained.
        </li>
      </ul>
    ),
  },
  {
    role: "Safe Manager",
    duties: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Appointed <Strong>in writing</Strong> by the person in charge.
        </li>
        <li>
          Responsible for establishing and keeping compliant paper or electronic{" "}
          <Strong>S8 medicine registers</Strong> (<Strong>MPMR ss207–210</Strong>).
        </li>
        <li>
          Must conduct physical reconciliations against actual stock{" "}
          <Strong tone="summary">at least monthly</Strong> (<Strong>MPMR s217</Strong>).
        </li>
        <li>
          Must report lost, stolen, or destroyed registers to the Chief Executive (
          <Strong>MPMR s218</Strong>).
        </li>
      </ul>
    ),
  },
  {
    role: "Authorised users & assistants",
    duties: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          <Strong tone="moss">Authorised user:</Strong> a practitioner holding statutory authority
          to deal with the medicine (e.g. registered pharmacist). Must keep safe keys, codes, and
          login credentials <Strong tone="alert">confidential</Strong>.
        </li>
        <li>
          <Strong>Assistant:</Strong> a person authorised to possess S8s only under supervision
          (e.g. pharmacy assistant, intern pharmacist). An authorised user may temporarily hand a
          key to an assistant only if it operates <Strong>solely as a key</Strong> (no password/PIN)
          and is <Strong tone="alert">returned immediately</Strong> after use.
        </li>
      </ul>
    ),
  },
];

const safes: { category: string; specs: React.ReactNode }[] = [
  {
    category: "Standard free-standing or built-in safe",
    specs: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Constructed of mild steel plate <Strong tone="summary">≥ 10 mm</Strong> thickness with
          continuous welding.
        </li>
        <li>
          Door <Strong tone="summary">≥ 10 mm</Strong> mild steel plate, flush fitting (clearance{" "}
          <Strong>≤ 1.5 mm</Strong>) with fixed rear locking bar.
        </li>
        <li>
          Fitted with a <Strong>6-lever key lock</Strong>, <Strong>4-wheel combination lock</Strong>
          , or approved electronic equivalent.
        </li>
        <li>
          Weight and fixing: must weigh <Strong tone="summary">&gt; 350 kg</Strong>{" "}
          <Strong>or</Strong> be securely attached to the premises.
        </li>
      </ul>
    ),
  },
  {
    category: "Electronic Storage and Supply Units (ESSU)",
    specs: (
      <ul className="list-disc space-y-1 pl-4">
        <li>Automated dispensing units/cabinets (e.g. Pyxis, Omnicell).</li>
        <li>
          Requires <Strong>individualized access control</Strong>, electronic tracking, and prior
          approval/inspection where applicable.
        </li>
      </ul>
    ),
  },
  {
    category: "Refrigerators for S8 cold chain",
    specs: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Lockable refrigerator securely attached to the premises, or a refrigerator kept inside a
          locked room/cupboard.
        </li>
        <li>
          Must <Strong tone="alert">not store any items other than medicines</Strong>.
        </li>
      </ul>
    ),
  },
  {
    category: "Opioid Treatment Program (OTP) working supply",
    specs: (
      <ul className="list-disc space-y-1 pl-4">
        <li>Lockable hardwood or metal cupboard/drawer.</li>
        <li>
          Limited strictly to the quantity reasonably needed for that{" "}
          <Strong>operational working day</Strong>.
        </li>
      </ul>
    ),
  },
];

export function Schedule8Storage() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Key Roles & Statutory Responsibilities
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Under the Medicines and Poisons (Medicines) Regulation 2021 (<Strong>MPMR</Strong>),
          distinct responsibilities are assigned across three defined roles:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-64 px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Statutory responsibilities</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((row, index) => (
                <tr
                  key={row.role}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    <Strong tone="moss">{row.role}</Strong>
                  </th>
                  <td className="px-4 py-3">{row.duties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          S8 Safe Construction & Physical Security Overview
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Physical security must adhere to the{" "}
          <Strong>Departmental Standard: Secure storage of S8 medicines</Strong>:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Safe category</th>
                <th className="px-4 py-3 font-medium">Minimum physical & mechanical specifications</th>
              </tr>
            </thead>
            <tbody>
              {safes.map((row, index) => (
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
                  <td className="px-4 py-3">{row.specs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          S8 Medicine Register Rules & Entry Timelines
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              Separate register per safe (<Strong>MPMR s207</Strong>)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              A dedicated, discrete register must be kept for every physical{" "}
              <Strong tone="moss">S8 safe</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              24-hour entry rule (<Strong>MPMR s211</Strong>)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Any dealing (in, out, transfer, destruction, stocktake) must be recorded in the
              register as soon as practicable, and{" "}
              <Strong tone="alert">no later than 24 hours</Strong> after the dealing.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              Signatures & countersigning (<Strong>MPMR s212</Strong>)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Every entry must be signed (handwritten or electronic credentials) by the authorised
              user who performed or supervised the transaction. If an assistant/intern makes the
              register entry, the supervising pharmacist must <Strong tone="summary">co-sign</Strong>
              .
            </p>
          </article>
          <article className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">No deletions or obscuring</h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              You must <Strong tone="alert">never delete, white-out, or overwrite</Strong> an entry.
              Corrections must be made alongside the entry stating the date, name, role of the person
              correcting, reason for error, and any witness details (if relating to waste).
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4 lg:col-span-2">
            <h3 className="text-sm font-semibold text-ink">No negative balances</h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Each entry must reflect <Strong>actual stock remaining</Strong> immediately following
              that transaction.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Mandatory Stock Reconciliation & Discrepancies (MPMR s217)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Frequency
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              The <Strong tone="moss">Safe Manager</Strong> must physically count all S8 stock and
              reconcile against register balances <Strong tone="summary">at least monthly</Strong> (
              <Strong>MPMR s217</Strong>), or more frequently if required by the store&apos;s
              Substance Management Plan.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Reconciliation record
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              A formal entry noting the stocktake date, verified physical balance, and signature
              must be written in the register.
            </p>
          </article>
          <article className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Discrepancies & theft
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Any unresolved discrepancy, suspected loss, or theft must be reported to Queensland
              Health (Chief Executive) and the <Strong>Queensland Police Service</Strong> via the
              online reporting portal no later than the{" "}
              <Strong tone="alert">end of the next business day</Strong> (<Strong>MPMR s226</Strong>
              ).
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Document & Register Retention Periods (MPMR s224)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Paper medicine registers
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Must be kept for <Strong tone="summary">2 years</Strong> from the date of the last
              entry made in the register.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Electronic medicine register records
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Each record must be kept for <Strong tone="summary">2 years</Strong> from the date the
              record was generated.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Invoices, prescriptions & purchase orders
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Retained for <Strong tone="summary">2 years</Strong>.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Returned / Expired Patient Medicines
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Separation of waste
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Expired stock or patient returns must be recorded on a dedicated page or in a separate
              register marked <Strong>&quot;S8 medicines for destruction&quot;</Strong> to prevent
              balance confusion with active dispensary stock.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Witnessed destruction
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Rendered <Strong tone="alert">unusable and unidentifiable</Strong>, witnessed and
              signed by an authorised, non-related health practitioner prior to disposal (
              <Strong>MPMR s147</Strong>).
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
