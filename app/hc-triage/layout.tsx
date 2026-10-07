import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hormonal contraception",
  description:
    "Interactive consultation triage for resupply of hormonal contraception.",
};

export default function HcTriageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
