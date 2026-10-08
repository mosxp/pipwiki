"use client";

import { useState } from "react";
import { Disclaimer } from "@/components/disclaimer";
import type { jsPDF } from "jspdf";
import type { UserOptions } from "jspdf-autotable";

type YesNo = "" | "yes" | "no";
type Extent = "" | "local" | "one" | "multiple";

type CheckItem = { label: string };

type FormState = {
  age: string;
  consent: YesNo;
  presentation: YesNo;
  extent: Extent;
  redFlags: string[];
  gpTriggers: string[];
};

const noneLabel = "None of the above";

const extentOptions: { value: Exclude<Extent, "">; label: string }[] = [
  { value: "local", label: "≤ 2 sores in a single location" },
  { value: "one", label: "> 2 sores in one location" },
  { value: "multiple", label: "> 2 sores in multiple body regions" },
];

const redFlagItems: CheckItem[] = [
  { label: "Systemic illness (fever, lethargy, headache, nausea)" },
  { label: "Widespread painful rash" },
  { label: "Non-blanching purple rash" },
  { label: "Blistering of mucous membranes" },
  { label: "Generalised erythema >90% with systemic symptoms" },
];

const gpTriggerItems: CheckItem[] = [
  { label: "Immunocompromised" },
  { label: "Recurrent impetigo (persists after 1st course or >2 in 12 months)" },
  { label: "High risk of ARF (e.g., ATSI in remote/overcrowded areas, history of ARF/RHD)" },
  { label: "Signs of bullous impetigo (large flaccid blisters) or deep ecthyma (ulcers)" },
  { label: "Unclear diagnosis/co-occurring conditions (e.g., HSV, shingles, eczema)" },
];

const emptyForm: FormState = {
  age: "",
  consent: "",
  presentation: "",
  extent: "",
  redFlags: [],
  gpTriggers: [],
};

type Flag = { title: string; detail: string };

type Recommendation =
  | { kind: "idle" }
  | { kind: "pending"; detail: string }
  | { kind: "ed"; title: string; detail: string }
  | { kind: "gp"; title: string; detail: string }
  | { kind: "concurrent"; title: string; detail: string }
  | { kind: "treat"; title: string; detail: string };

type Outcome = {
  flags: Flag[];
  recommendation: Recommendation;
  showLocal: boolean;
  showOral: boolean;
  dirty: boolean;
};

function readNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function clinicalSelections(items: string[]) {
  return items.filter((item) => item !== noneLabel);
}

function yesNoText(value: YesNo) {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Not answered";
}

function listText(items: string[]) {
  if (items.length === 1 && items[0] === noneLabel) return noneLabel;
  const clinical = clinicalSelections(items);
  return clinical.length > 0 ? clinical.join(", ") : "None selected";
}

function extentLabel(extent: Extent) {
  return extentOptions.find((option) => option.value === extent)?.label ?? "Not answered";
}

function derive(form: FormState): Outcome {
  const age = readNumber(form.age);
  const redFlags = clinicalSelections(form.redFlags);
  const gpItems = clinicalSelections(form.gpTriggers);
  const ageOut = age != null && age < 2;
  const extentMultiple = form.extent === "multiple";
  const hardGp = ageOut || form.consent === "no" || form.presentation === "no" || extentMultiple || gpItems.length > 0;
  const ready =
    age != null &&
    age >= 2 &&
    form.consent === "yes" &&
    form.presentation === "yes" &&
    redFlags.length === 0 &&
    !hardGp;

  const flags: Flag[] = [];
  if (redFlags.length > 0) flags.push({ title: "Red flag symptoms", detail: redFlags.join(", ") });
  if (ageOut) flags.push({ title: "Age", detail: "Age is under 2 years." });
  if (form.consent === "no") flags.push({ title: "Consent", detail: "The patient does not consent." });
  if (form.presentation === "no") {
    flags.push({ title: "Presentation", detail: "The presentation is not clear non-bullous impetigo." });
  }
  if (extentMultiple) flags.push({ title: "Extent", detail: extentLabel(form.extent) });
  if (gpItems.length > 0) flags.push({ title: "GP referral triggers", detail: gpItems.join(", ") });

  const dirty = Object.values(form).some((value) => (Array.isArray(value) ? value.length > 0 : value !== ""));

  let recommendation: Recommendation = { kind: "idle" };
  let showLocal = false;
  let showOral = false;

  if (redFlags.length > 0) {
    recommendation = {
      kind: "ed",
      title: "Immediate referral to Emergency Department",
      detail: "A red flag symptom is present. Do not treat under this protocol.",
    };
  } else if (hardGp) {
    showOral = true;
    recommendation = {
      kind: "gp",
      title: "Refer to GP",
      detail: "Do not supply antibiotics under this protocol.",
    };
  } else if (ready && form.extent === "one") {
    showLocal = true;
    recommendation = {
      kind: "concurrent",
      title: "Provide usual care and refer to GP for follow-up.",
      detail: "Topical treatment may still be considered, together with GP follow-up.",
    };
  } else if (ready && form.extent === "local") {
    showLocal = true;
    recommendation = {
      kind: "treat",
      title: "Safe to treat",
      detail: "Limited non-bullous impetigo is present and no referral trigger is showing. Topical treatment can be considered.",
    };
  } else if (dirty) {
    recommendation = {
      kind: "pending",
      detail: "No referral trigger is showing yet. Finish the remaining questions before supplying.",
    };
  }

  return { flags, recommendation, showLocal, showOral, dirty };
}

const inputClass =
  "mt-2 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-moss";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-line bg-paper-raised px-5 py-5">
      <h2 className="text-[11px] font-medium tracking-[0.16em] text-moss uppercase">{title}</h2>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  );
}

function RadioGroup<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  hint?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-ink">{label}</legend>
      {hint ? <p className="mt-1 text-xs leading-5 text-ink-soft">{hint}</p> : null}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={[
                "inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm",
                checked ? "border-moss bg-[var(--step-bg)] text-ink" : "border-line bg-paper text-ink/80",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="accent-moss"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium leading-6 text-ink">{label}</span>
      <span className="relative mt-2 block">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} mt-0 pr-16`}
          autoComplete="off"
        />
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-ink-soft">
          {suffix}
        </span>
      </span>
      {hint ? <span className="mt-1.5 block text-xs text-ink-soft">{hint}</span> : null}
    </label>
  );
}

function CheckGroup({
  label,
  hint,
  items,
  checked,
  onToggle,
}: {
  label: string;
  hint?: string;
  items: CheckItem[];
  checked: string[];
  onToggle: (item: string) => void;
}) {
  const rows = [...items, { label: noneLabel }];
  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-ink">{label}</legend>
      {hint ? <p className="mt-1 text-xs leading-5 text-ink-soft">{hint}</p> : null}
      <ul className="mt-2 space-y-0.5">
        {rows.map((item) => {
          const isChecked = checked.includes(item.label);
          const isNone = item.label === noneLabel;
          return (
            <li key={item.label} className={isNone ? "mt-1 border-t border-line pt-1" : undefined}>
              <label className="flex cursor-pointer items-start gap-2.5 rounded-md px-1 py-1 text-sm leading-5 text-ink hover:bg-paper/70">
                <span className="relative mt-0.5 inline-flex size-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(item.label)}
                    className="peer size-4 appearance-none rounded-full border border-moss/50 bg-paper checked:border-moss checked:bg-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
                  />
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden size-4 text-paper-raised peer-checked:block"
                  >
                    <path
                      d="M4 8.2 6.6 10.8 12 5.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{item.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

function UsualCare() {
  return (
    <div className="mt-3 rounded-md border border-line bg-white/70 px-3 py-2.5">
      <p className="text-sm font-medium text-ink">Usual care</p>
      <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-5 text-ink">
        <li>Good hand hygiene, keep nails short, cover with watertight dressing.</li>
        <li>Remove crusts gently using paw paw or white soft paraffin before applying topicals.</li>
        <li>Bleach baths: 10 mins daily (12 mL of 4% bleach in 10 L water).</li>
        <li>School exclusion: Stay home until 24 hours after antibiotics commence.</li>
      </ul>
    </div>
  );
}

function LocalisedTreatment() {
  return (
    <article className="rounded-lg border border-line bg-paper px-3.5 py-3">
      <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">Localised treatment</h3>
      <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-6 text-ink">
        <li>
          <span className="font-medium">1st line:</span> Topical mupirocin 2% (Apply every 8 hours for 5 days).
        </li>
        <li>
          <span className="font-medium">2nd line:</span> Topical hydrogen peroxide 1% (Apply every 8 hours for 5 days).
        </li>
      </ul>
    </article>
  );
}

function OralReference() {
  return (
    <article className="rounded-lg border border-orange-200 bg-orange-50/40 px-3.5 py-3">
      <h3 className="text-[11px] font-medium tracking-[0.14em] text-orange-800 uppercase">
        Extended or high-risk treatment
      </h3>
      <p className="mt-2 text-sm leading-6 text-ink">For GP co-management. Do not supply under this protocol.</p>
      <p className="mt-3 text-sm font-medium text-ink">Adult oral</p>
      <ul className="mt-1 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
        <li>Dicloxacillin/flucloxacillin 500 mg QID for 5 days (1st line).</li>
        <li>Cefalexin 1000 mg BD for 5 days.</li>
      </ul>
      <p className="mt-3 text-sm font-medium text-ink">Child oral</p>
      <ul className="mt-1 list-disc space-y-1 pl-4 text-sm leading-6 text-ink">
        <li>Cefalexin 25 mg/kg up to 1000 mg BD for 5 days.</li>
        <li>Dicloxacillin 12.5 mg/kg up to 500 mg QID for 5 days.</li>
      </ul>
    </article>
  );
}

function outcomeClass(kind: Recommendation["kind"]) {
  if (kind === "ed") return "border-red-200 bg-red-50";
  if (kind === "gp") return "border-orange-200 bg-orange-50";
  if (kind === "concurrent") return "border-yellow-300 bg-yellow-50";
  if (kind === "treat") return "border-moss/20 bg-[var(--step-bg)]";
  return "border-line bg-paper";
}

function outcomeLabelClass(kind: Recommendation["kind"]) {
  if (kind === "ed") return "text-red-800";
  if (kind === "gp") return "text-orange-800";
  if (kind === "concurrent") return "text-yellow-800";
  if (kind === "treat") return "text-moss";
  return "text-ink-soft";
}

function alertName(kind: Recommendation["kind"]) {
  if (kind === "ed") return "Red alert";
  if (kind === "gp") return "Orange alert";
  if (kind === "concurrent") return "Yellow alert";
  if (kind === "treat") return "Green alert";
  return "Outcome";
}

const usualCarePdf = `Usual care:
- Good hand hygiene, keep nails short, cover with watertight dressing.
- Remove crusts gently using paw paw or white soft paraffin before applying topicals.
- Bleach baths: 10 mins daily (12 mL of 4% bleach in 10 L water).
- School exclusion: Stay home until 24 hours after antibiotics commence.`;

const localTreatmentPdf = `Localised treatment:
- 1st line. Topical mupirocin 2% (apply every 8 hours for 5 days).
- 2nd line. Topical hydrogen peroxide 1% (apply every 8 hours for 5 days).

${usualCarePdf}`;

const oralTreatmentPdf = `Extended or high-risk treatment (for GP co-management; do not supply under this protocol):
Adult oral:
- 1st line. Dicloxacillin/flucloxacillin 500 mg QID for 5 days.
- Cefalexin 1000 mg BD for 5 days.
Child oral:
- Cefalexin 25 mg/kg up to 1000 mg BD for 5 days.
- Dicloxacillin 12.5 mg/kg up to 500 mg QID for 5 days.

${usualCarePdf}`;

function activeClinicalTriggers(form: FormState) {
  const age = readNumber(form.age);
  const triggers: string[] = [];
  if (age != null && age < 2) triggers.push("Age under 2 years");
  if (form.consent === "no") triggers.push("Consent declined");
  if (form.presentation === "no") triggers.push("Presentation not clear non-bullous impetigo");
  if (form.extent) triggers.push(extentLabel(form.extent));
  triggers.push(...clinicalSelections(form.redFlags), ...clinicalSelections(form.gpTriggers));
  return triggers.length > 0 ? triggers.join(", ") : "None";
}

function primaryAction(outcome: Outcome) {
  const item = outcome.recommendation;
  if (item.kind === "ed") return "Immediate referral to Emergency Department";
  if (item.kind === "gp") return "Refer to GP. Do not supply antibiotics under this protocol.";
  if (item.kind === "concurrent") return item.title;
  if (item.kind === "treat") return "Safe to treat";
  if (item.kind === "pending") return item.detail;
  return "No answers recorded yet.";
}

function treatmentPathway(outcome: Outcome) {
  if (outcome.showLocal) return localTreatmentPdf;
  if (outcome.showOral) return oralTreatmentPdf;
  if (outcome.recommendation.kind === "ed") return `Not indicated. Do not supply antibiotics under this protocol.\n\n${usualCarePdf}`;
  return "Not indicated";
}

function consultationRows(form: FormState): string[][] {
  const age = form.age.trim();
  return [
    ["Age", age ? `${age} years` : "Not answered"],
    ["Patient consents", yesNoText(form.consent)],
    ["Clear non-bullous impetigo", yesNoText(form.presentation)],
    ["Extent of infection", form.extent ? extentLabel(form.extent) : "Not answered"],
    ["Red flag symptoms", listText(form.redFlags)],
    ["GP referral triggers", listText(form.gpTriggers)],
  ];
}

function outcomeRows(form: FormState, outcome: Outcome): string[][] {
  return [
    ["Action Required", primaryAction(outcome)],
    ["Active Clinical Triggers", activeClinicalTriggers(form)],
    ["Treatment pathway", treatmentPathway(outcome)],
  ];
}

type TableDoc = jsPDF & { lastAutoTable?: { finalY: number } };

function drawTable(
  doc: TableDoc,
  autoTable: (doc: jsPDF, options: UserOptions) => void,
  options: UserOptions,
) {
  autoTable(doc, {
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 2.5,
      textColor: [28, 25, 21],
      lineColor: [227, 220, 208],
      lineWidth: 0.1,
      valign: "top",
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: [44, 92, 74],
      textColor: [255, 253, 248],
      fontStyle: "bold",
      lineColor: [44, 92, 74],
    },
    alternateRowStyles: { fillColor: [246, 243, 236] },
    margin: { left: 16, right: 16, bottom: 18 },
    ...options,
  });
  const startY = typeof options.startY === "number" ? options.startY : 40;
  return doc.lastAutoTable?.finalY ?? startY;
}

function buildConsultationReport(
  JsPDF: typeof jsPDF,
  autoTable: (doc: jsPDF, options: UserOptions) => void,
  form: FormState,
  outcome: Outcome,
) {
  const doc = new JsPDF({ unit: "mm", format: "a4" }) as TableDoc;
  const generatedAt = new Date().toLocaleString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setProperties({
    title: "Clinical Handover Report: Impetigo",
    subject: "Pharmacist consultation record",
  });
  doc.setFillColor(44, 92, 74);
  doc.rect(0, 0, pageWidth, 30, "F");
  doc.setTextColor(255, 253, 248);
  doc.setFont("times", "bold");
  doc.setFontSize(15);
  doc.text("Clinical Handover Report: Impetigo", 16, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(generatedAt, 16, 21);

  doc.setTextColor(28, 25, 21);
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text("Consultation answers", 16, 40);
  const afterAnswers = drawTable(doc, autoTable, {
    startY: 44,
    head: [["Question", "Answer"]],
    body: consultationRows(form),
    columnStyles: { 0: { cellWidth: 62, fontStyle: "bold" } },
  });

  let headingY = afterAnswers + 12;
  if (headingY > doc.internal.pageSize.getHeight() - 48) {
    doc.addPage();
    headingY = 18;
  }
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.setTextColor(28, 25, 21);
  doc.text("Clinical outcomes", 16, headingY);
  drawTable(doc, autoTable, {
    startY: headingY + 4,
    head: [["Item", "Detail"]],
    body: outcomeRows(form, outcome),
    columnStyles: { 0: { cellWidth: 48, fontStyle: "bold" } },
    didParseCell: (data) => {
      if (data.section !== "body" || data.column.index !== 0) return;
      if (data.cell.raw === "Action Required") data.cell.styles.textColor = [140, 59, 50];
    },
  });

  const pageCount = doc.getNumberOfPages();
  const pageHeight = doc.internal.pageSize.getHeight();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(94, 88, 78);
    doc.text(
      "Personal consultation record. Confirm supply against a current medicines reference.",
      16,
      pageHeight - 8,
    );
    doc.text(`${page} / ${pageCount}`, pageWidth - 16, pageHeight - 8, { align: "right" });
  }

  doc.autoPrint({ variant: "non-conform" });
  return doc;
}

export default function ImpetigoTriagePage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [reportNote, setReportNote] = useState<string | null>(null);
  const outcome = derive(form);
  const recommendation = outcome.recommendation;
  const decided =
    recommendation.kind === "ed" ||
    recommendation.kind === "gp" ||
    recommendation.kind === "concurrent" ||
    recommendation.kind === "treat";

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggle(key: "redFlags" | "gpTriggers", item: string) {
    setForm((current) => {
      const selected = current[key];
      if (item === noneLabel) {
        return { ...current, [key]: selected.includes(noneLabel) ? [] : [noneLabel] };
      }
      const withoutNone = selected.filter((entry) => entry !== noneLabel);
      const next = withoutNone.includes(item)
        ? withoutNone.filter((entry) => entry !== item)
        : [...withoutNone, item];
      return { ...current, [key]: next };
    });
  }

  async function printConsultationRecord() {
    const tab = window.open("about:blank", "_blank");
    if (!tab) {
      setReportNote("The browser blocked the report tab. Allow pop-ups for this site, then try again.");
      return;
    }
    setReportNote(null);
    try {
      const [{ jsPDF }, { autoTable }] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
      const doc = buildConsultationReport(jsPDF, autoTable, form, outcome);
      tab.location.href = doc.output("bloburl").toString();
    } catch {
      tab.close();
      setReportNote("The consultation record could not be created. Try again.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-10">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Clinical tool</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">Management of Impetigo</h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Work through management of impetigo. Referral flags update from the protocol as you answer. Nothing is saved.
        </p>
      </header>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.8fr)]">
        <form
          className="min-w-0 space-y-4"
          autoComplete="off"
          onSubmit={(event) => event.preventDefault()}
          aria-label="Impetigo triage"
        >
          <Section title="Eligibility">
            <NumberField
              label="Age"
              value={form.age}
              onChange={(value) => set("age", value)}
              suffix="years"
              hint="This protocol is for patients aged 2 years and over."
            />
            <RadioGroup
              label="Does the patient consent?"
              name="consent"
              value={form.consent}
              onChange={(value) => set("consent", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              hint="The patient must be physically present in the pharmacy."
            />
          </Section>

          <Section title="Clinical presentation">
            <RadioGroup
              label="Does the patient present with clear signs of non-bullous impetigo? (Honey-coloured crusts, vesicles that rupture easily, mild itch, no systemic symptoms)"
              name="presentation"
              value={form.presentation}
              onChange={(value) => set("presentation", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </Section>

          <Section title="Extent of infection">
            <RadioGroup
              label="How extensive is the infection?"
              name="extent"
              value={form.extent}
              onChange={(value) => set("extent", value)}
              options={extentOptions}
            />
          </Section>

          <Section title="Red flag symptoms">
            <CheckGroup
              label="Does the patient report or present with any of the following?"
              hint="Any one of these is an emergency department referral."
              items={redFlagItems}
              checked={form.redFlags}
              onToggle={(item) => toggle("redFlags", item)}
            />
          </Section>

          <Section title="GP referral triggers">
            <CheckGroup
              label="Does the patient report or present with any of the following?"
              hint="Any one of these is a GP referral. Do not supply antibiotics."
              items={gpTriggerItems}
              checked={form.gpTriggers}
              onToggle={(item) => toggle("gpTriggers", item)}
            />
          </Section>

          <Disclaimer />
        </form>

        <aside
          aria-label="Live clinical outcome"
          className="min-w-0 rounded-xl border border-line bg-paper-raised p-5 lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto"
        >
          <p className="text-[11px] font-medium tracking-[0.16em] text-moss uppercase">Live clinical outcome</p>
          <div aria-live="polite" className="mt-4 space-y-3">
            {!outcome.dirty ? (
              <p className="text-sm leading-6 text-ink-soft">
                Answer the questions and the referral outcome will appear here.
              </p>
            ) : null}
            {outcome.flags.map((flag) => (
              <article key={flag.title} className="rounded-lg border border-[var(--alert)]/30 bg-[var(--alert-bg)] px-3.5 py-3">
                <h3 className="text-[11px] font-medium tracking-[0.14em] text-[var(--alert)] uppercase">{flag.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink">{flag.detail}</p>
              </article>
            ))}
            {recommendation.kind === "pending" ? (
              <article className="rounded-lg border border-line bg-paper px-3.5 py-3">
                <h3 className="text-[11px] font-medium tracking-[0.14em] text-ink-soft uppercase">Outcome</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink">{recommendation.detail}</p>
              </article>
            ) : null}
            {decided ? (
              <article className={["rounded-lg border px-3.5 py-3", outcomeClass(recommendation.kind)].join(" ")}>
                <p className={["text-[11px] font-medium tracking-[0.14em] uppercase", outcomeLabelClass(recommendation.kind)].join(" ")}>
                  {alertName(recommendation.kind)}
                </p>
                <h3 className={["mt-1 text-sm font-medium", outcomeLabelClass(recommendation.kind)].join(" ")}>
                  {recommendation.kind === "ed" ? (
                    <span className="font-bold text-red-600">Immediate referral to Emergency Department</span>
                  ) : recommendation.kind === "gp" ? (
                    <span className="font-bold text-red-600">Refer to GP</span>
                  ) : (
                    recommendation.title
                  )}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-ink">{recommendation.detail}</p>
                <UsualCare />
              </article>
            ) : null}
            {outcome.showLocal ? <LocalisedTreatment /> : null}
            {outcome.showOral ? <OralReference /> : null}
          </div>
          {outcome.dirty ? (
            <button
              type="button"
              onClick={() => setForm(emptyForm)}
              className="mt-4 text-sm text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
            >
              Clear answers
            </button>
          ) : null}
        </aside>
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => void printConsultationRecord()}
          className="inline-flex items-center rounded-md bg-moss px-3.5 py-2.5 text-sm font-medium text-paper-raised"
        >
          Print Consultation Record
        </button>
        <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
          {reportNote ?? "Creates a handover PDF from these answers and opens it in a new tab."}
        </p>
      </div>
    </div>
  );
}
