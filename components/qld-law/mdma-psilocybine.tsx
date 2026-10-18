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

const indications = [
  {
    medicine: "MDMA",
    chemical: "N,alpha-dimethyl-3,4-(methylenedioxy)phenylethylamine",
    indication: "Treatment of Post-Traumatic Stress Disorder (PTSD)",
  },
  {
    medicine: "Psilocybine",
    chemical: null,
    indication: "Treatment of Treatment-Resistant Depression (TRD)",
  },
];

export function MdmaPsilocybine() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Rescheduling Context & Approved Indications
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Effective <Strong>1 July 2023</Strong>, the Therapeutic Goods Administration (TGA)
          down-scheduled specific preparations of <Strong tone="alert">MDMA</Strong> and{" "}
          <Strong tone="alert">psilocybine</Strong> from{" "}
          <Strong tone="alert">Schedule 9 (prohibited substances)</Strong> to{" "}
          <Strong tone="summary">Schedule 8 (controlled drugs)</Strong> for strictly limited
          therapeutic indications:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Medicine</th>
                <th className="w-80 px-4 py-3 font-medium">Permitted human therapeutic indication</th>
                <th className="px-4 py-3 font-medium">Poisons Standard restrictions</th>
              </tr>
            </thead>
            <tbody>
              {indications.map((row, index) => (
                <tr
                  key={row.medicine}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    <Strong tone="alert">{row.medicine}</Strong>
                    {row.chemical ? (
                      <span className="mt-1 block font-normal text-ink-soft">{row.chemical}</span>
                    ) : null}
                  </th>
                  <td className="px-4 py-3">
                    <Strong tone="moss">{row.indication}</Strong>
                  </td>
                  <td className="px-4 py-3">
                    Limited under <Strong>Appendix D</Strong> to registered psychiatrists holding
                    Commonwealth TGA <Strong tone="summary">Authorised Prescriber</Strong> status or{" "}
                    <Strong>NHMRC-approved clinical trials</Strong>.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-ink">
          Any other use, unapproved indication, or possession outside these strict authorisations
          remains a <Strong tone="alert">Schedule 9 prohibited substance</Strong> under the{" "}
          <Strong>Drugs Misuse Act 1986</Strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescribing Scopes in Queensland (MPMR Schedule 6)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Prescriber eligibility
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Restricted exclusively to <Strong tone="moss">registered psychiatrists</Strong> under{" "}
              <Strong>Schedule 6 of the MPMR</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              State approval vs Commonwealth authorisation
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              <Strong tone="moss">No separate Queensland Health approval</Strong> is required for
              eligible psychiatrists. Psychiatrists must hold formal{" "}
              <Strong tone="summary">Authorised Prescriber (AP)</Strong> approval from the
              Commonwealth TGA (following Human Research Ethics Committee [
              <Strong>HREC</Strong>] approval) or be an approved investigator on an{" "}
              <Strong>NHMRC clinical trial</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Authorised actions
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Eligible psychiatrists may <Strong>prescribe</Strong>, <Strong>administer</Strong>,{" "}
              <Strong>possess</Strong>, and <Strong>issue purchase orders</Strong> for these
              medicines for approved indications.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Supply, Dispensing & Administration Rules
        </h2>
        <h3 className="mt-4 text-sm font-semibold text-ink">
          Direct-to-clinician supply mandate
        </h3>
        <p className="mt-2 max-w-4xl text-base leading-7 text-ink">
          Pharmacists must <Strong tone="alert">never supply or hand over S8 MDMA or psilocybine directly to the patient</Strong>.
          A dispensing pharmacist dispenses the prescription but must deliver/supply the medicine
          directly to the <Strong tone="summary">Authorised Prescriber (psychiatrist)</Strong> for
          subsequent administration to the patient in a clinical/hospital setting.
        </p>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-ink">
          <Strong>Patient possession:</Strong> patients are{" "}
          <Strong tone="alert">not permitted to possess</Strong> these medicines outside a
          clinical/hospital setting.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Chain of supply
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              <li>
                <Strong>Wholesalers</Strong> can only supply to clinical trial sponsors, Authorised
                Prescriber psychiatrists, or pharmacists with a verified supply arrangement with an
                Authorised Prescriber.
              </li>
              <li>
                <Strong>Pharmacists</Strong> may possess stock only if they demonstrate an active
                supply arrangement with a psychiatrist who holds{" "}
                <Strong tone="summary">Authorised Prescriber</Strong> status.
              </li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Quick dispensing summary
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              <li>
                <Strong>Valid prescriber:</Strong> registered psychiatrist with active TGA{" "}
                <Strong tone="summary">Authorised Prescriber (AP)</Strong> status.
              </li>
              <li>
                <Strong>Indication match:</Strong> <Strong tone="moss">PTSD (MDMA)</Strong> or{" "}
                <Strong tone="moss">treatment-resistant depression (psilocybine)</Strong>.
              </li>
              <li>
                <Strong>Dispensing protocol:</Strong> follow standard <Strong tone="alert">S8</Strong>{" "}
                recording and <Strong tone="moss">QScript</Strong> requirements; deliver stock
                directly to the psychiatrist&apos;s clinic/hospital —{" "}
                <Strong tone="alert">never dispense into patient custody</Strong>.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Product Sourcing & Compounding Prohibitions
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Imported pharmaceutical grade products
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Most legitimate products are pharmaceutical-grade items imported under individual{" "}
              <Strong>Office of Drug Control (ODC)</Strong> licences and permits.
            </p>
          </article>
          <article className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Strict compounding restriction
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Standard extemporaneous compounding exemptions under the{" "}
              <Strong>Therapeutic Goods Act 1989 (Cwlth)</Strong> do not protect against breaches of
              the Commonwealth <Strong>Criminal Code</Strong> for MDMA/psilocybine. Pharmacists must{" "}
              <Strong tone="alert">not extemporaneously compound</Strong> MDMA or psilocybine unless
              they hold a specialized TGA <Strong tone="summary">Good Manufacturing Practice (GMP)</Strong>{" "}
              licence expressly authorizing the manufacture of these substances.
            </p>
          </article>
          <article className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Illicit / botanical forms
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Street formulations, raw psychedelic mushrooms, and crude fungal extracts remain{" "}
              <Strong tone="alert">strictly illicit and unlawful for medical supply</Strong>.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
