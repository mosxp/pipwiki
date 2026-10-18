const offences = [
  {
    name: "Self-Prescribing",
    rule: "Offence for a person to self-prescribe a high-risk medicine (s40(1)).",
    exceptions: ["Reasonable excuse."],
  },
  {
    name: "Self-Administering",
    rule: "Offence for an authorised person dealing with a high-risk medicine to self-administer (s40(2)).",
    exceptions: [
      "Prescribed by another authorised prescriber for the person's treatment; or",
      "Given as a treatment dose by another authorised person; or",
      "Reasonable excuse.",
    ],
  },
];

const schedule4Medicines = [
  "Benzodiazepines",
  "Codeine",
  "Tramadol",
  "Gabapentin",
  "Pregabalin",
  "Quetiapine",
  "Zolpidem",
  "Zopiclone",
];

export function SelfPrescribeOffence() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          The Statutory Offence (MPA 2019 Section 40)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Under the Medicines and Poisons Act 2019 (MPA), strict prohibitions apply to
          self-prescribing and self-administering designated high-risk medicines:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-48 px-4 py-3 font-medium">Offence</th>
                <th className="px-4 py-3 font-medium">Legislative Rule (Section 40)</th>
                <th className="w-80 px-4 py-3 font-medium">Exceptions</th>
              </tr>
            </thead>
            <tbody>
              {offences.map((offence, index) => (
                <tr
                  key={offence.name}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {offence.name}
                  </th>
                  <td className="px-4 py-3 text-ink">{offence.rule}</td>
                  <td className="px-4 py-3 text-ink">
                    {offence.exceptions.length === 1 ? (
                      offence.exceptions[0]
                    ) : (
                      <ul className="list-disc space-y-1 pl-4">
                        {offence.exceptions.map((exception) => (
                          <li key={exception}>{exception}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          What is a &ldquo;High-Risk Medicine&rdquo;? (MPMR Schedule 2, Part 2)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          High-risk medicines are defined in the regulations and are also monitored medicines
          captured in QScript:
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              All Schedule 8 (S8) medicines
            </h3>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Specific Schedule 4 (S4) medicines
            </h3>
            <ul className="mt-3 grid gap-1 sm:grid-cols-2">
              {schedule4Medicines.map((medicine) => (
                <li key={medicine} className="text-sm leading-6 text-ink">
                  {medicine}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
