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

const standardSafe: { spec: string; detail: React.ReactNode }[] = [
  {
    spec: "Body & door construction",
    detail: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Mild steel plate of <Strong tone="summary">not less than 10 mm</Strong> thickness.
        </li>
        <li>Continuous welding on all joints.</li>
        <li>
          Door constructed of mild steel plate (<Strong tone="summary">≥ 10 mm</Strong>),
          flush-fitting with a clearance around the door of{" "}
          <Strong tone="summary">no more than 1.5 mm</Strong>.
        </li>
        <li>Hinges mounted so the door cannot be opened if hinge pins are removed.</li>
        <li>
          Fixed locking bar welded to the inside face of the door near the hinge edge that engages
          into a rebate when closed.
        </li>
      </ul>
    ),
  },
  {
    spec: "Locking mechanism",
    detail: (
      <>
        Fitted with a <Strong>6-lever key lock</Strong> securely fixed to the rear face of the door
        (or an approved combination/electronic equivalent).
      </>
    ),
  },
  {
    spec: "Weight & anchoring",
    detail: (
      <>
        The safe must weigh <Strong tone="summary">more than 350 kg</Strong>,{" "}
        <Strong>or</Strong> be securely attached to the premises.
      </>
    ),
  },
  {
    spec: "Definition of “securely attached”",
    detail: (
      <>
        Bolted to a concrete floor, brick/concrete wall, or through timber wall studs/noggins using{" "}
        <Strong tone="summary">at least 4 bolts of at least 12 mm diameter</Strong> fastened from
        inside the safe.
      </>
    ),
  },
];

const essu: { spec: string; detail: React.ReactNode }[] = [
  {
    spec: "Access control",
    detail: (
      <>
        Restricted <Strong tone="alert">strictly to authorized individuals</Strong> using unique
        access codes, passwords, or biometric identifiers.
      </>
    ),
  },
  {
    spec: "Audit & alerts",
    detail: (
      <>
        In-built tracking of access, attempted access, and discrepancies; visual/audible/electronic
        alerts if left open, damaged, or disconnected from power;{" "}
        <Strong tone="alert">automatic locking upon power failure</Strong>.
      </>
    ),
  },
  {
    spec: "Anchoring / security",
    detail: (
      <>
        Must weigh <Strong tone="summary">&gt; 350 kg</Strong>, be securely attached to the
        premises, be secured to the floor with a <Strong tone="summary">4 mm hardened steel chain</Strong>{" "}
        and <Strong tone="summary">two 10 mm sleeve anchors</Strong>, have continuous electronic
        tethering, <Strong>or</Strong> be constantly supervised.
      </>
    ),
  },
  {
    spec: "Surveillance",
    detail: (
      <>
        Must be under personal supervision, covered by monitored movement detectors,{" "}
        <Strong>or</Strong> covered by CCTV with visibility of the front and sides with footage
        retained for <Strong tone="summary">at least 35 days</Strong>.
      </>
    ),
  },
];

const alternatives: { context: string; facility: React.ReactNode; conditions: React.ReactNode }[] = [
  {
    context: "S8 cold chain (refrigerated storage)",
    facility: (
      <ul className="list-disc space-y-1 pl-4">
        <li>Lockable refrigerator securely attached to the premises; or</li>
        <li>
          Refrigerator located inside a lockable room, cupboard, or metal/hardwood enclosure
          attached to the premises.
        </li>
      </ul>
    ),
    conditions: (
      <>
        Must <Strong tone="alert">not be used to store any items other than medicines</Strong>.
      </>
    ),
  },
  {
    context: "Emergency stock (< 6 doses total)",
    facility: <>Lockable hardwood or metal cupboard/drawer, or RFDS medicine chest.</>,
    conditions: (
      <>Stored where a health practitioner or vet usually practices, or in an RFDS chest.</>
    ),
  },
  {
    context: "QOTP / opioid treatment program working supply",
    facility: <>Lockable hardwood or metal cupboard or drawer.</>,
    conditions: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          Under personal supervision of a pharmacist or authorized administrator.
        </li>
        <li>
          Outside operating hours or if unsupervised, stock must be{" "}
          <Strong tone="alert">returned to the primary S8 safe</Strong>.
        </li>
      </ul>
    ),
  },
  {
    context: "S8s carried for attending patients (mobile practitioners)",
    facility: <>Lockable bag, box, or similar container.</>,
    conditions: (
      <>
        Kept in the <Strong>personal custody</Strong> of the practitioner. Must{" "}
        <Strong tone="alert">not be left unattended or in vehicles overnight</Strong>.
      </>
    ),
  },
  {
    context: "Dose administration aids (DAAs containing S8s)",
    facility: <>Lockable room, hardwood/metal cupboard, or drawer.</>,
    conditions: <>Stored at a pharmacy or relevant institution.</>,
  },
  {
    context: "School / childcare facility supplies",
    facility: <>Lockable room, hardwood/metal cupboard, or drawer.</>,
    conditions: <>Dispensed/supplied for a child attending the facility.</>,
  },
];

function SpecTable({
  rows,
}: {
  rows: { spec: string; detail: React.ReactNode }[];
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
        <thead>
          <tr className="bg-moss text-paper-raised">
            <th className="w-64 px-4 py-3 font-medium">Specification</th>
            <th className="px-4 py-3 font-medium">Requirement</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.spec}
              className={[
                "border-t border-line align-top",
                index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
              ].join(" ")}
            >
              <th scope="row" className="px-4 py-3 font-medium text-ink">
                {row.spec}
              </th>
              <td className="px-4 py-3">{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DepartmentalStandardSecureStorage() {
  return (
    <div className="mt-10 space-y-10">
      <p className="max-w-4xl text-base leading-7 text-ink">
        Queensland: Departmental Standard – Secure Storage of S8 Medicines (
        <Strong tone="summary">Version 2</Strong>).
      </p>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          General Specifications for a Standard S8 Safe (Table 1)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          A compliant <Strong tone="moss">S8 safe</Strong> must meet strict physical, construction,
          and anchoring standards:
        </p>
        <SpecTable rows={standardSafe} />
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Electronic Storage and Supply Units (ESSU) (Table 2)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Applies to automated dispensing cabinets (e.g. Pyxis, Omnicell) in hospitals or places
          approved by Queensland Health (e.g. community pharmacies):
        </p>
        <SpecTable rows={essu} />
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Alternative & Specialized S8 Storage Arrangements (Table 3)
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-72 px-4 py-3 font-medium">Clinical context / formulation</th>
                <th className="px-4 py-3 font-medium">Permitted storage facility / mechanism</th>
                <th className="px-4 py-3 font-medium">Mandatory operational conditions</th>
              </tr>
            </thead>
            <tbody>
              {alternatives.map((row, index) => (
                <tr
                  key={row.context}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.context}
                  </th>
                  <td className="px-4 py-3">{row.facility}</td>
                  <td className="px-4 py-3">{row.conditions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
