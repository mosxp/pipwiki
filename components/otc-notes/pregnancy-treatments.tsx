function Strong({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: "ink" | "alert" | "moss";
}) {
  const color = {
    ink: "text-ink",
    alert: "text-[var(--alert)]",
    moss: "text-moss",
  }[tone];

  return <strong className={`font-semibold ${color}`}>{children}</strong>;
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

function TopicCard({
  id,
  title,
  rows,
}: {
  id: string;
  title: string;
  rows: { condition: string; canUse: React.ReactNode; avoid: React.ReactNode }[];
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
        <div className="px-6 py-5 md:px-8">
          <h2 className="font-serif text-2xl tracking-tight text-ink">{title}</h2>
        </div>
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="text-paper-raised">
                <th className="sticky left-0 z-10 w-44 bg-moss px-4 py-3 font-medium">Condition</th>
                <th className="bg-moss px-4 py-3 font-medium">Can use</th>
                <th className="w-72 bg-[var(--alert)] px-4 py-3 font-medium">Avoid</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const bg = index % 2 === 1 ? "bg-paper" : "bg-paper-raised";
                return (
                  <tr key={row.condition} className={`border-t border-line align-top ${bg}`}>
                    <th
                      scope="row"
                      className={`sticky left-0 z-10 px-4 py-3 font-medium text-ink ${bg}`}
                    >
                      {row.condition}
                    </th>
                    <td className="px-4 py-3">{row.canUse}</td>
                    <td className="px-4 py-3">{row.avoid}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const dash = "—";

export function PregnancyTreatments() {
  return (
    <div className="space-y-8">
      <TopicCard
        id="aches-pains"
        title="Aches & Pains"
        rows={[
          {
            condition: "Aches and pain",
            canUse: <Strong tone="moss">Paracetamol</Strong>,
            avoid: <Strong tone="alert">NSAIDs</Strong>,
          },
        ]}
      />

      <TopicCard
        id="allergies"
        title="Allergies & Hay Fever"
        rows={[
          {
            condition: "Allergies and hay fever",
            canUse: (
              <BulletList
                items={[
                  <>
                    <Strong>1st line:</Strong>{" "}
                    <Strong tone="moss">sedating antihistamines</Strong> (CPM, Dex-CPM, Cyproheptadine, Pheniramine, Doxylamine, Promethazine)
                  </>,
                  <>
                    <Strong>2nd line:</Strong> <Strong tone="moss">Loratadine</Strong>
                  </>,
                ]}
              />
            ),
            avoid: dash,
          },
        ]}
      />

      <TopicCard
        id="eye-nasal"
        title="Eye & Nasal Symptoms"
        rows={[
          {
            condition: "Eye drops",
            canUse: (
              <BulletList
                items={[
                  "Azelastine",
                  "Ketotifen",
                  "Levocabastine",
                  "Olopatadine",
                  "Apply pressure against the corner of the eye for one to two minutes.",
                ]}
              />
            ),
            avoid: dash,
          },
          {
            condition: "Nasal sprays",
            canUse: (
              <BulletList
                items={[
                  <>
                    <Strong>INCS, only:</Strong> <Strong tone="moss">budesonide</Strong> (Rhinocort),{" "}
                    <Strong tone="moss">beclomethasone</Strong> (Beclonase)
                  </>,
                  <>
                    <Strong tone="moss">Decongestant nasal spray</Strong> (Oxymetazoline or Xylometazoline), for 3 to 5 days
                  </>,
                ]}
              />
            ),
            avoid: dash,
          },
          {
            condition: "Blocked nose from cold and flu",
            canUse: (
              <BulletList
                items={[
                  <>
                    <Strong>1st line:</Strong> steam inhalations, or NaCl 0.9% nasal drops or spray
                  </>,
                  <>
                    <Strong>2nd line:</Strong>{" "}
                    <Strong tone="moss">decongestant nasal spray</Strong> (Oxymetazoline or Xylometazoline), for 3 to 5 days
                  </>,
                ]}
              />
            ),
            avoid: (
              <>
                <Strong tone="alert">Oral decongestants</Strong> (Phenylephrine or Pseudoephedrine)
              </>
            ),
          },
        ]}
      />

      <TopicCard
        id="cough-throat"
        title="Cough & Sore Throat"
        rows={[
          {
            condition: "Dry cough",
            canUse: (
              <BulletList items={["Dextromethorphan", "Pholcodine"]} />
            ),
            avoid: dash,
          },
          {
            condition: "Chesty cough",
            canUse: (
              <BulletList items={["Guaifenesin", "Bromhexine"]} />
            ),
            avoid: dash,
          },
          {
            condition: "Sore throat",
            canUse: (
              <BulletList
                items={[
                  <>
                    Lozenges containing a <Strong>local anaesthetic</Strong> and{" "}
                    <Strong>antibacterial agents</Strong> (Codral)
                  </>,
                  "Gargling salt water",
                  "Drinking lemon and honey",
                ]}
              />
            ),
            avoid: (
              <BulletList
                items={[
                  <>
                    Gargles containing <Strong tone="alert">iodine</Strong>
                  </>,
                  <>
                    Products containing <Strong tone="alert">benzydamine</Strong>
                  </>,
                ]}
              />
            ),
          },
        ]}
      />

      <TopicCard
        id="cold-sores"
        title="Cold Sores & Mouth Ulcers"
        rows={[
          {
            condition: "Cold sores",
            canUse: (
              <BulletList
                items={[
                  <>
                    <Strong>Medicine:</Strong> <Strong tone="moss">Aciclovir cream</Strong>
                  </>,
                  <>
                    <Strong>Treatment to moisten the area:</Strong> apply ice to the affected area, and
                    use lip balms
                  </>,
                  <>
                    <Strong>Preventing:</Strong> use a lip balm with SPF 15+. Avoid stress, too much sun
                    and wind, injury to the lips or skin, and food or drinks that can trigger an outbreak.
                  </>,
                ]}
              />
            ),
            avoid: <Strong tone="alert">Famciclovir tablets</Strong>,
          },
          {
            condition: "Mouth ulcers",
            canUse: (
              <>
                Creams and protective pastes containing <Strong tone="moss">Carmellose</Strong>, <Strong tone="moss">gelatin</Strong>, and{" "}
                <Strong tone="moss">pectin</Strong>
              </>
            ),
            avoid: (
              <BulletList
                items={[
                  <Strong key="sal" tone="alert">Salicylic acid</Strong>,
                  <Strong key="benz" tone="alert">Benzydamine</Strong>,
                ]}
              />
            ),
          },
        ]}
      />

      <TopicCard
        id="gastrointestinal"
        title="Gastrointestinal & Haemorrhoids"
        rows={[
          {
            condition: "Constipation",
            canUse: (
              <BulletList
                items={[
                  "Add more fibre to the diet",
                  "Drink plenty of water",
                  <>
                    <Strong>Medicine:</Strong> <Strong tone="moss">osmotic laxatives</Strong> — lactulose
                  </>,
                  <>
                    <Strong tone="moss">Stool softener</Strong> — docusate
                  </>,
                  <>
                    <Strong tone="moss">Bulk-forming laxatives</Strong> — ispaghula, bran, or
                    methylcellulose
                  </>,
                ]}
              />
            ),
            avoid: (
              <>
                Avoid prolonged use of <Strong tone="alert">stimulant laxatives</Strong> — senna and
                bisacodyl.
              </>
            ),
          },
          {
            condition: "Diarrhoea",
            canUse: "Oral rehydration solution",
            avoid: (
              <BulletList
                items={[
                  <>
                    <Strong tone="alert">Loperamide</Strong> should be avoided in the first trimester. If
                    advised by a doctor, it may be used in the 2nd and 3rd trimester.
                  </>,
                  <>
                    <Strong tone="alert">See a doctor</Strong> if diarrhoea is profuse or lasts longer
                    than 48 hours.
                  </>,
                ]}
              />
            ),
          },
          {
            condition: "Heartburn and GORD",
            canUse: (
              <BulletList
                items={[
                  <>
                    <Strong>Dietary and lifestyle changes:</Strong> eat small, frequent meals. Avoid rich
                    or spicy meals, chocolate, citrus foods, and coffee. Avoid lying down straight after
                    a meal, and avoid eating late at night.
                  </>,
                  <Strong key="antacid" tone="moss">Antacid</Strong>,
                  <Strong key="ranitidine" tone="moss">Ranitidine</Strong>,
                ]}
              />
            ),
            avoid: dash,
          },
          {
            condition: "Haemorrhoids",
            canUse: (
              <BulletList
                items={[
                  "The best treatment is prevention of constipation.",
                  <>
                    <Strong tone="moss">Anorectal products</Strong>, such as ointments or suppositories to
                    treat haemorrhoids, are safe to use during pregnancy.
                  </>,
                ]}
              />
            ),
            avoid: dash,
          },
        ]}
      />

      <TopicCard
        id="parasites"
        title="Parasites"
        rows={[
          {
            condition: "Worm infestations",
            canUse: (
              <BulletList
                items={[
                  "Preventative measures",
                  <>
                    <Strong tone="moss">Pyrantel</Strong> (threadworm, hookworm, and roundworm)
                  </>,
                ]}
              />
            ),
            avoid: (
              <>
                <Strong tone="alert">Mebendazole</Strong> can only be used to treat whipworm, and only
                from the second trimester onwards. Do not use it for threadworm.
              </>
            ),
          },
          {
            condition: "Head lice",
            canUse: (
              <BulletList
                items={[
                  <>
                    <Strong tone="moss">Comb and conditioner method</Strong> every second day until no
                    live lice have been found for 10 days
                  </>,
                  <>
                    <Strong tone="moss">Topical permethrin</Strong> (treatment of choice),{" "}
                    <Strong tone="moss">dimeticone</Strong>, or{" "}
                    <Strong tone="moss">pyrethrin/piperonyl butoxide</Strong>
                  </>,
                ]}
              />
            ),
            avoid: dash,
          },
          {
            condition: "Scabies",
            canUse: (
              <>
                <Strong tone="moss">Topical permethrin</Strong> (treatment of choice)
              </>
            ),
            avoid: dash,
          },
        ]}
      />

      <TopicCard
        id="vaginal-thrush"
        title="Vaginal Thrush"
        rows={[
          {
            condition: "Vaginal thrush",
            canUse: (
              <BulletList
                items={[
                  <>
                    <Strong>Only</Strong> <Strong tone="moss">topical antifungal creams and pessaries</Strong>{" "}
                    containing clotrimazole or nystatin
                  </>,
                  <>
                    Use them <Strong tone="alert">without the applicator</Strong>. A{" "}
                    <Strong>6-day course is preferred</Strong> in pregnancy rather than a short course.
                  </>,
                ]}
              />
            ),
            avoid: <Strong tone="alert">Oral fluconazole</Strong>,
          },
        ]}
      />
    </div>
  );
}
