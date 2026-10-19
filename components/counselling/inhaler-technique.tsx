import type { ReactNode } from "react";
import { ZoomImage } from "@/components/counselling/zoom-image";

const img = (file: string) => `/counselling/inhaler/${file}`;

const stepLabels = [
  ["s1", "1"],
  ["s2", "2"],
  ["s22", "2.2"],
  ["s3", "3 · Load dose"],
  ["s4", "4 · Prepare the lungs"],
  ["s5", "5"],
  ["s6", "6 · Delivery"],
  ["s7", "7 · Continue"],
  ["s72", "7.2 · Hold breath"],
  ["s8", "8"],
  ["s9", "9"],
  ["s10", "10"],
  ["s11", "11 · Repeat"],
  ["s12", "12"],
] as const;

type StepKey = (typeof stepLabels)[number][0];

type Device = {
  id?: string;
  name: string;
  keywords: string;
  image: string;
  alt: string;
  steps: Partial<Record<StepKey, string>>;
  note?: string;
};

const classes: { title: string; accent: string; points: string[] }[] = [
  {
    title: "Inhaled corticosteroids (ICS)",
    accent: "border-moss",
    points: [
      "Use a spacer with an MDI. This improves delivery and reduces side effects.",
      "Ensure you have a written asthma action plan from your doctor.",
      "Take every day, even if feeling well. Do not stop or reduce the dose unless the doctor advises.",
      "Rinse, gargle, and spit out after use to prevent oral thrush and hoarseness.",
    ],
  },
  {
    title: "SABA",
    accent: "border-[#8a6232]",
    points: [
      "Ensure you have an asthma action plan from your doctor.",
      "Tell your doctor if you need this more than 2 times a week, need higher doses, or use it more often than prescribed. That may indicate poor asthma control.",
      "Use a spacer with a pMDI (except Autohaler).",
      "Clean the mouthpiece weekly to prevent nozzle blockage.",
    ],
  },
  {
    title: "LABA",
    accent: "border-[#3d6b8c]",
    points: [
      "Use every day, even when feeling well, for ongoing control and prevention of symptoms.",
    ],
  },
  {
    title: "Anticholinergics",
    accent: "border-[#8c3b32]",
    points: [
      "Avoid powder or mist contact with the eyes. If using a nebuliser, close the eyes or wear eye protection.",
      "Tell your doctor if you notice eye pain, blurred vision, visual halos, or difficulty urinating.",
      "Do not drive or operate machinery until you know how it affects you. It may cause dizziness or blurred vision.",
      "Long-acting anticholinergics (LAMA) are not for immediate relief. Use only for maintenance.",
    ],
  },
];

const pmdiDevices: Device[] = [
  {
    name: "pMDI / Rapihaler",
    keywords: "Cap, upright, shake, canister, slowly, deeply",
    image: "pmdi.png",
    alt: "Metered-dose puffer with the mouthpiece cap removed.",
    steps: {
      s1: "Remove CAP",
      s2: "Hold inhaler UPRIGHT",
      s22: "and SHAKE well",
      s3: "(dose loaded at the same time with dose delivered in step 6)",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Put MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal",
      s6: "Breathe IN SLOWLY through the mouth and, AT THE SAME TIME, Press Down on CANISTER firmly",
      s7: "KEEP Breathing IN SLOWLY and DEEPLY (over 3–5 seconds)",
      s72: "and HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s11: "If an extra dose is needed, repeat steps (start from a shaking step)",
      s12: "Replace CAP",
    },
  },
  {
    name: "Spacer (single breath)",
    keywords: "Spacer, cap, upright, shake, canister, slowly, deeply",
    image: "spacer.png",
    alt: "Hand holding a puffer seated in a squeezing aid.",
    steps: {
      s1: "Remove CAP",
      s2: "Hold inhaler UPRIGHT",
      s22: "and SHAKE well before INSERTING INTO SPACER",
      s5: "Put MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal",
      s6: "Breathe OUT gently, INTO the SPACER. Hold SPACER level and Press Down on CANISTER firmly (no need to breathe in promptly)",
      s7: "Single breath: Breathe IN SLOWLY and DEEPLY (over 3–5 seconds)",
      s72: "and HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Take spacer out from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s10: "Remove inhaler from spacer",
      s11: "If an extra dose is needed, repeat steps (start from a shaking step)",
      s12: "Replace CAP",
    },
  },
  {
    name: "Spacer (tidal breath)",
    keywords: "Spacer, cap, upright, shake, canister, normally",
    image: "spacer.png",
    alt: "Hand holding a puffer seated in a squeezing aid.",
    steps: {
      s1: "Remove CAP",
      s2: "Hold inhaler UPRIGHT",
      s22: "and SHAKE well before INSERTING INTO SPACER",
      s5: "Put MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal",
      s6: "Breathe OUT gently, INTO the SPACER. Hold SPACER level and Press Down on CANISTER firmly (no need to breathe in promptly)",
      s7: "Tidal breath: Breathe IN and OUT NORMALLY for 3 or 4 breaths before removing spacer from mouth",
      s8: "Take spacer out from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s10: "Remove inhaler from spacer",
      s11: "If an extra dose is needed, repeat steps (start from a shaking step)",
      s12: "Replace CAP",
    },
  },
];

const respimat: Device = {
  name: "Respimat",
  keywords: "Cap, upright, base, dose button, slowly, deeply, air vents, half-dose round",
  image: "respimat.png",
  alt: "Respimat inhaler with the cap open beside its cartridge.",
  steps: {
    s2: "Hold inhaler UPRIGHT with the CAP closed",
    s3: "Turn BASE in direction of ARROWS until it clicks (HALF A TURN). Open the CAP until it snaps fully open",
    s4: "Breathe OUT gently, away from the inhaler",
    s5: "Place MOUTHPIECE in MOUTH and CLOSE LIPS to form a good seal (DO NOT COVER AIR VENTS)",
    s6: "Breathe IN SLOWLY and DEEPLY through the mouth and, AT THE SAME TIME, Press Down on the DOSE BUTTON",
    s7: "KEEP Breathing IN SLOWLY and DEEPLY",
    s72: "and HOLD BREATH for about 5 seconds or as long as comfortable",
    s8: "While holding breath, Remove inhaler from mouth",
    s9: "Breathe OUT gently, away from the inhaler",
    s10: "Click CAP shut",
    s11: "Repeat from the 1st step TO GET THE FULL DOSE (as two inhalations is the usual dose for medicines used with Respimat)",
  },
};

const autohaler: Device = {
  name: "Autohaler",
  keywords: "Cap, upright, shake, lever, slowly, deeply, click heard to stop",
  image: "autohaler.png",
  alt: "Autohaler breath-activated puffer with a blue cap.",
  note: "Breath-activated pMDI.",
  steps: {
    s1: "Remove CAP",
    s2: "Hold inhaler UPRIGHT",
    s22: "and SHAKE well",
    s3: "Push LEVER UP",
    s4: "Breathe OUT gently, away from the inhaler",
    s5: "Put MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal",
    s6: "Breathe IN SLOWLY and DEEPLY",
    s7: "KEEP Breathing IN",
    s72: "after click is heard HOLD BREATH for about 5 seconds or as long as comfortable",
    s8: "While holding breath, Remove inhaler from mouth",
    s9: "Breathe OUT gently, away from the inhaler",
    s10: "Push LEVER DOWN",
    s11: "If an extra dose is needed, repeat steps (start from a shaking step)",
    s12: "Replace CAP",
  },
};

const dryPowder: Device[] = [
  {
    id: "spiromax",
    name: "Spiromax",
    keywords: "Upright, mouthpiece cover (click), mouthpiece, air vent, strongly, deeply",
    image: "spiromax.png",
    alt: "Spiromax dry powder inhaler with a red mouthpiece cover.",
    steps: {
      s2: "Hold inhaler UPRIGHT with MOUTHPIECE COVER at the bottom",
      s3: "Open the MOUTHPIECE COVER until it clicks",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Place MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal (DO NOT COVER AIR VENTS)",
      s6: "Breathe IN STRONGLY and DEEPLY",
      s72: "and HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s10: "Close the MOUTHPIECE COVER",
      s11: "If an extra dose is needed, repeat steps (start from a dose loading step)",
    },
  },
  {
    id: "ellipta",
    name: "Ellipta",
    keywords: "Do not shake, mouthpiece cover (click), mouthpiece, air vents, steadily, deeply",
    image: "ellipta.png",
    alt: "Ellipta dry powder inhaler.",
    steps: {
      s22: "(DO NOT SHAKE)",
      s3: "Slide COVER down until click is heard",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Place MOUTHPIECE in MOUTH and CLOSE LIPS to form a good seal (DO NOT COVER AIR VENTS)",
      s6: "Breathe IN STEADILY and DEEPLY",
      s72: "and HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s10: "Slide the COVER upwards as far as it will go, to cover the mouthpiece",
    },
  },
  {
    id: "accuhaler",
    name: "Accuhaler",
    keywords: "Horizontally, mouthpiece cover, thumb grip, lever (click), mouthpiece, steadily, deeply",
    image: "accuhaler.png",
    alt: "Accuhaler disc-shaped dry powder inhaler.",
    steps: {
      s1: "Open COVER using THUMB GRIP",
      s2: "Hold HORIZONTALLY",
      s3: "Slide LEVER until it clicks",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Place MOUTHPIECE in MOUTH and CLOSE LIPS to form a good seal (keep inhaler HORIZONTAL)",
      s6: "Breathe IN STEADILY and DEEPLY",
      s72: "and HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s11: "If an extra dose is needed, repeat steps (start from a dose loading step)",
      s12: "Close the COVER to click shut",
    },
  },
  {
    id: "turbuhaler",
    name: "Turbuhaler",
    keywords: "Cover, upright, grip (click), mouthpiece, air vents, strongly, deeply",
    image: "turbuhaler.png",
    alt: "Turbuhaler dry powder inhaler.",
    steps: {
      s1: "Unscrew and Remove COVER",
      s2: "keep inhaler UPRIGHT while twisting grip",
      s3: "Twist (GRIP) around and then twist back until click is heard",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Place MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal (DO NOT COVER AIR VENTS)",
      s6: "Breathe IN STRONGLY and DEEPLY (within 2–3 seconds)",
      s72: "and HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s11: "If an extra dose is needed, repeat steps (start from a dose loading step)",
      s12: "Replace COVER",
    },
  },
  {
    id: "genuair",
    name: "Genuair",
    keywords: "Cap, horizontally, coloured button (press and release), control window (green/red), mouthpiece, strongly, deeply, click heard to stop",
    image: "genuair.png",
    alt: "Genuair inhaler with a green button.",
    steps: {
      s1: "Remove CAP by squeezing arrows and pulling",
      s2: "Hold inhaler in the way that large COLOURED BUTTON is facing straight up (HORIZONTALLY)",
      s3: "Press and release the BUTTON (without tilting inhaler). Check that CONTROL WINDOW has changed to Green",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Place MOUTHPIECE in MOUTH and CLOSE LIPS to form a good seal (keep inhaler HORIZONTAL)",
      s6: "Breathe IN STRONGLY and DEEPLY",
      s7: "KEEP Breathing IN",
      s72: "after click is heard HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s10: "Check that CONTROL WINDOW has changed to Red",
      s12: "Replace CAP",
    },
  },
  {
    id: "easyhaler",
    name: "Easyhaler",
    keywords: "Mouthpiece cover, upright, shake, coloured button (press, click, and release), mouthpiece, quickly, deeply",
    image: "easyhaler.png",
    alt: "Easyhaler dry powder inhaler.",
    note: "It is very important to shake the Easyhaler first. This is to make sure the powder flows properly and gives the correct dose.",
    steps: {
      s1: "Remove Mouthpiece COVER",
      s22: "and SHAKE in upright position for 3–5 times",
      s3: "Press down on the COLOURED BUTTON until it clicks then Release the button back",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Place MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal",
      s6: "Breathe IN QUICKLY and DEEPLY (for 2 to 3 seconds)",
      s72: "and HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s11: "If an extra dose is needed, repeat steps (start from a shaking step)",
      s12: "Replace COVER",
    },
  },
];

const capsules: Device[] = [
  {
    id: "breezhaler",
    name: "Breezhaler",
    keywords: "Cap, mouthpiece, chamber, side button (press and release), quickly, steadily, capsule vibrates to stop",
    image: "breezhaler.png",
    alt: "Breezhaler capsule inhaler with the mouthpiece open.",
    steps: {
      s1: "Remove CAP",
      s3: "1) Flip open MOUTHPIECE. 2) Remove CAPSULE from blister and place in CHAMBER. 3) Close MOUTHPIECE until it clicks. 4) Press SIDE BUTTON in once and release (DO NOT SHAKE)",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Put MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal",
      s6: "Breathe IN QUICKLY and STEADILY so capsule vibrates",
      s72: "and HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s10: "Open MOUTHPIECE and remove CAPSULE. Close MOUTHPIECE",
      s11: "If an extra dose is needed, repeat steps (start from a dose loading step). NOT usually appropriate for medicines delivered by this device",
      s12: "Replace CAP",
    },
  },
  {
    id: "handihaler",
    name: "Handihaler",
    keywords: "Cap, mouthpiece, chamber, piercing button (press and release), slowly, deeply, capsule vibrates to stop",
    image: "handihaler.png",
    alt: "Handihaler capsule inhaler with the mouthpiece open beside a blister.",
    steps: {
      s1: "Open CAP",
      s3: "1) Flip open MOUTHPIECE. 2) Remove CAPSULE from blister and place in CHAMBER. 3) Close MOUTHPIECE until it clicks. 4) Press green PIERCING BUTTON in once and release (DO NOT SHAKE)",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Put MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal",
      s6: "Breathe IN SLOWLY and DEEPLY so capsule vibrates",
      s7: "KEEP Breathing IN as long as comfortable. While holding breath, remove inhaler from mouth. Breathe OUT gently, away from the inhaler. Repeat Breathe IN SLOWLY and DEEPLY so capsule vibrates to take the full dose (to empty capsule completely)",
      s72: "KEEP Breathing IN as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s10: "Open MOUTHPIECE and remove CAPSULE. Close MOUTHPIECE",
      s12: "Close CAP",
    },
  },
  {
    id: "zonda",
    name: "Zonda",
    keywords: "Cap, mouthpiece, chamber, side button (press and release), slowly, deeply, capsule vibrates to stop",
    image: "zonda.png",
    alt: "Zonda capsule inhaler with the cap open.",
    steps: {
      s1: "Open CAP",
      s3: "1) Flip open MOUTHPIECE. 2) Remove CAPSULE from blister and place in CHAMBER. 3) Close MOUTHPIECE until it clicks. 4) Press green PIERCING BUTTON in once and release",
      s4: "Breathe OUT gently, away from the inhaler",
      s5: "Put MOUTHPIECE between TEETH without BITING and CLOSE LIPS to form a good seal",
      s6: "Breathe IN SLOWLY and DEEPLY so capsule vibrates",
      s7: "HOLD BREATH for about 5 seconds or as long as comfortable. While holding breath, remove inhaler from mouth. Breathe OUT gently, away from the inhaler. Repeat Breathe IN SLOWLY and DEEPLY so capsule vibrates to take the full dose (to empty capsule completely)",
      s72: "HOLD BREATH for about 5 seconds or as long as comfortable",
      s8: "While holding breath, Remove inhaler from mouth",
      s9: "Breathe OUT gently, away from the inhaler",
      s10: "Open MOUTHPIECE and remove CAPSULE. Close MOUTHPIECE",
      s12: "Close CAP",
    },
  },
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
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

function StepTable({ device }: { device: Device }) {
  const filled = stepLabels.filter(([key]) => device.steps[key]);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-6 text-ink">
        <thead className="bg-moss text-paper">
          <tr>
            <th className="w-40 px-3 py-2 font-medium">Step</th>
            <th className="px-3 py-2 font-medium">Instruction</th>
          </tr>
        </thead>
        <tbody>
          {filled.map(([key, label], index) => (
            <tr key={key} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              <td className="border-t border-line px-3 py-3 align-top font-medium">{label}</td>
              <td className="border-t border-line px-3 py-3 align-top">{device.steps[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DeviceBlock({ device }: { device: Device }) {
  return (
    <div id={device.id} className="scroll-mt-8 rounded-lg border border-line bg-paper">
      <div className="flex flex-wrap items-start justify-between gap-4 px-4 py-4">
        <div className="min-w-0">
          <h3 className="font-serif text-xl tracking-tight">{device.name}</h3>
          <p className="mt-1 text-sm leading-6 text-ink-soft">
            <strong className="font-medium text-ink">Keywords. </strong>
            {device.keywords}
          </p>
          {device.note ? <p className="mt-2 text-sm leading-6">{device.note}</p> : null}
        </div>
        <ZoomImage src={img(device.image)} alt={device.alt} />
      </div>
      <div className="px-4 pb-4">
        <StepTable device={device} />
      </div>
    </div>
  );
}

const matrixTones = ["bg-[#e7eef6]", "bg-[#e7f0df]", "bg-[#dceccf]"];

function PmdiMatrix() {
  const used = stepLabels.filter(([key]) => pmdiDevices.some((device) => device.steps[key]));
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[72rem] border-collapse text-left text-sm leading-6 text-ink">
        <thead>
          <tr className="bg-moss text-paper">
            <th className="sticky left-0 z-10 bg-moss px-3 py-2 font-medium">Step</th>
            {pmdiDevices.map((device) => (
              <th key={device.name} className="min-w-64 px-3 py-2 font-medium">
                {device.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="sticky left-0 z-10 border-t border-line bg-paper px-3 py-3 text-left align-top font-medium">
              Keywords
            </th>
            {pmdiDevices.map((device, index) => (
              <td key={device.name} className={`border-t border-line px-3 py-3 align-top ${matrixTones[index]}`}>
                {device.keywords}
              </td>
            ))}
          </tr>
          {used.map(([key, label]) => (
            <tr key={key}>
              <th className="sticky left-0 z-10 border-t border-line bg-paper-raised px-3 py-3 text-left align-top font-medium">
                {label}
              </th>
              {pmdiDevices.map((device) => (
                <td key={device.name} className="border-t border-line px-3 py-3 align-top">
                  {device.steps[key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function InhalerTechnique() {
  return (
    <div className="space-y-8">
      <Section id="classes" title="Medication Class Counselling Points">
        <div className="grid gap-4 md:grid-cols-2">
          {classes.map((item) => (
            <div key={item.title} className={`rounded-lg border border-line border-l-4 ${item.accent} bg-[#f3ecdf] px-4 py-4`}>
              <h3 className="font-serif text-xl tracking-tight">{item.title}</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <div id="mist-inhalers" className="scroll-mt-8 space-y-8">
        <h2 className="font-serif text-3xl tracking-tight text-ink">Mist Inhalers</h2>
        <Section id="pmdi" title="pMDI Inhalers & Spacers">
        <div className="flex flex-wrap items-start gap-4">
          <ZoomImage src={img("pmdi.png")} alt="Metered-dose puffer with the mouthpiece cap removed." />
          <ZoomImage src={img("rapihaler.webp")} alt="Symbicort Rapihaler pressurised inhaler with a dose counter." />
        </div>
        <div className="rounded-lg border border-line bg-[#f3ecdf] px-4 py-3 text-sm leading-6">
          <p>
            <strong>Step 0. Prepare the spacer.</strong> New plastic spacers should be prewashed in warm water and
            dishwashing detergent without rinsing, and air-dried before first use.
          </p>
        </div>
        <PmdiMatrix />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-6 text-ink">
            <thead className="bg-moss text-paper">
              <tr>
                <th className="px-3 py-2 font-medium">A spacer should be used</th>
                <th className="px-3 py-2 font-medium">Children</th>
                <th className="px-3 py-2 font-medium">Adults and adolescents</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-paper">
                <td className="border-t border-line px-3 py-3 align-top font-medium">When</td>
                <td className="border-t border-line px-3 py-3 align-top">
                  <p>If the patient is a child under 10 years.</p>
                  <p className="mt-2">During an asthma flare-up.</p>
                </td>
                <td className="border-t border-line px-3 py-3 align-top">During an asthma flare-up.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-6 text-ink-soft">
          Most adults and adolescents can use a pMDI inhaler without a spacer well enough to administer as-needed
          salbutamol when away from home.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <p className="min-w-0 flex-1 text-sm leading-6">
            <strong>Haleraid.</strong> Helps if someone has trouble pressing down when using a puffer (MDI). It allows
            them to grip and squeeze, instead of pressing down.
          </p>
          <ZoomImage src={img("spacer.png")} alt="Haleraid squeezing aid fitted around a puffer." />
        </div>
      </Section>

      <Section id="respimat" title="Respimat">
        <DeviceBlock device={respimat} />
      </Section>

      <Section id="autohaler" title="Autohaler">
        <DeviceBlock device={autohaler} />
        </Section>
      </div>

      <Section id="dry-powder" title="Dry Powder Inhalers">
        <div className="rounded-lg border border-line bg-[#f3ecdf] px-4 py-3 text-sm leading-6">
          <p>To clean the mouthpiece, wipe it with a clean dry tissue.</p>
          <p className="mt-2">
            If you click the inhaler by accident, or if you have clicked it more than once, or if you breathe out into
            it, tap the mouthpiece to empty the powder onto a tabletop or the palm of your hand.
          </p>
        </div>
        {dryPowder.map((device) => (
          <DeviceBlock key={device.name} device={device} />
        ))}
      </Section>

      <Section id="capsules" title="Capsule Devices">
        {capsules.map((device) => (
          <DeviceBlock key={device.name} device={device} />
        ))}
      </Section>

      <Section id="cleaning" title="Puffer Cleaning Instructions">
        <p className="text-sm leading-6">
          A reliever puffer (Asmol, Ventolin, or Zempreon) should be cleaned <strong>once a week</strong>.
        </p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-6">
          <li>Remove the metal canister and dose counter from the plastic casing (actuator) of the puffer and remove the mouthpiece cover.</li>
          <li>
            Rinse the actuator thoroughly under warm running water. <strong>Do not put the metal canister in water.</strong>
          </li>
          <li>Dry the actuator thoroughly inside and out.</li>
          <li>Replace the metal canister and the mouthpiece cover.</li>
        </ol>
        <div className="rounded-lg border border-line bg-[#f3ecdf] px-4 py-3 text-sm leading-6">
          <p>
            If the inhaler fails to provide relief within approximately 4 minutes of use, it may have become clogged.
            Spray the inhaler into the air and observe the flow from the mouthpiece, and clean if required.
          </p>
          <p className="mt-2">
            If you need to use the inhaler before it is completely dry, shake off as much excess water as possible
            before using. Spray one spray out to clear any remaining water droplets. After use, repeat the cleaning
            steps and allow it to dry.
          </p>
        </div>
        <ZoomImage
          src={img("cleaning.jpeg")}
          alt="Asthma Australia poster, Cleaning your puffer device. Weekly cleaning steps, drying, and how to check whether the mouthpiece is blocked."
          className="h-auto w-full"
        />
      </Section>
    </div>
  );
}
