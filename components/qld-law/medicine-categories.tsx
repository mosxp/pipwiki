const schedules = ["Schedule 2 (S2)", "Schedule 3 (S3)", "Schedule 4 (S4)", "Schedule 8 (S8)"];

const categories = [
  {
    name: "Restricted Medicines",
    scope: "Medicines carrying specific therapeutic risks.",
    rules: "Dealings are limited to certain specialist practitioners.",
    examples: "Isotretinoin, clomiphene, thalidomide.",
  },
  {
    name: "High-Risk Medicines",
    scope: "Medicines posing significant safety/abuse risks.",
    rules:
      "Cannot be self-prescribed. A prescriber requiring them for personal therapy must have another prescriber prescribe them.",
    examples: null,
  },
  {
    name: "Diversion-Risk Medicines",
    scope:
      "Medicines associated with risk of diversion for illicit use or non-intended purposes resulting in serious harm.",
    rules: "Subject to additional legislative controls under MPA and MPMR to prevent diversion.",
    examples: null,
  },
  {
    name: "Monitored Medicines",
    scope:
      "Medicines presenting a high risk of harm via overdose, misuse, dependence, or diversion.",
    rules:
      "Practitioners prescribing or supplying may be required to check QScript or comply with the Monitored Medicines Standard.",
    examples: "All S8 medicines + particular S4s (e.g. codeine, sleeping tablets).",
  },
];

export function MedicineCategories() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">Definition of a Medicine</h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          Under the Medicines and Poisons Act 2019 (MPA), a medicine is a substance falling into
          the current Commonwealth Poisons Standard schedules:
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {schedules.map((schedule) => (
            <li
              key={schedule}
              className="rounded-lg border border-line bg-paper-raised px-4 py-3 text-sm leading-6 font-medium text-ink"
            >
              {schedule}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-ink-soft">
          Note: A regulation under the MPA may also prescribe another substance to be an S2, S3,
          S4, or S8 medicine.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Categories of Medicines (MPMR Schedule 2)
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-52 px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Definition & Scope</th>
                <th className="px-4 py-3 font-medium">Key Rules / Restrictions</th>
                <th className="w-72 px-4 py-3 font-medium">Examples</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category.name}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {category.name}
                  </th>
                  <td className="px-4 py-3 text-ink">{category.scope}</td>
                  <td className="px-4 py-3 text-ink">{category.rules}</td>
                  <td className="px-4 py-3 text-ink">{category.examples ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
