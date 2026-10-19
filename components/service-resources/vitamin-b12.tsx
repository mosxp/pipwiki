import type { ReactNode } from "react";
import { ZoomImage } from "@/components/counselling/zoom-image";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
      <h2 className="border-b border-line px-4 py-4 font-serif text-2xl tracking-tight text-ink">{title}</h2>
      <div className="space-y-4 px-4 py-5 text-base leading-7 text-ink">{children}</div>
    </section>
  );
}

function Subhead({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-8 text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
      {children}
    </h3>
  );
}

function Callout({ children, tone = "note" }: { children: ReactNode; tone?: "note" | "alert" }) {
  const toneClass = tone === "alert" ? "border-[#8c3b32] bg-[#f8ece8]" : "border-line bg-[#f3ecdf]";
  return <div className={`rounded-lg border px-4 py-3 text-sm leading-6 text-ink ${toneClass}`}>{children}</div>;
}

function Points({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

const headClass = "px-3 py-2 font-medium";
const cellClass = "border-t border-line px-3 py-3 align-top";

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm leading-6 text-ink">
        <thead className="bg-moss text-paper">
          <tr>
            {headers.map((header) => (
              <th key={header} className={headClass}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`${cellClass} ${cellIndex === 0 ? "sticky left-0 z-10 min-w-36 bg-inherit font-medium" : "min-w-40"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const steps = [
  "Assemble all necessary equipment to inject the medicine: hydroxocobalamin 1 mg/mL ampoule, 38 mm long 18 gauge drawing-up needle and a 25 mm long 22–25 gauge giving needle, sharps contaminated-waste container, syringe, and sterile alcohol swab. Needle requirements may vary depending on the age and size of the patient. No more than 2 mL of medication should be injected via the intramuscular route.",
  "Thoroughly wash and dry your hands.",
  "Inspect the ampoule for any colour changes or particulate matter. The solution should be either a clear pale red (Vita-B12, Cobal-B12) or a dark red colour (Hydroxo-B12, Neo-B12).",
  "Tap the ampoule to ensure all the solution is at the bottom of the ampoule.",
  "Wipe the top of the glass ampoule with an alcohol swab. Let it dry for 30 seconds.",
  "With the swab around the neck of the ampoule, snap the top off in a direction away from your body.",
  "Attach the drawing-up needle to the syringe.",
  "Remove the needle cap, and place the needle into the bottom of the ampoule.",
  "Pull the syringe plunger upwards until all the solution is removed from the ampoule.",
  "Remove the drawing-up needle from the syringe and place it in the sharps container.",
  "Push the plunger slowly down until there is 1 mL of the solution in the syringe, ensuring that the solution is at the tip of the syringe.",
  "Attach the giving needle to the syringe.",
  "Place the needle at a 90-degree angle to the skin.",
  "Push the syringe plunger down to inject all the solution into the muscle, wait 10 seconds, and then carefully remove the needle from the injection site.",
  "Do not rub the injection site once the needle has been removed.",
  "Place all used injection equipment into the sharps container.",
];

export function VitaminB12() {
  return (
    <div className="space-y-8">
      <Section id="indications" title="Indications and clinical rationale">
        <p>Intramuscular injection of hydroxocobalamin (vitamin B12) is used to treat:</p>
        <Points
          items={[
            "Pernicious anaemia and other macrocytic anaemias associated with vitamin B12 deficiency.",
            "Vitamin B12 dietary deficiency, used in the initial treatment if the intestinal mucosa has been compromised by a long period of vitamin B12 deficiency causing reversible malabsorption.",
            "Optic neuropathies such as tobacco amblyopia and Leber’s optic atrophy.",
            "Cyanide poisoning (high doses: hydroxocobalamin 2.5 gram injection).",
          ]}
        />
        <p>This guide focuses on hydroxocobalamin associated with vitamin B12 deficiency.</p>
        <p>
          Vitamin B12 is essential for nerve development, nucleic acid synthesis, and normal erythropoiesis. It is
          commonly tested for when investigating anaemia and dementia. Early treatment may be essential to prevent
          neurological damage becoming irreversible. Symptoms present for over a year tend to persist.
        </p>
      </Section>

      <Section id="symptoms" title="Symptoms and causes">
        <Subhead id="causes">Reasons for deficiency</Subhead>
        <Points
          items={[
            "Impaired absorption, for example autoimmune gastritis, bariatric surgery, gastrectomy, gastric bypass, exocrine pancreatic failure, inflammatory bowel disease, loss or disease of the terminal ileum, and intestinal bacterial overgrowth.",
            "Inadequate dietary intake. People who follow a strict vegan diet for a number of years, including breastfed infants of mothers who are vegan.",
          ]}
        />
        <Subhead id="deficiency-symptoms">Symptoms of vitamin B12 deficiency</Subhead>
        <p>
          Fatigue, lethargy, breathlessness, feeling faint, headaches, pale skin, palpitations, tinnitus, loss of
          appetite and weight loss, sore and red tongue (glossitis), mouth ulcers, pins and needles (paraesthesia),
          disturbed vision, irritability, depression, memory loss, tingling in the hands or feet, changes in feeling
          the hands or feet, and visual disturbances.
        </p>
      </Section>

      <Section id="pathology" title="Pathology screening and interpretation">
        <p>
          Vitamin B12 is present in the circulation bound to two proteins, transcobalamin (known as active B12) and
          haptocorrin (inactive). If total vitamin B12 is greater than 340 nmol/L, vitamin B12 deficiency is unlikely.
          Up to 30% of patients with a normal total B12 have low levels of active B12, indicating deficiency.
        </p>
        <Table
          headers={["Test", "Deficiency likely", "Between the cut-offs", "Deficiency unlikely"]}
          rows={[
            [
              "Total B12",
              "<80 nmol/L",
              "80–340 nmol/L. Consider intrinsic factor antibodies and malabsorption.",
              ">340 nmol/L",
            ],
            ["Active B12", "<38 nmol/L", "—", ">65 nmol/L"],
          ]}
        />
        <p className="text-sm leading-6 text-ink-soft">
          Concentrations are nmol/L. Intrinsic factor antibodies are the antibody test referred to in the 80–340
          nmol/L band. Cut-off ranges may vary between pathology services. Other tests may also be used to measure
          deficiency.
        </p>
      </Section>

      <Section id="precautions" title="Precautions and patient status">
        <Callout>
          These are some of the more notable precautions and adverse effects. Refer to the product information for the
          full list. If you have any concerns, contact the patient’s prescriber before administering the product.
        </Callout>
        <Subhead id="anaemia-cause">Cause of anaemia</Subhead>
        <p>Confirm the cause of the patient’s anaemia before starting vitamin B12 treatment.</p>
        <Subhead id="pregnancy">Pregnancy and breastfeeding</Subhead>
        <Points
          items={[
            "Vitamin B12 crosses the placental barrier. It is not recommended in pregnancy unless the expected benefits outweigh any potential risk to the infant.",
            "Hydroxocobalamin is distributed into breast milk. It is not recommended for breastfeeding mothers unless the expected benefits to the mother outweigh any potential risk to the infant.",
            "Megaloblastic anaemia of pregnancy is usually due to folic acid deficiency rather than vitamin B12 deficiency.",
          ]}
        />
        <Subhead id="allergies">Known allergies</Subhead>
        <p>Do not inject if the patient is allergic to:</p>
        <Points
          items={[
            "Hydroxocobalamin.",
            "Any ingredients in the injection.",
            "Cobalt. Symptoms of an allergic reaction may include shortness of breath, wheezing or difficulty breathing, swelling of the face, lips, tongue, or other parts of the body, skin rash, itching, or hives.",
          ]}
        />
        <Callout tone="alert">If the patient has a known allergy, do not inject. Refer the patient to their doctor.</Callout>
        <Subhead id="oral-alternative">Unable to tolerate intramuscular injections</Subhead>
        <p>
          If the patient cannot tolerate intramuscular vitamin B12, high-dose oral cyanocobalamin (for example 1 mg
          daily) may be tried. Patients will require regular monitoring of their vitamin B12 concentration.
        </p>
      </Section>

      <Section id="dosing" title="Dosing and maintenance schedule">
        <Table
          headers={["Condition", "Initial dose", "Maintenance dose"]}
          rows={[
            [
              "Vitamin B12 malabsorption.",
              "Hydroxocobalamin IM 1 mg on alternate days for 1–2 weeks, or until improvement occurs.",
              "Hydroxocobalamin IM 1 mg every 2–3 months.",
            ],
            [
              "Dietary vitamin B12 deficiency if the intestinal mucosa has been compromised by a long period of B12 deficiency causing reversible malabsorption.",
              "Hydroxocobalamin IM 1 mg on alternate days for 1–2 weeks, or until improvement occurs.",
              "Hydroxocobalamin IM 1 mg every 2–3 months.",
            ],
          ]}
        />
        <Callout>
          Pernicious anaemia or bowel resection requires lifelong treatment with vitamin B12 injection. The same dose
          is used for adults and children.
        </Callout>
      </Section>

      <Section id="administration" title="Administration and injection sites">
        <p>Hydroxocobalamin injection solution 1 mg/mL is either:</p>
        <Points
          items={[
            "Clear, pale red liquid (Vita-B12, Cobal-B12), or",
            "Clear, dark red liquid (Hydroxo-B12, Neo-B12).",
          ]}
        />
        <p>
          The solution is in a glass ampoule that contains no antimicrobial agent. It is for single use only. Store at
          room temperature.
        </p>
        <Subhead id="equipment">Equipment</Subhead>
        <Points
          items={[
            "Hydroxocobalamin 1 mg/mL ampoule.",
            "38 mm long 18 gauge drawing-up needle.",
            "25 mm long 22–25 gauge giving needle. Needle requirements may vary with the age and size of the patient.",
            "Syringe, sterile alcohol swab, and a sharps contaminated-waste container.",
            "No more than 2 mL of medication should be injected via the intramuscular route.",
          ]}
        />
        <Subhead id="sites">Injection sites</Subhead>
        <p>
          Hydroxocobalamin is administered intramuscularly into either the abdomen, thigh, or upper arm. The choice of
          injection site may be influenced by patient preference and ease of administration.
        </p>
        <ZoomImage
          src="/service-resources/vitamin-b12/injection-sites.png"
          alt="Diagram of intramuscular injection sites on the upper arms, abdomen, and outer thighs"
          buttonClassName="block max-w-xs bg-white"
          className="h-auto max-h-72 w-full object-contain"
        />
        <Subhead id="steps">How to inject hydroxocobalamin</Subhead>
        <ol className="list-decimal space-y-2 pl-5">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>

      <Section id="monitoring" title="Monitoring and side effects">
        <Subhead id="onset">Onset of effect</Subhead>
        <p>
          The onset of effect should be immediate, but it may take a few days or weeks before symptoms start to
          improve. In patients with anaemia, malaise will improve within 2 days of the first injection. Neuropathy
          improves slowly. Patients with a long history of neurological symptoms may have residual effects.
        </p>
        <Subhead id="potassium">Initial phase for pernicious anaemia</Subhead>
        <p>
          The doctor will monitor potassium levels during the initial stages of vitamin B12 treatment, and will correct
          hypokalaemia as needed.
        </p>
        <Subhead id="follow-up">Ongoing monitoring</Subhead>
        <p>The doctor will monitor vitamin B12 levels. The patient will need a full blood count every year.</p>
        <Subhead id="side-effects">Typical side effects</Subhead>
        <p>
          Transitory hypertension, diarrhoea, dizziness, headache, nausea, pain or irritation at the injection site,
          vomiting, red-coloured faeces, or pink-tinged urine.
        </p>
      </Section>

      <Section id="products" title="Product information">
        <p>1 mL injection (1 mg/mL). Discard any residue. Store below 25°C. Unscheduled.</p>
        <Table
          headers={["Product", "Salt", "Sponsor"]}
          rows={[
            ["Neo-B12", "Hydroxocobalamin chloride", "Pfizer Australia Pty Ltd"],
            ["Vita-B12", "Hydroxocobalamin acetate", "Amdipharm Mercury (Australia) Pty Ltd"],
            ["Cobal-B12", "Hydroxocobalamin acetate", "Amdipharm Mercury (Australia) Pty Ltd"],
            ["Hydroxo-B12", "Hydroxocobalamin chloride", "Aspen Pharmacare Australia Pty Ltd"],
          ]}
        />
      </Section>
    </div>
  );
}
