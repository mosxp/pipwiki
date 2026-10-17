import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Disclaimer } from "@/components/disclaimer";
import { PurposesOfTheAct } from "@/components/qld-law/purposes-of-the-act";
import { allLawTopics, getLawTopic } from "@/lib/qld-law";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  return allLawTopics().map((topic) => ({ topic: topic.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getLawTopic(slug);
  if (!topic) return { title: "Topic not found" };

  return {
    title: topic.title,
    description: `${topic.title} — QLD Pharmacy Law notes.`,
  };
}

export default async function QldLawTopicPage({ params }: TopicPageProps) {
  const { topic: slug } = await params;
  const topic = getLawTopic(slug);
  if (!topic) notFound();

  const trail = ["QLD Pharmacy Law", ...topic.crumbs].join(" · ");

  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16 xl:px-14">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">{trail}</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">{topic.title}</h1>
      {slug === "purposes-of-the-act" ? (
        <p className="mt-3 text-lg leading-7 text-ink-soft">Queensland: Medicines and Poisons Act 2019</p>
      ) : null}
      <div className="mt-6">
        <BackToHub />
      </div>
      {slug === "purposes-of-the-act" ? (
        <PurposesOfTheAct />
      ) : (
        <p className="mt-8 text-base leading-7 text-ink-soft">This note has not been written yet.</p>
      )}
      <div className="mt-10">
        <BackToHub />
      </div>
      <Disclaimer />
    </article>
  );
}

function BackToHub() {
  return (
    <Link
      href="/qld-law"
      className="inline-block text-sm text-moss underline decoration-1 underline-offset-4"
    >
      Back to QLD Pharmacy Law
    </Link>
  );
}
