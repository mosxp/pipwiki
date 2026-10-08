import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Management of Impetigo",
  description: "Interactive consultation triage for management of impetigo.",
};

export default function ImpetigoTriageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
