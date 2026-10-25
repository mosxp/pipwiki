import type { ReactNode } from "react";
import { ZoomImage } from "@/components/counselling/zoom-image";

function Strong({
  children,
  tone = "ink",
}: {
  children: ReactNode;
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

function Subhead({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="scroll-mt-8 rounded-lg border-2 border-moss bg-moss/10 px-4 py-2 text-lg font-bold tracking-tight text-ink"
    >
      {children}
    </h3>
  );
}

function Minor({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h4 id={id} className="scroll-mt-8 text-base font-semibold text-ink">
      {children}
    </h4>
  );
}

function Items({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

type Shot = { src: string; alt: string; caption: string };

function shot(file: string, alt: string, caption: string): Shot {
  return { src: `/otc-notes/oral-antihistamines/${file}`, alt, caption };
}

function ProductThumb({ src, alt, caption }: Shot) {
  return (
    <figure className="w-44">
      <ZoomImage src={src} alt={alt} className="h-auto max-h-36 w-full object-contain" buttonClassName="block w-full" />
      <figcaption className="mt-2 text-xs leading-5 text-ink-soft">{caption}</figcaption>
    </figure>
  );
}

function LabelShot({ src, alt, caption }: Shot) {
  return (
    <figure className="w-56">
      <ZoomImage src={src} alt={alt} className="h-auto w-full object-contain" buttonClassName="block w-full bg-white" />
      <figcaption className="mt-2 text-sm leading-6 text-ink">{caption}</figcaption>
    </figure>
  );
}

function Gallery({ images }: { images: Shot[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <ProductThumb key={image.src} {...image} />
      ))}
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-sm leading-6" style={{ minWidth: "42rem" }}>
        <thead>
          <tr className="bg-moss text-paper-raised">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-medium first:sticky first:left-0 first:z-20 first:bg-moss">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const bg = index % 2 === 1 ? "bg-paper-raised" : "bg-paper";
            return (
              <tr key={index} className={`border-t border-line align-top ${bg}`}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th key={cellIndex} scope="row" className={`sticky left-0 z-10 px-4 py-3 font-medium text-ink ${bg}`}>
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} className="px-4 py-3">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FieldTable({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-sm leading-6" style={{ minWidth: "42rem" }}>
        <tbody>
          {rows.map(([label, value], index) => {
            const bg = index % 2 === 1 ? "bg-paper-raised" : "bg-paper";
            return (
              <tr key={label} className={`border-t border-line align-top first:border-t-0 ${bg}`}>
                <th scope="row" className={`sticky left-0 z-10 w-48 px-4 py-3 font-medium text-ink ${bg}`}>
                  {label}
                </th>
                <td className="px-4 py-3">{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Medicine({
  id,
  title,
  note,
  rows,
}: {
  id: string;
  title: string;
  note?: ReactNode;
  rows: [string, ReactNode][];
}) {
  return (
    <section className="space-y-4">
      <Subhead id={id}>{title}</Subhead>
      {note ? <div className="max-w-3xl space-y-2 text-sm leading-6 text-ink">{note}</div> : null}
      <FieldTable rows={rows} />
    </section>
  );
}

function Products({ children, images }: { children: ReactNode; images: Shot[] }) {
  return (
    <div className="space-y-4">
      <div>{children}</div>
      <Gallery images={images} />
    </div>
  );
}

const sedatingPrecautions = [
  "Bladder outlet obstruction (prostatic hyperplasia)",
  "Gastrointestinal obstruction",
  "Narrow-angle glaucoma",
  "Epilepsy",
  "Elderly",
  "Children",
  "Breastfeeding",
];

const sedatingInteractions = ["Alcohol", "CNS depressants", "Sedatives", "Anticholinergics"];

const sedatingEffects = [
  "Drowsiness",
  "Anticholinergic side effects",
  "Impaired alertness, cognition, coordination, and memory",
  "Paradoxical excitation",
];

const cal1 = shot(
  "image1.jpeg",
  "Cautionary advisory label 1, drowsiness warning",
  "CAL 1. This medicine may cause drowsiness and may increase the effects of alcohol. If affected, do not drive a motor vehicle or operate machinery.",
);

const foodsLabel = shot(
  "image39.jpeg",
  "Label stating certain foods and juices should be avoided",
  "Certain foods and juices should be avoided.",
);

const cal3b = shot(
  "image45.jpg",
  "Cautionary advisory label 3b, take on an empty stomach",
  "CAL 3b. Take on an empty stomach at least half an hour before food or two hours after food.",
);

export function OralAntihistamineNotes() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <Subhead id="indications">Indications overview</Subhead>
        <DataTable
          headers={["Condition", "Medicines"]}
          rows={[
            [
              "Dry irritating cough",
              <Items
                key="cough"
                items={[
                  "Diphenhydramine, in combination cold and flu products and Benadryl Original. 6 years and over.",
                ]}
              />,
            ],
            [
              "Rhinitis in the common cold (over 6 years)",
              <Items
                key="cold"
                items={[
                  "Triprolidine, brompheniramine, chlorpheniramine, and diphenhydramine, in combination cold and flu products.",
                  "Children’s Paedamin. 6 years and over.",
                ]}
              />,
            ],
            [
              "Allergic rhinitis and rash",
              <Items
                key="ar"
                items={[
                  "Dexchlorpheniramine (Polaramine), 2 years and over.",
                  "Cyproheptadine (Periactin), 6 years and over.",
                  "Promethazine (Phenergan), 6 years and over.",
                  "Diphenhydramine, in combination products, 6 years and over.",
                  "Cetirizine, 1 year and over.",
                  "Loratadine, 1 year and over.",
                  "Desloratadine, 1 year and over.",
                  "Fexofenadine, 2 years and over.",
                  "Bilastine, 12 years and over.",
                ]}
              />,
            ],
            [
              "Urticaria",
              <Items
                key="urticaria"
                items={[
                  "Dexchlorpheniramine (Polaramine), 2 years and over.",
                  "Cyproheptadine (Periactin), 6 years and over.",
                  "Promethazine (Phenergan), 6 years and over.",
                  "Cetirizine, 1 year and over.",
                  "Loratadine, 1 year and over.",
                  "Desloratadine, 6 months and over.",
                  "Fexofenadine, 6 months and over.",
                  "Bilastine, 12 years and over.",
                ]}
              />,
            ],
            [
              "Short-term management of insomnia (adult)",
              <Items
                key="insomnia"
                items={[
                  "Doxylamine, 12 years and over.",
                  "Diphenhydramine: Snuzaid tablets, Unisom soft capsules, and with paracetamol as MersynoNight.",
                  "Promethazine (Phenergan).",
                ]}
              />,
            ],
            [
              "Nausea and vomiting",
              <Items
                key="nausea"
                items={[
                  "Promethazine (Phenergan), 6 years and over.",
                  "Doxylamine, for morning sickness in pregnancy.",
                ]}
              />,
            ],
            [
              "Motion sickness",
              <Items
                key="motion"
                items={[
                  "Dimenhydrinate, in combination (TravaCalm), 4 years and over.",
                  "Cyclizine (Nausicalm), 6 years and over.",
                  "Promethazine (Phenergan), 6 years and over.",
                ]}
              />,
            ],
          ]}
        />
      </section>

      <section className="space-y-4">
        <Subhead id="safety">Safety and general precautions</Subhead>
        <p className="max-w-3xl text-sm leading-6 text-ink">
          The precautions below are repeated across the sedating antihistamine profiles. Medicine-specific additions
          stay on each profile.
        </p>
        <Minor id="contraindications">Contraindications and precautions</Minor>
        <Items
          items={[
            <Strong key="bladder" tone="alert">
              Bladder outlet obstruction (prostatic hyperplasia)
            </Strong>,
            <Strong key="gi" tone="alert">
              Gastrointestinal obstruction
            </Strong>,
            <Strong key="glaucoma" tone="alert">
              Narrow-angle glaucoma
            </Strong>,
            <Strong key="epilepsy" tone="alert">
              Epilepsy
            </Strong>,
            <Strong key="elderly" tone="alert">
              Elderly
            </Strong>,
            "Children",
            <Strong key="bf" tone="alert">
              Breastfeeding
            </Strong>,
            "Do not use sedating antihistamines for the symptomatic relief of coughs and colds in children under 6 years. The risk outweighs the benefits, and there is no evidence that they are effective.",
            <Strong key="prom" tone="alert">
              Promethazine is contraindicated in children under 6 years because of its association with sudden infant
              death syndrome and fatal respiratory depression.
            </Strong>,
          ]}
        />
        <Minor id="interactions">Interactions</Minor>
        <Items
          items={[
            <span key="cns">
              <Strong tone="alert">CNS depressants</Strong> (alcohol, sedatives, and opioid analgesics): increased
              sedative effects.
            </span>,
            <span key="ach">
              <Strong tone="alert">Anticholinergics</Strong>.
            </span>,
            <span key="maoi">
              <Strong tone="alert">MAOIs and tricyclic antidepressants</Strong>: anticholinergic effects may be
              prolonged and intensified.
            </span>,
          ]}
        />
        <p className="max-w-3xl text-sm leading-6 text-ink-soft">
          MAOIs are not listed on the triprolidine, brompheniramine, or chlorpheniramine rows. They are added from
          dexchlorpheniramine onward, and tricyclic antidepressants are added on the later sedating profiles. Those
          extras are kept on the individual profiles.
        </p>
        <Minor id="side-effects">Side effects</Minor>
        <Items
          items={[
            "Drowsiness.",
            "Anticholinergic effects: dry mouth, dry eyes, constipation, difficulty urinating, and blurred vision.",
            "Paradoxical excitation: anxiety, nervousness, restlessness, hallucinations, and seizures.",
            "Impaired alertness, cognition, coordination, and memory.",
          ]}
        />
      </section>

      <section className="space-y-8">
        <div className="space-y-4">
          <h2 id="sedating" className="scroll-mt-8 font-serif text-3xl tracking-tight text-ink">
            Sedating antihistamines
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-ink">
            First-generation antihistamines. CAL 1 applies to this group. Triprolidine, brompheniramine, and
            chlorpheniramine are used mostly in cold and flu combinations.
          </p>
          <LabelShot {...cal1} />
        </div>

        <Medicine
          id="triprolidine"
          title="Triprolidine"
          note="Used in combination cold and flu products."
          rows={[
            ["Children", "Cold and flu combination, over 6 years."],
            ["Pregnancy", "In a combination, consider another ingredient."],
            ["Breastfeeding", "Considered safe. Observe the infant for sedation."],
            ["Precautions", <Items key="pc" items={sedatingPrecautions} />],
            ["Interactions", <Items key="di" items={sedatingInteractions} />],
            ["Side effects", <Items key="se" items={sedatingEffects} />],
            ["Counselling", "CAL 1. Can cause anticholinergic effects."],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image2.png",
                    "Codral Original Day and Night box",
                    "Codral Original Day & Night. The pack is printed Controlled Drug C3.",
                  ),
                ]}
              >
                <p>
                  <Strong tone="alert">(S3)</Strong> Codral Original Day &amp; Night. Night tablet: paracetamol 500 mg
                  + pseudoephedrine 30 mg + triprolidine 1.25 mg, for 2 tablets at night. The pack is printed
                  Controlled Drug C3.
                </p>
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="brompheniramine"
          title="Brompheniramine"
          note="Used in combination cold and flu products."
          rows={[
            ["Children", "Cold and flu combination, over 6 years."],
            ["Pregnancy", "A. In a combination, consider another ingredient."],
            ["Breastfeeding", "Occasional doses. Observe the infant for sedation."],
            ["Precautions", <Items key="pc" items={sedatingPrecautions} />],
            ["Interactions", <Items key="di" items={sedatingInteractions} />],
            ["Side effects", <Items key="se" items={[...sedatingEffects, "Blood dyscrasia.", "Cardiac arrhythmia."]} />],
            ["Counselling", "CAL 1. Can cause anticholinergic effects."],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image3.png",
                    "Dimetapp Cold and Allergy Kids oral liquid",
                    "Dimetapp Cold & Allergy Kids, 6 years and over. Brompheniramine maleate 2 mg/5 mL and phenylephrine hydrochloride 5 mg/5 mL. 200 mL. Pharmacy Medicine.",
                  ),
                  shot(
                    "image4.png",
                    "Dimetapp Cold and Allergy Colour Free oral liquid",
                    "Dimetapp Cold & Allergy Colour Free, 6 years and over. Same strengths. 200 mL. Pharmacy Medicine.",
                  ),
                  shot(
                    "image5.png",
                    "Dimetapp Cough and Cold Kids oral liquid",
                    "Dimetapp Cough & Cold Kids, 6 years and over. Brompheniramine maleate 2 mg/5 mL, phenylephrine hydrochloride 5 mg/5 mL, and dextromethorphan hydrobromide monohydrate 10 mg/5 mL. 200 mL. Pharmacy Medicine.",
                  ),
                  shot(
                    "image6.png",
                    "Dimetapp Cough and Cold Colour Free oral liquid",
                    "Dimetapp Cough & Cold Colour Free, 6 years and over. Same strengths. 200 mL. Pharmacy Medicine.",
                  ),
                  shot(
                    "image7.png",
                    "Demazin Kids 6+ cough and cold relief syrup",
                    "Demazin Kids 6+ Cough + Cold. Brompheniramine, phenylephrine, and dextromethorphan. 200 mL grape syrup. Pharmacy Medicine.",
                  ),
                ]}
              >
                <Items
                  items={[
                    "Dimetapp Cold & Allergy Kids, 6 years and over. Brompheniramine 2 mg/5 mL + phenylephrine 5 mg/5 mL. Grape and colour-free packs.",
                    "Dimetapp Cough & Cold Kids, 6 years and over, and Demazin Kids 6+ Cough + Cold. Brompheniramine 2 mg/5 mL + phenylephrine 5 mg/5 mL + dextromethorphan 10 mg/5 mL.",
                  ]}
                />
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="chlorpheniramine"
          title="Chlorpheniramine"
          note="Used in combination cold and flu products. The packs are printed chlorphenamine."
          rows={[
            ["Children", "Cold and flu combination, over 6 years."],
            ["Pregnancy", "A. In a combination, consider another ingredient."],
            ["Breastfeeding", "Short-term or intermittent dose. Observe the infant for sedation."],
            ["Precautions", <Items key="pc" items={sedatingPrecautions} />],
            ["Interactions", <Items key="di" items={sedatingInteractions} />],
            ["Side effects", <Items key="se" items={sedatingEffects} />],
            ["Counselling", "CAL 1. Can cause anticholinergic effects."],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image8.png",
                    "Demazin Original 6 hour relief tablets",
                    "Demazin Original 6 hour relief. Pseudoephedrine and chlorphenamine. 12 tablets. Pharmacist Only.",
                  ),
                  shot(
                    "image9.png",
                    "Demazin Kids 6+ cold relief syrup",
                    "Demazin Kids 6+ Cold Relief. Chlorphenamine maleate 1.25 mg/5 mL and phenylephrine hydrochloride 2.5 mg/5 mL. 200 mL. Pharmacy Medicine.",
                  ),
                  shot(
                    "image10.png",
                    "Codral Night tablets",
                    "Codral Night. Paracetamol 500 mg, phenylephrine hydrochloride 5 mg, and chlorphenamine maleate 2 mg. 24 tablets. Pharmacy Medicine.",
                  ),
                  shot(
                    "image11.png",
                    "Sudafed PE Sinus plus Allergy and Pain Relief tablets",
                    "Sudafed PE Sinus + Allergy & Pain Relief. Paracetamol 500 mg, phenylephrine hydrochloride 5 mg, and chlorphenamine maleate 2 mg. 24 tablets. Pharmacy Medicine.",
                  ),
                  shot(
                    "image12.png",
                    "Demazin Cold and Flu Day and Night tablets",
                    "Demazin Cold + Flu Day & Night. 32 day tablets and 16 night tablets. Pharmacy Medicine.",
                  ),
                  shot(
                    "image13.png",
                    "Dimetapp Cough, Cold and Flu Day and Night capsules",
                    "Dimetapp Cough, Cold & Flu Day & Night. Night capsules contain paracetamol 500 mg, dextromethorphan hydrobromide monohydrate 10 mg, and chlorphenamine maleate 2 mg. 12 night capsules. Pharmacy Medicine.",
                  ),
                ]}
              >
                <Items
                  items={[
                    <span key="demazin">
                      <Strong tone="alert">(S3)</Strong> Demazin Original 6 hour relief. Chlorpheniramine 4 mg +
                      pseudoephedrine 60 mg. 12 years and over. 12 tablets. Pharmacist Only.
                    </span>,
                    "Demazin Kids 6+ Cold Relief. Chlorphenamine maleate 1.25 mg/5 mL on the pack + phenylephrine 2.5 mg/5 mL. 6 years and over. The source cell wrote chlorpheniramine 1.2 mg/5 mL.",
                    "Other night tablets in cold and flu products: Codral Night, Sudafed PE Sinus + Allergy & Pain Relief, Demazin Cold + Flu Day & Night, and Dimetapp Cough, Cold & Flu Day & Night.",
                  ]}
                />
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="dexchlorpheniramine"
          title="Dexchlorpheniramine (Polaramine)"
          rows={[
            ["Children", "Over 2 years."],
            ["Pregnancy", "A. Safe."],
            ["Breastfeeding", "Occasional doses. Observe the infant for sedation."],
            ["Precautions", <Items key="pc" items={sedatingPrecautions} />],
            ["Interactions", <Items key="di" items={[...sedatingInteractions, "MAOIs."]} />],
            ["Side effects", <Items key="se" items={sedatingEffects} />],
            ["Counselling", "CAL 1. Can cause anticholinergic effects."],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image14.png",
                    "Polaramine 2 mg, 20 tablets",
                    "Polaramine tablets, dexchlorpheniramine maleate 2 mg. 20 tablets. Pharmacist Only. Colour free.",
                  ),
                  shot(
                    "image15.png",
                    "Polaramine 2 mg, 40 tablets",
                    "Polaramine tablets, dexchlorpheniramine maleate 2 mg. 40 tablets. Pharmacist Only. Colour free.",
                  ),
                  shot(
                    "image16.png",
                    "Polaramine syrup 2 mg per 5 mL",
                    "Polaramine syrup, dexchlorpheniramine maleate 2 mg/5 mL. 100 mL. 2 years to adult. Pharmacist Only.",
                  ),
                ]}
              >
                <Items
                  items={[
                    <span key="tabs20">
                      Polaramine tablets, dexchlorpheniramine maleate 2 mg. 20 tablets, <Strong tone="alert">S3</Strong>
                      .
                    </span>,
                    <span key="tabs40">
                      Polaramine tablets, dexchlorpheniramine maleate 2 mg. 40 tablets, <Strong tone="alert">S3</Strong>
                      .
                    </span>,
                    <span key="syrup">
                      Polaramine syrup, dexchlorpheniramine maleate 2 mg/5 mL. 100 mL, <Strong tone="alert">S3</Strong>
                      . 2 years and over.
                    </span>,
                  ]}
                />
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="cyproheptadine"
          title="Cyproheptadine (Periactin)"
          note={
            <p>
              Anti-serotonin activity. Other indications in the source: relieve migraines and vascular headaches, and
              serotonin toxicity. May increase appetite and cause weight gain.
            </p>
          }
          rows={[
            ["Children", "Over 6 years."],
            ["Pregnancy", "A. Safe."],
            ["Breastfeeding", "Not recommended."],
            ["Precautions", <Items key="pc" items={sedatingPrecautions} />],
            ["Interactions", <Items key="di" items={[...sedatingInteractions, "MAOIs.", "SSRIs."]} />],
            [
              "Side effects",
              <Items
                key="se"
                items={[
                  ...sedatingEffects,
                  "May increase appetite and weight gain.",
                  "Blood dyscrasia.",
                  "Cardiac arrhythmia.",
                  "Allergic reaction.",
                  "Hepatic impairment.",
                ]}
              />,
            ],
            ["Counselling", "CAL 1. Can cause anticholinergic effects."],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image17.png",
                    "Periactin 4 mg tablets",
                    "Periactin. Cyproheptadine hydrochloride (as sesquihydrate) 4 mg. 100 tablets. Pharmacist Only.",
                  ),
                ]}
              >
                <p>
                  Periactin tablets, cyproheptadine hydrochloride (as sesquihydrate) 4 mg. 100 tablets,{" "}
                  <Strong tone="alert">S3</Strong>. 6 years and over. Pharmacist Only.
                </p>
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="promethazine"
          title="Promethazine (Phenergan)"
          note={
            <>
              <p>Alpha-blocking and antidopaminergic activity.</p>
              <p>Other indications: sedation, nausea and vomiting, and motion sickness.</p>
              <p>
                <Strong tone="alert">
                  Contraindicated in children under 6 years because of its association with sudden infant death
                  syndrome and fatal respiratory depression.
                </Strong>
              </p>
            </>
          }
          rows={[
            ["Children", "Over 6 years."],
            ["Pregnancy", "C. Consider an alternative, especially near term."],
            [
              "Breastfeeding",
              "Short-term or intermittent dose. Monitor the infant for sedation and irritability. Take after breastfeeding if possible.",
            ],
            [
              "Precautions",
              <Items
                key="pc"
                items={[
                  ...sedatingPrecautions,
                  "Pregnancy.",
                  "Respiratory depression.",
                  "Parkinson’s disease (anti-dopamine).",
                  "Hepatic impairment.",
                ]}
              />,
            ],
            [
              "Interactions",
              <Items
                key="di"
                items={[
                  ...sedatingInteractions,
                  "MAOIs.",
                  "Tricyclic antidepressants (L16).",
                  "Dopamine agonists.",
                  "QT-prolonging drugs.",
                  "Drugs that lower the seizure threshold.",
                ]}
              />,
            ],
            [
              "Side effects",
              <Items
                key="se"
                items={[
                  ...sedatingEffects,
                  "May cause dizziness (L16).",
                  "Restlessness (anti-dopamine).",
                  "Diarrhoea.",
                  "Jaundice.",
                  "Blood dyscrasia.",
                  "Tachycardia.",
                  "Bradycardia.",
                  "Seizures.",
                  "Hypersensitivity reactions.",
                  "Neuroleptic malignant syndrome.",
                ]}
              />,
            ],
            [
              "Counselling",
              "CAL 1. Can cause anticholinergic effects. Drowsiness may continue the following day because of the long half-life. For insomnia, do not use for more than 10 consecutive nights.",
            ],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image18.png",
                    "Phenergan 25 mg tablets",
                    "Phenergan 25 mg, promethazine hydrochloride. 50 tablets. Pharmacist Only.",
                  ),
                  shot(
                    "image19.png",
                    "Phenergan 10 mg tablets",
                    "Phenergan 10 mg. 50 tablets. Pharmacist Only.",
                  ),
                  shot(
                    "image20.png",
                    "Phenergan elixir 5 mg per 5 mL",
                    "Phenergan elixir, 5 mg/5 mL. 100 mL. Alcohol free and sugar free. Pharmacist Only.",
                  ),
                ]}
              >
                <Items
                  items={[
                    <span key="25">
                      Phenergan 25 mg, promethazine hydrochloride. 50 tablets, <Strong tone="alert">S3</Strong>.
                    </span>,
                    <span key="10">
                      Phenergan 10 mg. 50 tablets, <Strong tone="alert">S3</Strong>.
                    </span>,
                    <span key="elixir">
                      Phenergan elixir, 5 mg/5 mL. 100 mL, <Strong tone="alert">S3</Strong>. 6 years and over. Alcohol
                      free and sugar free.
                    </span>,
                  ]}
                />
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="diphenhydramine"
          title="Diphenhydramine"
          note="Snuzaid, Unisom, and the paracetamol combination MersynoNight, plus Children’s Paedamin and Benadryl Original."
          rows={[
            ["Children", "Over 6 years."],
            ["Pregnancy", "A. Safe. In a combination, consider another ingredient."],
            ["Breastfeeding", "Short-term or intermittent dose. Observe the infant for sedation."],
            [
              "Precautions",
              <Items
                key="pc"
                items={[...sedatingPrecautions, "Cognitive impairment.", "Renal impairment.", "Hepatic impairment."]}
              />,
            ],
            [
              "Interactions",
              <Items key="di" items={[...sedatingInteractions, "MAOIs.", "Tricyclic antidepressants (L16)."]} />,
            ],
            [
              "Side effects",
              <Items
                key="se"
                items={[...sedatingEffects, "Nightmares.", "Dizziness (L16).", "Headache.", "Muscle weakness."]}
              />,
            ],
            [
              "Counselling",
              "CAL 1. Can cause anticholinergic effects. For insomnia, do not use for more than 10 consecutive nights.",
            ],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image21.png",
                    "Snuzaid 50 mg tablets",
                    "Snuzaid Tabs. Diphenhydramine hydrochloride 50 mg. 10 tablets. Pharmacist Only.",
                  ),
                  shot(
                    "image22.png",
                    "Unisom SleepGels 50 mg soft capsules",
                    "Unisom SleepGels. Diphenhydramine hydrochloride 50 mg. 10 soft capsules. Pharmacist Only.",
                  ),
                  shot(
                    "image23.png",
                    "MersynoNight tablets",
                    "MersynoNight. Paracetamol 500 mg and diphenhydramine hydrochloride 25 mg. 20 tablets. Pharmacist Only.",
                  ),
                  shot(
                    "image24.png",
                    "Children's Paedamin oral liquid",
                    "Children’s Paedamin. Diphenhydramine hydrochloride 2.5 mg/mL and phenylephrine hydrochloride 500 microgram/mL. 6–12 years. 200 mL. Pharmacy Medicine.",
                  ),
                  shot(
                    "image25.png",
                    "Benadryl Original oral liquid",
                    "Benadryl Original. Diphenhydramine hydrochloride 12.5 mg/5 mL and ammonium chloride 125 mg/5 mL. 200 mL. Pharmacist Only.",
                  ),
                ]}
              >
                <Items
                  items={[
                    <span key="snuzaid">
                      Snuzaid tablets, diphenhydramine hydrochloride 50 mg. 10 tablets, <Strong tone="alert">S3</Strong>.
                    </span>,
                    <span key="unisom">
                      Unisom SleepGels, diphenhydramine hydrochloride 50 mg. 10 soft capsules,{" "}
                      <Strong tone="alert">S3</Strong>.
                    </span>,
                    <span key="mersyno">
                      MersynoNight, diphenhydramine hydrochloride 25 mg + paracetamol 500 mg. 20 tablets,{" "}
                      <Strong tone="alert">S3</Strong>.
                    </span>,
                    "Children’s Paedamin Decongestant and Antihistamine. Diphenhydramine hydrochloride 12.5 mg/5 mL + phenylephrine hydrochloride 2.5 mg/5 mL. 6 years and over. The pictured pack is labelled 6–12 years, 200 mL, Pharmacy Medicine.",
                    <span key="benadryl">
                      Benadryl Original, <Strong tone="alert">(S3)</Strong>. Diphenhydramine hydrochloride 12.5 mg/5 mL
                      + ammonium chloride 125 mg/5 mL. 200 mL.
                    </span>,
                  ]}
                />
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="doxylamine"
          title="Doxylamine (Restavit, Dozile)"
          note="Also listed for morning sickness in pregnancy."
          rows={[
            ["Children", "Over 12 years."],
            ["Pregnancy", "A. Safe."],
            ["Breastfeeding", "Short-term use is considered safe. Monitor the infant for sedation or irritability."],
            [
              "Precautions",
              <Items
                key="pc"
                items={[
                  "Bladder outlet obstruction (prostatic hyperplasia).",
                  "Gastrointestinal obstruction.",
                  "Narrow-angle glaucoma.",
                  "Epilepsy.",
                  "Elderly.",
                  "Children under 12 years.",
                  "Breastfeeding.",
                  "Renal impairment.",
                  "Hepatic impairment.",
                ]}
              />,
            ],
            [
              "Interactions",
              <Items key="di" items={[...sedatingInteractions, "MAOIs.", "Tricyclic antidepressants (L16)."]} />,
            ],
            ["Side effects", <Items key="se" items={[...sedatingEffects, "Dizziness (L16).", "Headache."]} />],
            [
              "Counselling",
              "CAL 1. Can cause anticholinergic effects. For insomnia, do not use for more than 10 consecutive nights.",
            ],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image26.png",
                    "Restavit 25 mg tablets",
                    "Restavit. Doxylamine succinate 25 mg. 20 tablets. Contains lactose. Pharmacist Only.",
                  ),
                  shot(
                    "image27.png",
                    "Dozile 25 mg tablets",
                    "Dozile tablets. Doxylamine succinate 25 mg. 20 tablets. Pharmacist Only.",
                  ),
                ]}
              >
                <p>
                  Restavit tablets and Dozile tablets, doxylamine succinate 25 mg. 20 tablets,{" "}
                  <Strong tone="alert">S3</Strong>. Restavit contains lactose.
                </p>
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="dimenhydrinate"
          title="Dimenhydrinate (TravaCalm)"
          note="Motion sickness, in combination."
          rows={[
            ["Children", "Over 2 years. Over 4 years in a combination."],
            ["Pregnancy", "B2, in a combination. Precaution."],
            ["Breastfeeding", "?"],
            [
              "Precautions",
              <Items key="pc" items={[...sedatingPrecautions, "Pregnancy.", "Breastfeeding."]} />,
            ],
            ["Interactions", <Items key="di" items={sedatingInteractions} />],
            ["Side effects", <Items key="se" items={sedatingEffects} />],
            ["Counselling", "CAL 1. Can cause anticholinergic effects."],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image28.png",
                    "TravaCalm Original tablets",
                    "TravaCalm Original. Hyoscine hydrobromide 200 micrograms, dimenhydrinate 50 mg, and caffeine 20 mg. 10 tablets. Pharmacy Medicine.",
                  ),
                ]}
              >
                <p>
                  TravaCalm Original. Hyoscine hydrobromide 200 microgram + dimenhydrinate 50 mg + caffeine 20 mg. 10
                  tablets, <Strong tone="moss">S2</Strong>. 4 years and over.
                </p>
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="cyclizine"
          title="Cyclizine (Nausicalm)"
          note="Nausea, vomiting, and motion sickness."
          rows={[
            ["Children", "Over 6 years."],
            ["Pregnancy", "B3. Precaution."],
            ["Breastfeeding", "?"],
            ["Precautions", <Items key="pc" items={[...sedatingPrecautions, "Pregnancy.", "Heart failure."]} />],
            ["Interactions", <Items key="di" items={sedatingInteractions} />],
            ["Side effects", <Items key="se" items={[...sedatingEffects, "Tachycardia.", "Hypertension."]} />],
            ["Counselling", "CAL 1. Can cause anticholinergic effects."],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image29.png",
                    "Nausicalm 50 mg tablets",
                    "Nausicalm. Cyclizine hydrochloride 50 mg. 6 tablets. Pharmacist Only.",
                  ),
                ]}
              >
                <p>
                  Nausicalm, cyclizine hydrochloride 50 mg. 6 tablets, <Strong tone="alert">S3</Strong>. Pharmacist
                  Only.
                </p>
              </Products>,
            ],
          ]}
        />
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 id="less-sedating" className="scroll-mt-8 font-serif text-3xl tracking-tight text-ink">
            Less-sedating antihistamines
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-ink">
            Second-generation antihistamines. Loratadine is pregnancy category B1, and the source calls it the
            less-sedating antihistamine of choice in pregnancy, but sedating antihistamines are preferred.
          </p>
        </div>

        <Medicine
          id="cetirizine"
          title="Cetirizine"
          note="Active metabolite of hydroxyzine. Sedation is more likely with cetirizine than with the other less-sedating antihistamines."
          rows={[
            ["Children", "Over 1 year."],
            ["Pregnancy", "B2. Considered safe."],
            ["Breastfeeding", "Considered safe. Observe the infant for sedation."],
            ["Precautions", <Items key="pc" items={["Elderly.", "Renal impairment."]} />],
            ["Interactions", "None listed."],
            ["Side effects", "Sedation, more likely with cetirizine."],
            [
              "Counselling",
              <div key="cal" className="space-y-3">
                <p>CAL 1. SUSMP Appendix K, including hydroxyzine, cetirizine, and levocetirizine.</p>
                <LabelShot {...cal1} />
              </div>,
            ],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image30.png",
                    "Zyrtec cetirizine tablets",
                    "Zyrtec tablets, cetirizine. 10 mini tablets.",
                  ),
                  shot(
                    "image31.png",
                    "Zyrtec Kids mini chewable tablets",
                    "Zyrtec Kids mini chewables, cetirizine. 30 mini tablets. 6 years and over. Pharmacy Medicine.",
                  ),
                  shot(
                    "image32.png",
                    "Zyrtec Kids sugar-free oral liquid",
                    "Zyrtec Kids sugar-free oral liquid.",
                  ),
                ]}
              >
                <Items
                  items={[
                    "Zyrtec tablets, cetirizine 10 mg.",
                    "Zyrtec Kids mini chewables, cetirizine 5 mg. 6 years and over.",
                    "Zyrtec sugar-free oral liquid, cetirizine 5 mg/5 mL. 1 year and over.",
                  ]}
                />
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="loratadine"
          title="Loratadine"
          rows={[
            ["Children", "Over 1 year."],
            [
              "Pregnancy",
              "B1. Considered safe. Less-sedating antihistamine of choice in pregnancy, but sedating antihistamines are preferred.",
            ],
            ["Breastfeeding", "Considered safe. Preferred over other less-sedating antihistamines."],
            ["Precautions", "Hepatic impairment."],
            ["Interactions", "None listed."],
            ["Side effects", "Well tolerated."],
            ["Counselling", "None listed."],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image33.png",
                    "Claratyne 10 mg tablets",
                    "Claratyne tablets, loratadine 10 mg. 10 tablets. Pack labelled 12 years to adult.",
                  ),
                  shot(
                    "image34.png",
                    "Children's Claratyne 5 mg chewable tablets",
                    "Children’s Claratyne chewable tablets, loratadine 5 mg. 50 chewable tablets. 2 years to adult. Pharmacy Medicine.",
                  ),
                  shot(
                    "image35.png",
                    "Children's Claratyne syrup 5 mg per 5 mL",
                    "Children’s Claratyne syrup, loratadine 5 mg/5 mL. Pictured pack: 1–12 years, 150 mL.",
                  ),
                  shot(
                    "image36.png",
                    "Claratyne-D 12 hour tablets",
                    "Claratyne-D 12 Hour with decongestant. Pharmacist Only.",
                  ),
                ]}
              >
                <Items
                  items={[
                    "Claratyne tablets, loratadine 10 mg. The pictured pack is labelled 12 years to adult, 10 tablets.",
                    "Children’s Claratyne chewable tablets, loratadine 5 mg. 2 years and over. 50 chewable tablets. Pharmacy Medicine.",
                    "Children’s Claratyne syrup, loratadine 5 mg/5 mL. 1 year and over in the source table. The pictured pack is labelled 1–12 years, 150 mL.",
                    <span key="d">
                      Claratyne-D with Decongestant 12 Hour, modified release, twice daily. Loratadine 5 mg +
                      pseudoephedrine 120 mg. 6 tablets, <Strong tone="alert">S3</Strong>.
                    </span>,
                  ]}
                />
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="desloratadine"
          title="Desloratadine"
          note="Major active metabolite of loratadine."
          rows={[
            ["Children", "Over 1 year. Over 6 months for urticaria."],
            [
              "Pregnancy",
              "B1. Consider an alternative in the first trimester. Considered safe during the second and third trimesters.",
            ],
            ["Breastfeeding", "Considered safe."],
            ["Precautions", "Pregnancy."],
            ["Interactions", "None listed."],
            ["Side effects", "Well tolerated."],
            ["Counselling", "None listed."],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image37.png",
                    "Desonex 5 mg tablets",
                    "Desonex, desloratadine 5 mg. 20 tablets. Pharmacy Medicine.",
                  ),
                  shot(
                    "image38.png",
                    "Children's ClaratyneDES syrup",
                    "Children’s ClaratyneDES, desloratadine 2.5 mg/5 mL. 1 year and over for hayfever and allergies. 6 months and over for hives. 100 mL.",
                  ),
                ]}
              >
                <Items
                  items={[
                    "Desonex tablets, desloratadine 5 mg. 20 tablets. Pharmacy Medicine.",
                    "ClaratyneDES syrup, desloratadine 2.5 mg/5 mL. 1 year and over. The pictured pack also states 6 months and over for hives, 100 mL.",
                  ]}
                />
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="fexofenadine"
          title="Fexofenadine"
          note="Antacids, grapefruit juice, and the foods-and-juices label apply to this medicine."
          rows={[
            ["Children", "Over 2 years. Over 6 months for urticaria."],
            [
              "Pregnancy",
              "B2. Consider an alternative in the first trimester. Considered safe during the second and third trimesters.",
            ],
            ["Breastfeeding", "Considered safe."],
            ["Precautions", <Items key="pc" items={["Pregnancy.", "Renal impairment."]} />],
            ["Interactions", "Antacids."],
            ["Side effects", "Well tolerated."],
            [
              "Counselling",
              <div key="cal" className="space-y-3">
                <LabelShot {...foodsLabel} />
                <Items
                  items={[
                    "If grapefruit juice is drunk within 4 hours of taking fexofenadine, the medicine may not work as well.",
                    "A fatty meal may interfere with absorption of the oral liquid.",
                  ]}
                />
              </div>,
            ],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image40.png",
                    "Telfast 180 mg tablets",
                    "Telfast 180 mg, fexofenadine hydrochloride. 10 tablets.",
                  ),
                  shot(
                    "image41.png",
                    "Telfast 120 mg tablets",
                    "Telfast 120 mg, fexofenadine hydrochloride. 10 tablets. Pharmacy Medicine.",
                  ),
                  shot(
                    "image42.png",
                    "Telfast 60 mg tablets",
                    "Telfast 60 mg, fexofenadine hydrochloride. 20 tablets. 12 hour relief.",
                  ),
                  shot(
                    "image43.png",
                    "Telfast 30 mg mini tablets",
                    "Telfast 30 mg mini tablets, fexofenadine hydrochloride. 6–11 years. 30 mini tablets. Pharmacy Medicine.",
                  ),
                  shot(
                    "image44.png",
                    "Telfast oral liquid 30 mg per 5 mL",
                    "Telfast oral liquid, fexofenadine hydrochloride 30 mg/5 mL. 6 months and over for hives. 2 years and over for hayfever. 150 mL. Pharmacy Medicine.",
                  ),
                ]}
              >
                <Items
                  items={[
                    "Telfast 180 mg, once daily. The 180 mg tablet can be used for allergic rhinitis and urticaria.",
                    "Telfast 120 mg, once daily. The 120 mg tablet is only for allergic rhinitis.",
                    "Telfast 60 mg, twice daily.",
                    "Telfast 30 mg mini tablets, 6 years and over. The pictured pack is labelled 6–11 years.",
                    "Telfast oral liquid, 30 mg/5 mL, 2 years and over. The pictured pack also states 6 months and over for hives.",
                  ]}
                />
              </Products>,
            ],
          ]}
        />

        <Medicine
          id="bilastine"
          title="Bilastine (Allertine)"
          rows={[
            ["Children", "Over the counter: over 12 years. Prescription: under 6 years."],
            ["Pregnancy", "B3. Consider an alternative."],
            ["Breastfeeding", "Consider an alternative."],
            ["Precautions", <Items key="pc" items={["Pregnancy.", "Breastfeeding."]} />],
            ["Interactions", "None listed in the interaction cell."],
            ["Side effects", "Well tolerated."],
            [
              "Counselling",
              <div key="cal" className="space-y-3">
                <LabelShot {...cal3b} />
                <p>
                  Fruit juice interaction. Take on an empty stomach, at least 1 hour before or 2 hours after meals or
                  fruit juices.
                </p>
              </div>,
            ],
            [
              "Products",
              <Products
                key="products"
                images={[
                  shot(
                    "image46.png",
                    "Allertine 20 mg tablets",
                    "Allertine, bilastine 20 mg. 10 tablets. Pharmacy Medicine.",
                  ),
                ]}
              >
                <p>
                  Allertine, bilastine 20 mg tablets, <Strong tone="moss">S2</Strong>. The pictured pack contains 10
                  tablets.
                </p>
              </Products>,
            ],
          ]}
        />
      </section>
    </div>
  );
}
