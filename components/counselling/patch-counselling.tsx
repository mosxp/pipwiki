import type { ReactNode } from "react";
import { ZoomImage } from "@/components/counselling/zoom-image";

const img = (file: string) => `/counselling/patches/${file}`;

type Photo = { file: string; alt: string };

type PatchRow = {
  product: string;
  detail?: string[];
  images?: Photo[];
  before: string;
  skin: string;
  sites: string;
  avoid: string;
  interval: string;
  after: string;
};

const columns = [
  "Product",
  "Before applying",
  "Skin preparation",
  "Application sites",
  "Precautions",
  "Wear interval",
  "Rotation / post-removal care",
] as const;

function Section({
  id,
  title,
  accent,
  children,
}: {
  id: string;
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-8 overflow-hidden rounded-lg border border-line border-l-4 ${accent} bg-paper-raised shadow-sm`}>
      <h2 className="border-b border-line px-4 py-4 font-serif text-2xl tracking-tight text-ink">{title}</h2>
      <div className="space-y-4 px-4 py-5">{children}</div>
    </section>
  );
}

function Callout({ tone = "note", children }: { tone?: "note" | "alert"; children: ReactNode }) {
  const color = tone === "alert" ? "border-[#8c3b32] bg-[#f8ece8]" : "border-line bg-[#f3ecdf]";
  return <div className={`rounded-lg border px-4 py-3 text-sm leading-6 ${color}`}>{children}</div>;
}

function Photos({ images }: { images?: Photo[] }) {
  if (!images?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {images.map((image) => (
        <ZoomImage key={image.file} src={img(image.file)} alt={image.alt} className="h-16 w-16 object-contain" />
      ))}
    </div>
  );
}

function PatchTable({ rows }: { rows: PatchRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm leading-6 text-ink">
        <thead className="bg-moss text-paper">
          <tr>
            {columns.map((heading) => (
              <th key={heading} className="px-3 py-2 font-medium">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.product} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              <td className="sticky left-0 z-10 min-w-44 border-t border-line bg-inherit px-3 py-3 align-top">
                <Photos images={row.images} />
                <p className={`font-medium ${row.images?.length ? "mt-2" : ""}`}>{row.product}</p>
                {row.detail?.map((line) => (
                  <p key={line} className="mt-1">
                    {line}
                  </p>
                ))}
              </td>
              <td className="border-t border-line px-3 py-3 align-top">{row.before}</td>
              <td className="border-t border-line px-3 py-3 align-top">{row.skin}</td>
              <td className="border-t border-line px-3 py-3 align-top">{row.sites}</td>
              <td className="border-t border-line px-3 py-3 align-top">{row.avoid}</td>
              <td className="border-t border-line px-3 py-3 align-top">{row.interval}</td>
              <td className="border-t border-line px-3 py-3 align-top">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PatchCounselling() {
  return (
    <div className="space-y-8">
      <Section id="nrt" title="Nicotine replacement therapy" accent="border-l-moss">
        <PatchTable
          rows={[
            {
              product: "Nicotine, 16-hour patch",
              detail: ["10 mg, 15 mg, 25 mg / 16 hours (Nicorette Invisipatch) #7 #14 #28"],
              images: [{ file: "nicorette.png", alt: "Nicorette Invisipatch box, 15 mg for 16 hours." }],
              before: "—",
              skin: "Clean, dry, non-hairy",
              sites: "Upper body, outer upper arm",
              avoid: "—",
              interval: "Daily (16 hours)",
              after: "Put the new patch on a different area.",
            },
            {
              product: "Nicotine, 24-hour patch",
              detail: ["7 mg, 14 mg, 21 mg / 24 hours (Nicotinell, Nicabate Clear, QuitX) #7 #14 #28"],
              images: [
                { file: "nicotinell.png", alt: "Nicotinell Step 3 patch box, 7 mg over 24 hours." },
                { file: "nicabate.png", alt: "Nicabate Clear 21 mg patch box." },
                { file: "quitx.png", alt: "QuitX 21 mg step 1 patch box." },
              ],
              before: "—",
              skin: "Clean, dry, non-hairy",
              sites: "Upper body, outer upper arm",
              avoid: "—",
              interval: "Daily (24 hours)",
              after: "Put the new patch on a different area.",
            },
          ]}
        />
      </Section>

      <Section id="nitrates" title="Nitrates" accent="border-l-[#8a6232]">
        <PatchTable
          rows={[
            {
              product: "Glyceryl trinitrate",
              detail: ["5 mg, 10 mg, 15 mg / 24 hours (Minitran, Transiderm-Nitro) #30"],
              images: [
                { file: "transiderm-nitro.png", alt: "Transiderm-Nitro 25 glyceryl trinitrate patch box." },
                { file: "minitran.png", alt: "Minitran 5 glyceryl trinitrate patch box." },
              ],
              before: "—",
              skin: "Clean, dry",
              sites: "Chest area, upper arm",
              avoid: "—",
              interval:
                "Daily for 12–14 hours. Wear when symptoms of angina are most frequent, for example during the day for daytime angina.",
              after:
                "To avoid nitrate tolerance, ensure a patch-free period of at least 8 hours (ideally 10–12 hours), usually overnight.",
            },
          ]}
        />
      </Section>

      <Section id="rivastigmine" title="Acetylcholinesterase inhibitors" accent="border-l-[#3d6b8c]">
        <PatchTable
          rows={[
            {
              product: "Rivastigmine",
              detail: ["4.6 mg, 9.5 mg, 13.3 mg / 24 hours (Exelon 5, 10, 15) #30"],
              images: [{ file: "exelon.png", alt: "Exelon Patch 5 box, 4.6 mg/24 hours." }],
              before: "—",
              skin: "Clean, dry, hairless",
              sites: "Back or chest, upper arm",
              avoid: "—",
              interval: "Daily",
              after: "Put the new patch on a different area (within 2 weeks).",
            },
          ]}
        />
      </Section>

      <Section id="rotigotine" title="Dopamine agonists" accent="border-l-[#5e584e]">
        <Callout>
          <p>
            <strong>Do not cut patches.</strong> Two patches can be applied at the same time to give doses greater than
            8 mg/24 hours.
          </p>
        </Callout>
        <PatchTable
          rows={[
            {
              product: "Rotigotine",
              detail: ["2, 4, 6, 8 mg/24 hours (Neupro)"],
              images: [{ file: "neupro.png", alt: "Neupro 6 mg/24 hours rotigotine patch box." }],
              before: "—",
              skin: "Clean, dry, hairless, non-irritated",
              sites: "Shoulder, upper arm, abdomen, hip, thigh",
              avoid: "—",
              interval: "Daily. Apply at the same time each day.",
              after: "Put the new patch on a different area (within 2 weeks).",
            },
          ]}
        />
      </Section>

      <Section id="oxybutynin" title="Oxybutynin" accent="border-l-moss">
        <PatchTable
          rows={[
            {
              product: "Oxybutynin",
              detail: ["3.9 mg/24 hours (Oxytrol) #8"],
              images: [{ file: "oxytrol.png", alt: "Oxytrol 3.9 mg/24 hours patch box." }],
              before: "—",
              skin: "Dry, unbroken",
              sites: "Abdomen, hip, buttock",
              avoid: "—",
              interval: "3–4 days",
              after: "Put the new patch on a different area (within 7 days).",
            },
          ]}
        />
      </Section>

      <Section id="hrt" title="Hormone replacement therapy" accent="border-l-[#8a6232]">
        <PatchTable
          rows={[
            {
              product: "Estradiol",
              detail: [
                "Estradot: 25, 37.5, 50, 75, 100 mcg/24 hours",
                "Estraderm MX: 25, 50, 100 mcg/24 hours #8",
              ],
              before: "—",
              skin: "Clean, dry",
              sites: "Lower abdomen, buttock",
              avoid: "—",
              interval: "Every 3–4 days",
              after: "Put the new patch on a different area.",
            },
            {
              product: "Estradiol + northisterone",
              detail: [
                "Estalis Continuous: 50/140, 50/250 mcg/24 hours #8",
                "Estalis Sequi: 50+50/140, 50+50/250 mcg/24 hours #4+4",
              ],
              before: "—",
              skin: "Clean, dry",
              sites: "Lower abdomen, buttock",
              avoid: "—",
              interval: "Every 3–4 days",
              after: "Put the new patch on a different area.",
            },
          ]}
        />
      </Section>

      <Section id="opioids" title="Opioids" accent="border-l-[#8c3b32]">
        <Callout tone="alert">
          <p>
            <strong>Heat increases the release of medicine from the patch.</strong> When wearing the patch, do not allow
            it to come into contact with direct sources of heat such as electric blankets, heat pads, heat lamps, saunas,
            or hot baths. Do not apply straight after a hot bath or shower. Wait until the skin is cool and dry. Monitor
            for increased side effects if fever occurs.
          </p>
        </Callout>
        <PatchTable
          rows={[
            {
              product: "Fentanyl",
              detail: ["12, 25, 50, 75, 100 mcg/hour (Fenpatch, Durogesic) #5"],
              images: [{ file: "durogesic.png", alt: "Durogesic 25 mcg/hour fentanyl patch box." }],
              before: "Check if damaged or cut. Write the date and time.",
              skin: "Dry and cool, non-hairy, non-irritated",
              sites: "Upper body, upper arm",
              avoid: "Avoid heat.",
              interval: "3 days (72 hours)",
              after: "Put the new patch on a different area. Avoid sun on the area for 2 days.",
            },
            {
              product: "Buprenorphine",
              detail: ["5, 10, 15, 20, 25, 30, 40 mcg/hour (Bupredermal, Norspan, B-Patch) #2"],
              images: [{ file: "norspan.png", alt: "Norspan 10 buprenorphine patch box." }],
              before: "Check if damaged or cut. Write the date and time.",
              skin: "Dry and cool, non-hairy, non-irritated",
              sites: "Upper body (torso)",
              avoid: "Avoid heat.",
              interval: "7 days",
              after: "Put the new patch on a different area (within 3 weeks).",
            },
          ]}
        />
      </Section>

      <Section id="anaesthesia" title="Anaesthesia" accent="border-l-[#3d6b8c]">
        <Callout tone="alert">
          <p>
            Direct contact with external heat sources, such as heat pads or electric blankets, may increase the plasma
            lidocaine concentration and the risk of toxicity.
          </p>
          <p className="mt-2">
            <strong>Patches may be cut to fit the area.</strong>
          </p>
        </Callout>
        <PatchTable
          rows={[
            {
              product: "Lidocaine",
              detail: ["5% (Nervoderm, Versatis)"],
              before: "—",
              skin: "Dry, non-irritated, unbroken",
              sites: "The painful area. For shingles, use patches after the rash has healed.",
              avoid: "Avoid water and heat.",
              interval:
                "Wear for up to 12 out of every 24 hours. Choose the time when pain is most troublesome, and bathe or shower during the patch-free interval.",
              after: "—",
            },
            {
              product: "Lidocaine + prilocaine",
              detail: ["2.5% + 2.5% (EMLA)"],
              before: "—",
              skin: "Dry, non-irritated, unbroken",
              sites: "The area of the procedure",
              avoid: "Avoid water and heat.",
              interval:
                "Apply at least 1 hour before the procedure. Maximum dose on intact skin: under 3 months or under 5 kg, 1 patch for up to 1 hour; 3–12 months and over 5 kg, 2 patches for 1–4 hours; 1–12 years, 5 patches for 1–4 hours.",
              after: "—",
            },
          ]}
        />
      </Section>

      <Section id="alacare" title="5-Aminolevulinic acid" accent="border-l-[#8c3b32]">
        <Callout>
          <p>
            A photosensitising agent used in photodynamic therapy. It is activated by a specific red light to produce
            reactive singlet oxygen, which selectively destroys tumour cells.
          </p>
        </Callout>
        <PatchTable
          rows={[
            {
              product: "5-Aminolevulinic acid",
              detail: ["8 mg (Alacare) #4"],
              before: "—",
              skin: "—",
              sites: "The lesion. Actinic keratoses on the face and scalp, mild to moderate.",
              avoid: "—",
              interval:
                "Apply 1 patch to each lesion (maximum 8 lesions per session). After 4 hours, remove the patch and expose the lesion to the red light.",
              after: "Avoid sun on the area and the surrounding skin for 2 days.",
            },
          ]}
        />
      </Section>
    </div>
  );
}
