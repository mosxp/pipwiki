import { Disclaimer } from "@/components/disclaimer";

const dashboardCards = ["Clinical tools", "Counselling"];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12 md:px-10 md:py-20">
      <p className="text-[11px] font-medium tracking-[0.18em] text-moss uppercase">
        Local markdown
      </p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight text-ink md:text-6xl">
        Pipwiki
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {dashboardCards.map((title) => (
          <div
            key={title}
            className="min-h-40 rounded-lg border border-line bg-paper-raised px-6 py-10 transition-[background-color,box-shadow] duration-200 hover:bg-paper hover:shadow-md"
          >
            <h2 className="font-serif text-3xl tracking-tight text-ink">{title}</h2>
          </div>
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}
