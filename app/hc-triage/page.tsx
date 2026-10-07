"use client";

import { useId, useState } from "react";
import { Disclaimer } from "@/components/disclaimer";
import type { jsPDF } from "jspdf";
import type { UserOptions } from "jspdf-autotable";

type YesNo = "" | "yes" | "no";
type Product = "" | "cocp" | "pop" | "ring" | "depot";
type Continuity =
  | ""
  | "continuous"
  | "short-break"
  | "long-break"
  | "depo-due"
  | "depo-late";
type Smoking = "" | "no" | "smoking" | "vaping" | "both";

type FormState = {
  age: string;
  consent: YesNo;
  present: YesNo;
  product: Product;
  productName: string;
  onList: YesNo;
  initiated: YesNo;
  reviewed: YesNo;
  lastReview: string;
  stabilised: YesNo;
  monthsUsed: string;
  continuity: Continuity;
  medications: string;
  allergies: string;
  bleedingChanges: string;
  healthChanges: string;
  smoking: Smoking;
  systolicBP: number | null;
  diastolicBP: number | null;
  weightKg: string;
  heightCm: string;
  ukmec4: YesNo;
  ukmec3: YesNo;
  ukmec4Checks: string[];
  ukmec3Checks: string[];
  unexplainedBleeding: YesNo;
  pcos: YesNo;
  pregnant: YesNo;
  sti: YesNo;
  cst: YesNo;
  coercion: YesNo;
};

const emptyForm: FormState = {
  age: "",
  consent: "",
  present: "",
  product: "",
  productName: "",
  onList: "",
  initiated: "",
  reviewed: "",
  lastReview: "",
  stabilised: "",
  monthsUsed: "",
  continuity: "",
  medications: "",
  allergies: "",
  bleedingChanges: "",
  healthChanges: "",
  smoking: "",
  systolicBP: null,
  diastolicBP: null,
  weightKg: "",
  heightCm: "",
  ukmec4: "",
  ukmec3: "",
  ukmec4Checks: [],
  ukmec3Checks: [],
  unexplainedBleeding: "",
  pcos: "",
  pregnant: "",
  sti: "",
  cst: "",
  coercion: "",
};

type Flag = {
  tone: "alert" | "caution";
  title: string;
  detail: string;
};

type Recommendation =
  | { kind: "idle" }
  | { kind: "pending"; detail: string }
  | { kind: "stop"; title: string; detail: string }
  | { kind: "supply"; title: string; detail: string };

type Outcome = {
  bmi: number | null;
  heightHint: string | null;
  flags: Flag[];
  recommendation: Recommendation;
  dirty: boolean;
};

const combinedUkmec4 = [
  "Current breast cancer",
  "First 6 weeks postpartum if breastfeeding",
  "First 3 weeks postpartum with additional VTE risk factors",
  "Migraine with aura within the last 5 years",
  "Current or past ischaemic heart disease, stroke, or TIA",
  "Age 35 or older and smoking 15 or more cigarettes a day, or any nicotine vaping",
  "Hypertension: systolic 160 mmHg or higher, or diastolic 100 mmHg or higher",
  "Complicated valvular or congenital heart disease",
  "Current or past venous thromboembolism",
  "Positive antiphospholipid antibodies",
  "Known thrombogenic mutation",
  "Major surgery with prolonged immobilisation",
  "Severe (decompensated) cirrhosis",
  "Hepatocellular adenoma or malignant liver tumour",
];

const combinedUkmec3 = [
  "BMI more than 35 kg/m²",
  "Diabetes with nephropathy, retinopathy, neuropathy, or other vascular disease",
  "History of migraine with aura, with no episodes in the last 5 years",
  "Multiple risk factors for cardiovascular disease",
  "Gall bladder disease, medically treated or current",
  "A first-degree relative with a VTE under the age of 45",
  "0 to 3 weeks postpartum, not breastfeeding, without extra VTE risk factors",
  "3 to 6 weeks postpartum, not breastfeeding, with extra VTE risk factors",
];

const popUkmec4 = ["Current breast cancer"];

const popUkmec3 = [
  "Unexplained vaginal bleeding, before the cause is investigated",
  "Past breast cancer",
  "Severe (decompensated) cirrhosis",
  "Hepatocellular adenoma or malignant liver tumour",
  "Ischaemic heart disease, stroke, or TIA that develops during use",
];

const depotUkmec4 = ["Current breast cancer"];

const depotUkmec3 = [
  "Unexplained vaginal bleeding, before the cause is investigated",
  "Past breast cancer",
  "Severe (decompensated) cirrhosis",
  "Hepatocellular adenoma or malignant liver tumour",
  "Multiple risk factors for cardiovascular disease",
  "Hypertension with vascular disease",
  "History of ischaemic heart disease, stroke, or TIA",
];

type CatalogProduct = "cocp" | "pop" | "ring" | "depot" | "implant" | "iud";

type MedicineEntry = {
  name: string;
  product: CatalogProduct;
  status: "approved" | "excluded";
  alias?: boolean;
};

type MedicineMatch =
  | { kind: "empty" }
  | { kind: "pending" }
  | { kind: "unlisted" }
  | { kind: "approved"; product: Product }
  | { kind: "excluded"; product: Product | "" };

function listed(product: CatalogProduct, names: string[], status: MedicineEntry["status"] = "approved"): MedicineEntry[] {
  return names.map((name) => ({ name, product, status }));
}

const medicineCatalog: MedicineEntry[] = [
  ...listed("cocp", [
    "Zoely",
    "Yaz",
    "Yana",
    "Rosie",
    "Brooke",
    "Bella",
    "Femme-Tab ED 20/100",
    "Micronelle 20 ED",
    "Microgynon 20 ED",
    "Loette",
    "Nextstellis",
    "Yasmin",
    "Yelena",
    "Rosalee",
    "Brooklynn",
    "Isabelle",
    "Petibelle",
    "Femme-Tab ED 30/150",
    "Micronelle 30 ED",
    "Microgynon 30 ED",
    "Monofeme",
    "Levlen",
    "Lenest 30",
    "Leveth 150/30",
    "Evelyn 150/30",
    "Eleanor 150/30",
    "Seasonique",
    "Marvelon",
    "Madeline",
    "Valette",
    "Minulet",
    "Estelle-35",
    "Diane-35",
    "Brenda-35",
    "Jene-35",
    "Juliet-35",
    "Norimin",
    "Brevinor",
    "Norimin-1",
    "Brevinor-1",
    "Pirmella",
    "Triquilar ED",
    "Trifeme",
    "Triphasil",
    "Logynon ED",
    "Qlaira",
  ]),
  { name: "Femme-Tab ED", product: "cocp", status: "approved", alias: true },
  ...listed("pop", ["Noriday 28-Day", "Microlut", "Slinda", "Lucinda"]),
  ...listed("ring", ["NuvaRing"]),
  ...listed("depot", ["Depo-Provera", "Depo-Ralovera"]),
  ...listed("cocp", ["Microgynon 50"], "excluded"),
  { name: "Microgynon 50 ED", product: "cocp", status: "excluded", alias: true },
  ...listed("implant", ["Implanon NXT"], "excluded"),
  ...listed("iud", ["Kyleena", "Mirena"], "excluded"),
];

const medicineSections: {
  title: string;
  groups: {
    title?: string;
    rows: { estrogen: string; progestogen: string; brands: string; note?: string }[];
  }[];
}[] = [
  {
    title: "Combined oral contraceptives",
    groups: [
      {
        title: "Low estrogen",
        rows: [
          {
            estrogen: "Estradiol 1.5 mg",
            progestogen: "Nomegestrol 2.5 mg",
            brands: "(24+4) Zoely",
            note: "Higher incidences of missed withdrawal bleeds (the frequency increased over time), breakthrough bleeding or spotting, acne, and weight gain.",
          },
          {
            estrogen: "EE 20 mcg",
            progestogen: "Drospirenone 3 mg",
            brands: "(24+4) Yaz, Yana, Rosie, Brooke, Bella",
            note: "The shortened hormone-free interval may increase contraceptive effectiveness by further suppressing ovarian function.",
          },
          {
            estrogen: "EE 20 mcg",
            progestogen: "Levonorgestrel 100 mcg",
            brands: "(21+7) Femme-Tab ED 20/100, Micronelle 20 ED, Microgynon 20 ED, Loette",
          },
        ],
      },
      {
        title: "Standard estrogen",
        rows: [
          {
            estrogen: "Estetrol 14.2 mg",
            progestogen: "Drospirenone 3 mg",
            brands: "(24+4) Nextstellis",
          },
          {
            estrogen: "EE 30 mcg",
            progestogen: "Drospirenone 3 mg",
            brands: "(21+7) Yasmin, Yelena, Rosalee, Brooklynn, Isabelle, Petibelle",
          },
          {
            estrogen: "EE 30 mcg",
            progestogen: "Levonorgestrel 150 mcg",
            brands: "(21+7) Femme-Tab ED 30/150, Micronelle 30 ED, Microgynon 30 ED, Monofeme, Levlen, Lenest 30, Leveth 150/30, Evelyn 150/30, Eleanor 150/30",
          },
          {
            estrogen: "EE 30 mcg for 84 days, then EE 10 mcg for 7 days",
            progestogen: "Levonorgestrel 150 mcg",
            brands: "(84+7) Seasonique",
            note: "Seasonique does not have a hormone-free interval, unlike other combined pills.",
          },
          {
            estrogen: "EE 30 mcg",
            progestogen: "Desogestrel 150 mcg",
            brands: "(21+7) Marvelon, Madeline",
          },
          {
            estrogen: "EE 30 mcg",
            progestogen: "Dienogest 2 mg",
            brands: "(21+7) Valette",
          },
          {
            estrogen: "EE 30 mcg",
            progestogen: "Gestodene 75 mcg",
            brands: "(21+7) Minulet",
          },
          {
            estrogen: "EE 35 mcg",
            progestogen: "Cyproterone 2 mg",
            brands: "(21+7) Estelle-35, Diane-35, Brenda-35, Jene-35, Juliet-35",
            note: "Associated with an increased risk of VTE compared with other combined pills. Indicated for androgenisation with contraception. Without androgenic symptoms, use another combined pill. Meningioma has been reported. In pregnancy, cyproterone could theoretically cause feminisation of a male fetus.",
          },
          {
            estrogen: "EE 35 mcg",
            progestogen: "Norethisterone 0.5 mg",
            brands: "(21+7) Norimin, Brevinor",
          },
          {
            estrogen: "EE 35 mcg",
            progestogen: "Norethisterone 1 mg",
            brands: "(21+7) Norimin-1, Brevinor-1, Pirmella",
          },
        ],
      },
      {
        title: "Tri-phasic",
        rows: [
          {
            estrogen: "EE 30 / 40 / 30 mcg",
            progestogen: "Levonorgestrel 50 / 75 / 125 mcg",
            brands: "(21+7) Triquilar ED, Trifeme, Triphasil, Logynon ED",
            note: "6 tablets, then 5, then 10.",
          },
        ],
      },
      {
        title: "4-phasic",
        rows: [
          {
            estrogen: "Estradiol valerate",
            progestogen: "Dienogest",
            brands: "(26+2) Qlaira",
            note: "Phases (estradiol valerate / dienogest): 3 mg/nil ×2, 2 mg/2 mg ×5, 2 mg/3 mg ×17, 1 mg/nil ×2. Compared with placebo, Qlaira is effective for heavy menstrual bleeding. A missed period occurs more often with Qlaira.",
          },
        ],
      },
    ],
  },
  {
    title: "Progestogen-only pills",
    groups: [
      {
        rows: [
          { estrogen: "None", progestogen: "Norethisterone 350 mcg", brands: "(28) Noriday 28-Day" },
          { estrogen: "None", progestogen: "Levonorgestrel 30 mcg", brands: "(28) Microlut" },
          { estrogen: "None", progestogen: "Drospirenone 4 mg", brands: "(24+4) Slinda, Lucinda" },
        ],
      },
    ],
  },
  {
    title: "Vaginal ring",
    groups: [
      {
        rows: [
          {
            estrogen: "EE 2.7 mg (15 mcg/24 hours)",
            progestogen: "Etonogestrel 11.7 mg (120 mcg/24 hours)",
            brands: "NuvaRing",
          },
        ],
      },
    ],
  },
  {
    title: "Depot injection",
    groups: [
      {
        rows: [
          {
            estrogen: "None",
            progestogen: "Medroxyprogesterone 150 mg/mL injection",
            brands: "Depo-Provera, Depo-Ralovera",
            note: "A pharmacist with suitable premises and competency in deep intramuscular injection may administer the depot.",
          },
        ],
      },
    ],
  },
];

function normMedicine(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/®/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/ +/g, " ");
}

function compactMedicine(value: string) {
  return normMedicine(value).replace(/ /g, "");
}

function formProduct(product: CatalogProduct): Product | "" {
  if (product === "cocp" || product === "pop" || product === "ring" || product === "depot") return product;
  return "";
}

function matchFrom(entry: MedicineEntry): MedicineMatch {
  const product = formProduct(entry.product);
  if (entry.status === "approved" && product) return { kind: "approved", product };
  return { kind: "excluded", product };
}

function resolveMedicine(raw: string): MedicineMatch {
  const query = normMedicine(raw);
  const packed = compactMedicine(raw);
  if (!query) return { kind: "empty" };

  const exact = medicineCatalog.find(
    (item) => normMedicine(item.name) === query || compactMedicine(item.name) === packed,
  );
  if (exact) return matchFrom(exact);

  const prefixes = medicineCatalog.filter((item) => {
    if (item.alias) return false;
    return normMedicine(item.name).startsWith(query) || compactMedicine(item.name).startsWith(packed);
  });
  if (prefixes.length === 0) return { kind: "unlisted" };
  if (packed.length < 4) return { kind: "pending" };
  if (prefixes.length === 1) return matchFrom(prefixes[0]);

  const products = new Set(prefixes.map((item) => item.product));
  const statuses = new Set(prefixes.map((item) => item.status));
  if (statuses.size === 1 && products.size === 1) return matchFrom(prefixes[0]);
  return { kind: "pending" };
}

function searchMedicines(raw: string) {
  const query = normMedicine(raw);
  const packed = compactMedicine(raw);
  if (!query) return [];
  return medicineCatalog
    .filter((item) => !item.alias)
    .filter(
      (item) => normMedicine(item.name).includes(query) || compactMedicine(item.name).includes(packed),
    )
    .slice(0, 8);
}

function catalogLabel(product: CatalogProduct) {
  if (product === "cocp") return "Combined pill";
  if (product === "pop") return "Progestogen-only pill";
  if (product === "ring") return "Vaginal ring";
  if (product === "depot") return "Depot injection";
  if (product === "implant") return "Implant";
  return "Intrauterine device";
}

function continuityFor(product: Product, continuity: Continuity): Continuity {
  if (product === "cocp" || product === "pop" || product === "ring") {
    if (continuity === "continuous" || continuity === "short-break" || continuity === "long-break") {
      return continuity;
    }
    return "";
  }
  if (product === "depot") {
    if (continuity === "depo-due" || continuity === "depo-late") return continuity;
    return "";
  }
  return "";
}

function applyProductName(current: FormState, productName: string): FormState {
  const match = resolveMedicine(productName);
  if (match.kind === "empty" || match.kind === "pending") {
    return { ...current, productName, onList: "" };
  }
  if (match.kind === "unlisted") {
    return { ...current, productName, onList: "no" };
  }
  const product = match.product || current.product;
  return {
    ...current,
    productName,
    onList: match.kind === "approved" ? "yes" : "no",
    product,
    continuity: match.product ? continuityFor(match.product, current.continuity) : current.continuity,
    ...(match.product ? ukmecForProduct(current, match.product) : {}),
  };
}

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

function reviewIsOld(iso: string): boolean {
  if (!iso) return false;
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return false;
  const reviewed = new Date(year, month - 1, day);
  const now = new Date();
  const cutoff = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
  return reviewed < cutoff;
}

function oralOrRing(product: Product) {
  return product === "cocp" || product === "pop" || product === "ring";
}

function combinedMethod(product: Product) {
  return product === "cocp" || product === "ring";
}

function highCombinedBp(product: Product, systolic: number | null, diastolic: number | null) {
  if (!combinedMethod(product)) return false;
  return (systolic != null && systolic >= 160) || (diastolic != null && diastolic >= 100);
}

function highCombinedBmi(product: Product, bmi: number | null) {
  if (!combinedMethod(product)) return false;
  return bmi != null && bmi > 35;
}

function productLabel(product: Product) {
  if (product === "cocp") return "Combined oral contraceptive";
  if (product === "pop") return "Progestogen-only pill";
  if (product === "ring") return "Vaginal ring";
  if (product === "depot") return "Depot medroxyprogesterone";
  return "Not answered";
}

function listsFor(product: Product) {
  if (product === "cocp" || product === "ring") {
    return {
      group: "Combined hormonal contraception",
      ukmec4: combinedUkmec4,
      ukmec3: combinedUkmec3,
      note: "Combined hormonal contraception before 6 weeks postpartum is UKMEC 4 if the patient is breastfeeding.",
    };
  }
  if (product === "pop") {
    return {
      group: "Progestogen-only pills",
      ukmec4: popUkmec4,
      ukmec3: popUkmec3,
    };
  }
  if (product === "depot") {
    return {
      group: "Depot medroxyprogesterone",
      ukmec4: depotUkmec4,
      ukmec3: depotUkmec3,
      note: "Low bone mineral density, or risk factors for it, needs caution. That includes age under 18 or over 45. This is not a UKMEC category. Multiple cardiovascular risk factors, or a cardiovascular history, need specialist advice.",
    };
  }
  return null;
}

function keptChecks(checks: string[], items: string[] | undefined) {
  if (!items) return [];
  return checks.filter((item) => items.includes(item));
}

function ukmecAnswerAfterListChange(previous: string[], next: string[], answer: YesNo): YesNo {
  if (next.length > 0) return "yes";
  if (previous.length > 0) return "no";
  return answer;
}

function ukmecForProduct(current: FormState, product: Product) {
  const lists = listsFor(product);
  const ukmec4Checks = keptChecks(current.ukmec4Checks, lists?.ukmec4);
  const ukmec3Checks = keptChecks(current.ukmec3Checks, lists?.ukmec3);
  return {
    ukmec4Checks,
    ukmec3Checks,
    ukmec4: ukmecAnswerAfterListChange(current.ukmec4Checks, ukmec4Checks, current.ukmec4),
    ukmec3: ukmecAnswerAfterListChange(current.ukmec3Checks, ukmec3Checks, current.ukmec3),
  };
}

function durationFailed(age: number | null, months: number | null, stabilised: YesNo) {
  if (stabilised === "no") {
    return "The patient has not been stabilised on this contraceptive.";
  }
  if (age == null || months == null) return null;
  if (age >= 16 && age < 18 && months < 12) {
    return "Age 16–17: the same contraceptive has been used for less than 12 months.";
  }
  if (age >= 18 && months < 6) {
    return "Age 18 or older: the same contraceptive has been used for less than 6 months.";
  }
  return null;
}

function gatesAnswered(form: FormState, age: number | null) {
  if (age == null || !form.product) return false;
  const yesNo = [
    form.consent,
    form.present,
    form.onList,
    form.initiated,
    form.reviewed,
    form.ukmec4,
    form.ukmec3,
    form.unexplainedBleeding,
    form.pcos,
    form.pregnant,
    form.sti,
    form.cst,
    form.coercion,
  ];
  if (yesNo.some((value) => value !== "yes" && value !== "no")) return false;
  if (form.stabilised !== "yes" && form.stabilised !== "no" && readNumber(form.monthsUsed) == null) {
    return false;
  }
  if (!form.continuity) return false;
  return true;
}

const pregnancyNote =
  "Consider emergency contraception and a pregnancy test. A test can be falsely negative if unprotected sex was less than 21 days earlier.";

function derive(form: FormState): Outcome {
  const age = readNumber(form.age);
  const months = readNumber(form.monthsUsed);
  const weight = readNumber(form.weightKg);
  const height = readNumber(form.heightCm);
  const bmi = bmiFrom(weight, height);
  const heightHint =
    height != null && (height < 50 || height > 250)
      ? "Enter height in centimetres."
      : null;
  const flags: Flag[] = [];
  const hard: string[] = [];

  if (age != null && (age < 16 || age > 50)) {
    hard.push(age < 16 ? "Age is under 16." : "Age is over 50.");
    flags.push({
      tone: "alert",
      title: "Age",
      detail: age < 16 ? "Age under 16. Refer to the GP." : "Age over 50. Refer to the GP.",
    });
  }
  if (form.consent === "no") {
    hard.push("The patient does not consent.");
    flags.push({
      tone: "alert",
      title: "Consent",
      detail: "The patient does not consent. Refer to the GP.",
    });
  }
  if (form.present === "no") {
    hard.push("The patient is not present in the pharmacy.");
    flags.push({
      tone: "alert",
      title: "Patient not present",
      detail: "The patient is not physically present. Refer to the GP.",
    });
  }
  if (form.onList === "no") {
    hard.push("The medicine is not on the approved list.");
    flags.push({
      tone: "alert",
      title: "Medicines list",
      detail: "The contraceptive is not on the approved list. Refer to the GP.",
    });
  }
  if (form.initiated === "no") {
    hard.push("It was not initiated by a GP or authorised prescriber.");
    flags.push({
      tone: "alert",
      title: "Initiation",
      detail: "This contraceptive was not initiated by a GP or other authorised prescriber. Refer to the GP.",
    });
  }
  if (form.reviewed === "no" || reviewIsOld(form.lastReview)) {
    hard.push("GP review was more than 2 years ago.");
    flags.push({
      tone: "alert",
      title: "GP review",
      detail: "The last review was more than 2 years ago. Refer to the GP.",
    });
  }
  if (highCombinedBp(form.product, form.systolicBP, form.diastolicBP)) {
    hard.push("Blood pressure is UKMEC 4 for combined hormonal contraception.");
    flags.push({
      tone: "alert",
      title: "Blood pressure",
      detail:
        "Systolic 160 mmHg or higher, or diastolic 100 mmHg or higher, with a combined pill or vaginal ring. UKMEC 4. Refer to the GP.",
    });
  }

  const stableDetail = durationFailed(age, months, form.stabilised);
  if (stableDetail) {
    flags.push({ tone: "alert", title: "Not stabilised", detail: `${stableDetail} Refer to the GP.` });
  }

  const longBreak = oralOrRing(form.product) && form.continuity === "long-break";
  const depoLate = form.product === "depot" && form.continuity === "depo-late";
  if (longBreak) {
    flags.push({
      tone: "alert",
      title: "Break of more than 4 weeks",
      detail:
        "Break of more than 4 weeks in the preceding 30 days. Not eligible for resupply under this protocol. Refer to the GP.",
    });
  }
  if (depoLate) {
    flags.push({
      tone: "alert",
      title: "Depot injection late",
      detail:
        "14 weeks or more since the last depot injection. Not eligible for resupply under this protocol. Refer to the GP.",
    });
  }

  const highBmi = highCombinedBmi(form.product, bmi);
  const exclusions = [
    form.ukmec4 === "yes" ? "UKMEC 4" : "",
    form.ukmec3 === "yes" ? "UKMEC 3" : "",
    highBmi ? "BMI more than 35" : "",
    form.unexplainedBleeding === "yes" ? "unexplained bleeding" : "",
    form.pcos === "yes" ? "PCOS signs that have not been assessed" : "",
    form.pregnant === "yes" ? "possible pregnancy" : "",
  ].filter(Boolean);
  if (highBmi) {
    flags.push({
      tone: "alert",
      title: "BMI",
      detail:
        "BMI over 35 kg/m² with a combined pill or vaginal ring. UKMEC 3. Immediate referral to the GP.",
    });
  }
  if (form.ukmec4 === "yes") {
    flags.push({
      tone: "alert",
      title: "UKMEC 4",
      detail:
        form.ukmec4Checks.length > 0
          ? `${form.ukmec4Checks.join("; ")}. Immediate referral to the GP.`
          : "A UKMEC 4 condition applies. Immediate referral to the GP.",
    });
  }
  if (form.ukmec3 === "yes") {
    flags.push({
      tone: "alert",
      title: "UKMEC 3",
      detail:
        form.ukmec3Checks.length > 0
          ? `${form.ukmec3Checks.join("; ")}. Immediate referral to the GP.`
          : "A UKMEC 3 condition applies. Immediate referral to the GP.",
    });
  }
  if (form.unexplainedBleeding === "yes") {
    flags.push({
      tone: "alert",
      title: "Unexplained bleeding",
      detail:
        "Unexplained or uninvestigated bleeding, severe period symptoms, or pain with intercourse. Immediate referral to the GP.",
    });
  }
  if (form.pcos === "yes") {
    flags.push({
      tone: "alert",
      title: "PCOS",
      detail: "PCOS signs have not been assessed. Immediate referral to the GP.",
    });
  }
  if (form.pregnant === "yes") {
    flags.push({
      tone: "alert",
      title: "Possible pregnancy",
      detail: "The patient may be pregnant. Immediate referral to the GP.",
    });
  }

  const treatReasons = [
    form.sti === "yes" ? "STI screening is indicated" : "",
    form.cst === "yes" ? "a cervical screening test is indicated" : "",
    form.coercion === "yes" ? "possible reproductive coercion, sexual abuse, or sexual violence" : "",
  ].filter(Boolean);
  const shortBreak = oralOrRing(form.product) && form.continuity === "short-break";
  const blocking = hard.length > 0 || Boolean(stableDetail) || longBreak || depoLate || exclusions.length > 0;
  const treatLine = blocking
    ? "Include this in the GP referral. Do not resupply under this protocol."
    : "Treat and concurrently refer to the GP.";
  if (form.sti === "yes") {
    flags.push({
      tone: "caution",
      title: "STI screening",
      detail: `STI screening is indicated. ${treatLine}`,
    });
  }
  if (form.cst === "yes") {
    flags.push({
      tone: "caution",
      title: "Cervical screening",
      detail: `A cervical screening test is indicated. ${treatLine}`,
    });
  }
  if (form.coercion === "yes") {
    flags.push({
      tone: "caution",
      title: "Reproductive coercion",
      detail: `Possible reproductive coercion, sexual abuse, or sexual violence. ${treatLine}`,
    });
  }

  if (shortBreak || longBreak || depoLate) {
    flags.push({ tone: "caution", title: "Pregnancy risk", detail: pregnancyNote });
  }
  if (shortBreak && !blocking) {
    flags.push({
      tone: "caution",
      title: "Break of 2–4 weeks",
      detail:
        "Break of 2–4 weeks in the preceding 30 days. Supply one month only, and refer to the GP.",
    });
  }

  const dirty = Object.values(form).some((value) => {
    if (value == null) return false;
    if (Array.isArray(value)) return value.length > 0;
    return value !== "";
  });
  const finished = gatesAnswered(form, age);
  let recommendation: Recommendation = { kind: "idle" };

  if (blocking) {
    const title = exclusions.length > 0 ? "Immediate referral to GP" : longBreak || depoLate ? "Not eligible" : "Refer to GP";
    const lead =
      exclusions.length > 0
        ? "An exclusion applies. Do not resupply under this protocol."
        : longBreak || depoLate
          ? "The patient is not eligible for resupply under this protocol. Refer to the GP."
          : hard.length > 0
            ? "A hard stop applies. Do not resupply under this protocol."
            : "The patient is not stabilised on this contraceptive. Refer to the GP.";
    recommendation = { kind: "stop", title, detail: lead };
  } else if (shortBreak) {
    const extra = treatReasons.length > 0 ? ` Also refer concurrently: ${treatReasons.join("; ")}.` : "";
    const unfinished = finished ? "" : " Finish the remaining questions before supplying.";
    recommendation = {
      kind: "supply",
      title: "Supply one month and refer",
      detail: `Break of 2–4 weeks in the preceding 30 days. Supply one month of treatment and refer to the GP.${extra}${unfinished} ${pregnancyNote}`,
    };
  } else if (treatReasons.length > 0) {
    const unfinished = finished ? "" : " Finish the remaining questions before supplying.";
    const depot =
      form.product === "depot"
        ? " A pharmacist with suitable premises and competency in deep intramuscular injection may administer the depot."
        : "";
    recommendation = {
      kind: "supply",
      title: "Treat and concurrently refer",
      detail: `Resupply one original pack (up to 4 months, depending on the product) and refer to the GP at the same time: ${treatReasons.join("; ")}.${depot}${unfinished}`,
    };
  } else if (
    finished &&
    ((oralOrRing(form.product) && form.continuity === "continuous") ||
      (form.product === "depot" && form.continuity === "depo-due"))
  ) {
    const depot =
      form.product === "depot"
        ? " A pharmacist with suitable premises and competency in deep intramuscular injection may administer the depot."
        : "";
    recommendation = {
      kind: "supply",
      title: "Resupply is appropriate",
      detail: `Provide one original pack, up to 4 months' supply depending on the product. A GP or authorised prescriber review is required at least every 2 years.${depot}`,
    };
  } else if (dirty) {
    recommendation = {
      kind: "pending",
      detail: "No referral trigger is showing yet. Finish the remaining questions before supplying.",
    };
  }

  return { bmi, heightHint, flags, recommendation, dirty };
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

function RadioGroup<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
  children,
  hint,
  notice,
}: {
  label: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  children?: React.ReactNode;
  hint?: string;
  notice?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-ink">{label}</legend>
      {hint ? <p className="mt-1 text-xs leading-5 text-ink-soft">{hint}</p> : null}
      {children}
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
        {notice ? <p className="min-w-48 flex-1 text-sm leading-5 text-amber-600">{notice}</p> : null}
      </div>
    </fieldset>
  );
}

function yesNoOptions(): { value: YesNo; label: string }[] {
  return [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
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

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

const ukmecReviewNotice = "Please review and select the specific criteria from the expanded list above.";

function CriterionList({
  label,
  items,
  group,
  note,
  checked,
  onToggle,
  open,
  onOpenChange,
}: {
  label: string;
  items: string[];
  group?: string;
  note?: string;
  checked: string[];
  onToggle: (item: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <details
      className="group mt-1.5"
      open={open}
      onToggle={(event) => onOpenChange(event.currentTarget.open)}
    >
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm text-moss underline decoration-moss/40 underline-offset-4 hover:decoration-moss [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className={[
            "text-[10px] leading-none transition-transform",
            open ? "rotate-90" : "",
          ].join(" ")}
        >
          ▸
        </span>
        {label}
      </summary>
      {items.length > 0 ? (
        <div className="mt-2 rounded-md bg-sidebar px-3 py-2.5">
          {group ? <p className="text-[11px] tracking-[0.12em] text-ink-soft uppercase">{group}</p> : null}
          <ul className="mt-1.5 space-y-0.5">
            {items.map((item) => {
              const isChecked = checked.includes(item);
              return (
                <li key={item}>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-md px-1 py-1 text-sm leading-5 text-ink hover:bg-paper/70">
                    <span className="relative mt-0.5 inline-flex size-4 shrink-0">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggle(item)}
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
                    {item}
                  </label>
                </li>
              );
            })}
          </ul>
          {note ? <p className="mt-2 text-xs leading-5 text-ink-soft">{note}</p> : null}
        </div>
      ) : (
        <p className="mt-2 rounded-md bg-sidebar px-3 py-2.5 text-xs leading-5 text-ink-soft">
          Select the product category to see the list for that method.
        </p>
      )}
    </details>
  );
}

function ProductNameField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const listId = useId();
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const matches = searchMedicines(value);
  const index = matches.length === 0 ? 0 : Math.min(active, matches.length - 1);
  const showList = open && value.trim().length > 0;

  function choose(name: string) {
    onChange(name);
    setOpen(false);
  }

  return (
    <div className="relative">
      <label htmlFor={inputId} className="text-sm font-medium leading-6 text-ink">
        Product name
      </label>
      <input
        id={inputId}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            return;
          }
          if (!showList || matches.length === 0) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive(Math.min(index + 1, matches.length - 1));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive(Math.max(index - 1, 0));
          } else if (event.key === "Enter" && matches[index]) {
            event.preventDefault();
            choose(matches[index].name);
          }
        }}
        placeholder="Start typing a brand"
        className={inputClass}
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && matches[index] ? `${listId}-${index}` : undefined}
      />
      <span className="mt-1.5 block text-xs text-ink-soft">
        An approved brand sets the medicines list to Yes. An excluded or unknown brand sets it to No.
      </span>
      {showList ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-line bg-paper-raised shadow-sm"
        >
          {matches.length === 0 ? (
            <li className="px-3 py-2 text-sm text-ink-soft">No listed brand. This sets the medicines list to No.</li>
          ) : (
            matches.map((item, itemIndex) => (
              <li key={item.name} id={`${listId}-${itemIndex}`} role="option" aria-selected={itemIndex === index}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(item.name)}
                  className={[
                    "block w-full px-3 py-2 text-left",
                    itemIndex === index ? "bg-sidebar" : "bg-paper-raised",
                  ].join(" ")}
                >
                  <span className="block text-sm text-ink">{item.name}</span>
                  <span
                    className={[
                      "mt-0.5 block text-xs",
                      item.status === "excluded" ? "text-[var(--alert)]" : "text-ink-soft",
                    ].join(" ")}
                  >
                    {catalogLabel(item.product)}
                    {item.status === "excluded" ? " · Excluded from program" : ""}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}

function MedicinesList() {
  return (
    <details className="group mt-1.5">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm text-moss underline decoration-moss/40 underline-offset-4 hover:decoration-moss [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="text-[10px] leading-none transition-transform group-open:rotate-90">
          ▸
        </span>
        Show the medicines list
      </summary>
      <div className="mt-2 min-w-0">
        <div className="overflow-x-auto rounded-md border border-line">
          <table className="w-full border-collapse text-left text-sm text-ink">
            <thead>
              <tr className="bg-sidebar">
                <th scope="col" className="border border-line px-2.5 py-2 font-medium">
                  Category / Estrogen dose
                </th>
                <th scope="col" className="border border-line px-2.5 py-2 font-medium">
                  Progestogen
                </th>
                <th scope="col" className="border border-line px-2.5 py-2 font-medium">
                  Brands
                </th>
              </tr>
            </thead>
            <tbody>
              {medicineSections.flatMap((section) => {
                const rows = [
                  <tr key={section.title}>
                    <th
                      colSpan={3}
                      scope="colgroup"
                      className="border border-line bg-[var(--step-bg)] px-2.5 py-2 text-left text-[11px] font-medium tracking-[0.12em] text-moss uppercase"
                    >
                      {section.title}
                    </th>
                  </tr>,
                ];
                for (const group of section.groups) {
                  if (group.title) {
                    rows.push(
                      <tr key={`${section.title}-${group.title}`}>
                        <th
                          colSpan={3}
                          scope="colgroup"
                          className="border border-line bg-sidebar px-2.5 py-1.5 text-left text-xs font-medium text-ink"
                        >
                          {group.title}
                        </th>
                      </tr>,
                    );
                  }
                  group.rows.forEach((row, index) => {
                    rows.push(
                      <tr key={row.brands} className={index % 2 === 1 ? "bg-sidebar" : "bg-paper-raised"}>
                        <td className="border border-line px-2.5 py-2 align-top">{row.estrogen}</td>
                        <td className="border border-line px-2.5 py-2 align-top">{row.progestogen}</td>
                        <td className="border border-line px-2.5 py-2 align-top">
                          {row.brands}
                          {row.note ? <p className="mt-1 text-xs leading-5 text-ink-soft">{row.note}</p> : null}
                        </td>
                      </tr>,
                    );
                  });
                }
                return rows;
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 rounded-md border border-[var(--alert)]/30 bg-[var(--alert-bg)] px-3 py-2.5">
          <p className="text-[11px] font-medium tracking-[0.12em] text-[var(--alert)] uppercase">
            Excluded from program
          </p>
          <ul className="mt-1.5 space-y-1 text-xs leading-5 text-ink">
            <li>
              Combined pills with a high estrogen dose (50 mcg ethinylestradiol or equivalent), including Microgynon 50.
              These are not routinely recommended for contraception because of an unacceptable risk of VTE.
            </li>
            <li>Etonogestrel subdermal implant: Implanon NXT.</li>
            <li>Levonorgestrel intrauterine devices: Kyleena and Mirena.</li>
          </ul>
        </div>
      </div>
    </details>
  );
}

function bloodPressureText(systolic: number | null, diastolic: number | null) {
  if (systolic == null && diastolic == null) return "Not answered";
  const sys = systolic == null ? "—" : String(systolic);
  const dia = diastolic == null ? "—" : String(diastolic);
  return `${sys}/${dia} mmHg`;
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

function ukmecRecord(value: YesNo, checks: string[]) {
  const answer = yesNoText(value);
  if (checks.length === 0) return answer;
  return `${answer}. ${checks.join("; ")}`;
}

function formatWhen(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(year, month - 1, day).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function continuityText(form: FormState) {
  if (form.product === "depot") {
    if (form.continuity === "depo-due") return "Not late";
    if (form.continuity === "depo-late") return "14 weeks or more since the last injection";
    return "Not answered";
  }
  if (form.continuity === "continuous") return "Continuous, or a break of less than 2 weeks";
  if (form.continuity === "short-break") return "Break of 2–4 weeks in the preceding 30 days";
  if (form.continuity === "long-break") return "Break of more than 4 weeks in the preceding 30 days";
  return "Not answered";
}

function smokingText(value: Smoking) {
  if (value === "no") return "Does not smoke or vape";
  if (value === "smoking") return "Smoking";
  if (value === "vaping") return "Nicotine vaping";
  if (value === "both") return "Smoking and nicotine vaping";
  return "Not answered";
}

function consultationRows(form: FormState, outcome: Outcome): string[][] {
  const bmi =
    outcome.bmi != null ? `${outcome.bmi.toFixed(1)} kg/m²` : (outcome.heightHint ?? "Not calculated");
  return [
    ["Age", form.age.trim() ? `${form.age.trim()} years` : "Not answered"],
    ["Patient consents", yesNoText(form.consent)],
    ["Patient physically present", yesNoText(form.present)],
    ["Product category", productLabel(form.product)],
    ["Product name", shown(form.productName)],
    ["On the approved medicines list", yesNoText(form.onList)],
    ["Initiated by a GP or authorised prescriber", yesNoText(form.initiated)],
    ["Reviewed within the last 2 years", yesNoText(form.reviewed)],
    ["Last GP review", form.lastReview ? formatWhen(form.lastReview) : "Not answered"],
    ["Stabilised on this contraceptive", yesNoText(form.stabilised)],
    ["Months of use", form.monthsUsed.trim() ? `${form.monthsUsed.trim()} months` : "Not answered"],
    ["Continuous use", continuityText(form)],
    ["Current medications", shown(form.medications)],
    ["Allergies or adverse effects", shown(form.allergies)],
    ["Changes in bleeding", shown(form.bleedingChanges)],
    ["Changes in health", shown(form.healthChanges)],
    ["Smoking or vaping", smokingText(form.smoking)],
    ["Blood pressure", bloodPressureText(form.systolicBP, form.diastolicBP)],
    ["Weight", form.weightKg.trim() ? `${form.weightKg.trim()} kg` : "Not answered"],
    ["Height", form.heightCm.trim() ? `${form.heightCm.trim()} cm` : "Not answered"],
    ["BMI", bmi],
    ["UKMEC 4", ukmecRecord(form.ukmec4, form.ukmec4Checks)],
    ["UKMEC 3", ukmecRecord(form.ukmec3, form.ukmec3Checks)],
    ["Unexplained bleeding or related symptoms", yesNoText(form.unexplainedBleeding)],
    ["Unassessed PCOS signs", yesNoText(form.pcos)],
    ["Potentially pregnant", yesNoText(form.pregnant)],
    ["STI screening indicated", yesNoText(form.sti)],
    ["Cervical screening indicated", yesNoText(form.cst)],
    ["Reproductive coercion, abuse, or violence", yesNoText(form.coercion)],
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
    title: "Clinical Handover Report: Hormonal Contraception Resupply",
    subject: "Pharmacist consultation record",
  });

  doc.setFillColor(44, 92, 74);
  doc.rect(0, 0, pageWidth, 30, "F");
  doc.setTextColor(255, 253, 248);
  doc.setFont("times", "bold");
  doc.setFontSize(15);
  doc.text("Clinical Handover Report: Hormonal Contraception", 16, 13);
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
    columnStyles: { 0: { cellWidth: 78, fontStyle: "bold" } },
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

function UkmecReferenceCards({
  criteria,
}: {
  criteria: NonNullable<ReturnType<typeof listsFor>>;
}) {
  const combined = criteria.group === "Combined hormonal contraception";
  return (
    <div className="mt-3 space-y-3 print:hidden">
      <article className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-red-900">
        <h3 className="text-sm font-bold text-red-800">UKMEC 4</h3>
        <p className="mt-0.5 text-[11px] leading-4 text-red-800/80">{criteria.group}</p>
        <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs leading-5">
          {criteria.ukmec4.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {combined && criteria.note ? <p className="mt-2 text-xs leading-5">{criteria.note}</p> : null}
      </article>
      <article className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-amber-900">
        <h3 className="text-sm font-bold text-orange-800">UKMEC 3</h3>
        <p className="mt-0.5 text-[11px] leading-4 text-orange-800/80">{criteria.group}</p>
        <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs leading-5">
          {criteria.ukmec3.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {!combined && criteria.note ? <p className="mt-2 text-xs leading-5">{criteria.note}</p> : null}
      </article>
    </div>
  );
}

function FlagCard({ flag }: { flag: Flag }) {
  const alert = flag.tone === "alert";
  return (
    <article
      className={[
        "rounded-lg border px-3.5 py-3",
        alert ? "border-[var(--alert)]/30 bg-[var(--alert-bg)]" : "border-[var(--summary)]/30 bg-[var(--summary-bg)]",
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

function stabilisationHint(age: number | null) {
  if (age != null && age >= 16 && age < 18) {
    return "Age 16–17: the same contraceptive for at least 12 months.";
  }
  if (age != null && age >= 18) {
    return "Age 18 or older: the same contraceptive for at least 6 months.";
  }
  return "Age 16–17 needs 12 months. Age 18 or older needs 6 months.";
}

export default function HcTriagePage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [reportNote, setReportNote] = useState<string | null>(null);
  const [ukmec4Open, setUkmec4Open] = useState(false);
  const [ukmec3Open, setUkmec3Open] = useState(false);
  const outcome = derive(form);
  const age = readNumber(form.age);
  const criteria = listsFor(form.product);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function setProduct(product: Product) {
    setForm((current) => ({
      ...current,
      product,
      continuity: continuityFor(product, current.continuity),
      ...ukmecForProduct(current, product),
    }));
  }

  function setProductName(productName: string) {
    setForm((current) => applyProductName(current, productName));
  }

  function toggleUkmec(kind: "ukmec4" | "ukmec3", item: string) {
    const checksKey = kind === "ukmec4" ? "ukmec4Checks" : "ukmec3Checks";
    setForm((current) => {
      const selected = current[checksKey].includes(item)
        ? current[checksKey].filter((entry) => entry !== item)
        : [...current[checksKey], item];
      return {
        ...current,
        [checksKey]: selected,
        [kind]: selected.length > 0 ? "yes" : "no",
      };
    });
  }

  function setUkmec(kind: "ukmec4" | "ukmec3", value: YesNo) {
    const checksKey = kind === "ukmec4" ? "ukmec4Checks" : "ukmec3Checks";
    const selected = form[checksKey];
    if (value === "yes") {
      if (selected.length === 0) {
        if (kind === "ukmec4") setUkmec4Open(true);
        else setUkmec3Open(true);
      }
      set(kind, "yes");
      return;
    }
    setForm((current) => ({ ...current, [kind]: "no", [checksKey]: [] }));
  }

  function clearAnswers() {
    setForm(emptyForm);
    setUkmec4Open(false);
    setUkmec3Open(false);
  }

  async function printConsultationRecord() {
    const tab = window.open("about:blank", "_blank");
    if (!tab) {
      setReportNote("The browser blocked the report tab. Allow pop-ups for this site, then try again.");
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

  const alerts = outcome.flags.filter((flag) => flag.tone === "alert");
  const cautions = outcome.flags.filter((flag) => flag.tone === "caution");
  const recommendation = outcome.recommendation;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-10">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Clinical tool</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
          Hormonal contraception
        </h1>
        <a
          href="/hc-blank-questionnaire.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center rounded-md border border-moss/40 bg-transparent px-3.5 py-2 text-sm font-medium text-moss print:hidden hover:border-moss hover:bg-[var(--step-bg)]"
        >
          Print Blank Questionnaire
        </a>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          Work through resupply of a hormonal contraceptive. Referral flags update from the protocol as you answer. Nothing is saved.
        </p>
      </header>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.8fr)]">
        <form
          className="min-w-0 space-y-4"
          autoComplete="off"
          onSubmit={(event) => event.preventDefault()}
          aria-label="Hormonal contraception resupply triage"
        >
          <Section title="Eligibility">
            <NumberField
              label="Age"
              value={form.age}
              onChange={(value) => set("age", value)}
              suffix="years"
              hint="Resupply is for ages 16 to 50."
            />
            <RadioGroup
              label="Does the patient consent?"
              name="consent"
              value={form.consent}
              onChange={(value) => set("consent", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Is the patient physically present in the pharmacy?"
              name="present"
              value={form.present}
              onChange={(value) => set("present", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Which contraceptive is this?"
              name="product"
              value={form.product}
              onChange={setProduct}
              options={[
                { value: "cocp", label: "Combined oral contraceptive" },
                { value: "pop", label: "Progestogen-only pill" },
                { value: "ring", label: "Vaginal ring" },
                { value: "depot", label: "Depot injection" },
              ]}
            />
            <ProductNameField value={form.productName} onChange={setProductName} />
            <RadioGroup
              label="Is it on the approved medicines list?"
              name="on-list"
              value={form.onList}
              onChange={(value) => set("onList", value)}
              options={yesNoOptions()}
            >
              <MedicinesList />
            </RadioGroup>
            <RadioGroup
              label="Was it initiated by a GP or other authorised prescriber?"
              name="initiated"
              value={form.initiated}
              onChange={(value) => set("initiated", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Has a GP or authorised prescriber reviewed it within the last 2 years?"
              name="reviewed"
              value={form.reviewed}
              onChange={(value) => set("reviewed", value)}
              options={yesNoOptions()}
            />
            <label className="block">
              <FieldLabel>Last saw the GP</FieldLabel>
              <input
                type="date"
                value={form.lastReview}
                onChange={(event) => set("lastReview", event.target.value)}
                className={inputClass}
              />
            </label>
          </Section>

          <Section title="Stabilisation and continuous use">
            <RadioGroup
              label="Has the patient been stabilised on this contraceptive?"
              name="stabilised"
              value={form.stabilised}
              onChange={(value) => set("stabilised", value)}
              options={yesNoOptions()}
              hint={stabilisationHint(age)}
            />
            <NumberField
              label="How long have they used this contraceptive?"
              value={form.monthsUsed}
              onChange={(value) => set("monthsUsed", value)}
              suffix="months"
            />
            {form.product === "depot" ? (
              <RadioGroup
                label="Is the depot injection on time?"
                name="continuity"
                value={form.continuity}
                onChange={(value) => set("continuity", value)}
                options={[
                  { value: "depo-due", label: "Not late" },
                  { value: "depo-late", label: "14 weeks or more since the last injection" },
                ]}
              />
            ) : form.product ? (
              <RadioGroup
                label="Has use been continuous?"
                name="continuity"
                value={form.continuity}
                onChange={(value) => set("continuity", value)}
                hint="For a pill or vaginal ring, in the preceding 30 days."
                options={[
                  { value: "continuous", label: "Continuous, or a break under 2 weeks" },
                  { value: "short-break", label: "Break of 2–4 weeks" },
                  { value: "long-break", label: "Break of more than 4 weeks" },
                ]}
              />
            ) : (
              <p className="text-sm leading-6 text-ink-soft">
                Select the contraceptive before answering continuous use.
              </p>
            )}
          </Section>

          <Section title="Clinical review">
            <TextArea
              label="Current medications"
              value={form.medications}
              onChange={(value) => set("medications", value)}
            />
            <TextArea
              label="Allergies or adverse effects, including with this contraceptive"
              value={form.allergies}
              onChange={(value) => set("allergies", value)}
            />
            <TextArea
              label="Changes in bleeding pattern"
              value={form.bleedingChanges}
              onChange={(value) => set("bleedingChanges", value)}
            />
            <TextArea
              label="Changes in health"
              value={form.healthChanges}
              onChange={(value) => set("healthChanges", value)}
              placeholder="Angina, heart attack, stroke or TIA, breast cancer, liver disease, DVT or PE, migraine with aura, new headaches, recent major surgery"
            />
            <RadioGroup
              label="Smoking or vaping"
              name="smoking"
              value={form.smoking}
              onChange={(value) => set("smoking", value)}
              options={[
                { value: "no", label: "Neither" },
                { value: "smoking", label: "Smoking" },
                { value: "vaping", label: "Nicotine vaping" },
                { value: "both", label: "Both" },
              ]}
            />
            <fieldset>
              <legend className="text-sm font-medium leading-6 text-ink">Blood pressure</legend>
              <div className="mt-2 flex items-end gap-2">
                <label className="block min-w-0 flex-1">
                  <span className="text-xs text-ink-soft">Systolic</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    value={form.systolicBP ?? ""}
                    onChange={(event) => set("systolicBP", readNumber(event.target.value))}
                    placeholder="120"
                    className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-moss"
                    autoComplete="off"
                  />
                </label>
                <span className="mb-2 text-ink-soft" aria-hidden="true">
                  /
                </span>
                <label className="block min-w-0 flex-1">
                  <span className="text-xs text-ink-soft">Diastolic</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    value={form.diastolicBP ?? ""}
                    onChange={(event) => set("diastolicBP", readNumber(event.target.value))}
                    placeholder="80"
                    className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-moss"
                    autoComplete="off"
                  />
                </label>
                <span className="mb-2 text-xs text-ink-soft">mmHg</span>
              </div>
              <span className="mt-1.5 block text-xs text-ink-soft">
                Measure at least annually. A reading from the last 12 months is acceptable if health is unchanged.
              </span>
              {highCombinedBp(form.product, form.systolicBP, form.diastolicBP) ? (
                <p className="mt-1.5 text-xs leading-5 text-red-700">
                  UKMEC 4 for a combined pill or vaginal ring: systolic 160 mmHg or higher, or diastolic 100 mmHg or higher. Refer to the GP.
                </p>
              ) : null}
            </fieldset>
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
              hint={outcome.heightHint ?? "BMI is reviewed at least annually."}
            />
            <div>
              <div className="rounded-md border border-line bg-paper px-3 py-2.5">
                <p className="text-[11px] tracking-[0.12em] text-ink-soft uppercase">BMI</p>
                <p className="mt-1 text-sm text-ink">
                  {outcome.bmi != null ? `${outcome.bmi.toFixed(1)} kg/m²` : "— kg/m²"}
                </p>
              </div>
              {highCombinedBmi(form.product, outcome.bmi) ? (
                <p className="mt-1.5 text-xs leading-5 text-amber-600">
                  UKMEC 3 for a combined pill or vaginal ring: BMI over 35 kg/m². Refer to the GP.
                </p>
              ) : null}
            </div>
          </Section>

          <Section title="Exclusions">
            <RadioGroup
              label="Does a UKMEC 4 condition apply?"
              name="ukmec4"
              value={form.ukmec4}
              onChange={(value) => setUkmec("ukmec4", value)}
              options={yesNoOptions()}
              notice={
                form.ukmec4 === "yes" && form.ukmec4Checks.length === 0 ? ukmecReviewNotice : undefined
              }
            >
              <CriterionList
                label="Show UKMEC 4 conditions"
                group={criteria?.group}
                items={criteria?.ukmec4 ?? []}
                checked={form.ukmec4Checks}
                onToggle={(item) => toggleUkmec("ukmec4", item)}
                open={ukmec4Open}
                onOpenChange={setUkmec4Open}
              />
            </RadioGroup>
            <RadioGroup
              label="Does a UKMEC 3 condition apply?"
              name="ukmec3"
              value={form.ukmec3}
              onChange={(value) => setUkmec("ukmec3", value)}
              options={yesNoOptions()}
              notice={
                form.ukmec3 === "yes" && form.ukmec3Checks.length === 0 ? ukmecReviewNotice : undefined
              }
            >
              <CriterionList
                label="Show UKMEC 3 conditions"
                group={criteria?.group}
                items={criteria?.ukmec3 ?? []}
                note={criteria?.note}
                checked={form.ukmec3Checks}
                onToggle={(item) => toggleUkmec("ukmec3", item)}
                open={ukmec3Open}
                onOpenChange={setUkmec3Open}
              />
            </RadioGroup>
            <RadioGroup
              label="Unexplained or uninvestigated vaginal bleeding, severe or painful periods, irregular periods, amenorrhoea, or pain with intercourse?"
              name="bleeding"
              value={form.unexplainedBleeding}
              onChange={(value) => set("unexplainedBleeding", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Signs of PCOS that have not been assessed?"
              name="pcos"
              value={form.pcos}
              onChange={(value) => set("pcos", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Potentially pregnant?"
              name="pregnant"
              value={form.pregnant}
              onChange={(value) => set("pregnant", value)}
              options={yesNoOptions()}
            />
          </Section>

          <Section title="Treat and refer">
            <RadioGroup
              label="Is STI screening indicated?"
              name="sti"
              value={form.sti}
              onChange={(value) => set("sti", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Is a cervical screening test indicated?"
              name="cst"
              value={form.cst}
              onChange={(value) => set("cst", value)}
              options={yesNoOptions()}
            />
            <RadioGroup
              label="Possible reproductive coercion, sexual abuse, or sexual violence?"
              name="coercion"
              value={form.coercion}
              onChange={(value) => set("coercion", value)}
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
                <h3 className="text-[11px] font-medium tracking-[0.14em] text-ink-soft uppercase">
                  Outcome
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-ink">{recommendation.detail}</p>
              </article>
            ) : null}
            {recommendation.kind === "stop" ? (
              <article className="rounded-lg border border-[var(--alert)]/30 bg-[var(--alert-bg)] px-3.5 py-3">
                <h3 className="text-[11px] font-medium tracking-[0.14em] text-[var(--alert)] uppercase">
                  {recommendation.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-ink">{recommendation.detail}</p>
              </article>
            ) : null}
            {recommendation.kind === "supply" ? (
              <article className="rounded-lg border border-moss/20 bg-[var(--step-bg)] px-3.5 py-3">
                <h3 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                  {recommendation.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-ink">{recommendation.detail}</p>
              </article>
            ) : null}
          </div>
          {criteria ? <UkmecReferenceCards criteria={criteria} /> : null}
          {outcome.dirty ? (
            <button
              type="button"
              onClick={clearAnswers}
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
