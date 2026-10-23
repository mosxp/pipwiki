import type { Metadata } from "next";
import { NsaidGuidePage } from "@/components/otc-notes/nsaid-guide";

export const metadata: Metadata = {
  title: "Celecoxib",
  description: "NSAID reference notes.",
};

export default function CelecoxibPage() {
  return <NsaidGuidePage title="Celecoxib" storageKey="celecoxib" />;
}
