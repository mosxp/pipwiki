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

const authorisedClasses = [
  "Pharmacists",
  "Medical practitioners",
  "Registered nurses and enrolled nurses",
  "Dentists",
  "Midwives",
  "Podiatrists",
  "Podiatric surgeons",
  "Veterinary surgeons",
  "Ambulance officers",
  "MPA inspectors or police officers",
];

const methods: { form: string; method: React.ReactNode }[] = [
  {
    form: "Tablets & capsules",
    method: (
      <>
        Remove from packaging, crush into powder, and mix into absorbent material (e.g. kitty
        litter, sawdust, or concrete). Tamper-resistant formulations (e.g. OxyContin®) should be
        ground in a mechanical blender or mill.
      </>
    ),
  },
  {
    form: "Transdermal patches",
    method: (
      <>
        Cut into strips (<Strong tone="summary">approx. 1 cm</Strong>) before disposal.
      </>
    ),
  },
  {
    form: "Ampoules & liquids",
    method: (
      <>
        Break tops and empty liquid into an absorbent medium (for large batches, crush protected
        ampoules between thick sheets of paper).
      </>
    ),
  },
  {
    form: "Lozenges & wafers",
    method: <>Dissolve in a small volume of hot water before dispersing.</>,
  },
];

const registerFields = [
  "Date of disposal.",
  "Drug name, form, and strength.",
  "Quantity destroyed.",
  "Description of disposal method.",
  "Name and signature of the person destroying the waste.",
  "Name, signature, and professional authority of the independent witness.",
];

export function DiversionRiskDestruction() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Key Definitions & Legislative Distinctions
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Diversion-risk medicines
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Medicines with significant potential for illicit diversion (
              <Strong>MPMR Schedule 2, Part 3</Strong>), including all{" "}
              <Strong tone="alert">Schedule 8s</Strong>, anabolic steroids, barbiturates,
              benzodiazepines, codeine, pseudoephedrine/ephedrine, growth hormone-releasing
              peptides, and <Strong>SARMs</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Disposal vs destruction
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              <Strong>Disposal</Strong> (<Strong>MPA s28</Strong>) is an umbrella term meaning to
              discard, destroy, or abandon waste. <Strong tone="summary">Destruction</Strong> is a
              specific method of disposal where a medicine is rendered{" "}
              <Strong tone="alert">unusable and unidentifiable</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-[var(--alert)]/35 bg-[var(--alert-bg)] px-5 py-4 lg:col-span-2">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              No more FSS destructions
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Expired or unwanted <Strong tone="alert">S8s</Strong> must{" "}
              <Strong tone="alert">no longer be sent</Strong> to Queensland Health Forensic and
              Scientific Services (<Strong>FSS</Strong>). Destruction must be handled locally on
              site or collected by an authorized environmental waste contractor.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          General Environmental & Storage Rules Prior to Disposal
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Environmental protection mandate
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Medicines are classified as regulated waste under Queensland environmental laws and
              must <Strong tone="alert">never be poured down sinks, flushed down toilets, or sent to general landfill</Strong>.
              The final step of disposal for all medicine waste is{" "}
              <Strong tone="summary">high-temperature incineration</Strong>.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Storage of S8 waste awaiting destruction
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
              <li>
                Must be stored securely inside an approved <Strong tone="moss">S8 safe</Strong>.
              </li>
              <li>
                Must be kept <Strong tone="alert">strictly separated from active stock</Strong> and
                clearly marked <Strong>&quot;For Destruction&quot;</Strong>.
              </li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
              Storage of S3 / S4 diversion-risk waste
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Must <Strong tone="alert">not be left unattended</Strong> where members of the public
              could access it without being seen.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Destruction Authority & Independent Witnessing Rules
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-80 px-4 py-3 font-medium">Rule</th>
                <th className="px-4 py-3 font-medium">Requirement</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line bg-paper align-top">
                <th scope="row" className="px-4 py-3 font-medium text-ink">
                  Schedule 8 medicine waste destruction (<Strong>MPMR s147</Strong>)
                </th>
                <td className="px-4 py-3">
                  <p>
                    <Strong>Authorised person to destroy:</Strong> the person in charge of disposal
                    at the facility.
                  </p>
                  <p className="mt-2">
                    <Strong tone="alert">Mandatory independent witness:</Strong> the destruction
                    must be witnessed by another authorised person who is{" "}
                    <Strong tone="alert">not related, married, or in a de facto relationship</Strong>{" "}
                    with the person destroying the medicine.
                  </p>
                  <p className="mt-2">
                    Classes of persons authorised to destroy or witness (<Strong>s147</Strong>):
                  </p>
                  <ul className="mt-1 columns-2 gap-x-6 pl-4">
                    {authorisedClasses.map((person) => (
                      <li key={person} className="list-disc">
                        {person}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-line bg-paper-raised align-top">
                <th scope="row" className="px-4 py-3 font-medium text-ink">
                  Immediate residue exemption (<Strong>MPMR s143(2)</Strong>)
                </th>
                <td className="px-4 py-3">
                  <p>
                    A health professional administering a diversion-risk medicine may destroy residue{" "}
                    <Strong tone="moss">without an independent witness</Strong> if it consists of:
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">
                    <li>An unused portion of a tablet.</li>
                    <li>Unused partial contents of an ampoule or container.</li>
                    <li>A used transdermal patch.</li>
                  </ul>
                  <p className="mt-2">
                    The residue must be destroyed{" "}
                    <Strong tone="summary">immediately after administration</Strong>.
                  </p>
                </td>
              </tr>
              <tr className="border-t border-line bg-paper align-top">
                <th scope="row" className="px-4 py-3 font-medium text-ink">
                  Schedule 3 & 4 diversion-risk waste (<Strong>MPMR s148</Strong>)
                </th>
                <td className="px-4 py-3">
                  Any approved person authorised to supply or administer the medicine may destroy{" "}
                  <Strong>S3</Strong> or <Strong>S4</Strong> diversion-risk waste{" "}
                  <Strong tone="moss">without a formal statutory witness</Strong>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Practical Destruction Methods (Rendering Unusable & Unidentifiable)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Destruction requires changing the physical form and dispersing it into an absorbent medium
          to prevent retrieval:
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-56 px-4 py-3 font-medium">Dosage form</th>
                <th className="px-4 py-3 font-medium">Method</th>
              </tr>
            </thead>
            <tbody>
              {methods.map((row, index) => (
                <tr
                  key={row.form}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.form}
                  </th>
                  <td className="px-4 py-3">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Medicine Register Records & Transfers
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">
              Mandatory register entry (<Strong>MPMR ss212–213</Strong>)
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Every disposal/destruction of <Strong tone="alert">S8</Strong> waste must be recorded
              in the S8 register with:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
              {registerFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">Transferring S8 waste for disposal</h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              If transferring S8 waste to another authorised entity (e.g. a hospital transferring to
              a pharmacy or licensed waste contractor), the receiver must acknowledge receipt by:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
              <li>Signing the transfer entry in the sender&apos;s S8 register; or</li>
              <li>
                Signing a separate receipt notice (retained by the transferring facility for{" "}
                <Strong tone="summary">2 years</Strong>).
              </li>
            </ul>
          </article>
          <article className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-4">
            <h3 className="text-sm font-semibold text-ink">RUM project requirements</h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Small community pharmacy returns may be placed into{" "}
              <Strong>Return Unwanted Medicines (RUM)</Strong> bins for incineration, but
              pharmacists must <Strong tone="alert">destroy (denature) S8 waste</Strong> prior to
              placing it in the RUM bin. Commercial quantities from hospitals/aged care cannot be
              placed in RUM bins and must go to a commercial clinical waste contractor.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
