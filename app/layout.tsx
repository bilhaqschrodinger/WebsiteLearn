import type { Metadata } from "next";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "WebsiteLearn — Peta Belajar Website",
  description:
    "Materi belajar membuat website dari nol: HTML, CSS, layout, responsive, JavaScript, form, aksesibilitas, SEO, sampai hosting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
