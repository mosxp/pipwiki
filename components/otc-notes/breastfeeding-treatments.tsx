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

export function BreastfeedingTreatments() {
  return (
    <div className="space-y-8">
      <TopicCard
        id="aches-pains"
        title="Aches & Pains"
        rows={[
          {
            condition: "Aches and pain",
            canUse: (
              <BulletList
                items={[
                  <Strong key="para" tone="moss">Paracetamol</Strong>,
                  <>
                    <Strong tone="moss">NSAIDs</Strong> (Ibuprofen or Diclofenac)
                  </>,
                  <>
                    <Strong tone="moss">Low-dose aspirin</Strong> (&lt; 150 mg daily)
                  </>,
                ]}
              />
            ),
            avoid: (
              <Strong tone="alert">A large dose of aspirin</Strong>
            ),
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
                  "Avoid triggers",
                  <>
                    <Strong tone="moss">Less-sedating antihistamines</Strong> (Loratadine)
                  </>,
                ]}
              />
            ),
            avoid: (
              <>
                <Strong tone="alert">Sedating antihistamines</Strong> (make the baby drowsy)
              </>
            ),
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
                  <>
                    <Strong tone="moss">Topical eye drops</Strong> for allergies and hay fever. Apply
                    pressure against the corner of the eye for one to two minutes.
                  </>,
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
                    <Strong>INCS:</Strong> Budesonide (Rhinocort), Beclomethasone
                  </>,
                  <>
                    <Strong tone="moss">Decongestant nasal spray</Strong> (Oxymetazoline, Xylometazoline, or Tramazoline), for 3 to 5 days
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
                    <Strong tone="moss">decongestant nasal spray</Strong> (Oxymetazoline, Xylometazoline, or Tramazoline), for 3 to 5 days
                  </>,
                ]}
              />
            ),
            avoid: (
              <>
                <Strong tone="alert">Oral decongestants</Strong> (Phenylephrine or Pseudoephedrine).
                These reduce breast milk supply.
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
              <BulletList
                items={[
                  <Strong key="dxm" tone="moss">Dextromethorphan</Strong>,
                  "Pholcodine",
                ]}
              />
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
                    Lozenges containing a <Strong>local anaesthetic</Strong>,{" "}
                    <Strong>antibacterial agents</Strong>, and <Strong>benzydamine</Strong>
                  </>,
                  "Gargling salt water",
                  "Drinking lemon and honey",
                ]}
              />
            ),
            avoid: (
              <>
                Gargles containing <Strong tone="alert">iodine</Strong>
              </>
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
              <BulletList
                items={[
                  <>
                    Creams and protective pastes containing <Strong tone="moss">Carmellose</Strong>, <Strong tone="moss">gelatin</Strong>, and{" "}
                    <Strong tone="moss">pectin</Strong>
                  </>,
                  <>
                    <Strong tone="moss">Salicylic acid</Strong>-containing products
                  </>,
                  <>
                    <Strong tone="moss">Benzydamine</Strong>-containing products
                  </>,
                ]}
              />
            ),
            avoid: dash,
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
                    <Strong>Medicine:</Strong> <Strong tone="moss">osmotic laxatives</Strong> — lactulose,
                    glycerol, or macrogol
                  </>,
                  <>
                    <Strong tone="moss">Stool softener</Strong> — docusate
                  </>,
                ]}
              />
            ),
            avoid: (
              <>
                Avoid prolonged use of <Strong tone="alert">stimulant laxatives</Strong> — senna and
                bisacodyl. They pass into the breast milk and cause diarrhoea in the baby.
              </>
            ),
          },
          {
            condition: "Diarrhoea",
            canUse: (
              <BulletList
                items={[
                  "Oral rehydration solution",
                  <Strong key="lop" tone="moss">Loperamide</Strong>,
                  <>
                    <Strong tone="moss">No need to stop breastfeeding</Strong> if having diarrhoea.
                  </>,
                ]}
              />
            ),
            avoid: (
              <Strong tone="alert">
                See a doctor if diarrhoea is profuse or lasts longer than 48 hours.
              </Strong>
            ),
          },
          {
            condition: "Heartburn and GORD",
            canUse: (
              <BulletList
                items={[
                  "Dietary and lifestyle changes: eat small, frequent meals. Avoid rich or spicy meals, chocolate, citrus foods, and coffee. Avoid lying down straight after a meal, and avoid eating late at night.",
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
                    treat haemorrhoids, are safe to use while breastfeeding.
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
        title="Parasites (Worms, Head Lice & Scabies)"
        rows={[
          {
            condition: "Worm infestations",
            canUse: (
              <BulletList
                items={[
                  "Preventative measures",
                  <>
                    <Strong>Medicine, both:</Strong> <Strong tone="moss">Pyrantel</Strong> and{" "}
                    <Strong tone="moss">Mebendazole</Strong>
                  </>,
                ]}
              />
            ),
            avoid: dash,
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
                    <Strong>Medicine:</Strong> <Strong tone="moss">topical permethrin</Strong> (treatment
                    of choice), <Strong tone="moss">dimeticone</Strong>, or{" "}
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
              <BulletList
                items={[
                  <>
                    <Strong tone="moss">Topical permethrin</Strong> (treatment of choice)
                  </>,
                  "Clean the nipple area of any topical product before the baby attaches to feed, then reapply the product to the washed area after feeding.",
                ]}
              />
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
                    <Strong tone="moss">Topical antifungal</Strong> creams and pessaries containing
                    clotrimazole, miconazole, or nystatin
                  </>,
                  <>
                    <Strong tone="moss">Oral fluconazole</Strong> (single dose)
                  </>,
                ]}
              />
            ),
            avoid: dash,
          },
        ]}
      />
    </div>
  );
}
