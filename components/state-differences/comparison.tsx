const states = ["VIC", "QLD", "NSW", "ACT", "TAS", "WA", "SA", "NT"] as const;

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

function Matrix({
  label,
  columns,
  rows,
  minWidth = "72rem",
}: {
  label: string;
  columns: string[];
  rows: { topic: string; cells: React.ReactNode[] }[];
  minWidth?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-sm leading-6" style={{ minWidth }}>
        <thead>
          <tr className="bg-moss text-paper-raised">
            <th className="sticky left-0 z-10 bg-moss px-4 py-3 font-medium">{label}</th>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-medium whitespace-nowrap">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const bg = index % 2 === 1 ? "bg-paper-raised" : "bg-paper";
            return (
              <tr key={row.topic} className={`border-t border-line align-top ${bg}`}>
                <th scope="row" className={`sticky left-0 z-10 px-4 py-3 font-medium text-ink ${bg}`}>
                  {row.topic}
                </th>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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
          {rows.map((row, index) => {
            const bg = index % 2 === 1 ? "bg-paper-raised" : "bg-paper";
            return (
              <tr key={index} className={`border-t border-line align-top ${bg}`}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th
                      key={cellIndex}
                      scope="row"
                      className={`sticky left-0 z-10 px-4 py-3 font-medium text-ink ${bg}`}
                    >
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} className="px-4 py-3">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Required({ children }: { children?: React.ReactNode }) {
  return <Strong tone="moss">{children ?? "Required"}</Strong>;
}

function NotRequired() {
  return <span className="text-ink-soft">Not required</span>;
}

function Unspecified() {
  return <span className="text-ink-soft">Not specified</span>;
}

const nationalRows: React.ReactNode[][] = [
  [
    "The National Health Act 1953",
    "Pharmaceutical, sickness, and hospital benefits, plus medical and dental services",
    "General framework for health benefits and services.",
  ],
  [
    "National Health (Pharmaceutical Benefits) Regs 2017",
    "Provision of pharmaceutical benefits — PBS",
    "Eligibility for benefits. Drug listing and pricing requirements. Prescribing, supply, payment, and subsidy rules.",
  ],
  [
    "Therapeutic Goods Act & Regulations",
    "Human use only: mainly manufacturing and labelling",
    "Covers substances and medicines, devices, and containers or parts. Uses include treating or preventing disease, modifying physiology, disease-susceptibility tests, conception control, and pregnancy tests.",
  ],
  [
    "The Poisons Standard (SUSMP)",
    "Uniform national approach to availability, labelling, and packaging",
    "Maintained by the TGA. Groups poisons into schedules and recommends them to states and territories. Covers sale, supply, possession, storage, disposal, and record-keeping.",
  ],
];

const legislationRows: { topic: string; cells: string[] }[] = [
  {
    topic: "Act",
    cells: [
      "Drugs, Poisons and Controlled Substances (DPCS) Act 1981",
      "Medicines and Poisons Act (MPA) 2019",
      "Poisons and Therapeutic Goods Act 2022",
      "Medicines, Poisons and Therapeutic Goods Act 2008",
      "Poisons Act 1971",
      "Medicines and Poisons Act 2014",
      "Controlled Substances Act 1984",
      "Medicines, Poisons and Therapeutic Act 2012",
    ],
  },
  {
    topic: "Regulations",
    cells: [
      "Drugs, Poisons and Controlled Substances (DPCS) Regulations 2017",
      "Medicines and Poisons Regulations (MPR) 2021",
      "Poisons and Therapeutic Goods Regulation 2026",
      "Medicines, Poisons and Therapeutic Goods Regulations 2008",
      "Poisons Regulations 2018",
      "Medicines and Poisons Regulations 2016",
      "Controlled Substances (Poisons) Regulations 2011",
      "Medicines, Poisons and Therapeutic Goods Regulations 2014",
    ],
  },
];

const s4Fields: { field: string; cells: React.ReactNode[] }[] = [
  { field: "Prescriber name", cells: states.map(() => <Required key="name" />) },
  { field: "Prescriber address", cells: states.map(() => <Required key="address" />) },
  {
    field: "Prescriber phone",
    cells: states.map((state) => (state === "QLD" ? <NotRequired key={state} /> : <Required key={state} />)),
  },
  {
    field: "Prescriber qualification",
    cells: states.map((state) =>
      state === "QLD" || state === "ACT" || state === "NT" ? (
        <Required key={state} />
      ) : (
        <NotRequired key={state} />
      ),
    ),
  },
  {
    field: "Prescriber signature (in ink)",
    cells: states.map(() => <Required key="sign" />),
  },
  { field: "Patient name", cells: states.map(() => <Required key="patient" />) },
  { field: "Patient address", cells: states.map(() => <Required key="patient-address" />) },
  { field: "Date written", cells: states.map(() => <Required key="date" />) },
  { field: "Medicine name", cells: states.map(() => <Required key="med" />) },
  { field: "Medicine strength", cells: states.map(() => <Required key="strength" />) },
  { field: "Medicine directions", cells: states.map(() => <Required key="directions" />) },
  { field: "Medicine quantity", cells: states.map(() => <Required key="qty" />) },
  {
    field: "Number of repeats (if issued)",
    cells: states.map(() => <Required key="repeats" />),
  },
];

export function StateComparison() {
  return (
    <div>
      <p className="max-w-3xl text-base leading-7 text-ink-soft">
        These notes compare the national medicines framework with the state and territory poisons
        laws in the Australia Pharmacy Law summary.
      </p>

      <Section id="national-framework" title="1. National Legislation Framework">
        <DataTable
          headers={["Instrument", "Main focus", "Key details"]}
          rows={nationalRows}
          minWidth="64rem"
        />
      </Section>

      <Section id="state-acts" title="2. State & Territory Legislative Acts & Regulations">
        <Matrix label="Instrument" columns={[...states]} rows={legislationRows} minWidth="88rem" />
      </Section>

      <Section id="s2-s3" title="3. Schedule 2 (S2) & Schedule 3 (S3) Medicines">
        <p>
          Schedule 2 medicines are pharmacy only, or may be held by a licensed person if no pharmacy
          service is available.
        </p>
        <Subhead id="s2-storage">Storage of Schedule 2 medicines</Subhead>
        <Matrix
          label="Rule"
          columns={["VIC", "QLD & WA", "NSW", "ACT & TAS", "NT", "SA (retail area)"]}
          minWidth="72rem"
          rows={[
            {
              topic: "Storage",
              cells: [
                "Stored so the public can reach pharmacist advice if required. Kept apart from food.",
                "Out of reach of the general public. Behind the counter.",
                "Kept apart from human or animal food. A broken or leaking container must not contaminate that food.",
                "Within 4 m of the dispensary, and in a clear line of sight of the dispensary.",
                "Regulation 2014: within 4 m or within sight of the dispensary. Premises Committee Standard: ≤ 6 m and within sight of the dispensary.",
                "At least 1.2 metres above the floor, and in a child-resistant package, a blister pack, a container larger than 5 litres, or a pack weighing more than 5 kilograms.",
              ],
            },
            {
              topic: "Self-selection",
              cells: [
                <Strong key="vic" tone="moss">Yes. Not restricted from public reach.</Strong>,
                <Strong key="qld" tone="alert">No.</Strong>,
                <Strong key="nsw" tone="moss">Yes. Not restricted from public reach.</Strong>,
                <Strong key="act" tone="moss">Yes. Not restricted from public reach.</Strong>,
                "—",
                "—",
              ],
            },
          ]}
        />

        <Subhead id="s3-supply">Supply, storage, and labelling of Schedule 3 medicines</Subhead>
        <Matrix
          label="Rule"
          columns={[...states]}
          minWidth="88rem"
          rows={[
            {
              topic: "Supervision and supply",
              cells: [
                "Personal supervision of supply is sufficient. A pharmacist can sell, supply, or administer if the person is under their care.",
                "All sales must be by the pharmacist. A pharmacist can administer adrenaline when vaccinating, and can sell salbutamol or terbutaline to a child 14 years or older if satisfied of therapeutic need.",
                "Kept in a room or enclosure without public access. The pharmacist no longer needs to personally hand the S3 medicine to the consumer, and must still give adequate verbal or written instructions at supply.",
                "Authorised adrenaline or a salbutamol inhaler may be supplied for someone else in immediate need, or administered to them.",
                "The pharmacist must participate personally and directly. Supply for a school first aid kit needs written authority of the school principal or the TasTAFE CEO.",
                "Direct personal sale by a pharmacist, intern pharmacist, or technician under direct supervision. Salbutamol inhalers and adrenaline injectors may be supplied to schools and child care.",
                "The pharmacist must personally supply and give oral directions, supplemented with written directions where practicable.",
                "Stored where the public has no access, and accessible only by a pharmacist or a person under direct supervision. A health practitioner, including a pharmacist, may administer.",
              ],
            },
            {
              topic: "Labelling and exceptions",
              cells: [
                "Information not specified.",
                "Products are required to be labelled.",
                "The pharmacist does not need to personally hand the item if salbutamol or terbutaline is sold to a person trained in first aid with a current emergency asthma certificate, or if it is a single-use 0.3 mg adrenaline auto-injector for anaphylaxis first aid.",
                "Information not specified.",
                "Labelled to identify the supplying pharmacy and include directions for use. A pharmacist may supply adrenaline for anaphylaxis, salbutamol for acute bronchospasm, or naloxone for opioid toxicity, for administration.",
                "The pharmacist must exercise professional judgement on request verification, quantities, and counselling.",
                "Labelled per Appendix L Part 1 of the SUSMP for prescribed S3 poisons: dihydrocodeine in cough preparations and pseudoephedrine.",
                "No additional label is required on S3 medicines. The MPTGA specifies no age restrictions for purchasing S3 medicines.",
              ],
            },
          ]}
        />
        <p>Who may make the supply:</p>
        <BulletList
          items={[
            "Personal supply by the pharmacist: NSW, TAS, SA, and QLD.",
            "Direct supervision or pharmacy staff allowed: WA (intern or technician under supervision), NT (under direct supervision), and VIC (personal supervision is sufficient).",
          ]}
        />

        <Subhead id="s3-recording">Recording Schedule 3 supplies</Subhead>
        <Matrix
          label="Rule"
          columns={[...states]}
          minWidth="88rem"
          rows={[
            {
              topic: "Identification",
              cells: [
                "—",
                "—",
                "—",
                "—",
                "—",
                "—",
                "Accepted photo-ID or a birth certificate is required before supply.",
                "Photo-ID is required at sale. Record the ID type and the unique ID number.",
              ],
            },
            {
              topic: "What must be recorded",
              cells: [
                "Recording S3 products is not required, and is recommended because of the risk of illegal methamphetamine manufacture. This is not legislated.",
                "All S3 products must be recorded and labelled with the pharmacy name and address, patient name, date, and directions. The record is made at the time of sale, by a pharmacist, as soon as practical, in an electronic format that complies with the departmental standard on pseudoephedrine recording.",
                "Sale of S3 pseudoephedrine no longer has to be recorded.",
                "The seller makes a pseudoephedrine record of the required information.",
                "No details in the legislation.",
                "Pharmacists must record all over-the-counter sales.",
                "Recorded in an electronic form that the Chief Executive and the Commissioner of Police can access via the internet.",
                "All S3 retail sales must be recorded. The legislation specifies the data and does not prescribe paper versus electronic format.",
              ],
            },
            {
              topic: "Project STOP",
              cells: [
                "A monitoring system such as Project STOP is best practice, as outlined in the Victorian Pharmacy Authority Guidelines.",
                "Project STOP is currently the only compliant electronic system. Project STOP is not mandated.",
                "Not named in the law. Project STOP is currently the only approved electronic system.",
                "Under section 173.",
                "—",
                <Strong key="wa" tone="alert">Project STOP is explicitly required by name.</Strong>,
                "Project STOP is given as the example of an electronic form the Chief Executive and the Police Commissioner can access.",
                "Not mentioned.",
              ],
            },
          ]}
        />
      </Section>

      <Section id="s4" title="4. Schedule 4 (S4) Prescriptions & Authorities">
        <Subhead id="s4-particulars">Mandatory particulars on a general S4 prescription</Subhead>
        <p>
          The listed particulars are mandatory in every jurisdiction, except prescriber phone and
          prescriber qualification.
        </p>
        <Matrix label="Particular" columns={[...states]} rows={s4Fields} minWidth="72rem" />

        <Subhead id="s4-authority">Prescribing authority, unusual doses, and scopes</Subhead>
        <p>
          Under the SUSMP, S4 medicines are available from a pharmacist on prescription. Lawful
          prescribers are medical practitioners, dentists, and veterinary surgeons in the ordinary
          course of the profession, and pharmacists dispensing a legal prescription. Wholesale
          supply is only by licensed wholesalers.
        </p>
        <DataTable
          headers={["Topic", "Rule"]}
          minWidth="48rem"
          rows={[
            [
              "Higher or unusual doses",
              "QLD and SA: a dose higher than the official dose must be initialled and underlined by the prescriber. In QLD, veterinary surgeons and dentists cannot prescribe higher than official doses. TAS: an unusual dose must be underlined or emphasised, and an electronic prescription requires an initial in the margin.",
            ],
            ["Veterinary surgeons", "QLD: a maximum of 2 repeats may be ordered by a veterinary surgeon."],
            ["Dentists", "NT: dentists are permitted to order repeats."],
            [
              "Optometrists and podiatrists",
              "VIC: authorised optometrists and podiatrists can prescribe the S4 medicines specified in their registration. TAS: optometrists may not prescribe S4D restricted substances. A practitioner must be present and practising in TAS to prescribe an S4D, and repeats require an interval endorsement. NT recognises medical practitioners, nurse practitioners, eligible midwives, dentists, optometrists, podiatrists, and veterinary surgeons within their scope of practice.",
            ],
          ]}
        />

        <Subhead id="emergency-supply">Emergency supply</Subhead>
        <p>Emergency supply and continued dispensing apply to general Schedule 4 medicines.</p>
        <DataTable
          headers={["Feature", "Emergency supply", "Continued dispensing"]}
          minWidth="56rem"
          rows={[
            [
              "Core criteria",
              "Immediate need to continue essential treatment. Previously prescribed to a person, not an animal. Impracticable to obtain a valid prescription.",
              "The usual prescriber cannot be contacted or cannot provide an electronic prescription. Therapy is continuous and stable, and was reviewed after it was first prescribed. Continuity of treatment is necessary.",
            ],
            [
              "Quantity",
              "Up to 3 days’ supply. If it is a pre-packed liquid, cream or ointment, aerosol, or oral contraceptive, the smallest standard pack.",
              "A standard PBS pack.",
            ],
            [
              "Limits",
              "Based on the emergency need.",
              "Supplied as a PBS medicine in the previous 3 months. Not supplied by continued dispensing in the previous 12 months.",
            ],
          ]}
        />
        <p>Before an emergency supply, the pharmacist records, in every state:</p>
        <BulletList
          items={[
            "Name and address of the medical practitioner who last prescribed it.",
            "Date of supply.",
            "Name and address of the person being supplied.",
            "Name, strength, and quantity of the restricted substance.",
            "Directions for safe and proper use given by the pharmacist.",
            "A note that the supply was an emergency supply.",
          ]}
        />
        <Matrix
          label="Variation"
          columns={["QLD", "NSW & TAS", "SA", "NT"]}
          minWidth="64rem"
          rows={[
            {
              topic: "Criteria",
              cells: [
                "The “impracticable” test is replaced with: it is essential to continue the treatment for the person’s wellbeing.",
                "Standard 3-day or smallest-pack emergency supply criteria.",
                "The pharmacist must be satisfied the person is medically treated with the drug, continuation is essential to health, and there is good reason the person cannot produce a prescription.",
                "Unrestricted S4 in urgent circumstances: up to 7 days’ supply or the smallest primary pack. The pharmacist must contact the usual prescriber every time before supplying.",
              ],
            },
            {
              topic: "Label and follow-up",
              cells: [
                "Standard emergency supply requirements.",
                "The dispensing label must include the exact words “EMERGENCY SUPPLY”. The pharmacist has 14 days, previously 7, to receive the script before notifying NSW Health.",
                "Standard emergency supply requirements.",
                "The prescriber must provide a prescription within 7 days (MPTGA s61 and s97).",
              ],
            },
          ]}
        />

        <Subhead id="continued-dispensing">Continued dispensing</Subhead>
        <p>
          Continued dispensing lets a community pharmacist supply one standard pack, the maximum
          quantity or units, of an eligible medicine at the usual PBS price without a current
          prescription. It is regulated under subsection 89A(3) of the National Health Act 1953, and
          the pharmacist criteria below apply from 1 July 2022 under the National Health (Continued
          Dispensing) Determination 2022.
        </p>
        <p>The approved pharmacist must be satisfied that:</p>
        <BulletList
          items={[
            "The most recent PBS prescriber cannot be contacted, or cannot provide an electronic prescription.",
            "The patient was previously supplied the medicine on a PBS prescription, and the last supply was based on a valid prescription.",
            "The person’s therapy is stable.",
            "The patient has been taking the medicine regularly for an uninterrupted period, during which the PBS prescriber assessed the condition and determined an ongoing need.",
            "The medicine was not supplied under continued dispensing in the previous 12 months. The maximum is once in a 12-month period.",
          ]}
        />
        <p>
          Supply is limited to the maximum quantity or number of units of the PBS medicine, as a
          single standard pack. The patient, or their agent other than the pharmacist, must sign a
          declaration acknowledging supply without a valid prescription.
        </p>

        <Subhead id="restricted-s4">Anabolic agents, benzodiazepines, and barbiturates</Subhead>
        <Callout tone="alert">
          <Strong tone="alert">No emergency supply.</Strong> Anabolic or androgenic steroidal
          agents, benzodiazepines such as diazepam, and barbiturates such as phenobarbital cannot be
          dispensed as an emergency supply. There must be a prescription, or a verbal, telephone, or
          facsimile order, before supply.
        </Callout>
        <Matrix
          label="Rule"
          columns={["VIC, WA, SA, and NT", "NSW", "TAS"]}
          minWidth="56rem"
          rows={[
            {
              topic: "Prescription validity",
              cells: [
                "12 months.",
                "Valid for 12 months, increased from 6 months.",
                "6 months.",
              ],
            },
            {
              topic: "Repeats and filing",
              cells: [
                "Standard state dispensing and filing rules apply.",
                "The prescription must include repeat intervals. Repeats are no longer kept by the pharmacy and can be given back to the patient to dispense at any pharmacy, except OTP scripts.",
                "Valid for 6 months only.",
              ],
            },
          ]}
        />
      </Section>

      <Section id="s8" title="5. Schedule 8 (S8) Medicines & RTPM">
        <Subhead id="s8-stimulants">S8 stimulants</Subhead>
        <p>
          Dexamfetamine, lisdexamfetamine, and methylphenidate require the written authority of the
          state or territory health department. Dentists, nurse practitioners, endorsed midwives,
          and veterinary surgeons cannot prescribe or supply them. A veterinary surgeon may supply
          or administer methylphenidate tablets obtained from a wholesaler for animal treatment.
        </p>
        <Matrix
          label="Jurisdiction"
          columns={["VIC", "QLD", "NSW", "TAS", "SA"]}
          minWidth="64rem"
          rows={[
            {
              topic: "Local rule",
              cells: [
                "No restriction where prescribing is for dental or animal use and within the practitioner’s scope of practice.",
                "The script must include the words “specified condition”, or words indicating the condition treated.",
                "Prescribers no longer need to write the approval number on the script.",
                "Prescriptions are issued only on the authority of the Secretary.",
                "No restriction where prescribing is for dental or animal use and within the practitioner’s scope of practice. A dentist needs authority from the Minister to prescribe a drug of dependence to a drug-dependent person.",
              ],
            },
          ]}
        />

        <Subhead id="interstate-s8">Interstate S8 scripts and real-time monitoring</Subhead>
        <Matrix
          label="Rule"
          columns={[...states]}
          minWidth="88rem"
          rows={[
            {
              topic: "Interstate S8 scripts",
              cells: [
                "Allowed, except methadone or buprenorphine for opioid dependence programs.",
                "Allowed, except methadone or buprenorphine for opioid dependence programs.",
                "Allowed, except methadone or buprenorphine for opioid dependence programs.",
                "Allowed, except methadone or buprenorphine for opioid dependence programs.",
                "Authorised prescribers must be present and practising in TAS.",
                "Allowed, except methadone or buprenorphine for opioid dependence programs.",
                "Allowed, except methadone or buprenorphine for opioid dependence programs.",
                <Strong key="nt" tone="alert">
                  Not valid. An exemption may apply for remote cross-border communities.
                </Strong>,
              ],
            },
            {
              topic: "RTPM",
              cells: [
                <Strong key="vic" tone="alert">Mandatory to check SafeScript before dispensing monitored medicines.</Strong>,
                <Strong key="qld" tone="alert">Mandatory to check QScript before dispensing monitored medicines.</Strong>,
                "RTPM is available. Use is strongly recommended and is not mandated.",
                "RTPM is available. Use is strongly recommended and is not mandated.",
                "—",
                "RTPM is available. Use is strongly recommended and is not mandated.",
                "RTPM is available. Strongly recommended and not mandated.",
                "—",
              ],
            },
            {
              topic: "Reporting",
              cells: [
                "—",
                "—",
                "—",
                "—",
                "—",
                "—",
                "S8 records must be transmitted electronically to the Chief Executive immediately, or by the 21st of the month if dispensed on the 1st to the 14th, or by the 7th of the following month if dispensed from the 15th onwards.",
                "Report all S8 scripts to the Chief Health Officer within 7 days. Electronic upload to the secure website weekly, plus hard copies posted or couriered to Medicines and Poisons Control.",
              ],
            },
          ]}
        />

        <Subhead id="s8-one-item">One Schedule 8 item on a paper prescription</Subhead>
        <Matrix
          label="Rule"
          columns={[...states]}
          minWidth="80rem"
          rows={[
            {
              topic: "Separate form",
              cells: [
                "Allowed on the same prescription form with other medicines.",
                "Must be on a separate prescription form, unless every item is a different form or salt of the first medicine.",
                "Must be on a separate prescription form. Multiple items are allowed on the same script if they are for the same medicine, for example multiple strengths of morphine.",
                "Allowed on the same prescription form.",
                "Must be on a separate prescription form.",
                "Must be on a separate prescription form.",
                "Allowed on the same prescription form with other medicines.",
                "Must be on a separate prescription form.",
              ],
            },
          ]}
        />
        <BulletList
          items={[
            "Same form allowed with other medicines: VIC, SA, and ACT.",
            "A separate form is required: NSW, TAS, and NT. NSW still allows more than one item when each item is the same medicine.",
            "QLD requires a separate form unless the items are different forms or salts of the same medicine. The summary places WA in that same group. The WA column states that a separate form is required.",
          ]}
        />

        <Subhead id="s8-particulars">S4 monitored and Schedule 8 prescription particulars</Subhead>
        <p>
          Computer-generated and handwritten prescriptions are marked where the summary
          distinguishes them. An electronic prescription does not require a signature or a
          handwritten endorsement.
        </p>
        <Matrix
          label="Particular"
          columns={[...states]}
          minWidth="88rem"
          rows={[
            {
              topic: "Only one S8 medicine",
              cells: [
                <NotRequired key="vic" />,
                "Required. A different form of the same S8 molecule is acceptable.",
                "Required. The same medicine is acceptable, for example multiple strengths of morphine.",
                <Unspecified key="act" />,
                <Required key="tas" />,
                <Required key="wa" />,
                <Unspecified key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Prescriber name and address",
              cells: states.map(() => <Required key="id" />),
            },
            {
              topic: "Prescriber phone",
              cells: [
                <Required key="vic" />,
                <NotRequired key="qld" />,
                <Required key="nsw" />,
                <Required key="act" />,
                <NotRequired key="tas" />,
                <Required key="wa" />,
                <Required key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Prescriber qualification",
              cells: [
                <NotRequired key="vic" />,
                <Required key="qld" />,
                <Required key="nsw" />,
                <Required key="act" />,
                <NotRequired key="tas" />,
                <NotRequired key="wa" />,
                <NotRequired key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Prescriber signature",
              cells: states.map(() => (
                <span key="sig">
                  <Required />. In the prescriber’s own handwriting.
                </span>
              )),
            },
            {
              topic: "Patient name, address, and date written",
              cells: [
                "Required. On a handwritten prescription, in the prescriber’s own handwriting.",
                <Required key="qld" />,
                "Required. On a handwritten prescription, in the prescriber’s own handwriting.",
                <Required key="act" />,
                <Required key="tas" />,
                <Required key="wa" />,
                <Required key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Patient date of birth",
              cells: [
                <Required key="vic" />,
                <Required key="qld" />,
                <NotRequired key="nsw" />,
                <NotRequired key="act" />,
                <Required key="tas" />,
                <Required key="wa" />,
                <Required key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Medicine name",
              cells: [
                "Required, in the prescriber’s own handwriting.",
                <Required key="qld" />,
                "Required, in the prescriber’s own handwriting.",
                <Required key="act" />,
                "Required, in the prescriber’s own handwriting.",
                <Required key="wa" />,
                <Required key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Medicine form",
              cells: [
                "Required, in the prescriber’s own handwriting.",
                <Required key="qld" />,
                <Unspecified key="nsw" />,
                <Required key="act" />,
                <Unspecified key="tas" />,
                <Required key="wa" />,
                <Required key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Medicine strength",
              cells: [
                "Required, in the prescriber’s own handwriting.",
                <Required key="qld" />,
                "Required, in the prescriber’s own handwriting.",
                <Required key="act" />,
                "Required, in the prescriber’s own handwriting.",
                <Required key="wa" />,
                <Required key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Medicine directions",
              cells: [
                "Required, in the prescriber’s own handwriting.",
                <Required key="qld" />,
                "Required, in the prescriber’s own handwriting.",
                <Required key="act" />,
                <Required key="tas" />,
                <Required key="wa" />,
                <Required key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Medicine quantity",
              cells: [
                "Required, in the prescriber’s own handwriting, in words and figures.",
                "Required, in words and figures.",
                "Required, in the prescriber’s own handwriting, in words and figures.",
                <Required key="act" />,
                "Required, in the prescriber’s own handwriting.",
                <Required key="wa" />,
                "Required, in words and figures.",
                "Required, in words and figures.",
              ],
            },
            {
              topic: "Number of repeats",
              cells: [
                "Required, in the prescriber’s own handwriting, in words and figures.",
                <Required key="qld" />,
                "Required, in the prescriber’s own handwriting.",
                <Required key="act" />,
                <Required key="tas" />,
                <Required key="wa" />,
                <Required key="sa" />,
                <Required key="nt" />,
              ],
            },
            {
              topic: "Interval for repeats",
              cells: [
                <NotRequired key="vic" />,
                <Required key="qld" />,
                "Required, in the prescriber’s own handwriting.",
                <Required key="act" />,
                <Required key="tas" />,
                <Required key="wa" />,
                <NotRequired key="sa" />,
                <Required key="nt" />,
              ],
            },
          ]}
        />

        <Subhead id="drug-register">Drug register and Schedule 8 stocktake</Subhead>
        <BulletList
          items={[
            "The register may be electronic or a book.",
            "Enter transactions as soon as practicable, usually the same day, in chronological order.",
            "Do not alter an entry with correction fluid. Correct it with an initialled and dated margin note or footnote.",
            "Use a separate page for each brand name and strength. In VIC, a separate page is not required if the records can be readily sorted by poison or controlled substance.",
            "Keep the register on the premises where the drugs are stored.",
            "Everyone involved in the manufacture, distribution, sale, or supply of S8 medicines must keep a register.",
            "Pharmacies record receipt and supply of S8 medicines in real time.",
            "A pharmacist carries out a full stock check of all S8 medicines regularly.",
          ]}
        />
        <Matrix
          label="Stocktake"
          columns={[...states]}
          minWidth="80rem"
          rows={[
            {
              topic: "Frequency",
              cells: [
                "—",
                "At least monthly. No statutory month is set. Best practice is a regular basis.",
                "At least once every 3 months. Hospitals remain 6-monthly, in any month.",
                "—",
                "—",
                "Not less than once a month.",
                "—",
                "No legislated period.",
              ],
            },
            {
              topic: "Conditions",
              cells: [
                "—",
                "The pharmacy must develop a Substance Management Plan. The plan can set other intervals, and those intervals are then followed.",
                "A person who assumes control for 1 month or more must do an inventory and endorse the register on taking control.",
                "—",
                "—",
                "If the inventory does not balance, the Health Department must be informed immediately on the Notification of loss, theft or incident for investigation form.",
                "—",
                "The pharmacist-in-charge is responsible. On-the-spot fines or infringement notices apply if an inspection finds an unbalanced register.",
              ],
            },
            {
              topic: "Handover",
              cells: [
                "—",
                "A pharmacist taking over the dispensary for more than 7 days must perform a full S8 inventory.",
                "A person assuming control for 1 month or more must inventory and endorse the register on taking control.",
                "—",
                "—",
                "—",
                "—",
                "—",
              ],
            },
          ]}
        />
      </Section>

      <Section id="nsw-2026" title="6. Comprehensive NSW Legislative Updates (Effective 5 November 2026)">
        <Subhead id="nsw-direct">Direct changes from the previous NSW rules</Subhead>
        <DataTable
          headers={["Topic", "Before 5 November 2026", "From 5 November 2026"]}
          minWidth="64rem"
          rows={[
            [
              "S3 pseudoephedrine recording",
              "Recorded in an approved electronic system (Project STOP).",
              "No longer required to record the sale of S3 pseudoephedrine.",
            ],
            [
              "S3 supply method",
              "Must be personally handed to the consumer by a pharmacist.",
              "No longer needs to be personally handed to the consumer. Adequate verbal or written instructions are still required at supply.",
            ],
            [
              "S4 high or unusual doses",
              "A dose higher than the official dose must be initialled and underlined.",
              "Prescribers are no longer required to underline a high or unusual dose.",
            ],
            [
              "S4D and steroid script validity",
              "Valid for 6 months only.",
              "Valid for 12 months, increased from 6 months.",
            ],
            [
              "S8 and S4D repeat retention",
              "Repeats must be retained in the first pharmacy that dispensed them.",
              "Repeats are no longer kept by the pharmacy and can be given back to the patient to dispense at any pharmacy, except OTP scripts.",
            ],
            [
              "S8 stocktake",
              "Twice a year, in March and September.",
              "At least once every 3 months. Hospitals remain 6-monthly, in any month.",
            ],
            [
              "S8 items per script",
              "Strictly one S8 drug per prescription.",
              "Multiple items are allowed on the same script if they are for the same medicine, for example multiple strengths of morphine.",
            ],
            [
              "S8 stimulant authority",
              "The NSW Health prescribing authority number must be written on the script.",
              "Prescribers no longer need to write the approval number on the script.",
            ],
            [
              "Emergency telephone or fax orders",
              "The pharmacist had 7 days to receive the original script before notifying.",
              "The pharmacist has 14 days, previously 7, to receive the script before notifying NSW Health.",
            ],
          ]}
        />

        <Subhead id="nsw-further">Further NSW requirements from 5 November 2026</Subhead>
        <DataTable
          headers={["Area", "New requirement"]}
          minWidth="56rem"
          rows={[
            [
              "Prescriptions and filing",
              "Scanned copies of S8 and S4D prescriptions may be stored electronically instead of the paper, if the original details, dispensing records, and stickers stay legible. A handwritten prescription must be legible to be valid. Prescribers are prohibited from self-prescribing S8 and S4D medicines, or obtaining them by wholesale supply for self-administration. Prescriptions for nominated S4 medicines, previously called certain restricted substances, no longer require a special prescriber endorsement.",
            ],
            [
              "Medicine samples",
              "Providing or receiving samples of S8 and S4D medicines is banned. Written orders are still required for samples of other scheduled medicines.",
            ],
            [
              "Wholesaling by pharmacies",
              "A community pharmacy can wholesale S2, S3, S4, and S8 medicines to another pharmacy during an ownership change, liquidation, or bankruptcy; to another pharmacy or facility to fill an individual patient request or prescription; to pharmacies under the same ownership, excluding S8 and S4D; and to another pharmacy when the medicine expires in less than 6 months and is unlikely to be used, excluding S4D. Wholesale supply records are kept for 2 years.",
            ],
            [
              "Dose administration aids",
              "Labelling follows Poisons Standard Appendix L and also includes the patient date of birth, the date packed, and a reference number linking the prescriptions to the packing instructions if a third party packs the aid. A third-party packager must hold a TGA GMP licence, and both parties keep the manufacturing instructions for 2 years. If another pharmacy packs the aid without a GMP licence, that packing pharmacy is the supplying pharmacist and is responsible for dispensing, labelling, counselling, and records.",
            ],
            [
              "Urgent use and emergency stocks",
              "Urgent-use supplies from pharmacies must be registered on the ARTG, or with the APVMA for veterinary products. A residential care facility can be supplied S2, S3, S4, or S8 stock on a signed order by the Director of Nursing or the facility manager if the Medication Advisory Committee has approved it. A first aider with a current approved first aid certificate can be supplied salbutamol, terbutaline, adrenaline, naloxone, glucagon, and glyceryl trinitrate. Orders and records are kept for 2 years.",
            ],
            [
              "Drug register and stock loss",
              "The pharmacy owner is responsible for a compliant register on the premises. Daily entries remain the duty pharmacist’s role. An explained loss, such as syringe dead space or a witnessed spill, no longer has to be reported to NSW Health and is recorded in the drug register. S8 order confirmations and wholesaler receipts can be signed and returned electronically. If an animal has no owner or address, an animal identifier number can be entered in the register.",
            ],
            [
              "Opioid Treatment Program",
              "Registration and notification of prescribing, supplying, and administering OTP medicines is conducted via SafeScript NSW. Compliance with the new mandatory OTP Standards is legally binding.",
            ],
            [
              "Vaccinations",
              "A pharmacist no longer needs to record the patient’s GP when administering a vaccine, and must comply with the mandatory Vaccination Standards.",
            ],
            [
              "Nitrous oxide",
              "New supply restrictions apply to non-therapeutic supply, to limit access and reduce misuse harms.",
            ],
            [
              "Penalties and enforcement",
              "A five-tier penalty framework ranges from 20 to 400 penalty units for individuals and from 100 to 2,000 penalty units for corporations.",
            ],
          ]}
        />
        <Callout tone="alert">
          NSW penalties under the five-tier framework run from{" "}
          <Strong tone="alert">20 to 400 penalty units</Strong> for an individual and from{" "}
          <Strong tone="alert">100 to 2,000 penalty units</Strong> for a corporation.
        </Callout>
      </Section>
    </div>
  );
}
