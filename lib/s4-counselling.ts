export type S4Block = { text: string } | { image: string };

export type S4Column =
  | "className"
  | "medicine"
  | "labels"
  | "indication"
  | "instruction"
  | "sideEffects"
  | "referral"
  | "lifestyle";

export type S4Row = {
  className: S4Block[];
  medicine: S4Block[];
  labels: S4Block[];
  indication: S4Block[];
  instruction: S4Block[];
  sideEffects: S4Block[];
  referral: S4Block[];
  lifestyle: S4Block[];
  spans?: Partial<Record<S4Column, number>>;
};

export type S4Note = string | { image: string };

export type S4Table = {
  heading?: string;
  notes: S4Note[];
  rows: S4Row[];
};

export type S4Section = {
  id: string;
  title: string;
  notes: S4Note[];
  tables: S4Table[];
};

export const s4Sections: S4Section[] = [
  {
    "id": "steroids",
    "title": "Steroids",
    "notes": [],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Steroids"
              }
            ],
            "medicine": [
              {
                "text": "Prednisolone"
              }
            ],
            "labels": [
              {
                "text": "9"
              }
            ],
            "indication": [
              {
                "text": "For pain (muscle pain, rheumatoid arthritis, or gout):"
              },
              {
                "text": "• This medicine will help reduce your inflammation and hence help with your pain."
              },
              {
                "text": "(Don’t use any OTC anti-inflammatory at the same time, but if you need to, take paracetamol)"
              },
              {
                "text": "For respiratory condition (asthma, COPD, croup):"
              },
              {
                "text": "• This medicine will help reduce the inflammation in the lungs, make it easier to breathe."
              },
              {
                "text": "• You can still use a reliever inhaler if you need to."
              },
              {
                "text": "Skin conditions (eczema, allergic reactions):"
              },
              {
                "text": "• This medicine will help reduce the inflammation and redness of your skin .."
              },
              {
                "text": "For autoimmune condition (e.g. Crohn’s disease):"
              },
              {
                "text": "• This medicine will help reduce your overactive immune system"
              }
            ],
            "instruction": [
              {
                "text": "OD DOSE:"
              },
              {
                "text": "• Take this medicine in the morning because if you take it at night, you tend not to sleep well."
              },
              {
                "text": "• Have it with some food because it can upset your stomach."
              },
              {
                "text": "(it is up to you if you wish to dose this tonight. If you do it tonight you may not sleep well, but at least we have started treat the condition. If you dose it tonight, then take the next dose in the afternoon at lunchtime, and the dose after that in the morning after breakfast.)"
              },
              {
                "text": "MORE THAN OD DOSE:"
              },
              {
                "text": "• Take this medicine …. With some food because it can upset your stomach."
              },
              {
                "text": "• Be mindful that this medicine can be a stimulant for some people, so the night-time dose keep you awake."
              }
            ],
            "sideEffects": [
              {
                "text": "Short-term course:"
              },
              {
                "text": "• This medicine has a long list of adverse effects."
              },
              {
                "text": "• Most of them are only likely to occur if you take this medicine long-term."
              },
              {
                "text": "• Since you are taking this short-term, the most likely adverse effect you will experience is STOMACH UPSET and SLEEP DISTURBANCE. (that why we recommend taking it in the morning with food)"
              },
              {
                "text": "Long-term course:"
              },
              {
                "text": "• Because this medicine mimics the stress hormone, it can damp down your immune system."
              },
              {
                "text": "• If you notice yourself becoming sick more easily, see your doctor."
              },
              {
                "text": "• It can also cause weight gain, increase blood pressure, and change how fat is distributed in your body."
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "rheumatology",
    "title": "Rheumatology Medicines",
    "notes": [
      "When stressed: hard to sleep, hypertension, change in mood (mania or depression), sugar level go up or down, easier to get sick (risk of infection, delay wound healing)"
    ],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Immunomodulators"
              }
            ],
            "medicine": [
              {
                "text": "Methotrexate"
              }
            ],
            "labels": [
              {
                "text": "5, 8, 10a, 20, 21, A"
              }
            ],
            "indication": [
              {
                "text": "• This medicine helps to damp down your overactive immune system."
              }
            ],
            "instruction": [
              {
                "text": "Take it only ONCE WEEKLY"
              },
              {
                "image": "rId4"
              }
            ],
            "sideEffects": [
              {
                "text": "(note: inhibition of folic acid reduce mucosal lining in mouth & stomach GI upset, N/V/D, mouth ulcer)"
              },
              {
                "image": "rId5"
              }
            ],
            "referral": [
              {
                "text": "• This medicine helps to damp down your overactive immune system. Because of this, if you notice yourself becoming sick more often, see your doctor."
              },
              {
                "image": "rId6"
              }
            ],
            "lifestyle": [
              {
                "image": "rId7"
              },
              {
                "text": "(Note: folic acid not to take the same day as methotrexate)"
              },
              {
                "image": "rId8"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Immunomodulators"
              }
            ],
            "medicine": [
              {
                "text": "Hydroxychloroquine"
              }
            ],
            "labels": [
              {
                "text": "8 (delete skin), 13, 21, A, B"
              }
            ],
            "indication": [
              {
                "text": "• This medicine helps to damp down your overactive immune system."
              }
            ],
            "instruction": [
              {
                "text": "Take it …"
              },
              {
                "image": "rId9"
              },
              {
                "image": "rId10"
              }
            ],
            "sideEffects": [
              {
                "image": "rId5"
              }
            ],
            "referral": [
              {
                "text": "• This medicine helps to damp down your overactive immune system. Because of this, if you notice yourself becoming sick more often, see your doctor."
              },
              {
                "text": "• This medicine can sometimes affect your vision. Get your eyes checked regularly."
              },
              {
                "text": "• If you notice any vision changes or problems, see your doctor. (e.g. blurred vision, light flashes, sensitivity to light, poor night vision)"
              }
            ],
            "lifestyle": [
              {
                "image": "rId8"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "gout",
    "title": "Gout Medicines",
    "notes": [],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "xanthine oxidase inhibitor"
              }
            ],
            "medicine": [
              {
                "text": "Allopurinol"
              }
            ],
            "labels": [
              {
                "text": "5, 12†, B"
              }
            ],
            "indication": [
              {
                "text": "This medicine is used to help prevent your gout attack."
              }
            ],
            "instruction": [
              {
                "text": "Take …"
              },
              {
                "image": "rId9"
              }
            ],
            "sideEffects": [
              {
                "text": "• Sometimes at the beginning, you may notice more gout attacks. This is a normal thing that may happen until your urate levels normalise."
              },
              {
                "image": "rId11"
              }
            ],
            "referral": [
              {
                "text": "• See your doctor if you develop swelling in the lips, mouth, or throat or becoming sick more easily."
              },
              {
                "image": "rId6"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Colchicine"
              }
            ],
            "medicine": [
              {
                "text": "Colchicine"
              }
            ],
            "labels": [
              {
                "text": "5, 13, 18, 21, A"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help treat your gout attack."
              }
            ],
            "instruction": [
              {
                "text": "Take TWO TABLETS (1mg) as soon as possible, then ONE TABLET (500mcg) 1 hr later DO NOT REPEAT THE COURSE WITHIN 3 DAYS"
              }
            ],
            "sideEffects": [
              {
                "text": "• If you get diarrhoea, STOP TAKING IT, as that is a sign it may be becoming toxic."
              }
            ],
            "referral": [
              {
                "image": "rId6"
              },
              {
                "image": "rId12"
              }
            ],
            "lifestyle": [
              {
                "image": "rId8"
              }
            ],
            "spans": {
              "className": 2,
              "medicine": 2,
              "labels": 2,
              "sideEffects": 2,
              "referral": 2,
              "lifestyle": 2
            }
          },
          {
            "className": [],
            "medicine": [],
            "labels": [],
            "indication": [
              {
                "text": "(indication for preventing the attack) This medicine will help prevent your gout attack"
              }
            ],
            "instruction": [
              {
                "text": "Take (usually 1 tablet OD-BID)"
              },
              {
                "image": "rId10"
              }
            ],
            "sideEffects": [],
            "referral": [],
            "lifestyle": []
          }
        ]
      }
    ]
  },
  {
    "id": "neurological",
    "title": "Neurological Medicines",
    "notes": [
      "Medicines for migraine: (NSAIDs, Triptans, Antiemetic: IF YOU ARE TAKEING ANY OF THESE MEDICINES REGULARY (MORE THAN 2 TIMES/WEEK) YOU MIGHT BE DEVELOPING MOH: MEDICINE-OVER-USE HEADACHE)"
    ],
    "tables": [
      {
        "heading": "Medicines for migraine",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Triptans (5HT1 agonists)"
              }
            ],
            "medicine": [
              {
                "text": "Eletriptan,"
              },
              {
                "text": "Naratriptan,"
              },
              {
                "text": "Rizatriptan,"
              },
              {
                "text": "Sumatriptan,"
              },
              {
                "text": "Zolmitriptan"
              }
            ],
            "labels": [
              {
                "text": "12, 13"
              }
            ],
            "indication": [
              {
                "text": "-"
              }
            ],
            "instruction": [
              {
                "text": "• Take (…) AS SOON AS THE MIGRAINE’S ONSET."
              },
              {
                "text": "• If the first dose works, but the migraine comes back, dose again AFTER TWO HOURS."
              },
              {
                "text": "• DON’T HAVE MORE THAN (MAX) in a day."
              }
            ],
            "sideEffects": [
              {
                "image": "rId11"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "(• Rest and sleep in a dark and quiet room while you have migraine."
              },
              {
                "text": "• Try to identify the triggers, e.g. stress, lack of sleep and bright light.)"
              }
            ]
          }
        ]
      },
      {
        "heading": "Medicines for epilepsy",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Antiepileptics"
              }
            ],
            "medicine": [
              {
                "text": "CBZ,"
              },
              {
                "text": "Gabapentin,"
              },
              {
                "text": "Lamotrigine,"
              },
              {
                "text": "Levetiracetam,"
              },
              {
                "text": "Phenytoin,"
              },
              {
                "text": "Pregabalin,"
              },
              {
                "text": "Topiramate,"
              },
              {
                "text": "Valproate"
              }
            ],
            "labels": [
              {
                "text": "9"
              }
            ],
            "indication": [
              {
                "text": "This medicine is to help you with your epilepsy."
              }
            ],
            "instruction": [
              {
                "text": "Take it …"
              },
              {
                "image": "rId13"
              }
            ],
            "sideEffects": [
              {
                "text": "• Be careful because it may cause dizziness and drowsiness."
              }
            ],
            "referral": [
              {
                "text": "• Other adverse effects to watch out for are MOVEMENT DISORDERS, RASH, or CHANGES in MOOD AND THOUGHTS."
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      },
      {
        "heading": "Medicines for Alzheimer’s disease",
        "notes": [
          "(common ADRs: Ataxia, Dizziness & Drowsiness, Rash, Suicidal behavior & ideation)"
        ],
        "rows": [
          {
            "className": [
              {
                "text": "Anticholinesterase"
              }
            ],
            "medicine": [
              {
                "text": "Donepezil,"
              },
              {
                "text": "Galantamine,"
              },
              {
                "text": "Rivastigmine"
              }
            ],
            "labels": [
              {
                "text": "12"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help with your memory."
              }
            ],
            "instruction": [
              {
                "text": "Take …."
              }
            ],
            "sideEffects": [
              {
                "text": "• At the beginning, nausea, vomiting, and diarrhoea (cholinergic effect) may occur but your body will get used to it after a few days."
              },
              {
                "text": "• Some people may get drowsy and dizzy (cholinergic effect) so know how the medicine affects you."
              },
              {
                "image": "rId11"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      },
      {
        "heading": "Medicines for Parkinson’s disease",
        "notes": [
          "Dopamine agonists: psychiatric adverse effects — hallucinations and confusion, impulse control disorder (gambling, hypersexuality, overspending and binge eating)"
        ],
        "rows": [
          {
            "className": [
              {
                "text": "Dopamine agonists"
              }
            ],
            "medicine": [
              {
                "text": "Pramipexole,"
              },
              {
                "text": "Ropinirole,"
              },
              {
                "text": "Cabergoline"
              }
            ],
            "labels": [
              {
                "text": "12, 16"
              }
            ],
            "indication": [
              {
                "text": "This medicine helps with your Parkinson’s disease"
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "text": "• Have this medicine with food because it can cause stomach upset. (N/V)"
              }
            ],
            "sideEffects": [
              {
                "image": "rId11"
              },
              {
                "image": "rId14"
              }
            ],
            "referral": [
              {
                "text": "• Speak to your doctor if you notice any mood or behaviour changes."
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Levodopa / Decarboxylase inhibitor"
              }
            ],
            "medicine": [
              {
                "text": "L-dopa (Levodopa / Carbidopa)"
              }
            ],
            "labels": [
              {
                "text": "12, 16"
              },
              {
                "image": "rId11"
              },
              {
                "image": "rId14"
              }
            ],
            "indication": [
              {
                "text": "This medicine helps with your Parkinson’s disease."
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "text": "• Have this medicine with food because it can cause stomach upset. (N/V)"
              }
            ],
            "sideEffects": [
              {
                "image": "rId11"
              },
              {
                "image": "rId14"
              }
            ],
            "referral": [
              {
                "text": "• Speak to your doctor if you notice any mood or behaviour changes."
              }
            ],
            "lifestyle": [
              {
                "text": "—"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "antipsychotics",
    "title": "Antipsychotics",
    "notes": [
      "Add specific counselling point for each: e.g. Olanzapine & tobacco smoking"
    ],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Antipsychotics"
              }
            ],
            "medicine": [
              {
                "text": "Aripiprazole,"
              },
              {
                "text": "Olanzapine,"
              },
              {
                "text": "Quetiapine,"
              },
              {
                "text": "Risperidone"
              }
            ],
            "labels": [
              {
                "text": "1"
              }
            ],
            "indication": [
              {
                "text": "This medicine belongs to a class of medicines called antipsychotics (It will stabilise your mood / It will provide clear thought)"
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              }
            ],
            "sideEffects": [
              {
                "text": "• It may make you drowsy or dizzy and increase your blood pressure and weight. Monitor this."
              },
              {
                "image": "rId15"
              }
            ],
            "referral": [
              {
                "text": "If you notice any movement disorders like shakiness, see your doctor. That can be an adverse effect of this medicine."
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bipolar",
    "title": "Bipolar Disorder Medicines",
    "notes": [],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Lithium"
              }
            ],
            "medicine": [
              {
                "text": "Lithium carbonate"
              }
            ],
            "labels": [
              {
                "text": "5, 13, 21, A, B"
              }
            ],
            "indication": [
              {
                "text": "This medicine is used to help stabilise your mood."
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "text": "• You will need regular blood test to ensure this is the correct dose for you."
              },
              {
                "image": "rId9"
              },
              {
                "image": "rId10"
              }
            ],
            "sideEffects": [
              {
                "text": "-"
              }
            ],
            "referral": [
              {
                "text": "• Signs this dose is too high are excessive thirst, frequent urinating, and nausea and vomiting. See your doctor if you experience these."
              },
              {
                "image": "rId6"
              }
            ],
            "lifestyle": [
              {
                "text": "• Maintain a regular salt intake and avoid products that contain sodium bicarbonate These could affect your lithium levels."
              },
              {
                "image": "rId8"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "antidepressants",
    "title": "Antidepressants",
    "notes": [],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "SSRIs"
              }
            ],
            "medicine": [
              {
                "text": "SSRIs"
              }
            ],
            "labels": [
              {
                "text": "5, 9, 12"
              }
            ],
            "indication": [
              {
                "text": "This medicine is usually used as an antidepressant, but can be prescribed for several other reasons ()."
              }
            ],
            "instruction": [
              {
                "text": "• Take it in the morning"
              },
              {
                "text": "• This medicine won’t work straight away. Usually, it will take a few weeks to notice an effect, and a month or two to get the full effect. Make sure you have a follow-up appointment with your doctor in a few weeks. (• If you notice your mood changes or worsen, see your doctor earlier.)"
              },
              {
                "image": "rId13"
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine may affect your sleep (insomnia)"
              },
              {
                "text": "(• this medicine may affect your sexual desire)"
              }
            ],
            "referral": [
              {
                "text": "(MAOI)"
              },
              {
                "image": "rId6"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          },
          {
            "className": [
              {
                "text": "SNRIs"
              }
            ],
            "medicine": [
              {
                "text": "SNRIs"
              }
            ],
            "labels": [
              {
                "text": "5, 9, 12"
              }
            ],
            "indication": [
              {
                "text": "This medicine is usually used as an antidepressant, but can be prescribed for several other reasons ()."
              }
            ],
            "instruction": [
              {
                "text": "• Take it in the morning"
              },
              {
                "text": "• This medicine won’t work straight away. Usually, it will take a few weeks to notice an effect, and a month or two to get the full effect. Make sure you have a follow-up appointment with your doctor in a few weeks. (• If you notice your mood changes or worsen, see your doctor earlier.)"
              },
              {
                "image": "rId13"
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine may affect your sleep (insomnia)"
              },
              {
                "text": "• It may increase your blood pressure"
              }
            ],
            "referral": [
              {
                "text": "(MAOI)"
              },
              {
                "image": "rId6"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          },
          {
            "className": [
              {
                "text": "TCA"
              }
            ],
            "medicine": [
              {
                "text": "TCA"
              }
            ],
            "labels": [
              {
                "text": "1, 5, 9, 16"
              }
            ],
            "indication": [
              {
                "text": "This medicine is usually used as an antidepressant, but can be prescribed for several other reasons ()."
              }
            ],
            "instruction": [
              {
                "text": "• usually take it at night"
              },
              {
                "text": "• This medicine won’t work straight away. Usually, it will take a few weeks to notice an effect, and a month or two to get the full effect. Make sure you have a follow-up appointment with your doctor in a few weeks. (• If you notice your mood changes or worsen, see your doctor earlier.)"
              },
              {
                "image": "rId13"
              }
            ],
            "sideEffects": [
              {
                "text": "• It may make you drowsy"
              },
              {
                "text": "• This medicine can also drop your blood pressure, making you feel dizzy. DON’T STAND UP TOO QUICKLY, as that is when you will most likely feel it."
              },
              {
                "image": "rId16"
              },
              {
                "image": "rId14"
              }
            ],
            "referral": [
              {
                "text": "• This medicine has a drying effect on the body Because of this, you may get dry eyes and mouth, and constipation. Let us know if you experience these because we can treat these without a prescription."
              },
              {
                "image": "rId6"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "anxiety-sleep",
    "title": "Anxiety & Sleep Disorder Medicines",
    "notes": [],
    "tables": [
      {
        "heading": "When benzodiazepines are prescribed for anxiety",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "BZPs"
              }
            ],
            "medicine": [
              {
                "text": "BZPs"
              }
            ],
            "labels": [
              {
                "text": "1"
              }
            ],
            "indication": [
              {
                "text": "This medicine is to help with STRESS"
              }
            ],
            "instruction": [
              {
                "text": "• Take it …When you are FEELING STRESSED/ANXIOUS."
              },
              {
                "text": "• ONLY USE IT WHEN NEEDED as you can DEVELOP A TOLERANCE and DEPENDENCY to this medicine."
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine can make you drowsy. (I recommend testing its effects at home, around bedtime, before taking it during the day.)"
              },
              {
                "text": "• Do not take alcohol at the same time as it compounds the sedative effect."
              },
              {
                "image": "rId15"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      },
      {
        "heading": "Additive sleeping tablets",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Additive sleeping tablets"
              }
            ],
            "medicine": [
              {
                "text": "BZPs,"
              },
              {
                "text": "Zolpidem,"
              },
              {
                "text": "Zopiclone"
              }
            ],
            "labels": [
              {
                "text": "1a"
              }
            ],
            "indication": [
              {
                "text": "This medicine is to help you sleep"
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "text": "• ONLY USE IT WHEN NEEDED as you can DEVELOP A TOLERANCE and DEPENDENCY to this medicine. If you can sleep don’t take it."
              }
            ],
            "sideEffects": [
              {
                "text": "• Some people may wake up feeling a bit drowsy. This should not last long, but be careful."
              },
              {
                "text": "• Do not take alcohol at the same time as it compounds the sedative effect."
              },
              {
                "image": "rId17"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      },
      {
        "heading": "Non-additive sleeping tablets",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Antihistamines"
              }
            ],
            "medicine": [
              {
                "text": "Doxylamine"
              }
            ],
            "labels": [
              {
                "text": "1"
              }
            ],
            "indication": [
              {
                "text": "This medicine is to help you sleep."
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "text": "• Only use when needed. It’s not additive BUT YOU CAN BUILD A TOLERANCE to it. That means THE MORE YOU USE, THE LESS OF AN EFFECT it will have. If you can sleep don’t take it."
              }
            ],
            "sideEffects": [
              {
                "text": "• Some people may wake up feeling a bit drowsy. This should not last long, but be careful."
              },
              {
                "text": "• Do not take alcohol at the same time as it compounds the sedative effect."
              },
              {
                "image": "rId15"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Melatonin"
              }
            ],
            "medicine": [
              {
                "text": "Melatonin"
              }
            ],
            "labels": [],
            "indication": [
              {
                "text": "• This medicine is to help you sleep."
              },
              {
                "text": "• It is what your body naturally produces when it is trying to sleep."
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "text": "• Usually, you take 1-2 hrs before bedtime."
              },
              {
                "text": "If you can have it with food. (Not because it upsets your stomach, but because it won’t breakdown as quickly.)"
              }
            ],
            "sideEffects": [
              {
                "text": "• Most people will wake up feeling good, but some may be drowsy. This should not last long. GET SOME SUNLIGHT if this happens (it will help melatonin breakdown quicker)"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "adhd",
    "title": "ADHD Medicines",
    "notes": [],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Psychostimulants"
              }
            ],
            "medicine": [
              {
                "text": "Dexamfetamine,"
              },
              {
                "text": "Lisdexamfetamine,"
              },
              {
                "text": "Methylphenidate"
              }
            ],
            "labels": [
              {
                "text": "5, 12"
              }
            ],
            "indication": [
              {
                "text": "This medicine is to help with your ADHD and your CONCENTRATION."
              }
            ],
            "instruction": [
              {
                "text": "Take it …"
              },
              {
                "text": "Take the medicine early (it can keep you awake and cause overstimulation)"
              }
            ],
            "sideEffects": [
              {
                "text": "This medicine has as stimulation effect. you may notice an increase in blood pressure and weight loss. (In may increase BP and HR)"
              },
              {
                "text": "(ADULT focus: can increase CVD risk, such as increased blood pressure and tachycardia)"
              },
              {
                "text": "(CHILDREN focus: decreased appetite, weight loss, behaviour changes)"
              }
            ],
            "referral": [
              {
                "text": "If you develop mood or behaviour changes, see your doctor. (it may worsen mood; CI in severe depression, anorexia nervosa, psychosis, agitation or suicidal tendencies)"
              },
              {
                "image": "rId6"
              },
              {
                "text": "(Risk of serotonin syndrome)"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "endocrine",
    "title": "Endocrine & Diabetic Medicines",
    "notes": [
      "Aspirin & other NSAIDs (except low-dose Aspirin) can cause the secretion of insulin Increase the risk of HYPOGLYCEMIA / NSAIDs also reduce renal function"
    ],
    "tables": [
      {
        "heading": "Diabetic medicines",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Biguanides"
              }
            ],
            "medicine": [
              {
                "text": "Metformin"
              }
            ],
            "labels": [
              {
                "text": "10a, B"
              }
            ],
            "indication": [
              {
                "text": "This is a medicine to help control your sugar levels."
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "text": "• Have it with food, as it can upset your stomach."
              },
              {
                "image": "rId9"
              }
            ],
            "sideEffects": [
              {
                "text": "• A bit of diarrhoea is normal with this medicine, especially at the beginning. Most people build a tolerance after one to two weeks."
              }
            ],
            "referral": [
              {
                "text": "• If the DIARRHOEA IS SEVERE or KEEP PERSISTING, speak to your doctor."
              }
            ],
            "lifestyle": [
              {
                "text": "• Using this medicine long-term can reduce your vitamin B12 levels, so make sure your doctor does test for this."
              },
              {
                "image": "rId7"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Sulfonylureas"
              }
            ],
            "medicine": [
              {
                "text": "Gliclazide,"
              },
              {
                "text": "Glipizide,"
              },
              {
                "text": "Glibenclamide,"
              },
              {
                "text": "Glimepiride"
              }
            ],
            "labels": [
              {
                "text": "10a, B"
              }
            ],
            "indication": [
              {
                "text": "This is a medicine to help control your sugar levels."
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "text": "Have it with food, so it doesn’t drop your blood sugar level too low."
              },
              {
                "image": "rId9"
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine can increase your risk of hypoglycaemia – low blood sugar levels"
              }
            ],
            "referral": [
              {
                "text": "• Signs your blood sugar levels are too low are WEAKNESS, SHAKING, SWEATING, DIZZINESS, INCREASED HUNGER, AND HEART RATE. Tell your doctor and check your blood sugar levels if you experience this."
              }
            ],
            "lifestyle": [
              {
                "image": "rId7"
              }
            ]
          },
          {
            "className": [
              {
                "text": "DPP4i (Gliptins)"
              }
            ],
            "medicine": [
              {
                "text": "Linagliptin,"
              },
              {
                "text": "Sitagliptin,"
              },
              {
                "text": "Saxagliptin,"
              },
              {
                "text": "Vildagliptin,"
              },
              {
                "text": "Alogliptin"
              }
            ],
            "labels": [
              {
                "text": "10a"
              }
            ],
            "indication": [
              {
                "text": "This is a medicine to help control your sugar levels."
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "text": "• With or without food"
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine can increase your risk of hypoglycaemia – low blood sugar levels"
              }
            ],
            "referral": [
              {
                "text": "• Signs your blood sugar levels are too low are WEAKNESS, SHAKING, SWEATING, DIZZINESS, INCREASED HUNGER, AND HEART RATE. Tell your doctor and check your blood sugar levels if you experience this."
              },
              {
                "text": "• If you experience STOMACH PAIN see your doctor, because it could be negatively affecting your PANCREAS."
              }
            ],
            "lifestyle": [
              {
                "image": "rId7"
              }
            ]
          },
          {
            "className": [
              {
                "text": "SGLT2i"
              }
            ],
            "medicine": [
              {
                "text": "Dapagliflozin,"
              },
              {
                "text": "Empagliflozin"
              }
            ],
            "labels": [
              {
                "text": "10a, 16, 21, A"
              }
            ],
            "indication": [
              {
                "text": "This is a medication to help (DM2 / CHF / Kidney)"
              }
            ],
            "instruction": [
              {
                "text": "• Take it OD"
              },
              {
                "text": "• With or without food?"
              },
              {
                "image": "rId9"
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine works by EXCREATING YOUR SUGAR THOUGH YOUR URINE because of this, you may urinate more frequently. (osmotic attraction of glucose polyurea, polydysia / also result in fat loss)"
              },
              {
                "image": "rId14"
              },
              {
                "text": "(from diuretic effect reduce pressure inside the kidney)"
              }
            ],
            "referral": [
              {
                "text": "• It also makes you MORE PRONE TO DEVELOPING GENITAL INFECTIONS. If this happens, see your doctor."
              }
            ],
            "lifestyle": [
              {
                "image": "rId7"
              },
              {
                "image": "rId8"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "thyroid",
    "title": "Thyroid Medicines",
    "notes": [],
    "tables": [
      {
        "heading": "Medicines for hypothyroidism",
        "notes": [
          "Note: Eltroxin = NOT EQUIVALENT TO THE OTHER BRANDS (not require refrigeration)",
          "Note: Levoxine = NOT required refrigeration / Eutroxsig, Oroxine = REQUIRE REFRIGERATION",
          { "image": "rId20" }
        ],
        "rows": [
          {
            "className": [
              {
                "text": "Thyroxine (T4)"
              }
            ],
            "medicine": [
              {
                "text": "Levothyroxine"
              }
            ],
            "labels": [
              {
                "text": "4a (delete dairy products), 6*, C"
              }
            ],
            "indication": [
              {
                "text": "This medicine helps increase your thyroid levels. (for hypothyroidism)"
              }
            ],
            "instruction": [
              {
                "text": "• Take this medicine first thing in the morning on an empty stomach 30-60 mins before breakfast."
              },
              {
                "text": "• Do not take CALCIUM or IRON supplements with in 2 hrs of taking this medicine, because it can interfere with absorption."
              },
              {
                "image": "rId18"
              },
              {
                "image": "rId19"
              }
            ],
            "sideEffects": [
              {
                "text": "• Since this medicine increases your thyroid levels, monitor for signs your thyroid levels have GONE TO HIGH these are generally INCREASED STIMULATION EFFECTS such as INCREASED HR, INSOMNIA and WEIGHT LOSS."
              }
            ],
            "referral": [
              {
                "text": "• If you notice any of these symptoms, speak to your doctor."
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      },
      {
        "heading": "Medicines for hyperthyroidism",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Anti-thyroids"
              }
            ],
            "medicine": [
              {
                "text": "Carbimazole"
              }
            ],
            "labels": [
              {
                "text": "5, 13, 21, A"
              }
            ],
            "indication": [
              {
                "text": "This medicine helps lower your thyroid levels. (for hyperthyroidism)"
              }
            ],
            "instruction": [
              {
                "text": "Take it…"
              },
              {
                "image": "rId10"
              }
            ],
            "sideEffects": [
              {
                "text": "• If you notice any of these symptoms, speak to your doctor. In the beginning, you may experience a mild rash of itchiness. This is usually nothing to e concerned about, but if IT SEVERE see your doctor."
              },
              {
                "text": "• If you notice any of these symptoms, speak to your doctor. Since this medicine reduces your thyroid levels, monitor for sings your thyroid levels have GONE TOO LOW. These are generally, DECREASED STIMULATION EFFECTS, such as COLDNESS, LETHARGY, MUSCLE ACHES, SLEEPINESS, TIREDNESS, and unusual WEIGHT GAIN."
              }
            ],
            "referral": [
              {
                "text": "• If you notice any of these symptoms, speak to your doctor."
              },
              {
                "image": "rId6"
              }
            ],
            "lifestyle": [
              {
                "image": "rId8"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Anti-thyroids"
              }
            ],
            "medicine": [
              {
                "text": "Propylthiouracil (PTU)"
              }
            ],
            "labels": [
              {
                "text": "21, A"
              }
            ],
            "indication": [
              {
                "text": "This medicine helps lower your thyroid levels. (for hyperthyroidism)"
              }
            ],
            "instruction": [
              {
                "text": "Take it…"
              },
              {
                "image": "rId10"
              }
            ],
            "sideEffects": [
              {
                "text": "• If you notice any of these symptoms, speak to your doctor. In the beginning, you may experience a mild rash of itchiness. This is usually nothing to e concerned about, but if IT SEVERE see your doctor."
              },
              {
                "text": "• If you notice any of these symptoms, speak to your doctor. Since this medicine reduces your thyroid levels, monitor for sings your thyroid levels have GONE TOO LOW. These are generally, DECREASED STIMULATION EFFECTS, such as COLDNESS, LETHARGY, MUSCLE ACHES, SLEEPINESS, TIREDNESS, and unusual WEIGHT GAIN."
              }
            ],
            "referral": [
              {
                "text": "• If you notice any of these symptoms, speak to your doctor."
              }
            ],
            "lifestyle": [
              {
                "image": "rId8"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bisphosphonates",
    "title": "Bisphosphonates",
    "notes": [],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Bisphosphonate"
              }
            ],
            "medicine": [
              {
                "text": "Alendronate,"
              },
              {
                "text": "Risedronate"
              }
            ],
            "labels": [
              {
                "text": "4a, 20*, A, C"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help strengthen your bone."
              }
            ],
            "instruction": [
              {
                "text": "• Take it …"
              },
              {
                "image": "rId4"
              },
              {
                "text": "• On empty stomach"
              },
              {
                "text": "• We recommend you take it first thing in the morning, 30 minutes before breakfast."
              },
              {
                "image": "rId18"
              },
              {
                "image": "rId10"
              },
              {
                "image": "rId19"
              }
            ],
            "sideEffects": [
              {
                "text": "• Do not lie down after you take this tablet because it can burn your throat."
              }
            ],
            "referral": [],
            "lifestyle": []
          }
        ]
      }
    ]
  },
  {
    "id": "gynaecological",
    "title": "Gynaecological & ECP Medicines",
    "notes": [],
    "tables": [
      {
        "heading": "Oral oestrogen and progesterone",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Oral Estrogen & Progesterone"
              }
            ],
            "medicine": [
              {
                "text": "Contraception,"
              },
              {
                "text": "HRT"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [],
            "instruction": [
              {
                "text": "Take ..(as directed).."
              },
              {
                "text": "Contraceptive pill:"
              },
              {
                "text": "… for immediate contraception, start with an active pill within the first five days of your period starting."
              },
              {
                "text": "If you start active pill after this, use additional contraceptive methods until you have taken active pills for 7 days."
              },
              {
                "text": "Miss a dose:"
              },
              {
                "text": "Check with us if you’ve missed a dose. If you have missed it by more than 24 hours. You must take 7 active pills in a row to get the contraceptive effective again."
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine may make you feel a little nauseous, especially at the beginning."
              },
              {
                "text": "• Since they are hormones, you may notice hormonal changes, such as changes to your period, spotting or breast tenderness."
              }
            ],
            "referral": [
              {
                "text": "• These medicines can also increase the amount your blood clots. If you notice any swelling or pain, particularly in your legs, or severe headaches or migraines, seek medical advice, as you may have developed a clot."
              }
            ],
            "lifestyle": []
          }
        ]
      },
      {
        "heading": "Emergency contraceptive pill",
        "notes": [
          "(How long ago did the intercourse occur? / You have come in within the recommended time frame, so this medicine is still effective, but try to come in earlier. / The efficacy decreases with time.)"
        ],
        "rows": [
          {
            "className": [
              {
                "text": "ECP"
              }
            ],
            "medicine": [
              {
                "text": "ECP"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [
              {
                "text": "-"
              }
            ],
            "instruction": [
              {
                "text": "Take 1 tablet as soon as possible."
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine can make some women nauseous. This is OK, But if it leads to vomiting or severe diarrhoea within 2 hrs of taking it, you will not absorb it, so come get another dose. This is rare though."
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "• This medicine is obviously not 100% effective, but you have come at a good time."
              },
              {
                "text": "Signs it has not worked are if your period is more than 7 days later or lighter. (So, remember “L’ and “L”, later and lighter)"
              },
              {
                "text": "• Sometime it can make your period early or heavier. This is usually not an issue, but if it is strange, see your doctor."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "genitourinary",
    "title": "Genitourinary & BPH/ED Medicines",
    "notes": [],
    "tables": [
      {
        "heading": "Medicines for urinary incontinence",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Anticholinergics"
              }
            ],
            "medicine": [
              {
                "text": "Oxybutynin"
              }
            ],
            "labels": [
              {
                "text": "12"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help control (dry) your urine."
              }
            ],
            "instruction": [
              {
                "text": "Take it … (as directed)"
              }
            ],
            "sideEffects": [
              {
                "text": "This medicine has a drying effect on the body, which is part of the reason it helps. Because of this, you may get dry eyes and mouth, and constipation."
              },
              {
                "image": "rId11"
              }
            ],
            "referral": [
              {
                "text": "Let us know if you experience these because we can treat these without a prescription."
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Anticholinergics"
              }
            ],
            "medicine": [
              {
                "text": "Solifenacin"
              }
            ],
            "labels": [
              {
                "text": "12†, 18, A"
              },
              {
                "image": "rId11"
              },
              {
                "image": "rId12"
              },
              {
                "image": "rId10"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help control (dry) your urine."
              }
            ],
            "instruction": [
              {
                "text": "Take it … (as directed)"
              },
              {
                "image": "rId10"
              }
            ],
            "sideEffects": [
              {
                "text": "This medicine has a drying effect on the body, which is part of the reason it helps. Because of this, you may get dry eyes and mouth, and constipation."
              },
              {
                "image": "rId11"
              }
            ],
            "referral": [
              {
                "text": "Let us know if you experience these because we can treat these without a prescription."
              }
            ],
            "lifestyle": [
              {
                "image": "rId12"
              }
            ]
          }
        ]
      },
      {
        "heading": "BPH",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Alpha-1-blockers"
              }
            ],
            "medicine": [
              {
                "text": "Tamsulosin,"
              },
              {
                "text": "Duodart (+5alpha-reductase-i)"
              }
            ],
            "labels": [
              {
                "text": "12, 16, A"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help your prostate."
              }
            ],
            "instruction": [
              {
                "text": "Take …"
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine will help your prostate. Because of this, you can sometimes develop impotence as an adverse effect."
              },
              {
                "text": "• This medicine can also drop your blood pressure, making you feel dizzy. DON’T STAND UP TOO QUICKLY, as that is when you will most likely feel it. Your body will get used to this after 1-2 weeks."
              },
              {
                "image": "rId14"
              },
              {
                "image": "rId11"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      },
      {
        "heading": "Erectile dysfunction",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "PDE5-inhibitors"
              }
            ],
            "medicine": [
              {
                "text": "Sildenafil,"
              },
              {
                "text": "Tadalafil,"
              },
              {
                "text": "Vardenafil,"
              },
              {
                "text": "Avanafil"
              }
            ],
            "labels": [
              {
                "text": "5, 16"
              }
            ],
            "indication": [
              {
                "text": "-"
              }
            ],
            "instruction": [
              {
                "text": "Take this medicine (one tablet) when you are in the mood. (Take 1 hr before you need it to work.)"
              }
            ],
            "sideEffects": [
              {
                "text": "• This medicine can drop your blood pressure and make you feel dizzy and lightheaded. DON’T STAND UP TOO QUICKLY, as that is when you will most likely feel it."
              },
              {
                "image": "rId14"
              }
            ],
            "referral": [
              {
                "text": "-"
              },
              {
                "image": "rId6"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "ppis",
    "title": "PPIs & H2RAs",
    "notes": [],
    "tables": [
      {
        "notes": [
          "Note: Pantoprazole = no interaction / Rabeprazole = interaction with digoxin / Lansoprazole = interaction with tacrolimus, no OTC / Esomeprazole & Omeprazole = interaction with CYP2C19, CYP3A4",
          "Note: PPIs & H2RA = there are stronger than antacids but can take longer to work / Antacids work by neutralizing excess acid so they work quicker but they are not that strong",
          "Note: Gaviscon (alginate in gaviscon) forms a protective barrier over stomach contents, which help prevent acid from coming up into the esophagus"
        ],
        "rows": [
          {
            "className": [
              {
                "text": "PPIs"
              }
            ],
            "medicine": [
              {
                "text": "Pantoprazole,"
              },
              {
                "text": "Rabeprazole,"
              },
              {
                "text": "Esomeprazole,"
              },
              {
                "text": "Omeprazole,"
              },
              {
                "text": "Lansoprazole"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [
              {
                "text": "• This medicine will help reduce your stomach acid production."
              }
            ],
            "instruction": [
              {
                "text": "• If you get bad reflux symptoms after you eat, take this medicine half an hour before that meal. (eTG: PPI: 30 mins to 1hr before meal)"
              },
              {
                "text": "• But if you get reflux symptom randomly, take it at the same time each day."
              }
            ],
            "sideEffects": [
              {
                "text": "Well-tolerated medicine."
              }
            ],
            "referral": [
              {
                "text": "• If you need to take this medicine ongoing, get blood tested because it can reduce the absorption of some of your vitamins. (mainly B12, iron)"
              },
              {
                "text": "Deprescribing/Step-down:"
              },
              {
                "text": "• You may not need to take this medicine ongoing once your symptoms are controlled. The standard protocol is stepping down the treatment. Your doctor may reduce its strength or advise taking it only when needed."
              },
              {
                "text": "• (e.g. Pantoprazole) Your doctor has started you on 40mg OD to lower your acid levels quickly. Once your symptoms improve, it is recommended to reduce your dose. The doctor may reduce the dose to 20mg OD, then to 20mg every other day, and eventually taking the medicine only when needed. (prevent rebound symptoms from stop abruptly)"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "antiemetics",
    "title": "Antiemetics",
    "notes": [],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Dopamine antagonists"
              }
            ],
            "medicine": [
              {
                "text": "Metoclopramide"
              }
            ],
            "labels": [
              {
                "text": "12"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help with your nausea"
              }
            ],
            "instruction": [
              {
                "text": "Take it … WHEN NEEDED. So, if you are not feeling nauseous anymore, you can stop taking it."
              }
            ],
            "sideEffects": [
              {
                "text": "-"
              }
            ],
            "referral": [
              {
                "text": "• If nausea and vomiting persist, see your doctor."
              },
              {
                "text": "• If you notice any movement disorders like shakiness, see your doctor. That can be an adverse effect of this medicine."
              }
            ],
            "lifestyle": [
              {
                "text": "Stay hydrated."
              }
            ]
          },
          {
            "className": [],
            "medicine": [
              {
                "text": "Prochlorperazine"
              }
            ],
            "labels": [
              {
                "text": "1, 8, 13, 16"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help with your nausea"
              }
            ],
            "instruction": [
              {
                "text": "Take it … WHEN NEEDED. So, if you are not feeling nauseous anymore, you can stop taking it."
              }
            ],
            "sideEffects": [
              {
                "text": "• It may make you drowsy"
              },
              {
                "text": "• This medicine can also drop your blood pressure, making you feel dizzy. DON’T STAND UP TOO QUICKLY, as that is when you will most likely feel it."
              },
              {
                "image": "rId15"
              },
              {
                "image": "rId14"
              }
            ],
            "referral": [
              {
                "text": "• If nausea and vomiting persist, see your doctor."
              },
              {
                "text": "• If you notice any movement disorders like shakiness, see your doctor. That can be an adverse effect of this medicine."
              }
            ],
            "lifestyle": [
              {
                "text": "Stay hydrated."
              }
            ]
          },
          {
            "className": [],
            "medicine": [
              {
                "text": "Domperidone"
              }
            ],
            "labels": [
              {
                "text": "3b, 18"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help with your nausea"
              }
            ],
            "instruction": [
              {
                "text": "Take it … WHEN NEEDED. So, if you are not feeling nauseous anymore, you can stop taking it."
              }
            ],
            "sideEffects": [
              {
                "text": "-"
              }
            ],
            "referral": [
              {
                "text": "• If nausea and vomiting persist, see your doctor."
              },
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "Stay hydrated."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "laxatives",
    "title": "Laxatives",
    "notes": [
      "Bulk-forming laxatives like psyllium husk can be recommended to improve stool formations."
    ],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Bulk-forming laxatives"
              }
            ],
            "medicine": [
              {
                "text": "Psyllium husk (e.g. Metamucil)"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [
              {
                "text": "This medicine increases the bulk of your stools, passing it along more easily. This help prevent constipation."
              }
            ],
            "instruction": [
              {
                "text": "• Start on the low end of the recommended dose, the slowly increase."
              },
              {
                "text": "• TAKEING TOO MUCH, TOO QUICKLY CAN WORSEN CONSTIPATION."
              }
            ],
            "sideEffects": [
              {
                "text": "-"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "• Drink enough water while taking. it will help soften your stools."
              }
            ]
          },
          {
            "className": [
              {
                "text": "Macrogol laxatives"
              }
            ],
            "medicine": [
              {
                "text": "Movicol"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [
              {
                "text": "• This medicine works by drawing more water into your stools, making it softer and easier to go to the toilet. So you need to drink more water while taking this."
              }
            ],
            "instruction": [
              {
                "text": "• Take this …"
              },
              {
                "text": "• It usually takes 1-3 days to start working."
              }
            ],
            "sideEffects": [
              {
                "text": "-"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Docusate & senna"
              }
            ],
            "medicine": [
              {
                "text": "Coloxyl with senna"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [
              {
                "text": "This medicine works by soften the stools and by stimulating the bowels. So you need to drink more water while taking this."
              }
            ],
            "instruction": [
              {
                "text": "• It usually takes 8 hrs to work, so we recommend taking 2 tablets at NIGHT so you will go to toilet when you wake up in the morning."
              },
              {
                "text": "• If you still haven’t gone to the toilet TAKE ANOTHER 2 tabs, and you should go at about lunchtime."
              }
            ],
            "sideEffects": [],
            "referral": [],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Suppository"
              }
            ],
            "medicine": [
              {
                "text": "Glyceryl suppository,"
              },
              {
                "text": "Saline laxatives enema (Microlax)"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [
              {
                "text": "-"
              }
            ],
            "instruction": [
              {
                "text": "• These medicine work quickly, usually within 30 minutes."
              },
              {
                "text": "• You need to physically insert it into the anus as per (…)."
              }
            ],
            "sideEffects": [
              {
                "text": "-"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "After you clear the immediate blockage, use something like psyllium husk to prevent constipation from recurring."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "antidiarrhoeal",
    "title": "Antidiarrhoeal Medicines",
    "notes": [
      "Lomotil (Diphenoxylate with atropine):",
      { "image": "rId21" }
    ],
    "tables": [
      {
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Loperamide"
              }
            ],
            "medicine": [
              {
                "text": "Loperamide"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [
              {
                "text": "These tablets will help slow down your bowel motion."
              }
            ],
            "instruction": [
              {
                "text": "• Take 2 tablets straight away as your first dose. Then 1 tablet after every loose bowel motion."
              },
              {
                "text": "• Maximum 8 tablets in a day."
              }
            ],
            "sideEffects": [
              {
                "text": "-"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "Make sure you stay well hydrated."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "respiratory",
    "title": "Respiratory Medicines",
    "notes": [],
    "tables": [
      {
        "heading": "Relievers",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Relievers"
              }
            ],
            "medicine": [
              {
                "text": "Salbutamol,"
              },
              {
                "text": "Terbutaline,"
              },
              {
                "text": "Ipratropium"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [
              {
                "text": "This medicine will help open your airways, making breathing easier."
              }
            ],
            "instruction": [
              {
                "text": "Use when needed …."
              }
            ],
            "sideEffects": [],
            "referral": [
              {
                "text": "See your doctor if you notice you use this medicine MORE THAN TWO TIMES A WEEK. That is a sign your asthma isn’t under control."
              }
            ],
            "lifestyle": []
          }
        ]
      },
      {
        "heading": "Preventers",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Preventers"
              }
            ],
            "medicine": [
              {
                "text": "LABA"
              }
            ],
            "labels": [
              {
                "text": "—"
              }
            ],
            "indication": [
              {
                "text": "This medicine keeps your airways open longer and reduces your number of asthma attack/COPD exacerbation."
              }
            ],
            "instruction": [
              {
                "text": "Take every day …"
              },
              {
                "text": "(Maintenance treatment: use this medicine every day even if you feel better.)"
              }
            ],
            "sideEffects": [
              {
                "text": "—"
              }
            ],
            "referral": [
              {
                "text": "—"
              }
            ],
            "lifestyle": [
              {
                "text": "—"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Preventers"
              }
            ],
            "medicine": [
              {
                "text": "LAMA"
              }
            ],
            "labels": [
              {
                "text": "—"
              }
            ],
            "indication": [
              {
                "text": "This medicine keeps your airways open longer and reduces your number of asthma attack/COPD exacerbation."
              }
            ],
            "instruction": [
              {
                "text": "Take every day …"
              },
              {
                "text": "(Long-acting anticholinergics: do not use for immediate relief of symptoms.)"
              }
            ],
            "sideEffects": [
              {
                "text": "Do not allow the powder or mist to come into contact with your eyes. If using a nebuliser, close your eyes or wear eye protection during nebulisation."
              },
              {
                "text": "Do not drive or operate machinery until you know how this medicine affects you, as it can cause dizziness or affect your vision."
              }
            ],
            "referral": [
              {
                "text": "Tell your doctor if you notice any eye pain or discomfort, blurred vision or visual halos, or difficulty urinating."
              }
            ],
            "lifestyle": [
              {
                "text": "—"
              }
            ]
          },
          {
            "className": [
              {
                "text": "Preventers"
              }
            ],
            "medicine": [
              {
                "text": "Steroids"
              }
            ],
            "labels": [
              {
                "text": "14"
              },
              {
                "image": "label14"
              }
            ],
            "indication": [
              {
                "text": "This medicine reduces the inflammation in your lungs and your number of asthma attack/COPD exacerbation."
              }
            ],
            "instruction": [
              {
                "text": "Take every day …"
              },
              {
                "text": "RINSE MOUTH after each use"
              },
              {
                "image": "label14"
              }
            ],
            "sideEffects": [
              {
                "text": "—"
              }
            ],
            "referral": [
              {
                "text": "—"
              }
            ],
            "lifestyle": [
              {
                "text": "—"
              }
            ]
          }
        ]
      },
      {
        "heading": "Cough suppressants",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Cough suppressants"
              }
            ],
            "medicine": [
              {
                "text": "Codeine,"
              },
              {
                "text": "Dihydrocodeine,"
              },
              {
                "text": "Dextromethorphan"
              }
            ],
            "labels": [
              {
                "text": "1"
              }
            ],
            "indication": [
              {
                "text": "This medicine will suppress the cough, allowing you to rest better."
              }
            ],
            "instruction": [
              {
                "text": "Take it …"
              }
            ],
            "sideEffects": [
              {
                "image": "rId15"
              }
            ],
            "referral": [
              {
                "text": "It does not treat the reason you are coughing. So, if your cough persists, see your doctor."
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      },
      {
        "heading": "Mucus-producing cough",
        "notes": [],
        "rows": [
          {
            "className": [
              {
                "text": "Mucus-producing cough"
              }
            ],
            "medicine": [
              {
                "text": "Bromhexine (with/without guaiphenesin)"
              }
            ],
            "labels": [
              {
                "text": "-"
              }
            ],
            "indication": [
              {
                "text": "• This medicine will break up the mucus, making it easier to get out of the body."
              }
            ],
            "instruction": [
              {
                "text": "• If you are producing a lot of mucus, take it consistently throughout the day."
              },
              {
                "text": "• Don’t take the last dose too close to bedtime. (This minimise the amount of mucus in your chest when you are trying to sleep) Because when you loosen the mucus, you cough a bit more to get the mucus out of your body."
              }
            ],
            "sideEffects": [
              {
                "text": "-"
              }
            ],
            "referral": [
              {
                "text": "-"
              }
            ],
            "lifestyle": [
              {
                "text": "-"
              }
            ]
          }
        ]
      }
    ]
  }
];
