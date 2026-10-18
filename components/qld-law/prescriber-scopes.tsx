function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

const prescribers: {
  name: string;
  schedule: string;
  scope: React.ReactNode;
  restricted: React.ReactNode;
  rules: React.ReactNode;
}[] = [
  {
    name: "Medical Practitioners",
    schedule: "Schedule 6",
    scope: (
      <>
        <Strong>S2, S3, S4, S8</Strong> (within assessed therapeutic need).
      </>
    ),
    restricted: (
      <BulletList
        items={[
          <>
            Prescribing approvals required for <Strong>QOTP opioids</Strong> and certain specialist{" "}
            <Strong>restricted medicines</Strong> (e.g. psychostimulants for non-specialists).
          </>,
        ]}
      />
    ),
    rules: (
      <BulletList
        items={[
          <>
            Prescriptions <Strong>valid for 12 months (S2–S4)</Strong> and{" "}
            <Strong>6 months (S8)</Strong>.
          </>,
          <>
            Must check <Strong>QScript</Strong> and follow the{" "}
            <Strong>Monitored Medicines Standard</Strong> before prescribing/dispensing monitored
            drugs.
          </>,
          <>
            <Strong>Must not</Strong> self-prescribe or self-administer{" "}
            <Strong>high-risk medicines</Strong>.
          </>,
        ]}
      />
    ),
  },
  {
    name: "Dental Practitioners (Dentists)",
    schedule: "Schedule 4",
    scope: (
      <>
        <p>
          <Strong>S2, S3, S4</Strong> for dental treatment.
        </p>
        <p className="mt-2">
          <Strong>S8s restricted to:</Strong>
        </p>
        <BulletList
          items={[
            <Strong key="codeine">Codeine</Strong>,
            <Strong key="morphine">Morphine</Strong>,
            <Strong key="hydromorphone">Hydromorphone</Strong>,
            <Strong key="oxycodone">Oxycodone</Strong>,
          ]}
        />
      </>
    ),
    restricted: (
      <BulletList
        items={[
          <>
            <Strong>Prohibited</Strong> from prescribing/administering papaveretum, pentazocine, or
            pethidine (unless endorsed for conscious sedation for fentanyl/pethidine
            administration).
          </>,
          <>
            <Strong>Cannot prescribe restricted medicines</Strong> (except oral medicine
            specialists prescribing hydroxychloroquine).
          </>,
        ]}
      />
    ),
    rules: (
      <BulletList
        items={[
          <>
            <Strong>S8</Strong> prescriptions strictly limited to a <Strong>max 3 days&apos; supply</Strong>
            , <Strong>immediate-release only</Strong>, with <Strong>NO repeats</Strong>.
          </>,
          <>
            Must check <Strong>QScript</Strong> for monitored medicines.
          </>,
          <>
            Dental hygienists/therapists can buy/possess/administer specified clinic agents (local
            anaesthetics, fluorides, adrenaline autoinjector), but{" "}
            <Strong>only dentists can prescribe or give treatment doses</Strong>.
          </>,
        ]}
      />
    ),
  },
  {
    name: "Nurse Practitioners (NPs)",
    schedule: "Schedule 7, Part 1",
    scope: (
      <>
        <Strong>S2, S3, S4, S8</Strong> within scope of practice / nursing notation.
      </>
    ),
    restricted: (
      <BulletList
        items={[
          <>
            <Strong>Cannot prescribe restricted medicines</Strong> without a formal Queensland
            Health prescribing approval.
          </>,
        ]}
      />
    ),
    rules: (
      <BulletList
        items={[
          <>
            Prescriptions <Strong>valid for 12 months (S2–S4)</Strong> and{" "}
            <Strong>6 months (S8)</Strong>.
          </>,
          <>
            Must check <Strong>QScript</Strong> and comply with the{" "}
            <Strong>Monitored Medicines Standard</Strong>.
          </>,
          <>
            <Strong>Cannot</Strong> self-prescribe/self-administer <Strong>high-risk medicines</Strong>.
          </>,
        ]}
      />
    ),
  },
  {
    name: "Midwives & Endorsed Midwives",
    schedule: "Schedule 7, Part 2",
    scope: (
      <BulletList
        items={[
          <>
            Midwives: Administering/supplying under <Strong>EPA-Midwives</Strong> or as-of-right
            immunisations (upon training).
          </>,
          <>
            Endorsed Midwives: Prescribing <Strong>S2, S3, S4, S8</Strong> within endorsed
            midwifery scope.
          </>,
        ]}
      />
    ),
    restricted: (
      <BulletList
        items={[
          <>
            <Strong>Cannot prescribe restricted medicines</Strong>.
          </>,
        ]}
      />
    ),
    rules: (
      <BulletList
        items={[
          <>
            Endorsed midwives must check <Strong>QScript</Strong> and comply with the{" "}
            <Strong>Monitored Medicines Standard</Strong> when prescribing monitored drugs.
          </>,
          <>
            Prescriptions <Strong>valid for 12 months (S2–S4)</Strong> and{" "}
            <Strong>6 months (S8)</Strong>.
          </>,
        ]}
      />
    ),
  },
  {
    name: "Registered Nurses (RNs) & Enrolled Nurses (ENs)",
    schedule: "Schedule 7, Parts 3–6",
    scope: (
      <BulletList
        items={[
          "Administer on prescription/standing order.",
          <>
            As-of-right immunisations (<Strong>trained RNs</Strong>).
          </>,
          <>
            Supply/give treatment doses under <Strong>EPA-RN</Strong> (Parts A, B, C).
          </>,
        ]}
      />
    ),
    restricted: (
      <BulletList
        items={[
          <>
            <Strong>ENs administer under supervision</Strong>.
          </>,
          <>
            Restricted ENs (with notation) are limited to administering <Strong>S2 and S3</Strong>{" "}
            medicines under supervision.
          </>,
        ]}
      />
    ),
    rules: (
      <BulletList
        items={[
          <>
            Nurse managers at relevant institutions can give purchase orders for{" "}
            <Strong>S4/S8 stock</Strong>.
          </>,
          "Rural/custodial RNs can repackage prescribed medicines (including into DAAs).",
        ]}
      />
    ),
  },
  {
    name: "Veterinary Surgeons",
    schedule: "Schedule 11",
    scope: (
      <>
        <Strong>S2, S3, S4, S8</Strong> for <Strong>animal treatment only</Strong>.
      </>
    ),
    restricted: (
      <BulletList
        items={[
          <>
            <Strong>Prohibited</Strong> from prescribing restricted medicines in Schedule 2, Part 1,
            Division 2 (amfetamines, methylphenidate, lenalidomide, pomalidomide).
          </>,
          <>
            <Strong>Prohibited</Strong> from prescribing cannabis (except approved{" "}
            <Strong>S4</Strong> pure CBD formulations <Strong>≥98% CBD</Strong>).
          </>,
        ]}
      />
    ),
    rules: (
      <BulletList
        items={[
          <>
            Diversion-risk medicines: total quantity (initial + repeats){" "}
            <Strong>must not exceed 6 months</Strong> of treatment.
          </>,
          <>
            Veterinary scripts <Strong>must not be uploaded to QScript</Strong>.
          </>,
          <>
            Veterinary nurses can administer <Strong>S2–S4s</Strong> under supervision, and
            pre-prepared <Strong>S8</Strong> treatment doses under remote real-time communication.
          </>,
        ]}
      />
    ),
  },
];

const universalRules: { title: string; detail: React.ReactNode }[] = [
  {
    title: "Prescription validity periods",
    detail: (
      <BulletList
        items={[
          <>
            <Strong>Schedule 2, 3, and 4</Strong> prescriptions: <Strong>valid for 12 months</Strong>{" "}
            from date written.
          </>,
          <>
            <Strong>Schedule 8</Strong> prescriptions: <Strong>valid for 6 months</Strong> from date
            written.
          </>,
        ]}
      />
    ),
  },
  {
    title: "Computer-generated paper prescriptions",
    detail: (
      <BulletList
        items={[
          <>
            <Strong>S8</Strong> quantities must be stated in <Strong>words and numbers</Strong>.
          </>,
          <>
            All computer-generated particulars are valid without handwriting, but must have a{" "}
            <Strong>physical handwritten signature</Strong>.
          </>,
          <>
            <Strong>No handwritten amendments</Strong> are permitted on printed computer-generated
            prescriptions; prescribers must reprint a corrected prescription.
          </>,
        ]}
      />
    ),
  },
  {
    title: "Monitored medicines and date of birth",
    detail: (
      <>
        All prescriptions for <Strong>monitored medicines</Strong> must contain the patient&apos;s{" "}
        <Strong>date of birth</Strong>.
      </>
    ),
  },
  {
    title: "Prescribing approval numbers",
    detail: (
      <>
        If a prescriber holds a Queensland Health approval for <Strong>restricted medicines</Strong>{" "}
        (e.g. <Strong>QOTP</Strong>, psychostimulants), the state-issued prescribing approval number
        must appear on the script.
      </>
    ),
  },
];

export function PrescriberScopes() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Cross-Profession Prescribing Scopes & Dispensing Limits
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[72rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-52 px-4 py-3 font-medium">Prescriber Class (MPMR Schedule)</th>
                <th className="px-4 py-3 font-medium">Permitted Scope / Schedules</th>
                <th className="px-4 py-3 font-medium">Restricted / Prohibited Medicines</th>
                <th className="px-4 py-3 font-medium">Key Prescribing & Dispensing Rules</th>
              </tr>
            </thead>
            <tbody>
              {prescribers.map((row, index) => (
                <tr
                  key={row.name}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.name}
                    <span className="mt-1 block font-normal text-ink-soft">{row.schedule}</span>
                  </th>
                  <td className="px-4 py-3 text-ink">{row.scope}</td>
                  <td className="px-4 py-3 text-ink">{row.restricted}</td>
                  <td className="px-4 py-3 text-ink">{row.rules}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Universal Prescribing & Dispensing Rules Across Queensland
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {universalRules.map((rule) => (
            <article key={rule.title} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {rule.title}
              </h3>
              <div className="mt-2 text-sm leading-6 text-ink">{rule.detail}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          S8 Waste Destruction Protocol (All Professions)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Waste rendering
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              <Strong>S8</Strong> waste must be destroyed by rendering it{" "}
              <Strong>unusable and unidentifiable</Strong> prior to high-temperature incineration.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Witnessing
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Must be destroyed in the presence of a witness who is also an authorised healthcare
              professional (doctor, pharmacist, dentist, nurse, midwife, podiatrist, or vet) and is{" "}
              <Strong>not related or in a de facto relationship</Strong> with the person destroying
              it.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-4 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Immediate residue exemption
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              <Strong>Witnessing is not required</Strong> for immediate disposal of administration
              residue (e.g., partial ampoule, unused partial tablet, or used transdermal patch).
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
