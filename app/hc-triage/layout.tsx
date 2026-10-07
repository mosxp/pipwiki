import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resupply of Hormonal Contraception",
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
