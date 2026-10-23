import type { Metadata } from "next";
import { NsaidGuidePage } from "@/components/otc-notes/nsaid-guide";

export const metadata: Metadata = {
  title: "Mefenamic Acid",
  description: "NSAID reference notes.",
};

export default function MefenamicAcidPage() {
  return <NsaidGuidePage title="Mefenamic Acid" storageKey="mefenamic-acid" />;
}
