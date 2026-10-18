const comparisonRows = [
  {
    aspect: "Legal Classification",
    bag: "Treated strictly as a purchase order under the MPA.",
    prescription: "Treated as a prescription.",
  },
  {
    aspect: "Pharmacist Role",
    bag: "Supplying / selling stock to a practitioner (free via PBS or purchased privately).",
    prescription: "Dispensing for a specific patient's individual treatment.",
  },
  {
    aspect: "QScript Transmission",
    bag: "Must NOT flow to QScript (automatically filtered out when entered correctly as a purchase order).",
    prescription: "Transmits data directly to QScript.",
  },
  {
    aspect: "Risk of Incorrect Entry",
    bag: "If processed incorrectly as a prescription for the doctor, software transmits it to QScript as an apparent illegal self-prescription.",
    prescription: "Normal monitoring workflow.",
  },
];

export function PrescriberBag() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Prescriber Bag Stock Order vs. Individual Patient Prescription
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-52 px-4 py-3 font-medium">Comparison</th>
                <th className="px-4 py-3 font-medium">Prescriber Bag Stock Order</th>
                <th className="px-4 py-3 font-medium">Individual Patient Prescription</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr
                  key={row.aspect}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {row.aspect}
                  </th>
                  <td className="px-4 py-3 text-ink">{row.bag}</td>
                  <td className="px-4 py-3 text-ink">{row.prescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">Doctor&apos;s Bag Processing</h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Pharmacists must process Prescriber Bag orders through the dispensary software&apos;s
          designated Purchase Order / Doctor&apos;s Bag module—never as a personal dispensed
          prescription—to prevent false QScript self-prescribing flags.
        </p>
      </section>
    </div>
  );
}
