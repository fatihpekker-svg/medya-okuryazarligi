import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";

export const metadata: Metadata = {
  title: "Medya Okuryazarlığı Eğitim Platformu | Türkiye'nin İlk İnteraktif Medya Eğitimi",
  description: "İlkokul, ortaöğretim ve yetişkin düzeylerinde eğitici, eğlenceli ve gerçek vaka analizleriyle desteklenen Türkiye'nin ilk interaktif medya okuryazarlığı eğitim platformu. RTÜK iş birliğiyle.",
  keywords: ["medya okuryazarlığı", "dijital okuryazarlık", "dezenformasyon", "RTÜK", "medya eğitimi", "fake news"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
