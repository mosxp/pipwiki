"use client";

import { useEffect, useState } from "react";

const cards = [
  {
    src: "/counselling/cals/maoi-foods.png",
    alt: "FOODS. Eat food that is as fresh as possible. Do not use leftover or out-of-date foods. Avoid beers and chianti, fermented or aged foods, matured cheeses, salted or pickled herrings, soybean extracts, and yeast extracts. Limited amounts: avocado, bananas that are not overripe, spirits, and wines other than chianti.",
  },
  {
    src: "/counselling/cals/maoi-medicines.png",
    alt: "MEDICINES. Consult your pharmacist or doctor before using any other medicine, including complementary medicines. Avoid nasal drops or sprays, or cough, cold or hayfever preparations, containing dextromethorphan, ephedrine, pseudoephedrine or phenylephrine.",
  },
];

export function MaoiAdviceImages() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="mt-4 space-y-3">
        {cards.map((card, index) => (
          <button
            key={card.src}
            type="button"
            onClick={() => setOpen(index)}
            className="block w-full cursor-pointer overflow-hidden rounded border border-line bg-white text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <img src={card.src} alt={card.alt} className="h-auto w-full" />
          </button>
        ))}
      </div>
      {open !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-6"
          onClick={() => setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={cards[open].alt}
            className="max-h-[92vh] max-w-5xl overflow-auto rounded-lg bg-paper-raised p-3 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="rounded px-2 py-1 text-sm text-moss underline decoration-1 underline-offset-4"
              >
                Close
              </button>
            </div>
            <img src={cards[open].src} alt={cards[open].alt} className="h-auto w-full" />
          </div>
        </div>
      ) : null}
    </>
  );
}
