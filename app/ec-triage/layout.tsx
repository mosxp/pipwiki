import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency contraception",
  description:
    "Interactive consultation triage for emergency contraception supply.",
};

export default function EcTriageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
