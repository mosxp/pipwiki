"use client";

import { useState } from "react";
import { Disclaimer } from "@/components/disclaimer";
import type { jsPDF } from "jspdf";
import type { UserOptions } from "jspdf-autotable";

type YesNo = "" | "yes" | "no";
type RequestFor = "" | "self" | "other";
type Flow = "" | "normal" | "lighter";
type Lateness = "" | "late" | "not-late";
type EcProduct = "" | "upa" | "lng";

type FormState = {
  requestFor: RequestFor;
  adequateHistory: YesNo;
  age: string;
  severeSymptoms: YesNo;
  weightKg: string;
  heightCm: string;
  hoursSince: string;
  upsiCount: string;
  cycleDays: string;
  lmp: string;
  expectedPeriod: string;
  flow: Flow;
  lateness: Lateness;
  contraception: YesNo;
  contraceptionDetails: string;
  recentEc: YesNo;
  recentEcProduct: EcProduct;
  upaPast5Days: YesNo;
  upaRepeat: YesNo;
  progestogens: YesNo;
  otherMeds: YesNo;
  otherMedsDetails: string;
  cyp3a4: YesNo;
  malabsorption: YesNo;
  severeAsthma: YesNo;
  breastfeeding: YesNo;
  consent: YesNo;
};

const emptyForm: FormState = {
  requestFor: "",
  adequateHistory: "",
  age: "",
  severeSymptoms: "",
  weightKg: "",
  heightCm: "",
  hoursSince: "",
  upsiCount: "",
  cycleDays: "",
  lmp: "",
  expectedPeriod: "",
  flow: "",
  lateness: "",
  contraception: "",
  contraceptionDetails: "",
  recentEc: "",
  recentEcProduct: "",
  upaPast5Days: "",
  upaRepeat: "",
  progestogens: "",
  otherMeds: "",
  otherMedsDetails: "",
  cyp3a4: "",
  malabsorption: "",
  severeAsthma: "",
  breastfeeding: "",
  consent: "",
};

type Flag = {
  tone: "alert" | "caution";
  title: string;
  detail: string;
};

type ProductChoice = {
  rank: string;
  name: string;
  detail?: string;
};

type ProductView =
  | { kind: "idle" }
  | { kind: "pending"; detail: string }
  | { kind: "refer"; title: string; detail: string }
  | {
      kind: "options";
      summary: string;
      choices: ProductChoice[];
      notes: string[];
    };

type Outcome = {
  bmi: number | null;
  heightHint: string | null;
  bodyLine: string | null;
  flags: Flag[];
  product: ProductView;
  history: { label: string; value: string }[];
  dirty: boolean;
};

const milkAdvice =
  "If ulipristal is used while breastfeeding, express and discard the milk for 24 hours or 1 week, according to current guidelines.";

function readNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function bmiFrom(weightKg: number | null, heightCm: number | null): number | null {
  if (weightKg == null || weightKg <= 0 || heightCm == null) return null;
  if (heightCm < 50 || heightCm > 250) return null;
  const metres = heightCm / 100;
  return weightKg / (metres * metres);
}

function formatWhen(value: string): string {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function derive(form: FormState): Outcome {
  const age = readNumber(form.age);
  const weight = readNumber(form.weightKg);
  const height = readNumber(form.heightCm);
  const hours = readNumber(form.hoursSince);
  const count = readNumber(form.upsiCount);
  const bmi = bmiFrom(weight, height);
  const highBody = (bmi != null && bmi > 26) || (weight != null && weight > 70);
  const veryHighBody = (bmi != null && bmi > 30) || (weight != null && weight > 85);
  const recentUpa =
    form.recentEc === "yes" &&
    form.recentEcProduct === "upa" &&
    form.upaPast5Days === "yes";
  const recentLng = form.recentEc === "yes" && form.recentEcProduct === "lng";
  const asthmaLng = form.severeAsthma === "yes" && hours != null && hours <= 96;
  const timeUpaOnly = hours != null && hours >= 96 && hours <= 120;
  const forcesLng =
    form.progestogens === "yes" ||
    form.cyp3a4 === "yes" ||
    asthmaLng ||
    recentLng;
  const forcesUpa = (timeUpaOnly && !asthmaLng) || recentUpa;
  const lngAllowed = hours != null && (hours < 96 || asthmaLng);
  const doubleLng = form.cyp3a4 === "yes" || highBody;

  const flags: Flag[] = [];

  if (age != null && age < 18) {
    flags.push({
      tone: "alert",
      title: "Under 18 — Gillick competency",
      detail:
        "Assess Gillick competency and maturity before supply. If the patient does not have a mature understanding of what is proposed, refer.",
    });
  }

  if (form.severeSymptoms === "yes") {
    flags.push({
      tone: "alert",
      title: "Possible acute pathology",
      detail:
        "Severe abdominal pain or unexpected heavy bleeding is a red flag for acute pathology or an existing ectopic pregnancy. Medical referral and investigation.",
    });
  }

  if (hours != null && hours > 120) {
    flags.push({
      tone: "alert",
      title: "Outside the oral window",
      detail:
        "Unprotected sex was more than 120 hours ago. Urgent referral. Oral emergency contraception is outside this protocol.",
    });
  }

  if (form.consent === "no") {
    flags.push({
      tone: "alert",
      title: "Consent and safety",
      detail:
        "This sexual intercourse was not with full consent. Offer support, give 1800RESPECT (1800 737 732), and supply and refer.",
    });
  }

  if (form.requestFor === "other" && form.adequateHistory === "no") {
    flags.push({
      tone: "caution",
      title: "Third-party history",
      detail:
        "An adequate history is not available from the person making the request. Contact the patient directly before supply.",
    });
  }

  if (count != null && count > 1) {
    flags.push({
      tone: "caution",
      title: "More than one episode this cycle",
      detail:
        "Multiple episodes of unprotected sex increase the risk of a pre-existing pregnancy from an earlier event.",
    });
  }

  if (form.flow === "lighter") {
    flags.push({
      tone: "caution",
      title: "Unusual last period",
      detail:
        "A lighter or shorter last period suggests a risk of pre-existing pregnancy.",
    });
  }

  if (form.lateness === "late") {
    flags.push({
      tone: "caution",
      title: "Late period",
      detail: "A late period suggests a risk of pre-existing pregnancy.",
    });
  }

  if (form.contraception === "yes") {
    const recorded = form.contraceptionDetails.trim();
    flags.push({
      tone: "caution",
      title: "Hormonal contraception in use",
      detail: recorded
        ? `${recorded}. Missed or delayed doses decide whether emergency contraception is required, and they influence the product.`
        : "Missed or delayed doses decide whether emergency contraception is required, and they influence the product. Record which method is in use.",
    });
  }

  if (
    form.recentEc === "yes" &&
    form.recentEcProduct === "upa" &&
    form.upaRepeat === "yes"
  ) {
    flags.push({
      tone: "caution",
      title: "Repeat ulipristal this cycle",
      detail:
        "Ulipristal more than once in the same menstrual cycle carries a possible risk of hepatotoxicity. Supply and refer.",
    });
  }

  if (
    form.recentEc === "yes" &&
    form.recentEcProduct === "upa" &&
    form.upaPast5Days === ""
  ) {
    flags.push({
      tone: "caution",
      title: "Recent ulipristal",
      detail:
        "Confirm whether ulipristal was taken in the past 5 days. If it was, use ulipristal again.",
    });
  }

  if (form.malabsorption === "yes") {
    flags.push({
      tone: "caution",
      title: "Possible malabsorption",
      detail:
        "Crohn's disease, severe diarrhoea, or recent vomiting can lower efficacy. Supply and refer.",
    });
  }

  if (veryHighBody && !(hours != null && hours > 120)) {
    flags.push({
      tone: "caution",
      title: "Supply and refer",
      detail:
        "Weight is over 85 kg or BMI is over 30. Supply and refer with the oral choice.",
    });
  }

  if (form.cyp3a4 === "yes" && !(hours != null && hours > 120)) {
    const pastLngWindow = hours != null && hours >= 96 && !asthmaLng;
    flags.push({
      tone: "caution",
      title: "Enzyme inducer",
      detail: pastLngWindow
        ? "A CYP3A4 inducer rules out ulipristal, and levonorgestrel is only used before 96 hours. Urgent referral, or a copper IUD."
        : "A CYP3A4 inducer in the past 4 weeks: levonorgestrel 3 mg is the only oral option, or a copper IUD. Supply and refer.",
    });
  }

  if (form.otherMeds === "yes" && form.cyp3a4 === "") {
    flags.push({
      tone: "caution",
      title: "Medicines in the past 4 weeks",
      detail:
        "Mark whether any are CYP3A4 inducers, such as epilepsy medicines, St John's wort, or griseofulvin.",
    });
  }

  if (form.severeAsthma === "yes" && hours == null) {
    flags.push({
      tone: "caution",
      title: "Severe asthma on oral steroids",
      detail:
        "Use levonorgestrel only if unprotected sex was within 96 hours. After 96 hours, refer. Ulipristal may worsen the asthma.",
    });
  }

  let bodyLine: string | null = null;
  if (bmi != null) {
    const rounded = `${bmi.toFixed(1)} kg/m²`;
    if (veryHighBody) {
      bodyLine = `BMI ${rounded}. Over 30, or weight over 85 kg.`;
    } else if (highBody) {
      bodyLine = `BMI ${rounded}. Over 26, or weight over 70 kg.`;
    } else {
      bodyLine = `BMI ${rounded}. Below the dose-adjustment thresholds.`;
    }
  } else if (weight != null && weight > 85) {
    bodyLine = `${weight} kg. Over 85 kg, so supply and refer. Height is still needed for BMI.`;
  } else if (weight != null && weight > 70) {
    bodyLine = `${weight} kg. Over 70 kg, so the weight rule applies. Height is still needed for BMI.`;
  }

  let heightHint: string | null = null;
  if (height != null && (height < 50 || height > 250)) {
    heightHint = "Enter height in centimetres, for example 165.";
  }

  const history: { label: string; value: string }[] = [];
  if (form.requestFor === "self") {
    history.push({ label: "Requested for", value: "The patient" });
  } else if (form.requestFor === "other" && form.adequateHistory === "yes") {
    history.push({
      label: "Requested for",
      value: "Someone else, with an adequate history",
    });
  }
  const cycleDays = readNumber(form.cycleDays);
  if (cycleDays != null) {
    history.push({ label: "Usual cycle", value: `${cycleDays} days` });
  }
  if (form.lmp) {
    history.push({ label: "Last period", value: formatWhen(form.lmp) });
  }
  if (form.expectedPeriod) {
    history.push({
      label: "Next period expected",
      value: formatWhen(form.expectedPeriod),
    });
  }
  if (form.otherMedsDetails.trim()) {
    history.push({
      label: "Other medicines",
      value: form.otherMedsDetails.trim(),
    });
  }

  const product = selectProduct({
    form,
    hours,
    highBody,
    doubleLng,
    recentUpa,
    recentLng,
    asthmaLng,
    timeUpaOnly,
    forcesLng,
    forcesUpa,
    lngAllowed,
  });

  const dirty = (Object.keys(emptyForm) as (keyof FormState)[]).some(
    (key) => form[key] !== "",
  );

  return { bmi, heightHint, bodyLine, flags, product, history, dirty };
}

function selectProduct(args: {
  form: FormState;
  hours: number | null;
  highBody: boolean;
  doubleLng: boolean;
  recentUpa: boolean;
  recentLng: boolean;
  asthmaLng: boolean;
  timeUpaOnly: boolean;
  forcesLng: boolean;
  forcesUpa: boolean;
  lngAllowed: boolean;
}): ProductView {
  const {
    form,
    hours,
    highBody,
    doubleLng,
    recentUpa,
    recentLng,
    asthmaLng,
    timeUpaOnly,
    forcesLng,
    forcesUpa,
    lngAllowed,
  } = args;

  if (hours != null && hours > 120) {
    return {
      kind: "refer",
      title: "Urgent referral",
      detail:
        "More than 120 hours since unprotected sex. Do not supply oral emergency contraception.",
    };
  }

  if (form.severeAsthma === "yes" && timeUpaOnly && !asthmaLng) {
    return {
      kind: "refer",
      title: "Urgent referral",
      detail:
        "Severe asthma on oral steroids, and unprotected sex was more than 96 hours ago. Ulipristal may worsen the asthma, and levonorgestrel is only used up to 96 hours.",
    };
  }

  if (forcesLng && (forcesUpa || (hours != null && !lngAllowed))) {
    return {
      kind: "refer",
      title: "Urgent referral",
      detail: conflictDetail(form, hours, recentUpa),
    };
  }

  if (hours == null) {
    const lines: string[] = [];
    if (form.progestogens === "yes") {
      lines.push(
        "Progestogens in the past 7 days: levonorgestrel only. Avoid ulipristal.",
      );
    }
    if (form.cyp3a4 === "yes") {
      lines.push("CYP3A4 inducer: levonorgestrel 3 mg only.");
    }
    if (recentLng) {
      lines.push("Levonorgestrel in the past 7 days: stay with levonorgestrel.");
    }
    if (recentUpa) {
      lines.push("Ulipristal in the past 5 days: use ulipristal again.");
    }
    if (lines.length > 0) {
      return {
        kind: "pending",
        detail: `${lines.join(" ")} Enter the hours since unprotected sex to confirm the window.`,
      };
    }
    return {
      kind: "pending",
      detail: "Enter how many hours ago unprotected sex occurred.",
    };
  }

  if (forcesLng && lngAllowed) {
    const notes: string[] = [];
    if (form.progestogens === "yes") {
      notes.push(
        "Progestogens in the past 7 days, or restarting them immediately, require levonorgestrel. Avoid ulipristal. Ulipristal needs a 5-day delay before progestogens are started.",
      );
    }
    if (form.cyp3a4 === "yes") {
      notes.push(
        "A CYP3A4 inducer in the past 4 weeks leaves levonorgestrel 3 mg as the only oral option. A copper IUD is the alternative in the protocol.",
      );
    }
    if (asthmaLng) {
      notes.push(
        "Severe asthma on oral steroids: levonorgestrel only. Ulipristal may worsen the asthma.",
      );
    }
    if (recentLng) {
      notes.push(
        "Levonorgestrel was taken in the past 7 days, so stay with levonorgestrel.",
      );
    }
    if (form.breastfeeding === "yes") {
      notes.push("Levonorgestrel is also the first choice while breastfeeding.");
    }
    if (highBody) {
      notes.push(
        "The protocol prefers a copper IUD when weight is over 70 kg or BMI is over 26.",
      );
    }

    return {
      kind: "options",
      summary: hours < 96 ? "Under 96 hours" : "At 96 hours",
      choices: [
        {
          rank: "Only oral option",
          name: doubleLng ? "Levonorgestrel 3 mg" : "Levonorgestrel",
          detail: form.cyp3a4 === "yes"
            ? "Double dose. Do not use ulipristal."
            : highBody
              ? "Double dose because weight is over 70 kg or BMI is over 26. Do not use ulipristal."
              : "Do not use ulipristal.",
        },
      ],
      notes,
    };
  }

  if (recentUpa || timeUpaOnly) {
    const notes: string[] = [];
    if (timeUpaOnly) {
      notes.push("From 96 to 120 hours, ulipristal is the only oral option.");
    }
    if (recentUpa) {
      notes.push("Ulipristal in the past 5 days: use ulipristal again.");
    }
    if (form.breastfeeding === "yes") notes.push(milkAdvice);
    if (highBody) {
      notes.push(
        "Weight or BMI already makes ulipristal the first-choice oral option. The protocol prefers a copper IUD at this weight or BMI.",
      );
    }
    return {
      kind: "options",
      summary: timeUpaOnly ? "96–120 hours" : "Ulipristal required",
      choices: [{ rank: "Only oral option", name: "Ulipristal" }],
      notes,
    };
  }

  if (form.breastfeeding === "yes" && highBody) {
    return {
      kind: "options",
      summary: "Under 96 hours",
      choices: [
        {
          rank: "First-choice oral",
          name: "Ulipristal",
          detail:
            "First-choice oral option because weight is over 70 kg or BMI is over 26. Express and discard breast milk for 24 hours or 1 week, according to current guidelines.",
        },
        {
          rank: "If milk is not discarded",
          name: "Levonorgestrel 3 mg",
          detail:
            "Levonorgestrel is first choice for breastfeeding. Use 3 mg because of weight or BMI.",
        },
      ],
      notes: [
        "The protocol prefers a copper IUD when weight is over 70 kg or BMI is over 26.",
      ],
    };
  }

  if (form.breastfeeding === "yes") {
    return {
      kind: "options",
      summary: "Under 96 hours",
      choices: [
        {
          rank: "First choice",
          name: "Levonorgestrel",
          detail: "First choice while breastfeeding.",
        },
        { rank: "Second choice", name: "Ulipristal", detail: milkAdvice },
      ],
      notes: [],
    };
  }

  if (highBody) {
    return {
      kind: "options",
      summary: "Under 96 hours",
      choices: [
        {
          rank: "First-choice oral",
          name: "Ulipristal",
          detail:
            "Preferred oral option when weight is over 70 kg or BMI is over 26.",
        },
        {
          rank: "Second choice",
          name: "Levonorgestrel 3 mg",
          detail: "Double dose if levonorgestrel is used.",
        },
      ],
      notes: [
        "The protocol prefers a copper IUD when weight is over 70 kg or BMI is over 26.",
      ],
    };
  }

  return {
    kind: "options",
    summary: "Under 96 hours",
    choices: [
      { rank: "First choice", name: "Ulipristal" },
      { rank: "Second choice", name: "Levonorgestrel" },
    ],
    notes: [],
  };
}

function conflictDetail(
  form: FormState,
  hours: number | null,
  recentUpa: boolean,
): string {
  const lngRules: string[] = [];
  if (form.progestogens === "yes") {
    lngRules.push("progestogens in the past 7 days require levonorgestrel only");
  }
  if (form.cyp3a4 === "yes") {
    lngRules.push("a CYP3A4 inducer requires levonorgestrel 3 mg only");
  }
  if (form.severeAsthma === "yes" && hours != null && hours <= 96) {
    lngRules.push("severe asthma on oral steroids requires levonorgestrel");
  }
  if (form.recentEc === "yes" && form.recentEcProduct === "lng") {
    lngRules.push("levonorgestrel in the past 7 days means staying with levonorgestrel");
  }

  const upaRules: string[] = [];
  if (hours != null && hours >= 96 && hours <= 120) {
    upaRules.push("96–120 hours allows ulipristal only");
  }
  if (recentUpa) {
    upaRules.push("ulipristal in the past 5 days means using ulipristal again");
  }

  const left = lngRules.length > 0 ? lngRules.join("; ") : "levonorgestrel is required";
  const right = upaRules.length > 0 ? upaRules.join("; ") : "ulipristal is required";
  return `These rules clash: ${left}. Against that, ${right}. No single oral option fits. Urgent referral. A copper IUD may still be considered.`;
}

const inputClass =
  "mt-2 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-moss";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line bg-paper-raised px-5 py-5">
      <h2 className="text-[11px] font-medium tracking-[0.16em] text-moss uppercase">
        {title}
      </h2>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium leading-6 text-ink">{children}</p>;
}

function RadioGroup<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-ink">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={[
                "inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm",
                checked
                  ? "border-moss bg-[var(--step-bg)] text-ink"
                  : "border-line bg-paper text-ink/80",
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
          inputMode="decimal"
          min={0}
          step="any"
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

function yesNoOptions(): { value: YesNo; label: string }[] {
  return [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
}

function shown(value: string) {
  const trimmed = value.trim();
  return trimmed || "Not answered";
}

function yesNoText(value: YesNo) {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Not answered";
}

function ifApplicable(active: boolean, value: string) {
  return active ? value : "Not applicable";
}

function consultationRows(form: FormState, outcome: Outcome): string[][] {
  const bmi =
    outcome.bmi != null
      ? `${outcome.bmi.toFixed(1)} kg/m²`
      : (outcome.heightHint ?? "Not calculated");

  return [
    [
      "Who is this requested for?",
      form.requestFor === "self"
        ? "The patient"
        : form.requestFor === "other"
          ? "Someone else"
          : "Not answered",
    ],
    [
      "Can they give an adequate history?",
      ifApplicable(form.requestFor === "other", yesNoText(form.adequateHistory)),
    ],
    ["Age", form.age.trim() ? `${form.age.trim()} years` : "Not answered"],
    [
      "Severe abdominal pain, or unexpected heavy bleeding?",
      yesNoText(form.severeSymptoms),
    ],
    ["Weight", form.weightKg.trim() ? `${form.weightKg.trim()} kg` : "Not answered"],
    ["Height", form.heightCm.trim() ? `${form.heightCm.trim()} cm` : "Not answered"],
    ["BMI", bmi],
    [
      "Hours since unprotected sex",
      form.hoursSince.trim() ? `${form.hoursSince.trim()} hours` : "Not answered",
    ],
    [
      "Unprotected sex this menstrual cycle",
      form.upsiCount.trim() ? `${form.upsiCount.trim()} times` : "Not answered",
    ],
    [
      "Usual cycle length",
      form.cycleDays.trim() ? `${form.cycleDays.trim()} days` : "Not answered",
    ],
    [
      "First day of the last period",
      form.lmp ? formatWhen(form.lmp) : "Not answered",
    ],
    [
      "Next period expected",
      form.expectedPeriod ? formatWhen(form.expectedPeriod) : "Not answered",
    ],
    [
      "Last period duration and flow",
      form.flow === "normal"
        ? "Normal"
        : form.flow === "lighter"
          ? "Lighter or shorter than usual"
          : "Not answered",
    ],
    [
      "Is the current period late?",
      form.lateness === "late"
        ? "Late"
        : form.lateness === "not-late"
          ? "Not late"
          : "Not answered",
    ],
    ["Hormonal contraception in use", yesNoText(form.contraception)],
    [
      "Method, and any missed or delayed doses",
      ifApplicable(form.contraception === "yes", shown(form.contraceptionDetails)),
    ],
    ["Emergency contraception in the past 7 days", yesNoText(form.recentEc)],
    [
      "Which emergency contraception",
      ifApplicable(
        form.recentEc === "yes",
        form.recentEcProduct === "upa"
          ? "Ulipristal"
          : form.recentEcProduct === "lng"
            ? "Levonorgestrel"
            : "Not answered",
      ),
    ],
    [
      "Ulipristal in the past 5 days",
      ifApplicable(
        form.recentEc === "yes" && form.recentEcProduct === "upa",
        yesNoText(form.upaPast5Days),
      ),
    ],
    [
      "Ulipristal more than once this cycle",
      ifApplicable(
        form.recentEc === "yes" && form.recentEcProduct === "upa",
        yesNoText(form.upaRepeat),
      ),
    ],
    [
      "Progestogen in the past 7 days",
      yesNoText(form.progestogens),
    ],
    [
      "Prescription or herbal medicines in the past 4 weeks",
      yesNoText(form.otherMeds),
    ],
    [
      "Medication details",
      ifApplicable(form.otherMeds === "yes", shown(form.otherMedsDetails)),
    ],
    ["CYP3A4 inducer in the past 4 weeks", yesNoText(form.cyp3a4)],
    [
      "Crohn's disease, severe diarrhoea, or recent vomiting",
      yesNoText(form.malabsorption),
    ],
    ["Severe asthma on oral steroid tablets", yesNoText(form.severeAsthma)],
    ["Currently breastfeeding", yesNoText(form.breastfeeding)],
    [
      "Sexual intercourse with full consent",
      yesNoText(form.consent),
    ],
  ];
}

function productRecord(form: FormState, outcome: Outcome) {
  if (!outcome.dirty) return "No answers recorded yet.";
  const product = outcome.product;
  if (product.kind === "pending" || product.kind === "idle") return product.kind === "pending" ? product.detail : "No product selected.";
  if (product.kind === "refer") return `${product.title}. ${product.detail}`;

  const lines = [
    product.summary,
    ...product.choices.map((choice) =>
      choice.detail
        ? `${choice.rank}: ${choice.name}. ${choice.detail}`
        : `${choice.rank}: ${choice.name}`,
    ),
    ...product.notes,
  ];
  if (form.severeSymptoms === "yes") {
    lines.push("Do not supply until acute pathology has been excluded.");
  }
  return lines.join("\n");
}

function outcomeRows(form: FormState, outcome: Outcome): string[][] {
  const alerts = outcome.flags.filter((flag) => flag.tone === "alert");
  const cautions = outcome.flags.filter((flag) => flag.tone === "caution");
  const rows: string[][] = [];

  if (outcome.bodyLine) rows.push(["Weight and BMI", outcome.bodyLine]);
  if (alerts.length === 0) {
    rows.push(["Red flags", "None"]);
  } else {
    for (const flag of alerts) rows.push(["Red flag", `${flag.title}. ${flag.detail}`]);
  }
  if (cautions.length === 0) {
    rows.push(["Cautions", "None"]);
  } else {
    for (const flag of cautions) rows.push(["Caution", `${flag.title}. ${flag.detail}`]);
  }
  rows.push(["Recommended product", productRecord(form, outcome)]);
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
    title: "Clinical Handover Report: Emergency Contraception",
    subject: "Pharmacist consultation record",
  });

  doc.setFillColor(44, 92, 74);
  doc.rect(0, 0, pageWidth, 30, "F");
  doc.setTextColor(255, 253, 248);
  doc.setFont("times", "bold");
  doc.setFontSize(15);
  doc.text("Clinical Handover Report: Emergency Contraception", 16, 13);
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
    body: consultationRows(form, outcome),
    columnStyles: {
      0: { cellWidth: 74, fontStyle: "bold" },
    },
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
    columnStyles: {
      0: { cellWidth: 42, fontStyle: "bold" },
    },
    didParseCell: (data) => {
      if (data.section !== "body" || data.column.index !== 0) return;
      if (data.cell.raw === "Red flag") data.cell.styles.textColor = [140, 59, 50];
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
    doc.text(`${page} / ${pageCount}`, pageWidth - 16, pageHeight - 8, {
      align: "right",
    });
  }

  doc.autoPrint({ variant: "non-conform" });
  return doc;
}

function FlagCard({ flag }: { flag: Flag }) {
  const alert = flag.tone === "alert";
  return (
    <article
      className={[
        "rounded-lg border px-3.5 py-3",
        alert
          ? "border-[var(--alert)]/30 bg-[var(--alert-bg)]"
          : "border-[var(--summary)]/30 bg-[var(--summary-bg)]",
      ].join(" ")}
    >
      <h3
        className={[
          "text-[11px] font-medium tracking-[0.14em] uppercase",
          alert ? "text-[var(--alert)]" : "text-[var(--summary)]",
        ].join(" ")}
      >
        {flag.title}
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-ink">{flag.detail}</p>
    </article>
  );
}

export default function EcTriagePage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [reportNote, setReportNote] = useState<string | null>(null);
  const outcome = derive(form);

  async function printConsultationRecord() {
    const tab = window.open("about:blank", "_blank");
    if (!tab) {
      setReportNote(
        "The browser blocked the report tab. Allow pop-ups for this site, then try again.",
      );
      return;
    }

    setReportNote(null);
    try {
      const [{ jsPDF }, { autoTable }] = await Promise.all([
        import("jspdf"),
        import("jspdf-autotable"),
      ]);
      const doc = buildConsultationReport(jsPDF, autoTable, form, outcome);
      tab.location.href = doc.output("bloburl").toString();
    } catch {
      tab.close();
      setReportNote("The consultation record could not be created. Try again.");
    }
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  const alerts = outcome.flags.filter((flag) => flag.tone === "alert");
  const cautions = outcome.flags.filter((flag) => flag.tone === "caution");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-10">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">
          Clinical tool
        </p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
          Emergency contraception
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Work through the consultation. Referral flags and the product choice
          update from the protocol as you answer. Nothing is saved.
        </p>
      </header>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.8fr)]">
        <form
          className="min-w-0 space-y-4"
          autoComplete="off"
          onSubmit={(event) => event.preventDefault()}
          aria-label="Emergency contraception triage"
        >
          <Section title="General information and triage">
            <RadioGroup
              label="Who is this requested for?"
              name="request-for"
              value={form.requestFor}
              onChange={(value) => set("requestFor", value)}
              options={[
                { value: "self", label: "The patient" },
                { value: "other", label: "Someone else" },
              ]}
            />
            {form.requestFor === "other" ? (
              <RadioGroup
                label="Can they give an adequate history?"
                name="adequate-history"
                value={form.adequateHistory}
                onChange={(value) => set("adequateHistory", value)}
                options={yesNoOptions()}
              />
            ) : null}
            <NumberField
              label="Age"
              value={form.age}
              onChange={(value) => set("age", value)}
              suffix="years"
            />
            <RadioGroup
              label="Severe abdominal pain, or unexpected heavy bleeding?"
              name="severe-symptoms"
              value={form.severeSymptoms}
              onChange={(value) => set("severeSymptoms", value)}
              options={yesNoOptions()}
            />
          </Section>

          <Section title="Physical characteristics">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField
                label="Weight"
                value={form.weightKg}
                onChange={(value) => set("weightKg", value)}
                suffix="kg"
              />
              <NumberField
                label="Height"
                value={form.heightCm}
                onChange={(value) => set("heightCm", value)}
                suffix="cm"
                hint={outcome.heightHint ?? undefined}
              />
            </div>
            <div className="rounded-lg bg-[var(--step-bg)] px-4 py-3">
              <p className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                BMI
              </p>
              <p className="mt-1 font-serif text-3xl tracking-tight text-ink">
                {outcome.bmi != null ? outcome.bmi.toFixed(1) : "—"}
                <span className="ml-2 font-sans text-sm text-ink-soft">kg/m²</span>
              </p>
            </div>
          </Section>

          <Section title="Timing of unprotected sex">
            <NumberField
              label="How many hours ago was unprotected sex?"
              value={form.hoursSince}
              onChange={(value) => set("hoursSince", value)}
              suffix="hours"
              hint="96 hours is 4 days. 120 hours is 5 days."
            />
            <NumberField
              label="How many times this menstrual cycle?"
              value={form.upsiCount}
              onChange={(value) => set("upsiCount", value)}
              suffix="times"
            />
          </Section>

          <Section title="Menstrual history and pregnancy risk">
            <NumberField
              label="Usual cycle length"
              value={form.cycleDays}
              onChange={(value) => set("cycleDays", value)}
              suffix="days"
            />
            <label className="block">
              <FieldLabel>First day of the last period</FieldLabel>
              <input
                type="date"
                value={form.lmp}
                onChange={(event) => set("lmp", event.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <FieldLabel>Next period expected</FieldLabel>
              <input
                type="date"
                value={form.expectedPeriod}
                onChange={(event) => set("expectedPeriod", event.target.value)}
                className={inputClass}
              />
            </label>
            <RadioGroup
              label="Was the last period normal in duration and flow?"
              name="flow"
              value={form.flow}
              onChange={(value) => set("flow", value)}
              options={[
                { value: "normal", label: "Normal" },
                { value: "lighter", label: "Lighter or shorter" },
              ]}
            />
            <RadioGroup
              label="Is the current period late?"
              name="lateness"
              value={form.lateness}
              onChange={(value) => set("lateness", value)}
              options={[
                { value: "late", label: "Late" },
                { value: "not-late", label: "Not late" },
              ]}
            />
          </Section>

          <Section title="Medication and health history">
            <RadioGroup
              label="Hormonal contraception in use now? Pill, ring, patch, implant, injection, or IUD."
              name="contraception"
              value={form.contraception}
              onChange={(value) => set("contraception", value)}
              options={yesNoOptions()}
            />
            {form.contraception === "yes" ? (
              <label className="block">
                <FieldLabel>Which method, and any missed or delayed doses</FieldLabel>
                <textarea
                  value={form.contraceptionDetails}
                  onChange={(event) => set("contraceptionDetails", event.target.value)}
                  rows={3}
                  className={inputClass}
                />
              </label>
            ) : null}

            <RadioGroup
              label="Emergency contraception in the past 7 days?"
              name="recent-ec"
              value={form.recentEc}
              onChange={(value) => set("recentEc", value)}
              options={yesNoOptions()}
            />
            {form.recentEc === "yes" ? (
              <>
                <RadioGroup
                  label="Which emergency contraception?"
                  name="recent-ec-product"
                  value={form.recentEcProduct}
                  onChange={(value) => set("recentEcProduct", value)}
                  options={[
                    { value: "upa", label: "Ulipristal" },
                    { value: "lng", label: "Levonorgestrel" },
                  ]}
                />
                {form.recentEcProduct === "upa" ? (
                  <>
                    <RadioGroup
                      label="Was the ulipristal in the past 5 days?"
                      name="upa-past-5"
                      value={form.upaPast5Days}
                      onChange={(value) => set("upaPast5Days", value)}
                      options={yesNoOptions()}
                    />
                    <RadioGroup
                      label="Has ulipristal been used more than once this cycle?"
                      name="upa-repeat"
                      value={form.upaRepeat}
                      onChange={(value) => set("upaRepeat", value)}
                      options={yesNoOptions()}
                    />
                  </>
                ) : null}
              </>
            ) : null}

            <RadioGroup
              label="Any progestogen-containing medicine or contraceptive in the past 7 days?"
              name="progestogens"
              value={form.progestogens}
              onChange={(value) => set("progestogens", value)}
              options={yesNoOptions()}
            />

            <RadioGroup
              label="Prescription or herbal medicines in the past 4 weeks?"
              name="other-meds"
              value={form.otherMeds}
              onChange={(value) => set("otherMeds", value)}
              options={yesNoOptions()}
            />
            {form.otherMeds === "yes" ? (
              <label className="block">
                <FieldLabel>Medication details</FieldLabel>
                <textarea
                  value={form.otherMedsDetails}
                  onChange={(event) => set("otherMedsDetails", event.target.value)}
                  rows={3}
                  placeholder="Epilepsy medicines, St John's wort, griseofulvin, antibiotics, other"
                  className={inputClass}
                />
              </label>
            ) : null}
            <RadioGroup
              label="CYP3A4 inducer in the past 4 weeks? Epilepsy medicines, St John's wort, griseofulvin, or another inducer."
              name="cyp3a4"
              value={form.cyp3a4}
              onChange={(value) => set("cyp3a4", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Crohn's disease, severe diarrhoea, or recent vomiting?"
              name="malabsorption"
              value={form.malabsorption}
              onChange={(value) => set("malabsorption", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Severe asthma that needs oral steroid tablets?"
              name="asthma"
              value={form.severeAsthma}
              onChange={(value) => set("severeAsthma", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Currently breastfeeding?"
              name="breastfeeding"
              value={form.breastfeeding}
              onChange={(value) => set("breastfeeding", value)}
              options={yesNoOptions()}
            />
          </Section>

          <Section title="Safety and support">
            <RadioGroup
              label="Did this sexual intercourse occur with full consent?"
              name="consent"
              value={form.consent}
              onChange={(value) => set("consent", value)}
              options={yesNoOptions()}
            />
          </Section>

          <Disclaimer />
        </form>

        <aside
          aria-label="Live clinical outcome"
          className="min-w-0 rounded-xl border border-line bg-paper-raised p-5 lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto"
        >
          <p className="text-[11px] font-medium tracking-[0.16em] text-moss uppercase">
            Live clinical outcome
          </p>

          <div aria-live="polite" className="mt-4 space-y-3">
            {outcome.bodyLine ? (
              <p className="text-sm leading-6 text-ink">{outcome.bodyLine}</p>
            ) : null}

            {!outcome.dirty ? (
              <p className="text-sm leading-6 text-ink-soft">
                Answer the questions and the referral flags and product choice
                will appear here.
              </p>
            ) : null}

            {alerts.length > 0 ? (
              <div className="space-y-2">
                {alerts.map((flag) => (
                  <FlagCard key={flag.title} flag={flag} />
                ))}
              </div>
            ) : null}

            {cautions.length > 0 ? (
              <div className="space-y-2">
                {cautions.map((flag) => (
                  <FlagCard key={flag.title} flag={flag} />
                ))}
              </div>
            ) : null}

            {outcome.product.kind === "pending" && outcome.dirty ? (
              <article className="rounded-lg border border-line bg-paper px-3.5 py-3">
                <h3 className="text-[11px] font-medium tracking-[0.14em] text-ink-soft uppercase">
                  Product selection
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-ink">
                  {outcome.product.detail}
                </p>
              </article>
            ) : null}

            {outcome.product.kind === "refer" ? (
              <article className="rounded-lg border border-[var(--alert)]/30 bg-[var(--alert-bg)] px-3.5 py-3">
                <h3 className="text-[11px] font-medium tracking-[0.14em] text-[var(--alert)] uppercase">
                  {outcome.product.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-ink">
                  {outcome.product.detail}
                </p>
              </article>
            ) : null}

            {outcome.product.kind === "options" ? (
              <article className="rounded-lg border border-moss/20 bg-[var(--step-bg)] px-3.5 py-3">
                <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                  {outcome.product.summary}
                </h3>
                <ul className="mt-2">
                  {outcome.product.choices.map((choice) => (
                    <li
                      key={choice.rank}
                      className="border-t border-moss/15 py-3 first:border-t-0 first:pt-1"
                    >
                      <p className="text-[11px] tracking-[0.12em] text-moss uppercase">
                        {choice.rank}
                      </p>
                      <p className="mt-1 font-medium text-ink">{choice.name}</p>
                      {choice.detail ? (
                        <p className="mt-1 text-sm leading-6 text-ink/80">
                          {choice.detail}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                {outcome.product.notes.length > 0 ? (
                  <ul className="space-y-2 border-t border-moss/15 pt-3">
                    {outcome.product.notes.map((note) => (
                      <li key={note} className="text-sm leading-6 text-ink/80">
                        {note}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {form.severeSymptoms === "yes" ? (
                  <p className="mt-3 border-t border-moss/15 pt-3 text-sm leading-6 text-ink">
                    Do not supply until acute pathology has been excluded.
                  </p>
                ) : null}
              </article>
            ) : null}
          </div>

          {outcome.history.length > 0 ? (
            <dl className="mt-4 space-y-2 border-t border-line pt-4">
              {outcome.history.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] tracking-[0.12em] text-ink-soft uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 text-sm leading-6 text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

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
          {reportNote ??
            "Creates a handover PDF from these answers and opens it in a new tab."}
        </p>
      </div>
    </div>
  );
}
