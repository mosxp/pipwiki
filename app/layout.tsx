import type { Metadata } from "next";
import { Geist, Geist_Mono, Literata } from "next/font/google";
import { WikiShell } from "@/components/wiki-shell";
import { getAllNotes } from "@/lib/notes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Pipwiki",
    template: "%s · Pipwiki",
  },
  description:
    "A minimalist personal wiki for pharmacy notes, stored as local Markdown files.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const notes = getAllNotes();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-paper font-sans text-ink">
        <WikiShell notes={notes}>{children}</WikiShell>
      </body>
    </html>
  );
}
