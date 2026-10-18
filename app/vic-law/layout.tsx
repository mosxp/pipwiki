import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "VIC Pharmacy Law",
    template: "%s · Pipwiki",
  },
  description: "Victorian pharmacy legislation notes.",
};

export default function VicLawLayout({ children }: { children: React.ReactNode }) {
  return children;
}
