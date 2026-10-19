"use client";

import { useEffect, useState } from "react";

export function ZoomImage({
  src,
  alt,
  className = "h-auto max-h-36 w-auto",
  buttonClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`cursor-pointer overflow-hidden rounded border border-line bg-white text-left shadow-sm transition-shadow hover:shadow-md ${buttonClassName}`}
      >
        <img src={src} alt={alt} className={className} />
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="max-h-[92vh] max-w-5xl overflow-auto rounded-lg bg-paper-raised p-3 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded px-2 py-1 text-sm text-moss underline decoration-1 underline-offset-4"
              >
                Close
              </button>
            </div>
            <img src={src} alt={alt} className="h-auto w-full" />
          </div>
        </div>
      ) : null}
    </>
  );
}
