import type { Metadata } from "next";
import { NsaidGuidePage } from "@/components/otc-notes/nsaid-guide";

export const metadata: Metadata = {
  title: "Diclofenac",
  description: "NSAID reference notes.",
};

export default function DiclofenacPage() {
  return <NsaidGuidePage title="Diclofenac" storageKey="diclofenac" />;
}
