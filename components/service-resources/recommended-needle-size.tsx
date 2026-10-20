import type { ReactNode } from "react";
import { ZoomImage } from "@/components/counselling/zoom-image";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
      <h2 className="border-b border-line px-4 py-4 font-serif text-2xl tracking-tight text-ink">{title}</h2>
      <div className="space-y-4 px-4 py-5 text-base leading-7 text-ink">{children}</div>
    </section>
  );
}

function Subhead({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-8 text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
      {children}
    </h3>
  );
}

const headClass = "px-3 py-2 font-medium";
const cellClass = "border-t border-line px-3 py-3 align-top";

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm leading-6 text-ink">
        <thead className="bg-moss text-paper">
          <tr>
            {headers.map((header) => (
              <th key={header} className={headClass}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`${cellClass} ${cellIndex === 0 ? "sticky left-0 z-10 min-w-56 bg-inherit font-medium" : "min-w-40"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GaugeCard({
  id,
  title,
  headerClass,
  children,
}: {
  id: string;
  title: string;
  headerClass: string;
  children: ReactNode;
}) {
  return (
    <article id={id} className="scroll-mt-8 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-sm">
      <h3 className={`px-4 py-3 text-sm font-medium tracking-wide text-white ${headerClass}`}>{title}</h3>
      <div className="space-y-3 px-4 py-4 text-sm leading-6">{children}</div>
    </article>
  );
}

export function RecommendedNeedleSize() {
  return (
    <div className="space-y-8">
      <Section id="specifications" title="Needle size, length and angle">
        <Table
          headers={["Age or size of person to be vaccinated", "Needle type", "Angle of needle insertion"]}
          rows={[
            ["Infant, child or adult for intramuscular vaccines", "22–25 gauge, 25 mm long", "90° to skin plane"],
            [
              "Preterm infant (<37 weeks gestation) up to 2 months of age, and/or very small infant",
              "23–25 gauge, 16 mm long",
              "90° to skin plane",
            ],
            ["Very large or obese person", "22–25 gauge, 38 mm long", "90° to skin plane"],
            ["Subcutaneous injection in all people", "25–27 gauge, 16 mm long", "45° to skin plane"],
            ["Intradermal injection in all people", "26–27 gauge, 10 mm long", "5-15° to skin plane"],
          ]}
        />
      </Section>

      <Section id="color-guide" title="Color-coded needle guide">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <GaugeCard id="orange" title="25G Orange" headerClass="bg-[#e8772e]">
            <p>
              <span className="font-medium">16 mm long.</span> Preferred for subcutaneous injections.
            </p>
            <p>
              <span className="font-medium">25 mm long.</span> May be used in some cases in IM injections.
            </p>
            <p className="text-ink-soft">
              <span className="font-medium">40 mm.</span> Not used in vaccination.
            </p>
          </GaugeCard>
          <GaugeCard id="blue" title="23G Blue" headerClass="bg-[#2f9fd8]">
            <p>
              <span className="font-medium">16 mm long.</span> May be used for IM injection in pre-term infants.
            </p>
            <p>
              <span className="font-medium">25 mm long.</span> Preferred length for IM injection.
            </p>
            <p>
              <span className="font-medium">38 mm long.</span> May be used for IM injection for obese patients.
            </p>
          </GaugeCard>
          <GaugeCard id="green" title="21G Green" headerClass="bg-[#3a9d45]">
            <p>Available in 40 mm and 50 mm.</p>
            <p>Used to draw up from a vial only.</p>
            <div className="rounded-lg border border-[#8c3b32] bg-[#f8ece8] px-3 py-2">
              Should not be used to administer a vaccine.
            </div>
            <p className="text-ink-soft">Note: may also use 19G for this purpose.</p>
          </GaugeCard>
        </div>
      </Section>

      <Section id="diagrams" title="Needle comparison and gauge chart">
        <Subhead id="comparison">Needle comparison</Subhead>
        <ZoomImage
          src="/service-resources/immunisation/needle-comparison.png"
          alt="Three needles labelled 23G 25 mm IM injection, 21G 25 mm re-constitution and drawing up, and 25G 16 mm SC injection"
          buttonClassName="block max-w-3xl"
          className="h-auto w-full object-contain"
        />
        <p className="text-sm leading-6 text-ink-soft">
          23G 25 mm IM injection. 21G 25 mm re-constitution, drawing up. 25G 16 mm SC injection.
        </p>
        <Subhead id="gauge-chart">Gauge chart</Subhead>
        <ZoomImage
          src="/service-resources/immunisation/needle-gauge-chart.png"
          alt="Colour-coded chart of 25G orange, 23G blue, and 21G green needle lengths and uses"
          buttonClassName="block max-w-5xl"
          className="h-auto w-full object-contain"
        />
      </Section>
    </div>
  );
}
