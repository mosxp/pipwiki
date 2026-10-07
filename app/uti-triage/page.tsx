"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Disclaimer } from "@/components/disclaimer";
import type { jsPDF } from "jspdf";
import type { UserOptions } from "jspdf-autotable";

type YesNo = "" | "yes" | "no";
type Gender = "" | "male" | "female" | "reassigned";

type CheckItem = {
  label: string;
  info?: string;
};

type FormState = {
  gender: Gender;
  age: string;
  consent: YesNo;
  symptoms: string[];
  differential: YesNo;
  redFlags: string[];
  history: string[];
  risks: string[];
  soft: string[];
};

const cystitisSymptoms: CheckItem[] = [
  { label: "Dysuria" },
  { label: "Urinary frequency" },
  { label: "Urinary urgency" },
  { label: "Suprapubic pain or discomfort" },
];

const redFlagSymptoms: CheckItem[] = [
  { label: "Fever >38°C" },
  { label: "Chills" },
  { label: "Nausea" },
  { label: "Vomiting" },
  { label: "Flank pain" },
];

const redFlagHistory: CheckItem[] = [
  { label: "Pregnancy" },
  { label: "Less than 6 weeks post-partum" },
  { label: "Gross haematuria" },
  { label: "Cerebral palsy or other neurological disease that may affect bladder function" },
  { label: "IUD inserted within the last 3 months" },
  { label: "Urinary catheter in situ, or removed in the last 48 hours" },
  {
    label:
      "Anatomical or functional abnormality of the urinary tract, including obstruction, abnormality, urolithiasis, nephrostomy, ureteral stent, or spinal cord injury",
  },
];

const riskItems: CheckItem[] = [
  { label: "Diabetes, or a medicine that increases UTI risk (for example an SGLT2 inhibitor)" },
  { label: "UTI symptoms again within 2 weeks of completing appropriate antimicrobial treatment" },
  { label: "Symptoms persisting 48–72 hours after starting appropriate antibiotic treatment" },
  { label: "2 or more symptomatic UTIs in the previous 6 months, or 3 or more in the previous 12 months" },
  { label: "Long-term inpatient care, including residential aged care" },
];

const stiRiskLabel = "Risk factors for a sexually transmitted infection";

const softItems: CheckItem[] = [
  {
    label: stiRiskLabel,
    info: "<30 yrs, previous STI, no condom, new partner <60 days, partner treated for STI, sex worker.",
  },
  { label: "History of pyelonephritis" },
  { label: "Taking immunosuppressant medicines" },
  { label: "Immunocompromised" },
  { label: "Asplenia" },
  { label: "Renal disease or impairment" },
  { label: "IUD in situ for more than 3 months" },
];

const emptyForm: FormState = {
  gender: "",
  age: "",
  consent: "",
  symptoms: [],
  differential: "",
  redFlags: [],
  history: [],
  risks: [],
  soft: [],
};

type Flag = {
  tone: "alert" | "caution";
  title: string;
  detail: string;
};

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
  showPathway: boolean;
  dirty: boolean;
};

function readNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function genderLabel(gender: Gender) {
  if (gender === "female") return "Female";
  if (gender === "male") return "Male";
  if (gender === "reassigned") return "Reassigned";
  return "Not answered";
}

function yesNoText(value: YesNo) {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Not answered";
}

function listText(items: string[]) {
  return items.length > 0 ? items.join("; ") : "None selected";
}

function derive(form: FormState): Outcome {
  const age = readNumber(form.age);
  const symptomCount = form.symptoms.length;
  const eligibilityAnswered = form.gender !== "" && age != null && form.consent !== "";
  const ageOut = age != null && (age < 18 || age > 65);
  const genderOut = form.gender === "male" || form.gender === "reassigned";
  const fewSymptoms = symptomCount === 1 || (symptomCount === 0 && eligibilityAnswered);
  const eligibleBase =
    form.gender === "female" &&
    age != null &&
    age >= 18 &&
    age <= 65 &&
    form.consent === "yes" &&
    symptomCount >= 2 &&
    form.differential === "no" &&
    form.redFlags.length === 0 &&
    form.history.length === 0 &&
    form.risks.length === 0;

  const flags: Flag[] = [];

  if (form.redFlags.length > 0) {
    flags.push({
      tone: "alert",
      title: "Pyelonephritis",
      detail: `${form.redFlags.join("; ")}. Immediate referral to the emergency department.`,
    });
  }
  if (genderOut) {
    flags.push({
      tone: "alert",
      title: "Gender",
      detail: "Male, or gender reassignment surgery. Provide usual care and/or refer to the GP.",
    });
  }
  if (ageOut) {
    flags.push({
      tone: "alert",
      title: "Age",
      detail:
        age != null && age < 18
          ? "Age is under 18. Provide usual care and/or refer to the GP."
          : "Age is over 65. Provide usual care and/or refer to the GP.",
    });
  }
  if (form.consent === "no") {
    flags.push({
      tone: "alert",
      title: "Consent",
      detail: "The patient does not consent. Provide usual care and/or refer to the GP.",
    });
  }
  if (fewSymptoms) {
    flags.push({
      tone: "alert",
      title: "Cystitis symptoms",
      detail:
        "Fewer than 2 symptoms of acute cystitis. Provide usual care and/or refer to the GP. The patient may benefit from laboratory investigations.",
    });
  }
  if (form.differential === "yes") {
    flags.push({
      tone: "alert",
      title: "Another cause",
      detail:
        "Symptoms or history suggest a cause other than acute cystitis. Consider an S3 pharmacist-only thrush treatment if appropriate, or refer to the GP.",
    });
  }
  if (form.history.length > 0) {
    flags.push({
      tone: "alert",
      title: "Red flag history",
      detail: `${form.history.join("; ")}. Immediate referral to the GP. Symptomatic non-prescription treatment and self-care advice may be given before that review.`,
    });
  }
  if (form.risks.length > 0) {
    flags.push({
      tone: "alert",
      title: "Risks",
      detail: `${form.risks.join("; ")}. Provide usual care and/or refer to the GP. The patient may benefit from laboratory investigations.`,
    });
  }
  const gp =
    genderOut ||
    ageOut ||
    form.consent === "no" ||
    fewSymptoms ||
    form.differential === "yes" ||
    form.history.length > 0 ||
    form.risks.length > 0;
  if (form.soft.length > 0) {
    const sti = form.soft.includes(stiRiskLabel) ? " Refer the patient for STI testing." : "";
    const advice =
      form.redFlags.length > 0 || gp
        ? `Include this in the referral.${sti}`
        : `Antibiotic treatment may still be considered together with referral to the GP, if that is clinically appropriate.${sti}`;
    flags.push({
      tone: "caution",
      title: "Soft trigger",
      detail: `${form.soft.join("; ")}. ${advice}`,
    });
  }
  const dirty = Object.values(form).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== "";
  });

  let recommendation: Recommendation = { kind: "idle" };
  let showPathway = false;

  if (form.redFlags.length > 0) {
    recommendation = {
      kind: "ed",
      title: "Immediate referral to Emergency Department",
      detail: "A red flag for pyelonephritis is present. Do not treat under this protocol.",
    };
  } else if (gp) {
    recommendation = {
      kind: "gp",
      title: "Provide usual care and/or refer to GP",
      detail: "A referral trigger applies. Do not supply antibiotics under this protocol.",
    };
  } else if (eligibleBase && form.soft.length > 0) {
    showPathway = true;
    const sti = form.soft.includes(stiRiskLabel) ? " Refer the patient for STI testing." : "";
    recommendation = {
      kind: "concurrent",
      title: "Concurrent referral to GP indicated",
      detail: `Antibiotic treatment may still be considered, together with referral to the GP, if that is clinically appropriate.${sti}`,
    };
  } else if (eligibleBase) {
    showPathway = true;
    recommendation = {
      kind: "treat",
      title: "Safe to treat",
      detail:
        "At least two cystitis symptoms are present and no referral trigger is showing. Empirical antibiotic therapy can be considered.",
    };
  } else if (dirty) {
    recommendation = {
      kind: "pending",
      detail: "No referral trigger is showing yet. Finish the remaining questions before supplying.",
    };
  }

  return { flags, recommendation, showPathway, dirty };
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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium leading-6 text-ink">{children}</p>;
}

function InfoTip({ text }: { text: string }) {
  const tipId = useId();
  const hideTimer = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const visible = open || pinned;

  function show() {
    if (hideTimer.current != null) window.clearTimeout(hideTimer.current);
    setOpen(true);
  }

  function scheduleHide() {
    if (hideTimer.current != null) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setOpen(false), 120);
  }

  useEffect(() => {
    return () => {
      if (hideTimer.current != null) window.clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <>
      <span className="print:hidden inline-block align-middle" onMouseEnter={show} onMouseLeave={scheduleHide}>
        <button
          type="button"
          aria-label="Clinical criteria"
          aria-expanded={visible}
          aria-describedby={visible ? tipId : undefined}
          onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setPinned((value) => !value);
          }}
          onFocus={show}
          onBlur={() => {
            setOpen(false);
            setPinned(false);
          }}
          onKeyDown={(event) => {
            if (event.key !== "Escape") return;
            setOpen(false);
            setPinned(false);
          }}
          className="ml-1.5 inline-flex size-4 items-center justify-center rounded-full border border-ink-soft/40 text-[10px] leading-none font-medium text-ink-soft hover:border-ink-soft hover:text-ink"
        >
          i
        </button>
      </span>
      {visible ? (
        <span
          id={tipId}
          role="tooltip"
          onMouseEnter={show}
          onMouseLeave={scheduleHide}
          onMouseDown={(event) => event.preventDefault()}
          className="print:hidden mt-1.5 block max-w-xl rounded bg-gray-800 p-2 text-left text-xs leading-5 font-normal text-white shadow-lg"
        >
          {text}
        </span>
      ) : null}
    </>
  );
}

function RadioGroup<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
  hint,
  info,
}: {
  label: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  hint?: string;
  info?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-ink">
        {label}
        {info ? <InfoTip text={info} /> : null}
      </legend>
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
      <FieldLabel>{label}</FieldLabel>
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
  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-ink">{label}</legend>
      {hint ? <p className="mt-1 text-xs leading-5 text-ink-soft">{hint}</p> : null}
      <ul className="mt-2 space-y-0.5">
        {items.map((item) => {
          const isChecked = checked.includes(item.label);
          return (
            <li key={item.label}>
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
                <span>
                  {item.label}
                  {item.info ? <InfoTip text={item.info} /> : null}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

function FlagCard({ flag }: { flag: Flag }) {
  const alert = flag.tone === "alert";
  return (
    <article
      className={[
        "rounded-lg border px-3.5 py-3",
        alert ? "border-[var(--alert)]/30 bg-[var(--alert-bg)]" : "border-amber-200 bg-amber-50",
      ].join(" ")}
    >
      <h3
        className={[
          "text-[11px] font-medium tracking-[0.14em] uppercase",
          alert ? "text-[var(--alert)]" : "text-amber-800",
        ].join(" ")}
      >
        {flag.title}
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-ink">{flag.detail}</p>
    </article>
  );
}

function TreatmentPathway() {
  return (
    <article className="rounded-lg border border-line bg-paper px-3.5 py-3">
      <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
        Empirical antibiotic therapy
      </h3>
      <div className="mt-3 space-y-3 text-sm leading-6 text-ink">
        <div>
          <p className="font-medium">1st line. Nitrofurantoin 100 mg every 6 hours for 5 days (supply 20 capsules).</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs leading-5 text-ink-soft">
            <li>Previous serious adverse reaction to nitrofurantoin.</li>
            <li>G6PD, enolase, or glutathione peroxidase deficiency.</li>
            <li>Severe renal impairment.</li>
            <li>Avoid in breastfeeding if the infant is under one month, or has G6PD deficiency.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium">2nd line. Fosfomycin 3 g as a single dose at night (supply 1 sachet).</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs leading-5 text-ink-soft">
            <li>Previous serious adverse reaction or hypersensitivity to fosfomycin.</li>
            <li>Severe renal impairment.</li>
            <li>Not recommended with fructose intolerance, glucose-galactose malabsorption, or sucrase-isomaltose insufficiency.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium">3rd line. Trimethoprim 300 mg daily at night for 3 nights (supply 3 tablets).</p>
          <p className="mt-1 text-xs leading-5 text-amber-700">
            Avoid if trimethoprim was used in the past 3 months, or if a trimethoprim-resistant E. coli was isolated in that time.
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs leading-5 text-ink-soft">
            <li>Previous serious adverse reaction to a trimethoprim-containing medicine.</li>
            <li>Megaloblastic anaemia or another cause of folate deficiency, another severe blood disorder, or porphyria.</li>
            <li>Hyperkalaemia, or treatment with methotrexate, phenytoin, or lamivudine.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium">Conservative management</p>
          <p className="mt-1 text-xs leading-5 text-ink-soft">
            Ibuprofen 400 mg orally every 8 hours for up to 3 days (maximum 2.4 g in 24 hours), as first-line care for a patient without immune compromise. If symptoms continue after 48 hours, return for review and consider an antibiotic. Increasing water intake up to 1.5 L daily may reduce recurrent UTI when usual intake is below 1.5 L per day.
          </p>
        </div>
        <p className="text-xs leading-5 text-red-700">
          Avoid alkalinising agents with nitrofurantoin or fosfomycin. They may significantly reduce antibiotic efficacy.
        </p>
        <p className="text-xs leading-5 text-ink-soft">
          Symptoms should respond within 48 hours. If they persist 48–72 hours after the antibiotic course, or symptoms that are not acute cystitis develop, refer to the GP. Cranberry products, ascorbic acid, and methenamine hippurate are not effective for acute cystitis.
        </p>
      </div>
    </article>
  );
}

function consultationRows(form: FormState): string[][] {
  const count = form.symptoms.length;
  const symptoms =
    count > 0 ? `${form.symptoms.join("; ")} (${count} of 4)` : "None selected";
  return [
    ["Gender", genderLabel(form.gender)],
    ["Age", form.age.trim() ? `${form.age.trim()} years` : "Not answered"],
    ["Patient consents", yesNoText(form.consent)],
    ["Cystitis symptoms", symptoms],
    ["Cause other than acute cystitis", yesNoText(form.differential)],
    ["Red flag symptoms", listText(form.redFlags)],
    ["Red flag medical history", listText(form.history)],
    ["Risks", listText(form.risks)],
    ["Soft triggers", listText(form.soft)],
  ];
}

function recommendationRecord(outcome: Outcome) {
  const item = outcome.recommendation;
  if (!outcome.dirty || item.kind === "idle") return "No answers recorded yet.";
  if (item.kind === "pending") return item.detail;
  return `${item.title}. ${item.detail}`;
}

function outcomeRows(outcome: Outcome): string[][] {
  const alerts = outcome.flags.filter((flag) => flag.tone === "alert");
  const cautions = outcome.flags.filter((flag) => flag.tone === "caution");
  const rows: string[][] = [];
  if (alerts.length === 0) rows.push(["Referral", "None"]);
  else for (const flag of alerts) rows.push(["Referral", `${flag.title}. ${flag.detail}`]);
  if (cautions.length === 0) rows.push(["Cautions", "None"]);
  else for (const flag of cautions) rows.push(["Caution", `${flag.title}. ${flag.detail}`]);
  rows.push(["Outcome", recommendationRecord(outcome)]);
  if (outcome.showPathway) {
    rows.push([
      "1st line",
      "Nitrofurantoin 100 mg orally every 6 hours for 5 days. Supply 20 capsules. Avoid in G6PD deficiency, severe renal impairment, and breastfeeding an infant under one month.",
    ]);
    rows.push(["2nd line", "Fosfomycin 3 g orally as a single dose at night. Supply 1 sachet."]);
    rows.push([
      "3rd line",
      "Trimethoprim 300 mg orally at night for 3 nights. Supply 3 tablets. Avoid if used in the past 3 months.",
    ]);
    rows.push([
      "Conservative care",
      "Ibuprofen 400 mg every 8 hours, maximum 2.4 g in 24 hours. Water intake up to 1.5 L daily when usual intake is lower.",
    ]);
    rows.push([
      "Antibiotic caution",
      "Avoid alkalinising agents with nitrofurantoin or fosfomycin.",
    ]);
  } else {
    rows.push(["Treatment pathway", "Not indicated"]);
  }
  return rows;
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
    title: "Clinical Handover Report: Urinary Tract Infection",
    subject: "Pharmacist consultation record",
  });

  doc.setFillColor(44, 92, 74);
  doc.rect(0, 0, pageWidth, 30, "F");
  doc.setTextColor(255, 253, 248);
  doc.setFont("times", "bold");
  doc.setFontSize(15);
  doc.text("Clinical Handover Report: Urinary Tract Infection", 16, 13);
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
    body: outcomeRows(outcome),
    columnStyles: { 0: { cellWidth: 42, fontStyle: "bold" } },
    didParseCell: (data) => {
      if (data.section !== "body" || data.column.index !== 0) return;
      if (data.cell.raw === "Referral") data.cell.styles.textColor = [140, 59, 50];
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
  return "Outcome";
}

export default function UtiTriagePage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [reportNote, setReportNote] = useState<string | null>(null);
  const outcome = derive(form);
  const recommendation = outcome.recommendation;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggle(key: "symptoms" | "redFlags" | "history" | "risks" | "soft", item: string) {
    setForm((current) => {
      const selected = current[key].includes(item)
        ? current[key].filter((entry) => entry !== item)
        : [...current[key], item];
      return { ...current, [key]: selected };
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

  const alerts = outcome.flags.filter((flag) => flag.tone === "alert");
  const cautions = outcome.flags.filter((flag) => flag.tone === "caution");
  const decided = recommendation.kind === "ed" || recommendation.kind === "gp" || recommendation.kind === "concurrent" || recommendation.kind === "treat";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-10">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Clinical tool</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
          Management of Urinary Tract Infections
        </h1>
        <a
          href="/uti-blank-questionnaire.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center rounded-md border border-moss/40 bg-transparent px-3.5 py-2 text-sm font-medium text-moss print:hidden hover:border-moss hover:bg-[var(--step-bg)]"
        >
          Print Blank Questionnaire
        </a>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Work through management of a urinary tract infection. Referral flags update from the protocol as you answer. Nothing is saved.
        </p>
      </header>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.8fr)]">
        <form
          className="min-w-0 space-y-4"
          autoComplete="off"
          onSubmit={(event) => event.preventDefault()}
          aria-label="Urinary tract infection triage"
        >
          <Section title="Eligibility">
            <RadioGroup
              label="What is the sex of the patient?"
              name="gender"
              value={form.gender}
              onChange={(value) => set("gender", value)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "reassigned", label: "Reassigned" },
              ]}
            />
            <NumberField
              label="Age"
              value={form.age}
              onChange={(value) => set("age", value)}
              suffix="years"
              hint="This protocol is for ages 18 to 65."
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

          <Section title="Symptoms">
            <CheckGroup
              label="Acute cystitis symptoms"
              hint="If vaginal discharge is absent and at least two of dysuria, frequency, or urgency are present, the probability of cystitis is greater than 90%."
              items={cystitisSymptoms}
              checked={form.symptoms}
              onToggle={(item) => toggle("symptoms", item)}
            />
            <p className="text-xs leading-5 text-ink-soft">
              {form.symptoms.length} of 4 selected. At least 2 are needed to treat under this protocol.
            </p>
          </Section>

          <Section title="Differential diagnosis">
            <RadioGroup
              label="Do the symptoms or history suggest a cause other than acute cystitis?"
              name="differential"
              value={form.differential}
              onChange={(value) => set("differential", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              info="Vaginal thrush, bacterial vaginosis, chlamydia, gonorrhoea, trichomoniasis."
            />
          </Section>

          <Section title="Red flag symptoms">
            <CheckGroup
              label="Signs of pyelonephritis"
              hint="Any one of these is an emergency department referral."
              items={redFlagSymptoms}
              checked={form.redFlags}
              onToggle={(item) => toggle("redFlags", item)}
            />
          </Section>

          <Section title="Red flag medical history">
            <CheckGroup
              label="Does the patient have any of the following?"
              items={redFlagHistory}
              checked={form.history}
              onToggle={(item) => toggle("history", item)}
            />
          </Section>

          <Section title="Risks">
            <CheckGroup
              label="Does the patient report any of the following?"
              items={riskItems}
              checked={form.risks}
              onToggle={(item) => toggle("risks", item)}
            />
          </Section>

          <Section title="Soft triggers">
            <CheckGroup
              label="Does the patient report or present with any of the following?"
              items={softItems}
              checked={form.soft}
              onToggle={(item) => toggle("soft", item)}
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
            {alerts.map((flag) => (
              <FlagCard key={flag.title} flag={flag} />
            ))}
            {cautions.map((flag) => (
              <FlagCard key={flag.title} flag={flag} />
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
                  {recommendation.kind === "pending" || recommendation.kind === "idle" ? "" : recommendation.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-ink">
                  {recommendation.kind === "pending" || recommendation.kind === "idle" ? "" : recommendation.detail}
                </p>
              </article>
            ) : null}
            {outcome.showPathway ? <TreatmentPathway /> : null}
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
