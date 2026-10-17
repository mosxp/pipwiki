import Link from "next/link";
import { Disclaimer } from "@/components/disclaimer";
import { qldLawSections, type LawNode } from "@/lib/qld-law";

function TopicLink({ topic }: { topic: LawNode }) {
  return (
    <li>
      <Link
        href={`/qld-law/${topic.slug}`}
        className="block rounded-md px-2 py-1.5 text-sm leading-6 text-ink/90 hover:bg-paper hover:text-ink"
      >
        {topic.title}
      </Link>
    </li>
  );
}

function TopicList({ topics }: { topics: LawNode[] }) {
  return (
    <ul className="-mx-2">
      {topics.map((topic) => (
        <TopicLink key={topic.slug} topic={topic} />
      ))}
    </ul>
  );
}

function GroupCard({ node }: { node: LawNode }) {
  const children = node.children ?? [];
  const nested = children.some((child) => child.children?.length);

  return (
    <article className="rounded-lg border border-line bg-paper-raised px-5 py-4">
      <h3 className="font-serif text-xl tracking-tight text-ink">{node.title}</h3>
      {nested ? (
        <div className="mt-4 space-y-5">
          {children.map((child) => (
            <div key={child.title}>
              <h4 className="text-[11px] font-medium tracking-[0.14em] text-moss uppercase">
                {child.title}
              </h4>
              <div className="mt-1">
                <TopicList topics={child.children ?? []} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2">
          <TopicList topics={children} />
        </div>
      )}
    </article>
  );
}

export default function QldLawPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 md:px-10 md:py-16">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">Law</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        QLD Pharmacy Law
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        Queensland medicines legislation notes. Open a topic to write it up.
      </p>

      <div className="mt-10 space-y-10">
        {qldLawSections.map((section) =>
          section.slug ? (
            <Link
              key={section.slug}
              href={`/qld-law/${section.slug}`}
              className="block rounded-lg border border-line bg-paper-raised px-5 py-5 transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
            >
              <h2 className="font-serif text-2xl tracking-tight text-ink">{section.title}</h2>
            </Link>
          ) : (
            <section key={section.title}>
              <h2 className="font-serif text-2xl tracking-tight text-ink">{section.title}</h2>
              {(section.children ?? []).every((child) => child.slug) ? (
                <article className="mt-4 rounded-lg border border-line bg-paper-raised px-5 py-4">
                  <TopicList topics={section.children ?? []} />
                </article>
              ) : (
                <div className="mt-4 space-y-4">
                  {(section.children ?? []).map((child) => (
                    <GroupCard key={child.title} node={child} />
                  ))}
                </div>
              )}
            </section>
          ),
        )}
      </div>

      <Disclaimer />
    </div>
  );
}
