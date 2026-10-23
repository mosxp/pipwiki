import type { Metadata } from "next";
import { NsaidGuidePage } from "@/components/otc-notes/nsaid-guide";

export const metadata: Metadata = {
  title: "Naproxen",
  description: "NSAID reference notes.",
};

export default function NaproxenPage() {
  return <NsaidGuidePage title="Naproxen" storageKey="naproxen" />;
}
