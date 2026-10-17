type Segment = {
  text: string;
  italic?: boolean;
  bold?: boolean;
};

type Block =
  | { type: "prose"; segments: Segment[] }
  | { type: "list"; lead?: Segment[]; items: Segment[][]; notes?: Segment[][] };

const mechanisms: { name: string; trigger: Block; powers: Block; duration: Block }[] = [
  {
    name: "Emergency Order",
    trigger: {
      type: "list",
      items: [
        [
          { text: "Biosecurity event (" },
          { text: "Biosecurity Act 2014", italic: true },
          { text: ")" },
        ],
        [
          { text: "Disaster situation (" },
          { text: "Disaster Management Act 2003", italic: true },
          { text: ")" },
        ],
        [
          { text: "Declared public health emergency (" },
          { text: "Public Health Act 2005", italic: true },
          { text: ")" },
        ],
        [
          { text: "Emergency under " },
          { text: "Public Safety Preservation Act 1986", italic: true },
        ],
        [{ text: "State/local event posing health risk (e.g. communicable disease outbreak)" }],
      ],
    },
    powers: {
      type: "prose",
      segments: [
        {
          text: "Authorises a person or class of persons to carry out a regulated activity with a regulated substance to manage risk of significant harm/illness",
        },
      ],
    },
    duration: {
      type: "list",
      items: [
        [{ text: "Max " }, { text: "3 months", bold: true }],
        [{ text: "Published on Department website" }],
      ],
    },
  },
  {
    name: "Emerging Risk Declaration",
    trigger: {
      type: "list",
      items: [
        [
          { text: "Applies to " },
          { text: "unscheduled substances", bold: true },
          { text: " or devices used to apply/administer substances" },
        ],
        [
          {
            text: "Urgent need to regulate/prevent entering marketplace due to health/injury risks (e.g. harmful sports supplements)",
          },
        ],
      ],
      notes: [[{ text: "(Excludes medical devices under Commonwealth TGA 1989)" }]],
    },
    powers: {
      type: "list",
      lead: [{ text: "Declares that the substance:" }],
      items: [
        [{ text: "Must not be made, sold, or used in QLD" }],
        [{ text: "May only be used in a particular device or way" }],
        [{ text: "A device must not be used with it" }],
        [{ text: "Must be disposed of in a specific way" }],
      ],
    },
    duration: {
      type: "list",
      items: [
        [{ text: "Max " }, { text: "3 months", bold: true }, { text: " (can be renewed)" }],
        [{ text: "Published on Department website" }],
      ],
    },
  },
  {
    name: "Recall Order",
    trigger: {
      type: "list",
      items: [
        [
          {
            text: "Product containing a regulated substance (or subject to emerging risk declaration) poses a health risk due to labelling, packaging, efficacy, or safety issues (e.g. irritant hair dye with scheduled poison)",
          },
        ],
      ],
      notes: [[{ text: "(Not issued if already exercised under Commonwealth TGA powers)" }]],
    },
    powers: {
      type: "list",
      lead: [
        {
          text: 'Directed to a "responsible person" (manufacturer, possessor, supplier) requiring them to:',
        },
      ],
      items: [
        [{ text: "Stop manufacture or supply" }],
        [{ text: "Recall from end-users" }],
        [{ text: "Destroy substances" }],
        [{ text: "Re-label or re-package" }],
        [{ text: "Publish public warnings" }],
      ],
    },
    duration: {
      type: "prose",
      segments: [
        {
          text: "Process requires giving prior notice to the responsible person before making the order.",
        },
      ],
    },
  },
  {
    name: "Public Warning",
    trigger: {
      type: "prose",
      segments: [
        { text: "Made in the public interest by the " },
        { text: "Minister", bold: true },
        { text: ", " },
        { text: "Chief Executive", bold: true },
        { text: ", or " },
        { text: "Chief Health Officer", bold: true },
        { text: "." },
      ],
    },
    powers: {
      type: "list",
      lead: [{ text: "Public statement giving warnings/info about:" }],
      items: [
        [{ text: "Contraventions of the Act resulting in notification action" }],
        [{ text: "Unlawful practices under relevant laws" }],
        [{ text: "Offences committed and persons who committed them" }],
      ],
    },
    duration: {
      type: "prose",
      segments: [{ text: "Public statement." }],
    },
  },
];

function Segments({ parts }: { parts: Segment[] }) {
  return (
    <>
      {parts.map((part, index) =>
        part.italic || part.bold ? (
          <span
            key={index}
            className={[part.italic ? "italic" : "", part.bold ? "font-medium" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}

function CellContent({ block }: { block: Block }) {
  if (block.type === "prose") {
    return <Segments parts={block.segments} />;
  }

  return (
    <div>
      {block.lead ? (
        <p>
          <Segments parts={block.lead} />
        </p>
      ) : null}
      <ul className={block.lead ? "mt-2 list-disc space-y-1 pl-4" : "list-disc space-y-1 pl-4"}>
        {block.items.map((item, index) => (
          <li key={index}>
            <Segments parts={item} />
          </li>
        ))}
      </ul>
      {block.notes?.map((note, index) => (
        <p key={index} className="mt-2 italic">
          <Segments parts={note} />
        </p>
      ))}
    </div>
  );
}

export function EmergencyOrdersAndPublicWarnings() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <p className="max-w-4xl text-base leading-7 text-ink">
          Under the <span className="italic">Medicines and Poisons Act 2019</span> (MPA), the Chief
          Executive (or delegate) or Minister can issue specific orders, declarations, and warnings
          to manage public health risks, emergency events, and unsafe products.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight text-ink">
          Comparative Breakdown of the 4 Key Mechanisms
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[72rem] border-collapse text-left text-sm leading-6">
            <thead>
              <tr className="bg-moss text-paper-raised">
                <th className="w-48 px-4 py-3 font-medium">Mechanism</th>
                <th className="px-4 py-3 font-medium">Trigger / Qualifying Events</th>
                <th className="px-4 py-3 font-medium">Key Powers & Directives</th>
                <th className="w-64 px-4 py-3 font-medium">Duration & Publication</th>
              </tr>
            </thead>
            <tbody>
              {mechanisms.map((mechanism, index) => (
                <tr
                  key={mechanism.name}
                  className={[
                    "border-t border-line align-top",
                    index % 2 === 1 ? "bg-paper-raised" : "bg-paper",
                  ].join(" ")}
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {mechanism.name}
                  </th>
                  <td className="px-4 py-3 text-ink">
                    <CellContent block={mechanism.trigger} />
                  </td>
                  <td className="px-4 py-3 text-ink">
                    <CellContent block={mechanism.powers} />
                  </td>
                  <td className="px-4 py-3 text-ink">
                    <CellContent block={mechanism.duration} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--summary)]/35 bg-[var(--summary-bg)] px-5 py-5 md:px-6">
        <p className="max-w-4xl text-base leading-7 text-ink">
          <span className="font-medium">Compliance Mandate:</span> Manufacturers, wholesalers, and
          retailers must strictly comply with Emerging Risk Declarations and Recall Orders.
        </p>
        <p className="mt-3 max-w-4xl text-base leading-7 text-ink">
          <span className="font-medium">Significant Penalties:</span> Failure to comply with an
          Emerging Risk Declaration or Recall Order carries heavy statutory penalties.
        </p>
      </section>
    </div>
  );
}
