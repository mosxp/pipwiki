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

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-8">
      <h2 className="font-serif text-2xl tracking-tight text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-ink">{children}</div>
    </section>
  );
}

function Subhead({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-8 text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
      {children}
    </h3>
  );
}

function Callout({
  tone,
  children,
}: {
  tone: "alert" | "summary";
  children: React.ReactNode;
}) {
  const styles =
    tone === "alert"
      ? "border-[var(--alert)]/35 bg-[var(--alert-bg)]"
      : "border-[var(--summary)]/35 bg-[var(--summary-bg)]";

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm leading-6 ${styles}`}>{children}</div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function DataTable({
  headers,
  rows,
  minWidth = "48rem",
}: {
  headers: string[];
  rows: React.ReactNode[][];
  minWidth?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-sm leading-6" style={{ minWidth }}>
        <thead>
          <tr className="bg-moss text-paper-raised">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={[
                "border-t border-line align-top",
                index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
              ].join(" ")}
            >
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th key={cellIndex} scope="row" className="px-4 py-3 font-medium text-ink">
                    {cell}
                  </th>
                ) : (
                  <td key={cellIndex} className="px-4 py-3">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const partTwo: { division: string; coverage: string }[] = [
  { division: "Division 1 — Classification (Sec 12–12L)", coverage: "Classification of poisons and controlled substances." },
  { division: "Division 2 — Authorized persons (Sec 13–14A)", coverage: "Authorized persons." },
  { division: "Division 3 — Poisons Advisory Committee (Sec 15–18)", coverage: "The Poisons Advisory Committee." },
  {
    division: "Division 4 — Licences, permits and warrants",
    coverage:
      "Subdivision 1 preliminary (Sec 18A). Subdivision 2 principal provisions (Sec 19–22C), including Section 21 on the duration of a licence, permit or warrant. Subdivision 3 approval of areas under mobile drug checking permits (Sec 22Ca–22Cb). Subdivision 4 miscellaneous provisions for drug checking permits (Sec 22Cc–22Cj).",
  },
  { division: "Division 5 — Public health emergencies (Sec 22D–22H)", coverage: "Public health emergencies." },
  {
    division: "Division 6 — Animal health and welfare emergencies (Sec 22I–22O)",
    coverage: "Animal health and welfare emergencies.",
  },
  {
    division: "Division 8 — Manufacture and sale (Sec 23–30)",
    coverage: "Manufacture and sale of poisons or controlled substances.",
  },
  {
    division: "Division 9 — Monitored poisons database (Sec 30A–30J)",
    coverage: "The monitored poisons database.",
  },
  {
    division: "Division 10 — Drugs of dependence and scheduled poisons",
    coverage:
      "Drugs of dependence, Schedule 8 poisons, Schedule 9 poisons and Schedule 4 poisons. Subdivision 1 introductory matters and records (Sec 31–32A). Subdivision 3 Schedule 9 poisons (Sec 33A–33D). Subdivision 4 Schedule 8 poisons (Sec 34–35). Subdivision 5 general (Sec 35A–36B).",
  },
  {
    division: "Division 10A — Aged care medication (Sec 36C–36F)",
    coverage: "Administration of medication in aged care services.",
  },
  { division: "Division 11 — Appeals (Sec 37)", coverage: "Appeals." },
  { division: "Division 12 — Sale of poisons book (Sec 38–40)", coverage: "Sale of poisons book." },
  { division: "Division 13 — Authorized officers (Sec 41–44)", coverage: "Authorized officers." },
  {
    division: "Division 13A — Authorised police employees (Sec 44A–44C)",
    coverage: "Authorised police employees and other authorised persons.",
  },
  { division: "Division 14 — Offences (Sec 45–50)", coverage: "Offences." },
  { division: "Division 15 — Poison baits (Sec 52–53)", coverage: "Poison baits." },
  { division: "Division 16 — Roads and waterways (Sec 54)", coverage: "Poisons in roads and waterways." },
  {
    division: "Division 17 — Prohibition (Sec 55)",
    coverage: "Prohibition of poisons or controlled substances.",
  },
  {
    division: "Division 18 — Compliance with Part II (Sec 55AA–55AAZ)",
    coverage:
      "Improvement notices, prohibition notices, enforceable undertakings, information or document production notices, review by VCAT, and infringement notices.",
  },
];

const laterParts: { part: string; coverage: string }[] = [
  {
    part: "Part IIA — Medically supervised injecting centre",
    coverage:
      "Preliminary (Sec 55A–55B). Medically supervised injecting centre licence (Sec 55C–55J). Miscellaneous (Sec 55K–55Q).",
  },
  { part: "Part III — Manufacture of heroin (Sec 56)", coverage: "Manufacture of heroin." },
  { part: "Part IIIA — Psychoactive substance (Sec 56A–56F)", coverage: "Psychoactive substances." },
  {
    part: "Part IV — Deleterious substances and volatile substances",
    coverage:
      "Division 1 deleterious substances (Sec 57–60). Division 2 search, seizure and detention powers relating to volatile substances (Sec 60A–60T).",
  },
  {
    part: "Part IVA — Authorities for low-THC cannabis (Sec 61–69M)",
    coverage: "Authorities for low-THC cannabis, inspection and enforcement, and regulations under this Part.",
  },
  {
    part: "Part IVB — Alkaloid poppies (Sec 69N–69V)",
    coverage:
      "Licences to cultivate alkaloid poppies and process poppy straw: poppy cultivation licence, poppy processing licence, general provisions, inspection and enforcement, offences, the alkaloid poppy register, review by VCAT, and regulations.",
  },
  {
    part: "Part V — Drugs of dependence and related matters (Sec 70–80)",
    coverage: "Drugs of dependence and related matters.",
  },
  { part: "Part VA — Cocaine kits", coverage: "Cocaine kits, and enforcement." },
  { part: "Part VAB — Ice pipes", coverage: "Ice pipes." },
  {
    part: "Part VB — Precursor chemicals and apparatus",
    coverage:
      "Category 1 precursor chemicals, category 2 precursor chemicals and category 3 precursor apparatus, and transaction records.",
  },
  {
    part: "Part VC — Cannabis water pipes and hookahs",
    coverage: "Display, sale and supply, and enforcement.",
  },
  {
    part: "Part VI — Search, seizure and forfeiture (Sec 80–96)",
    coverage: "Search, seizure and forfeiture.",
  },
  { part: "Part VIA — Declared testing facilities (Sec 97–98)", coverage: "Declared testing facilities." },
  { part: "Part VIAB — Service of documents (Sec 99)", coverage: "Service of documents." },
  { part: "Part VII — Proceedings (Sec 102–104)", coverage: "Proceedings." },
  { part: "Part IX — Evidentiary (Sec 118–123)", coverage: "Evidentiary provisions." },
  { part: "Part XI — Regulations (Sec 129–133A)", coverage: "Regulation-making powers." },
  { part: "Part XII — Transitional provisions (Sec 134–149)", coverage: "Transitional provisions." },
];

const monitoredMedicines: { medicine: string; note: string }[] = [
  { medicine: "All Schedule 8 medicines", note: "Every Schedule 8 medicine is monitored." },
  { medicine: "Benzodiazepines", note: "For example, diazepam." },
  { medicine: "Z-drugs", note: "Zolpidem and zopiclone." },
  { medicine: "Quetiapine", note: "Monitored as a high-risk prescription medicine." },
  { medicine: "Codeine", note: "Codeine-containing products." },
  { medicine: "Pregabalin", note: "Monitored with the other listed high-risk medicines." },
  { medicine: "Gabapentin", note: "Monitored with the other listed high-risk medicines." },
  { medicine: "Tramadol", note: "Monitored with the other listed high-risk medicines." },
];

export function DpcsAct() {
  return (
    <div>
      <p className="max-w-3xl text-base leading-7 text-ink-soft">
        DPCS Act 1981 means the Drugs, Poisons and Controlled Substances Act 1981 (the Act,
        Victoria). SafeScript is Victoria’s real-time prescription monitoring system, enabled by
        amendments to that Act.
      </p>

      <Section id="act-structure" title="Part I & Part II Structure">
        <p>
          Part I is introductory and transitional (<Strong>Sec 2–11</Strong>). Part II is poisons
          and controlled substances. The later parts run through to Part XII and cover supervised
          injecting centres, psychoactive substances, precursor chemicals, and search and seizure
          powers.
        </p>
        <Subhead id="part-ii">Part II — Poisons and controlled substances</Subhead>
        <DataTable
          headers={["Division", "Coverage"]}
          rows={partTwo.map((row) => [row.division, row.coverage])}
          minWidth="56rem"
        />
        <Subhead id="later-parts">Parts IIA to XII</Subhead>
        <DataTable
          headers={["Part", "Coverage"]}
          rows={laterParts.map((row) => [row.part, row.coverage])}
          minWidth="56rem"
        />
      </Section>

      <Section id="duration" title="Duration of Licences, Permits & Warrants (Sec 21)">
        <p>
          Section 21 sits in Part II, Division 4, Subdivision 2. It sets the duration of a licence,
          permit or warrant.
        </p>
        <Callout tone="summary">
          <Strong tone="summary">Licences and permits last 12 months from issue</Strong>, or for a
          shorter period when they are set to expire at the same time.
        </Callout>
        <Callout tone="alert">
          <Strong tone="alert">Warrants last until cancelled or suspended.</Strong>
        </Callout>
      </Section>

      <Section id="safescript" title="SafeScript (Victoria’s Real-Time Prescription Monitoring System)">
        <Subhead id="about-safescript">About SafeScript</Subhead>
        <p>
          SafeScript was enabled by amendments to the Drugs, Poisons and Controlled Substances Act
          1981 (Vic). It is designed to reduce harm, including deaths, from high-risk prescription
          medicines. It allows real-time transmission of certain prescription records to a central
          database. Doctors, nurse practitioners, and pharmacists access it during consultations.
        </p>
        <Callout tone="alert">
          <Strong tone="alert">Mandatory use from April 2020.</Strong> Failure to register and use
          SafeScript may breach legislative obligations. It is mandatory to check SafeScript before
          prescribing or dispensing monitored medicines, except in certain settings such as
          hospitals or aged care.
        </Callout>
        <Subhead id="safescript-uses">Purpose</Subhead>
        <BulletList
          items={[
            "To provide a complete view of high-risk medicines supplied to each patient.",
            "To help clinicians make safer, informed decisions and improve treatment coordination.",
            "To assist Victoria’s Department of Health in monitoring safe medicine supply and practitioner compliance.",
          ]}
        />
        <Subhead id="privacy-protections">Privacy protections</Subhead>
        <p>
          SafeScript has strict legislative protections under the <Strong>DPCS Act 1981</Strong>,
          the <Strong>Health Records Act 2001</Strong>, and the{" "}
          <Strong>Privacy and Data Protection Act 2014</Strong>.
        </p>
        <Subhead id="correcting-records">Correcting records</Subhead>
        <BulletList
          items={[
            "Prescribers: records come from practice software and pharmacy dispensing records, including handwritten scripts.",
            "Pharmacists: records come from pharmacy dispensing software.",
            <>
              To correct an error, <Strong>amend the original record</Strong> in that system. The
              correction updates automatically in SafeScript.
            </>,
          ]}
        />
        <Subhead id="safescript-regulations">2018 Real-Time Prescription Monitoring Regulations</Subhead>
        <p>
          The Drugs, Poisons and Controlled Substances Amendment (Real-time Prescription Monitoring)
          Regulations 2018 prescribe the SafeScript record-keeping matters.
        </p>
        <DataTable
          headers={["Prescribed matter", "Requirement"]}
          minWidth="40rem"
          rows={[
            ["Who must provide records", "Prescribers and pharmacists."],
            [
              "What the records must contain",
              "Patient details, including date of birth. Details of the prescribed or dispensed medicines. Prescriber and pharmacist details.",
            ],
            [
              "Which medicines are monitored",
              "Specific high-risk prescription medicines: Schedule 8 medicines and certain Schedule 4 medicines, for example strong opioids and benzodiazepines.",
            ],
            [
              "Date of birth",
              "Patient date of birth must be recorded when prescribing or dispensing a monitored medicine.",
            ],
          ]}
        />
        <Subhead id="how-safescript-works">How SafeScript works</Subhead>
        <p>
          Prescription data is sent automatically, in real time, from electronic prescribing and
          dispensing systems to SafeScript. Clinicians can open it through integrated software,
          which shows pop-up notifications, or through the SafeScript portal, including when a paper
          prescription is used.
        </p>
      </Section>

      <Section id="monitored-medicines" title="Monitored Medicines under SafeScript">
        <p>These are the medicines the summary lists as monitored in SafeScript.</p>
        <DataTable
          headers={["Medicine", "Coverage"]}
          rows={monitoredMedicines.map((row) => [row.medicine, row.note])}
          minWidth="40rem"
        />
      </Section>

      <Section id="risk-alerts" title="Risk Indicator Alerts">
        <Subhead id="alert-colours">Red, amber and green</Subhead>
        <DataTable
          headers={["Alert", "Meaning"]}
          minWidth="40rem"
          rows={[
            [
              <Strong key="red" tone="alert">
                Red — high risk
              </Strong>,
              "High-risk alerts, for example multiple providers, high-dose opioids, or risky combinations.",
            ],
            [
              <Strong key="amber" tone="summary">
                Amber — medium risk
              </Strong>,
              "Medium risk, for example multiple prescribers or pharmacies, or a moderate opioid dose.",
            ],
            [
              <Strong key="green" tone="moss">
                Green — low risk
              </Strong>,
              "Low risk. No concerning patterns.",
            ],
          ]}
        />
        <Subhead id="access-and-privacy">Access and privacy</Subhead>
        <BulletList
          items={[
            "Patient consent is not needed. Access is authorised under law.",
            "Access is only if the clinician is involved in that patient’s care.",
            "Strict privacy rules apply, and there are penalties for misuse.",
            "Access logs are monitored by the Department of Health.",
          ]}
        />
        <Subhead id="legal-penalties">Legal penalties</Subhead>
        <Callout tone="alert">
          Failure to check SafeScript can result in penalties of up to{" "}
          <Strong tone="alert">100 penalty units</Strong>. All reasonable steps must be taken to
          check, even if technical issues arise.
        </Callout>
      </Section>
    </div>
  );
}
