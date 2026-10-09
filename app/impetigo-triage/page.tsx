"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Disclaimer } from "@/components/disclaimer";
import type { jsPDF } from "jspdf";
import type { UserOptions } from "jspdf-autotable";

type YesNo = "" | "yes" | "no";
type Extent = "" | "limited" | "one" | "two" | "many";

type CheckItem = { label: string; info?: React.ReactNode };

type FormState = {
  age: string;
  consent: YesNo;
  initialSymptoms: YesNo;
  presentation: YesNo;
  extent: Extent;
  redFlags: string[];
  risks: string[];
  severeSymptoms: string[];
};

const noneLabel = "None of the above";

const extentOptions: { value: Exclude<Extent, "">; label: string }[] = [
  { value: "limited", label: "≤ 2 sores" },
  { value: "one", label: "> 2 sores/lesions confined to 1 body region" },
  { value: "two", label: "> 2 sores/lesions confined to 2 body regions (e.g., both legs or arm + torso)" },
  { value: "many", label: "> 2 sores affecting > 2 body regions" },
];

const treatmentOptions = [
  { value: "mupirocin", label: "Mupirocin 2% ointment/cream" },
  { value: "peroxide", label: "Hydrogen peroxide 1% cream" },
  { value: "dicloxacillin", label: "Dicloxacillin / Flucloxacillin" },
  { value: "cefalexin", label: "Cefalexin" },
  { value: "trimethoprim", label: "Trimethoprim + sulfamethoxazole" },
];

const contraindicationDetail =
  "Do not supply the selected medicine. Select an alternative therapy or refer to the GP.";

function drugFlagItems(treatment: string): CheckItem[] {
  if (treatment === "mupirocin") {
    return [
      {
        label:
          "Application to extensive burns and wounds (risk of macrogol toxicity, especially with pre-existing renal impairment)",
      },
    ];
  }
  if (treatment === "dicloxacillin") {
    return [
      {
        label:
          "History of immediate or severe hypersensitivity to a penicillin (e.g., urticaria, bronchospasm, anaphylaxis, interstitial nephritis)",
      },
      { label: "History of cholestatic hepatitis with dicloxacillin or flucloxacillin" },
    ];
  }
  if (treatment === "cefalexin") {
    return [
      {
        label: "History of allergy to cephalosporins OR immediate/severe hypersensitivity to a penicillin",
      },
    ];
  }
  if (treatment === "trimethoprim") {
    return [
      { label: "Serious allergic reaction to sulfonamides" },
      { label: "Megaloblastic anaemia due to folate deficiency" },
      { label: "Severe hepatic impairment or CrCl < 15 mL/minute" },
      { label: "Late pregnancy or infant < 6 weeks old" },
    ];
  }
  if (treatment === "peroxide") {
    return [{ label: "Allergy or hypersensitivity to hydrogen peroxide" }];
  }
  return [];
}

function treatmentLabel(treatment: string) {
  return treatmentOptions.find((option) => option.value === treatment)?.label ?? "Not answered";
}

const redFlagItems: CheckItem[] = [
  { label: "Widespread, painful rash that may be erythematous" },
  { label: "Non-blanching purple rash" },
  { label: "Blistering of the skin and/or mucous membranes (that may include mouth and eyes)" },
  {
    label: "Signs and symptoms of serious and/or systemic illness",
    info: "(e.g., complicated cellulitis, severe ecthyma, acute ARF) including fever, lethargy, headache, rash, nausea and vomiting, severe pain, sore and swollen joints, food/drinking aversion in a child",
  },
  {
    label:
      "Generalised erythema that covers 90% or more of the skin surface, especially when associated with systemic symptoms",
  },
];

const uncertainDiagnosisLabel =
  "A clear diagnosis of impetigo cannot be made (i.e. uncertain diagnosis of uncomplicated non-bullous impetigo), and/or other/co-occurring secondary conditions are suspected that cannot be treated in the community pharmacy setting";

const severeSymptomItems: CheckItem[] = [
  { label: "Signs of bullous impetigo (large, flaccid blisters)" },
  { label: "Signs that impetigo is widespread, severe and/or has ecthyma (ulceration, induration) present" },
  { label: "Chronic sores or ulcers" },
  {
    label:
      "The patient presents with generalised erythema that covers 90% or more of the skin surface, but the patient is otherwise well, with no systemic features.",
  },
  {
    label: uncertainDiagnosisLabel,
    info: "e.g., Infected atopic or discoid eczema, herpes simplex virus (HSV-1), varicella (chickenpox), herpes zoster (shingles), cellulitis, scabies, psoriasis, folliculitis or acne, contact dermatitis, dermatophytosis (tinea), candidiasis, thermal burns, and molluscum contagiosum.",
  },
];

const riskItems: CheckItem[] = [
  {
    label: "The patient is identified with or at risk of recurrent impetigo",
    info: "e.g., symptoms have not resolved after the first course of antibiotic treatment, symptoms significantly or rapidly worsen, if impetigo infection reoccurs frequently.",
  },
  { label: "The patient is immunocompromised" },
  {
    label: "The patient is at high risk of complications of impetigo, including patients at high risk of ARF",
    info: (
      <div className="text-sm border border-slate-200 rounded-md overflow-hidden mt-2 bg-white text-slate-800 shadow-sm">
        <div className="bg-blue-100 text-blue-900 font-semibold px-3 py-2 border-b border-blue-200">
          Individuals at high risk of developing ARF
        </div>
        <ul className="list-disc list-outside ml-6 p-3 space-y-2 text-slate-700">
          <li>
            Aboriginal and Torres Strait Islander people residing in a rural or remote area, or living in a household
            affected by household overcrowding (&gt; 2 people per bedroom) or experiencing socioeconomic disadvantage.
          </li>
          <li>
            Māori and/or Pacific Islander person living in a household affected by overcrowding (&gt; 2 people per
            bedroom) or experiencing socioeconomic disadvantage.
          </li>
          <li>A person with a personal history of ARF or RHD.</li>
          <li>A person with a family or household member with a recent history of ARF or RHD.</li>
        </ul>
        <div className="bg-blue-100 text-blue-900 font-semibold px-3 py-2 border-y border-blue-200 mt-1">
          Additional risk factors for individuals aged ≤ 40 years (particularly between 5-20 years)
        </div>
        <ul className="list-disc list-outside ml-6 p-3 space-y-2 text-slate-700">
          <li>
            People living in a household affected by household overcrowding (&gt; 2 people per bedroom) or experiencing
            socioeconomic disadvantage.
          </li>
          <li>
            People with current or prior residence in (or frequent or recent travel to) an area with a high rate of ARF
            e.g., refugees and migrants from low-middle income countries, rural and remote communities.
          </li>
        </ul>
      </div>
    ),
  },
];

const presentationQuestion = "Does the patient present with a clear presentation of non-bullous impetigo?";

const presentationNote =
  "Note: Pharmacists should treat only clearly eligible low-risk cases and refer to a GP for swabbing or further review if the diagnosis is uncertain, recurrent, or not improving.";

const nonBullousFeatures = [
  { lead: "Honey-coloured crusts", rest: ", typically on face/extremities" },
  { lead: "Vesicles/pustules", rest: " that rupture easily" },
  { lead: "Mild itch", rest: ", minimal pain" },
  { lead: "No systemic symptoms", rest: "" },
];
const symptomsQuestion =
  "Does the patient present with signs, symptoms, or a history consistent with impetigo, based on initial presentation and information provided to the pharmacist?";

const differentialTitle = "Provide Pharmacist Care and/or Refer to GP";
const differentialDetail =
  "Consider other skin conditions (e.g., shingles, psoriasis, acne, atopic dermatitis, HSV, scabies).";

const impetigoExamples = [
  "Golden or honey-coloured crusted lesions",
  "Lesions commonly on the face, limbs, or around the mouth or nose",
  "Vesicles or pustules that rupture easily",
  "May be mildly itchy or red, but not deep, painful, or scaly",
  "Erythema may be present where the lesions or sores are located",
];

const subjectivePrompts = [
  "Onset, duration, nature, location, severity and extent of lesions",
  "History of previous impetigo or skin infections",
  "Risk factors (recent skin or throat infections, trauma, immunosuppression)",
  "Lifestyle factors, recent travel, or contact with similar symptoms",
  "Comorbidities, current medications, allergies/adverse effects, and pregnancy/lactation",
];

const emptyForm: FormState = {
  age: "",
  consent: "",
  initialSymptoms: "",
  presentation: "",
  extent: "",
  redFlags: [],
  risks: [],
  severeSymptoms: [],
};

type Flag = { title: string; detail: string };

type Recommendation =
  | { kind: "idle" }
  | { kind: "pending"; detail: string }
  | { kind: "ed"; title: string; detail: string }
  | { kind: "contraindicated"; title: string; detail: string }
  | { kind: "gp"; title: string; detail: string }
  | { kind: "differential"; title: string; detail: string }
  | { kind: "concurrent"; title: string; detail: string }
  | { kind: "treat"; title: string; detail: string };

type Outcome = {
  flags: Flag[];
  recommendation: Recommendation;
  showLocal: boolean;
  showOral: boolean;
  showUsualCare: boolean;
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

function derive(form: FormState, drugFlags: string[]): Outcome {
  const age = readNumber(form.age);
  const redFlags = clinicalSelections(form.redFlags);
  const gpItems = clinicalSelections(form.risks);
  const severeItems = clinicalSelections(form.severeSymptoms);
  const drugContra = clinicalSelections(drugFlags);
  const ageOut = age != null && age < 2;
  const widespread = form.extent === "many";
  const notImpetigo = form.initialSymptoms === "no";
  const hardGp =
    ageOut ||
    form.consent === "no" ||
    form.presentation === "no" ||
    widespread ||
    gpItems.length > 0 ||
    severeItems.length > 0;
  const ready =
    age != null &&
    age >= 2 &&
    form.consent === "yes" &&
    form.initialSymptoms === "yes" &&
    form.presentation === "yes" &&
    redFlags.length === 0 &&
    !hardGp;

  const flags: Flag[] = [];
  if (redFlags.length > 0) flags.push({ title: "Red flag symptoms", detail: redFlags.join(", ") });
  if (ageOut) flags.push({ title: "Age", detail: "Age is under 2 years." });
  if (form.consent === "no") flags.push({ title: "Consent", detail: "The patient does not consent." });
  if (notImpetigo) {
    flags.push({ title: "Symptoms", detail: "Signs, symptoms, or history are not consistent with impetigo." });
  }
  if (gpItems.length > 0) flags.push({ title: "Risks", detail: gpItems.join(", ") });
  if (severeItems.length > 0) flags.push({ title: "GP referral triggers", detail: severeItems.join(", ") });
  if (form.presentation === "no") {
    flags.push({ title: "Presentation", detail: "The presentation is not clear non-bullous impetigo." });
  }
  if (widespread) flags.push({ title: "Extent", detail: extentLabel(form.extent) });
  if (drugContra.length > 0) flags.push({ title: "Appropriateness assessment", detail: drugContra.join(", ") });

  const dirty =
    Object.values(form).some((value) => (Array.isArray(value) ? value.length > 0 : value !== "")) ||
    drugFlags.length > 0;

  let recommendation: Recommendation = { kind: "idle" };
  let showLocal = false;
  let showOral = false;

  const earlierStop =
    redFlags.length > 0 ||
    notImpetigo ||
    ageOut ||
    form.consent === "no" ||
    form.presentation === "no" ||
    gpItems.length > 0 ||
    severeItems.length > 0;

  if (redFlags.length > 0) {
    recommendation = {
      kind: "ed",
      title: "Immediate referral to Emergency Department",
      detail: "A red flag symptom is present. Do not treat under this protocol.",
    };
  } else if (drugContra.length > 0 && !earlierStop) {
    recommendation = {
      kind: "contraindicated",
      title: "Treatment Contraindicated",
      detail: contraindicationDetail,
    };
  } else if (notImpetigo) {
    recommendation = {
      kind: "differential",
      title: differentialTitle,
      detail: differentialDetail,
    };
  } else if (hardGp) {
    recommendation = {
      kind: "gp",
      title: "Refer to GP",
      detail:
        form.presentation === "no"
          ? `Do not supply antibiotics under this protocol. ${presentationNote}`
          : "Do not supply antibiotics under this protocol.",
    };
  } else if (ready && form.extent === "two") {
    showOral = true;
    recommendation = {
      kind: "concurrent",
      title: "Provide pharmacist care and refer to GP for follow up",
      detail: "",
    };
  } else if (ready && form.extent === "one") {
    showOral = true;
    recommendation = {
      kind: "treat",
      title: "Safe to treat",
      detail: "Extensive non-bullous impetigo. Proceed to pharmacist care.",
    };
  } else if (ready && form.extent === "limited") {
    showLocal = true;
    recommendation = {
      kind: "treat",
      title: "Safe to treat",
      detail: "Limited non-bullous impetigo. Proceed to pharmacist care.",
    };
  } else if (dirty) {
    recommendation = {
      kind: "pending",
      detail: "No referral trigger is showing yet. Finish the remaining questions before supplying.",
    };
  }

  const showUsualCare = recommendation.kind === "concurrent" || recommendation.kind === "treat";

  return { flags, recommendation, showLocal, showOral, showUsualCare, dirty };
}

const inputClass =
  "mt-2 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-moss";

function fitClinicalNotes(stack: HTMLElement | null) {
  if (!stack) return;
  for (const field of stack.querySelectorAll("textarea")) {
    field.style.height = "auto";
    const needed = field.scrollHeight;
    field.style.height = `${needed}px`;
    if (field.scrollHeight > field.clientHeight) {
      field.style.height = `${needed + (field.scrollHeight - field.clientHeight)}px`;
    }
  }
}

function Section({
  title,
  children,
  locked = false,
}: {
  title: string;
  children: React.ReactNode;
  locked?: boolean;
}) {
  return (
    <section
      aria-disabled={locked || undefined}
      className={[
        "rounded-xl border border-line bg-paper-raised px-5 py-5 transition-opacity duration-200",
        locked ? "pointer-events-none opacity-50" : "opacity-100",
      ].join(" ")}
    >
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
  aside,
  stacked = false,
  disabled = false,
}: {
  label: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  hint?: string;
  aside?: React.ReactNode;
  stacked?: boolean;
  disabled?: boolean;
}) {
  return (
    <fieldset disabled={disabled}>
      <legend className="text-sm font-medium leading-6 text-ink">{label}</legend>
      {hint ? <p className="mt-1 text-xs leading-5 text-ink-soft">{hint}</p> : null}
      {aside}
      <div className={stacked ? "mt-2 flex flex-col gap-3" : "mt-2 flex flex-wrap items-center gap-2"}>
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={[
                "items-center gap-2 rounded-md border px-3 py-2 text-sm",
                disabled ? "cursor-not-allowed" : "cursor-pointer",
                stacked ? "flex w-full" : "inline-flex",
                checked ? "border-moss bg-[var(--step-bg)] text-ink" : "border-line bg-paper text-ink/80",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                disabled={disabled}
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

function InfoTip({ children }: { children: React.ReactNode }) {
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
        typeof children === "string" ? (
          <span
            id={tipId}
            role="tooltip"
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
            onMouseDown={(event) => event.preventDefault()}
            className="print:hidden mt-1.5 block max-w-xl rounded bg-gray-800 p-2 text-left text-xs leading-5 font-normal text-white shadow-lg"
          >
            {children}
          </span>
        ) : (
          <div
            id={tipId}
            role="tooltip"
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
            onMouseDown={(event) => event.preventDefault()}
            className="print:hidden"
          >
            {children}
          </div>
        )
      ) : null}
    </>
  );
}

function CheckGroup({
  label,
  hint,
  items,
  checked,
  onToggle,
  disabled = false,
}: {
  label: string;
  hint?: string;
  items: CheckItem[];
  checked: string[];
  onToggle: (item: string) => void;
  disabled?: boolean;
}) {
  const rows = [...items, { label: noneLabel }];
  return (
    <fieldset disabled={disabled}>
      <legend className="text-sm font-medium leading-6 text-ink">{label}</legend>
      {hint ? <p className="mt-1 text-xs leading-5 text-ink-soft">{hint}</p> : null}
      <ul className="mt-2 space-y-0.5">
        {rows.map((item) => {
          const isChecked = checked.includes(item.label);
          const isNone = item.label === noneLabel;
          return (
            <li key={item.label} className={isNone ? "mt-1 border-t border-line pt-1" : undefined}>
              <label
                className={[
                  "flex items-start gap-2.5 rounded-md px-1 py-1 text-sm leading-5 text-ink",
                  disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-paper/70",
                ].join(" ")}
              >
                <span className="relative mt-0.5 inline-flex size-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={disabled}
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
                <span className="min-w-0 flex-1">
                  {item.label}
                  {item.info ? <InfoTip>{item.info}</InfoTip> : null}
                </span>
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
        <li>
          For detailed hygiene and household prevention tips, refer to the{" "}
          <a
            href="https://www.rch.org.au/kidsinfo/fact_sheets/Impetigo_school_sores/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-moss underline decoration-moss/40 underline-offset-4 hover:decoration-moss"
          >
            Royal Children’s Hospital Impetigo Fact Sheet
          </a>.
        </li>
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
          <span className="font-medium">1st line:</span> Topical ointment or cream, mupirocin 2% (Apply to lesions, every 8 hours for 5 days).
        </li>
        <li>
          <span className="font-medium">2nd line:</span> Topical cream, hydrogen peroxide 1% (Apply to lesions, every 8 hours for 5 days).
        </li>
      </ul>
    </article>
  );
}

type OralDose = { dose: string; note: string };

const adultOralDoses: OralDose[] = [
  {
    dose: "Dicloxacillin or flucloxacillin: 500 mg, every 6 hours for 5 days.",
    note: "Recommended first-line oral therapy. Stop therapy after 3 days if infection has resolved.",
  },
  {
    dose: "Cefalexin: 1,000 mg every 12 hours for 5 days.",
    note: "First-line therapy – can be used if non-severe (immediate/delayed) penicillin hypersensitivity. Less frequent dosing; may be preferred by patients. Stop therapy after 3 days if infection has resolved.",
  },
  {
    dose: "Trimethoprim + sulfamethoxazole: 160 + 800 mg every 12 hours for 3 days, OR 320 + 1,600 mg daily for 5 days.",
    note: "Second-line therapy – use if severe (immediate/delayed) penicillin hypersensitivity. Once-daily regimen may be preferred for administration in school settings.",
  },
];

const childOralDoses: OralDose[] = [
  {
    dose: "Cefalexin: 25 mg/kg up to 1,000 mg every 12 hours for 5 days.",
    note: "Children tolerate cefalexin liquid better than dicloxacillin/flucloxacillin due to taste. Can be used if non-severe (immediate/delayed) penicillin hypersensitivity. Stop therapy after 3 days if infection has resolved.",
  },
  {
    dose: "Dicloxacillin or flucloxacillin: 12.5 mg/kg up to 500 mg, every 6 hours for 5 days.",
    note: "Stop therapy after 3 days if infection has resolved.",
  },
  {
    dose: "Trimethoprim + sulfamethoxazole (≥ 1 month old): 4 + 20 mg/kg up to 160 + 800 mg every 12 hours for 3 days, OR 8 + 40 mg/kg up to 320 + 1,600 mg daily for 5 days.",
    note: "Second-line therapy – use if severe (immediate/delayed) penicillin hypersensitivity. Once-daily regimen may be preferred for administration in school settings.",
  },
];

function oralDosesForAge(age: number) {
  return age >= 18 ? adultOralDoses : childOralDoses;
}

function OralReference({ age }: { age: number }) {
  const doses = oralDosesForAge(age);
  return (
    <article className="rounded-lg border border-line bg-paper px-3.5 py-3">
      <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">Empirical treatment (extensive)</h3>
      <p className="mt-3 text-sm font-medium text-ink">{age >= 18 ? "Adult oral" : "Child oral"}</p>
      <ul className="mt-2 space-y-3">
        {doses.map((item) => (
          <li key={item.dose}>
            <p className="text-sm leading-6 text-ink">{item.dose}</p>
            <p className="text-xs leading-5 text-ink-soft italic">Note: {item.note}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

function outcomeClass(kind: Recommendation["kind"]) {
  if (kind === "ed" || kind === "contraindicated") return "border-red-200 bg-red-50";
  if (kind === "gp" || kind === "differential") return "border-orange-200 bg-orange-50";
  if (kind === "concurrent") return "border-yellow-300 bg-yellow-50";
  if (kind === "treat") return "border-moss/20 bg-[var(--step-bg)]";
  return "border-line bg-paper";
}

function outcomeLabelClass(kind: Recommendation["kind"]) {
  if (kind === "ed" || kind === "contraindicated") return "text-red-800";
  if (kind === "gp" || kind === "differential") return "text-orange-800";
  if (kind === "concurrent") return "text-yellow-800";
  if (kind === "treat") return "text-moss";
  return "text-ink-soft";
}

function alertName(kind: Recommendation["kind"]) {
  if (kind === "ed" || kind === "contraindicated") return "Red alert";
  if (kind === "gp" || kind === "differential") return "Orange alert";
  if (kind === "concurrent") return "Yellow alert";
  if (kind === "treat") return "Green alert";
  return "Outcome";
}

const usualCarePdf = `Usual care:
- Good hand hygiene, keep nails short, cover with watertight dressing.
- Remove crusts gently using paw paw or white soft paraffin before applying topicals.
- Bleach baths: 10 mins daily (12 mL of 4% bleach in 10 L water).
- School exclusion: Stay home until 24 hours after antibiotics commence.
- For detailed hygiene and household prevention tips, refer to the Royal Children’s Hospital Impetigo Fact Sheet: https://www.rch.org.au/kidsinfo/fact_sheets/Impetigo_school_sores/`;

const localTreatmentPdf = `Localised treatment:
- 1st line. Topical ointment or cream, mupirocin 2% (Apply to lesions, every 8 hours for 5 days).
- 2nd line. Topical cream, hydrogen peroxide 1% (Apply to lesions, every 8 hours for 5 days).

${usualCarePdf}`;

function oralTreatmentPdf(age: number | null) {
  const adult = age != null && age >= 18;
  const doses = adult ? adultOralDoses : childOralDoses;
  const lines = doses.map((item) => `- ${item.dose}\n  Note: ${item.note}`).join("\n");
  return `Empirical treatment (extensive):
${adult ? "Adult oral" : "Child oral"}:
${lines}

${usualCarePdf}`;
}

function activeClinicalTriggers(form: FormState, drugFlags: string[]) {
  const age = readNumber(form.age);
  const triggers: string[] = [];
  if (age != null && age < 2) triggers.push("Age under 2 years");
  if (form.consent === "no") triggers.push("Consent declined");
  if (form.initialSymptoms === "no") triggers.push("Signs, symptoms, or history not consistent with impetigo");
  if (form.presentation === "no") triggers.push("Presentation not clear non-bullous impetigo");
  if (form.extent) triggers.push(extentLabel(form.extent));
  triggers.push(
    ...clinicalSelections(form.redFlags),
    ...clinicalSelections(form.risks),
    ...clinicalSelections(form.severeSymptoms),
    ...clinicalSelections(drugFlags),
  );
  return triggers.length > 0 ? triggers.join(", ") : "None";
}

function primaryAction(outcome: Outcome) {
  const item = outcome.recommendation;
  if (item.kind === "ed") return "Immediate referral to Emergency Department";
  if (item.kind === "contraindicated") return `Treatment Contraindicated. ${item.detail}`;
  if (item.kind === "gp") return `Refer to GP. ${item.detail}`;
  if (item.kind === "differential") return `${item.title}. ${item.detail}`;
  if (item.kind === "concurrent") return item.title;
  if (item.kind === "treat") return "Safe to treat";
  if (item.kind === "pending") return item.detail;
  return "No answers recorded yet.";
}

function treatmentPathway(form: FormState, outcome: Outcome) {
  if (outcome.showLocal) return localTreatmentPdf;
  if (outcome.showOral) return oralTreatmentPdf(readNumber(form.age));
  if (
    outcome.recommendation.kind === "ed" ||
    outcome.recommendation.kind === "contraindicated" ||
    outcome.recommendation.kind === "gp" ||
    outcome.recommendation.kind === "differential"
  ) {
    return "Not indicated. Do not supply antibiotics under this protocol.";
  }
  return "Not indicated";
}

function consultationRows(form: FormState, treatment: string, drugFlags: string[]): string[][] {
  const age = form.age.trim();
  return [
    ["Age", age ? `${age} years` : "Not answered"],
    ["Patient consents", yesNoText(form.consent)],
    [symptomsQuestion, yesNoText(form.initialSymptoms)],
    ["Risks", listText(form.risks)],
    ["Red flag symptoms", listText(form.redFlags)],
    ["GP referral triggers (severe symptoms and differential diagnosis)", listText(form.severeSymptoms)],
    [presentationQuestion, yesNoText(form.presentation)],
    ["Extent of infection", form.extent ? extentLabel(form.extent) : "Not answered"],
    ["Proposed treatment", treatment ? treatmentLabel(treatment) : "Not answered"],
    ["Appropriateness assessment", listText(drugFlags)],
  ];
}

function outcomeRows(form: FormState, outcome: Outcome, drugFlags: string[]): string[][] {
  return [
    ["Action Required", primaryAction(outcome)],
    ["Active Clinical Triggers", activeClinicalTriggers(form, drugFlags)],
    ["Treatment pathway", treatmentPathway(form, outcome)],
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
  notes: { subjective: string; objective: string; treatment: string; drugFlags: string[] },
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
  doc.text("Patient History", 16, 40);
  const afterHistory = drawTable(doc, autoTable, {
    startY: 44,
    head: [["Section", "Notes"]],
    body: [
      ["Subjective", notes.subjective.trim() || "Not recorded"],
      ["Objective", notes.objective.trim() || "Not recorded"],
    ],
    columnStyles: { 0: { cellWidth: 32, fontStyle: "bold" } },
  });

  let answersHeadingY = afterHistory + 12;
  if (answersHeadingY > doc.internal.pageSize.getHeight() - 48) {
    doc.addPage();
    answersHeadingY = 18;
  }
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.setTextColor(28, 25, 21);
  doc.text("Consultation answers", 16, answersHeadingY);
  const afterAnswers = drawTable(doc, autoTable, {
    startY: answersHeadingY + 4,
    head: [["Question", "Answer"]],
    body: consultationRows(form, notes.treatment, notes.drugFlags),
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
    body: outcomeRows(form, outcome, notes.drugFlags),
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
  const [subjectiveNotes, setSubjectiveNotes] = useState("");
  const [objectiveNotes, setObjectiveNotes] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState<string>("");
  const [drugFlags, setDrugFlags] = useState<string[]>([]);
  const [reportNote, setReportNote] = useState<string | null>(null);
  const noteStackRef = useRef<HTMLDivElement>(null);
  const outcome = derive(form, drugFlags);
  const recommendation = outcome.recommendation;
  const decided =
    recommendation.kind === "ed" ||
    recommendation.kind === "contraindicated" ||
    recommendation.kind === "gp" ||
    recommendation.kind === "differential" ||
    recommendation.kind === "concurrent" ||
    recommendation.kind === "treat";
  const isEligibilityPassed = form.age !== "" && Number(form.age) >= 2 && form.consent === "yes";
  const isSymptomsLocked = !isEligibilityPassed;
  const isSymptomsPassed = form.initialSymptoms === "yes";
  const isRisksLocked = isSymptomsLocked || !isSymptomsPassed;
  const isRisksPassed = form.risks.length > 0 && form.risks.includes(noneLabel);
  const isRedFlagsLocked = isRisksLocked || !isRisksPassed;
  const isRedFlagsPassed = form.redFlags.length > 0 && form.redFlags.includes(noneLabel);
  const isSevereLocked = isRedFlagsLocked || !isRedFlagsPassed;
  const isSeverePassed = form.severeSymptoms.length > 0 && form.severeSymptoms.includes(noneLabel);
  const isNonBullousLocked = isSevereLocked || !isSeverePassed;
  const isNonBullousPassed = form.presentation === "yes";
  const isExtentLocked = isNonBullousLocked || !isNonBullousPassed;
  const isExtentPassed = form.extent !== "";
  const isTreatmentSelectionLocked = isExtentLocked || !isExtentPassed;
  const isTreatmentSelectionPassed = selectedTreatment !== "";
  const isDrugAssessmentLocked = isTreatmentSelectionLocked || !isTreatmentSelectionPassed;

  useEffect(() => {
    fitClinicalNotes(noteStackRef.current);
  }, [subjectiveNotes, objectiveNotes]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggle(key: "redFlags" | "risks" | "severeSymptoms", item: string) {
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
      const doc = buildConsultationReport(jsPDF, autoTable, form, outcome, {
        subjective: subjectiveNotes,
        objective: objectiveNotes,
        treatment: selectedTreatment,
        drugFlags,
      });
      tab.location.href = doc.output("bloburl").toString();
    } catch {
      tab.close();
      setReportNote("The consultation record could not be created. Try again.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[100rem] px-4 py-8 md:px-6 md:py-10">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Clinical tool</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">Management of Impetigo</h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Work through management of impetigo. Referral flags update from the protocol as you answer. Nothing is saved.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 xl:grid-cols-[300px_minmax(0,1fr)_350px]">
        <aside
          aria-label="Clinical notes"
          className="min-w-0 self-start h-fit rounded-xl border border-line bg-paper-raised p-5 xl:sticky xl:top-6"
        >
          <div className="text-[11px] font-medium tracking-[0.16em] text-moss uppercase">
            Clinical notes (S&O)
            <span className="normal-case tracking-normal">
              <InfoTip>
                <ul className="mt-1.5 list-disc space-y-1 rounded bg-gray-800 py-2 pr-2 pl-5 text-left text-xs leading-5 font-normal tracking-normal text-white normal-case shadow-lg">
                  {subjectivePrompts.map((prompt) => (
                    <li key={prompt}>{prompt}</li>
                  ))}
                </ul>
              </InfoTip>
            </span>
          </div>
          <div ref={noteStackRef} className="mt-4 grid gap-5">
            <label className="block">
              <span className="text-sm font-medium text-ink">Subjective</span>
              <textarea
                value={subjectiveNotes}
                rows={3}
                onChange={(event) => setSubjectiveNotes(event.target.value)}
                className={`${inputClass} min-h-[100px] resize-none overflow-hidden leading-6`}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Objective</span>
              <textarea
                value={objectiveNotes}
                rows={3}
                onChange={(event) => setObjectiveNotes(event.target.value)}
                className={`${inputClass} min-h-[100px] resize-none overflow-hidden leading-6`}
              />
            </label>
          </div>
        </aside>

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

          <Section title="Symptoms" locked={isSymptomsLocked}>
            <RadioGroup
              label={symptomsQuestion}
              name="initialSymptoms"
              value={form.initialSymptoms}
              disabled={isSymptomsLocked}
              onChange={(value) => set("initialSymptoms", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              aside={
                <div className="mt-3">
                  <p className="text-sm font-medium text-ink">Examples of likely impetigo:</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
                    {impetigoExamples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </div>
              }
            />
          </Section>

          <Section title="Risks" locked={isRisksLocked}>
            <CheckGroup
              label="Does the patient report or present with any of the following?"
              hint="Any one of these is a GP referral. Do not supply antibiotics."
              items={riskItems}
              checked={form.risks}
              disabled={isRisksLocked}
              onToggle={(item) => toggle("risks", item)}
            />
          </Section>

          <Section title="Red flag symptoms" locked={isRedFlagsLocked}>
            <CheckGroup
              label="Does the patient report or present with any of the following?"
              hint="Any one of these is an emergency department referral."
              items={redFlagItems}
              checked={form.redFlags}
              disabled={isRedFlagsLocked}
              onToggle={(item) => toggle("redFlags", item)}
            />
          </Section>

          <Section title="GP referral triggers (severe symptoms & differential dx)" locked={isSevereLocked}>
            <CheckGroup
              label="Does the patient report/present with any of the following?"
              hint="Any one of these is a GP referral. Do not supply antibiotics."
              items={severeSymptomItems}
              checked={form.severeSymptoms}
              disabled={isSevereLocked}
              onToggle={(item) => toggle("severeSymptoms", item)}
            />
          </Section>

          <Section title="Non-bullous impetigo presentation" locked={isNonBullousLocked}>
            <RadioGroup
              label={presentationQuestion}
              name="presentation"
              value={form.presentation}
              disabled={isNonBullousLocked}
              onChange={(value) => set("presentation", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              aside={
                <div className="mt-3">
                  <p className="text-sm font-medium text-ink">
                    Key Features of non-bullous impetigo (eligible for pharmacist treatment)
                  </p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
                    {nonBullousFeatures.map((feature) => (
                      <li key={feature.lead}>
                        <span className="font-semibold">{feature.lead}</span>{feature.rest}
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          </Section>

          <Section title="Extent of infection" locked={isExtentLocked}>
            <RadioGroup
              label="How extensive is the infection?"
              name="extent"
              value={form.extent}
              disabled={isExtentLocked}
              onChange={(value) => set("extent", value)}
              options={extentOptions}
              stacked
            />
          </Section>

          <Section title="Proposed treatment" locked={isTreatmentSelectionLocked}>
            <RadioGroup
              label="Which management option are you proposing to supply?"
              name="proposedTreatment"
              value={selectedTreatment}
              disabled={isTreatmentSelectionLocked}
              onChange={(value) => {
                setSelectedTreatment(value);
                setDrugFlags([]);
              }}
              options={treatmentOptions}
              stacked
            />
          </Section>

          <Section title="Appropriateness assessment" locked={isDrugAssessmentLocked}>
            <CheckGroup
              label="Does the patient have allergies, medicine interactions or any other contraindications to management options?"
              hint="If any apply, do not supply the selected medicine. Refer to GP or select an alternative."
              items={drugFlagItems(selectedTreatment)}
              checked={drugFlags}
              disabled={isDrugAssessmentLocked}
              onToggle={(item) => {
                setDrugFlags((selected) => {
                  if (item === noneLabel) return selected.includes(noneLabel) ? [] : [noneLabel];
                  const withoutNone = selected.filter((entry) => entry !== noneLabel);
                  return withoutNone.includes(item)
                    ? withoutNone.filter((entry) => entry !== item)
                    : [...withoutNone, item];
                });
              }}
            />
          </Section>

          <Disclaimer />
        </form>

        <aside
          aria-label="Live clinical outcome"
          className="min-w-0 rounded-xl border border-line bg-paper-raised p-5 xl:sticky xl:top-6 xl:max-h-[calc(100dvh-3rem)] xl:overflow-y-auto"
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
                  ) : recommendation.kind === "differential" ? (
                    <span className="font-bold text-red-600">Provide Pharmacist Care and/or Refer to GP</span>
                  ) : recommendation.kind === "gp" ? (
                    <span className="font-bold text-red-600">Refer to GP</span>
                  ) : recommendation.kind === "contraindicated" ? (
                    <span className="font-bold text-red-600">Treatment Contraindicated</span>
                  ) : (
                    recommendation.title
                  )}
                </h3>
                {recommendation.detail ? (
                  <p className="mt-1.5 text-sm leading-6 text-ink">{recommendation.detail}</p>
                ) : null}
                {outcome.showUsualCare ? <UsualCare /> : null}
              </article>
            ) : null}
            {outcome.showLocal ? <LocalisedTreatment /> : null}
            {outcome.showOral ? <OralReference age={readNumber(form.age) ?? 0} /> : null}
          </div>
          {outcome.dirty ? (
            <button
              type="button"
              onClick={() => {
                setForm(emptyForm);
                setSelectedTreatment("");
                setDrugFlags([]);
              }}
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
