import type { ReactNode } from "react";

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

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" aria-hidden="true">
      <path
        d="M6 3.5H3.5v9h9V10M8.5 3.5H12.5V7.5M12.5 3.5 7 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-start gap-1.5 text-moss underline decoration-1 underline-offset-4"
    >
      <span className="min-w-0 break-all">{children}</span>
      <ExternalLinkIcon />
    </a>
  );
}

const headClass = "px-3 py-2 font-medium";
const cellClass = "border-t border-line px-3 py-3 align-top";

function LinkTable({ rows }: { rows: { label: string; links: { href: string; text: string }[] }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm leading-6 text-ink">
        <thead className="bg-moss text-paper">
          <tr>
            <th className={headClass}>Resource</th>
            <th className={headClass}>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.label} className={index % 2 === 0 ? "bg-paper" : "bg-paper-raised"}>
              <td className={`${cellClass} sticky left-0 z-10 min-w-44 bg-inherit font-medium`}>{row.label}</td>
              <td className={`${cellClass} min-w-72`}>
                <div className="flex flex-col gap-2">
                  {row.links.map((link) => (
                    <Ext key={link.href} href={link.href}>
                      {link.text}
                    </Ext>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function address(href: string) {
  return href.replace(/^https:\/\//, "");
}

export function Immunisation() {
  return (
    <div className="space-y-8">
      <Section id="aih" title="Australian Immunisation Handbook (AIH) Quick Links">
        <LinkTable
          rows={[
            {
              label: "Vaccination Procedures",
              links: [
                {
                  href: "https://immunisationhandbook.health.gov.au/contents/vaccination-procedures",
                  text: address("https://immunisationhandbook.health.gov.au/contents/vaccination-procedures"),
                },
              ],
            },
            {
              label: "Vaccine-preventable diseases",
              links: [
                {
                  href: "https://immunisationhandbook.health.gov.au/contents/vaccine-preventable-diseases",
                  text: address("https://immunisationhandbook.health.gov.au/contents/vaccine-preventable-diseases"),
                },
              ],
            },
            {
              label: "Catch-up vaccination",
              links: [
                {
                  href: "https://immunisationhandbook.health.gov.au/contents/catch-up-vaccination",
                  text: address("https://immunisationhandbook.health.gov.au/contents/catch-up-vaccination"),
                },
              ],
            },
            {
              label: "Vaccination for special risk groups",
              links: [
                {
                  href: "https://immunisationhandbook.health.gov.au/contents/vaccination-for-special-risk-groups",
                  text: address("https://immunisationhandbook.health.gov.au/contents/vaccination-for-special-risk-groups"),
                },
              ],
            },
            {
              label: "Catch-up Calculator",
              links: [
                {
                  href: "https://immunisationhandbook.health.gov.au/catch-up-calculator/calculator",
                  text: address("https://immunisationhandbook.health.gov.au/catch-up-calculator/calculator"),
                },
              ],
            },
            {
              label: "Comparison of Effects of Diseases & Side Effects of Vaccines table",
              links: [
                {
                  href: "https://immunisationhandbook.health.gov.au/resources/tables/table-comparison-of-the-effects-of-diseases-and-the-side-effects-of-vaccines-on-the-national-immunisation-program",
                  text: address(
                    "https://immunisationhandbook.health.gov.au/resources/tables/table-comparison-of-the-effects-of-diseases-and-the-side-effects-of-vaccines-on-the-national-immunisation-program",
                  ),
                },
              ],
            },
            {
              label: "Common side effects following immunisation for NIP vaccines table",
              links: [
                {
                  href: "https://immunisationhandbook.health.gov.au/resources/tables/table-common-side-effects-following-immunisation-for-vaccines-used-in-the-national-immunisation-program-schedule",
                  text: address(
                    "https://immunisationhandbook.health.gov.au/resources/tables/table-common-side-effects-following-immunisation-for-vaccines-used-in-the-national-immunisation-program-schedule",
                  ),
                },
              ],
            },
          ]}
        />
      </Section>

      <Section id="national" title="Other Useful National Links">
        <LinkTable
          rows={[
            {
              label: "NIPVIP Program",
              links: [
                {
                  href: "https://www.ppaonline.com.au/programs/national-immunisation-program-vaccinations-in-pharmacy-program",
                  text: address(
                    "https://www.ppaonline.com.au/programs/national-immunisation-program-vaccinations-in-pharmacy-program",
                  ),
                },
              ],
            },
            {
              label: "NIP Schedule",
              links: [
                {
                  href: "https://www.health.gov.au/resources/publications/national-immunisation-program-schedule?language=en",
                  text: address(
                    "https://www.health.gov.au/resources/publications/national-immunisation-program-schedule?language=en",
                  ),
                },
              ],
            },
            {
              label: "PSA - Pharmacist led vaccinations",
              links: [
                {
                  href: "https://www.psa.org.au/state-vaccination-regulations/",
                  text: address("https://www.psa.org.au/state-vaccination-regulations/"),
                },
              ],
            },
          ]}
        />
      </Section>

      <Section id="qld" title="Queensland (QLD) Links & State-Funded Programs">
        <LinkTable
          rows={[
            {
              label: "QLD Health Immunisation Guidelines",
              links: [
                {
                  href: "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation",
                  text: address(
                    "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation",
                  ),
                },
              ],
            },
            {
              label: "Immunisation Schedules",
              links: [
                {
                  href: "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule#section__immunisation-schedule-queensland",
                  text: address(
                    "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule#section__immunisation-schedule-queensland",
                  ),
                },
              ],
            },
            {
              label: "NIPVIP and QLD State-funded Programs",
              links: [
                {
                  href: "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/nipvip",
                  text: address(
                    "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/nipvip",
                  ),
                },
              ],
            },
            {
              label: "Ordering vaccines (QHIP)",
              links: [
                {
                  href: "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/manage",
                  text: address(
                    "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/manage",
                  ),
                },
              ],
            },
          ]}
        />
        <Subhead id="qld-funded">State-funded conditions and vaccines</Subhead>
        <LinkTable
          rows={[
            {
              label: "Diphtheria",
              links: [
                {
                  href: "https://www.qld.gov.au/health/condition/infections-and-parasites/bacterial-infections/diphtheria",
                  text: address(
                    "https://www.qld.gov.au/health/condition/infections-and-parasites/bacterial-infections/diphtheria",
                  ),
                },
              ],
            },
            {
              label: "Hepatitis B",
              links: [
                {
                  href: "https://www.qld.gov.au/health/condition/infections-and-parasites/immunisation/hepatitis-b",
                  text: address("https://www.qld.gov.au/health/condition/infections-and-parasites/immunisation/hepatitis-b"),
                },
              ],
            },
            {
              label: "Influenza",
              links: [
                {
                  href: "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/influenza",
                  text: address(
                    "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/influenza",
                  ),
                },
              ],
            },
            {
              label: "Japanese Encephalitis Virus",
              links: [
                {
                  href: "https://www.qld.gov.au/health/condition/infections-and-parasites/viral-infections/japanese-encephalitis",
                  text: address(
                    "https://www.qld.gov.au/health/condition/infections-and-parasites/viral-infections/japanese-encephalitis",
                  ),
                },
              ],
            },
            {
              label: "Measles/Mumps/Rubella (MMR)",
              links: [
                {
                  href: "https://www.qld.gov.au/health/condition/infections-and-parasites/viral-infections/measles",
                  text: address(
                    "https://www.qld.gov.au/health/condition/infections-and-parasites/viral-infections/measles",
                  ),
                },
              ],
            },
            {
              label: "Meningococcal B (MenB)",
              links: [
                {
                  href: "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/meningococcal-b",
                  text: address(
                    "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/meningococcal-b",
                  ),
                },
              ],
            },
            {
              label: "Mpox",
              links: [
                {
                  href: "https://www.qld.gov.au/health/condition/infections-and-parasites/viral-infections/mpox-monkeypox",
                  text: address(
                    "https://www.qld.gov.au/health/condition/infections-and-parasites/viral-infections/mpox-monkeypox",
                  ),
                },
              ],
            },
            {
              label: "Respiratory Syncytial Virus (RSV)",
              links: [
                {
                  href: "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/paediatric-rsv-prevention-program",
                  text: address(
                    "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/paediatric-rsv-prevention-program",
                  ),
                },
              ],
            },
            {
              label: "School Immunisation Program (SIP)",
              links: [
                {
                  href: "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/schools",
                  text: address(
                    "https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/schools",
                  ),
                },
              ],
            },
          ]}
        />
      </Section>

      <Section id="vic" title="Victoria (VIC) Links">
        <LinkTable
          rows={[
            {
              label: "Health VIC Immunisation",
              links: [
                {
                  href: "https://www.health.vic.gov.au/public-health/immunisation",
                  text: address("https://www.health.vic.gov.au/public-health/immunisation"),
                },
              ],
            },
            {
              label: "Immunisation Schedule Victoria",
              links: [
                {
                  href: "https://www.health.vic.gov.au/immunisation/immunisation-schedule-victoria-and-vaccine-eligibility-criteria",
                  text: address(
                    "https://www.health.vic.gov.au/immunisation/immunisation-schedule-victoria-and-vaccine-eligibility-criteria",
                  ),
                },
              ],
            },
            {
              label: "Pharmacist Immunisers",
              links: [
                {
                  href: "https://www.health.vic.gov.au/immunisation/pharmacist-immunisers",
                  text: address("https://www.health.vic.gov.au/immunisation/pharmacist-immunisers"),
                },
              ],
            },
            {
              label: "Ordering Vaccines (Health VIC & OneLink Online)",
              links: [
                {
                  href: "https://www.health.vic.gov.au/immunisation/ordering-vaccines",
                  text: address("https://www.health.vic.gov.au/immunisation/ordering-vaccines"),
                },
                {
                  href: "https://www.onelinkonline.net/",
                  text: address("https://www.onelinkonline.net/"),
                },
              ],
            },
          ]}
        />
      </Section>
    </div>
  );
}
