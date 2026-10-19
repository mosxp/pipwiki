import type { ReactNode } from "react";
import { ZoomImage } from "@/components/counselling/zoom-image";
import { preventers, relievers } from "@/components/medicine-notes/asthma-data";

const img = (file: string) => `/medicine-notes/asthma-copd/${file}`;

const pbsMarks = [
  ["†", "Asthma, unrestricted benefit"],
  ["^", "COPD, unrestricted benefit"],
  ["‡", "Asthma, restricted benefit"],
  ["#", "COPD, restricted benefit"],
  ["a", "Asthma, authority required"],
  ["c", "COPD, authority required"],
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
      <h2 className="border-b border-line px-4 py-4 font-serif text-2xl tracking-tight text-ink">{title}</h2>
      <div className="space-y-4 px-4 py-5">{children}</div>
    </section>
  );
}

function Marks() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-6">
      {pbsMarks.map(([mark, meaning]) => (
        <li key={mark}>
          <strong>{mark}</strong> {meaning}
        </li>
      ))}
    </ul>
  );
}

function Photos({ files, alt }: { files: string[]; alt: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file) => (
        <ZoomImage key={file} src={img(file)} alt={alt} className="h-16 w-16 object-contain" />
      ))}
    </div>
  );
}

const biologics = [
  {
    name: "Omalizumab (Xolair)",
    images: [{ file: "biologics/xolair.png", alt: "Xolair 150 mg and 75 mg solution for injection boxes." }],
    target: "IgE",
    indication: "moderate–severe allergic asthma with elevated IgE",
    approved: [
      "≥ 12 years: moderate-to-severe allergic asthma",
      "6 to < 12 years: severe allergic asthma with exacerbations despite daily high-dose ICS (Serum IgE levels within specified ranges)",
    ],
    age: "≥6 years",
    route: "SC injection (powder for injection, pre-filled autoinjector, pre-filled safety syringe)",
    dose: ["Based on body weight and serum IgE"],
    other: ["Chronic rhinosinusitis with nasal polyps", "Chronic spontaneous urticaria"],
  },
  {
    name: "Mepolizumab (Nucala)",
    images: [
      { file: "biologics/nucala-box.png", alt: "Nucala 100 mg solution for injection prefilled pen box." },
      { file: "biologics/nucala-pen.png", alt: "Nucala 100 mg prefilled pen." },
    ],
    target: "IL-5",
    indication: "severe eosinophilic asthma",
    approved: ["Severe eosinophilic asthma"],
    age: "≥12 years",
    route: "SC injection (pre-filled auto-injector)",
    dose: ["100 mg every 4 weeks"],
    other: ["Chronic rhinosinusitis with nasal polyps", "Relapsing or refractory EGPA"],
  },
  {
    name: "Benralizumab (Fasenra)",
    images: [{ file: "biologics/fasenra.png", alt: "Fasenra Pen 30 mg/1 mL box and prefilled pen." }],
    target: "IL-5Ra on surface of eosinophils and basophils",
    indication: "severe eosinophilic asthma",
    approved: [
      "Severe eosinophilic asthma (blood eosinophil count 300 cells/microL or 150 cells/microL while on oral corticosteroid treatment)",
    ],
    age: "≥12 years",
    route: "SC injection (pre-filled auto-injector)",
    dose: ["30 mg every 4 weeks (first 3 doses) then every 8 weeks"],
    other: ["Not applicable"],
  },
  {
    name: "Dupilumab (Dupixent)",
    images: [{ file: "biologics/dupixent.png", alt: "Dupixent 300 mg/2 mL box and prefilled syringes." }],
    target: "IL-4Ra subunit of IL-4 and IL-13 receptor complexes",
    indication: "moderate–severe type 2 inflammation (↑ eosinophils or FeNO)",
    approved: [
      "Moderate-to-severe asthma with type 2 inflammation (elevated eosinophils or elevated FeNO) inadequately controlled despite other maintenance treatment",
    ],
    age: "≥6 years",
    route: "SC injection (pre-filled auto-injector, pre-filled safety syringe)",
    dose: [
      "≥ 12 years: 400 mg (first injection) then 200 mg every 2 weeks (higher dose if OCS-dependent or comorbidity)†",
      "Children < 12 years: based on bodyweight",
    ],
    other: ["Chronic rhinosinusitis with nasal polyposis", "Atopic dermatitis", "Prurigo nodularis"],
  },
];

export function AsthmaCopdChart() {
  return (
    <div className="space-y-8">
      <Section id="relievers" title="Relievers">
        <div className="rounded-lg border border-line bg-[#f3ecdf] px-4 py-3">
          <Marks />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm leading-6 text-ink">
            <thead className="bg-moss text-paper">
              <tr>
                {["Brand", "Device", "Tags", "Active ingredient", "PBS prescribers"].map((heading) => (
                  <th key={heading} className="px-3 py-2 font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {relievers.map((row, index) => (
                <tr key={row.brand} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
                  <td className="sticky left-0 z-10 min-w-52 border-t border-line bg-inherit px-3 py-3 align-top">
                    <Photos files={row.images} alt={row.brand} />
                    <p className="mt-2 font-medium">{row.brand}</p>
                  </td>
                  <td className="border-t border-line px-3 py-3 align-top">{row.device}</td>
                  <td className="min-w-48 border-t border-line px-3 py-3 align-top">{row.tags}</td>
                  <td className="min-w-48 border-t border-line px-3 py-3 align-top">{row.ingredient}</td>
                  <td className="min-w-64 border-t border-line px-3 py-3 align-top">{row.pbs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="preventers" title="Preventers & Combinations">
        <div className="rounded-lg border border-line bg-[#f3ecdf] px-4 py-3">
          <Marks />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm leading-6 text-ink">
            <thead className="bg-moss text-paper">
              <tr>
                {["Brand", "Device", "Tags", "Strengths", "PBS criteria", "Notes"].map((heading) => (
                  <th key={heading} className="px-3 py-2 font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preventers.map((row, index) => (
                <tr key={row.brand} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
                  <td className="sticky left-0 z-10 min-w-56 border-t border-line bg-inherit px-3 py-3 align-top">
                    <Photos files={row.images} alt={row.brand} />
                    <p className="mt-2 font-medium">{row.brand}</p>
                  </td>
                  <td className="border-t border-line px-3 py-3 align-top whitespace-nowrap">{row.device}</td>
                  <td className="min-w-48 border-t border-line px-3 py-3 align-top">{row.tags}</td>
                  <td className="min-w-64 border-t border-line px-3 py-3 align-top">
                    <div className="space-y-1">
                      {row.strengths.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </td>
                  <td className="min-w-56 border-t border-line px-3 py-3 align-top">{row.pbs}</td>
                  <td className="min-w-40 border-t border-line px-3 py-3 align-top">{row.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="biologics" title="Monoclonal antibody (biologic) therapy for Asthma">
        <div className="rounded-lg border border-line bg-[#f3ecdf] px-4 py-3 text-sm leading-6">
          <p>
            Monoclonal antibody (biologic) therapy: added to optimised ICS-based treatment — Add-on treatment to
            high-dose ICS-LABA for patients with severe allergic or eosinophilic asthma: Markedly reduces the rate of
            severe asthma exacerbations / Improves asthma symptom control / Reduces emergency department visits or
            hospitalisation / Reduces the use of systemic corticosteriods.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm leading-6 text-ink">
            <thead className="bg-moss text-paper">
              <tr>
                {[
                  "Medicines",
                  "Target",
                  "Indication",
                  "Approved* asthma indication",
                  "Age",
                  "Route of administration",
                  "Dose (asthma)",
                  "Other approved* indications",
                ].map((heading) => (
                  <th key={heading} className="px-3 py-2 font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {biologics.map((row, index) => (
                <tr key={row.name} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
                  <td className="sticky left-0 z-10 min-w-48 border-t border-line bg-inherit px-3 py-3 align-top">
                    <div className="flex flex-wrap gap-2">
                      {row.images.map((image) => (
                        <ZoomImage
                          key={image.file}
                          src={img(image.file)}
                          alt={image.alt}
                          className="h-16 w-16 object-contain"
                        />
                      ))}
                    </div>
                    <p className="mt-2 font-medium">{row.name}</p>
                  </td>
                  <td className="border-t border-line px-3 py-3 align-top">{row.target}</td>
                  <td className="border-t border-line px-3 py-3 align-top">{row.indication}</td>
                  <td className="border-t border-line px-3 py-3 align-top">
                    <div className="space-y-2">
                      {row.approved.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </td>
                  <td className="border-t border-line px-3 py-3 align-top whitespace-nowrap">{row.age}</td>
                  <td className="border-t border-line px-3 py-3 align-top">{row.route}</td>
                  <td className="border-t border-line px-3 py-3 align-top">
                    <div className="space-y-2">
                      {row.dose.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </td>
                  <td className="border-t border-line px-3 py-3 align-top">
                    <div className="space-y-2">
                      {row.other.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-6 text-ink-soft">
          EGPA: eosinophilic granulomatosis with polyangiitis; FeNO: fractional exhaled nitric oxide; IgE: immunoglobulin
          E; IL: interleukin
        </p>
        <p className="text-sm leading-6 text-ink-soft">
          † comorbid moderate-to-severe atopic dermatitis or comorbid severe chronic rhinosinusitis with nasal polyposis
        </p>
      </Section>

      <Section id="montelukast" title="Montelukast">
        <div className="rounded-lg border border-line bg-[#f3ecdf] px-4 py-3 text-sm leading-6">
          <p>
            (MOA: inhibit cysteinyl leukotriene receptor; antagonize airway smooth muscle contraction and inflammation
            caused by leukotrienes)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm leading-6 text-ink">
            <thead className="bg-moss text-paper">
              <tr>
                {["Medicine", "Dose", "Counselling"].map((heading) => (
                  <th key={heading} className="px-3 py-2 font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-paper">
                <td className="sticky left-0 z-10 min-w-40 border-t border-line bg-inherit px-3 py-3 align-top">
                  <ZoomImage
                    src={img("montelukast.png")}
                    alt="Montelukast 10 mg tablets box, generic for Singulair, 30 tablets."
                    className="h-16 w-16 object-contain"
                  />
                  <p className="mt-2 font-medium">Montelukast</p>
                </td>
                <td className="border-t border-line px-3 py-3 align-top">
                  <p>4mg, 5mg, 10mg (Montelair, Singulair, Respikast)</p>
                  <p className="mt-2">Maintenance Tx of Asthma &amp; AR:</p>
                  <div className="mt-1 space-y-1">
                    <p>&lt;6yr: PO 4mg OD</p>
                    <p>6-15yr: PO 5mg OD</p>
                    <p>Adult: PO 10mg OD</p>
                  </div>
                </td>
                <td className="border-t border-line px-3 py-3 align-top">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      For asthma: take this medicine in the evening, do not use this medicine to relieve symptoms of an
                      asthma attack, follow your asthma action plan.
                    </li>
                    <li>If you notice a change in moods or behaviour, tell your doctor.</li>
                    <li>Chewable tablet: chew thoroughly before swallowing, do not swallow whole.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
