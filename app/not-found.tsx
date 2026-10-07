import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16 md:px-10 md:py-24">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">
        Missing note
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink">
        This page is not in the notebook.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
        The slug does not match a Markdown file in{" "}
        <span className="font-mono text-sm">notes/</span>.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-moss underline decoration-1 underline-offset-4"
      >
        Back to all notes
      </Link>
    </div>
  );
}
