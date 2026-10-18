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

const requirements: { category: React.ReactNode; requirement: React.ReactNode; annotations: React.ReactNode }[] =
  [
    {
      category: (
        <>
          <Strong>Restricted medicines</Strong> (Schedule 2, Part 1)
        </>
      ),
      requirement: (
        <>
          The prescription must contain details of the prescriber&apos;s{" "}
          <Strong>authorisation</Strong> to prescribe the restricted medicine.
        </>
      ),
      annotations: (
        <>
          <p>Must state at least one of the following:</p>
          <div className="mt-2">
            <BulletList
              items={[
                "Home state approval number under local legislation",
                "Relevant specialist qualifications",
                "Other lawful authorisation",
                <>
                  For hydroxychloroquine: must write <Strong>&ldquo;continuing treatment&rdquo;</Strong>{" "}
                  if initiated elsewhere.
                </>,
              ]}
            />
          </div>
        </>
      ),
    },
    {
      category: (
        <>
          Approved opioids (<Strong>QOTP</Strong>)
        </>
      ),
      requirement:
        "For patients temporarily visiting Queensland or awaiting placement in the Queensland Opioid Treatment Program.",
      annotations: (
        <>
          <p>Must state:</p>
          <div className="mt-2">
            <BulletList
              items={[
                "The name of the place where the opioid is to be dispensed/given",
                "Dosing instructions and conditions for supply",
                <>
                  <Strong>Exact start and end dates</Strong> for dosing.
                </>,
              ]}
            />
          </div>
        </>
      ),
    },
    {
      category: (
        <>
          Psychostimulants (<Strong>S8</Strong>)
          <span className="mt-1 block font-normal text-ink-soft">
            Dexamfetamine, lisdexamfetamine, methylphenidate
          </span>
        </>
      ),
      requirement:
        "Prescribers must be authorised in their home state and provide a compliant prescription meeting MPMR rules.",
      annotations: (
        <>
          <p>Must state:</p>
          <div className="mt-2">
            <BulletList
              items={[
                <>
                  The words <Strong>&ldquo;specified condition&rdquo;</Strong> or words indicating
                  the specific condition treated (e.g. ADHD, narcolepsy)
                </>,
                "Prescriber's specialist qualifications/authorisation details",
                <>
                  <Strong>S8</Strong> quantities in <Strong>words and numbers</Strong> (if paper)
                </>,
                <>
                  Patient <Strong>Date of Birth</Strong>.
                </>,
              ]}
            />
          </div>
        </>
      ),
    },
    {
      category: (
        <>
          Standard <Strong>S2, S3, S4</Strong> medicines
        </>
      ),
      requirement: "Valid to dispense if meeting general prescription requirements.",
      annotations:
        "Must include standard prescriber details, patient name/address, drug strength/form, directions, and valid signature.",
    },
  ];

const refusalGrounds: React.ReactNode[] = [
  "Information indicates the prescription has already been fulfilled or cancelled.",
  <>
    A digital copy of a paper prescription for a <Strong>diversion-risk medicine</Strong> states
    that it has been sent to another place.
  </>,
];

const suspicionGrounds = [
  "The prescription was unlawfully prepared or obtained (forged/fraudulent).",
  "The prescriber is not authorised under the law of their jurisdiction to prescribe that medicine.",
  "The prescription does not meet the mandatory writing requirements of the Queensland MPMR.",
];

export function InterstatePrescriptions() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Core Principles of <Strong>Interstate</Strong> Dispensing
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Jurisdictional application
            </h3>
            <div className="mt-2 text-sm leading-6 text-ink">
              <BulletList
                items={[
                  "Prescribers located in another state/territory must act under the laws of their home jurisdiction.",
                  <>
                    Dispensers physically located in Queensland must comply with the Medicines and
                    Poisons Act 2019 (MPA) and Medicines and Poisons (Medicines) Regulation 2021
                    (MPMR).
                  </>,
                ]}
              />
            </div>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Dispensing authority (MPMR s120)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              A Queensland pharmacist is authorised to dispense a prescription from an{" "}
              <Strong>interstate</Strong> prescriber provided:
            </p>
            <div className="mt-2 text-sm leading-6 text-ink">
              <BulletList
                items={[
                  "The prescriber is authorised/permitted under a corresponding law in their own jurisdiction to prescribe the medicine.",
                  <>
                    The prescription complies with the content requirements of{" "}
                    <Strong>MPMR sections 86 to 88</Strong>.
                  </>,
                ]}
              />
            </div>
          </article>
          <article className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Key administrative limits
            </h3>
            <div className="mt-2 text-sm leading-6 text-ink">
              <BulletList
                items={[
                  <>
                    Queensland Health prescribing approvals: <Strong>cannot be granted</Strong> to{" "}
                    <Strong>interstate</Strong> prescribers (only granted to Queensland-based
                    prescribers).
                  </>,
                  <>
                    <Strong>QScript</Strong> look-up: the legal requirement to check{" "}
                    <Strong>QScript</Strong> applies only to practitioners physically prescribing,
                    dispensing, or administering inside Queensland.
                  </>,
                ]}
              />
            </div>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Specific Requirements for <Strong>Interstate</Strong> Prescriptions
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-64 px-4 py-3 font-medium">Medicine Category</th>
                <th className="px-4 py-3 font-medium">Key Requirements for Interstate Prescriptions</th>
                <th className="px-4 py-3 font-medium">Mandatory Script Annotations</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((row, index) => (
                <tr
                  key={index}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.category}
                  </th>
                  <td className="px-4 py-3 text-ink">{row.requirement}</td>
                  <td className="px-4 py-3 text-ink">{row.annotations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Grounds to Refuse Dispensing an <Strong>Interstate</Strong> Prescription (
          <Strong>MPMR s120</Strong>)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          A Queensland pharmacist <Strong>must not dispense</Strong> on an interstate written
          prescription if:
        </p>
        <div className="mt-4 text-sm leading-6 text-ink">
          <BulletList
            items={[
              ...refusalGrounds,
              <>
                The pharmacist reasonably suspects that:
                <div className="mt-2">
                  <BulletList items={suspicionGrounds} />
                </div>
              </>,
            ]}
          />
        </div>
      </section>
    </div>
  );
}
