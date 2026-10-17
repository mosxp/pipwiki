const licenceAuthorities = [
  {
    type: "Manufacturing Licence",
    scope: ["Authorises manufacturing activities for medicines."],
    fees: "Yes (Listed in MPMR Schedule 19)",
  },
  {
    type: "Wholesale Licence",
    scope: ["Authorises wholesale supply of medicines."],
    fees: "Yes (Listed in MPMR Schedule 19)",
  },
  {
    type: "S2 Retail Licence",
    scope: ["Authorises retail sale of Schedule 2 medicines."],
    fees: "Yes (Listed in MPMR Schedule 19)",
  },
];

const approvalAuthorities = [
  {
    type: "Prescribing Approval",
    scope: [
      "General prescribing approval",
      "Approved opioids under the Queensland Opioid Treatment Program (QOTP)",
      "Psychostimulants (amfetamines and methylphenidate)",
      "Other restricted medicines (for non-specialists)",
    ],
    fees: "No (Approvals have no fees)",
  },
  {
    type: "General Approval",
    scope: [
      "General in nature",
      "Acute health conditions at isolated sites",
      "Emergency first aid",
      "Emergency management of animals",
    ],
    fees: "No (Approvals have no fees)",
  },
];

const authorities = [...licenceAuthorities, ...approvalAuthorities];

export function SubstanceAuthorities() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">What is a Substance Authority?</h2>
        <div className="mt-4 max-w-4xl space-y-3 text-base leading-7 text-ink">
          <p>
            A formal licence or approval granted under the Medicines and Poisons Act 2019 (MPA)
            allowing a person (or someone acting under it) to carry out regulated activities with
            regulated substances.
          </p>
          <p>Requires a specific formal application submitted to Queensland Health.</p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Main Authority Types & Sub-Types
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-56 px-4 py-3 font-medium">Main Authority Type</th>
                <th className="px-4 py-3 font-medium">Specific Sub-Types / Scope</th>
                <th className="w-64 px-4 py-3 font-medium">Fees Applicable?</th>
              </tr>
            </thead>
            <tbody>
              {authorities.map((authority, index) => (
                <tr
                  key={authority.type}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {authority.type}
                  </th>
                  <td className="px-4 py-3 text-ink">
                    {authority.scope.length === 1 ? (
                      authority.scope[0]
                    ) : (
                      <ul className="list-disc space-y-1 pl-4">
                        {authority.scope.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink">{authority.fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
