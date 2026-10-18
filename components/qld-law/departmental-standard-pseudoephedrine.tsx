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

const systemStandards: { standard: string; detail: React.ReactNode }[] = [
  {
    standard: "Purchaser identification",
    detail: (
      <>
        The system must be capable of <Strong tone="alert">uniquely identifying the purchaser</Strong>{" "}
        by methods other than relying solely on the unique reference number of photo identification.
      </>
    ),
  },
  {
    standard: "Transaction history display",
    detail: (
      <>
        Must record and display a minimum of <Strong tone="summary">two (2) years</Strong> of the
        purchaser&apos;s transaction history across all stores.
      </>
    ),
  },
  {
    standard: "Central integration",
    detail: (
      <>
        Must integrate with a common data repository to display and report aggregate
        pseudoephedrine sales data across all Queensland pharmacies{" "}
        <Strong tone="moss">in real time</Strong>.
      </>
    ),
  },
  {
    standard: "Access control & administrator roles",
    detail: (
      <>
        Must be protected by unique <Strong>username and password</Strong> credentials. Must feature
        an administrator function allowing a nominated user to create, edit, assign, and disable
        user credentials.
      </>
    ),
  },
  {
    standard: "Record retention & archiving",
    detail: (
      <>
        All transaction records must be stored <Strong tone="alert">unaltered</Strong> in the
        electronic system for a minimum of <Strong tone="summary">two (2) years</Strong>. Archived
        records must remain accessible for audit purposes for at least{" "}
        <Strong tone="summary">two (2) years</Strong>.
      </>
    ),
  },
  {
    standard: "Back-up and resilience",
    detail: (
      <>
        Must integrate with a central backup and disaster recovery system capable of restoring all
        data in full up to the moment of failure.
      </>
    ),
  },
  {
    standard: "Pharmacist identification",
    detail: (
      <>
        Every record of supply must explicitly include the{" "}
        <Strong tone="alert">supplying pharmacist&apos;s name</Strong>.
      </>
    ),
  },
];

const reportFields = [
  "Complete list of all transactions within the selected date range.",
  "Name of the supplying pharmacist.",
  "Full name and residential address of the purchaser.",
  "Drug name, strength, and quantity supplied.",
  "Unique reference number of the purchaser’s photo identification (if recorded).",
];

export function DepartmentalStandardPseudoephedrine() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Departmental Standard – Pseudoephedrine Recording (<Strong tone="summary">Version 1</Strong>)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Application
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              <Strong>MPMR s162</Strong> applies to all pharmacists in Queensland recording sales of{" "}
              <Strong tone="alert">Schedule 3 (S3)</Strong> pseudoephedrine products, including
              sales on prescription and over-the-counter sales (e.g.{" "}
              <Strong tone="moss">Project STOP</Strong> / online real-time systems).
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              General S3 requirements
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              This recording mandate applies <Strong>in addition to</Strong> establishing therapeutic
              need, attaching a dispensing/supply label, and providing verbal counselling/instructions.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Section 1: System Integrity, Security, and Capability
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Any electronic record-keeping system used by a pharmacy to log pseudoephedrine sales must
          meet the following technical standards:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Standard</th>
                <th className="px-4 py-3 font-medium">Requirement</th>
              </tr>
            </thead>
            <tbody>
              {systemStandards.map((row, index) => (
                <tr
                  key={row.standard}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.standard}
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
          Section 2: System Report Outputs and Law Enforcement Access
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Real-time data output
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Must produce transaction reports <Strong tone="moss">on demand in real time</Strong>{" "}
              and in industry-standard formats (e.g. <Strong tone="summary">CSV</Strong>) upon
              request by an <Strong>MPA authorised officer</Strong> or{" "}
              <Strong>Queensland Police officer</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Multi-format reporting
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Must be capable of displaying records on-screen, generating paper printouts, and
              producing exportable files suitable for email transmission.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4 lg:col-span-2">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Mandatory fields in periodic system reports
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
              {reportFields.map((field) => (
                <li key={field}>
                  {field.includes("supplying pharmacist") || field.includes("photo identification") ? (
                    <Strong>{field}</Strong>
                  ) : (
                    field
                  )}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
