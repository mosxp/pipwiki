const purposes = [
  {
    title: "Safe Handling & Disposal",
    detail:
      "Ensure particular substances are made, sold, used, and disposed of in an appropriate, effective, and safe way.",
  },
  {
    title: "Risk Management",
    detail: "Ensure health risks arising from using the substances are appropriately managed.",
  },
  {
    title: "Practitioner Competency",
    detail:
      "Ensure persons authorised to carry out activities have the necessary competencies to do so safely.",
  },
];

const regulations = [
  {
    label: "Medicines Regulation",
    name: "Medicines and Poisons (Medicines) Regulation 2021",
  },
  {
    label: "Poisons Regulation",
    name: "Medicines and Poisons (Poisons and Prohibited Substances) Regulation 2021",
  },
  {
    label: "Pest Management Regulation",
    name: "Medicines and Poisons (Pest Management Activities) Regulation 2021",
  },
];

export function PurposesOfTheAct() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">The 3 Main Purposes of the Act</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {purposes.map((purpose) => (
            <li
              key={purpose.title}
              className="rounded-lg border border-line bg-paper-raised px-5 py-4"
            >
              <h3 className="font-serif text-xl tracking-tight text-ink">{purpose.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink">{purpose.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-line bg-paper-raised px-5 py-5 md:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Subordinate Legislation (Accompanying Regulations)
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          The Act provides the overarching legal and policy framework, while the following three
          regulations detail administrative, technical, and practical rules:
        </p>
        <ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-7 text-ink">
          {regulations.map((regulation) => (
            <li key={regulation.label}>
              <span className="font-medium">{regulation.label}:</span> {regulation.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
