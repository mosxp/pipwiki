export type Reliever = {
  brand: string;
  images: string[];
  device: string;
  tags: string;
  ingredient: string;
  pbs: string;
};

export type Preventer = {
  brand: string;
  images: string[];
  device: string;
  tags: string;
  strengths: string[];
  pbs: string;
  notes: string;
};

export const relievers: Reliever[] = [
  {
    "brand": "Ventolin Inhaler / Asmol Inhaler / Zempreon Inhaler",
    "images": [
      "image1.png",
      "image2.png",
      "image3.png"
    ],
    "device": "pMDI",
    "tags": "SABA Relievers For Asthma Attack",
    "ingredient": "Salbutamol 100 mcg",
    "pbs": "† Asthma unrestricted benefit ^ COPD unrestricted benefit"
  },
  {
    "brand": "Airomir Autohaler",
    "images": [
      "image4.png"
    ],
    "device": "Autohaler",
    "tags": "SABA Relievers For Asthma Attack",
    "ingredient": "Salbutamol 100 mcg",
    "pbs": "‡ Asthma restricted benefit # COPD restricted benefit"
  },
  {
    "brand": "Bricanyl Turbuhaler",
    "images": [
      "image5.png"
    ],
    "device": "Turbuhaler",
    "tags": "SABA Relievers For Asthma Attack (6+)",
    "ingredient": "Terbutaline 500 mcg",
    "pbs": "a Asthma authority required. c COPD authority required"
  },
  {
    "brand": "Atrovent Metered Aerosol",
    "images": [
      "image6.png"
    ],
    "device": "pMDI",
    "tags": "SAMA Relievers",
    "ingredient": "Ipratropium 21 mcg",
    "pbs": "† Asthma unrestricted benefit ^ COPD unrestricted benefit"
  }
];

export const preventers: Preventer[] = [
  {
    "brand": "Flixotide Inhaler / Axotide Inhaler / Fluticasone Cipla Inhaler",
    "images": [
      "image7.png"
    ],
    "device": "pMDI",
    "tags": "ICS Preventers",
    "strengths": [
      "ICS: Fluticasone propionate 125mcg, 250mcg"
    ],
    "pbs": "† Asthma unrestricted benefit",
    "notes": ""
  },
  {
    "brand": "Flixotide Accuhaler / Axotide Accuhaler",
    "images": [
      "image8.png"
    ],
    "device": "Accuhaler",
    "tags": "ICS Preventers",
    "strengths": [
      "ICS: Fluticasone propionate 250mcg, 500mcg"
    ],
    "pbs": "† Asthma unrestricted benefit",
    "notes": ""
  },
  {
    "brand": "Flixotide Inhaler Junior / Axotide Inhaler Junior",
    "images": [
      "image9.png"
    ],
    "device": "pMDI",
    "tags": "ICS Preventers",
    "strengths": [
      "ICS: Fluticasone propionate 50mcg"
    ],
    "pbs": "a Asthma authority required",
    "notes": ""
  },
  {
    "brand": "Flixotide Accuhaler Junior/ Axotide Accuhaler Junior",
    "images": [
      "image8.png"
    ],
    "device": "Accuhaler",
    "tags": "ICS Preventers",
    "strengths": [
      "ICS: Fluticasone propionate 100mcg"
    ],
    "pbs": "a Asthma authority required",
    "notes": ""
  },
  {
    "brand": "Serevent Accuhaler",
    "images": [
      "image10.png"
    ],
    "device": "Accuhaler",
    "tags": "LABA Medications",
    "strengths": [
      "LABA: Salmeterol 50 mcg"
    ],
    "pbs": "‡ Asthma restricted benefit",
    "notes": ""
  },
  {
    "brand": "Seretide Inhaler / Pavtide Inhaler / Seroflo Inhaler / SalplusF Inhaler / Evocair / Fluticasone+Salmeterol Cipla Inhaler",
    "images": [
      "image11.png"
    ],
    "device": "pMDI",
    "tags": "ICS/LABA Combinations",
    "strengths": [
      "ICS: Fluticasone propionate 50mcg, 125mcg, 250mcg",
      "LABA: Salmeterol 25 mcg"
    ],
    "pbs": "a Asthma authority required. c COPD authority required",
    "notes": "Fixed LABA"
  },
  {
    "brand": "Seretide Accuhaler / Pavtide Accuhaler / Fluticasone+Salmeterol Cipla Accuhaler /Salflumix (Easyhaler)",
    "images": [
      "image12.png",
      "image13.png"
    ],
    "device": "Accuhaler / Easyhaler",
    "tags": "ICS/LABA Combinations",
    "strengths": [
      "ICS: Fluticasone propionate 100mcg, 250mcg, 500mcg",
      "LABA: Salmeterol 50 mcg"
    ],
    "pbs": "a Asthma authority required. c COPD authority required",
    "notes": "Fixed LABA"
  },
  {
    "brand": "Flutiform Inhaler",
    "images": [
      "image14.png"
    ],
    "device": "pMDI",
    "tags": "ICS/LABA Combinations",
    "strengths": [
      "ICS: Fluticasone propionate 50mcg, 125mcg, 250mcg",
      "LABA: Formoterol 5 mcg, 10mcg"
    ],
    "pbs": "a Asthma authority required",
    "notes": "Fixed dose 50/5, 125/5, 250/10"
  },
  {
    "brand": "Arnuity Ellipta",
    "images": [
      "image15.png"
    ],
    "device": "Ellipta",
    "tags": "ICS Preventers",
    "strengths": [
      "ICS: Fluticasone Furoate 100mcg, 200mcg"
    ],
    "pbs": "† Asthma unrestricted benefit",
    "notes": ""
  },
  {
    "brand": "Breo Ellipta",
    "images": [
      "image16.png"
    ],
    "device": "Ellipta",
    "tags": "ICS/LABA Combinations",
    "strengths": [
      "ICS: Fluticasone Furoate 100mcg, 200mcg",
      "LABA: Vilanterol 25 mcg"
    ],
    "pbs": "a Asthma authority required. c COPD authority required",
    "notes": "Fixed LABA"
  },
  {
    "brand": "Trelegy Ellipta",
    "images": [
      "image17.png",
      "image18.png"
    ],
    "device": "Ellipta",
    "tags": "ICS/LAMA/LABA Combinations",
    "strengths": [
      "ICS: Fluticasone Furoate 100mcg, 200mcg",
      "LAMA: Umeclidinium 62.5mcg",
      "LABA: Vilanterol 25 mcg"
    ],
    "pbs": "a Asthma authority required. c COPD authority required",
    "notes": "Fixed LAMA/LABA"
  },
  {
    "brand": "Anoro Ellipta",
    "images": [
      "image19.png"
    ],
    "device": "Ellipta",
    "tags": "LAMA/LABA Combination",
    "strengths": [
      "LAMA: Umeclidinium 62.5mcg",
      "LABA: Vilanterol 25 mcg"
    ],
    "pbs": "c COPD authority required",
    "notes": ""
  },
  {
    "brand": "Incruse Ellipta",
    "images": [
      "image20.png"
    ],
    "device": "Ellipta",
    "tags": "LAMA Medications",
    "strengths": [
      "LAMA: Umeclidinium 62.5mcg"
    ],
    "pbs": "# COPD restricted benefit",
    "notes": ""
  },
  {
    "brand": "QVAR Inhaler",
    "images": [
      "image21.png"
    ],
    "device": "pMDI",
    "tags": "ICS Preventers",
    "strengths": [
      "ICS: Beclometasone 50mcg, 100mcg"
    ],
    "pbs": "† Asthma unrestricted benefit",
    "notes": ""
  },
  {
    "brand": "QVAR Autohaler",
    "images": [
      "image22.png",
      "image23.png"
    ],
    "device": "Autohaler",
    "tags": "ICS Preventers",
    "strengths": [
      "ICS: Beclometasone 50mcg, 100mcg"
    ],
    "pbs": "‡ Asthma restricted benefit",
    "notes": ""
  },
  {
    "brand": "Fostair Inhaler / Asthma Attack",
    "images": [
      "image24.png"
    ],
    "device": "pMDI",
    "tags": "ICS/LABA CombinationsFor Asthma Attack (18+)",
    "strengths": [
      "ICS: Beclometasone 100mcg, 200mcg",
      "LABA: Formoterol 6mcg"
    ],
    "pbs": "a Asthma authority required",
    "notes": "Fixed dose 100/6, 200/6"
  },
  {
    "brand": "Trimbow Inhaler",
    "images": [
      "image25.png",
      "image26.png"
    ],
    "device": "pMDI",
    "tags": "ICS/LAMA/LABA Combinations",
    "strengths": [
      "ICS: Beclometasone 100mcg, 200mcg",
      "LAMA: Glycopyrronium 10mcg",
      "LABA: Formoterol 6mcg"
    ],
    "pbs": "a Asthma authority required. c COPD authority required",
    "notes": "Fixed dose 100/10/6, 200/10/6"
  },
  {
    "brand": "Onbrez Breezhaler",
    "images": [
      "image27.png"
    ],
    "device": "Breezhaler",
    "tags": "LABA Medications",
    "strengths": [
      "LABA: Indacaterol 150mcg, 300 mcg"
    ],
    "pbs": "# COPD restricted benefit",
    "notes": "*COPD"
  },
  {
    "brand": "Atectura Breezhaler",
    "images": [
      "image28.png"
    ],
    "device": "Breezhaler",
    "tags": "ICS/LABA Combinations",
    "strengths": [
      "ICS: Mometasone 62.5mcg, 127.5mcg, 260mcg",
      "LABA: Indacaterol 125mcg"
    ],
    "pbs": "a Asthma authority required",
    "notes": "Fixed LABA"
  },
  {
    "brand": "Enerzair Breezhaler",
    "images": [
      "image29.png"
    ],
    "device": "Breezhaler",
    "tags": "ICS/LAMA/LABA Combinations",
    "strengths": [
      "ICS: Mometasone 68mcg, 136mcg",
      "LAMA: Glycopyrronium 46mcg",
      "LABA: Indacaterol 114mcg"
    ],
    "pbs": "a Asthma authority required",
    "notes": "Fixed LAMA/LABA"
  },
  {
    "brand": "Ultibro Breezhaler",
    "images": [
      "image30.png"
    ],
    "device": "Breezhaler",
    "tags": "LAMA/LABA Combination",
    "strengths": [
      "LAMA: Glycopyrronium 50mcg",
      "LABA: Indacaterol 110mcg"
    ],
    "pbs": "c COPD authority required",
    "notes": ""
  },
  {
    "brand": "Seebri Breezhaler",
    "images": [
      "image31.png"
    ],
    "device": "Breezhaler",
    "tags": "LAMA Medications",
    "strengths": [
      "LAMA: Glycopyrronium 50mcg"
    ],
    "pbs": "# COPD restricted benefit",
    "notes": ""
  },
  {
    "brand": "Pulmicort Turbuhaler",
    "images": [
      "image32.png"
    ],
    "device": "Turbuhaler",
    "tags": "ICS Preventers",
    "strengths": [
      "ICS: Budesonide 100mcg, 200mcg, 400mcg"
    ],
    "pbs": "† Asthma unrestricted benefit",
    "notes": ""
  },
  {
    "brand": "Oxis Turbuhaler",
    "images": [
      "image33.png"
    ],
    "device": "Turbuhaler",
    "tags": "LABA Medications",
    "strengths": [
      "LABA: Formoterol 6mcg, 12mcg"
    ],
    "pbs": "‡ Asthma restricted benefit",
    "notes": ""
  },
  {
    "brand": "Symbicort Turbuhaler / Rilast Turbuhaler / Asthma Attack",
    "images": [
      "image34.png"
    ],
    "device": "Turbuhaler",
    "tags": "ICS/LABA Combinations For Asthma Attack (12+)",
    "strengths": [
      "ICS: Budesonide 100mcg, 200mcg, 400mcg",
      "LABA: Formoterol 6mcg, 12mcg"
    ],
    "pbs": "a Asthma authority required. c COPD authority required",
    "notes": "Fixed dose 100/6, 200/6, 400/12"
  },
  {
    "brand": "Symbicort Rapihaler / Rilast Rapihaler / Asthma Attack",
    "images": [
      "image35.png"
    ],
    "device": "Rapihaler (pMDI)",
    "tags": "ICS/LABA Combinations For Asthma Attack (12+)",
    "strengths": [
      "ICS: Budesonide 50mcg, 100mcg, 200mcg",
      "LABA: Formoterol 3mcg, 6mcg"
    ],
    "pbs": "a Asthma authority required. c COPD authority required",
    "notes": "Fixed dose 50/3, 100/3, 200/6"
  },
  {
    "brand": "DuoResp Spiromax — Asthma Attack / BiResp Spiromax — Asthma Attack",
    "images": [
      "image36.png"
    ],
    "device": "Spiromax",
    "tags": "ICS/LABA Combinations For Asthma Attack (18+)",
    "strengths": [
      "ICS: Budesonide 200mcg, 400mcg",
      "LABA: Formoterol 6mcg, 12mcg"
    ],
    "pbs": "a Asthma authority required. c COPD authority required",
    "notes": "Fixed dose 200/6, 400/12"
  },
  {
    "brand": "Bufomix (Easyhaler)",
    "images": [
      "image37.png"
    ],
    "device": "Easyhaler",
    "tags": "ICS/LABA Combinations",
    "strengths": [
      "ICS: Budesonide 200mcg, 400mcg",
      "LABA: Formoterol 6mcg, 12mcg"
    ],
    "pbs": "?",
    "notes": "Fixed dose 200/6, 400/12"
  },
  {
    "brand": "Breztri Aerosphere",
    "images": [
      "image38.png"
    ],
    "device": "pMDI",
    "tags": "ICS/LAMA/LABA Combinations",
    "strengths": [
      "ICS: Budesonide 160mcg",
      "LAMA: Glycopyrronium 7.2mcg",
      "LABA: Formoterol 5 mcg"
    ],
    "pbs": "c COPD authority required",
    "notes": ""
  },
  {
    "brand": "Alvesco Inhaler",
    "images": [
      "image39.png"
    ],
    "device": "pMDI",
    "tags": "ICS Preventers",
    "strengths": [
      "ICS: Ciclesonide 80mcg, 160mcg"
    ],
    "pbs": "† Asthma unrestricted benefit",
    "notes": ""
  },
  {
    "brand": "Bretaris Genuair",
    "images": [
      "image40.png"
    ],
    "device": "Genuair",
    "tags": "LAMA Medications",
    "strengths": [
      "LAMA: Aclidinium 322mcg"
    ],
    "pbs": "# COPD restricted benefit",
    "notes": ""
  },
  {
    "brand": "Brimica Genuair",
    "images": [
      "image41.png"
    ],
    "device": "Genuair",
    "tags": "LAMA/LABA Combination",
    "strengths": [
      "LAMA: Aclidinium 340mcg",
      "LABA: Formoterol 12mcg"
    ],
    "pbs": "c COPD authority required",
    "notes": "340/12"
  },
  {
    "brand": "Braltus Zonda",
    "images": [
      "image42.png"
    ],
    "device": "Zonda",
    "tags": "LAMA Medications",
    "strengths": [
      "LAMA: Tiotropium 13mcg"
    ],
    "pbs": "# COPD restricted benefit",
    "notes": ""
  },
  {
    "brand": "Spiriva Handihaler",
    "images": [
      "image43.png"
    ],
    "device": "Handihaler",
    "tags": "LAMA Medications",
    "strengths": [
      "LAMA: Tiotropium 18mcg"
    ],
    "pbs": "# COPD restricted benefit",
    "notes": ""
  },
  {
    "brand": "Spiriva Respimat",
    "images": [
      "image44.png"
    ],
    "device": "Respimat",
    "tags": "LAMA Medications",
    "strengths": [
      "LAMA: Tiotropium 2.5mcg"
    ],
    "pbs": "‡ Asthma restricted benefit. a Asthma authority required. # COPD restricted benefit",
    "notes": ""
  },
  {
    "brand": "Spiolto Respimat",
    "images": [
      "image45.png"
    ],
    "device": "Respimat",
    "tags": "LAMA/LABA Combination",
    "strengths": [
      "LAMA: Tiotropium 2.5mcg",
      "LABA: Olodaterol 2.5mcg"
    ],
    "pbs": "c COPD authority required",
    "notes": "2.5/2.5"
  }
];
