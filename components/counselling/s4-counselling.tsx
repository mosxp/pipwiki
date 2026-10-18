import type { S4Block, S4Note, S4Row } from "@/lib/s4-counselling";
import { s4Sections } from "@/lib/s4-counselling";

const labelImages: Record<string, { src: string; alt: string }> = {
  rId4: {
    src: "/counselling/s4-labels/label-21.jpg",
    alt: "Label 21. Take once weekly on the same day.",
  },
  rId5: {
    src: "/counselling/s4-labels/label-8.jpg",
    alt: "Label 8. Avoid excessive skin exposure to sunlight and sunlamps while being treated with this medicine.",
  },
  rId6: {
    src: "/counselling/s4-labels/label-5.jpg",
    alt: "Label 5. Ask your doctor or pharmacist before using any other medicines including over-the-counter medicines or health products.",
  },
  rId7: {
    src: "/counselling/s4-labels/label-10a.jpg",
    alt: "Label 10a. Do not take more than one aspirin tablet or capsule each day while being treated with this medicine.",
  },
  rId8: {
    src: "/counselling/s4-labels/label-20.jpg",
    alt: "Label 20. Special handling and disposal required. Ask your pharmacist.",
  },
  rId9: {
    src: "/counselling/s4-labels/label-b.jpg",
    alt: "Label B. Take with or soon after food.",
  },
  rId10: {
    src: "/counselling/s4-labels/label-18.jpg",
    alt: "Label 18 / Label A. Swallow whole. Do not crush or chew.",
  },
  rId11: {
    src: "/counselling/s4-labels/label-12.jpg",
    alt: "Label 12. This medicine may affect mental alertness and/or coordination. If affected, do not drive a motor vehicle or operate machinery.",
  },
  rId12: {
    src: "/counselling/s4-labels/label-13.jpg",
    alt: "Label 13. Avoid eating grapefruit or drinking grapefruit juice while being treated with this medicine.",
  },
  rId13: {
    src: "/counselling/s4-labels/label-9.jpg",
    alt: "Label 9. Do not stop taking this medicine abruptly unless otherwise advised by your doctor.",
  },
  rId14: {
    src: "/counselling/s4-labels/label-16.jpg",
    alt: "Label 16. This medicine may cause dizziness, especially when you stand up quickly. Ask your doctor or pharmacist for advice.",
  },
  rId15: {
    src: "/counselling/s4-labels/label-1.jpg",
    alt: "Label 1. This medicine may cause drowsiness and may increase the effects of alcohol. If affected, do not drive a motor vehicle or operate machinery.",
  },
  rId16: {
    src: "/counselling/s4-labels/label-1b.jpg",
    alt: "Label 1. This medicine may cause drowsiness and may increase the effects of alcohol. If affected, do not drive a motor vehicle or operate machinery.",
  },
  rId17: {
    src: "/counselling/s4-labels/label-1a.jpg",
    alt: "Label 1a. This preparation is to aid sleep. Drowsiness may continue the following day. If affected, do not drive or operate machinery. Avoid alcohol.",
  },
  rId18: {
    src: "/counselling/s4-labels/label-c.jpg",
    alt: "Label C. Take at least half an hour before food.",
  },
  rId19: {
    src: "/counselling/s4-labels/label-4a.jpg",
    alt: "Label 4a. Do not take dairy products, antacids or mineral supplements within two hours of each dose of this medicine.",
  },
  rId20: {
    src: "/counselling/s4-labels/label-6.jpg",
    alt: "Label 6. Refrigerate. Do not freeze.",
  },
  rId21: {
    src: "/counselling/s4-labels/label-1c.jpg",
    alt: "Label 1. This medicine may cause drowsiness and may increase the effects of alcohol. If affected, do not drive a motor vehicle or operate machinery.",
  },
};

const columns: { key: keyof S4Row; label: string }[] = [
  { key: "className", label: "Class" },
  { key: "medicine", label: "Medicine" },
  { key: "labels", label: "Labels" },
  { key: "indication", label: "Counselling: Indication" },
  { key: "instruction", label: "Counselling: Instruction" },
  { key: "sideEffects", label: "Counselling: SE (Side Effects)" },
  { key: "referral", label: "Counselling: Referral Points" },
  { key: "lifestyle", label: "Counselling: Lifestyle Advice" },
];

function LabelImage({ id }: { id: string }) {
  const label = labelImages[id];
  if (!label) return null;
  return (
    <img
      src={label.src}
      alt={label.alt}
      className="h-auto w-40 rounded border border-line bg-white"
    />
  );
}

function Blocks({ blocks }: { blocks: S4Block[] }) {
  if (blocks.length === 0) return <>—</>;
  return (
    <div className="space-y-2">
      {blocks.map((block, index) =>
        "image" in block ? (
          <LabelImage key={index} id={block.image} />
        ) : (
          <p key={index}>{block.text}</p>
        ),
      )}
    </div>
  );
}

function Notes({ notes }: { notes: S4Note[] }) {
  if (notes.length === 0) return null;
  return (
    <div className="space-y-3 border-b border-line bg-[#f3ecdf] px-4 py-4 text-sm leading-6 text-ink">
      {notes.map((note, index) =>
        typeof note === "string" ? <p key={index}>{note}</p> : <LabelImage key={index} id={note.image} />,
      )}
    </div>
  );
}

export function S4Counselling() {
  return (
    <div className="space-y-8">
      {s4Sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-8 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm"
        >
          <h2 className="border-b border-line px-4 py-4 font-serif text-2xl tracking-tight text-ink">
            {section.title}
          </h2>
          <Notes notes={section.notes} />
          <div className="space-y-8 px-4 py-5">
            {section.tables.map((table, tableIndex) => (
              <div key={table.heading ?? tableIndex}>
                {table.heading ? (
                  <h3 className="mb-3 text-lg font-bold text-ink">{table.heading}</h3>
                ) : null}
                <Notes notes={table.notes} />
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[88rem] border-collapse text-left text-sm leading-6 text-ink">
                    <thead className="bg-moss text-paper">
                      <tr>
                        {columns.map((column) => (
                          <th key={column.key} className="px-3 py-2 font-medium">
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={rowIndex % 2 === 0 ? "bg-paper" : "bg-paper-raised"}
                        >
                          {columns.map((column) => (
                            <td
                              key={column.key}
                              className={[
                                "border-t border-line px-3 py-3 align-top",
                                column.key === "className" ? "sticky left-0 min-w-36 font-medium" : "min-w-44",
                                rowIndex % 2 === 0 ? "bg-paper" : "bg-paper-raised",
                              ].join(" ")}
                            >
                              <Blocks blocks={row[column.key]} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
