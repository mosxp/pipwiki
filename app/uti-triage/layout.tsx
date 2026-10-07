import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Management of Urinary Tract Infections",
  description: "Interactive consultation triage for management of urinary tract infections.",
};

export default function UtiTriageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
