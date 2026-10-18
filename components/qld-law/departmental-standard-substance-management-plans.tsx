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

const risks: React.ReactNode[] = [
  <>
    <Strong tone="alert">Theft, diversion, or unexplained loss.</Strong>
  </>,
  <>
    Fraud and <Strong tone="alert">physical/chemical tampering</Strong>.
  </>,
  <>
    Expiry, <Strong tone="summary">cold chain breaches (2–8°C)</Strong>, and substance degradation.
  </>,
  <>
    Inappropriate clinical use or <Strong tone="alert">dosing errors</Strong>.
  </>,
  <>Public, worker, or environmental harm.</>,
  <>Insufficient staff training, competency, or supervision.</>,
  <>Legislative and code non-compliance.</>,
];

const dealings: { dealing: string; controls: React.ReactNode[] }[] = [
  {
    dealing: "Buy (stock purchasing)",
    controls: [
      <>
        Purchasing restricted strictly to <Strong tone="moss">authorised personnel</Strong> with
        defined delegations.
      </>,
      <>
        Formal verification upon delivery; <Strong tone="alert">immediate quarantine</Strong> of
        damaged, unsealed, or expired stock.
      </>,
    ],
  },
  {
    dealing: "Possess (storage & registers)",
    controls: [
      <>Physical access restricted by credentialling/role to prevent diversion.</>,
      <>
        <Strong tone="alert">S8</Strong> storage must comply with the{" "}
        <Strong>Secure Storage of S8 Medicines Standard</Strong>.
      </>,
      <>
        Regular stock reconciliations (<Strong tone="summary">at least monthly for S8s</Strong>) and
        robust audit trails.
      </>,
    ],
  },
  {
    dealing: "Manufacture / compound",
    controls: [
      <>
        Quality assurance across all stages; only <Strong>trained, credentialled staff</Strong>{" "}
        permitted.
      </>,
      <>Batch traceability of raw materials and cleanroom/isolator maintenance.</>,
    ],
  },
  {
    dealing: "Supply (stock / wholesale)",
    controls: [
      <>
        Validation of the buyer&apos;s <Strong>statutory authority</Strong> before dispatch.
      </>,
      <>
        <Strong>Cold chain</Strong> and secure transit tracking; monitoring and vetting third-party
        logistics/carriers.
      </>,
    ],
  },
  {
    dealing: "Supply (dispensing to patients)",
    controls: [
      <>
        Dispensing restricted to authorised practitioners (<Strong tone="moss">pharmacists</Strong>).
      </>,
      <>
        Compliance with the <Strong>Pseudoephedrine Recording Standard</Strong>,{" "}
        <Strong>Monitored Medicines Standard</Strong>, and <Strong>EPMS Standard</Strong>.
      </>,
    ],
  },
  {
    dealing: "Prescribe / standing orders",
    controls: [
      <>
        Prevention of <Strong tone="alert">unauthorised access</Strong> to prescription pads,
        computers, and tokens.
      </>,
      <>Regular clinical reviews of standing orders and prolonged medication charts.</>,
    ],
  },
  {
    dealing: "Administer",
    controls: [
      <>
        Administration restricted strictly to <Strong>credentialled practitioners</Strong> under
        current <Strong>Health Management Protocols (HMPs)</Strong> or authorisations.
      </>,
      <>
        <Strong tone="alert">Tamper-proof</Strong> administration record-keeping.
      </>,
    ],
  },
  {
    dealing: "Dispose & destroy waste",
    controls: [
      <>
        <Strong tone="alert">S8</Strong> waste destroyed only by authorised persons with{" "}
        <Strong tone="alert">mandatory independent witnessing</Strong>.
      </>,
      <>
        Waste rendered <Strong tone="alert">unusable and unidentifiable</Strong> prior to{" "}
        <Strong>high-temperature incineration</Strong>.
      </>,
    ],
  },
];

export function DepartmentalStandardSubstanceManagementPlans() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Departmental Standard – Substance Management Plans for Medicines (
          <Strong tone="summary">Version 1</Strong>)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Mandatory compliance
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              <Strong>MPA s94</Strong> and <Strong>MPMR s173</Strong>: the responsible person for a
              regulated place (prescribed in <Strong>MPMR Schedule 17</Strong>, e.g. hospitals,
              community pharmacies, RACFs) must <Strong tone="alert">prepare and implement</Strong>{" "}
              an SMP meeting this Standard. Staff must comply with the plan to carry out dealings in
              the <Strong tone="alert">&quot;authorised way&quot;</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Performance-based scope
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Covers <Strong>all dealings</Strong> carried out at the site — manufacture/compound,
              buy, possess, supply (stock or dispensing), administer, prescribe/standing orders, and
              dispose — for all scheduled medicines used therapeutically at that place.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Core Operational Requirements (Section 1)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Every Substance Management Plan must be an{" "}
          <Strong>easily understood, controlled document</Strong> that clearly defines:
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Applicability
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              The commencement date, physical location(s), specific medicines, dealings undertaken,
              and staff covered by the plan.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Identified known & foreseeable risks
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Must identify and document controls for:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
              {risks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Review Incidents & Review Frequencies (<Strong>MPMR s174</Strong>)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          An SMP must be formally reviewed <Strong tone="summary">at least once every 5 years</Strong>{" "}
          (routine cycle), <Strong>and</Strong>{" "}
          <Strong tone="alert">as soon as practicable</Strong> after a statutory{" "}
          <Strong>&quot;Review Incident&quot;</Strong> occurs:
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Substantial operational change
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
              <li>Changes to corporate entity, ownership, or executive leadership.</li>
              <li>
                Built environment alterations (new dispensary layout, new <Strong>S8 safe</Strong>).
              </li>
              <li>
                Information technology upgrades (new dispensing/prescribing software or security
                systems).
              </li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Adverse audit finding
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Internal or external audit highlighting new risks or non-compliance (e.g. sterile
              compounding gaps).
            </p>
          </article>
          <article className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Systemic risk-management breakdown
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
              <li>
                Critical incidents (e.g. patient infection linked to cleanroom contamination).
              </li>
              <li>Recurrent undesirable incidents (e.g. repeated cold chain breaches).</li>
              <li>
                Patterns of staff non-compliance, substantial losses, or unexplained drug diversion.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Specific Dealing Outcomes Checklist (Sections 2–9)
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Dealing</th>
                <th className="px-4 py-3 font-medium">Minimum risk controls required in the SMP</th>
              </tr>
            </thead>
            <tbody>
              {dealings.map((row, index) => (
                <tr
                  key={row.dealing}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.dealing}
                  </th>
                  <td className="px-4 py-3">
                    <ul className="list-disc space-y-1 pl-4">
                      {row.controls.map((control, controlIndex) => (
                        <li key={controlIndex}>{control}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
