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

const chapters: { chapter: string; coverage: string }[] = [
  { chapter: "Chapter 1 — Preliminary (Reg 1–6)", coverage: "Preliminary matters, including definitions." },
  {
    chapter: "Chapter 2 — Schedule 4, 8 and 9 poisons",
    coverage: "Parts 1–20, from possession through the monitored poisons database.",
  },
  {
    chapter: "Chapter 3 — Schedule 2, 3 and 7 poisons",
    coverage: "Schedule 2 (Reg 133–133C), Schedule 3 (Reg 133D–147), and Schedule 7 (Reg 148–149).",
  },
  {
    chapter: "Chapter 3A — Medically supervised injecting centre",
    coverage: "Reg 149A–149C.",
  },
  { chapter: "Chapter 3B — Drug-checking services", coverage: "Reg 149D–149N." },
  {
    chapter: "Chapter 4 — Miscellaneous matters",
    coverage:
      "General requirements (Reg 150–156); licences and permits issued under the Act (Reg 157–158); Minister and Secretary approvals (Reg 159–163B); transitional provisions (Reg 164–174).",
  },
];

const chapterTwoParts: { part: string; coverage: string }[] = [
  { part: "Part 1 — Possession (Reg 7–9A)", coverage: "Possession of Schedule 4, 8 and 9 poisons." },
  {
    part: "Part 2 — Permits and forms",
    coverage:
      "Division 1 special Schedule 8 permits (Reg 10–12A); Division 2 general Schedule 9 permits (Reg 13–15); Division 3 Schedule 9 permit (Reg 15A–15B).",
  },
  { part: "Part 3 — Prescriptions (Reg 16–26)", coverage: "Who may prescribe, and how a prescription must be written." },
  {
    part: "Part 4 — Stock food orders and chart instructions",
    coverage: "Division 1 stock food orders (Reg 27); Division 2 chart instructions (Reg 28–35).",
  },
  {
    part: "Part 5 — Sale and supply by practitioners other than pharmacists (Reg 35A–44)",
    coverage: "Supply by non-pharmacist practitioners.",
  },
  {
    part: "Part 6 — Sale and supply by pharmacists",
    coverage:
      "Division 1 circumstances of sale or supply (Reg 44A–58); Division 2 duties of a pharmacist relating to sale or supply (Reg 59–71).",
  },
  {
    part: "Part 7 — Labelling and storage",
    coverage: "Division 1 labelling (Reg 72); Division 2 storage (Reg 73–76).",
  },
  { part: "Part 8 — Authorising administration (Reg 77–86)", coverage: "Authority to administer." },
  {
    part: "Part 9 — Administration by practitioners other than pharmacists (Reg 87–98)",
    coverage: "Administration by other practitioners.",
  },
  { part: "Part 10 — Administration by pharmacists (Reg 99–101)", coverage: "Pharmacist administration." },
  {
    part: "Part 11 — Administration by persons other than pharmacists and other practitioners (Reg 102–104)",
    coverage: "Administration by other persons.",
  },
  { part: "Part 12 — Self-administration (Reg 105)", coverage: "Self-administration." },
  { part: "Part 13 — Records (Reg 106–113)", coverage: "Transaction records and how they are kept." },
  {
    part: "Part 14 — Destruction of Schedule 8 poisons and Schedule 9 poisons (Reg 114–115)",
    coverage: "When destruction is prohibited, and the exceptions.",
  },
  { part: "Part 15 — Cultivation of narcotic plants (Reg 116–117)", coverage: "Cultivation of narcotic plants." },
  {
    part: "Part 16 — Warrants for ovulatory stimulants, prostaglandins, retinoids and thalidomide (Reg 118–125)",
    coverage: "Warrants for those restricted Schedule 4 medicines.",
  },
  {
    part: "Part 17 — Use of premises — drugs of dependence (Reg 126)",
    coverage: "Use of premises for drugs of dependence.",
  },
  { part: "Part 18 — Forms (Reg 128–131)", coverage: "Forms." },
  { part: "Part 19 — Miscellaneous (Reg 132)", coverage: "Miscellaneous matters in Chapter 2." },
  {
    part: "Part 20 — Monitored poisons database (Reg 132A–132I)",
    coverage: "The monitored poisons database.",
  },
];

const definitions: { term: string; meaning: React.ReactNode }[] = [
  {
    term: "the Act",
    meaning: (
      <>
        The Act means the <Strong>Drugs, Poisons and Controlled Substances Act 1981</Strong>.
      </>
    ),
  },
  {
    term: "pharmacy",
    meaning: (
      <>
        Pharmacy has the same meaning as it has in the <Strong>Pharmacy Regulation Act 2010</Strong>.
      </>
    ),
  },
  {
    term: "ovulatory stimulant",
    meaning: (
      <>
        A substance listed as an ovulatory stimulant in Part 2 of Chapter 1 of the Poisons Code
        (section 12 of the DPCS Act). Named examples: <Strong>clomiphene</Strong> and{" "}
        <Strong>cyclofenil</Strong>.
      </>
    ),
  },
  {
    term: "prostaglandin",
    meaning: (
      <>
        A substance listed as a prostaglandin in Part 2 of Chapter 1 of the Poisons Code (section
        12 of the DPCS Act). Named examples: <Strong>dinoprost</Strong> and{" "}
        <Strong>dinoprostone</Strong>.
      </>
    ),
  },
  {
    term: "retinoid",
    meaning: (
      <>
        A substance listed as a retinoid in Part 2 of Chapter 1 of the Poisons Code (section 12 of
        the DPCS Act). Named examples: <Strong>acitretin</Strong>, <Strong>bexarotene</Strong>,{" "}
        <Strong>etretinate</Strong>, <Strong>isotretinoin</Strong>, and <Strong>tretinoin</Strong>.
      </>
    ),
  },
  {
    term: "thalidomide",
    meaning: (
      <>
        Thalidomide means (a) <Strong>thalidomide</Strong> for human use, or (b) a substance listed
        as a thalidomide-like substance in Part 2 of Chapter 1 of the Poisons Code. Thalidomide-like
        substances include <Strong>lenalidomide</Strong> and <Strong>pomalidomide</Strong>.
      </>
    ),
  },
  {
    term: "special Schedule 7 substance",
    meaning: (
      <>
        A substance listed as a special Schedule 7 substance in Part 2 of Chapter 1 of the Poisons
        Code (the Poisons Code / SUSMP).
      </>
    ),
  },
  {
    term: "special Schedule 8 poison",
    meaning: (
      <>
        <Strong>Methadone</Strong>; <Strong>nabiximols</Strong>; <Strong>amphetamine</Strong>;{" "}
        <Strong>dexamphetamine</Strong>; <Strong>lisdexamfetamine</Strong>;{" "}
        <Strong>methylamphetamine</Strong>; <Strong>methylphenidate</Strong>;{" "}
        <Strong>sodium oxybate</Strong>.
      </>
    ),
  },
  {
    term: "Schedule 3 naloxone",
    meaning: <>Naloxone when prepared to be used for the treatment of opioid overdoses.</>,
  },
  {
    term: "Schedule 8 MDMA",
    meaning: (
      <>
        N,α-dimethyl-3,4-(methylenedioxy)phenylethylamine in Schedule 8 of the Poisons Standard.
        MDMA is included in Schedule 8 only for the treatment of{" "}
        <Strong>post-traumatic stress disorder</Strong>.
      </>
    ),
  },
  {
    term: "Schedule 8 psilocybine",
    meaning: (
      <>
        Psilocybine in Schedule 8 of the Poisons Standard. Psilocybine is included in Schedule 8
        only for the treatment of <Strong>treatment-resistant depression</Strong>.
      </>
    ),
  },
  {
    term: "drug of dependence",
    meaning: (
      <>
        A reference in these Regulations to a drug of dependence includes a drug of dependence that
        is also a Schedule 4 poison, Schedule 8 poison, or Schedule 9 poison. Drug of dependence is
        defined in the <Strong>DPCS Act 1981</Strong>.
      </>
    ),
  },
];

const prescriberScopes: React.ReactNode[][] = [
  ["Doctor", "Yes", "Yes", "Yes"],
  ["Dentist", "Yes", "Yes", "Yes"],
  ["Vet", "Yes", "Yes", "Yes"],
  ["Nurse Practitioner", "Yes", "Yes", "—"],
  ["Authorised Midwife", "Yes", "Yes", "—"],
  ["Authorised Optometrist", "Yes", "—", "—"],
  ["Authorised Podiatrist", "Yes", "—", "—"],
];

const treatmentLimits: { who: string; limit: string }[] = [
  { who: "Reg 17 — medical practitioner", limit: "For treatment of a person." },
  {
    who: "Reg 18 — dentist",
    limit: "For dental treatment only, and only for a single supply. A dentist cannot issue a repeat.",
  },
  { who: "Reg 19 — veterinary practitioner", limit: "For the treatment of an animal." },
  { who: "Reg 20 — nurse practitioner", limit: "For the treatment of a person." },
  { who: "Reg 21 — midwife", limit: "For the treatment of a person." },
  { who: "Reg 22 — optometrist", limit: "For the ocular treatment of a person." },
  { who: "Reg 23 — podiatrist", limit: "For the podiatric treatment of a person." },
];

const continuedMedicines: { group: string; examples: string }[] = [
  {
    group: "Cardiovascular medicines",
    examples:
      "Antihypertensives: ACE inhibitors, ARBs, combinations, beta-blockers, and calcium channel blockers. Diuretics: chlortalidone, hydrochlorothiazide ± amiloride, indapamide, furosemide, spironolactone, and eplerenone. Lipid-lowering agents: statins and ezetimibe.",
  },
  {
    group: "Diabetes medicines",
    examples:
      "Oral hypoglycaemics: metformin, sulfonylureas, pioglitazone, SGLT2 inhibitors, DPP-4 inhibitors, and acarbose. Injectables: GLP-1 agonists and insulins.",
  },
  {
    group: "Respiratory medicines",
    examples:
      "Beclometasone ± formoterol; budesonide ± formoterol; ciclesonide; fluticasone furoate ± vilanterol; fluticasone propionate ± formoterol or salmeterol; indacaterol ± mometasone; formoterol; salmeterol; salbutamol; terbutaline.",
  },
  {
    group: "Contraceptives and hormones",
    examples:
      "Drospirenone ± ethinylestradiol; levonorgestrel ± ethinylestradiol; norethisterone ± ethinylestradiol.",
  },
  { group: "HIV medicines", examples: "Antiretrovirals for HIV." },
];

export function DpcsRegulations() {
  return (
    <div>
      <p className="max-w-3xl text-base leading-7 text-ink-soft">
        DPCS Reg 2017 means the Drugs, Poisons and Controlled Substances Regulations 2017 (the
        Regulation, Victoria). These notes follow that instrument.
      </p>

      <Section id="chapter-breakdown" title="Chapter Breakdown">
        <p>
          The Regulations are arranged in chapters. Chapter 2 then splits Schedule 4, 8 and 9
          poisons into Parts 1 to 20, covering possession, permits, prescriptions, stock food
          orders, chart instructions, sales and supply, labelling, storage, administration,
          records, destruction, warrants, and the monitored poisons database.
        </p>
        <DataTable
          headers={["Chapter", "Coverage"]}
          rows={chapters.map((row) => [row.chapter, row.coverage])}
        />
        <Subhead id="chapter-2-parts">Chapter 2 parts</Subhead>
        <DataTable
          headers={["Part", "Coverage"]}
          rows={chapterTwoParts.map((row) => [row.part, row.coverage])}
          minWidth="56rem"
        />
      </Section>

      <Section id="definitions" title="Definitions (Reg 5)">
        <DataTable
          headers={["Term", "Meaning"]}
          rows={definitions.map((row) => [row.term, row.meaning])}
          minWidth="56rem"
        />
      </Section>

      <Section id="prescriptions" title="Prescriptions & Prescriber Eligibility (Reg 16–24)">
        <Subhead id="prescriber-scopes">Prescriber scopes (Reg 16)</Subhead>
        <p>Persons authorised to issue prescriptions. A dash means that column is not marked yes.</p>
        <DataTable
          headers={["Prescriber", "Schedule 4", "Schedule 8", "Schedule 9"]}
          rows={prescriberScopes}
          minWidth="40rem"
        />
        <Subhead id="treatment-limits">Treatment limits (Reg 17–23)</Subhead>
        <DataTable
          headers={["Prescriber", "Limit"]}
          rows={treatmentLimits.map((row) => [row.who, row.limit])}
        />
        <Callout tone="alert">
          <Strong tone="alert">Self-prescribing is prohibited (Reg 17).</Strong> Prescribers cannot
          prescribe for themselves. Reg 17–23 apply that limit across medical practitioners (Reg
          17), dentists (Reg 18), veterinary practitioners (Reg 19), nurse practitioners (Reg 20),
          midwives (Reg 21), optometrists (Reg 22), and podiatrists (Reg 23).
        </Callout>

        <Subhead id="prescription-particulars">What a prescription must include (Reg 24(3), (4), (5) and (6))</Subhead>
        <p>Schedule 4 prescription:</p>
        <BulletList
          items={[
            "Prescriber: name, address, phone, and signature in the prescriber’s own handwriting.",
            "Patient: name and address.",
            "Medicine: name, strength, quantity, direction, and number of repeats.",
            "Date written.",
          ]}
        />
        <p>Schedule 4 monitored medicine and Schedule 8 — computer-generated prescription:</p>
        <BulletList
          items={[
            "Prescriber: name, address, phone, and signature in the prescriber’s own handwriting.",
            "Patient: name, address, and date of birth.",
            <>
              Medicine: name, form, strength, quantity, direction, and number of repeats,{" "}
              <Strong>all in the prescriber’s own handwriting</Strong>.
            </>,
            <>
              Quantity and repeats must be written in <Strong>both words and figures</Strong>.
            </>,
            "Date written.",
          ]}
        />
        <p>Schedule 4 monitored medicine and Schedule 8 — handwritten prescription:</p>
        <BulletList
          items={[
            "Prescriber: name, address, phone, and signature in the prescriber’s own handwriting.",
            "Patient: name in the prescriber’s own handwriting, address in the prescriber’s own handwriting, and date of birth.",
            "Medicine: name, form, strength, quantity, direction, and number of repeats, all in the prescriber’s own handwriting.",
            "Quantity and repeats in both words and figures.",
            "Date written, in the prescriber’s own handwriting.",
          ]}
        />
        <p>
          For an animal, the patient details require the <Strong>species, breed, sex, and age</Strong>{" "}
          of the animal, and the <Strong>name and address of the owner</Strong>.
        </p>

        <Subhead id="physical-signature">Physical signature (Reg 24(2))</Subhead>
        <p>
          A prescriber does have to physically sign a prescription. An electronic prescription
          (eScript) does <Strong tone="moss">not</Strong> require a signature or handwritten
          endorsements.
        </p>

        <Subhead id="as-directed">&ldquo;As directed&rdquo; (Reg 24(3)(f))</Subhead>
        <Callout tone="summary">
          If the prescriber writes no dosing instructions, or simply writes &ldquo;as directed&rdquo;,
          that is not illegal, but it is unethical for a doctor.
        </Callout>
        <p>
          If a Schedule 8 prescription is missing one or more particulars, Reg 25 allows a
          pharmacist, in an emergency, to annotate the prescription from a phone conversation with
          the prescribing doctor. That is for clarifying details so the prescription can be
          dispensed accurately and safely.
        </p>
      </Section>

      <Section id="emergency-supply" title="Emergency Supply & Transmission (Reg 25 & 25A)">
        <Subhead id="emergency-verbal">Emergency verbal instructions (Reg 25)</Subhead>
        <p>
          A verbal instruction does not need a faxed or emailed script first. The{" "}
          <Strong tone="summary">original prescription must be sent within 72 hours</Strong>.
        </p>
        <Subhead id="faxed-or-emailed">Faxed or emailed prescription (Reg 25A)</Subhead>
        <p>
          A digital image of a prescription may be transmitted by fax or email. The same{" "}
          <Strong tone="summary">72-hour</Strong> rule applies: the original prescription must
          follow. Supply on a verbal instruction under Reg 25, or on a digital image transmitted
          under Reg 25A, is a permitted pathway for both Schedule 4 (Reg 47) and Schedule 8 (Reg
          48) poisons.
        </p>
      </Section>

      <Section id="pharmacist-sale" title="Pharmacist Sale & Supply (Reg 47–57)">
        <Subhead id="therapeutic-need">Therapeutic need for a drug of dependence (Reg 45)</Subhead>
        <p>A pharmacist must ensure therapeutic need before supplying a drug of dependence.</p>

        <Subhead id="s4-supply">When Schedule 4 supply is allowed (Reg 47)</Subhead>
        <BulletList
          items={[
            "On an original prescription from an S4 prescriber.",
            "On a certified copy of the original prescription if the original is submitted to a public authority.",
            "On a verbal instruction under Regulation 25.",
            "On a digital image of a prescription transmitted under Regulation 25A.",
            "To a hospital or day procedure centre patient, in accordance with a hospital medication chart instruction (Reg 54).",
            "To a residential care resident, in accordance with a residential medication chart instruction (Reg 55).",
            "In an emergency, if the pharmacist believes it is necessary to ensure continuity of treatment (Reg 56).",
            "In other situations necessary for continuity of treatment, as outlined under Reg 57.",
            "On the order of an S4 prescriber (prescriber bag).",
            "On the order of a person holding a permit for the poison.",
          ]}
        />
        <p>
          Reg 47(2) does not apply to sale or supply of an S4 poison to another pharmacist for use
          in their lawful practice. That supply is covered under section 13(3) of the Act.
        </p>

        <Subhead id="s4-restrictions">Schedule 4 restrictions (Reg 50)</Subhead>
        <Callout tone="summary">
          <Strong tone="summary">12 months (Reg 50(2)).</Strong> A pharmacist must not supply an S4
          poison on a prescription if more than 12 months have passed since the prescription was
          written.
        </Callout>
        <p>A pharmacist must not supply if (Reg 50(3)):</p>
        <BulletList
          items={[
            "The pharmacist has reason to believe the prescription is forged or fraudulent, or altered except by or on the instruction of the prescriber.",
            "The prescription is illegible or defaced.",
            "The prescription is not in a durable form (easily damaged, transient, or not permanently recordable).",
            "The full permitted quantity has already been supplied on that prescription.",
          ]}
        />
        <p>
          Except for exceptional circumstances under Reg 53, a pharmacist must not supply contrary
          to the prescriber’s instructions (Reg 50(4)), including supplying more than the authorised
          quantity on first supply, supplying too early if an interval is specified, or substituting
          a brand when a specific brand is written and marked as such.
        </p>

        <Subhead id="s8-supply">When Schedule 8 supply is allowed (Reg 48)</Subhead>
        <Callout tone="alert">
          <Strong tone="alert">No emergency supply of a Schedule 8 poison (Reg 48).</Strong> Reg 56
          emergency supply is Schedule 4 only.
        </Callout>
        <BulletList
          items={[
            "On an original prescription from an S8 prescriber.",
            "On a certified copy of the original prescription if the original is submitted to a public authority.",
            "On a verbal instruction under Regulation 25.",
            "On a digital image of a prescription transmitted under Regulation 25A.",
            "To a hospital or day procedure centre patient, in accordance with a hospital medication chart instruction (Reg 54).",
            "To a residential care resident, in accordance with a residential medication chart instruction (Reg 55).",
            "On the order of a prescriber (prescriber bag).",
            "On the order of a person holding a permit for the poison.",
            "Special supply of Schedule 8 MDMA or psilocybine (psychedelic-assisted therapy or clinical trials): to an authorised psychedelic psychiatrist, to a practitioner or nurse acting on their behalf, or for clinical trial participants under conditions approved under the Therapeutic Goods Act and ethics committees.",
          ]}
        />
        <p>
          Reg 48(2) does not apply to sale or supply of an S8 poison to another pharmacist for use
          in their lawful practice. That supply is covered by section 13(3) of the Act.
        </p>

        <Subhead id="s8-restrictions">Schedule 8 restrictions (Reg 51)</Subhead>
        <Callout tone="summary">
          <Strong tone="summary">6 months (Reg 51(3)).</Strong> A pharmacist must not supply if more
          than 6 months have passed since the date on which the prescription was written.
        </Callout>
        <Callout tone="alert">
          <Strong tone="alert">Verification supply is a 2-day supply (Reg 51(2) and Reg 63).</Strong>{" "}
          A pharmacist must not supply more than 2 days’ treatment unless the prescription is
          handwritten and the pharmacist knows the prescriber’s handwriting and it matches the usual
          handwriting, or the pharmacist has taken all reasonable steps to verify that the
          prescription was genuinely written by the prescriber. If it cannot be verified, a supply of
          not more than 2 days may be made, and the prescription must be kept.
        </Callout>
        <p>A pharmacist must not supply if (Reg 51(4)):</p>
        <BulletList
          items={[
            "The pharmacist has reason to believe the prescription is forged or fraudulent, or altered except by or on the instruction of the prescriber.",
            "The prescription is illegible or defaced.",
            "The prescription is not in a durable form.",
            "The full permitted quantity has already been supplied on that prescription.",
          ]}
        />
        <p>
          Except in exceptional circumstances (Reg 53), the pharmacist must not supply contrary to
          the instructions (Reg 51(5)): not more than the authorised quantity on first dispensing,
          not too early if an interval is specified, and no brand substitution if a specific brand
          is specified.
        </p>

        <Subhead id="emergency-s4">Emergency supply of a Schedule 4 poison (Reg 56)</Subhead>
        <p>A pharmacist may supply in an emergency if all of the following are met:</p>
        <BulletList
          items={[
            "The pharmacist believes supply is necessary so treatment is not interrupted.",
            "There is an immediate need, and it is impractical for the patient to get a prescription in time.",
            "Treatment was previously prescribed by a prescriber.",
            "The patient or carer knows the correct dose.",
            <>
              Quantity does not exceed <Strong tone="summary">3 days’ supply</Strong>, or, if it is
              impractical to supply exactly 3 days, the smallest commercially available pack.
            </>,
            "No further emergency supply of the same treatment continuation. The pharmacist cannot provide a further emergency supply if they have already supplied under this regulation for that continuation.",
          ]}
        />
        <p>This regulation applies to Schedule 4 poisons, not Schedule 8. The supply must be documented.</p>
        <p>Other medicines a pharmacist would not supply as an emergency supply:</p>
        <BulletList
          items={[
            "Drugs of dependence — SafeScript must be satisfied, and the medicine cannot be dispensed before the prescription is seen.",
            "PRN medications.",
            "Antibiotics, because the appropriateness of the prescription has to be decided at the time of prescribing.",
          ]}
        />

        <Subhead id="continued-dispensing">Continued dispensing (Reg 57)</Subhead>
        <p>
          A pharmacist may supply a Schedule 4 poison without a prescription for continuity of
          treatment if all of these conditions are met:
        </p>
        <BulletList
          items={[
            "The pharmacist believes supply is needed to prevent interruption of ongoing treatment.",
            "The medicine is listed in the National Health (Continued Dispensing) Determination 2022.",
            "Supply complies with the conditions in that Determination. Usually the patient has been using it regularly, it was previously prescribed and last supplied within a defined period (often 6 months), and the patient cannot readily obtain a new prescription.",
            "The poison is approved for supply without a prescription under Reg 159 (Ministerial approval).",
            "The pharmacist has not supplied that medicine under continued dispensing for that patient in the last 12 months.",
          ]}
        />
        <p>
          The Determination list is predominantly for chronic disease, such as asthma and other lung
          conditions, diabetes, high cholesterol, and heart disease. Oral contraceptives and
          medicines for HIV may also be supplied.
        </p>
        <DataTable
          headers={["Group", "Listed medicines"]}
          rows={continuedMedicines.map((row) => [row.group, row.examples])}
          minWidth="56rem"
        />
        <Subhead id="pbs-continued">PBS continued dispensing arrangements</Subhead>
        <p>
          Continued dispensing is designed to complement, not replace, existing emergency supply
          provisions such as owing scripts, a 3-day supply, telehealth, and electronic
          prescriptions. Before supplying, confirm:
        </p>
        <BulletList
          items={[
            "The patient has an immediate need before a script can be obtained.",
            "The usual prescriber is unavailable and cannot provide an e-script or owing prescription.",
            "The medicine is eligible under federal and state or territory legislation.",
            "The patient has been supplied this medicine in the past 3 months, and the condition is stable.",
            "It has not been supplied under continued dispensing in the last 12 months by any pharmacy.",
            "It is safe and appropriate for the patient.",
          ]}
        />
        <p>
          The patient must sign a declaration acknowledging supply under continued dispensing.
          Document the assessment, including stability and prior supply, and confirm the prescriber
          was unavailable. Dispensing software generates a modified repeat authorisation form and a
          consumer declaration and prescriber notification form. Notify the patient’s usual PBS
          prescriber or practice promptly in writing.
        </p>
        <p>
          If the patient already received a supply under continued dispensing in the last 12 months,
          use other emergency supply provisions and advise a telehealth or urgent appointment for a
          new script. A PBS prescription is not needed before claiming. Supply the usual PBS
          quantity: 60 days if the previous script was for 60 days, and 30 days if it was for 30
          days. Authority-required items can be claimed if eligible. If there is no Medicare card,
          call PBS general enquiries on 132 290 (option 1).
        </p>

        <Subhead id="pharmacist-initiated">Pharmacist-initiated supply (Reg 57A)</Subhead>
        <p>
          A pharmacist may supply a Schedule 4 poison without a prescription or other authorisation
          if all of these conditions are met:
        </p>
        <BulletList
          items={[
            "The person is under the pharmacist’s care, and the supply is for that person only.",
            "The pharmacist has taken all reasonable steps to ensure there is a genuine therapeutic need.",
            "The poison has been approved under Reg 163A(1) by the Secretary.",
            "Any specific conditions set by the Secretary are followed.",
          ]}
        />
        <p>
          Under Reg 163A, the Secretary may approve specific Schedule 4 poisons that pharmacists can
          sell, supply, or administer without a prescription when treating patients under their
          care. Approval is published by notice in the Government Gazette. There is no approval if
          the Schedule 4 poison is a drug of dependence. Approval is only if necessary for health
          service provision, and section 14A of the Act must not apply. Conditions may restrict the
          premises, require training or qualifications, limit the class of patients, or set any other
          condition needed for safe handling. An approval can cover one poison or a class, and all
          pharmacists or a class of pharmacists. It takes effect on the Gazette date or a later
          specified date. Pharmacists must not supply Schedule 4 drugs of dependence without a
          prescription under this regulation.
        </p>
      </Section>

      <Section id="departing" title="Departing from Prescriptions & Script Markings (Reg 53, 60, 63, 64, 66)">
        <Subhead id="exceptional-circumstances">Exceptional circumstances (Reg 53)</Subhead>
        <p>
          A pharmacist may supply a Schedule 4 or Schedule 8 medicine in a way that differs from the
          instructions on the prescription only in these situations:
        </p>
        <BulletList
          items={[
            "Further verbal or written instructions from the prescriber allow the change.",
            "The patient requests a change, reasonable steps to contact the prescriber have failed, not supplying as requested would cause unreasonable difficulty or inconvenience, all reasonable steps have been taken to ensure the supply would not pose an unacceptable risk to the patient’s health or safety, and the supply does not exceed what was requested by or for the patient.",
            "It is not reasonably practicable to comply, the prescriber cannot be reached, the patient consents to the change, and all reasonable steps have been taken to ensure safety.",
          ]}
        />
        <p>
          In all of these cases, <Strong>Reg 68</Strong> requires the pharmacist to notify the
          prescriber of what was supplied and to record the supply, including the steps taken.
        </p>

        <Subhead id="marking">Marking the prescription (Reg 60)</Subhead>
        <p>
          When supplying an S4 or S8 poison on a prescription or copy, mark the prescription or copy
          in a durable form, clearly indicating that the poison has been supplied, the date the
          record of supply was made (Part 13), and the premises from which it was supplied. Durable
          form means permanent and legible: ink stamp, handwriting in ink, or a printed label. Not
          pencil or erasable ink. It must remain legible for later reference.
        </p>

        <Subhead id="retain-unverified">Retain an unverified Schedule 8 prescription (Reg 63)</Subhead>
        <p>
          If an S8 poison is supplied in a quantity for not more than 2 days’ treatment, and the
          handwriting is not recognised as the purported prescriber’s, and reasonable steps to
          verify the prescription have not confirmed that the prescriber wrote it,{" "}
          <Strong tone="alert">retain the original prescription</Strong>. Do not return it to the
          patient or forward it elsewhere.
        </p>

        <Subhead id="last-repeat">Last repeat or no further Schedule 8 supply (Reg 64)</Subhead>
        <p>
          When an S8 poison is supplied and there is no authorisation for any further quantity on
          that prescription or order, either retain the original (or a legible copy if the original
          must be sent to a public authority), or, if the document still authorises other medicines
          such as S4 items, mark it clearly and durably that no further S8 supply is permitted.
        </p>

        <Subhead id="three-year-retention">Three-year retention (Reg 66)</Subhead>
        <p>
          After the last supply, keep the prescription, copy, or order on a{" "}
          <Strong>dedicated file used solely</Strong> for those documents. Do not mix them with
          general pharmacy paperwork. Retain them for <Strong tone="summary">at least 3 years</Strong>{" "}
          from the date of supply to which the document relates.
        </p>

        <Subhead id="fraudulent-obtaining">Fraudulent obtaining (Reg 69)</Subhead>
        <Callout tone="alert">
          If a person has obtained, or attempted to obtain, a Schedule 4, 8, or 9 poison by false
          pretence, immediately inform the <Strong tone="alert">Secretary</Strong> (Department of
          Health) and a <Strong tone="alert">police officer</Strong>. Document the suspicion and the
          notifications. Notify even if supply is refused.
        </Callout>
        <p>Examine prescriptions critically. Do not assume a script is genuine because it looks normal, is computer-generated, is a PBS authority prescription, is approved on PBS online or from a hospital, or matches previous dispensing records in SafeScript.</p>
        <p>
          Pharmacists can be prosecuted for dispensing fraudulent prescriptions if they fail to
          comply with legislative and professional obligations. Reg 51(2) still limits an unverified
          Schedule 8 supply to 2 days. Red flags include an unfamiliar prescriber, unusual or large
          quantities, atypical directions, rushed or evasive behaviour or unwillingness to provide
          ID, and a medicine with high misuse or diversion potential.
        </p>
        <p>
          If a prescription is confirmed fraudulent, complete the current Notification of forged or
          altered prescription form and report to the Medicines and Poisons Regulation Branch and to
          police, recording the officer’s name and badge number or email. If it was dispensed before
          the fraud was realised, do not cancel the dispensing event. Update the dispensing record,
          and therefore SafeScript, with a clear uppercase warning, for example: HANDWRITTEN
          PRESCRIPTION CONFIRMED AS FRAUDULENT BY THE PURPORTED PRESCRIBER.
        </p>

        <Subhead id="overlapping-prescribers">Overlapping prescribers (Reg 70)</Subhead>
        <p>
          This applies to a prescription or copy for a Schedule 8 poison or a Schedule 4 drug of
          dependence.
        </p>
        <BulletList
          items={[
            "Reg 70(2): if the patient was supplied the same or a similar poison in the last 8 weeks on a prescription from a different prescriber, and the current prescriber is not believed to know, take all reasonable steps to inform the current prescriber.",
            "Reg 70(3): if two or more prescriptions for the same or a similar poison are presented at the same time, each written by a different prescriber, take all reasonable steps to inform each prescriber, unless they are already aware.",
          ]}
        />
        <p>Keep clear records of the communications and attempts to contact.</p>
      </Section>

      <Section id="storage-records" title="Storage, Records & Destruction (Reg 74, 108–115)">
        <Subhead id="storage">Storage of Schedule 8 and Schedule 9 poisons (Reg 74)</Subhead>
        <p>
          S8 and S9 poisons must be stored in a lockable facility providing security equivalent to a
          cabinet of:
        </p>
        <BulletList
          items={[
            <>
              <Strong>10 mm</Strong> mild steel plate construction.
            </>,
            "Continuous welding of the edges.",
            "A flush-fitting door with clearance of no more than 1.5 mm.",
            "A fixed locking bar welded inside the door.",
            "A 6-lever lock securely affixed.",
            "Fixing to the floor or wall that resists 30 minutes of attack by hand tools and 5 minutes of attack by power tools.",
          ]}
        />
        <p>
          Electronic storage (subregulation 3) is allowed only if the site is a health service
          treating patients on site, or a pharmacy co-located with such a service, and the security
          is at least equivalent. Access controls, audit logs, automatic locking, tamper alarms, and
          discrepancy reporting must be in place.
        </p>
        <Callout tone="alert">
          The storage must remain <Strong tone="alert">locked and secured at all times</Strong>,
          except when it is necessary to open it for an essential operation such as supply, a check,
          or a stocktake (Reg 74(4)).
        </Callout>
        <p>
          The cabinet or safe is used only for Schedule 8 poisons, Schedule 9 poisons, and drugs of
          dependence. Other items, including general stock or personal items, must not be stored in
          it. During transport, S8 or S9 poisons must be kept in a locked storage facility secured
          against unauthorised access. Up to 6 divided doses may be kept in a smaller lockable
          facility for immediate or emergency use.
        </p>

        <Subhead id="what-must-be-recorded">What must be recorded (Reg 108)</Subhead>
        <p>A record must be made as soon as practicable after each transaction, and must include:</p>
        <BulletList
          items={[
            "Date of the transaction.",
            "Name, form, strength, and quantity of the poison.",
            "If supplied on a prescription: the prescriber’s name and the directions.",
            "If supplied on a chart instruction: the name of the person who gave the instruction and the directions from the chart.",
            "Name and address or location of the person to whom the poison was transferred, supplied, administered, or disposed.",
            "For an animal: the owner or caretaker’s name and address, and the animal’s name or unique identifier.",
            "If purchased or obtained, the name and address of the supplier.",
            "If destroyed, the destruction details in Reg 115 (who destroyed it and who witnessed).",
            "Name of the person carrying out the transaction.",
            "If administration was authorised verbally, the name of the authorising person.",
            "If supplied under certain monitored supply circumstances, such as emergency supply or special conditions under Reg 47 or 48, the date of birth.",
          ]}
        />
        <p>Destruction of Schedule 4 poisons does not need to be recorded.</p>

        <Subhead id="how-records-are-kept">How records must be kept (Reg 109)</Subhead>
        <BulletList
          items={[
            "Schedule 8 and 9 records must be sortable by poison, so each substance can be retrieved separately.",
            "They must show a true and accurate balance after each transaction.",
            "They must show who carried out the transaction.",
            <>
              Methadone and buprenorphine used for opioid replacement therapy must be recorded{" "}
              <Strong tone="summary">at least daily</Strong>, even if there are multiple doses in a
              day.
            </>,
            "Records must be readily retrievable in English.",
            "All S4, S8, and S9 records must be kept for 3 years from the date of the transaction.",
            "They must be produced immediately to an authorised officer on request.",
            "They must not be alterable or deletable without detection. Paper records cannot be erased or overwritten. Electronic records need an audit trail.",
            "Personal access codes must stay with the person they belong to. Do not share a password or allow another person to record under that name.",
          ]}
        />

        <Subhead id="discrepancies">Accurate records, discrepancies, and loss (Reg 111–113)</Subhead>
        <p>
          Reg 111: do not knowingly make a false entry, or cause someone else to make a false or
          misleading entry, in records for Schedule 4, 8, or 9 poisons.
        </p>
        <p>
          Reg 112: investigate a discrepancy in Schedule 4, 8, or 9 records{" "}
          <Strong tone="alert">without delay</Strong>. If it cannot be explained or resolved, notify
          the Secretary without delay.
        </p>
        <p>
          Reg 113: if required records are lost, destroyed, or stolen, notify the Secretary without
          delay. Include what is missing, when and how it happened, and any known or suspected
          cause.
        </p>

        <Subhead id="destruction">Destruction (Reg 114 and Reg 115)</Subhead>
        <Callout tone="alert">
          <Strong tone="alert">Wilful destruction is prohibited (Reg 114).</Strong> A Schedule 8 or
          Schedule 9 poison must not be intentionally destroyed unless it is done in accordance with
          this Part.
        </Callout>
        <p>Reg 115 allows destruction only in these cases:</p>
        <BulletList
          items={[
            "By or under the supervision of an authorised officer, under a court order, or by police with a destruction order from an Inspector or higher rank.",
            "Narcotic plants or seeds under section 70 of the Act.",
            "A nurse practitioner or authorised midwife may destroy an S8 poison (only) in the presence of a medical practitioner, pharmacist, veterinary practitioner, dentist, nurse, or registered midwife.",
            "A medical practitioner, veterinary practitioner, dentist, or pharmacist may destroy an S8 or S9 poison in the presence of a medical practitioner, pharmacist, veterinary practitioner, dentist, nurse, or registered midwife.",
            "A special drug checking worker may destroy an S8 or S9 poison in the presence of another special drug checking worker or a listed health practitioner.",
          ]}
        />
        <p>
          The Reg 108 record for practitioner destruction must include the name, strength, and
          quantity, the method and place of destruction, and the names of the person who destroyed
          it and the witness.
        </p>
      </Section>

      <Section id="warrants-permits" title="Warrants & Special Permits (Reg 118–125 & Reg 10)">
        <Subhead id="warrants">Warrants are doctor-specific (Reg 118–125)</Subhead>
        <p>
          These Schedule 4 medicines require a warrant: retinoids (for example acitretin and oral
          isotretinoin), ovulatory stimulants (for example clomiphene), prostaglandins (for example
          dinoprost), thalidomide, and lenalidomide.
        </p>
        <p>
          Initiation is by a medical practitioner who has the appropriate qualifications and
          expertise, holds a warrant from the department, and endorses each prescription with the
          warrant number. A doctor who does not hold a warrant may prescribe only under the
          direction of a warrant holder, and must include the warrant holder’s name and warrant
          number on the prescription. Nurse practitioner and midwife rules are set out in the
          regulation.
        </p>
        <p>A warrant holder may:</p>
        <BulletList
          items={[
            "Write a chart instruction for that substance in accordance with regulation 30.",
            "Give an order for the sale or supply of that substance.",
            "Sell or supply that substance in accordance with regulation 36.",
            "Authorise administration in accordance with regulation 84.",
            "Administer that substance in accordance with regulation 88.",
            "Direct another registered medical practitioner to deal with that substance in accordance with regulation 123 for a specified patient.",
            "Direct a nurse practitioner to deal with that substance in accordance with regulation 124 for a specified patient.",
          ]}
        />

        <Subhead id="s8-permits">Schedule 8 permits are patient-specific (Reg 10)</Subhead>
        <p>
          Permits were introduced to prevent doctor-shopping as prescriber roles expanded. SafeScript
          monitors prescribing and dispensing. Apply for a permit directly via SafeScript. Check
          SafeScript every time before prescribing an S8 poison or a monitored S4 poison.
        </p>
        <p>
          A PBS authority only means Medicare subsidises the cost. An S8 permit under state law is
          still required, whether the prescription is PBS or private.
        </p>
        <DataTable
          headers={["Question", "Outcome"]}
          minWidth="40rem"
          rows={[
            ["Does the practitioner or clinic already hold a permit for this patient?", "Can prescribe in accordance with the existing permit."],
            ["Is the patient drug-dependent?", "Must get a permit. No exceptions for any S8 medicine."],
            ["Prescribing a special Schedule 8 poison?", "Must get a permit, except in the cases set out below."],
            ["Initiating S8 treatment for 8 weeks or less only?", "Can start without a permit."],
            ["Will treatment exceed 8 weeks, counted cumulatively?", "Must get, or apply for, a permit."],
          ]}
        />
        <p>
          A continuous period of more than 8 weeks is based on the <Strong>quantity supplied</Strong>
          , not the dates on the script. A script for 100 tablets at one tablet twice daily is 50
          days, which is under 8 weeks, so no permit is required on that quantity alone. The same
          supply with repeats may exceed 8 weeks, and a permit is then needed. If treatment already
          under way is being continued and the total exceeds 8 weeks, apply for a permit immediately.
          Prescribing may continue while the permit is pending.
        </p>
        <p>Special Schedule 8 poisons that always need a permit, except in the cases below:</p>
        <BulletList
          items={[
            "Methadone",
            "Methylphenidate",
            "Dexamphetamine and lisdexamfetamine",
            "Amphetamine and methylamphetamine",
            "Nabiximols (Sativex®)",
            "Sodium oxybate",
          ]}
        />
        <p>
          Paediatricians and psychiatrists do not need a permit for ADHD in a patient under 18 years
          if the patient is not drug-dependent. Psychiatrists only have that exception for ADHD in a
          patient 18 years or older, and only if the patient is not drug-dependent.
        </p>
        <p>
          Methadone generally requires a permit for any prescribing, administering, or supplying,
          even once. A permit is not required when treating at an oncology clinic in a hospital and
          the patient is not an inpatient, when treating at a pain clinic in a hospital and the
          patient is not an inpatient, or when the patient is under the care of a palliative care
          service.
        </p>
        <p>
          Medicinal cannabis does not need a permit if Commonwealth approval was obtained through
          the SAS or Authorised Prescriber scheme, or the product is listed on the ARTG.
        </p>
        <DataTable
          headers={["Setting", "Permit"]}
          minWidth="40rem"
          rows={[
            ["Prison or gaol patients", "Not required during treatment, and for up to 7 days after release."],
            ["Inpatients (hospital, emergency department, day procedure)", "Not required during treatment, and for up to 7 days after discharge."],
            ["Residential aged care", "Not required while the person is a resident."],
            ["Palliative care, patient not drug-dependent", "Not required if the prognosis is limited life expectancy."],
            ["Cancer pain, patient not drug-dependent", "Not required for opioid analgesics used to treat cancer pain."],
            [
              "Opioids at or under 100 mg morphine equivalence daily, patient not drug-dependent",
              "Not required for oral or suppository oxycodone, oral morphine, oral hydromorphone, oral tapentadol, buprenorphine patch, or fentanyl patch.",
            ],
          ]}
        />
        <p>
          Opioid replacement therapy with methadone or buprenorphine needs special training and
          approval as an ORT prescriber. Any doctor can prescribe Suboxone® film for up to 10
          patients without that training. A drug-dependent person still needs an S8 permit before
          prescribing.
        </p>
        <p>
          A Schedule 8 permit lasts for the period specified on that permit. Most permits include a
          maximum daily dosage limit and an expiry date.
        </p>

        <Subhead id="permits-and-pharmacists">Permits and pharmacists</Subhead>
        <BulletList
          items={[
            "The Schedule 8 permit details are not written on the prescription. A pharmacist cannot see the permit on the paper or electronic script.",
            "It is mandatory for a pharmacist in Victoria to check SafeScript before dispensing any Schedule 8 poison and certain Schedule 4 monitored medicines. SafeScript shows dispensing history. It does not show the permit document itself.",
            "It is not the pharmacist’s legal responsibility to ensure the prescriber has obtained a permit. The prescriber is legally responsible for obtaining the permit and complying with its conditions.",
            "The prescriber must establish a genuine therapeutic need before prescribing. The pharmacist also has a legal and professional responsibility to ensure a prescription is appropriate and safe, and for a legitimate therapeutic purpose, before dispensing.",
            "The pharmacist must refuse to dispense if the medicine is not clinically justified.",
          ]}
        />
      </Section>
    </div>
  );
}
