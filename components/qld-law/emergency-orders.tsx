type Mechanism = {
  name: string;
  triggers: string[];
  powersLead?: string;
  powers: string | string[];
  note?: string;
  duration: string[] | null;
};

const mechanisms: Mechanism[] = [
  {
    name: "Emergency Order",
    triggers: [
      "Biosecurity event (Biosecurity Act 2014)",
      "Disaster situation (Disaster Management Act 2003)",
      "Declared public health emergency (Public Health Act 2005)",
      "Emergency under Public Safety Preservation Act 1986",
      "State/local event posing health risk (e.g. communicable disease outbreak)",
    ],
    powers:
      "Authorises a person or class of persons to carry out a regulated activity with a regulated substance to manage risk of significant harm/illness",
    duration: ["Max 3 months", "Published on Department website"],
  },
  {
    name: "Emerging Risk Declaration",
    triggers: [
      "Applies to unscheduled substances or devices used to apply/administer substances",
      "Urgent need to regulate/prevent entering marketplace due to health/injury risks (e.g. harmful sports supplements)",
      "Excludes medical devices under Commonwealth TGA 1989",
    ],
    powersLead: "Declares that the substance:",
    powers: [
      "Must not be made, sold, or used in QLD",
      "May only be used in a particular device or way",
      "A device must not be used with it",
      "Must be disposed of in a specific way",
    ],
    duration: ["Max 3 months (can be renewed)", "Published on Department website"],
  },
  {
    name: "Recall Order",
    triggers: [
      "Product containing a regulated substance (or subject to emerging risk declaration) poses a health risk due to labelling, packaging, efficacy, or safety issues (e.g. irritant hair dye with scheduled poison)",
      "Not issued if already exercised under Commonwealth TGA powers",
    ],
    powersLead:
      'Directed to a "responsible person" (manufacturer, possessor, supplier) requiring them to:',
    powers: [
      "Stop manufacture or supply",
      "Recall from end-users",
      "Destroy substances",
      "Re-label or re-package",
      "Publish public warnings",
    ],
    note: "Process requires giving prior notice to the responsible person before making the order.",
    duration: null,
  },
  {
    name: "Public Warning",
    triggers: [
      "Made in the public interest by the Minister, Chief Executive, or Chief Health Officer.",
    ],
    powersLead: "Public statement giving warnings/info about:",
    powers: [
      "Contraventions of the Act resulting in notification action",
      "Unlawful practices under relevant laws",
      "Offences committed and persons who committed them",
    ],
    duration: ["Public statement."],
  },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function EmergencyOrders() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">Overview</h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Under the Medicines and Poisons Act 2019 (MPA), the Chief Executive (or delegate) or
          Minister can issue specific orders, declarations, and warnings to manage public health
          risks, emergency events, and unsafe products.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Comparative Breakdown of the 4 Key Mechanisms
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-48 px-4 py-3 font-medium">Mechanism</th>
                <th className="px-4 py-3 font-medium">Trigger / Qualifying Events</th>
                <th className="px-4 py-3 font-medium">Key Powers & Directives</th>
                <th className="w-56 px-4 py-3 font-medium">Duration & Publication</th>
              </tr>
            </thead>
            <tbody>
              {mechanisms.map((mechanism, index) => (
                <tr
                  key={mechanism.name}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {mechanism.name}
                  </th>
                  <td className="px-4 py-3 text-ink">
                    <BulletList items={mechanism.triggers} />
                  </td>
                  <td className="px-4 py-3 text-ink">
                    {mechanism.powersLead ? (
                      <p className="font-medium">{mechanism.powersLead}</p>
                    ) : null}
                    {Array.isArray(mechanism.powers) ? (
                      <div className={mechanism.powersLead ? "mt-2" : undefined}>
                        <BulletList items={mechanism.powers} />
                      </div>
                    ) : (
                      <p>{mechanism.powers}</p>
                    )}
                    {mechanism.note ? <p className="mt-2">{mechanism.note}</p> : null}
                  </td>
                  <td className="px-4 py-3 text-ink">
                    {mechanism.duration ? <BulletList items={mechanism.duration} /> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Compliance Mandate & Penalties
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Compliance Mandate
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Manufacturers, wholesalers, and retailers must strictly comply with Emerging Risk
              Declarations and Recall Orders.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Significant Penalties
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Failure to comply with an Emerging Risk Declaration or Recall Order carries heavy
              statutory penalties.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
