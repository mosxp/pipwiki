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

function Note({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-6 text-ink-soft">{children}</p>;
}

function Lines({ items }: { items: ReactNode[] }) {
  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}

type Shot = { src: string; alt: string; caption: string };

function shot(file: string, alt: string, caption: string): Shot {
  return { src: `/otc-notes/cold-and-flu/${file}`, alt, caption };
}

function ProductThumb({ src, alt, caption }: Shot) {
  return (
    <figure className="w-44">
      <ZoomImage src={src} alt={alt} className="h-auto max-h-36 w-full object-contain" buttonClassName="block w-full" />
      <figcaption className="mt-2 text-xs leading-5 text-ink-soft">{caption}</figcaption>
    </figure>
  );
}

type Column = {
  key: string;
  title: ReactNode;
  images: Shot[];
  cells: ReactNode[];
};

function Matrix({
  label,
  products,
  rows,
}: {
  label: string;
  products: Column[];
  rows: string[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table
        className="w-full border-collapse text-left text-sm leading-6"
        style={{ minWidth: `${Math.max(42, (products.length + 1) * 16)}rem` }}
      >
        <thead>
          <tr className="bg-moss text-paper-raised">
            <th className="sticky left-0 z-20 bg-moss px-4 py-3 font-medium">{label}</th>
            {products.map((product) => (
              <th key={product.key} className="min-w-64 px-4 py-3 align-bottom font-medium">
                {product.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-line bg-paper align-top">
            <th scope="row" className="sticky left-0 z-10 bg-paper px-4 py-3 font-medium text-ink">
              Product
            </th>
            {products.map((product) => (
              <td key={product.key} className="px-4 py-3">
                <div className="flex flex-col gap-4">
                  {product.images.map((image) => (
                    <ProductThumb key={image.src} {...image} />
                  ))}
                </div>
              </td>
            ))}
          </tr>
          {rows.map((rowLabel, rowIndex) => {
            const bg = rowIndex % 2 === 1 ? "bg-paper" : "bg-paper-raised";
            return (
              <tr key={rowLabel} className={`border-t border-line align-top ${bg}`}>
                <th scope="row" className={`sticky left-0 z-10 px-4 py-3 font-medium text-ink ${bg}`}>
                  {rowLabel}
                </th>
                {products.map((product) => (
                  <td key={product.key} className="px-4 py-3">
                    {product.cells[rowIndex]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const s3 = <Strong tone="alert">S3</Strong>;
const s2 = <Strong tone="moss">S2</Strong>;
const dash = "—";
const twelve = "12 years and over";

const coldRows = [
  "Antipyretic / analgesic",
  "Decongestant",
  "Antihistamine",
  "Medicine for cough",
  "Adult dose",
  "Children",
];

const liquidRows = ["Mucolytic", "Expectorant", "Cough suppressant", "Other", "Adult dose", "Children"];

const pseudoDayNight =
  "Day tablet: 2 tablets, twice. Night tablet: 2 tablets at night. Time between each dose every 4–6 hours. Maximum of 6 day and 2 night tablets in 24 hours.";
const pseudoDayNightCough =
  "Day tablet: 2 tablets, twice. Night tablet: 2 tablets at night. Time between each dose every 4–6 hours. Maximum of 6 day and 2 night capsules in 24 hours.";
const peDayNight =
  "2 day tablets every 4–6 hours. 2 night tablets at night. Time between each dose every 4–6 hours. Maximum of 6 day and 2 night capsules in 24 hours.";

export function ColdAndFluNotes() {
  return (
    <div className="space-y-10">
      <Note>
        Chlorphenamine is abbreviated CPM in the source tables, and brompheniramine is abbreviated BPM. Strengths and
        doses below are the amounts given in the source. S3 marks a Pharmacist Only medicine in that source, or a pack
        printed as Pharmacist Only Medicine. S2 marks a pack printed as Pharmacy Medicine.
      </Note>

      <section className="space-y-4">
        <Subhead id="allergic">Allergic with decongestant</Subhead>
        <Matrix
          label="Pseudoephedrine + loratadine"
          rows={coldRows}
          products={[
            {
              key: "claratyne",
              title: (
                <>
                  {s3} Claratyne-D with Decongestant 12 Hour MR
                </>
              ),
              images: [
                shot(
                  "image1.png",
                  "Claratyne-D with Decongestant 12 Hour modified-release tablets",
                  "6 tablets. Pharmacist Only Medicine.",
                ),
              ],
              cells: [
                dash,
                "Pseudoephedrine 120 mg",
                "Loratadine 5 mg",
                dash,
                "1 tablet every 12 hours as required",
                twelve,
              ],
            },
          ]}
        />
      </section>

      <section className="space-y-4">
        <Subhead id="pseudoephedrine">Cold and flu with decongestant: pseudoephedrine</Subhead>
        <Matrix
          label="Ingredient"
          rows={coldRows}
          products={[
            {
              key: "sudafed",
              title: (
                <>
                  {s3} Sudafed Sinus and Nasal Decongestant
                </>
              ),
              images: [shot("image2.png", "Sudafed Sinus and Nasal Decongestant 12 tablets", "Pseudoephedrine hydrochloride 60 mg. 12 tablets.")],
              cells: [dash, "Pseudoephedrine 60 mg", dash, dash, "1 tablet 3–4 times a day. Maximum 4 tablets.", twelve],
            },
            {
              key: "demazin-original",
              title: (
                <>
                  {s3} Demazin Original 6 hour relief
                </>
              ),
              images: [shot("image3.png", "Demazin Original 6 hour relief 12 tablets", "Pseudoephedrine and chlorphenamine. 12 tablets.")],
              cells: [dash, "Pseudoephedrine 60 mg", "Chlorphenamine 4 mg", dash, "1 tablet every 6 hours", twelve],
            },
            {
              key: "codral-original",
              title: (
                <>
                  {s3} Codral Original Cold &amp; Flu
                </>
              ),
              images: [shot("image4.png", "Codral Original Cold and Flu 24 tablets", "Paracetamol 500 mg and pseudoephedrine hydrochloride 30 mg. 24 tablets.")],
              cells: [
                "Paracetamol 500 mg",
                "Pseudoephedrine 30 mg",
                dash,
                dash,
                "2 tablets every 4–6 hours. Maximum 8 tablets.",
                twelve,
              ],
            },
            {
              key: "codral-dn-day",
              title: (
                <>
                  {s3} Codral Original Day &amp; Night — day tablet
                </>
              ),
              images: [shot("image5.png", "Codral Original Day and Night Cold and Flu", "Day and night tablets in one pack.")],
              cells: ["Paracetamol 500 mg", "Pseudoephedrine 30 mg", dash, dash, pseudoDayNight, twelve],
            },
            {
              key: "codral-dn-night",
              title: (
                <>
                  {s3} Codral Original Day &amp; Night — night tablet
                </>
              ),
              images: [shot("image5.png", "Codral Original Day and Night Cold and Flu night tablets", "Same pack as the day tablet.")],
              cells: ["Paracetamol 500 mg", "Pseudoephedrine 30 mg", "Triprolidine 1.25 mg", dash, pseudoDayNight, twelve],
            },
            {
              key: "codral-dnc-day",
              title: (
                <>
                  {s3} Codral Original Day &amp; Night + Dry Cough — day capsule
                </>
              ),
              images: [shot("image6.png", "Codral Original Cold and Flu plus Cough day and night capsules", "18 day capsules and 6 night capsules.")],
              cells: ["Paracetamol 500 mg", "Pseudoephedrine 30 mg", dash, "Dextromethorphan 10 mg", pseudoDayNightCough, twelve],
            },
            {
              key: "codral-dnc-night",
              title: (
                <>
                  {s3} Codral Original Day &amp; Night + Dry Cough — night capsule
                </>
              ),
              images: [shot("image6.png", "Codral Original Cold and Flu plus Cough night capsules", "Same pack as the day capsule.")],
              cells: ["Paracetamol 500 mg", dash, "Chlorphenamine 2 mg", "Dextromethorphan 10 mg", pseudoDayNightCough, twelve],
            },
          ]}
        />
      </section>

      <section className="space-y-4">
        <Subhead id="phenylephrine">Cold and flu with decongestant: phenylephrine</Subhead>
        <Matrix
          label="Ingredient"
          rows={coldRows}
          products={[
            {
              key: "pe-nasal",
              title: "Sudafed PE Nasal Decongestant / Demazin Nasal Decongestant",
              images: [
                shot("image7.png", "Sudafed PE Nasal Decongestant 48 tablets", "S2. Phenylephrine hydrochloride 10 mg. 48 tablets."),
                shot("image8.png", "Demazin nasal decongestant 24 tablets", "Phenylephrine. 24 tablets."),
              ],
              cells: [dash, "Phenylephrine 10 mg", dash, dash, "1 tablet every 4 hours. Maximum 6 tablets.", twelve],
            },
            {
              key: "ibu-pe",
              title: "Sudafed PE Sinus + Anti-inflammatory Pain Relief / Nurofen Cold & Flu",
              images: [
                shot("image9.png", "Sudafed PE Sinus plus Anti-inflammatory Pain Relief 24 tablets", "S2. Ibuprofen 200 mg and phenylephrine hydrochloride 5 mg. 24 tablets."),
                shot("image10.png", "Nurofen Cold and Flu 24 tablets", "Ibuprofen 200 mg and phenylephrine hydrochloride 5 mg. 24 tablets."),
              ],
              cells: [
                "Ibuprofen 200 mg",
                "Phenylephrine 5 mg",
                dash,
                dash,
                "2 tablets with food every 4–6 hours. Maximum 6 tablets.",
                twelve,
              ],
            },
            {
              key: "para-pe",
              title: "Sudafed PE Sinus + Pain Relief / Codral Cold & Flu / Dimetapp Cold & Flu / Demazin Cold + Flu Relief",
              images: [
                shot("image11.png", "Sudafed PE Sinus plus Pain Relief 24 tablets", "S2. Paracetamol 500 mg and phenylephrine hydrochloride 5 mg. 24 tablets."),
                shot("image12.png", "Codral Cold and Flu 48 tablets", "S2. Paracetamol 500 mg and phenylephrine hydrochloride 5 mg. 48 tablets."),
                shot("image21.png", "Dimetapp Cold and Flu 48 tablets", "S2. Paracetamol 500 mg and phenylephrine hydrochloride 5 mg. 48 tablets."),
                shot("image22.png", "Demazin cold plus flu relief 48 tablets", "S2. Paracetamol and phenylephrine. 48 tablets."),
              ],
              cells: [
                "Paracetamol 500 mg",
                "Phenylephrine 5 mg",
                dash,
                dash,
                "1–2 tablets every 4–6 hours. Maximum 8 tablets.",
                twelve,
              ],
            },
            {
              key: "para-pe-cpm",
              title: "Sudafed PE Sinus + Allergy & Pain Relief / Codral Night",
              images: [
                shot("image13.png", "Sudafed PE Sinus plus Allergy and Pain Relief 24 tablets", "S2. Paracetamol 500 mg, phenylephrine hydrochloride 5 mg, and chlorphenamine maleate 2 mg. 24 tablets."),
                shot("image14.png", "Codral Night Cold and Flu 24 tablets", "S2. Paracetamol 500 mg, phenylephrine hydrochloride 5 mg, and chlorphenamine maleate 2 mg. 24 tablets."),
              ],
              cells: [
                "Paracetamol 500 mg",
                "Phenylephrine 5 mg",
                "Chlorphenamine 2 mg",
                dash,
                "2 tablets every 4–6 hours. Maximum 8 tablets.",
                twelve,
              ],
            },
            {
              key: "pe-dn-day",
              title: "Sudafed PE, Codral, and Demazin Day & Night — day tablet",
              images: [
                shot("image15.png", "Sudafed PE Sinus plus Pain Relief Day and Night 24 tablets", "S2. 24 tablets."),
                shot("image16.png", "Codral Day and Night Cold and Flu", "S2. 18 day tablets and 6 night tablets."),
                shot("image17.png", "Demazin cold plus flu relief Day and Night", "32 day tablets and 16 night tablets."),
              ],
              cells: ["Paracetamol 500 mg", "Phenylephrine 5 mg", dash, dash, peDayNight, twelve],
            },
            {
              key: "pe-dn-night",
              title: "Sudafed PE, Codral, and Demazin Day & Night — night tablet",
              images: [
                shot("image15.png", "Sudafed PE Day and Night night tablets", "Same packs as the day tablet."),
                shot("image16.png", "Codral Day and Night night tablets", "Same pack as the day tablet."),
                shot("image17.png", "Demazin Day and Night night tablets", "Same pack as the day tablet."),
              ],
              cells: ["Paracetamol 500 mg", "Phenylephrine 5 mg", "Chlorphenamine 2 mg", dash, peDayNight, twelve],
            },
            {
              key: "pe-dnc-day",
              title: "Codral, Dimetapp, and Demazin Day & Night + Dry Cough — day capsule",
              images: [
                shot("image18.png", "Codral Day and Night plus Dry Cough", "S2. 36 day capsules and 12 night capsules."),
                shot("image19.png", "Dimetapp Cough, Cold and Flu Day and Night 48 capsules", "S2. 36 day capsules and 12 night capsules."),
                shot("image20.png", "Demazin cold plus flu plus cough Day and Night", "S2. 36 day capsules and 12 night capsules."),
              ],
              cells: ["Paracetamol 500 mg", "Phenylephrine 5 mg", dash, "Dextromethorphan 10 mg", peDayNight, twelve],
            },
            {
              key: "pe-dnc-night",
              title: "Codral, Dimetapp, and Demazin Day & Night + Dry Cough — night capsule",
              images: [
                shot("image18.png", "Codral Day and Night plus Dry Cough night capsules", "Same pack as the day capsule."),
                shot("image19.png", "Dimetapp Day and Night night capsules", "Same pack as the day capsule."),
                shot("image20.png", "Demazin Day and Night plus cough night capsules", "Same pack as the day capsule."),
              ],
              cells: ["Paracetamol 500 mg", dash, "Chlorphenamine 2 mg", "Dextromethorphan 10 mg", peDayNight, twelve],
            },
          ]}
        />
      </section>

      <section className="space-y-4">
        <Subhead id="dry-cough">Cold and flu with dry cough</Subhead>
        <Matrix
          label="For dry cough and cold"
          rows={coldRows}
          products={[
            {
              key: "codral-dry-tab",
              title: "Codral Cold & Flu + Dry Cough",
              images: [
                shot(
                  "image23.png",
                  "Codral Cold and Flu plus Dry Cough 48 capsules",
                  "S2. Paracetamol 500 mg, phenylephrine hydrochloride 5 mg, and dextromethorphan 10 mg. 48 capsules.",
                ),
              ],
              cells: [
                "Paracetamol 500 mg",
                "Phenylephrine 5 mg",
                dash,
                "Dextromethorphan 10 mg",
                "2 capsules every 4–6 hours. Maximum 8 capsules.",
                twelve,
              ],
            },
            {
              key: "codral-dry-liq",
              title: "Codral Dry Cough + Cold / Benadryl PE Dry Cough & Nasal Congestion",
              images: [
                shot("image24.png", "Codral Dry Cough plus Cold oral liquid 200 mL", "S2. Dextromethorphan 10 mg/5 mL and phenylephrine hydrochloride 5 mg/5 mL. 200 mL."),
                shot("image25.png", "Benadryl PE Dry Cough and Nasal Congestion 200 mL", "S2. Berry flavour. 200 mL."),
              ],
              cells: [
                dash,
                "Phenylephrine 5 mg/5 mL",
                dash,
                "Dextromethorphan 10 mg/5 mL",
                "10 mL every 4 hours. Maximum 6 doses.",
                "6 years and over. 6–12 years: 5 mL per dose.",
              ],
            },
          ]}
        />
      </section>

      <section className="space-y-4">
        <Subhead id="chesty-cough">Cold and flu with chesty cough</Subhead>
        <Matrix
          label="For chesty cough and cold"
          rows={coldRows}
          products={[
            {
              key: "codral-mucus",
              title: "Codral Cold & Flu + Mucus Cough",
              images: [
                shot(
                  "image26.png",
                  "Codral Cold and Flu plus Mucus Cough 24 capsules",
                  "S2. Paracetamol 500 mg, guaifenesin 100 mg, and phenylephrine hydrochloride 6.1 mg. 24 capsules.",
                ),
              ],
              cells: [
                "Paracetamol 500 mg",
                "Phenylephrine 6.1 mg",
                dash,
                "Guaifenesin 100 mg",
                "2 capsules every 4–6 hours. Maximum 8 capsules.",
                twelve,
              ],
            },
            {
              key: "codral-max",
              title: "Codral Cold & Flu + Mucus Cough Max Strength",
              images: [
                shot(
                  "image27.png",
                  "Codral Cold and Flu plus Mucus Cough Max Strength hot drink",
                  "Hot drink, lemon flavour. 10 sachets, 5 g oral powder.",
                ),
              ],
              cells: [
                "Paracetamol 1000 mg",
                "Phenylephrine 12.2 mg",
                dash,
                "Guaifenesin 200 mg",
                "1 sachet every 4–6 hours. Maximum 4 sachets.",
                twelve,
              ],
            },
            {
              key: "mucus-liquid",
              title: "Codral Mucus Cough + Cold / Benadryl PE Chesty Cough & Nasal Congestion",
              images: [
                shot("image28.png", "Codral Mucus Cough plus Cold oral liquid 200 mL", "Guaifenesin 100 mg/5 mL and phenylephrine hydrochloride 5 mg/5 mL. 200 mL."),
                shot("image29.png", "Benadryl PE Chesty Cough and Nasal Congestion 200 mL", "S2. Guaifenesin 100 mg and phenylephrine hydrochloride 5 mg in each 5 mL. Berry flavour. 200 mL."),
              ],
              cells: [
                dash,
                "Phenylephrine 5 mg/5 mL",
                dash,
                "Guaifenesin 100 mg/5 mL",
                "10 mL every 4 hours. Maximum 6 doses.",
                "12 years and over. 6 years and over for Benadryl.",
              ],
            },
          ]}
        />
      </section>

      <section className="space-y-4">
        <Subhead id="antihistamine">Antihistamine-based cold and flu products</Subhead>
        <Matrix
          label="No paracetamol"
          rows={coldRows}
          products={[
            {
              key: "demazin-6",
              title: "Demazin Kids 6+ Cold Relief",
              images: [
                shot("image30.png", "Demazin Kids 6 plus cold relief colour-free syrup 200 mL", "S2. Colour free. Peach and vanilla. 200 mL."),
              ],
              cells: [
                dash,
                "Phenylephrine 2.5 mg/5 mL",
                "Chlorphenamine 1.25 mg/5 mL",
                dash,
                "15 mL every 6 hours. Maximum 4 doses.",
                "6 years and over. 6–12 years: 8–15 mL per dose.",
              ],
            },
            {
              key: "dimetapp-allergy",
              title: "Dimetapp Cold & Allergy Kids 6 years and over",
              images: [
                shot("image31.png", "Dimetapp Cold and Allergy kids 6 years and over 200 mL", "S2. Brompheniramine maleate 2 mg/5 mL and phenylephrine hydrochloride 5 mg/5 mL. 200 mL."),
                shot("image32.png", "Dimetapp Cold and Allergy colour free 200 mL", "S2. Colour free. 200 mL."),
              ],
              cells: [
                dash,
                "Phenylephrine 5 mg/5 mL",
                "Brompheniramine 2 mg/5 mL",
                dash,
                "10 mL every 6–8 hours. Maximum 4 doses.",
                "6 years and over. 6–12 years: 7.5 mL per dose.",
              ],
            },
            {
              key: "dimetapp-cough",
              title: "Dimetapp Cough & Cold Kids 6 years and over / Demazin Kids 6+ Cough + Cold",
              images: [
                shot("image33.png", "Dimetapp Cough and Cold kids 6 years and over 200 mL", "S2. 200 mL."),
                shot("image34.png", "Dimetapp Cough and Cold colour free 200 mL", "S2. Colour free. 200 mL."),
                shot("image35.png", "Demazin Kids 6 plus cough and cold relief 200 mL", "S2. Grape flavour. 200 mL."),
              ],
              cells: [
                dash,
                "Phenylephrine 5 mg/5 mL",
                "Brompheniramine 2 mg/5 mL",
                "Dextromethorphan 10 mg/5 mL",
                "10 mL every 4 hours. Maximum 6 doses.",
                "6 years and over. 6–12 years: 5 mL per dose.",
              ],
            },
            {
              key: "paedamin",
              title: "Children’s Paedamin Decongestant and Antihistamine",
              images: [
                shot(
                  "image36.png",
                  "Children's Paedamin Decongestant and Antihistamine 200 mL",
                  "S2. Diphenhydramine hydrochloride 2.5 mg/mL and phenylephrine hydrochloride 500 microgram/mL. Orange. 200 mL.",
                ),
              ],
              cells: [
                dash,
                "Phenylephrine 2.5 mg/5 mL",
                "Diphenhydramine 12.5 mg/5 mL",
                dash,
                "15 mL every 6 hours",
                "6 years and over. See the packaging.",
              ],
            },
            {
              key: "benadryl-original",
              title: (
                <>
                  {s3} Benadryl Original
                </>
              ),
              images: [
                shot(
                  "image37.png",
                  "Benadryl Original oral liquid 200 mL",
                  "Pharmacist Only Medicine. Diphenhydramine hydrochloride 12.5 mg and ammonium chloride 125 mg in each 5 mL. Berry flavour. 200 mL.",
                ),
              ],
              cells: [
                dash,
                dash,
                "Diphenhydramine 12.5 mg/5 mL",
                "Ammonium chloride 125 mg/5 mL",
                "10 mL every 4 hours. Maximum 6 doses.",
                "6 years and over. 6–12 years: 5 mL per dose.",
              ],
            },
          ]}
        />
        <Note>Ammonium chloride is an expectorant.</Note>
      </section>

      <section className="space-y-6">
        <Subhead id="oral-liquids">Oral liquid cough products</Subhead>
        <div className="space-y-4">
          <h4 id="chesty-liquids" className="scroll-mt-8 font-serif text-xl tracking-tight text-ink">
            Chesty cough
          </h4>
          <Matrix
            label="Ingredient"
            rows={liquidRows}
            products={[
              {
                key: "durotuss-pe",
                title: "Duro-Tuss PE Chesty",
                images: [shot("image38.png", "Duro-Tuss PE Chesty cough liquid 200 mL", "S2. Bromhexine and phenylephrine. 200 mL.")],
                cells: [
                  "Bromhexine 4 mg/5 mL (12 mg/15 mL)",
                  dash,
                  dash,
                  "Phenylephrine 10 mg/15 mL",
                  "15 mL every 6 hours. Maximum 4 doses.",
                  "6 years and over. 6–12 years: 7.5 mL per dose.",
                ],
              },
              {
                key: "bromhexine",
                title: "Bisolvon Chesty / Bisolvon Chesty Kids / Duro-Tuss Chesty",
                images: [
                  shot("image39.png", "Bisolvon Chesty oral liquid 250 mL", "S2. Bromhexine hydrochloride 8 mg/10 mL. Chocolate cherry. 250 mL."),
                  shot("image40.png", "Bisolvon Chesty Kids oral liquid 200 mL", "S2. Bromhexine hydrochloride 8 mg/10 mL. Strawberry. 200 mL."),
                  shot("image41.png", "Duro-Tuss Chesty cough liquid 200 mL", "S2. Bromhexine. 6 years and over. 200 mL."),
                ],
                cells: [
                  "Bromhexine 4 mg/5 mL (12 mg/15 mL)",
                  dash,
                  dash,
                  dash,
                  "15 mL every 8 hours. Maximum 3 doses.",
                  "6 years and over. 6–12 years: 5–10 mL per dose.",
                ],
              },
              {
                key: "bromhexine-forte",
                title: "Bisolvon Chesty Forte / Duro-Tuss Chesty Double Strength",
                images: [
                  shot("image42.png", "Bisolvon Chesty Forte oral liquid 200 mL", "S2. Bromhexine hydrochloride 8 mg/5 mL. Chocolate cherry. 200 mL."),
                  shot("image43.png", "Duro-Tuss Chesty Double Strength cough liquid 200 mL", "S2. Bromhexine. 200 mL."),
                  shot("image44.png", "Bisolvon Chesty Forte tablets", "S2. Bromhexine hydrochloride 8 mg. 50 tablets."),
                ],
                cells: [
                  "Bromhexine 8 mg/5 mL",
                  dash,
                  dash,
                  dash,
                  "5 mL 3 times a day. This can be increased to 10 mL 3 times a day for the first 7 days.",
                  "6 years and over. 6–12 years: 5 mL 3 times a day.",
                ],
              },
              {
                key: "gfns-brom",
                title: "Codral Mucus Cough Forte / Robitussin Chesty Cough Forte / Duro-Tuss Chesty Forte / Benadryl Chesty Forte",
                images: [
                  shot("image45.png", "Codral Mucus Cough Forte Strength 200 mL", "S2. Guaifenesin 100 mg/5 mL and bromhexine hydrochloride 4 mg/5 mL. 200 mL."),
                  shot("image46.png", "Robitussin Chesty Cough Forte 250 mL", "S2. Guaifenesin 100 mg/5 mL and bromhexine hydrochloride 4 mg/5 mL. Fruit flavour. 250 mL."),
                  shot("image47.png", "Duro-Tuss Chesty Forte cough liquid 200 mL", "S2. Bromhexine and guaifenesin. 200 mL."),
                  shot("image48.png", "Duro-Tuss Chesty Forte cough tablets", "S2. Bromhexine and guaifenesin. 60 tablets."),
                  shot("image49.png", "Benadryl Chesty Forte 200 mL", "S2. Guaifenesin 100 mg and bromhexine hydrochloride 4 mg in each 5 mL. Berry flavour. 200 mL."),
                ],
                cells: [
                  "Bromhexine 4 mg/5 mL",
                  "Guaifenesin 100 mg/5 mL",
                  dash,
                  dash,
                  "10–20 mL every 8 hours. Maximum 3 doses.",
                  "6 years and over. 6–12 years: 5–10 mL per dose.",
                ],
              },
              {
                key: "robitussin-chesty",
                title: "Robitussin Chesty Cough",
                images: [shot("image50.png", "Robitussin Chesty Cough 200 mL", "Guaifenesin 100 mg/5 mL. Raspberry flavour. 200 mL.")],
                cells: [
                  dash,
                  "Guaifenesin 100 mg/5 mL",
                  dash,
                  dash,
                  "10–20 mL every 4 hours. Maximum 6 doses.",
                  "6 years and over. 6–12 years: 5–10 mL per dose.",
                ],
              },
            ]}
          />
        </div>
        <div className="space-y-4">
          <h4 id="dry-liquids" className="scroll-mt-8 font-serif text-xl tracking-tight text-ink">
            Dry cough
          </h4>
          <Matrix
            label="Ingredient"
            rows={liquidRows}
            products={[
              {
                key: "robitussin-congestion",
                title: "Robitussin Cough & Chest Congestion",
                images: [
                  shot(
                    "image51.png",
                    "Robitussin Cough and Chest Congestion 250 mL",
                    "S2. Guaifenesin 100 mg/5 mL and dextromethorphan 15 mg/5 mL. Vanilla cherry. 250 mL.",
                  ),
                ],
                cells: [
                  dash,
                  "Guaifenesin 100 mg/5 mL",
                  "Dextromethorphan 15 mg/5 mL",
                  dash,
                  "10 mL every 6–8 hours. Maximum 4 doses.",
                  "6 years and over. 6–12 years: 5 mL per dose.",
                ],
              },
              {
                key: "dry-forte",
                title: "Robitussin Dry Cough Forte / Duro-Tuss Dry Forte",
                images: [
                  shot("image52.png", "Robitussin Dry Cough Forte 250 mL", "S2. Dextromethorphan 15 mg/5 mL. Cherry vanilla. 250 mL."),
                  shot("image53.png", "Duro-Tuss Dry Forte cough liquid 200 mL", "S2. Dextromethorphan. 200 mL."),
                ],
                cells: [
                  dash,
                  dash,
                  "Dextromethorphan 15 mg/5 mL",
                  dash,
                  "10 mL every 6–8 hours. Maximum 4 doses.",
                  "6 years and over. 6–12 years: 5 mL per dose.",
                ],
              },
              {
                key: "bisolvon-dry",
                title: "Bisolvon Dry",
                images: [
                  shot("image54.png", "Bisolvon Dry oral liquid 200 mL", "S2. Dextromethorphan 10 mg/5 mL. Apricot and vanilla. 200 mL."),
                ],
                cells: [
                  dash,
                  dash,
                  "Dextromethorphan 10 mg/5 mL",
                  dash,
                  "5–15 mL every 4–6 hours. Maximum 4 doses.",
                  "6 years and over. 6–12 years: 2.5–7.5 mL per dose.",
                ],
              },
              {
                key: "rikodeine",
                title: (
                  <>
                    {s3} Rikodeine
                  </>
                ),
                images: [shot("image55.png", "Rikodeine oral liquid", "Pharmacist Only Medicine. Dihydrocodeine. Stubborn dry cough.")],
                cells: [
                  dash,
                  dash,
                  "Dihydrocodeine 1.9 mg/mL, which is 9.5 mg/5 mL",
                  dash,
                  "9.5–19 mg (5–10 mL) every 4–6 hours.",
                  "6 years and over. 6–12 years: 4.75–9.5 mg (2.5–5 mL) every 4–6 hours.",
                ],
              },
            ]}
          />
        </div>
      </section>

      <section className="space-y-4">
        <Subhead id="lozenges">Cough lozenges</Subhead>
        <Matrix
          label="Lozenge"
          rows={["Mucolytic", "Expectorant", "Cough suppressant", "Other", "Age and dose"]}
          products={[
            {
              key: "durotuss-chesty-lozenge",
              title: "Duro-Tuss Chesty Cough Lozenges",
              images: [
                shot("image56.png", "Duro-Tuss Chesty Cough Lozenges berry flavour", "S2. Bromhexine hydrochloride 8 mg and cetylpyridinium chloride 1.33 mg. 24 sugar-free lozenges."),
                shot("image57.png", "Duro-Tuss Chesty Cough Lozenges lemon flavour", "S2. Bromhexine hydrochloride 8 mg and cetylpyridinium chloride 1.33 mg. 24 sugar-free lozenges."),
              ],
              cells: [
                "Bromhexine hydrochloride 8 mg",
                dash,
                dash,
                "Cetylpyridinium chloride 1.33 mg",
                <Lines
                  key="chesty-lozenge-dose"
                  items={[
                    "6 years and over.",
                    "6–11 years: 1 lozenge every 8 hours. Maximum 3.",
                    "12 years and over: 2 lozenges every 8 hours. Maximum 6.",
                  ]}
                />,
              ],
            },
            {
              key: "bisolvon-pastille",
              title: "Bisolvon Dry pastilles",
              images: [
                shot("image58.png", "Bisolvon Dry pastilles", "S2. Dextromethorphan hydrobromide monohydrate 10.5 mg. Honey lime. 20 pastilles."),
              ],
              cells: [
                dash,
                dash,
                "Dextromethorphan 10.5 mg",
                dash,
                <Lines
                  key="pastille-dose"
                  items={[
                    "6 years and over.",
                    "6–11 years: 1 pastille every 4–6 hours. Maximum 6 pastilles.",
                    "12 years and over: 1–3 pastilles every 4–6 hours. Maximum 12 pastilles.",
                  ]}
                />,
              ],
            },
            {
              key: "durotuss-sore",
              title: "Duro-Tuss Dry Cough plus sore throat",
              images: [
                shot(
                  "image59.png",
                  "Duro-Tuss Dry Cough plus sore throat lozenges",
                  "S2. Dextromethorphan 5 mg, cetylpyridinium chloride 1.3 mg, benzocaine 1 mg, and menthol 5.2 mg. Lemon. 16 lozenges.",
                ),
              ],
              cells: [
                dash,
                dash,
                "Dextromethorphan 5 mg",
                "Cetylpyridinium chloride 1.3 mg, menthol 5.2 mg, and benzocaine 1 mg",
                <Lines
                  key="sore-dose"
                  items={[
                    "6 years and over.",
                    "6–11 years: 1 lozenge every 3 hours. Maximum 8.",
                    "12 years and over: 2 lozenges every 3 hours. Maximum 16.",
                  ]}
                />,
              ],
            },
            {
              key: "durotuss-relief-lozenge",
              title: "Duro-Tuss Relief Dry Cough lozenges",
              images: [
                shot(
                  "image60.png",
                  "Duro-Tuss Relief Dry Cough lozenges",
                  "Althaea officinalis 41.7 mg, equivalent to dry root 250 mg. Blackberry and vanilla. 24 lozenges.",
                ),
              ],
              cells: [
                dash,
                dash,
                "Althaea officinalis dry root extract",
                dash,
                <Lines
                  key="relief-lozenge-dose"
                  items={[
                    "6 years and over.",
                    "6–11 years: 1 lozenge every 2–3 hours. Maximum 6.",
                    "12 years and over: 2 lozenges every 2–3 hours. Maximum 12.",
                  ]}
                />,
              ],
            },
          ]}
        />
        <Note>
          Cetylpyridinium chloride is an antiseptic. Benzocaine is for a sore throat. Menthol is for nasal stiffness.
        </Note>
      </section>

      <section className="space-y-4">
        <Subhead id="complementary">Complementary medicines for cough and cold under 6 years</Subhead>
        <Matrix
          label="Herbal product"
          rows={["Use in the source", "Ingredients", "Age"]}
          products={[
            {
              key: "ivy",
              title: "Ivy leaf",
              images: [
                shot("image61.png", "Prospan for Children chesty cough relief 200 mL", "Hedera helix extract. Cherry flavour. 200 mL."),
                shot("image62.png", "Little Coughs oral liquid 200 mL", "Each 5 mL contains 40 mg of Hedera helix extract, equivalent to 102 mg of dry leaf. 200 mL."),
                shot("image63.png", "Demazin Kids 2 plus cough and immune defence 200 mL", "2 years and over. Natural berry. 200 mL."),
                shot("image64.png", "Duro-Tuss Children's Cough Liquid 200 mL", "Hedera helix ivy leaf extract equivalent to dry leaf 125 mg/10 mL. Strawberry. 200 mL."),
                shot("image65.png", "Duro-Tuss Children's Cough Liquid night-time 200 mL", "Hedera helix and chamomile. Strawberry. 200 mL."),
                shot("image66.png", "Benadryl Children's Cough 200 mL", "2 years and over. Honey lemon. 200 mL."),
              ],
              cells: ["Chesty cough", "Ivy leaf (Hedera helix)", "2 years and over"],
            },
            {
              key: "elder",
              title: "Ivy leaf and elderberry, with or without zinc",
              images: [
                shot("image67.png", "Dimetapp Kids 2 plus Cough and Cold Relief 200 mL", "Black elderberry, black elderflower, ivy leaf, and zinc. Blackcurrant. 200 mL."),
                shot("image68.png", "Bisolvon Cough Relief plus Immune Support 200 mL", "Ivy leaf, zinc, and elderberry. Blackcurrant. 200 mL."),
                shot("image69.png", "Sambucol Cold and Flu plus Cough 250 mL", "Black elderberry and ivy leaf. Berry flavour. 250 mL."),
                shot("image70.png", "EASEaCOLD Kids Cough, Cold and Flu 180 mL", "2 years and over. Berry flavour. 180 mL."),
                shot("image71.png", "Demazin Kids 2 plus cold and flu plus immune defence 200 mL", "Elder flowers. 2 years and over. Natural berry. 200 mL."),
              ],
              cells: ["Chesty cough and cold", "Ivy leaf, elderberry, and zinc", "2 years and over"],
            },
            {
              key: "pelargonium",
              title: "Pelargonium root",
              images: [
                shot(
                  "image72.png",
                  "Codral Cold and Cough pelargonium root extract 100 mL",
                  "Pelargonium root extract dry 20 mg/2.5 mL, equivalent to 290 mg of dry pelargonium root. 6 years and over. 100 mL.",
                ),
                shot(
                  "image73.png",
                  "Blackmores Kaloba oral liquid 50 mL",
                  "Each 1 mL contains Pelargonium sidoides liquid extract 821 mg, equivalent to 91 mg dry root. 50 mL.",
                ),
              ],
              cells: [
                "Cold and cough",
                "Pelargonium root dry extract 20 mg/2.5 mL",
                "Codral: 6 years and over. Kaloba: 2 years and over.",
              ],
            },
            {
              key: "marshmallow",
              title: "Marshmallow root, with or without honey",
              images: [
                shot(
                  "image74.png",
                  "Bisolvon Duo Syrup 100 mL",
                  "Althaea officinalis dry root extract 125 mg/5 mL, from 100 mg/5 mL dry root, and honey 1.88 g/5 mL. 100 mL.",
                ),
                shot("image75.png", "Duro-Tuss Relief plus Honey dry cough liquid", "3 years and over. 200 mL."),
                shot(
                  "image76.png",
                  "Duro-Tuss Relief dry cough liquid 350 mL",
                  "Althaea officinalis 333 mg/10 mL, equivalent to 1 g dry root. 3 years and over. 350 mL.",
                ),
                shot("image77.png", "Duro-Tuss Relief dry cough night-time liquid 200 mL", "3 years and over. 200 mL."),
              ],
              cells: [
                "Dry cough",
                "Althaea officinalis dry root extract, with honey. Chamomile is in the night formula.",
                "3 years and over",
              ],
            },
          ]}
        />
        <Note>The night formula adds chamomile.</Note>
      </section>
    </div>
  );
}
