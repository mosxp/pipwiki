const schedule9 = [
  {
    division: "Part 1, Div 1",
    className: "Pharmacists (Generally)",
    scope:
      "Baseline community/hospital dispensing, compounding, OTC sales, stock supply, vaccine administration.",
  },
  {
    division: "Part 1, Div 1A",
    className:
      "Pharmacists employed at particular places (Community, Private hospital, Health Service)",
    scope:
      "Administering S2/S3s, medicines on standing orders, and dispensed S4/S8s as per label/prescription.",
  },
  {
    division: "Part 1, Div 2",
    className: "Dispensary Pharmacists at Relevant Institutions (Aged care, hospitals, prisons)",
    scope: "Ordering and possessing S2, S3, S4, and S8 stock for patient therapeutic treatment.",
  },
  {
    division: "Part 1, Div 2A",
    className: "Participating Pharmacists (Chronic Conditions Pilot)",
    scope: "Prescribing approved S4s under the Community Pharmacy Pilot EPA.",
  },
  {
    division: "Part 1, Div 2B",
    className: "Collaborative Pharmacist Medication Prescribers",
    scope: "Prescribing under collaborative protocols in public/private health facilities.",
  },
  {
    division: "Part 1, Div 3",
    className: "Intern Pharmacists",
    scope: "Dispensing and compounding under pharmacist supervision.",
  },
  {
    division: "Part 1, Div 4",
    className: "Trainee Pharmacists (Students)",
    scope: "Limited training dealings (cannot dispense, cannot access QScript).",
  },
  {
    division: "Part 2",
    className:
      "Pharmacy Assistants & Techs (Hospital tech, Dispensary assistant, General assistant)",
    scope:
      "Imprest, compounding assistance, dispensing support under direct supervision (cannot dispense, no QScript access).",
  },
];

const dispensingRules = [
  {
    action: "Oral Prescriptions (s92)",
    lead: "Prescriber must send the hardcopy written prescription to the pharmacist within:",
    items: [
      "S4 Medicines: Within 7 days",
      "S8 Medicines: As soon as practicable / no later than end of next business day",
    ],
    note: "Deemed given when posted; registered post recommended.",
  },
  {
    action: "Digital Copies / Faxes / Images (s84)",
    lead: "Prescriber may send a photo/fax/digital image but must send the original paper script within:",
    items: [
      "S8 Medicines: By the end of the next business day",
      "Other Medicines: Within 7 days.",
    ],
  },
  {
    action: "Pharmacist Prescription Amendments (s117A & s117B)",
    items: [
      "s117A: Pharmacist may amend a written script to clarify the prescriber's direction.",
      "s117B (Equivalent Substitution): Pharmacist may amend a script to dispense an equivalent medicine if reasonably necessary for therapeutic treatment (must share indication, equivalent effect/dose/duration, and same/similar chemical or pharmacological mechanism).",
    ],
  },
  {
    action: "Interstate Prescriptions",
    note: "Valid to dispense in Queensland if the prescription complies with MPMR requirements.",
  },
];

const pharmacyToPharmacy = [
  "To urgently fill an unexpected stock shortage.",
  "To prevent stock from expiring (near-expiry stock arrangements).",
  "To satisfy a specific customer order for the other pharmacy.",
];

const s8Obligations = [
  {
    rule: "Safe standards (s197)",
    detail: "Must comply with 'Secure storage of S8 medicines' standard.",
  },
  {
    rule: "Register entries (s211 & s212)",
    detail:
      "Must be entered as soon as practicable, within ≤24 hours. If an assistant/intern enters it, the supervising pharmacist must co-sign.",
  },
  {
    rule: "Physical reconciliation / stocktake (s217)",
    detail:
      "Physical count against register must occur at least monthly (or more often if required by pharmacy SMP).",
  },
  {
    rule: "Reporting loss / theft (s226)",
    detail:
      "Must immediately notify the Chief Executive of QLD Health using the approved online reporting form.",
  },
  {
    rule: "Record retention (s224)",
    detail: "General registers, scripts, and supply records must be retained for 2 years.",
  },
];

const otherAuthorities = [
  {
    title: "Vaccinations (March 2026 update)",
    detail:
      "As-of-right authority to administer any S4 immunisation medicine upon completing recognized training (no EPA/prescription needed).",
  },
  {
    title: "Emergency Anaphylaxis",
    detail: "Authorised to administer adrenaline without a script.",
  },
  {
    title: "Compounding (s47)",
    detail:
      "Authorised to extemporaneously compound S2/S3s for patient treatment, or S4/S8s to fulfil prescriptions, strictly following the Departmental Standard: Compounding.",
  },
  {
    title: "Continued Dispensing",
    detail: "Authorised to supply eligible medicines under Commonwealth Continued Dispensing rules.",
  },
  {
    title: "S4 S-O-P (Sale on Request / Over the Counter)",
    detail:
      "Authorised to sell certain S4s without a script in specified emergency circumstances under MPMR Chapter 5 Part 2 Div 3 Subdiv 3.",
  },
  {
    title: "S8 Waste Destruction (s147)",
    detail:
      "Pharmacists can destroy S8 diversion-risk medicine waste by rendering it completely unusable and unidentifiable.",
  },
];

function zebra(index: number) {
  return ["border-t border-line align-top", index % 2 === 1 ? "bg-paper-raised" : "bg-paper"].join(
    " ",
  );
}

export function PharmacistRequirements() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Structure of Pharmacist Authorisations (MPMR Schedule 9)
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-40 px-4 py-3 font-medium">Schedule 9 Division</th>
                <th className="w-72 px-4 py-3 font-medium">Authorised Practitioner Class</th>
                <th className="px-4 py-3 font-medium">Authorised Scope / Dealings</th>
              </tr>
            </thead>
            <tbody>
              {schedule9.map((row, index) => (
                <tr key={row.division} className={zebra(index)}>
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.division}
                  </th>
                  <td className="px-4 py-3 text-ink">{row.className}</td>
                  <td className="px-4 py-3 text-ink">{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescriptions, Dispensing & Amendments (MPMR Chapter 4, Part 8)
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Action / Type</th>
                <th className="px-4 py-3 font-medium">Legal Requirements & Timeframes</th>
              </tr>
            </thead>
            <tbody>
              {dispensingRules.map((rule, index) => (
                <tr key={rule.action} className={zebra(index)}>
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {rule.action}
                  </th>
                  <td className="px-4 py-3 text-ink">
                    {rule.lead ? <p>{rule.lead}</p> : null}
                    {rule.items ? (
                      <ul className={rule.lead ? "mt-2 list-disc space-y-1 pl-4" : "list-disc space-y-1 pl-4"}>
                        {rule.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {rule.note ? <p className={rule.lead || rule.items ? "mt-2" : undefined}>{rule.note}</p> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Supplying Stock (Wholesaling & Non-Prescription Sales)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          A community pharmacist is authorised to supply stock (without a wholesale licence) in
          strictly defined scenarios:
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Prescriber Bag (Doctor&apos;s Bag)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Supplied upon receiving a compliant purchase order (processed as stock supply, never
              dispensed as a patient script).
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Pharmacy-to-Pharmacy Supply
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
              {pharmacyToPharmacy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Supply to Approved Persons
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Permitted to supply stock to approved persons who have purchase order/administration
              authority under Schedules 3–15 (e.g., dentists, podiatrists, nurse managers).
            </p>
          </article>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <p className="rounded-lg border border-line bg-paper px-5 py-4 text-sm leading-6 text-ink">
            Standards: All stock supplies must follow Chapter 4 Part 4 and the Australian code of
            good wholesaling practice.
          </p>
          <p className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-4 text-sm leading-6 text-ink">
            Restriction: Pharmacists cannot supply stock to General Approval holders (Schedule 16)
            without holding a formal Wholesale Licence.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          S8 Medicines Management & Secure Storage
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-80 px-4 py-3 font-medium">Schedule 8 drug obligation</th>
                <th className="px-4 py-3 font-medium">Requirement</th>
              </tr>
            </thead>
            <tbody>
              {s8Obligations.map((row, index) => (
                <tr key={row.rule} className={zebra(index)}>
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.rule}
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
          Other Key Clinical & Dispensing Authorities
        </h2>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          {otherAuthorities.map((item) => (
            <div key={item.title} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {item.title}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
