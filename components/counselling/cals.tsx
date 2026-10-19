import type { ReactNode } from "react";
import { MaoiAdviceImages } from "@/components/counselling/maoi-advice";

type CalRow = {
  image?: string;
  name: string;
  detail: string[];
  notes: string[];
  exampleLead?: string[];
  examples: string[];
};

const img = (file: string) => `/counselling/cals/${file}`;

function LabelImage({ file, name }: { file: string; name: string }) {
  return (
    <img
      src={img(file)}
      alt={name}
      className="h-auto w-44 rounded border border-line bg-white"
    />
  );
}

function Points({ items }: { items: string[] }) {
  if (items.length === 0) return <>—</>;
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function CalTable({ rows }: { rows: CalRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[72rem] border-collapse text-left text-sm leading-6 text-ink">
        <thead className="bg-moss text-paper">
          <tr>
            {["Label", "Detail", "Clinical notes", "Examples"].map((heading) => (
              <th key={heading} className="px-3 py-2 font-medium">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.name} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              <td className="sticky left-0 z-10 min-w-52 border-t border-line bg-inherit px-3 py-3 align-top font-medium">
                <div className="space-y-2">
                  {row.image ? <LabelImage file={row.image} name={row.name} /> : null}
                  <p>{row.name}</p>
                </div>
              </td>
              <td className="min-w-64 border-t border-line px-3 py-3 align-top">
                <div className="space-y-2">
                  {row.detail.map((line) => (
                    <p key={line}>
                      <strong>{line}</strong>
                    </p>
                  ))}
                </div>
              </td>
              <td className="min-w-72 border-t border-line px-3 py-3 align-top">
                <Points items={row.notes} />
              </td>
              <td className="min-w-72 border-t border-line px-3 py-3 align-top">
                {row.exampleLead?.length ? (
                  <ul className="mb-2 list-disc space-y-1.5 pl-5">
                    {row.exampleLead.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <Points items={row.examples} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-8 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm"
    >
      <h2 className="border-b border-line px-4 py-4 font-serif text-2xl tracking-tight text-ink">{title}</h2>
      <div className="space-y-4 px-4 py-5">{children}</div>
    </section>
  );
}

const drowsiness: CalRow[] = [
  {
    image: "image1.jpeg",
    name: "Label 1",
    detail: [
      "This medicine may cause drowsiness and may increase the effects of alcohol.",
      "If affected, do not drive a motor vehicle or operate machinery.",
    ],
    notes: [
      "May impair psychomotor function and the ability to carry out tasks requiring alertness.",
      "Alcohol may cause additive CNS depression.",
    ],
    examples: ["Medicines listed in Appendix K of the Poisons Standard (SUSMP)."],
  },
  {
    image: "image2.jpeg",
    name: "Label 1a",
    detail: [
      "This preparation is to aid sleep. Drowsiness may continue the following day.",
      "If affected, do not drive or operate machinery. Avoid alcohol.",
    ],
    notes: [
      "Primary effect is to aid sleep, taken as a single bedtime dose.",
      "Alcohol may be absolutely contraindicated if there is a risk of significant CNS depression.",
    ],
    examples: [
      "Medicines listed in Appendix K of the Poisons Standard where the primary effect is to aid sleep and the medicine is taken as a single bedtime dose.",
    ],
  },
  {
    image: "image3.jpeg",
    name: "Label 12",
    detail: [
      "This medicine may affect mental alertness and/or coordination.",
      "If affected, do not drive a motor vehicle or operate machinery.",
    ],
    notes: [
      "When dizziness occurs as a neurological adverse effect.",
      "Symptoms of CNS disturbance can include CNS over-excitation, dizziness, light-headedness, fatigue, and impaired motor coordination.",
      "Symptoms frequently disappear with continued therapy. In certain cases the label is appropriate only on initiation of therapy or when the dose is increased.",
    ],
    examples: ["—"],
  },
  {
    image: "image4.jpeg",
    name: "Label 16",
    detail: [
      "This medicine may cause dizziness especially when you stand up quickly. Ask your doctor or pharmacist for advice.",
      "Verbally advise rising slowly (pausing for 10–30 seconds) from a lying or seated position, remaining well hydrated and avoiding excessive heat.",
    ],
    notes: [
      "When dizziness is caused by orthostatic hypotension.",
      "Orthostatic hypotension, especially in the elderly, can lead to falls and is a major cause of bone fracture.",
      "If orthostatic hypotension develops in a seated position, patients can place their feet on a footrest.",
    ],
    examples: ["Antihypertensive medicines (blood-pressure reduction, dizziness or light-headedness)."],
  },
  {
    image: "image5.jpeg",
    name: "Label 24",
    detail: ["Use of this medicine has the risks of overdose and dependence."],
    notes: [
      "Risk of harm from opioids increases when patients use opioids in high doses, for longer than 90 days, or with medicines or substances with sedative or CNS depressant effects (including alcohol and illegal drugs).",
      "Harm from opioids includes overdose, physical dependence and opioid use disorder.",
      "Provide the Opioid medicines Patient Information Handout to patients receiving opioid medicines. This may not be appropriate in some circumstances, such as when patients are using opioids for cancer or palliative care needs.",
      "Consider supplying take-home naloxone nasal spray or injection to patients receiving opioid medicines.",
    ],
    examples: [
      "Opioid medicines, including buprenorphine, codeine, dihydrocodeine, fentanyl, hydromorphone, methadone, morphine, oxycodone, tapentadol and tramadol.",
    ],
  },
];

const posingHarms: CalRow[] = [
  {
    image: "image6.jpeg",
    name: "Label 2",
    detail: ["DO NOT TAKE ALCOHOL while being treated with this medicine."],
    notes: [
      "Medicines that can interfere with the metabolism of alcohol, or where the consumption of alcohol is contraindicated.",
    ],
    examples: [
      "Metronidazole (and for at least 1 day after the last dose).",
      "Acitretin (during, and for 2 months after ceasing, therapy). Alcohol ingestion increases formation of the metabolite etretinate, which has a much longer half-life than acitretin, with a risk of teratogenicity.",
      "Disulfiram, levamisole, lomustine, nilutamide, procarbazine.",
    ],
  },
  {
    image: "image7.jpeg",
    name: "Label 11",
    detail: ["DO NOT TAKE POTASSIUM while being treated with this medicine unless advised by your doctor."],
    notes: [
      "Hyperkalaemia, particularly in high-risk patients (for example, renal impairment or potassium-restriction diets).",
      "This label specifically relates to therapeutic doses of prescribed potassium products, not dietary potassium or intake in multivitamin and mineral products. Consider dietary potassium in patients at high risk of hyperkalaemia.",
      "Some complementary medicines (for example glucosamine products) contain sufficient potassium to raise serum potassium in high-risk groups.",
    ],
    examples: [
      "Potassium-sparing diuretics, ACE inhibitors, ARBs, and trimethoprim can cause hyperkalaemia.",
    ],
  },
  {
    image: "image8.jpeg",
    name: "Label 8",
    detail: ["Avoid excessive skin exposure to sunlight and sunlamps while being treated with this medicine."],
    notes: [
      "Significant photosensitivity reactions, including photo-toxic and photo-allergic reactions.",
      "Counsel to use an SPF 30+ sunscreen and protective clothing (wide-brimmed hats, sunglasses and long-sleeved shirts).",
      "Some medicines (for example hydroxychloroquine) require both the skin and other parts of the body (for example the eyes) to be protected from excessive sunlight.",
      "Some cytotoxic and immunosuppressive medicines increase the incidence of certain skin cancers.",
    ],
    examples: [
      "Amiodarone, danazol, dantrolene, flutamide, griseofulvin, fenofibrate, isotretinoin, oral tretinoin.",
      "Some antimalarials: hydroxychloroquine, sulfadoxine with pyrimethamine.",
      "Trimethoprim with sulfamethoxazole. Some fluoroquinolones: oral ciprofloxacin, norfloxacin. Some tetracyclines: demeclocycline, doxycycline. Clofazimine.",
      "Some cytotoxics: cyclophosphamide, dacarbazine, fluorouracil, mercaptopurine, mycophenolic acid, methoxsalen, methotrexate, thioguanine.",
      "Some immunosuppressants: acitretin, cyclosporin, everolimus, sirolimus, tacrolimus, imiquimod.",
      "Chlorpromazine, fluphenazine, olanzapine, thioridazine, trifluoperazine.",
    ],
  },
  {
    image: "image9.jpeg",
    name: "Label 9",
    detail: ["DO NOT STOP TAKING THIS MEDICINE ABRUPTLY unless otherwise advised by your doctor."],
    notes: [
      "Abrupt cessation of prolonged therapy can cause serious consequences, including adverse effects or more frequent and severe episodes of the condition.",
      "Encourage planning of medicine quantities for holidays or the perioperative setting so treatment is not stopped inadvertently.",
    ],
    examples: [
      "Beta-blockers: can worsen angina or precipitate rebound hypertension, myocardial infarction or ventricular arrhythmias.",
      "Long-term oral corticosteroids (for example prednisolone more than 10 mg daily for more than 3 weeks): adrenal suppression may occur, and abrupt cessation may precipitate acute adrenal insufficiency.",
      "Immunosuppressants: increased risk of transplant rejection.",
      "Benzodiazepines: withdrawal symptoms including anxiety, insomnia, irritability, nightmares, sweating, hallucinations, hypertension and tachycardia.",
      "Anti-epileptic medicines: increased frequency and severity of seizures.",
      "Antiplatelet medicines, particularly in high-risk people and those on dual antiplatelet therapy: may increase the risk of myocardial infarction, or morbidity from a rebound increase in platelet aggregation.",
    ],
  },
  {
    image: "image10.jpeg",
    name: "Label 10a",
    detail: ["Do not take more than one aspirin tablet or capsule each day while being treated with this medicine."],
    notes: [
      "High doses of aspirin can stimulate insulin secretion, may cause hypoglycaemia, and can influence the control of diabetes. Antiplatelet doses under 300 mg/day are unlikely to have this effect.",
      "Aspirin increases the risk of gastrointestinal adverse effects, including bleeding. In some people, the cardiovascular benefit of low-dose aspirin may be considered to outweigh this risk.",
    ],
    examples: [
      "All antidiabetic drugs and insulins.",
      "NSAIDs, including COX-2 inhibitors.",
      "Certain antiplatelet medicines (for example clopidogrel, prasugrel) may be co-prescribed with low-dose aspirin.",
    ],
  },
  {
    image: "image11.jpeg",
    name: "Label 10b",
    detail: [
      "DO NOT TAKE ASPIRIN OR ANTI-INFLAMMATORY MEDICINES while being treated with this medicine unless advised by your doctor.",
    ],
    notes: [
      "Aspirin at any dose that interferes with platelet aggregation is not recommended for a patient receiving an oral anticoagulant unless low-dose aspirin is intentionally prescribed.",
    ],
    examples: [
      "Oral anticoagulants (for example warfarin, apixaban, rivaroxaban, dabigatran).",
      "Medicines that increase bleeding risk (for example ibrutinib).",
    ],
  },
];

const ineffective: CalRow[] = [
  {
    image: "image12.jpeg",
    name: "Label 4a",
    detail: [
      "Do not take dairy products, antacids, or magnesium, calcium, iron or aluminium supplements within two hours of each dose of this medicine.",
    ],
    notes: [
      "Some medicines form poorly soluble complexes with metal ions, reducing bioavailability. Antacids can also adversely affect dissolution.",
      "For minocycline, doxycycline, gatifloxacin, moxifloxacin, ferrous salts and thyroxine, delete the words “dairy products” from the label. Calcium in dairy products is insufficient to significantly affect absorption.",
    ],
    examples: [
      "Demeclocycline, norfloxacin, ciprofloxacin, penicillamine, strontium ranelate, nilotinib, entacapone, sotalol.",
      "Bisphosphonates: clodronate (1 hour before or 2 hours after), etidronate, tiludronate.",
    ],
  },
  {
    image: "image13.jpeg",
    name: "Label 4b",
    detail: [
      "Ask your doctor or pharmacist before taking medicines for heartburn, reflux or indigestion (for example a PPI, H2RA or antacid).",
    ],
    notes: [
      "Absorption is markedly reduced by increased gastric pH, reducing bioavailability and potentially therapeutic efficacy.",
    ],
    examples: ["Medicines that need an acidic stomach for absorption, such as rilpivirine, ketoconazole, dasatinib and proguanil."],
  },
  {
    image: "image14.jpeg",
    name: "Label 3a",
    detail: ["Take on an empty stomach at least half an hour before meals and at bedtime."],
    notes: [
      "For medicines administered four times a day where food causes a significant change in bioavailability.",
      "The APF considers at least half an hour before food, or 2 hours after food, to be an empty stomach for drug absorption.",
      "Advise patients that they should still take their dose if they are skipping a meal or not eating.",
    ],
    examples: ["Phenoxymethylpenicillin, dicloxacillin, fosamprenavir liquid, bethanechol, penicillamine."],
  },
  {
    image: "image15.jpeg",
    name: "Label 3b",
    detail: ["Take on an empty stomach at least half an hour before food or two hours after food."],
    notes: ["For medicines administered less than four times a day where food causes a significant change in bioavailability."],
    examples: [
      "Peppermint oil, sucralfate, captopril (dose less than 50 mg).",
      "Phenoxymethylpenicillin, ampicillin, flucloxacillin, ciprofloxacin, norfloxacin, demeclocycline, roxithromycin, metronidazole suspension.",
      "Isoniazid, rifampicin, didanosine, efavirenz, entecavir, indinavir, lomustine, melphalan, mercaptopurine.",
      "Oral mesalazine, tacrolimus, zafirlukast, bromazepam, calcium folinate, clodronate, deferasirox, erlotinib, lapatinib, sorafenib, gemfibrozil, thyroxine.",
    ],
  },
];

const interactions: CalRow[] = [
  {
    image: "image16.jpeg",
    name: "Label 5",
    detail: [
      "Ask your doctor or pharmacist before using any other medicines, including over-the-counter medicines or health products.",
    ],
    notes: [
      "Interactions with medicines and health products, commonly enzyme inhibition or induction, can lead to therapeutic failure or adverse effects.",
      "Particularly relevant for medicines with a narrow therapeutic index, where an interaction is likely to be clinically significant.",
      "Some complementary medicines can interact with other medicines.",
    ],
    examples: [
      "Concurrent use of an ACE inhibitor or ARB, an NSAID and a diuretic (the triple whammy) can result in acute kidney injury.",
      "Acitretin, aminophylline, amiodarone, aprepitant, atazanavir, atomoxetine, bosentan, bromocriptine, bupropion, calcitriol, carbamazepine, cholecalciferol, cimetidine, cinacalcet, citalopram, clarithromycin, colchicine, cyclosporin.",
      "Danazol, darunavir, delavirdine, desmopressin, digoxin, dihydroergotamine, duloxetine, disulfiram, entacapone, eplerenone, erlotinib, erythromycin, escitalopram, everolimus, ezetimibe.",
      "Fluconazole, fluoxetine, fluvoxamine, fosamprenavir, galantamine, gefitinib, indinavir, itraconazole, ketoconazole, lanthanum, lapatinib, lithium carbonate, lopinavir/ritonavir.",
      "Maraviroc, metronidazole, nevirapine, nelfinavir, nilotinib, oxcarbazepine, paricalcitol, paroxetine, perhexiline, phenelzine, phenobarbitone, phenytoin, posaconazole, primidone, procarbazine.",
      "Rifabutin, rifampicin, ritonavir, saquinavir, selegiline, sertraline, sibutramine, sildenafil, sirolimus, sitaxentan, sorafenib, sucralfate, sunitinib, tacrolimus, tadalafil, theophylline, tipranavir, vardenafil, venlafaxine, voriconazole, warfarin, zonisamide.",
    ],
  },
  {
    image: "image17.png",
    name: "Label 18",
    detail: ["CERTAIN FOODS AND FRUIT JUICES SHOULD BE AVOIDED while being treated with this medicine."],
    notes: [
      "This replaces the previous label I (certain foods should be avoided) and the previous label 18 (avoid grapefruit or grapefruit juice).",
      "Grapefruit can inhibit CYP450 metabolising enzymes. The effect is unpredictable and can increase bioavailability.",
      "Constituents of some fruits and juices (grapefruit, Seville orange, pomelo, star fruit, bitter melon, pomegranate) can alter bioavailability by inhibiting CYP3A4.",
      "Some medicines (for example atenolol, fexofenadine) interact with fruit juices such as orange and apple through mechanisms other than CYP3A4 inhibition.",
      "Foods and juices rich in tyramine should be avoided with non-selective MAO inhibitors.",
    ],
    examples: [
      "Non-selective MAO inhibitors: phenelzine, tranylcypromine. Also linezolid and procarbazine.",
      "CYP substrates include amiodarone, atorvastatin, buspirone, carbamazepine, cyclosporin, dihydroergotamine, etoposide, everolimus, ivabradine, lapatinib, lercanidipine, nifedipine, nilotinib, saquinavir, verapamil, atenolol and fexofenadine.",
    ],
  },
];

const concurrent: CalRow[] = [
  {
    image: "image20.jpeg",
    name: "Labels 15a and 15b",
    detail: ["DO NOT USE BOTH.", "This medicine replaces: ______.", "Active ingredient: ______."],
    notes: [
      "Brand changes can confuse patients, especially those taking multiple medicines. Maintain brand consistency where possible.",
    ],
    examples: ["When one brand of a medicine is substituted for another."],
  },
  {
    image: "image22.jpeg",
    name: "Label 19a",
    detail: ["Contains PARACETAMOL. Consult your doctor or pharmacist if taking other paracetamol products."],
    notes: ["Inadvertent use of more than one paracetamol product can lead to accidental overdose and toxicity."],
    examples: ["All products that contain paracetamol."],
  },
  {
    image: "image23.jpeg",
    name: "Label 19b",
    detail: ["Consult your doctor or pharmacist before taking other medicines for pain or inflammation."],
    notes: [
      "Use of multiple systemic NSAIDs is associated with an increased risk of gastrointestinal bleeding, renal failure and adverse cardiovascular effects. Patients might inadvertently self-administer multiple NSAIDs.",
    ],
    examples: ["Oral and rectal formulations containing NSAIDs."],
  },
  {
    image: "image24.jpeg",
    name: "Label 20",
    detail: ["Take once weekly on the same day."],
    notes: [
      "Serious adverse outcomes, including death, have occurred following inadvertent excessive dosing.",
      "Encourage patients to take the medicine on the same day each week and record that day on the dispensing label.",
      "Calendar marking or a medicines reminder alarm is also encouraged.",
    ],
    examples: ["Methotrexate.", "Some bisphosphonates, such as certain forms of risedronate.", "Some antimalarials."],
  },
];

const allergy: CalRow[] = [
  {
    image: "image25.jpeg",
    name: "Label N",
    detail: ["CONTAINS PEANUT OIL."],
    notes: [
      "Risk of serious hypersensitivity reactions in people with peanut allergy.",
      "Check the product information and CMI, and/or contact the manufacturer, before dispensing for a patient who has an anaphylactic reaction to peanuts. They should have an emergency treatment plan, especially when starting new medicines.",
    ],
    examples: [
      "Products containing, or with a risk of contamination with, peanut (arachis) oil.",
      "Nandrolone injection, some ear drops, and some compounded medicines contain arachis oil.",
    ],
  },
];

const dosageForms: CalRow[] = [
  {
    image: "image26.jpeg",
    name: "Label 22",
    detail: ["Use only with the approved or recommended device."],
    notes: ["For powder capsules intended for inhalation rather than oral administration (for example tiotropium)."],
    examples: ["Inhalation capsules: Breezhaler, HandiHaler, Zonda."],
  },
  {
    image: "image27.jpeg",
    name: "Label 14",
    detail: ["RINSE MOUTH with water after each use."],
    notes: ["Inhaled steroids increase the risk of oral fungal infection. Rinsing the mouth after use reduces this."],
    examples: ["Inhaled steroids."],
  },
  {
    image: "image28.jpeg",
    name: "Label M",
    detail: ["ALLOW THIS MEDICINE TO DISSOLVE IN YOUR MOUTH."],
    notes: [
      "Absorption via the oral mucosa is rapid and avoids first-pass metabolism. Swallowing a medicine intended for sublingual or buccal absorption reduces its bioavailability.",
      "Follow the CMI: under the tongue, or between the gum and cheek. Avoid food or drink until the medicine has completely dissolved.",
    ],
    examples: ["Medicines intended to be absorbed through the oral mucosa, and orally disintegrating tablets."],
  },
  {
    image: "image29.jpeg",
    name: "Label J",
    detail: ["SHAKE WELL BEFORE EACH USE."],
    notes: ["Ensures uniformity of dose at the time of administration."],
    examples: ["Suspensions, including posaconazole."],
  },
  {
    image: "image30.jpeg",
    name: "Label A",
    detail: ["SWALLOW WHOLE. Do not crush or chew."],
    notes: [
      "Enteric-coated and modified-release products whose release depends on being swallowed whole, or where breaking or crushing may cause rapid release and possible toxicity.",
      "Some tablets can be broken into dosage sections, but the portions should not be chewed or crushed. Some capsules may be opened if the pellets are not broken.",
    ],
    exampleLead: [
      "Enteric-coated and modified-release products",
      "Medicines with a direct irritant effect on the oral mucosa or upper GI tract",
      "Solid oral preparations of medicines included in Medicines requiring special handling – Category 1 and Medicines requiring special handling – Category 2.",
    ],
    examples: [
      "Acamprosate / Alendronate / Artemether with lumefantrine / Aspirin* / Azathioprine* / Balsalazide / Bisoprolol (not chewed) / Budesonide oral capsules / Bupropion / Carbamazepine* / Cefaclor* / Clodronate / Dasatinib / Desvenlafaxine / Dexchlorpheniramine* / Diclofenac* / Didanosine* / Diltiazem* / Dipyridamole* / Disopyramide / Duloxetine / Emtricitabine / Erythromycin / Esomeprazole* (can be dispersed in non-carbonated water) / Etidronate / Everolimus* / Felodipine / Fenofibrate / Ferrous sulfate* / Fludarabine* / Fluvoxamine* / Gliclazide* / Hydromorphone* / Ibandronate* / Idarubicin* / Indomethacin* / Isosorbide mononitrate* / Ketoprofen* / Ketorolac* / Lansoprazole* / Leflunomide / Lenalidomide / Meloxicam* / Mesalazine* / Metformin* / Methylphenidate* / Metoprolol* / Mirtazapine (not chewed) / Morphine and salt* / Mycophenolate / Naproxen* / Nifedipine* / Omeprazole* / Oseltamivir* / Oxprenolol / Oxycodone* / Paliperidone / Pancreatin* / Pantoprazole / Paracetamol* / Peppermint oil / Phentermine / Potassium chloride* / Quinidine* / Rabeprazole / Risedronate / Rosiglitazone / Sevelamer / Sodium fusidate* / Sulfasalazine* / Tamsulosin / Theophylline* / Ticlopidine / Tiludronate / Topiramate* / Tramadol* / Varenicline / Verapamil* / Zolpidem*",
    ],
  },
  {
    image: "image31.jpeg",
    name: "Label K",
    detail: ["FOR EXTERNAL USE ONLY."],
    notes: [
      "Not recommended for creams, ointments, lotions or gels that are administered within a body cavity (nasal, rectal or vaginal routes).",
    ],
    examples: ["Medicines applied topically to the skin, such as creams, ointments and lotions. Imiquimod."],
  },
  {
    image: "image32.jpeg",
    name: "Label L",
    detail: ["CAUTION. NOT TO BE TAKEN."],
    notes: ["For medicines administered within a body cavity for a topical effect."],
    examples: ["Suppositories and pessaries."],
  },
];

const foodInstructions: CalRow[] = [
  {
    image: "image33.jpeg",
    name: "Label B",
    detail: ["TAKE WITH OR SOON AFTER FOOD."],
    notes: [
      "Gastrointestinal adverse effects can be reduced by administration with food.",
      "Used to minimise hypoglycaemia with some oral hypoglycaemic agents.",
      "Ketoconazole absorption is enhanced with food. Griseofulvin absorption is enhanced by the fat content of food.",
    ],
    examples: ["NSAIDs used in high doses or long term, metformin, azathioprine, ketoconazole, griseofulvin."],
  },
  {
    image: "image34.jpeg",
    name: "Label F",
    detail: ["TAKE IMMEDIATELY BEFORE FOOD."],
    notes: [
      "Some medicines are taken around the clock to reduce variation in serum levels, to increase absorption, or to decrease stomach upset.",
    ],
    examples: [
      "Amoxicillin with clavulanic acid: around-the-clock dosing, with food; shake the suspension well. Extended-release tablets should be taken with food.",
      "Budesonide oral capsules.",
    ],
  },
  {
    image: "image35.jpeg",
    name: "Label C",
    detail: ["TAKE AT LEAST HALF AN HOUR BEFORE FOOD."],
    notes: [
      "Some medicines, such as alendronate, are absorbed better on an empty stomach.",
      "The APF considers at least half an hour before food, or 2 hours after food, to be an empty stomach for drug absorption.",
      "Advise patients to still take the dose if they are skipping a meal or not eating.",
    ],
    examples: [
      "Ferrous gluconate and ferrous sulfate.",
      "Temozolomide (1 hour), tiludronate (2 hours), tropisetron (1 hour), sotalol (1–2 hours).",
    ],
  },
  {
    image: "image36.jpeg",
    name: "Label G",
    detail: ["TAKE IN THE MORNING. Drink plenty of water."],
    notes: [
      "Cyclophosphamide can cause severe haemorrhagic cystitis. Ample fluid intake (for example for 24 hours before, during and for 24 hours after therapy) and frequent voiding may reduce this.",
    ],
    examples: ["Cyclophosphamide."],
  },
];

const duration: CalRow[] = [
  {
    name: "Label D",
    detail: ["Take for [the number of] days as advised by your prescriber."],
    notes: [
      "Additional instruction. There is no auxiliary sticker.",
      "Completing a recommended course of an antibiotic or antibacterial can reduce relapse and the emergence of resistant strains. The same instruction can be used for other antimicrobials, such as antivirals and antifungals.",
      "Confirm the patient knows the prescribed duration. If it is not known and is not on the prescription, contact the prescriber.",
      "Stop when the prescribed duration is complete. Unused antibiotics can be returned to the pharmacy. Do not flush them, put them in general rubbish, keep them for later, or give them to someone else.",
      "Contact the prescriber if symptoms worsen, do not improve in the advised timeframe, or if adverse effects occur.",
      "If there is no history of allergy, tell the patient the symptoms of an allergic reaction and to stop the antibiotic if they occur. For anaphylaxis or angioedema, phone 000.",
    ],
    examples: ["Antibiotics and other antimicrobial courses."],
  },
  {
    image: "image37.jpeg",
    name: "Label E",
    detail: ["CONTINUE FOR 14 DAYS AFTER SYMPTOMS CEASE."],
    notes: [
      "Disappearance of a skin fungal infection to the naked eye does not mean the infection has been eradicated in the lower layers of the dermis.",
    ],
    examples: ["Certain topical antifungal preparations, including topical nystatin and topical azoles."],
  },
];

const storage: CalRow[] = [
  {
    image: "image38.png",
    name: "Label 13",
    detail: ["Ask your pharmacist about the storage conditions for this medicine."],
    notes: [
      "For medicines or dosage forms that deteriorate significantly when exposed to light, moisture or certain temperatures.",
      "Keep in the original packaging whenever possible. Removal, including packing into a DAA, can accelerate deterioration and may reduce efficacy. Removal for a DAA should be restricted to short periods unless stability in the device is known.",
    ],
    examples: ["—"],
  },
  {
    image: "image39.jpeg",
    name: "Label 6",
    detail: ["REFRIGERATE. Do not freeze."],
    notes: [
      "Store at 2°C to 8°C to minimise decomposition.",
      "For insulins, the vial or cartridge in current use does not need to be refrigerated.",
    ],
    examples: [
      "Reconstituted antibiotic suspensions.",
      "Examples include adalimumab, chlorambucil, darbepoetin, etanercept, exenatide, infliximab, insulin (except the vial in use), interferons, phenelzine, somatropin and teriparatide.",
    ],
  },
  {
    image: "image40.jpeg",
    name: "Label H",
    detail: ["STORE FROZEN."],
    notes: ["For medicines that must be kept below 0°C."],
    examples: ["Medicines requiring a temperature below 0°C."],
  },
  {
    image: "image41.jpeg",
    name: "Label 7a",
    detail: ["Discard contents after dd/mm/yy."],
    notes: ["Limited shelf life because of chemical decomposition or possible bacterial contamination."],
    examples: [
      "Reconstituted antibiotic suspensions, expiry dates of compounded medicines, captopril solution, cyclosporin oral solution, didanosine suspension.",
    ],
  },
  {
    image: "image42.jpeg",
    name: "Label 7b",
    detail: ["Discard [__] days after opening. Date opened dd/mm/yy."],
    notes: [
      "When a product must be discarded a set number of days after the packaging is opened.",
      "In-use shelf life examples: 28 days for an eye preparation, and 28 days for an in-use insulin vial or cartridge at room temperature.",
    ],
    examples: [
      "Insulins, chloramphenicol, exenatide, teriparatide, glyceryl trinitrate tablets, salbutamol foil wrapping, sirolimus solution.",
    ],
  },
];

const compounded: CalRow[] = [
  {
    image: "image43.jpeg",
    name: "Label 23",
    detail: ["This product has been compounded by the pharmacist."],
    notes: ["Informs the consumer that the product was compounded in a facility that is not licensed by the TGA."],
    examples: ["Medicines extemporaneously prepared by the pharmacist."],
  },
];

const specialHandling: CalRow[] = [
  {
    image: "image44.jpeg",
    name: "Label 21",
    detail: ["Special handling and disposal required. Ask your pharmacist."],
    notes: [
      "For hazardous medicines that may harm carers or healthcare personnel, including pharmacy staff, through unintended exposure.",
      "Medicines are in Category 1 or Category 2 if they are cytotoxic, are reported to pose a risk through inappropriate handling, or are TGA pregnancy category X or D.",
      "Label A is generally recommended in addition to label 21 for solid oral dosage forms on these lists.",
      "Oral hazardous medicines must not be repackaged, for example into a DAA, unless the benefits outweigh the risks of exposure for the people repackaging or administering them.",
      "A cytotoxic medicine must not be packed into the same DAA as non-cytotoxic medicines.",
      "Also recommended for transdermal patches (for example fentanyl, nicotine) where residual active ingredient may harm others. After removal, fold the patch with the adhesive side inwards, replace it in the original packaging, and dispose of it securely. A sharps container can also be used.",
    ],
    examples: ["Category 1 and Category 2 hazardous medicines, listed below."],
  },
];

export function CalsNotes() {
  return (
    <div className="space-y-8">
      <Section id="legislative" title="Legislative Obligations">
        <p>
          Cautionary advisory labels should be attached to the primary container of the dispensed medicine, or the
          dose administration aid, whenever possible.
        </p>
        <p>
          Legislation in some states and territories specifies that these warning statements must be applied to the
          label when medicines are dispensed in non-original packaging, such as dose administration aids, broken
          packs, and compounded products.
        </p>
        <p>
          <strong>Appendix K</strong> of the Poisons Standard includes medicines that must be labelled with a
          specifically worded sedation warning, as used in labels 1 and 1a.
        </p>
        <p>
          <strong>Appendix L</strong> of the Poisons Standard contains medicines that must be labelled with
          specifically worded warnings about teratogenicity in pregnancy. Examples are isotretinoin, leflunomide and
          thalidomide. These statements are generally on the product packaging. If the product is dispensed in
          non-original packaging, the required additional instructions should be printed on the dispensing label.
        </p>
        <p>
          <strong>Appendix F</strong> of the Poisons Standard contains medicines that must be labelled with
          specifically worded warnings. Examples are paracetamol, diclofenac, aspirin and loperamide. Appendix F also
          lists the warnings that must appear on the product labelling of medicines listed in Appendices F, K and L.
        </p>
      </Section>

      <Section id="drowsiness" title="Drowsiness & Sedation">
        <CalTable rows={drowsiness} />
        <div className="rounded-lg border border-line bg-[#f3ecdf] px-4 py-4 text-sm leading-6 text-ink">
          <h3 className="font-serif text-xl tracking-tight">Opioid medicines patient information handout</h3>
          <p className="mt-3">
            Opioid medicines include buprenorphine, codeine, dihydrocodeine, fentanyl, hydromorphone, methadone,
            morphine, oxycodone, tapentadol and tramadol. They are mainly used to help reduce severe pain, usually
            for the shortest time and at the lowest dose possible, unless used for cancer or palliative care needs.
          </p>
          <p className="mt-3">
            Using an opioid with alcohol, illegal drugs, or medicines that cause sleepiness increases the risk of
            opioid poisoning. Regular use for more than a few weeks can lead to dependence. Do not lower the dose or
            stop too quickly without advice. Do not share an opioid. Keep it secure and out of reach of children and
            pets, and return leftovers to a pharmacy.
          </p>
          <h3 className="mt-4 font-serif text-xl tracking-tight">Overdose first aid</h3>
          <p className="mt-3">
            Opioid overdose is a life-threatening emergency. Risk is higher with higher doses, more than one opioid,
            not following the directions, or use with alcohol, illegal drugs, or sedating medicines. Signs include
            confusion, sleepiness, vomiting, choking, snoring or gurgling sounds, slow, shallow, unusual or no
            breathing, inability to be woken, cold clammy pale skin, blue lips or fingertips, a limp body, and small
            or pinpoint pupils.
          </p>
          <p className="mt-3">
            <strong>If an overdose is suspected, phone 000 and give naloxone.</strong> Naloxone reverses the effects
            of opioids for a short time so the person can breathe while waiting for the ambulance.
          </p>
          <p className="mt-3">
            COPE — Overdose first aid: www.penington.org.au/cope-overdose-first-aid. Poisons Information Centre: 13
            11 26.
          </p>
          <a
            href="/docs/opioid-handout.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center rounded-md bg-moss px-3.5 py-2 text-sm font-medium text-paper-raised"
          >
            View Full Opioid Medicines Patient Information Handout (PDF)
          </a>
        </div>
      </Section>

      <Section id="posing-harms" title="Posing Harms">
        <CalTable rows={posingHarms} />
      </Section>

      <Section id="ineffective" title="Ineffective Risk">
        <CalTable rows={ineffective} />
      </Section>

      <Section id="interactions" title="Interactions">
        <CalTable rows={interactions} />
        <div className="rounded-lg border border-line bg-[#f3ecdf] px-4 py-4 text-sm leading-6 text-ink">
          <h3 className="font-serif text-xl tracking-tight">Monoamine oxidase inhibitor advice card</h3>
          <p className="mt-3">
            MAOIs prevent the breakdown of tyramine, which can lead to very high blood pressure, severe headaches and
            possible bleeding (a hypertensive crisis) when tyramine is consumed. Unless otherwise advised, avoid the
            listed foods and medicines while being treated with the MAOI, and for at least 2 weeks after ceasing
            therapy. The card also names dextromethorphan, ephedrine, pseudoephedrine and phenylephrine.
          </p>
          <MaoiAdviceImages />
        </div>
      </Section>

      <Section id="concurrent" title="Risk of Concurrent Use & Overdose">
        <CalTable rows={concurrent} />
        <p className="text-sm leading-6 text-ink-soft">
          Label 15b is the companion brand-substitution sticker shown with label 15a.
        </p>
        <LabelImage file="image21.jpeg" name="Label 15b. This medicine replaces the named brand." />
      </Section>

      <Section id="allergy" title="Allergy Concerns">
        <CalTable rows={allergy} />
      </Section>

      <Section id="instructions" title="Instructions & Dosage Form Cautions">
        <CalTable rows={dosageForms} />
        <h3 className="font-serif text-xl tracking-tight text-ink">Food and fluid instructions</h3>
        <CalTable rows={foodInstructions} />
      </Section>

      <Section id="duration" title="Duration">
        <CalTable rows={duration} />
      </Section>

      <Section id="storage" title="Storage">
        <CalTable rows={storage} />
      </Section>

      <Section id="compounded" title="Compounded Products">
        <CalTable rows={compounded} />
      </Section>

      <Section id="special-handling" title="Special Handling Required">
        <CalTable rows={specialHandling} />
        <div className="space-y-3 text-sm leading-6 text-ink">
          <h3 className="font-serif text-xl tracking-tight">
            Category 1 — for all persons who handle the medicine
          </h3>
          <p>
            Includes cytotoxic and non-cytotoxic antineoplastic medicines and hazardous non-antineoplastic medicines.
          </p>
          <p>
            <strong>Antineoplastic agents:</strong> alkylating agents (bendamustine, busulfan, carmustine,
            chlorambucil, cyclophosphamide, dacarbazine, ifosfamide, lomustine, melphalan, mitomycin, temozolomide,
            thiotepa, treosulfan); antimetabolites (capecitabine, cladribine, clofarabine, cytarabine, decitabine with
            cedazuridine, fludarabine, fluorouracil, gemcitabine, mercaptopurine, methotrexate, pemetrexed,
            pentostatin, pralatrexate, tioguanine); antitumour antibiotics (bleomycin, dactinomycin, daunorubicin,
            doxorubicin, epirubicin, idarubicin, mitomycin, mitozantrone); hormonal therapies (anastrozole,
            bicalutamide, cyproterone, degarelix, enzalutamide, exemestane, fulvestrant, goserelin, letrozole,
            leuprorelin, medroxyprogesterone, megestrol, norethisterone, tamoxifen, toremifene, triptorelin); tyrosine
            kinase inhibitors (afatinib, alectinib, axitinib, cabozantinib, crizotinib, dabrafenib, dasatinib,
            erlotinib, gefitinib, imatinib, lapatinib, lenvatinib, lorlatinib, nilotinib, osimertinib, pazopanib,
            ponatinib, regorafenib, ripretinib, sorafenib, sunitinib, vandetanib, vemurafenib); monoclonal antibodies
            and immune checkpoint inhibitors (atezolizumab, avelumab, cemiplimab, durvalumab, ipilimumab, nivolumab,
            pembrolizumab, trastuzumab deruxtecan, trastuzumab emtansine); proteasome inhibitors (bortezomib,
            carfilzomib, ixazomib); other targeted therapies (alpelisib, binimetinib, cobimetinib, encorafenib,
            everolimus, infigratinib, larotrectinib, selinexor, selpercatinib, selumetinib, tucatinib).
          </p>
          <p>
            <strong>Immunosuppressants and immunomodulators:</strong> ciclosporin, tacrolimus, everolimus, sirolimus,
            azathioprine, mycophenolate, baricitinib, ruxolitinib, tofacitinib, fingolimod, leflunomide.
          </p>
          <p>
            <strong>Antivirals:</strong> abacavir, lamivudine, zidovudine, nevirapine, cidofovir, entecavir,
            ganciclovir, valganciclovir.
          </p>
          <p>
            <strong>Hormonal agents:</strong> estradiol, estriol, conjugated estrogens, estropipate, levonorgestrel,
            medroxyprogesterone, megestrol, norethisterone, progesterone, mesterolone, prasterone, bazedoxifene,
            raloxifene, tamoxifen, toremifene.
          </p>
          <p>
            <strong>Other Category 1 groups:</strong> apomorphine, rasagiline, carbamazepine, oxcarbazepine,
            phenytoin, pirfenidone.
          </p>
          <h3 className="pt-2 font-serif text-xl tracking-tight">
            Category 2 — pregnancy, breastfeeding, or minimising reproductive exposure
          </h3>
          <p>
            <strong>Anticancer agents:</strong> acalabrutinib, amivantamab, belzutifan, bevacizumab, brolucizumab,
            cetuximab, dostarlimab, durvalumab, faricimab, pertuzumab, ranibizumab, relatlimab, trastuzumab,
            tremelimumab.
          </p>
          <p>
            <strong>Antimicrobial, antiviral, antifungal and antiparasitic agents:</strong> albendazole, artemether
            with lumefantrine, chloroquine, doxycycline, fluconazole, framycetin, gentamicin, isavuconazole,
            maribavir, minocycline, neomycin, pentamidine isetionate, primaquine, quinine, ribavirin, voriconazole,
            efavirenz.
          </p>
          <p>
            <strong>Antihypertensive and cardiovascular agents:</strong> ambrisentan, candesartan, enalapril,
            eprosartan, fosinopril, irbesartan, lisinopril, losartan, olmesartan, perindopril, quinapril, ramipril,
            telmisartan, trandolapril, valsartan, atorvastatin, ivabradine, pravastatin, rosuvastatin, simvastatin,
            vericiguat.
          </p>
          <p>
            <strong>Endocrine and metabolic agents:</strong> cabergoline, carbimazole, dapagliflozin, dutasteride,
            empagliflozin, ertugliflozin, finasteride, luspatercept, mavacamten, mifepristone, relugolix, semaglutide,
            testosterone, testosterone undecanoate, tibolone, tolvaptan, upadacitinib.
          </p>
          <p>
            <strong>Neurological and psychiatric agents:</strong> armodafinil, cariprazine, clonazepam, gabapentin,
            lamotrigine, lithium, methylphenidate, modafinil, paroxetine, pregabalin, topiramate, valproate,
            vigabatrin, ziprasidone, zonisamide.
          </p>
          <p>
            <strong>Immunomodulatory and reproductive-health agents:</strong> avacopan, basiliximab, belumosudil,
            denosumab, interferon beta-1a, interferon beta-1b, peginterferon beta-1a, plerixafor, riociguat,
            risdiplam, sotatercept, sotorasib, upadacitinib, adapalene, carboprost, cetrorelix, choriogonadotropin,
            clascoterone, clomifene, follitropin, ganirelix, human chorionic gonadotropin, menopausal gonadotrophin,
            misoprostol, nafarelin, palovarotene, tazarotene, tetracosactide, tretinoin, trifarotene, ulipristal.
          </p>
          <p>
            <strong>Also listed:</strong> isotretinoin, acitretin, ethosuximide, fenfluramine, fosnetupitant,
            icatibant, macitentan, magnesium sulfate, methylene blue, miglustat, molnupiravir, nandrolone, netupitant,
            olipudase alfa, osilodrostat, oxytocin, pasireotide, patisiran, penicillamine, phenindione,
            podophyllotoxin, sodium iodide (131 I), sulthiame, tafamidis, terlipressin, tigecycline, vitamin A,
            vutrisiran, zilucoplan, concizumab, defibrotide, and the smallpox/monkeypox live vaccine.
          </p>
        </div>
      </Section>
    </div>
  );
}
