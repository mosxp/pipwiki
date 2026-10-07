import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Disclaimer } from "@/components/disclaimer";
import { formatNoteDate, getNote, getNoteSlugs } from "@/lib/notes";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return { title: "Note not found" };

  return {
    title: note.title,
    description: note.summary,
  };
}

function NoteFallback() {
  return (
    <div
      className="mx-auto w-full max-w-2xl animate-pulse px-6 py-12 md:px-10 md:py-20"
      aria-hidden="true"
    >
      <div className="h-3 w-24 rounded-full bg-sidebar" />
      <div className="mt-5 h-10 w-2/3 rounded-md bg-sidebar" />
      <div className="mt-6 h-4 w-full rounded-md bg-sidebar" />
      <div className="mt-3 h-4 w-4/5 rounded-md bg-sidebar" />
    </div>
  );
}

export default function NotePage({ params }: NotePageProps) {
  return (
    <Suspense fallback={<NoteFallback />}>
      <NoteArticle params={params} />
    </Suspense>
  );
}

async function NoteArticle({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-12 md:px-10 md:py-20">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">
        {note.category}
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        {note.title}
      </h1>
      {note.summary ? (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {note.summary}
        </p>
      ) : null}
      {note.updated ? (
        <p className="mt-6 text-xs tracking-wide text-ink-soft">
          Updated {formatNoteDate(note.updated)}
        </p>
      ) : null}
      {note.handout ? (
        <a
          href={`/${note.handout}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center rounded-md bg-moss px-3.5 py-2 text-sm font-medium text-paper-raised"
        >
          Print Patient Handout
        </a>
      ) : null}
      <div
        className={`note ${note.handout ? "mt-8" : "mt-10"}`}
        dangerouslySetInnerHTML={{ __html: note.contentHtml }}
      />
      <Disclaimer />
    </article>
  );
}
