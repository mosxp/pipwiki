const definitionPoints = [
  {
    label: "Definition",
    detail:
      "A statutory instrument made by the Chief Executive (or delegate) under the Medicines and Poisons Act 2019 (MPA) that extends what an approved person is legally authorised to do.",
  },
  {
    label: "Core Purpose",
    detail:
      "Authorises suitably qualified approved persons to administer or supply medicines in specific clinical circumstances that would otherwise sit outside their baseline scope.",
  },
  {
    label: "Legal Effect",
    detail:
      "Sits outside the primary Act as a standalone document, but takes legal effect when approved by regulation.",
  },
];

const instrumentContent = [
  "Places and circumstances for dealing with regulated substances.",
  "Mandatory qualifications, accredited training, and competencies.",
  "Specific patient inclusion/exclusion criteria, drug formulations, and routes of administration.",
];

const practitionerGroups = [
  "Pharmacists",
  "Registered Nurses",
  "Midwives",
  "Physiotherapists",
  "Queensland Ambulance Service (QAS)",
  "Aboriginal and Torres Strait Islander Health Practitioners",
  "Aboriginal and Torres Strait Islander Health Workers",
  "Indigenous Health Workers",
];

const pharmacistServices = [
  {
    title: "Pharmacist Vaccinations",
    detail:
      "Administering National Immunisation Program (NIP) and private vaccines across diverse healthcare settings without a prescription.",
  },
  {
    title: "Prescribing & Treatment Protocols",
    detail:
      "Authorising trained community pharmacists to assess and supply S4 medicines for specific conditions (such as the UTI/cystitis service and hormonal contraception) following strict clinical practice guidelines.",
  },
];

export function ExtendedPracticeAuthorities() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          What is an Extended Practice Authority?
        </h2>
        <dl className="mt-4 grid gap-4 lg:grid-cols-3">
          {definitionPoints.map((point) => (
            <div key={point.label} className="rounded-lg border border-line bg-paper-raised px-5 py-4">
              <dt className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {point.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{point.detail}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 rounded-lg border border-line bg-paper-raised px-5 py-4">
          <p className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
            Instruments & Content
          </p>
          <p className="mt-2 text-sm leading-6 text-ink">
            EPAs contain detailed clinical protocols, including:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
            {instrumentContent.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Recognised Practitioner and Service Groups
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          The MPMR recognises approved EPAs across 8 practitioner and service groups:
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {practitionerGroups.map((group, index) => (
            <li
              key={group}
              className="rounded-lg border border-line bg-paper-raised px-4 py-3 text-sm leading-6 text-ink"
            >
              <span className="mr-2 font-medium text-moss">{index + 1}.</span>
              {group}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          What This Means for Pharmacists in Practice
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          The Extended Practice Authority – Pharmacists is the key legal instrument underpinning
          expanded pharmacy clinical services in Queensland, including:
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {pharmacistServices.map((service) => (
            <article
              key={service.title}
              className="rounded-lg border border-line bg-paper-raised px-4 py-4"
            >
              <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink">{service.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
