import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "QLD Pharmacy Law",
    template: "%s · Pipwiki",
  },
  description: "Queensland pharmacy legislation notes.",
};

export default function QldLawLayout({ children }: { children: React.ReactNode }) {
  return children;
}
