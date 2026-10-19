import type { ReactNode } from "react";
import { ZoomImage } from "@/components/counselling/zoom-image";

const img = (file: string) => `/medicine-notes/insulin/${file}`;

type Photo = { file: string; alt: string };

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
      <h2 className="border-b border-line px-4 py-4 font-serif text-2xl tracking-tight text-ink">{title}</h2>
      <div className="space-y-4 px-4 py-5">{children}</div>
    </section>
  );
}

function Callout({ children, tone = "note" }: { children: ReactNode; tone?: "note" | "alert" }) {
  const toneClass =
    tone === "alert"
      ? "border-[#8c3b32] bg-[#f8ece8]"
      : "border-line bg-[#f3ecdf]";
  return <div className={`rounded-lg border px-4 py-3 text-sm leading-6 text-ink ${toneClass}`}>{children}</div>;
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Thumbs({ photos }: { photos: Photo[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {photos.map((photo) => (
        <ZoomImage
          key={photo.file}
          src={img(photo.file)}
          alt={photo.alt}
          className="h-16 w-16 object-contain"
        />
      ))}
    </div>
  );
}

function Diagram({ file, alt, wide = false }: { file: string; alt: string; wide?: boolean }) {
  return (
    <ZoomImage
      src={img(file)}
      alt={alt}
      buttonClassName={wide ? "block max-w-5xl" : "block max-w-3xl"}
      className="h-auto w-full object-contain"
    />
  );
}

const headClass = "px-3 py-2 font-medium";
const cellClass = "border-t border-line px-3 py-3 align-top";

function Table({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm leading-6 text-ink">
        <thead className="bg-moss text-paper">
          <tr>
            {headers.map((header) => (
              <th key={header} className={headClass}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

const moa = [
  {
    question: "What is the difference between endogenous and exogenous insulin in terms of feedback control?",
    points: [
      "Endogenous insulin has natural feedback regulation.",
      "Exogenous insulin does not have feedback control and requires manual titration based on glucose and carbohydrate intake.",
    ],
  },
  {
    question: "How is insulin stored and activated in the body?",
    points: [
      "Stored as hexamers in beta cells.",
      "In the bloodstream, hexamers break into monomers that activate insulin receptors.",
    ],
  },
  {
    question: "What is the significance of insulin hexamers in exogenous insulin formulations?",
    points: [
      "Exogenous insulin remains as hexamers due to additives.",
      "After injection, hexamers disperse into monomers.",
      "This dispersion rate determines insulin's action time.",
    ],
  },
  {
    question: "What determines the duration of action in different insulin formulations?",
    points: [
      "Duration depends on the strength of bonds between hexamers.",
      "Stronger bonds = slower dispersion = longer action.",
    ],
  },
  {
    question: "What are the goals of modern chemical manipulation of insulin molecules?",
    points: [
      "To mimic natural insulin action.",
      "To offer more convenient and diverse treatment options.",
    ],
  },
  {
    question: "What is the difference between basal and postprandial insulin secretion under normal physiological conditions?",
    points: [
      "Basal insulin is released continuously at low levels.",
      "Postprandial insulin is secreted in response to glucose after meals.",
    ],
  },
];

const regimens = [
  ["Basal", "Intermediate/long-acting once or twice daily"],
  ["Basal Plus", "Basal + short-acting for the largest meal"],
  ["Basal Bolus", "Long + short acting with meals"],
  ["Mixed", "Fixed combo of long- & short-acting, once or twice daily"],
];

const postprandialUltra =
  "For reduction of postprandial rises in glucose levels: used from up to 2 minutes before a meal, or at the start of a meal, or up to 20 minutes after. Commonly used in basal bolus regimens.";
const postprandialShort =
  "For reduction of postprandial rises in glucose levels: used 20–30 minutes before meals.";
const basalTwice = "Basal insulin: once or twice daily, irrespective of meals.";
const basalOnce = "Basal insulin: once daily, irrespective of meals.";

type InsulinRow = {
  type?: string;
  typeSpan?: number;
  insulin: string;
  brands: string[];
  photos: Photo[];
  regimen?: string;
  regimenSpan?: number;
  traits?: string;
  traitsSpan?: number;
};

const singleInsulins: InsulinRow[] = [
  {
    type: "Ultra-short acting",
    typeSpan: 3,
    insulin: "Aspart",
    brands: ["Fiasp (faster acting insulin aspart)", "NovoRapid"],
    photos: [
      { file: "fiasp.png", alt: "Fiasp insulin aspart vial, FlexTouch pen, PumpCart cartridge, and penfill cartridge." },
      { file: "novorapid-flextouch.png", alt: "NovoRapid FlexTouch 100 U/mL prefilled pen and carton." },
      { file: "novorapid-penfill.png", alt: "NovoRapid Penfill insulin aspart 100 U/mL cartridge and carton." },
    ],
    regimen: postprandialUltra,
    regimenSpan: 3,
    traits: "Clear solution",
    traitsSpan: 3,
  },
  {
    insulin: "Lispro",
    brands: ["Humalog"],
    photos: [
      { file: "humalog-kwikpen.png", alt: "Humalog 100 U/mL KwikPen and carton." },
      { file: "humalog-cartridge.png", alt: "Humalog 100 U/mL cartridge carton and blister of cartridges." },
    ],
  },
  {
    insulin: "Glulisine",
    brands: ["Apidra"],
    photos: [{ file: "apidra.png", alt: "Apidra SoloStar insulin glulisine 100 units/mL prefilled pen and carton." }],
  },
  {
    type: "Short acting",
    insulin: "Neutral insulin",
    brands: ["Actrapid", "Humulin R"],
    photos: [
      { file: "actrapid.png", alt: "Actrapid Penfill cartridges, Actrapid vial, and carton." },
      { file: "actrapid-flexpen.png", alt: "Actrapid FlexPen soluble insulin injection and carton." },
      { file: "humulin-r-cartridge.png", alt: "Humulin R 100 units/mL cartridge carton." },
      { file: "humulin-r-vial.png", alt: "Humulin R U-100 vial and carton." },
    ],
    regimen: postprandialShort,
    traits: "Clear solution",
  },
  {
    type: "Intermediate acting",
    insulin: "Isophane insulin",
    brands: ["Protaphane", "Humulin NPH"],
    photos: [
      { file: "protaphane-penfill.png", alt: "Protaphane Penfill 100 IU/mL carton." },
      { file: "protaphane-innolet.png", alt: "Protaphane InnoLet 100 U/mL carton." },
      { file: "humulin-n.png", alt: "Humulin N (NPH) cartridge carton and cartridge." },
    ],
    regimen: basalTwice,
    traits: "Cloudy solution. Protaphane may be preferred due to the InnoLet device for some patients.",
  },
  {
    type: "Long acting",
    typeSpan: 2,
    insulin: "Detemir",
    brands: ["Levemir"],
    photos: [
      { file: "levemir-flexpen.png", alt: "Levemir FlexPen carton artwork and pen." },
      { file: "levemir-flextouch.png", alt: "Levemir FlexTouch carton artwork and pen." },
      { file: "levemir-penfill.png", alt: "Levemir Penfill 100 U/mL carton and cartridges." },
    ],
    regimen: basalTwice,
    traits: "Clear solution",
  },
  {
    insulin: "Glargine",
    brands: ["Optisulin (100 units/mL)", "Toujeo (300 units/mL)"],
    photos: [
      { file: "optisulin.png", alt: "Optisulin SoloStar insulin glargine 100 IU/mL carton." },
      { file: "toujeo.png", alt: "Toujeo SoloStar insulin glargine 300 units/mL pen and carton." },
    ],
    regimen: basalOnce,
    traits: "Clear solution",
  },
];

const mixedInsulins: InsulinRow[] = [
  {
    type: "Insulin isophane with neutral insulin (intermediate acting + short acting)",
    typeSpan: 2,
    insulin: "Mixtard 30/70 and Mixtard 50/50",
    brands: [],
    photos: [
      { file: "mixtard-30.png", alt: "Mixtard 30 Penfill carton and cartridges." },
      { file: "mixtard-50.png", alt: "Mixtard 50 Penfill carton." },
    ],
    regimen: "Given within 30 minutes before food. Once or twice daily.",
    regimenSpan: 2,
    traits: "Biphasic. Cloudy solution. Mixtard 30/70 may be preferred due to the InnoLet device for some patients.",
    traitsSpan: 2,
  },
  {
    insulin: "Humulin 30/70",
    brands: [],
    photos: [
      {
        file: "humulin-30-70.png",
        alt: "Humulin 70/30 carton, 70% human insulin isophane suspension and 30% human insulin injection.",
      },
    ],
  },
  {
    type: "Insulin protamine with insulin aspart (intermediate acting + ultra-short acting)",
    insulin: "NovoMix 30",
    brands: [],
    photos: [{ file: "novomix-30.png", alt: "NovoMix 30 FlexPen and carton." }],
    regimen: "Given within 30 minutes before food. Once or twice daily.",
    traits: "Biphasic. Cloudy solution.",
  },
  {
    type: "Insulin lispro protamine with insulin lispro (intermediate acting + ultra-short acting)",
    insulin: "Humalog Mix 25 and Humalog Mix 50",
    brands: [],
    photos: [
      { file: "humalog-mix25.png", alt: "Humalog Mix25 100 U/mL cartridge carton and cartridge." },
      { file: "humalog-mix50.png", alt: "Humalog Mix50/50 KwikPen carton and pen." },
    ],
    regimen: "Given within 30 minutes before food. Once or twice daily.",
    traits: "Biphasic. Cloudy solution.",
  },
  {
    type: "Insulin degludec with insulin aspart (long acting + ultra-short acting)",
    insulin: "Ryzodeg 70/30",
    brands: [],
    photos: [
      { file: "ryzodeg-penfill.png", alt: "Ryzodeg Penfill carton, 70% insulin degludec and 30% insulin aspart." },
      { file: "ryzodeg-flextouch.png", alt: "Ryzodeg FlexTouch pen and carton." },
    ],
    regimen: "Given immediately before food. Once or twice daily.",
    traits: "Clear solution.",
  },
];

const devices: { name: string; photos: Photo[]; features: string[]; notes: string[] }[] = [
  {
    name: "Syringes",
    photos: [
      { file: "syringe.png", alt: "BD Ultra-Fine 1 mL insulin syringes and carton." },
      { file: "humulin-r-vial.png", alt: "Humulin R U-100 vial, the presentation drawn up with a syringe." },
    ],
    features: [
      "Marked in units (100 units/mL only).",
      "Sizes: 30, 50, 100 units.",
      "Needle tips: 6 mm, 8 mm.",
      "Select a size close to the dose.",
    ],
    notes: ["Do not use syringes to withdraw insulin from pen devices (risk of overdose and pen damage)."],
  },
  {
    name: "Prefilled pens (disposable)",
    photos: [
      { file: "flexpen.png", alt: "FlexPen disposable insulin pen." },
      { file: "kwikpen.png", alt: "Humalog KwikPen." },
      { file: "solostar.png", alt: "Lantus SoloStar prefilled pen, an example of the SoloStar device." },
    ],
    features: [
      "Disposable pens with prefilled insulin.",
      "Brands: FlexPen, KwikPen, SoloStar.",
      "Require separate needle tips.",
      "Up to 25 pens per script, so spare devices can be kept (for example at work, or if one malfunctions).",
      "Recommended needle length: 4–6 mm.",
      "Safety needles are available for carers (not NDSS subsidised).",
    ],
    notes: ["Each patient must have their own pen. Do not share."],
  },
  {
    name: "InnoLet",
    photos: [{ file: "innolet.png", alt: "InnoLet device with a clock-face dose dial." }],
    features: [
      "Designed for visual or dexterity issues.",
      "Clock-face dial for the dose.",
      "Insulins: Protaphane InnoLet, Mixtard 30/70 InnoLet.",
      "Needle tip required, 4–8 mm (4–6 mm preferred to reduce scarring, lipoatrophy, and lipohypertrophy).",
    ],
    notes: [
      "Protaphane is commonly used in gestational diabetes and when taking corticosteroids, because of a similar action profile.",
    ],
  },
  {
    name: "Cartridges + reusable pens",
    photos: [
      { file: "novopen.png", alt: "NovoPen 6 reusable pen and carton." },
      { file: "humapen.png", alt: "HumaPen Ergo II reusable pen and carton." },
    ],
    features: [
      "Prefilled cartridges used with reusable pens.",
      "Brands: NovoPen, HumaPen, ClikStar.",
      "Require single-use pen needles.",
      "Choose a pen that matches the cartridge brand.",
      "Pen devices come in different colours to prevent an insulin mix-up.",
    ],
    notes: ["Preferred by frequent travellers or those concerned with plastic waste."],
  },
  {
    name: "Jet injectors",
    photos: [
      { file: "insujet.png", alt: "InsuJet needle-free injector marked U-100." },
      { file: "jet-injection.png", alt: "Diagram comparing a needle injection with a needle-free jet injection into skin." },
    ],
    features: ["Needle-free delivery using pressure."],
    notes: ["Rarely used, because the cost is high relative to the benefit."],
  },
  {
    name: "Insulin pumps",
    photos: [
      {
        file: "insulin-pump.png",
        alt: "Diagram of an insulin pump with tubing, a cannula entry point, and a continuous glucose monitor.",
      },
      { file: "omnipod.png", alt: "Omnipod tubeless pod shown with a phone display and the pod interior." },
    ],
    features: [
      "Mechanical delivery via a cannula.",
      "Used in type 1 diabetes (some subsidy available).",
      "Microdosing (0.025 units possible).",
      "Requires an insulin cartridge and an infusion set (often with tubing). The cannula is self-inserted, with disposable or reusable inserters, or a metal cannula.",
      "Omnipod is a tubeless option and is more expensive.",
    ],
    notes: ["Patients require training. Omnipod may be preferred for convenience, but cost is a barrier."],
  },
];

const practitionerTitration = [
  ["≥10.0", "Increase by 4 units"],
  ["8.0–9.9", "Increase by 2–4 units"],
  ["7.0–7.9", "No change, or increase by 2 units"],
  ["6.0–6.9", "No change"],
  ["4.0–5.9", "No change, or decrease by 2 units"],
  ["<4.0", "Decrease by 2–4 units"],
];

const patientTitration = [
  ["≥6.0 mmol/L but ≤8.0 mmol/L", "No change"],
  ["4.0–6.0 mmol/L", "Decrease the insulin dose by 2 units"],
  ["<4.0 mmol/L", "Decrease the insulin dose by 4 units"],
];

const initiation = [
  {
    question: "When should insulin be used as first-line treatment?",
    points: [
      "In hyperglycaemic emergencies requiring hospitalisation (for example diabetic ketoacidosis, or hyperosmolar hyperglycaemic state).",
      "Severe hyperglycaemia (BGL >20 mmol/L or HbA1c >10%) even without symptoms.",
    ],
  },
  {
    question: "Why do many patients with type 2 diabetes eventually require insulin?",
    points: ["Because of the progressive reduction of beta cell mass, making insulin therapy necessary over time."],
  },
  {
    question: "How should pharmacists and healthcare providers counsel patients about starting insulin?",
    points: [
      "Patients should be reassured that insulin initiation reflects disease progression, not failure in self-management.",
    ],
  },
  {
    question: "What are the risks of delaying insulin initiation?",
    points: [
      "Longer time to reach HbA1c targets.",
      "Increased risk of diabetes-related complications due to prolonged suboptimal glucose control.",
    ],
  },
  {
    question: "What education topics should be covered when a patient starts insulin?",
    points: [
      "Self-management and glucose monitoring.",
      "Dose titration.",
      "Impact of diet and exercise.",
      "Injection technique.",
      "Insulin storage.",
      "Weight management.",
      "Sick day planning.",
      "Driving and licensing obligations (for example Austroads).",
    ],
  },
  {
    question: "What insulin regimen is commonly initiated in type 2 diabetes?",
    points: ["Basal insulin is usually started and added to existing therapies."],
  },
  {
    question: "What is the typical starting dose of insulin?",
    points: [
      "Usually 0.1–0.2 units/kg. Alternatively, a fixed low dose of 10 units.",
      "May increase to 0.3–0.4 units/kg in cases of significant hyperglycaemia.",
    ],
  },
  {
    question: "How should insulin doses be titrated?",
    points: [
      "Commonly by 1–2 units at a time.",
      "Frequency of adjustment depends on insulin type (for example long-acting insulin every 3–5 days).",
    ],
  },
  {
    question: "What is the recommended approach if once- or twice-daily insulin is insufficient?",
    points: ["Introduce rapid-acting insulin to intensify the regimen."],
  },
  {
    question: "What is a typical starting dose for rapid-acting insulin when added to a basal regimen?",
    points: ["4 units, or 10% of the basal dose."],
  },
];

const interactions = [
  {
    medicine: "Sulfonylureas",
    type: "Pharmacodynamic interaction",
    effect: ["Increased risk of hypoglycaemia"],
    notes: "Stimulates insulin secretion from pancreatic beta cells.",
  },
  {
    medicine: "GLP-1 RA",
    type: "Pharmacodynamic interaction",
    effect: ["Increased risk of hypoglycaemia"],
    notes: "Also stimulates insulin secretion.",
  },
  {
    medicine: "Pioglitazone",
    type: "Pharmacodynamic interaction",
    effect: ["Increased risk of oedema", "Increased risk of heart failure", "Increased risk of hypoglycaemia"],
    notes: "Not commonly used due to cardiovascular risk.",
  },
];

function InsulinRows({ rows, showBrands }: { rows: InsulinRow[]; showBrands: boolean }) {
  return rows.map((row, index) => (
    <tr key={`${row.insulin}-${index}`} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
      {row.type ? (
        <td rowSpan={row.typeSpan} className={`${cellClass} sticky left-0 z-10 min-w-40 bg-inherit font-medium`}>
          {row.type}
        </td>
      ) : null}
      <td className={`${cellClass} min-w-40 font-medium`}>{row.insulin}</td>
      {showBrands ? (
        <td className={`${cellClass} min-w-44`}>
          <Points items={row.brands} />
        </td>
      ) : null}
      <td className={`${cellClass} min-w-36`}>
        <Thumbs photos={row.photos} />
      </td>
      {row.regimen ? (
        <td rowSpan={row.regimenSpan} className={`${cellClass} min-w-64`}>
          {row.regimen}
        </td>
      ) : null}
      {row.traits ? (
        <td rowSpan={row.traitsSpan} className={`${cellClass} min-w-48`}>
          {row.traits}
        </td>
      ) : null}
    </tr>
  ));
}

export function InsulinChart() {
  return (
    <div className="space-y-8">
      <Section id="moa" title="Mechanism of action">
        <Table headers={["Question", "Answer"]}>
          {moa.map((item, index) => (
            <tr key={item.question} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              <td className={`${cellClass} sticky left-0 z-10 min-w-64 bg-inherit font-medium`}>{item.question}</td>
              <td className={`${cellClass} min-w-72`}>
                <Points items={item.points} />
              </td>
            </tr>
          ))}
        </Table>
        <div className="grid gap-4 lg:grid-cols-2">
          <Diagram
            file="endogenous.png"
            alt="Endogenous insulin: beta-cell release toward a target cell, with basal and mealtime plasma insulin across breakfast, lunch, and dinner."
          />
          <Diagram
            file="exogenous.png"
            alt="Exogenous insulin injected into subcutaneous tissue, dispersing from hexamers into monomers that enter a blood capillary."
          />
        </div>
      </Section>

      <Section id="regimens" title="Insulin regimens">
        <Table headers={["Regimen", "Pattern"]}>
          {regimens.map(([name, pattern], index) => (
            <tr key={name} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              <td className={`${cellClass} sticky left-0 z-10 w-40 bg-inherit font-medium`}>{name}</td>
              <td className={cellClass}>{pattern}</td>
            </tr>
          ))}
        </Table>
      </Section>

      <Section id="single" title="Single insulins">
        <Table headers={["Type", "Insulin", "Brands", "Product", "Regimen", "Characteristics"]}>
          <InsulinRows rows={singleInsulins} showBrands />
        </Table>
      </Section>

      <Section id="mixed" title="Mixed insulins">
        <Table headers={["Type", "Insulin", "Product", "Regimen", "Characteristics"]}>
          <InsulinRows rows={mixedInsulins} showBrands={false} />
        </Table>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Time–action profile</h3>
          <p className="mb-3 text-sm leading-6 text-ink-soft">
            Plasma insulin level from 0 to 24 hours for rapid-acting analogs (lispro, aspart, glulisine), short-acting human regular insulin, intermediate-acting human insulin (NPH), and long-acting analogs (detemir, glargine, and U-300 glargine or degludec).
          </p>
          <Diagram
            wide
            file="action-profile.png"
            alt="Time-action profile of plasma insulin over 24 hours for rapid-acting, short-acting, intermediate-acting, and long-acting insulins."
          />
        </div>
      </Section>

      <Section id="devices" title="Insulin delivery devices">
        <Table headers={["Device", "Key features", "Additional notes"]}>
          {devices.map((device, index) => (
            <tr key={device.name} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              <td className={`${cellClass} sticky left-0 z-10 min-w-48 bg-inherit`}>
                <p className="font-medium">{device.name}</p>
                <div className="mt-2">
                  <Thumbs photos={device.photos} />
                </div>
              </td>
              <td className={`${cellClass} min-w-72`}>
                <Points items={device.features} />
              </td>
              <td className={`${cellClass} min-w-56`}>
                <Points items={device.notes} />
              </td>
            </tr>
          ))}
        </Table>
        <Callout>
          <p className="font-medium">Sharps disposal</p>
          <div className="mt-1">
            <Points
              items={[
                "All sharps and test strips must go into sharps containers.",
                "Containers are available from pharmacies or local councils (state-dependent).",
                "This prevents needle-stick injury and environmental contamination.",
              ]}
            />
          </div>
        </Callout>
      </Section>

      <Section id="basal-start" title="Starting and adjusting basal insulin">
        <Diagram
          wide
          file="basal-flowchart.png"
          alt="RACGP figure: starting and adjusting basal insulin, with practitioner-led and patient-led titration tables."
        />
        <div className="grid gap-3">
          <div className="rounded-lg bg-moss px-4 py-3 text-sm leading-6 text-paper">
            <p>
              <strong>Step 1. Select</strong> basal insulin and the injecting device.
            </p>
          </div>
          <div className="rounded-lg bg-moss px-4 py-3 text-sm leading-6 text-paper">
            <p>
              <strong>Step 2. Start</strong> basal insulin: 0.1 units/kg or <strong>10 units</strong> at bedtime or in the morning.
            </p>
            <p className="mt-2">
              <strong>Continue</strong> oral glucose-lowering medication.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>
                If fasting blood glucose (FBG) is high (pre-breakfast), consider evening or morning insulin dosing of a long-acting (&gt;24 hours) basal insulin.
              </li>
              <li>
                If FBG is on target, but the pre-dinner blood glucose level (BGL) is high, consider morning insulin dosing of intermediate-acting insulin.
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-moss px-4 py-3 text-sm leading-6 text-paper">
            <p>
              <strong>Step 3. Titration</strong>
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>
                If using long-acting basal insulin (morning or evening doses), adjust doses to achieve FBG targets.
              </li>
              <li>
                If using intermediate-acting basal insulin, use pre-dinner glucose targets to adjust the morning doses, and FBG targets to adjust any additional evening doses.
              </li>
            </ul>
            <p className="mt-2">
              Practitioner-led titration can achieve target in a shorter time than patient-led titration.
            </p>
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <div>
            <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Practitioner-led titration</h3>
            <p className="mb-2 text-sm leading-6 text-ink-soft">
              Adjust the insulin dose twice weekly as shown, until the FBG target is achieved.
            </p>
            <Table headers={["Mean FBG over previous two days (mmol/L)*", "Insulin dose adjustment"]}>
              {practitionerTitration.map(([range, adjustment], index) => (
                <tr key={range} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
                  <td className={`${cellClass} font-medium`}>{range}</td>
                  <td className={cellClass}>{adjustment}</td>
                </tr>
              ))}
            </Table>
          </div>
          <div>
            <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Patient-led titration</h3>
            <p className="mb-2 text-sm leading-6 text-ink-soft">
              Adjust the insulin dose every three days. Increase by 2 units until the FBG target is achieved.
            </p>
            <Table headers={["Mean FBG over previous three days (mmol/L)*", "Insulin dose adjustment"]}>
              {patientTitration.map(([range, adjustment], index) => (
                <tr key={range} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
                  <td className={`${cellClass} font-medium`}>{range}</td>
                  <td className={cellClass}>{adjustment}</td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
        <Callout>
          <p>* Do not increase the insulin dose if FBG is &lt;4.0 mmol/L at any time in the preceding week.</p>
          <p className="mt-2 font-medium">Reference: RACGP</p>
        </Callout>
      </Section>

      <Section id="initiation" title="Initiation, counselling, and indications">
        <Table headers={["Question", "Answer"]}>
          {initiation.map((item, index) => (
            <tr key={item.question} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              <td className={`${cellClass} sticky left-0 z-10 min-w-64 bg-inherit font-medium`}>{item.question}</td>
              <td className={`${cellClass} min-w-72`}>
                <Points items={item.points} />
              </td>
            </tr>
          ))}
        </Table>
      </Section>

      <Section id="interactions" title="Interactions with insulin">
        <Table headers={["Medicine or class", "Type of interaction", "Effect / risk", "Notes"]}>
          {interactions.map((item, index) => (
            <tr key={item.medicine} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              <td className={`${cellClass} sticky left-0 z-10 min-w-36 bg-inherit font-medium`}>{item.medicine}</td>
              <td className={`${cellClass} min-w-40`}>{item.type}</td>
              <td className={`${cellClass} min-w-52`}>
                <Points items={item.effect} />
              </td>
              <td className={`${cellClass} min-w-52`}>{item.notes}</td>
            </tr>
          ))}
        </Table>
      </Section>

      <Section id="precautions" title="Precautions and adverse effects">
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Hypoglycaemia</h3>
          <Callout tone="alert">
            <strong>Insulin is a high-risk medicine</strong> because it can significantly lower blood glucose.
          </Callout>
          <div className="mt-3">
            <Table headers={["Causes", "Symptoms"]}>
              <tr className="bg-paper">
                <td className={cellClass}>
                  <Points
                    items={[
                      "Excessive insulin dosage.",
                      "Inadequate or delayed food intake.",
                      "Increased physical activity.",
                      "Inappropriate timing of the injection.",
                      "Incorrect injection type (for example bolus instead of basal).",
                      "Dose changes in other medicines (for example corticosteroids).",
                      "Alcohol consumption.",
                      "Improved insulin sensitivity (for example after an infection).",
                    ]}
                  />
                </td>
                <td className={`${cellClass} min-w-56`}>
                  <p>Sweating, hunger, tremor, lip tingling, headache, confusion, altered mood, faintness.</p>
                  <p className="mt-2">
                    <strong>Many people may experience hypoglycaemia unawareness.</strong>
                  </p>
                </td>
              </tr>
            </Table>
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-serif text-xl tracking-tight text-ink">Injection site reactions</h3>
          <Table headers={["Reaction", "Description", "Prevention / management"]}>
            <tr className="bg-paper">
              <td className={`${cellClass} font-medium`}>Inflammation</td>
              <td className={cellClass}>Pain and irritation at the injection site.</td>
              <td className={cellClass}>Provide education on proper injection technique.</td>
            </tr>
            <tr className="bg-paper-raised">
              <td className={`${cellClass} font-medium`}>Lipohypertrophy</td>
              <td className={cellClass}>
                Fatty tissue build-up (nodules or swelling), causing unpredictable insulin absorption.
              </td>
              <td className={cellClass}>
                <Points
                  items={[
                    "Rotate injection sites.",
                    "Use a new needle for each injection.",
                    "Use the correct needle length.",
                  ]}
                />
              </td>
            </tr>
          </Table>
        </div>
      </Section>
    </div>
  );
}
